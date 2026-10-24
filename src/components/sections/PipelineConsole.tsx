"use client";

import { useReducedMotion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TOTAL_ROWS = 4_218_440;

const stages = [
  { name: "Extract", detail: "Oracle ERP · SQL Server POS" },
  { name: "Validate", detail: "42 data quality rules" },
  { name: "Transform", detail: "Silver → Gold · SCD Type 2" },
  { name: "Load", detail: "FactSales + 7 dimensions" },
  { name: "Serve", detail: "Power BI semantic model" },
];

export function PipelineConsole() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setTick(stages.length);
      return;
    }
    // Two extra ticks hold the "succeeded" state before the run restarts.
    const id = setInterval(() => setTick((t) => (t >= stages.length + 2 ? 0 : t + 1)), 1400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const completed = Math.min(tick, stages.length);
  const done = completed === stages.length;
  const progress = (completed / stages.length) * 100;
  const rows = Math.round(TOTAL_ROWS * (completed / stages.length));

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-1 shadow-2xl shadow-cyan-500/10">
      <div className="rounded-[20px] bg-[#070a12]/80 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </span>
            <span className="truncate font-mono text-xs text-slate-400">pl_sales_daily_load</span>
          </div>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
              done ? "bg-emerald-400/10 text-emerald-300" : "bg-cyan-400/10 text-cyan-300",
            )}
          >
            {done ? <CheckCircle2 className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin" />}
            {done ? "Succeeded" : "Running"}
          </span>
        </div>

        <ol className="mt-6 space-y-2.5" aria-label="Pipeline stages">
          {stages.map((stage, i) => {
            const state = i < completed ? "done" : i === completed ? "running" : "pending";
            return (
              <li
                key={stage.name}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500",
                  state === "done" && "border-emerald-400/15 bg-emerald-400/[0.04]",
                  state === "running" && "border-cyan-400/30 bg-cyan-400/[0.07]",
                  state === "pending" && "border-white/5 bg-white/[0.02]",
                )}
              >
                {state === "done" && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
                {state === "running" && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-cyan-300" />}
                {state === "pending" && <Circle className="h-4 w-4 shrink-0 text-slate-600" />}
                <span className="w-20 shrink-0 text-sm font-medium text-slate-100">{stage.name}</span>
                <span className="truncate text-xs text-slate-400">{stage.detail}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6">
          <div className="flex justify-between font-mono text-[11px] text-slate-400">
            <span>progress</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Rows</dt>
            <dd className="mt-1 text-sm font-semibold tabular-nums text-white">{rows.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">DQ pass</dt>
            <dd className="mt-1 text-sm font-semibold text-white">99.8%</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Duration</dt>
            <dd className="mt-1 text-sm font-semibold text-white">1h 25m</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
