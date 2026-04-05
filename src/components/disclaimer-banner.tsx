import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="bg-[#1a2a3a] py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm text-white/80">
            <span className="font-semibold text-white">Research Use Only.</span>{" "}
            All products are sold strictly for in-vitro research and laboratory
            use. Not for human consumption. By purchasing, you agree to our{" "}
            <a href="/terms" className="underline text-[#6BA5E3] hover:text-[#4A90D9]">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
