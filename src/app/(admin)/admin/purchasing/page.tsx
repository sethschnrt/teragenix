import { ArrowUpRight, PackagePlus, ReceiptText, Truck, Waypoints } from "lucide-react";

import { ProcurementIntakeForm } from "@/components/admin/procurement-intake-form";
import { ProcurementItemCard } from "@/components/admin/procurement-item-card";
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
      orderBy: [
        { createdAt: "desc" },
      ],
      take: 36,
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
      take: 6,
    }),
  ]);

  const openItems = items.filter((item: (typeof items)[number]) => !["RECEIVED", "CANCELED"].includes(item.status));
  const closedItems = items.filter((item: (typeof items)[number]) => ["RECEIVED", "CANCELED"].includes(item.status));
  const orderedCount = items.filter((item: (typeof items)[number]) => item.status === "ORDERED").length;
  const estimatedOpenSpend = openItems.reduce((sum: number, item: (typeof openItems)[number]) => sum + Number(item.estimatedCost ?? 0), 0);
  const actualTrackedSpend = items.reduce((sum: number, item: (typeof items)[number]) => sum + Number(item.actualCost ?? 0), 0);
  const nextNeed = [...openItems]
    .filter((item: (typeof openItems)[number]) => item.neededBy)
    .sort((left: (typeof openItems)[number], right: (typeof openItems)[number]) => Number(left.neededBy) - Number(right.neededBy))[0];
  const linkedExpenseTotal = linkedExpenses.reduce((sum: number, expense: (typeof linkedExpenses)[number]) => sum + Number(expense.amount), 0);

type PurchasingItemRecord = (typeof items)[number];
type LinkedExpenseRecord = (typeof linkedExpenses)[number];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
          <p className="tg-eyebrow">Purchasing</p>
          <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
            Internal purchasing that tracks products, equipment, and spend in one Teragenix ops layer.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
            Build the buy list, move items through sourcing and ordering, then connect the actual expense when the bill lands.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)] sm:p-7">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">PROCUREMENT READOUT</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Open items</p>
              <p className="mt-2 text-2xl font-semibold text-white">{openItems.length}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">On order</p>
              <p className="mt-2 text-2xl font-semibold text-white">{orderedCount}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Estimated open spend</p>
              <p className="mt-2 text-2xl font-semibold text-white">{currency.format(estimatedOpenSpend)}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Next needed</p>
              <p className="mt-2 text-sm font-medium text-white/88">{nextNeed ? formatDate(nextNeed.neededBy) : "Nothing scheduled"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Need capture",
            description: "Track products, supplies, and equipment before they disappear into Slack or memory.",
            icon: PackagePlus,
          },
          {
            title: "Workflow state",
            description: "Move each line item through backlog, sourcing, ordered, and received with real dates.",
            icon: Waypoints,
          },
          {
            title: "Expense follow-through",
            description: "Tie the spend entry back to the purchase item so planning and actual cost stay connected.",
            icon: ReceiptText,
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

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Add a purchasing item</CardTitle>
            <CardDescription>Start with what needs to be bought, who it likely comes from, and the expected cost.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProcurementIntakeForm />
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <CardTitle>Purchase spend sync</CardTitle>
            <CardDescription>Recent expense entries already connected back to purchasing records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-[1.2rem] bg-[#f8fbff] px-4 py-4 ring-1 ring-[#dbe6f5]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-tera-body">Linked spend total</p>
              <p className="mt-2 text-2xl font-semibold text-tera-navy">{currency.format(linkedExpenseTotal)}</p>
              <p className="mt-2 text-sm text-tera-body">Use the expense form to attach vendor bills and receipts back to the original purchasing line item.</p>
            </div>

            {linkedExpenses.length === 0 ? (
              <p className="text-sm text-tera-body">No purchase-linked expenses yet.</p>
            ) : (
              linkedExpenses.map((expense: LinkedExpenseRecord) => (
                <div key={expense.id} className="rounded-[1.2rem] border border-tera-border px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-tera-navy">{expense.procurementItem?.title || expense.vendor}</p>
                      <p className="truncate text-xs text-tera-body">{expense.vendor} • {formatDate(expense.expenseDate)}</p>
                    </div>
                    <div className="text-sm font-medium text-tera-navy">{currency.format(Number(expense.amount))}</div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="tg-eyebrow">Open pipeline</p>
            <h3 className="mt-2 text-2xl font-semibold text-tera-navy">What still needs action</h3>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-tera-body ring-1 ring-tera-border sm:flex">
            <Truck className="h-4 w-4 text-tera-blue" />
            {currency.format(actualTrackedSpend)} tracked actual spend
          </div>
        </div>

        {openItems.length === 0 ? (
          <Card className="border border-dashed border-tera-border bg-white py-8 text-center shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
            <CardContent>
              <p className="text-sm text-tera-body">No active purchase items yet. Add the next product or equipment order above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {openItems.map((item: PurchasingItemRecord) => (
              <ProcurementItemCard
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  vendor: item.vendor,
                  category: item.category,
                  type: item.type,
                  status: item.status,
                  quantity: item.quantity,
                  estimatedCost: item.estimatedCost == null ? null : Number(item.estimatedCost),
                  actualCost: item.actualCost == null ? null : Number(item.actualCost),
                  itemUrl: item.itemUrl,
                  neededBy: item.neededBy?.toISOString() ?? null,
                  orderedAt: item.orderedAt?.toISOString() ?? null,
                  receivedAt: item.receivedAt?.toISOString() ?? null,
                  notes: item.notes,
                  linkedExpenseCount: item.expenses.length,
                  linkedExpenseTotal: item.expenses.reduce((sum: number, expense: (typeof item.expenses)[number]) => sum + Number(expense.amount), 0),
                }}
              />
            ))}
          </div>
        )}
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <CardTitle>Completed and canceled</CardTitle>
          <CardDescription>Closed items still stay visible for spend history and operational memory.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {closedItems.length === 0 ? (
            <p className="text-sm text-tera-body">Nothing closed yet.</p>
          ) : (
            closedItems.slice(0, 8).map((item: PurchasingItemRecord) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-[1.2rem] border border-tera-border px-4 py-4 sm:grid-cols-[minmax(0,1fr)_130px_130px_130px] sm:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-tera-navy">{item.title}</p>
                  <p className="truncate text-xs text-tera-body">{item.category} • {item.vendor || "Vendor TBD"}</p>
                </div>
                <div className="text-xs text-tera-body">{item.status}</div>
                <div className="text-sm font-medium text-tera-navy">
                  {item.actualCost != null ? currency.format(Number(item.actualCost)) : "No actual"}
                </div>
                <div className="text-right text-xs text-tera-body">
                  {item.itemUrl ? (
                    <a className="inline-flex items-center gap-1 text-tera-blue hover:text-tera-blue-hover" href={item.itemUrl} rel="noreferrer" target="_blank">
                      Reference
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    "No link"
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
