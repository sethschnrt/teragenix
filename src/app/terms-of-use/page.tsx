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
      title="The rules for using the Teragenix website."
      description="These Terms of Use govern access to the current Teragenix website and are designed to establish a real operating framework before live ecommerce details are finalized."
      lastUpdated="April 9, 2026"
      intro={[
        "Teragenix is in a pre-launch phase. The site may contain product, category, and documentation-style information before live order processing, support operations, and legal business details are fully finalized.",
        "These Terms are meant to create a legitimate baseline for site use now. They will be updated before launch with final operator details, governing law language, and any additional terms tied to checkout, payment, or account creation.",
      ]}
      sections={[
        {
          title: "1. Acceptance of these terms",
          body: [
            "By accessing or using the Teragenix website, you agree to these Terms of Use. If you do not agree, do not use the site.",
          ],
        },
        {
          title: "2. Website purpose and current status",
          body: [
            "The current website is intended to present the Teragenix brand, product structure, research-use positioning, and related informational content. Product listings, documentation framing, and category language may change as the site evolves toward launch.",
            "Nothing on the site should be interpreted as a commitment to accept any order, ship any item, or provide any specific service unless and until those functions are actually live and confirmed by Teragenix.",
          ],
        },
        {
          title: "3. Research-use-only restrictions",
          bullets: [
            "Products and content are presented for in-vitro research and laboratory use only.",
            "Nothing on the site is intended as medical advice, treatment advice, veterinary advice, or a recommendation for human consumption.",
            "You are responsible for ensuring that your use of the site and any future purchase is lawful in your jurisdiction and consistent with the stated research-use restrictions.",
          ],
        },
        {
          title: "4. Permitted and prohibited use",
          bullets: [
            "You may browse the site for lawful informational and business purposes.",
            "You may not use the site in a way that is fraudulent, unlawful, abusive, misleading, or intended to interfere with site security or availability.",
            "You may not attempt to scrape restricted data, bypass technical protections, probe vulnerabilities, or use the site to support unlawful product use.",
          ],
        },
        {
          title: "5. Product and content information",
          body: [
            "Teragenix aims to present product and documentation information carefully, but descriptions, availability, imagery, pricing, category placement, and supporting materials may change at any time without notice.",
            "The site may contain errors, omissions, or incomplete launch-stage information. Teragenix reserves the right to correct those issues, revise listings, or remove content at any time.",
          ],
        },
        {
          title: "6. Intellectual property",
          body: [
            "The Teragenix website, including its text, branding, graphics, layouts, product presentation, and compiled content, is protected by applicable intellectual property law. Unless otherwise stated, you may not reproduce, republish, distribute, modify, or exploit site content without written permission.",
          ],
        },
        {
          title: "7. Third-party services and links",
          body: [
            "The website may link to or later integrate with third-party providers such as hosting, analytics, payment, shipping, or communication services. Teragenix is not responsible for the content or independent policies of third-party services outside its direct control.",
          ],
        },
        {
          title: "8. Disclaimers",
          body: [
            "The site is provided on an as-is and as-available basis to the maximum extent permitted by law. Teragenix does not guarantee uninterrupted access, error-free operation, or that the site will always be free from bugs, delays, or security issues.",
            "Nothing on the site should be read as a guarantee of research results, regulatory status, or suitability for any particular purpose.",
          ],
        },
        {
          title: "9. Limitation of liability",
          body: [
            "To the maximum extent permitted by law, Teragenix will not be liable for indirect, incidental, consequential, special, or punitive damages arising out of or related to use of the website. Direct liability, if any, should be limited to the amount paid to Teragenix for the specific product or service at issue, if applicable.",
          ],
        },
        {
          title: "10. Governing law and future updates",
          body: [
            "Before launch, these Terms will be updated with the final legal business name, governing law, venue language, and support contact details that apply to the operating entity behind Teragenix.",
            "Teragenix may revise these Terms as the site and business operations develop. The updated version will be posted on this page with a revised effective date.",
          ],
        },
      ]}
    />
  );
}
