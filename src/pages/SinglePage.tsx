import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { LoadingScreen } from '../components/LoadingScreen';
import { ScrollProgress } from '../components/ScrollProgress';
import { AnimatedStats } from '../components/AnimatedStats';
import { FloatingParticles } from '../components/FloatingParticles';
import { MagneticCursor } from '../components/MagneticCursor';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';

export default function SinglePage() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Scroll to section on hash change
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  // Track scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startYear = 2011;
  const reactStartYear = 2018;
  const yearsOfExperience = new Date().getFullYear() - startYear;
  const yearsWithReact = new Date().getFullYear() - reactStartYear;
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <FloatingParticles />
      <MagneticCursor />

      <main className="relative bg-linear-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-transparent to-transparent dark:from-slate-900 dark:via-transparent dark:to-transparent"></div>
        </div>

        <HeroSection scrollY={scrollY} featured={featured} />

        <AnimatedStats />

        <ProjectsSection scrollY={scrollY} projects={projects} />

        <AboutSection
          scrollY={scrollY}
          yearsOfExperience={yearsOfExperience}
          yearsWithReact={yearsWithReact}
        />

        {/* let's add this later If I collected from my previous clients
        <Testimonials /> */}

        <ContactSection scrollY={scrollY} />
      </main>
    </>
  );
}
