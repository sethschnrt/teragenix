import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { LegalPageTemplate } from "@/components/legal-page-template";

export const metadata: Metadata = {
  title: "Terms of Use | Teragenix",
  description: "Pre-launch terms of use for the Teragenix website.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageTemplate
      icon={FileText}
      eyebrow="TERMS OF USE"
      title="Terms for using the Teragenix website."
      description="These terms govern access to the Teragenix website, its content, and any future transactions offered through the site."
      lastUpdated="April 11, 2026"
      intro={[
        "These Terms of Use apply to your access to and use of the Teragenix website. By using the site, you agree to these terms. If you do not agree, do not use the site.",
        "Teragenix is still in a pre-launch stage. Product listings, policies, pricing, support workflows, and checkout details may change before full ecommerce operations go live. Even so, the rules on this page are intended to set a real operating framework now.",
      ]}
      sections={[
        {
          title: "1. Use of the website",
          body: [
            "You may use the Teragenix website only for lawful informational, research, and business purposes related to the site’s stated scope.",
            "You may not use the site in any way that is unlawful, fraudulent, abusive, misleading, or intended to interfere with site functionality, security, or availability.",
          ],
        },
        {
          title: "2. Research-use-only position",
          bullets: [
            "Teragenix presents products for lawful in-vitro research and laboratory use only.",
            "Nothing on the site is intended as medical advice, treatment advice, dosing guidance, veterinary advice, or a recommendation for human or animal use.",
            "You are responsible for ensuring that your use of the site and any future purchase is lawful in your jurisdiction and consistent with the stated research-use restriction.",
          ],
        },
        {
          title: "3. Eligibility and compliance",
          body: [
            "By using the site, you represent that you will act in compliance with applicable laws, regulations, and institutional rules relevant to your access, communications, and any future transaction with Teragenix.",
            "Teragenix may refuse access, inquiries, or future orders where compliance concerns are reasonably suspected.",
          ],
        },
        {
          title: "4. Product information and availability",
          body: [
            "Teragenix aims to present accurate product information, but listings, specifications, imagery, pricing, availability, and documentation may be updated, corrected, or removed at any time without notice.",
            "Nothing on the site should be interpreted as a guarantee that any product will remain available, ship on a certain timeline, or be offered on any specific terms unless that is expressly confirmed by Teragenix.",
          ],
        },
        {
          title: "5. Prohibited conduct",
          bullets: [
            "You may not misuse the site to support unlawful, unsafe, or off-label product activity.",
            "You may not attempt to probe, disrupt, scrape, reverse engineer, or bypass security measures or technical protections on the site.",
            "You may not impersonate Teragenix, misrepresent your identity, or submit false, deceptive, or incomplete information through the site.",
          ],
        },
        {
          title: "6. Intellectual property",
          body: [
            "The Teragenix name, branding, site design, graphics, product presentation, text, and compiled content are protected by applicable intellectual property laws. Except as otherwise permitted by law, you may not reproduce, republish, distribute, modify, or commercially exploit site content without prior written permission.",
          ],
        },
        {
          title: "7. Third-party services",
          body: [
            "The site may use or link to third-party providers for hosting, analytics, communication, payment, shipping, or other supporting services. Teragenix is not responsible for the independent terms, content, or practices of third-party services outside its direct control.",
          ],
        },
        {
          title: "8. Disclaimer of warranties",
          body: [
            "The website is provided on an as-is and as-available basis to the maximum extent permitted by law. Teragenix does not guarantee uninterrupted access, error-free operation, continuous availability, or that the site will always be free of bugs, delays, or security issues.",
            "Nothing on the site should be read as a warranty regarding research outcomes, product suitability for a particular purpose, regulatory treatment, or commercial availability.",
          ],
        },
        {
          title: "9. Limitation of liability",
          body: [
            "To the maximum extent permitted by law, Teragenix will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to use of the website.",
            "If Teragenix is found liable for any claim directly related to a product or service, liability should be limited to the amount actually paid to Teragenix for that specific product or service, if any.",
          ],
        },
        {
          title: "10. Updates to these terms",
          body: [
            "Teragenix may revise these Terms of Use as the site develops and operations move closer to launch. Updated terms will be posted on this page with a revised effective date.",
            "Before full launch, this page should be finalized with the legal business entity name, governing law language, contact details, and any checkout-specific terms that apply to live orders.",
          ],
        },
      ]}
    />
  );
}
