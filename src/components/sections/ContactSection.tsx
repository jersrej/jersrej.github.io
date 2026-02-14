interface ContactSectionProps {
  scrollY: number;
}

export const ContactSection = ({ scrollY }: ContactSectionProps) => {
  return (
    <section id="contact" className="min-h-screen py-32 flex items-center relative overflow-hidden">
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Available for consulting, contract work, and full-time opportunities.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

          <div className="relative">
            <div className="text-center mb-10">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 font-light">
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

                <p className="text-gray-500 dark:text-gray-500 text-xs">or</p>

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
                href="https://linkedin.com/in/jerson-conmigo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white rounded-xl font-medium border border-gray-300 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300"
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
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-400 transition-colors group"
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
  );
};
