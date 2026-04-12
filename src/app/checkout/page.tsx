"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export default function CheckoutPage() {
  const { items, itemCount, subtotal } = useCart();

  return (
    <main>
      <section
        className="relative overflow-hidden pt-20 sm:pt-[5.5rem]"
        style={{ background: "linear-gradient(162deg, #1e4a9e 0%, #0d262d 100%)" }}
      >
        <div className="relative mx-auto max-w-[1240px] px-5 pb-8 sm:px-8 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/68">Checkout</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[0.96] tracking-[-0.035em] text-white sm:text-[2.45rem]">
            Buy now, straight into checkout.
          </h1>
          <p className="mt-3 max-w-xl text-[0.96rem] leading-6 text-white/72">
            This is the checkout shell for the Teragenix front-end flow. Review the order, confirm the customer details, and wire payment processing next.
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="rounded-[1.75rem] border border-[#e3e8ef] bg-white p-5 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Customer details</p>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef4fc] text-[#3b6ed6]">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#0d262d]">Nothing to check out yet.</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#0d262d]/60">
                  Add something to the cart first, or hit Buy now on a product page to land back here with the item ready to go.
                </p>
                <Link
                  href="/shop"
                  className="tg-link-pill mt-6 inline-flex h-12 items-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white"
                >
                  Browse kits
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {[
                  { label: "Email", placeholder: "you@example.com" },
                  { label: "Full name", placeholder: "Research buyer name" },
                  { label: "Company / lab", placeholder: "Optional" },
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
                    placeholder="Optional notes for shipping, handling, or internal team handoff"
                    rows={5}
                    className="w-full rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-sm text-[#0d262d] outline-none"
                  />
                </label>

                <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-[#f8fbff] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                      <LockKeyhole className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0d262d]">Payment processing comes next.</p>
                      <p className="mt-1 text-sm leading-6 text-[#0d262d]/60">
                        The cart and buy-now flow are live. The final payment processor still needs to be wired before this becomes a true live checkout.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white opacity-60"
                >
                  Payment integration coming next
                </button>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-[#e3e8ef] bg-white p-5 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Order summary</p>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 rounded-[1.25rem] border border-[#e8edf5] p-3">
                  <div className="h-20 w-20 overflow-hidden rounded-[1rem] bg-[#eef4fc]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${BASE_PATH}${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#0d262d]">{item.name}</p>
                    <p className="mt-1 text-sm text-[#0d262d]/56">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0d262d]">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 h-px w-full bg-[#e8edf5]" />

            <div className="mt-5 space-y-3 text-sm text-[#0d262d]/68">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0d262d]">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-[#0d262d]/70">Estimated total</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-[#0d262d]">${subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/cart"
                className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] px-6 text-sm font-semibold text-[#173f85]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
