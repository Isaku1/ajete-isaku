import { Award, CalendarClock, CheckCircle2, ExternalLink, Info, Loader, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, type CertStatus } from "@/data/certifications";
import { cn } from "@/lib/utils";

const statusStyles: Record<CertStatus, { className: string; Icon: LucideIcon }> = {
  Earned: { className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300", Icon: CheckCircle2 },
  "In Progress": { className: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300", Icon: Loader },
  Planned: { className: "border-white/10 bg-white/5 text-slate-300", Icon: CalendarClock },
};

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-x">
        <SectionHeader
          eyebrow="06 — Certifications"
          title={
            <>
              Certified, and <span className="text-gradient">still building</span>.
            </>
          }
          description="Databricks-certified today, with a clear roadmap across Microsoft Azure, Fabric and Power BI."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const status = statusStyles[cert.status];
            return (
              <Reveal key={cert.name} delay={(i % 3) * 0.07} className="glass glass-hover flex flex-col rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      cert.issuer === "Microsoft" ? "bg-blue-500/15 text-blue-300" : cert.issuer === "Databricks" ? "bg-orange-500/15 text-orange-300" : "bg-emerald-500/15 text-emerald-300",
                    )}
                  >
                    <Award className="h-5 w-5" />
                  </span>
                  <span className={cn("flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", status.className)}>
                    <status.Icon className="h-3.5 w-3.5" />
                    {cert.status}
                  </span>
                </div>
                <p className="mt-5 font-mono text-xs text-slate-500">
                  {cert.issuer} · {cert.code}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-white">{cert.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{cert.description}</p>
                {cert.note && (
                  <p className="mt-3 flex gap-2 rounded-lg bg-white/[0.03] p-2.5 text-xs leading-relaxed text-slate-400">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                    {cert.note}
                  </p>
                )}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <li key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
                  <span className="text-slate-500">{cert.status === "Earned" ? (cert.credentialUrl ? "Verified credential" : "Listed on LinkedIn") : `Target: ${cert.target ?? "TBD"}`}</span>
                  <a
                    href={cert.credentialUrl ?? cert.examUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    {cert.credentialUrl ? "Verify" : cert.status === "Earned" ? "View" : "Exam details"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
