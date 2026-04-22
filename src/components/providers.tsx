"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/";
  const showNavbar =
    !appChromeHiddenRoutes.has(normalizedPath) &&
    !appChromeHiddenPrefixes.some((prefix) => normalizedPath.startsWith(prefix));
  const showAgeGate = showNavbar;
  const showCookieBanner = showNavbar;

  useEffect(() => {
    let cancelled = false;

    const checkDeployFreshness = async () => {
      try {
        const clientBuildId = document.documentElement.dataset.buildId;
        if (!clientBuildId) return;

        const response = await fetch(`/api/deploy-version?ts=${Date.now()}`, {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as { buildId?: string };
        if (cancelled) return;

        const serverBuildId = payload.buildId;
        if (!serverBuildId || serverBuildId === clientBuildId) return;

        const reloadKey = `teragenix-build-refresh:${serverBuildId}:${normalizedPath}`;
        if (window.sessionStorage.getItem(reloadKey) === "done") return;

        window.sessionStorage.setItem(reloadKey, "done");
        window.location.reload();
      } catch {
        // Ignore deploy freshness probe failures.
      }
    };

    void checkDeployFreshness();

    return () => {
      cancelled = true;
    };
  }, [normalizedPath]);

  return (
    <SessionProvider>
      <CartProvider>
        <div data-site-shell>
          {showNavbar ? <Navbar /> : null}
          {children}
          <CartDrawer />
          <AgeGate enabled={showAgeGate} />
          <CookieBanner enabled={showCookieBanner} />
        </div>
        {showNavbar ? <AccessibilityWidget /> : null}
      </CartProvider>
    </SessionProvider>
  );
}
