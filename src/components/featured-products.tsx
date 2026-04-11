"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { featuredProducts, getHeroCategoryLabel, getHeroCategoryTagClasses, getHeroCategoryTheme } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export function FeaturedProducts() {
  const displayed = featuredProducts.slice(0, 4);

  return (
    <section id="featured" className="relative bg-[#f4f8ff] pb-16 pt-16 sm:pb-[4.5rem] sm:pt-[4.5rem]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Editorial header */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 font-sans text-[11px] font-medium tracking-[0.22em] text-[#3b6ed6]">
              FEATURED KITS
            </p>
            <h2 className="font-sans text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0d262d] sm:text-[3.6rem]">
              Better peptides, <br className="hidden sm:block" />
              built into <span className="italic text-[#3b6ed6]">premium kits</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-7 text-[#0d262d]/65">
              These are the core kits buyers come for first: premium peptides paired with prep essentials, visible specs, and a cleaner all-in-one format.
            </p>
          </div>

          <Link
            href="/shop"
            className="tg-link-pill inline-flex h-12 items-center self-start rounded-full border border-[#3b6ed6] bg-transparent px-6 text-[13px] font-semibold tracking-tight text-[#3b6ed6] hover:bg-[#3b6ed6] hover:text-white sm:self-end"
          >
            View full catalog
            <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {displayed.map((product) => {
            const theme = getHeroCategoryTheme(product.heroCategory);
            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="tg-link-card group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[#e3e8ef]"
              >
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: theme.heroTone }}>
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 20%, ${theme.soft} 0%, transparent 46%)`,
                    }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${product.image}`}
                    alt={product.name}
                    className="tg-link-card-media h-full w-full object-cover"
                    style={{ transform: "scale(1.08)" }}
                  />

                  <Badge
                    className={`absolute left-4 top-4 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] shadow-lg ${getHeroCategoryTagClasses(product.heroCategory)}`}
                  >
                    {getHeroCategoryLabel(product.heroCategory).toUpperCase()}
                  </Badge>

                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-5">
                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-[#0d262d]">
                    {product.name}
                  </h3>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3b6ed6]/90">
                    {getHeroCategoryLabel(product.heroCategory)} • {product.specifications.quantity}
                  </p>

                  <p className="line-clamp-2 text-[13px] leading-relaxed text-[#0d262d]/60">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <div className="min-w-0">
                      <span className="block text-xl font-semibold tracking-tight text-[#0d262d]">
                        ${product.price}
                      </span>
                      <span className="mt-1 block text-xs text-[#0d262d]/40 line-through sm:mt-0">
                        ${product.originalPrice}
                      </span>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition sm:h-9 sm:w-9" style={{ backgroundColor: theme.softAlt, color: theme.accent }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
