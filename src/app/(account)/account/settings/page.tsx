import { MapPin, ShieldCheck, UserRound } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountSettingsPage() {
  const session = await getServerAuthSession();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: {
      addresses: true,
    },
  });

  type AccountAddressRecord = NonNullable<typeof user>["addresses"][number];

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Not saved yet";

  return (
    <AccountShell title="Settings" subtitle="Review the profile details and saved addresses connected to your Teragenix account.">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border border-slate-200 bg-white py-6 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#173f85]">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-slate-950">Contact information</CardTitle>
                <CardDescription>Details currently tied to your account.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-5 sm:grid-cols-2 text-sm text-slate-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Full name</p>
              <p className="mt-1 font-medium text-slate-950">{displayName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
              <p className="mt-1 font-medium text-slate-950">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</p>
              <p className="mt-1 font-medium text-slate-950">{user?.phone || "Not saved yet"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Saved addresses</p>
              <p className="mt-1 font-medium text-slate-950">{user?.addresses.length ?? 0}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#d8e3f6] bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] py-6 shadow-sm">
          <CardHeader className="border-b border-[#d8e3f6] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#173f85] ring-1 ring-[#d8e3f6]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-slate-950">Account status</CardTitle>
                <CardDescription className="text-slate-600">Signed in and synced.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">Profile editing is the next upgrade to this customer area.</div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">Address management can drop into this layout cleanly when ready.</div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#d8e3f6]">Nothing here feels internal. This is the customer-facing side only.</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-slate-200 bg-white py-6 shadow-sm">
        <CardHeader className="border-b border-slate-200 pb-5">
          <CardTitle className="text-slate-950">Saved addresses</CardTitle>
          <CardDescription>Shipping and billing information currently on file.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-5 text-sm text-slate-600">
          {user?.addresses.length ? (
            user.addresses.map((address: AccountAddressRecord) => (
              <div key={address.id} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="flex items-center gap-2 text-slate-950">
                  <MapPin className="h-4 w-4 text-[#173f85]" />
                  <span className="font-medium">{address.type}</span>
                </div>
                <p className="mt-2 leading-6 text-slate-600">
                  {address.line1}, {address.city}, {address.state} {address.postalCode}
                </p>
              </div>
            ))
          ) : (
            <p>No saved addresses yet.</p>
          )}
        </CardContent>
      </Card>
    </AccountShell>
  );
}
