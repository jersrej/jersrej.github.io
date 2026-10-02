import { useLayoutEffect, useRef, type ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Modal built on the native <dialog>: the browser handles the focus trap,
 * Escape, making the page behind inert, and returning focus on close.
 */
export const Dialog = ({ open, onClose, label, className = '', children }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    dialog.showModal();
    // The browser focuses the first control; let content name a better one
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      // `close` fires asynchronously; ignore it if the dialog has been reopened since
      onClose={(e) => {
        if (!e.currentTarget.open) onClose();
      }}
      // A click on the backdrop lands on the dialog element itself
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-auto w-[min(34rem,calc(100vw-2rem))] rounded-lg border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 ${className}`}
    >
      {open && children}
    </dialog>
  );
};
