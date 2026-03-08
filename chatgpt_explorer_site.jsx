import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Network,
  Database,
  Search,
  Layers,
  PlayCircle,
  Gamepad2,
  Sparkles
} from "lucide-react";

/*
====================================================
AI EXPLORATION LAB
Jetzt mit interaktivem Super-Mario-artigem Spiel
====================================================
*/

// -------------------------------------------------
// WISSEN
// -------------------------------------------------

const knowledgeSections = [
  { id: "what", title: "Was ist ChatGPT?", icon: Brain, text: `ChatGPT ist ein großes Sprachmodell, das Muster in Text erkennt und Wort für Wort passende Antworten erzeugt.` },
  { id: "training", title: "KI Training", icon: Database, text: `Training: Vortraining auf Text, Bewertung durch Menschen, Optimierung der Antworten.` },
  { id: "transformer", title: "Transformer", icon: Network, text: `Transformer Architektur: nutzt Attention, um Zusammenhänge im Text zu erkennen.` }
];

// -------------------------------------------------
// TOKEN EXPLORER
// -------------------------------------------------

function TokenPlayground() {
  const [text, setText] = useState("");
  const tokens = text.split(" ").filter(Boolean);

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-xl font-semibold flex gap-2 items-center"><Layers /> Token Explorer</h2>
      <p className="text-sm opacity-70">KI zerlegt Text in kleine Bausteine: Tokens.</p>
      <input value={text} onChange={(e) => setText(e.target.value)} className="border p-2 rounded w-full" placeholder="Schreibe einen Satz..." />
      <div className="flex flex-wrap gap-2">
        {tokens.map((t, i) => (<motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="px-2 py-1 bg-black text-white text-xs rounded">{t}</motion.div>))}
      </div>
    </div>
  );
}

// -------------------------------------------------
// TRANSFORMER VISUALIZER
// -------------------------------------------------

function TransformerVisualizer() {
  const layers = ["Input", "Embedding", "Attention", "Feed Forward", "Output"];
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-xl font-semibold flex gap-2 items-center"><Network /> Transformer Visualizer</h2>
      <p className="text-sm opacity-70">Klicke eine Schicht um zu sehen wie ein Sprachmodell arbeitet.</p>
      <div className="flex flex-wrap gap-3">
        {layers.map((l) => (<button key={l} onClick={() => setSelected(l)} className="px-3 py-1 bg-black text-white text-xs rounded">{l}</button>))}
      </div>
      {selected && (<div className="border rounded p-3 text-sm"><b>{selected}</b><p className="opacity-70 mt-1">Diese Schicht verarbeitet Informationen im Modell.</p></div>)}
    </div>
  );
}

// -------------------------------------------------
// SUPER MARIO-ARTIGES SPIEL
// -------------------------------------------------

function SuperMarioAI() {
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  // Spieler springen
  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      let jumpHeight = 0;
      const up = setInterval(() => {
        jumpHeight += 2;
        setPlayerY(jumpHeight);
        if (jumpHeight >= 20) clearInterval(up);
      }, 20);
      setTimeout(() => setIsJumping(false), 400);
      setTimeout(() => setPlayerY(0), 400);
    }
  };

  // Hindernisse generieren
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => [...prev, { x: 100, y: 0 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Hindernisse bewegen
  useEffect(() => {
    const move = setInterval(() => {
      setObstacles((prev) => prev.map(o => ({ ...o, x: o.x - 2 })).filter(o => o.x > 0));
    }, 50);
    return () => clearInterval(move);
  }, []);

  // Spieler springen per Leertaste
  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space') jump(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isJumping]);

  // Kollision erkennen
  useEffect(() => {
    const check = setInterval(() => {
      obstacles.forEach(o => {
        if (o.x < 5 && playerY < 5) {
          alert('Game Over! Score: ' + score);
          setObstacles([]);
          setScore(0);
        } else if (o.x === 5) {
          setScore(s => s + 1);
        }
      });
    }, 50);
    return () => clearInterval(check);
  }, [obstacles, playerY, score]);

  return (
    <div className="bg-blue-200 rounded-2xl p-6 shadow relative overflow-hidden h-40">
      <h2 className="text-lg font-semibold flex gap-2 items-center"><Gamepad2 /> Super Mario AI</h2>
      <p className="text-xs opacity-70">Drücke Leertaste zum Springen, weiche Hindernissen aus!</p>
      <div className="absolute bottom-0 left-5 w-4 h-4 bg-red-500" style={{ bottom: playerY*2 + 'px' }}>🤖</div>
      {obstacles.map((o, i) => (<div key={i} className="absolute bottom-0 w-4 h-4 bg-green-700" style={{ left: o.x + '%'}}></div>))}
      <div className="absolute top-2 right-4 text-xs font-bold">Score: {score}</div>
    </div>
  );
}

// -------------------------------------------------
// PROMPT LAB
// -------------------------------------------------

const promptTemplates = [
  "Erkläre mir [Thema] einfach.",
  "Gib mir eine Schritt-für-Schritt Anleitung für [Thema].",
  "Erkläre [Thema] wie für ein 10-jähriges Kind.",
  "Liste die wichtigsten Fakten über [Thema]."
];

function PromptLab() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);

  const run = () => {
    if (!prompt) return;
    const response = "Simulierte KI Antwort: " + prompt;
    setHistory([{ prompt, response }, ...history]);
    setPrompt("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h2 className="text-xl font-semibold flex gap-2 items-center"><PlayCircle /> Prompt Lab</h2>
      <div className="space-y-2">
        {promptTemplates.map((t, i) => (<button key={i} onClick={() => setPrompt(t)} className="block w-full border rounded p-2 text-xs text-left hover:bg-gray-100">{t}</button>))}
      </div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="border rounded p-2 w-full" placeholder="Schreibe deinen Prompt..." />
      <button onClick={run} className="px-4 py-2 bg-black text-white rounded">Prompt testen</button>
      <div className="space-y-3">
        {history.map((h, i) => (<div key={i} className="border rounded p-3 text-sm"><b>Prompt</b><div>{h.prompt}</div><b className="mt-2 block">Antwort</b><div>{h.response}</div></div>))}
      </div>
    </div>
  );
}

// -------------------------------------------------
// WISSENSKARTE
// -------------------------------------------------

function SectionCard({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <motion.div whileHover={{ scale: 1.05 }} onClick={() => onClick(item)} className={`cursor-pointer p-6 rounded-2xl border shadow ${active ? 'bg-black text-white':'bg-white'}`}>
      <div className="flex gap-2 items-center mb-2"><Icon /><b>{item.title}</b></div>
      <p className="text-xs opacity-70">Klicken zum Lesen</p>
    </motion.div>
  );
}

// -------------------------------------------------
// MAIN APP
// -------------------------------------------------

export default function AIExplorationLab() {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = knowledgeSections.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-5xl font-bold">AI Exploration Lab</motion.h1>
        <div className="flex gap-3 bg-white p-3 rounded-xl shadow items-center"><Search /><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Themen durchsuchen..." className="outline-none w-full"/></div>
        <div className="grid md:grid-cols-3 gap-6">{filtered.map(s => <SectionCard key={s.id} item={s} active={active?.id===s.id} onClick={setActive}/>)} </div>
        {active && <div className="bg-white rounded-2xl shadow p-6 whitespace-pre-line"><h2 className="text-2xl font-semibold mb-3">{active.title}</h2>{active.text}</div>}
        <div className="grid md:grid-cols-2 gap-8"><TokenPlayground /><TransformerVisualizer /></div>
        <SuperMarioAI />
        <PromptLab />
        <motion.div whileHover={{scale:1.03}} className="bg-black text-white p-8 rounded-2xl"><div className="flex gap-2 items-center text-xl"><Sparkles /> Secret AI Lab</div><p className="text-sm opacity-70 mt-2">Dieses Labor kann erweitert werden mit: 3D Gehirn-Simulationen, neuronalen Netzwerken oder echten KI APIs.</p></motion.div>
      </div>
    </div>
  );
}
