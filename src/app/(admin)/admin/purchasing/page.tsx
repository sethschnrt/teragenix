import Link from "next/link";

import { ProcurementIntakeForm } from "@/components/admin/procurement-intake-form";
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
    year: "numeric",
  }).format(date);
}

export default async function AdminPurchasingPage() {
  const [items, linkedExpenses] = await Promise.all([
    prisma.procurementItem.findMany({
      include: {
        expenses: {
          select: {
            id: true,
            amount: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
      take: 100,
    }),
    prisma.expense.findMany({
      where: { procurementItemId: { not: null } },
      include: {
        procurementItem: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { expenseDate: "desc" },
      take: 12,
    }),
  ]);

  type ItemRecord = (typeof items)[number];
  type LinkedExpenseRecord = (typeof linkedExpenses)[number];

  const openItems = items.filter((item) => !["RECEIVED", "CANCELED"].includes(item.status));
  const closedItems = items.filter((item) => ["RECEIVED", "CANCELED"].includes(item.status));
  const orderedCount = items.filter((item) => item.status === "ORDERED").length;
  const estimatedOpenSpend = openItems.reduce((sum, item) => sum + Number(item.estimatedCost ?? 0), 0);
  const actualTrackedSpend = items.reduce((sum, item) => sum + Number(item.actualCost ?? 0), 0);

  const summaryItems = [
    { label: "Open", value: openItems.length.toString(), tone: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Ordered", value: orderedCount.toString(), tone: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Open spend", value: currency.format(estimatedOpenSpend), tone: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Tracked actual", value: currency.format(actualTrackedSpend), tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7175]">Product orders</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">Items to buy</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map((item) => (
            <div key={item.label} className={`rounded-xl border px-3 py-2 ${item.tone}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{item.label}</p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Open product orders</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {openItems.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No open product orders.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Item</th>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5">Needed</th>
                      <th className="px-3 py-2.5 text-right">Estimate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {openItems.map((item: ItemRecord) => (
                      <tr key={item.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{item.title}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{item.vendor || "-"}</td>
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

        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Add product order</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ProcurementIntakeForm />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-[#dfe3e8] bg-white py-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Linked expenses</CardTitle>
            <Link href="/admin/expenses?scope=procurement" className="text-xs font-medium text-[#0f62fe]">View in expenses</Link>
          </CardHeader>
          <CardContent className="pt-4">
            {linkedExpenses.length === 0 ? (
              <p className="text-sm text-[#6d7175]">No linked expenses yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Item</th>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Date</th>
                      <th className="px-3 py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {linkedExpenses.map((expense: LinkedExpenseRecord) => (
                      <tr key={expense.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{expense.procurementItem?.title || "-"}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{expense.vendor}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{formatDate(expense.expenseDate)}</td>
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
          <CardHeader className="border-b border-[#eceef0] pb-3">
            <CardTitle className="text-base text-[#202223]">Completed</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {closedItems.length === 0 ? (
              <p className="text-sm text-[#6d7175]">Nothing completed yet.</p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                <table className="min-w-full divide-y divide-[#e5e7eb] text-sm">
                  <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
                    <tr>
                      <th className="px-3 py-2.5">Item</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5 text-right">Actual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0] bg-white">
                    {closedItems.slice(0, 20).map((item: ItemRecord) => (
                      <tr key={item.id} className="hover:bg-[#f9fafb]">
                        <td className="px-3 py-3 font-medium text-[#202223]">{item.title}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{item.status}</td>
                        <td className="px-3 py-3 text-[#5c5f62]">{item.vendor || "-"}</td>
                        <td className="px-3 py-3 text-right font-medium text-[#202223]">{item.actualCost != null ? currency.format(Number(item.actualCost)) : "-"}</td>
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
