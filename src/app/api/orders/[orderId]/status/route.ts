import { NextResponse } from "next/server";
import { FulfillmentStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { z } from "zod";

import { getServerAuthSession } from "@/lib/auth";
import { updateOrderStatuses } from "@/lib/orders";

const updateSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  fulfillmentStatus: z.nativeEnum(FulfillmentStatus).optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { orderId } = await context.params;
  const parsed = updateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order update." }, { status: 400 });
  }

  try {
    const order = await updateOrderStatuses({
      orderId,
      actorUserId: session.user.id,
      ...parsed.data,
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("order status update error", error);
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}

