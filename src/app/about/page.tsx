import Link from "next/link";
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

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const workflowCards = [
  {
    icon: LayoutGrid,
    title: "Category-first browsing",
    body: "The storefront is organized to make comparison faster before the user ever lands on a product page.",
  },
  {
    icon: Package,
    title: "Complete kit framing",
    body: "Each product is presented as a full lab-prep kit instead of a disconnected vial listing.",
  },
  {
    icon: ScanSearch,
    title: "Cleaner decision points",
    body: "Important product details, pricing, and kit contents should be visible without hunting.",
  },
];

const principleCards = [
  {
    icon: Shield,
    title: "Clear standards",
    body: "Quality language should feel credible, restrained, and easy to evaluate.",
  },
  {
    icon: FileCheck2,
    title: "Documentation first",
    body: "Supporting documents and product framing should carry trust, not inflated claims.",
  },
  {
    icon: Package,
    title: "Merchandised kits",
    body: "Products should feel like complete, intentional research kits from first glance.",
  },
  {
    icon: Microscope,
    title: "Research context",
    body: "The experience should stay focused on lab use, preparation, and technical clarity.",
  },
];

const qualityPoints = [
  "Stronger product hierarchy",
  "Cleaner batch and documentation framing",
  "Less cluttered trust language",
  "More obvious kit contents",
  "A tighter path from category to product detail",
  "A more consistent brand experience across the site",
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,_#173f85_0%,_#12366f_42%,_#0d262d_100%)] pt-20 text-white sm:pt-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.09),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(168,197,245,0.18),transparent_26%)]" />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/16 backdrop-blur-sm">
              <Microscope className="h-4.5 w-4.5 text-[#a8c5f5]" />
              <span className="text-[11px] font-medium tracking-[0.18em] text-white/86">
                ABOUT TERAGENIX
              </span>
            </div>

            <h1 className="mt-5 max-w-[11ch] text-[2.85rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[3.55rem] lg:text-[4.3rem]">
              A cleaner standard for research kits.
            </h1>

            <p className="mt-4 max-w-[620px] text-[1rem] leading-7 text-white/74 sm:text-[1.05rem]">
              Teragenix is building a calmer, more credible storefront where kit presentation, product clarity, and quality cues feel intentional from the first glance.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="#why"
                className="tg-link-pill inline-flex items-center rounded-full bg-white px-4 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#12366f]"
              >
                Why it exists
              </Link>
              <Link
                href="#quality-promise"
                className="tg-link-pill inline-flex items-center rounded-full bg-white/10 px-4 py-2.5 text-[12px] font-medium tracking-[0.04em] text-white ring-1 ring-white/14 backdrop-blur-sm"
              >
                Quality system
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">WHY TERAGENIX EXISTS</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.5rem]">
                Research products should feel easier to understand, not harder.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                <p>
                  The goal is a storefront that makes compounds easier to compare, kit contents easier to grasp, and standards easier to trust.
                </p>
                <p>
                  Instead of noisy layouts and vague claims, Teragenix is moving toward tighter merchandising, clearer product structure, and a more disciplined brand system.
                </p>
                <p>
                  That means the homepage, catalog, product pages, and support pages should all feel like parts of the same system.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {workflowCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.75rem] bg-[#f4f8ff] p-6 ring-1 ring-[#dbe6f5]"
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

      <section className="bg-[#fafbfc] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 max-w-2xl">
            <p className="tg-eyebrow">STOREFRONT PRINCIPLES</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
              The rules shaping the current storefront pass.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {principleCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[#e3e8ef]"
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

      <section id="quality-promise" className="py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2.25rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-7 text-white sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/14">
                  <Microscope className="h-4 w-4 text-[#a8c5f5]" />
                  <span className="text-[11px] font-medium tracking-[0.18em] text-white/82">
                    QUALITY SYSTEM
                  </span>
                </div>
                <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.5rem]">
                  The quality story should feel calm, serious, and obvious.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[16px]">
                  Teragenix should communicate standards through cleaner structure, clearer documentation language, and better product presentation, not hype.
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

      <section className="bg-[#fafbfc] py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
              <p className="tg-eyebrow">HOW TO READ THE SITE</p>
              <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.35rem]">
                Start with category, then move into the kit.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Browse by goal first so the catalog feels easier to scan.",
                  "Use the product page to understand the full kit format and what is included.",
                  "Review supporting documentation and support content once the product fit is clear.",
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
                Browse the current storefront.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                The best way to understand the direction is to move through the live catalog and product pages.
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
