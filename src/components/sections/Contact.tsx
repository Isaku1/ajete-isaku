import { ArrowUpRight, Clock, Globe2, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function Contact() {
  const primaryHref = profile.email ? `mailto:${profile.email}` : profile.socials.linkedin;
  const primaryLabel = profile.email ? "Email me" : "Message me on LinkedIn";

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[480px] w-[900px] max-w-[160vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-500/15 blur-[130px]"
      />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">09 — Contact</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s build data platforms <span className="text-gradient">people trust</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Recruiters and hiring managers — I&apos;m looking for a team where I can ship reliable data products on Azure,
            Microsoft Fabric and Databricks, and grow towards data architecture. I&apos;d love to hear about the problems
            your data team is solving.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={primaryHref}
              target={profile.email ? undefined : "_blank"}
              rel={profile.email ? undefined : "noopener noreferrer"}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
            >
              {primaryLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {profile.email && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            )}
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability.status}
            </span>
            <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">Target roles</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {profile.availability.roles.map((r) => (
                <li key={r} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <span className="flex items-center gap-2 text-sm font-medium text-white">
              <Globe2 className="h-4 w-4 text-cyan-300" /> Work setup
            </span>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {profile.availability.modes.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <span className="flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4 text-violet-300" /> Logistics
            </span>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" /> {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-slate-500" /> {profile.timezone}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" /> {profile.availability.responseTime}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
