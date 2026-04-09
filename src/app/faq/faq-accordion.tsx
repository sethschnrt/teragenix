"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  id?: string;
  items: FaqItem[];
}

const faqData: FaqSection[] = [
  {
    title: "General",
    id: "general",
    items: [
      {
        question: "What are peptides?",
        answer:
          "Peptides are short chains of amino acids (typically 2-50) linked by peptide bonds. They play critical roles in biological processes and are widely studied in research settings for their potential applications in tissue repair, metabolism, cognition, and more.",
      },
      {
        question: "Are these products for human use?",
        answer:
          "No. All Teragenix products are sold strictly for in-vitro research and laboratory use only. They are not intended for human consumption, veterinary use, or any therapeutic application. By purchasing, you confirm the products will be used solely for legitimate research purposes.",
      },
      {
        question: "What is a Certificate of Analysis (COA)?",
        answer:
          "A COA is a quality document used to support a compound's identity and batch information. On this storefront, COAs are part of how quality is framed and communicated across the product experience.",
      },
      {
        question: "How do your kits differ from buying peptides alone?",
        answer:
          "The storefront is organized around complete kit presentation, so buyers can quickly understand the intended format, included components, and category fit without piecing the story together themselves.",
      },
    ],
  },
  {
    title: "Ordering",
    id: "ordering",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Use the shop to browse by category, compare product pages, and review kit details. The current phase is focused on making that browsing flow cleaner and easier to evaluate.",
      },
      {
        question: "Do you offer bulk or institutional pricing?",
        answer:
          "Bulk and institutional purchasing details are not the focus of the current storefront phase. If those options are added later, they should be surfaced clearly on-site.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Order-policy specifics should only be presented once the purchase flow and supporting operations are fully defined.",
      },
    ],
  },
  {
    title: "Shipping",
    id: "shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping language on the storefront should stay high-level until fulfillment details are finalized and ready to support exact promises.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Shipping availability should be communicated clearly once fulfillment coverage is finalized. For now, the storefront should avoid over-specific shipping claims.",
      },
      {
        question: "Is shipping discreet?",
        answer:
          "Fulfillment language should stay straightforward and credible, without leaning on promises that are more specific than the current operating setup supports.",
      },
      {
        question: "How are temperature-sensitive items shipped?",
        answer:
          "Product handling and storage guidance should be stated clearly on the relevant product pages, with operational specifics added only when they are fully defined.",
      },
      {
        question: "Will I receive tracking information?",
        answer:
          "Tracking and order-status details should be introduced when the supporting purchase and fulfillment flow is actually in place.",
      },
    ],
  },
  {
    title: "Products",
    id: "products",
    items: [
      {
        question: "How should I store my peptides?",
        answer:
          "Unopened lyophilized peptides should be stored at -20°C for long-term storage or 2-8°C (refrigerated) for short-term use. Once reconstituted, store at 2-8°C and use within the timeframe specified on the product page. Avoid repeated freeze-thaw cycles.",
      },
      {
        question: "What purity level are your peptides?",
        answer:
          "Purity and quality claims should be presented carefully, with the product page and supporting documentation doing the heavy lifting instead of exaggerated marketing copy.",
      },
      {
        question: "How long do peptides last?",
        answer:
          "Lyophilized (freeze-dried) peptides have a shelf life of 24+ months when stored properly at -20°C. Reconstituted peptides typically remain stable for 2-4 weeks when refrigerated at 2-8°C, though this varies by compound.",
      },
      {
        question: "What is bacteriostatic water?",
        answer:
          "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which prevents bacterial growth after opening. It's the standard solvent for reconstituting lyophilized peptides in research settings. Each kit includes a pre-measured vial.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    id: "returns-refunds",
    items: [
      {
        question: "What is your refund policy?",
        answer:
          "Return and refund policy details should be shown only when the supporting purchase flow and policies are finalized.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "Issue-resolution language should stay general until the underlying support and fulfillment process is formally defined.",
      },
      {
        question: "What if I receive the wrong product?",
        answer:
          "Order-correction details should be added once the storefront moves beyond design phase and the relevant support workflow is real.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-foreground pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FaqAccordion() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {faqData.map((section) => (
            <div key={section.title} id={section.id}>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-[#4A90D9]" />
                {section.title}
              </h2>
              <div className="rounded-xl border bg-card px-5 sm:px-6">
                {section.items.map((item) => (
                  <AccordionItem key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-xl border bg-muted/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start with the shop and product pages, then use this FAQ for the current storefront context.
          </p>
          <a
            href="/shop"
            className="tg-link-pill inline-flex items-center justify-center rounded-lg bg-[#4A90D9] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#3A7BC8]"
          >
            Browse the Catalog
          </a>
        </div>
      </div>
    </section>
  );
}
