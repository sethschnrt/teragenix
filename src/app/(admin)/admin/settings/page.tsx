export default function AdminSettingsPage() {
  const systemRows = [
    ["Auth", "Live", "Credential auth is running"],
    ["Database", "Live", "Postgres-backed app"],
    ["Admin access", "Restricted", "Admin role required"],
  ];

  const nextRows = [
    ["Notifications", "Pending"],
    ["Team permissions", "Pending"],
    ["Workflow automation", "Pending"],
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dfe3e8] bg-white px-4 py-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d7175]">Settings</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#202223]">System settings</h2>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-[#dfe3e8] bg-white shadow-sm">
          <div className="border-b border-[#eceef0] bg-[#f6f6f7] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
            Current system
          </div>
          <table className="min-w-full divide-y divide-[#eceef0] text-sm">
            <tbody className="divide-y divide-[#eceef0] bg-white">
              {systemRows.map(([name, status, detail]) => (
                <tr key={name}>
                  <td className="px-3 py-3 font-medium text-[#202223]">{name}</td>
                  <td className="px-3 py-3 text-[#5c5f62]">{status}</td>
                  <td className="px-3 py-3 text-[#5c5f62]">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#dfe3e8] bg-white shadow-sm">
          <div className="border-b border-[#eceef0] bg-[#f6f6f7] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d7175]">
            Next setup items
          </div>
          <table className="min-w-full divide-y divide-[#eceef0] text-sm">
            <tbody className="divide-y divide-[#eceef0] bg-white">
              {nextRows.map(([name, status]) => (
                <tr key={name}>
                  <td className="px-3 py-3 font-medium text-[#202223]">{name}</td>
                  <td className="px-3 py-3 text-[#5c5f62]">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
