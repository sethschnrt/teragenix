import { AddressType, ContactStage, OrderSource, OrderStatus, PaymentStatus, FulfillmentStatus, Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

export function generateOrderNumber() {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TG-${stamp}-${random}`;
}

export async function ensureCrmContactForUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { crmContact: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.crmContact) {
    return user.crmContact;
  }

  return prisma.crmContact.create({
    data: {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      leadSource: "website-account",
      stage: ContactStage.LEAD,
    },
  });
}

export async function markContactAsCustomer(contactId: string, tx: Prisma.TransactionClient = prisma) {
  return tx.crmContact.update({
    where: { id: contactId },
    data: { stage: ContactStage.CUSTOMER },
  });
}

export async function updateOrderStatuses({
  orderId,
  status,
  paymentStatus,
  fulfillmentStatus,
  actorUserId,
}: {
  orderId: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  actorUserId?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      select: { id: true, orderNumber: true, crmContactId: true },
    });

    if (!order) {
      throw new Error("Order not found.");
    }

    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        ...(status ? { status } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(fulfillmentStatus ? { fulfillmentStatus } : {}),
      },
    });

    if (updatedOrder.crmContactId && updatedOrder.paymentStatus === PaymentStatus.PAID) {
      await markContactAsCustomer(updatedOrder.crmContactId, tx);
    }

    await tx.note.create({
      data: {
        orderId: updatedOrder.id,
        contactId: updatedOrder.crmContactId,
        authorUserId: actorUserId ?? null,
        body: [
          `Order ${updatedOrder.orderNumber} updated.`,
          status ? `Order status: ${status}.` : null,
          paymentStatus ? `Payment: ${paymentStatus}.` : null,
          fulfillmentStatus ? `Fulfillment: ${fulfillmentStatus}.` : null,
        ]
          .filter(Boolean)
          .join(" "),
      },
    });

    return updatedOrder;
  });
}

export async function createWebsiteOrder({
  userId,
  customer,
  items,
  orderNotes,
}: {
  userId?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  };
  items: Array<{
    slug: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  orderNotes?: string;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const orderNumber = generateOrderNumber();

  return prisma.$transaction(async (tx) => {
    let contactId: string | null = null;

    if (userId) {
      await tx.user.update({
        where: { id: userId },
        data: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone || null,
        },
      });

      const existingContact = await tx.crmContact.findUnique({
        where: { userId },
      });

      const contact = existingContact
        ? await tx.crmContact.update({
            where: { id: existingContact.id },
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone || null,
              leadSource: existingContact.leadSource || "website-checkout",
            },
          })
        : await tx.crmContact.create({
            data: {
              userId,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone || null,
              leadSource: "website-checkout",
              stage: ContactStage.LEAD,
            },
          });

      contactId = contact.id;

      const existingAddress = await tx.address.findFirst({
        where: {
          userId,
          type: AddressType.SHIPPING,
          line1: customer.addressLine1,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: customer.country || "US",
        },
      });

      if (!existingAddress) {
        const shippingCount = await tx.address.count({
          where: {
            userId,
            type: AddressType.SHIPPING,
          },
        });

        await tx.address.create({
          data: {
            userId,
            type: AddressType.SHIPPING,
            line1: customer.addressLine1,
            line2: customer.addressLine2 || null,
            city: customer.city,
            state: customer.state,
            postalCode: customer.postalCode,
            country: customer.country || "US",
            isDefault: shippingCount === 0,
          },
        });
      }
    } else {
      const existingContact = await tx.crmContact.findFirst({
        where: { email: customer.email },
      });

      const contact = existingContact
        ? await tx.crmContact.update({
            where: { id: existingContact.id },
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              phone: customer.phone || null,
              leadSource: existingContact.leadSource || "website-checkout",
            },
          })
        : await tx.crmContact.create({
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone || null,
              leadSource: "website-checkout",
              stage: ContactStage.LEAD,
            },
          });

      contactId = contact.id;
    }

    const order = await tx.order.create({
      data: {
        userId: userId ?? null,
        crmContactId: contactId,
        orderNumber,
        source: OrderSource.WEBSITE,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        fulfillmentStatus: FulfillmentStatus.UNFULFILLED,
        subtotal,
        total: subtotal,
        placedAt: new Date(),
        items: {
          create: items.map((item) => ({
            productNameSnapshot: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.unitPrice * item.quantity,
          })),
        },
      },
    });

    await tx.note.create({
      data: {
        orderId: order.id,
        contactId,
        authorUserId: userId ?? null,
        body: [
          `Website checkout submitted for ${customer.firstName} ${customer.lastName}.`,
          customer.company ? `Company/lab: ${customer.company}.` : null,
          `Ship to: ${customer.addressLine1}${customer.addressLine2 ? `, ${customer.addressLine2}` : ""}, ${customer.city}, ${customer.state} ${customer.postalCode}, ${customer.country || "US"}.`,
          orderNotes ? `Notes: ${orderNotes}` : null,
        ]
          .filter(Boolean)
          .join(" "),
      },
    });

    return order;
  });
}
