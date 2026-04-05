import { Search, Package, Truck } from "lucide-react";
import { DotGrid, GlowLine } from "./bg-patterns";

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
    <section id="how-it-works" className="relative py-20 sm:py-24 bg-muted/30 overflow-hidden">
      {/* Dot grid texture */}
      <DotGrid className="text-[#1a2a3a]" />

      {/* Top glow line */}
      <GlowLine />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#4A90D9] uppercase tracking-[0.2em] mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a3a] dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From selection to delivery in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, #4A90D930 0%, #4A90D910 100%)",
                  }}
                />
              )}

              {/* Icon circle */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4A90D9] text-white mb-6 shadow-lg shadow-[#4A90D9]/20">
                <item.icon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2a3a] text-[10px] font-bold text-white">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <GlowLine className="absolute bottom-0 left-0" />
    </section>
  );
}
