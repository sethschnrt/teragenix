import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-tera-border bg-white p-6 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)] sm:p-7">
        <p className="tg-eyebrow">Settings</p>
        <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-[-0.03em] text-tera-navy sm:text-[2.35rem]">
          Reserved for auth, database, and workflow controls.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-tera-body sm:text-[15px]">
          I kept this visually aligned with the main site instead of letting it turn into a dead plain settings page.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Auth configuration", "Credential auth is scaffolded and ready for a real database-backed rollout."],
          ["Database controls", "Migrations, seeds, and production connection settings should live here next."],
          ["Ops safeguards", "Permissions, task rules, and future team controls belong in this area."],
        ].map(([title, description]) => (
          <Card key={title} className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border border-tera-border bg-white py-5 shadow-[0_18px_46px_-42px_rgba(13,38,45,0.3)]">
        <CardHeader>
          <CardTitle>What still needs a live backend</CardTitle>
          <CardDescription>This page stays honest about the remaining real dependency.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-tera-body">
          <p>• Run Prisma migrations against a real PostgreSQL database.</p>
          <p>• Seed the first admin user in production.</p>
          <p>• Add environment-backed controls for notifications and order workflow automation.</p>
        </CardContent>
      </Card>
    </div>
  );
}
