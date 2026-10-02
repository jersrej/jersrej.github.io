import { splitTitle, type Project } from '../../data/projects';
import { ProjectSlide } from '../ProjectSlide';
import { Slide } from '../Slide';

interface ProjectsSectionProps {
  projects: Project[];
  activeIndex: number;
}

export const ProjectsSection = ({ projects, activeIndex }: ProjectsSectionProps) => {
  return (
    <div className="mx-auto grid h-full max-w-6xl px-5 py-5 md:px-10 md:py-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16 short:py-2">
      {/* Project index: stays put while the case study beside it changes */}
      <nav aria-label="Projects" className="self-center max-lg:hidden short:hidden">
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

      <div className="relative min-h-0">
        {projects.map((p, i) => (
          <Slide key={p.id} as="article" offset={i - activeIndex} label={`Project: ${p.title}`}>
            <ProjectSlide project={p} position={i + 1} total={projects.length} />
          </Slide>
        ))}
      </div>
    </div>
  );
};
