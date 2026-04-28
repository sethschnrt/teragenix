import { NextResponse } from "next/server";
import { z } from "zod";

import { parseJsonRequest, rateLimitRequest, requireSameOrigin } from "@/lib/api-security";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const bootstrapSchema = z.object({
  email: z.string().email().trim().toLowerCase().max(254),
  password: z.string().min(12).max(128),
});

export async function POST(request: Request) {
  try {
    const originError = requireSameOrigin(request);
    if (originError) {
      return originError;
    }

    const rateLimitError = rateLimitRequest(request, {
      namespace: "admin-bootstrap",
      limit: 5,
      windowMs: 10 * 60_000,
    });
    if (rateLimitError) {
      return rateLimitError;
    }
    const bootstrapToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
    const providedToken = request.headers.get("x-admin-bootstrap-token");

    if (!bootstrapToken || providedToken !== bootstrapToken) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Admin already exists." },
        { status: 403 },
      );
    }

    const json = await parseJsonRequest(request, 8_192);
    if (!json.ok) {
      return json.response;
    }

    const parsed = bootstrapSchema.safeParse(json.data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid admin details." },
        { status: 400 },
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);

    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        passwordHash,
        role: "ADMIN",
        status: "ACTIVE",
        firstName: "Teragenix",
        lastName: "Admin",
      },
    });

    return NextResponse.json({
      ok: true,
      userId: user.id,
    });
  } catch (error) {
    console.error("bootstrap admin error", error);
    return NextResponse.json(
      { error: "Could not create admin." },
      { status: 500 },
    );
  }
}
