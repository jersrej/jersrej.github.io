import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ViewMode } from './useViewMode';

/**
 * The deck only renders the current slide, so printing switches to the long
 * page for the duration of the print and back afterwards, without saving it
 * as the visitor's view. `onPrint` runs as printing starts.
 */
export function usePrintView(mode: ViewMode, onPrint: () => void) {
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    // The browser lays out for print right after this handler, so it has to render synchronously
    const before = () => {
      onPrint();
      document.documentElement.dataset.mode = 'page';
      flushSync(() => setPrinting(true));
    };
    const after = () => {
      document.documentElement.dataset.mode = mode;
      setPrinting(false);
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, [mode, onPrint]);

  return printing ? 'page' : mode;
}
