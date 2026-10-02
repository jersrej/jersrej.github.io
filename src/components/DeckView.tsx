import { useCallback, useEffect, useRef } from 'react';
import { firstWorkIndex, sections, steps, workProjects, type SectionId } from '../data/deck';
import { useAutoPlay } from '../hooks/useAutoPlay';
import { useDeckInput } from '../hooks/useDeckInput';
import { playTick } from '../utils/sound';
import { DeckControls } from './DeckControls';
import { Slide } from './Slide';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';

interface DeckViewProps {
  index: number;
  go: (index: number) => void;
  step: (delta: number) => void;
  autoPlay: boolean;
  onAutoPlayEnd: () => void;
  sound: boolean;
  onOpenShortcuts: () => void;
}

const sectionIds = sections.map((s) => s.id);
const lastIndex = steps.length - 1;

/**
 * Fixed-viewport presentation: one slide visible at a time.
 */
export const DeckView = ({
  index,
  go,
  step,
  autoPlay,
  onAutoPlayEnd,
  sound,
  onOpenShortcuts
}: DeckViewProps) => {
  useDeckInput({ step, go, lastIndex });

  // Auto play runs once through the deck and switches itself off at the end
  const autoAdvanced = useRef(false);
  const advance = useCallback(() => {
    if (index === lastIndex) {
      onAutoPlayEnd();
      return;
    }
    autoAdvanced.current = true;
    step(1);
  }, [index, step, onAutoPlayEnd]);
  useAutoPlay(autoPlay, advance);

  // Tick on slide changes the visitor made; auto play advances stay silent
  const previousIndex = useRef(index);
  useEffect(() => {
    if (previousIndex.current === index) return;
    previousIndex.current = index;
    const silent = autoAdvanced.current;
    autoAdvanced.current = false;
    if (sound && !silent) playTick();
  }, [index, sound]);

  const current = steps[index];
  const offsetOf = (id: SectionId) => sectionIds.indexOf(id) - sectionIds.indexOf(current.section);
  // Outside the Work section this rests on the nearest project, so entering
  // from either side lands on the right one
  const projectIndex = Math.min(workProjects.length - 1, Math.max(0, index - firstWorkIndex));

  return (
    <>
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

      <DeckControls index={index} onStep={step} onOpenShortcuts={onOpenShortcuts} />

      <p className="sr-only" aria-live="polite">
        {current.project ? `Work: ${current.label}` : current.label}, slide {index + 1} of{' '}
        {steps.length}
        {autoPlay && ', auto play on'}
      </p>
    </>
  );
};
