import { lazy, Suspense } from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ParticleCanvas from "@/components/ParticleCanvas";

// Lazy-load below-the-fold sections for performance
const AboutSection = lazy(() => import("@/components/portfolio/AboutSection"));
const EducationSkillsSection = lazy(() => import("@/components/portfolio/EducationSkillsSection"));
const ProjectsSection = lazy(() => import("@/components/portfolio/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/portfolio/ContactSection"));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none">
      <ParticleCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <EducationSkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
