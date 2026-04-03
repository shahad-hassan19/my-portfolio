"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const MORPHING_TEXTS = ["About me", "Know me More"];

const EDUCATION_DATA = [
    {
        degree: "Bachelor of Technology - CSE",
        institution: "Vidya College of Engineering",
        period: "2020-2024",
        board: "Abdul Kalam Technical University"
    },
    {
        degree: "Intermediate",
        institution: "D.S. Public School",
        period: "2019-2020",
        board: "CBSE Board"
    },
    {
        degree: "High-School",
        institution: "D.S. Public School",
        period: "2017-2018",
        board: "CBSE Board"
    }
];

const CERTIFICATES_DATA = [
    {
        name: "Career Essentials in Software Development by Microsoft and LinkedIn",
        issuedOn: "24 Sep 2024",
        issuedBy: "LinkedIn",
        url: "https://www.linkedin.com/learning/certificates/87ac7bcb9bf1983da1dfeac9750aea03a2c62f818221e4db979e1cc687eb0a83",
    },
    {
        name: "Shopify Theme Development - Online Store 2.0 + TailwindCSS",
        issuedOn: "25 Apr 2025",
        issuedBy: "Udemy",
        url: "https://ude.my/UC-3f27538a-3e28-4c32-83b1-8392c494bf1c",
    },
    {
        name: "Career Edge - Young Professional",
        issuedOn: "08 Aug 2023",
        issuedBy: "TCS - iON",
        url: "https://drive.google.com/file/d/1sZWe5N-8kmy3e1hfylFiE5quAMG8oPaj/view?usp=drivesdk",
    },
];

const ABOUT_DESCRIPTION = `I'm a passionate Full Stack Developer with hands-on experience in building robust, scalable, and user-centric web applications. With a strong foundation in Computer Science and a keen eye for design and usability, I specialize in JavaScript/TypeScript-based ecosystems, including React.js, Next.js, and Node.js, with practical expertise in MongoDB, Prisma, and REST APIs. I've developed and deployed scalable frontends and secure backends, collaborating with teams on debugging, architectural reviews, and delivering seamless user experiences. I thrive in Agile environments, love tackling implementation challenges, and continuously push myself to improve code quality, system design, and user experience.`;

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    board: string;
}

export default function AboutSection(): JSX.Element {
    return (
        <div id="about-me" className="min-h-[40rem] rounded-md pb-40 section-darker flex flex-col items-center justify-center gap-10 relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-24">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
            >
                <MorphingText texts={MORPHING_TEXTS} />
            </motion.div>

            <div className="mt-10 w-full grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex-1 px-3 flex flex-col justify-center"
                >
                    <h2 className="mb-4 text-2xl md:text-3xl text-center lg:text-left">
                        Hi, I&apos;m <span className="font-bold gradient-text-animated">Shahad Hassan</span>
                    </h2>
                    <p className="mb-4 text-lg text-neutral-300 text-justify font-normal leading-relaxed">
                        {ABOUT_DESCRIPTION}
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Education Card */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="flex-1 h-full min-h-[300px] glass-card p-4 md:p-6 flex flex-col items-start justify-center lg:justify-start w-full md:min-w-[260px] mx-auto border-l-2 border-l-indigo-500/50"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-indigo-500/10">
                                <GraduationCap className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-400 tracking-wide">
                                Education
                            </h3>
                        </div>
                        <div className="space-y-4 w-full">
                            {EDUCATION_DATA.map((item: EducationItem, index: number) => (
                            <div key={index} className="pl-3 border-l border-white/[0.06]">
                                <p className="font-semibold text-base text-white">{item.degree}</p>
                                <p className="text-sm text-neutral-300">
                                    {item.institution} <span className="text-neutral-500">/ {item.period}</span>
                                </p>
                                <p className="text-xs text-indigo-300/70">{item.board}</p>
                            </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certificates Card */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                        className="flex-1 h-full min-h-[300px] glass-card p-4 md:p-6 flex flex-col items-start justify-center lg:justify-start min-w-[260px] mx-auto z-30 border-l-2 border-l-violet-500/50"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-violet-500/10">
                                <Award className="text-violet-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-violet-400 tracking-wide">
                                Certificates
                            </h3>
                        </div>
                        <div className="space-y-4 w-full">
                            {CERTIFICATES_DATA.map((cert, idx) => (
                            <div key={idx} className="pl-3 border-l border-white/[0.06]">
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-base hover:underline text-cyan-300 underline-offset-2 hover:text-cyan-200 transition-all duration-300"
                                >
                                    {cert.name}
                                </a>
                                <p className="text-sm">
                                    <span className="text-amber-400/80">{cert.issuedBy}</span>{" "}
                                    <span className="text-neutral-500">/ {cert.issuedOn}</span>
                                </p>
                            </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}
