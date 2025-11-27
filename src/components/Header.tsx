import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const loc = useLocation();
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between md:flex-row flex-col md:gap-0 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-lg font-semibold">Jerson Q. Conmigo</h1>
          <p className="text-xs text-gray-600">
            Senior Frontend Engineer — Fullstack Developer · Front End Developer · Web Developer ·
            ReactJS · Typescript
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="space-x-4 text-sm">
            <Link
              to="/"
              className={`py-2 ${loc.pathname === '/' ? 'text-accent font-medium' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`py-2 ${loc.pathname.startsWith('/projects') ? 'text-accent font-medium' : 'text-gray-700'}`}
            >
              Projects
            </Link>
            <Link
              to="/about"
              className={`py-2 ${loc.pathname === '/about' ? 'text-accent font-medium' : 'text-gray-700'}`}
            >
              About
            </Link>
          </nav>

          {/* Download CV Button */}
          <a
            href="/Jerson-Conmigo-CV.pdf"
            target="_blank"
            className="px-3 py-2 bg-accent text-white rounded text-xs font-medium"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};
