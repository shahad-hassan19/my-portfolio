"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiSass,
  SiNodedotjs, SiMongoose, SiExpress, SiMongodb, SiPrisma, SiFirebase, SiVercel, SiDocker, SiGit, SiGithub, SiGitlab,
  SiFigma, SiPostman, SiNetlify, SiShopify, SiRazorpay,
  SiNestjs
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import IconCloud from "@/components/ui/icon-cloud";
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal";

const MORPHING_TEXTS = ["My Skills", "How can I help you?"];

const ICON_SLUGS = [
  "typescript", "tailwindcss", "bootstrap", "javascript", "react", "html5", "css3",
  "nodedotjs", "express", "nextdotjs", "prisma", "firebase", "vercel", "docker",
  "git", "github", "gitlab", "visualstudiocode", "mongodb", "mongoose", "sass",
  "figma", "postman", "netlify"
];

interface SkillItem {
  name: string;
  icon: JSX.Element;
  color: string;
}

const CATEGORIES: { title: string; color: string; glowColor: string; skills: SkillItem[] }[] = [
  {
    title: "Frontend",
    color: "from-teal-400 to-cyan-400",
    glowColor: "rgba(45,212,191,0.4)",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "React", icon: <SiReact />, color: "#61dafb" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
      { name: "Shopify", icon: <SiShopify />, color: "#96bf48" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34c26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#38bdf8" },
      { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952b3" },
      { name: "Sass", icon: <SiSass />, color: "#cc6699" },
    ],
  },
  {
    title: "Backend",
    color: "from-violet-400 to-purple-400",
    glowColor: "rgba(167,139,250,0.4)",
    skills: [
      { name: "NestJS", icon: <SiNestjs />, color: "#e0234e" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "Mongoose", icon: <SiMongoose />, color: "#880000" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8" },
      { name: "Firebase", icon: <SiFirebase />, color: "#ffca28" },
    ],
  },
  {
    title: "Tools & Cloud",
    color: "from-rose-400 to-amber-400",
    glowColor: "rgba(244,114,182,0.4)",
    skills: [
      { name: "Figma", icon: <SiFigma />, color: "#f24e1e" },
      { name: "VS Code", icon: <VscVscode />, color: "#007acc" },
      { name: "Postman", icon: <SiPostman />, color: "#ff6c37" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ed" },
      { name: "Git", icon: <SiGit />, color: "#f05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "GitLab", icon: <SiGitlab />, color: "#fc6d26" },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
      { name: "Netlify", icon: <SiNetlify />, color: "#00C7B7" },
      { name: "Razorpay", icon: <SiRazorpay />, color: "#3395FF" },
    ],
  },
];

function SkillTile({ skill }: { skill: SkillItem }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      className="group relative flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-2xl
        bg-white/[0.03] border border-white/[0.06]
        hover:bg-white/[0.08] hover:border-white/[0.15]
        transition-all duration-300 cursor-default"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${skill.color}15, transparent 70%)`,
          boxShadow: `0 0 30px ${skill.color}12, inset 0 0 20px ${skill.color}06`,
        }}
      />
      <span
        className="text-2xl md:text-3xl relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
        style={{
          color: skill.color,
          filter: `drop-shadow(0 0 8px ${skill.color}40)`,
        }}
      >
        {skill.icon}
      </span>
      <span className="text-[10px] md:text-xs font-semibold text-foreground/60 group-hover:text-foreground/90 transition-colors relative z-10 text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

function CategoryBlock({ title, color, skills }: { title: string; color: string; skills: SkillItem[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-0.5 w-6 rounded-full bg-gradient-to-r ${color}`} />
        <h3 className={`text-sm font-bold tracking-widest uppercase bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {title}
        </h3>
        <div className={`h-0.5 flex-1 rounded-full bg-gradient-to-r ${color} opacity-10`} />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
        {skills.map((skill) => (
          <SkillTile key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection(): JSX.Element {
  const scrollContent = CATEGORIES.map((cat) => ({
    title: cat.title,
    content: (
      <CategoryBlock title={cat.title} color={cat.color} skills={cat.skills} />
    ),
  }));

  return (
    <div id="skills" className="section-wrapper section-deepest relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-teal-500/[0.06] via-violet-500/[0.04] to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full mb-12 md:mb-16"
        >
          <MorphingText texts={MORPHING_TEXTS} />
        </motion.div>

        {/* Mobile: IconCloud on top + categories stacked */}
        <div className="lg:hidden flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative max-w-[300px]">
              <IconCloud iconSlugs={ICON_SLUGS} />
            </div>
          </motion.div>
          <div className="flex flex-col gap-8">
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <CategoryBlock title={cat.title} color={cat.color} skills={cat.skills} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Sticky scroll reveal */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <StickyScrollReveal
            stickyContent={
              <div className="relative flex items-center justify-center w-full max-w-[380px]">
                <IconCloud iconSlugs={ICON_SLUGS} />
              </div>
            }
            scrollContent={scrollContent}
          />
        </div>
      </div>

      <StarsBackground />
      <ShootingStars />
    </div>
  );
}
