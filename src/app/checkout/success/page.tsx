import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>;
}) {
  const { number } = await searchParams;

  return (
    <main>
      <PageHero
        icon={CheckCircle2}
        eyebrow="ORDER SUBMITTED"
        title="Your order request is in the Teragenix system."
        description="The storefront just handed your order into the shared ops stack, so admin, CRM, and account history can all see the same record."
        variant="subpage"
        detail={number ? `Order ${number}` : "Order submitted"}
        panelEyebrow="NEXT"
        panelTitle="What happens now"
        panelItems={[
          { label: "Status", value: "Payment pending" },
          { label: "Fulfillment", value: "Awaiting review" },
          { label: "Account orders", href: "/account/orders" },
          { label: "Back to shop", href: "/shop" },
        ]}
      />

      <section className="bg-[#fafbfc] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#e3e8ef] bg-white p-6 shadow-[0_12px_30px_rgba(17,33,17,0.04)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Submission complete</p>
            <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-[#0d262d] sm:text-[1.8rem]">
              {number ? `Order ${number} is now logged.` : "Your order is now logged."}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#475967]">
              I kept this honest: payment processing is not live yet, so checkout currently creates an order request in the shared Teragenix system rather than charging a card.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-[#f4f8ff] px-4 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Ops visibility</p>
                <p className="mt-2 text-sm leading-6 text-[#475967]">Admin and CRM can now see the same order record.</p>
              </div>
              <div className="rounded-[1.25rem] border border-[#dbe6f5] bg-[#f4f8ff] px-4 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Customer history</p>
                <p className="mt-2 text-sm leading-6 text-[#475967]">Signed-in users can track it in the account area.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#dbe6f5] bg-[#f4f8ff] p-6 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3b6ed6]">Where to go next</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link href="/account/orders" className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full bg-[#3b6ed6] px-6 text-sm font-semibold text-white">
                View account orders
              </Link>
              <Link href="/shop" className="tg-link-pill inline-flex h-12 items-center justify-center rounded-full border border-[#dbe6f5] bg-white px-6 text-sm font-semibold text-[#173f85]">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
