import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="border-t border-[#ebe5dc] bg-[#faf9f7] py-5">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#c28a3a]" />
          <p className="text-[12px] leading-5 text-[#242220]/70 sm:text-[13px]">
            <span className="font-semibold text-[#171a18]">Research Use Only.</span>{" "}
            All Teragenix products are sold strictly for in-vitro research and laboratory use. Not for human consumption. By purchasing, you agree to our{" "}
            <a href="/terms" className="font-medium text-[#1b6549] underline underline-offset-2 hover:text-[#2e936f]">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
