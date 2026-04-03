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
import { IconDeviceLaptop, IconDatabase, IconTools, IconCloud as Cloud } from '@tabler/icons-react';

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import IconCloud from "@/components/ui/icon-cloud";

const MORPHING_TEXTS = ["My Skills", "How can I help you?"];

const ICON_SLUGS = [
  "typescript", "tailwindcss", "bootstrap", "javascript", "react", "html5", "css3",
  "nodedotjs", "express", "nextdotjs", "prisma", "firebase", "vercel", "docker",
  "git", "github", "gitlab", "visualstudiocode", "mongodb", "mongoose", "sass",
  "figma", "postman", "netlify"
];

const SKILL_ICON_MAP: Record<string, { icon: JSX.Element; color: string }> = {
  "JavaScript": { icon: <SiJavascript />, color: "#f7df1e" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178c6" },
  "React JS": { icon: <SiReact />, color: "#61dafb" },
  "Next JS": { icon: <SiNextdotjs />, color: "#ffffff" },
  "Nest JS": { icon: <SiNestjs />, color: "#e0234e" },
  "HTML": { icon: <SiHtml5 />, color: "#e34c26" },
  "CSS": { icon: <SiCss3 />, color: "#1572b6" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#38bdf8" },
  "Bootstrap": { icon: <SiBootstrap />, color: "#7952b3" },
  "Sass": { icon: <SiSass />, color: "#cc6699" },
  "Shopify": { icon: <SiShopify />, color: "#96bf48" },
  "Node JS": { icon: <SiNodedotjs />, color: "#339933" },
  "Mongoose": { icon: <SiMongoose />, color: "#880000" },
  "Express JS": { icon: <SiExpress />, color: "#ffffff" },
  "Mongo DB": { icon: <SiMongodb />, color: "#47a248" },
  "Prisma": { icon: <SiPrisma />, color: "#5a67d8" },
  "Firebase": { icon: <SiFirebase />, color: "#ffca28" },
  "Vercel": { icon: <SiVercel />, color: "#ffffff" },
  "Docker": { icon: <SiDocker />, color: "#2496ed" },
  "Git": { icon: <SiGit />, color: "#f05032" },
  "Github": { icon: <SiGithub />, color: "#ffffff" },
  "Gitlab": { icon: <SiGitlab />, color: "#fc6d26" },
  "VS Code": { icon: <VscVscode />, color: "#007acc" },
  "Figma": { icon: <SiFigma />, color: "#f24e1e" },
  "Postman": { icon: <SiPostman />, color: "#ff6c37" },
  "Netlify": { icon: <SiNetlify />, color: "#00C7B7" },
  "RazorPay": { icon: <SiRazorpay />, color: "#3395FF" }
};

const CATEGORY_COLORS = [
  { border: "border-l-indigo-500/60", iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400" },
  { border: "border-l-violet-500/60", iconBg: "bg-violet-500/10", iconColor: "text-violet-400" },
  { border: "border-l-cyan-500/60", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
  { border: "border-l-amber-500/60", iconBg: "bg-amber-500/10", iconColor: "text-amber-400" },
];

const SKILL_CATEGORIES = [
  {
    icon: <IconDeviceLaptop size={28} />,
    title: "Frontend Development",
    skills: ["JavaScript", "TypeScript", "React JS", "Next JS", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Sass"]
  },
  {
    icon: <IconDatabase size={28} />,
    title: "Backend Development",
    skills: ["Nest JS", "Node JS", "Express JS", "Mongoose", "Mongo DB", "Prisma", "Firebase", "Shopify"]
  },
  {
    icon: <IconTools size={28} />,
    title: "Tools & Technologies",
    skills: ["Figma", "VS Code", "Postman", "Docker", "Git", "Github", "RazorPay"]
  },
  {
    icon: <Cloud size={28} />,
    title: "Cloud & Deployment",
    skills: ["Vercel", "Netlify"]
  }
];

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  colorIndex: number;
}

const SkillCard = ({ icon, title, skills, colorIndex }: SkillCardProps): JSX.Element => {
  const colors = CATEGORY_COLORS[colorIndex];
  return (
    <div className={`glass-card rounded-2xl p-6 flex flex-col gap-4 min-w-[280px] border-l-2 ${colors.border}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors.iconBg}`}>
          <span className={`text-2xl ${colors.iconColor}`}>{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 px-3 py-1.5 rounded-full text-sm font-medium border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
          >
            {SKILL_ICON_MAP[skill] && (
              <span className="text-lg" style={{ color: SKILL_ICON_MAP[skill].color }}>
                {SKILL_ICON_MAP[skill].icon}
              </span>
            )}
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function SkillsSection(): JSX.Element {
  return (
    <div id="skills" className="min-h-[40rem] rounded-md pb-40 section-deepest flex flex-col items-center justify-center gap-10 relative w-full px-4 md:px-6 lg:px-8 xl:px-24">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full flex flex-col items-center"
      >
        <MorphingText texts={MORPHING_TEXTS} />
      </motion.div>

      <div className="flex flex-col items-center justify-center lg:justify-around w-full">
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative flex max-w-md items-center justify-center overflow-hidden"
        >
          <IconCloud iconSlugs={ICON_SLUGS} />
        </motion.div>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 w-full mt-8">
            {SKILL_CATEGORIES.map((category, index) => (
              <SkillCard
                key={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
                colorIndex={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <StarsBackground />
      <ShootingStars />
    </div>
  );
}
