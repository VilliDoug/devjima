export default function Footer() {
  return (
    <footer className="border-t border-gray-900 px-12 py-6 flex items-center justify-between">
      <span className="text-xs text-gray-700">© 2026 DevJima</span>
      <span className="text-xs text-gray-700">
        Built by{" "}
        <a href="https://github.com/VilliDoug" target="_blank" rel="noreferrer"
          className="text-devjima-teal no-underline hover:underline">
          VilliDoug
        </a>
        {" · "}
        <a href="https://github.com/VilliDoug/devjima" target="_blank" rel="noreferrer"
          className="text-devjima-teal no-underline hover:underline">
          GitHub
        </a>
      </span>
    </footer>
  );
}