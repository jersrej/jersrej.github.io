import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/project';

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold">Senior Frontend Engineer</h2>
        <p className="mt-3 text-sm text-gray-700">
          I architect and deliver enterprise-scale frontend systems with a strong emphasis on
          reliability, maintainability, and long-term product stability. My work focuses on building
          predictable, well-structured UI foundations that support complex business workflows and
          measurable outcomes.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[1fr]">
          {featured.map((p) => (
            <div key={p.id} className="h-full p-4 bg-white rounded-md border flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{p.title}</h4>
              </div>
              <p className="text-xs text-gray-600 mt-1 grow">{p.tagline}</p>
              <div className="flex items-center gap-2 mt-4">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-4 bg-[#075985] text-white text-sm font-medium rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit site
                  </a>
                )}
                <Link
                  to={`/projects/${p.id}`}
                  className="flex-1 text-center py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/projects"
            className="flex-1 text-center py-2 px-4 bg-[#075985] text-white text-sm font-medium rounded transition-colors"
          >
            See all projects
          </Link>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Professional Summary</h3>
          <p className="text-sm text-gray-700 mt-2">
            Senior Frontend Engineer with extensive experience delivering enterprise-grade
            applications across healthcare, logistics, SaaS platforms, and e-commerce. I specialize
            in React, TypeScript, scalable UI architecture, and modern frontend engineering
            practices.
          </p>
        </div>

        <aside className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold">Contact</h4>
          <p className="text-xs mt-2">
            <a href="mailto:jerson.conmigo@gmail.com" className="hover:underline">
              jerson.conmigo@gmail.com
            </a>
          </p>
          <p className="text-xs">
            <a href="mailto:jconmigo@yahoo.com" className="hover:underline">
              jconmigo@yahoo.com
            </a>
          </p>
          <div className="mt-3">
            <a className="text-xs underline" href="https://www.linkedin.com/in/jerson-conmigo">
              LinkedIn
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
