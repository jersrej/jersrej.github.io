import { splitTitle, type Project } from '../../data/projects';
import { ProjectSlide } from '../ProjectSlide';
import { Slide } from '../Slide';

interface ProjectsSectionProps {
  projects: Project[];
  /** Highlighted in the index; in the deck, also the one project shown */
  activeIndex: number;
  /** Long page: list every project instead of showing one at a time */
  stacked?: boolean;
}

export const ProjectsSection = ({
  projects,
  activeIndex,
  stacked = false
}: ProjectsSectionProps) => {
  return (
    <div className="slide lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
      {/* Project index: stays put while the case study beside it changes */}
      <nav
        aria-label="Projects"
        className="self-center max-lg:hidden short:hidden page:sticky page:top-24 page:self-start"
      >
        <h2 className="eyebrow">Work</h2>
        <ol className="mt-4 border-l border-line">
          {projects.map((p, i) => {
            const active = i === activeIndex;
            return (
              <li key={p.id}>
                <a
                  href={`#work/${p.id}`}
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
          <h2 className="eyebrow mb-10 lg:hidden">Work</h2>
          <div className="divide-y divide-line">
            {projects.map((p, i) => (
              <article
                key={p.id}
                id={`work/${p.id}`}
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
  );
};
