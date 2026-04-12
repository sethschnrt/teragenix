"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LockKeyhole, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export default function CheckoutPage() {
  const { items, itemCount, subtotal } = useCart();

  return (
    <main>
      <PageHero
        icon={LockKeyhole}
        eyebrow="CHECKOUT"
        title="Buy now, straight into checkout."
        description="The cart and buy-now handoff are live. This page is now styled like the rest of Teragenix and ready for the final payment processor wiring."
        variant="subpage"
        detail={items.length > 0 ? "Order ready to review" : "No items in checkout"}
        highlights={[
          { label: "Back to cart", href: "/cart" },
          { label: "Browse kits", href: "/shop" },
        ]}
        panelEyebrow="ORDER SUMMARY"
        panelTitle="A cleaner checkout shell that matches the catalog and product pages."
        panelItems={[
          { label: "Items", value: `${itemCount}` },
          { label: "Estimated total", value: `$${subtotal.toFixed(2)}` },
          { label: "Research disclaimer", href: "/research-disclaimer" },
          { label: "Support FAQ", href: "/faq" },
        ]}
      />

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Buyer details</p>
            <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.8rem]">
              {items.length > 0 ? "Ready for the final payment step." : "Nothing to check out yet."}
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
                  This is the styled checkout shell. Customer details and order review are in place, and the last missing piece is live payment processing.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Email", placeholder: "you@example.com" },
                    { label: "Full name", placeholder: "Research buyer name" },
                    { label: "Company / lab", placeholder: "Optional" },
                    { label: "Phone", placeholder: "Optional" },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="mb-2 block text-sm font-medium text-[#0d262d]">{field.label}</span>
                      <input
                        placeholder={field.placeholder}
                        className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-4">
                  {[
                    { label: "Shipping address", placeholder: "Street, suite, unit" },
                    { label: "City, state, ZIP", placeholder: "City, state, ZIP" },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="mb-2 block text-sm font-medium text-[#0d262d]">{field.label}</span>
                      <input
                        placeholder={field.placeholder}
                        className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#0d262d]">Order notes</span>
                    <textarea
                      placeholder="Optional notes for shipping, handling, or internal handoff"
                      rows={5}
                      className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                    />
                  </label>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[#dbe6f5] bg-[#f4f8ff] p-5 sm:p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Payment status</p>
                  <h3 className="mt-3 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d]">
                    Front-end flow is live. Payment processor wiring is next.
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#475967]">
                    The styled cart and buy-now handoff now work. To make checkout truly live, the next step is connecting the payment processor and final order submission logic.
                  </p>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white opacity-60"
                >
                  Payment integration coming next
                </button>
              </>
            )}
          </div>

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
