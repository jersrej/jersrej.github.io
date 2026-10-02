import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { links } from '../../data/links';
import { splitTitle } from '../../data/projects';
import {
  featured,
  reactStartYear,
  startYear,
  yearsOfExperience,
  yearsWithReact
} from '../../utils/constants';
import { GitHubIcon, LinkedInIcon } from '../BrandIcons';

export const HeroSection = () => {
  return (
    <div className="slide">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="mark bg-accent" aria-hidden="true" />
            Available for new opportunities
          </p>

          <h1 className="display mt-4 text-[clamp(2.75rem,min(9vw,15vh),5.75rem)] lg:text-[clamp(2.75rem,min(6.2vw,15vh),5.75rem)] short:mt-2">
            Jerson Q. Conmigo
            {/* The logo's square dot closes the name */}
            <span className="ml-[0.05em] inline-block size-[0.15em] bg-accent" aria-hidden="true" />
          </h1>

          <p className="mt-3 text-lg text-muted md:text-2xl">
            Senior Frontend Engineer — React · TypeScript
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed md:text-lg short:hidden">
            I architect and deliver enterprise-scale frontend systems with a strong emphasis on
            reliability, maintainability, and long-term product stability.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4 short:mt-4">
            <a href="#work" className="btn btn-primary">
              View work
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              aria-label="Download Jerson Conmigo's CV (PDF)"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
            <span className="flex gap-5 text-sm sm:ml-3">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <GitHubIcon />
                GitHub
                <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <LinkedInIcon />
                LinkedIn
                <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>

        <div className="roomy">
          <dl className="divide-y divide-line border-y border-line text-sm *:grid *:grid-cols-[6.5rem_minmax(0,1fr)] *:gap-x-4 *:py-2.5">
            <div>
              <dt className="eyebrow">Experience</dt>
              <dd>
                {yearsOfExperience} years, since {startYear}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">React</dt>
              <dd>
                {yearsWithReact} years, since {reactStartYear}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Domains</dt>
              <dd>Healthcare, logistics, SaaS, e-commerce, automotive</dd>
            </div>
            <div>
              <dt className="eyebrow">Featured</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {featured.map((p) => (
                  <a key={p.id} href={`#work/${p.id}`} className="text-link">
                    {splitTitle(p.title).name}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
