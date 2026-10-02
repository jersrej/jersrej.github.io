// Mirrors the #loader rules in styles.css: it fades in after APPEAR_MS
const APPEAR_MS = 200;
const MIN_VISIBLE_MS = 550;
const FADE_MS = 200;
const FONT_WAIT_MS = 2500;
// The families from styles.css. Each is one variable font file, so one request covers every weight.
const WEB_FONTS = ['1em "Instrument Sans"', '1em "Martian Mono"'];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Removes the static loading screen from index.html once the app has rendered
 * and its web fonts are in. A fast load never shows it at all; if it has
 * already appeared, it stays long enough to read rather than flashing.
 */
export async function dismissLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Ask for the fonts directly rather than waiting for text to request them:
  // React may not have rendered yet, and `document.fonts.ready` would resolve early
  const fonts = Promise.all(WEB_FONTS.map((font) => document.fonts.load(font)));
  await Promise.race([fonts, wait(FONT_WAIT_MS)]).catch(() => undefined);
  // One frame for the app to paint in its real fonts before it is revealed
  await new Promise((resolve) => requestAnimationFrame(resolve));

  const elapsed = performance.now();
  if (elapsed > APPEAR_MS) {
    await wait(Math.max(0, APPEAR_MS + MIN_VISIBLE_MS - elapsed));
    loader.classList.add('is-leaving');
    await wait(FADE_MS);
  }
  loader.remove();
}
