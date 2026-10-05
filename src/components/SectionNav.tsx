import { sections, type SectionId } from '../data/deck';

interface SectionNavProps {
  current: SectionId;
  label: string;
  className?: string;
}

export const SectionNav = ({ current, label, className = '' }: SectionNavProps) => (
  <nav aria-label={label} className={`flex items-center ${className}`}>
    {sections.map((section) => {
      const active = section.id === current;
      return (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active ? 'true' : undefined}
          className={`border-b-2 px-1 py-2.5 font-mono text-[10px] tracking-wide whitespace-nowrap uppercase min-[360px]:px-1.5 transition-colors md:px-3 md:text-[11px] ${
            active ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          {section.compact ? (
            <>
              <span className="sm:hidden" aria-hidden="true">
                {section.compact}
              </span>
              <span className="max-sm:sr-only">{section.label}</span>
            </>
          ) : (
            section.label
          )}
        </a>
      );
    })}
  </nav>
);
