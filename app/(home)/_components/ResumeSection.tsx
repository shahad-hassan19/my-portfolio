"use client";

import React from "react";

import MorphingText from "@/components/ui/morphing-text";

import { ShootingStars } from "@/components/ui/shooting-stars";


export default function SkillsSection(){

    const texts = [
        "Resume",
        "A summary Of My Resume",
    ];

    return(
        <div id='resume' className="h-[40rem] rounded-md mt-40 pt-40 md:pt-0 bg-black flex flex-col items-center justify-center relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <MorphingText texts={texts} />

            <ShootingStars/>
        </div>
    )
}