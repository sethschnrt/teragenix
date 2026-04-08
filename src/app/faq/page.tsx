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
        title="Straight answers, before you place the order."
        description="Get clear answers on research use, ordering, shipping, storage, and refunds without digging through the whole site. Start with the topic you need and move fast."
        variant="faq"
        highlights={[
          { label: "General", href: "#general" },
          { label: "Ordering", href: "#ordering" },
          { label: "Shipping", href: "#shipping" },
          { label: "Returns", href: "#returns-refunds" },
        ]}
        panelEyebrow="POPULAR TOPICS"
        panelTitle="Jump to the section you actually need."
        panelItems={[
          { label: "Ordering & payments", href: "#ordering" },
          { label: "Shipping timelines", href: "#shipping" },
          { label: "Storage & product care", href: "#products" },
          { label: "Returns & refunds", href: "#returns-refunds" },
        ]}
      />

      <FaqAccordion />

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
