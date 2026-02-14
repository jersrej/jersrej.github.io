import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function SinglePage() {
  const location = useLocation();

  // Scroll to section on hash change
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  const startYear = 2011;
  const reactStartYear = 2018;
  const yearsOfExperience = new Date().getFullYear() - startYear;
  const yearsWithReact = new Date().getFullYear() - reactStartYear;
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="relative">
      {/* Hero/Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Jerson Q. Conmigo</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Senior Frontend Engineer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            I architect and deliver enterprise-scale frontend systems with a strong emphasis on
            reliability, maintainability, and long-term product stability.
          </p>
          
          {/* Featured Projects Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-semibold text-lg mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{p.tagline}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2 px-4 bg-accent text-white text-sm font-medium rounded hover:bg-opacity-90 transition-colors"
                  >
                    Visit site
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen py-20 bg-white relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            A collection of enterprise applications and products I've built and contributed to
            throughout my career.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="transform hover:scale-105 transition-transform duration-300">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              I am a Senior Frontend Engineer with {yearsOfExperience} years of industry experience and
              over {yearsWithReact} years specializing in React, TypeScript, and modern JavaScript
              ecosystems. Throughout my career, I've delivered enterprise-grade applications across
              healthcare, logistics, SaaS, e-commerce, and automotive platforms.
            </p>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              My work centers on building scalable UI architectures, establishing reusable component
              systems, owning frontend delivery, and collaborating closely with backend and product
              teams to ensure technical alignment. I bring strong experience across GraphQL, REST, CI/CD
              pipelines, cloud deployments, and multi-environment release workflows.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              Beyond hands-on engineering, I advocate for clean code, predictable state management,
              accessibility, meaningful developer experience improvements, and long-term
              maintainability. I enjoy taking ambiguous requirements, shaping the technical direction,
              and driving features from concept to production with reliability and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-lg mb-3">Core Skills</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                React · TypeScript · GraphQL · REST APIs · TailwindCSS · UI Architecture · Component
                Libraries · State Management · Performance Optimization
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-lg mb-3">Engineering Approach</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Strong focus on reliability, maintainability, and alignment with backend API designs.
                I emphasize scalable patterns, predictable behavior, readable code, and reducing tech
                debt through thoughtful engineering.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-lg mb-3">Notable Achievements</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Led frontend architecture for multiple high-traffic applications, implemented design
                systems, reduced bundle sizes significantly, and mentored junior developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen py-20 bg-white flex items-center"
      >
        <div className="max-w-4xl mx-auto px-6 w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Get In Touch</h2>

          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-2">
                Feel free to reach out via email:
              </p>
              <a
                href="mailto:jerson.conmigo@gmail.com"
                className="text-xl text-accent font-semibold hover:underline"
              >
                jerson.conmigo@gmail.com
              </a>
              <p className="text-gray-600 mt-2">or</p>
              <a
                href="mailto:jconmigo@yahoo.com"
                className="text-xl text-accent font-semibold hover:underline"
              >
                jconmigo@yahoo.com
              </a>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <a
                href="/Jerson-Conmigo-CV.pdf"
                target="_blank"
                className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Download CV
              </a>
              <a
                href="https://linkedin.com/in/jersrej"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
