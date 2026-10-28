import { Lock, Trophy, X } from 'lucide-react';
import { achievements } from '../data/achievements';
import { useAchievements } from '../hooks/useAchievements';
import { Dialog } from './Dialog';

interface AchievementsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AchievementsDialog = ({ open, onClose }: AchievementsDialogProps) => {
  const { unlocked } = useAchievements();

  return (
    <Dialog open={open} onClose={onClose} label="Achievements">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="eyebrow">
            Achievements · {unlocked.length}/{achievements.length}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-4 max-h-[60svh] divide-y divide-line overflow-y-auto border-y border-line">
          {achievements.map((a) => {
            const earned = unlocked.includes(a.id);
            const Icon = earned ? Trophy : Lock;
            return (
              <li key={a.id} className="flex gap-3 py-3">
                <Icon
                  className={`mt-0.5 size-4 shrink-0 ${earned ? 'text-accent' : 'text-muted'}`}
                  aria-hidden="true"
                />
                <div>
                  <p className={`text-sm font-medium ${earned ? '' : 'text-muted'}`}>
                    <span className="sr-only">{earned ? 'Unlocked: ' : 'Locked: '}</span>
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{earned ? a.description : a.hint}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-sm text-muted">Saved in this browser only.</p>
      </div>
    </Dialog>
  );
};
