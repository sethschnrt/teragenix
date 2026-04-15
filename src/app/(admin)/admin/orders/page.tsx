import Link from "next/link";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      crmContact: true,
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-5">
      <div>
        <p className="tg-eyebrow">Orders</p>
        <h2 className="mt-3 text-3xl font-semibold text-tera-navy">Connected order management</h2>
        <p className="mt-2 text-sm text-tera-body">
          This phase wires orders directly to customer accounts and CRM contacts.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-tera-border bg-white">
        <div className="grid grid-cols-[minmax(0,1.3fr)_120px_120px_120px_110px] gap-4 border-b border-tera-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-tera-body">
          <div>Order</div>
          <div>Status</div>
          <div>Payment</div>
          <div>Customer</div>
          <div>Items</div>
        </div>

        {orders.length === 0 ? (
          <div className="px-5 py-6 text-sm text-tera-body">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="grid grid-cols-[minmax(0,1.3fr)_120px_120px_120px_110px] gap-4 border-b border-tera-border px-5 py-4 text-sm transition hover:bg-tera-blue-pale/40 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-tera-navy">{order.orderNumber}</p>
                <p className="truncate text-xs text-tera-body">${order.total.toString()}</p>
              </div>
              <div className="text-tera-body">{order.status}</div>
              <div className="text-tera-body">{order.paymentStatus}</div>
              <div className="truncate text-tera-body">{order.user?.email || order.crmContact?.email || "Unknown"}</div>
              <div className="text-tera-body">{order._count.items}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

