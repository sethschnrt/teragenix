"use client";

import Link from "next/link";
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
        question: "Are these products for human use?",
        answer:
          "No. All Teragenix products are presented strictly for in-vitro research and laboratory use only. They are not sold for human consumption, veterinary use, or therapeutic application.",
      },
      {
        question: "What does a Teragenix product listing show?",
        answer:
          "Every product page lists the peptide, specs, storage guidance, and documentation context so buyers can evaluate the product faster.",
      },
      {
        question: "Does Teragenix sell standalone peptides?",
        answer:
          "Yes. The current direction is standalone peptides, with the product page focused on the peptide itself, visible specs, and documentation context.",
      },
      {
        question: "Where do I compare compounds quickly?",
        answer:
          "Start on the Shop page. Browse by category, search by compound or product name, and use the product page for the deeper read on specs and handling details.",
      },
    ],
  },
  {
    title: "Documentation",
    id: "documentation",
    items: [
      {
        question: "What documentation is shown on product pages?",
        answer:
          "Product pages surface the details serious buyers look for first: technical specs, storage guidance, batch references, and research-use framing. The goal is to keep the important information visible without turning the page into clutter.",
      },
      {
        question: "What does the purity spec mean?",
        answer:
          "The purity figure shown on a product page is the stated batch target for that listing. It should be read alongside the rest of the specs, storage notes, and documentation context, not as standalone hype copy.",
      },
      {
        question: "Are COA and testing details part of the storefront?",
        answer:
          "Yes, that is the goal. Teragenix is set up so batch, spec, and testing status can live closer to the product, making quality review easier as those materials are finalized and published.",
      },
    ],
  },
  {
    title: "Shipping & Storage",
    id: "shipping",
    items: [
      {
        question: "How should peptides be stored?",
        answer:
          "Storage guidance is shown on the product page for each product. In general, unopened lyophilized peptides are stored cold and dry, while reconstituted material should be refrigerated and handled according to the listed storage range.",
      },
      {
        question: "Do product pages focus on the peptide or bundled extras?",
        answer:
          "They should focus on the peptide itself. The direction now is standalone products with clearer specs, storage guidance, and documentation context.",
      },
      {
        question: "Where will shipping details live?",
        answer:
          "Shipping terms live in the Shipping Policy and related support pages. The FAQ, footer, and product-page support links all point buyers there so the operational side stays easy to find.",
      },
    ],
  },
  {
    title: "Orders & Policies",
    id: "orders-policies",
    items: [
      {
        question: "Is Teragenix checkout live yet?",
        answer:
          "Not yet. Teragenix is still in a pre-launch phase while the catalog, documentation surfaces, and support details are being finalized before live order processing begins.",
      },
      {
        question: "Where do I find refund, shipping, and research-use terms?",
        answer:
          "Use the linked policy pages throughout the site: Shipping Policy, Refund Policy, Terms of Use, Privacy Policy, and Research Disclaimer. They are there to make the operational details easy to verify before you move forward.",
      },
      {
        question: "What should I read before choosing a product?",
        answer:
          "Start with Shop, open the product page for the product details, then use the FAQ and policy pages if you need more operational context. That path gives you category context, specs, and support details in the right order.",
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
        <span className="pr-4 text-sm font-medium text-foreground sm:text-base">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FaqAccordion() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2.5">
          {faqData.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-[#dbe6f5] bg-[#f4f8ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#173f85]"
            >
              {section.title}
            </a>
          ))}
        </div>

        <div className="space-y-10">
          {faqData.map((section) => (
            <div key={section.title} id={section.id}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
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

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/shop"
            className="tg-link-card rounded-2xl border bg-white p-5 ring-1 ring-[#e3e8ef] transition-colors hover:bg-[#f8fbff]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Catalog</p>
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Browse peptides</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">Start with category, then compare compounds and price before opening the full product page.</p>
          </Link>

          <Link
            href="/about#quality-promise"
            className="tg-link-card rounded-2xl border bg-white p-5 ring-1 ring-[#e3e8ef] transition-colors hover:bg-[#f8fbff]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Quality</p>
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Read quality standards</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">See how Teragenix approaches visible specs, documentation language, and easier product evaluation.</p>
          </Link>

          <Link
            href="/shipping-policy"
            className="tg-link-card rounded-2xl border bg-white p-5 ring-1 ring-[#e3e8ef] transition-colors hover:bg-[#f8fbff]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Policies</p>
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Check shipping + policy pages</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">Use the policy pages for shipping, refund, privacy, and research-use details when you want the operational read fast.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
