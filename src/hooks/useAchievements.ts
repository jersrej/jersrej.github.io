import { useSyncExternalStore } from 'react';
import { RETRO_UNLOCKS } from '../data/achievements';
import { getUnlocked, subscribe } from '../utils/achievements';

/** The achievements unlocked in this browser, kept current */
export function useAchievements() {
  const unlocked = useSyncExternalStore(subscribe, getUnlocked);
  return { unlocked, retroUnlocked: RETRO_UNLOCKS.some((id) => unlocked.includes(id)) };
}
