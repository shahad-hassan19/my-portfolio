"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Download, FolderGit2, Mail, MessageSquareQuote, User, Wrench, type LucideIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "../_data/contact";

// Constants
const NAV_ITEMS: NavItem[] = [
  { name: "About", link: "about-me" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Experience", link: "experience" },
  { name: "Testimonials", link: "testimonials" },
  { name: "Contact", link: "contact-me" },
];

const CV_LINK = "https://drive.google.com/file/d/1uuy0JMC2qv_ApBGSJU-YXO8c1dDPCNL4/view?usp=sharing";
const SCROLL_THRESHOLD = 24;

interface NavItem {
  name: string;
  link: string;
}

// Icons for the mobile menu tiles
const NAV_ICONS: Record<string, LucideIcon> = {
  "about-me": User,
  skills: Wrench,
  projects: FolderGit2,
  experience: Briefcase,
  testimonials: MessageSquareQuote,
  "contact-me": Mail,
};

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group relative z-10 flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-orange-500 font-black text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:-rotate-6">
        S
      </span>
      <span className="hidden text-sm font-bold text-foreground sm:block">Shahad Hassan</span>
    </Link>
  );
}

export function MyNavbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sections below the fold are lazy-loaded, so keep looking until every one is observed
  useEffect(() => {
    // Track which sections sit in the middle band; when none do (hero, footer) nothing is active
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id)));
        setActiveSection(NAV_ITEMS.find(({ link }) => inBand.has(link))?.link ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const seen = new Set<string>();
    const attach = () => {
      NAV_ITEMS.forEach(({ link }) => {
        const el = document.getElementById(link);
        if (el && !seen.has(link)) {
          seen.add(link);
          io.observe(el);
        }
      });
      if (seen.size === NAV_ITEMS.length) mo.disconnect();
    };
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    attach();
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Lock page scroll and allow Esc while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  // Header padding + bar padding line the logo and buttons up with every section's content edge
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-3 md:px-5 lg:px-9">
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-auto flex max-w-[1080px] items-center justify-between rounded-2xl border px-2 transition-all sm:px-3 duration-500 ease-out",
          scrolled || open
            ? "h-14 border-white/[0.08] bg-card/90 shadow-xl backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent"
        )}
      >
        <Logo onClick={close} />

        {/* Desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.link;
            return (
              <li key={item.link}>
                <a
                  href={`#${item.link}`}
                  className={cn(
                    "relative flex items-center rounded-lg px-3.5 py-1.5 text-sm transition-colors duration-200",
                    active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-primary/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CV_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-6px_hsl(var(--primary)/0.75)] sm:inline-flex"
          >
            <Download size={14} />
            Resume
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-300 lg:hidden",
              open ? "border-primary bg-primary text-primary-foreground" : "border-white/[0.1] bg-white/[0.04] text-foreground"
            )}
          >
            {/* Two bars that cross into an X */}
            <span className="relative block h-3 w-[18px]">
              <span
                className={cn(
                  "absolute left-0 h-[2px] rounded-full bg-current transition-all duration-300",
                  open ? "top-[5px] w-full rotate-45" : "top-0 w-full"
                )}
              />
              <span
                className={cn(
                  "absolute h-[2px] rounded-full bg-current transition-all duration-300",
                  open ? "left-0 top-[5px] w-full -rotate-45" : "right-0 top-[10px] w-2/3"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu: grid of section tiles + resume and socials */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1080px] overflow-y-auto rounded-3xl border border-white/[0.08] bg-card/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:hidden"
          >
            <p className="px-2 pb-3 pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Navigate</p>
            <ul className="grid grid-cols-2 gap-2.5">
              {NAV_ITEMS.map((item, i) => {
                const Icon = NAV_ICONS[item.link];
                const on = activeSection === item.link;
                return (
                  <motion.li
                    key={item.link}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${item.link}`}
                      onClick={close}
                      className={cn(
                        "relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-4 transition-colors",
                        on
                          ? "border-primary/50 bg-gradient-to-br from-primary/20 to-primary/[0.04] text-foreground"
                          : "border-white/[0.07] bg-white/[0.03] text-foreground/85 active:bg-white/[0.07]"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl",
                            on ? "bg-primary text-primary-foreground" : "bg-white/[0.06] text-primary"
                          )}
                        >
                          <Icon size={18} />
                        </span>
                        <span className="font-mono text-[11px] text-white/25">0{i + 1}</span>
                      </span>
                      <span className="text-base font-bold">{item.name}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35 }}
              className="mt-3 space-y-3 border-t border-white/[0.06] pt-3"
            >
              <a
                href={CV_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-orange-500 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]"
              >
                <Download size={16} />
                Download Resume
              </a>
              <div className="grid grid-cols-5 gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-lg text-muted-foreground transition-colors active:border-primary/40 active:text-primary"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
