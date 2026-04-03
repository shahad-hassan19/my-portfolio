"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faXTwitter,
    faInstagram,
    faGithub,
    faTelegram
} from '@fortawesome/free-brands-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MorphingText from "@/components/ui/morphing-text";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const MORPHING_TEXTS = ["Contact Me", "Let's get in touch"];

const SOCIAL_LINKS = [
    { icon: faFacebook, href: "https://www.facebook.com/shahad.chauhangurjar.9", label: "Facebook" },
    { icon: faLinkedin, href: "https://www.linkedin.com/in/shahad-hassan-82287a220", label: "LinkedIn" },
    { icon: faXTwitter, href: "https://twitter.com/HassanShahad019", label: "X (Twitter)" },
    { icon: faGithub, href: "https://github.com/shahad-hassan19", label: "GitHub" },
    { icon: faInstagram, href: "https://www.instagram.com/shahad_chauhan019/", label: "Instagram" }
];

const CONTACT_INFO = {
    location: "Bhoora, Shamli, U.P., India",
    phone: "(+91) 6398 223 144",
    description: "I'm thrilled to be on this journey of innovation and discovery, and I'm excited to connect, collaborate, and create something amazing together. Let's build the future, one line of code at a time!"
};

const EMAILJS_CONFIG = {
    serviceId: 'service_x02jmrm',
    templateId: 'template_czqjhqp',
    publicKey: 'mv_jU07IPDEPAdBHe'
};

interface EmailJSResponse { text: string; }
interface EmailJSError { text: string; code?: number; status?: string; }
interface FormData { userName: string; userMail: string; message: string; }

export default function ContactSection(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        userName: '', userMail: '', message: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const form = useRef<HTMLFormElement>(null);

    const handleInputChange = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = (): boolean => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const resetForm = (): void => {
        setFormData({ userName: '', userMail: '', message: '' });
        if (form.current) form.current.reset();
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true);
        if (form.current) {
            emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                form.current,
                EMAILJS_CONFIG.publicKey
            ).then((result: EmailJSResponse) => {
                console.log(result.text);
                resetForm();
                toast.success('Message sent successfully!');
                setLoading(false);
            }, (error: EmailJSError) => {
                console.log(error.text);
                toast.error('Failed to send message. Please try again.');
                setLoading(false);
            });
        } else {
            console.error("Form reference is undefined");
            setLoading(false);
        }
    };

    return (
        <div id="contact-me" className="min-h-[40rem] rounded-md pb-20 section-deepest flex flex-col items-center justify-center gap-10 relative w-full px-4 md:px-6 lg:px-8 xl:px-24 z-20">
            {/* Ambient glow */}
            <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
            >
                <MorphingText texts={MORPHING_TEXTS} />
            </motion.div>

            <Toaster toastOptions={{ duration: 4000 }} />

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-y-5 md:gap-10 mt-10 w-full">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    className="text-center lg:text-left px-3 w-full z-20"
                >
                    <p className="text-justify text-lg text-neutral-300 mb-12 leading-relaxed">
                        &quot;{CONTACT_INFO.description}&quot;
                    </p>

                    <div className="mb-6">
                        <h3 className="text-lg mb-1 font-semibold text-indigo-300">Living in:</h3>
                        <p className="text-base text-neutral-400">{CONTACT_INFO.location}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-1 font-semibold text-indigo-300">Call:</h3>
                        <p className="text-base text-neutral-400">
                            <a href="tel:+916398223144" className="hover:text-white transition-colors duration-300">{CONTACT_INFO.phone}</a>
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-start align-items-center gap-x-5 pt-8 text-2xl">
                        {SOCIAL_LINKS.map((social, index) => (
                            <a
                                key={index}
                                className="text-neutral-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110"
                                href={social.href}
                                rel="noreferrer"
                                target="_blank"
                                aria-label={social.label}
                            >
                                <FontAwesomeIcon icon={social.icon} />
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                    className="max-w-md z-20 w-full mx-auto glass-card rounded-2xl p-6 md:p-8"
                >
                    <form className="my-4" ref={form} onSubmit={sendEmail}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="name" className="text-neutral-300">Name</Label>
                            <Input
                                id="name"
                                name="user_name"
                                placeholder="Shahad Hassan"
                                type="text"
                                value={formData.userName}
                                onChange={(e) => handleInputChange('userName', e.target.value)}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
                            <Input
                                id="email"
                                name="user_email"
                                placeholder="shahadg1983@gmail.com"
                                type="email"
                                value={formData.userMail}
                                onChange={(e) => handleInputChange('userMail', e.target.value)}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-6">
                            <Label htmlFor="message" className="text-neutral-300">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="e.g. 'I want to talk about...'"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                            />
                        </LabelInputContainer>

                        <button
                            className="relative group/btn w-full text-white rounded-xl h-11 font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 transition-all duration-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            value="send"
                            disabled={!isFormValid() || loading}
                            type="submit"
                        >
                            {loading ? (
                                "Sending ..."
                            ) : (
                                <span className="inline-flex items-center justify-center gap-x-2">
                                    <FontAwesomeIcon icon={faTelegram} />
                                    Send Message
                                </span>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}): JSX.Element => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
