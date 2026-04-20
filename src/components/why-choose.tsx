import { Check, X } from "lucide-react";

const comparisonRows = [
  "Getting leaner and feeling more confident",
  "Recovering faster and staying consistent",
  "More energy, vitality, and momentum",
  "Sharper focus and clearer day-to-day performance",
  "Visible aesthetic improvements people actually want",
] as const;

export function WhyChoose() {
  return (
    <section className="bg-[#fafbfc] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-[760px] sm:mb-12">
          <p className="tg-eyebrow">WHY CHOOSE TERAGENIX</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[#0d262d] sm:text-[3.2rem]">
            Products people want for outcomes they already care about.
          </h2>
          <p className="mt-4 max-w-[42rem] text-[15px] leading-7 text-[#475967] sm:text-[16px]">
            The strongest demand comes from real goals: looking better, recovering faster, feeling stronger, and showing up better in everyday life.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[#dbe6f5] bg-white shadow-[0_24px_60px_-40px_rgba(17,33,17,0.18)]">
          <div className="grid grid-cols-[minmax(0,1.5fr)_120px_120px] border-b border-[#e8eef7] bg-[#f8fbff] px-5 py-4 text-sm sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:px-8">
            <div />
            <div className="text-center font-semibold text-[#3b6ed6]">Teragenix</div>
            <div className="text-center font-semibold text-[#6b7b8f]">Typical sites</div>
          </div>

          {comparisonRows.map((row, index) => (
            <div
              key={row}
              className={`grid grid-cols-[minmax(0,1.5fr)_120px_120px] items-center px-5 py-5 sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:px-8 ${
                index !== comparisonRows.length - 1 ? "border-b border-[#e8eef7]" : ""
              }`}
            >
              <p className="pr-4 text-[15px] leading-6 text-[#0d262d] sm:text-[17px]">{row}</p>

              <div className="flex justify-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9f0fc] text-[#3b6ed6] ring-1 ring-[#dbe6f5]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              </div>

              <div className="flex justify-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f5f7] text-[#8a97a8] ring-1 ring-[#e3e8ef]">
                  <X className="h-4 w-4" strokeWidth={3} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
