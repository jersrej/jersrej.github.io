/**
 * Skip to main content link component
 * Should be the first focusable element on the page
 */
export const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:rounded-md"
  >
    Skip to main content
  </a>
);
