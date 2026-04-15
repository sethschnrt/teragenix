import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Teragenix Sign In",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const adminCount = await prisma.user.count({
    where: { role: "ADMIN" },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07131f] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,110,214,0.22), transparent 28%), radial-gradient(circle at 80% 16%, rgba(168,197,245,0.16), transparent 22%), linear-gradient(180deg, rgba(7,19,31,1) 0%, rgba(9,25,40,1) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1240px] items-center justify-center px-6 py-10">
        <div className="w-full max-w-[520px]">
          <Logo size="lg" theme="light" className="mx-auto mb-6 w-[140px] sm:w-[160px]" />
          <Suspense
            fallback={
              <div className="w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/8 p-6 text-sm text-white/70 shadow-[0_30px_90px_-48px_rgba(0,0,0,0.6)] ring-1 ring-white/8 backdrop-blur-xl">
                Loading...
              </div>
            }
          >
            <LoginForm allowBootstrap={adminCount === 0} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
