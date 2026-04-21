"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { AccessibilityWidget } from "@/components/accessibility-widget";
import { AgeGate } from "@/components/age-gate";
import { CartProvider } from "@/components/cart-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { CartDrawer } from "@/components/cart-drawer";
import { Navbar } from "@/components/navbar";

const appChromeHiddenPrefixes = ["/admin", "/account"];
const appChromeHiddenRoutes = new Set(["/login", "/signup"]);

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const chromeReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/";
  const showNavbar =
    !appChromeHiddenRoutes.has(normalizedPath) &&
    !appChromeHiddenPrefixes.some((prefix) => normalizedPath.startsWith(prefix));
  const showAgeGate = showNavbar;
  const showCookieBanner = showNavbar;

  return (
    <SessionProvider>
      <CartProvider>
        {showNavbar ? <Navbar /> : null}
        {children}
        <CartDrawer />
        {showNavbar && chromeReady ? <AccessibilityWidget /> : null}
        {chromeReady ? <AgeGate enabled={showAgeGate} /> : null}
        {chromeReady ? <CookieBanner enabled={showCookieBanner} /> : null}
      </CartProvider>
    </SessionProvider>
  );
}

