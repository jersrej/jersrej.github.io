import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { bubbles, palette, poses, sleepZs, type Pose } from '../data/idleSprites';

interface IdleSceneProps {
  onClose: () => void;
}

/**
 * `bubble` pins one thought bubble (an index into `bubbles`) for the whole pose;
 * `holdMs` overrides how long the pose plays.
 */
type Scene = { pose: Pose; caption: string; frameMs: number; bubble?: number; holdMs?: number };

const QUESTION_BUBBLE = 2;

// A day: opens on coding and ends with bedtime and waking up, then the next day
// starts. In between, a random handful of these groups plays in random order; a
// group's poses always stay together and in order.
const OPENING: Scene[] = [{ pose: 'coding', caption: 'Coding…', frameMs: 300 }];
const MIDDLE: Scene[][] = [
  [{ pose: 'debugging', caption: 'Debugging…', frameMs: 350, bubble: QUESTION_BUBBLE }],
  [{ pose: 'frustrated', caption: 'Frustrated…', frameMs: 500 }],
  [{ pose: 'idea', caption: 'Eureka!', frameMs: 600 }],
  [{ pose: 'music', caption: 'Vibing…', frameMs: 450 }],
  [{ pose: 'pancit', caption: 'Pancit canton…', frameMs: 600 }],
  [{ pose: 'shipped', caption: 'Shipped!', frameMs: 300 }],
  [{ pose: 'stretching', caption: 'Stretching…', frameMs: 700 }],
  [{ pose: 'coffee', caption: 'Coffee…', frameMs: 600 }],
  [{ pose: 'walking', caption: 'Walking…', frameMs: 180 }],
  [{ pose: 'running', caption: 'Running…', frameMs: 110 }],
  [{ pose: 'adobo', caption: 'Cooking adobo…', frameMs: 450 }],
  [{ pose: 'petting', caption: 'Petting…', frameMs: 450 }],
  [{ pose: 'feeding', caption: 'Feeding the dogs…', frameMs: 700 }],
  [{ pose: 'tv', caption: 'TV…', frameMs: 800 }],
  [{ pose: 'reading', caption: 'Reading…', frameMs: 900 }],
  [{ pose: 'driving', caption: 'Driving…', frameMs: 200 }],
  [
    { pose: 'charging', caption: 'Charging…', frameMs: 700 },
    { pose: 'playing', caption: 'Playing…', frameMs: 600 }
  ],
  [{ pose: 'toilet', caption: 'Busy…', frameMs: 900 }]
];
const ENDING: Scene[] = [
  // Two full rounds of scrolling until the phone lands on his face
  { pose: 'scrolling', caption: 'Scrolling…', frameMs: 900, holdMs: 7200 },
  { pose: 'sleeping', caption: 'Sleeping…', frameMs: 900, holdMs: 15000 },
  { pose: 'waking', caption: 'Waking up…', frameMs: 900 }
];
const MIDDLE_PICKS = 6;
const HOLD_MS = 6000;

const shuffle = <T,>(list: T[]) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const buildSequence = () => [
  ...OPENING,
  ...shuffle(MIDDLE).slice(0, MIDDLE_PICKS).flat(),
  ...ENDING
];

// Thought bubbles while coding: each stays up this long, with a random pause between them
const BUBBLE_MS = 2200;
const randomBubble = () => Math.floor(Math.random() * bubbles.length);

// Pointer movement smaller than this is hand tremor, not the visitor coming back
const MOVE_TOLERANCE = 12;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const artUrl = (pose: Pose) => `/idle/${pose}.webp`;
const preload = (pose: Pose) => {
  new Image().src = artUrl(pose);
};

/** One frame of a pose's strip, sized by the scene's scale (--idle-k in styles.css) */
const Art = ({ pose, frame }: { pose: Pose; frame: number }) => {
  const { frames, width, height } = poses[pose];
  const style = {
    '--w': width,
    '--h': height,
    backgroundImage: `url(${artUrl(pose)})`,
    backgroundSize: `${frames * 100}% 100%`,
    backgroundPosition: `${frames > 1 ? (frame / (frames - 1)) * 100 : 0}% 0`
  } as CSSProperties;
  return <div className="idle-art" style={style} />;
};

/** Code-drawn overlay (bubbles, Z's): one <rect> per horizontal run of same-coloured pixels */
const Pixels = ({ rows, className }: { rows: string[]; className: string }) => {
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
 * waking up, then round again with a new mix. Shown after the visitor has been
 * idle for a while, or from the command menu. Any key, click, scroll or real
 * mouse movement brings the page back.
 */
export default function IdleScene({ onClose }: IdleSceneProps) {
  const [scenes, setScenes] = useState(buildSequence);
  const [sceneIndex, setSceneIndex] = useState(0);
  // Animation clock; each layer takes it modulo its own frame count
  const [tick, setTick] = useState(0);
  const [reducedMotion] = useState(prefersReducedMotion);
  // With reduced motion one bubble stays put instead of popping in and out
  const [bubble, setBubble] = useState<number | null>(() =>
    reducedMotion ? randomBubble() : null
  );
  const scene = scenes[sceneIndex];
  const shownBubble = scene.bubble ?? (scene.pose === 'coding' ? bubble : null);

  // Advance through the poses; after waking up, a new day starts with a fresh shuffle
  useEffect(() => {
    const isLast = sceneIndex === scenes.length - 1;
    // Fetch the next pose's art while this one plays, so it never pops in
    if (!isLast) preload(scenes[sceneIndex + 1].pose);
    const timer = setTimeout(() => {
      if (isLast) {
        setScenes(buildSequence());
        setSceneIndex(0);
      } else {
        setSceneIndex(sceneIndex + 1);
      }
      setTick(0);
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
    const timer = setInterval(() => setTick((t) => t + 1), scene.frameMs);
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
        {/* The spotlight and floor glow follow this box, whatever the pose's size */}
        <div className="idle-spot relative">
          <Art pose={scene.pose} frame={tick % poses[scene.pose].frames} />
          {shownBubble !== null && (
            <Pixels
              rows={bubbles[shownBubble][tick % bubbles[shownBubble].length]}
              className="absolute bottom-[102%] left-[30%] h-auto w-11 md:w-13"
            />
          )}
          {scene.pose === 'sleeping' && (
            <Pixels
              rows={sleepZs[reducedMotion ? sleepZs.length - 1 : tick % sleepZs.length]}
              className="absolute bottom-[66%] left-[45%] h-auto w-8 md:w-10"
            />
          )}
        </div>
        {/* Pose captions, hidden for now to see the scene without them */}
        {/* <p className="eyebrow mt-3 text-white/70">{scene.caption}</p> */}
      </div>
    </div>
  );
}
