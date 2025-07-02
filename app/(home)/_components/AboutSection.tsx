"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

// Constants
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

const ABOUT_DESCRIPTION = `I'm a passionate Full Stack Developer with hands-on experience in building robust, scalable, and user-centric web applications. With a strong foundation in Computer Science and a keen eye for design and usability, I specialize in JavaScript/TypeScript-based ecosystems, including React.js, Next.js, and Node.js, with practical expertise in MongoDB, Prisma, and REST APIs. At Softles, I evolved from an intern into a full-time engineer, contributing to critical features and third-party API integrations across real-world projects. I've developed and deployed scalable frontends and secure backends, collaborating with teams on debugging, architectural reviews, and delivering seamless user experiences. I thrive in Agile environments, love tackling implementation challenges, and continuously push myself to improve code quality, system design, and user experience. Let's connect if you're looking for a dependable full stack engineer who codes with purpose and delivers with precision.`;

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    board: string;
}

export default function AboutSection(): JSX.Element {
    return (
        <div id="about-me" className="min-h-[40rem] rounded-md pb-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
            >
                <MorphingText texts={MORPHING_TEXTS} />
            </motion.div>

            <div className="mt-10 w-full flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Intro Section */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex-1 px-3 flex flex-col justify-center"
                >
                    <h2 className="mb-4 text-2.6xl text-center lg:text-left">
                        Hi, I&apos;m <span className="font-bold">Shahad Hassan</span>
                    </h2>
                    <p className="mb-4 text-xl text-justify font-normal">
                        {ABOUT_DESCRIPTION}
                    </p>
                </motion.div>

                {/* Education Card */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    className="flex-1 max-h-min bg-gradient-to-br from-yellow-50/10 via-yellow-100/5 to-neutral-900/80 border border-yellow-400/30 rounded-md p-3 md:p-6 shadow-lg flex flex-col items-start justify-center lg:justify-start min-w-[260px] max-w-min mx-auto"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-2xl font-bold text-yellow-400 tracking-wide inline-flex items-center gap-1">
                        <GraduationCap /> Education
                        </h3>
                    </div>

                    <div className="space-y-4 w-full">
                        {EDUCATION_DATA.map((item: EducationItem, index: number) => (
                        <div key={index}>
                            <p className="font-semibold text-base text-white">{item.degree}</p>
                            <p className="text-sm text-neutral-200">
                            {item.institution} <span className="text-neutral-400">/ {item.period}</span>
                            </p>
                            <p className="text-xs text-yellow-300">{item.board}</p>
                        </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}