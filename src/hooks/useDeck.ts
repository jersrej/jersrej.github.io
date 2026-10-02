import { useCallback, useEffect, useState } from 'react';
import { indexFromHash, steps } from '../data/deck';

const clamp = (index: number) => Math.min(steps.length - 1, Math.max(0, index));

/**
 * Current position in the deck, kept in sync with the URL hash so every
 * slide is linkable and plain `<a href="#about">` links work as navigation.
 */
export function useDeck() {
  const [index, setIndex] = useState(() => Math.max(0, indexFromHash(window.location.hash)));

  const go = useCallback((next: number) => setIndex(clamp(next)), []);
  const step = useCallback((delta: number) => setIndex((i) => clamp(i + delta)), []);

  // Links and manual URL edits
  useEffect(() => {
    const handleHashChange = () => {
      const next = indexFromHash(window.location.hash);
      if (next !== -1) setIndex(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Stepping replaces the URL instead of pushing, so Back leaves the deck
  // rather than replaying every slide
  useEffect(() => {
    const hash = index === 0 ? '' : `#${steps[index].hash}`;
    if (window.location.hash !== hash) {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}${hash}`);
    }
  }, [index]);

  return { index, go, step };
}
