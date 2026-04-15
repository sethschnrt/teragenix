"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowUpRight, LayoutDashboard, LogOut, PackageSearch, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/account", label: "Overview", icon: LayoutDashboard, blurb: "Profile, CRM link, and account summary" },
  { href: "/account/orders", label: "Orders", icon: PackageSearch, blurb: "Track current and past Teragenix orders" },
  { href: "/account/settings", label: "Settings", icon: Settings2, blurb: "Contact details and saved profile info" },
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
  const pathname = usePathname();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-tera-bg pb-10">
      <section className="relative overflow-hidden bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] px-6 pb-8 pt-7 text-white sm:pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14">
                YOUR TERAGENIX ACCOUNT
              </div>
              <h1 className="mt-4 max-w-2xl text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[2.55rem]">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72 sm:text-[15px]">{subtitle}</p>
            </div>

            <div className="rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/16 backdrop-blur-sm">
              <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">ACCOUNT SYSTEM</p>
              <h2 className="mt-3 text-[1.35rem] font-semibold leading-tight text-white">
                Orders, profile, and customer history in one place.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Same brand language as the storefront, just tighter and more functional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-[-1.5rem] grid max-w-[1240px] gap-6 px-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-tera-border bg-white p-5 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)]">
          <div className="rounded-[1.4rem] bg-tera-blue-pale px-4 py-4 ring-1 ring-[#dbe6f5]">
            <p className="tg-eyebrow">Customer area</p>
            <p className="mt-2 text-sm leading-6 text-tera-body">
              Track orders, verify account details, and stay inside the Teragenix system.
            </p>
          </div>

          <nav className="mt-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block rounded-[1.2rem] border px-4 py-3 transition ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "border-[#bfd2f2] bg-[#f4f8ff]"
                    : "border-transparent hover:border-[#dbe6f5] hover:bg-tera-blue-pale/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-[0.95rem] ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-white ring-1 ring-[#dbe6f5]"
                      : "bg-[#f4f8ff]"
                  }`}>
                    <item.icon className="h-4.5 w-4.5 text-tera-blue" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-tera-navy">{item.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-tera-blue opacity-0 transition group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-xs leading-5 text-tera-body">{item.blurb}</p>
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          <Button
            variant="outline"
            className="mt-5 w-full justify-center border-tera-border text-tera-body"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </aside>

        <section className="space-y-6 pt-1">
          {children}
        </section>
      </div>
    </main>
  );
}
