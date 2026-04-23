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
    title: "Selective lineup",
    body: "Teragenix is built around premium peptides that earn their place through quality, consistency, and demand from serious buyers.",
  },
  {
    icon: FileCheck2,
    title: "Documentation that matters",
    body: "Batch documentation, product specifics, and the details behind each compound should hold up when people look closer.",
  },
  {
    icon: HeartHandshake,
    title: "Standards over hype",
    body: "Teragenix is for people who want the best peptides on the market, not whatever happens to be loudest that week.",
  },
];

const practicalSignals = [
  "Clear compound identity and quantity",
  "Format and storage guidance",
  "Batch documentation availability",
  "Serious product-level detail",
  "Research-use standards kept explicit",
  "Peptides chosen for quality, not novelty",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f9fafc] text-[#0d262d]">
      <PageHero
        icon={Microscope}
        eyebrow="ABOUT TERAGENIX"
        detail="Premium research peptides"
        title="Where serious buyers go for premium peptides."
        description="Teragenix exists for people who want compounds they can take seriously, backed by standards that hold up when the details matter most."
        variant="subpage"
        centered
        highlights={[
          { label: "Browse peptides", href: "/shop" },
          { label: "View batch docs", href: "/coa" },
        ]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-4 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:gap-5">
          <div className="rounded-[2rem] bg-[#edf4ff] p-4 ring-1 ring-[#dbe6f5] sm:p-5">
            <div className="flex justify-center overflow-hidden rounded-[1.5rem] bg-white py-3 sm:py-4">
              <Image
                src={`${BASE_PATH}/images/generated/lifestyle-v1/quality-1-hero.png`}
                alt="Scientist reviewing printed test results in a clean lab"
                width={928}
                height={1152}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 320px"
                className="h-auto w-full max-w-[17rem] sm:max-w-[18rem] lg:max-w-[19rem] xl:max-w-[20rem]"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] p-6 ring-1 ring-[#dbe6f5] sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">
                WHAT MAKES TERAGENIX DIFFERENT
              </p>
              <h2 className="mt-3 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#173f85] sm:text-[1.85rem]">
                Teragenix is not built around average compounds.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                The focus is premium peptides, serious standards, and product detail that can stand up to scrutiny. That is the bar, and that is what belongs here.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#eef3f7] p-4 ring-1 ring-[#dbe6f5] sm:p-5">
              <div className="flex justify-center overflow-hidden rounded-[1.5rem] bg-white py-3 sm:py-4">
                <Image
                  src={`${BASE_PATH}/images/generated/lifestyle-v1/quality-2-glassware.png`}
                  alt="Minimal lab glassware in soft natural light"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 240px"
                  className="h-auto w-full max-w-[12rem] sm:max-w-[13rem] lg:max-w-[14rem] xl:max-w-[15rem]"
                />
              </div>
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
            <p className="tg-eyebrow text-[#3b6ed6]">WHAT MATTERS MOST</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#0d262d] sm:text-[2.45rem]">
              The best peptides earn confidence through the details.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#516370] sm:text-[16px]">
              That means the compound, the quantity, the format, the handling guidance, and the documentation all need to make sense together.
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
            <div className="rounded-[1.5rem] bg-white p-4 ring-1 ring-[#dce8de] sm:p-5">
              <div className="flex justify-center overflow-hidden rounded-[1.1rem] bg-[#f7faf8] py-2 sm:py-3">
                <Image
                  src={`${BASE_PATH}/images/generated/lifestyle-v1/recovery-2-trail-run.png`}
                  alt="Runner moving through a forest trail"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 240px"
                  className="h-auto w-full max-w-[12rem] sm:max-w-[13rem] lg:max-w-[14rem] xl:max-w-[15rem]"
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f8a67]">
                WHY PEOPLE CHOOSE TERAGENIX
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[#0d262d] sm:text-[1.7rem]">
                Because they want more than a label and a promise.
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                They want peptides chosen with discipline, backed by real detail, and serious enough to belong in a premium lineup.
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
                <p className="tg-eyebrow text-[#3b6ed6]">FOR PEOPLE WHO WANT THE BEST</p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-[#173f85] sm:text-[2.5rem]">
                  Teragenix is where you go when average is not good enough.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#516370] sm:text-[16px]">
                  Explore the lineup, look at the details, and judge the compounds by the standard they deserve.
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
