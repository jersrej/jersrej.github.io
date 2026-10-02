import { Monitor, Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';
import { IconButton } from './IconButton';

interface ThemeToggleProps {
  theme: Theme;
  onCycle: () => void;
  className?: string;
}

const themes = {
  light: { label: 'Light', Icon: Sun },
  dark: { label: 'Dark', Icon: Moon },
  system: { label: 'System', Icon: Monitor }
};

export const ThemeToggle = ({ theme, onCycle, className }: ThemeToggleProps) => {
  const { label, Icon } = themes[theme] ?? themes.system;

  return (
    <IconButton label={`Theme: ${label}`} onClick={onCycle} className={className}>
      <Icon className="size-4" />
    </IconButton>
  );
};
