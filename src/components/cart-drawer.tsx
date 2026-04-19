"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/components/cart-provider";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent
        side="right"
        className="w-full max-w-[420px] border-l border-[#dbe6f5] bg-[#f7fbff] p-0 text-[#0d262d] sm:max-w-[420px]"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-[#dbe6f5] bg-white px-6 pb-5 pt-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Cart</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <SheetTitle className="text-[1.65rem] font-semibold tracking-[-0.03em] text-[#0d262d]">
                  {itemCount > 0 ? "Your cart" : "Your cart is empty"}
                </SheetTitle>
                <SheetDescription className="mt-2 text-[14px] leading-6 text-[#5b6b7b]">
                  {itemCount > 0
                    ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready to review before checkout.`
                    : "Add a peptide from any product page and it will show up here instantly."}
                </SheetDescription>
              </div>
              <div className="rounded-[1rem] border border-[#dbe6f5] bg-[#f8fbff] px-4 py-3 text-right">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#6d7d8d]">Subtotal</p>
                <p className="mt-1 text-[1.05rem] font-semibold text-[#0d262d]">${subtotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3b6ed6] ring-1 ring-[#dbe6f5] shadow-[0_12px_28px_rgba(59,110,214,0.12)]">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.02em] text-[#0d262d]">
                Start with the shop.
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#5b6b7b]">
                Browse products, add what you want, then come back here to review quantities and subtotal.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="tg-link-pill mt-6 inline-flex h-12 items-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white"
              >
                Browse peptides
                <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {items.map((item) => (
                  <article
                    key={item.slug}
                    className="rounded-[1.5rem] border border-[#dbe6f5] bg-white p-4 shadow-[0_8px_22px_rgba(13,38,45,0.04)]"
                  >
                    <div className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[1rem] bg-[#eef4fc] ring-1 ring-[#dbe6f5]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${BASE_PATH}${item.image}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-[#0d262d]">{item.name}</p>
                            <p className="mt-1 text-sm text-[#5b6b7b]">${item.price.toFixed(2)} each</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8fbff] text-[#64748b] ring-1 ring-[#dbe6f5] hover:text-[#173f85]"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
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

                          <div className="text-right">
                            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#6d7d8d]">Line total</p>
                            <p className="mt-1 text-[15px] font-semibold text-[#0d262d]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-[#dbe6f5] bg-white px-6 py-5">
                <div className="flex items-center justify-between text-sm text-[#5b6b7b]">
                  <span>Subtotal</span>
                  <span className="text-[1.05rem] font-semibold text-[#0d262d]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white"
                  >
                    Continue to checkout
                    <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f8fbff] px-6 text-sm font-semibold text-[#173f85]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View full cart
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
