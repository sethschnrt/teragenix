import { Suspense } from "react";
import { ArrowUpRight, BriefcaseBusiness, CircleDollarSign, LayoutDashboard, ShoppingCart, Users } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Teragenix Admin Sign In",
};

const appModules = [
  { label: "Overview", blurb: "Recent activity and live business readout.", icon: LayoutDashboard },
  { label: "CRM", blurb: "Contacts tied directly to storefront activity.", icon: Users },
  { label: "Orders", blurb: "Status, fulfillment, and customer context.", icon: BriefcaseBusiness },
  { label: "Purchasing", blurb: "Products, equipment, and vendor intake.", icon: ShoppingCart },
  { label: "Expenses", blurb: "Operational spend and recurring costs.", icon: CircleDollarSign },
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07131f] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(59,110,214,0.24), transparent 30%), radial-gradient(circle at 82% 18%, rgba(168,197,245,0.18), transparent 24%), linear-gradient(180deg, rgba(7,19,31,1) 0%, rgba(9,25,40,1) 100%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1440px] gap-8 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
        <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_30px_90px_-48px_rgba(0,0,0,0.6)] ring-1 ring-white/8 backdrop-blur-xl sm:p-8">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/78">
              TERAGENIX OPS
            </div>
            <h1 className="mt-5 max-w-2xl text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[3.35rem]">
              Sign in to the control layer, not the storefront.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/64 sm:text-[15px]">
              This should feel like a premium internal tool, quiet, sharp, and built for running the business.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {appModules.map((item) => (
              <div key={item.label} className="rounded-[1.35rem] border border-white/10 bg-black/16 px-4 py-4 ring-1 ring-white/6">
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-white/8 ring-1 ring-white/10">
                  <item.icon className="h-4.5 w-4.5 text-[#a8c5f5]" />
                </div>
                <p className="mt-4 text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-white/54">{item.blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-5 ring-1 ring-white/6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a8c5f5]">App surface</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  The login route should hand off into CRM, orders, purchasing, and expenses, not back into brochure-mode UI.
                </p>
              </div>
              <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-[#a8c5f5] sm:block" />
            </div>
          </div>
        </section>

        <section className="flex items-center lg:justify-end">
          <Suspense
            fallback={
              <div className="w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/8 p-6 text-sm text-white/70 shadow-[0_30px_90px_-48px_rgba(0,0,0,0.6)] ring-1 ring-white/8 backdrop-blur-xl">
                Loading sign in...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
