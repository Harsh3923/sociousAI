export default function ConceptPanel({ concept }) {
  if (!concept) {
    return (
      <aside className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,24,0.92),rgba(12,18,32,0.82))] p-6 shadow-[0_0_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04))]" />

        <div className="relative">
          <h2 className="text-4xl font-semibold tracking-tight">
            Concept Explorer
          </h2>

          <p className="mt-6 text-lg leading-10 text-white/68">
            Click a concept node in the graph to inspect its meaning, related
            theories, and connected concepts.
          </p>
        </div>
      </aside>
    );
  }

  const title = concept.label || concept.id || "Concept";
  const description =
    concept.description ||
    "This node is part of the sociological concept network.";

  const theories = Array.isArray(concept.theories) ? concept.theories : [];
  const related = Array.isArray(concept.related) ? concept.related : [];

  return (
    <aside className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,24,0.94),rgba(12,18,32,0.84))] p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04))]" />

      <div className="relative">
        <h2 className="text-5xl font-semibold tracking-tight capitalize">
          {title}
        </h2>

        <p className="mt-8 text-lg leading-10 text-white/72">{description}</p>

        <div className="mt-10">
          <h3 className="text-sm uppercase tracking-[0.28em] text-white/42">
            Relevant Theories
          </h3>

          {theories.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {theories.map((theory) => (
                <span
                  key={theory}
                  className="rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2.5 text-base text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                >
                  {theory}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base leading-8 text-white/50">
              No linked theories for this node yet.
            </p>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-sm uppercase tracking-[0.28em] text-white/42">
            Related Concepts
          </h3>

          {related.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {related.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-black/18 px-5 py-2.5 text-base text-white/82"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base leading-8 text-white/50">
              No related concepts for this node yet.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}