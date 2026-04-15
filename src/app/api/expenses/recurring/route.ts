import { NextResponse } from "next/server";
import { ExpenseFrequency } from "@prisma/client";
import { z } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createRecurringExpenseSchema = z.object({
  vendor: z.string().trim().min(1),
  category: z.string().trim().min(1),
  amount: z.coerce.number().positive(),
  frequency: z.nativeEnum(ExpenseFrequency),
  nextDueDate: z.coerce.date(),
  notes: z.string().trim().optional(),
});

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = createRecurringExpenseSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid recurring expense payload." }, { status: 400 });
  }

  try {
    const expense = await prisma.recurringExpense.create({
      data: {
        vendor: parsed.data.vendor,
        category: parsed.data.category,
        amount: parsed.data.amount,
        frequency: parsed.data.frequency,
        nextDueDate: parsed.data.nextDueDate,
        notes: parsed.data.notes || null,
      },
    });

    return NextResponse.json({ ok: true, recurringExpenseId: expense.id });
  } catch (error) {
    console.error("recurring expense create error", error);
    return NextResponse.json({ error: "Could not create recurring expense." }, { status: 500 });
  }
}

