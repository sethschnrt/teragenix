"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import { products, shopCategories, normalizeCategoryParam, getHeroCategoryTagClasses, getHeroCategoryTheme, type ShopCategory } from "@/data/products";
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
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const sortOptions: SortOption[] = ["featured", "price-asc", "price-desc", "name-asc"];

  useEffect(() => {
    const categoryFromUrl = normalizeCategoryParam(searchParams.get("category"));
    setActiveCategory(categoryFromUrl ?? "All");
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter((p) =>
        [p.name, p.description, p.category, p.heroCategory, p.slug].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.heroCategory === activeCategory);
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
  }, [activeCategory, searchQuery, sortBy]);

  const currentTheme = getHeroCategoryTheme(activeCategory);

  return (
    <main>
      <section
        className="relative overflow-hidden pt-20 sm:pt-[5.5rem]"
        style={{
          background: "linear-gradient(162deg, #1e4a9e 0%, #0d262d 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 76% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-5 sm:px-8 sm:pb-6 lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14 backdrop-blur-sm">
                SHOP TERAGENIX
              </span>
              <span className="text-[12px] text-white/60">
                Compare kits faster with less catalog clutter
              </span>
            </div>

            <h1 className="text-[2rem] font-semibold leading-[0.96] tracking-[-0.035em] text-white sm:text-[2.45rem]">
              Research kits, without the clutter.
            </h1>
            <p className="mt-2 max-w-xl text-[0.96rem] leading-6 text-white/72">
              Browse by category, search by compound, and compare kit format, specs, and price faster.
            </p>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="mb-5 rounded-[1.5rem] border border-[#e3e8ef] bg-white p-4 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: currentTheme.accent }}>
                    Browse by category
                  </p>
                  <p className="mt-1 text-sm text-[#0d262d]/60">
                    Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <label className="relative inline-flex w-full items-center sm:min-w-[280px] lg:w-[320px]">
                    <span className="sr-only">Search products</span>
                    <Search className="pointer-events-none absolute left-4 h-4 w-4 text-[#64748b]" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search compounds or kit names"
                      className="w-full rounded-full border px-11 py-2.5 pr-10 text-sm text-[#0d262d] outline-none transition"
                      style={{
                        borderColor: currentTheme.soft,
                        backgroundColor: "#ffffff",
                      }}
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#64748b]"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </label>

                  <label className="relative inline-flex w-full items-center sm:max-w-[220px] lg:w-[220px]">
                    <span className="sr-only">Sort products</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full appearance-none rounded-full px-4 py-2.5 pr-10 text-sm font-medium text-[#0d262d] outline-none transition"
                      style={{
                        borderColor: currentTheme.soft,
                        backgroundColor: currentTheme.softAlt,
                      }}
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          Sort: {sortLabels[option]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-[#475967]" />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
              {shopCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                  style={
                    activeCategory === cat
                      ? {
                          backgroundColor: getHeroCategoryTheme(cat).accent,
                          color: "#ffffff",
                        }
                      : {
                          backgroundColor: getHeroCategoryTheme(cat).softAlt,
                          color: getHeroCategoryTheme(cat).accent,
                        }
                  }
                >
                  {cat}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Product grid — same style as FeaturedProducts */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {filtered.map((product) => {
              const productTheme = getHeroCategoryTheme(product.heroCategory);

              return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="tg-link-card group relative flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ring-1 ring-foreground/10"
              >
                {/* Product image */}
                <div className="relative aspect-square flex items-center justify-center overflow-hidden" style={{ backgroundColor: productTheme.heroTone }}>
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 18%, ${productTheme.soft} 0%, transparent 44%)`,
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${product.image}`}
                    alt={product.name}
                    className="tg-link-card-media absolute inset-0 h-full w-full object-cover"
                  />
                  <Badge
                    className={`absolute left-3 top-3 border-0 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${getHeroCategoryTagClasses(product.heroCategory)}`}
                  >
                    {product.heroCategory.toUpperCase()}
                  </Badge>
                </div>

                {/* Info section */}
                <div className="flex flex-col flex-1 gap-2.5 px-5 pb-5 pt-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Price + cart */}
                  <div className="flex items-end justify-between gap-3 pt-3">
                    <div className="min-w-0">
                      <span className="block text-base font-bold text-foreground sm:text-lg">
                        ${product.price}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground line-through sm:mt-0 sm:text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9" style={{ backgroundColor: productTheme.softAlt, color: productTheme.accent }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )})}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No kits match this filter.
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
