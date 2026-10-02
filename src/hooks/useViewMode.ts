import { useLayoutEffect, useState } from 'react';

export type ViewMode = 'deck' | 'page';

/**
 * Deck (fixed viewport, one slide at a time) or long page (normal scrolling).
 * The mode is mirrored to `data-mode` on <html>, which the CSS keys off.
 */
export function useViewMode() {
  const [mode, setMode] = useState<ViewMode>(() =>
    localStorage.getItem('view-mode') === 'page' ? 'page' : 'deck'
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.mode = mode;
    // The deck never scrolls, so drop any scroll offset left by the long page
    if (mode === 'deck') window.scrollTo(0, 0);
  }, [mode]);

  const setViewMode = (next: ViewMode) => {
    // Applied before React re-renders so the new view can restore its scroll position
    document.documentElement.dataset.mode = next;
    setMode(next);
    localStorage.setItem('view-mode', next);
  };

  return { mode, setMode: setViewMode };
}
