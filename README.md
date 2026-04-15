# Teragenix

Teragenix is a Next.js storefront plus internal ops app for customer accounts, CRM, orders, expenses, and purchasing.

## Local dev

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Required env vars

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="replace-with-a-long-random-string"
NEXTAUTH_URL="https://your-production-url.vercel.app"
NEXT_PUBLIC_BASE_PATH=""
ADMIN_EMAIL="admin@teragenix.local"
ADMIN_PASSWORD="change-me-now"
```

## Deploy target

This app is meant for a real server-backed deploy, not GitHub Pages.

Recommended setup:
- Vercel for the Next.js app
- Postgres for the database, Supabase/Neon/Railway all work

## Vercel deploy checklist

1. Import `sethschnrt/teragenix` into Vercel.
2. Provision a Postgres database.
3. Add the env vars above in Vercel.
4. Set `NEXTAUTH_URL` to the production Vercel URL.
5. Run schema sync against the production database:

```bash
DATABASE_URL="your-production-db-url" npm run db:push
```

6. Redeploy in Vercel.

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```
