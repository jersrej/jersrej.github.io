import { useEffect, useState } from 'react';
import { playTick, unlockAudio, unlockOnFirstGesture } from '../utils/sound';

const readSaved = () => {
  try {
    return localStorage.getItem('sound') === 'on';
  } catch {
    return false;
  }
};

/**
 * Navigation sound preference. Off unless the visitor turns it on.
 */
export function useSound() {
  const [enabled, setEnabled] = useState(readSaved);

  // A saved "on" needs a fresh gesture on this visit before audio can play
  useEffect(() => {
    if (enabled) return unlockOnFirstGesture();
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem('sound', next ? 'on' : 'off');
    } catch {
      // Preference just won't persist
    }
    if (next) {
      unlockAudio();
      // Preview the sound so the visitor knows what they switched on
      setTimeout(playTick, 60);
    }
  };

  return { enabled, toggle };
}
