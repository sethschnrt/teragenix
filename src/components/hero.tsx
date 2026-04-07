import Link from "next/link";
import { Droplets, Sparkles, Leaf, FlaskConical } from "lucide-react";

const heroTiles = [
  {
    title: "Weight Loss",
    href: "/shop?category=metabolic",
    icon: Droplets,
    tone: "#deede0",
    iconTone: "#2e936f",
  },
  {
    title: "Peptides & Longevity",
    href: "/shop?category=longevity",
    icon: Leaf,
    tone: "#e5f2f2",
    iconTone: "#4a7088",
  },
  {
    title: "Beauty & Skin",
    href: "/shop?category=beauty",
    icon: Sparkles,
    tone: "#f2e6ec",
    iconTone: "#a8497b",
  },
  {
    title: "Research",
    href: "/shop?category=research",
    icon: FlaskConical,
    tone: "#f2ebe1",
    iconTone: "#8b6330",
  },
] as const;

export function Hero() {
  return (
    <section className="relative">
      {/* Forest gradient canvas — exact Medvi dimensions */}
      <div className="relative h-[560px] overflow-hidden bg-[linear-gradient(166deg,_#1b6549_0%,_#112111_100%)]">
        {/* Massive Montserrat wordmark ghost — Medvi's signature */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-80px] flex justify-center overflow-hidden">
          <p
            className="font-display font-extrabold text-[#2e936f]/50 select-none whitespace-nowrap"
            style={{
              fontSize: "340px",
              lineHeight: "300px",
              letterSpacing: "-10px",
              transform: "translateY(20px)",
            }}
          >
            teragenix
          </p>
        </div>

        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-[190px] sm:px-8 lg:px-12">
          {/* Join eyebrow */}
          <div className="mb-5 text-center">
            <p
              className="text-white"
              style={{ fontSize: "14px", lineHeight: "25px", letterSpacing: "0.28px" }}
            >
              Join{" "}
              <span style={{ fontWeight: 700 }}>12,000+</span>{" "}
              <span style={{ fontWeight: 500 }}>Teragenix researchers</span>
            </p>
          </div>

          {/* Headline — Red Hat Text 70/70 weight 600 */}
          <h1 className="mx-auto max-w-5xl text-center">
            <p className="cg-h1 text-white">Peptide research,</p>
            <p className="cg-h1 text-white">
              <span style={{ color: "#779d7c" }}>redefined</span> for your lab.
            </p>
          </h1>

          {/* Subhead — Red Hat Text 16/25 regular white */}
          <p
            className="mx-auto mt-5 max-w-xl text-center text-white/95"
            style={{ fontSize: "16px", lineHeight: "25px", fontWeight: 400 }}
          >
            Premium 99%+ purity peptides delivered as complete kits—bacteriostatic water, precision syringes, and prep supplies already in the box.
          </p>
        </div>
      </div>

      {/* Category tiles — overhang the section seam like Medvi */}
      <div className="relative z-20 mx-auto -mt-[85px] max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {heroTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-[#fafafa] shadow-[0_30px_60px_-35px_rgba(17,33,17,0.55)] transition-transform hover:-translate-y-1"
            >
              {/* Top pastel image panel */}
              <div
                className="relative flex h-[170px] items-center justify-center"
                style={{ backgroundColor: tile.tone }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.55), transparent 65%)",
                  }}
                />
                <div
                  className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-white/90 shadow-[0_12px_30px_-12px_rgba(17,33,17,0.25)]"
                  style={{ color: tile.iconTone }}
                >
                  <tile.icon className="h-[34px] w-[34px]" strokeWidth={1.6} />
                </div>
              </div>

              {/* Label bar */}
              <div className="flex items-center justify-between px-5 py-4">
                <p
                  className="text-[#242220]"
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    letterSpacing: "-0.32px",
                  }}
                >
                  {tile.title}
                </p>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2f0ed] text-[#242220] transition group-hover:bg-[#1b6549] group-hover:text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
