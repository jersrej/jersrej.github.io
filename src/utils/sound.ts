let context: AudioContext | undefined;

/**
 * A short, quiet UI tick synthesized with the Web Audio API, so there is no
 * audio file to load. Browsers only allow audio after a user gesture; until
 * then the tick is skipped rather than queued.
 */
export const playTick = () => {
  try {
    context ??= new AudioContext();
    if (context.state !== 'running') {
      void context.resume();
      return;
    }

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1600, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.03);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  } catch {
    // Audio is unavailable; navigation works without it
  }
};

/** Call from a click handler so the browser lets later ticks play */
export const unlockAudio = () => {
  try {
    context ??= new AudioContext();
    void context.resume();
  } catch {
    // Audio is unavailable
  }
};
