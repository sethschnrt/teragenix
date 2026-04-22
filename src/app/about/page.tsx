import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
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
    body: "Categories are easier to scan, so people can find the right lane faster.",
  },
  {
    icon: FileCheck2,
    title: "Proof stays close",
    body: "Product details, docs, FAQ, and policies feel connected instead of scattered.",
  },
  {
    icon: HeartHandshake,
    title: "Warmer trust",
    body: "The experience feels premium and reassuring, not cold, loud, or sketchy.",
  },
];

const trustSignals = [
  "Clear product specs",
  "Storage guidance upfront",
  "Batch documentation flow",
  "FAQ and policy access",
  "Research-use framing",
  "Less clutter, less guesswork",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f9fafc] text-[#0d262d]">
      <section className="overflow-hidden bg-[linear-gradient(180deg,_#f7f9fd_0%,_#eef5ff_100%)] pt-20 sm:pt-24">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 pb-10 sm:px-8 sm:pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:items-center lg:gap-10 lg:pb-14">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                <Microscope className="mr-2 h-3.5 w-3.5" />
                ABOUT TERAGENIX
              </span>
              <span className="text-[12px] text-[#6a7b88]">Why people trust us</span>
            </div>

            <h1 className="max-w-2xl text-[2.35rem] font-semibold leading-[0.97] tracking-[-0.04em] text-[#173f85] sm:text-[3rem] lg:text-[3.6rem]">
              A peptide brand should feel clear, calm, and worth trusting.
            </h1>

            <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#516370] sm:text-[1.05rem]">
              Teragenix is built to make that decision easier, with a cleaner catalog, clearer product pages, and proof that stays close to what you are buying.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="tg-link-pill inline-flex items-center rounded-full bg-[#3b6ed6] px-5 py-3 text-sm font-semibold text-white"
              >
                Browse peptides
                <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/coa"
                className="tg-link-pill inline-flex items-center rounded-full border border-[#dbe6f5] bg-white px-5 py-3 text-sm font-semibold text-[#173f85]"
              >
                View batch docs
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.02fr_0.98fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#edf4ff] ring-1 ring-[#dbe6f5] min-h-[420px]">
              <Image
                src={`${BASE_PATH}/images/generated/lifestyle-v1/quality-1-hero.png`}
                alt="Scientist reviewing printed test results in a clean lab"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#f6efe7] ring-1 ring-[#eadfce] min-h-[200px]">
                <Image
                  src={`${BASE_PATH}/images/generated/lifestyle-v1/metabolic-2-couple-walking.png`}
                  alt="Couple walking together outdoors"
                  fill
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-[2rem] bg-white p-5 ring-1 ring-[#dbe6f5] sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                  THE DIFFERENCE
                </p>
                <p className="mt-3 text-[1.2rem] font-semibold leading-snug text-[#0d262d]">
                  Trust should come from clarity, not pressure.
                </p>
                <p className="mt-3 text-sm leading-6 text-[#516370]">
                  That is the standard behind the whole experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="tg-eyebrow text-[#3b6ed6]">WHAT MAKES TERAGENIX DIFFERENT</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#0d262d] sm:text-[2.5rem]">
              We are not trying to overwhelm people into trusting us.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
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
            <p className="tg-eyebrow text-[#3b6ed6]">WHAT PEOPLE CAN VERIFY HERE</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#0d262d] sm:text-[2.45rem]">
              The trust layer is practical.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#516370] sm:text-[16px]">
              If someone lands on this page unsure, the answer should not be prettier hype. It should be a cleaner way to evaluate what they are seeing.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((item) => (
                <div key={item} className="rounded-[1.2rem] bg-white p-4 ring-1 ring-[#dbe6f5]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#3b6ed6]" />
                    <p className="text-sm leading-6 text-[#516370]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#fdf7f1] p-7 ring-1 ring-[#eadfce] sm:p-8">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[#eadfce] min-h-[280px]">
              <Image
                src={`${BASE_PATH}/images/generated/lifestyle-v1/kits-3-coa-paper.png`}
                alt="Neatly presented documentation and product materials"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b67a3c]">
                THE FEELING WE WANT
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[#0d262d] sm:text-[1.7rem]">
                Premium, thoughtful, and easy to believe.
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                Not cold lab theater. Not noisy supplement marketing. Just a more polished and reassuring way to shop a category that usually feels harder than it should.
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
                <p className="tg-eyebrow text-[#3b6ed6]">IF SOMEONE IS STILL DECIDING</p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#173f85] sm:text-[2.5rem]">
                  The best next step is to open the catalog and feel the difference directly.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                  Browse a category, open a product, and check the details for yourself. That is where the trust story should hold up.
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
