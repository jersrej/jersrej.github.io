/**
 * Idle scene art. Each pose is a horizontal strip in public/idle/<pose>.webp,
 * sliced from the sheets in art/idle by scripts/slice-idle-sheets.swift.
 * `width` and `height` are one frame's size in the strip.
 */
export const poses = {
  coding: { frames: 2, width: 230, height: 202 },
  debugging: { frames: 2, width: 229, height: 200 },
  frustrated: { frames: 2, width: 231, height: 202 },
  idea: { frames: 2, width: 232, height: 221 },
  music: { frames: 2, width: 289, height: 226 },
  pancit: { frames: 2, width: 289, height: 211 },
  shipped: { frames: 2, width: 288, height: 206 },
  stretching: { frames: 2, width: 284, height: 188 },
  coffee: { frames: 2, width: 135, height: 224 },
  walking: { frames: 4, width: 138, height: 229 },
  running: { frames: 4, width: 181, height: 207 },
  adobo: { frames: 2, width: 226, height: 200 },
  petting: { frames: 4, width: 247, height: 188 },
  feeding: { frames: 2, width: 510, height: 208 },
  tv: { frames: 2, width: 501, height: 190 },
  reading: { frames: 2, width: 241, height: 178 },
  charging: { frames: 2, width: 441, height: 195 },
  playing: { frames: 2, width: 441, height: 187 },
  driving: { frames: 2, width: 512, height: 182 },
  toilet: { frames: 2, width: 173, height: 214 },
  scrolling: { frames: 4, width: 260, height: 214 },
  sleeping: { frames: 2, width: 256, height: 154 },
  waking: { frames: 2, width: 252, height: 234 }
} as const;

export type Pose = keyof typeof poses;

/**
 * Overlays drawn in code on top of the art: a grid of single-character pixels,
 * `.` transparent and every other character a key in `palette`.
 */
export const palette: Record<string, string> = {
  h: '#2a2320', // ink
  D: '#5a3b26', // coffee
  k: '#c9ced1', // bulb base
  w: '#eef0f3', // bubble, Z's
  v: '#9aa3ab', // steam
  r: '#e5484d', // stress mark, bug
  Y: '#ffd34d' // lightbulb
};

// Z's that float up and pile on over the sleeping pose, one more each frame
export const sleepZs: string[][] = [
  [
    '..........',
    '..........',
    '..........',
    '..........',
    '..........',
    'wwww......',
    '..w.......',
    '.w........',
    'wwww......'
  ],
  [
    '..........',
    '..........',
    '....wwww..',
    '......w...',
    '.....w....',
    'wwwwwww...',
    '..w.......',
    '.w........',
    'wwww......'
  ],
  [
    '.......www',
    '........w.',
    '....wwwww.',
    '......w...',
    '.....w....',
    'wwwwwww...',
    '..w.......',
    '.w........',
    'wwww......'
  ]
];

/**
 * Thought bubbles over the coding pose, picked at random each time one pops
 * up. Same outline for all, tail pointing down-left to the head. Most are a
 * single frame; the scribble flickers between two.
 */
export const bubbles: string[][][] = [
  // Headache scribble
  [
    [
      '...wwwwwwww...',
      '.wwwwwwwwwwww.',
      'wwwwhhhhwwwwww',
      'wwwhwwwwhwhhww',
      'wwwhwhhwwhwwhw',
      'wwwwhwwhhwwhww',
      '.wwwwhhwwhhww.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ],
    [
      '...wwwwwwww...',
      '.wwwwwwwwwwww.',
      'wwwhhhwwwhhwww',
      'wwhwwwhwhwwhww',
      'wwhwhwwhwwhwww',
      'wwwhhwhwhhwrww',
      '.wwwwwhhwwwrw.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ]
  ],
  // A bug
  [
    [
      '...wwwwwwww...',
      '.wwwwwwwwwwww.',
      'wwwwhwwwwhwwww',
      'wwwwwrrrrwwwww',
      'wwwhrrhhrrhwww',
      'wwwwwrrrrwwwww',
      '.wwwhwwwwhwww.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ]
  ],
  // ?!
  [
    [
      '...wwwwwwww...',
      '.wwwwwwwwwwww.',
      'wwwwhhhwwrwwww',
      'wwwwwwhwwrwwww',
      'wwwwwhwwwrwwww',
      'wwwwwwwwwwwwww',
      '.wwwwhwwwrwww.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ]
  ],
  // An idea
  [
    [
      '...wwwwwwww...',
      '.wwwwwYYwwwww.',
      'wwwwwYYYYwwwww',
      'wwwwwYYYYwwwww',
      'wwwwwwYYwwwwww',
      'wwwwwwkkwwwwww',
      '.wwwwwkkwwwww.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ]
  ],
  // Need coffee
  [
    [
      '...wwwwwwww...',
      '.wwwwvwvwwwww.',
      'wwwwvwvwwwwwww',
      'wwwwDDDDwwwwww',
      'wwwwDDDDDwwwww',
      'wwwwDDDDwwwwww',
      '.wwwwDDwwwwww.',
      '...wwwwwwww...',
      '.ww...........',
      'w.............'
    ]
  ]
];
