"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowUpRight, Menu, Search, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "./cart-provider";

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
      .filter(
        (product) =>
          product.name.toLowerCase().includes(trimmed) ||
          product.shortName.toLowerCase().includes(trimmed),
      )
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
                  className="tg-link-text group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f8fbff]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0d262d]">{product.shortName}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#64748b]">
                      <span className="uppercase tracking-[0.12em] text-[#3b6ed6]">
                        {product.heroCategory}
                      </span>
                      <span className="text-[#c5cfdb]">•</span>
                      <span>Research peptide</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block text-sm font-semibold text-[#3b6ed6]">${product.price}</span>
                    <span className="mt-1 inline-flex items-center text-[11px] font-medium text-[#64748b] transition-colors group-hover:text-[#173f85]">
                      View
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
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
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname() ?? "/";
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
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <Logo
            size="sm"
            theme={useHeroNav ? "light" : "default"}
            className="w-[78px] sm:w-[98px]"
          />
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden w-[250px] lg:block xl:w-[280px]">
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
            Shop peptides
          </Link>

          <Link
            href={session?.user ? "/account" : "/login"}
            className={`tg-link-pill hidden h-9 items-center rounded-full px-4 text-[13px] font-semibold tracking-tight lg:inline-flex ${
              useHeroNav
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/16"
                : "border border-[#dbe6f5] bg-white text-[#0d262d] hover:bg-[#f8fbff]"
            }`}
          >
            {session?.user ? "Account" : "Sign in"}
          </Link>

          <Link
            href="/cart"
            className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              useHeroNav ? "text-white hover:bg-transparent" : "text-[#0d262d] hover:bg-transparent"
            }`}
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#3b6ed6] px-1.5 text-[10px] font-semibold leading-5 text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                useHeroNav ? "text-white hover:bg-transparent" : "text-[#0d262d] hover:bg-transparent"
              }`}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white sm:w-[320px]">
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

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="tg-link-text text-lg font-medium text-[#0d262d] hover:text-[#3b6ed6]"
                >
                  Cart{itemCount > 0 ? ` (${itemCount})` : ""}
                </Link>

                <Link
                  href={session?.user ? "/account" : "/login"}
                  onClick={() => setOpen(false)}
                  className="tg-link-text text-lg font-medium text-[#0d262d] hover:text-[#3b6ed6]"
                >
                  {session?.user ? "Account" : "Sign in"}
                </Link>

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
