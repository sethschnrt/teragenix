import Link from "next/link";
import { ArrowUpRight, PackageSearch } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatOrderDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function AccountOrdersPage() {
  const session = await getServerAuthSession();

  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  type AccountOrderRecord = (typeof orders)[number];

  return (
    <AccountShell title="Orders" subtitle="Track current and past purchases with the clean customer-side order history you expect from a premium store.">
      <Card className="border border-slate-200 bg-white py-6 shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <CardTitle className="text-slate-950">Order history</CardTitle>
            <CardDescription>Every Teragenix order tied to this account.</CardDescription>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {orders.length} order{orders.length === 1 ? "" : "s"}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#173f85] shadow-sm">
                <PackageSearch className="h-5 w-5" />
              </div>
              <p className="mt-4 text-base font-medium text-slate-950">No orders yet</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">When you place your first order, it will show up here with status and total.</p>
              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#173f85] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#102e5d]"
              >
                Go to shop
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            orders.map((order: AccountOrderRecord) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950">{order.orderNumber}</p>
                  <p className="mt-1 text-xs text-slate-500">Placed {formatOrderDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-950">{currency.format(Number(order.total))}</p>
                  <p className="mt-1 text-xs text-slate-500">{order.status} • {order.paymentStatus}</p>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </AccountShell>
  );
}
