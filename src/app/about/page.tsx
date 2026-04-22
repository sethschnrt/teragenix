import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import {
  Microscope,
  ArrowUpRight,
  FileCheck2,
  Shield,
  ScanSearch,
  Route,
  Beaker,
  CircleSlash2,
  CheckCircle2,
} from "lucide-react";

const proofCards = [
  {
    icon: ScanSearch,
    title: "Visible specs",
    body: "See compound, quantity, format, and storage fast.",
  },
  {
    icon: FileCheck2,
    title: "Docs close by",
    body: "COA and batch status stay near the product flow.",
  },
  {
    icon: Shield,
    title: "Cleaner trust",
    body: "Less hype, more concrete things to check.",
  },
];

const verifyItems = [
  "Compound + quantity",
  "Format + storage guidance",
  "Batch doc status",
  "SKU / batch reference",
  "FAQ + policy access",
  "Research-use framing",
];

const noThanksItems = [
  "No vague product pages that hide the basics",
  "No random category soup before you find the right lane",
  "No proof buried in a separate corner of the site",
];

const flowSteps = [
  {
    title: "Pick the category",
    body: "Start with fat loss, recovery, longevity, or aesthetics.",
  },
  {
    title: "Open the product",
    body: "Check the core specs without digging through fluff.",
  },
  {
    title: "Verify the proof",
    body: "Use docs, FAQ, and policy pages before buying.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="Why the catalog is built this way"
        title="Less filler. More proof."
        description="Teragenix is built for people who want to judge a peptide product faster, with clearer pages, visible specs, and proof that stays close to the product."
        variant="subpage"
        highlights={[
          { label: "Browse peptides", href: "/shop" },
          { label: "View batch docs", href: "/coa" },
        ]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5">
            <div className="rounded-[2rem] bg-[#0d262d] p-7 text-white sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8c5f5]">
                WHAT THIS BRAND IS TRYING TO FIX
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.4rem]">
                Premium peptides should not feel annoying to evaluate.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/74 sm:text-[16px]">
                The whole point of Teragenix is to cut down the wasted motion between category, product page, and proof.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {proofCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.6rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white ring-1 ring-[#dbe6f5]">
                    <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                  </div>
                  <h3 className="mt-5 text-[1.12rem] font-semibold leading-snug text-[#0d262d]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quality-promise" className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">WHAT YOU CAN ACTUALLY VERIFY HERE</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.4rem]">
                Concrete buying signals, not generic reassurance.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {verifyItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#3b6ed6]" />
                      <p className="text-sm leading-6 text-[#475967]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-7 text-white sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/10 ring-1 ring-white/14">
                <CircleSlash2 className="h-5 w-5 text-[#a8c5f5]" />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8c5f5]">
                WHAT YOU SHOULD NOT HAVE TO DEAL WITH
              </p>
              <div className="mt-4 space-y-3">
                {noThanksItems.map((item) => (
                  <div key={item} className="rounded-[1.25rem] bg-white/8 p-4 ring-1 ring-white/12">
                    <p className="text-sm leading-6 text-white/84">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[0.98fr_1.02fr] lg:gap-6">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <Route className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <p className="tg-eyebrow">HOW TO USE THE SITE</p>
              </div>

              <div className="mt-5 space-y-4">
                {flowSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-[1.4rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-[1rem] font-semibold text-[#0d262d]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#475967]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <Beaker className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <p className="tg-eyebrow">THE SIMPLE VERSION</p>
              </div>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.4rem]">
                This page should explain the logic fast, then get out of the way.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                The real proof is still in the catalog, the product page, and the documentation flow. The About page just makes that logic obvious.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="tg-link-pill inline-flex items-center justify-center rounded-full bg-[#3b6ed6] px-6 py-3.5 text-sm font-semibold text-white"
                >
                  Browse peptides
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/faq"
                  className="tg-link-pill inline-flex items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f4f8ff] px-6 py-3.5 text-sm font-semibold text-[#173f85]"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
