import { Project } from '../../data/projects';

interface HeroSectionProps {
  scrollY: number;
  featured: Project[];
}

export const HeroSection = ({ scrollY, featured }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-32 md:pt-24"
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className="absolute top-20 -left-20 w-96 h-96 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ transform: 'translateZ(0)' }}
        ></div>
        <div
          className="absolute top-40 -right-20 w-96 h-96 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ transform: 'translateZ(0)', animationDelay: '1s' }}
        ></div>
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-r from-green-500 to-teal-500 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ transform: 'translate(-50%, 0) translateZ(0)', animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center z-10 relative">
        <div className="mb-4 md:mb-6 inline-block">
          <span className="text-xs md:text-sm font-mono text-cyan-400 bg-cyan-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-cyan-400/20">
            Available for new opportunities
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight px-4">
          Jerson Q. Conmigo
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 dark:text-gray-300 mb-6 md:mb-8 tracking-wide px-4">
          Senior Frontend Engineer
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4">
          I architect and deliver enterprise-scale frontend systems with a strong emphasis on
          reliability, maintainability, and long-term product stability.
        </p>

        {/* Featured Projects Preview */}
        <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4">
          {featured.map((p, index) => (
            <div
              key={p.id}
              className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/10"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {p.tagline}
                </p>
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

        {/* CTA Buttons */}
        <div className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            aria-label="Navigate to projects section"
          >
            <span className="relative z-10">View All Projects</span>
            <svg
              className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            href="/Jerson-Conmigo-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Download Jerson Conmigo's CV (PDF)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CV
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Navigate to contact section"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="fixed bottom-8 right-8 z-20 animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        role="presentation"
        aria-hidden="true"
      >
        <div className="relative group">
          <div className="w-8 h-12 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm hover:border-cyan-400 transition-colors">
            <div className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
          </div>
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-xs text-cyan-400 font-medium">Scroll down</span>
          </div>
        </div>
      </div>
    </section>
  );
};
