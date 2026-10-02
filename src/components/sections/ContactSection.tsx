import { ArrowUpRightIcon, DownloadIcon } from '../Icons';

export const ContactSection = () => {
  return (
    <div className="slide">
      <h2 className="eyebrow">Get in touch</h2>

      <p className="mt-3 max-w-xl text-lg leading-snug md:text-2xl short:text-base">
        Available for consulting, contract work, and full-time opportunities.
      </p>

      <a
        href="mailto:jerson.conmigo@gmail.com"
        className="mt-8 self-start font-display text-[clamp(1.25rem,min(5.4vw,11vh),3.75rem)] leading-tight font-semibold tracking-tight underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent short:mt-4"
      >
        jerson.conmigo@gmail.com
      </a>

      <p className="mt-4 text-sm text-muted short:mt-2">
        or{' '}
        <a href="mailto:jconmigo@yahoo.com" className="text-link text-ink">
          jconmigo@yahoo.com
        </a>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4 short:mt-4">
        <a
          href="/Jerson-Conmigo-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <DownloadIcon />
          Download CV
        </a>
        <a
          href="https://linkedin.com/in/jerson-conmigo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          LinkedIn
          <ArrowUpRightIcon />
        </a>
        <a
          href="https://github.com/jersrej"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          GitHub
          <ArrowUpRightIcon />
        </a>
      </div>

      <p className="mt-10 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 font-mono text-xs text-muted short:hidden">
        <span>© {new Date().getFullYear()} Jerson Q. Conmigo</span>
        <a href="#intro" className="text-link">
          Back to start
        </a>
      </p>
    </div>
  );
};
