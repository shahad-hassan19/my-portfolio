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

// Constants
const MORPHING_TEXTS = ["Contact Me", "Let's get in touch"];

const SOCIAL_LINKS = [
    {
        icon: faFacebook,
        href: "https://www.facebook.com/shahad.chauhangurjar.9",
        label: "Facebook"
    },
    {
        icon: faLinkedin,
        href: "https://www.linkedin.com/in/shahad-hassan-82287a220",
        label: "LinkedIn"
    },
    {
        icon: faXTwitter,
        href: "https://twitter.com/HassanShahad019",
        label: "X (Twitter)"
    },
    {
        icon: faGithub,
        href: "https://github.com/shahad-hassan19",
        label: "GitHub"
    },
    {
        icon: faInstagram,
        href: "https://www.instagram.com/shahad_chauhan019/",
        label: "Instagram"
    }
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

// Types
interface EmailJSResponse {
    text: string;
}

interface EmailJSError {
    text: string;
    code?: number;
    status?: string;
}

interface FormData {
    userName: string;
    userMail: string;
    message: string;
}

export default function ContactSection(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        userMail: '',
        message: ''
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
        if (form.current) {
        form.current.reset();
        }
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
                }
            );
        } else {
            console.error("Form reference is undefined");
            setLoading(false);
        }
    };

    return (
        <div id="contact-me" className="min-h-[40rem] rounded-md pb-20 bg-black flex flex-col items-center justify-center gap-10 relative w-full px-4 md:px-6 lg:px-8 xl:px-24 z-50">
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
                    <p className="text-justify text-xl mb-12">
                        &quot;{CONTACT_INFO.description}&quot;
                    </p>

                    <div>
                        <h3 className="text-xl mb-2 font-semibold">Living in:</h3>
                        <p className="text-lg mb-4">{CONTACT_INFO.location}</p>
                    </div>

                    <div>
                        <h3 className="text-xl mb-2 font-semibold">Call:</h3>
                        <p className="text-lg mb-4">
                            <a href="tel:+916398223144">{CONTACT_INFO.phone}</a>
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-start align-items-center gap-x-5 font-bold pt-12 text-2xl">
                        {SOCIAL_LINKS.map((social, index) => (
                            <a
                                key={index}
                                className="hover:text-[#FACC15] transition-all duration-700"
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
                    className="max-w-md z-20 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black"
                >
                    <form className="my-8" ref={form} onSubmit={sendEmail}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Name</Label>
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
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="user_email"
                                placeholder="shahadg1983@gmail.com"
                                type="email"
                                value={formData.userMail}
                                onChange={(e) => handleInputChange('userMail', e.target.value)}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="e.g. 'I want to talk about...'"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            value="send"
                            disabled={!isFormValid() || loading}
                            type="submit"
                        >
                            {loading ? (
                                "Sending ..."
                            ) : (
                                <span className="inline-flex items-center justify-center gap-x-1">
                                <FontAwesomeIcon icon={faTelegram} />
                                Send
                                </span>
                            )}
                            <BottomGradient />
                        </button>
                    </form>
                </motion.div>
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}

const BottomGradient = (): JSX.Element => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

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