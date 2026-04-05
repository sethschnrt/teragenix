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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a3a] dark:text-white sm:text-4xl">
            Featured Research Kits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need in one box. No separate purchases, no missing
            supplies.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {displayed.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ring-1 ring-foreground/10 transition-all hover:shadow-lg hover:border-[#4A90D9]/30"
            >
              {/* Product image */}
              <div className="relative aspect-square bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${product.image}`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge
                    className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-semibold border-0`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Info section */}
              <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
                <div>
                  <p className="text-xs font-medium text-[#4A90D9] uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mt-1">
                    {product.name}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Price + cart — vertically centered */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#4A90D9] hover:bg-[#3A7BC8] text-white"
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
