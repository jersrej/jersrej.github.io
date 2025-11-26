import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { projects } from '../data/project';
import ProjectCard from '../components/ProjectCard';

function ProjectsList() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[1fr]">
        {projects.map((p) => (
          <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <button
        onClick={() => navigate('/projects')}
        className="text-xs px-3 py-1 border border-[#075985] text-accent rounded mb-4 cursor-pointer"
      >
        ← Back
      </button>

      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-xs text-gray-600 mt-1">{project.tagline}</p>

      <div className="mt-4">
        <h4 className="font-semibold">Contributions</h4>
        <ul className="list-disc ml-5 mt-2 text-sm">
          {project.contributions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <p className="mt-3 text-sm">
          <strong>Impact:</strong> {project.impact}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-2/3">
          <Routes>
            <Route path="/" element={<ProjectsList />} />
            <Route path=":id" element={<ProjectRoute />} />
          </Routes>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-5 self-start">
            <h4 className="font-semibold">About These Projects</h4>
            <p className="text-xs text-gray-600 mt-2">
              A collection of enterprise systems where I delivered frontend architecture, complex UI
              workflows, integration layers, and production-grade engineering across multiple
              domains.
            </p>

            <ul className="mt-4 text-xs text-gray-600 space-y-1">
              <li>• React + TypeScript architecture and component systems</li>
              <li>• API integration: GraphQL, REST, oData, custom services</li>
              <li>• End-to-end delivery across SaaS, healthcare, logistics</li>
              <li>• CI/CD pipelines, multi-env deployments, AWS/Azure</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectRoute() {
  // Pull id from URL
  const { pathname } = window.location;
  const id = pathname.split('/').pop() || '';
  return <ProjectDetail id={id} />;
}
