import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const heroTiles = [
  {
    title: "Metabolic",
    href: "/shop?category=metabolic",
    image: "/images/product-semaglutide.png",
  },
  {
    title: "Peptides & Recovery",
    href: "/shop?category=longevity",
    image: "/images/product-bpc157.png",
  },
  {
    title: "Complete Kits",
    href: "/shop",
    image: "/images/product-recovery-stack.png",
  },
  {
    title: "Research",
    href: "/shop?category=research",
    image: "/images/product-tirzepatide.png",
  },
] as const;

export function Hero() {
  return (
    <section className="relative">
      {/* Teragenix blue → navy gradient hero */}
      <div className="relative h-[680px] overflow-hidden bg-[linear-gradient(162deg,_#1e4a9e_0%,_#0d262d_100%)]">
        {/* Subtle radial glow behind the headline */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.14), transparent 55%)",
          }}
        />

        {/* Giant background "teragenix" ghost wordmark — fits viewport, subtle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[40px] flex justify-center">
          <p
            className="select-none whitespace-nowrap font-black text-white/[0.018] leading-none"
            style={{
              fontSize: "clamp(140px, 16vw, 230px)",
              letterSpacing: "-0.04em",
            }}
          >
            teragenix
          </p>
        </div>

        {/* Content container — centered */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-[130px] sm:px-8 lg:px-12">
          {/* Eyebrow */}
          <div className="mb-6 flex justify-center">
            <p
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm ring-1 ring-white/20"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-white"
              />
              Join <span style={{ fontWeight: 700 }}>12,000+</span> Teragenix researchers
            </p>
          </div>

          {/* Headline — centered */}
          <h1 className="mx-auto max-w-[900px] text-center">
            <span className="tg-h1 block text-white">
              Peptide research,
            </span>
            <span className="tg-h1 block text-white">
              <span className="text-[#a8c5f5] italic">redefined</span> for your lab.
            </span>
          </h1>

          {/* Subhead — centered */}
          <p
            className="mx-auto mt-6 max-w-[560px] text-center text-white/85"
            style={{ fontSize: "17px", lineHeight: "1.65", fontWeight: 400 }}
          >
            Premium 99%+ purity peptides delivered as complete kits — bacteriostatic water, precision syringes, and prep supplies already in the box.
          </p>

          {/* CTA row — centered */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex h-12 items-center rounded-full bg-white px-7 text-[#0d262d] transition hover:bg-white/90"
              style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Shop all kits
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-full px-7 text-white ring-1 ring-white/40 transition hover:bg-white/10"
              style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              How it works
            </Link>
          </div>
        </div>
      </div>

      {/* Category cards — photo on top, label bar below, Medvi pattern */}
      <div className="relative z-20 mx-auto -mt-[90px] max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {heroTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_30px_60px_-30px_rgba(13,38,45,0.55)] ring-1 ring-[#e3e8ef] transition-transform hover:-translate-y-1"
            >
              {/* Photo top — square-ish aspect like Medvi (0.92) */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "0.92" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}${tile.image}`}
                  alt={tile.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* White label bar at bottom */}
              <div className="flex items-center justify-between bg-white px-5 py-4">
                <p
                  className="text-[#0d262d]"
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tile.title}
                </p>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef4fc] text-[#3b6ed6] transition group-hover:bg-[#3b6ed6] group-hover:text-white">
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
