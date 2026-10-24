import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="03 — Featured projects"
          title={
            <>
              Enterprise-grade <span className="text-gradient">case studies</span>.
            </>
          }
          description="Five end-to-end deliveries, each documented like an architecture review: problem, design, data model, code, trade-offs and measured impact. Client names are anonymised."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, i) => {
            const featured = i === 0;
            const stack = project.techStack.flatMap((s) => s.items).slice(0, featured ? 7 : 5);
            return (
              <Reveal key={project.slug} delay={(i % 2) * 0.08} className={cn(featured && "lg:col-span-2")}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className={cn("relative flex flex-1 flex-col", featured && "lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-10")}>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-cyan-300/80">
                          {project.index} / {project.domain}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                      </div>
                      <h3
                        className={cn(
                          "mt-4 font-display font-semibold tracking-tight text-white",
                          featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                        )}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{project.tagline}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {stack.map((tech) => (
                          <li key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <dl className={cn("mt-8 grid grid-cols-3 gap-3", featured && "lg:mt-0 lg:grid-cols-1 lg:content-center")}>
                      {project.highlights.map((h) => (
                        <div key={h.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4">
                          <dt className="text-[11px] text-slate-500 sm:text-xs">{h.label}</dt>
                          <dd className="mt-1 font-display text-sm font-semibold text-white sm:text-lg">{h.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">
                    Read the case study
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
