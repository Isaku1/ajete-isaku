"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { easeOut } from "@/lib/utils";
import { PipelineConsole } from "./PipelineConsole";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: easeOut },
});

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[900px] max-w-[160vw] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[120px]"
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability.status}
          </motion.div>

          <motion.p {...fadeUp(0.05)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span className="font-medium text-slate-200">{profile.name}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span>{profile.role}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-5 font-display text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
          >
            {profile.headline.lead} <span className="text-gradient">{profile.headline.highlight}</span>{" "}
            {profile.headline.tail}
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {profile.subheadline}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
            >
              Explore case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            >
              Get in touch
            </a>
            <SocialLinks className="ml-1" />
          </motion.div>

          <motion.dl
            {...fadeUp(0.4)}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-base/90 p-4">
                <dt className="text-xs text-slate-400">{stat.label}</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
        >
          <PipelineConsole />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-white md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
