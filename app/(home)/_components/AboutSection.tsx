"use client";

import React from "react";
import MorphingText from "@/components/ui/morphing-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";


export default function AboutSection(){
    const texts = [
        "About me",
        "Know me More",
    ];

    return(
        <div id='about-me' className="min-h-[40rem] rounded-md mt-40 pt-40 md:pt-0 bg-black flex flex-col items-center justify-center relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            {/* <div className="relative flex-col z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-neutral-500 flex items-center gap-2 md:gap-8">
                <span className="text-white">About Me</span>
                <span className="text-2xl mb-5">Know Me More</span>
            </div> */}

            <MorphingText texts={texts} />

            <div className="flex mt-20 md:mt-10 flex-col lg:flex-row justify-between align-items-center ">
                <div className="px-3 flex-2">
                    <h2 className="mb-4 text-2.6xl text-center lg:text-left">
                        Hi, I&apos;m <span className="font-bold">Shahad Hassan</span>
                    </h2>
                    <p className="mb-4 text-xl text-justify font-normal">
                        I&apos;m a Full Stack developer, who is passionate about MERN Stack. I love building websites that captivate users. I&apos;m always exploring new ways to bring ideas to life through code. Being a firm believer in the power of teamwork, I cherish the opportunity to collaborate and contribute as a team player, where our collective creativity sparks exceptional results. I embrace challenges as opportunities for growth, dedicating myself to hard work and continuous learning in this ever-evolving tech landscape.
                    </p>
                </div>
                <div className="w-80 rounded-md self-center lg:ml-6 mt-6 lg:mt-0 lg:px-0">
                    <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="shahad-hassan-82287a220" data-version="v1"></div>
                </div>
            </div>
            <div className="mt-6 w-full grid sm:grid-cols-1 md:grid-cols-2 justify-center lg:flex lg:justify-between align-items-center ">
                <div className="mt-4 px-3">
                    <p className="font-medium">Name:</p>
                    <p className="font-semibold text-lg">Shahad Hassan</p>
                </div>
                <div className="mt-4 px-3">
                    <p className="font-medium">Email:</p>
                    <p className="font-semibold underline text-lg">shahadg1983@gmail.com</p>
                </div>
                <div className="mt-4 px-3">
                    <p className="font-medium">Date of Birth:</p>
                    <p className="font-semibold text-lg">05 June, 2003</p>
                </div>
                <div className="mt-4 px-3">
                    <p className="font-medium">From:</p>
                    <p className="font-semibold text-lg">Uttar Pradesh, India</p>
                </div>
            </div>
            <ShootingStars />
            <StarsBackground />
        </div>
    )
}

