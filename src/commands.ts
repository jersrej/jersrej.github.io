import {
  ArrowLeft,
  ArrowRight,
  Bug,
  FileText,
  FolderOpen,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Gamepad2,
  Hand,
  Keyboard,
  Mail,
  Palette,
  Pause,
  Play,
  ScrollText,
  Sparkles,
  SunMoon,
  Trophy,
  User,
  Volume2,
  VolumeX,
  type LucideIcon
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './components/BrandIcons';
import { links } from './data/links';
import { splitTitle } from './data/projects';
import { sideQuests } from './data/sideQuests';
import { achievements } from './data/achievements';
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
  achievementCount: number;
  autoPlay: boolean;
  sound: boolean;
  step: (delta: number) => void;
  toggleAutoPlay: () => void;
  toggleSound: () => void;
  toggleMode: () => void;
  cycleTheme: () => void;
  openAppearance: () => void;
  openAchievements: () => void;
  openShortcuts: () => void;
  openGame: () => void;
  openGallery: () => void;
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
      id: 'quests',
      group: 'Go to',
      label: 'Side quests',
      keywords: 'personal projects fun cool stuff playground',
      icon: Sparkles,
      run: goTo('quests')
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
    {
      id: 'appearance',
      group: 'View',
      label: 'Appearance',
      keywords: 'look style accent color palette theme terminal retro classic skin',
      icon: Palette,
      run: ctx.openAppearance
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
    ...sideQuests.map(
      ({ id, title, link }) =>
        link !== undefined && {
          id: `quest-${id}`,
          group: 'Links',
          label: `Open ${splitTitle(title).name}`,
          keywords: 'side quest personal project',
          icon: Gamepad2,
          run: openLink(link)
        }
    ),

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
    },
    {
      id: 'achievements',
      group: 'More',
      label: 'Achievements',
      keywords: 'trophies badges unlock secrets',
      hint: `${ctx.achievementCount}/${achievements.length}`,
      icon: Trophy,
      run: ctx.openAchievements
    },
    {
      id: 'idle-gallery',
      group: 'More',
      label: 'A day in the life',
      keywords:
        'idle scene gallery poses pixel art sprites suikoden easter egg spotlight something cool fun',
      icon: GalleryVerticalEnd,
      run: ctx.openGallery
    }
  ];

  return commands.filter((c) => c !== false);
};
