"use client";

import React from "react";

import MorphingText from "@/components/ui/morphing-text";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { Timeline } from "@/components/ui/timeline";
import { StarsBackground } from "@/components/ui/stars-background";
import Link from "next/link";


export default function ExperienceSection(){

    const texts = [
        "Experience",
        "Changelog of my journey",
    ];

    const data = [
        {
            title: "Feb 2025 - Present",
            content: (
                <div className="mb-4 transition-transform hover:scale-[1.025] hover:shadow-xl z-20">
                    <div className="flex flex-col items-start justify-start mb-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block w-2 h-6 rounded bg-gradient-to-b from-purple-500 to-blue-500 mr-2"></span>
                            <p className="text-lg font-bold text-white drop-shadow-sm">Full Stack Developer</p>
                        </div>
                        <Link href="https://softles.in" target="_blank" className="cursor-pointer transition-all duration-500 hover:underline underline-offset-2 z-20 mb-2 text-xs font-semibold md:text-sm text-blue-400">SoftLes</Link>
                    </div>
                    <ul className="list-disc list-inside text-xs font-normal md:text-sm text-neutral-200 space-y-2 pl-2">
                        <li>Developed and deployed front-end and full-stack platforms with secure authentication, handling role-based controls using Next.js, React.js and Node.js.</li>
                        <li>Owned integration of third-party services and APIs, navigating documentation gaps and solving real-world implementation challenges.</li>
                        <li>Designed scalable backend logic with robust access control, modular content management, and secure storage of user data and media.</li>
                        <li>Collaborated informally with other developers on debugging, feature testing, and architectural reviews to improve quality across related projects.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Feb 2024 - Feb 2025",
            content: (
                <div className="mb-4 transition-transform hover:scale-[1.025] hover:shadow-xl z-20">
                    <div className="flex flex-col items-start justify-start mb-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block w-2 h-6 rounded bg-gradient-to-b from-purple-500 to-blue-500 mr-2"></span>
                            <p className="text-lg font-bold text-white drop-shadow-sm">Front End Developer</p>
                        </div>
                        <Link href="https://softles.in" target="_blank" className="cursor-pointer transition-all duration-500 hover:underline underline-offset-2 z-20 mb-2 text-xs font-semibold md:text-sm text-blue-400">SoftLes</Link>
                    </div>
                    <ul className="list-disc list-inside text-xs font-normal md:text-sm text-neutral-200 space-y-2 pl-2">
                        <li>Contributed to the development of cutting-edge web applications using modern frontend technologies such as React.js, ensuring high performance and user satisfaction</li>
                        <li>Delivered production features and enhancements across multiple product cycles, supporting both end-user experience and internal workflows.</li>
                        <li>Actively participated in code reviews, testing, and iterative development processes to maintain quality and reliability at scale.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Aug 2023 - Feb 2024",
            content: (
                <div className="mb-4 transition-transform hover:scale-[1.025] hover:shadow-xl z-20">
                    <div className="flex flex-col items-start justify-start mb-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block w-2 h-6 rounded bg-gradient-to-b from-purple-500 to-blue-500 mr-2"></span>
                            <p className="text-lg font-bold text-white drop-shadow-sm">Front End Developer Intern</p>
                        </div>
                        <Link href="https://softles.in" target="_blank" className="cursor-pointer transition-all duration-500 hover:underline underline-offset-2 z-20 mb-2 text-xs font-semibold md:text-sm text-blue-400">SoftLes</Link>
                    </div>
                    <ul className="list-disc list-inside text-xs font-normal md:text-sm text-neutral-200 space-y-2 pl-2">
                        <li>Acquired proficiency in React.js through hands-on training, practical exercises and acquired valuable experience in version control systems like Git.</li>
                        <li>Developed a strong foundation in front-end web development principles and best practices, including responsive design and cross-browser compatibility.</li>
                        <li>Actively engaged in learning sessions and workshops to expand knowledge in software development methodologies and tools.</li>
                    </ul>
                </div>
            ),
        },
    ];

    return(
        <div id='experience' className="min-h-[40rem] rounded-md pb-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <MorphingText texts={texts} />
            <Timeline data={data} />
            <ShootingStars/>
            <StarsBackground/>
        </div>
    )
}