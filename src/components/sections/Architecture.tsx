import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureExplorer } from "./ArchitectureExplorer";

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-violet-600/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="04 — Data architecture"
          title={
            <>
              The patterns behind <span className="text-gradient">reliable platforms</span>.
            </>
          }
          description="Ten reference architectures I design and build with — explore each diagram interactively to see how data moves, where responsibilities sit, and when each pattern fits."
        />
        <ArchitectureExplorer />
      </div>
    </section>
  );
}
