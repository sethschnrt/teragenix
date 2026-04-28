import { NextResponse } from "next/server";
import { z } from "zod";

import { parseJsonRequest, requireSameOrigin, requireStaffSession } from "@/lib/api-security";
import { prisma } from "@/lib/db";

const updateRecurringExpenseSchema = z.object({
  active: z.boolean().optional(),
  nextDueDate: z.coerce.date().optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ expenseId: string }> },
) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const sessionResult = await requireStaffSession();
  if (!sessionResult.ok) {
    return sessionResult.response;
  }

  const json = await parseJsonRequest(request, 8_192);
  if (!json.ok) {
    return json.response;
  }

  const parsed = updateRecurringExpenseSchema.safeParse(json.data);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid recurring expense update." }, { status: 400 });
  }

  const { expenseId } = await context.params;

  try {
    const expense = await prisma.recurringExpense.update({
      where: { id: expenseId },
      data: {
        ...(parsed.data.active !== undefined ? { active: parsed.data.active } : {}),
        ...(parsed.data.nextDueDate ? { nextDueDate: parsed.data.nextDueDate } : {}),
      },
    });

    return NextResponse.json({ ok: true, recurringExpenseId: expense.id });
  } catch (error) {
    console.error("recurring expense update error", error);
    return NextResponse.json({ error: "Could not update recurring expense." }, { status: 500 });
  }
}
