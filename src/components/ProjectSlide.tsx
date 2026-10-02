import { splitTitle, type Project } from '../data/projects';
import { ArrowUpRightIcon } from './Icons';

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
      <p className="eyebrow">
        <span className="text-ink">{String(position).padStart(2, '0')}</span> /{' '}
        {String(total).padStart(2, '0')}
        <span className="mx-2">·</span>
        {role}
      </p>

      <h2 className="mt-3 font-display text-[clamp(2rem,min(6vw,10vh),4.5rem)] leading-none font-semibold tracking-tight short:mt-1.5 short:text-3xl">
        {name}
      </h2>

      <p className="mt-3 max-w-2xl text-lg leading-snug md:text-xl short:mt-2 short:text-base">
        {project.tagline}
      </p>

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
            aria-label={`Visit ${name} website`}
          >
            {hostname(project.link)}
            <ArrowUpRightIcon />
          </a>
        )}
      </div>
    </div>
  );
};
