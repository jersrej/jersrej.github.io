import { useEffect } from 'react';

interface DeckInputOptions {
  step: (delta: number) => void;
  go: (index: number) => void;
  lastIndex: number;
}

const WHEEL_THRESHOLD = 40;
const WHEEL_QUIET_MS = 140;
const SWIPE_DISTANCE = 48;
const SWIPE_MAX_MS = 800;

// The deck holds still behind the command palette and other dialogs
const overlayOpen = () => document.querySelector('dialog[open]') !== null;

/**
 * Keyboard, wheel/trackpad and touch navigation for the deck.
 */
export function useDeckInput({ step, go, lastIndex }: DeckInputOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || overlayOpen()) return;
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable]')) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          step(1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          step(-1);
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(lastIndex);
          break;
        case ' ':
          // Space still activates a focused link or button
          if (target.closest('a, button')) return;
          step(e.shiftKey ? -1 : 1);
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, go, lastIndex]);

  // One wheel gesture moves one slide: after stepping, input stays locked
  // until the wheel has gone quiet, which swallows trackpad inertia
  useEffect(() => {
    let accumulated = 0;
    let locked = false;
    let quietTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || overlayOpen()) return; // ctrl+wheel is pinch-zoom

      clearTimeout(quietTimer);
      quietTimer = setTimeout(() => {
        accumulated = 0;
        locked = false;
      }, WHEEL_QUIET_MS);

      if (locked) return;
      accumulated += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(accumulated) >= WHEEL_THRESHOLD) {
        step(accumulated > 0 ? 1 : -1);
        locked = true;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      clearTimeout(quietTimer);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [step]);

  useEffect(() => {
    let start: { x: number; y: number; time: number } | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || overlayOpen()) {
        start = null;
        return;
      }
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY, time: Date.now() };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!start) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const elapsed = Date.now() - start.time;
      start = null;

      const distance = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
      if (elapsed > SWIPE_MAX_MS || Math.abs(distance) < SWIPE_DISTANCE) return;
      // Swiping left or up advances, right or down goes back
      step(distance < 0 ? 1 : -1);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [step]);
}
