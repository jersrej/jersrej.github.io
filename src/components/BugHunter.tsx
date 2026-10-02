import { Bug as BugIcon, X } from 'lucide-react';
import { useEffect, useReducer, useRef } from 'react';
import { playTick } from '../utils/sound';
import { Dialog } from './Dialog';

interface BugHunterProps {
  open: boolean;
  onClose: () => void;
  sound: boolean;
}

type Bug = { id: number; x: number; y: number; key: string; ttl: number; expires: number };

type GameState = {
  phase: 'ready' | 'playing' | 'over';
  bugs: Bug[];
  score: number;
  lives: number;
  best: number;
  nextSpawn: number;
  nextId: number;
};

/** Random values are drawn outside the reducer so it stays pure */
type SpawnCandidate = { spots: { x: number; y: number }[]; key: string };

type GameAction =
  | { type: 'start' }
  | { type: 'tick'; now: number; candidate: SpawnCandidate }
  | { type: 'squash'; id: number }
  | { type: 'squashKey'; key: string };

const LIVES = 3;
const MAX_BUGS = 6;
const TICK_MS = 100;
const BEST_KEY = 'bug-hunter-best';
// Home-row-first, and no letters that are awkward to tell apart at a glance
const KEYS = 'ASDFJKLGHQWERUIOPZXCVNM';

// Both ramp up with the score: bugs arrive sooner and ship faster
const spawnDelay = (score: number) => Math.max(450, 1100 - score * 25);
const lifetime = (score: number) => Math.max(1400, 2800 - score * 35);

const initialState = (): GameState => ({
  phase: 'ready',
  bugs: [],
  score: 0,
  lives: LIVES,
  best: Number(localStorage.getItem(BEST_KEY)) || 0,
  nextSpawn: 0,
  nextId: 1
});

const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'start':
      return { ...state, phase: 'playing', bugs: [], score: 0, lives: LIVES, nextSpawn: 600 };

    case 'squash':
    case 'squashKey': {
      const bug = state.bugs.find((b) =>
        action.type === 'squash' ? b.id === action.id : b.key === action.key
      );
      if (!bug) return state;
      return { ...state, bugs: state.bugs.filter((b) => b !== bug), score: state.score + 1 };
    }

    case 'tick': {
      if (state.phase !== 'playing') return state;
      const { now, candidate } = action;

      const alive = state.bugs.filter((b) => b.expires > now);
      const lives = state.lives - (state.bugs.length - alive.length);
      if (lives <= 0) {
        return {
          ...state,
          phase: 'over',
          bugs: [],
          lives: 0,
          best: Math.max(state.best, state.score)
        };
      }

      const shouldSpawn = now >= state.nextSpawn && alive.length < MAX_BUGS;
      if (!shouldSpawn) {
        return alive.length === state.bugs.length ? state : { ...state, bugs: alive, lives };
      }

      const usedKeys = alive.map((b) => b.key);
      const key = usedKeys.includes(candidate.key)
        ? [...KEYS].find((k) => !usedKeys.includes(k))!
        : candidate.key;
      // Prefer a spot that doesn't sit on top of another bug
      const spot =
        candidate.spots.find((s) => alive.every((b) => Math.hypot(b.x - s.x, b.y - s.y) > 0.25)) ??
        candidate.spots[0];
      const ttl = lifetime(state.score);

      return {
        ...state,
        lives,
        bugs: [...alive, { id: state.nextId, ...spot, key, ttl, expires: now + ttl }],
        nextSpawn: now + spawnDelay(state.score),
        nextId: state.nextId + 1
      };
    }
  }
};

const randomCandidate = (): SpawnCandidate => ({
  spots: Array.from({ length: 5 }, () => ({ x: Math.random(), y: Math.random() })),
  key: KEYS[Math.floor(Math.random() * KEYS.length)]
});

const Game = ({ onClose, sound }: Omit<BugHunterProps, 'open'>) => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { phase, bugs, score, lives, best } = state;

  // The game clock only runs while the tab is visible, so nothing ships behind your back
  useEffect(() => {
    if (phase !== 'playing') return;
    let clock = 0;
    const timer = setInterval(() => {
      if (document.hidden) return;
      clock += TICK_MS;
      dispatch({ type: 'tick', now: clock, candidate: randomCandidate() });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'over') localStorage.setItem(BEST_KEY, String(best));
  }, [phase, best]);

  // Each bug can also be squashed by pressing its letter, wherever focus is
  useEffect(() => {
    if (phase !== 'playing') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      dispatch({ type: 'squashKey', key: e.key.toUpperCase() });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  useEffect(() => {
    if (score > 0 && sound) playTick();
  }, [score, sound]);

  const field = useRef<HTMLDivElement>(null);
  const start = () => {
    dispatch({ type: 'start' });
    // The Start button is about to unmount; keep focus inside the game
    field.current?.focus();
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">Bug Hunter</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close game"
          className="-m-2 flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 flex gap-5 font-mono text-xs text-muted">
        <span>
          Score <span className="text-ink">{score}</span>
        </span>
        <span>
          Lives <span className="text-ink">{lives}</span>
        </span>
        <span className="ml-auto">
          Best <span className="text-ink">{best}</span>
        </span>
      </p>

      <div
        ref={field}
        tabIndex={-1}
        aria-label="Play field"
        className="relative mt-3 h-[min(20rem,50svh)] overflow-hidden rounded-md border border-line bg-paper outline-none"
      >
        {phase === 'playing' ? (
          bugs.map((bug) => (
            <button
              key={bug.id}
              type="button"
              onClick={() => dispatch({ type: 'squash', id: bug.id })}
              aria-label={`Squash bug ${bug.key}`}
              style={{
                left: `calc(${bug.x} * (100% - 3.5rem))`,
                top: `calc(${bug.y} * (100% - 3.5rem))`
              }}
              className="absolute flex size-14 flex-col items-center justify-center gap-0.5 rounded-md border border-line bg-surface transition-colors hover:border-accent"
            >
              <BugIcon className="size-5" aria-hidden="true" />
              <span className="font-mono text-[11px] leading-none text-muted" aria-hidden="true">
                {bug.key}
              </span>
              {/* Time left before this bug ships */}
              <span
                aria-hidden="true"
                style={{ animationDuration: `${bug.ttl}ms` }}
                className="bug-timer absolute inset-x-1.5 bottom-1 h-0.5 origin-left rounded-full bg-accent"
              />
            </button>
          ))
        ) : (
          <div
            role="status"
            className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
          >
            {phase === 'over' ? (
              <p className="font-display text-2xl font-semibold tracking-tight">
                {score} {score === 1 ? 'bug' : 'bugs'} squashed
                <span className="mt-1 block font-sans text-sm font-normal text-muted">
                  {score > 0 && score >= best
                    ? 'A new best. Three still made it to production.'
                    : 'Three made it to production.'}
                </span>
              </p>
            ) : (
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Bugs are heading for production. Click or tap one — or press its letter — before its
                timer runs out. Three escapes end the run.
              </p>
            )}
            <button
              type="button"
              autoFocus
              data-autofocus
              onClick={start}
              className="btn btn-primary"
            >
              {phase === 'over' ? 'Play again' : 'Start'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * A small optional game, reached through the Konami code or the command palette.
 * Loaded on demand so it adds nothing to the initial bundle.
 */
export default function BugHunter({ open, onClose, sound }: BugHunterProps) {
  return (
    <Dialog open={open} onClose={onClose} label="Bug Hunter game">
      <Game onClose={onClose} sound={sound} />
    </Dialog>
  );
}
