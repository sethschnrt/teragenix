"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowLeft, ChevronRight, LayoutDashboard, LifeBuoy, LogOut, PackageSearch, Settings2 } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", icon: PackageSearch },
  { href: "/account/settings", label: "Settings", icon: Settings2 },
];

export function AccountShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f6f8fb] pb-12 text-[#10233f]">
      <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-3 flex items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center">
            <Logo size="sm" theme="default" className="w-[86px]" />
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span>My account</span>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="tg-link-text mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#173f85] hover:text-[#102e5d]"
        >
          <ArrowLeft className="tg-link-pill-icon h-4 w-4" />
          Back
        </button>

        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173f85]">Teragenix account</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2.4rem]">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">{subtitle}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Signed in customer area
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Navigation</p>
              <nav className="mt-4 space-y-2">
                {navItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`tg-link-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                        active
                          ? "bg-[#173f85] text-white shadow-[0_10px_30px_-18px_rgba(23,63,133,0.6)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <Button
                variant="outline"
                className="tg-link-pill mt-4 w-full justify-center border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="tg-link-pill-icon mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>

            <div className="rounded-3xl border border-[#d8e3f6] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173f85]">Need help?</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">Questions about an order?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start with shipping, checkout, and policy answers in the Teragenix help center.
              </p>
              <Link
                href="/faq"
                className="tg-link-text mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#173f85] hover:text-[#102e5d]"
              >
                <LifeBuoy className="tg-link-pill-icon h-4 w-4" />
                Visit FAQ
              </Link>
            </div>
          </aside>

          <section className="min-w-0 space-y-5">{children}</section>
        </div>
      </div>
    </main>
  );
}
