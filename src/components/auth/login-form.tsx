"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(result.url || callbackUrl);
      router.refresh();
    });
  }

  function handleCreateFirstAdmin() {
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/auth/bootstrap-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not create admin.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Admin created. Try signing in.");
        return;
      }

      router.push(result.url || callbackUrl);
      router.refresh();
    });
  }

  return (
    <Card className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-white/10 bg-white/92 py-5 text-[#0d262d] shadow-[0_30px_90px_-48px_rgba(0,0,0,0.65)] ring-1 ring-white/30 backdrop-blur-xl">
      <CardHeader className="space-y-2 px-6 sm:px-7">
        <CardTitle className="text-[1.9rem] tracking-[-0.03em] text-[#0d262d]">Sign in</CardTitle>
        <CardDescription className="text-sm text-[#5a6a7f]">
          Enter your email and password.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-7">
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0d262d]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none ring-0 transition placeholder:text-[#8a99ad] focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
              placeholder="admin@teragenix.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0d262d]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none ring-0 transition placeholder:text-[#8a99ad] focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>

          {error ? (
            <div className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <Button className="h-12 w-full rounded-[1rem] bg-[#173f85] text-white hover:bg-[#12346d]" type="submit" disabled={isPending}>
            {isPending ? "Working..." : "Sign in"}
          </Button>

          <button
            type="button"
            onClick={handleCreateFirstAdmin}
            disabled={isPending || !email || !password}
            className="w-full text-sm font-medium text-[#173f85] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create first admin instead
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
