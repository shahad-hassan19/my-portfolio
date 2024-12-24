"use client";

import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MorphingText from "@/components/ui/morphing-text";

import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaTelegramPlane } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

interface EmailJSResponse {
    text: string;
}

interface EmailJSError {
    text: string;
    code?: number;
    status?: string;
}

export default function ContactSection(){

    const [ userName, setUserName ] = useState('')
    const [ userMail, setUserMail ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ message, setMessage ] = useState('')

    const form = useRef<HTMLFormElement>(null);
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        if (form.current) {
            emailjs.sendForm('service_x02jmrm', 'template_czqjhqp', form.current, 'mv_jU07IPDEPAdBHe')
                .then((result: EmailJSResponse) => {
                    console.log(result.text);
                    if (form.current) {
                        form.current.reset();
                    }
                    toast.success('Message sent successfully!');
                    setLoading(false);
                    setUserName('');
                    setUserMail('');
                    setMessage('');
                }, (error: EmailJSError) => {
                    console.log(error.text);
                }
            );
        } else {
            console.error("Form reference is undefined");
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return(
            userName.trim() !== '' &&
            userMail.trim() !== '' &&
            message.trim() !== ''
        )
    }

    const texts = [
        "Contact Me",
        "Let's get in touch",
    ];

    return(
        <div id='about-me' className="h-[40rem] rounded-md mt-40 pt-40 md:pt-0 bg-black flex flex-col items-center justify-center relative w-full sm:px-4 md:px-6 lg:px-8 xl:px-24">
            <MorphingText texts={texts} />
            <Toaster toastOptions={{duration: 4000}} />

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between md:gap-10 mt-10 w-full">
                <div className=" text-center lg:text-left px-3">
                    <p className=" text-justify text-xl mb-12">
                        &quot;I&apos;m thrilled to be on this journey of innovation and discovery, and I&apos;m excited to connect, collaborate, and create something amazing together. Let&apos;s build the future, one line of code at a time!&quot;
                    </p>
                    <div>
                        <h3 className="text-xl mb-2 font-semibold">
                            Living in:
                        </h3>
                        <p className="text-lg mb-4">
                            Bhoora, Shamli, U.P., India
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl mb-2 font-semibold">
                            Call:
                        </h3>
                        <p className="text-lg mb-4">
                            <a href="/home">(+91) 6398 223 144</a>
                        </p>
                    </div>
                    <div className="flex justify-center lg:justify-start align-items-center gap-x-5 font-bold pt-12 text-2xl">
                        <a className="hover:text-blue-900" href="https://www.facebook.com/shahad.chauhangurjar.9" rel='noreferrer' target='_blank' ><FaFacebook/></a>
                        <a className="hover:text-blue-900" href="https://www.linkedin.com/in/shahad-hassan-82287a220" rel='noreferrer' target='_blank'><FaLinkedin/></a>
                        <a className="hover:text-blue-900" href="https://twitter.com/HassanShahad019m" rel='noreferrer' target='_blank'><FaXTwitter/></a>
                        <a className="hover:text-blue-900" href="https://github.com/shahad-hassan19" rel='noreferrer' target='_blank'><FaGithub/></a>
                        <a className="hover:text-blue-900" href="https://www.instagram.com/shahad_chauhan019/" rel='noreferrer' target='_blank'><FaInstagram/></a>
                    </div>
                </div>
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
                    <form className="my-8" ref={form} onSubmit={sendEmail}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="user_name" placeholder="Shahad Hassan" type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="user_email" placeholder="shahadg1983@gmail.com" type="email"
                                value={userMail}
                                onChange={(e) => setUserMail(e.target.value)}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="e.g. 'I want to talk about...'"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            value='send'
                            disabled={!isFormValid() || loading}
                            type="submit"
                        >
                            {
                                loading ? "Sending ..." : (<span className='inline-flex items-center justify-center gap-x-1'><FaTelegramPlane/>Send</span>)
                            }
                            <BottomGradient />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const BottomGradient = () => {
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
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
