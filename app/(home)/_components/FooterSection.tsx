"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EMAIL, SOCIAL_LINKS } from "../_data/contact";

const YEAR = new Date().getFullYear();

const NAV = [
  { name: "About", href: "#about-me" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact-me" },
];

function Icons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {SOCIAL_LINKS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            <FontAwesomeIcon icon={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function FooterSection(): JSX.Element {
  return (
    <footer className="relative pb-3 pt-10 sm:pb-4">
      {/* From xl the card spans the full 6xl box, so its inner padding lines the text up with the sections */}
      <div className="mx-auto max-w-6xl px-3 sm:px-4 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card/80 px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:px-10 md:py-12 xl:px-12"
        >
          {/* Amber kept to accents: a hairline on top and a soft glow behind the name */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary/80">Full Stack Developer</p>
              <p className="mt-3 text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl">
                Shahad
                <br />
                <span className="gradient-text-animated">Hassan</span>
                <span className="text-primary">.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6 md:items-end">
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg font-bold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors hover:text-primary"
              >
                {EMAIL}
              </a>
              <Icons />
            </div>
          </div>
          <div className="relative mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-5 text-sm sm:flex-row sm:items-center">
            <ul className="flex flex-wrap gap-1.5">
              {NAV.map((n) => (
                <li key={n.name}>
                  <a
                    href={n.href}
                    className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {n.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">© {YEAR} · Designed &amp; built by me</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
