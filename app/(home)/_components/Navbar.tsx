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
import NavLogo from "../../../public/favicon_io/favicon-32x32.png"
import { useEffect, useRef, useState } from "react";

export function MyNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
      const handleScroll = () => {
          if (typeof window !== "undefined") {
              const currentScrollY = window.scrollY;
              setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 88);
              lastScrollY.current = currentScrollY;
          }
      };
      if (typeof window !== "undefined") {
          window.addEventListener("scroll", handleScroll);
          return () => {
              window.removeEventListener("scroll", handleScroll);
          };
      }
  }, []);

  const navItems = [
    {
      name: "About",
      link: "about-me",
    },
    {
      name: "Skills",
      link: "skills",
    },
    {
      name: "Projects",
      link: "projects",
    },
    {
      name: "Experience",
      link: "experience",
    },
    {
      name: "Testimonials",
      link: "testimonials",
    },
    {
      name: "Contact",
      link: "contact-me"
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`z-50 fixed top-0 transition-all duration-300 ease-in-out w-full ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Image src={NavLogo} alt="Shahad-Hassan" />
          <div className="flex gap-4">
            <NavItems items={navItems} />
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary"> <a href="https://drive.google.com/file/d/1dzCH2b1mQIyndmqdNlR7tr7cXOu3S_AW/view?usp=sharing" rel='noreferrer' target='_blank'>Download CV</a></NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Image src={NavLogo} alt="Shahad-Hassan" className="h-10 w-10" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={`#${item.link}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                 <a href="https://drive.google.com/file/d/1dzCH2b1mQIyndmqdNlR7tr7cXOu3S_AW/view?usp=sharing" rel='noreferrer' target='_blank'>Download CV</a>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}