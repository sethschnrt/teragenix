import { NextResponse } from "next/server";
import { z } from "zod";

import { parseJsonRequest, requireSameOrigin, requireStaffSession } from "@/lib/api-security";
import { prisma } from "@/lib/db";

const createExpenseSchema = z.object({
  vendor: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(80),
  amount: z.coerce.number().positive(),
  expenseDate: z.coerce.date(),
  paymentMethod: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(2_000).optional(),
  relatedOrderId: z.string().trim().max(80).optional(),
  procurementItemId: z.string().trim().max(80).optional(),
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

  const parsed = createExpenseSchema.safeParse(json.data);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid expense payload." }, { status: 400 });
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        vendor: parsed.data.vendor,
        category: parsed.data.category,
        amount: parsed.data.amount,
        expenseDate: parsed.data.expenseDate,
        paymentMethod: parsed.data.paymentMethod || null,
        notes: parsed.data.notes || null,
        relatedOrderId: parsed.data.relatedOrderId || null,
        procurementItemId: parsed.data.procurementItemId || null,
        createdById: sessionResult.session.user.id,
      },
    });

    return NextResponse.json({ ok: true, expenseId: expense.id });
  } catch (error) {
    console.error("expense create error", error);
    return NextResponse.json({ error: "Could not create expense." }, { status: 500 });
  }
}
