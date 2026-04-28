import { NextResponse } from "next/server";
import { ProcurementType } from "@prisma/client";
import { z } from "zod";

import { parseJsonRequest, requireSameOrigin, requireStaffSession } from "@/lib/api-security";
import { prisma } from "@/lib/db";

const createProcurementSchema = z.object({
  title: z.string().trim().min(1).max(160),
  vendor: z.string().trim().max(120).optional(),
  category: z.string().trim().min(1).max(80),
  type: z.nativeEnum(ProcurementType),
  quantity: z.coerce.number().int().min(1).max(100_000),
  estimatedCost: z.union([z.coerce.number().nonnegative(), z.null()]).optional(),
  neededBy: z.string().max(40).optional(),
  itemUrl: z.string().url().max(2_048).optional(),
  notes: z.string().trim().max(2_000).optional(),
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

  const parsed = createProcurementSchema.safeParse(json.data);

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
        createdById: sessionResult.session.user.id,
      },
    });

    return NextResponse.json({ ok: true, itemId: item.id });
  } catch (error) {
    console.error("procurement create error", error);
    return NextResponse.json({ error: "Could not create purchase item." }, { status: 500 });
  }
}
