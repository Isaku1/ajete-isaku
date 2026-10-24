import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

type SocialLink = { label: string; href: string; Icon: ComponentType<{ className?: string }> };

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
  ];
  if (profile.email) links.push({ label: "Email", href: `mailto:${profile.email}`, Icon: Mail });
  return links;
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {getSocialLinks().map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
