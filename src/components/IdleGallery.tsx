import { Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { allScenes } from '../data/idleScenes';
import { poses, type Pose } from '../data/idleSprites';
import { Dialog } from './Dialog';
import { IdleArt } from './IdleArt';

interface IdleGalleryProps {
  onClose: () => void;
  /** Starts the idle scene, on a given pose or at the start of the day */
  onPlay: (pose?: Pose) => void;
}

// One clock for every tile; each pose turns it into frames at its own speed
const CLOCK_MS = 50;

/**
 * Every pose of the idle scene at once, animated, so visitors who never sit
 * still for a minute still get to see them. Picking one starts the scene there.
 */
export default function IdleGallery({ onClose, onPlay }: IdleGalleryProps) {
  const [elapsed, setElapsed] = useState(0);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setElapsed((t) => t + CLOCK_MS), CLOCK_MS);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <Dialog
      open
      onClose={onClose}
      label="Idle scene gallery"
      // Wider than the default dialog width, which it overrides
      className="w-[min(52rem,calc(100vw-2rem))]!"
    >
      <div className="flex max-h-[calc(100dvh-4rem)] flex-col">
        <div className="flex items-start justify-between gap-4 p-5 pb-0">
          <div>
            <h2 className="eyebrow">A day in the life</h2>
            <p className="mt-2 text-sm text-muted">
              Leave the page alone for a minute and pixel me goes about the day. Pick a moment to
              start there.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 flex size-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="idle-gallery mt-4 grid min-h-0 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-2 overflow-y-auto px-5">
          {allScenes.map(({ pose, caption, frameMs }) => (
            <li key={pose}>
              <button
                type="button"
                onClick={() => onPlay(pose)}
                className="group flex w-full flex-col overflow-hidden rounded-md border border-line text-left transition-colors hover:border-accent"
              >
                <span className="idle-spot relative flex h-24 w-full items-end justify-center bg-[#050608] pb-2">
                  <IdleArt pose={pose} frame={Math.floor(elapsed / frameMs) % poses[pose].frames} />
                </span>
                <span className="px-2.5 py-2 font-mono text-[11px] text-muted transition-colors group-hover:text-ink">
                  {caption}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-end border-t border-line p-4 mt-4">
          <button type="button" onClick={() => onPlay()} className="btn btn-primary" data-autofocus>
            <Play className="size-4" aria-hidden="true" />
            Play a whole day
          </button>
        </div>
      </div>
    </Dialog>
  );
}
