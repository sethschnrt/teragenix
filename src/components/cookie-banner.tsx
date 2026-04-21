"use client";

import Link from "next/link";
import { useState } from "react";

const STORAGE_KEY = "teragenix-cookie-consent-v1";
const COOKIE_NAME = "teragenix_cookie_consent";
const AGE_GATE_KEY = "teragenix-age-gate-v1";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const AGE_GATE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

type CookieBannerProps = {
  enabled?: boolean;
};

export function CookieBanner({ enabled = true }: CookieBannerProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined" || !enabled) return false;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const ageRaw = window.localStorage.getItem(AGE_GATE_KEY);
      const ageAcceptedAt = ageRaw ? (JSON.parse(ageRaw) as { acceptedAt?: number }).acceptedAt ?? 0 : 0;
      const ageAccepted = Date.now() - ageAcceptedAt <= AGE_GATE_MAX_AGE_MS;

      return ageAccepted && stored !== "accepted";
    } catch {
      return false;
    }
  });

  function acceptCookies() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore storage failures and still set cookie below
    }

    document.cookie = `${COOKIE_NAME}=accepted; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
    setVisible(false);
  }

  if (!enabled || !visible) return null;

  return (
    <div data-site-chrome="cookie-banner" className="fixed inset-x-0 bottom-0 z-[110] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-4 rounded-[1.5rem] border border-[#dbe6f5] bg-white/96 p-4 text-[#0d262d] shadow-[0_20px_50px_rgba(13,38,45,0.16)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-4">
        <div className="max-w-[42rem]">
          <p className="text-sm font-semibold text-[#0d262d]">Cookie notice</p>
          <p className="mt-1 text-sm leading-6 text-[#5b6b7b]">
            Teragenix uses cookies and similar tools to keep the site working, understand traffic, and improve the experience. By continuing, you accept that use.
            <Link href="/privacy-policy" className="ml-1 font-semibold text-[#173f85] underline-offset-4 hover:underline">
              Read privacy policy
            </Link>
          </p>
        </div>

        <button
          type="button"
          onClick={acceptCookies}
          className="tg-link-pill inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#3b6ed6] px-5 text-sm font-semibold text-white transition hover:bg-[#2d5bbf]"
        >
          Accept cookies
        </button>
      </div>
    </div>
  );
}
