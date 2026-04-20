"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "teragenix-age-gate-v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

type AgeGateProps = {
  enabled?: boolean;
};

export function AgeGate({ enabled = true }: AgeGateProps) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOpen(false);
      setReady(true);
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setOpen(true);
        setReady(true);
        return;
      }

      const parsed = JSON.parse(raw) as { acceptedAt?: number };
      const acceptedAt = typeof parsed?.acceptedAt === "number" ? parsed.acceptedAt : 0;
      setOpen(Date.now() - acceptedAt > MAX_AGE_MS);
    } catch {
      setOpen(true);
    } finally {
      setReady(true);
    }
  }, [enabled]);

  useEffect(() => {
    if (!ready || !open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, ready]);

  function confirmAge() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ acceptedAt: Date.now() }));
    setOpen(false);
  }

  function leaveSite() {
    window.location.href = "https://www.google.com";
  }

  if (!enabled || !ready || !open) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#06111a]/72 px-4 py-4 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-[420px] rounded-[1.5rem] bg-white p-5 text-[#0d262d] shadow-[0_30px_80px_rgba(6,17,26,0.36)] sm:p-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">
          Age verification
        </p>
        <h2 className="mt-3 text-[1.9rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#0d262d] sm:text-[2.2rem]">
          18+ only
        </h2>
        <p className="mt-3 text-[14px] leading-6 text-[#5b6b7b] sm:text-[15px]">
          By entering, you confirm you are 18 or older and understand these products are presented for research use only.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={confirmAge}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#3b6ed6] px-5 text-sm font-semibold text-white transition hover:bg-[#2d5bbf]"
          >
            Enter site
          </button>
          <button
            type="button"
            onClick={leaveSite}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f8fbff] px-5 text-sm font-semibold text-[#173f85] transition hover:bg-[#eef4fc]"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
