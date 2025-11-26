export const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Jerson Q. Conmigo</div>
        <div>
          <a href="mailto:jerson.conmigo@gmail.com" className="hover:underline">
            jerson.conmigo@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
