import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

const heroTiles = [
  {
    title: "Fat Loss",
    href: "/shop?category=metabolic",
    image: "/images/generated/life-benefits-v13-cutout/confidence-jeans-belt.png",
    tone: "#f1f8f2",
    imageAlign: "bottom",
    mobileImageClass: "h-[100%] w-auto max-w-[135%] object-contain",
    desktopImageClass: "h-[228px] max-w-[96%] lg:h-[150px] lg:max-w-[96%]",
  },
  {
    title: "Recovery",
    href: "/shop?category=longevity",
    image: "/images/generated/hero-cards-v2-cutout/recovery-man-31.png",
    tone: "#f4f7fa",
    imageAlign: "bottom",
    mobileImageClass: "h-[102%] w-auto max-w-[138%] object-contain",
    desktopImageClass: "h-[236px] max-w-[94%] lg:h-[164px] lg:max-w-[94%]",
  },
  {
    title: "Longevity",
    href: "/shop",
    image: "/images/generated/hero-cards-v9-cutout/woman-47-cream-seated.png",
    tone: "#fbf6f0",
    imageAlign: "bottom",
    mobileImageClass: "h-[100%] w-auto max-w-[138%] object-contain",
    desktopImageClass: "h-[232px] max-w-[95%] lg:h-[158px] lg:max-w-[95%]",
  },
  {
    title: "Vitality",
    href: "/shop?category=research",
    image: "/images/generated/life-benefits-v13-cutout/active-life-pickleball-centered.png",
    tone: "#eff6f2",
    imageAlign: "center",
    mobileImageClass: "h-[98%] w-auto max-w-[110%] object-contain",
    desktopImageClass: "h-[214px] max-w-[98%] lg:h-[150px] lg:max-w-[98%]",
  },
] as const;

export function Hero() {
  return (
    <section className="relative">
      {/* Teragenix blue → navy gradient hero */}
      <div className="relative h-[640px] overflow-hidden bg-[linear-gradient(162deg,_#1e4a9e_0%,_#0d262d_100%)] lg:h-[500px]">
        {/* Subtle radial glow behind the headline */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.14), transparent 55%)",
          }}
        />

        {/* Giant background "teragenix" ghost wordmark — fits viewport, subtle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[18px] flex justify-center lg:bottom-[10px]">
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
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-[118px] sm:px-8 lg:px-12 lg:pt-[62px]">
          {/* Eyebrow */}
          <div className="mb-5 flex justify-center lg:mb-4">
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
            <span className="block text-[48px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[60px] lg:text-[54px]">
              Peptides,
            </span>
            <span className="block text-[48px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[60px] lg:text-[54px]">
              <span className="text-[#a8c5f5] italic">redefined</span> for real life.
            </span>
          </h1>

          {/* Subhead — centered */}
          <p
            className="mx-auto mt-5 max-w-[560px] text-center text-white/85 lg:mt-3 lg:max-w-[600px]"
            style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 400 }}
          >
            Premium peptides designed to support fat loss, recovery, performance, and long-term vitality, delivered discreetly with a simpler, better experience.
          </p>

          {/* CTA row — centered */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:mt-5">
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

      {/* Category cards — Medvi-style responsive structure */}
      <div className="relative z-20 mx-auto -mt-[84px] max-w-[1240px] px-5 sm:px-8 lg:-mt-[42px] lg:px-12">
        <div className="rounded-[28px] bg-white p-4 ring-1 ring-[#edf1f5] sm:p-5 lg:rounded-[24px] lg:p-4">
          {/* Mobile: 1-col horizontal cards. Tablet/Desktop: grid with overflowing images */}
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {heroTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative block rounded-[20px] bg-white transition-transform hover:-translate-y-1 sm:rounded-[22px]"
              >
                {/* MOBILE: horizontal layout (image left, label right) */}
                <div className="flex h-[110px] items-center gap-3 overflow-hidden rounded-[20px] bg-[#f2f3f3] pr-4 sm:hidden">
                  <div
                    className="relative h-full w-[130px] flex-shrink-0 overflow-hidden rounded-[18px]"
                    style={{ backgroundColor: tile.tone }}
                  >
                    <div
                      className={`absolute inset-0 flex justify-center ${
                        tile.imageAlign === "center" ? "items-center" : "items-end"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${tile.image}`}
                        alt={tile.title}
                        className={tile.mobileImageClass}
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3">
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

                {/* TABLET & DESKTOP: vertical card with overflowing image */}
                <div className="relative hidden h-[244px] overflow-visible rounded-[22px] bg-white sm:block lg:h-[170px]">
                  {/* Pastel image field */}
                  <div
                    className="absolute inset-x-0 top-[16px] h-[160px] rounded-[22px] lg:top-[8px] lg:h-[98px] lg:rounded-[18px]"
                    style={{ backgroundColor: tile.tone }}
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-[-52px] z-10 flex justify-center lg:top-[-44px]">
                    <div
                      className={`flex w-full justify-center ${
                        tile.imageAlign === "center" ? "items-center" : "items-end"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${tile.image}`}
                        alt={tile.title}
                        className={`w-auto object-contain ${tile.desktopImageClass}`}
                      />
                    </div>
                  </div>

                  {/* Light grey content area flush to the bottom */}
                  <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] rounded-b-[22px] bg-[#f2f3f3] px-4 py-4 lg:rounded-t-[14px] lg:rounded-b-[18px] lg:px-3 lg:py-2.5">
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
