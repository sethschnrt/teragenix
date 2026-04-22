import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/footer";
import {
  Microscope,
  FileCheck2,
  ArrowUpRight,
  Beaker,
  Shield,
  ScanSearch,
  CheckCircle2,
  Layers3,
  Route,
} from "lucide-react";

const proofPillars = [
  {
    icon: ScanSearch,
    eyebrow: "01 · VISIBLE SPECS",
    title: "The important product details should be obvious fast.",
    body:
      "Compound, quantity, format, storage guidance, and included prep essentials should be visible before a buyer has to work for them.",
  },
  {
    icon: FileCheck2,
    eyebrow: "02 · PROOF CLOSE BY",
    title: "Documentation should sit close to the product, not in a maze.",
    body:
      "Batch status, support pages, and research-use framing should be one or two clicks away from the page where they matter.",
  },
  {
    icon: Shield,
    eyebrow: "03 · CLEANER FRAMING",
    title: "Trust should come from clarity, not louder claims.",
    body:
      "Teragenix is designed to feel easier to evaluate, easier to compare, and less padded with vague filler copy.",
  },
];

const compareRows = [
  {
    problem: "Loose catalogs make people hunt for the right peptide first, then decode the listing.",
    solution: "Teragenix starts with outcome-driven categories so buyers can narrow the field before comparing products.",
  },
  {
    problem: "A lot of peptide sites bury the useful details under generic marketing copy.",
    solution: "Teragenix keeps specs, quantity, storage context, and supporting pages close to the product where they help decision-making.",
  },
  {
    problem: "Documentation often feels bolted on after the fact.",
    solution: "The system is built so proof, support pages, and research-use language reinforce the catalog instead of living off to the side.",
  },
];

const qualityPoints = [
  "Visible quantity, format, and product specs",
  "Batch-linked documentation status",
  "Storage guidance shown before checkout",
  "Research-use framing kept explicit",
  "Support pages linked from the buying flow",
  "Cleaner product detail without catalog clutter",
];

const categoryCards = [
  {
    title: "Fat loss",
    body: "Start with the outcome, then compare compounds built around body-composition research.",
    href: "/shop?category=fat-loss",
    tone: "#e8f3ec",
  },
  {
    title: "Recovery",
    body: "Move straight into recovery-focused products without digging through unrelated listings.",
    href: "/shop?category=recovery",
    tone: "#e9f6f8",
  },
  {
    title: "Longevity",
    body: "Keep resilience, cognition, and longer-horizon compounds grouped together in one lane.",
    href: "/shop?category=longevity",
    tone: "#f1edfd",
  },
  {
    title: "Aesthetics",
    body: "Browse appearance-oriented products in a separate track instead of mixing them into everything else.",
    href: "/shop?category=aesthetics",
    tone: "#f8efe6",
  },
];

const flowSteps = [
  {
    title: "Start with the category",
    body: "Use the category system to get into the right lane before comparing individual peptides.",
  },
  {
    title: "Open the product page",
    body: "Confirm the peptide, quantity, format, and storage guidance without fighting the layout.",
  },
  {
    title: "Check the supporting proof",
    body: "Use documentation status, FAQ, and policy pages to validate what matters before purchase.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="How the catalog is structured and why"
        title="A cleaner way to evaluate premium peptides."
        description="Teragenix is built around a simple idea: better peptide buying starts with clearer product pages, visible proof, and less wasted motion between category, product, and documentation."
        variant="subpage"
        highlights={[
          { label: "Browse the catalog", href: "/shop" },
          { label: "View batch docs", href: "/coa" },
        ]}
        panelEyebrow="WHAT THIS PAGE EXPLAINS"
        panelTitle="The system behind the catalog."
        panelItems={[
          { label: "Category structure", value: "Outcome-first browsing" },
          { label: "Product pages", value: "Specs shown up front" },
          { label: "Documentation", value: "Proof kept close by" },
          { label: "Support path", value: "FAQ + policy pages", href: "/faq" },
        ]}
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:gap-8">
          <div className="rounded-[2rem] bg-[#f4f8ff] p-7 ring-1 ring-[#dbe6f5] sm:p-8">
            <p className="tg-eyebrow">WHY IT FEELS DIFFERENT</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.55rem]">
              The goal is not more claims. It is a faster path to conviction.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
              <p>
                Most peptide catalogs make people do too much work. You hunt for the right product, open a listing, then keep hunting for the details that should have been obvious from the start.
              </p>
              <p>
                Teragenix is designed to cut that friction down. Start with the outcome, get into the right category, open the product, and verify the proof without bouncing through a messy site architecture.
              </p>
              <p>
                That is the actual job of the brand and the site, not just to look premium, but to make evaluation feel cleaner and faster.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 ring-1 ring-[#e3e8ef] sm:p-5">
            <div className="grid gap-3">
              {compareRows.map((row) => (
                <div
                  key={row.problem}
                  className="grid gap-3 rounded-[1.5rem] bg-[#fafbfc] p-4 ring-1 ring-[#e8edf3] sm:grid-cols-[1fr_1fr] sm:p-5"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8794]">
                      Typical problem
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#475967]">{row.problem}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                      Teragenix answer
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#173f85]">{row.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="tg-eyebrow">HOW TRUST IS EARNED</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.55rem]">
              Three things the site has to do well.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {proofPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[#e3e8ef]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <pillar.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-[#0d262d]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#475967]">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality-promise" className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2.2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/14">
                  <Shield className="h-4 w-4 text-[#a8c5f5]" />
                  <span className="text-[11px] font-medium tracking-[0.18em] text-white/82">
                    QUALITY PROMISE
                  </span>
                </div>
                <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.55rem]">
                  Quality should read clearly before checkout.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[16px]">
                  Teragenix is built to make quality easier to assess through visible specs, cleaner documentation language, and a catalog flow that does not hide the useful stuff.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] bg-white/8 p-4 ring-1 ring-white/12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">
                      Catalog structure
                    </p>
                    <p className="mt-2 text-[0.98rem] font-medium text-white/92">
                      Outcome-first categories, then product-level proof
                    </p>
                  </div>
                  <div className="rounded-[1.3rem] bg-white/8 p-4 ring-1 ring-white/12">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">
                      Page behavior
                    </p>
                    <p className="mt-2 text-[0.98rem] font-medium text-white/92">
                      Less fluff, less hiding, less guesswork
                    </p>
                  </div>
                </div>
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

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <Layers3 className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <div>
                  <p className="tg-eyebrow">HOW THE CATALOG IS BUILT</p>
                </div>
              </div>
              <h2 className="mt-4 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.4rem]">
                Start broad, then get specific.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                The category system is there to reduce noise first. Once buyers are in the right lane, the product page takes over and does the job of helping them verify details quickly.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {categoryCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="tg-link-card rounded-[1.5rem] p-5 ring-1 ring-[#dbe6f5]"
                    style={{ backgroundColor: card.tone }}
                  >
                    <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0d262d]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#173f85]">
                      Browse category
                      <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e9f0fc]">
                  <Route className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <p className="tg-eyebrow">WHAT HAPPENS AFTER THE CLICK</p>
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

              <div className="mt-6 rounded-[1.5rem] bg-[#f8fbff] p-5 ring-1 ring-[#dbe6f5]">
                <div className="flex items-start gap-3">
                  <Beaker className="mt-0.5 h-5 w-5 shrink-0 text-[#3b6ed6]" />
                  <p className="text-sm leading-6 text-[#475967]">
                    Teragenix products are presented for in-vitro research and laboratory use only. That framing stays explicit across the buying flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="tg-eyebrow">START IN THE CATALOG</p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.55rem]">
                  The About page should make the shopping logic obvious. The catalog proves it.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                  If you want to understand Teragenix fast, open the catalog, compare a category, then check one product page and the supporting proof next to it.
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
                  href="/coa"
                  className="tg-link-pill inline-flex items-center justify-center rounded-full border border-[#dbe6f5] bg-[#f4f8ff] px-6 py-3.5 text-sm font-semibold text-[#173f85]"
                >
                  View batch docs
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
