import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Beaker, Microscope, PackageCheck, Sparkles, Waves } from "lucide-react";
import Link from "next/link";

const heroCards = [
  {
    title: "Metabolic",
    description: "Retatrutide and Tesamorelin kits for in-demand lab workflows.",
    href: "/shop?category=metabolic",
    icon: Waves,
  },
  {
    title: "Research",
    description: "Specialty compounds like Melanotan II, packaged for cleaner prep.",
    href: "/shop?category=research",
    icon: Beaker,
  },
  {
    title: "Beauty",
    description: "Glow 70 and Glutathione kits for cosmetic-adjacent studies.",
    href: "/shop?category=beauty",
    icon: Sparkles,
  },
  {
    title: "Complete Kits",
    description: "Water, syringes, and swabs are already included with the vial.",
    href: "/shop",
    icon: PackageCheck,
  },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-visible bg-[#07111a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,144,217,0.28),_transparent_35%),linear-gradient(180deg,_#0b1723_0%,_#07111a_48%,_#091521_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4A90D9]/18 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-6 border border-white/12 bg-white/8 px-4 py-1.5 text-[11px] font-medium tracking-[0.24em] uppercase text-white backdrop-blur"
          >
            <Microscope className="mr-2 h-3.5 w-3.5" />
            Research-use-only peptide kits
          </Badge>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Peptide kits,
            <br />
            built for real research.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Premium compounds, discreet domestic shipping, and the core supplies already in the box. No piecing together lab prep from five different stores.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/shop">
              <Button
                size="lg"
                className="h-12 bg-[#4A90D9] px-8 text-base font-semibold text-white hover:bg-[#3A7BC8]"
              >
                Shop Research Kits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#featured-products">
              <Button
                variant="outline"
                size="lg"
                className="h-12 border-white/14 bg-white/6 px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                Browse Top Sellers
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-14 mb-[-5.25rem] grid max-w-5xl gap-4 md:grid-cols-2 xl:max-w-none xl:grid-cols-4 xl:gap-4">
          {heroCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-[1.6rem] border border-slate-200/80 bg-white/96 px-5 py-4 text-left text-slate-950 shadow-[0_24px_44px_-34px_rgba(3,10,18,0.72)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4A90D9]/10 text-[#4A90D9]">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-5 text-slate-600">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
