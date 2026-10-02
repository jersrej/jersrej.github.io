import { sections, steps } from '../data/deck';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { SectionNav } from './SectionNav';

interface DeckControlsProps {
  index: number;
  onStep: (delta: number) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

const stepButton =
  'flex size-11 items-center justify-center rounded-md border border-line transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-30 short:size-9';

export const DeckControls = ({ index, onStep }: DeckControlsProps) => {
  const current = steps[index];
  const sectionLabel = sections.find((s) => s.id === current.section)?.label;

  return (
    <footer>
      {/* Progress: one tick per slide, grouped by section */}
      <div className="flex gap-2" aria-hidden="true">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex gap-px"
            style={{ flexGrow: steps.filter((s) => s.section === section.id).length }}
          >
            {steps.map(
              (s, i) =>
                s.section === section.id && (
                  <span
                    key={s.hash}
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      i === index ? 'bg-accent' : i < index ? 'bg-muted' : 'bg-line'
                    }`}
                  />
                )
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-1 px-3 md:justify-start md:gap-2 md:px-10 short:h-11">
        <button
          type="button"
          onClick={() => onStep(-1)}
          disabled={index === 0}
          className={stepButton}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon />
        </button>

        <SectionNav current={current.section} label="Section navigation" className="md:hidden" />

        <p className="order-first mr-auto hidden items-baseline gap-3 font-mono text-xs md:flex">
          <span>
            {pad(index + 1)} <span className="text-muted">/ {pad(steps.length)}</span>
          </span>
          <span className="text-muted">
            {sectionLabel}
            {current.project && ` — ${current.label}`}
          </span>
        </p>

        <button
          type="button"
          onClick={() => onStep(1)}
          disabled={index === steps.length - 1}
          className={stepButton}
          aria-label="Next slide"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  );
};
