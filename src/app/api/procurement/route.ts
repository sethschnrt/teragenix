import { NextResponse } from "next/server";
import { ProcurementType } from "@prisma/client";
import { z } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createProcurementSchema = z.object({
  title: z.string().trim().min(1),
  vendor: z.string().optional(),
  category: z.string().trim().min(1),
  type: z.nativeEnum(ProcurementType),
  quantity: z.coerce.number().int().min(1),
  estimatedCost: z.union([z.coerce.number().nonnegative(), z.null()]).optional(),
  neededBy: z.string().optional(),
  itemUrl: z.string().optional(),
  notes: z.string().optional(),
});

function optionalString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function optionalDate(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = createProcurementSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid purchasing payload." }, { status: 400 });
  }

  try {
    const item = await prisma.procurementItem.create({
      data: {
        title: parsed.data.title,
        vendor: optionalString(parsed.data.vendor),
        category: parsed.data.category,
        type: parsed.data.type,
        quantity: parsed.data.quantity,
        estimatedCost: parsed.data.estimatedCost ?? null,
        neededBy: optionalDate(parsed.data.neededBy),
        itemUrl: optionalString(parsed.data.itemUrl),
        notes: optionalString(parsed.data.notes),
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ ok: true, itemId: item.id });
  } catch (error) {
    console.error("procurement create error", error);
    return NextResponse.json({ error: "Could not create purchase item." }, { status: 500 });
  }
}
