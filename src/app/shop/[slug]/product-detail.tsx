"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Footer } from "@/components/footer";
import type { Product } from "@/data/products";
import { getHeroCategoryTagClasses, getHeroCategoryTheme } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const productTheme = getHeroCategoryTheme(product.heroCategory);

  return (
    <main>
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="tg-link-text hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="tg-link-text hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute left-4 top-4 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${getHeroCategoryTagClasses(product.heroCategory)}`}
              >
                {product.heroCategory.toUpperCase()}
              </Badge>
            </div>

            {/* Right — Info */}
            <div className="flex flex-col">
              <p className="text-sm font-medium uppercase tracking-wider">
                <span style={{ color: productTheme.accent }}>{product.heroCategory}</span>
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1a2a3a] dark:text-white sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge className="border-0 text-xs font-semibold" style={{ backgroundColor: productTheme.softAlt, color: productTheme.accent }}>
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="mt-8 w-full px-8 text-base font-semibold text-white transition-none sm:w-auto"
                style={{ backgroundColor: productTheme.accent }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              {/* Specifications */}
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-lg border px-4 py-3"
                      style={{ backgroundColor: productTheme.softAlt, borderColor: productTheme.soft }}
                    >
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {key}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kit includes */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Kit Includes
                </h2>
                <ul className="space-y-2.5">
                  {product.kitIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: productTheme.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Long description */}
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#1a2a3a] dark:text-white mb-4">
              About This Product
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              {product.longDescription}
            </p>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-[#1a2a3a] dark:text-white mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {relatedProducts.slice(0, 3).map((rp) => {
                  const relatedTheme = getHeroCategoryTheme(rp.heroCategory);

                  return (
                  <Link
                    key={rp.slug}
                    href={`/shop/${rp.slug}`}
                    className="tg-link-card group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ring-1 ring-foreground/10"
                  >
                    <div className="relative aspect-square flex items-center justify-center overflow-hidden" style={{ backgroundColor: relatedTheme.heroTone }}>
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
                    <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                          {rp.name}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                        {rp.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-bold text-foreground">
                            ${rp.price}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">
                            ${rp.originalPrice}
                          </span>
                        </div>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: relatedTheme.softAlt, color: relatedTheme.accent }}>
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )})}
              </div>
            </div>
          )}

          {/* Back to shop */}
          <div className="mt-12">
            <Link href="/shop">
              <Button variant="outline" className="tg-link-pill text-sm font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
