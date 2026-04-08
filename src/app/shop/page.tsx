"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { products, categories, getHeroCategoryLabel, normalizeCategoryParam, type Category } from "@/data/products";
import { Footer } from "@/components/footer";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  "name-asc": "Name: A → Z",
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const sortOptions: SortOption[] = ["featured", "price-asc", "price-desc", "name-asc"];

  useEffect(() => {
    const categoryFromUrl = normalizeCategoryParam(searchParams.get("category"));
    setActiveCategory(categoryFromUrl ?? "All");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== "All") {
      if (activeCategory === "Bundles") {
        result = result.filter(
          (p) =>
            p.slug === "recovery-stack" ||
            p.name.toLowerCase().includes("stack")
        );
      } else {
        result = result.filter((p) => p.category === activeCategory);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Featured products (with badges) first, then by price desc
        result.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return b.price - a.price;
        });
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] pt-24 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 76% 18%, rgba(168,197,245,0.18), transparent 28%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-7 sm:px-8 sm:pb-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-2 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14 backdrop-blur-sm">
                SHOP TERAGENIX
              </span>
              <span className="text-[12px] text-white/60">
                99%+ purity, complete kits, fast discreet shipping
              </span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.035em] text-white sm:text-[2.8rem]">
                  Research kits, without the clutter.
                </h1>
                <p className="mt-3 max-w-2xl text-[0.98rem] leading-6 text-white/72 sm:text-[1.02rem]">
                  Filter by goal, compare fast, and get straight into the products.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link
                  href="/shop?category=metabolic"
                  className="tg-link-pill inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3.5 py-2 text-[12px] font-medium text-white/88 backdrop-blur-sm hover:bg-white/16"
                >
                  Fat Loss
                </Link>
                <Link
                  href="/shop?category=research"
                  className="tg-link-pill inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3.5 py-2 text-[12px] font-medium text-white/88 backdrop-blur-sm hover:bg-white/16"
                >
                  Vitality
                </Link>
                <Link
                  href="/shop?category=beauty"
                  className="tg-link-pill inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3.5 py-2 text-[12px] font-medium text-white/88 backdrop-blur-sm hover:bg-white/16"
                >
                  Longevity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-[1.5rem] border border-[#e3e8ef] bg-white p-4 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">
                    Browse by category
                  </p>
                  <p className="mt-1 text-sm text-[#0d262d]/60">
                    Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors ${
                        sortBy === option
                          ? "bg-[#0d262d] text-white"
                          : "bg-[#f4f6f8] text-[#475967]"
                      }`}
                    >
                      {sortLabels[option]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#4A90D9] text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Product grid — same style as FeaturedProducts */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="tg-link-card group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ring-1 ring-foreground/10"
              >
                {/* Product image */}
                <div className="relative aspect-square bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${product.image}`}
                    alt={product.name}
                    className="tg-link-card-media absolute inset-0 h-full w-full object-cover"
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
                      {getHeroCategoryLabel(product.category)}
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mt-1">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Price + cart */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-foreground">
                        ${product.price}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4fc] text-[#0d262d]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No products found in this category.
              </p>
              <Button
                variant="outline"
                className="mt-4 transition-none hover:bg-background hover:text-foreground"
                onClick={() => setActiveCategory("All")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                View all products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
