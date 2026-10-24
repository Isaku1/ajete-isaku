import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl md:mb-16", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>}
    </Reveal>
  );
}
