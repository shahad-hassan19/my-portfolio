"use client";

import React from "react";
import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@tabler/icons-react";

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
    title: "Next Music App",
    description: "Landing page project for learning Next.js and UI design.",
    image: "/NextMusic.png",
    url: "https://music-nextjs-sh.vercel.app/",
    tech: [
      { label: "NextJS" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "InsightLens",
    description: "Personal dashboard for data visualization and analytics practice.",
    image: "/InsightLens.png",
    url: "https://insight-lens.vercel.app/",
    tech: [
      { label: "ReactJS" },
      { label: "NodeJS" },
      { label: "Mongoose" },
      { label: "MongoDB" },
      { label: "Tailwind CSS" },
      { label: "ChartJS" },
    ],
  },
  {
    title: "Portfolio Website",
    description: "My developer portfolio showcasing projects, skills, and experience.",
    image: "/Portfolio-img.png",
    url: "https://shahad-hassan.vercel.app/",
    tech: [
      { label: "ReactJS" },
      { label: "TailwindCSS" },
    ],
  },
  {
    title: "CoinQuotient",
    description: "Real-time cryptocurrency converter for quick currency conversions and copying results.",
    image: "/CoinQuotient.png",
    url: "https://currency-converter-sable-ten.vercel.app/",
    tech: [
      { label: "ReactJS" },
      { label: "Tailwind CSS" },
      { label: "API Integration" },
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
};

export default function ProjectsSection(){
    const texts = [
        "Projects",
        "Check out my work",
    ];

    return(
        <div id='projects' className="min-h-[40rem] rounded-md pb-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full mb-10 md:mb-0"
            >
                <MorphingText texts={texts} />
            </motion.div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-20 px-2 md:px-0">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: idx < 3 ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + idx * 0.15 }}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open project: ${project.title}`}
                  >
                    <Card
                      className="group bg-transparent shadow-lg rounded-md flex flex-col h-full transition-all duration-300 border-[1px] border-neutral-800 hover:shadow-2xl cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/9] rounded-t-md overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`Screenshot of ${project.title}`}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="flex flex-col flex-1 transition-all duration-1000 p-3">
                        <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                          {project.title}
                        </h3>
                        <p className="text-base text-neutral-300 mb-4 flex-1 max-h-min">{project.description}</p>
                        <div className="flex gap-2 mt-auto">
                          {project.tech.map((tech, i) => {
                            const Icon = techIconMap[tech.label as keyof typeof techIconMap];
                            return Icon ? (
                              <span
                                key={i}
                                className="flex group/tech items-center p-1 -mr-4 hover:z-50 rounded-full text-xs font-semibold bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.10)] text-white relative"
                              >
                                <Icon size={18} />
                                <span
                                  className="max-w-0 group-hover/tech:max-w-xs px-0 group-hover/tech:px-1 overflow-hidden transition-all duration-1000 whitespace-nowrap inline-block"
                                >
                                  {tech.label}
                                </span>
                              </span>
                            ) : (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-md text-xs inline-block font-semibold bg-[#222] text-white"
                              >
                                {tech.label}
                              </span>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    )
}