/**
 * GoatCounter (https://www.goatcounter.com): cookieless, so no consent banner.
 * Its script is added here rather than in index.html so automatic counting can
 * stay off: the deck routes by hash, so every slide is counted as its own page
 * through `trackView`, and easter eggs and outbound links through `trackEvent`.
 * Only the live site sends anything, not the dev server or a local preview.
 */
const ENDPOINT = 'https://jersrej.goatcounter.com/count';
const SCRIPT_SRC = 'https://gc.zgo.at/count.js';
const enabled = window.location.hostname === 'jersrej.github.io';

type Hit = { path: string; title?: string; event?: boolean };

declare global {
  interface Window {
    goatcounter?: { count?: (hit: Hit) => void };
  }
}

// count.js loads async; hits from before it arrives wait here
const pending: Hit[] = [];

const send = (hit: Hit) => {
  if (!enabled) return;
  const count = window.goatcounter?.count;
  if (count) count(hit);
  else pending.push(hit);
};

/** A slide or section, by its hash ("work/bbsdt"); the intro is "/" */
export const trackView = (hash: string, title: string) =>
  send({ path: hash === 'intro' ? '/' : `/${hash}`, title });

/** Something worth counting that isn't a page, e.g. "idle-scene/auto" */
export const trackEvent = (name: string) => send({ path: name, event: true });

export function initAnalytics() {
  if (!enabled) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = SCRIPT_SRC;
  script.dataset.goatcounter = ENDPOINT;
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
  script.onload = () => pending.splice(0).forEach(send);
  document.head.append(script);

  // Every link that leaves the site opens a new tab: CV, GitHub, LinkedIn, project sites
  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as Element).closest?.('a[target="_blank"]');
      if (link instanceof HTMLAnchorElement) trackEvent(`outbound/${link.href}`);
    },
    { capture: true }
  );
}
