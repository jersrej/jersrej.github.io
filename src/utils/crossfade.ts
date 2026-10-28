import { flushSync } from 'react-dom';

/**
 * Runs `update` (DOM changes and the React state that goes with them) as one
 * step, crossfading the whole page where the browser can. With reduced motion
 * (or no support) the change is immediate.
 */
export function crossfade(update: () => void) {
  const run = () => flushSync(update);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('startViewTransition' in document && !reducedMotion) {
    document.startViewTransition(run);
  } else {
    run();
  }
}
