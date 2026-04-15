import Link from "next/link";
import { ArrowUpRight, FileText, PackageSearch, UserRound } from "lucide-react";

import { notFound } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCrmContactPage({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) {
  const { contactId } = await params;

  const contact = await prisma.crmContact.findUnique({
    where: { id: contactId },
    include: {
      user: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      tasks: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      notes: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!contact) {
    notFound();
  }

type ContactOrderRecord = (typeof contact.orders)[number];
type ContactNoteRecord = (typeof contact.notes)[number];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
          <p className="tg-eyebrow">CRM Contact</p>
          <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
            {[contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || "Unnamed contact"}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
            Lead source: {contact.leadSource || "Unknown"}. This contact now sits inside the same shared system as storefront accounts and orders.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white shadow-[0_20px_50px_-38px_rgba(13,38,45,0.45)] sm:p-7">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#dbeafe]">CONTACT SNAPSHOT</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Stage</p>
              <p className="mt-2 text-lg font-semibold text-white">{contact.stage}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Linked user</p>
              <p className="mt-2 text-sm font-medium text-white/88">{contact.user ? "Connected" : "Not linked"}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Orders</p>
              <p className="mt-2 text-lg font-semibold text-white">{contact.orders.length}</p>
            </div>
            <div className="rounded-[1.2rem] bg-white/8 p-4 ring-1 ring-white/12">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Notes</p>
              <p className="mt-2 text-lg font-semibold text-white">{contact.notes.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <UserRound className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Contact info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-tera-body">
            <p>Email: {contact.email || "Not set"}</p>
            <p>Phone: {contact.phone || "Not set"}</p>
            <p>Linked account: {contact.user?.email || "Not linked"}</p>
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <PackageSearch className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Latest linked orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            {contact.orders.length === 0 ? (
              <p>No linked orders yet.</p>
            ) : (
              contact.orders.map((order: ContactOrderRecord) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between rounded-[1.2rem] border border-tera-border px-4 py-3 transition hover:bg-tera-blue-pale/40"
                >
                  <div>
                    <p className="text-sm font-medium text-tera-navy">{order.orderNumber}</p>
                    <p className="mt-1 text-xs text-tera-body">{order.status}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-tera-blue" />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4f8ff] ring-1 ring-[#dbe6f5]">
              <FileText className="h-5 w-5 text-tera-blue" />
            </div>
            <CardTitle>Tasks & notes</CardTitle>
            <CardDescription>CRM workflow context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-tera-body">
            <div className="rounded-[1.2rem] border border-tera-border px-4 py-3">
              <p className="font-medium text-tera-navy">Tasks</p>
              <p className="mt-1 text-xs text-tera-body">{contact.tasks.length} linked task(s)</p>
            </div>
            <div className="rounded-[1.2rem] border border-tera-border px-4 py-3">
              <p className="font-medium text-tera-navy">Notes</p>
              <p className="mt-1 text-xs text-tera-body">{contact.notes.length} internal note(s)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <CardTitle>Latest notes</CardTitle>
          <CardDescription>Short timeline for internal CRM context.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-tera-body">
          {contact.notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            contact.notes.map((note: ContactNoteRecord) => (
              <div key={note.id} className="rounded-[1.2rem] border border-tera-border px-4 py-3">
                <p>{note.body}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
