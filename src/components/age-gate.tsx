"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

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

  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    [],
  );

  function confirmAge() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ acceptedAt: Date.now() }));
    setOpen(false);
  }

  function leaveSite() {
    window.location.href = "https://www.google.com";
  }

  if (!enabled || !ready || !open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#06111a]/72 px-4 py-6 backdrop-blur-sm sm:px-6">
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,_#ffffff_0%,_#f6f9fe_100%)] p-6 text-[#0d262d] shadow-[0_30px_80px_rgba(6,17,26,0.36)] sm:p-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ecf4ff] text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[#3b6ed6]">
          Age verification required
        </p>
        <h2 className="mt-3 text-[2rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#0d262d] sm:text-[2.4rem]">
          This site is for adults 18+
        </h2>
        <p className="mt-4 max-w-[32rem] text-[15px] leading-7 text-[#5b6b7b] sm:text-[16px]">
          By entering, you confirm that you are at least 18 years old and understand that Teragenix products are presented for lawful in-vitro research use only.
        </p>

        <div className="mt-6 rounded-[1.5rem] border border-[#dbe6f5] bg-white/88 p-4 sm:p-5">
          <p className="text-sm font-semibold text-[#0d262d]">Before continuing</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5b6b7b]">
            <li>• You are 18 years of age or older.</li>
            <li>• You will review the research-use restrictions before purchasing.</li>
            <li>• You understand products are not presented for human or veterinary use.</li>
          </ul>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={confirmAge}
            className="tg-link-pill inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white transition hover:bg-[#2d5bbf]"
          >
            I am 18 or older
            <ArrowRight className="tg-link-pill-icon ml-2 h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={leaveSite}
            className="tg-link-pill inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f8fbff] px-6 text-sm font-semibold text-[#173f85] transition hover:bg-[#eef4fc]"
          >
            Exit site
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs leading-5 text-[#6d7d8d] sm:flex-row sm:items-center sm:justify-between">
          <span>Confirmation saved for 30 days.</span>
          <Link href="/research-disclaimer" className="font-semibold text-[#173f85] underline-offset-4 hover:underline">
            Read research disclaimer
          </Link>
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#94a3b8]">Updated {today}</p>
      </div>
    </div>
  );
}
