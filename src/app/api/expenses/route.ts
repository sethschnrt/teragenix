import { NextResponse } from "next/server";
import { z } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createExpenseSchema = z.object({
  vendor: z.string().trim().min(1),
  category: z.string().trim().min(1),
  amount: z.coerce.number().positive(),
  expenseDate: z.coerce.date(),
  paymentMethod: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  relatedOrderId: z.string().trim().optional(),
  procurementItemId: z.string().trim().optional(),
});

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = createExpenseSchema.safeParse(await request.json());

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
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ ok: true, expenseId: expense.id });
  } catch (error) {
    console.error("expense create error", error);
    return NextResponse.json({ error: "Could not create expense." }, { status: 500 });
  }
}
