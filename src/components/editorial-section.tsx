import Link from "next/link";

interface EditorialSectionProps {
  eyebrow: string;
  headline: string;
  accentPhrase: string;
  accentColor: string;
  haloColor: string;
  bodyText: string;
  subheading: string;
  subbody: string;
  features: string[];
  cardTitle: string;
  ctaLabel: string;
  ctaHref: string;
  image1: string;
  image2: string;
  image3?: string;
  reverse?: boolean;
  background?: "white" | "cream";
  badgeLabel?: string;
}

const BASE_PATH = process.env.NODE_ENV === "production" ? "/teragenix" : "";

export function EditorialSection({
  eyebrow,
  headline,
  accentPhrase,
  accentColor,
  haloColor,
  bodyText,
  subheading,
  subbody,
  features,
  cardTitle,
  ctaLabel,
  ctaHref,
  image1,
  image2,
  image3,
  reverse = false,
  background = "white",
  badgeLabel,
}: EditorialSectionProps) {
  // Split headline on accentPhrase to render it in accent color
  const headlineParts = headline.split(accentPhrase);

  const bgClass = background === "cream" ? "bg-[#f4f8ff]" : "bg-white";

  // For twin frames at the bottom: use image2 and image3 (or image1 as fallback)
  const twinA = image2;
  const twinB = image3 || image1;

  return (
    <section className={`relative overflow-hidden ${bgClass}`}>
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-28 lg:px-[120px] lg:py-[140px]">
        <div
          className={`relative grid items-start gap-16 lg:grid-cols-[440px_1fr] lg:gap-20 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* LEFT COLUMN — image + feature card */}
          <div className="relative flex flex-col items-center">
            {/* Halo circle background */}
            <div
              className="pointer-events-none absolute left-1/2 top-[60px] h-[420px] w-[420px] -translate-x-1/2 rounded-full"
              style={{ backgroundColor: haloColor }}
            />

            {/* Hero product image (transparent Teragenix vial) */}
            <div className="relative z-10 flex h-[480px] w-[360px] items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE_PATH}${image1}`}
                alt=""
                className="max-h-[460px] w-auto object-contain drop-shadow-[0_24px_40px_rgba(17,33,17,0.18)]"
              />
            </div>

            {/* Feature card — pale-tinted checklist */}
            <div
              className="relative z-20 -mt-10 w-full max-w-[420px] rounded-[40px] px-9 py-8 shadow-[0_30px_50px_-30px_rgba(17,33,17,0.18)]"
              style={{ backgroundColor: haloColor }}
            >
              <p
                className="mb-5"
                style={{
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 600,
                  color: "#0d262d",
                  letterSpacing: "-0.4px",
                }}
              >
                {cardTitle}
              </p>
              <ul className="space-y-3.5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        lineHeight: "22px",
                        fontWeight: 500,
                        color: "#0d262d",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN — eyebrow + headline + body + twin images + sub-block */}
          <div>
            <p className="tg-eyebrow mb-6" style={{ color: accentColor }}>
              {eyebrow}
            </p>

            <h2 className="tg-h2 max-w-[600px]">
              {headlineParts.length === 2 ? (
                <>
                  {headlineParts[0]}
                  <span style={{ color: accentColor }}>{accentPhrase}</span>
                  {headlineParts[1]}
                </>
              ) : (
                headline
              )}
            </h2>

            <p
              className="mt-6 max-w-[540px]"
              style={{
                fontSize: "17px",
                lineHeight: "28px",
                color: "#475967",
                fontWeight: 400,
              }}
            >
              {bodyText}
            </p>

            {/* Twin lifestyle images (full-bleed) */}
            <div className="mt-12 grid max-w-[620px] grid-cols-2 gap-5">
              {[twinA, twinB].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[306/452] overflow-hidden rounded-[24px]"
                  style={{ backgroundColor: haloColor }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}${src}`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {badgeLabel && i === 0 && (
                    <span
                      className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 shadow-sm"
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "1.2px",
                        color: accentColor,
                      }}
                    >
                      {badgeLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Subheading + body */}
            <div className="mt-14 max-w-[540px]">
              <h3 className="tg-h3">{subheading}</h3>
              <p
                className="mt-4"
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#475967",
                  fontWeight: 400,
                }}
              >
                {subbody}
              </p>

              {/* CTA pill */}
              <Link
                href={ctaHref}
                className="mt-8 inline-flex h-12 items-center rounded-full px-7 text-white transition hover:brightness-110"
                style={{
                  backgroundColor: accentColor,
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "-0.28px",
                }}
              >
                {ctaLabel}
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
        </div>
      </div>
    </section>
  );
}
