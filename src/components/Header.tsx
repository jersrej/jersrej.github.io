import {
  Command,
  Download,
  Ellipsis,
  GalleryHorizontal,
  Pause,
  Play,
  ScrollText,
  Volume2,
  VolumeX
} from 'lucide-react';
import type { SectionId } from '../data/deck';
import { links } from '../data/links';
import type { Theme } from '../hooks/useTheme';
import type { ViewMode } from '../hooks/useViewMode';
import { IconButton } from './IconButton';
import { Logo } from './Logo';
import { SectionNav } from './SectionNav';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  section: SectionId;
  mode: ViewMode;
  onModeToggle: () => void;
  theme: Theme;
  onThemeCycle: () => void;
  autoPlay: boolean;
  onAutoPlayToggle: () => void;
  sound: boolean;
  onSoundToggle: () => void;
  onOpenPalette: () => void;
}

export const Header = ({
  section,
  mode,
  onModeToggle,
  theme,
  onThemeCycle,
  autoPlay,
  onAutoPlayToggle,
  sound,
  onSoundToggle,
  onOpenPalette
}: HeaderProps) => {
  const isDeck = mode === 'deck';

  return (
    <header
      role="banner"
      className="relative z-10 border-b border-line bg-paper page:sticky page:top-0"
    >
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-x-2 px-5 md:gap-x-4 md:px-10 short:min-h-11">
        <a
          href="#intro"
          aria-label="Jerson Conmigo — back to the introduction"
          className="group -m-1 rounded-md p-1"
        >
          <Logo />
        </a>

        {/* Small screens: the deck keeps this nav in its bottom bar; the long page gives it a row */}
        <SectionNav
          current={section}
          label="Primary navigation"
          className={
            isDeck
              ? 'max-md:hidden'
              : 'max-md:order-last max-md:basis-full max-md:justify-center max-md:border-t max-md:border-line'
          }
        />

        <div className="flex items-center gap-1 lg:gap-2">
          <a
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            aria-label="Download Jerson Conmigo's CV (PDF)"
          >
            <Download className="size-4" aria-hidden="true" />
            CV
          </a>

          {/* Phones keep the essentials here; everything else is in the command menu */}
          {isDeck && (
            <>
              <IconButton
                label="Auto play"
                pressed={autoPlay}
                onClick={onAutoPlayToggle}
                className="max-sm:hidden"
              >
                {autoPlay ? <Pause className="size-4" /> : <Play className="size-4" />}
              </IconButton>
              <IconButton
                label="Navigation sound"
                pressed={sound}
                onClick={onSoundToggle}
                className="max-sm:hidden"
              >
                {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </IconButton>
            </>
          )}

          <IconButton
            label={isDeck ? 'Switch to long page' : 'Switch to deck'}
            onClick={onModeToggle}
          >
            {isDeck ? <ScrollText className="size-4" /> : <GalleryHorizontal className="size-4" />}
          </IconButton>
          <ThemeToggle theme={theme} onCycle={onThemeCycle} />
          <IconButton label="Command menu" onClick={onOpenPalette}>
            <Command className="size-4 max-sm:hidden" />
            <Ellipsis className="size-4 sm:hidden" />
          </IconButton>
        </div>
      </div>
    </header>
  );
};
