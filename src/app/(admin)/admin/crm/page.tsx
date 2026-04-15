import Link from "next/link";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCrmPage() {
  const contacts = await prisma.crmContact.findMany({
    include: {
      user: true,
      _count: {
        select: {
          orders: true,
          tasks: true,
          notes: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-5">
      <div>
        <p className="tg-eyebrow">CRM</p>
        <h2 className="mt-3 text-3xl font-semibold text-tera-navy">Contacts connected to the storefront</h2>
        <p className="mt-2 text-sm text-tera-body">
          New website accounts will appear here automatically and link into orders over time.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-tera-border bg-white">
        <div className="grid grid-cols-[minmax(0,1.5fr)_120px_120px_120px] gap-4 border-b border-tera-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-tera-body">
          <div>Contact</div>
          <div>Stage</div>
          <div>Orders</div>
          <div>Linked</div>
        </div>

        {contacts.length === 0 ? (
          <div className="px-5 py-6 text-sm text-tera-body">No contacts yet.</div>
        ) : (
          contacts.map((contact) => (
            <Link
              key={contact.id}
              href={`/admin/crm/${contact.id}`}
              className="grid grid-cols-[minmax(0,1.5fr)_120px_120px_120px] gap-4 border-b border-tera-border px-5 py-4 text-sm transition hover:bg-tera-blue-pale/40 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-tera-navy">
                  {[contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || "Unnamed contact"}
                </p>
                <p className="truncate text-xs text-tera-body">{contact.email || "No email"}</p>
              </div>
              <div className="text-tera-body">{contact.stage}</div>
              <div className="text-tera-body">{contact._count.orders}</div>
              <div className="text-tera-body">{contact.user ? "Yes" : "No"}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

