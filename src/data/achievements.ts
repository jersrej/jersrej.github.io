export type AchievementId =
  | 'palette'
  | 'konami'
  | 'exterminator'
  | 'sat-still'
  | 'whole-day'
  | 'grand-tour'
  | 'dress-up'
  | 'paper-trail'
  | 'night-owl';

export type Achievement = {
  id: AchievementId;
  title: string;
  /** How it was earned, shown once unlocked */
  description: string;
  /** A nudge shown while it's still locked */
  hint: string;
};

/** Squashing this many bugs in one Bug Hunter run earns `exterminator` */
export const EXTERMINATOR_SCORE = 15;

export const achievements: Achievement[] = [
  {
    id: 'palette',
    title: 'Power user',
    description: 'Opened the command menu.',
    hint: 'Every good app has a ⌘K.'
  },
  {
    id: 'grand-tour',
    title: 'Grand tour',
    description: 'Visited every slide.',
    hint: 'See it all.'
  },
  {
    id: 'dress-up',
    title: 'Dress-up',
    description: 'Changed the look or the accent color.',
    hint: 'Try on a different outfit.'
  },
  {
    id: 'konami',
    title: '↑↑↓↓←→←→BA',
    description: 'Entered the Konami code.',
    hint: 'A classic cheat code.'
  },
  {
    id: 'exterminator',
    title: 'Exterminator',
    description: `Squashed ${EXTERMINATOR_SCORE} bugs in one run of Bug Hunter. Unlocks the Retro look.`,
    hint: `Squash ${EXTERMINATOR_SCORE} bugs in one run.`
  },
  {
    id: 'sat-still',
    title: 'Sat still',
    description: 'Let the idle scene start on its own.',
    hint: 'Leave the page alone for a minute.'
  },
  {
    id: 'whole-day',
    title: 'A day in the life',
    description: 'Watched a whole day of the idle scene, up to waking up. Unlocks the Retro look.',
    hint: 'Stay until morning.'
  },
  {
    id: 'paper-trail',
    title: 'Paper trail',
    description: 'Printed the portfolio.',
    hint: 'Some people still like paper.'
  },
  {
    id: 'night-owl',
    title: 'Night owl',
    description: 'Visited between midnight and 4 a.m.',
    hint: 'Come back very late.'
  }
];

/** Earning either of these unlocks the Retro look */
export const RETRO_UNLOCKS: AchievementId[] = ['exterminator', 'whole-day'];
