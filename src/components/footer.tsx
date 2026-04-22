import { Logo } from "./logo";
import Link from "next/link";
import { RegulatoryDisclaimer } from "./regulatory-disclaimer";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Fat Loss", href: "/shop?category=fat-loss" },
    { label: "Recovery", href: "/shop?category=recovery" },
    { label: "Longevity", href: "/shop?category=longevity" },
    { label: "Aesthetics", href: "/shop?category=aesthetics" },
  ],
  Explore: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
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
    <>
      <section className="bg-white pt-10 sm:pt-12 lg:pt-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[32px] bg-[linear-gradient(166deg,_#3b6ed6_0%,_#0d262d_100%)] px-8 py-10 sm:flex-row sm:px-12 sm:py-12 lg:px-14 lg:py-12">
            <div className="text-center sm:text-left">
              <p
                className="tg-eyebrow mb-3"
                style={{ color: "#4a8dd9" }}
              >
                READY TO SHOP
              </p>
              <h3
                className="max-w-xl"
                style={{
                  fontSize: "34px",
                  lineHeight: "40px",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "-0.68px",
                }}
              >
                Shop the peptides built for your goal.
              </h3>
            </div>
            <Link
              href="/shop"
              className="tg-link-pill inline-flex h-14 shrink-0 items-center rounded-full bg-white px-8 text-[#0d262d] hover:bg-[#eef4fc]"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "-0.3px",
              }}
            >
              Shop peptides
              <svg
                className="tg-link-pill-icon ml-2.5 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[linear-gradient(166deg,_#1e4a9e_0%,_#0d262d_100%)] text-white">
        {/* faint sage glow */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#2d5bbf]/18 blur-[120px]" />

        {/* decorative wordmark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-2rem] hidden justify-center overflow-hidden sm:flex lg:bottom-[-3rem]">
          <span className="select-none whitespace-nowrap font-sans text-[8rem] font-extrabold leading-none tracking-[-0.05em] text-white/[0.04] lg:text-[12rem]">
            teragenix
          </span>
        </div>

        <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
          <RegulatoryDisclaimer variant="dark" className="mb-10" />

          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.95fr_0.95fr_1.05fr]">
            {/* Brand column */}
            <div className="md:col-span-1">
              <Logo size="md" theme="light" className="w-[112px] sm:w-[128px]" />
              <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">
                Premium peptides for fat loss, recovery, longevity, and aesthetics, with visible specs and cleaner product detail.
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
              Research-use catalog with visible docs, policies, and support pages.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
