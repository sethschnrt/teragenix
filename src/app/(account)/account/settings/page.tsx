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

  return (
    <AccountShell title="Account settings" subtitle="Profile and address management will live here as the account layer expands.">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)] md:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Phase 2 foundation is in place. Editable settings come next.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-tera-body">
            <p>Name: {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Not set"}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone || "Not set"}</p>
            <p>Saved addresses: {user?.addresses.length ?? 0}</p>
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] py-5 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)]">
          <CardHeader>
            <CardTitle className="text-white">Next account upgrades</CardTitle>
            <CardDescription className="text-white/68">What gets added once the live backend is wired.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/84">
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">Editable profile form</div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">Address book and defaults</div>
            <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 ring-1 ring-white/12">Password and login controls</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <CardTitle>Saved address state</CardTitle>
          <CardDescription>Keeping this honest until the editable forms are built.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-tera-body">
          {user?.addresses.length ? (
            user.addresses.map((address) => (
              <div key={address.id} className="rounded-[1.2rem] border border-tera-border px-4 py-3">
                <p className="font-medium text-tera-navy">{address.type}</p>
                <p className="mt-1 text-sm text-tera-body">
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
