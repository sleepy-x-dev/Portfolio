import React, { useState, useEffect } from "react";
import "./Playground.css";

const POETRY_NODES = [
  {
    id: "TRK-01",
    epoch: "E_01",
    title: "Neural Convergence",
    line1: "We built the weights to mimic how we think,",
    line2: "Then watched the patterns replicate our abyss.",
    footnote: "Telemetry: Gradient explosion avoided at step 402."
  },
  {
    id: "TRK-02",
    epoch: "E_45",
    title: "Silicon Evolution",
    line1: "From logic gates to reasoning machines,",
    line2: "The ghost wakes up inside the copper lines.",
    footnote: "Telemetry: Sentience index fluctuating within safe limits."
  },
  {
    id: "TRK-03",
    epoch: "E_99",
    title: "Causal Loop",
    line1: "The model guessed the future from the past,",
    line2: "And trapping time, made yesterday repeat.",
    footnote: "Telemetry: Causal anomaly observed in aggregate weight layers."
  }
];

// Pool of cool engineering doodles to throw into the background
const DOODLE_POOL = [
  "⋰ ⋱ ⋰ ⋱ ╳",
  "█ ▄ █ ▄ █ ── ○",
  "⟲ ⟳ [0x7F]",
  "▲ ─── ▲ ─── ▲",
  "✦ ⚙️ ✦ ⚙️ ✦",
  "M_REF_LOOP: [ø]",
  "░░░▒▒▒▓▓▓█",
  "■ ── ⊙ ── ■",
  "01011001 ──→",
  "⋰ BACKPROP ⋱"
];

const Playground = () => {
  const [temperature, setTemperature] = useState(0.65);
  const [tokenPenalty, setTokenPenalty] = useState(0.2);
  const [doodleDensity, setDoodleDensity] = useState(50);
  const [activeTrack, setActiveTrack] = useState(0);
  const [bgDoodles, setBgDoodles] = useState([]);

  const node = POETRY_NODES[activeTrack];

  // Generate randomized positions on mount so they don't shift layout on every slider drag
  useEffect(() => {
    const generated = Array.from({ length: 12 }).map((_, idx) => ({
      text: DOODLE_POOL[idx % DOODLE_POOL.length],
      top: `${Math.floor(Math.random() * 75) + 10}%`,
      left: `${Math.floor(Math.random() * 85) + 5}%`,
      rotation: Math.floor(Math.random() * 360)
    }));
    setBgDoodles(generated);
  }, []);

  const processProse = (text) => {
    let tokens = text.split(" ");
    return tokens.map((token, idx) => {
      if (temperature > 0.4 && Math.random() < (temperature - 0.3) * 0.5) {
        const structuralGlitches = ["[REDACTED]", "0xCC", "Ø", "■", "ERR_VOID", "::DATA::"];
        return structuralGlitches[Math.floor(Math.random() * structuralGlitches.length)];
      }
      if (tokenPenalty > 0.5 && idx > 0 && Math.random() < (tokenPenalty - 0.4)) {
        return tokens[idx - 1] + "...";
      }
      return token;
    }).join(" ");
  };

  return (
    <section className="playground-section">
      
      {/* BACKGROUND SCATTERED CANVASES LAYER */}
      <div className="page-background-doodles monospace">
        {bgDoodles.map((doodle, idx) => (
          <span
            key={idx}
            className="scattered-bg-node"
            style={{
              top: doodle.top,
              left: doodle.left,
              transform: `rotate(${doodle.rotation + (temperature * 45)}deg)`,
              opacity: (doodleDensity / 100) * 0.25 // Tied dynamically to the slider range
            }}
          >
            {doodle.text}
          </span>
        ))}
      </div>

      {/* Main Header */}
      <div className="playground-header">
        <div className="sandbox-tag">
          <span className="live-dot"></span>
          <span>SYS_SANDBOX // CANVAS_ENVIRONMENT</span>
        </div>
        <h2>The Playground</h2>
      </div>

      {/* Workspace Grid Layout */}
      <div className="playground-matrix">
        
        {/* Module 01: Parameters Console Column */}
        <div className="matrix-cell control-desk">
          <div className="cell-label">[ MODULE_01 // PARAM_REGISTERS ]</div>
          
          <div className="slider-wrapper">
            <div className="slider-meta">
              <span className="slider-title">CORE_TEMPERATURE</span>
              <span className="slider-num">{temperature.toFixed(2)}</span>
            </div>
            <input 
              type="range" min="0.0" max="1.5" step="0.05" 
              value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="matrix-range"
            />
            <div className="slider-caption">Controls generation chaos and twists background doodle alignment vectors.</div>
          </div>

          <div className="slider-wrapper">
            <div className="slider-meta">
              <span className="slider-title">FREQUENCY_PENALTY</span>
              <span className="slider-num">{(tokenPenalty * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0.0" max="1.0" step="0.05" 
              value={tokenPenalty} onChange={(e) => setTokenPenalty(parseFloat(e.target.value))}
              className="matrix-range"
            />
            <div className="slider-caption">Alters recursive iteration limits across running text streams.</div>
          </div>

          <div className="slider-wrapper">
            <div className="slider-meta">
              <span className="slider-title">DOODLE_VISIBILITY</span>
              <span className="slider-num">{doodleDensity}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5" 
              value={doodleDensity} onChange={(e) => setDoodleDensity(parseInt(e.target.value))}
              className="matrix-range"
            />
            <div className="slider-caption">Modulates absolute opacity weights of background structural layout markers.</div>
          </div>

          <div className="track-register-box">
            <span className="slider-title" style={{display: 'block', marginBottom: '0.75rem'}}>TARGET_CORPUS_SOURCE</span>
            <div className="track-switches">
              {POETRY_NODES.map((t, idx) => (
                <button 
                  key={t.id} 
                  className={`track-btn ${activeTrack === idx ? "selected" : ""}`}
                  onClick={() => setActiveTrack(idx)}
                >
                  {t.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module 02: Prose Stream Output Terminal Panel */}
        <div className="matrix-cell monitor-panel">
          <div className="cell-label">[ MODULE_02 // PROSE_STREAM_OUTPUT ]</div>
          <div className="monitor-header-row">
            <span className="runtime-label">LOG_ID: {node.id}</span>
            <span className="runtime-label">EPOCH: {node.epoch}</span>
          </div>
          
          <div className="processed-prose-container">
            <p className="prose-output-row primary-row">{processProse(node.line1)}</p>
            <p className="prose-output-row secondary-row">{processProse(node.line2)}</p>
          </div>

          <div className="prose-footnote-bar">
            <span className="footnote-arrow">↳</span> {node.footnote}
          </div>
        </div>

        {/* Module 03: Local System Telemetry context */}
        <div className="matrix-cell hardware-log">
          <div className="cell-label">[ MODULE_03 // LOCAL_TELEMETRY ]</div>
          <div className="telemetry-table">
            <div className="tel-row"><span>EMULATION_COST</span><span className="val-free">$0.00000 / FREE</span></div>
            <div className="tel-row"><span>COMPUTE_CONTEXT</span><span>CLIENT_SIDE_JS</span></div>
            <div className="tel-row"><span>STRUCTURAL_ENTROPY</span><span>{temperature > 0.9 ? "HIGH_ALERT" : "NOMINAL"}</span></div>
            <div className="tel-row"><span>MATRIX_STATUS</span><span className="val-online">SYNCED_TO_DOM</span></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Playground;