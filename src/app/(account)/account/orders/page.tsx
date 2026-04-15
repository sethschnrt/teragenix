import Link from "next/link";

import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage() {
  const session = await getServerAuthSession();

  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

type AccountOrderRecord = (typeof orders)[number];

  return (
    <AccountShell title="Your orders" subtitle="This will become the customer-facing order history for Teragenix accounts.">
      <Card className="border border-tera-border bg-white">
        <CardHeader>
          <CardTitle>Order history</CardTitle>
          <CardDescription>Connected directly to the shared ops database.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-tera-body">
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order: AccountOrderRecord) => (
              <Link key={order.id} href={`/account/orders/${order.id}`} className="flex items-center justify-between rounded-lg border border-tera-border px-4 py-3 transition hover:bg-tera-blue-pale/40">
                <div>
                  <p className="font-medium text-tera-navy">{order.orderNumber}</p>
                  <p className="text-xs text-tera-body">{order.status} • {order.paymentStatus}</p>
                </div>
                <p className="font-medium text-tera-navy">${order.total.toString()}</p>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </AccountShell>
  );
}
