import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, FileCheck2, Microscope, ScrollText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { featuredBlogPosts, getAllBlogPosts } from "@/content/blog-posts";

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

const valueCards = [
  {
    icon: Microscope,
    title: "Research-first framing",
    body: "Articles stay grounded in research-use positioning, practical evaluation, and clearer product context.",
  },
  {
    icon: FileCheck2,
    title: "Quality signals",
    body: "The focus stays on specifics that help buyers verify a listing faster instead of relying on vague claims.",
  },
  {
    icon: ScrollText,
    title: "Buying clarity",
    body: "Each post is built to make comparison easier across product pages, docs, and support surfaces.",
  },
];

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
      <PageHero
        icon={BookOpenText}
        eyebrow="TERAGENIX BLOG"
        detail="Peptides, proof, and clearer buying context"
        title="Research insights without the filler."
        description="Use the Teragenix blog to read practical takes on peptide quality, documentation, research-use framing, and better buying clarity."
        variant="subpage"
        highlights={[
          { label: "Browse peptides", href: "/shop" },
          { label: "Check batch docs", href: "/coa" },
        ]}
        panelEyebrow="EDITORIAL FOCUS"
        panelTitle="What this section is built to help you verify"
        panelItems={[
          { label: "Topics", value: "Peptides, quality, and buying clarity" },
          { label: "Tone", value: "Research-use, specific, restrained" },
          { label: "Support path", href: "/faq" },
          { label: "Batch docs", href: "/coa" },
        ]}
      />

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {valueCards.map((card) => (
              <div key={card.title} className="rounded-[1.5rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white ring-1 ring-[#dbe6f5]">
                  <card.icon className="h-5 w-5 text-[#3b6ed6]" />
                </div>
                <h2 className="mt-5 text-[1.1rem] font-semibold text-[#0d262d]">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="tg-eyebrow">FEATURED READS</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[2.45rem]">
                Strong starting points for evaluating peptides more clearly.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {featuredBlogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-[1.7rem] bg-white p-6 ring-1 ring-[#e3e8ef] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(13,38,45,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">
                  <span>{post.category}</span>
                  <span className="text-[#c5cfdb]">•</span>
                  <span className="text-[#7b8aa0]">{formatBlogDate(post.publishedAt)}</span>
                </div>
                <h3 className="mt-4 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-[#0d262d]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475967]">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] text-[#64748b]">{post.readingMinutes} min read</span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#173f85]">
                    Read article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white sm:p-8">
              <p className="text-[11px] font-medium tracking-[0.22em] text-[#dbeafe]">ALL POSTS</p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.03em]">
                Built to support a cleaner buying path.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/72">
                Start with the article that matches your question, then move into the catalog, docs, and support pages with better context.
              </p>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-[1.5rem] bg-white p-5 ring-1 ring-[#e3e8ef] transition hover:border-[#cfd9e8] hover:shadow-[0_14px_36px_rgba(13,38,45,0.06)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">
                        <span>{post.category}</span>
                        <span className="text-[#c5cfdb]">•</span>
                        <span className="text-[#7b8aa0]">{formatBlogDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="mt-3 text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-[#0d262d]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#475967]">{post.description}</p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-[12px] text-[#64748b]">{post.readingMinutes} min read</p>
                      <p className="mt-2 text-sm font-semibold text-[#173f85]">Open article</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
