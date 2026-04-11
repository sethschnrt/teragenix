import { Logo } from "./logo";
import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Fat Loss", href: "/shop?category=fat-loss" },
    { label: "Recovery", href: "/shop?category=recovery" },
    { label: "Skin Glow", href: "/shop?category=skin-glow" },
    { label: "Tanning", href: "/shop?category=tanning" },
  ],
  Explore: [
    { label: "About", href: "/about" },
    { label: "COA + Batch Docs", href: "/coa" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping FAQ", href: "/faq#shipping" },
    { label: "Quality Standards", href: "/about#quality-promise" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Research Disclaimer", href: "/research-disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(166deg,_#1e4a9e_0%,_#0d262d_100%)] text-white">
      {/* faint sage glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#2d5bbf]/18 blur-[120px]" />

      {/* decorative wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-2rem] hidden justify-center overflow-hidden sm:flex lg:bottom-[-3rem]">
        <span className="select-none whitespace-nowrap font-sans text-[8rem] font-extrabold leading-none tracking-[-0.05em] text-white/[0.04] lg:text-[12rem]">
          teragenix
        </span>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.95fr_0.95fr_1.05fr]">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Logo size="md" theme="light" className="w-[112px] sm:w-[128px]" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">
              Research kits for fat loss, recovery, skin glow, and tanning-focused protocols, with visible specs and complete kit formats.
            </p>
            <p className="mt-4 max-w-sm text-[12px] leading-6 text-white/48">
              Pre-launch legal pages are live now and will be updated with final business details before checkout goes live.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#a8c5f5]">
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="tg-link-text text-[14px] text-white/70 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-white/12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-white/45">
            &copy; {new Date().getFullYear()} Teragenix Research. All rights reserved.
          </p>
          <p className="max-w-md text-center text-[12px] text-white/45 sm:text-right">
            All products are intended for research and laboratory use only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}
