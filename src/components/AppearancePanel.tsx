import {
  Gamepad2,
  Lock,
  Monitor,
  Moon,
  SquareTerminal,
  Sun,
  Type,
  type LucideIcon
} from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { EXTERMINATOR_SCORE } from '../data/achievements';
import { accents, looks, type Accent, type Look } from '../hooks/useLook';
import type { Theme } from '../hooks/useTheme';

interface AppearancePanelProps {
  theme: Theme;
  onTheme: (theme: Theme) => void;
  look: Look;
  onLook: (look: Look) => void;
  accent: Accent;
  onAccent: (accent: Accent) => void;
  retroUnlocked: boolean;
  onClose: () => void;
}

const lookIcons: Record<Look, LucideIcon> = {
  classic: Type,
  terminal: SquareTerminal,
  retro: Gamepad2
};

const themes: { id: Theme; label: string; Icon: LucideIcon }[] = [
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'dark', label: 'Dark', Icon: Moon },
  { id: 'system', label: 'System', Icon: Monitor }
];

// The header's toggle points here with aria-controls
const PANEL_ID = 'appearance-panel';

const Group = ({ legend, children }: { legend: string; children: ReactNode }) => (
  <fieldset className="mt-4 first:mt-0">
    <legend className="eyebrow">{legend}</legend>
    {children}
  </fieldset>
);

/** A labelled option in a segmented row: a real radio, so arrow keys move between options */
const Segment = ({
  name,
  checked,
  disabled,
  onChange,
  Icon,
  children
}: {
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  Icon: LucideIcon;
  children: ReactNode;
}) => (
  <label className="flex-1">
    <input
      type="radio"
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className="peer sr-only"
    />
    <span className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-line text-xs font-medium text-muted transition-colors peer-checked:border-ink peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:text-ink peer-disabled:hover:text-muted">
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  </label>
);

/**
 * Theme, look and accent color in one place, opened from the header. Closes
 * on Escape (handing focus back to its toggle) or a click anywhere else.
 */
export const AppearancePanel = ({
  theme,
  onTheme,
  look,
  onLook,
  accent,
  onAccent,
  retroUnlocked,
  onClose
}: AppearancePanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector<HTMLInputElement>('input:checked:not(:disabled)')?.focus();

    // Clicks on the toggle are its own business, not "outside"
    const toggle = () => document.querySelector<HTMLElement>(`[aria-controls="${PANEL_ID}"]`);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onClose();
      toggle()?.focus();
    };
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!ref.current?.contains(target) && !toggle()?.contains(target)) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [onClose]);

  const ownColors = look !== 'classic';

  return (
    <div
      ref={ref}
      id={PANEL_ID}
      role="dialog"
      aria-label="Appearance"
      className="absolute top-full right-0 z-30 mt-2 w-[min(19rem,calc(100vw-2.5rem))] rounded-lg border border-line bg-surface p-4 text-ink shadow-2xl"
    >
      <Group legend="Accent color">
        <div className="mt-2.5 flex gap-2.5">
          {(Object.keys(accents) as Accent[]).map((id) => (
            <label key={id} title={accents[id]}>
              <input
                type="radio"
                name="accent"
                checked={accent === id}
                disabled={ownColors}
                onChange={() => onAccent(id)}
                className="peer sr-only"
              />
              <span className="sr-only">{accents[id]}</span>
              {/* data-accent makes --accent-pick this color, for the current theme */}
              <span
                data-accent={id}
                aria-hidden="true"
                className="block size-8 cursor-pointer rounded-full bg-(--accent-pick) ring-offset-2 ring-offset-surface transition-transform peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-35 hover:scale-110 peer-disabled:hover:scale-100 motion-reduce:transition-none"
              />
            </label>
          ))}
        </div>
        {ownColors && <p className="mt-2 text-xs text-muted">{looks[look]} uses its own colors.</p>}
      </Group>

      <Group legend="Look">
        <div className="mt-2.5 flex gap-1.5">
          {(Object.keys(looks) as Look[]).map((id) => {
            const locked = id === 'retro' && !retroUnlocked;
            return (
              <Segment
                key={id}
                name="look"
                checked={look === id}
                disabled={locked}
                onChange={() => onLook(id)}
                Icon={locked ? Lock : lookIcons[id]}
              >
                {looks[id]}
                {locked && <span className="sr-only"> (locked)</span>}
              </Segment>
            );
          })}
        </div>
        {!retroUnlocked && (
          <p className="mt-2 text-xs text-muted">
            Retro unlocks when you squash {EXTERMINATOR_SCORE} bugs in Bug Hunter or watch a whole
            day of the idle scene.
          </p>
        )}
      </Group>

      <Group legend="Theme">
        <div className="mt-2.5 flex gap-1.5">
          {themes.map(({ id, label, Icon }) => (
            <Segment
              key={id}
              name="theme"
              checked={theme === id}
              onChange={() => onTheme(id)}
              Icon={Icon}
            >
              {label}
            </Segment>
          ))}
        </div>
      </Group>
    </div>
  );
};
