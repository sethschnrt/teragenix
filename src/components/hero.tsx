import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const heroTiles = [
  {
    title: "Fat Loss",
    href: "/shop?category=metabolic",
    image: "/images/generated/life-benefits-v13/confidence-jeans-belt.png",
    tone: "#f1f8f2",
    imageClassName: "h-[236px] w-auto",
  },
  {
    title: "Recovery",
    href: "/shop?category=longevity",
    image: "/images/generated/hero-cards-v9-cutout/man-33-blue-halfturn.png",
    tone: "#f4f7fa",
    imageClassName: "h-[228px] w-auto",
  },
  {
    title: "Longevity",
    href: "/shop",
    image: "/images/generated/hero-cards-v9-cutout/woman-47-cream-seated.png",
    tone: "#fbf6f0",
    imageClassName: "h-[228px] w-auto",
  },
  {
    title: "Vitality",
    href: "/shop?category=research",
    image: "/images/generated/life-benefits-v13/active-life-pickleball.png",
    tone: "#eff6f2",
    imageClassName: "h-[228px] w-auto",
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
              Peptides,
            </span>
            <span className="tg-h1 block text-white">
              <span className="text-[#a8c5f5] italic">redefined</span> for real life.
            </span>
          </h1>

          {/* Subhead — centered */}
          <p
            className="mx-auto mt-6 max-w-[560px] text-center text-white/85"
            style={{ fontSize: "17px", lineHeight: "1.65", fontWeight: 400 }}
          >
            Premium peptides designed to support fat loss, recovery, performance, and long-term vitality, delivered discreetly with a simpler, better experience.
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

      {/* Category cards — actual Medvi-style structure */}
      <div className="relative z-20 mx-auto -mt-[92px] max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-[28px] bg-white p-4 ring-1 ring-[#edf1f5] sm:p-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {heroTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative rounded-[22px] bg-white transition-transform hover:-translate-y-1"
              >
                <div className="relative h-[244px] overflow-visible rounded-[22px] bg-white">
                  {/* Pastel image field */}
                  <div
                    className="absolute inset-x-0 top-[16px] h-[160px] rounded-[22px]"
                    style={{ backgroundColor: tile.tone }}
                  />

                  {/* Subject cutout overflowing ABOVE the card */}
                  <div className="pointer-events-none absolute inset-x-0 top-[-52px] z-10 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE_PATH}${tile.image}`}
                      alt={tile.title}
                      className={tile.imageClassName}
                    />
                  </div>

                  {/* Light grey content area flush to the bottom */}
                  <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] rounded-b-[22px] bg-[#f2f3f3] px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="text-[#242220]"
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {tile.title}
                      </p>
                      <span className="flex h-7 w-7 items-center justify-center text-[#242220]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
