import dynamic from "next/dynamic";
import { SectionSkeleton, TwoColumnMediaSkeleton, SkillsSectionSkeleton } from "@/components/ui/skeletons";
import { MyNavbar } from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import { CustomCursor } from "@/components/ui/custom-cursor";
import ScrollToTop from "./_components/ScrollToTop";
const SkillsSection = dynamic(() => import("./_components/SkillsSection"), {
  ssr: false,
  loading: () => <SkillsSectionSkeleton className="py-20" />,
});
const ProjectsSection = dynamic(() => import("./_components/ProjectsSection"), {
  loading: () => <SectionSkeleton className="py-20" />,
});
const ExperienceSection = dynamic(() => import("./_components/ExperienceSection"), {
  loading: () => <SectionSkeleton className="py-20" />,
});
const TestimonialsSection = dynamic(() => import("./_components/TestimonialsSection"), {
  ssr: false,
  loading: () => <TwoColumnMediaSkeleton />,
});
const ContactSection = dynamic(() => import("./_components/ContactSection"), {
  loading: () => <SectionSkeleton className="py-20" />,
});
const FooterSection = dynamic(() => import("./_components/FooterSection"), {
  loading: () => (
    <div className="py-12 px-6">
      <SectionSkeleton />
    </div>
  ),
});

export default function Home(): JSX.Element {
  return (
    <div className="relative min-h-screen w-full min-w-0 overflow-x-hidden antialiased">
      <div className="page-atmosphere" aria-hidden />
      <div className="relative z-10 w-full min-w-0">
        <CustomCursor/>
        <ScrollToTop />
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
    </div>
  );
}
