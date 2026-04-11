import Link from "next/link";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

type HeroTile = {
  title: string;
  href: string;
  image: string;
  desktopImage?: string;
  tone: string;
  mobileImageAlign: "center" | "bottom";
  desktopImageAlign: "bottom" | "desktop-bottom";
  mobileImageClass: string;
  desktopImageClass: string;
};

const heroTiles: HeroTile[] = [
  {
    title: "Metabolic",
    href: "/shop?category=metabolic",
    image: "/images/generated/life-benefits-v13-cutout/confidence-jeans-belt.webp",
    desktopImage: "/images/generated/life-benefits-v13-cutout/confidence-jeans-belt-desktop-bottom.webp",
    tone: "#e7f3ea",
    mobileImageAlign: "bottom",
    desktopImageAlign: "bottom",
    mobileImageClass: "h-[100%] w-auto max-w-[135%] translate-y-[10px] object-contain",
    desktopImageClass: "h-[228px] max-w-[96%] lg:h-[150px] lg:max-w-[96%]",
  },
  {
    title: "Antioxidant",
    href: "/shop?category=antioxidant",
    image: "/images/generated/hero-cards-v2-cutout/recovery-man-31.webp",
    tone: "#e4f3f5",
    mobileImageAlign: "bottom",
    desktopImageAlign: "bottom",
    mobileImageClass: "h-[102%] w-auto max-w-[138%] object-contain",
    desktopImageClass: "h-[236px] max-w-[94%] lg:h-[164px] lg:max-w-[94%]",
  },
  {
    title: "Cosmetic",
    href: "/shop?category=cosmetic",
    image: "/images/generated/hero-cards-v9-cutout/woman-47-cream-seated.webp",
    tone: "#f7eee2",
    mobileImageAlign: "bottom",
    desktopImageAlign: "bottom",
    mobileImageClass: "h-[100%] w-auto max-w-[138%] object-contain",
    desktopImageClass: "h-[232px] max-w-[95%] lg:h-[158px] lg:max-w-[95%]",
  },
  {
    title: "Melanocortin",
    href: "/shop?category=melanocortin",
    image: "/images/generated/life-benefits-v13-cutout/active-life-pickleball-centered.webp",
    desktopImage: "/images/generated/life-benefits-v13-cutout/active-life-pickleball-desktop-bottom.webp",
    tone: "#eee7fb",
    mobileImageAlign: "center",
    desktopImageAlign: "desktop-bottom",
    mobileImageClass: "h-[98%] w-auto max-w-[110%] object-contain",
    desktopImageClass: "h-[214px] max-w-[98%] lg:h-[150px] lg:max-w-[98%]",
  },
];

export function Hero() {
  return (
    <section className="relative">
      {/* Teragenix blue → navy gradient hero */}
      <div className="relative h-[668px] overflow-hidden bg-[linear-gradient(162deg,_#1e4a9e_0%,_#0d262d_100%)] lg:h-[536px]">
        {/* Subtle radial glow behind the headline */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.14), transparent 55%)",
          }}
        />

        {/* Giant background "teragenix" ghost wordmark — pushed lower behind cards like Medvi */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-18px] flex justify-center lg:bottom-[-44px]">
          <p
            className="select-none whitespace-nowrap font-black text-white/[0.026] leading-none"
            style={{
              fontSize: "clamp(185px, 21vw, 350px)",
              letterSpacing: "-0.04em",
            }}
          >
            teragenix
          </p>
        </div>

        {/* Content container — centered independently from background wordmark */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] items-center justify-center px-5 pb-[92px] pt-[72px] sm:px-8 sm:pb-[104px] sm:pt-[88px] lg:px-12 lg:pb-[72px] lg:pt-[40px]">
          <div className="mx-auto max-w-[900px] text-center lg:max-w-[760px]">
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
                Research-use kits with clear specs
              </p>
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-[900px] text-center lg:max-w-[760px]">
              <span className="block text-[48px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[60px] lg:text-[54px]">
                The Structure of
              </span>
              <span className="block text-[48px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[60px] lg:text-[54px]">
                <span className="italic text-[#a8c5f5]">Your Workflow</span>, Simplified.
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="mx-auto mt-5 max-w-[560px] text-center text-white/85 lg:mt-3 lg:max-w-[600px]"
              style={{ fontSize: "15px", lineHeight: "1.5", fontWeight: 400 }}
            >
              Research peptides organized into complete kits with visible specs, storage guidance, and documentation-first product pages.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:mt-5">
              <Link
                href="/shop"
                className="tg-link-pill group inline-flex h-12 items-center rounded-full bg-white px-7 text-[#0d262d] hover:bg-white/90"
                style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Shop all kits
                <svg className="tg-link-pill-icon ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="tg-link-pill inline-flex h-12 items-center rounded-full px-7 text-white ring-1 ring-white/40 hover:bg-white/10"
                style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Quality standards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category cards — Medvi-style responsive structure */}
      <div className="relative z-20 mx-auto -mt-[112px] max-w-[1240px] px-5 sm:-mt-[122px] sm:px-8 lg:-mt-[86px] lg:px-12">
        <div className="rounded-[28px] bg-white p-4 shadow-[0_12px_30px_rgba(17,33,17,0.06)] sm:p-5 lg:rounded-[24px] lg:p-4">
          {/* Mobile: 1-col horizontal cards. Tablet/Desktop: grid with overflowing images */}
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {heroTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="tg-link-card tg-hero-card group relative block rounded-[20px] bg-white sm:rounded-[22px]"
              >
                {/* MOBILE: horizontal layout (image left, label right) */}
                <div className="tg-hero-card-panel flex h-[110px] items-center gap-3 overflow-hidden rounded-[20px] bg-[#f2f3f3] pr-4 sm:hidden">
                  <div
                    className="tg-hero-card-surface relative h-full w-[130px] flex-shrink-0 overflow-hidden rounded-[18px]"
                    style={{ backgroundColor: tile.tone }}
                  >
                    <div
                      className={`absolute inset-0 flex justify-center ${
                        tile.mobileImageAlign === "center" ? "items-center" : "items-end"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${tile.image}`}
                        alt={tile.title}
                        className={`tg-link-card-media tg-hero-card-media ${tile.mobileImageClass}`}
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
                    <span className="tg-hero-card-action flex h-7 w-7 items-center justify-center rounded-full text-[#242220]">
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
                    className="tg-hero-card-surface absolute inset-x-0 top-[16px] h-[160px] overflow-visible rounded-[22px] lg:top-[8px] lg:h-[98px] lg:rounded-[18px]"
                    style={{ backgroundColor: tile.tone }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 z-10 flex justify-center ${
                        tile.desktopImageAlign === "desktop-bottom"
                          ? "items-center lg:items-end"
                          : "items-end"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_PATH}${tile.desktopImage ?? tile.image}`}
                        alt={tile.title}
                        className={`tg-link-card-media tg-hero-card-media w-auto object-contain ${tile.desktopImageClass}`}
                      />
                    </div>
                  </div>

                  {/* Light grey content area flush to the bottom */}
                  <div className="tg-hero-card-panel absolute inset-x-0 bottom-0 rounded-t-[18px] rounded-b-[22px] bg-[#f2f3f3] px-4 py-4 lg:rounded-t-[14px] lg:rounded-b-[18px] lg:px-3 lg:py-2.5">
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
                      <span className="tg-hero-card-action flex h-7 w-7 items-center justify-center rounded-full text-[#242220]">
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
