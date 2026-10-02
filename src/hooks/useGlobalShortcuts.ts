import { useEffect } from 'react';

interface GlobalShortcuts {
  onTogglePalette: () => void;
  onOpenShortcuts: () => void;
}

/**
 * Shortcuts that work in both views: ⌘K / Ctrl+K and `?`.
 */
export function useGlobalShortcuts({ onTogglePalette, onOpenShortcuts }: GlobalShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onTogglePalette();
        return;
      }

      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.closest('input, textarea, select, [contenteditable]')) return;
        if (document.querySelector('dialog[open]')) return;
        e.preventDefault();
        onOpenShortcuts();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePalette, onOpenShortcuts]);
}
