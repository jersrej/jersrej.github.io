import { X } from 'lucide-react';
import type { ViewMode } from '../hooks/useViewMode';
import { Dialog } from './Dialog';

interface ShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
  mode: ViewMode;
}

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

// Only shortcuts that are actually wired up belong here
const shortcuts: { keys: string[]; action: string; deckOnly?: boolean }[] = [
  { keys: ['←', '→'], action: 'Previous / next slide', deckOnly: true },
  { keys: ['Space'], action: 'Next slide (Shift + Space goes back)', deckOnly: true },
  { keys: ['Home', 'End'], action: 'First / last slide', deckOnly: true },
  { keys: [isMac ? '⌘' : 'Ctrl', 'K'], action: 'Command palette' },
  { keys: ['?'], action: 'Keyboard shortcuts' },
  { keys: ['Esc'], action: 'Close a dialog' },
  { keys: ['↑↑↓↓←→←→', 'B', 'A'], action: 'Bug Hunter' }
];

export const ShortcutsDialog = ({ open, onClose, mode }: ShortcutsDialogProps) => (
  <Dialog open={open} onClose={onClose} label="Keyboard shortcuts">
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">Keyboard shortcuts</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-m-2 flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
        {shortcuts
          .filter((s) => mode === 'deck' || !s.deckOnly)
          .map((s) => (
            <div key={s.action} className="flex items-center justify-between gap-4 py-2.5">
              <dt>{s.action}</dt>
              <dd className="flex shrink-0 gap-1">
                {s.keys.map((k) => (
                  <kbd key={k} className="kbd">
                    {k}
                  </kbd>
                ))}
              </dd>
            </div>
          ))}
      </dl>

      {mode === 'deck' && (
        <p className="mt-4 text-sm text-muted">
          The mouse wheel, a trackpad swipe or a touch swipe also move between slides.
        </p>
      )}
    </div>
  </Dialog>
);
