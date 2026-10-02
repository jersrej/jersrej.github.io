// Mirrors the #loader rules in styles.css: it fades in after APPEAR_MS
const APPEAR_MS = 200;
const MIN_VISIBLE_MS = 550;
const FADE_MS = 200;
const FONT_WAIT_MS = 2500;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Removes the static loading screen from index.html once the app has rendered
 * and its web fonts are in. A fast load never shows it at all; if it has
 * already appeared, it stays long enough to read rather than flashing.
 */
export async function dismissLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Let the first render reach the screen so its fonts start loading
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await Promise.race([document.fonts.ready, wait(FONT_WAIT_MS)]);

  const elapsed = performance.now();
  if (elapsed > APPEAR_MS) {
    await wait(Math.max(0, APPEAR_MS + MIN_VISIBLE_MS - elapsed));
    loader.classList.add('is-leaving');
    await wait(FADE_MS);
  }
  loader.remove();
}
