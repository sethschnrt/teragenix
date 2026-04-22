import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import {
  Microscope,
  ArrowUpRight,
  Shield,
  ScanSearch,
  FileCheck2,
  Layers3,
  Route,
  CheckCircle2,
} from "lucide-react";

const fixCards = [
  {
    icon: ScanSearch,
    title: "Show the useful stuff first",
    body: "Specs, quantity, format, and storage guidance should not be buried under fluff.",
  },
  {
    icon: FileCheck2,
    title: "Keep proof close by",
    body: "Documentation status, FAQ, and policy pages should sit near the product, not off in a maze.",
  },
  {
    icon: Shield,
    title: "Make trust feel earned",
    body: "Confidence should come from clarity and visible proof, not louder marketing language.",
  },
];

const categoryCards = [
  {
    title: "Fat loss",
    body: "Get into body-comp products fast, then compare specifics.",
    href: "/shop?category=fat-loss",
    tone: "#e8f3ec",
  },
  {
    title: "Recovery",
    body: "Keep recovery compounds together instead of mixed into everything else.",
    href: "/shop?category=recovery",
    tone: "#e9f6f8",
  },
  {
    title: "Longevity",
    body: "Browse resilience and longer-horizon products in one clean lane.",
    href: "/shop?category=longevity",
    tone: "#f1edfd",
  },
  {
    title: "Aesthetics",
    body: "Separate appearance-focused products so the catalog stays easier to read.",
    href: "/shop?category=aesthetics",
    tone: "#f8efe6",
  },
];

const qualityPoints = [
  "Visible quantity, format, and specs",
  "Batch-linked documentation status",
  "Storage guidance before checkout",
  "Research-use framing kept explicit",
  "Support pages linked from the flow",
  "Cleaner product detail without clutter",
];

const flowSteps = [
  {
    title: "Pick the lane",
    body: "Start with the category so you narrow the field before comparing products.",
  },
  {
    title: "Open the product",
    body: "Check the peptide, quantity, format, and storage guidance without fighting the page.",
  },
  {
    title: "Verify the proof",
    body: "Use docs, FAQ, and policy pages to validate the details before purchase.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="Why the catalog feels different"
        title="Built to make premium peptides easier to trust."
        description="Teragenix is designed to reduce noise between category, product page, and proof, so buyers can get to conviction faster."
        variant="subpage"
        highlights={[
          { label: "Browse peptides", href: "/shop" },
          { label: "View batch docs", href: "/coa" },
        ]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-5 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:gap-6">
          <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-7 text-white sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8c5f5]">
              THE CORE IDEA
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.45rem]">
              The site should feel easier to evaluate at every step.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-white/74 sm:text-[16px]">
              <p>
                Most peptide catalogs make people do too much work. First they hunt for the right product, then they hunt again for the details that should have been obvious from the start.
              </p>
              <p>
                Teragenix is built to cut that friction down. Start with the outcome, open the product, verify the proof, move forward.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {fixCards.map((card) => (
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
      </section>

      <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="mb-6 max-w-2xl">
            <p className="tg-eyebrow">HOW THE CATALOG IS ORGANIZED</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
              Start broad, then get specific.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categoryCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="tg-link-card rounded-[1.7rem] p-6 ring-1 ring-[#dbe6f5]"
                style={{ backgroundColor: card.tone }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                  CATEGORY
                </p>
                <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em] text-[#0d262d]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#173f85]">
                  Browse category
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="quality-promise" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2.1rem] bg-[#0d262d] p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a8c5f5]">
                  QUALITY PROMISE
                </p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.45rem]">
                  Quality should read clearly before checkout.
                </h2>
                <p className="mt-5 text-[15px] leading-7 text-white/72 sm:text-[16px]">
                  The trust layer is simple: visible specs, documentation status, cleaner product pages, and explicit research-use framing.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] bg-white/8 p-4 ring-1 ring-white/12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">
                      Catalog behavior
                    </p>
                    <p className="mt-2 text-[0.98rem] font-medium text-white/92">
                      Less hype, less hiding, less guesswork
                    </p>
                  </div>
                  <div className="rounded-[1.3rem] bg-white/8 p-4 ring-1 ring-white/12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">
                      Proof behavior
                    </p>
                    <p className="mt-2 text-[0.98rem] font-medium text-white/92">
                      Product page first, docs close behind
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {qualityPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] bg-white/8 p-4 ring-1 ring-white/12"
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
        <div className="mx-auto grid max-w-[1240px] gap-5 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:gap-6">
          <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                <Layers3 className="h-5 w-5 text-[#3b6ed6]" />
              </div>
              <p className="tg-eyebrow">WHAT THE PAGE FLOW SHOULD DO</p>
            </div>
            <h2 className="mt-4 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.35rem]">
              Reduce friction before buyers ever hit checkout.
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Get people into the right category faster.",
                "Make product details readable at a glance.",
                "Keep documentation and support paths close to the product.",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] bg-[#f4f8ff] p-4 ring-1 ring-[#dbe6f5]">
                  <p className="text-sm leading-6 text-[#475967]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                <Route className="h-5 w-5 text-[#3b6ed6]" />
              </div>
              <p className="tg-eyebrow">HOW TO USE TERAGENIX</p>
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
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="tg-eyebrow">START IN THE CATALOG</p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
                  The About page should set the logic. The catalog should prove it.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                  The fastest way to understand Teragenix is still to browse a category, open a product, and check the proof next to it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
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
