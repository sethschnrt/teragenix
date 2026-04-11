import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { HelpCircle } from "lucide-react";
import { FaqAccordion } from "./faq-accordion";
import { PageHero } from "@/components/page-hero";

export default function FaqPage() {
  return (
    <main>
      <PageHero
        icon={HelpCircle}
        eyebrow="FAQ"
        detail="Research-use answers, kit basics, and policy shortcuts"
        title="Straight answers before you pick a kit."
        description="Use this page to compare kit basics, understand research-use positioning, and find the shipping, refund, and policy details faster."
        variant="subpage"
        highlights={[
          { label: "Browse kits", href: "/shop" },
          { label: "Quality standards", href: "/about#quality-promise" },
        ]}
        panelEyebrow="QUICK LINKS"
        panelTitle="Policy pages, without the digging"
        panelItems={[
          { label: "Shipping Policy", href: "/shipping-policy" },
          { label: "Refund Policy", href: "/refund-policy" },
          { label: "Research Disclaimer", href: "/research-disclaimer" },
          { label: "Terms of Use", href: "/terms-of-use" },
        ]}
      />

      <FaqAccordion />

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
