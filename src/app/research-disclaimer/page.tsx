import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { LegalPageTemplate } from "@/components/legal-page-template";

export const metadata: Metadata = {
  title: "Research Use Disclaimer | Teragenix",
  description: "Research-use-only disclaimer for the Teragenix website.",
};

export default function ResearchDisclaimerPage() {
  return (
    <LegalPageTemplate
      icon={FlaskConical}
      eyebrow="RESEARCH USE DISCLAIMER"
      title="Research use only means exactly that."
      description="All products presented by Teragenix are intended solely for lawful in-vitro research and laboratory use by qualified persons or entities."
      lastUpdated="April 11, 2026"
      intro={[
        "Teragenix presents its catalog for lawful in-vitro research and laboratory use only. Products shown on this site are not offered for human consumption, human injection, veterinary use, household use, or recreational use.",
        "Nothing on this site, including product pages, specifications, storage notes, category copy, or support content, should be read as medical advice, dosing guidance, treatment instruction, or a representation that any item is approved for human or animal use.",
      ]}
      sections={[
        {
          title: "1. Scope of the restriction",
          body: [
            "All products listed by Teragenix are intended only for controlled laboratory and research settings, handled by qualified persons or entities operating lawfully in their jurisdiction.",
            "Any use outside that scope is inconsistent with the stated purpose of the site and falls outside the basis of any future transaction with Teragenix.",
          ],
        },
        {
          title: "2. No human or veterinary use",
          bullets: [
            "Products are not intended for human consumption, self-experimentation, compounding, or administration to humans or animals.",
            "Products are not presented as drugs, supplements, foods, cosmetics, or medical devices.",
            "Products are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition.",
          ],
        },
        {
          title: "3. No medical claims or instructions",
          body: [
            "Teragenix does not provide medical advice, treatment advice, veterinary guidance, or clinical instructions. No statement on this site should be interpreted that way.",
            "References to purity, handling, storage, batch documentation, or research categories are provided to support laboratory review only. They do not change the research-use-only restriction.",
          ],
        },
        {
          title: "4. Purchaser and user responsibility",
          bullets: [
            "You are responsible for verifying that access to the site and any future purchase is lawful in your jurisdiction.",
            "You are responsible for ensuring that products are handled only by appropriately qualified personnel in a proper research setting.",
            "You are responsible for reviewing all labeling, documentation, storage requirements, handling instructions, and applicable safety procedures before use.",
            "You are responsible for compliance with applicable institutional, local, state, and federal rules.",
          ],
        },
        {
          title: "5. Right to screen, limit, or refuse business",
          body: [
            "Teragenix reserves the right to decline, cancel, refund, or restrict any order or inquiry that appears inconsistent with the site’s research-use-only position, applicable law, or internal compliance standards.",
          ],
        },
        {
          title: "6. Future updates",
          body: [
            "As Teragenix moves toward live checkout, this page may be refined to add final entity details, contact information, and supplemental compliance language. The core rule will remain the same: products are presented for research use only.",
          ],
        },
      ]}
    />
  );
}
