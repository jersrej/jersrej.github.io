import { useEffect } from 'react';

const AUTO_PLAY_MS = 6500;
const ACTIVITY_EVENTS = ['keydown', 'pointerdown', 'wheel', 'touchstart'] as const;

/**
 * Calls `advance` after each quiet interval while enabled. The countdown
 * restarts on any visitor input and whenever `advance` changes (i.e. on every
 * slide change), and it does not run while the tab is hidden.
 */
export function useAutoPlay(enabled: boolean, advance: () => void) {
  useEffect(() => {
    if (!enabled) return;

    let timer: ReturnType<typeof setTimeout>;
    const restart = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(advance, AUTO_PLAY_MS);
    };

    restart();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, restart, { passive: true }));
    document.addEventListener('visibilitychange', restart);

    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, restart));
      document.removeEventListener('visibilitychange', restart);
    };
  }, [enabled, advance]);
}
