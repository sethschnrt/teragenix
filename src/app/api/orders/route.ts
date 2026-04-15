import { NextResponse } from "next/server";
import { z } from "zod";

import { products } from "@/data/products";
import { getServerAuthSession } from "@/lib/auth";
import { createWebsiteOrder } from "@/lib/orders";

const checkoutSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  addressLine1: z.string().trim().min(1),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  postalCode: z.string().trim().min(1),
  country: z.string().trim().default("US"),
  orderNotes: z.string().trim().optional(),
  items: z.array(z.object({
    slug: z.string().trim().min(1),
    quantity: z.number().int().min(1).max(99),
  })).min(1),
});

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const parsed = checkoutSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
  }

  const catalogItems = parsed.data.items.map((item) => {
    const product = products.find((entry) => entry.slug === item.slug);
    if (!product) {
      return null;
    }

    return {
      slug: product.slug,
      name: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
    };
  });

  if (catalogItems.some((item) => !item)) {
    return NextResponse.json({ error: "One or more items are invalid." }, { status: 400 });
  }

  const resolvedItems = catalogItems.filter(
    (item): item is NonNullable<(typeof catalogItems)[number]> => Boolean(item),
  );

  try {
    const order = await createWebsiteOrder({
      userId: session?.user?.id,
      customer: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company,
        addressLine1: parsed.data.addressLine1,
        addressLine2: parsed.data.addressLine2,
        city: parsed.data.city,
        state: parsed.data.state,
        postalCode: parsed.data.postalCode,
        country: parsed.data.country,
      },
      items: resolvedItems,
      orderNotes: parsed.data.orderNotes,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("checkout order create error", error);
    return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  }
}
