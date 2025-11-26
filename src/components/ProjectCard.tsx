import { Link } from 'react-router-dom';
import { Project } from '../data/project';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full p-5 bg-white rounded-lg shadow-sm border flex flex-col">
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold">{project.title}</h3>
        {project.featured && (
          <span className="text-yellow-500" title="Featured Project">
            ⭐
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 mt-1">{project.tagline}</p>
      <p className="text-sm mt-3 grow">{project.contributions.join(' · ')}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">{project.stack}</div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-4 bg-[#075985] text-white text-sm font-medium rounded transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Visit site
          </a>
        )}
        <Link
          to={`/projects/${project.id}`}
          className="flex-1 text-center py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
