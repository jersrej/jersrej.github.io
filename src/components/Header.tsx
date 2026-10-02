import type { SectionId } from '../data/deck';
import { DownloadIcon } from './Icons';
import { SectionNav } from './SectionNav';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  section: SectionId;
}

export const Header = ({ section }: HeaderProps) => {
  return (
    <header role="banner" className="border-b border-line">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:px-10 short:h-11">
        <a href="#intro" className="font-display text-base font-semibold tracking-tight">
          Jerson Conmigo
        </a>

        {/* On small screens the section nav lives in the bottom bar instead */}
        <SectionNav current={section} label="Primary navigation" className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <a
            href="/Jerson-Conmigo-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            aria-label="Download Jerson Conmigo's CV (PDF)"
          >
            <DownloadIcon />
            CV
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
