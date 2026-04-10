import type { LucideIcon } from "lucide-react";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";

type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

type LegalPageTemplateProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

export function LegalPageTemplate({
  icon,
  eyebrow,
  title,
  description,
  lastUpdated,
  intro,
  sections,
}: LegalPageTemplateProps) {
  return (
    <main>
      <PageHero
        icon={icon}
        eyebrow={eyebrow}
        detail={`Last updated ${lastUpdated}`}
        title={title}
        description={description}
        variant="subpage"
      />

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3b6ed6]">
              PRE-LAUNCH STATUS
            </p>
            <h2 className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.65rem]">
              Drafted to be transparent now, finalized before checkout goes live.
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Legal business name, mailing address, and support contact will be added before launch.",
                "Shipping, refund, and support workflows will be tightened before live fulfillment begins.",
                "These pages are meant to avoid fake promises while still setting a real policy structure.",
                "Nothing here changes the site-wide research-use-only positioning.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-[#dbe6f5] bg-white px-4 py-3 text-sm leading-6 text-[#475967]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12">
          <div className="space-y-6">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.75rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8"
              >
                <h2 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.55rem]">
                  {section.title}
                </h2>

                {section.body && (
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b6ed6]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
