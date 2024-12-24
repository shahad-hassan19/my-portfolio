"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Pic from "@/public/profile-pic.png";

import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function HeroSection() {
    const words = ["DEVELOPER"];

    return (
        <div className="h-[40rem] w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" flex flex-col-reverse text-center lg:text-left lg:flex-row justify-between align-items-center sm:mx-12 md:mx-6 lg:mx-8 xl:mx-24 pt-16">
                <div className="flex flex-col px-3 lg:mt-8">
                    <h1 className=" text-2.6xl sm:text-3xl md:text-3.25xl lg:text-4xl xl:text-4.5xl opacity-80 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">HI, I&apos;M SHAHAD HASSAN</h1>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"><FlipWords words={words} /></h1>
                    <h4 className="text-xl mb-4 opacity-80 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Based in Shamli, India.</h4>
                    <div className="space-x-5 opacity-80 font-bold">
                        <Button variant="outline">View My Works</Button>
                        <Button variant="ghost" ><span>Contact Me</span><div className='mx-2 text-lg'/></Button>

                    </div>
                </div>
                <div className="lg:float-right self-center mt-20 lg:mt-7 rounded-full overflow-hidden mb-6 px-3 lg:m-8 border-black">
                    <Image src = {Pic} alt='My-Pic' className="w-80 flex-shrink-1" />
                </div>
            </div>
            <div className='flex justify-center align-items-center mt-20 pb-10'>
                <Link href="about-me" className=" animate-bounce px-3 cursor-pointer"><div className='text-xl font-bold self-center'/></Link>
            </div>
            <ShootingStars/>
        </div>
    );
}

