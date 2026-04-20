import { Check, X } from "lucide-react";
import { Logo } from "@/components/logo";

const comparisonRows = [
  "Curated around high-demand outcomes, not endless filler compounds",
  "Built for body composition, recovery, longevity, and aesthetics in one brand",
  "Premium positioning without the sketchy peptide-store feel",
  "Products chosen for visible, felt transformations people actually want",
  "A tighter lineup built for stronger desire and repeat demand",
] as const;

export function WhyChoose() {
  return (
    <section className="bg-[#fafbfc] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-[760px] sm:mb-12">
          <p className="tg-eyebrow">WHY CHOOSE TERAGENIX</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[#0d262d] sm:text-[3.2rem]">
            Not another peptide catalog, a brand built around what people actually want.
          </h2>
          <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-[#475967] sm:text-[16px]">
            The difference is not just having peptides. It is choosing the right ones, framing them around real desire, and building a brand people actually want to buy from.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[#dbe6f5] bg-white shadow-[0_24px_60px_-40px_rgba(17,33,17,0.18)]">
          <div className="grid grid-cols-[minmax(0,1.5fr)_120px_120px] border-b border-[#e8eef7] bg-[#f8fbff] px-5 py-4 text-sm sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:px-8">
            <div />
            <div className="flex items-center justify-center">
              <Logo size="md" className="w-[102px] sm:w-[112px]" />
            </div>
            <div className="text-center font-semibold text-[#6b7b8f]">Others</div>
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
