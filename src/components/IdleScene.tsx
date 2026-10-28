import { useEffect, useMemo, useState } from 'react';
import { ENDING, MIDDLE, OPENING, type Scene } from '../data/idleScenes';
import { unlock } from '../utils/achievements';
import { artUrl, bubbles, palette, poses, sleepZs, type Pose } from '../data/idleSprites';
import { IdleArt } from './IdleArt';

interface IdleSceneProps {
  onClose: () => void;
  /** Open on this pose (from the gallery) instead of at the start of the day */
  startPose?: Pose;
}

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

/**
 * Where the day starts when no pose was picked: whatever I'd be doing at the
 * visitor's local time. Working hours open on coding, the usual start.
 */
const poseForTime = (hour = new Date().getHours()): Pose | undefined => {
  if (hour >= 23 || hour < 5) return 'scrolling';
  if (hour < 9) return 'coffee';
  if (hour === 12) return 'pancit';
  if (hour >= 18 && hour < 20) return 'adobo';
  if (hour >= 20) return 'tv';
};

// Watching this many poses and then waking up counts as a whole day
const WHOLE_DAY_SCENES = 6;

const pickMiddle = (groups: Scene[][], count: number) => shuffle(groups).slice(0, count).flat();

// A starting pose plays out its group and the rest of that day, then days run as usual
const buildSequence = (start?: Pose): Scene[] => {
  const group = [OPENING, ...MIDDLE, ENDING].find((g) => g.some((s) => s.pose === start));
  if (!group || group === OPENING)
    return [...OPENING, ...pickMiddle(MIDDLE, MIDDLE_PICKS), ...ENDING];

  const rest = group.slice(group.findIndex((s) => s.pose === start));
  if (group === ENDING) return rest;
  return [
    ...rest,
    ...pickMiddle(
      MIDDLE.filter((g) => g !== group),
      MIDDLE_PICKS - 1
    ),
    ...ENDING
  ];
};

// Thought bubbles while coding: each stays up this long, with a random pause between them
const BUBBLE_MS = 2200;
const randomBubble = () => Math.floor(Math.random() * bubbles.length);

// Pointer movement smaller than this is hand tremor, not the visitor coming back
const MOVE_TOLERANCE = 12;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const preload = (pose: Pose) => {
  new Image().src = artUrl(pose);
};

/** Code-drawn overlay (bubbles, Z's): one <rect> per horizontal run of same-colored pixels */
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
export default function IdleScene({ onClose, startPose }: IdleSceneProps) {
  const [scenes, setScenes] = useState(() => buildSequence(startPose ?? poseForTime()));
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

  // Poses watched in this visit to the scene
  const [watched, setWatched] = useState(1);
  useEffect(() => {
    if (scene.pose === 'waking' && watched >= WHOLE_DAY_SCENES) unlock('whole-day');
  }, [scene.pose, watched]);

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
      setWatched((n) => n + 1);
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
      <p className="eyebrow absolute top-6 left-6 text-white/60">Press any key to return</p>

      <div className="absolute right-6 bottom-8 flex flex-col items-center md:right-14 md:bottom-12">
        {/* The spotlight and floor glow follow this box, whatever the pose's size */}
        <div className="idle-spot relative">
          <IdleArt pose={scene.pose} frame={tick % poses[scene.pose].frames} />
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
