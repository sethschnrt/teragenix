"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

const frequencyOptions = ["MONTHLY", "QUARTERLY", "YEARLY"] as const;

export function RecurringExpenseForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    vendor: "",
    category: "",
    amount: "",
    frequency: "MONTHLY",
    nextDueDate: new Date().toISOString().slice(0, 10),
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
      frequency: "MONTHLY",
      nextDueDate: new Date().toISOString().slice(0, 10),
      notes: "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await fetch("/api/expenses/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not create recurring expense.");
        return;
      }

      setSuccess("Recurring expense added.");
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
            placeholder="OpenAI, Klaviyo, ShipStation"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Category</span>
          <input
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className={inputClassName}
            placeholder="Software, infra, subscriptions"
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
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Frequency</span>
          <select
            value={form.frequency}
            onChange={(event) => updateField("frequency", event.target.value)}
            className={inputClassName}
          >
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-tera-navy">Next due date</span>
          <input
            type="date"
            value={form.nextDueDate}
            onChange={(event) => updateField("nextDueDate", event.target.value)}
            className={inputClassName}
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-tera-navy">Notes</span>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="w-full rounded-lg border border-[#dbe6f5] bg-[#f8fbff] px-3 py-2 text-sm text-tera-navy outline-none"
          placeholder="Optional context for the renewal"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

      <Button className="h-10 rounded-lg bg-tera-blue px-5 text-white hover:bg-tera-blue-hover" disabled={isPending} type="submit">
        {isPending ? "Saving recurring..." : "Add recurring expense"}
      </Button>
    </form>
  );
}
