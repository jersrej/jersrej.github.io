import type { Pose } from './idleSprites';

/**
 * `bubble` pins one thought bubble (an index into `bubbles`) for the whole pose;
 * `holdMs` overrides how long the pose plays.
 */
export type Scene = {
  pose: Pose;
  caption: string;
  frameMs: number;
  bubble?: number;
  holdMs?: number;
};

const QUESTION_BUBBLE = 2;

// A day: opens on coding and ends with bedtime and waking up, then the next day
// starts. In between, a random handful of these groups plays in random order; a
// group's poses always stay together and in order.
export const OPENING: Scene[] = [{ pose: 'coding', caption: 'Coding…', frameMs: 300 }];
export const MIDDLE: Scene[][] = [
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
export const ENDING: Scene[] = [
  // Two full rounds of scrolling until the phone lands on his face
  { pose: 'scrolling', caption: 'Scrolling…', frameMs: 900, holdMs: 7200 },
  { pose: 'sleeping', caption: 'Sleeping…', frameMs: 900, holdMs: 15000 },
  { pose: 'waking', caption: 'Waking up…', frameMs: 900 }
];

/** Every pose once, in the order of a day; the gallery lists them like this */
export const allScenes: Scene[] = [...OPENING, ...MIDDLE.flat(), ...ENDING];
