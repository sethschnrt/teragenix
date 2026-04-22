import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { getAllBlogPosts } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Teragenix Blog | Peptide Research, Quality, and Buying Clarity",
  description:
    "Read Teragenix articles on research-use peptides, quality signals, documentation, and clearer product evaluation before purchase.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Teragenix Blog | Peptide Research, Quality, and Buying Clarity",
    description:
      "Read Teragenix articles on research-use peptides, quality signals, documentation, and clearer product evaluation before purchase.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teragenix Blog | Peptide Research, Quality, and Buying Clarity",
    description:
      "Read Teragenix articles on research-use peptides, quality signals, documentation, and clearer product evaluation before purchase.",
  },
  keywords: [
    "peptide blog",
    "research peptides",
    "peptide quality",
    "peptide buying guide",
    "batch documentation",
  ],
};

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function BlogHubPage() {
  const posts = getAllBlogPosts();

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] pt-20 text-white sm:pt-[5.5rem]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 76% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14 backdrop-blur-sm">
                <BookOpenText className="mr-2 h-3.5 w-3.5 text-[#a8c5f5]" />
                TERAGENIX BLOG
              </span>
              <span className="text-[12px] text-white/60">Peptides, proof, and buying clarity</span>
            </div>

            <h1 className="max-w-3xl text-[2rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[2.5rem]">
              Straight to the reads that matter.
            </h1>

            <p className="mt-2 max-w-2xl text-[0.96rem] leading-6 text-white/72 sm:text-[1rem]">
              Quick takes on product pages, quality signals, and buying research peptides with less guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="tg-link-card group flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-white ring-1 ring-[#e3e8ef]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8eef7]">
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
                    className="tg-link-card-media object-cover"
                  />
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">
                    <span>{post.category}</span>
                    <span className="text-[#c5cfdb]">•</span>
                    <span className="text-[#7b8aa0]">{formatBlogDate(post.publishedAt)}</span>
                  </div>

                  <h2 className="mt-4 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-[#0d262d]">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#475967]">{post.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-[12px] text-[#64748b]">{post.readingMinutes} min read</span>
                    <span className="inline-flex items-center text-sm font-semibold text-[#173f85]">
                      Read article
                      <ArrowRight className="tg-link-pill-icon ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
