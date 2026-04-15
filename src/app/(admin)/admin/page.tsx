import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, PackageSearch, ShoppingCart, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(date: Date | null) {
  if (!date) {
    return "No date set";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default async function AdminOverviewPage() {
  const [
    contactsCount,
    ordersCount,
    expensesCount,
    recurringCount,
    openProcurementCount,
    receivedProcurementCount,
    openProcurementEstimate,
    contacts,
    orders,
    expenses,
    procurementItems,
  ] = await Promise.all([
    prisma.crmContact.count(),
    prisma.order.count(),
    prisma.expense.count(),
    prisma.recurringExpense.count({ where: { active: true } }),
    prisma.procurementItem.count({
      where: {
        status: {
          notIn: ["RECEIVED", "CANCELED"],
        },
      },
    }),
    prisma.procurementItem.count({ where: { status: "RECEIVED" } }),
    prisma.procurementItem.aggregate({
      where: {
        status: {
          notIn: ["RECEIVED", "CANCELED"],
        },
      },
      _sum: {
        estimatedCost: true,
      },
    }),
    prisma.crmContact.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: {
        user: true,
        crmContact: true,
      },
    }),
    prisma.expense.findMany({
      orderBy: { expenseDate: "desc" },
      take: 4,
      include: {
        procurementItem: true,
      },
    }),
    prisma.procurementItem.findMany({
      where: {
        status: {
          notIn: ["RECEIVED", "CANCELED"],
        },
      },
      orderBy: [{ createdAt: "desc" }],
      take: 4,
      include: {
        expenses: {
          select: {
            amount: true,
          },
        },
      },
    }),
  ]);

  const recentExpenseTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const projectedOpenSpend = Number(openProcurementEstimate._sum.estimatedCost ?? 0);

type OverviewContactRecord = (typeof contacts)[number];
type OverviewOrderRecord = (typeof orders)[number];
type OverviewExpenseRecord = (typeof expenses)[number];
type OverviewProcurementRecord = (typeof procurementItems)[number];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
          <p className="tg-eyebrow">Overview</p>
          <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
            Business tracking now spans CRM, orders, purchasing, and spend in one branded ops layer.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
            Teragenix is shifting toward real internal operations. The system now tracks what customers buy and what the business itself still needs to buy.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)] sm:p-7">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">SYSTEM READOUT</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Contacts</p>
              <p className="mt-2 text-2xl font-semibold text-white">{contactsCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Orders</p>
              <p className="mt-2 text-2xl font-semibold text-white">{ordersCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Open purchases</p>
              <p className="mt-2 text-2xl font-semibold text-white">{openProcurementCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Expenses</p>
              <p className="mt-2 text-2xl font-semibold text-white">{expensesCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Recurring</p>
              <p className="mt-2 text-2xl font-semibold text-white">{recurringCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Received</p>
              <p className="mt-2 text-2xl font-semibold text-white">{receivedProcurementCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "CRM pipeline",
            description: "New storefront accounts flow into contact records and can later tie to orders and tasks.",
            value: `${contactsCount} contacts`,
            icon: Users,
          },
          {
            title: "Order operations",
            description: "Order detail pages support status and fulfillment updates inside the shared system.",
            value: `${ordersCount} orders`,
            icon: PackageSearch,
          },
          {
            title: "Purchasing queue",
            description: "Track products and equipment that still need to be sourced, ordered, or received.",
            value: currency.format(projectedOpenSpend),
            icon: ShoppingCart,
          },
          {
            title: "Expense visibility",
            description: "Recent spend and recurring costs now connect back to real operational activity.",
            value: currency.format(recentExpenseTotal),
            icon: CircleDollarSign,
          },
        ].map((card) => (
          <Card key={card.title} className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
                <card.icon className="h-5 w-5 text-tera-blue" />
              </div>
              <CardTitle className="mt-4">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              <p className="pt-2 text-sm font-medium text-tera-navy">{card.value}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Recent contacts</CardTitle>
            <CardDescription>Latest storefront-linked people entering the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contacts.length === 0 ? (
              <p className="text-sm text-tera-body">No contacts yet.</p>
            ) : (
              contacts.map((contact: OverviewContactRecord) => (
                <Link
                  key={contact.id}
                  href={`/admin/crm/${contact.id}`}
                  className="flex items-center justify-between rounded-[1.2rem] border border-tera-border px-4 py-3 transition hover:bg-tera-blue-pale/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-tera-navy">
                      {[contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || "Unnamed contact"}
                    </p>
                    <p className="truncate text-xs text-tera-body">{contact.stage}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-tera-blue" />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>Most recent order activity inside the shared system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-sm text-tera-body">No orders yet.</p>
            ) : (
              orders.map((order: OverviewOrderRecord) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between rounded-[1.2rem] border border-tera-border px-4 py-3 transition hover:bg-tera-blue-pale/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-tera-navy">{order.orderNumber}</p>
                    <p className="truncate text-xs text-tera-body">
                      {order.user?.email || order.crmContact?.email || "Unknown customer"}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-tera-blue">{order.status}</span>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Purchasing queue</CardTitle>
            <CardDescription>Latest internal items that still need sourcing or receiving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            {procurementItems.length === 0 ? (
              <p>No purchase items yet.</p>
            ) : (
              procurementItems.map((item: OverviewProcurementRecord) => (
                <Link
                  key={item.id}
                  href="/admin/purchasing"
                  className="flex items-center justify-between rounded-[1.2rem] border border-tera-border px-4 py-3 transition hover:bg-tera-blue-pale/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-tera-navy">{item.title}</p>
                    <p className="truncate text-xs text-tera-body">
                      {item.category}
                      {item.neededBy ? ` • needed ${formatDate(item.neededBy)}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-tera-blue">{item.status}</p>
                    <p className="mt-1 text-xs text-tera-body">
                      {item.estimatedCost != null ? currency.format(Number(item.estimatedCost)) : "No estimate"}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Expense snapshot</CardTitle>
            <CardDescription>Quick view of the latest spend entries, including purchase-linked bills.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            {expenses.length === 0 ? (
              <p>No expenses yet.</p>
            ) : (
              expenses.map((expense: OverviewExpenseRecord) => (
                <div key={expense.id} className="rounded-[1.2rem] border border-tera-border px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-tera-navy">{expense.vendor}</p>
                    <p className="font-medium text-tera-navy">{currency.format(Number(expense.amount))}</p>
                  </div>
                  <p className="mt-1 text-xs text-tera-body">
                    {expense.category}
                    {expense.procurementItem?.title ? ` • ${expense.procurementItem.title}` : ""}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
