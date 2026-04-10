"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { products } from "@/data/products";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const heroNavPaths = [
  "/",
  "/shop",
  "/about",
  "/faq",
  "/privacy-policy",
  "/terms-of-use",
  "/shipping-policy",
  "/refund-policy",
  "/research-disclaimer",
];

function isHeroNavPath(pathname: string) {
  return heroNavPaths.includes(pathname) || pathname.startsWith("/shop/");
}

function SearchBox({
  query,
  setQuery,
  useHero,
  onSubmit,
  onResultClick,
  mobile = false,
}: {
  query: string;
  setQuery: (value: string) => void;
  useHero: boolean;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  onResultClick?: () => void;
  mobile?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return products
      .filter((product) => product.name.toLowerCase().includes(trimmed))
      .slice(0, 6);
  }, [query]);

  const showDropdown = focused && query.trim().length > 0;
  const inputClasses = mobile
    ? "border-[#dbe6f5] bg-[#f8fbff] text-[#0d262d] placeholder:text-[#64748b]"
    : useHero
      ? "border-white/16 bg-white/10 text-white placeholder:text-white/55"
      : "border-[#dbe6f5] bg-[#f8fbff] text-[#0d262d] placeholder:text-[#64748b]";

  return (
    <div
      className="relative"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => {
        window.setTimeout(() => setFocused(false), 120);
      }}
    >
      <form onSubmit={onSubmit}>
        <label className="relative block">
          <span className="sr-only">Search the site</span>
          <Search
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              mobile ? "text-[#64748b]" : useHero ? "text-white/60" : "text-[#64748b]"
            }`}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search compounds"
            className={`h-10 w-full rounded-full border pl-10 pr-4 text-sm outline-none transition ${inputClasses} ${
              mobile ? "h-11" : ""
            }`}
          />
        </label>
      </form>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[60] overflow-hidden rounded-2xl border border-[#dbe6f5] bg-white shadow-[0_18px_50px_rgba(13,38,45,0.16)]">
          {matches.length > 0 ? (
            <div className="py-2">
              {matches.map((product) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  onClick={() => {
                    setFocused(false);
                    onResultClick?.();
                  }}
                  className="tg-link-text flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#f8fbff]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0d262d]">{product.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#64748b]">
                      {product.heroCategory}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#3b6ed6]">${product.price}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-sm text-[#64748b]">No matching products.</div>
          )}

          <button
            type="button"
            onClick={() => onSubmit()}
            className="flex w-full items-center justify-between border-t border-[#eef3f9] px-4 py-3 text-left text-sm font-semibold text-[#173f85] hover:bg-[#f8fbff]"
          >
            <span>View all results for “{query.trim()}”</span>
            <span>→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = (pathname.replace(/^\/teragenix(?=\/|$)/, "") || "/").replace(/\/$/, "") || "/";
  const useHeroNav = isHeroNavPath(normalizedPath);

  function goToSearchResults() {
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setOpen(false);
  }

  function submitSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    goToSearchResults();
  }

  return (
    <header
      className={`absolute top-0 z-50 w-full ${
        useHeroNav
          ? "bg-transparent"
          : "sticky border-b border-[#e3e8ef] bg-white/92 backdrop-blur supports-[backdrop-filter]:bg-white/75"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <Logo
            size="sm"
            theme={useHeroNav ? "light" : "default"}
            className="w-[78px] sm:w-[98px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`tg-link-text text-[13px] font-medium tracking-tight ${
                useHeroNav ? "text-white/85 hover:text-white" : "text-[#475967] hover:text-[#0d262d]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden w-[250px] lg:block">
            <SearchBox
              query={query}
              setQuery={setQuery}
              useHero={useHeroNav}
              onSubmit={submitSearch}
            />
          </div>

          <Link
            href="/shop"
            className={`tg-link-pill hidden h-9 items-center rounded-full px-4 text-[13px] font-semibold tracking-tight sm:inline-flex ${
              useHeroNav
                ? "bg-white text-[#0d262d] hover:bg-[#eef4fc]"
                : "bg-[#3b6ed6] text-white hover:bg-[#2d5bbf]"
            }`}
          >
            Shop kits
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:hidden ${
                useHeroNav ? "text-white hover:bg-transparent" : "text-[#0d262d] hover:bg-transparent"
              }`}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-6 px-4">
                <Logo size="lg" className="w-[140px]" />

                <SearchBox
                  query={query}
                  setQuery={setQuery}
                  useHero={false}
                  onSubmit={submitSearch}
                  onResultClick={() => setOpen(false)}
                  mobile
                />

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="tg-link-text text-lg font-medium text-[#0d262d] hover:text-[#3b6ed6]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
