import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Pick the product goal",
    body: "Start with fat loss, recovery, skin glow, or tanning-focused research so the product benefit is clear from the first click.",
  },
  {
    num: "02",
    title: "Review the full kit",
    body: "Check the compound, included prep essentials, specs, and storage details to see exactly what the kit gives you.",
  },
  {
    num: "03",
    title: "Verify the support layer",
    body: "Use the FAQ, documentation hub, and policy pages to confirm the operational details before moving forward.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#eef4fc] py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Split header — editorial */}
        <div className="mb-16 grid gap-10 sm:mb-20 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 font-sans text-[11px] font-medium tracking-[0.22em] text-[#3b6ed6]">
              HOW IT WORKS
            </p>
            <h2 className="font-sans text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0d262d] sm:text-[3.6rem]">
              Product benefits, <span className="italic text-[#3b6ed6]">made clear</span>.
            </h2>
          </div>
          <p className="text-[1.05rem] leading-7 text-[#0d262d]/70 lg:pb-3">
            Start with the result you care about, then confirm the kit, specs, and support details in one clean flow.
          </p>
        </div>

        {/* Steps — alternating rows with big numbers */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col rounded-[1.75rem] bg-white p-8 ring-1 ring-[#e3e8ef]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-sans text-[11px] font-medium tracking-[0.22em] text-[#3b6ed6]">
                  STEP {step.num}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe] text-[#3b6ed6]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h3 className="font-sans text-[1.55rem] font-semibold leading-tight tracking-tight text-[#0d262d]">
                {step.title}
              </h3>

              <p className="mt-4 text-[14px] leading-relaxed text-[#0d262d]/65">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA band */}
        <div className="mt-16 flex flex-col items-center gap-5 rounded-[2rem] bg-[linear-gradient(166deg,_#3b6ed6_0%,_#0d262d_100%)] px-8 py-12 text-center sm:mt-20 sm:flex-row sm:justify-between sm:text-left lg:px-14">
          <div>
            <p className="mb-2 font-sans text-[11px] font-medium tracking-[0.22em] text-[#dbeafe]">
              READY TO EXPLORE
            </p>
            <h3 className="font-sans text-[1.8rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.2rem]">
              Find the product focus that fits your research.
            </h3>
          </div>
          <Link
            href="/shop"
            className="tg-link-pill inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold tracking-tight text-[#0d262d] hover:bg-[#eef4fc]"
          >
            Shop all kits
            <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
