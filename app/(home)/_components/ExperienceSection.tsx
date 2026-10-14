"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { ROLES, type Role } from "../_data/experience";

const ease = [0.22, 1, 0.36, 1] as const;

/** Small inline company mark + name + domain, styled to sit quietly under the role title. */
function Company({ r }: { r: Role }) {
  const domain = r.companyUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a
      href={r.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group/c inline-flex items-center gap-2.5 text-foreground/80 transition-colors hover:text-primary"
    >
      <span className="grid h-6 w-6 place-items-center rounded-md border border-primary/30 bg-primary/10 font-mono text-[11px] font-bold text-primary">
        {r.company[0]}
      </span>
      <span className="text-base font-semibold">{r.company}</span>
      <span className="font-mono text-xs text-muted-foreground">· {domain}</span>
      <IconArrowUpRight
        size={14}
        className="text-muted-foreground opacity-0 transition-all group-hover/c:-translate-y-0.5 group-hover/c:translate-x-0.5 group-hover/c:text-primary group-hover/c:opacity-100"
      />
    </a>
  );
}

function Stack({ r, className = "" }: { r: Role; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {r.tags.map((t) => (
        <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary/90">
          {t}
        </span>
      ))}
    </div>
  );
}

/* ─── One role = one full-width chapter with a parallax version number ─── */

function Highlights({ r }: { r: Role }) {
  return (
    <div>
      {r.highlights.map((h, k) => (
        <motion.p
          key={h}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + k * 0.1, duration: 0.45 }}
          className="border-b border-white/[0.06] py-3 text-foreground/80"
        >
          {h}
        </motion.p>
      ))}
      <Stack r={r} className="mt-5" />
    </div>
  );
}

// Slow, soft ease for the hover reveal
const reveal = [0.65, 0, 0.35, 1] as const;

const revealList = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
};

// Each line wipes in from the left while coming into focus
const revealLine = {
  hidden: { opacity: 0, x: -12, filter: "blur(6px)", clipPath: "inset(0 100% 0 0)", transition: { duration: 0.3, ease: reveal } },
  show: { opacity: 1, x: 0, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)", transition: { duration: 0.75, ease: reveal } },
};

const revealTags = {
  hidden: { opacity: 0, y: 8, scale: 0.9, transition: { duration: 0.2 } },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

/** Highlights for an earlier role, revealed on hover. */
function RevealHighlights({ r }: { r: Role }) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0, transition: { duration: 0.45, ease: reveal, delay: 0.15 } }}
      transition={{ duration: 0.7, ease: reveal }}
      className="overflow-hidden md:self-center"
    >
      <motion.div variants={revealList} initial="hidden" animate="show" exit="hidden">
        {r.highlights.map((h) => (
          <motion.p key={h} variants={revealLine} className="border-b border-white/[0.06] py-3 text-foreground/80">
            {h}
          </motion.p>
        ))}
        <motion.div variants={revealTags}>
          <Stack r={r} className="mt-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** The current role is shown in full; earlier roles stay compact and reveal their highlights on hover. */
function Chapter({ r }: { r: Role }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const compact = !r.isCurrent;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small grace period so brushing past the edge doesn't flicker it shut
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  return (
    <div
      ref={ref}
      {...(compact && {
        tabIndex: 0,
        "aria-expanded": open,
        // Opens on hover (mouse) or focus (keyboard); touch screens have no hover, so a tap toggles instead
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        onClick: () => {
          if (!window.matchMedia("(hover: hover)").matches) setOpen((o) => !o);
        },
      })}
      className={cn(
        "relative overflow-hidden border-t border-white/[0.08] py-8 md:py-12",
        compact && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      )}
    >
      {compact && (
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: open ? 1 : 0 }}
          transition={{ duration: 0.9, ease: reveal }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-primary via-orange-400 to-transparent"
        />
      )}
      <motion.span
        style={{ y }}
        className={cn(
          "pointer-events-none absolute -right-4 top-0 select-none font-mono font-black leading-none transition-colors duration-700",
          open ? "text-primary/[0.12]" : "text-white/[0.04]",
          compact ? "text-[6rem] md:text-[9rem]" : "text-[10rem] md:text-[16rem]"
        )}
      >
        {r.version}
      </motion.span>
      <div className="relative grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
        <div>
          <p className="font-mono text-sm text-primary">{r.period}</p>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className={cn(
              "mt-3 font-black leading-[0.95] tracking-tight text-foreground",
              compact ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
            )}
          >
            {r.role}
          </motion.h3>
          <div className="mt-4">
            <Company r={r} />
          </div>
        </div>

        {!compact && <Highlights r={r} />}
        {compact && (
          <AnimatePresence initial={false}>{open && <RevealHighlights key="reveal" r={r} />}</AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-wrapper section-darker relative">
      <div className="section-container relative z-10">
        <SectionHeading
          index="04"
          label="experience"
          title="Changelog"
          subtitle="From intern to full stack developer: every release of my career so far."
        />
        <div>
          {ROLES.map((r) => (
            <Chapter key={r.version} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
