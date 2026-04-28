"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Constants
const NAV_ITEMS: NavItem[] = [
  { name: "About", link: "about-me" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Experience", link: "experience" },
  { name: "Testimonials", link: "testimonials" },
  { name: "Contact", link: "contact-me" }
];

const CV_LINK = "https://drive.google.com/file/d/1uuy0JMC2qv_ApBGSJU-YXO8c1dDPCNL4/view?usp=sharing";
const SCROLL_THRESHOLD = 88;

interface NavItem {
  name: string;
  link: string;
}

export function MyNavbar(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < SCROLL_THRESHOLD);
        lastScrollY.current = currentScrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ link }) => {
      const el = document.getElementById(link);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(link); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 px-2 w-full min-w-0 overflow-visible pt-[max(0.5rem,env(safe-area-inset-top,0px))] pb-1 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Link href="/" className="cursor-pointer z-10">
            <Image
              src="/favicon_io/favicon-32x32.png"
              alt="Shahad-Hassan"
              width={32}
              height={32}
            />
          </Link>
          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.link}
                href={`#${item.link}`}
                className={cn(
                  "relative px-4 py-3 rounded-full transition-colors duration-200",
                  activeSection === item.link
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeSection === item.link && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton
              href={CV_LINK}
              rel="noreferrer"
              target="_blank"
              variant="primary"
            >
              Download CV
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="cursor-pointer z-10">
              <Image
                src="/favicon_io/favicon-32x32.png"
                alt="Shahad-Hassan"
                className="h-10 w-10"
                width={40}
                height={40}
              />
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={`#${item.link}`}
                onClick={handleMobileMenuClose}
                className={cn(
                  "relative px-4 py-3 rounded-md transition-colors",
                  activeSection === item.link
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.name}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href={CV_LINK}
                rel="noreferrer"
                target="_blank"
                onClick={handleMobileMenuClose}
                variant="primary"
                className="w-full"
              >
                Download CV
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}