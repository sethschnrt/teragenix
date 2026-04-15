"use client";

import { useRouter } from "next/navigation";
import { FulfillmentStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

const orderStatuses = Object.values(OrderStatus);
const paymentStatuses = Object.values(PaymentStatus);
const fulfillmentStatuses = Object.values(FulfillmentStatus);

export function OrderStatusForm({
  orderId,
  status,
  paymentStatus,
  fulfillmentStatus,
}: {
  orderId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    status,
    paymentStatus,
    fulfillmentStatus,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        setError(payload.error || "Could not update order.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-tera-navy">Order status</span>
          <select
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as OrderStatus }))}
            className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none focus:border-tera-blue"
          >
            {orderStatuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-tera-navy">Payment</span>
          <select
            value={form.paymentStatus}
            onChange={(event) =>
              setForm((current) => ({ ...current, paymentStatus: event.target.value as PaymentStatus }))
            }
            className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none focus:border-tera-blue"
          >
            {paymentStatuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-tera-navy">Fulfillment</span>
          <select
            value={form.fulfillmentStatus}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                fulfillmentStatus: event.target.value as FulfillmentStatus,
              }))
            }
            className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none focus:border-tera-blue"
          >
            {fulfillmentStatuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button className="bg-tera-blue text-white hover:bg-tera-blue-hover" disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Save order status"}
      </Button>
    </form>
  );
}

