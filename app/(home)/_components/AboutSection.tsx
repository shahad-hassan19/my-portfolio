"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import { FACTS, HIGHLIGHTS, EDUCATION, CERTIFICATES } from "../_data/about";

/* ─── Data ─── */

const TABS = [
  { id: "education", file: "education.md", items: EDUCATION },
  { id: "certificates", file: "certificates.md", items: CERTIFICATES },
] as const;

/* ─── Animations ─── */

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

// Stat tiles flip down into place one after another
const flipIn = {
  hidden: { opacity: 0, rotateX: -90 },
  show: { opacity: 1, rotateX: 0, transition: { duration: 0.8, ease } },
};

/* ─── Pieces ─── */

function WindowBar({ title, children }: { title?: string; children?: React.ReactNode }) {
  // With tabs inside, the dots give way on phones so the tabs start at the left edge
  const dot = cn("h-2.5 w-2.5 rounded-full", children ? "hidden sm:block" : "");
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2.5 sm:px-4">
      <span className={cn(dot, "bg-red-400/70")} />
      <span className={cn(dot, "bg-amber-300/70")} />
      <span className={cn(dot, "bg-emerald-400/70")} />
      {title && <span className="ml-3 font-mono text-[11px] text-white/40">{title}</span>}
      {children}
    </div>
  );
}

function Journey() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("education");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
      <WindowBar>
        <div role="tablist" aria-label="Journey" className="flex gap-1 sm:ml-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors",
                tab === t.id ? "text-foreground" : "text-white/40 hover:text-white/70",
              )}
            >
              {tab === t.id && <motion.span layoutId="journey-tab" className="absolute inset-0 rounded-md bg-white/[0.07]" />}
              <span className="relative">{t.file}</span>
            </button>
          ))}
        </div>
      </WindowBar>

      <div className="flex-1 p-1.5 sm:p-2">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            // On desktop the card stretches to the bio card's height, so spread the rows evenly
            className="lg:flex lg:h-full lg:flex-col lg:justify-around"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {current.items.map((item) => {
              const url = "url" in item ? item.url : undefined;
              const Row = url ? "a" : "div";
              return (
                <li key={item.title}>
                  <Row
                    {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group flex items-start justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors",
                      url && "hover:bg-white/[0.04]",
                    )}
                  >
                    <div className="flex min-w-0 gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                          {item.title}
                          {url && (
                            <ArrowUpRight
                              size={13}
                              className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-70"
                            />
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
                        <p className="mt-1.5 font-mono text-[11px] text-primary/80 sm:hidden">{item.date}</p>
                      </div>
                    </div>
                    <span className="hidden shrink-0 font-mono text-[11px] text-primary/80 sm:block">{item.date}</span>
                  </Row>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Component ─── */

export default function AboutSection(): JSX.Element {
  return (
    <section id="about-me" className="section-wrapper section-darker relative">
      <div className="section-container relative z-10">
        <SectionHeading index="01" label="about" title="About me" />

        {/* ═══ Bio + stats ═══ */}
        {/* The in-view trigger lives on this unclipped grid: some mobile browsers never report a fully
            clipped element as visible, which would leave the bio card hidden forever. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <motion.div
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 16px)", y: 40 },
              show: { clipPath: "inset(0% 0% 0% 0% round 16px)", y: 0 },
            }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="glass-card overflow-hidden rounded-2xl lg:col-span-7"
          >
            <WindowBar title="~/about — zsh" />
            <div className="p-5 md:p-6">
              <p className="mb-3 font-mono text-xs text-white/40">
                <span className="text-primary">$</span> cat about.txt
              </p>
              <div className="space-y-3 text-sm md:text-base leading-relaxed text-foreground/80">
                <p>
                  Hey, I&apos;m <span className="font-semibold text-primary">Shahad</span>, a Full Stack Developer at SoftLes
                  who builds production web applications from the first screen to the last API call. I started on the front end in
                  2023, crafting responsive interfaces with React and Next.js, and grew into owning products end to end: the UI,
                  RESTful APIs, authentication and the database behind them.
                </p>
                <p className="text-muted-foreground">
                  Day to day I work with Next.js, TypeScript, Node.js and MongoDB, design schema-driven data models with Prisma and
                  Mongoose, and wire in the services real products need, from payment gateways and headless CMS to cloud media
                  storage and secure webhooks. I&apos;ve delivered features across multiple product cycles in remote, agile teams,
                  with code reviews and testing built into every release.
                </p>
                <p className="text-muted-foreground">
                  I care about secure, well-tested code, interfaces that feel fast and smooth, and shipping software that makes a
                  real difference for the people using it.
                </p>
              </div>

              <ul className="mt-5 grid gap-3 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
                {FACTS.map(({ Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-2.5">
                    <Icon size={15} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-white/35">{label}</p>
                      <p className="text-xs text-foreground/80">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 [perspective:900px]"
            >
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.label}
                  variants={flipIn}
                  style={{ transformOrigin: "top center" }}
                  className="glass-card flex min-w-0 flex-col rounded-2xl px-3 py-3.5 sm:px-4"
                >
                  <p className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                    {h.text ?? (
                      <>
                        <CountUp to={h.to ?? 0} />
                        <span className="text-primary">{h.suffix}</span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 break-words font-mono text-[9px] uppercase leading-snug tracking-normal text-muted-foreground sm:text-[10px] sm:tracking-wider">{h.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* ═══ Education & certificates ═══ */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="lg:flex-1"
            >
              <Journey />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
