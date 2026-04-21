import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Footer } from "@/components/footer";
import { getAllBlogPosts, getBlogPostBySlug } from "@/content/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Teragenix Blog",
    };
  }

  return {
    title: post.seoTitle,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: post.tags,
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <PageHero
        icon={BookOpenText}
        eyebrow={post.category.toUpperCase()}
        detail={post.heroDetail}
        title={post.title}
        description={post.description}
        variant="subpage"
        highlights={[
          { label: "Back to blog", href: "/blog" },
          { label: "Browse peptides", href: "/shop" },
        ]}
        panelEyebrow="ARTICLE DETAILS"
        panelTitle="A cleaner way to evaluate the topic"
        panelItems={[
          { label: "Published", value: formatBlogDate(post.publishedAt) },
          { label: "Read time", value: `${post.readingMinutes} min read` },
          { label: "Author", value: post.author },
          { label: "Batch docs", href: "/coa" },
        ]}
      />

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 sm:px-8 lg:grid-cols-[0.82fr_0.38fr] lg:px-12">
          <article className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#64748b]">
              <Link href="/blog" className="inline-flex items-center font-medium text-[#173f85] hover:text-[#0d262d]">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Blog
              </Link>
              <span className="text-[#c5cfdb]">•</span>
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="text-[#c5cfdb]">•</span>
              <span>{post.readingMinutes} min read</span>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3b6ed6]">Summary</p>
              <p className="mt-3 text-[15px] leading-7 text-[#475967]">{post.excerpt}</p>
            </div>

            <div className="mt-8 space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-[1.25rem] bg-[#f8fbff] px-4 py-3 text-sm leading-6 text-[#475967] ring-1 ring-[#dbe6f5]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="grid gap-4 self-start">
            <div className="rounded-[1.75rem] bg-[linear-gradient(160deg,_#173f85_0%,_#102e5d_42%,_#0d262d_100%)] p-6 text-white">
              <p className="text-[11px] font-medium tracking-[0.22em] text-[#dbeafe]">NEXT STEP</p>
              <h2 className="mt-4 text-[1.6rem] font-semibold leading-tight tracking-[-0.03em]">
                Verify the product details after the read.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/72">
                Use the catalog, COA hub, and FAQ to keep the buying path grounded in details you can actually check.
              </p>
              <div className="mt-5 grid gap-3">
                <Link href="/shop" className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0d262d]">
                  Browse peptides
                </Link>
                <Link
                  href="/coa"
                  className="rounded-full border border-white/18 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
                >
                  Review batch docs
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[#e3e8ef]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Related reads</p>
              <div className="mt-4 grid gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                    <h2 className="text-[1rem] font-semibold leading-6 text-[#0d262d] group-hover:text-[#173f85]">
                      {relatedPost.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#64748b]">{relatedPost.excerpt}</p>
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#173f85]">
                      Read next
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <DisclaimerBanner />
      <Footer />
    </main>
  );
}
