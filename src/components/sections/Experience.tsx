import {
  Activity,
  BarChart3,
  Briefcase,
  Code2,
  Gauge,
  ShieldCheck,
  Target,
  Users,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience, previousRoles, workPrinciples, type Responsibility } from "@/data/experience";

const icons: Record<Responsibility["icon"], LucideIcon> = {
  code: Code2,
  workflow: Workflow,
  activity: Activity,
  warehouse: Warehouse,
  shield: ShieldCheck,
  gauge: Gauge,
  chart: BarChart3,
  users: Users,
};

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-x">
        <SectionHeader
          eyebrow="05 — Experience"
          title={
            <>
              Delivering outcomes, <span className="text-gradient">not just pipelines</span>.
            </>
          }
          description="What I work on day to day at Aralytiks — and the standard I hold each area to."
        />

        <Reveal className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{experience.role}</h3>
                <p className="mt-1 text-slate-300">{experience.company}</p>
                <p className="mt-0.5 text-sm text-slate-500">{experience.location}</p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
              {experience.period}
            </span>
          </div>
          <p className="relative mt-6 max-w-3xl leading-relaxed text-slate-300">{experience.summary}</p>
          <ul className="relative mt-5 flex flex-wrap gap-2">
            {experience.stack.map((tech) => (
              <li key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300">
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {experience.responsibilities.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.06} className="glass glass-hover flex flex-col rounded-2xl p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-cyan-300">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h4 className="mt-4 font-display font-semibold text-white">{item.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
                <p className="mt-4 flex items-start gap-2 border-t border-white/5 pt-4 text-sm font-medium text-emerald-300">
                  <Target className="mt-0.5 h-4 w-4 shrink-0" />
                  {item.outcome}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Previous roles</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {previousRoles.map((r) => (
              <div key={r.company} className="glass rounded-2xl p-6">
                <p className="font-mono text-xs text-cyan-300/70">{r.period}</p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-white">{r.role}</p>
                <p className="text-sm text-slate-400">{r.company}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-slate-400">
                  {r.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">How I work</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workPrinciples.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5">
                <span className="font-mono text-xs text-cyan-300/70">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display font-semibold text-white">{p.title}</p>
                <p className="mt-1 text-sm text-slate-400">{p.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
