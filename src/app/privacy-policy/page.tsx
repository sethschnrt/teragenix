import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPageTemplate } from "@/components/legal-page-template";

export const metadata: Metadata = {
  title: "Privacy Policy | Teragenix",
  description: "Pre-launch privacy policy for the Teragenix website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      icon={ShieldCheck}
      eyebrow="PRIVACY POLICY"
      title="How Teragenix handles visitor information."
      description="This policy explains what information may be collected through the Teragenix website during the current pre-launch phase and how that information may be used once the storefront becomes fully operational."
      lastUpdated="April 9, 2026"
      intro={[
        "Teragenix is still in pre-launch. The website is being built before the business entity, support contact channels, and full operational stack are finalized.",
        "That means this policy is written to be honest about the current state of the site. It sets the privacy structure now, and it will be updated before live checkout begins with final business identity, contact details, and any material changes to data practices.",
      ]}
      sections={[
        {
          title: "1. Scope of this policy",
          body: [
            "This Privacy Policy applies to information collected through the Teragenix website, including when you browse the site, submit information through future forms, contact the brand, or interact with tools that support website performance, analytics, or security.",
            "If checkout, customer accounts, email marketing, or other third-party integrations are added later, this policy will be updated before those features go live.",
          ],
        },
        {
          title: "2. Information Teragenix may collect",
          bullets: [
            "Basic technical information such as browser type, device type, IP address, approximate location, referral source, and pages visited.",
            "Information you voluntarily provide, such as your name, email address, company name, or message content if contact or lead forms are added.",
            "Future transactional information if ordering becomes available, including shipping details, order history, and payment-related confirmations handled through the selected payment processor.",
            "Communications you send to Teragenix, including support requests, questions, or feedback.",
          ],
        },
        {
          title: "3. How information may be used",
          bullets: [
            "To operate, maintain, and improve the website and its content.",
            "To understand traffic patterns, page performance, and site usability.",
            "To respond to inquiries, support requests, and future order-related communications.",
            "To detect misuse, fraud, abuse, or unlawful access attempts.",
            "To comply with applicable legal obligations and enforce website terms.",
          ],
        },
        {
          title: "4. Cookies, analytics, and similar technologies",
          body: [
            "Teragenix may use cookies, analytics tools, server logs, and similar technologies to understand how visitors use the site and to improve performance. Because the final analytics and advertising stack has not yet been locked, the specific vendors used on the live storefront may change before launch.",
            "Before materially expanding tracking or advertising activity, this page should be updated to identify the relevant tools and describe any meaningful user choices that may apply.",
          ],
        },
        {
          title: "5. When information may be shared",
          bullets: [
            "With service providers that help host, secure, analyze, or operate the website.",
            "With payment, fraud-prevention, shipping, or ecommerce vendors if and when live ordering is enabled.",
            "If required to comply with law, regulation, court order, or a valid governmental request.",
            "In connection with a merger, sale, restructuring, or transfer of business assets, subject to applicable law.",
          ],
        },
        {
          title: "6. Data retention and security",
          body: [
            "Teragenix intends to keep personal information only for as long as it is reasonably needed for the purpose for which it was collected, or as long as required by law. The exact retention schedule will be finalized once the operational systems are chosen.",
            "Reasonable administrative, technical, and organizational safeguards should be used to protect information, but no internet-based system can be guaranteed to be fully secure.",
          ],
        },
        {
          title: "7. California and other state privacy rights",
          body: [
            "Depending on where you live, you may have privacy rights relating to access, deletion, correction, or restriction of certain personal information. Because Teragenix is not yet live as a fully operating store, the final rights-management process and contact method are not yet published.",
            "Before launch, this policy should be updated with the proper contact channel and any state-specific disclosures that apply based on the actual data practices and business thresholds in place at that time.",
          ],
        },
        {
          title: "8. Children’s privacy",
          body: [
            "The Teragenix website is not directed to children, and it should not knowingly collect personal information from anyone under 18.",
          ],
        },
        {
          title: "9. Contact and future updates",
          body: [
            "Before the site begins live order-taking, this page will be updated with the operator’s legal business name, mailing address, support email address, and any additional disclosures required by the final ecommerce and analytics setup.",
            "If this policy changes in a material way after launch, the revised version should be posted here with an updated effective date.",
          ],
        },
      ]}
    />
  );
}
