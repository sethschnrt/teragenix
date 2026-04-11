import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import {
  Microscope,
  FileCheck2,
  Package,
  ArrowUpRight,
  Beaker,
  Shield,
  LayoutGrid,
  ScanSearch,
  CheckCircle2,
} from "lucide-react";

const workflowCards = [
  {
    icon: LayoutGrid,
    title: "Start with the right category",
    body: "Move from research goal to product faster by narrowing the catalog before comparing individual kits.",
  },
  {
    icon: Package,
    title: "See the full kit upfront",
    body: "Each listing shows the compound and included prep essentials together, so you know what is in the box faster.",
  },
  {
    icon: ScanSearch,
    title: "Verify details sooner",
    body: "Specs, pricing, kit contents, and storage guidance stay visible without digging through filler copy.",
  },
];

const principleCards = [
  {
    icon: Shield,
    title: "Credible standards",
    body: "Trust should come from specific, supportable details that buyers can evaluate quickly.",
  },
  {
    icon: FileCheck2,
    title: "Documentation close by",
    body: "Specs, batch context, and handling notes should live near the product where they actually help.",
  },
  {
    icon: Package,
    title: "Complete kits",
    body: "Products should feel ready for lab prep from the first glance, not like pieces spread across the catalog.",
  },
  {
    icon: Microscope,
    title: "Research-first framing",
    body: "Every page should stay grounded in lab use, technical clarity, and easier product evaluation.",
  },
];

const qualityPoints = [
  "Visible purity, quantity, and format specs",
  "Batch-linked documentation status",
  "Less hype, more supportable language",
  "Kit contents shown before checkout",
  "A faster path from category to product detail",
  "Support pages linked where buyers need them",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="Premium peptides, complete kits, and supporting proof"
        title="What better peptides make possible."
        description="Teragenix is built around premium peptides for specific outcomes, complete kit formats, and the proof serious buyers expect to see."
        variant="subpage"
        panelEyebrow="BUYER SYSTEM"
        panelTitle="What makes Teragenix different."
        panelItems={[
          { label: "Premium peptides", value: "Built for outcomes" },
          { label: "Complete kits", value: "Included supplies up front" },
          { label: "Documentation", value: "Specs close to product" },
          { label: "Support path", value: "FAQ + policy pages", href: "/faq" },
        ]}
      />

      <section id="why" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-6">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">WHY TERAGENIX EXISTS</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.5rem]">
                Teragenix sells premium peptides for specific outcomes.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                <p>
                  The core promise is simple: better peptides, complete kits, and clearer proof behind the purchase.
                </p>
                <p>
                  Instead of selling loose vials with vague positioning, Teragenix frames each product around the outcome, the peptide, and the supporting details that justify it.
                </p>
                <p>
                  That is what the site should communicate on every page, from the homepage headline to the product detail and documentation layer.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {workflowCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.5rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white ring-1 ring-[#dbe6f5]">
                    <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                  </div>
                  <h3 className="mt-5 text-[1.1rem] font-semibold leading-snug text-[#0d262d]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="mb-6 max-w-2xl">
            <p className="tg-eyebrow">BUYING PRINCIPLES</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
              The rules behind a faster, clearer buying flow.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principleCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[#e3e8ef]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <h3 className="mt-5 text-[1.1rem] font-semibold text-[#0d262d]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality-promise" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2.1rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/14">
                  <Microscope className="h-4 w-4 text-[#a8c5f5]" />
                  <span className="text-[11px] font-medium tracking-[0.18em] text-white/82">
                    QUALITY SYSTEM
                  </span>
                </div>
                <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.5rem]">
                  Quality should be easy to check at a glance.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[16px]">
                  Teragenix builds confidence through visible specs, clearer documentation language, and better product presentation, not hype.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {qualityPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.35rem] bg-white/8 p-4 ring-1 ring-white/12 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#a8c5f5]" />
                      <p className="text-sm leading-6 text-white/86">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">HOW TO SHOP TERAGENIX</p>
              <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.35rem]">
                Start with the category, then verify the kit.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Browse by category first so you can narrow down the right kits faster.",
                  "Use the product page to confirm the full kit format, specs, and storage guidance.",
                  "Use the FAQ and policy pages to validate shipping, refund, and research-use details.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[1.25rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                      0{index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-[#475967]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">NEXT STEP</p>
              <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.35rem]">
                Browse the catalog.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                The fastest way to understand Teragenix is to browse the catalog, open a product page, and verify the support details from there.
              </p>

              <div className="mt-8 space-y-3">
                <Link
                  href="/shop"
                  className="tg-link-pill inline-flex w-full items-center justify-center rounded-full bg-[#3b6ed6] px-5 py-3.5 text-sm font-semibold text-white"
                >
                  Browse research kits
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/faq"
                  className="tg-link-pill inline-flex w-full items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f4f8ff] px-5 py-3.5 text-sm font-semibold text-[#173f85]"
                >
                  Read the FAQ
                </Link>
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]">
                <div className="flex items-start gap-3">
                  <Beaker className="mt-0.5 h-5 w-5 shrink-0 text-[#3b6ed6]" />
                  <p className="text-sm leading-6 text-[#475967]">
                    Teragenix products are presented for in-vitro research and laboratory use only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
