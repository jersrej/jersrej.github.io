import { useTheme } from '../hooks/useTheme';
import { MonitorIcon, MoonIcon, SunIcon } from './Icons';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: <SunIcon /> },
    { value: 'dark' as const, label: 'Dark', icon: <MoonIcon /> },
    { value: 'system' as const, label: 'System', icon: <MonitorIcon /> }
  ];

  const currentIndex = themes.findIndex((t) => t.value === theme);
  const currentTheme = themes[currentIndex] || themes[2];

  const cycleTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink"
      aria-label={`Current theme: ${currentTheme.label}. Click to cycle.`}
      title={`Theme: ${currentTheme.label}`}
    >
      {currentTheme.icon}
    </button>
  );
};
