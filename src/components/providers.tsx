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
        const clientDpl = document.documentElement.dataset.dplId;
        if (!clientDpl) return;

        const response = await fetch(window.location.href, {
          cache: "no-store",
          credentials: "same-origin",
          headers: {
            Accept: "text/html",
          },
        });

        if (!response.ok) return;

        const html = await response.text();
        if (cancelled) return;

        const serverDpl = html.match(/data-dpl-id="([^"]+)"/)?.[1];
        if (!serverDpl || serverDpl === clientDpl) return;

        const reloadKey = `teragenix-dpl-refresh:${serverDpl}:${normalizedPath}`;
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
