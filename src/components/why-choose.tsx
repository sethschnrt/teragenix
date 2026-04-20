import { Check, X } from "lucide-react";

const comparisonRows = [
  "Clear product details up front",
  "Batch / COA status visible",
  "Goal-based browsing",
  "Policies easy to find",
  "Cleaner account experience",
] as const;

export function WhyChoose() {
  return (
    <section className="bg-[#111111] py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8eaef0]">Why choose</p>
            <h2 className="mt-3 text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[3.4rem]">
              Teragenix?
            </h2>
            <p className="mt-5 max-w-[24rem] text-[15px] leading-7 text-white/70">
              Make the difference obvious fast. Less clutter, less guessing, more clarity.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-[minmax(0,1.5fr)_120px_120px] border-b border-white/10 px-5 py-4 text-sm sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:px-8">
              <div />
              <div className="text-center font-semibold text-[#8eaef0]">Teragenix</div>
              <div className="text-center font-semibold text-white/75">Typical sites</div>
            </div>

            {comparisonRows.map((row, index) => (
              <div
                key={row}
                className={`grid grid-cols-[minmax(0,1.5fr)_120px_120px] items-center px-5 py-5 sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:px-8 ${
                  index !== comparisonRows.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <p className="pr-4 text-[15px] leading-6 text-white sm:text-[17px]">{row}</p>

                <div className="flex justify-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8eaef0] text-[#111111]">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </div>

                <div className="flex justify-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/14 text-white/80">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
