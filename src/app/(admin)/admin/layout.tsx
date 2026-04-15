import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getServerAuthSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (!["ADMIN", "SALES"].includes(session.user.role)) {
    redirect("/");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}

