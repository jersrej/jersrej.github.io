import { useEffect, useLayoutEffect, useRef } from 'react';
import { firstWorkIndex, indexFromHash, steps, workProjects } from '../data/deck';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';

interface PageViewProps {
  index: number;
  go: (index: number) => void;
}

const stepElement = (index: number) => document.getElementById(steps[index].hash);

/**
 * Traditional scrolling page built from the same sections as the deck.
 * Each deck step is an anchor here (its hash is the element id), so slide
 * links work in both views and switching views keeps the visitor's place.
 */
export const PageView = ({ index, go }: PageViewProps) => {
  // Arriving from the deck or from a deep link: start at that step
  const initialIndex = useRef(index);
  useLayoutEffect(() => {
    if (initialIndex.current > 0) {
      stepElement(initialIndex.current)?.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  // Keep the current step (header nav, project index, URL) in sync with scroll
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = 0;
      steps.forEach((_, i) => {
        const el = stepElement(i);
        if (el && el.getBoundingClientRect().top <= readingLine) current = i;
      });
      go(current);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [go]);

  // The browser scrolls to hashes that match an id; resolve the rest
  // (legacy anchors like #projects) through the deck's hash table
  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      // Read the hash from the event: by now the deck may have canonicalized the URL
      const { hash } = new URL(e.newURL);
      const id = decodeURIComponent(hash.slice(1));
      if (!id || document.getElementById(id)) return;
      const target = indexFromHash(hash);
      if (target !== -1) stepElement(target)?.scrollIntoView();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const anchor = 'scroll-mt-24 md:scroll-mt-14';

  return (
    <main id="main-content" className="divide-y divide-line">
      <section
        id="intro"
        aria-label="Introduction"
        className={`grid min-h-[calc(100svh-6rem)] items-center md:min-h-[calc(100svh-3.5rem)] ${anchor}`}
      >
        <HeroSection />
      </section>
      <section id="about" aria-label="About" className={anchor}>
        <AboutSection />
      </section>
      <section id="work" aria-label="Work" className={anchor}>
        <ProjectsSection projects={workProjects} activeIndex={index - firstWorkIndex} stacked />
      </section>
      {/* Tall enough that Contact can reach the reading line at the end of the page */}
      <section
        id="contact"
        aria-label="Contact"
        className={`grid min-h-[70svh] items-center ${anchor}`}
      >
        <ContactSection />
      </section>
    </main>
  );
};
