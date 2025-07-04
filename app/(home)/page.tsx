import { MyNavbar } from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import SkillsSection from "./_components/SkillsSection";
import ProjectsSection from "./_components/ProjectsSection";
import ExperienceSection from "./_components/ExperienceSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import ContactSection from "./_components/ContactSection";
import FooterSection from "./_components/FooterSection";

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <MyNavbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
