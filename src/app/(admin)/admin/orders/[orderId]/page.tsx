import Link from "next/link";
import { ArrowUpRight, ClipboardList, PackageCheck, UserRound } from "lucide-react";

import { notFound } from "next/navigation";

import { OrderStatusForm } from "@/components/admin/order-status-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      crmContact: true,
      items: true,
      notes: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
          <p className="tg-eyebrow">Order</p>
          <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
            {order.orderNumber}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
            Internal order management now shares the same clean Teragenix language as the storefront instead of falling back to a generic admin screen.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)] sm:p-7">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">ORDER STATUS</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Order</p>
              <p className="mt-2 text-sm font-medium text-white/88">{order.status}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Payment</p>
              <p className="mt-2 text-sm font-medium text-white/88">{order.paymentStatus}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Fulfillment</p>
              <p className="mt-2 text-sm font-medium text-white/88">{order.fulfillmentStatus}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Items</p>
              <p className="mt-2 text-sm font-medium text-white/88">{order.items.length}</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <CardTitle>Manage status</CardTitle>
          <CardDescription>Admin and sales users can update order state here.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStatusForm
            orderId={order.id}
            status={order.status}
            paymentStatus={order.paymentStatus}
            fulfillmentStatus={order.fulfillmentStatus}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <UserRound className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-tera-body">
            <p>Email: {order.user?.email || order.crmContact?.email || "Unknown"}</p>
            <p>CRM stage: {order.crmContact?.stage || "Not linked"}</p>
            <p>Source: {order.source}</p>
            {order.crmContactId ? (
              <Link href={`/admin/crm/${order.crmContactId}`} className="inline-flex items-center gap-2 pt-1 text-sm font-medium text-tera-blue">
                Open CRM record
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)] lg:col-span-2">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <PackageCheck className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            {order.items.length === 0 ? (
              <p>No order items yet.</p>
            ) : (
              order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-tera-border px-4 py-3">
                  <div>
                    <p className="font-medium text-tera-navy">{item.productNameSnapshot}</p>
                    <p className="text-xs text-tera-body">Qty {item.quantity}</p>
                  </div>
                  <p className="font-medium text-tera-navy">${item.lineTotal.toString()}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
            <ClipboardList className="h-5 w-5 text-tera-blue" />
          </div>
          <CardTitle>Order notes</CardTitle>
          <CardDescription>Status updates and timeline notes will collect here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-tera-body">
          {order.notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            order.notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-tera-border px-4 py-3">
                <p>{note.body}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
