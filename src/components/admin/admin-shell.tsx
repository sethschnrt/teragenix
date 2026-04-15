"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowUpRight, BriefcaseBusiness, CircleDollarSign, LayoutDashboard, Settings2, ShoppingCart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, blurb: "Live KPIs and recent activity" },
  { href: "/admin/crm", label: "CRM", icon: Users, blurb: "Customer records from the storefront" },
  { href: "/admin/orders", label: "Orders", icon: BriefcaseBusiness, blurb: "Status, fulfillment, and order detail" },
  { href: "/admin/purchasing", label: "Purchasing", icon: ShoppingCart, blurb: "Products, equipment, and vendor buying" },
  { href: "/admin/expenses", label: "Expenses", icon: CircleDollarSign, blurb: "Spend tracking and recurring costs" },
  { href: "/admin/settings", label: "Settings", icon: Settings2, blurb: "System configuration and controls" },
];

function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="border-tera-border"
    >
      Sign out
    </Button>
  );
}

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null; role: string };
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-tera-bg pb-10">
      <section className="relative overflow-hidden bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] px-6 pb-8 pt-7 text-white sm:pt-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 15% 15%, rgba(255,255,255,0.08), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14">
                TERAGENIX OPS
              </div>
              <h1 className="mt-4 max-w-2xl text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[2.7rem]">
                Internal operations, styled like the main storefront.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72 sm:text-[15px]">
                Same blue, same premium feel, tighter layouts. No generic back-office junk.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/16 backdrop-blur-sm">
              <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">SIGNED IN</p>
              <h2 className="mt-3 text-[1.35rem] font-semibold leading-tight text-white">
                {user.name || user.email}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.1rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/56">Role</p>
                  <p className="mt-2 text-sm font-medium text-white/88">{user.role}</p>
                </div>
                <div className="rounded-[1.1rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/56">System</p>
                  <p className="mt-2 text-sm font-medium text-white/88">Storefront-linked CRM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-[-1.5rem] grid max-w-[1240px] gap-6 px-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-tera-border bg-white p-5 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)]">
          <div className="rounded-[1.4rem] bg-tera-blue-pale px-4 py-4 ring-1 ring-[#dbe6f5]">
            <p className="tg-eyebrow">Control center</p>
            <p className="mt-2 text-sm leading-6 text-tera-body">
              Keep customers, orders, purchasing, and spend inside the same Teragenix system.
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

          <div className="mt-5 border-t border-tera-border pt-5">
            <SignOutButton />
          </div>
        </aside>

        <section className="space-y-6 pt-1">
          {children}
        </section>
      </div>
    </div>
  );
}
