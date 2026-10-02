import {
  ArrowLeft,
  ArrowRight,
  Bug,
  FileText,
  FolderOpen,
  GalleryHorizontal,
  Hand,
  Keyboard,
  Mail,
  Pause,
  Play,
  ScrollText,
  SunMoon,
  User,
  Volume2,
  VolumeX,
  type LucideIcon
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './components/BrandIcons';
import { links } from './data/links';
import type { Theme } from './hooks/useTheme';
import type { ViewMode } from './hooks/useViewMode';

export type Command = {
  id: string;
  group: string;
  label: string;
  /** Extra words the search should match */
  keywords?: string;
  /** Shortcut or current state, shown on the right */
  hint?: string;
  icon: LucideIcon | typeof GitHubIcon;
  run: () => void;
};

interface CommandContext {
  mode: ViewMode;
  theme: Theme;
  autoPlay: boolean;
  sound: boolean;
  step: (delta: number) => void;
  toggleAutoPlay: () => void;
  toggleSound: () => void;
  toggleMode: () => void;
  cycleTheme: () => void;
  openShortcuts: () => void;
  openGame: () => void;
}

// Section links go through the URL hash, which both views already understand
const goTo = (hash: string) => () => {
  window.location.hash = hash;
};
const openLink = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');

export const buildCommands = (ctx: CommandContext): Command[] => {
  const isDeck = ctx.mode === 'deck';

  const commands: (Command | false)[] = [
    {
      id: 'intro',
      group: 'Go to',
      label: 'Introduction',
      keywords: 'home start',
      icon: Hand,
      run: goTo('intro')
    },
    {
      id: 'about',
      group: 'Go to',
      label: 'About',
      keywords: 'skills experience',
      icon: User,
      run: goTo('about')
    },
    {
      id: 'work',
      group: 'Go to',
      label: 'Projects',
      keywords: 'work case studies',
      icon: FolderOpen,
      run: goTo('work')
    },
    {
      id: 'contact',
      group: 'Go to',
      label: 'Contact',
      keywords: 'email hire',
      icon: Mail,
      run: goTo('contact')
    },
    isDeck && {
      id: 'next',
      group: 'Go to',
      label: 'Next slide',
      hint: '→',
      icon: ArrowRight,
      run: () => ctx.step(1)
    },
    isDeck && {
      id: 'previous',
      group: 'Go to',
      label: 'Previous slide',
      hint: '←',
      icon: ArrowLeft,
      run: () => ctx.step(-1)
    },

    {
      id: 'mode',
      group: 'View',
      label: isDeck ? 'Switch to long page' : 'Switch to deck',
      keywords: 'layout mode scroll slides',
      icon: isDeck ? ScrollText : GalleryHorizontal,
      run: ctx.toggleMode
    },
    {
      id: 'theme',
      group: 'View',
      label: 'Change theme',
      keywords: 'dark light system',
      hint: ctx.theme,
      icon: SunMoon,
      run: ctx.cycleTheme
    },
    isDeck && {
      id: 'autoplay',
      group: 'View',
      label: ctx.autoPlay ? 'Pause auto play' : 'Start auto play',
      keywords: 'autoplay slideshow',
      icon: ctx.autoPlay ? Pause : Play,
      run: ctx.toggleAutoPlay
    },
    isDeck && {
      id: 'sound',
      group: 'View',
      label: ctx.sound ? 'Turn navigation sound off' : 'Turn navigation sound on',
      keywords: 'mute audio click',
      icon: ctx.sound ? Volume2 : VolumeX,
      run: ctx.toggleSound
    },

    {
      id: 'cv',
      group: 'Links',
      label: 'Open CV',
      keywords: 'resume pdf download',
      icon: FileText,
      run: openLink(links.cv)
    },
    {
      id: 'github',
      group: 'Links',
      label: 'Open GitHub',
      icon: GitHubIcon,
      run: openLink(links.github)
    },
    {
      id: 'linkedin',
      group: 'Links',
      label: 'Open LinkedIn',
      icon: LinkedInIcon,
      run: openLink(links.linkedin)
    },

    {
      id: 'shortcuts',
      group: 'More',
      label: 'Keyboard shortcuts',
      keywords: 'help keys',
      hint: '?',
      icon: Keyboard,
      run: ctx.openShortcuts
    },
    {
      id: 'game',
      group: 'More',
      label: 'Play Bug Hunter',
      keywords: 'game easter egg konami fun',
      icon: Bug,
      run: ctx.openGame
    }
  ];

  return commands.filter((c) => c !== false);
};
