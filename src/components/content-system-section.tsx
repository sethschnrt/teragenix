import Link from "next/link";
import { ArrowUpRight, BarChart3, Clapperboard, Megaphone, PenSquare } from "lucide-react";

const systemCards = [
  {
    icon: Megaphone,
    title: "Angles first",
    body: "Start with pain points, transformations, objections, and curiosity hooks instead of guessing what to make next.",
  },
  {
    icon: PenSquare,
    title: "Scripts with a job",
    body: "Each script exists to test one clear idea, one promise, and one call to action.",
  },
  {
    icon: Clapperboard,
    title: "Creative variants",
    body: "One script can turn into multiple hooks, intros, endings, captions, and landing-page matches.",
  },
  {
    icon: BarChart3,
    title: "Results decide",
    body: "Winners get duplicated. Weak creative gets cut fast. The system compounds what actually works.",
  },
] as const;

export function ContentSystemSection() {
  return (
    <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_18px_50px_rgba(13,38,45,0.16)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            <div>
              <p className="tg-eyebrow mb-4 text-[#a8c5f5]">CONTENT SYSTEM</p>
              <h2 className="max-w-xl text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.5rem]">
                Teragenix is building a content engine, not just random ads.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[16px]">
                The goal is a repeatable system for angles, scripts, creative, landing-page fit, and results so the best
                ideas can scale and the weak ones get cut fast.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/content-system"
                  className="tg-link-pill inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#0d262d] hover:bg-[#eef4fc]"
                >
                  See the system
                  <ArrowUpRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {systemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.35rem] bg-white/8 p-4 ring-1 ring-white/12 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/10 ring-1 ring-white/14">
                    <card.icon className="h-5 w-5 text-[#a8c5f5]" />
                  </div>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/74">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
