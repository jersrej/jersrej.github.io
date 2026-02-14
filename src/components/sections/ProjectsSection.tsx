import { Project } from '../../data/projects';
import ProjectCard from '../ProjectCard';

interface ProjectsSectionProps {
  scrollY: number;
  projects: Project[];
}

export const ProjectsSection = ({ scrollY, projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="min-h-screen py-32 relative">
      {/* Section Background with Parallax */}
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-50 via-slate-100/50 to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900"
        style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            A collection of enterprise applications and products I've built and contributed to
            throughout my career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, index) => (
            <div
              key={p.id}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
