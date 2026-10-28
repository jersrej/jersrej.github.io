import { useEffect, useLayoutEffect, useState } from 'react';
import { unlock } from '../utils/achievements';
import { crossfade } from '../utils/crossfade';

/**
 * The site's style, on top of light/dark: Classic (the default), Terminal, and
 * Retro, which has to be unlocked. Mirrored to `data-look` and `data-accent`
 * on <html>, which styles.css keys off; index.html applies the saved values
 * before first paint.
 */
export type Look = 'classic' | 'terminal' | 'retro';
export type Accent = 'orange' | 'blue' | 'violet' | 'green' | 'pink';

export const looks: Record<Look, string> = {
  classic: 'Classic',
  terminal: 'Terminal',
  retro: 'Retro'
};
export const accents: Record<Accent, string> = {
  orange: 'Orange',
  blue: 'Blue',
  violet: 'Violet',
  green: 'Green',
  pink: 'Pink'
};
const lookOrder = Object.keys(looks) as Look[];
const accentOrder = Object.keys(accents) as Accent[];

// Retro's pixel font is only fetched once someone picks it
const RETRO_FONT =
  'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap';
const loadRetroFont = () => {
  if (document.querySelector(`link[href="${RETRO_FONT}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = RETRO_FONT;
  document.head.append(link);
};

const stored = <T extends string>(key: string, allowed: readonly T[], fallback: T) => {
  const value = localStorage.getItem(key) as T;
  return allowed.includes(value) ? value : fallback;
};

export function useLook(retroUnlocked: boolean) {
  const [look, setLook] = useState(() => stored('look', lookOrder, 'classic'));
  const [accent, setAccent] = useState(() => stored('accent', accentOrder, 'orange'));
  // A saved Retro look only counts while it's still unlocked here
  const shownLook = look === 'retro' && !retroUnlocked ? 'classic' : look;

  useLayoutEffect(() => {
    document.documentElement.dataset.look = shownLook;
    document.documentElement.dataset.accent = accent;
  }, [shownLook, accent]);

  useEffect(() => {
    if (shownLook === 'retro') loadRetroFont();
  }, [shownLook]);

  const change = (key: string, value: string, apply: () => void) => {
    if (document.documentElement.dataset[key] === value) return;
    localStorage.setItem(key, value);
    unlock('dress-up');
    crossfade(() => {
      document.documentElement.dataset[key] = value;
      apply();
    });
  };

  const chooseLook = (next: Look) => {
    if (next === 'retro' && !retroUnlocked) return;
    change('look', next, () => setLook(next));
  };

  const chooseAccent = (next: Accent) => change('accent', next, () => setAccent(next));

  return { look: shownLook, accent, chooseLook, chooseAccent };
}
