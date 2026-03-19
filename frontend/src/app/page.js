"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ConceptGraph from "@/components/ConceptGraph";
import TheoryCards from "@/components/TheoryCards";
import ConceptPanel from "@/components/ConceptPanel";

const initialData = {
  direct_answer:
    "People chase productivity because modern society often treats efficiency, achievement, and visible output as signs of worth.",
  quick_summary:
    "Productivity is socially rewarded and tied to identity, discipline, and status.",
  theory_comparison:
    "Marx focuses on capitalism, Weber on work ethic, Foucault on discipline, and Bourdieu on status.",
  key_concepts: ["capitalism", "discipline", "status", "labor"],
  nodes: [
    {
      id: "productivity",
      label: "productivity",
      group: "core",
      kind: "concept",
      description:
        "A social value tied to efficiency, achievement, ambition, and measurable output in modern life.",
      theories: ["Weber", "Foucault", "Bourdieu"],
      related: ["capitalism", "status", "discipline", "labor"],
    },
    {
      id: "capitalism",
      label: "capitalism",
      group: "economic",
      kind: "concept",
      description:
        "An economic system that prioritizes production, profit, and labor efficiency.",
      theories: ["Marx", "Weber"],
      related: ["labor", "class", "commodification"],
    },
    {
      id: "discipline",
      label: "discipline",
      group: "power",
      kind: "concept",
      description:
        "The regulation of behavior through norms, routines, and self-control.",
      theories: ["Foucault", "Weber"],
      related: ["surveillance", "self-control", "institutions"],
    },
    {
      id: "status",
      label: "status",
      group: "culture",
      kind: "concept",
      description:
        "A marker of prestige, distinction, and symbolic worth within social life.",
      theories: ["Bourdieu"],
      related: ["cultural capital", "distinction", "identity"],
    },
    {
      id: "marx",
      label: "Marx",
      group: "meta",
      kind: "theorist",
      description:
        "Karl Marx focused on capitalism, labor, and class conflict.",
      theories: [],
      related: ["capitalism", "labor", "class"],
    },
    {
      id: "weber",
      label: "Weber",
      group: "meta",
      kind: "theorist",
      description:
        "Max Weber examined rationalization and the Protestant work ethic.",
      theories: [],
      related: ["productivity", "discipline", "work ethic"],
    },
  ],
  links: [
    { source: "productivity", target: "capitalism", emphasis: true },
    { source: "productivity", target: "discipline", emphasis: true },
    { source: "productivity", target: "status", emphasis: true },
    { source: "capitalism", target: "marx" },
    { source: "productivity", target: "weber" },
  ],
  theory_cards: [
    {
      name: "Marx",
      concepts: ["capitalism", "labor"],
      text: "Capitalism links human value to productivity and measures people through labor and output.",
    },
    {
      name: "Weber",
      concepts: ["work ethic", "discipline"],
      text: "Productivity reflects moral discipline, efficiency, and the rational organization of social life.",
    },
  ],
};

export default function HomePage() {
  const [question, setQuestion] = useState(
    "Why are people obsessed with productivity?"
  );
  const [selectedNode, setSelectedNode] = useState(null);
  const [graphData, setGraphData] = useState({
    nodes: initialData.nodes,
    links: initialData.links,
  });
  const [theoryCards, setTheoryCards] = useState(initialData.theory_cards);
  const [directAnswer, setDirectAnswer] = useState(initialData.direct_answer);
  const [quickSummary, setQuickSummary] = useState(initialData.quick_summary);
  const [theoryComparison, setTheoryComparison] = useState(
    initialData.theory_comparison
  );
  const [keyConcepts, setKeyConcepts] = useState(initialData.key_concepts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!question.trim()) {
      setError("Please enter a sociological question.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze question.");
      }

      setGraphData({
        nodes: data.nodes || [],
        links: data.links || [],
      });
      setTheoryCards(data.theory_cards || []);
      setDirectAnswer(data.direct_answer || "");
      setQuickSummary(data.quick_summary || "");
      setTheoryComparison(data.theory_comparison || "");
      setKeyConcepts(data.key_concepts || []);
      setSelectedNode(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto bg-[#070B14] text-white">
      <Navbar />

      <section className="relative">
        <div className="absolute inset-0 socius-world-bg opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.14),transparent_42%)]" />

        <div className="relative mx-auto max-w-[1500px] px-4 py-4 lg:px-6">
          <SearchBar
            question={question}
            setQuestion={setQuestion}
            onAnalyze={handleAnalyze}
            loading={loading}
          />

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.75fr_360px]">
            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Direct Answer
                </h2>
                <p className="mt-4 text-lg leading-9 text-white/80">
                  {directAnswer}
                </p>

                {quickSummary && (
                  <>
                    <h3 className="mt-6 text-sm uppercase tracking-[0.22em] text-white/45">
                      Quick Summary
                    </h3>
                    <p className="mt-3 text-base leading-8 text-white/70">
                      {quickSummary}
                    </p>
                  </>
                )}

                {keyConcepts.length > 0 && (
                  <>
                    <h3 className="mt-6 text-sm uppercase tracking-[0.22em] text-white/45">
                      Key Concepts
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="rounded-full border border-white/12 bg-black/18 px-4 py-2 text-sm text-white/82"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div
                className="rounded-[28px] border border-white/10 bg-cover bg-center bg-no-repeat p-5 backdrop-blur-md"
                style={{ backgroundImage: "url('/world-map.png')" }}
              >
                <div className="mb-4 space-y-1 text-white/78">
                  <p className="text-[20px] font-medium">
                    {loading
                      ? "Analyzing Global Social Structures..."
                      : "Global Sociological Concept Network"}
                  </p>
                  <p className="text-[15px] text-white/60">
                    {loading
                      ? "Mapping Sociological Concepts..."
                      : "Dynamic concepts generated from the user question"}
                  </p>
                  <p className="text-[15px] text-white/60">
                    {loading
                      ? "Applying Theoretical Lenses..."
                      : "Interactive graph connected to sociological theory"}
                  </p>
                </div>

                <ConceptGraph
                  graphData={graphData}
                  onNodeClick={setSelectedNode}
                />
              </div>

              {theoryComparison && (
                <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Theory Comparison
                  </h2>
                  <p className="mt-4 text-base leading-8 text-white/75">
                    {theoryComparison}
                  </p>
                </div>
              )}
            </div>

            <ConceptPanel concept={selectedNode} />
          </div>

          <div className="mt-4">
            <TheoryCards cards={theoryCards} />
          </div>
        </div>
      </section>
    </main>
  );
}