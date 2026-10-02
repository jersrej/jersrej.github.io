import { useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

/**
 * Calls `onUnlock` when the Konami code is typed anywhere on the page.
 */
export function useKonamiCode(onUnlock: () => void) {
  useEffect(() => {
    let position = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Not while an overlay is open: its text input would complete the code
      if (document.querySelector('dialog[open]')) return;

      if (e.key === KONAMI_CODE[position]) {
        position++;
        if (position === KONAMI_CODE.length) {
          position = 0;
          onUnlock();
        }
      } else {
        position = e.key === KONAMI_CODE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUnlock]);
}
