"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  FileCheck2,
  FlaskConical,
  ScanSearch,
  ShieldCheck,
  Snowflake,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { RegulatoryDisclaimer } from "@/components/regulatory-disclaimer";
import { useCart } from "@/components/cart-provider";
import {
  getHeroCategoryHrefParam,
  getHeroCategoryLabel,
  getHeroCategoryTagClasses,
  getHeroCategoryTheme,
  type Product,
} from "@/data/products";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const specLabels: Record<string, string> = {
  purity: "Purity",
  quantity: "Quantity",
  form: "Format",
  storage: "Storage",
};

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const theme = getHeroCategoryTheme(product.heroCategory);
  const router = useRouter();
  const { addItem, buyNow } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartFeedback, setCartFeedback] = useState<string | null>(null);
  const categoryHref = `/shop?category=${getHeroCategoryHrefParam(product.heroCategory)}`;
  const savings = (product.originalPrice - product.price).toFixed(0);
  const categoryLabel = getHeroCategoryLabel(product.heroCategory);
  const documentationItems = [
    {
      label: "SKU",
      value: product.documentation.sku,
      icon: FileCheck2,
    },
    {
      label: "Batch code",
      value: product.documentation.batchCode,
      icon: ScanSearch,
    },
    {
      label: "COA status",
      value: product.documentation.coaStatus,
      icon: FileCheck2,
    },
    {
      label: "HPLC + MS status",
      value: `${product.documentation.hplcStatus}. ${product.documentation.msStatus}.`,
      icon: FlaskConical,
    },
    {
      label: "Storage guidance",
      value: product.specifications.storage,
      icon: Snowflake,
    },
    {
      label: "Release window",
      value: product.documentation.releaseWindow,
      icon: ShieldCheck,
    },
  ];

  const supportLinks = [
    { label: "COA + Batch Docs", href: "/coa" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Research Disclaimer", href: "/research-disclaimer" },
  ];

  return (
    <main>
      <section
        className="relative overflow-hidden pt-24 sm:pt-28"
        style={{ background: "linear-gradient(162deg, #1e4a9e 0%, #0d262d 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 18% 20%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/62">
            <Link href="/" className="tg-link-text hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="tg-link-text hover:text-white">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/86">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm sm:p-5">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem]" style={{ backgroundColor: "#e9f0fc" }}>
                <div
                  className="absolute inset-0 opacity-70"
                  style={{ backgroundImage: "radial-gradient(circle at 50% 18%, rgba(168,197,245,0.95) 0%, transparent 44%)" }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${product.image}`}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <Badge
                  className={`absolute left-4 top-4 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] shadow-lg ${getHeroCategoryTagClasses(product.heroCategory)}`}
                >
                  {categoryLabel.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/72">
                {categoryLabel}
              </p>
              <h1 className="mt-3 max-w-3xl text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[3.8rem]">
                {product.name}
              </h1>
              <p className="mt-4 max-w-2xl text-[0.96rem] leading-6 text-white/74 sm:mt-5 sm:text-[1.05rem] sm:leading-7">
                {product.longDescription}
              </p>

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-3">
                <div className="flex items-end gap-3">
                  <span className="text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.5rem]">
                    ${product.price}
                  </span>
                  <span className="pb-1 text-base text-white/38 line-through">${product.originalPrice}</span>
                </div>
                <Badge
                  className="border-0 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em]"
                  style={{ backgroundColor: theme.softAlt, color: theme.accent }}
                >
                  SAVE ${savings}
                </Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Visible specs",
                  "Product details shown",
                  "Batch doc status",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-4 py-2 text-[12px] font-medium text-white/86"
                    style={{ borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div
                className="mt-8 rounded-[1.5rem] border p-4 sm:p-5"
                style={{ borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/68">
                  Purchase flow
                </p>

                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">
                      Quantity
                    </p>
                    <div className="mt-2 inline-flex items-center overflow-hidden rounded-full border border-white/14 bg-white/8">
                      <button
                        type="button"
                        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                        className="inline-flex h-11 w-11 items-center justify-center text-lg font-semibold text-white/82"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <div className="inline-flex h-11 min-w-[52px] items-center justify-center border-x border-white/14 px-4 text-sm font-semibold text-white">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => setQuantity((value) => value + 1)}
                        className="inline-flex h-11 w-11 items-center justify-center text-lg font-semibold text-white/82"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        addItem(product, quantity);
                        setCartFeedback(`${quantity} added to cart.`);
                      }}
                      className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border px-5 text-sm font-semibold text-white"
                      style={{ borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        buyNow(product, quantity);
                        router.push("/checkout");
                      }}
                      className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
                      style={{ backgroundColor: theme.accent }}
                    >
                      Buy now
                      <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-[13px] text-white/64">
                  {cartFeedback ?? "Build your cart here, or jump straight into checkout with Buy now."}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={categoryHref}
                  className="tg-link-pill inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  Browse more {categoryLabel}
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="tg-link-pill inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold text-white/90"
                  style={{ borderColor: "rgba(255,255,255,0.16)", backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to catalog
                </Link>
              </div>

              <RegulatoryDisclaimer variant="dark" className="mt-6 max-w-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 lg:px-12">
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
              About this product
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.2rem]">
              Built around a better peptide purchase.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#0d262d]/68 sm:text-[16px]">
              {product.longDescription}
            </p>

            <div className="mt-8 rounded-[1.5rem] p-5" style={{ backgroundColor: theme.softAlt }}>
              <p className="text-sm font-semibold text-[#0d262d]">Why this page is easier to trust</p>
              <ul className="mt-4 space-y-3">
                {[
                  "The product page stays focused on the peptide itself.",
                  "Batch code, SKU, and documentation status stay tied to the exact product.",
                  "Specs, storage guidance, and support links stay close to the product.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#0d262d]/68">
                    <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: theme.accent }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                Product details
              </p>
              <ul className="mt-5 space-y-3.5">
                {product.kitIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[#0d262d]/70">
                    <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: theme.accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                Technical specs
              </p>
              <div className="mt-5 grid gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[1.2rem] border px-4 py-4"
                    style={{ backgroundColor: theme.softAlt, borderColor: theme.soft }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                      {specLabels[key] ?? key}
                    </p>
                    <p className="mt-2 text-[15px] font-medium leading-6 text-[#0d262d]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                Batch documentation
              </p>
              <p className="mt-3 text-[14px] leading-6 text-[#0d262d]/68">
                Batch code, SKU, COA status, and testing references stay tied to this product so the premium promise has visible support behind it.
              </p>
              <div className="mt-5 grid gap-3">
                {documentationItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] border px-4 py-4"
                    style={{ backgroundColor: "#ffffff", borderColor: theme.soft }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: theme.softAlt, color: theme.accent }}
                      >
                        <item.icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                          {item.label}
                        </p>
                        <p className="mt-2 text-[14px] leading-6 text-[#0d262d]/68">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href="/coa"
                  className="tg-link-pill inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-semibold text-[#0d262d]"
                  style={{ borderColor: theme.soft, backgroundColor: theme.softAlt }}
                >
                  View COA hub
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/faq"
                  className="tg-link-pill inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-semibold text-[#0d262d]"
                  style={{ borderColor: theme.soft, backgroundColor: theme.softAlt }}
                >
                  Read support FAQ
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                Support pages
              </p>
              <p className="mt-3 text-[14px] leading-6 text-[#0d262d]/68">
                Need more than the product summary? Use the COA hub, FAQ, and policy pages to confirm shipping, refund, and research-use details before you buy.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="tg-link-pill inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-semibold text-[#0d262d]"
                    style={{ borderColor: theme.soft, backgroundColor: theme.softAlt }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                  Related products
                </p>
                <h2 className="mt-3 text-[1.85rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.15rem]">
                  Compare more {categoryLabel.toLowerCase()} products.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((rp) => {
                const relatedTheme = getHeroCategoryTheme(rp.heroCategory);

                return (
                  <Link
                    key={rp.slug}
                    href={`/shop/${rp.slug}`}
                    className="tg-link-card group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[#e3e8ef]"
                  >
                    <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: relatedTheme.heroTone }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${rp.image}`}
                        alt={rp.name}
                        className="tg-link-card-media absolute inset-0 h-full w-full object-cover"
                      />
                      <Badge
                        className={`absolute left-3 top-3 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${getHeroCategoryTagClasses(rp.heroCategory)}`}
                      >
                        {getHeroCategoryLabel(rp.heroCategory).toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 px-5 pb-5 pt-4">
                      <h3 className="text-[1.02rem] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d262d] sm:text-[1.1rem]">{rp.name}</h3>
                      <p className="flex-1 text-[13px] leading-6 text-[#0d262d]/62">{rp.description}</p>
                      <div className="flex items-end justify-between gap-3 pt-3">
                        <div className="min-w-0">
                          <span className="block pt-0.5 text-xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0d262d] sm:text-2xl">${rp.price}</span>
                          <span className="mt-1 block text-xs text-[#0d262d]/38 line-through sm:mt-0">${rp.originalPrice}</span>
                        </div>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9" style={{ backgroundColor: relatedTheme.softAlt, color: relatedTheme.accent }}>
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
