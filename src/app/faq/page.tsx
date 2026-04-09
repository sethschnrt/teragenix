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
        title="Straight answers, before you choose a kit."
        description="Use this page to understand research-use positioning, product format, category flow, and the current storefront structure without digging through the whole site."
        variant="faq"
        highlights={[
          { label: "General", href: "#general" },
          { label: "Ordering", href: "#ordering" },
          { label: "Shipping", href: "#shipping" },
          { label: "Products", href: "#products" },
        ]}
        panelEyebrow="POPULAR TOPICS"
        panelTitle="Jump to the section you actually need."
        panelItems={[
          { label: "Catalog flow", href: "#ordering" },
          { label: "Storefront details", href: "#shipping" },
          { label: "Storage & product care", href: "#products" },
          { label: "Research use", href: "#general" },
        ]}
      />

      <FaqAccordion />

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
