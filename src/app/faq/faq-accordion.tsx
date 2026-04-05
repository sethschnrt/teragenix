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
          "A COA is a document from an independent laboratory that verifies the identity, purity, and quality of a compound. Every Teragenix product ships with a COA showing HPLC purity results, mass spectrometry data, and endotoxin testing. This ensures you receive exactly what's listed on the label.",
      },
      {
        question: "How do your kits differ from buying peptides alone?",
        answer:
          "Most suppliers sell just the peptide vial. Our kits include everything needed for reconstitution: bacteriostatic water, precision syringes, and sterile alcohol swabs. No separate orders, no waiting on multiple shipments — one box, fully research-ready.",
      },
    ],
  },
  {
    title: "Ordering",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our shop, add items to your cart, and proceed to checkout. We accept all major credit cards and process orders within 24 hours on business days.",
      },
      {
        question: "Do you offer bulk or institutional pricing?",
        answer:
          "Yes. For orders of 10+ units or institutional accounts, contact us at orders@teragenix.com for custom pricing. We offer volume discounts and can accommodate purchase orders from verified research institutions.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. After that, orders enter fulfillment and cannot be changed. Contact support immediately if you need to make changes.",
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
          "Standard shipping is 3-5 business days within the continental US. Expedited (1-2 day) shipping is available at checkout. Orders placed before 2 PM EST on business days ship same-day.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently we ship within the United States only. International shipping is coming soon. Sign up for our newsletter to be notified when we expand to your region.",
      },
      {
        question: "Is shipping discreet?",
        answer:
          "Yes. All orders ship in plain, unmarked packaging with no indication of contents. The return label shows our corporate name only — no product references.",
      },
      {
        question: "How are temperature-sensitive items shipped?",
        answer:
          "Products requiring cold storage ship with insulated packaging and cold packs to maintain appropriate temperatures during transit. Expedited shipping is recommended for these items during summer months.",
      },
      {
        question: "Will I receive tracking information?",
        answer:
          "Yes. You'll receive a tracking number via email as soon as your order ships. You can also check order status through your account dashboard.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        question: "How should I store my peptides?",
        answer:
          "Unopened lyophilized peptides should be stored at -20°C for long-term storage or 2-8°C (refrigerated) for short-term use. Once reconstituted, store at 2-8°C and use within the timeframe specified on the product page. Avoid repeated freeze-thaw cycles.",
      },
      {
        question: "What purity level are your peptides?",
        answer:
          "All Teragenix peptides are synthesized to 99%+ purity as verified by HPLC analysis. The exact purity percentage for each batch is documented on the included Certificate of Analysis.",
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
    items: [
      {
        question: "What is your refund policy?",
        answer:
          "We offer a full refund on unopened, unused products returned within 30 days of delivery. Due to the nature of research compounds, opened products cannot be returned. Contact support@teragenix.com to initiate a return.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "If your order arrives damaged or compromised, contact us within 48 hours with photos of the damage. We'll ship a replacement at no cost — no need to return the damaged items.",
      },
      {
        question: "What if I receive the wrong product?",
        answer:
          "Contact us immediately. We'll arrange a prepaid return label and ship the correct product via expedited shipping at our expense. Mistakes happen rarely, but we make them right fast.",
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
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-[#4A90D9]"
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
            Our team is here to help with any research-related inquiries.
          </p>
          <a
            href="mailto:support@teragenix.com"
            className="inline-flex items-center justify-center rounded-lg bg-[#4A90D9] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#3A7BC8] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
