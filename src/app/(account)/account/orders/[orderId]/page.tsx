import { PackageCheck, ShieldCheck } from "lucide-react";

import { notFound } from "next/navigation";

import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

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
    <AccountShell title={order.orderNumber} subtitle="Customer-facing order detail tied directly to the shared Teragenix order system.">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <PackageCheck className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Items in this order</CardTitle>
            <CardDescription>Current order detail foundation for customer accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            {order.items.map((item: OrderItemRecord) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-tera-border px-4 py-3">
                <div>
                  <p className="font-medium text-tera-navy">{item.productNameSnapshot}</p>
                  <p className="text-xs text-tera-body">Qty {item.quantity}</p>
                </div>
                <p className="font-medium text-tera-navy">${item.lineTotal.toString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] py-5 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/10 ring-1 ring-white/12">
              <ShieldCheck className="h-5 w-5 text-[#a8c5f5]" />
            </div>
            <CardTitle className="text-white">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/84">
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
            <p>Order: {order.status}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
            <p>Payment: {order.paymentStatus}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
            <p>Fulfillment: {order.fulfillmentStatus}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
            <p>Total: ${order.total.toString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountShell>
  );
}
