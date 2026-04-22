import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
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
      images: [
        {
          url: post.imageSrc,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [post.imageSrc],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllBlogPosts().filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <main className="bg-[#f7f9fc]">
      <section className="relative overflow-hidden pt-24 pb-24 text-white sm:pt-28 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] opacity-[0.92]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 76% 18%, rgba(168,197,245,0.22), transparent 28%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06), transparent 24%)",
          }}
        />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <div className="rounded-[2rem] bg-white/6 p-6 ring-1 ring-white/12 backdrop-blur-[3px] sm:p-7">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-white/70">
                <Link href="/" className="tg-link-text hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                <Link href="/blog" className="tg-link-text hover:text-white">
                  Blog
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                <span className="text-white">{post.title}</span>
              </nav>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/84 ring-1 ring-white/14 backdrop-blur-sm">
                  {post.category}
                </span>
                <span className="text-[12px] text-white/60">{post.heroDetail}</span>
              </div>

              <h1 className="mt-4 max-w-4xl text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-[2.9rem]">
                {post.title}
              </h1>

              <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-white/72 sm:text-[1.05rem]">
                {post.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.15rem] bg-white/10 p-4 ring-1 ring-white/14 backdrop-blur-sm">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">Published</span>
                  <span className="mt-2 block text-sm font-medium text-white/92">{formatBlogDate(post.publishedAt)}</span>
                </div>
                <div className="rounded-[1.15rem] bg-white/10 p-4 ring-1 ring-white/14 backdrop-blur-sm">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">Read time</span>
                  <span className="mt-2 block text-sm font-medium text-white/92">{post.readingMinutes} min read</span>
                </div>
                <div className="rounded-[1.15rem] bg-white/10 p-4 ring-1 ring-white/14 backdrop-blur-sm">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/58">Author</span>
                  <span className="mt-2 block text-sm font-medium text-white/92">{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12">
          <article className="rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] shadow-[0_24px_60px_rgba(13,38,45,0.08)] sm:p-9">
            <div className="rounded-[1.4rem] bg-[#f4f8ff] p-5 ring-1 ring-[#dbe6f5]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3b6ed6]">Summary</p>
              <p className="mt-3 text-[15px] leading-7 text-[#475967] sm:text-[16px]">{post.excerpt}</p>
            </div>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[1.7rem]">
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
                          className="rounded-[1.15rem] bg-[#f8fbff] px-4 py-3 text-sm leading-6 text-[#475967] ring-1 ring-[#dbe6f5]"
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
        </div>
      </section>

      <section className="pb-10 sm:pb-12 lg:pb-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">More from the blog</p>
              <h2 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.03em] text-[#0d262d]">Keep reading</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-[#173f85] hover:text-[#0d262d]">
              View all
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[#e3e8ef] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(13,38,45,0.08)]"
              >
                <div className="relative aspect-[16/10] bg-[#e8eef7]">
                  <Image
                    src={relatedPost.imageSrc}
                    alt={relatedPost.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">
                    <span>{relatedPost.category}</span>
                    <span className="text-[#c5cfdb]">•</span>
                    <span className="text-[#7b8aa0]">{formatBlogDate(relatedPost.publishedAt)}</span>
                  </div>
                  <h3 className="mt-4 text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-[#0d262d]">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#64748b]">{relatedPost.excerpt}</p>
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
