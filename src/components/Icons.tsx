interface IconProps {
  className?: string;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true
} as const;

export const ChevronLeftIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRightIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const ArrowRightIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = ({ className = 'size-3.5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const DownloadIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
  </svg>
);

export const SunIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

export const MonitorIcon = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);
