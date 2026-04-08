"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`absolute top-0 z-50 w-full ${
        isHome ? "bg-transparent" : "sticky border-b border-[#e3e8ef] bg-white/92 backdrop-blur supports-[backdrop-filter]:bg-white/75"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="md" theme={isHome ? "light" : "default"} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`tg-link-text text-[13px] font-medium tracking-tight ${
                isHome
                  ? "text-white/85 hover:text-white"
                  : "text-[#475967] hover:text-[#0d262d]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className={`tg-link-pill hidden sm:inline-flex h-9 items-center rounded-full px-4 text-[13px] font-semibold tracking-tight ${
              isHome
                ? "bg-white text-[#0d262d] hover:bg-[#eef4fc]"
                : "bg-[#3b6ed6] text-white hover:bg-[#2d5bbf]"
            }`}
          >
            Shop kits
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className={`relative h-9 w-9 rounded-full ${
              isHome
                ? "text-white hover:bg-transparent hover:text-white"
                : "text-[#0d262d] hover:bg-transparent hover:text-[#0d262d]"
            }`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#eb8771] text-[9px] font-bold text-white">
              0
            </span>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={`md:hidden inline-flex shrink-0 items-center justify-center rounded-full h-9 w-9 ${
                isHome ? "text-white hover:bg-transparent" : "text-[#0d262d] hover:bg-transparent"
              }`}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-6 px-4">
                <Logo size="lg" />
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
