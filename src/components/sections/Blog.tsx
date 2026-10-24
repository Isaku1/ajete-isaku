import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { posts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export function Blog() {
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-x">
        <SectionHeader
          eyebrow="08 — Writing"
          title={
            <>
              Notes from the <span className="text-gradient">data engineering trenches</span>.
            </>
          }
          description="Practical articles on modelling, pipelines, platforms and performance — what worked, what didn't, and why."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.07}>
              <Link href={`/blog/${post.slug}`} className="glass glass-hover group flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-xs text-cyan-200">
                    {post.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-white">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4 text-xs text-slate-500">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readingTime}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
