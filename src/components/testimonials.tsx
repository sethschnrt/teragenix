import Link from "next/link";
import { BadgeCheck, FileCheck2, FlaskConical, Truck } from "lucide-react";

const proofPills = ["Research use only", "COA-backed batches", "Clear product pages"] as const;

const standards = [
  "Clear category-led browsing",
  "COA-first quality positioning",
  "Clear product presentation",
  "More coherent product discovery",
] as const;

const proofCards = [
  {
    icon: FileCheck2,
    title: "Documentation first",
    body: "Quality positioning should be supported by documentation, clear product details, and language that feels credible instead of inflated.",
  },
  {
    icon: FlaskConical,
    title: "Clarity from day one",
    body: "The storefront should make the product details obvious fast, so buyers understand what they are looking at without digging through scattered copy.",
  },
  {
    icon: Truck,
    title: "A cleaner buying experience",
    body: "Clear category paths, stronger product pages, and tighter merchandising make the storefront easier to move through from first click to product detail.",
  },
] as const;

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8ff] py-24 sm:py-28 lg:py-[132px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(219,234,254,0.95),transparent_38%),radial-gradient(circle_at_82%_28%,rgba(230,242,251,0.9),transparent_34%)]" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="tg-eyebrow mb-6" style={{ color: "#3b6ed6" }}>
              DOCUMENTATION + CLARITY
            </p>
            <h2 className="tg-h2 max-w-[760px]">
              Trust should come from standards you can <span style={{ color: "#3b6ed6" }}>verify.</span>
            </h2>
            <p
              className="mt-6 max-w-[640px]"
              style={{
                fontSize: "17px",
                lineHeight: "28px",
                color: "#475967",
                fontWeight: 400,
              }}
            >
              Teragenix should win on what serious buyers actually care about: documentation, clarity, and a cleaner overall experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:max-w-[420px] lg:justify-end">
            {proofPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-[#1e4a9e] shadow-[0_10px_25px_rgba(17,33,17,0.06)]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(160deg,_#3b6ed6_0%,_#0d262d_100%)] px-8 py-8 shadow-[0_32px_60px_-36px_rgba(17,33,17,0.35)] sm:px-10 sm:py-10 lg:min-h-[430px] lg:px-12 lg:py-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/12 text-white backdrop-blur-sm">
              <BadgeCheck className="h-7 w-7" strokeWidth={2} />
            </div>

            <p className="max-w-[560px] text-[29px] leading-[1.16] font-semibold tracking-[-0.03em] text-white">
              Built for researchers who want premium presentation, but stay for the proof.
            </p>

            <ul className="mt-9 space-y-3.5">
              {standards.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/88">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/16">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-[24px] font-medium tracking-[-0.01em]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">
              Supportable claims, cleaner trust signals
            </div>
          </article>

          <div className="grid gap-5">
            {proofCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[32px] bg-white px-7 py-7 shadow-[0_24px_50px_-34px_rgba(17,33,17,0.18)] ring-1 ring-[#e8eef7] sm:px-8 sm:py-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#eef4fc] text-[#3b6ed6]">
                  <card.icon className="h-5 w-5" strokeWidth={1.9} />
                </div>

                <h3
                  style={{
                    fontSize: "21px",
                    lineHeight: "27px",
                    color: "#0d262d",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: "27px",
                    color: "#475967",
                    fontWeight: 400,
                  }}
                >
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center rounded-full bg-[#0d262d] px-7 text-white transition hover:bg-[#163741]"
            style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Shop all peptides
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
