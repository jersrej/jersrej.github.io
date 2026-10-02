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
          className={`border-b-2 px-1.5 py-2.5 font-mono text-[10px] tracking-wide uppercase transition-colors md:px-3 md:text-[11px] ${
            active ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          {section.label}
        </a>
      );
    })}
  </nav>
);
