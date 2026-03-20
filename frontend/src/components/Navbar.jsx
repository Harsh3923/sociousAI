export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/40 bg-violet-500/10 text-lg font-bold text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            S
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Socius AI</h1>
            <p className="text-xs text-white/50">
              Global Culture Analyzer
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#" className="transition hover:text-white">
            AI Assistant
          </a>
          <a href="#" className="transition hover:text-white">
            Theory Explorer
          </a>
          <a href="#" className="transition hover:text-white">
            Saved Analyses
          </a>
          <a href="#" className="transition hover:text-white">
            About
          </a>
        </nav>

        <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
          Sign in
        </button>
      </div>
    </header>
  );
}