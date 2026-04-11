import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { LegalPageTemplate } from "@/components/legal-page-template";

export const metadata: Metadata = {
  title: "Shipping Policy | Teragenix",
  description: "Pre-launch shipping policy for the Teragenix website.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageTemplate
      icon={Truck}
      eyebrow="SHIPPING POLICY"
      title="How Teragenix plans to handle fulfillment."
      description="This page outlines the shipping framework Teragenix intends to finalize before live order processing begins."
      lastUpdated="April 11, 2026"
      intro={[
        "Teragenix is still in a pre-launch phase and does not yet have a fully published shipping workflow, carrier program, or support process for live orders.",
        "Because of that, this page is meant to set an honest structure instead of implying that fulfillment promises already exist where they do not. Before checkout goes live, shipping terms should be updated to match the actual operating process.",
      ]}
      sections={[
        {
          title: "1. Current status",
          body: [
            "The website is currently pre-launch. Shipping operations, carrier selection, destination coverage, processing windows, and cut-off times are still being finalized.",
          ],
        },
        {
          title: "2. Processing and shipment timing",
          body: [
            "Once live ordering is enabled, Teragenix should publish processing timelines only where there is a reasonable operational basis to meet them consistently.",
            "Until then, the site should not be read as promising same-day shipping, next-day processing, weekend fulfillment, or any other exact turnaround standard.",
          ],
        },
        {
          title: "3. Shipping destinations",
          body: [
            "Domestic and international shipping coverage have not yet been finalized. Before launch, this page should be updated to identify the destinations Teragenix will serve, any excluded jurisdictions, and any destination-specific restrictions that apply.",
          ],
        },
        {
          title: "4. Tracking, carrier delays, and delivery issues",
          bullets: [
            "If tracking is offered at launch, Teragenix should explain when tracking becomes available and how it will be delivered to customers.",
            "Carrier delays, weather events, address problems, service interruptions, and regulatory constraints may affect delivery timelines once live fulfillment begins.",
            "If a shipment is delayed or disrupted, customer communication should match the actual support process in place at that time.",
          ],
        },
        {
          title: "5. Shipping charges and service levels",
          body: [
            "Shipping charges, free-shipping thresholds, insurance options, and expedited service availability are not yet finalized. Those items should not be treated as final until they exist as real checkout options on the live site.",
          ],
        },
        {
          title: "6. Address accuracy and returned packages",
          body: [
            "Once ordering is enabled, customers will be responsible for providing accurate shipping information. Before launch, this page should be updated to explain the process for address corrections, returned packages, and any reshipment or additional-charge rules that may apply.",
          ],
        },
        {
          title: "7. Damaged, missing, or incorrect shipments",
          body: [
            "Teragenix intends to publish a formal issue-reporting process before live fulfillment begins. That process should explain reporting windows, required evidence, review timing, and the remedies that may be available for damaged, missing, or incorrect shipments.",
          ],
        },
        {
          title: "8. Finalization before launch",
          body: [
            "Before the site accepts live orders, this page should be finalized with the actual shipping coverage, carrier workflow, processing standards, support contact method, and any additional terms needed to describe how fulfillment really works.",
          ],
        },
      ]}
    />
  );
}
