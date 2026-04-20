const sellingPoints = [
  {
    title: "Body composition support",
    body: "Shop compounds people look at when the goal is getting leaner, tighter, and more confident in how they look.",
  },
  {
    title: "Recovery-focused options",
    body: "Browse peptides chosen for people who care about bouncing back faster, feeling better, and staying consistent.",
  },
  {
    title: "Longevity-driven demand",
    body: "Find compounds that appeal to people thinking beyond short-term fixes and toward energy, vitality, and staying sharp over time.",
  },
  {
    title: "Aesthetics that people want",
    body: "Explore products tied to visible, feelable improvements that matter because they change how someone sees themselves day to day.",
  },
] as const;

export function WhyChoose() {
  return (
    <section className="bg-[#fafbfc] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-[760px]">
          <p className="tg-eyebrow">WHY CHOOSE TERAGENIX</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[#0d262d] sm:text-[3.2rem]">
            Peptides people want for goals they actually care about.
          </h2>
          <p className="mt-4 max-w-[42rem] text-[15px] leading-7 text-[#475967] sm:text-[16px]">
            The strongest products are the ones tied to outcomes people already want badly: looking better, recovering faster, feeling stronger, and staying sharp.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sellingPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-[1.75rem] border border-[#dbe6f5] bg-white p-6 shadow-[0_20px_50px_-40px_rgba(17,33,17,0.16)]"
            >
              <div className="h-1.5 w-12 rounded-full bg-[#3b6ed6]" />
              <h3 className="mt-5 text-[1.15rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d]">
                {point.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#475967]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
