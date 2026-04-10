"use client";

import Link from "next/link";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = (pathname.replace(/^\/teragenix(?=\/|$)/, "") || "/").replace(/\/$/, "") || "/";
  const useHeroNav = isHeroNavPath(normalizedPath);

  function submitSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setOpen(false);
  }

  return (
    <header
      className={`absolute top-0 z-50 w-full ${
        useHeroNav ? "bg-transparent" : "sticky border-b border-[#e3e8ef] bg-white/92 backdrop-blur supports-[backdrop-filter]:bg-white/75"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo
            size="sm"
            theme={useHeroNav ? "light" : "default"}
            className="w-[78px] sm:w-[98px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`tg-link-text text-[13px] font-medium tracking-tight ${
                useHeroNav
                  ? "text-white/85 hover:text-white"
                  : "text-[#475967] hover:text-[#0d262d]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <form onSubmit={submitSearch} className="hidden lg:block">
            <label className="relative block w-[250px]">
              <span className="sr-only">Search the site</span>
              <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${useHeroNav ? "text-white/60" : "text-[#64748b]"}`} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search compounds"
                className={`h-10 w-full rounded-full border pl-10 pr-4 text-sm outline-none transition ${
                  useHeroNav
                    ? "border-white/16 bg-white/10 text-white placeholder:text-white/55"
                    : "border-[#dbe6f5] bg-[#f8fbff] text-[#0d262d] placeholder:text-[#64748b]"
                }`}
              />
            </label>
          </form>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className={`tg-link-pill hidden sm:inline-flex h-9 items-center rounded-full px-4 text-[13px] font-semibold tracking-tight ${
              useHeroNav
                ? "bg-white text-[#0d262d] hover:bg-[#eef4fc]"
                : "bg-[#3b6ed6] text-white hover:bg-[#2d5bbf]"
            }`}
          >
            Shop kits
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={`md:hidden inline-flex shrink-0 items-center justify-center rounded-full h-9 w-9 ${
                useHeroNav ? "text-white hover:bg-transparent" : "text-[#0d262d] hover:bg-transparent"
              }`}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-6 px-4">
                <Logo size="lg" className="w-[140px]" />

                <form onSubmit={submitSearch} className="mb-2">
                  <label className="relative block">
                    <span className="sr-only">Search the site</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search compounds"
                      className="h-11 w-full rounded-full border border-[#dbe6f5] bg-[#f8fbff] pl-10 pr-4 text-sm text-[#0d262d] outline-none"
                    />
                  </label>
                </form>

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
