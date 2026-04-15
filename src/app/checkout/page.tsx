"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, useTransition } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    orderNotes: "",
  });

  const checkoutItems = useMemo(
    () => items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
    [items],
  );

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (checkoutItems.length === 0) {
      setError("Add at least one item before submitting checkout.");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          items: checkoutItems,
        }),
      });

      const payload = (await response.json()) as { error?: string; orderId?: string; orderNumber?: string };

      if (!response.ok || !payload.orderId || !payload.orderNumber) {
        setError(payload.error || "Could not submit order.");
        return;
      }

      clearCart();
      router.push(`/checkout/success?number=${encodeURIComponent(payload.orderNumber)}`);
      router.refresh();
    });
  }

  return (
    <main>
      <PageHero
        icon={LockKeyhole}
        eyebrow="CHECKOUT"
        title="Submit your order, straight into the Teragenix system."
        description="This is now a real branded order-submission flow. It creates the order in the shared CRM and ops stack, while payment processing stays as the next honest step."
        variant="subpage"
        detail={items.length > 0 ? "Order ready to review" : "No items in checkout"}
        highlights={[
          { label: "Back to cart", href: "/cart" },
          { label: "Browse kits", href: "/shop" },
        ]}
        panelEyebrow="ORDER SUMMARY"
        panelTitle="A branded checkout flow that now creates real orders in the shared system."
        panelItems={[
          { label: "Items", value: `${itemCount}` },
          { label: "Estimated total", value: `$${subtotal.toFixed(2)}` },
          { label: "Research disclaimer", href: "/research-disclaimer" },
          { label: "Support FAQ", href: "/faq" },
        ]}
      />

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Buyer details</p>
            <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.8rem]">
              {items.length > 0 ? "Ready to submit this order request." : "Nothing to check out yet."}
            </h2>

            {items.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 text-center sm:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.02em] text-[#0d262d]">
                  Add a kit first.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#475967]">
                  Use Add to cart or Buy now from a product page, then come back here with the order already loaded.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/shop"
                    className="tg-link-pill inline-flex h-12 items-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white"
                  >
                    Browse kits
                    <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-4 text-[15px] leading-7 text-[#475967]">
                  This checkout now writes a real order into the Teragenix admin and CRM system. No fake payment step, just an honest order-request handoff until payments are wired.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "firstName", label: "First name", placeholder: "First name", required: true },
                    { key: "lastName", label: "Last name", placeholder: "Last name", required: true },
                    { key: "email", label: "Email", placeholder: "you@example.com", required: true, type: "email" },
                    { key: "phone", label: "Phone", placeholder: "Optional", required: false },
                    { key: "company", label: "Company / lab", placeholder: "Optional", required: false },
                    { key: "country", label: "Country", placeholder: "US", required: true },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="mb-2 block text-sm font-medium text-[#0d262d]">{field.label}</span>
                      <input
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(event) => updateField(field.key as keyof typeof form, event.target.value)}
                        className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                        required={field.required}
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-4">
                  {[
                    { key: "addressLine1", label: "Shipping address", placeholder: "Street, suite, unit", required: true },
                    { key: "addressLine2", label: "Address line 2", placeholder: "Optional", required: false },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="mb-2 block text-sm font-medium text-[#0d262d]">{field.label}</span>
                      <input
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(event) => updateField(field.key as keyof typeof form, event.target.value)}
                        className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                        required={field.required}
                      />
                    </label>
                  ))}

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { key: "city", label: "City", placeholder: "City", required: true },
                      { key: "state", label: "State", placeholder: "State", required: true },
                      { key: "postalCode", label: "ZIP / postal code", placeholder: "ZIP", required: true },
                    ].map((field) => (
                      <label key={field.label} className="block">
                        <span className="mb-2 block text-sm font-medium text-[#0d262d]">{field.label}</span>
                        <input
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(event) => updateField(field.key as keyof typeof form, event.target.value)}
                          className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                          required={field.required}
                        />
                      </label>
                    ))}
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#0d262d]">Order notes</span>
                    <textarea
                      placeholder="Optional notes for shipping, handling, or internal handoff"
                      rows={5}
                      value={form.orderNotes}
                      onChange={(event) => updateField("orderNotes", event.target.value)}
                      className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                    />
                  </label>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[#dbe6f5] bg-[#f4f8ff] p-5 sm:p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Payment status</p>
                  <h3 className="mt-3 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d]">
                    Order submission is live. Payment processor wiring is next.
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#475967]">
                    This creates the order in the shared Teragenix system right now. The next real milestone is replacing this manual request step with a live payment processor.
                  </p>
                </div>

                {error ? <p className="mt-5 text-sm text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isPending ? "Submitting order..." : "Submit order request"}
                </button>
              </>
            )}
          </form>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Order summary</p>
              <h2 className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.65rem]">
                Everything kept in one cleaner flow.
              </h2>

              <div className="mt-6 space-y-3">
                {items.map((item) => (
                  <div key={item.slug} className="flex items-center gap-4 rounded-[1.25rem] border border-[#dbe6f5] bg-white p-3">
                    <div className="h-20 w-20 overflow-hidden rounded-[1rem] bg-[#eef4fc]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${BASE_PATH}${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#0d262d]">{item.name}</p>
                      <p className="mt-1 text-sm text-[#475967]">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#0d262d]">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-white px-4 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Items</p>
                  <p className="mt-2 text-[1.2rem] font-semibold text-[#0d262d]">{itemCount}</p>
                </div>
                <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-white px-4 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Estimated total</p>
                  <p className="mt-2 text-[1.2rem] font-semibold text-[#0d262d]">${subtotal.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Support links</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Shipping policy", href: "/shipping-policy" },
                  { label: "Refund policy", href: "/refund-policy" },
                  { label: "Research disclaimer", href: "/research-disclaimer" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="tg-link-pill inline-flex items-center rounded-full border border-[#dbe6f5] bg-[#f8fbff] px-4 py-2 text-[12px] font-semibold text-[#0d262d]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/cart"
                  className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f8fbff] px-6 text-sm font-semibold text-[#173f85]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
