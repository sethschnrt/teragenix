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
      title="How Teragenix intends to handle fulfillment."
      description="This page sets the shipping-policy structure for Teragenix without pretending that fulfillment details are already more finalized than they really are."
      lastUpdated="April 9, 2026"
      intro={[
        "Teragenix is not yet operating with a finalized shipping workflow, support inbox, or published service coverage. Because of that, this page is intentionally conservative.",
        "No shipping speed, carrier promise, or delivery window should be treated as final until the live store is ready to support those claims operationally. This page will be updated before checkout launches.",
      ]}
      sections={[
        {
          title: "1. Current status",
          body: [
            "The site is currently in a pre-launch state. Shipping operations, carrier selection, destination coverage, processing windows, and cut-off times are still being finalized.",
          ],
        },
        {
          title: "2. When orders will ship",
          body: [
            "Once live ordering is enabled, Teragenix should provide a stated processing timeframe only when it has a reasonable operational basis to meet that timeframe. Until then, the site should not promise same-day, next-day, or other exact processing speeds.",
            "If shipping timelines are later posted, Teragenix should update this page to explain how processing time is calculated, whether weekends or holidays are excluded, and what happens if fulfillment is delayed.",
          ],
        },
        {
          title: "3. Shipping destinations",
          body: [
            "Domestic and international shipping availability have not yet been finalized. Before launch, this page will be updated to identify where Teragenix will and will not ship, along with any destination-specific restrictions that may apply.",
          ],
        },
        {
          title: "4. Tracking, delivery, and delays",
          bullets: [
            "If tracking is offered at launch, Teragenix should state when tracking becomes available and how customers receive it.",
            "If a shipment is delayed, any customer communication process should match the actual fulfillment workflow in place at that time.",
            "Weather events, carrier failures, address issues, or regulatory constraints may affect delivery timelines once the store is live.",
          ],
        },
        {
          title: "5. Shipping charges",
          body: [
            "Shipping charges, free-shipping thresholds, insurance options, and expedited-service availability are not yet finalized. Those items should not be represented as final until they are real checkout options on the live site.",
          ],
        },
        {
          title: "6. Address accuracy and delivery issues",
          body: [
            "Once ordering is enabled, customers will be responsible for submitting accurate shipping information. Before launch, this page should be updated to explain the policy for returned packages, address correction requests, and delivery disputes.",
          ],
        },
        {
          title: "7. Damaged, missing, or incorrect shipments",
          body: [
            "Teragenix intends to publish a formal process for handling damaged, missing, or incorrect shipments before live fulfillment begins. That future policy should include reporting windows, required evidence, and the available remedies, if any.",
          ],
        },
        {
          title: "8. Policy updates before launch",
          body: [
            "Before the site accepts live orders, this page will be updated with the final shipping coverage, processing standards, carrier workflow, customer support contact method, and any other terms needed to accurately describe how fulfillment really works.",
          ],
        },
      ]}
    />
  );
}
