import { achievements, type Achievement, type AchievementId } from '../data/achievements';
import { trackEvent } from './analytics';

/**
 * Unlocked achievements, kept in this browser. A small store rather than React
 * state so anything (the game, the idle scene, a print) can unlock one without
 * threading callbacks through the tree; `useAchievements` subscribes to it.
 */
const KEY = 'achievements';

let unlocked: AchievementId[] = (() => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(stored)
      ? stored.filter((id) => achievements.some((a) => a.id === id))
      : [];
  } catch {
    return [];
  }
})();

const listeners = new Set<() => void>();
const toastListeners = new Set<(achievement: Achievement) => void>();

export const getUnlocked = () => unlocked;

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Called once for each newly earned achievement, to announce it */
export const onUnlock = (listener: (achievement: Achievement) => void) => {
  toastListeners.add(listener);
  return () => {
    toastListeners.delete(listener);
  };
};

export function unlock(id: AchievementId) {
  if (unlocked.includes(id)) return;
  unlocked = [...unlocked, id];
  localStorage.setItem(KEY, JSON.stringify(unlocked));
  trackEvent(`achievement/${id}`);
  listeners.forEach((l) => l());
  const achievement = achievements.find((a) => a.id === id)!;
  toastListeners.forEach((l) => l(achievement));
}
