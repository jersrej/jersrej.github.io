import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: '☀️' },
    { value: 'dark' as const, label: 'Dark', icon: '🌙' },
    { value: 'system' as const, label: 'System', icon: '💻' }
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
      className="group relative flex items-center justify-center size-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 hover:border-cyan-400/30 transition-all duration-300"
      aria-label={`Current theme: ${currentTheme.label}. Click to cycle.`}
      title={`Theme: ${currentTheme.label}`}
    >
      <span className="text-lg transition-transform group-hover:scale-110">
        {currentTheme.icon}
      </span>
    </button>
  );
};
