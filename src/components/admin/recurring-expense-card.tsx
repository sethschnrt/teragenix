"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CalendarClock, PauseCircle, PlayCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RecurringExpenseCard({
  expense,
}: {
  expense: {
    id: string;
    vendor: string;
    category: string;
    frequency: string;
    amount: number;
    nextDueDate: string;
    active: boolean;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function toggleActive() {
    setError(null);

    startTransition(async () => {
      const response = await fetch(`/api/expenses/recurring/${expense.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !expense.active }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not update recurring expense.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="rounded-xl border border-tera-border px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-tera-navy">{expense.vendor}</p>
          <p className="mt-1 text-xs text-tera-body">{expense.category} • {expense.frequency}</p>
        </div>
        <RefreshCw className="h-4 w-4 shrink-0 text-tera-blue" />
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-tera-body">
          <CalendarClock className="h-4 w-4 text-tera-blue" />
          <span>{expense.nextDueDate}</span>
        </div>
        <span className="font-medium text-tera-navy">${expense.amount.toFixed(2)}</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${expense.active ? "bg-[#e8f3ec] text-[#214d37]" : "bg-[#f1f5f9] text-[#475967]"}`}>
          {expense.active ? "Active" : "Paused"}
        </span>

        <Button
          variant="outline"
          className="border-tera-border text-tera-body"
          disabled={isPending}
          onClick={toggleActive}
          type="button"
        >
          {expense.active ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
          {isPending ? "Saving..." : expense.active ? "Pause" : "Resume"}
        </Button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

