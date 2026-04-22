import Link from "next/link";
import { ArrowRight, MapPin, PackageSearch, Settings2, ShoppingBag, UserRound } from "lucide-react";

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

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Teragenix customer";

  return (
    <AccountShell title="Your account" subtitle="Orders, saved details, and addresses in one place.">
      <Card className="border border-slate-200 bg-white py-6 shadow-sm">
        <CardHeader className="gap-3 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#173f85]">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <CardDescription className="text-xs uppercase tracking-[0.14em] text-slate-500">Account</CardDescription>
              <CardTitle className="mt-1 text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">{displayName}</CardTitle>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600">Use this page to find your orders, review your saved info, and get back to shopping fast.</p>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Link href="/account/orders" className="tg-link-card rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2 text-slate-950">
                <PackageSearch className="h-4 w-4 text-[#173f85]" />
                <span className="text-sm font-semibold">Orders</span>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{user?.orders.length ?? 0}</p>
              <p className="mt-1 text-sm text-slate-600">View order history</p>
            </Link>

            <Link href="/account/settings" className="tg-link-card rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2 text-slate-950">
                <Settings2 className="h-4 w-4 text-[#173f85]" />
                <span className="text-sm font-semibold">Settings</span>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{user?.addresses.length ?? 0}</p>
              <p className="mt-1 text-sm text-slate-600">Saved addresses and details</p>
            </Link>

            <Link href="/shop" className="tg-link-card rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2 text-slate-950">
                <ShoppingBag className="h-4 w-4 text-[#173f85]" />
                <span className="text-sm font-semibold">Shop</span>
              </div>
              <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">Continue shopping</p>
              <p className="mt-1 text-sm text-slate-600">Back to the catalog</p>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <CardTitle className="text-slate-950">Recent orders</CardTitle>
              <CardDescription>Your latest purchases and current status.</CardDescription>
            </div>
            <Link href="/account/orders" className="tg-link-text text-sm font-medium text-[#173f85] hover:text-[#102e5d]">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {user?.orders.length ? (
              user.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="tg-link-card flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{order.orderNumber}</p>
                    <p className="mt-1 text-xs text-slate-500">Placed {formatOrderDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-950">{currency.format(Number(order.total))}</p>
                    <p className="mt-1 text-xs text-slate-500">{order.status}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#173f85] shadow-sm">
                  <PackageSearch className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-slate-950">No orders yet</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">When you place an order, it will show up here.</p>
                <Link href="/shop" className="tg-link-pill mt-4 inline-flex items-center gap-2 rounded-full bg-[#173f85] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#102e5d]">
                  Shop peptides
                  <ArrowRight className="tg-link-pill-icon h-4 w-4" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-slate-200 bg-white py-6 shadow-sm">
            <CardHeader className="border-b border-slate-200 pb-5">
              <CardTitle className="text-slate-950">Account details</CardTitle>
              <CardDescription>The information currently tied to this account.</CardDescription>
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
              <Link href="/account/settings" className="tg-link-text inline-flex items-center gap-2 text-sm font-medium text-[#173f85] hover:text-[#102e5d]">
                Open settings
                <ArrowRight className="tg-link-pill-icon h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white py-6 shadow-sm">
            <CardHeader className="border-b border-slate-200 pb-5">
              <CardTitle className="text-slate-950">Saved addresses</CardTitle>
              <CardDescription>Your shipping and billing destinations.</CardDescription>
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
        </div>
      </div>
    </AccountShell>
  );
}
