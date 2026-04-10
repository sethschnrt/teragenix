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
        question: "What comes in a Teragenix research kit?",
        answer:
          "Each product page lists its exact kit contents, but the general format includes the lyophilized compound plus core prep items like bacteriostatic water, syringes, swabs, and a reconstitution guide.",
      },
      {
        question: "Why sell kits instead of standalone vials?",
        answer:
          "The storefront is built around complete-kit framing so the format is easier to understand at a glance. Instead of piecing supplies together across multiple orders, the product page shows the full setup in one place.",
      },
      {
        question: "Where do I compare compounds quickly?",
        answer:
          "Start on the Shop page. You can browse by category, sort the catalog, and now search by compound or kit name before drilling into the product detail page.",
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
          "Each product page is structured to surface the core things buyers look for first: kit contents, technical specs, storage guidance, and research-use framing. The goal is to make that information visible without making people hunt for it.",
      },
      {
        question: "What does the purity spec mean?",
        answer:
          "The purity figure shown on a product page is the stated batch target for that compound listing. It should be read alongside the rest of the product-page spec and handling information, not as hype copy detached from documentation.",
      },
      {
        question: "Are COA and testing details part of the storefront?",
        answer:
          "Yes, that is part of the documentation-first direction for the site. The storefront is being structured so batch, spec, and testing context can live closer to the product instead of being buried behind vague trust language.",
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
          "Storage guidance is shown on the product page for each kit. In general, unopened lyophilized peptides are stored cold and dry, while reconstituted material should be refrigerated and handled according to the listed storage range.",
      },
      {
        question: "Do product pages include reconstitution-related supplies?",
        answer:
          "Yes. Teragenix kit pages are designed to show not just the peptide itself, but the included prep essentials such as bacteriostatic water, syringes, swabs, and a guide when applicable.",
      },
      {
        question: "Where will shipping details live?",
        answer:
          "Shipping terms live in the Shipping Policy and related support pages. Those pages are already linked in the footer so storefront visitors can find the operational side without leaving the site guessing.",
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
          "Not yet. The current site is a pre-launch storefront pass focused on stronger merchandising, clearer product pages, and better documentation structure before full order processing goes live.",
      },
      {
        question: "Where do I find refund, shipping, and research-use terms?",
        answer:
          "Use the linked policy pages in the footer: Shipping Policy, Refund Policy, Terms of Use, Privacy Policy, and Research Disclaimer. Those pages are there so the storefront has a real policy framework instead of leaving core questions unanswered.",
      },
      {
        question: "What should I read before choosing a kit?",
        answer:
          "The cleanest path is Shop first, product page second, FAQ third, then the policy pages if you need more operational detail. That flow gives you category context, exact kit contents, specs, and policy support in the right order.",
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
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Browse research kits</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">Search, sort, and compare products by category before opening a product page.</p>
          </Link>

          <Link
            href="/about#quality-promise"
            className="tg-link-card rounded-2xl border bg-white p-5 ring-1 ring-[#e3e8ef] transition-colors hover:bg-[#f8fbff]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Quality</p>
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Read quality standards</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">See how Teragenix frames documentation, product structure, and technical clarity.</p>
          </Link>

          <Link
            href="/shipping-policy"
            className="tg-link-card rounded-2xl border bg-white p-5 ring-1 ring-[#e3e8ef] transition-colors hover:bg-[#f8fbff]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A90D9]">Policies</p>
            <h3 className="mt-2 text-base font-semibold text-[#0d262d]">Check shipping + policy pages</h3>
            <p className="mt-2 text-sm leading-6 text-[#475967]">Shipping, refund, and research-use terms are linked so visitors can answer the boring important questions fast.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
