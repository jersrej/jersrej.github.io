import { useEffect, useMemo, useState } from 'react';
import { bubbles, frames, palette, type Pose } from '../data/idleSprites';

interface IdleSceneProps {
  onClose: () => void;
}

/**
 * `bubble` pins one thought bubble (an index into `bubbles`) for the whole pose;
 * `holdMs` overrides how long the pose plays.
 */
type Scene = { pose: Pose; caption: string; frameMs: number; bubble?: number; holdMs?: number };

const QUESTION_BUBBLE = 2;

// A day: opens on coding and ends with sleeping and waking up, then the next day
// starts. In between, a random handful of these groups plays in random order; a
// group's poses always stay together and in order.
const OPENING: Scene[] = [{ pose: 'coding', caption: 'Coding…', frameMs: 260 }];
const MIDDLE: Scene[][] = [
  [{ pose: 'duck', caption: 'Debugging…', frameMs: 260, bubble: QUESTION_BUBBLE }],
  [{ pose: 'ramen', caption: 'Ramen…', frameMs: 500 }],
  [{ pose: 'stretching', caption: 'Stretching…', frameMs: 700 }],
  [{ pose: 'deploy', caption: 'Shipped!', frameMs: 300 }],
  [{ pose: 'coffee', caption: 'Coffee…', frameMs: 600 }],
  [{ pose: 'walking', caption: 'Walking…', frameMs: 240 }],
  [{ pose: 'cats', caption: 'Petting…', frameMs: 550 }],
  [{ pose: 'tv', caption: 'TV…', frameMs: 700 }],
  [{ pose: 'reading', caption: 'Reading…', frameMs: 900 }],
  [{ pose: 'cooking', caption: 'Cooking…', frameMs: 450 }],
  [{ pose: 'driving', caption: 'Driving…', frameMs: 180 }],
  [
    { pose: 'charging', caption: 'Charging…', frameMs: 600 },
    { pose: 'gaming', caption: 'Playing…', frameMs: 500 }
  ]
];
const ENDING: Scene[] = [
  { pose: 'phone', caption: 'Scrolling…', frameMs: 700 },
  { pose: 'sleeping', caption: 'Sleeping…', frameMs: 700, holdMs: 15000 },
  { pose: 'waking', caption: 'Waking up…', frameMs: 900 }
];
const MIDDLE_PICKS = 6;
const HOLD_MS = 6000;

const buildSequence = () => [
  ...OPENING,
  ...shuffle(MIDDLE).slice(0, MIDDLE_PICKS).flat(),
  ...ENDING
];

// Thought bubbles while coding: each stays up this long, with a random pause between them
const BUBBLE_MS = 2200;
const randomBubble = () => Math.floor(Math.random() * bubbles.length);

const shuffle = <T,>(list: T[]) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// Pointer movement smaller than this is hand tremor, not the visitor coming back
const MOVE_TOLERANCE = 12;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** One <rect> per horizontal run of same-coloured pixels; size comes from the grid */
const Sprite = ({ rows, className }: { rows: string[]; className: string }) => {
  const rects = useMemo(() => {
    const out: { x: number; y: number; w: number; fill: string }[] = [];
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const ch = row[x];
        let w = 1;
        while (row[x + w] === ch) w++;
        if (ch !== '.') out.push({ x, y, w, fill: palette[ch] });
        x += w;
      }
    });
    return out;
  }, [rows]);

  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      className={className}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
};

/**
 * A Suikoden-style interlude: the screen goes dark and a little pixel me goes
 * about the day in a spotlight in the corner: coding (with the odd thought
 * bubble), a random handful of everyday things, the phone in bed, sleep, and
 * waking up, then round again with a new mix. Shown after the
 * visitor has been idle for a while, or from the command menu. Any key,
 * click, scroll or real mouse movement brings the page back.
 */
export default function IdleScene({ onClose }: IdleSceneProps) {
  const [scenes, setScenes] = useState(buildSequence);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [reducedMotion] = useState(prefersReducedMotion);
  // With reduced motion one bubble stays put instead of popping in and out
  const [bubble, setBubble] = useState<number | null>(() =>
    reducedMotion ? randomBubble() : null
  );
  const scene = scenes[sceneIndex];
  const shownBubble = scene.bubble ?? (scene.pose === 'coding' ? bubble : null);

  // Advance through the poses; after waking up, a new day starts with a fresh shuffle
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sceneIndex === scenes.length - 1) {
        setScenes(buildSequence());
        setSceneIndex(0);
      } else {
        setSceneIndex(sceneIndex + 1);
      }
      setFrame(0);
    }, scenes[sceneIndex].holdMs ?? HOLD_MS);
    return () => clearTimeout(timer);
  }, [sceneIndex, scenes]);

  // While coding, thought bubbles pop up at random moments with random content
  useEffect(() => {
    if (scene.pose !== 'coding' || reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      setBubble(randomBubble());
      timer = setTimeout(hide, BUBBLE_MS);
    };
    const hide = () => {
      setBubble(null);
      timer = setTimeout(show, 600 + Math.random() * 1400);
    };
    timer = setTimeout(show, 400 + Math.random() * 800);
    return () => clearTimeout(timer);
  }, [scene.pose, reducedMotion]);

  // Animate the current pose; with reduced motion it holds its first frame
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(
      () => setFrame((f) => (f + 1) % frames[scene.pose].length),
      scene.frameMs
    );
    return () => clearInterval(timer);
  }, [scene, reducedMotion]);

  // Wake up on any real input. Keys are swallowed so the press that dismisses
  // the scene doesn't also change the slide underneath; taps close it through
  // the overlay's own click, so they can't fall through to a link below.
  useEffect(() => {
    let origin: { x: number; y: number } | null = null;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };
    const onMove = (e: PointerEvent) => {
      origin ??= { x: e.clientX, y: e.clientY };
      if (Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > MOVE_TOLERANCE) onClose();
    };

    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('wheel', onClose, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('wheel', onClose);
    };
  }, [onClose]);

  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={`idle-scene fixed inset-0 z-50 cursor-pointer ${reducedMotion ? '' : 'idle-scene-fade'}`}
    >
      <p className="eyebrow absolute top-6 left-6 text-white/40">Press any key to return</p>

      <div className="absolute right-6 bottom-8 flex flex-col items-center md:right-14 md:bottom-12">
        {/* Pixel scale matches the sprite's (24 px across w-28 / w-32), so the bubble sits on its grid */}
        <div className="relative">
          <Sprite rows={frames[scene.pose][frame]} className="h-auto w-28 md:w-32" />
          {shownBubble !== null && (
            <Sprite
              rows={bubbles[shownBubble][frame % bubbles[shownBubble].length]}
              className="absolute -top-[2.33rem] left-[1.46rem] h-auto w-[4.08rem] md:-top-[2.67rem] md:left-[1.67rem] md:w-[4.67rem]"
            />
          )}
        </div>
        <p className="eyebrow mt-3 text-white/70">{scene.caption}</p>
      </div>
    </div>
  );
}
