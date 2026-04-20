import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main data-page="not-found" className="min-h-screen bg-white text-[#0d262d]">
      <div className="mx-auto flex min-h-screen max-w-[1240px] items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[480px] text-center">
          <Logo size="lg" className="mx-auto w-[148px] sm:w-[168px]" />
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3b6ed6]">404</p>
          <h1 className="mt-3 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#0d262d] sm:text-[3rem]">
            Page not found
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-[#5b6b7b] sm:text-[16px]">
            This page does not exist or has moved.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#0d262d] px-5 text-sm font-semibold text-white transition hover:bg-[#163741]"
            >
              Shop peptides
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#dbe6f5] bg-white px-5 text-sm font-semibold text-[#0d262d] transition hover:bg-[#f8fbff]"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
