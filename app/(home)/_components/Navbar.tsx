"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavItems,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Constants
const NAV_ITEMS: NavItem[] = [
  { name: "About", link: "about-me" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Experience", link: "experience" },
  { name: "Testimonials", link: "testimonials" },
  { name: "Contact", link: "contact-me" }
];

const CV_LINK = "https://drive.google.com/file/d/1dzCH2b1mQIyndmqdNlR7tr7cXOu3S_AW/view?usp=sharing";
const SCROLL_THRESHOLD = 88;

interface NavItem {
  name: string;
  link: string;
}

export function MyNavbar(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`z-50 fixed top-0 transition-all duration-300 ease-in-out w-full ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
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
          <div className="flex gap-4">
            <NavItems items={NAV_ITEMS} />
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary">
              <a
                href={CV_LINK}
                rel="noreferrer"
                target="_blank"
              >
                Download CV
              </a>
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
                className="relative text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={handleMobileMenuClose}
                variant="primary"
                className="w-full"
              >
                <a
                  href={CV_LINK}
                  rel="noreferrer"
                  target="_blank"
                >
                  Download CV
                </a>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}