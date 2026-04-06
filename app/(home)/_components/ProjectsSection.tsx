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
    <div id="projects" className="section-wrapper section-dark relative">
      {/* Enhanced ambient glow */}
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/[0.07] via-transparent to-teal-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full mb-16"
        >
          <MorphingText texts={texts} />
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 z-20">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + idx * 0.1 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open project: ${project.title}`}
                className="group block h-full"
              >
                <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-500">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Enhanced gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-4">
                      <div className="flex flex-col items-end gap-2">
                        <IconExternalLink size={24} className="text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <p className="text-xs font-medium text-white/70">View Project</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-auto flex-wrap">
                      {project.tech.map((tech, i) => {
                        const Icon = techIconMap[tech.label as keyof typeof techIconMap];
                        return Icon ? (
                          <span
                            key={i}
                            className="flex group/tech items-center p-1 -mr-4 hover:z-50 rounded-full text-xs font-medium bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.10)] border border-white/[0.08] text-muted-foreground hover:bg-white/[0.1] hover:border-primary/35 transition-all duration-300"
                          >
                            <Icon size={15} className="text-primary/90" />
                            <span className="max-w-0 group-hover/tech:max-w-xs px-0 group-hover/tech:px-1 overflow-hidden transition-all duration-1000 whitespace-nowrap">
                              {tech.label}
                            </span>
                          </span>
                        ) : (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-muted-foreground hover:border-primary/25"
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
      </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
