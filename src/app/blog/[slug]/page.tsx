import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/blog";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: profile.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="relative pb-24 pt-28 md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[760px] max-w-[160vw] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]"
      />

      <div className="container-x relative max-w-3xl">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <header className="mt-8">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-xs text-cyan-200">
            {post.category}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="text-slate-300">{profile.name}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime}
            </span>
          </div>
        </header>

        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold text-white">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="mt-4 text-[17px] leading-8 text-slate-300">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[17px] leading-7 text-slate-300">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">Key takeaways</p>
          <ul className="mt-4 space-y-2.5">
            {post.takeaways.map((t) => (
              <li key={t} className="flex gap-3 text-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {t}
              </li>
            ))}
          </ul>
        </aside>

        <ul className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-slate-400">
              #{tag}
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-white/5 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Keep reading</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="glass glass-hover rounded-2xl p-5">
                <span className="text-xs text-cyan-300">{p.category}</span>
                <span className="mt-2 block font-display font-semibold text-white">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
