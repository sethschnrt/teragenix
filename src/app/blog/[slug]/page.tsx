import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { BlogProgressNav } from "@/components/blog-progress-nav";
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

function getSectionId(index: number) {
  return `section-${index + 1}`;
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
  const articleSections = post.sections.map((section, index) => ({
    ...section,
    id: getSectionId(index),
  }));
  const sectionThemes = [
    {
      shell: "border-[#dbe6f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]",
      badge: "bg-[#eaf2ff] text-[#173f85] ring-[#dbe6f5]",
      takeaway: "bg-[#f7fbff] ring-[#dbe6f5]",
      bullet: "bg-white ring-[#dbe6f5]",
    },
    {
      shell: "border-[#dceee8] bg-[linear-gradient(180deg,#ffffff_0%,#f6fcfa_100%)]",
      badge: "bg-[#e6f6f1] text-[#14655b] ring-[#d2ece4]",
      takeaway: "bg-[#f4fbf8] ring-[#dceee8]",
      bullet: "bg-white ring-[#dceee8]",
    },
    {
      shell: "border-[#ece2f8] bg-[linear-gradient(180deg,#ffffff_0%,#fbf7ff_100%)]",
      badge: "bg-[#f1e9fb] text-[#6f42a8] ring-[#e5d7f6]",
      takeaway: "bg-[#fcf8ff] ring-[#ece2f8]",
      bullet: "bg-white ring-[#ece2f8]",
    },
  ] as const;

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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(162deg,_#173f85_0%,_#0d262d_100%)] opacity-[0.96]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 12%, rgba(59,110,214,0.16), transparent 26%)",
          }}
        />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 text-[12px] text-white/68">
              <Link href="/" className="tg-link-text hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-white/40" />
              <Link href="/blog" className="tg-link-text hover:text-white">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-white/40" />
              <span className="max-w-full truncate text-white/88">{post.title}</span>
            </nav>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-white/88 ring-1 ring-white/12">
                {post.category}
              </span>
              <span className="text-[12px] text-white/62">{post.heroDetail}</span>
            </div>

            <h1 className="mx-auto mt-4 max-w-4xl text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-[2.9rem]">
              {post.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-7 text-white/82 sm:text-[1.05rem]">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-left">
              <div className="rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/12">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/56">Published</span>
                <span className="ml-2 text-[13px] font-medium text-white/92">{formatBlogDate(post.publishedAt)}</span>
              </div>
              <div className="rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/12">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/56">Read time</span>
                <span className="ml-2 text-[13px] font-medium text-white/92">{post.readingMinutes} min read</span>
              </div>
              <div className="rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/12">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/56">Author</span>
                <span className="ml-2 text-[13px] font-medium text-white/92">{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12 xl:grid xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
          <div className="hidden xl:block">
            <BlogProgressNav sections={articleSections.map((section) => ({ id: section.id, title: section.heading }))} />
          </div>

          <article className="min-w-0 rounded-[2rem] bg-white p-7 ring-1 ring-[#e3e8ef] shadow-[0_24px_60px_rgba(13,38,45,0.08)] sm:p-9">
            <div className="rounded-[1.45rem] bg-[linear-gradient(180deg,#f4f8ff_0%,#eef5ff_100%)] p-5 ring-1 ring-[#dbe6f5]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3b6ed6]">Summary</p>
              <p className="mt-3 text-[15px] leading-7 text-[#475967] sm:text-[16px]">{post.excerpt}</p>
            </div>

            <div className="mt-10 space-y-6">
              {articleSections.map((section, index) => {
                const theme = sectionThemes[index % sectionThemes.length];
                const [leadParagraph, ...detailParagraphs] = section.paragraphs;

                return (
                  <div key={section.heading} className="space-y-6">
                    <section
                      id={section.id}
                      className={`scroll-mt-32 rounded-[1.55rem] border p-5 sm:p-6 ${theme.shell}`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${theme.badge}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#7b8aa0]">Section {index + 1}</p>
                          <h2 className="mt-2 text-[1.45rem] font-semibold leading-tight tracking-[-0.03em] text-[#0d262d] sm:text-[1.7rem]">
                            {section.heading}
                          </h2>
                        </div>
                      </div>

                      <div className={`mt-5 rounded-[1.1rem] px-4 py-3.5 ring-1 ${theme.takeaway}`}>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3b6ed6]">Key takeaway</p>
                        <p className="mt-1.5 text-[15px] leading-7 text-[#30465b] sm:text-[16px]">{leadParagraph}</p>
                      </div>

                      {detailParagraphs.length ? (
                        <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475967] sm:text-[16px]">
                          {detailParagraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}

                      {section.bullets?.length ? (
                        <ul className="mt-5 space-y-2.5">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className={`flex items-start gap-3 rounded-[1rem] px-4 py-3 text-sm leading-6 text-[#475967] ring-1 ${theme.bullet}`}
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3b6ed6]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  </div>
                );
              })}
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
            <Link href="/blog" className="tg-link-pill inline-flex h-10 items-center rounded-full border border-[#dbe6f5] bg-white px-4 text-sm font-semibold text-[#173f85] hover:bg-[#f8fbff]">
              View all
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="tg-link-card group overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[#e3e8ef]"
              >
                <div className="relative aspect-[16/10] bg-[#e8eef7]">
                  <Image
                    src={relatedPost.imageSrc}
                    alt={relatedPost.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="tg-link-card-media object-cover"
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
