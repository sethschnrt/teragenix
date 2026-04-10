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
      title="A serious boundary around what these products are, and are not."
      description="This disclaimer is here to make the Teragenix position unmistakably clear: the site and its products are framed for research and laboratory use only."
      lastUpdated="April 9, 2026"
      intro={[
        "Teragenix is positioning its catalog around in-vitro research and laboratory use only. That is not decorative language. It is a core restriction that should be stated clearly across the storefront, support content, and product detail pages.",
        "Nothing on this site should be interpreted as medical advice, treatment guidance, dosing guidance, or a representation that any product is approved for human or veterinary use.",
      ]}
      sections={[
        {
          title: "1. Research use only",
          body: [
            "All Teragenix products are intended solely for lawful in-vitro research and laboratory use by qualified persons or entities. They are not intended for human consumption, injection into humans or animals, household use, or recreational use.",
          ],
        },
        {
          title: "2. No medical or therapeutic claims",
          body: [
            "Nothing on the Teragenix website should be understood as medical advice, treatment advice, diagnosis, prevention guidance, or therapeutic instruction. Product descriptions, category labels, and informational content are not a substitute for professional medical or legal advice.",
          ],
        },
        {
          title: "3. Buyer and user responsibility",
          bullets: [
            "You are responsible for determining whether your access to the site and any future purchase is lawful in your jurisdiction.",
            "You are responsible for ensuring that any product is handled only by appropriately qualified personnel in a proper research setting.",
            "You are responsible for reviewing applicable safety information, storage instructions, handling requirements, and lab procedures before use.",
          ],
        },
        {
          title: "4. No unlawful or off-label use",
          body: [
            "Teragenix does not authorize, encourage, or support any unlawful, unsafe, or off-label use of the products presented on this site. Any attempt to use products in a manner inconsistent with the stated research-use restriction is outside the scope of the site and any future transaction.",
          ],
        },
        {
          title: "5. Right to restrict or refuse business",
          body: [
            "Once live ordering is enabled, Teragenix may refuse, cancel, or limit any order if it reasonably believes the purchase may violate the stated research-use restriction, applicable law, or the site’s Terms of Use.",
          ],
        },
        {
          title: "6. Future compliance details",
          body: [
            "Before launch, this page should be revisited alongside product-page copy, category language, and support materials so the site’s legal and compliance posture is consistent from top to bottom.",
          ],
        },
      ]}
    />
  );
}
