import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark' | 'system';

const themeOrder: Theme[] = ['light', 'dark', 'system'];

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)');
const isDark = (theme: Theme) => theme === 'dark' || (theme === 'system' && systemDark().matches);
const applyTheme = (theme: Theme) =>
  document.documentElement.classList.toggle('dark', isDark(theme));

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  // Keep the page in step with the OS while following the system theme
  useEffect(() => {
    applyTheme(theme);
    if (theme !== 'system') return;

    const mediaQuery = systemDark();
    const listener = () => applyTheme('system');
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setThemeMode = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);

    // Everything that changes with the theme must happen inside this one step
    const update = () => {
      applyTheme(newTheme);
      flushSync(() => setTheme(newTheme));
    };

    // Crossfade the whole page between themes where the browser can; with
    // reduced motion (or no support) the change is immediate
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('startViewTransition' in document && !reducedMotion) {
      document.startViewTransition(update);
    } else {
      update();
    }
  };

  const cycleTheme = () => {
    setThemeMode(themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length]);
  };

  return { theme, setTheme: setThemeMode, cycleTheme };
}
