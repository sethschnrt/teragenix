"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

export function ExpenseEntryForm({
  recentOrders,
  procurementItems,
}: {
  recentOrders: Array<{ id: string; orderNumber: string }>;
  procurementItems: Array<{ id: string; title: string; status: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    vendor: "",
    category: "",
    amount: "",
    expenseDate: new Date().toISOString().slice(0, 10),
    paymentMethod: "",
    relatedOrderId: "",
    procurementItemId: "",
    notes: "",
  });

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm({
      vendor: "",
      category: "",
      amount: "",
      expenseDate: new Date().toISOString().slice(0, 10),
      paymentMethod: "",
      relatedOrderId: "",
      procurementItemId: "",
      notes: "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not create expense.");
        return;
      }

      setSuccess("Expense logged.");
      resetForm();
      router.refresh();
    });
  }

  const inputClassName = "h-10 w-full rounded-lg border border-[#dbe6f5] bg-[#f8fbff] px-3 py-2 text-sm text-tera-navy outline-none";

  return (
    <form className="space-y-3.5" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Vendor</span>
          <input
            value={form.vendor}
            onChange={(event) => updateField("vendor", event.target.value)}
            className={inputClassName}
            placeholder="ShipStation, packaging supplier, lab vendor"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Category</span>
          <input
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className={inputClassName}
            placeholder="Shipping, software, packaging"
            required
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Amount</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(event) => updateField("amount", event.target.value)}
            className={inputClassName}
            placeholder="0.00"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Expense date</span>
          <input
            type="date"
            value={form.expenseDate}
            onChange={(event) => updateField("expenseDate", event.target.value)}
            className={inputClassName}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Payment method</span>
          <input
            value={form.paymentMethod}
            onChange={(event) => updateField("paymentMethod", event.target.value)}
            className={inputClassName}
            placeholder="Card, ACH, Stripe"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-tera-navy">Related order</span>
        <select
          value={form.relatedOrderId}
          onChange={(event) => updateField("relatedOrderId", event.target.value)}
          className={inputClassName}
        >
          <option value="">No linked order</option>
          {recentOrders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.orderNumber}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-tera-navy">Related purchase item</span>
        <select
          value={form.procurementItemId}
          onChange={(event) => updateField("procurementItemId", event.target.value)}
          className={inputClassName}
        >
          <option value="">No linked purchase item</option>
          {procurementItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} ({item.status})
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-tera-navy">Notes</span>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="w-full rounded-lg border border-[#dbe6f5] bg-[#f8fbff] px-3 py-2 text-sm text-tera-navy outline-none"
          placeholder="Optional internal context"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

      <Button className="h-10 rounded-lg bg-tera-blue px-5 text-white hover:bg-tera-blue-hover" disabled={isPending} type="submit">
        {isPending ? "Saving expense..." : "Log expense"}
      </Button>
    </form>
  );
}
