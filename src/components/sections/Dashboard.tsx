"use client";

import {
  Activity,
  Briefcase,
  Database,
  Gauge,
  HardDrive,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactElement } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/ui/ChartTooltip";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { kpis, monthlyOps, qualityDimensions, queryTuning, slaTarget, type Kpi } from "@/data/metrics";
import { cn } from "@/lib/utils";

const kpiIcons: Record<Kpi["id"], LucideIcon> = {
  projects: Briefcase,
  pipelines: Workflow,
  queries: Database,
  data: HardDrive,
  performance: Gauge,
  quality: ShieldCheck,
  reliability: Activity,
  adoption: Users,
};

// Chart ink — single-series charts use the brand cyan; the before/after comparison pairs a
// recessive neutral (before) with the accent (after) so the improvement reads first.
const COLORS = {
  accent: "#22d3ee",
  before: "#64748b",
  grid: "rgba(255,255,255,0.06)",
  axis: "#8a93a6",
};

const axisProps = {
  tick: { fill: COLORS.axis, fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: "rgba(255,255,255,0.12)" },
};

type Range = "6M" | "12M";

export function Dashboard() {
  const [range, setRange] = useState<Range>("12M");
  const series = range === "6M" ? monthlyOps.slice(-6) : monthlyOps;

  return (
    <section id="impact" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[460px] w-[760px] max-w-[150vw] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]"
      />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="07 — Impact dashboard"
          title={
            <>
              Engineering impact, <span className="text-gradient">measured</span>.
            </>
          }
          description="The numbers I track across my delivery work — reliability, quality, performance and adoption over the last 12 months."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.id} kpi={kpi} delay={(i % 4) * 0.06} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">Operational trends · Nov 2025 – Oct 2026</p>
          <div role="group" aria-label="Time range" className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {(["6M", "12M"] as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-mono text-xs transition",
                  range === r ? "bg-white text-slate-950" : "text-slate-400 hover:text-white",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <ChartCard
            title="Pipeline reliability"
            subtitle={`Monthly success rate vs. ${slaTarget}% SLA target`}
            table={{
              headers: ["Month", "Success rate (%)"],
              rows: series.map((d) => [d.month, d.reliability]),
            }}
          >
            <LineChart data={series} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis domain={[97.5, 100]} tickFormatter={(v: number) => `${v}%`} {...axisProps} width={56} />
              <ReferenceLine
                y={slaTarget}
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="4 4"
                label={{ value: "SLA", position: "insideTopLeft", fill: COLORS.axis, fontSize: 11 }}
              />
              <Tooltip content={<ChartTooltip unit="%" />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
              <Line
                type="monotone"
                dataKey="reliability"
                name="Success rate"
                stroke={COLORS.accent}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.accent, strokeWidth: 0 }}
                activeDot={{ r: 5, stroke: "#05070d", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartCard>

          <ChartCard
            title="Data processed"
            subtitle="Terabytes loaded per month across all pipelines"
            table={{
              headers: ["Month", "Data processed (TB)"],
              rows: series.map((d) => [d.month, d.dataTb]),
            }}
          >
            <AreaChart data={series} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="fill-data" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis tickFormatter={(v: number) => `${v} TB`} {...axisProps} width={56} />
              <Tooltip content={<ChartTooltip unit=" TB" />} cursor={{ stroke: "rgba(255,255,255,0.2)" }} />
              <Area
                type="monotone"
                dataKey="dataTb"
                name="Data processed"
                stroke={COLORS.accent}
                strokeWidth={2}
                fill="url(#fill-data)"
                activeDot={{ r: 5, stroke: "#05070d", strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartCard>

          <ChartCard
            title="Query performance tuning"
            subtitle="P95 runtime in seconds, before vs. after optimisation"
            table={{
              headers: ["Workload", "Before (s)", "After (s)"],
              rows: queryTuning.map((d) => [d.workload, d.before, d.after]),
            }}
          >
            <BarChart data={queryTuning} margin={{ top: 10, right: 16, left: -8, bottom: 0 }} barGap={2}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="workload" {...axisProps} interval={0} tick={{ fill: COLORS.axis, fontSize: 11 }} />
              <YAxis tickFormatter={(v: number) => `${v}s`} {...axisProps} width={48} />
              <Tooltip content={<ChartTooltip unit=" s" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
                formatter={(value: string) => <span style={{ color: COLORS.axis }}>{value}</span>}
              />
              <Bar dataKey="before" name="Before" fill={COLORS.before} radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="after" name="After" fill={COLORS.accent} radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ChartCard>

          <ChartCard
            title="Data quality by dimension"
            subtitle="Share of rule checks passed across monitored tables"
            table={{
              headers: ["Dimension", "Score (%)"],
              rows: qualityDimensions.map((d) => [d.dimension, d.score]),
            }}
          >
            <BarChart data={qualityDimensions} layout="vertical" margin={{ top: 10, right: 24, left: 8, bottom: 0 }}>
              <CartesianGrid stroke={COLORS.grid} horizontal={false} />
              <XAxis type="number" domain={[95, 100]} tickFormatter={(v: number) => `${v}%`} {...axisProps} />
              <YAxis type="category" dataKey="dimension" {...axisProps} width={96} />
              <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="score" name="Score" fill={COLORS.accent} radius={[0, 4, 4, 0]} maxBarSize={22} />
            </BarChart>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ kpi, delay }: { kpi: Kpi; delay: number }) {
  const Icon = kpiIcons[kpi.id];
  const spark = kpi.trend.map((v, i) => ({ i, v }));
  return (
    <Reveal delay={delay} className="glass glass-hover flex flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm text-slate-400">{kpi.label}</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-white">
        <Counter value={kpi.value} decimals={kpi.decimals} prefix={kpi.prefix} />
        {kpi.suffix && <span className="ml-0.5 text-lg font-medium text-slate-400">{kpi.suffix}</span>}
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
        <TrendingUp className="h-3.5 w-3.5" />
        {kpi.delta}
      </p>
      <div className="mt-4 h-10" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spark} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
            <defs>
              <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.3} />
                <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Area
              type="monotone"
              dataKey="v"
              stroke={COLORS.accent}
              strokeWidth={1.75}
              fill={`url(#spark-${kpi.id})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-slate-500">{kpi.caption}</p>
    </Reveal>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  table,
}: {
  title: string;
  subtitle: string;
  children: ReactElement;
  table: { headers: string[]; rows: (string | number)[][] };
}) {
  return (
    <Reveal className="glass rounded-2xl p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
      <div className="mt-5 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-xs text-slate-500 transition hover:text-slate-300">
          <span className="group-open:hidden">Show data table</span>
          <span className="hidden group-open:inline">Hide data table</span>
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                {table.headers.map((h) => (
                  <th key={h} scope="col" className="py-2 pr-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={String(row[0])} className="border-b border-white/5 text-slate-300">
                  {row.map((cell, i) => (
                    <td key={i} className="py-1.5 pr-4 tabular-nums">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </Reveal>
  );
}
