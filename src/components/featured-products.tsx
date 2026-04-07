"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProducts } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const cardTones = [
  { bg: "#deede0", ink: "#1b6549" },
  { bg: "#ebf6ff", ink: "#3a5d8c" },
  { bg: "#f2e6ec", ink: "#9a3a66" },
  { bg: "#f2ebe1", ink: "#7b5522" },
];

export function FeaturedProducts() {
  const displayed = featuredProducts.slice(0, 4);

  return (
    <section id="featured" className="relative bg-[#faf9f7] pb-24 pt-24 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Editorial header */}
        <div className="mb-16 flex flex-col gap-8 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 font-display text-[11px] font-medium tracking-[0.22em] text-[#1b6549]">
              FEATURED KITS
            </p>
            <h2 className="font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#171a18] sm:text-[3.6rem]">
              Research-ready, <br className="hidden sm:block" />
              <span className="italic text-[#1b6549]">straight</span> out of the box.
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-7 text-[#242220]/65">
              Every Teragenix kit ships with the compound, bacteriostatic water, precision syringes, and alcohol swabs — inspected and bundled before it leaves the lab.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex h-12 items-center self-start rounded-full border border-[#1b6549] bg-transparent px-6 text-[13px] font-semibold tracking-tight text-[#1b6549] transition hover:bg-[#1b6549] hover:text-white sm:self-end"
          >
            View full catalog
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayed.map((product, i) => {
            const tone = cardTones[i % cardTones.length];
            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[#ebe5dc] transition-all hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(17,33,17,0.25)]"
              >
                {/* Dark product photo panel with pastel accent bar */}
                <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-[#0a1510]">
                  {/* pastel gradient wash behind vial */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 45%, ${tone.bg} 0%, transparent 60%)`,
                    }}
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${product.image}`}
                    alt={product.name}
                    className="relative h-[90%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                  />

                  {product.badge && (
                    <span
                      className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.16em] shadow-lg"
                      style={{ color: tone.ink }}
                    >
                      {product.badge.toUpperCase()}
                    </span>
                  )}

                  {/* category chip bottom-left */}
                  <span
                    className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-display text-[9px] font-medium tracking-[0.2em] text-white/85 backdrop-blur"
                  >
                    {product.category.toUpperCase()}
                  </span>

                  {/* colored accent stripe bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: tone.bg }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-5">
                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-[#171a18]">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-[13px] leading-relaxed text-[#242220]/60">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold tracking-tight text-[#171a18]">
                        ${product.price}
                      </span>
                      <span className="text-xs text-[#242220]/40 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f0ed] text-[#171a18] transition group-hover:bg-[#1b6549] group-hover:text-white">
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
