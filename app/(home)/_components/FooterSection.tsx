"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";

const CURRENT_YEAR = new Date().getFullYear();
const DESIGNER_NAME = "Shahad Hassan";

const QUICK_LINKS = [
    { name: "About", href: "#about-me" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
];

export default function FooterSection(): JSX.Element {
    return (
        <footer className="w-full relative">
            {/* Top border accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Section background */}
            <div className="relative bg-gradient-to-b from-transparent via-background/70 to-background backdrop-blur-md">
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/[0.08] via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-teal-500/[0.06] via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-24 py-16 relative z-10">
                    {/* Top section - Links and CTA */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/[0.05]">
                        {/* Branding */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="md:col-span-1"
                        >
                            <Link href="/" className="inline-flex items-center gap-2 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                    <span className="text-white font-bold text-lg">SH</span>
                                </div>
                                <span className="font-bold text-lg text-foreground hidden sm:inline">Shahad Hassan</span>
                            </Link>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Building beautiful, scalable web experiences with modern technologies.
                            </p>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="md:col-span-1"
                        >
                            <h4 className="text-foreground font-bold text-lg mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                {QUICK_LINKS.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:col-span-1 flex flex-col justify-start"
                        >
                            <h4 className="text-foreground font-bold text-lg mb-6">Get In Touch</h4>
                            <p className="text-muted-foreground text-sm mb-4">
                                Have a project in mind? Let&apos;s work together!
                            </p>
                            <Link
                                href="#contact-me"
                                className="btn-gradient py-2 px-4 text-sm inline-flex items-center justify-center gap-2 w-fit"
                            >
                                <span>Contact Me</span>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12l5-5 5 5" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Bottom section - Copyright and Designer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
                    >
                        <div className="text-sm text-muted-foreground">
                            <p>&copy; {CURRENT_YEAR} Shahad Hassan. All rights reserved.</p>
                        </div>

                        <div className="text-sm">
                            <p className="text-muted-foreground">
                                <span>Designed & Developed by </span>
                                <Link
                                    href="/"
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-violet-300 to-rose-300 font-bold hover:from-teal-200 hover:via-violet-200 hover:to-rose-200 transition-all duration-300 cursor-pointer underline underline-offset-2"
                                >
                                    {DESIGNER_NAME}
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>

                <StarsBackground />
            </div>
        </footer>
    );
}
