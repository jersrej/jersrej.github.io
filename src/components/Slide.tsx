import type { ReactNode } from 'react';

interface SlideProps {
  /** Position relative to the visible slide: 0 is visible, negative is before it, positive after */
  offset: number;
  label: string;
  as?: 'section' | 'article';
  children: ReactNode;
}

/**
 * One full-size layer of the deck. Every slide stays mounted; the hidden
 * ones are inert, so they are skipped by keyboard and assistive tech.
 */
export const Slide = ({ offset, label, as: Tag = 'section', children }: SlideProps) => {
  const active = offset === 0;
  // The outgoing slide clears quickly so the incoming text never overlaps it
  const state = active
    ? 'visible opacity-100 delay-100 duration-300'
    : `invisible opacity-0 duration-150 ${offset < 0 ? '-translate-x-4' : 'translate-x-4'}`;

  return (
    <Tag
      aria-label={label}
      inert={!active}
      className={`absolute inset-0 transition-[opacity,translate,visibility] ease-out motion-reduce:transition-none ${state}`}
    >
      {children}
    </Tag>
  );
};
