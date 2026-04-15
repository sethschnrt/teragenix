"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <main>
      <PageHero
        icon={ShoppingBag}
        eyebrow="CART"
        title="Premium kits, ready to review."
        description="Adjust the mix, tighten quantities, and move into checkout without leaving the Teragenix flow."
        variant="subpage"
        detail={itemCount > 0 ? `${itemCount} item${itemCount === 1 ? "" : "s"} in cart` : "Cart is empty"}
        highlights={[
          { label: "Keep shopping", href: "/shop" },
          ...(items.length > 0 ? [{ label: "Go to checkout", href: "/checkout" }] : []),
        ]}
        panelEyebrow="ORDER STATUS"
        panelTitle="Built to feel like the rest of the catalog, not a generic cart overlay."
        panelItems={[
          { label: "Items", value: `${itemCount}` },
          { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
          { label: "Support pages", href: "/faq" },
          { label: "Shipping policy", href: "/shipping-policy" },
        ]}
      />

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Cart items</p>
                <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.8rem]">
                  {items.length > 0 ? "Your selected kits" : "Nothing added yet"}
                </h2>
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
              <div className="mt-8 rounded-[1.75rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 text-center sm:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.02em] text-[#0d262d]">
                  Start with a product page.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#475967]">
                  Add a kit from the product page, then come back here to review the order before checkout.
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
              <div className="mt-8 space-y-4">
                {items.map((item) => (
                  <article
                    key={item.slug}
                    className="rounded-[1.6rem] border border-[#dbe6f5] bg-[#f4f8ff] p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 overflow-hidden rounded-[1.15rem] bg-white ring-1 ring-[#dbe6f5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${BASE_PATH}${item.image}`}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[1rem] font-semibold text-[#0d262d] sm:text-[1.05rem]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#475967]">${item.price.toFixed(2)} each</p>
                          <Link
                            href={`/shop/${item.slug}`}
                            className="mt-2 inline-flex items-center text-sm font-medium text-[#3b6ed6] hover:text-[#173f85]"
                          >
                            View product
                            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-[#dbe6f5] bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="inline-flex h-10 w-10 items-center justify-center text-[#173f85]"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="inline-flex h-10 min-w-[46px] items-center justify-center border-x border-[#dbe6f5] px-3 text-sm font-semibold text-[#0d262d]">
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

                        <div className="min-w-[92px] text-right">
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#64748b]">Line total</p>
                          <p className="mt-1 text-base font-semibold text-[#0d262d]">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748b] ring-1 ring-[#dbe6f5] hover:text-[#173f85]"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Order summary</p>
              <h2 className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.65rem]">
                Ready to move this into checkout.
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-white px-4 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Items</p>
                  <p className="mt-2 text-[1.2rem] font-semibold text-[#0d262d]">{itemCount}</p>
                </div>
                <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-white px-4 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Subtotal</p>
                  <p className="mt-2 text-[1.2rem] font-semibold text-[#0d262d]">${subtotal.toFixed(2)}</p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-7 text-[#475967]">
                Cart is live. This stays in the Teragenix front-end flow and hands off into checkout cleanly.
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
                  className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] bg-white px-6 text-sm font-semibold text-[#173f85]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Keep shopping
                </Link>
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
