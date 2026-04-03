"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { Spotlight } from "@/components/ui/Spotlight";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Image from "next/image";

const FLIP_WORDS = ["Full Stack Developer", "Web Developer"];

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
        <div className="min-h-screen pt-10 w-full rounded-md flex items-center justify-center section-dark antialiased relative overflow-hidden">
            <LazyStarsBackground />
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-10"
                fill="#8b5cf6"
            />

            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-8xl flex flex-col-reverse lg:flex-row items-center justify-between w-full py-16 px-6 gap-12 relative z-20 sm:px-4 md:px-6 lg:px-8 xl:px-24">
                <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <p className="text-sm font-medium tracking-widest uppercase text-indigo-400 mb-4">
                            Welcome to my portfolio
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 leading-tight"
                    >
                        Hi, I&apos;m{" "}
                        <span className="gradient-text-animated font-extrabold">
                            SHAHAD HASSAN
                        </span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="text-2xl md:text-4xl tracking-tight text-center lg:text-left mb-6 mt-2"
                        style={{ wordBreak: 'break-word', overflow: 'hidden' }}
                    >
                        <span className="font-bold text-white/80">a </span>
                        <ContainerTextFlip words={FLIP_WORDS} />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg text-neutral-300 leading-relaxed mb-6"
                    >
                        Full Stack Developer with experience building scalable, user-focused web applications.
                        With a strong CS background and a design-first mindset, I specialize in JavaScript/TypeScript,
                        React.js, Next.js, Node.js, MongoDB, and Prisma.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 mt-2"
                    >
                        <a
                            href="#projects"
                            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 transition-all duration-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block">
                                <path d="M5 12l5-5 5 5" />
                            </svg>
                            View My Works
                        </a>

                        <a
                            href="#contact-me"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:scale-[1.02]"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block">
                                <circle cx="9" cy="9" r="7" />
                                <path d="M9 5v4l2 2" />
                            </svg>
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="relative flex items-center justify-center lg:justify-end w-full lg:w-1/2 max-w-xl"
                >
                    <div className="w-full flex items-center justify-center lg:justify-end">
                        <div className="animate-float">
                            <div
                                className="relative rounded-full p-[3px] glow-ring"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                                }}
                            >
                                <div className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-[#030014]">
                                    <Image
                                        src="/profile-pic-1.png"
                                        alt="Shahad Hassan"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover rounded-full"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <LazyShootingStars />
        </div>
    );
}
