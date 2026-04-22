import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const teragenixBuildId =
  process.env.VERCEL_DEPLOYMENT_ID ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  "dev";

export async function GET() {
  return NextResponse.json(
    {
      buildId: teragenixBuildId,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );
}
