"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

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
]

const ABOUT_DESCRIPTION = `I'm a passionate Full Stack Developer with hands-on experience in building robust, scalable, and user-centric web applications. With a strong foundation in Computer Science and a keen eye for design and usability, I specialize in JavaScript/TypeScript-based ecosystems, including React.js, Next.js, and Node.js, with practical expertise in MongoDB, Prisma, and REST APIs. I've developed and deployed scalable frontends and secure backends, collaborating with teams on debugging, architectural reviews, and delivering seamless user experiences. I thrive in Agile environments, love tackling implementation challenges, and continuously push myself to improve code quality, system design, and user experience.`;

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    board: string;
}

export default function AboutSection(): JSX.Element {
    return (
        <div id="about-me" className="min-h-[40rem] rounded-md pb-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
            >
                <MorphingText texts={MORPHING_TEXTS} />
            </motion.div>

            <div className="mt-10 w-full grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
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

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Education Card */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="flex-1 h-full min-h-[300px] bg-gradient-to-br from-yellow-50/10 via-yellow-100/5 to-neutral-900/80 border border-yellow-400/30 rounded-md p-3 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start justify-center lg:justify-start w-full md:min-w-[260px] mx-auto"
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

                    {/* Certificates Card */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                        className="flex-1 h-full min-h-[300px] bg-gradient-to-br from-neutral-50/10 via-neutral-100/5 to-neutral-900/80 border border-purple-400/30 rounded-md p-3 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start justify-center lg:justify-start min-w-[260px] mx-auto z-30"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-2xl font-bold text-purple-400 tracking-wide inline-flex items-center gap-1">
                            <Award className="text-purple-400" /> Certificates
                            </h3>
                        </div>
                        <div className="space-y-4 w-full">
                            {CERTIFICATES_DATA.map((cert, idx) => (
                            <div key={idx}>
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-base hover:underline text-blue-300 hover-offset-2 hover:text-blue-200 transition-all duration-1000"
                                >
                                    {cert.name}
                                </a>
                                <p className="text-sm">
                                    <span className="text-yellow-300">{cert.issuedBy}</span> <span className="text-neutral-400">/ {cert.issuedOn}</span>
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