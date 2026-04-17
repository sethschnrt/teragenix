"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Search,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navSections = [
  {
    label: "Home",
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard, color: "blue" }],
  },
  {
    label: "Customers",
    items: [{ href: "/admin/crm", label: "CRM", icon: Users, color: "green" }],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/orders", label: "Orders", icon: BriefcaseBusiness, color: "blue" },
      { href: "/admin/purchasing", label: "Product Orders", icon: ShoppingCart, color: "amber" },
      { href: "/admin/expenses", label: "Expenses", icon: CircleDollarSign, color: "violet" },
    ],
  },
  {
    label: "Configuration",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings2, color: "slate" }],
  },
] as const;

const mobileNavItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, color: "blue" },
  { href: "/admin/orders", label: "Orders", icon: BriefcaseBusiness, color: "blue" },
  { href: "/admin/expenses", label: "Expenses", icon: CircleDollarSign, color: "violet" },
  { href: "/admin/purchasing", label: "Product Orders", icon: ShoppingCart, color: "amber" },
  { href: "/admin/crm", label: "CRM", icon: Users, color: "green" },
  { href: "/admin/settings", label: "Settings", icon: Settings2, color: "slate" },
] as const;

const themeByColor = {
  blue: {
    active: "bg-[#eaf2ff] text-[#0f62fe] ring-1 ring-[#cfe0ff]",
    icon: "text-[#0f62fe]",
    badge: "bg-[#eaf2ff] text-[#0f62fe] border-[#cfe0ff]",
    focus: "focus:border-[#0f62fe]",
  },
  green: {
    active: "bg-[#e9f9f1] text-[#008060] ring-1 ring-[#b7ebcf]",
    icon: "text-[#008060]",
    badge: "bg-[#e9f9f1] text-[#008060] border-[#b7ebcf]",
    focus: "focus:border-[#008060]",
  },
  amber: {
    active: "bg-[#fff4e5] text-[#b98900] ring-1 ring-[#f1d39a]",
    icon: "text-[#b98900]",
    badge: "bg-[#fff4e5] text-[#8a6116] border-[#f1d39a]",
    focus: "focus:border-[#b98900]",
  },
  violet: {
    active: "bg-[#f3ecff] text-[#6d28d9] ring-1 ring-[#d9c7ff]",
    icon: "text-[#6d28d9]",
    badge: "bg-[#f3ecff] text-[#6d28d9] border-[#d9c7ff]",
    focus: "focus:border-[#6d28d9]",
  },
  slate: {
    active: "bg-white text-[#202223] ring-1 ring-[#dfe3e8]",
    icon: "text-[#4a4f55]",
    badge: "bg-white text-[#202223] border-[#dfe3e8]",
    focus: "focus:border-[#0f62fe]",
  },
} as const;

function getAdminTheme(pathname: string) {
  if (pathname.startsWith("/admin/crm")) {
    return { title: "CRM", color: "green" as const };
  }
  if (pathname.startsWith("/admin/orders")) {
    return { title: "Orders", color: "blue" as const };
  }
  if (pathname.startsWith("/admin/purchasing")) {
    return { title: "Product Orders", color: "amber" as const };
  }
  if (pathname.startsWith("/admin/expenses")) {
    return { title: "Expenses", color: "violet" as const };
  }
  if (pathname.startsWith("/admin/settings")) {
    return { title: "Settings", color: "slate" as const };
  }
  return { title: "Overview", color: "blue" as const };
}

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null; role: string };
}) {
  const pathname = usePathname() ?? "";
  const theme = getAdminTheme(pathname);
  const themeClasses = themeByColor[theme.color];

  return (
    <div className="min-h-screen bg-[#f6f6f7] text-[#202223]">
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#e1e3e5] bg-[#f1f2f3] px-4 py-5 lg:block">
          <div className="flex items-center justify-between gap-3">
            <Link href="/admin" className="inline-flex items-center">
              <Logo size="sm" theme="default" className="w-[94px]" />
            </Link>
            <div className="rounded-full border border-[#d2d5d8] bg-white px-2.5 py-1 text-[11px] font-medium text-[#5c5f62]">
              {user.role}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#dfe3e8] bg-white px-3 py-3 shadow-[0_1px_0_rgba(22,29,37,0.04)]">
            <p className="truncate text-sm font-medium text-[#202223]">{user.name || user.email}</p>
            <p className="mt-1 text-xs text-[#6d7175]">Signed into Teragenix Admin</p>
          </div>

          <nav className="mt-6 space-y-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">{section.label}</p>
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const itemTheme = themeByColor[item.color as keyof typeof themeByColor];

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? `${itemTheme.active} shadow-[0_1px_0_rgba(22,29,37,0.04)]`
                            : "text-[#414447] hover:bg-white hover:text-[#202223]"
                        }`}
                      >
                        <item.icon className={`h-4 w-4 ${active ? itemTheme.icon : "text-[#6d7175]"}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d2d5d8] bg-white px-3 py-2.5 text-sm font-medium text-[#202223] hover:bg-[#f6f6f7]"
            >
              View storefront
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full justify-center border-[#d2d5d8] bg-transparent text-[#414447] hover:bg-white hover:text-[#202223]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-[#e1e3e5] bg-[#f6f6f7]/95 backdrop-blur">
            <div className="px-4 py-3 lg:px-8">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <Link href="/admin" className="inline-flex items-center">
                  <Logo size="sm" theme="default" className="w-[94px]" />
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="inline-flex h-9 items-center rounded-lg border border-[#d2d5d8] bg-white px-3 text-xs font-medium text-[#202223]"
                  >
                    Store
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#d2d5d8] bg-white text-[#414447]"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {mobileNavItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const itemTheme = themeByColor[item.color as keyof typeof themeByColor];

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
                        active ? itemTheme.active : "bg-white text-[#414447] ring-1 ring-[#dfe3e8]"
                      }`}
                    >
                      <item.icon className={`h-3.5 w-3.5 ${active ? itemTheme.icon : "text-[#6d7175]"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${themeClasses.badge}`}>
                    {theme.title}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">Admin</p>
                    <h1 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[#202223]">{theme.title}</h1>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative min-w-[280px] max-w-[420px] flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7175]" />
                    <input
                      type="text"
                      placeholder="Search orders, contacts, expenses"
                      className={`h-10 w-full rounded-xl border border-[#c9cccf] bg-white pl-10 pr-4 text-sm text-[#202223] outline-none transition ${themeClasses.focus}`}
                    />
                  </div>
                  <div className="rounded-xl border border-[#d2d5d8] bg-white px-3 py-2 text-sm text-[#5c5f62]">
                    <span className="font-medium text-[#202223]">{user.name || user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="px-4 py-4 pb-6 lg:px-6 lg:py-5">
            <div className="w-full">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
