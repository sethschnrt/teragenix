import { Search, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose Your Peptide",
    description:
      "Browse our catalog of 99%+ purity research compounds. Each product includes detailed specifications and COA documentation.",
  },
  {
    icon: Package,
    step: "02",
    title: "We Bundle Everything",
    description:
      "Every kit includes bacteriostatic water, precision syringes, and alcohol swabs. Nothing else to buy — it's research-ready.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Fast, Discreet Delivery",
    description:
      "Shipped within 24 hours in plain, unmarked packaging. Full tracking provided. Free shipping on orders over $150.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <div className="medvi-shell">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="medvi-pill mb-5">How it works</span>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#193042] sm:text-4xl">
            Built to feel simple, clean, and premium
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607487]">
            From product selection to discreet delivery, every step should feel more like a premium health brand and less like a generic peptide shop.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center rounded-[30px] border border-white/70 bg-white/92 px-6 py-10 text-center shadow-[0_16px_50px_rgba(31,55,90,0.08)]">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
              )}

              {/* Icon circle */}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4A90D9] text-white shadow-[0_12px_30px_rgba(74,144,217,0.28)]">
                <item.icon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2a3a] text-[10px] font-bold text-white">
                  {item.step}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#193042]">
                {item.title}
              </h3>
              <p className="max-w-xs text-sm leading-7 text-[#6a7f93]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
