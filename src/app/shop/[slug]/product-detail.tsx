"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Footer } from "@/components/footer";
import {
  getHeroCategoryHrefParam,
  getHeroCategoryTagClasses,
  getHeroCategoryTheme,
  type Product,
} from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

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
  const categoryHref = `/shop?category=${getHeroCategoryHrefParam(product.heroCategory)}`;
  const savings = (product.originalPrice - product.price).toFixed(0);

  return (
    <main>
      <section
        className="relative overflow-hidden pt-24 sm:pt-28"
        style={{ background: `linear-gradient(162deg, ${theme.accentDeep} 0%, #0d262d 100%)` }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 78% 18%, ${theme.soft}55, transparent 28%), radial-gradient(circle at 18% 20%, rgba(255,255,255,0.06), transparent 24%)`,
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
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem]" style={{ backgroundColor: theme.heroTone }}>
                <div
                  className="absolute inset-0 opacity-70"
                  style={{ backgroundImage: `radial-gradient(circle at 50% 18%, ${theme.soft} 0%, transparent 44%)` }}
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
                  {product.heroCategory.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/72">
                {product.heroCategory}
              </p>
              <h1 className="mt-3 max-w-3xl text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[3.8rem]">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-white/74 sm:text-[1.05rem]">
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
                  "Documentation-led",
                  "Complete kit format",
                  "Research use only",
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

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={categoryHref}
                  className="tg-link-pill inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  Browse more {product.heroCategory}
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 lg:px-12">
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
              About this kit
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.2rem]">
              Research-ready from the moment it arrives.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#0d262d]/68 sm:text-[16px]">
              {product.longDescription}
            </p>

            <div className="mt-8 rounded-[1.5rem] p-5" style={{ backgroundColor: theme.softAlt }}>
              <p className="text-sm font-semibold text-[#0d262d]">Why this setup works better</p>
              <ul className="mt-4 space-y-3">
                {[
                  "One order instead of piecing supplies together across vendors.",
                  "Category-matched product discovery that stays consistent across the site.",
                  "Complete documentation and prep essentials included in the box.",
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
                Kit includes
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
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                  Related kits
                </p>
                <h2 className="mt-3 text-[1.85rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.15rem]">
                  More from the {product.heroCategory.toLowerCase()} category.
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
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{ backgroundImage: `radial-gradient(circle at 50% 18%, ${relatedTheme.soft} 0%, transparent 44%)` }}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${rp.image}`}
                        alt={rp.name}
                        className="tg-link-card-media absolute inset-0 h-full w-full object-cover"
                      />
                      <Badge
                        className={`absolute left-3 top-3 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${getHeroCategoryTagClasses(rp.heroCategory)}`}
                      >
                        {rp.heroCategory.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 px-5 pb-5 pt-4">
                      <h3 className="text-base font-semibold leading-tight text-[#0d262d]">{rp.name}</h3>
                      <p className="flex-1 text-[13px] leading-6 text-[#0d262d]/62">{rp.description}</p>
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-semibold text-[#0d262d]">${rp.price}</span>
                          <span className="text-xs text-[#0d262d]/38 line-through">${rp.originalPrice}</span>
                        </div>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: relatedTheme.softAlt, color: relatedTheme.accent }}>
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
