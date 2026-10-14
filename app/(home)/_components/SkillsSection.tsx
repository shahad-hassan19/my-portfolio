"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { CATEGORIES, SERVICES, ALL_SKILLS } from "../_data/skills";

const ease = [0.22, 1, 0.36, 1] as const;
const GROUPS = CATEGORIES.map((cat, i) => ({ ...cat, service: SERVICES[i] }));

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduce;
}

export default function SkillsSection(): JSX.Element {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((x) => (x + 1) % ALL_SKILLS.length), 1400);
    return () => clearInterval(id);
  }, [reduce]);
  const s = ALL_SKILLS[i];

  return (
    <section id="skills" className="section-wrapper section-deepest relative">
      <div className="section-container relative z-10">
        <SectionHeading
          index="02"
          label="skills"
          title="My toolbox"
          subtitle="The languages, frameworks and tools I use every day to design, build and ship web products."
          align="center"
        />

        <div className="flex flex-col items-center text-center">
          <motion.p
            aria-label="I build with"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.04 }}
            className="flex overflow-hidden text-2xl font-black tracking-tight text-foreground md:text-5xl"
          >
            {"I build with".split("").map((ch, k) => (
              <motion.span
                key={k}
                aria-hidden
                variants={{ hidden: { y: "110%", rotate: 8 }, show: { y: "0%", rotate: 0 } }}
                transition={{ duration: 0.7, ease }}
                className="inline-block whitespace-pre"
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>
          <div className="relative mt-3 h-[1.3em] w-full overflow-hidden text-3xl font-black tracking-tight md:text-6xl">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={s.name}
                initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex items-center justify-center gap-4"
                style={{ color: s.color === "#ffffff" ? "hsl(var(--primary))" : s.color }}
              >
                <span>{s.icon}</span>
                {s.name}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-4 font-mono text-sm text-muted-foreground">{s.category}</p>
        </div>

        {/* All tools; the current one lights up */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {ALL_SKILLS.map((x, j) => (
            <motion.span
              key={x.name}
              initial={{ opacity: 0, scale: 0.3, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: 0.3 + Math.abs(j - (ALL_SKILLS.length - 1) / 2) * 0.035,
              }}
              className="inline-flex"
            >
              <button
                type="button"
                onClick={() => setI(j)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-300",
                  j === i
                    ? "scale-110 border-primary bg-primary/15 text-foreground"
                    : "border-white/[0.08] text-muted-foreground hover:text-foreground",
                )}
              >
                <span style={{ color: x.color }}>{x.icon}</span>
                {x.name}
              </button>
            </motion.span>
          ))}
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {GROUPS.map((g, k) => (
            <motion.p
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.2 + k * 0.15 }}
              className="text-center text-sm text-muted-foreground"
            >
              <span className="font-semibold text-foreground">{g.service.title}.</span> {g.service.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
