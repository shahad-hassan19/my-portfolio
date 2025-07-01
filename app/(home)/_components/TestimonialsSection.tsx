"use client";

import React from "react";
import { motion } from "framer-motion";

import MorphingText from "@/components/ui/morphing-text";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";


export default function TestimonialsSection(){

    const testimonials = [
        {
            quote:
                "Guiding Shahad through the naunces of frontend development has been a rewarding experience. His ability to quickly grasp new concepts and apply them creatively to projects is truly impressive. Not only does he possess strong technical skills, but his collaborative nature and effective communication make him a valuable asset.",
            name: "Shakti Singh",
            designation: "Consulting Specialist - UX/UI",
            src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023882/Mentors/fcpt8tjjm7r3ityrocd5.jpg",
        },
        {
            quote:
                "Shahad is not just proficient in coding, he also possesses a strong design sense, which greatly enhances the visual appeal and functionality of his projects. His collaborative approach and strong problem-solving skills make him an excellent addition to any project. His dedication and passion for his craft are admirable.",
            name: "Tanmay Sharma",
            designation: "Saas Sales Professional",
            src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023894/Mentors/mw7oicjmqckypcgarwky.jpg",
        },
        {
            quote:
            "Shahad has consistently demonstrated a high level of proficiency in frontend development. His code is not just functional but also elegant, reflecting a deep understanding of design principles. He possesses a strong command of frontend technologies, and his ability to adapt to evolving industry standards is impressive.",
            name: "Manish Gurjar",
            designation: "Senior UI/UX Designer | Product Design Expert",
            src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023906/Mentors/kbwmhcvjrntqo3yrdhdh.png",
        },
    ];

    const texts = [
        "Mentor Speak",
        "What my Mentors say",
    ];

    return(
        <div id='testimonials' className="min-h-[40rem] rounded-md pt-40 bg-black flex flex-col items-center justify-center gap-10 relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
            >
                <MorphingText texts={texts} />
            </motion.div>

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="w-full z-20"
            >
                <AnimatedTestimonials testimonials={testimonials} />
            </motion.div>
            <ShootingStars />
            <StarsBackground />
        </div>
    )
}