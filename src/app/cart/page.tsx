"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <main>
      <section
        className="relative overflow-hidden pt-20 sm:pt-[5.5rem]"
        style={{ background: "linear-gradient(162deg, #1e4a9e 0%, #0d262d 100%)" }}
      >
        <div className="relative mx-auto max-w-[1240px] px-5 pb-8 sm:px-8 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/68">Cart</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[0.96] tracking-[-0.035em] text-white sm:text-[2.45rem]">
            Your cart, ready for checkout.
          </h1>
          <p className="mt-3 max-w-xl text-[0.96rem] leading-6 text-white/72">
            Review quantities, clean up the kit mix, or jump straight into checkout.
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div className="rounded-[1.75rem] border border-[#e3e8ef] bg-white p-5 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Items</p>
                <p className="mt-1 text-sm text-[#0d262d]/60">{itemCount} item{itemCount === 1 ? "" : "s"} in cart</p>
              </div>
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-[#64748b] hover:text-[#173f85]"
                >
                  Clear cart
                </button>
              ) : null}
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef4fc] text-[#3b6ed6]">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#0d262d]">Your cart is empty.</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#0d262d]/60">
                  Start with a product page, add what you want, then come back here to review everything before checkout.
                </p>
                <Link
                  href="/shop"
                  className="tg-link-pill mt-6 inline-flex h-12 items-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white"
                >
                  Browse kits
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex flex-col gap-4 rounded-[1.4rem] border border-[#e8edf5] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 overflow-hidden rounded-[1rem] bg-[#eef4fc]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${BASE_PATH}${item.image}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#0d262d]">{item.name}</p>
                        <p className="mt-1 text-sm text-[#0d262d]/58">${item.price.toFixed(2)} each</p>
                        <Link href={`/shop/${item.slug}`} className="mt-2 inline-flex text-sm font-medium text-[#3b6ed6] hover:text-[#173f85]">
                          View product
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-[#dbe6f5] bg-[#f8fbff]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="inline-flex h-10 w-10 items-center justify-center text-[#173f85]"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="inline-flex h-10 min-w-[44px] items-center justify-center border-x border-[#dbe6f5] px-3 text-sm font-semibold text-[#0d262d]">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="inline-flex h-10 w-10 items-center justify-center text-[#173f85]"
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="min-w-[88px] text-right">
                        <p className="text-sm text-[#0d262d]/56">Line total</p>
                        <p className="text-base font-semibold text-[#0d262d]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f8fbff] text-[#64748b] hover:text-[#173f85]"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-[#e3e8ef] bg-white p-5 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Summary</p>
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

            <div className="mt-5 h-px w-full bg-[#e8edf5]" />

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-[#0d262d]/70">Estimated total</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-[#0d262d]">${subtotal.toFixed(2)}</span>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#0d262d]/58">
              Cart flow is live. Checkout is the next step in this same front-end flow.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/checkout"
                className={`tg-link-pill inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}
                style={{ backgroundColor: "#3b6ed6" }}
              >
                Continue to checkout
                <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] px-6 text-sm font-semibold text-[#173f85]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Keep shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
