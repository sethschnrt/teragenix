import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  return children;
}

