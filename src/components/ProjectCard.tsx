import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { useState } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="h-full bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden group relative hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top gradient indicator */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/3 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex gap-2 justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-yellow-400 text-xl animate-pulse" title="Featured Project">
              ⭐
            </span>
          )}
        </div>

        <p className="text-xs text-cyan-400 mb-4 font-medium">{project.tagline}</p>

        <p className="text-sm text-gray-300 mb-4 grow leading-relaxed">
          {project.contributions.join(' · ')}
        </p>

        {/* Tech stack badges */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.stack
              .split(' · ')
              .slice(0, 4)
              .map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10"
                >
                  {tech}
                </span>
              ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 px-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Site
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 text-center py-2.5 px-4 bg-white/5 border border-white/20 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
