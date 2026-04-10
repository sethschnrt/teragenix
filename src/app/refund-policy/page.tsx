import type { Metadata } from "next";
import { RotateCcw } from "lucide-react";
import { LegalPageTemplate } from "@/components/legal-page-template";

export const metadata: Metadata = {
  title: "Refund Policy | Teragenix",
  description: "Pre-launch refund policy for the Teragenix website.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageTemplate
      icon={RotateCcw}
      eyebrow="RETURNS AND REFUNDS"
      title="How Teragenix plans to handle order issues."
      description="This page is written to avoid making refund or return promises before the business, support, and fulfillment process are actually ready to support them."
      lastUpdated="April 9, 2026"
      intro={[
        "Teragenix has not yet finalized its live customer support and fulfillment workflow. Because of that, no visitor should treat the current site as promising a broad or unconditional return policy.",
        "Before the store begins accepting live orders, this page will be updated with the final rules for damaged items, incorrect items, cancellation requests, and any refund eligibility that actually exists.",
      ]}
      sections={[
        {
          title: "1. Current pre-launch position",
          body: [
            "No final return or refund program has been published yet. Any future policy will need to reflect the actual nature of the products sold, the fulfillment process used, and the support capacity available once the business goes live.",
          ],
        },
        {
          title: "2. Why the policy is limited right now",
          bullets: [
            "The business entity, support channel, and shipping workflow are still being built.",
            "Research-use-only products may require tighter handling rules than a general consumer storefront.",
            "A real refund policy should match actual packaging, transit risk, product sensitivity, and support operations, not placeholder marketing language.",
          ],
        },
        {
          title: "3. Issues Teragenix expects to address in the final policy",
          bullets: [
            "Orders that arrive damaged in transit.",
            "Orders that contain the wrong item.",
            "Packages reported missing after carrier delivery issues.",
            "Requests to cancel before shipment begins.",
            "Any category of items that will be non-returnable because of their nature, packaging, or handling requirements.",
          ],
        },
        {
          title: "4. Future claim process",
          body: [
            "Before launch, this page should be updated with a clear claim process explaining how customers report a problem, what evidence may be required, how long review may take, and whether the remedy will be a replacement, store credit, refund, or another resolution.",
          ],
        },
        {
          title: "5. Chargebacks and abuse",
          body: [
            "Once live ordering is enabled, Teragenix may dispute abusive, fraudulent, or unsupported chargebacks and reserve the right to document fulfillment activity, delivery records, and customer communications to protect the business.",
          ],
        },
        {
          title: "6. Policy updates before launch",
          body: [
            "Before Teragenix begins processing live orders, this page will be updated with the final support contact method, reporting windows, refund eligibility rules, and any non-returnable categories that apply to the actual operating business.",
          ],
        },
      ]}
    />
  );
}
