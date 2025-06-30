"use client";

import React from "react";

import MorphingText from "@/components/ui/morphing-text";
import IconCloud from "@/components/ui/icon-cloud";

import { ShootingStars } from "@/components/ui/shooting-stars";


export default function SkillsSection(){

    const slugs = [
        "typescript",
        "tailwindcss",
        "bootstrap",
        "javascript",
        "react",
        "html5",
        "css3",
        "nodedotjs",
        "express",
        "nextdotjs",
        "prisma",
        "firebase",
        "vercel",
        "docker",
        "git",
        "github",
        "gitlab",
        "visualstudiocode",
        "mongodb",
        "mongoose",
        "sass",
        "figma",
        "postman",
    ];

    const texts = [
        "My Skills",
        "How can I help you?",
    ];

    return(
        <div id='skills' className="min-h-[40rem] rounded-md pt-40 bg-black flex flex-col items-center justify-center relative w-full px-4 md:px-6 lg:px-8 xl:px-24">
            <MorphingText texts={texts} />

            <div className="flex flex-col-reverse md:flex-row items-center justify-center lg:justify-around w-full">
                <div>
                    <p className="text-xl font-bold opacity-70">Here are few technologies that are cup of my tea :</p>
                    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-5 list-disc list-inside">
                        <li className="text-1.25xl font-semibold opacity-70">JavaScript</li>
                        <li className="text-1.25xl font-semibold opacity-70">TypeScript</li>
                        <li className="text-1.25xl font-semibold opacity-70">Next JS</li>
                        <li className="text-1.25xl font-semibold opacity-70">React JS</li>
                        <li className="text-1.25xl font-semibold opacity-70">Node JS</li>
                        <li className="text-1.25xl font-semibold opacity-70">Express JS</li>
                        <li className="text-1.25xl font-semibold opacity-70">Mongoose</li>
                        <li className="text-1.25xl font-semibold opacity-70">Mongo DB</li>
                        <li className="text-1.25xl font-semibold opacity-70">Firebase</li>
                        <li className="text-1.25xl font-semibold opacity-70">Postman</li>
                        <li className="text-1.25xl font-semibold opacity-70">Prisma</li>
                        <li className="text-1.25xl font-semibold opacity-70">Vercel</li>
                        <li className="text-1.25xl font-semibold opacity-70">Docker</li>
                        <li className="text-1.25xl font-semibold opacity-70">Figma</li>
                        <li className="text-1.25xl font-semibold opacity-70">VS Code</li>
                        <li className="text-1.25xl font-semibold opacity-70">HTML</li>
                        <li className="text-1.25xl font-semibold opacity-70">CSS</li>
                        <li className="text-1.25xl font-semibold opacity-70">Bootstrap</li>
                        <li className="text-1.25xl font-semibold opacity-70">Sass</li>
                        <li className="text-1.25xl font-semibold opacity-70">Tailwind CSS</li>
                    </ul>
                </div>
                <div className="relative flex p-10 max-w-lg items-center justify-center overflow-hidden">
                    <IconCloud iconSlugs={slugs} />
                </div>
            </div>
            <ShootingStars/>
        </div>
    )
}