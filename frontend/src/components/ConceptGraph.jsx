"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { forceCenter, forceCollide, forceX, forceY } from "d3-force";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

function normalizeId(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getEndpointId(endpoint) {
  if (typeof endpoint === "object" && endpoint !== null) {
    return normalizeId(endpoint.id ?? endpoint.label ?? "");
  }
  return normalizeId(endpoint);
}

export default function ConceptGraph({ graphData, onNodeClick }) {
  const graphRef = useRef(null);
  const containerRef = useRef(null);

  const [size, setSize] = useState({
    width: 900,
    height: 560,
  });

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;

      setSize({
        width: containerRef.current.clientWidth || 900,
        height: containerRef.current.clientHeight || 560,
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const preparedData = useMemo(() => {
    const width = size.width || 900;
    const height = size.height || 560;
    const cx = width / 2;
    const cy = height / 2 + 18;

    const rawNodes = Array.isArray(graphData?.nodes) ? graphData.nodes : [];
    const rawLinks = Array.isArray(graphData?.links) ? graphData.links : [];

    const normalizedNodes = rawNodes.map((node, index) => {
      const id = normalizeId(node.id || node.label || `node-${index}`);

      return {
        ...node,
        id,
        label: node.label || node.id || `Node ${index + 1}`,
      };
    });

    const nodeMap = new Map(normalizedNodes.map((node) => [node.id, node]));

    const validLinks = rawLinks
      .map((link, index) => {
        const source = getEndpointId(link.source);
        const target = getEndpointId(link.target);

        return {
          ...link,
          id: link.id || `link-${index}`,
          source,
          target,
        };
      })
      .filter((link) => {
        if (!link.source || !link.target) return false;
        return nodeMap.has(link.source) && nodeMap.has(link.target);
      });

    const positionedNodes = normalizedNodes.map((node, index, arr) => {
      const angle = (index / Math.max(arr.length, 1)) * Math.PI * 2;

      const ring =
        node.kind === "theorist"
          ? Math.min(width, height) * 0.31
          : node.id === "productivity"
          ? Math.min(width, height) * 0.08
          : Math.min(width, height) * 0.2;

      const jitter = 8 + (index % 6) * 8;

      return {
        ...node,
        x: cx + Math.cos(angle) * (ring + jitter),
        y: cy + Math.sin(angle) * (ring + jitter),
      };
    });

    return {
      nodes: positionedNodes,
      links: validLinks,
    };
  }, [graphData, size]);

  useEffect(() => {
    if (!graphRef.current) return;

    const fg = graphRef.current;
    const width = size.width || 900;
    const height = size.height || 560;
    const centerY = height / 2 + 18;

    const linkForce = fg.d3Force("link");
    if (linkForce) {
      linkForce
        .id((d) => d.id)
        .distance((link) => (link.emphasis ? 220 : 180))
        .strength((link) => (link.emphasis ? 0.48 : 0.34));
    }

    const chargeForce = fg.d3Force("charge");
    if (chargeForce) {
      chargeForce.strength((node) => {
        if (node.kind === "theorist") return -170;
        if (node.id === "productivity") return -300;
        return -235;
      });
    }

    fg.d3Force("center", forceCenter(width / 2, centerY));
    fg.d3Force("x", forceX(width / 2).strength(0.018));
    fg.d3Force("y", forceY(centerY).strength(0.018));
    fg.d3Force(
      "collision",
      forceCollide().radius((node) => {
        if (node.kind === "theorist") return 20;
        if (node.id === "productivity") return 34;
        return 26;
      })
    );

    if (typeof fg.d3ReheatSimulation === "function") {
      fg.d3ReheatSimulation();
    }

    const t = setTimeout(() => {
      if (typeof fg.centerAt === "function") {
        fg.centerAt(width / 2, centerY, 700);
      }
      if (typeof fg.zoom === "function") {
        fg.zoom(1, 700);
      }
    }, 150);

    return () => clearTimeout(t);
  }, [preparedData, size]);

  const handleEngineTick = () => {
    if (!preparedData?.nodes?.length) return;

    const cx = (size.width || 900) / 2;
    const cy = (size.height || 560) / 2 + 18;

    for (const node of preparedData.nodes) {
      if (node.x == null || node.y == null) continue;

      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

      const tangentialX = -dy / dist;
      const tangentialY = dx / dist;

      const orbitStrength =
        node.kind === "theorist"
          ? 0.003
          : node.id === "productivity"
          ? 0.0016
          : 0.0024;

      const idealRadius =
        node.kind === "theorist"
          ? Math.min(size.width, size.height) * 0.3
          : node.id === "productivity"
          ? Math.min(size.width, size.height) * 0.07
          : Math.min(size.width, size.height) * 0.19;

      const radialPull = (idealRadius - dist) * 0.0007;

      node.vx =
        (node.vx || 0) +
        tangentialX * orbitStrength +
        (dx / dist) * radialPull;
      node.vy =
        (node.vy || 0) +
        tangentialY * orbitStrength +
        (dy / dist) * radialPull;
    }
  };

  const drawRoundedRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-[560px] w-full overflow-hidden rounded-[28px]"
    >
      <ForceGraph2D
        ref={graphRef}
        width={size.width}
        height={size.height}
        graphData={preparedData}
        backgroundColor="transparent"
        autoPauseRedraw={false}
        cooldownTicks={200000}
        enableNodeDrag={false}
        onNodeClick={onNodeClick}
        onEngineTick={handleEngineTick}
        linkWidth={(link) => (link.emphasis ? 1.8 : 0.85)}
        linkColor={(link) =>
          link.emphasis
            ? "rgba(190,170,255,0.30)"
            : "rgba(255,255,255,0.08)"
        }
        linkDirectionalParticles={(link) => (link.emphasis ? 2 : 0)}
        linkDirectionalParticleWidth={1.6}
        linkDirectionalParticleSpeed={0.0028}
        linkCanvasObjectMode={() => "after"}
        linkCanvasObject={(link, ctx) => {
          const start = link.source;
          const end = link.target;

          if (
            typeof start !== "object" ||
            typeof end !== "object" ||
            start.x == null ||
            start.y == null ||
            end.x == null ||
            end.y == null
          ) {
            return;
          }

          ctx.save();
          ctx.strokeStyle = link.emphasis
            ? "rgba(168,85,247,0.16)"
            : "rgba(255,255,255,0.03)";
          ctx.lineWidth = link.emphasis ? 4 : 1.25;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          ctx.restore();
        }}
        nodeCanvasObject={(node, ctx) => {
          const label = node.label || node.id;
          const isTheorist = node.kind === "theorist";
          const isCore = node.id === "productivity";
          const isConcept = !isTheorist;

          const colors = {
            core: "#a855f7",
            economic: "#60a5fa",
            power: "#8b5cf6",
            culture: "#f59e0b",
            theorist: "#f8fafc",
          };

          const color = isTheorist
            ? colors.theorist
            : colors[node.group] || colors.core;

          const nodeRadius = isTheorist ? 4 : isCore ? 8 : 6;
          const haloRadius = isTheorist ? 0 : isCore ? 18 : 12;
          const fontSize = isTheorist ? 8 : isCore ? 12 : 10;
          const fontWeight = isTheorist ? 500 : 700;
          const paddingX = isTheorist ? 7 : 10;
          const boxHeight = isTheorist ? 18 : isCore ? 28 : 22;

          ctx.save();

          if (isConcept) {
            ctx.beginPath();
            ctx.fillStyle = `${color}12`;
            ctx.arc(node.x, node.y, haloRadius, 0, 2 * Math.PI);
            ctx.fill();
          }

          ctx.shadowColor = color;
          ctx.shadowBlur = isCore ? 14 : isTheorist ? 6 : 9;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.font = `${fontWeight} ${fontSize}px Arial`;

          const textWidth = ctx.measureText(label).width;
          const boxWidth = textWidth + paddingX * 2;

          const x = node.x + (isTheorist ? 8 : 10);
          const y = node.y - boxHeight / 2;

          ctx.fillStyle = isTheorist
            ? "rgba(10,14,24,0.44)"
            : "rgba(5,10,20,0.62)";
          ctx.strokeStyle = isCore
            ? "rgba(168,85,247,0.55)"
            : "rgba(255,255,255,0.10)";
          ctx.lineWidth = isCore ? 1.3 : 0.8;

          drawRoundedRect(ctx, x, y, boxWidth, boxHeight, 12);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.fillText(label, x + paddingX, y + boxHeight / 2 + fontSize / 3);

          ctx.restore();
        }}
      />
    </div>
  );
}