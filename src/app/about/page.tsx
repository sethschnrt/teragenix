import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import {
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  Layers3,
  Microscope,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const differenceCards = [
  {
    icon: Layers3,
    title: "Cleaner catalog",
    body: "A tighter category structure makes it easier to find the right product path fast.",
  },
  {
    icon: FileCheck2,
    title: "Clearer product pages",
    body: "Specs, format, and storage guidance are easier to read without digging through noise.",
  },
  {
    icon: HeartHandshake,
    title: "Closer documentation",
    body: "COA, FAQ, and policy pages feel connected to the buying flow instead of detached from it.",
  },
];

const practicalSignals = [
  "Compound and quantity shown clearly",
  "Format and storage guidance upfront",
  "Batch documentation flow nearby",
  "FAQ and policy pages easy to reach",
  "Research-use framing kept explicit",
  "A more polished, less cluttered browse experience",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f9fafc] text-[#0d262d]">
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="What makes it different"
        title="A clearer way to shop premium peptides."
        description="Teragenix is designed to feel more organized, more readable, and more considered from the first click to the product detail page."
        variant="subpage"
        highlights={[
          { label: "Browse peptides", href: "/shop" },
          { label: "View batch docs", href: "/coa" },
        ]}
        panelEyebrow="WHY IT FEELS DIFFERENT"
        panelTitle="Built for clarity, not chaos."
        panelItems={[
          { label: "Cleaner category paths" },
          { label: "Readable product detail" },
          { label: "Docs close to the product" },
          { label: "Premium without the noise" },
        ]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-4 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:gap-5">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-[#edf4ff] ring-1 ring-[#dbe6f5] sm:min-h-[460px]">
            <Image
              src={`${BASE_PATH}/images/generated/lifestyle-v1/quality-1-hero.png`}
              alt="Scientist reviewing printed test results in a clean lab"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] p-6 ring-1 ring-[#dbe6f5] sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                WHAT MAKES TERAGENIX DIFFERENT
              </p>
              <h2 className="mt-3 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#173f85] sm:text-[1.85rem]">
                Most sites in this category feel either messy or cold.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                Teragenix is meant to land somewhere better: structured enough to feel credible, polished enough to feel premium, and simple enough to keep the focus on the product itself.
              </p>
            </div>
            <div className="relative min-h-[210px] overflow-hidden rounded-[2rem] bg-[#eef3f7] ring-1 ring-[#dbe6f5] sm:min-h-[260px]">
              <Image
                src={`${BASE_PATH}/images/generated/lifestyle-v1/quality-2-glassware.png`}
                alt="Minimal lab glassware in soft natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 lg:grid-cols-3">
            {differenceCards.map((card, index) => (
              <div
                key={card.title}
                className={`rounded-[1.8rem] p-6 ring-1 ${
                  index === 0
                    ? "bg-[#eef5ff] ring-[#dbe6f5]"
                    : index === 1
                      ? "bg-[#f3f7f1] ring-[#dce8de]"
                      : "bg-[#faf1e8] ring-[#eadfce]"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white ring-1 ring-black/5">
                  <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <h3 className="mt-5 text-[1.18rem] font-semibold text-[#0d262d]">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#516370]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality-promise" className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:gap-8">
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] p-7 ring-1 ring-[#dbe6f5] sm:p-8">
            <p className="tg-eyebrow text-[#3b6ed6]">WHAT YOU CAN SEE IMMEDIATELY</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#0d262d] sm:text-[2.45rem]">
              The difference is mostly in how cleanly the details are presented.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#516370] sm:text-[16px]">
              Better structure, better readability, and better proximity between product information and supporting pages.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {practicalSignals.map((item) => (
                <div key={item} className="rounded-[1.2rem] bg-white p-4 ring-1 ring-[#dbe6f5]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#3b6ed6]" />
                    <p className="text-sm leading-6 text-[#516370]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#f4f8f6] p-7 ring-1 ring-[#dce8de] sm:p-8">
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[#dce8de]">
              <Image
                src={`${BASE_PATH}/images/generated/lifestyle-v1/recovery-2-trail-run.png`}
                alt="Runner moving through a forest trail"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f8a67]">
                THE BRAND FEEL
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[#0d262d] sm:text-[1.7rem]">
                Softer, sharper, and more considered.
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                The visual language matters too. This category does not need more clutter, more aggression, or more fake authority. It needs better taste and better organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,_#f8fbff_0%,_#f3f8ff_100%)] p-7 ring-1 ring-[#dbe6f5] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="tg-eyebrow text-[#3b6ed6]">SEE IT IN THE CATALOG</p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#173f85] sm:text-[2.5rem]">
                  The best way to understand the brand is to browse the product experience itself.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                  Open a category, compare products, and look at how the details are handled. That is the real point of difference.
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
                  className="tg-link-pill inline-flex items-center justify-center rounded-full border border-[#dbe6f5] bg-white px-6 py-3.5 text-sm font-semibold text-[#173f85]"
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
