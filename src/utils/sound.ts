let context: AudioContext | undefined;

type AudioSessionNavigator = Navigator & { audioSession?: { type: string } };

const getContext = () => {
  if (!context) {
    // iOS routes Web Audio through the ringer by default, so the silent switch
    // mutes it; the "playback" session plays like media instead (Safari 16.4+)
    const session = (navigator as AudioSessionNavigator).audioSession;
    if (session) session.type = 'playback';
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    context = new Ctor();
  }
  return context;
};

/**
 * A menu-cursor blip in the spirit of Suikoden II's: a soft square-wave pip
 * that steps up in pitch, synthesized so there is no audio file to load.
 */
const blip = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(1568, now);
  oscillator.frequency.setValueAtTime(2093, now + 0.018);

  // Take the edge off the square wave so it reads as a pip, not a buzz
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3800, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.002);
  gain.gain.setValueAtTime(0.035, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  oscillator.connect(filter).connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.075);
};

/**
 * Plays the navigation sound. While the browser is still holding audio back,
 * the tick plays only if resuming succeeds straight away, so blocked ticks
 * never pile up and burst out later.
 */
export const playTick = () => {
  try {
    const ctx = getContext();
    if (ctx.state === 'running') return blip(ctx);

    const requested = performance.now();
    void ctx.resume().then(() => {
      if (performance.now() - requested < 150) blip(ctx);
    });
  } catch {
    // Audio is unavailable; navigation works without it
  }
};

/** Call from a user gesture (click, tap, key press) so later ticks can play */
export const unlockAudio = () => {
  try {
    const ctx = getContext();
    void ctx.resume();
    // Older iOS only unlocks once something actually plays inside the gesture
    const source = ctx.createBufferSource();
    source.buffer = ctx.createBuffer(1, 1, 22050);
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Audio is unavailable
  }
};

// Events browsers accept as user activation; pointerdown and touchstart are not on iOS
const gestureEvents = ['pointerup', 'touchend', 'click', 'keydown'] as const;

/**
 * Unlocks audio on the visitor's next interaction with the page, so a sound
 * preference saved on an earlier visit works without toggling it again.
 * Returns a cleanup function.
 */
export const unlockOnFirstGesture = () => {
  const handler = () => {
    unlockAudio();
    if (context?.state === 'running') stop();
  };
  const stop = () => gestureEvents.forEach((e) => window.removeEventListener(e, handler, true));

  gestureEvents.forEach((e) => window.addEventListener(e, handler, true));
  return stop;
};
