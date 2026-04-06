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
        <div className="section-dark relative flex min-h-screen w-full min-w-0 flex-col items-center justify-center overflow-hidden pt-10 antialiased">
            <div className="absolute inset-0 grid-mesh z-0 pointer-events-none opacity-70" />
            <LazyStarsBackground className="z-[1]" />
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-[5]"
                fill="hsl(172, 62%, 58%)"
            />

            {/* Radial glows — teal / violet / rose */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,800px)] h-[min(90vw,800px)] bg-gradient-to-br from-teal-500/[0.14] via-transparent to-violet-500/[0.1] rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute top-1/4 right-[12%] w-[min(70vw,560px)] h-[min(70vw,560px)] bg-gradient-to-br from-rose-500/[0.09] via-fuchsia-500/[0.06] to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-20 mx-auto flex w-full min-w-0 max-w-7xl flex-col-reverse items-center justify-between gap-12 px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:flex-row lg:px-10 xl:px-12 motion-safe:will-change-transform">
                <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
                            Welcome to my portfolio
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="text-4xl lg:text-5xl xl:text-7xl font-black text-foreground leading-[1.05] tracking-tight"
                    >
                        Hi, I&apos;m{" "}
                        <span className="gradient-text-animated">
                            SHAHAD
                        </span>
                        <br />
                        <span className="gradient-text-animated">
                            HASSAN
                        </span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="text-2xl md:text-4xl lg:text-4xl tracking-tight text-center lg:text-left mb-8 mt-4 font-bold"
                    >
                        <span className="text-muted-foreground">a </span>
                        <ContainerTextFlip words={FLIP_WORDS} />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                    >
                        Full Stack Developer crafting beautiful, scalable web experiences. Specializing in React, Next.js, Node.js, and modern web technologies to build products that matter.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                    >
                        <a
                            href="#projects"
                            className="btn-gradient group"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-y-1">
                                <path d="M5 12l5-5 5 5" />
                            </svg>
                            View My Works
                        </a>

                        <a
                            href="#contact-me"
                            className="btn-ghost-outline group hover:scale-[1.02] motion-reduce:hover:scale-100"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block">
                                <circle cx="9" cy="9" r="7" />
                                <path d="M9 5v4l2 2" />
                            </svg>
                            Get In Touch
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
                        <div className="animate-float relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/25 via-violet-500/20 to-rose-500/15 blur-3xl motion-reduce:blur-2xl" />
                            <div
                                className="relative rounded-full p-[3px] glow-ring"
                                style={{
                                    background:
                                        "linear-gradient(135deg, hsl(var(--color-1)) 0%, hsl(var(--color-2)) 45%, hsl(var(--color-3)) 100%)",
                                }}
                            >
                                <div className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden ">
                                    <Image
                                        src="/profile-pic1.png"
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
            <LazyShootingStars
                className="z-[4] pointer-events-none"
                starColor="#a78bfa"
                trailColor="#2dd4bf"
            />
        </div>
    );
}
