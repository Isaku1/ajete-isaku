"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CornerDownRight, KeyRound, MousePointerClick, Table2 } from "lucide-react";
import { Fragment, useState } from "react";
import { architectures, type FlowLane, type SchemaTable, type Tone } from "@/data/architecture";
import { cn, easeOut } from "@/lib/utils";

const toneStyles: Record<Tone, { card: string; dot: string }> = {
  source: { card: "border-slate-400/20 bg-slate-400/[0.06]", dot: "bg-slate-400" },
  bronze: { card: "border-amber-600/35 bg-amber-600/[0.08]", dot: "bg-amber-500" },
  silver: { card: "border-slate-200/25 bg-slate-200/[0.06]", dot: "bg-slate-200" },
  gold: { card: "border-yellow-400/35 bg-yellow-400/[0.07]", dot: "bg-yellow-400" },
  cyan: { card: "border-cyan-400/30 bg-cyan-400/[0.07]", dot: "bg-cyan-400" },
  blue: { card: "border-blue-400/30 bg-blue-400/[0.07]", dot: "bg-blue-400" },
  violet: { card: "border-violet-400/30 bg-violet-400/[0.07]", dot: "bg-violet-400" },
  emerald: { card: "border-emerald-400/30 bg-emerald-400/[0.07]", dot: "bg-emerald-400" },
};

type Selection = { title: string; detail: string } | null;

export function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState(architectures[0].id);
  const [selection, setSelection] = useState<Selection>(null);
  const arch = architectures.find((a) => a.id === activeId) ?? architectures[0];

  function choose(id: string) {
    setActiveId(id);
    setSelection(null);
  }

  return (
    <div>
      <div role="tablist" aria-label="Architecture patterns" className="flex flex-wrap gap-2">
        {architectures.map((a, i) => {
          const selected = a.id === arch.id;
          return (
            <button
              key={a.id}
              role="tab"
              type="button"
              id={`tab-${a.id}`}
              aria-selected={selected}
              aria-controls="architecture-panel"
              onClick={() => choose(a.id)}
              className={cn(
                "relative rounded-xl border px-3.5 py-2 text-left text-sm transition-colors",
                selected
                  ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200",
              )}
            >
              <span className="mr-2 font-mono text-[10px] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
              {a.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={arch.id}
          id="architecture-panel"
          role="tabpanel"
          aria-labelledby={`tab-${arch.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mt-8"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8">
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{arch.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{arch.summary}</p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MousePointerClick className="h-3.5 w-3.5" /> Select a component for details
                </p>
              </div>

              {arch.diagram.kind === "flow" ? (
                <FlowDiagram lanes={arch.diagram.lanes} selection={selection} onSelect={setSelection} />
              ) : (
                <SchemaDiagram
                  fact={arch.diagram.fact}
                  dimensions={arch.diagram.dimensions}
                  selection={selection}
                  onSelect={setSelection}
                />
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">How it works</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{arch.description}</p>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                <span className="font-medium text-slate-300">When to use: </span>
                {arch.whenToUse}
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-300">Design principles</p>
              <ul className="mt-3 space-y-2.5">
                {arch.principles.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6" aria-live="polite">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">Component detail</p>
              {selection ? (
                <motion.div key={selection.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="mt-3 font-display text-lg font-semibold text-white">{selection.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{selection.detail}</p>
                </motion.div>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Click any stage or table in the diagram to see what it is responsible for.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────── Flow diagrams ───────────────────────────── */

function FlowDiagram({
  lanes,
  selection,
  onSelect,
}: {
  lanes: FlowLane[];
  selection: Selection;
  onSelect: (s: Selection) => void;
}) {
  return (
    <div className="space-y-8">
      {lanes.map((lane, li) => (
        <div key={li}>
          {lane.label && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">{lane.label}</p>
          )}
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {lane.steps.map((step, si) => {
              const isSelected = selection?.title === step.title && selection.detail === step.detail;
              return (
                <Fragment key={`${step.title}-${si}`}>
                  {si > 0 && <Connector />}
                  <motion.button
                    type="button"
                    onClick={() => onSelect({ title: step.title, detail: step.detail })}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: li * 0.15 + si * 0.07, ease: easeOut }}
                    whileHover={{ y: -3 }}
                    aria-pressed={isSelected}
                    className={cn(
                      "min-w-0 flex-1 rounded-2xl border p-4 text-left backdrop-blur-sm transition-shadow",
                      toneStyles[step.tone].card,
                      isSelected ? "ring-2 ring-cyan-400/70 shadow-lg shadow-cyan-500/20" : "hover:shadow-lg hover:shadow-black/30",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 shrink-0 rounded-full", toneStyles[step.tone].dot)} aria-hidden="true" />
                      <span className="font-mono text-[10px] text-slate-500">{String(si + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="mt-2 block font-display text-[15px] font-semibold text-white">{step.title}</span>
                    <span className="mt-2 block space-y-1">
                      {step.items.map((item) => (
                        <span key={item} className="block text-xs leading-snug text-slate-400">
                          {item}
                        </span>
                      ))}
                    </span>
                  </motion.button>
                </Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex h-7 shrink-0 items-center justify-center lg:h-auto lg:w-7">
      <div className="flow-line-v h-full w-0.5 rounded-full lg:hidden" />
      <div className="flow-line hidden h-0.5 w-full rounded-full lg:block" />
    </div>
  );
}

/* ───────────────────────────── Schema diagrams ───────────────────────────── */

// Grid slots around the central fact (3×3 grid, fact in the middle), in fill order.
const SLOTS = [
  { cls: "lg:col-start-2 lg:row-start-1", x: 50, y: 16.7 },
  { cls: "lg:col-start-2 lg:row-start-3", x: 50, y: 83.3 },
  { cls: "lg:col-start-1 lg:row-start-2", x: 16.7, y: 50 },
  { cls: "lg:col-start-3 lg:row-start-2", x: 83.3, y: 50 },
  { cls: "lg:col-start-1 lg:row-start-1", x: 16.7, y: 16.7 },
  { cls: "lg:col-start-3 lg:row-start-3", x: 83.3, y: 83.3 },
  { cls: "lg:col-start-3 lg:row-start-1", x: 83.3, y: 16.7 },
  { cls: "lg:col-start-1 lg:row-start-3", x: 16.7, y: 83.3 },
];

function SchemaDiagram({
  fact,
  dimensions,
  selection,
  onSelect,
}: {
  fact: SchemaTable;
  dimensions: SchemaTable[];
  selection: Selection;
  onSelect: (s: Selection) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dims = dimensions.slice(0, SLOTS.length);

  return (
    <div className="relative grid gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:gap-x-10 lg:gap-y-8">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {dims.map((d, i) => {
          const active = hovered === d.name || selection?.title === d.name;
          return (
            <line
              key={d.name}
              x1={50}
              y1={50}
              x2={SLOTS[i].x}
              y2={SLOTS[i].y}
              stroke={active ? "#22d3ee" : "rgba(148,163,184,0.35)"}
              strokeWidth={active ? 2 : 1.25}
              vectorEffect="non-scaling-stroke"
              className="dash-flow"
            />
          );
        })}
      </svg>

      <div className="relative lg:col-start-2 lg:row-start-2 lg:self-center">
        <TableCard
          table={fact}
          kind="fact"
          selected={selection?.title === fact.name}
          onClick={() =>
            onSelect({
              title: fact.name,
              detail: `Fact table holding foreign keys to ${dims.length} dimensions and the additive measures (${fact.columns
                .filter((c) => !c.endsWith("Key"))
                .join(", ")}). One row per declared grain.`,
            })
          }
        />
      </div>

      {dims.map((dim, i) => (
        <div
          key={dim.name}
          className={cn("relative lg:self-center", SLOTS[i].cls)}
          onMouseEnter={() => setHovered(dim.name)}
          onMouseLeave={() => setHovered(null)}
        >
          <TableCard
            table={dim}
            kind="dimension"
            selected={selection?.title === dim.name}
            onClick={() =>
              onSelect({
                title: dim.name,
                detail: dim.children?.length
                  ? `Normalised dimension: ${dim.name} → ${dim.children.map((c) => c.name).join(" → ")}. Each level of the hierarchy is its own table, joined by keys.`
                  : `Denormalised dimension with surrogate key ${dim.columns[0]} and descriptive attributes (${dim.columns
                      .slice(1)
                      .join(", ")}) used for filtering and grouping.`,
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

function TableCard({
  table,
  kind,
  selected,
  onClick,
}: {
  table: SchemaTable;
  kind: "fact" | "dimension";
  selected: boolean;
  onClick: () => void;
}) {
  const isFact = kind === "fact";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-2xl border bg-surface/95 p-4 text-left transition-shadow",
        isFact ? "border-yellow-400/40 shadow-xl shadow-yellow-500/10" : "border-cyan-400/20",
        selected && "ring-2 ring-cyan-400/70",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <Table2 className={cn("h-4 w-4", isFact ? "text-yellow-300" : "text-cyan-300")} />
          <span className="font-mono text-sm font-semibold text-white">{table.name}</span>
        </span>
        <span
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
            isFact ? "bg-yellow-400/15 text-yellow-200" : "bg-cyan-400/10 text-cyan-200",
          )}
        >
          {isFact ? "fact" : "dim"}
        </span>
      </span>
      <ColumnList columns={table.columns} />
      {table.children?.map((child) => (
        <span key={child.name} className="mt-3 block rounded-xl border border-dashed border-violet-400/30 bg-violet-400/[0.05] p-3">
          <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-violet-200">
            <CornerDownRight className="h-3.5 w-3.5" />
            {child.name}
          </span>
          <ColumnList columns={child.columns} compact />
        </span>
      ))}
    </motion.button>
  );
}

function ColumnList({ columns, compact = false }: { columns: string[]; compact?: boolean }) {
  return (
    <span className={cn("block space-y-0.5", compact ? "mt-1.5" : "mt-3")}>
      {columns.map((col) => {
        const isKey = col.endsWith("Key");
        return (
          <span key={col} className="flex items-center gap-1.5 font-mono text-[11px]">
            {isKey ? (
              <KeyRound className="h-3 w-3 shrink-0 text-amber-300" />
            ) : (
              <span className="h-3 w-3 shrink-0" aria-hidden="true" />
            )}
            <span className={isKey ? "text-amber-100" : "text-slate-400"}>{col}</span>
          </span>
        );
      })}
    </span>
  );
}
