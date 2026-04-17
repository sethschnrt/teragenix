import Link from "next/link";
import { CircleDollarSign, Funnel, Package, Plus, ReceiptText, RefreshCw, Search, Tags } from "lucide-react";

import { ExpenseEntryForm } from "@/components/admin/expense-entry-form";
import { RecurringExpenseForm } from "@/components/admin/recurring-expense-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function normalizeScope(value?: string) {
  switch (value) {
    case "procurement":
    case "software":
    case "ops":
      return value;
    default:
      return "all";
  }
}

export default async function AdminExpensesPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; scope?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = resolvedSearchParams?.q?.trim() ?? "";
  const scope = normalizeScope(resolvedSearchParams?.scope);

  const scopeWhere =
    scope === "procurement"
      ? { procurementItemId: { not: null } }
      : scope === "software"
        ? {
            OR: [
              { category: { contains: "software", mode: "insensitive" as const } },
              { category: { contains: "subscription", mode: "insensitive" as const } },
              { category: { contains: "infra", mode: "insensitive" as const } },
              { vendor: { contains: "openai", mode: "insensitive" as const } },
              { vendor: { contains: "vercel", mode: "insensitive" as const } },
            ],
          }
        : scope === "ops"
          ? {
              OR: [
                { category: { contains: "shipping", mode: "insensitive" as const } },
                { category: { contains: "packaging", mode: "insensitive" as const } },
                { category: { contains: "fulfillment", mode: "insensitive" as const } },
                { category: { contains: "logistics", mode: "insensitive" as const } },
              ],
            }
          : undefined;

  const textWhere = query
    ? {
        OR: [
          { vendor: { contains: query, mode: "insensitive" as const } },
          { category: { contains: query, mode: "insensitive" as const } },
          { paymentMethod: { contains: query, mode: "insensitive" as const } },
          { notes: { contains: query, mode: "insensitive" as const } },
          { relatedOrder: { is: { orderNumber: { contains: query, mode: "insensitive" as const } } } },
          { procurementItem: { is: { title: { contains: query, mode: "insensitive" as const } } } },
        ],
      }
    : undefined;

  const filters: Prisma.ExpenseWhereInput[] = [];

  if (scopeWhere) {
    filters.push(scopeWhere);
  }

  if (textWhere) {
    filters.push(textWhere);
  }

  const where: Prisma.ExpenseWhereInput | undefined = filters.length > 0 ? { AND: filters } : undefined;

  const [expenses, recurringExpenses, recentOrders, procurementItems, allExpenses] = await Promise.all([
    prisma.expense.findMany({
      where,
      include: {
        relatedOrder: true,
        procurementItem: true,
      },
      orderBy: { expenseDate: "desc" },
      take: 100,
    }),
    prisma.recurringExpense.findMany({
      where: { active: true },
      orderBy: [{ nextDueDate: "asc" }, { vendor: "asc" }],
      take: 20,
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
      orderBy: [{ createdAt: "desc" }],
      take: 20,
      select: {
        id: true,
        title: true,
        status: true,
      },
    }),
    prisma.expense.findMany({
      select: {
        category: true,
      },
      orderBy: { expenseDate: "desc" },
      take: 200,
    }),
  ]);

  const totalSpend = expenses.reduce((sum: number, expense: (typeof expenses)[number]) => sum + Number(expense.amount), 0);
  const recurringMonthlyEstimate = recurringExpenses.reduce((sum: number, expense: (typeof recurringExpenses)[number]) => {
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
  const procurementLinkedCount = expenses.filter((expense: (typeof expenses)[number]) => expense.procurementItemId).length;

  type ExpenseLedgerRecord = (typeof expenses)[number];
  type RecurringExpenseRecord = (typeof recurringExpenses)[number];

  const categoryCounts = new Map<string, number>();
  for (const expense of allExpenses) {
    const key = expense.category.trim();
    if (!key) continue;
    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1);
  }
  const topCategories = [...categoryCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([category]) => category);

  const scopes = [
    { key: "all", label: "All expenses" },
    { key: "procurement", label: "Product orders" },
    { key: "software", label: "Software" },
    { key: "ops", label: "Ops" },
  ] as const;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm lg:px-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Expenses</p>
            <h2 className="mt-1 text-[1.7rem] font-semibold tracking-[-0.03em] text-slate-950">Expense log</h2>
            <p className="mt-1 text-sm text-slate-600">Table first, filters first, recurring visible immediately.</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-violet-700">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Displayed spend</p>
              <p className="mt-1 text-sm font-semibold">{currency.format(totalSpend)}</p>
              <p className="text-[11px] opacity-80">{expenses.length} rows</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Recurring monthly</p>
              <p className="mt-1 text-sm font-semibold">{currency.format(recurringMonthlyEstimate)}</p>
              <p className="text-[11px] opacity-80">{recurringExpenses.length} active</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Product-order linked</p>
              <p className="mt-1 text-sm font-semibold">{procurementLinkedCount}</p>
              <p className="text-[11px] opacity-80">Procurement tags</p>
            </div>
          </div>
        </div>
      </section>

      <Card className="border border-slate-200 bg-white py-3 shadow-sm">
        <CardHeader className="border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base text-slate-950">Recurring expenses</CardTitle>
              <CardDescription>Compact recurring view so you can see subscriptions without scrolling to the bottom.</CardDescription>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
              <RefreshCw className="h-3.5 w-3.5" />
              {currency.format(recurringMonthlyEstimate)}/mo
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {recurringExpenses.length === 0 ? (
            <p className="text-sm text-slate-600">No recurring expenses yet.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <tr>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Frequency</th>
                      <th className="px-3 py-2.5">Next due</th>
                      <th className="px-3 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {recurringExpenses.map((expense: RecurringExpenseRecord) => (
                      <tr key={expense.id} className="hover:bg-slate-50/80">
                        <td className="px-3 py-3 font-medium text-slate-950">{expense.vendor}</td>
                        <td className="px-3 py-3">
                          <span className="inline-flex rounded-full bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{expense.frequency}</td>
                        <td className="px-3 py-3 text-slate-700">{formatDate(expense.nextDueDate)}</td>
                        <td className="px-3 py-3 text-right font-medium text-slate-950">{currency.format(Number(expense.amount))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border border-slate-200 bg-white py-3 shadow-sm">
        <CardHeader className="border-b border-slate-200 pb-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle className="text-base text-slate-950">Expense ledger</CardTitle>
              <CardDescription>This is the main log for product orders, software, shipping, and business spend.</CardDescription>
            </div>
            <form className="flex w-full max-w-2xl items-center gap-2" action="/admin/expenses" method="get">
              <input type="hidden" name="scope" value={scope} />
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search vendor, category, order, or purchase item"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#173f85] focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-lg bg-[#173f85] px-4 text-sm font-medium text-white hover:bg-[#102e5d]"
              >
                Search
              </button>
              {(query || scope !== "all") ? (
                <Link
                  href="/admin/expenses"
                  className="inline-flex h-10 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </Link>
              ) : null}
            </form>
          </div>

          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                <Funnel className="h-3.5 w-3.5" />
                Filters
              </div>
              {scopes.map((item) => (
                <Link
                  key={item.key}
                  href={{
                    pathname: "/admin/expenses",
                    query: {
                      ...(query ? { q: query } : {}),
                      ...(item.key !== "all" ? { scope: item.key } : {}),
                    },
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    scope === item.key ? "bg-[#173f85] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                <Tags className="h-3.5 w-3.5" />
                Top tags
              </div>
              {topCategories.map((category) => (
                <Link
                  key={category}
                  href={{ pathname: "/admin/expenses", query: { q: category, ...(scope !== "all" ? { scope } : {}) } }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    query.toLowerCase() === category.toLowerCase()
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {expenses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
              <p className="text-sm font-medium text-slate-950">No expenses match this view</p>
              <p className="mt-1 text-sm text-slate-600">Clear the filters or log the first expense below.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <tr>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Tags</th>
                      <th className="px-3 py-2.5">Date</th>
                      <th className="px-3 py-2.5">Method</th>
                      <th className="px-3 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {expenses.map((expense: ExpenseLedgerRecord) => (
                      <tr key={expense.id} className="align-top hover:bg-slate-50/80">
                        <td className="px-3 py-3">
                          <div>
                            <p className="font-medium text-slate-950">{expense.vendor}</p>
                            {expense.notes ? <p className="mt-1 max-w-[300px] text-xs leading-5 text-slate-500">{expense.notes}</p> : null}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="inline-flex rounded-full bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {expense.procurementItem?.title ? (
                              <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                                Product order
                              </span>
                            ) : null}
                            {expense.relatedOrder?.orderNumber ? (
                              <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                                {expense.relatedOrder.orderNumber}
                              </span>
                            ) : null}
                            {expense.procurementItem?.title ? (
                              <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                                {expense.procurementItem.title}
                              </span>
                            ) : null}
                            {!expense.procurementItem?.title && !expense.relatedOrder?.orderNumber ? (
                              <span className="text-xs text-slate-400">-</span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{formatDate(expense.expenseDate)}</td>
                        <td className="px-3 py-3 text-slate-700">{expense.paymentMethod || "-"}</td>
                        <td className="px-3 py-3 text-right font-medium text-slate-950">
                          {currency.format(Number(expense.amount))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_0.8fr]">
        <Card id="expense-form" className="border border-slate-200 bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base text-slate-950">Quick add expense</CardTitle>
                <CardDescription>Fast entry for product orders, vendors, shipping, software, and ops.</CardDescription>
              </div>
              <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                <Package className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ExpenseEntryForm recentOrders={recentOrders} procurementItems={procurementItems} />
          </CardContent>
        </Card>

        <Card id="recurring-form" className="border border-slate-200 bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base text-slate-950">Add recurring</CardTitle>
                <CardDescription>Only for subscriptions and fixed renewals.</CardDescription>
              </div>
              <a
                href="#recurring-form"
                className="inline-flex items-center gap-2 rounded-lg bg-[#173f85] px-3 py-2 text-xs font-medium text-white hover:bg-[#102e5d]"
              >
                <Plus className="h-3.5 w-3.5" />
                New recurring
              </a>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <RecurringExpenseForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
