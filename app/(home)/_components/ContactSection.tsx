"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MorphingText from "@/components/ui/morphing-text";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

/* ─── Data ─── */

const MORPHING_TEXTS = ["Contact Me", "Let's get in touch"];

const SOCIAL_LINKS = [
  { icon: faFacebook, href: "https://www.facebook.com/shahad.chauhangurjar.9", label: "Facebook" },
  { icon: faLinkedin, href: "https://www.linkedin.com/in/shahad-hassan-82287a220", label: "LinkedIn" },
  { icon: faXTwitter, href: "https://twitter.com/HassanShahad019", label: "X" },
  { icon: faGithub, href: "https://github.com/shahad-hassan19", label: "GitHub" },
  { icon: faInstagram, href: "https://www.instagram.com/shahad_chauhan019/", label: "Instagram" },
];

const CONTACT_ITEMS = [
  { Icon: MapPin, label: "Location", value: "Shamli, U.P., India", href: undefined as string | undefined, iconColor: "text-teal-400", iconBg: "bg-teal-500/10 border-teal-500/20" },
  { Icon: Phone, label: "Phone", value: "+91 6398 223 144", href: "tel:+916398223144", iconColor: "text-rose-400", iconBg: "bg-rose-500/10 border-rose-500/20" },
  { Icon: Mail, label: "Email", value: "shahadg1983@gmail.com", href: "mailto:shahadg1983@gmail.com", iconColor: "text-violet-400", iconBg: "bg-violet-500/10 border-violet-500/20" },
];

const EMAILJS_CONFIG = {
  serviceId: "service_x02jmrm",
  templateId: "template_czqjhqp",
  publicKey: "mv_jU07IPDEPAdBHe",
};

/* ─── Types ─── */

interface FormData { userName: string; userMail: string; message: string }

/* ─── Component ─── */

export default function ContactSection(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({ userName: "", userMail: "", message: "" });
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const set = (field: keyof FormData, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const valid = Object.values(formData).every((v) => v.trim() !== "");

  const resetForm = () => {
    setFormData({ userName: "", userMail: "", message: "" });
    form.current?.reset();
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    emailjs
      .sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form.current, EMAILJS_CONFIG.publicKey)
      .then(
        () => { resetForm(); toast.success("Message sent!"); setLoading(false); },
        () => { toast.error("Failed to send. Try again."); setLoading(false); },
      );
  };

  return (
    <div id="contact-me" className="section-wrapper section-deepest relative z-20">
      {/* Ambient */}
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/[0.07] via-teal-500/[0.04] to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <MorphingText texts={MORPHING_TEXTS} />
        </motion.div>

        <Toaster toastOptions={{ duration: 4000 }} />

        {/* ═══ Card ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-md overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* ── Left panel ── */}
            <div className="lg:col-span-2 relative p-6 md:p-8 lg:p-10 flex flex-col justify-between gap-8 bg-gradient-to-br from-violet-500/[0.08] via-transparent to-teal-500/[0.05]">
              {/* Decorative orb */}
              <div className="absolute -top-20 -left-20 w-56 h-56 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative space-y-8">
                {/* Heading */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-rose-300 to-teal-300">
                      Let&apos;s work together
                    </span>
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Have an idea or project? I&apos;d love to hear about it. Drop me a message and let&apos;s create something great.
                  </p>
                </div>

                {/* Contact info */}
                <div className="space-y-3">
                  {CONTACT_ITEMS.map((item) => {
                    const Wrapper = item.href ? "a" : "div";
                    return (
                      <Wrapper
                        key={item.label}
                        {...(item.href ? { href: item.href } : {})}
                        className="flex items-center gap-3 group"
                      >
                        <span className={cn(
                          "flex-shrink-0 h-9 w-9 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                          item.iconBg
                        )}>
                          <item.Icon size={15} className={item.iconColor} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-white/35 font-medium leading-none mb-0.5">{item.label}</p>
                          <p className={cn(
                            "text-sm font-medium truncate transition-colors duration-200",
                            item.iconColor,
                            item.href && "group-hover:text-white"
                          )}>
                            {item.value}
                          </p>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>

              {/* Socials */}
              <div className="relative">
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-white/35 font-medium mb-3">Follow me</p>
                <div className="flex gap-2 flex-wrap">
                  {SOCIAL_LINKS.map((s, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={s.href}
                      rel="noreferrer"
                      target="_blank"
                      aria-label={s.label}
                      className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.09] text-white/45 hover:text-white hover:bg-white/[0.1] hover:border-violet-500/35 transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={s.icon} className="text-sm" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right panel: Form ── */}
            <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.07]">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white/90 mb-1">Send a message</h4>
                <p className="text-xs text-white/40">All fields are required</p>
              </div>

              <form className="space-y-4" ref={form} onSubmit={sendEmail}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabelInputContainer>
                    <Label htmlFor="name" className="text-white/55 font-medium text-xs">Name</Label>
                    <Input
                      id="name"
                      name="user_name"
                      placeholder="John Doe"
                      type="text"
                      value={formData.userName}
                      onChange={(e) => set("userName", e.target.value)}
                      className="bg-white/[0.05] border-white/[0.09] focus:border-violet-500/50 focus:bg-white/[0.07] text-foreground placeholder:text-white/25 rounded-xl h-10 text-sm transition-all duration-200"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="email" className="text-white/55 font-medium text-xs">Email</Label>
                    <Input
                      id="email"
                      name="user_email"
                      placeholder="you@example.com"
                      type="email"
                      value={formData.userMail}
                      onChange={(e) => set("userMail", e.target.value)}
                      className="bg-white/[0.05] border-white/[0.09] focus:border-violet-500/50 focus:bg-white/[0.07] text-foreground placeholder:text-white/25 rounded-xl h-10 text-sm transition-all duration-200"
                    />
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="message" className="text-white/55 font-medium text-xs">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project…"
                    value={formData.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="bg-white/[0.05] border-white/[0.09] focus:border-violet-500/50 focus:bg-white/[0.07] text-foreground placeholder:text-white/25 resize-none min-h-[140px] rounded-xl text-sm transition-all duration-200"
                  />
                </LabelInputContainer>

                <motion.button
                  whileHover={{ scale: valid && !loading ? 1.015 : 1 }}
                  whileTap={{ scale: valid && !loading ? 0.985 : 1 }}
                  disabled={!valid || loading}
                  type="submit"
                  className="w-full btn-gradient py-3 text-sm font-semibold disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Send size={15} />
                      Send Message
                    </span>
                  )}
                </motion.button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}

/* ─── Helpers ─── */

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
    {children}
  </div>
);
