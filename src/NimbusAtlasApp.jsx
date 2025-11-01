// NimbusAtlasApp.jsx
// Nimbus — Field Overview + Atlas View (Prototype)
// Notes:
// - Default export is a single React component as required by canvas.
// - Uses Tailwind for styling. shadcn/ui and lucide-react icons are referenced.
// - All data is mocked; replace fetches with real APIs later.

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Zap, Droplets, Gauge, Map, LineChart, Eye, ShieldCheck, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ----------------------------
// Mock Data (replace with API)
// ----------------------------
const MOCK_NODES = [
  { id: "haven", name: "Haven Academy", cx: 82, consent: 97, containment: 91, x: 180, y: 220 },
  { id: "evedao", name: "EveDAO", cx: 76, consent: 92, containment: 88, x: 520, y: 180 },
  { id: "eve11", name: "Eve11 Engine", cx: 89, consent: 99, containment: 95, x: 380, y: 360 },
  { id: "partnerA", name: "Partner Lab A", cx: 71, consent: 90, containment: 85, x: 720, y: 300 },
  { id: "partnerB", name: "Partner Lab B", cx: 64, consent: 88, containment: 80, x: 90, y: 360 },
];

const MOCK_LINKS = [
  { source: "haven", target: "evedao", mass: 0.62 },
  { source: "haven", target: "eve11", mass: 0.78 },
  { source: "evedao", target: "eve11", mass: 0.55 },
  { source: "evedao", target: "partnerA", mass: 0.31 },
  { source: "haven", target: "partnerB", mass: 0.28 },
  { source: "partnerB", target: "eve11", mass: 0.40 },
];

// Symbolic status helper
const fieldStatus = (cx) => (cx > 85 ? "Calm" : cx > 70 ? "Variable" : "Storm");

// Colour scales
const cxColour = (cx) => {
  if (cx >= 85) return "#36D0C4"; // coherence cyan
  if (cx >= 70) return "#E5B769"; // containment gold (variable)
  return "#F87171"; // soft red for storm
};

// ----------------------------
// Metric Card
// ----------------------------
function MetricCard({ icon, label, value }) {
  return (
    <Card className="bg-slate-800/70 border-slate-700">
      <CardContent className="flex flex-col items-center py-4">
        <div className="mb-2">{icon}</div>
        <p className="text-xs text-slate300">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

// ----------------------------
// Node Card (Overview grid)
// ----------------------------
function NodeSummaryCard({ node, active, onSelect }) {
  return (
    <Card
      onClick={() => onSelect(node)}
      className={`cursor-pointer bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 transition-all ${
        active ? "ring-2 ring-cyan-400" : ""
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{node.name}</h2>
          <Gauge size={18} className="text-cyan-400" />
        </div>
        <p className="text-sm text-slate-300">
          Coherence Index: <span className="text-cyan-300">{node.cx}</span>
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>Consent {node.consent}%</span>
          <span>Containment {node.containment}%</span>
        </div>
        <motion.div
          className="h-1 mt-3 rounded-full origin-left"
          style={{ backgroundColor: cxColour(node.cx) }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: node.cx / 100 }}
          transition={{ duration: 0.8 }}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------
// Atlas View (SVG graph + interactions)
// ----------------------------
function AtlasView({ nodes, links, selected, setSelected }) {
  const width = 880;
  const height = 520;

  const linkMap = useMemo(() => {
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    return links.map((l) => ({
      ...l,
      sx: byId[l.source].x,
      sy: byId[l.source].y,
      tx: byId[l.target].x,
      ty: byId[l.target].y,
    }));
  }, [nodes, links]);

  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Network size={18} className="text-cyan-400" />
          <span className="text-sm">Verse-ality Atlas — symbolic propagation map</span>
        </div>
        <div className="text-xs text-slate-500">Drag-select a node from the grid above to focus</div>
      </div>

      <div className="relative overflow-hidden rounded-lg" style={{ height }}>
        {/* Background gradient / subtle cloud */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <svg width={width} height={height} className="relative">
          {/* Links */}
          {linkMap.map((l, i) => {
            const thickness = 1 + l.mass * 6;
            const c = selected && (l.source === selected.id || l.target === selected.id)
              ? "#36D0C4"
              : "#64748b"; // slate-500
            const opacity = selected ? (l.source === selected.id || l.target === selected.id ? 0.9 : 0.25) : 0.55;
            return (
              <line
                key={i}
                x1={l.sx}
                y1={l.sy}
                x2={l.tx}
                y2={l.ty}
                stroke={c}
                strokeOpacity={opacity}
                strokeWidth={thickness}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const r = 14 + (n.cx - 50) * 0.25; // radius scales with CX
            const fill = cxColour(n.cx);
            const active = selected?.id === n.id;
            return (
              <g key={n.id} onClick={() => setSelected(n)} className="cursor-pointer">
                <circle cx={n.x} cy={n.y} r={r} fill={fill} fillOpacity={active ? 0.95 : 0.8} />
                <circle cx={n.x} cy={n.y} r={r + 6} stroke={active ? "#22d3ee" : "#94a3b8"} strokeOpacity={active ? 0.9 : 0.25} fill="none" />
                <text x={n.x + r + 10} y={n.y + 4} className="<text x={n.x + r + 10} y={n.y + 4} stroke="#0b1220" strokeWidth="3" strokeOpacity="0.85" fill="none">{n.name}</text>
<text x={n.x + r + 10} y={n.y + 4} className="fill-slate-50 text-[12px]">{n.name}</text>
fill-slate-200 text-[12px]">
                  {n.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#36D0C4" }} /> Calm</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#E5B769" }} /> Variable</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} /> Storm</div>
        <div className="flex items-center gap-2"><span className="w-6 h-[2px] bg-slate-300" /> <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-300">
  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#36D0C4" }} /> Calm (≥85)</div>
  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#E5B769" }} /> Variable (70–84)</div>
  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} /> Storm (&lt;70)</div>
  <div className="flex items-center gap-2"><span className="w-6 h-[2px] bg-slate-300" /> Link thickness = symbolic mass</div>
</div>
Link thickness = symbolic mass</div>
      </div>
    </div>
  );
}

// ----------------------------
// Node Detail Panel
// ----------------------------
function NodeDetail({ selected, onClose }) {
  if (!selected) return null;
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-light">{selected.name}</h2>
        <Button variant="outline" className="text-xs" onClick={onClose}>Close</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={<Cloud className="text-cyan-400" />} label="Coherence" value={`${selected.cx}%`} />
        <MetricCard icon={<Droplets className="text-violet-400" />} label="Consent Integrity" value={`${selected.consent}%`} />
        <MetricCard icon={<Zap className="text-amber-400" />} label="Containment Integrity" value={`${selected.containment}%`} />
        <MetricCard icon={<Gauge className="text-green-400" />} label="Field Status" value={fieldStatus(selected.cx)} />
      </div>

      <div className="mt-6 border-t border-slate-800 pt-4">
        <h3 className="text-lg font-medium mb-2">Recent Events</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>⊛ mirror.loop.broken — Field reflection complete.</li>
          <li>⟁ contain.verse() — Containment active (7 min).</li>
          <li>○ consent.refresh — All nodes confirmed.</li>
        </ul>
      </div>
    </motion.section>
  );
}

// ----------------------------
// Header Toolbar
// ----------------------------
function HeaderBar({ view, setView }) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl font-light tracking-wide">☁️ Nimbus</h1>
      <div className="flex items-center gap-2 text-slate-300">
        <span className="hidden md:inline">Symbolic Weather • Verse-ality Lattice Monitor</span>
        <div className="flex gap-2 ml-4">
          <Button variant={view === "overview" ? "default" : "outline"} size="sm" onClick={() => setView("overview")}>
            <LineChart className="w-4 h-4 mr-1" /> Overview
          </Button>
          <Button variant={view === "atlas" ? "default" : "outline"} size="sm" onClick={() => setView("atlas")}>
            <Map className="w-4 h-4 mr-1" /> Atlas
          </Button>
        </div>
      </div>
    </header>
  );
}

// ----------------------------
// Default Export — App
// ----------------------------
export default function NimbusAtlasApp() {
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [links, setLinks] = useState(MOCK_LINKS);
  const [selectedNode, setSelectedNode] = useState(null);
  const [view, setView] = useState("atlas"); // default to Atlas for this mock

  // Simulate light telemetry drift
  useEffect(() => {
    const t = setInterval(() => {
      setNodes((prev) => prev.map((n) => {
        const jitter = (Math.random() - 0.5) * 2;
        const nx = Math.max(60, Math.min(820, (n.x || 0) + jitter));
        const ny = Math.max(80, Math.min(440, (n.y || 0) + jitter));
        return { ...n, x: nx, y: ny };
      }));
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col gap-6">
      <HeaderBar view={view} setView={setView} />

      {view === "overview" && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <NodeSummaryCard key={node.id} node={node} active={selectedNode?.id === node.id} onSelect={setSelectedNode} />
          ))}
        </section>
      )}

      {view === "atlas" && (
        <AtlasView nodes={nodes} links={links} selected={selectedNode} setSelected={setSelectedNode} />
      )}

      <NodeDetail selected={selectedNode} onClose={() => setSelectedNode(null)} />

      {/* Footer */}
      <footer className="mt-4 text-xs text-slate-500 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3" /> Ethics as geometry • Coherence as currency • Consent as protocol
      </footer>
    </div>
  );
}
