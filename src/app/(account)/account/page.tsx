import Link from "next/link";
import { ArrowUpRight, MapPin, PackageSearch, ShieldCheck, UserRound } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniBarChart, MiniLineChart, MiniProgressChart } from "@/components/ui/charts";
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

function getMonthBuckets(count: number) {
  const months: { key: string; label: string }[] = [];
  const now = new Date();

  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleString("en-US", { month: "short" }),
    });
  }

  return months;
}

export default async function AccountPage() {
  const session = await getServerAuthSession();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: {
      addresses: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const orderHistory = await prisma.order.findMany({
    where: { userId: session!.user.id },
    select: {
      createdAt: true,
      total: true,
      status: true,
      paymentStatus: true,
    },
    orderBy: { createdAt: "asc" },
  });

  type AccountPageOrderRecord = NonNullable<typeof user>["orders"][number];

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Teragenix customer";
  const monthBuckets = getMonthBuckets(6);
  const ordersByMonth = monthBuckets.map((bucket) => ({
    label: bucket.label,
    value: orderHistory.filter((order) => `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}` === bucket.key).length,
  }));
  const spendByMonth = monthBuckets.map((bucket) => ({
    label: bucket.label,
    value: orderHistory
      .filter((order) => `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}` === bucket.key)
      .reduce((sum, order) => sum + Number(order.total), 0),
  }));
  const statusBreakdown = ["PENDING", "PAID", "FULFILLED", "SHIPPED", "DELIVERED", "CANCELED"]
    .map((status) => ({
      label: status.charAt(0) + status.slice(1).toLowerCase(),
      value: orderHistory.filter((order) => order.status === status).length,
    }))
    .filter((item) => item.value > 0);

  return (
    <AccountShell
      title="My account"
      subtitle="Review recent orders, account details, and saved information in one clean customer area."
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="gap-3 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#173f85]">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <CardDescription className="text-xs uppercase tracking-[0.14em] text-slate-500">Account overview</CardDescription>
                <CardTitle className="mt-1 text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">Welcome back, {displayName}</CardTitle>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              This is your customer hub. Track purchases, check saved details, and jump back into the storefront fast.
            </p>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Orders</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{user?.orders.length ?? 0}</p>
                <p className="mt-1 text-sm text-slate-600">Recent purchases</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Addresses</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{user?.addresses.length ?? 0}</p>
                <p className="mt-1 text-sm text-slate-600">Saved address book</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Account</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">Active</p>
                <p className="mt-1 text-sm text-slate-600">Signed in and ready</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/account/orders"
                className="inline-flex items-center gap-2 rounded-full bg-[#173f85] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#102e5d]"
              >
                View orders
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-5">
            <CardDescription className="text-xs uppercase tracking-[0.14em] text-slate-500">Account details</CardDescription>
            <CardTitle className="text-slate-950">Saved information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5 text-sm text-slate-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
              <p className="mt-1 font-medium text-slate-950">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Name</p>
              <p className="mt-1 font-medium text-slate-950">{displayName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</p>
              <p className="mt-1 font-medium text-slate-950">{user?.phone || "Not saved yet"}</p>
            </div>
            <div className="rounded-2xl border border-[#d8e3f6] bg-[#f8fbff] px-4 py-4">
              <div className="flex items-center gap-2 text-[#173f85]">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-sm font-medium">Account access is active</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Settings and address editing are the next layer. For now, this shows the data currently tied to your account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="border border-slate-200 bg-white py-5 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-slate-950">Orders over time</CardTitle>
            <CardDescription>How often you have placed orders in the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniBarChart data={ordersByMonth} />
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white py-5 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-slate-950">Spend trend</CardTitle>
            <CardDescription>Order total trend across the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniLineChart data={spendByMonth} formatter={(value) => currency.format(value)} />
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white py-5 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-slate-950">Order status mix</CardTitle>
            <CardDescription>How your order history currently breaks down.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniProgressChart data={statusBreakdown} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <CardTitle className="text-slate-950">Recent orders</CardTitle>
              <CardDescription>Your latest Teragenix purchases and statuses.</CardDescription>
            </div>
            <Link href="/account/orders" className="text-sm font-medium text-[#173f85] hover:text-[#102e5d]">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {user?.orders.length ? (
              user.orders.map((order: AccountPageOrderRecord) => (
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
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#173f85] shadow-sm">
                  <PackageSearch className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-slate-950">No orders yet</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Once you place an order, it will show up here with status and payment details.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#173f85] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#102e5d]"
                >
                  Explore the shop
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-slate-200 bg-white py-6 shadow-sm">
            <CardHeader className="border-b border-slate-200 pb-5">
              <CardTitle className="text-slate-950">Address book</CardTitle>
              <CardDescription>Shipping and billing destinations saved to your account.</CardDescription>
            </CardHeader>
            <CardContent className="pt-5 text-sm text-slate-600">
              {user?.addresses.length ? (
                <div className="space-y-3">
                  {user.addresses.slice(0, 2).map((address) => (
                    <div key={address.id} className="rounded-2xl border border-slate-200 px-4 py-4">
                      <div className="flex items-center gap-2 text-slate-950">
                        <MapPin className="h-4 w-4 text-[#173f85]" />
                        <span className="font-medium">{address.type}</span>
                      </div>
                      <p className="mt-2 leading-6 text-slate-600">
                        {address.line1}, {address.city}, {address.state} {address.postalCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No saved addresses yet.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border border-[#d8e3f6] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] py-6 shadow-sm">
            <CardHeader className="border-b border-[#d8e3f6] pb-5">
              <CardTitle className="text-slate-950">Teragenix perks</CardTitle>
              <CardDescription className="text-slate-600">Fast access back into the storefront.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
              <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">Premium store styling, cleaner customer account flow.</div>
              <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">Orders and saved details live in one place.</div>
              <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">More account editing tools can layer in without redesigning this surface.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountShell>
  );
}
