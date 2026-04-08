import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type HeroLink = {
  label: string;
  href: string;
};

type HeroPanelItem = {
  label: string;
  value?: string;
  href?: string;
};

type PageHeroProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  variant?: "shop" | "about" | "faq";
  highlights?: HeroLink[];
  panelEyebrow?: string;
  panelTitle?: string;
  panelItems?: HeroPanelItem[];
};

const variantStyles = {
  shop: {
    section: "bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)]",
    halo: "radial-gradient(circle at 78% 18%, rgba(168,197,245,0.22), transparent 30%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.08), transparent 26%)",
    panel: "bg-white/10 ring-white/18",
    pill: "bg-white/10 text-white/88 ring-white/14 hover:bg-white/16",
    stat: "bg-white/8 ring-white/12",
  },
  about: {
    section: "bg-[linear-gradient(165deg,_#1e4a9e_0%,_#102e5d_48%,_#0d262d_100%)]",
    halo: "radial-gradient(circle at 80% 22%, rgba(201,227,197,0.18), transparent 30%), radial-gradient(circle at 18% 16%, rgba(255,255,255,0.08), transparent 24%)",
    panel: "bg-white/9 ring-white/16",
    pill: "bg-white/10 text-white/88 ring-white/14 hover:bg-white/16",
    stat: "bg-white/8 ring-white/12",
  },
  faq: {
    section: "bg-[linear-gradient(165deg,_#102f63_0%,_#17457e_45%,_#0d262d_100%)]",
    halo: "radial-gradient(circle at 82% 18%, rgba(219,234,254,0.22), transparent 28%), radial-gradient(circle at 16% 22%, rgba(255,255,255,0.08), transparent 24%)",
    panel: "bg-white/10 ring-white/18",
    pill: "bg-white/10 text-white/88 ring-white/14 hover:bg-white/16",
    stat: "bg-white/8 ring-white/12",
  },
} as const;

export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  description,
  variant = "shop",
  highlights = [],
  panelEyebrow,
  panelTitle,
  panelItems = [],
}: PageHeroProps) {
  const styles = variantStyles[variant];

  return (
    <section className={`relative overflow-hidden ${styles.section} pt-28 text-white sm:pt-32`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: styles.halo }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[-3.5rem] flex justify-center">
        <span className="select-none whitespace-nowrap font-sans text-[6rem] font-extrabold leading-none tracking-[-0.05em] text-white/[0.04] sm:text-[8rem] lg:text-[10rem]">
          teragenix
        </span>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/16 backdrop-blur-sm">
              <Icon className="h-4.5 w-4.5 text-[#a8c5f5]" />
              <span className="text-[11px] font-medium tracking-[0.18em] text-white/86">
                {eyebrow}
              </span>
            </div>

            <h1 className="max-w-3xl text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[4.1rem] lg:text-[4.65rem]">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-[1.02rem] leading-7 text-white/74 sm:text-[1.08rem]">
              {description}
            </p>

            {highlights.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`tg-link-pill inline-flex items-center rounded-full px-4 py-2.5 text-[12px] font-medium tracking-[0.04em] ring-1 backdrop-blur-sm ${styles.pill}`}
                  >
                    {item.label}
                    <ArrowUpRight className="tg-link-pill-icon ml-2 h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {(panelTitle || panelItems.length > 0) && (
            <div className={`rounded-[2rem] p-6 ring-1 backdrop-blur-md sm:p-7 ${styles.panel}`}>
              {panelEyebrow && (
                <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-[#c9e3c5]">
                  {panelEyebrow}
                </p>
              )}
              {panelTitle && (
                <h2 className="max-w-md text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.8rem]">
                  {panelTitle}
                </h2>
              )}

              {panelItems.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {panelItems.map((item) => {
                    const content = (
                      <>
                        {item.value ? (
                          <>
                            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">
                              {item.label}
                            </span>
                            <span className="mt-2 block text-[0.98rem] font-medium leading-snug text-white/92">
                              {item.value}
                            </span>
                          </>
                        ) : (
                          <span className="block text-[0.98rem] font-medium leading-snug text-white/92">
                            {item.label}
                          </span>
                        )}
                      </>
                    );

                    if (item.href) {
                      return (
                        <Link
                          key={`${item.label}-${item.href}`}
                          href={item.href}
                          className={`tg-link-pill rounded-[1.25rem] p-4 ring-1 ${styles.stat}`}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={`${item.label}-${item.value ?? item.label}`}
                        className={`rounded-[1.25rem] p-4 ring-1 ${styles.stat}`}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
