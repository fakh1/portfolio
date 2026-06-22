export default function Footer() {
  return (
    <footer className="w-full h-14 px-6 bg-page-bg border-t border-gray flex items-center justify-between">
      <span className="text-xs font-medium text-text-secondary">
        &copy; 2026 Ahmed Fakhfakh
      </span>

      <span className="hidden sm:block text-xs font-medium text-text-secondary text-center max-w-md">
        AI Engineer building RAG systems, AI agents, and production-ready machine learning applications.
      </span>

      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/ahmed-fakhfakh-bb2754291"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/fakh1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
