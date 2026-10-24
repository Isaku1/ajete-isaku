"use client";

import { motion } from "framer-motion";
import { BarChart3, Cloud, Code2, Database, GitBranch, Network, Workflow, type LucideIcon } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "@/components/ui/ChartTooltip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories, toolkitCount, type SkillCategory } from "@/data/skills";
import { easeOut, proficiencyLabel } from "@/lib/utils";

const categoryIcons: Record<SkillCategory["id"], LucideIcon> = {
  programming: Code2,
  engineering: Workflow,
  cloud: Cloud,
  database: Database,
  analytics: BarChart3,
  architecture: Network,
  practices: GitBranch,
};

const radarData = skillCategories.map((c) => ({
  category: c.short,
  score: Math.round(c.skills.reduce((s, k) => s + k.level, 0) / c.skills.length),
}));

const legend = [
  { label: "Advanced", range: "80+" },
  { label: "Proficient", range: "70–79" },
  { label: "Working", range: "60–69" },
  { label: "Developing", range: "< 60" },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-x">
        <SectionHeader
          eyebrow="02 — Technical skills"
          title={
            <>
              A toolkit for the <span className="text-gradient">modern data stack</span>.
            </>
          }
          description={`An honest self-assessment across ${toolkitCount} technologies — strongest in SQL, warehousing and Azure orchestration, deliberately growing in Spark, Databricks and Fabric.`}
        />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Reveal className="glass h-fit rounded-2xl p-6 lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-semibold text-white">Capability profile</h3>
            <p className="mt-1 text-sm text-slate-400">Average proficiency per category</p>
            <div className="mt-4 h-72" role="img" aria-label={`Radar chart: ${radarData.map((d) => `${d.category} ${d.score}`).join(", ")}`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="#2c2f3a" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "#9aa3b5", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Proficiency" dataKey="score" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.18} />
                  <Tooltip content={<ChartTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-4 text-xs">
              {legend.map((l) => (
                <li key={l.label} className="flex justify-between text-slate-400">
                  <span>{l.label}</span>
                  <span className="font-mono text-slate-500">{l.range}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {skillCategories.map((category, ci) => {
              const Icon = categoryIcons[category.id];
              return (
                <Reveal key={category.id} delay={(ci % 2) * 0.08} className="glass glass-hover rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{category.title}</h3>
                      <p className="text-sm text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {category.skills.map((skill, si) => (
                      <li key={skill.name}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-slate-100">{skill.name}</span>
                          <span className="shrink-0 text-xs text-slate-400">
                            {proficiencyLabel(skill.level)} <span className="font-mono text-slate-500">· {skill.level}</span>
                          </span>
                        </div>
                        <div
                          className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.level}
                          aria-label={`${skill.name} proficiency`}
                        >
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.1 + si * 0.06, ease: easeOut }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-slate-500">{skill.context}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
