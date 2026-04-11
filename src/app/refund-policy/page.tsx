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
      description="This page outlines the refund and issue-resolution structure Teragenix intends to finalize before live ordering begins."
      lastUpdated="April 11, 2026"
      intro={[
        "Teragenix has not yet published a final live-order refund program. Because the business is still pre-launch, this page is intended to set an honest framework instead of making broad promises the operation is not ready to support.",
        "Before checkout goes live, this policy should be finalized to reflect actual fulfillment workflows, support capacity, reporting windows, and any product-specific limitations that apply to research-use-only items.",
      ]}
      sections={[
        {
          title: "1. Current pre-launch status",
          body: [
            "No final return, replacement, or refund policy has been fully published yet. Any future policy must match the real operating conditions of the business, including packaging standards, shipping workflow, product handling requirements, and support capacity.",
          ],
        },
        {
          title: "2. Why this policy is limited today",
          bullets: [
            "Teragenix is still finalizing its support channels, shipping process, and live-order operations.",
            "Research-use-only products may require tighter issue-handling rules than a general consumer storefront.",
            "A real refund policy should reflect actual transit risk, product sensitivity, and claim review capacity, not placeholder marketing language.",
          ],
        },
        {
          title: "3. Issues the final policy should address",
          bullets: [
            "Orders that arrive damaged in transit.",
            "Orders that contain the wrong item.",
            "Packages reported missing, lost, or undelivered during carrier handling.",
            "Requests to cancel an order before shipment begins.",
            "Any category of item that may be non-returnable because of handling, storage, packaging, or compliance considerations.",
          ],
        },
        {
          title: "4. Expected claim process",
          body: [
            "Before launch, this page should be updated with a clear process explaining how a customer reports an issue, what documentation may be required, how long review may take, and what remedies may be available.",
            "Depending on the circumstances, those remedies may include replacement, refund, store credit, cancellation confirmation, or denial of the claim where the facts do not support recovery.",
          ],
        },
        {
          title: "5. Non-returnable and restricted cases",
          body: [
            "Once live ordering is enabled, Teragenix may designate certain products or situations as non-returnable where the nature of the item, packaging integrity, storage sensitivity, safety considerations, or compliance posture makes return acceptance inappropriate.",
          ],
        },
        {
          title: "6. Chargebacks and abuse",
          body: [
            "Teragenix may dispute abusive, fraudulent, or unsupported chargebacks and may retain order records, fulfillment records, carrier updates, and customer communications to protect the business in the event of a payment dispute.",
          ],
        },
        {
          title: "7. Finalization before launch",
          body: [
            "Before Teragenix begins accepting live orders, this page should be finalized with the support contact method, claim submission steps, issue-reporting windows, refund eligibility rules, and any non-returnable categories that apply to the live business.",
          ],
        },
      ]}
    />
  );
}
