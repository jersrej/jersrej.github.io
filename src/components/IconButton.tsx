import type { ReactNode } from 'react';

interface IconButtonProps {
  /** Accessible name, also shown as the tooltip */
  label: string;
  onClick: () => void;
  /** For on/off controls: whether the control is currently on */
  pressed?: boolean;
  className?: string;
  children: ReactNode;
}

export const IconButton = ({
  label,
  onClick,
  pressed,
  className = '',
  children
}: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={pressed}
    className={`group relative flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
      pressed
        ? 'border-accent text-accent'
        : 'border-line text-muted hover:border-ink hover:text-ink'
    } ${className}`}
  >
    {children}
    {/* Tooltip for pointer and keyboard users; the aria-label covers screen readers */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-full right-0 z-20 mt-2 rounded-sm bg-ink px-2 py-1 font-sans text-xs font-medium whitespace-nowrap text-paper opacity-0 transition-opacity delay-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {pressed === undefined ? label : `${label}: ${pressed ? 'on' : 'off'}`}
    </span>
  </button>
);
