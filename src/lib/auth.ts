import type { UserRole } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

type LoginAttemptBucket = {
  count: number;
  resetAt: number;
};

const LOGIN_WINDOW_MS = 5 * 60_000;
const MAX_LOGIN_ATTEMPTS = 10;

const globalLoginAttempts = globalThis as typeof globalThis & {
  __teragenixLoginAttempts?: Map<string, LoginAttemptBucket>;
};

const loginAttempts = globalLoginAttempts.__teragenixLoginAttempts ?? new Map<string, LoginAttemptBucket>();
globalLoginAttempts.__teragenixLoginAttempts = loginAttempts;

function normalizeLoginKey(email: string) {
  return email.trim().toLowerCase();
}

function isLoginBlocked(email: string) {
  const now = Date.now();
  const key = normalizeLoginKey(email);
  const bucket = loginAttempts.get(key);

  if (!bucket) {
    return false;
  }

  if (bucket.resetAt <= now) {
    loginAttempts.delete(key);
    return false;
  }

  return bucket.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(email: string) {
  const now = Date.now();
  const key = normalizeLoginKey(email);
  const bucket = loginAttempts.get(key);

  if (!bucket || bucket.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }

  bucket.count += 1;
}

function clearFailedLogins(email: string) {
  loginAttempts.delete(normalizeLoginKey(email));
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);

        if (!parsed.success) {
          return null;
        }

        if (isLoginBlocked(parsed.data.email)) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user?.passwordHash) {
          recordFailedLogin(parsed.data.email);
          return null;
        }

        const isValid = await verifyPassword(parsed.data.password, user.passwordHash);

        if (!isValid) {
          recordFailedLogin(parsed.data.email);
          return null;
        }

        clearFailedLogins(parsed.data.email);

        const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

        return {
          id: user.id,
          email: user.email,
          name: name || user.email,
          role: user.role,
        } satisfies AuthUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as AuthUser).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
};

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
