"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  FileText,
  FlaskConical,
  ShieldCheck,
  Truck,
} from "lucide-react";
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
  const productTheme = getHeroCategoryTheme(product.heroCategory);
  const categoryHref = `/shop?category=${getHeroCategoryHrefParam(product.heroCategory)}`;
  const savings = (product.originalPrice - product.price).toFixed(0);

  const trustPoints = [
    {
      icon: ShieldCheck,
      title: "COA documented",
      body: "Batch-level purity documentation included with every kit.",
    },
    {
      icon: FlaskConical,
      title: "Prep essentials included",
      body: "Water, syringes, swabs, and guide bundled together.",
    },
    {
      icon: Truck,
      title: "Shipped discreetly",
      body: "Fast domestic delivery in plain, unmarked packaging.",
    },
  ];

  return (
    <main>
      <section
        className="relative overflow-hidden pt-24 sm:pt-28"
        style={{
          background: `linear-gradient(162deg, ${productTheme.accentDeep} 0%, #0d262d 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 78% 18%, ${productTheme.soft}55, transparent 28%), radial-gradient(circle at 16% 22%, rgba(255,255,255,0.06), transparent 24%)`,
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
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

          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm sm:p-5">
              <div
                className="relative aspect-square overflow-hidden rounded-[1.5rem]"
                style={{ backgroundColor: productTheme.heroTone }}
              >
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 18%, ${productTheme.soft} 0%, transparent 44%)`,
                  }}
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

              <div className="mt-4 rounded-[1.4rem] bg-white/10 px-4 py-3 text-sm text-white/84 ring-1 ring-white/10">
                Complete kit includes bacteriostatic water, precision syringes, alcohol swabs, and a reconstitution guide.
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(13,38,45,0.45)] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: productTheme.accent }}>
                {product.heroCategory}
              </p>
              <h1 className="mt-3 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0d262d] sm:text-[3.4rem]">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-[#0d262d]/66 sm:text-[1.05rem]">
                {product.description}
              </p>

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-3">
                <div className="flex items-end gap-3">
                  <span className="text-[2rem] font-semibold tracking-[-0.04em] text-[#0d262d] sm:text-[2.5rem]">
                    ${product.price}
                  </span>
                  <span className="pb-1 text-base text-[#0d262d]/38 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <Badge
                  className="border-0 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em]"
                  style={{ backgroundColor: productTheme.softAlt, color: productTheme.accent }}
                >
                  SAVE ${savings}
                </Badge>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[1.25rem] border px-4 py-4"
                    style={{ backgroundColor: productTheme.softAlt, borderColor: productTheme.soft }}
                  >
                    <point.icon className="h-4.5 w-4.5" style={{ color: productTheme.accent }} />
                    <h2 className="mt-3 text-sm font-semibold text-[#0d262d]">{point.title}</h2>
                    <p className="mt-1 text-[13px] leading-5 text-[#0d262d]/62">{point.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={categoryHref}
                  className="tg-link-pill inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: productTheme.accent }}
                >
                  Browse more {product.heroCategory}
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="tg-link-pill inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold"
                  style={{ borderColor: productTheme.soft, color: productTheme.accent, backgroundColor: productTheme.softAlt }}
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
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12">
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: productTheme.accent }}>
              About this kit
            </p>
            <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.35rem]">
              Clean workflow, clearer prep.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#0d262d]/68 sm:text-[16px]">
              {product.longDescription}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] p-5" style={{ backgroundColor: productTheme.softAlt }}>
                <p className="text-sm font-semibold text-[#0d262d]">Why researchers choose this setup</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Pre-bundled essentials reduce sourcing friction.",
                    "Category-matched workflow for faster product discovery.",
                    "Consistent documentation and storage guidance included.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#0d262d]/68">
                      <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: productTheme.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.4rem] border p-5" style={{ borderColor: productTheme.soft }}>
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0d262d]">
                  <FileText className="h-4.5 w-4.5" style={{ color: productTheme.accent }} />
                  Documentation included
                </p>
                <p className="mt-4 text-[14px] leading-6 text-[#0d262d]/68">
                  Every Teragenix kit is built to feel complete on arrival, with the handling details and supporting materials researchers expect.
                </p>
                <div className="mt-4 rounded-[1rem] px-4 py-3 text-[13px] leading-5" style={{ backgroundColor: productTheme.softAlt, color: productTheme.accentDeep }}>
                  Category fit: {product.heroCategory}. This product page now uses the same category language and color system as the rest of the catalog.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div id="kit-includes" className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: productTheme.accent }}>
                Kit includes
              </p>
              <h2 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.03em] text-[#0d262d] sm:text-[1.8rem]">
                Everything needed to start cleanly.
              </h2>
              <ul className="mt-6 space-y-3.5">
                {product.kitIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[#0d262d]/70">
                    <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: productTheme.accent }} />
                    <span className="text-[#0d262d]/72">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: productTheme.accent }}>
                Technical specs
              </p>
              <div className="mt-5 grid gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[1.2rem] border px-4 py-4"
                    style={{ backgroundColor: productTheme.softAlt, borderColor: productTheme.soft }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: productTheme.accent }}>
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
                <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: productTheme.accent }}>
                  Related kits
                </p>
                <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.2rem]">
                  Explore the rest of the {product.heroCategory.toLowerCase()} lineup.
                </h2>
              </div>
              <Link
                href={categoryHref}
                className="tg-link-pill hidden items-center rounded-full px-5 py-3 text-sm font-semibold text-white sm:inline-flex"
                style={{ backgroundColor: productTheme.accent }}
              >
                View category
                <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
              </Link>
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
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 18%, ${relatedTheme.soft} 0%, transparent 44%)`,
                        }}
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
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full"
                          style={{ backgroundColor: relatedTheme.softAlt, color: relatedTheme.accent }}
                        >
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
