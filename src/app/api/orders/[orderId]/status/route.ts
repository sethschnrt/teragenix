import { NextResponse } from "next/server";
import { FulfillmentStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { z } from "zod";

import { parseJsonRequest, requireSameOrigin, requireStaffSession } from "@/lib/api-security";
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
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const sessionResult = await requireStaffSession();
  if (!sessionResult.ok) {
    return sessionResult.response;
  }

  const { orderId } = await context.params;
  const json = await parseJsonRequest(request, 8_192);
  if (!json.ok) {
    return json.response;
  }

  const parsed = updateSchema.safeParse(json.data);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order update." }, { status: 400 });
  }

  try {
    const order = await updateOrderStatuses({
      orderId,
      actorUserId: sessionResult.session.user.id,
      ...parsed.data,
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("order status update error", error);
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}
