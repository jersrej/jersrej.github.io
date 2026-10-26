import { useEffect } from 'react';

const ACTIVITY_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'];

/**
 * Calls `onIdle` once the visitor has gone `timeoutMs` without any input.
 * Off on touch-first devices, where someone reading a slide doesn't touch the
 * screen and shouldn't be interrupted. A hidden tab doesn't count as idle.
 */
export function useIdle(timeoutMs: number, enabled: boolean, onIdle: () => void) {
  useEffect(() => {
    if (!enabled || !window.matchMedia('(pointer: fine)').matches) return;

    let timer: ReturnType<typeof setTimeout>;
    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(() => (document.hidden ? restart() : onIdle()), timeoutMs);
    };

    restart();
    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, restart, { capture: true, passive: true })
    );
    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, restart, { capture: true }));
    };
  }, [timeoutMs, enabled, onIdle]);
}
