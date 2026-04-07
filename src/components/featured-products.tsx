"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { featuredProducts } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export function FeaturedProducts() {
  // Show first 4 featured products (ones with badges)
  const displayed = featuredProducts.slice(0, 4);

  return (
    <section className="py-20 sm:py-24">
      <div className="medvi-shell">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="medvi-pill mb-5">Featured treatments</span>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
            A cleaner, softer way to shop your research essentials
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607487]">
            Premium presentation, simplified kit structure, and a medical-adjacent tone that feels more trusted than a generic supplement storefront.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {displayed.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/92 text-card-foreground shadow-[0_16px_50px_rgba(31,55,90,0.08)] ring-1 ring-[#dfeaf5] transition-all hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(31,55,90,0.12)]"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_top,#1a2a3a,#080b11)] p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${product.image}`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge
                    className={`absolute left-4 top-4 rounded-full ${product.badgeColor} border-0 px-3 py-1 text-[10px] font-semibold text-white shadow-sm`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Info section */}
              <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-tight text-[#193042] sm:text-lg">
                    {product.name}
                  </h3>
                </div>

                <p className="flex-1 text-sm leading-6 text-[#6a7f93]">
                  {product.description}
                </p>

                {/* Price + cart — vertically centered */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#193042] sm:text-xl">
                      ${product.price}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full bg-[#4A90D9] text-white shadow-sm hover:bg-[#3A7BC8]"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
