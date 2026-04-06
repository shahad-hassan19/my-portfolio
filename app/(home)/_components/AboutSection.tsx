"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

/* ─── Data ─── */

const MORPHING_TEXTS = ["About me", "Know me More"];

const HIGHLIGHTS = [
  { value: "2+", label: "Years\nExperience" },
  { value: "10+", label: "Projects" },
  { value: "20+", label: "Technologies" },
  { value: "B.Tech", label: "Computer\nScience" },
];

const EDUCATION = [
  { degree: "Bachelor of Technology — CSE", place: "Vidya College of Engineering", year: "2020–2024", board: "AKTU" },
  { degree: "Intermediate", place: "D.S. Public School", year: "2019–2020", board: "CBSE" },
  { degree: "High School", place: "D.S. Public School", year: "2017–2018", board: "CBSE" },
];

const CERTIFICATES = [
  {
    name: "Career Essentials in Software Development",
    by: "Microsoft & LinkedIn",
    date: "Sep 2024",
    url: "https://www.linkedin.com/learning/certificates/87ac7bcb9bf1983da1dfeac9750aea03a2c62f818221e4db979e1cc687eb0a83",
  },
  {
    name: "Shopify Theme Development — OS 2.0 + Tailwind",
    by: "Udemy",
    date: "Apr 2025",
    url: "https://ude.my/UC-3f27538a-3e28-4c32-83b1-8392c494bf1c",
  },
  {
    name: "Career Edge — Young Professional",
    by: "TCS iON",
    date: "Aug 2023",
    url: "https://drive.google.com/file/d/1sZWe5N-8kmy3e1hfylFiE5quAMG8oPaj/view?usp=drivesdk",
  },
];

/* ─── Animations ─── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Component ─── */

export default function AboutSection(): JSX.Element {
  return (
    <div id="about-me" className="section-wrapper section-darker relative">
      {/* Ambient */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/[0.08] via-transparent to-violet-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full mb-12 md:mb-16"
        >
          <MorphingText texts={MORPHING_TEXTS} />
        </motion.div>

        {/* ═══ Intro ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            I&apos;m{" "}
            <span className="gradient-text-animated">Shahad Hassan</span>
          </h2>
          <p className="text-sm md:text-base text-white/45 leading-relaxed max-w-2xl mx-auto">
            A Full Stack Developer who builds scalable, user-centric web applications
            with React, Next.js &amp; Node.js — focused on clean code, great UX, and
            shipping products that make a difference.
          </p>
        </motion.div>

        {/* ═══ Highlight stats ═══ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
        >
          {HIGHLIGHTS.map((h) => (
            <motion.div
              key={h.label}
              variants={fadeUp}
              className="glass-card rounded-2xl p-4 md:p-5 text-center group"
            >
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-300 via-violet-300 to-rose-300 mb-1">
                {h.value}
              </p>
              <p className="text-[11px] md:text-xs text-white/30 uppercase tracking-wider font-medium leading-tight whitespace-pre-line">
                {h.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Education & Certificates ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <GraduationCap className="h-4.5 w-4.5 text-teal-300" />
              </div>
              <h3 className="text-base font-bold text-teal-200 tracking-wide">Education</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>

            {/* Timeline items */}
            <div className="relative ml-[18px]">
              {/* Vertical connector line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/30 via-teal-500/15 to-transparent" />

              <div className="space-y-3">
                {EDUCATION.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    className="relative pl-6 group/item"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-4 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-teal-500/40 bg-[hsl(230,35%,6%)] group-hover/item:border-teal-400 group-hover/item:shadow-[0_0_8px_rgba(45,212,191,0.4)] transition-all duration-300" />

                    {/* Card */}
                    <div className="glass-card rounded-2xl p-4 group-hover/item:border-teal-500/15 transition-all duration-300">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white/85 leading-snug">{item.degree}</p>
                          <p className="text-xs text-white/65 mt-1">{item.place}</p>
                        </div>
                        <span className="flex-shrink-0 text-[10px] font-mono text-teal-300/90 bg-teal-500/8 border border-teal-500/55 rounded-md px-2 py-0.5 mt-0.5">
                          {item.year}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-teal-400/30" />
                        <span className="text-[11px] text-white/85">{item.board}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Award className="h-4.5 w-4.5 text-violet-300" />
              </div>
              <h3 className="text-base font-bold text-violet-200 tracking-wide">Certificates</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
            </div>

            {/* Timeline items */}
            <div className="relative ml-[18px]">
              {/* Vertical connector line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/30 via-violet-500/15 to-transparent" />

              <div className="space-y-3">
                {CERTIFICATES.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    className="relative pl-6 group/item"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-4 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-violet-500/40 bg-[hsl(230,35%,6%)] group-hover/item:border-violet-400 group-hover/item:shadow-[0_0_8px_rgba(167,139,250,0.4)] transition-all duration-300" />

                    {/* Card */}
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block glass-card rounded-2xl p-4 group-hover/item:border-violet-500/15 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white/85 leading-snug group-hover/item:text-violet-200 transition-colors duration-200 min-w-0">
                          {cert.name}
                          <ExternalLink className="inline-block h-3 w-3 ml-1.5 -mt-0.5 opacity-0 group-hover/item:opacity-50 transition-opacity duration-200" />
                        </p>
                        <span className="flex-shrink-0 text-[10px] font-mono text-violet-300/90 bg-violet-500/8 border border-violet-500/55 rounded-md px-2 py-0.5 mt-0.5">
                          {cert.date}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-violet-400/60" />
                        <span className="text-[11px] text-white/80 font-medium">{cert.by}</span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
