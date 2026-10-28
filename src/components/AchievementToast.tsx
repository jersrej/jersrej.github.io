import { Trophy } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RETRO_UNLOCKS, type Achievement } from '../data/achievements';
import { getUnlocked, onUnlock } from '../utils/achievements';

const SHOW_MS = 4500;

/**
 * Announces each newly earned achievement, one at a time. A manual popover so
 * it lands in the top layer, above a dialog that may be open (Bug Hunter).
 */
export const AchievementToast = () => {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const current = queue[0];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => onUnlock((a) => setQueue((q) => [...q, a])), []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!current || !el) return;
    el.showPopover();
    const timer = setTimeout(() => setQueue((q) => q.slice(1)), SHOW_MS);
    return () => {
      clearTimeout(timer);
      el.hidePopover();
    };
  }, [current]);

  // Only the first of the two unlocking achievements is news
  const unlocksRetro =
    current &&
    RETRO_UNLOCKS.includes(current.id) &&
    getUnlocked().filter((id) => RETRO_UNLOCKS.includes(id)).length === 1;

  return (
    <div
      ref={ref}
      popover="manual"
      role="status"
      className="toast-in inset-auto bottom-4 left-4 m-0 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-line bg-surface p-4 text-ink shadow-2xl"
    >
      {current && (
        <div className="flex gap-3">
          <Trophy className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="eyebrow">Achievement unlocked</p>
            <p className="mt-1 font-medium">{current.title}</p>
            <p className="mt-0.5 text-sm text-muted">
              {unlocksRetro
                ? 'Retro look unlocked. Change the look from the command menu.'
                : current.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
