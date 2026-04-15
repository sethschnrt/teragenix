"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { ArrowUpRight, CalendarClock, Package, ReceiptText, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

const statusOptions = ["BACKLOG", "SOURCING", "ORDERED", "RECEIVED", "CANCELED"] as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function statusClasses(status: string) {
  switch (status) {
    case "RECEIVED":
      return "bg-[#e8f3ec] text-[#214d37]";
    case "ORDERED":
      return "bg-[#e8f0ff] text-[#173f85]";
    case "SOURCING":
      return "bg-[#fff4e5] text-[#9a5a11]";
    case "CANCELED":
      return "bg-[#f3f4f6] text-[#596674]";
    default:
      return "bg-[#eef3f7] text-[#365061]";
  }
}

export function ProcurementItemCard({
  item,
}: {
  item: {
    id: string;
    title: string;
    vendor: string | null;
    category: string;
    type: string;
    status: string;
    quantity: number;
    estimatedCost: number | null;
    actualCost: number | null;
    itemUrl: string | null;
    neededBy: string | null;
    orderedAt: string | null;
    receivedAt: string | null;
    notes: string | null;
    linkedExpenseCount: number;
    linkedExpenseTotal: number;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    vendor: item.vendor ?? "",
    status: item.status,
    actualCost: item.actualCost?.toString() ?? "",
    orderedAt: item.orderedAt ? item.orderedAt.slice(0, 10) : "",
    receivedAt: item.receivedAt ? item.receivedAt.slice(0, 10) : "",
    itemUrl: item.itemUrl ?? "",
    notes: item.notes ?? "",
  });

  const variance = useMemo(() => {
    if (item.estimatedCost == null || form.actualCost === "") {
      return null;
    }

    return Number(form.actualCost) - item.estimatedCost;
  }, [form.actualCost, item.estimatedCost]);

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await fetch(`/api/procurement/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor: form.vendor,
          status: form.status,
          actualCost: form.actualCost === "" ? null : Number(form.actualCost),
          orderedAt: form.orderedAt,
          receivedAt: form.receivedAt,
          itemUrl: form.itemUrl,
          notes: form.notes,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not update purchase item.");
        return;
      }

      setSuccess("Purchase item updated.");
      router.refresh();
    });
  }

  return (
    <div className="rounded-[1.45rem] border border-tera-border bg-white p-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-tera-blue">
              {formatEnum(item.type)}
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${statusClasses(form.status)}`}>
              {formatEnum(form.status)}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-tera-navy">{item.title}</h3>
          <p className="mt-1 text-sm text-tera-body">
            {item.category} • Qty {item.quantity}
            {item.vendor ? ` • ${item.vendor}` : ""}
          </p>
        </div>

        <div className="rounded-[1.1rem] bg-[#f8fbff] px-4 py-3 text-right ring-1 ring-[#dbe6f5]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-tera-body">Tracked spend</p>
          <p className="mt-2 text-sm font-semibold text-tera-navy">
            {item.linkedExpenseCount > 0 ? currency.format(item.linkedExpenseTotal) : "No expense yet"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.1rem] border border-tera-border px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-tera-body">Estimated</p>
          <p className="mt-2 text-sm font-semibold text-tera-navy">
            {item.estimatedCost != null ? currency.format(item.estimatedCost) : "Not set"}
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-tera-border px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-tera-body">Actual</p>
          <p className="mt-2 text-sm font-semibold text-tera-navy">
            {form.actualCost !== "" ? currency.format(Number(form.actualCost)) : "Pending"}
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-tera-border px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-tera-body">Variance</p>
          <p className={`mt-2 text-sm font-semibold ${variance == null ? "text-tera-body" : variance > 0 ? "text-[#9a5a11]" : "text-[#214d37]"}`}>
            {variance == null ? "Awaiting actual" : variance === 0 ? "$0" : `${variance > 0 ? "+" : "-"}${currency.format(Math.abs(variance))}`}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-tera-body sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-[1rem] bg-[#fbfcfe] px-3 py-3 ring-1 ring-[#edf2f7]">
          <CalendarClock className="h-4 w-4 text-tera-blue" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-tera-body">Needed by</p>
            <p className="mt-1 text-sm text-tera-navy">{formatDate(item.neededBy)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[1rem] bg-[#fbfcfe] px-3 py-3 ring-1 ring-[#edf2f7]">
          <Truck className="h-4 w-4 text-tera-blue" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-tera-body">Ordered</p>
            <p className="mt-1 text-sm text-tera-navy">{formatDate(form.orderedAt || null)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[1rem] bg-[#fbfcfe] px-3 py-3 ring-1 ring-[#edf2f7]">
          <Package className="h-4 w-4 text-tera-blue" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-tera-body">Received</p>
            <p className="mt-1 text-sm text-tera-navy">{formatDate(form.receivedAt || null)}</p>
          </div>
        </div>
      </div>

      {item.itemUrl ? (
        <Link
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-tera-blue transition hover:text-tera-blue-hover"
          href={item.itemUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open reference link
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      ) : null}

      {item.notes ? <p className="mt-3 text-sm leading-6 text-tera-body">{item.notes}</p> : null}

      <form className="mt-5 space-y-4 border-t border-tera-border pt-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Status</span>
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {formatEnum(option)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Vendor</span>
            <input
              value={form.vendor}
              onChange={(event) => updateField("vendor", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
              placeholder="Vendor or supplier"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Actual cost</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.actualCost}
              onChange={(event) => updateField("actualCost", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
              placeholder="0.00"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Ordered at</span>
            <input
              type="date"
              value={form.orderedAt}
              onChange={(event) => updateField("orderedAt", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Received at</span>
            <input
              type="date"
              value={form.receivedAt}
              onChange={(event) => updateField("receivedAt", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            />
          </label>

          <label className="block sm:col-span-2 xl:col-span-1">
            <span className="mb-2 block text-sm font-medium text-tera-navy">Reference link</span>
            <input
              value={form.itemUrl}
              onChange={(event) => updateField("itemUrl", event.target.value)}
              className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
              placeholder="Vendor link or quote"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Ops notes</span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="Arrival issues, vendor context, replacement notes"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-tera-body">
            <ReceiptText className="h-4 w-4 text-tera-blue" />
            {item.linkedExpenseCount > 0
              ? `${item.linkedExpenseCount} linked expense ${item.linkedExpenseCount === 1 ? "entry" : "entries"}`
              : "No linked expense entries yet"}
          </div>

          <Button className="h-11 rounded-full bg-tera-blue px-6 text-white hover:bg-tera-blue-hover" disabled={isPending} type="submit">
            {isPending ? "Saving updates..." : "Save updates"}
          </Button>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-700">{success}</p> : null}
      </form>
    </div>
  );
}
