import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Database,
  Lightbulb,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/data/projects";

const toc = [
  { id: "summary", label: "Executive summary" },
  { id: "problem", label: "Business problem" },
  { id: "architecture", label: "Architecture design" },
  { id: "sources", label: "Source systems" },
  { id: "data-flow", label: "Data flow" },
  { id: "data-model", label: "Data model" },
  { id: "etl", label: "ETL process" },
  { id: "stack", label: "Tech stack" },
  { id: "sql", label: "SQL example" },
  { id: "python", label: "Python example" },
  { id: "challenges", label: "Challenges" },
  { id: "performance", label: "Performance" },
  { id: "impact", label: "Business impact" },
  { id: "lessons", label: "Lessons learned" },
  { id: "metrics", label: "Success metrics" },
];

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <p className="font-mono text-xs text-cyan-300/70">{String(n).padStart(2, "0")}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">{title}</h2>
        <div className="mt-5">{children}</div>
      </Reveal>
    </section>
  );
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <article className="relative pb-24 pt-28 md:pt-36">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] max-w-[160vw] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]"
      />

      <div className="container-x relative">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
            Case study {project.index} · {project.domain}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400 md:text-xl">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" /> {project.role}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" /> {project.duration}
            </span>
          </div>
        </header>

        <dl className="mt-10 grid gap-3 sm:grid-cols-3">
          {project.highlights.map((h) => (
            <div key={h.label} className="glass rounded-2xl p-5">
              <dt className="text-sm text-slate-400">{h.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white">{h.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Case study sections" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-white/10">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px flex gap-2 border-l border-transparent py-1 pl-4 text-sm text-slate-500 transition hover:border-cyan-400 hover:text-white"
                  >
                    <span className="font-mono text-[11px] text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 space-y-16">
            <Block id="summary" n={1} title="Executive summary">
              <p className="text-lg leading-relaxed text-slate-300">{project.executiveSummary}</p>
            </Block>

            <Block id="problem" n={2} title="Business problem">
              <p className="leading-relaxed text-slate-300">{project.businessProblem.context}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.businessProblem.painPoints.map((p) => (
                  <li key={p} className="flex gap-3 rounded-xl border border-rose-400/15 bg-rose-400/[0.04] p-4 text-sm text-slate-300">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="architecture" n={3} title="Architecture design">
              <p className="leading-relaxed text-slate-300">{project.architecture.overview}</p>
              <ol className="mt-6 space-y-3">
                {project.architecture.layers.map((layer, i) => (
                  <li key={layer.name} className="glass flex gap-4 rounded-2xl p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/25 to-violet-500/25 font-mono text-xs text-white">
                      L{i + 1}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-white">{layer.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{layer.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="sources" n={4} title="Source systems">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-white/[0.03] text-slate-400">
                    <tr>
                      {["System", "Technology", "Volume", "Cadence"].map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {project.sourceSystems.map((s) => (
                      <tr key={s.name} className="text-slate-300">
                        <td className="px-4 py-3 font-medium text-white">{s.name}</td>
                        <td className="px-4 py-3">{s.type}</td>
                        <td className="px-4 py-3">{s.volume}</td>
                        <td className="px-4 py-3">{s.cadence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>

            <Block id="data-flow" n={5} title="Data flow">
              <ol className="relative space-y-4 border-l border-dashed border-cyan-400/30 pl-6">
                {project.dataFlow.map((step, i) => (
                  <li key={step.step} className="relative">
                    <span className="absolute -left-[33px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/50 bg-base">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    </span>
                    <p className="font-display font-semibold text-white">
                      <span className="mr-2 font-mono text-xs text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                      {step.step}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="data-model" n={6} title="Data model">
              <p className="leading-relaxed text-slate-300">{project.dataModel.overview}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-yellow-400/25 bg-yellow-400/[0.04] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-yellow-200">Facts</p>
                  <ul className="mt-3 space-y-3">
                    {project.dataModel.facts.map((f) => (
                      <li key={f.name}>
                        <p className="flex items-center gap-2 font-mono text-sm text-white">
                          <Database className="h-3.5 w-3.5 text-yellow-300" /> {f.name}
                        </p>
                        <p className="ml-5.5 mt-0.5 pl-0.5 text-xs text-slate-400">Grain: {f.grain}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.04] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200">Dimensions</p>
                  <ul className="mt-3 space-y-3">
                    {project.dataModel.dimensions.map((d) => (
                      <li key={d.name}>
                        <p className="flex items-center gap-2 font-mono text-sm text-white">
                          <Database className="h-3.5 w-3.5 text-cyan-300" /> {d.name}
                        </p>
                        <p className="ml-5.5 mt-0.5 pl-0.5 text-xs text-slate-400">{d.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Block>

            <Block id="etl" n={7} title="ETL process">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.etlProcess.map((p) => (
                  <div key={p.phase} className="glass rounded-2xl p-5">
                    <p className="font-display font-semibold text-white">{p.phase}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block id="stack" n={8} title="Tech stack">
              <dl className="divide-y divide-white/5 rounded-2xl border border-white/10">
                {project.techStack.map((group) => (
                  <div key={group.category} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-6">
                    <dt className="w-40 shrink-0 text-sm text-slate-400">{group.category}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-slate-200">
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="sql" n={9} title="SQL example">
              <CodeBlock code={project.sqlExample.code} language="sql" title={project.sqlExample.title} />
            </Block>

            <Block id="python" n={10} title="Python example">
              <CodeBlock code={project.pythonExample.code} language="python" title={project.pythonExample.title} />
            </Block>

            <Block id="challenges" n={11} title="Challenges">
              <div className="space-y-4">
                {project.challenges.map((c) => (
                  <div key={c.challenge} className="grid overflow-hidden rounded-2xl border border-white/10 md:grid-cols-2">
                    <div className="bg-rose-400/[0.04] p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-300">Challenge</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.challenge}</p>
                    </div>
                    <div className="border-t border-white/10 bg-emerald-400/[0.04] p-5 md:border-l md:border-t-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            <Block id="performance" n={12} title="Performance improvements">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-white/[0.03] text-slate-400">
                    <tr>
                      {["Metric", "Before", "After", "Change"].map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {project.performance.map((p) => (
                      <tr key={p.metric} className="text-slate-300">
                        <td className="px-4 py-3 font-medium text-white">{p.metric}</td>
                        <td className="px-4 py-3 text-slate-400">{p.before}</td>
                        <td className="px-4 py-3">{p.after}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                            <TrendingUp className="h-3 w-3" /> {p.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>

            <Block id="impact" n={13} title="Business impact">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.businessImpact.map((item) => (
                  <li key={item} className="glass flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-slate-300">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="lessons" n={14} title="Lessons learned">
              <ul className="space-y-3">
                {project.lessonsLearned.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5 text-sm leading-relaxed text-slate-300">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="metrics" n={15} title="Success metrics">
              <dl className="grid gap-4 sm:grid-cols-2">
                {project.successMetrics.map((m) => (
                  <div key={m.label} className="glass rounded-2xl p-5">
                    <dt className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {m.label}
                    </dt>
                    <dd className="mt-2">
                      <span className="block font-display text-3xl font-semibold text-white">{m.value}</span>
                      <span className="mt-1 block text-xs text-slate-500">{m.description}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Link
              href={`/projects/${next.slug}`}
              className="glass glass-hover group flex items-center justify-between gap-6 rounded-3xl p-6 sm:p-8"
            >
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Next case study</span>
                <span className="mt-2 block font-display text-2xl font-semibold text-white">{next.title}</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 text-cyan-300 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
