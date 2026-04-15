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

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadSource = searchParams.get("source") ?? "website-signup";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          leadSource,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Could not create account.");
        return;
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: "/account",
      });

      if (!result || result.error) {
        setError("Account created, but sign in failed. Please try logging in.");
        router.push("/login");
        return;
      }

      router.push(result.url || "/account");
      router.refresh();
    });
  }

  return (
    <Card className="mx-auto w-full max-w-[640px] rounded-[2rem] border border-white/10 bg-white/92 py-5 text-[#0d262d] shadow-[0_30px_90px_-48px_rgba(0,0,0,0.65)] ring-1 ring-white/30 backdrop-blur-xl">
      <CardHeader className="space-y-2 px-6 sm:px-7">
        <CardTitle className="text-[1.9rem] tracking-[-0.03em] text-[#0d262d]">Create account</CardTitle>
        <CardDescription className="text-sm text-[#5a6a7f]">Enter your details below.</CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-7">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#0d262d]" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none transition focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#0d262d]" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none transition focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#0d262d]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none transition focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#0d262d]" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none transition focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0d262d]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="h-12 w-full rounded-[1rem] border border-[#dbe6f5] bg-white px-4 text-sm outline-none transition focus:border-[#3b6ed6] focus:shadow-[0_0_0_4px_rgba(59,110,214,0.12)]"
              minLength={8}
              required
            />
          </div>

          {error ? <div className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <Button className="h-12 w-full rounded-[1rem] bg-[#173f85] text-white hover:bg-[#12346d]" type="submit" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
