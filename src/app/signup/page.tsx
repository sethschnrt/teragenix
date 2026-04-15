import { Suspense } from "react";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create your Teragenix account",
};

export default function SignupPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-tera-bg pb-14">
      <section className="relative overflow-hidden bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] px-6 pb-5 pt-8 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 15% 15%, rgba(255,255,255,0.08), transparent 24%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14">
              TERAGENIX ACCOUNT
            </p>
            <h1 className="mt-4 text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[2.7rem]">
              Create an account that connects directly into the Teragenix CRM.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-[15px]">
              Signups, orders, and account history will all feed the same connected customer record.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-[-1.75rem] grid max-w-[1240px] gap-6 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] ring-1 ring-[#e3e8ef] sm:p-7">
          <p className="tg-eyebrow">Connected account</p>
          <div className="mt-5 space-y-3">
            {[
              "Create a user account and CRM contact in one step.",
              "Future orders and support history stay tied to the same record.",
              "Customer-facing account area stays visually aligned with the storefront.",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#f4f8ff] px-4 py-3 ring-1 ring-[#dbe6f5]">
                <p className="text-sm leading-6 text-tera-body">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Step 1", "Create account"],
              ["Step 2", "CRM record links"],
              ["Step 3", "Orders stay tied in"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.2rem] border border-tera-border px-4 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-tera-blue">{label}</p>
                <p className="mt-2 text-sm leading-6 text-tera-body">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <Suspense fallback={<div className="rounded-[2rem] border border-tera-border bg-white p-6 text-sm text-tera-body shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)]">Loading signup...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
