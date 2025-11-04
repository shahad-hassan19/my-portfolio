"use client";

import React from "react";
import dynamic from "next/dynamic";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from "framer-motion";

import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

// Constants
const CODE_SNIPPET = `
const profile = {
    name: 'Shahad Hassan',
    title: 'Full Stack Developer',
    contact: {
        phone: '+91-6398223144',
        email: 'shahadg1983@gmail.com',
        github: 'github.com/shahad-hassan19'
    },
    skills: [
        'NextJS', 'TypeScript', 'JavaScript', 'React',
        'NodeJS', 'ExpressJS', 'Mongoose', 'TailwindCSS',
        'Figma', 'Postman', 'Prisma', 'Firebase',
        'Vercel', 'Docker', 'GitHub', 'Git', 'MongoDB',
        'Bootstrap', 'HTML5', 'CSS3', 'Sass'
    ],
    hireable: function () {
        return this.skills.length > 10
            && this.experience
    }
}
`;

const FLIP_WORDS = ["Full Stack Developer", "Frontend Developer"];

const SYNTAX_HIGHLIGHTER_STYLE = {
    background: 'transparent',
    fontSize: 15,
    padding: '12px 16px',
    borderRadius: '1rem',
    fontFamily: 'ui-monospace,SFMono-Regular,Consolas,monospace',
};

const LazySyntaxHighlighter = dynamic(
    () => import('react-syntax-highlighter').then((m) => m.Prism),
    {
        ssr: false,
        loading: () => (
            <pre style={SYNTAX_HIGHLIGHTER_STYLE} className="overflow-x-auto text-[15px] leading-relaxed font-mono bg-transparent">
                {CODE_SNIPPET.trim()}
            </pre>
        ),
    }
);

const LazyStarsBackground = dynamic(
    () => import("@/components/ui/stars-background").then((m) => m.StarsBackground),
    { ssr: false }
);

const LazyShootingStars = dynamic(
    () => import("@/components/ui/shooting-stars").then((m) => m.ShootingStars),
    { ssr: false }
);

export default function HeroSection(): JSX.Element {
    return (
        <div className="min-h-[40rem] pt-10 pb-40 w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            {/* Animated stars background */}
            <LazyStarsBackground />
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-10"
                fill="white"
            />

            <div className="flex flex-col lg:flex-row items-center justify-between w-full py-16 px-6 gap-12 relative z-20 sm:px-4 md:px-6 lg:px-8 xl:px-24">
                <div className="flex flex-col items-center md:items-start w-full lg:w-1/2 max-w-xl">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-3.25xl lg:text-4xl xl:text-4.5xl opacity-90 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                        style={{ textShadow: '0 2px 24px rgba(255,255,255,0.15)' }}
                    >
                        Hi, I&apos;m <span className="text-[#2AA9D2] whitespace-pre font-sans text-2xl md:text-4xl tracking-tight">SHAHAD HASSAN</span>
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="text-2xl md:text-4xl tracking-tight text-center  mb-6"
                        style={{ wordBreak: 'break-word', overflow: 'hidden' }}
                    >
                        <span className="font-bold">a</span>
                        <ContainerTextFlip words={FLIP_WORDS} />
                    </motion.h1>

                    <p className="text-xl opacity-80 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-3">
                        Full Stack Developer with experience building scalable, user-focused web applications.
                        With a strong CS background and a design-first mindset, I specialize in JavaScript/TypeScript,
                        React.js, Next.js, Node.js, MongoDB, and Prisma.<br/>
                        I enjoy working in Agile teams, solving real-world problems, and constantly refining code quality and system design.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 opacity-90 font-bold mt-2">
                        <Button
                            asChild
                            aria-label="View my projects"
                            variant="outline"
                            className="transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:border-gradient-to-r hover:from-blue-400 hover:to-purple-500"
                        >
                            <a href="#projects" className="inline-flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                                    <path d="M5 12l5-5 5 5" />
                                </svg>
                                <span>View My Works</span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            aria-label="Contact me"
                            variant="ghost"
                            className="transition-all duration-1000 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                        >
                            <a href="#contact-me" className="inline-flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                                    <circle cx="10" cy="10" r="8" />
                                    <path d="M10 6v4l2 2" />
                                </svg>
                                <span>Contact Me</span>
                            </a>
                        </Button>
                    </div>
                </div>

                <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="relative flex items-center justify-center w-full lg:w-1/2 max-w-xl"
                >
                    <div
                        className="bg-[#0d1117]/80 overflow-hidden shadow-2xl backdrop-blur-md border-2 border-transparent bg-clip-padding p-1 w-full"
                        style={{
                        borderImage: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%) 1',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        }}
                    >
                        <div className="flex items-center gap-2 p-2 bg-[#161b22]/80">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-white">shahadProfile.ts</span>
                        </div>

                        <LazySyntaxHighlighter
                            language="javascript"
                            style={dracula}
                            customStyle={SYNTAX_HIGHLIGHTER_STYLE}
                            className="overflow-x-auto text-[15px] leading-relaxed font-mono bg-transparent"
                        >
                            {CODE_SNIPPET.trim()}
                        </LazySyntaxHighlighter>
                    </div>
                </motion.div>
            </div>
            <LazyShootingStars />
        </div>
    );
}