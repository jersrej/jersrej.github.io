import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { LoadingScreen } from '../components/LoadingScreen';
import { ScrollProgress } from '../components/ScrollProgress';
import { AnimatedStats } from '../components/AnimatedStats';
import { Testimonials } from '../components/Testimonials';
import { FloatingParticles } from '../components/FloatingParticles';
import { MagneticCursor } from '../components/MagneticCursor';

export default function SinglePage() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

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

  // Track scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startYear = 2011;
  const reactStartYear = 2018;
  const yearsOfExperience = new Date().getFullYear() - startYear;
  const yearsWithReact = new Date().getFullYear() - reactStartYear;
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <FloatingParticles />
      <MagneticCursor />

      <main className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {/* Hero/Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-24"
        >
          {/* Animated Gradient Orbs with Parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-20 -left-20 w-96 h-96 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            ></div>
            <div
              className="absolute top-40 -right-20 w-96 h-96 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
            ></div>
            <div
              className="absolute -bottom-20 left-1/2 w-96 h-96 bg-linear-to-r from-green-500 to-teal-500 rounded-full blur-3xl opacity-10"
              style={{ transform: `translate(-50%, ${-scrollY * 0.1}px)` }}
            ></div>
          </div>

          <div
            className="max-w-6xl mx-auto px-4 md:px-6 text-center z-10 relative"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 800)
            }}
          >
            <div className="mb-4 md:mb-6 inline-block">
              <span className="text-xs md:text-sm font-mono text-cyan-400 bg-cyan-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-cyan-400/20">
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight px-4">
              Jerson Q. Conmigo
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-6 md:mb-8 tracking-wide px-4">
              Senior Frontend Engineer
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4">
              I architect and deliver enterprise-scale frontend systems with a strong emphasis on
              reliability, maintainability, and long-term product stability.
            </p>

            {/* Featured Projects Preview with Glassmorphism */}
            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4">
              {featured.map((p, index) => (
                <div
                  key={p.id}
                  className="group relative bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105 hover:bg-white/10"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <h4 className="font-semibold text-lg mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{p.tagline}</p>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-2.5 px-5 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                      >
                        <span>Visit site</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40"
              >
                <span className="relative z-10">View All Projects</span>
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-sm text-white rounded-lg font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Scroll Indicator - Repositioned to bottom right */}
          <div
            className="fixed bottom-8 right-8 z-20 animate-bounce"
            style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
          >
            <div className="relative group">
              <div className="w-8 h-12 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2 bg-slate-900/30 backdrop-blur-sm hover:border-cyan-400 transition-colors">
                <div className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              </div>
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-cyan-400 font-medium">Scroll down</span>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Stats Section */}
        <AnimatedStats />

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-32 relative">
          {/* Section Background with Parallax */}
          <div
            className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-800/50 to-slate-900"
            style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
          ></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
                Portfolio
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
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

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
          {/* Parallax Background Elements */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ transform: `translateY(${(scrollY - 1600) * 0.15}px)` }}
          >
            <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
                Background
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </div>

            {/* Main Bio Card with Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-white/10 mb-12 hover:border-white/20 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

              <div className="relative space-y-6">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  I am a <span className="text-cyan-400 font-medium">Senior Frontend Engineer</span>{' '}
                  with <span className="text-cyan-400 font-medium">{yearsOfExperience} years</span>{' '}
                  of industry experience and over{' '}
                  <span className="text-cyan-400 font-medium">{yearsWithReact} years</span>{' '}
                  specializing in <span className="text-white font-medium">React, TypeScript,</span>{' '}
                  and modern JavaScript ecosystems. Throughout my career, I've delivered
                  enterprise-grade applications across healthcare, logistics, SaaS, e-commerce, and
                  automotive platforms.
                </p>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  My work centers on building{' '}
                  <span className="text-white font-medium">scalable UI architectures</span>,
                  establishing reusable component systems, owning frontend delivery, and
                  collaborating closely with backend and product teams to ensure technical
                  alignment. I bring strong experience across{' '}
                  <span className="text-white font-medium">
                    GraphQL, REST, CI/CD pipelines, cloud deployments,
                  </span>{' '}
                  and multi-environment release workflows.
                </p>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  Beyond hands-on engineering, I advocate for clean code, predictable state
                  management, accessibility, meaningful developer experience improvements, and
                  long-term maintainability. I enjoy taking ambiguous requirements, shaping the
                  technical direction, and driving features from concept to production with
                  reliability and attention to detail.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-white">Core Skills</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    React · TypeScript · GraphQL · REST APIs · TailwindCSS · UI Architecture ·
                    Component Libraries · State Management · Performance Optimization
                  </p>
                </div>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-white">Engineering Approach</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Strong focus on reliability, maintainability, and alignment with backend API
                    designs. I emphasize scalable patterns, predictable behavior, readable code, and
                    reducing tech debt through thoughtful engineering.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-green-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:to-teal-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-teal-500 rounded-xl mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-xl mb-3 text-white">Notable Achievements</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Led frontend architecture for multiple high-traffic applications, implemented
                    design systems, reduced bundle sizes significantly, and mentored junior
                    developers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen py-32 flex items-center relative overflow-hidden"
        >
          {/* Parallax Background */}
          <div
            className="absolute inset-0"
            style={{ transform: `translateY(${(scrollY - 2400) * 0.1}px)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
                Let's Connect
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                Available for consulting, contract work, and full-time opportunities.
              </p>
            </div>

            {/* Contact Card with Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

              <div className="relative">
                <div className="text-center mb-10">
                  <p className="text-base md:text-lg text-gray-300 mb-8 font-light">
                    Feel free to reach out via email:
                  </p>

                  <div className="space-y-3">
                    <a
                      href="mailto:jerson.conmigo@gmail.com"
                      className="group block text-lg md:text-xl font-medium bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-all duration-300"
                    >
                      jerson.conmigo@gmail.com
                      <div className="h-0.5 bg-linear-to-r from-cyan-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-0.5"></div>
                    </a>

                    <p className="text-gray-500 text-xs">or</p>

                    <a
                      href="mailto:jconmigo@yahoo.com"
                      className="group block text-lg md:text-xl font-medium bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
                    >
                      jconmigo@yahoo.com
                      <div className="h-0.5 bg-linear-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-0.5"></div>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                  <a
                    href="/Jerson-Conmigo-CV.pdf"
                    target="_blank"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="relative z-10">Download CV</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>

                  <a
                    href="https://linkedin.com/in/jersrej"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Top */}
            <div className="text-center mt-16">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span className="font-medium">Back to Top</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
