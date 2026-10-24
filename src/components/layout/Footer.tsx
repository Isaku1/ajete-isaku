import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-base">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-slate-400">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{profile.mission}</p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="text-slate-400 transition hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Case studies</p>
          <ul className="mt-4 space-y-2 text-sm">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-slate-400 transition hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
