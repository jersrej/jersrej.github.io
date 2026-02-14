import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Header = () => {
  const location = useLocation();
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
    <header className={`bg-white shadow fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between md:flex-row flex-col md:gap-0 gap-4">
        <div className="text-center md:text-left">
          <h1 className={`font-semibold transition-all ${isScrolled ? 'text-base' : 'text-lg'}`}>
            Jerson Q. Conmigo
          </h1>
          <p className="text-xs text-gray-600">
            Senior Frontend Engineer — Front End Developer · Web Developer · ReactJS · TypeScript
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="space-x-4 text-sm">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className={`py-2 cursor-pointer transition-colors ${activeSection === 'home' ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent'}`}
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className={`py-2 cursor-pointer transition-colors ${activeSection === 'projects' ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent'}`}
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className={`py-2 cursor-pointer transition-colors ${activeSection === 'about' ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent'}`}
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`py-2 cursor-pointer transition-colors ${activeSection === 'contact' ? 'text-accent font-medium' : 'text-gray-700 hover:text-accent'}`}
            >
              Contact
            </a>
          </nav>

          {/* Download CV Button */}
          <a
            href="/Jerson-Conmigo-CV.pdf"
            target="_blank"
            className="px-3 py-2 bg-accent text-white rounded text-xs font-medium hover:bg-opacity-90 transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};
