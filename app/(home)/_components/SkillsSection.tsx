"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiSass,
  SiNodedotjs, SiMongoose, SiExpress, SiMongodb, SiPrisma, SiFirebase, SiVercel, SiDocker, SiGit, SiGithub, SiGitlab,
  SiFigma, SiPostman, SiNetlify
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { IconDeviceLaptop, IconDatabase, IconTools, IconCloud as Cloud } from '@tabler/icons-react';

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import IconCloud from "@/components/ui/icon-cloud";

// Constants
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
  "Next JS": { icon: <SiNextdotjs />, color: "#000000" },
  "HTML": { icon: <SiHtml5 />, color: "#e34c26" },
  "CSS": { icon: <SiCss3 />, color: "#1572b6" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#38bdf8" },
  "Bootstrap": { icon: <SiBootstrap />, color: "#7952b3" },
  "Sass": { icon: <SiSass />, color: "#cc6699" },
  "Node JS": { icon: <SiNodedotjs />, color: "#339933" },
  "Mongoose": { icon: <SiMongoose />, color: "#880000" },
  "Express JS": { icon: <SiExpress />, color: "#000000" },
  "Mongo DB": { icon: <SiMongodb />, color: "#47a248" },
  "Prisma": { icon: <SiPrisma />, color: "#2d3748" },
  "Firebase": { icon: <SiFirebase />, color: "#ffca28" },
  "Vercel": { icon: <SiVercel />, color: "#000000" },
  "Docker": { icon: <SiDocker />, color: "#2496ed" },
  "Git": { icon: <SiGit />, color: "#f05032" },
  "Github": { icon: <SiGithub />, color: "#181717" },
  "Gitlab": { icon: <SiGitlab />, color: "#fc6d26" },
  "VS Code": { icon: <VscVscode />, color: "#007acc" },
  "Figma": { icon: <SiFigma />, color: "#f24e1e" },
  "Postman": { icon: <SiPostman />, color: "#ff6c37" },
  "Netlify": { icon: <SiNetlify />, color: "#00C7B7" },
};

const SKILL_CATEGORIES = [
  {
    icon: <IconDeviceLaptop size={32} />,
    title: "Frontend Development",
    skills: ["JavaScript", "TypeScript", "React JS", "Next JS", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Sass"]
  },
  {
    icon: <IconDatabase size={32} />,
    title: "Backend Development",
    skills: ["Node JS", "Express JS", "Mongoose", "Mongo DB", "Prisma", "Firebase"]
  },
  {
    icon: <IconTools size={32} />,
    title: "Tools & Technologies",
    skills: ["Figma", "VS Code", "Postman", "Docker", "Git", "Github"]
  },
  {
    icon: <Cloud size={32} />,
    title: "Cloud & Deployment",
    skills: ["Vercel", "Netlify"]
  }
];

// Types
interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const SkillCard = ({ icon, title, skills }: SkillCardProps): JSX.Element => (
  <div className="rounded-xl p-6 flex flex-col gap-4 min-w-[280px] bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.10)]">
    <div className="flex items-center gap-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span
          key={skill}
          className="flex items-center gap-2 bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.10)] text-gray-200 px-3 py-1 rounded-full text-sm font-medium border border-[#23263A]"
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

export default function SkillsSection(): JSX.Element {
  return (
    <div id="skills" className="min-h-[40rem] rounded-md pb-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full px-4 md:px-6 lg:px-8 xl:px-24">
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
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8 w-full mt-8">
            {SKILL_CATEGORIES.map((category, index) => (
              <SkillCard
                key={index}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
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