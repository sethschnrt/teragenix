import { NextResponse } from "next/server";
import { ProcurementStatus } from "@prisma/client";
import { z } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const updateProcurementSchema = z.object({
  vendor: z.string().optional(),
  status: z.nativeEnum(ProcurementStatus).optional(),
  actualCost: z.union([z.coerce.number().nonnegative(), z.null()]).optional(),
  orderedAt: z.string().optional(),
  receivedAt: z.string().optional(),
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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ itemId: string }> },
) {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = updateProcurementSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid purchasing update." }, { status: 400 });
  }

  const { itemId } = await context.params;

  try {
    const item = await prisma.procurementItem.update({
      where: { id: itemId },
      data: {
        ...(parsed.data.vendor !== undefined ? { vendor: optionalString(parsed.data.vendor) } : {}),
        ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
        ...(parsed.data.actualCost !== undefined ? { actualCost: parsed.data.actualCost } : {}),
        ...(parsed.data.orderedAt !== undefined ? { orderedAt: optionalDate(parsed.data.orderedAt) } : {}),
        ...(parsed.data.receivedAt !== undefined ? { receivedAt: optionalDate(parsed.data.receivedAt) } : {}),
        ...(parsed.data.itemUrl !== undefined ? { itemUrl: optionalString(parsed.data.itemUrl) } : {}),
        ...(parsed.data.notes !== undefined ? { notes: optionalString(parsed.data.notes) } : {}),
      },
    });

    return NextResponse.json({ ok: true, itemId: item.id });
  } catch (error) {
    console.error("procurement update error", error);
    return NextResponse.json({ error: "Could not update purchase item." }, { status: 500 });
  }
}
