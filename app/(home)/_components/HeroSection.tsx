import React from "react";
import Link from "next/link";
import Image from "next/image";
import Pic from "@/public/profile-pic.png";

import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";


export function HeroSection() {
    return (
        <div className="h-[40rem] w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" flex flex-col-reverse text-center lg:text-left lg:flex-row justify-between align-items-center sm:mx-12 md:mx-6 lg:mx-8 xl:mx-24 pt-16">
                <div className="flex flex-col px-3 lg:mt-8">
                    <h1 className=" text-2.6xl sm:text-3xl md:text-3.25xl lg:text-4xl xl:text-4.5xl font-light">HI, I&apos;M SHAHAD HASSAN</h1>
                    <h1 className=" text-4.5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold opacity-80">DEVELOPER</h1>
                    <h4 className=" text-xl font-normal mb-4">Based in Shamli, India.</h4>
                    <div className="space-x-5">
                        <Button variant="outline">View My Works</Button>
                        <Button variant="ghost" ><span>Contact Me</span><div className='mx-2 text-lg'/></Button>

                    </div>
                </div>
                <div className="lg:float-left self-center mt-20 lg:mt-7 rounded-full overflow-hidden mb-6 px-3 lg:m-8 border-black">
                    <Image src = {Pic} alt='My-Pic' className=" w-80 flex-shrink-1" />
                </div>
            </div>
            <div className='flex justify-center align-items-center mt-20 pb-10'>
                <Link href="about-me" className=" animate-bounce px-3 cursor-pointer"><div className='text-xl font-bold self-center'/></Link>
            </div>
        </div>
    );
}
