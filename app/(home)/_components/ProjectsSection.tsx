"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Lock } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { projects, techIconMap, host, type Project } from "../_data/projects";

const ALL = projects as readonly Project[];

function Tech({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {p.tech.map(({ label }) => {
        const Icon = techIconMap[label as keyof typeof techIconMap];
        return (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {Icon && <Icon size={12} className="text-primary/90" />}
            {label}
          </li>
        );
      })}
    </ul>
  );
}

function Shot({ p, sizes, className = "" }: { p: Project; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={p.image} alt={`Screenshot of ${p.title}`} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}

/** Window chrome on the laptop lid: traffic lights and an address bar showing the open project's URL. */
function AddressBar({ p }: { p: Project }) {
  return (
    <div className="flex items-center gap-3 px-1 pb-2.5 md:gap-5 md:px-2 md:pb-4">
      <span className="flex shrink-0 gap-1.5 md:gap-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57] md:h-3 md:w-3" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e] md:h-3 md:w-3" />
        <span className="h-2 w-2 rounded-full bg-[#28c840] md:h-3 md:w-3" />
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md border border-white/[0.06] bg-black/30 px-2.5 py-1 text-[11px] text-white/55 md:max-w-[75%] md:rounded-lg md:px-3.5 md:py-1.5 md:text-sm">
        <Lock size={13} className="shrink-0" />
        {/* The address rolls up when the project changes */}
        <span className="relative h-[1.4em] min-w-0 flex-1">
          <AnimatePresence initial={false}>
            <motion.span
              key={p.title}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 truncate"
            >
              {host(p.url)}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}

/** Laptop whose lid swings open when the section scrolls in; the screen shows the selected project. */
function Laptop({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref, { once: true, margin: "-15% 0px" });
  const p = ALL[active];

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl px-[6%] pb-4 [perspective:1600px] md:px-[7%]">
      <motion.div
        initial={{ rotateX: -88, opacity: 0.4 }}
        animate={open ? { rotateX: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom center" }}
        className="relative rounded-t-[14px] border border-b-0 border-white/[0.08] bg-card/80 p-[2.2%] pb-[2.2%] pt-[2%] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm md:rounded-t-[20px]"
      >
        {/* Glass body like the footer card: amber hairline along the top edge */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <AddressBar p={p} />
        <div className="overflow-hidden rounded-md border border-white/[0.06] md:rounded-lg">
          <div className="relative aspect-[16/10] bg-[#1c1917]">
            <AnimatePresence initial={false}>
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Shot p={p} sizes="(min-width: 768px) 720px, 90vw" className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {/* Keyboard deck with the thumb notch, plus its shadow on the floor */}
      <div className="relative -mx-[6%] h-3 rounded-b-2xl border border-white/[0.08] bg-card/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm md:-mx-[7%] md:h-4">
        <span className="mx-auto block h-1 w-[16%] rounded-b-md bg-white/10 md:h-1.5" />
      </div>
      <div className="mx-auto h-6 w-[90%] rounded-[50%] bg-black/50 blur-xl" />
    </div>
  );
}

/** Shows a demo store's password with a one-click copy, for projects that need one. */
function StorePassword({ password, className = "" }: { password: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the password is still visible to type in
    }
  };
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] py-1 pl-3 pr-1 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      <Lock size={12} className="text-primary" />
      Store password: <span className="text-foreground">{password}</span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy store password"
        className="grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-white/[0.06] hover:text-primary"
      >
        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
      </button>
    </div>
  );
}

function VisitLink({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group/v inline-flex items-center gap-1.5 font-mono text-sm text-primary", className)}
    >
      {host(p.url)}
      <ArrowUpRight size={15} className="transition-transform group-hover/v:-translate-y-0.5 group-hover/v:translate-x-0.5" />
    </a>
  );
}

export default function ProjectsSection(): JSX.Element {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((x) => (x + d + ALL.length) % ALL.length);
  const p = ALL[i];

  return (
    <section id="projects" className="section-wrapper section-dark relative">
      <div className="section-container relative z-20">
        <SectionHeading
          index="03"
          label="projects"
          title="Things I've built"
          subtitle="Production apps for real clients: LMS platforms, SaaS dashboards, headless storefronts and CMS-driven sites."
        />

        <Laptop active={i} />
        <div className="mt-6 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24, clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, y: -12, clipPath: "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="max-w-xl"
            >
              <h3 className="text-2xl font-black text-foreground md:text-3xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <Tech p={p} className="mt-4 justify-center" />
              <VisitLink p={p} className="mt-4" />
              {"password" in p && (
                <div>
                  <StorePassword password={p.password} className="mt-3" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex gap-2">
            {[
              { d: -1, Icon: ArrowLeft, l: "Previous" },
              { d: 1, Icon: ArrowRight, l: "Next" },
            ].map(({ d, Icon, l }) => (
              <button
                key={l}
                type="button"
                aria-label={l}
                onClick={() => go(d)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
