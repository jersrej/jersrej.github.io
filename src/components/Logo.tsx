interface LogoProps {
  className?: string;
}

/**
 * The J. monogram, the same mark as the favicon and loading screen. Drawn
 * from the theme tokens, so it inverts with the theme. Inside a `group`, the
 * dot nudges sideways on hover.
 */
export const Logo = ({ className = 'size-7' }: LogoProps) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
    <rect width="32" height="32" rx="7" className="fill-ink" />
    <path
      d="M18.5 7.5v11a4.75 4.75 0 0 1-9.5 0"
      fill="none"
      strokeWidth="4"
      className="stroke-paper"
    />
    <rect
      x="22"
      y="19.25"
      width="4.5"
      height="4.5"
      className="fill-accent transition-[translate] duration-200 ease-out group-hover:translate-x-[1.5px] group-focus-visible:translate-x-[1.5px] motion-reduce:transition-none"
    />
  </svg>
);
