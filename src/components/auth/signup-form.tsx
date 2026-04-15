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
    <Card className="mx-auto w-full max-w-xl border border-tera-border bg-white py-5 shadow-[0_20px_50px_-42px_rgba(13,38,45,0.35)]">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Your Teragenix account will also create your CRM record behind the scenes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-tera-navy" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none transition focus:border-tera-blue"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-tera-navy" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none transition focus:border-tera-blue"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-tera-navy" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none transition focus:border-tera-blue"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-tera-navy" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none transition focus:border-tera-blue"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-tera-navy" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="w-full rounded-lg border border-tera-border px-3 py-2 text-sm outline-none transition focus:border-tera-blue"
              minLength={8}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button className="h-11 w-full rounded-full bg-tera-blue text-white hover:bg-tera-blue-hover" type="submit" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
