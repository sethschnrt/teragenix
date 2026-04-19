"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { Navbar } from "@/components/navbar";

const appChromeHiddenPrefixes = ["/admin", "/account"];
const appChromeHiddenRoutes = new Set(["/login", "/signup"]);

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/";
  const showNavbar =
    !appChromeHiddenRoutes.has(normalizedPath) &&
    !appChromeHiddenPrefixes.some((prefix) => normalizedPath.startsWith(prefix));

  return (
    <SessionProvider>
      <CartProvider>
        {showNavbar ? <Navbar /> : null}
        {children}
        <CartDrawer />
      </CartProvider>
    </SessionProvider>
  );
}

