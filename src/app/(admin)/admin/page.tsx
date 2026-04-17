import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(date: Date | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default async function AdminOverviewPage() {
  const [orders, expenses, recurringExpenses, productOrders, contactsCount, ordersCount, expensesCount] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: true,
        crmContact: true,
      },
    }),
    prisma.expense.findMany({
      orderBy: { expenseDate: "desc" },
      take: 8,
      include: {
        relatedOrder: true,
        procurementItem: true,
      },
    }),
    prisma.recurringExpense.findMany({
      where: { active: true },
      orderBy: { nextDueDate: "asc" },
      take: 8,
    }),
    prisma.procurementItem.findMany({
      where: {
        status: {
          notIn: ["RECEIVED", "CANCELED"],
        },
      },
      orderBy: [{ createdAt: "desc" }],
      take: 8,
    }),
    prisma.crmContact.count(),
    prisma.order.count(),
    prisma.expense.count(),
  ]);

  type OrderRecord = (typeof orders)[number];
  type ExpenseRecord = (typeof expenses)[number];
  type RecurringRecord = (typeof recurringExpenses)[number];
  type ProductOrderRecord = (typeof productOrders)[number];

  const recentExpenseTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const recurringMonthlyEstimate = recurringExpenses.reduce((sum, expense) => {
    const amount = Number(expense.amount);

    switch (expense.frequency) {
      case "YEARLY":
        return sum + amount / 12;
      case "QUARTERLY":
        return sum + amount / 3;
      default:
        return sum + amount;
    }
  }, 0);
  const openProductOrderSpend = productOrders.reduce((sum, item) => sum + Number(item.estimatedCost ?? 0), 0);

  const statItems = [
    { label: "Customer orders", value: ordersCount.toString(), tone: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Expenses", value: expensesCount.toString(), tone: "bg-violet-50 text-violet-700 border-violet-200" },
    { label: "Recurring monthly", value: currency.format(recurringMonthlyEstimate), tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { label: "Open product orders", value: currency.format(openProductOrderSpend), tone: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Contacts", value: contactsCount.toString(), tone: "bg-slate-100 text-slate-700 border-slate-200" },
    { label: "Recent spend shown", value: currency.format(recentExpenseTotal), tone: "bg-violet-50 text-violet-700 border-violet-200" },
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7175]">Overview</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">Whole business</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-3 xl:grid-cols-6">
          {statItems.map((item) => (
            <div key={item.label} className={`rounded-xl border px-3 py-2 ${item.tone}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{item.label}</p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Customer orders</CardTitle>
            <Link href="/admin/orders" className="text-xs font-medium text-[#0f62fe]">View all</Link>
          </CardHeader>
          <CardContent className="pt-4">
            {orders.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No orders yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Order</th>
                      <th className="px-3 py-2.5">Customer</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {orders.map((order: OrderRecord) => (
                      <tr key={order.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{order.orderNumber}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{order.user?.email || order.crmContact?.email || "Unknown"}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{order.status}</td>
                        <td className="px-3 py-3 text-right font-medium text-[#202223]">{currency.format(Number(order.total))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Expenses</CardTitle>
            <Link href="/admin/expenses" className="text-xs font-medium text-[#0f62fe]">View all</Link>
          </CardHeader>
          <CardContent className="pt-4">
            {expenses.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No expenses yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Tags</th>
                      <th className="px-3 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {expenses.map((expense: ExpenseRecord) => (
                      <tr key={expense.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{expense.vendor}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{expense.category}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {expense.procurementItem ? <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">Product order</span> : null}
                            {expense.relatedOrder ? <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">{expense.relatedOrder.orderNumber}</span> : null}
                            {!expense.procurementItem && !expense.relatedOrder ? <span className="text-xs text-[#9ca3af]">-</span> : null}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-[#202223]">{currency.format(Number(expense.amount))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Recurring</CardTitle>
            <Link href="/admin/expenses" className="text-xs font-medium text-[#0f62fe]">View all</Link>
          </CardHeader>
          <CardContent className="pt-4">
            {recurringExpenses.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No recurring expenses yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Due</th>
                      <th className="px-3 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {recurringExpenses.map((expense: RecurringRecord) => (
                      <tr key={expense.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{expense.vendor}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{expense.category}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{formatDate(expense.nextDueDate)}</td>
                        <td className="px-3 py-3 text-right font-medium text-[#202223]">{currency.format(Number(expense.amount))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Product orders</CardTitle>
            <Link href="/admin/purchasing" className="text-xs font-medium text-[#0f62fe]">View all</Link>
          </CardHeader>
          <CardContent className="pt-4">
            {productOrders.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No product orders yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Item</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5">Needed</th>
                      <th className="px-3 py-2.5 text-right">Estimate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {productOrders.map((item: ProductOrderRecord) => (
                      <tr key={item.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{item.title}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{item.status}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{formatDate(item.neededBy)}</td>
                        <td className="px-3 py-3 text-right font-medium text-[#202223]">{item.estimatedCost != null ? currency.format(Number(item.estimatedCost)) : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
