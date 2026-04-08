import { Logo } from "./logo";
import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Fat Loss", href: "/shop?category=fat-loss" },
    { label: "Recovery", href: "/shop?category=recovery" },
    { label: "Longevity", href: "/shop?category=longevity" },
    { label: "Vitality", href: "/shop?category=vitality" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Order Tracking", href: "/tracking" },
    { label: "Shipping Info", href: "/faq#shipping" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refunds" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(166deg,_#1e4a9e_0%,_#0d262d_100%)] text-white">
      {/* faint sage glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#2d5bbf]/18 blur-[120px]" />

      {/* decorative wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-5rem] flex justify-center">
        <span className="select-none whitespace-nowrap font-sans text-[16rem] font-extrabold leading-none tracking-[-0.05em] text-white/[0.04] sm:text-[20rem]">
          teragenix
        </span>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Logo size="lg" theme="light" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">
              Research-grade peptide kits, bundled with everything your lab needs. 99%+ purity, COA verified, shipped fast.
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
