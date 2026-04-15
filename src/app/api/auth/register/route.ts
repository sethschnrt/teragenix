import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const registerSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  leadSource: z.string().trim().max(100).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = registerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid signup data." },
        { status: 400 },
      );
    }

    const { email, password, firstName, lastName, phone, leadSource } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone: phone || null,
        },
      });

      const existingContact = await tx.crmContact.findFirst({
        where: { email },
        select: { id: true },
      });

      const crmContact = existingContact
        ? await tx.crmContact.update({
            where: { id: existingContact.id },
            data: {
              userId: user.id,
              firstName,
              lastName,
              phone: phone || null,
              leadSource: leadSource || "website-signup",
            },
          })
        : await tx.crmContact.create({
            data: {
              userId: user.id,
              firstName,
              lastName,
              email,
              phone: phone || null,
              leadSource: leadSource || "website-signup",
              stage: "LEAD",
            },
          });

      return { user, crmContact };
    });

    return NextResponse.json({
      ok: true,
      userId: result.user.id,
      crmContactId: result.crmContact.id,
    });
  } catch (error) {
    console.error("register error", error);
    return NextResponse.json(
      { error: "Could not create account." },
      { status: 500 },
    );
  }
}

