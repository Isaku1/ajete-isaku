import { Brain, Gauge, Layers, MessagesSquare, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

const strengthIcons: LucideIcon[] = [Layers, Gauge, Workflow, ShieldCheck, MessagesSquare, Brain];

export function About() {
  const facts = [
    { label: "Role", value: profile.level },
    { label: "Based in", value: `${profile.location} · ${profile.timezone}` },
    { label: "Platforms", value: "Azure · Microsoft Fabric · Databricks" },
    { label: "Currently learning", value: profile.currentlyLearning.join(" · ") },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="01 — About"
          title={
            <>
              Data engineering, built on <span className="text-gradient">trust</span>.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-6">
            {profile.about.story.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-slate-300">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <blockquote className="relative mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">Mission</p>
                <p className="mt-2 font-display text-xl leading-snug text-white">{profile.mission}</p>
              </blockquote>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal className="glass rounded-2xl p-6">
              <dl className="divide-y divide-white/5">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-sm text-slate-500">{fact.label}</dt>
                    <dd className="text-sm font-medium text-slate-200 sm:text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="glass rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-300">Career goal</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{profile.careerGoal}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.focusAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.about.strengths.map((strength, i) => {
            const Icon = strengthIcons[i % strengthIcons.length];
            return (
              <Reveal key={strength.title} delay={(i % 3) * 0.08} className="glass glass-hover rounded-2xl p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{strength.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{strength.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
