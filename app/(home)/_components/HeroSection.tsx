"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { TechMarquee } from "@/components/ui/tech-marquee";

const FLIP_WORDS = ["Full Stack Developer", "Next.js Engineer", "API Builder", "UI Craftsman"];
const SOCIALS = [
  { Icon: Github, href: "https://github.com/shahad-hassan19", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/shahad-hassan-82287a220",
    label: "LinkedIn",
  },
  { Icon: Mail, href: "mailto:shahadg1983@gmail.com", label: "Email" },
];
const STATS = [
  { value: "2+", label: "years shipping" },
  { value: "10+", label: "live projects" },
  { value: "20+", label: "technologies" },
];
const INTRO =
  "I build fast, scalable web apps end to end, from pixel-perfect React interfaces to secure APIs and databases. Clean code, smooth UX, shipped to production.";
const PHOTO = "/shahad-arms-crossed.png";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

function Ctas({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a href="#projects" className="btn-gradient group">
        View my work <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </a>
      <a href="#contact-me" className="btn-ghost-outline">
        <Mail size={18} /> Let&apos;s talk
      </a>
    </div>
  );
}

function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {SOCIALS.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-white"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

function Stats({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <dl className={cn(vertical ? "flex flex-col gap-6" : "grid grid-cols-3 gap-6", className)}>
      {STATS.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-2xl font-black text-foreground md:text-3xl">{s.value}</dd>
          <dd className="font-mono text-[10px] uppercase tracking-wider text-white/40 md:text-[11px]">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Photo({ className = "", glow = true, priority = false }: { className?: string; glow?: boolean; priority?: boolean }) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div className="absolute inset-x-[10%] top-[10%] bottom-[25%] rounded-full bg-gradient-to-b from-amber-500/40 via-orange-500/15 to-transparent blur-3xl" />
      )}
      <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <Image
          src={PHOTO}
          alt="Shahad Hassan"
          fill
          sizes="(min-width: 1024px) 480px, 80vw"
          className="object-contain object-bottom"
          priority={priority}
        />
      </div>
    </div>
  );
}

function Whoami({ className = "" }: { className?: string }) {
  return (
    <p className={cn("font-mono text-sm text-white/45", className)}>
      <span className="text-primary">~</span>
      <span className="text-orange-300"> $</span> whoami
      <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-primary/80" />
    </p>
  );
}

function Strip() {
  return (
    <div className="relative z-20 border-y border-white/[0.06] bg-white/[0.015] py-5 backdrop-blur-sm">
      <TechMarquee />
    </div>
  );
}

// The hero is exactly one screen tall; the photo takes whatever height is left.
// Exactly one screen from tablets up; on phones it grows to fit the text plus the photo below it
const SCREEN = "relative flex min-h-[100svh] w-full flex-col overflow-hidden md:h-[100svh] md:min-h-[640px]";
const BIG = "font-black uppercase leading-[0.85] tracking-tighter";
const OUTLINE = "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)]";

/* ─── Section: text on the left, you on the right with the big words around ─── */

export default function HeroSection({ background }: { background?: React.ReactNode } = {}): JSX.Element {
  return (
    <section className={SCREEN}>
      {/* Optional animated layer behind the whole section */}
      {background && <div className="pointer-events-none absolute inset-0 z-0">{background}</div>}
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 gap-2 px-4 pt-24 sm:px-6 md:grid-cols-[1fr_1.05fr] md:gap-4 md:px-8 lg:px-12">
        <div className="flex flex-col justify-center pb-6">
          <motion.div {...rise(0)}>
            <Whoami />
          </motion.div>
          <motion.h1 {...rise(0.1)} className="mt-3 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
            Shahad <br className="hidden md:block" />
            <span className="gradient-text-animated">Hassan</span>
          </motion.h1>
          <motion.div {...rise(0.2)} className="mt-4 text-xl font-bold sm:text-2xl">
            <ContainerTextFlip words={FLIP_WORDS} />
          </motion.div>
          <motion.p {...rise(0.3)} className="mt-4 max-w-lg text-muted-foreground">
            {INTRO}
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-7 flex flex-wrap items-center gap-4">
            <Ctas />
            <Socials />
          </motion.div>
          <motion.div {...rise(0.5)} className="mt-8 hidden max-w-md border-t border-white/[0.08] pt-5 lg:block">
            <Stats />
          </motion.div>
        </div>

        <div className="relative h-[58svh] max-h-[560px] min-h-[380px] [container-type:size] md:h-auto md:max-h-none md:min-h-0">
          {/* Never taller than the photo needs, so on tall narrow screens the words stay hugging it */}
          <div className="absolute inset-x-0 top-1/2 h-[min(100cqh,calc(100cqw*1.32))] -translate-y-1/2">
            <motion.p
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              // One line in the empty space above the head, so the body never hides it
              className={cn(
                BIG,
                OUTLINE,
                "absolute inset-x-0 top-0 whitespace-nowrap text-center text-[2.85rem] sm:text-[4rem] md:text-[3rem] lg:text-[4.75rem] xl:text-[5.75rem]",
              )}
            >
              Full Stack
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: 0.45 }}
              className={cn(
                BIG,
                "absolute bottom-[6%] left-0 z-20 text-[3.5rem] text-primary drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:text-[4.5rem] md:text-[3.6rem] lg:text-[5.25rem] xl:text-[6rem]",
              )}
            >
              Developer
            </motion.p>
            <motion.div {...rise(0.2)} className="absolute inset-x-[8%] bottom-0 top-[4%] z-10">
              <Photo className="h-full w-full" glow={false} priority />
            </motion.div>
          </div>
        </div>
      </div>
      <Strip />
    </section>
  );
}
