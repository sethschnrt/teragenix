import Link from "next/link";
import { ArrowUpRight, FlaskConical, Home, Search } from "lucide-react";
import { Logo } from "@/components/logo";

const quickLinks = [
  { href: "/shop", label: "Shop peptides", icon: Search },
  { href: "/coa", label: "View batch docs", icon: FlaskConical },
  { href: "/", label: "Back home", icon: Home },
] as const;

export default function NotFound() {
  return (
    <main data-page="not-found" className="relative min-h-screen overflow-hidden bg-[#f4f8ff] text-[#0d262d]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(59,110,214,0.18), transparent 28%), radial-gradient(circle at 82% 16%, rgba(168,197,245,0.2), transparent 24%), linear-gradient(180deg, rgba(244,248,255,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1240px] items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[720px] rounded-[2rem] border border-[#dbe6f5] bg-white/90 p-8 shadow-[0_40px_120px_-56px_rgba(17,33,17,0.28)] ring-1 ring-white/70 backdrop-blur-xl sm:p-10">
          <div className="inline-flex rounded-full border border-[#dbe6f5] bg-[#eef4fc] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#3b6ed6] uppercase">
            Error 404
          </div>

          <Logo size="lg" className="mt-6 w-[148px] sm:w-[172px]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_240px] lg:items-end">
            <div>
              <h1 className="text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#0d262d] sm:text-[3.5rem]">
                This page is missing.
              </h1>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                The link might be old, broken, or pointing to something that is no longer part of the current Teragenix storefront.
              </p>
            </div>

            <div className="rounded-[1.6rem] border border-[#e3e8ef] bg-[#f8fbff] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3b6ed6]">
                Quick reset
              </p>
              <p className="mt-2 text-sm leading-6 text-[#475967]">
                Start from the catalog or jump back to the homepage.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#0d262d] px-6 text-sm font-semibold text-white transition hover:bg-[#163741]"
            >
              Shop peptides
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] bg-white px-6 text-sm font-semibold text-[#0d262d] transition hover:bg-[#f8fbff]"
            >
              Back home
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.35rem] border border-[#e3e8ef] bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-[#cfdced] hover:bg-[#f8fbff]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4fc] text-[#3b6ed6]">
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#9aa8ba] transition group-hover:text-[#3b6ed6]" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[#0d262d]">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
