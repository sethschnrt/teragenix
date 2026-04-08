"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowLeft, ArrowUpRight, Store } from "lucide-react";
import { products, categories, type Category } from "@/data/products";
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
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);

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
      {/* Hero header */}
      <section className="bg-[#1a2a3a] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Store className="h-8 w-8 text-[#4A90D9]" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Research Kits
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Premium 99%+ purity peptides, each bundled with bacteriostatic
            water, syringes, and alcohol swabs. Everything you need in one box.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filters row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            {/* Category tabs */}
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

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors"
              >
                {sortLabels[sortBy]}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-card shadow-lg z-10">
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === option
                          ? "bg-[#4A90D9]/10 text-[#4A90D9] font-medium"
                          : "text-foreground"
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {sortLabels[option]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

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
                      {product.category}
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
