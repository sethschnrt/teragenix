import Link from "next/link";

const testimonials = [
  {
    quote:
      "The ordering flow felt cleaner and more professional than every other peptide site I looked at. Fast shipping, clear documentation, and no guessing what was included.",
    role: "Metabolic kit customer",
    tag: "Fast shipping",
    featured: true,
  },
  {
    quote:
      "What sold me was the kit completeness. Compound, bac water, syringes, swabs, and the COA all arrived together, which made the whole process way easier.",
    role: "Repeat Teragenix customer",
    tag: "All-in-one kits",
  },
  {
    quote:
      "The packaging felt premium, the checkout was straightforward, and the brand finally looks as polished as the product quality it claims.",
    role: "Recovery kit customer",
    tag: "Premium experience",
  },
] as const;

const proofPills = ["12,000+ researchers", "COA with every batch", "Discreet tracked shipping"] as const;

export function Testimonials() {
  const [featured, ...secondary] = testimonials;

  return (
    <section className="relative overflow-hidden bg-[#f4f8ff] py-24 sm:py-28 lg:py-[132px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(219,234,254,0.9),transparent_38%),radial-gradient(circle_at_82%_28%,rgba(230,242,251,0.9),transparent_34%)]" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="tg-eyebrow mb-6" style={{ color: "#3b6ed6" }}>
              TESTIMONIALS
            </p>
            <h2 className="tg-h2 max-w-[760px]">
              The experience should feel as premium as the <span style={{ color: "#3b6ed6" }}>product.</span>
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
              Researchers notice the difference when ordering feels straightforward, kits arrive complete, and every touchpoint feels built for trust.
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

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(160deg,_#3b6ed6_0%,_#0d262d_100%)] px-8 py-8 shadow-[0_32px_60px_-36px_rgba(17,33,17,0.35)] sm:px-10 sm:py-10 lg:min-h-[420px] lg:px-12 lg:py-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/12 text-[40px] font-semibold leading-none text-white/90 backdrop-blur-sm">
              “
            </div>

            <p
              className="max-w-[560px] text-white"
              style={{
                fontSize: "28px",
                lineHeight: "1.22",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              {featured.quote}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-white/88 uppercase backdrop-blur-sm">
                {featured.role}
              </span>
              <span className="inline-flex rounded-full border border-white/18 bg-white/8 px-4 py-2 text-[12px] font-medium tracking-[0.08em] text-white/72 backdrop-blur-sm">
                {featured.tag}
              </span>
            </div>
          </article>

          <div className="grid gap-5">
            {secondary.map((item) => (
              <article
                key={item.quote}
                className="rounded-[32px] bg-white px-7 py-7 shadow-[0_24px_50px_-34px_rgba(17,33,17,0.18)] ring-1 ring-[#e8eef7] sm:px-8 sm:py-8"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#eef4fc] text-[30px] leading-none text-[#3b6ed6]">
                    “
                  </span>
                  <span className="inline-flex rounded-full bg-[#f4f8ff] px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#3b6ed6] uppercase">
                    {item.tag}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "29px",
                    color: "#0d262d",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.quote}
                </p>

                <p className="mt-6 text-[13px] font-semibold tracking-[0.12em] text-[#475967] uppercase">
                  {item.role}
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
            Shop all kits
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
