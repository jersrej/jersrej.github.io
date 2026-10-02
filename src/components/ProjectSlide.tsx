import { splitTitle, type Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';

interface ProjectSlideProps {
  project: Project;
  position: number;
  total: number;
}

const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, '');

export const ProjectSlide = ({ project, position, total }: ProjectSlideProps) => {
  const { name, role } = splitTitle(project.title);

  return (
    <div className="flex h-full flex-col justify-center">
      {/* With a screenshot the title block shares its row; without one it is unchanged */}
      <div
        className={
          project.screenshot
            ? 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:gap-10'
            : ''
        }
      >
        <div>
          <p className="eyebrow">
            <span className="text-ink">{String(position).padStart(2, '0')}</span> /{' '}
            {String(total).padStart(2, '0')}
            <span className="mx-2">·</span>
            {role}
            {project.featured && (
              <span className="text-accent deck:max-md:hidden">
                <span className="mx-2 text-muted">·</span>
                Featured
              </span>
            )}
          </p>

          <h2 className="mt-3 font-display text-[clamp(2rem,min(6vw,10vh),4.5rem)] leading-none font-semibold tracking-tight short:mt-1.5 short:text-3xl">
            {name}
          </h2>

          <p className="mt-3 max-w-2xl text-lg leading-snug md:text-xl short:mt-2 short:text-base">
            {project.tagline}
          </p>
        </div>
        {project.screenshot && (
          <img
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="aspect-16/10 w-full rounded-md border border-line object-cover deck:max-lg:hidden"
          />
        )}
      </div>

      <div className="mt-6 grid gap-x-12 border-t border-line pt-5 md:grid-cols-2 short:mt-3 short:pt-3 tiny:hidden">
        <div className="short:md:col-span-2">
          <h3 className="eyebrow short:hidden">Outcome</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted md:text-base short:mt-0 short:line-clamp-2 short:text-sm">
            {project.impact}
          </p>
        </div>
        <div className="roomy max-md:mt-5">
          <h3 className="eyebrow">What I did</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {project.contributions.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 short:mt-3">
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.split(' · ').map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-line bg-surface px-2 py-1 font-mono text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-sm font-medium"
            aria-label={`Visit ${name} website (opens in a new tab)`}
          >
            Visit {hostname(project.link)}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-sm font-medium"
            aria-label={`${name} source code on GitHub (opens in a new tab)`}
          >
            <GitHubIcon className="size-3.5" />
            Source
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};
