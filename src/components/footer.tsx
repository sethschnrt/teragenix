import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Recovery Peptides", href: "/shop?category=recovery" },
    { label: "Metabolic Peptides", href: "/shop?category=metabolic" },
    { label: "Bundle Kits", href: "/shop?category=bundles" },
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
    <footer className="mt-8 bg-[#17314a] text-white">
      <div className="medvi-shell py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Logo size="lg" className="[&>span:last-of-type]:!text-white" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Research-grade peptides with everything you need, bundled in one
              kit. 99%+ purity, COA verified.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Teragenix LLC. All rights reserved.
          </p>
          <p className="text-xs text-white/40 text-center sm:text-right max-w-md">
            All products are intended for research and laboratory use only. Not
            for human consumption. No therapeutic claims are made.
          </p>
        </div>
      </div>
    </footer>
  );
}
