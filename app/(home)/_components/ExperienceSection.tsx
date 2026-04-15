"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconCode, IconBriefcase, IconSchool, IconArrowUpRight } from "@tabler/icons-react";

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Timeline } from "@/components/ui/timeline";
import { StarsBackground } from "@/components/ui/stars-background";

/* ─── Data ─── */

const texts = ["Experience", "Changelog of my journey"];

const ROLES = [
  {
    title: "Feb 2025 - Present",
    role: "Full Stack Developer",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    icon: <IconBriefcase size={16} />,
    color: "rose" as const,
    isCurrent: true,
    order: "01",
    highlights: [
      "Built front-end & full-stack platforms with secure auth and role-based controls",
      "Integrated third-party services/APIs, solving real-world implementation challenges",
      "Designed scalable backend with modular content management & secure storage",
      "Collaborated on debugging, testing, and architectural reviews across projects",
    ],
  },
  {
    title: "Feb 2024 - Feb 2025",
    role: "Front End Developer",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    icon: <IconCode size={16} />,
    color: "violet" as const,
    isCurrent: false,
    order: "02",
    highlights: [
      "Developed web applications using React.js with high performance standards",
      "Delivered production features across multiple product cycles",
      "Participated in code reviews and iterative development at scale",
    ],
  },
  {
    title: "Aug 2023 - Feb 2024",
    role: "Front End Developer Intern",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    icon: <IconSchool size={16} />,
    color: "teal" as const,
    isCurrent: false,
    order: "03",
    highlights: [
      "Built proficiency in React.js through hands-on training & practical exercises",
      "Developed foundation in responsive design & cross-browser compatibility",
      "Engaged in learning sessions on development methodologies and tools",
    ],
  },
];

/* ─── Color tokens ─── */

const C = {
  teal: {
    chipBg: "bg-teal-500/10 border-teal-500/20 hover:border-teal-400/50 hover:bg-teal-500/15",
    chipText: "text-teal-300",
    roleGradient: "from-teal-200 to-cyan-200",
    glowColor: "45,212,191",
    watermark: "from-teal-400/[0.06] to-transparent",
    hlAccent: "bg-teal-400",
    divider: "rgba(45,212,191,0.25)",
    iconBg: "bg-teal-500/10 border border-teal-500/20",
    iconText: "text-teal-300",
    companyText: "text-teal-300/70 hover:text-teal-300",
  },
  violet: {
    chipBg: "bg-violet-500/10 border-violet-500/20 hover:border-violet-400/50 hover:bg-violet-500/15",
    chipText: "text-violet-300",
    roleGradient: "from-violet-200 to-purple-200",
    glowColor: "167,139,250",
    watermark: "from-violet-400/[0.06] to-transparent",
    hlAccent: "bg-violet-400",
    divider: "rgba(167,139,250,0.25)",
    iconBg: "bg-violet-500/10 border border-violet-500/20",
    iconText: "text-violet-300",
    companyText: "text-violet-300/70 hover:text-violet-300",
  },
  rose: {
    chipBg: "bg-rose-500/10 border-rose-500/20 hover:border-rose-400/50 hover:bg-rose-500/15",
    chipText: "text-rose-300",
    roleGradient: "from-rose-200 to-pink-200",
    glowColor: "244,114,182",
    watermark: "from-rose-400/[0.06] to-transparent",
    hlAccent: "bg-rose-400",
    divider: "rgba(244,114,182,0.25)",
    iconBg: "bg-rose-500/10 border border-rose-500/20",
    iconText: "text-rose-300",
    companyText: "text-rose-300/70 hover:text-rose-300",
  },
};

/* ─── Card ─── */

function ExperienceCard({
  role,
  company,
  companyUrl,
  icon,
  color,
  isCurrent,
  order,
  highlights,
}: (typeof ROLES)[number]) {
  const c = C[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card rounded-2xl md:rounded-3xl relative overflow-hidden z-20"
    >

      {/* Ambient glow orb */}
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `rgba(${c.glowColor}, 0.06)` }}
      />

      {/* Large order watermark */}
      <span className={`absolute -bottom-6 -right-3 text-[8rem] md:text-[10rem] font-black leading-none select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-t ${c.watermark}`}>
        {order}
      </span>

      {/* ── Header panel (full-bleed, own color zone) ── */}
      <div className="relative px-5 md:px-7 pt-5 md:pt-6 pb-5 overflow-hidden">
        {/* Header background wash */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, rgba(${c.glowColor}, 0.09) 0%, rgba(${c.glowColor}, 0.03) 50%, transparent 100%)` }}
        />
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: `linear-gradient(to bottom, rgba(${c.glowColor}, 0.75) 0%, rgba(${c.glowColor}, 0.15) 100%)` }}
        />

        {/* Row 1: icon + current badge */}
        <div className="relative flex items-center justify-between gap-3 mb-3.5">
          <div
            className={`h-10 w-10 rounded-xl border ${c.iconBg} flex items-center justify-center transition-all duration-300`}
          >
            <span className={c.iconText}>{icon}</span>
          </div>

          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Current
            </span>
          )}
        </div>

        {/* Row 2: role title */}
        <h4
          className={`relative text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${c.roleGradient} leading-tight`}
        >
          {role}
        </h4>

        {/* Row 3: company link */}
        <Link
          href={companyUrl}
          target="_blank"
          className={`relative inline-flex items-center gap-1 text-base font-semibold tracking-wide ${c.companyText} transition-colors duration-200 group/link`}
        >
          <span className="opacity-80">@</span>
          <span className="group-hover/link:underline underline-offset-2">{company}</span>
          <IconArrowUpRight size={10} className="opacity-0 group-hover/link:opacity-60 transition-opacity duration-200" />
        </Link>
      </div>

      {/* Separator */}
      <div
        className="mx-0 h-px opacity-20"
        style={{ background: `linear-gradient(to right, rgba(${c.glowColor}, 1) 0%, rgba(${c.glowColor}, 0.1) 60%, transparent 100%)` }}
      />

      {/* ── Highlights ── */}
      <div className="relative px-5 md:px-7 py-4 md:py-5 space-y-2.5">
        {highlights.map((item, i) => (
          <div key={i} className="flex gap-2.5 items-start">
            <span className={`flex-shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full ${c.hlAccent} opacity-70`} />
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              {item}
            </p>
          </div>
        ))}

      </div>
    </motion.div>
  );
}

/* ─── Wire up ─── */

const timelineData = ROLES.map((r) => ({
  title: r.title,
  content: <ExperienceCard {...r} />,
}));

/* ─── Section ─── */

export default function ExperienceSection() {
  return (
    <div
      id="experience"
      className="section-wrapper section-darker relative"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/[0.07] via-transparent to-teal-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container flex flex-col items-center gap-8 md:gap-10 relative z-10">
        <MorphingText texts={texts} />
        <Timeline data={timelineData} />
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
