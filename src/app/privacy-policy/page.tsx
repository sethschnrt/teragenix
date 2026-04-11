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
      title="How Teragenix handles website information."
      description="This policy explains what information Teragenix may collect through the website, how that information may be used, and how the policy will be finalized before full launch."
      lastUpdated="April 11, 2026"
      intro={[
        "This Privacy Policy applies to information collected through the Teragenix website during its current pre-launch phase and after live operations begin, unless a more specific notice or policy applies.",
        "Teragenix is still finalizing its operating entity, support channels, checkout stack, and service providers. This page is intended to be transparent about current data practices without pretending the final ecommerce workflow is already locked.",
      ]}
      sections={[
        {
          title: "1. Information Teragenix may collect",
          bullets: [
            "Technical information such as browser type, device type, IP address, approximate location, referral source, and pages viewed.",
            "Information you submit directly, such as your name, email address, company name, shipping details, or message content through forms, support requests, or future checkout flows.",
            "Transaction-related details if ordering becomes available, including order information, fulfillment details, and payment confirmations provided through the relevant payment processor.",
            "Communications, feedback, or support inquiries you send to Teragenix.",
          ],
        },
        {
          title: "2. How information may be used",
          bullets: [
            "To operate, maintain, secure, and improve the website.",
            "To understand traffic patterns, performance, and user experience.",
            "To respond to inquiries, support requests, and future order-related communications.",
            "To detect misuse, fraud, abuse, security incidents, or unlawful access attempts.",
            "To comply with legal obligations and enforce site policies and terms.",
          ],
        },
        {
          title: "3. Cookies, analytics, and related tools",
          body: [
            "Teragenix may use cookies, server logs, analytics tools, and similar technologies to measure traffic, understand usage patterns, improve site performance, and maintain security.",
            "The final analytics, advertising, and ecommerce stack is still being selected. Before materially expanding tracking or launching advertising-specific tools, this policy should be updated to reflect the vendors in use and any meaningful visitor choices that apply.",
          ],
        },
        {
          title: "4. When information may be shared",
          bullets: [
            "With service providers that help host, secure, analyze, operate, or support the website and related business functions.",
            "With payment, fraud-prevention, shipping, communications, or ecommerce vendors if and when those services are used.",
            "When required by law, regulation, court order, or valid governmental request.",
            "In connection with a merger, financing, sale, restructuring, or transfer of business assets, subject to applicable law.",
          ],
        },
        {
          title: "5. Data retention and security",
          body: [
            "Teragenix intends to retain personal information only for as long as reasonably necessary for the purposes described in this policy, or as otherwise required by law.",
            "Reasonable administrative, technical, and organizational safeguards should be used to protect information, but no internet-based system or transmission method can be guaranteed to be completely secure.",
          ],
        },
        {
          title: "6. Your privacy choices and rights",
          body: [
            "Depending on where you live, you may have privacy rights relating to access, correction, deletion, or restriction of certain personal information. The exact response workflow and contact method will be finalized before launch once the business entity and data systems are fully defined.",
            "Before live checkout begins, this policy should be updated with the proper contact channel and any state-specific disclosures required by the actual business thresholds and data practices in place at that time.",
          ],
        },
        {
          title: "7. Children’s privacy",
          body: [
            "The Teragenix website is not directed to children and is not intended to knowingly collect personal information from anyone under 18 years of age.",
          ],
        },
        {
          title: "8. Policy updates and contact details",
          body: [
            "Teragenix may revise this Privacy Policy as the website and business operations develop. Updated versions will be posted on this page with a revised effective date.",
            "Before full launch, this page should be finalized with the legal business name, mailing address, support email, and any additional disclosures required by the actual analytics, ecommerce, and communications stack in use.",
          ],
        },
      ]}
    />
  );
}
