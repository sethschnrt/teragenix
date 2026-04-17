import Link from "next/link";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function statusChip(status: string) {
  const palette: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700",
    PAID: "bg-emerald-50 text-emerald-700",
    FULFILLED: "bg-sky-50 text-sky-700",
    SHIPPED: "bg-blue-50 text-blue-700",
    DELIVERED: "bg-violet-50 text-violet-700",
    CANCELED: "bg-rose-50 text-rose-700",
    REFUNDED: "bg-slate-100 text-slate-700",
    UNPAID: "bg-amber-50 text-amber-700",
    FAILED: "bg-rose-50 text-rose-700",
  };

  return palette[status] || "bg-slate-100 text-slate-700";
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

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
    take: 100,
  });

  type AdminOrderRow = (typeof orders)[number];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7175]">Orders</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">Customer orders</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Total</p>
            <p className="mt-1 text-sm font-semibold">{orders.length}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Paid</p>
            <p className="mt-1 text-sm font-semibold">{orders.filter((order) => order.paymentStatus === "PAID").length}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Pending</p>
            <p className="mt-1 text-sm font-semibold">{orders.filter((order) => order.status === "PENDING").length}</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-violet-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Fulfilled</p>
            <p className="mt-1 text-sm font-semibold">{orders.filter((order) => ["FULFILLED", "SHIPPED", "DELIVERED"].includes(order.status)).length}</p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-[#dfe3e8] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#eceef0] text-sm">
            <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
              <tr>
                <th className="px-3 py-2.5">Order</th>
                <th className="px-3 py-2.5">Customer</th>
                <th className="px-3 py-2.5">Order status</th>
                <th className="px-3 py-2.5">Payment</th>
                <th className="px-3 py-2.5 text-right">Items</th>
                <th className="px-3 py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0] bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-[#6d7175]">No orders yet.</td>
                </tr>
              ) : (
                orders.map((order: AdminOrderRow) => (
                  <tr key={order.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-[#202223] hover:text-[#0f62fe]">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-[#5c5f62]">{order.user?.email || order.crmContact?.email || "Unknown"}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${statusChip(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${statusChip(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-[#5c5f62]">{order._count.items}</td>
                    <td className="px-3 py-3 text-right font-medium text-[#202223]">{currency.format(Number(order.total))}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
