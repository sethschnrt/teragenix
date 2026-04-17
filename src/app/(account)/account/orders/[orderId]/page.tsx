import { PackageCheck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

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

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await getServerAuthSession();
  const { orderId } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session!.user.id,
    },
    include: {
      items: true,
    },
  });

  type OrderItemRecord = NonNullable<typeof order>["items"][number];

  if (!order) {
    notFound();
  }

  return (
    <AccountShell title={order.orderNumber} subtitle={`Placed ${formatOrderDate(order.createdAt)}. Review items, totals, and fulfillment status.`}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#173f85]">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-slate-950">Items in this order</CardTitle>
                <CardDescription>Your purchased products and quantities.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
            {order.items.map((item: OrderItemRecord) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-4">
                <div>
                  <p className="font-medium text-slate-950">{item.productNameSnapshot}</p>
                  <p className="mt-1 text-xs text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="font-medium text-slate-950">{currency.format(Number(item.lineTotal))}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-[#d8e3f6] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] py-6 shadow-sm">
          <CardHeader className="border-b border-[#d8e3f6] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#173f85] ring-1 ring-[#d8e3f6]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-slate-950">Order summary</CardTitle>
                <CardDescription className="text-slate-600">Current status for this purchase.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Order status</p>
              <p className="mt-1 font-medium text-slate-950">{order.status}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Payment</p>
              <p className="mt-1 font-medium text-slate-950">{order.paymentStatus}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Fulfillment</p>
              <p className="mt-1 font-medium text-slate-950">{order.fulfillmentStatus}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Order total</p>
              <p className="mt-1 font-medium text-slate-950">{currency.format(Number(order.total))}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountShell>
  );
}
