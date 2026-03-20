export default function TheoryCards({ cards }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.name}
          className="overflow-hidden rounded-[20px] border border-white/10 bg-white/6 backdrop-blur-xl"
        >
          <div className="h-14 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(139,92,246,0.12),rgba(0,0,0,0.15))]" />
          <div className="space-y-2 p-3">
            <h3 className="text-lg font-semibold">{card.name}</h3>

            <div className="flex flex-wrap gap-1.5">
              {card.concepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full border border-white/15 bg-black/20 px-2 py-0.5 text-[11px] text-white/85"
                >
                  {concept}
                </span>
              ))}
            </div>

            <p className="text-xs leading-5 text-white/72">{card.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}