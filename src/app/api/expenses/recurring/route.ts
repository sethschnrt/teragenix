import { NextResponse } from "next/server";
import { ExpenseFrequency } from "@prisma/client";
import { z } from "zod";

import { parseJsonRequest, requireSameOrigin, requireStaffSession } from "@/lib/api-security";
import { prisma } from "@/lib/db";

const createRecurringExpenseSchema = z.object({
  vendor: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(80),
  amount: z.coerce.number().positive(),
  frequency: z.nativeEnum(ExpenseFrequency),
  nextDueDate: z.coerce.date(),
  notes: z.string().trim().max(2_000).optional(),
});

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const sessionResult = await requireStaffSession();
  if (!sessionResult.ok) {
    return sessionResult.response;
  }

  const json = await parseJsonRequest(request, 16_384);
  if (!json.ok) {
    return json.response;
  }

  const parsed = createRecurringExpenseSchema.safeParse(json.data);

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
