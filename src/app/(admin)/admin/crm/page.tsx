import Link from "next/link";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function stageChip(stage: string) {
  const palette: Record<string, string> = {
    LEAD: "bg-slate-100 text-slate-700",
    CONTACTED: "bg-blue-50 text-blue-700",
    QUALIFIED: "bg-violet-50 text-violet-700",
    CUSTOMER: "bg-emerald-50 text-emerald-700",
    INACTIVE: "bg-rose-50 text-rose-700",
  };

  return palette[stage] || "bg-slate-100 text-slate-700";
}

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
    take: 100,
  });

  type AdminContactRow = (typeof contacts)[number];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7175]">CRM</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">Customers and leads</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Total</p>
            <p className="mt-1 text-sm font-semibold">{contacts.length}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Customers</p>
            <p className="mt-1 text-sm font-semibold">{contacts.filter((contact) => contact.stage === "CUSTOMER").length}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Contacted</p>
            <p className="mt-1 text-sm font-semibold">{contacts.filter((contact) => contact.stage === "CONTACTED").length}</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-violet-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Qualified</p>
            <p className="mt-1 text-sm font-semibold">{contacts.filter((contact) => contact.stage === "QUALIFIED").length}</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Inactive</p>
            <p className="mt-1 text-sm font-semibold">{contacts.filter((contact) => contact.stage === "INACTIVE").length}</p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-[#dfe3e8] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#eceef0] text-sm">
            <thead className="bg-[#f6f6f7] text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
              <tr>
                <th className="px-3 py-2.5">Contact</th>
                <th className="px-3 py-2.5">Stage</th>
                <th className="px-3 py-2.5">Orders</th>
                <th className="px-3 py-2.5">Tasks</th>
                <th className="px-3 py-2.5">Notes</th>
                <th className="px-3 py-2.5">Linked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0] bg-white">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-[#6d7175]">No contacts yet.</td>
                </tr>
              ) : (
                contacts.map((contact: AdminContactRow) => (
                  <tr key={contact.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-3">
                      <Link href={`/admin/crm/${contact.id}`} className="font-medium text-[#202223] hover:text-[#008060]">
                        {[contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || "Unnamed contact"}
                      </Link>
                      <div className="text-xs text-[#6d7175]">{contact.email || "No email"}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${stageChip(contact.stage)}`}>
                        {contact.stage}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#5c5f62]">{contact._count.orders}</td>
                    <td className="px-3 py-3 text-[#5c5f62]">{contact._count.tasks}</td>
                    <td className="px-3 py-3 text-[#5c5f62]">{contact._count.notes}</td>
                    <td className="px-3 py-3 text-[#5c5f62]">{contact.user ? "Yes" : "No"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
