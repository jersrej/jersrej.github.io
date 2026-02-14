import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'projects', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'py-2' : 'py-3'}`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main header row */}
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="shrink-0">
            <h1
              className={`font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all ${isScrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}
            >
              Jerson Q. Conmigo
            </h1>
            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
              Senior Frontend Engineer — ReactJS · TypeScript · Web Developer
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-6 text-sm">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
                className={`py-2 cursor-pointer transition-all font-medium ${activeSection === 'home' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300 hover:text-cyan-400'}`}
              >
                Home
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className={`py-2 cursor-pointer transition-all font-medium ${activeSection === 'projects' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300 hover:text-cyan-400'}`}
              >
                Projects
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
                className={`py-2 cursor-pointer transition-all font-medium ${activeSection === 'about' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300 hover:text-cyan-400'}`}
              >
                About
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className={`py-2 cursor-pointer transition-all font-medium ${activeSection === 'contact' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300 hover:text-cyan-400'}`}
              >
                Contact
              </a>
            </nav>

            <a
              href="/Jerson-Conmigo-CV.pdf"
              target="_blank"
              className="px-4 py-2.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-xs font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Download CV
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Theme + CV Button - shows on same line as logo */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/Jerson-Conmigo-CV.pdf"
              target="_blank"
              className="px-3 py-1.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded text-[10px] font-medium whitespace-nowrap"
            >
              CV
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation - separate row below */}
        <nav className="md:hidden flex items-center justify-center gap-4 text-xs mt-3 pb-1 border-t border-gray-200 dark:border-white/5 pt-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className={`cursor-pointer transition-all font-medium ${activeSection === 'home' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Home
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className={`cursor-pointer transition-all font-medium ${activeSection === 'projects' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            className={`cursor-pointer transition-all font-medium ${activeSection === 'about' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className={`cursor-pointer transition-all font-medium ${activeSection === 'contact' ? 'text-cyan-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
