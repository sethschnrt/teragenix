import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const bootstrapSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Admin already exists." },
        { status: 403 },
      );
    }

    const json = await request.json();
    const parsed = bootstrapSchema.safeParse(json);

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
