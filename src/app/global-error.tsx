"use client";

import { Logo } from "@/components/logo";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="relative min-h-screen overflow-hidden bg-[#07131f] text-white">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(59,110,214,0.22), transparent 28%), radial-gradient(circle at 80% 16%, rgba(168,197,245,0.16), transparent 22%), linear-gradient(180deg, rgba(7,19,31,1) 0%, rgba(9,25,40,1) 100%)",
            }}
          />

          <div className="relative mx-auto flex min-h-screen max-w-[1240px] items-center justify-center px-6 py-10">
            <div className="w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center shadow-[0_30px_90px_-48px_rgba(0,0,0,0.65)] ring-1 ring-white/10 backdrop-blur-xl">
              <Logo size="lg" theme="light" className="mx-auto mb-6 w-[140px] sm:w-[160px]" />
              <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-white">Something broke</h1>
              <p className="mt-3 text-sm text-white/68">Try again.</p>
              <button
                type="button"
                onClick={reset}
                className="tg-link-pill mt-6 inline-flex h-11 items-center justify-center rounded-[1rem] bg-white px-5 text-sm font-medium text-[#0d262d] hover:bg-[#eef4fc]"
              >
                Reload
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
