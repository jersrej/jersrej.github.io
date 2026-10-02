import { useState } from 'react';
import { playTick, unlockAudio } from '../utils/sound';

/**
 * Navigation sound preference. Off unless the visitor turns it on.
 */
export function useSound() {
  const [enabled, setEnabled] = useState(() => localStorage.getItem('sound') === 'on');

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('sound', next ? 'on' : 'off');
    if (next) {
      unlockAudio();
      // Preview the sound so the visitor knows what they switched on
      setTimeout(playTick, 60);
    }
  };

  return { enabled, toggle };
}
