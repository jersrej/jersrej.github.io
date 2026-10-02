import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { links } from '../../data/links';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';
import { CopyButton } from '../CopyButton';

export const ContactSection = () => {
  return (
    <div className="slide">
      <h2 className="eyebrow">Get in touch</h2>

      <p className="mt-3 max-w-xl text-lg leading-snug md:text-2xl short:text-base">
        Available for consulting, contract work, and full-time opportunities.
      </p>

      <a
        href={`mailto:${links.email}`}
        className="mt-8 self-start font-display text-[clamp(1.25rem,min(5.4vw,11vh),3.75rem)] leading-tight font-semibold tracking-tight underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent short:mt-4"
      >
        {links.email}
      </a>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted short:mt-2">
        <CopyButton text={links.email} label="Copy email" />
        <span className="mx-1" aria-hidden="true">
          ·
        </span>
        <Mail className="size-3.5" aria-hidden="true" />
        or
        <a href={`mailto:${links.emailAlt}`} className="text-link text-ink">
          {links.emailAlt}
        </a>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4 short:mt-4">
        <a href={links.cv} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <Download className="size-4" aria-hidden="true" />
          Download CV
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          <LinkedInIcon />
          LinkedIn
          <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn">
          <GitHubIcon />
          GitHub
          <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />
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
