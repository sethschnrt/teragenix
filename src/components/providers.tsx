"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AccessibilityWidget } from "@/components/accessibility-widget";
import { AgeGate, AGE_GATE_MAX_AGE_MS, AGE_GATE_STORAGE_KEY } from "@/components/age-gate";
import { CartProvider } from "@/components/cart-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { CartDrawer } from "@/components/cart-drawer";
import { Navbar } from "@/components/navbar";

const appChromeHiddenPrefixes = ["/admin", "/account"];
const appChromeHiddenRoutes = new Set(["/login", "/signup"]);

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ageGateAccepted, setAgeGateAccepted] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      const raw = window.localStorage.getItem(AGE_GATE_STORAGE_KEY);
      if (!raw) return false;

      const parsed = JSON.parse(raw) as { acceptedAt?: number };
      const acceptedAt = typeof parsed?.acceptedAt === "number" ? parsed.acceptedAt : 0;
      return Date.now() - acceptedAt <= AGE_GATE_MAX_AGE_MS;
    } catch {
      return false;
    }
  });
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
        {showNavbar ? <AccessibilityWidget enabled={!showAgeGate || ageGateAccepted} /> : null}
        <AgeGate enabled={showAgeGate} onAccepted={() => setAgeGateAccepted(true)} />
        <CookieBanner enabled={showCookieBanner && (!showAgeGate || ageGateAccepted)} />
      </CartProvider>
    </SessionProvider>
  );
}

