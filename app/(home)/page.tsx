import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import SkillsSection from "./_components/SkillsSection";
// import ResumeSection from "./_components/ResumeSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import ContactSection from "./_components/ContactSection";
import FooterSection from './_components/FooterSection';
import { MyNavbar } from "./_components/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <MyNavbar/>
      <HeroSection/>
      <AboutSection/>
      <SkillsSection/>
      {/* <ResumeSection/> */}
      <TestimonialsSection/>
      <ContactSection/>
      <FooterSection/>
    </div>
  );
}
