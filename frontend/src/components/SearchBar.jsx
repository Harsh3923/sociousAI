export default function SearchBar({
  question,
  setQuestion,
  onAnalyze,
  loading = false,
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-[24px] border border-white/10 bg-white/6 p-3 shadow-[0_0_60px_rgba(139,92,246,0.10)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a sociological question..."
            className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 text-xl text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={onAnalyze}
            disabled={loading}
            className="h-14 rounded-2xl border border-violet-400/40 bg-violet-500/15 px-7 text-lg font-medium text-violet-200 transition hover:bg-violet-500/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Analyzing..." : "Analyze Society"}
          </button>
        </div>
      </div>
    </div>
  );
}