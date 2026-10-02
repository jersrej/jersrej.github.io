import { Header } from './components/Header';
import { DeckControls } from './components/DeckControls';
import { KonamiEasterEgg } from './components/KonamiEasterEgg';
import { SkipToContent } from './components/SkipToContent';
import { Slide } from './components/Slide';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { firstWorkIndex, sections, steps, workProjects, type SectionId } from './data/deck';
import { useDeck } from './hooks/useDeck';
import { useDeckInput } from './hooks/useDeckInput';

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const { index, go, step } = useDeck();
  useDeckInput({ step, go, lastIndex: steps.length - 1 });

  const current = steps[index];
  const offsetOf = (id: SectionId) => sectionIds.indexOf(id) - sectionIds.indexOf(current.section);
  // Outside the Work section this rests on the nearest project, so entering
  // from either side lands on the right one
  const projectIndex = Math.min(workProjects.length - 1, Math.max(0, index - firstWorkIndex));

  return (
    <div className="grid h-dvh grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] bg-paper text-ink">
      <SkipToContent />
      <Header section={current.section} />

      <main id="main-content" className="relative overflow-hidden">
        <Slide offset={offsetOf('intro')} label="Introduction">
          <HeroSection />
        </Slide>
        <Slide offset={offsetOf('about')} label="About">
          <AboutSection />
        </Slide>
        <Slide offset={offsetOf('work')} label="Work">
          <ProjectsSection projects={workProjects} activeIndex={projectIndex} />
        </Slide>
        <Slide offset={offsetOf('contact')} label="Contact">
          <ContactSection />
        </Slide>
      </main>

      <DeckControls index={index} onStep={step} />

      <p className="sr-only" aria-live="polite">
        {current.project ? `Work: ${current.label}` : current.label}, slide {index + 1} of{' '}
        {steps.length}
      </p>

      <KonamiEasterEgg />
    </div>
  );
}
