"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

const typeOptions = [
  { value: "PRODUCT", label: "Product" },
  { value: "EQUIPMENT", label: "Equipment" },
  { value: "SUPPLIES", label: "Supplies" },
  { value: "SOFTWARE", label: "Software" },
  { value: "OTHER", label: "Other" },
] as const;

export function ProcurementIntakeForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    type: "PRODUCT",
    category: "",
    vendor: "",
    quantity: "1",
    estimatedCost: "",
    neededBy: "",
    itemUrl: "",
    notes: "",
  });

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm({
      title: "",
      type: "PRODUCT",
      category: "",
      vendor: "",
      quantity: "1",
      estimatedCost: "",
      neededBy: "",
      itemUrl: "",
      notes: "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await fetch("/api/procurement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          estimatedCost: form.estimatedCost === "" ? null : Number(form.estimatedCost),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not create purchase item.");
        return;
      }

      setSuccess("Purchase item added to the pipeline.");
      resetForm();
      router.refresh();
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-tera-navy">What needs to be purchased?</span>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="Glass vials for starter kits, label printer, warehouse shelving"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Type</span>
          <select
            value={form.type}
            onChange={(event) => updateField("type", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Category</span>
          <input
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="Packaging, lab, fulfillment, office"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Vendor</span>
          <input
            value={form.vendor}
            onChange={(event) => updateField("vendor", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="Amazon, Uline, lab supplier"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Quantity</span>
          <input
            type="number"
            min="1"
            step="1"
            value={form.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Estimated cost</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.estimatedCost}
            onChange={(event) => updateField("estimatedCost", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="0.00"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Needed by</span>
          <input
            type="date"
            value={form.neededBy}
            onChange={(event) => updateField("neededBy", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-tera-navy">Reference link</span>
          <input
            value={form.itemUrl}
            onChange={(event) => updateField("itemUrl", event.target.value)}
            className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
            placeholder="Product page, vendor quote, internal doc"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-tera-navy">Notes</span>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-tera-navy outline-none"
          placeholder="Why this matters, preferred vendor, pack size, or ordering context"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

      <Button className="h-11 rounded-full bg-tera-blue px-6 text-white hover:bg-tera-blue-hover" disabled={isPending} type="submit">
        {isPending ? "Saving purchase item..." : "Add to purchasing"}
      </Button>
    </form>
  );
}
