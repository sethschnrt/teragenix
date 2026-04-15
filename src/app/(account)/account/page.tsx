import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getServerAuthSession();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: {
      crmContact: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  return (
    <AccountShell
      title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
      subtitle="Your account is connected to your customer profile, orders, and future CRM history."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-tera-body">
            Role: {session?.user.role}
          </CardContent>
        </Card>
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>CRM stage</CardTitle>
            <CardDescription>Your internal relationship stage</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-tera-body">
            {user?.crmContact?.stage ?? "Not set"}
          </CardContent>
        </Card>
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent order count</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-tera-body">
            {user?.orders.length ?? 0} recent order(s)
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>Your latest Teragenix activity shows up here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {user?.orders.length ? (
              user.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-[1.2rem] border border-tera-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-tera-navy">{order.orderNumber}</p>
                    <p className="mt-1 text-xs text-tera-body">{order.status} • {order.paymentStatus}</p>
                  </div>
                  <span className="text-sm font-medium text-tera-navy">${Number(order.total).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-tera-body">No orders yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] py-5 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)]">
          <CardHeader>
            <CardTitle className="text-white">Account system</CardTitle>
            <CardDescription className="text-white/68">
              This area now shares data with the CRM and order system behind the storefront.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/84">
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
              Profile data can flow into future checkout and support workflows.
            </div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
              Orders you place will show up in both the customer area and internal ops side.
            </div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
              CRM linkage is already scaffolded so the account layer does not live in isolation.
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountShell>
  );
}
