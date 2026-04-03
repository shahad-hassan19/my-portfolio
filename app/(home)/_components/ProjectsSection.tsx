"use client";

import React from "react";
import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandMongodb,
  IconDatabase,
  IconBrandReact,
  IconBrandNodejs,
  IconApi,
  IconChartBar,
  IconBrandPrisma,
  IconExternalLink,
} from "@tabler/icons-react";
import { SiRazorpay, SiShopify } from "react-icons/si";

const projects = [
  {
    title: "ArtTech LMS",
    description: "Online platform for course delivery, student management, and interactive learning.",
    image: "/ArtTechImage.png",
    url: "https://online.arttechbsp.com/",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "MongoDB" },
      { label: "Prisma" },
      { label: "Razorpay" },
    ],
  },
  {
    title: "RecoBee Cinelytics",
    description: "Real-time analytics and feedback for optimizing movie releases and marketing.",
    image: "/RecoBee_Cinelytics.png",
    url: "https://www.recobee.ai/",
    tech: [
      { label: "ReactJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Behavioral Training ERP System",
    description: "Integrated solution for appointment scheduling, insurance claim tracking, and staff payment management.",
    image: "/Promethean.png",
    url: "https://bts-gamma.vercel.app",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Brunswick Fur Food – Headless Shopify Storefront",
    description: "Headless e-commerce storefront built using Next.js and Shopify Storefront API.",
    image: "/BFF.png",
    url: "https://web.brunswickfurfood.com",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "MongoDB" },
      { label: "Shopify" },
    ],
  },
] as const;

const techIconMap = {
  NextJS: IconBrandNextjs,
  TypeScript: IconBrandTypescript,
  "Tailwind CSS": IconBrandTailwind,
  TailwindCSS: IconBrandTailwind,
  MongoDB: IconBrandMongodb,
  Prisma: IconBrandPrisma,
  ReactJS: IconBrandReact,
  NodeJS: IconBrandNodejs,
  Mongoose: IconDatabase,
  ChartJS: IconChartBar,
  "API Integration": IconApi,
  Razorpay: SiRazorpay,
  Shopify: SiShopify,
};

export default function ProjectsSection() {
  const texts = ["Projects", "Check out my work"];

  return (
    <div id="projects" className="min-h-[40rem] rounded-md pb-40 section-dark flex flex-col items-center justify-center gap-10 relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
      {/* Ambient glow */}
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full mb-10 md:mb-0"
      >
        <MorphingText texts={texts} />
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-20 px-2 md:px-0">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + idx * 0.1 }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open project: ${project.title}`}
              className="group block h-full"
            >
              <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]">
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-3">
                    <IconExternalLink size={20} className="text-white/80" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-auto flex-wrap">
                    {project.tech.map((tech, i) => {
                      const Icon = techIconMap[tech.label as keyof typeof techIconMap];
                      return Icon ? (
                        <span
                          key={i}
                          className="flex group/tech items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-neutral-300 hover:bg-white/[0.08] hover:border-indigo-500/20 transition-all duration-300"
                        >
                          <Icon size={14} />
                          <span className="max-w-0 group-hover/tech:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap">
                            {tech.label}
                          </span>
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-neutral-300"
                        >
                          {tech.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
