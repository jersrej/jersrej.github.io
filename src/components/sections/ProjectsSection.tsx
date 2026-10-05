import type { SectionId } from '../../data/deck';
import { splitTitle, type Project } from '../../data/projects';
import { ProjectSlide } from '../ProjectSlide';
import { Slide } from '../Slide';

interface ProjectsSectionProps {
  /** Prefix of each project's hash, e.g. `work/polln` */
  section: SectionId;
  heading: string;
  /** One line on what this group of projects is */
  intro: string;
  projects: Project[];
  /** Highlighted in the index; in the deck, also the one project shown */
  activeIndex: number;
  /** Long page: list every project instead of showing one at a time */
  stacked?: boolean;
}

export const ProjectsSection = ({
  section,
  heading,
  intro,
  projects,
  activeIndex,
  stacked = false
}: ProjectsSectionProps) => {
  return (
    <div className="slide">
      {stacked && <h2 className="eyebrow mb-3 lg:hidden">{heading}</h2>}
      <p className="section-intro mb-10 max-w-xl text-lg leading-snug md:text-2xl deck:mb-4">
        {intro}
      </p>

      <div className="min-h-0 max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16 deck:flex-1">
        {/* Project index: stays put while the case study beside it changes */}
        <nav
          aria-label={`${heading} projects`}
          className="self-center max-lg:hidden short:hidden page:sticky page:top-24 page:self-start"
        >
          <h2 className="eyebrow">{heading}</h2>
          <ol className="mt-4 border-l border-line">
            {projects.map((p, i) => {
              const active = i === activeIndex;
              return (
                <li key={p.id}>
                  <a
                    href={`#${section}/${p.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                      active
                        ? 'border-accent font-medium text-ink'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    {splitTitle(p.title).name}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {stacked ? (
          <div>
            <div className="divide-y divide-line">
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  id={`${section}/${p.id}`}
                  aria-label={`Project: ${p.title}`}
                  className="scroll-mt-28 py-12 first:pt-0 last:pb-0 md:scroll-mt-24"
                >
                  <ProjectSlide project={p} position={i + 1} total={projects.length} />
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative min-h-0 max-lg:flex-1">
            {projects.map((p, i) => (
              <Slide key={p.id} as="article" offset={i - activeIndex} label={`Project: ${p.title}`}>
                <ProjectSlide project={p} position={i + 1} total={projects.length} />
              </Slide>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
