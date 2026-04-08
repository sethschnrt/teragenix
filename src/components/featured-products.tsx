"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProducts } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const cardTones = [
  { bg: "#dbeafe", ink: "#3b6ed6" },
  { bg: "#ebf6ff", ink: "#3a5d8c" },
  { bg: "#f2e6ec", ink: "#9a3a66" },
  { bg: "#f2ebe1", ink: "#7b5522" },
];

export function FeaturedProducts() {
  const displayed = featuredProducts.slice(0, 4);

  return (
    <section id="featured" className="relative bg-[#f4f8ff] pb-24 pt-24 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Editorial header */}
        <div className="mb-16 flex flex-col gap-8 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 font-sans text-[11px] font-medium tracking-[0.22em] text-[#3b6ed6]">
              FEATURED KITS
            </p>
            <h2 className="font-sans text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0d262d] sm:text-[3.6rem]">
              Research-ready, <br className="hidden sm:block" />
              <span className="italic text-[#3b6ed6]">straight</span> out of the box.
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-7 text-[#0d262d]/65">
              Every Teragenix kit ships with the compound, bacteriostatic water, precision syringes, and alcohol swabs — inspected and bundled before it leaves the lab.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex h-12 items-center self-start rounded-full border border-[#3b6ed6] bg-transparent px-6 text-[13px] font-semibold tracking-tight text-[#3b6ed6] transition hover:bg-[#3b6ed6] hover:text-white sm:self-end"
          >
            View full catalog
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {displayed.map((product, i) => {
            const tone = cardTones[i % cardTones.length];
            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[#e3e8ef] transition-all hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(17,33,17,0.25)]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#050505]">
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 20%, ${tone.bg} 0%, transparent 46%)`,
                    }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${product.image}`}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ transform: "scale(1.08)" }}
                  />

                  {product.badge && (
                    <span
                      className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 font-sans text-[10px] font-semibold tracking-[0.16em] shadow-lg"
                      style={{ color: tone.ink }}
                    >
                      {product.badge.toUpperCase()}
                    </span>
                  )}

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/18 bg-white/10 px-2.5 py-1 font-sans text-[9px] font-medium tracking-[0.2em] text-white/88 backdrop-blur">
                    {product.category.toUpperCase()}
                  </span>

                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: tone.bg }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-5">
                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-[#0d262d]">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-[13px] leading-relaxed text-[#0d262d]/60">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold tracking-tight text-[#0d262d]">
                        ${product.price}
                      </span>
                      <span className="text-xs text-[#0d262d]/40 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4fc] text-[#0d262d] transition group-hover:bg-[#3b6ed6] group-hover:text-white">
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
