import type { Session } from "next-auth";
import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/lib/auth";

type RateLimitOptions = {
  namespace: string;
  limit: number;
  windowMs: number;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

type JsonResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: NextResponse };

const globalRateLimit = globalThis as typeof globalThis & {
  __teragenixRateLimit?: Map<string, RateBucket>;
};

const buckets = globalRateLimit.__teragenixRateLimit ?? new Map<string, RateBucket>();
globalRateLimit.__teragenixRateLimit = buckets;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function rateLimitRequest(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  const key = `${options.namespace}:${getClientIp(request)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  bucket.count += 1;

  if (bucket.count <= options.limit) {
    return null;
  }

  const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return NextResponse.json(
    { error: "Too many requests." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}

export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  const host = request.headers.get("host");

  try {
    const originUrl = new URL(origin);

    if (host && originUrl.host === host) {
      return null;
    }

    const nextAuthUrl = process.env.NEXTAUTH_URL;
    if (nextAuthUrl && new URL(nextAuthUrl).origin === originUrl.origin) {
      return null;
    }
  } catch {
    // Fall through to forbidden response.
  }

  return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
}

export async function parseJsonRequest<T = unknown>(request: Request, maxBytes = 32_768): Promise<JsonResult<T>> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType && !contentType.includes("application/json")) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Expected application/json." }, { status: 415 }),
    };
  }

  const body = await request.text();

  if (body.length > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Request body is too large." }, { status: 413 }),
    };
  }

  try {
    return { ok: true, data: JSON.parse(body) as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON." }, { status: 400 }),
    };
  }
}

export async function requireStaffSession(): Promise<
  | { ok: true; session: Session }
  | { ok: false; response: NextResponse }
> {
  const session = await getServerAuthSession();

  if (!session?.user || !["ADMIN", "SALES"].includes(session.user.role)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  return { ok: true, session };
}
