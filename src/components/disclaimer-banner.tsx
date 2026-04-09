import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="border-t border-[#e3e8ef] bg-[#f4f8ff] py-5">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#c28a3a]" />
          <p className="text-[12px] leading-5 text-[#0d262d]/70 sm:text-[13px]">
            <span className="font-semibold text-[#0d262d]">Research Use Only.</span>{" "}
            All Teragenix products are sold strictly for in-vitro research and laboratory use. Not for human consumption.
          </p>
        </div>
      </div>
    </section>
  );
}
