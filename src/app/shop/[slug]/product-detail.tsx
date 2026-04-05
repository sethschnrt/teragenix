"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { Footer } from "@/components/footer";
import type { Product } from "@/data/products";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  return (
    <main>
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="hover:text-foreground transition-colors">
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
              {product.badge && (
                <Badge
                  className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-semibold border-0 px-3 py-1`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Right — Info */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-[#4A90D9] uppercase tracking-wider">
                {product.category}
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
                <Badge variant="secondary" className="text-xs font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="mt-8 bg-[#4A90D9] hover:bg-[#3A7BC8] text-white px-8 text-base font-semibold w-full sm:w-auto"
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
                      className="rounded-lg border bg-muted/30 px-4 py-3"
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
                      <Check className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
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
                {relatedProducts.slice(0, 3).map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/shop/${rp.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ring-1 ring-foreground/10 transition-all hover:shadow-lg hover:border-[#4A90D9]/30"
                  >
                    <div className="relative aspect-square bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${rp.image}`}
                        alt={rp.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {rp.badge && (
                        <Badge
                          className={`absolute top-3 left-3 ${rp.badgeColor} text-white text-[10px] font-semibold border-0`}
                        >
                          {rp.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
                      <div>
                        <p className="text-xs font-medium text-[#4A90D9] uppercase tracking-wider">
                          {rp.category}
                        </p>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mt-1">
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
          )}

          {/* Back to shop */}
          <div className="mt-12">
            <Link href="/shop">
              <Button variant="outline" className="text-sm font-medium">
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
