import { CircleDollarSign, ReceiptText, RefreshCw } from "lucide-react";

import { ExpenseEntryForm } from "@/components/admin/expense-entry-form";
import { RecurringExpenseCard } from "@/components/admin/recurring-expense-card";
import { RecurringExpenseForm } from "@/components/admin/recurring-expense-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AdminExpensesPage() {
  const [expenses, recurringExpenses, recentOrders, procurementItems] = await Promise.all([
    prisma.expense.findMany({
      include: {
        relatedOrder: true,
        procurementItem: true,
      },
      orderBy: { expenseDate: "desc" },
      take: 24,
    }),
    prisma.recurringExpense.findMany({
      where: { active: true },
      orderBy: { nextDueDate: "asc" },
      take: 12,
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        orderNumber: true,
      },
    }),
    prisma.procurementItem.findMany({
      where: {
        status: {
          notIn: ["RECEIVED", "CANCELED"],
        },
      },
      orderBy: [
        { createdAt: "desc" },
      ],
      take: 20,
      select: {
        id: true,
        title: true,
        status: true,
      },
    }),
  ]);

  const totalSpend = expenses.reduce((sum: number, expense: (typeof expenses)[number]) => sum + Number(expense.amount), 0);
  const procurementLinkedSpend = expenses
    .filter((expense: (typeof expenses)[number]) => expense.procurementItemId)
    .reduce((sum: number, expense: (typeof expenses)[number]) => sum + Number(expense.amount), 0);

type ExpenseLedgerRecord = (typeof expenses)[number];
type RecurringExpenseRecord = (typeof recurringExpenses)[number];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
          <p className="tg-eyebrow">Expenses</p>
          <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
            Spend tracking that feels like part of the Teragenix product, not a bolt-on dashboard.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
            Variable expenses, recurring software costs, and purchasing-linked spend now have a real branded surface to grow into.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)] sm:p-7">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">SPEND SUMMARY</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Recent spend</p>
              <p className="mt-2 text-2xl font-semibold text-white">{currency.format(totalSpend)}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Recurring items</p>
              <p className="mt-2 text-2xl font-semibold text-white">{recurringExpenses.length}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Purchase-linked</p>
              <p className="mt-2 text-2xl font-semibold text-white">{currency.format(procurementLinkedSpend)}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Next due</p>
              <p className="mt-2 text-sm font-medium text-white/88">
                {recurringExpenses[0]
                  ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(recurringExpenses[0].nextDueDate)
                  : "None yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Variable spend",
            description: "Log one-off packaging, software, purchasing, and fulfillment costs as they happen.",
            icon: ReceiptText,
          },
          {
            title: "Recurring costs",
            description: "Track monthly and annual tools without losing renewal timing.",
            icon: RefreshCw,
          },
          {
            title: "Order attribution",
            description: "Tie expenses back to purchase items or orders when you need cleaner business tracking.",
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
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Log a one-off expense</CardTitle>
            <CardDescription>Capture shipping, packaging, purchasing, or fulfillment costs and link them to the right ops record.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseEntryForm recentOrders={recentOrders} procurementItems={procurementItems} />
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Add a recurring expense</CardTitle>
            <CardDescription>Track the predictable subscriptions and infra costs you do not want to forget.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecurringExpenseForm />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Recent expense ledger</CardTitle>
            <CardDescription>Dense, readable, and consistent with the storefront’s visual language.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-sm text-tera-body">No expenses recorded yet.</p>
            ) : (
              expenses.map((expense: ExpenseLedgerRecord) => (
                <div
                  key={expense.id}
                  className="grid gap-3 rounded-[1.2rem] border border-tera-border px-4 py-4 sm:grid-cols-[minmax(0,1fr)_120px_110px] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-tera-navy">{expense.vendor}</p>
                    <p className="mt-1 text-xs text-tera-body">
                      {expense.category}
                      {expense.procurementItem?.title ? ` • ${expense.procurementItem.title}` : ""}
                      {expense.relatedOrder?.orderNumber ? ` • ${expense.relatedOrder.orderNumber}` : ""}
                    </p>
                  </div>
                  <div className="text-xs text-tera-body">
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(expense.expenseDate)}
                  </div>
                  <div className="text-sm font-medium text-tera-navy">{currency.format(Number(expense.amount))}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Upcoming recurring expenses</CardTitle>
            <CardDescription>Renewals and predictable cost obligations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recurringExpenses.length === 0 ? (
              <p className="text-sm text-tera-body">No recurring expenses yet.</p>
            ) : (
              recurringExpenses.map((expense: RecurringExpenseRecord) => (
                <RecurringExpenseCard
                  key={expense.id}
                  expense={{
                    id: expense.id,
                    vendor: expense.vendor,
                    category: expense.category,
                    frequency: expense.frequency,
                    amount: Number(expense.amount),
                    nextDueDate: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(expense.nextDueDate),
                    active: expense.active,
                  }}
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
