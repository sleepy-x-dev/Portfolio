import React, { useState, useRef, useEffect } from "react";
import "./Experiment.css";

const EXPERIMENTS_DATABASE = {
  "EXP-01": {
    id: "EXP-01",
    status: "IMPLEMENTED // UNPUBLISHED",
    title: "SwinDANN: Cross-Dataset Generalization for Cervical Cancer Detection",
    domain: "Computer Vision / Domain Adaptation",
    hypothesis: "Can domain-adversarial training force hierarchical vision transformers to ignore institutional staining variations? [cite: 14]",
    metrics: { "Accuracy": "91.30%", "AUROC": "0.9544", "Sensitivity": "90.44%", "Grad-CAM": "58.85%" },
    notes: "Trained on SIPaKMeD source distributions; verified directly on unexposed Herlev test sets[cite: 14]. Confirmed spatial focus enhancement via localized Grad-CAM activation maps[cite: 15]."
  },
  "EXP-02": {
    id: "EXP-02",
    status: "UNDER ANALYSIS // CODE PENDING",
    title: "Algorithmic Resolutions to Simpson's Paradox in Distributional Shifts",
    domain: "Statistical Machine Learning / Causal Inference",
    hypothesis: "Can an automated backdoor-criterion weight layer dynamically isolate aggregate data reversals?",
    metrics: { "Accuracy": "PENDING", "AUROC": "TBD", "Math Validation": "94.2%" },
    notes: "Formulating mathematical bounds mapping conditional subgroups against aggregate sample tendencies. Designing a synthetic simulation pipeline to isolate trend inversions."
  }
};

const Experiments = () => {
  const [history, setHistory] = useState([
    { type: "system", text: "Initializing Research Terminal Engine v1.6..." },
    { type: "system", text: "Type 'help' to view system operational manual flags." },
    { type: "blank", text: "" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Safely auto-scrolls internal terminal container text without jumping the main window viewport
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (e) => {
    if (e.key !== "Enter") return;
    
    // Prevents browser default key actions before anything can trigger viewport scroll jumps
    e.preventDefault();
    
    const sanitizedInput = inputVal.trim();
    if (!sanitizedInput) return;

    let outputLines = [{ type: "input", text: `pranjal@research-core:~$ ${sanitizedInput}` }];
    
    const parts = sanitizedInput.split(/\s+/);
    const targetExp = parts[0].toUpperCase();
    const flag = parts[1]?.toLowerCase();

    // Global Command Registries
    if (targetExp === "HELP") {
      outputLines.push(
        { type: "output-header", text: "AVAILABLE MANIFEST DIRECTIVES" },
        { type: "output", text: "  list                       Query entire catalog directory tags." },
        { type: "output", text: "  <id> --status              Inspect specific telemetry state (e.g., EXP-01 --status)." },
        { type: "output", text: "  <id> --details             Compile full structural manuscript file (e.g., EXP-01 --details)." },
        { type: "output", text: "  clear                      Wipe viewport stream buffers." }
      );
    } else if (targetExp === "LIST") {
      outputLines.push({ type: "output-header", text: "QUERYING REPOSITORY REGISTERS..." });
      Object.values(EXPERIMENTS_DATABASE).forEach((exp) => {
        outputLines.push({ type: "output-highlight", text: `  [${exp.id}] ── ${exp.title}` });
      });
    } else if (targetExp === "CLEAR") {
      setHistory([]);
      setInputVal("");
      return;
    } 
    // Flag-Driven Targeted Matrix Command Parsers
    else if (EXPERIMENTS_DATABASE[targetExp]) {
      const target = EXPERIMENTS_DATABASE[targetExp];

      if (flag === "--status") {
        outputLines.push({ 
          type: "output-highlight", 
          text: `[${target.id}] STATUS TELEMETRY ──> ${target.status}` 
        });
      } else if (flag === "--details") {
        outputLines.push(
          { type: "output-header", text: `── MANUSCRIPT READOUT: ${target.id} ───────────────────────────────────────` },
          { type: "output", text: `TITLE:      ${target.title}` },
          { type: "output", text: `DOMAIN:     ${target.domain}` },
          { type: "output", text: `STATUS:     ${target.status}` },
          { type: "output", text: `HYPOTHESIS: ${target.hypothesis}` },
          { type: "output", text: "METRICS:" }
        );
        Object.entries(target.metrics).forEach(([k, v]) => {
          outputLines.push({ type: "output", text: `  • ${k}: ${v}` });
        });
        outputLines.push(
          { type: "output", text: `NOTES:      ${target.notes}` },
          { type: "output-header", text: "───────────────────────────────────────────────────────────────────────────" }
        );
      } else {
        outputLines.push({ 
          type: "error", 
          text: `ERROR: Invalid flag options syntax: '${flag || ""}'. Supported: '--status' or '--details'` 
        });
      }
    } else {
      outputLines.push({ 
        type: "error", 
        text: `bash: command or target id unregistered: '${parts[0]}'. Type 'help' for options.` 
      });
    }

    setHistory((prev) => [...prev, ...outputLines, { type: "blank", text: "" }]);
    setInputVal("");
  };

  return (
    <section className="experiments-section">
      <div className="experiments-header">
        <div className="lab-meta">
          <span className="terminal-badge">SYS_LOG: EXPERIMENTS</span>
          <span className="header-line"></span>
        </div>
        <h2>The Lab Notebook</h2>
        <p className="lab-sub">
          Active research files, algorithmic stress-tests, and theoretical validation models. 
          Unfiltered execution data pulled from local development directories.
        </p>
      </div>

      {/* Terminal Desk Interface */}
      <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-bar">
          <div className="window-dots">
            <span className="dot dot-r"></span>
            <span className="dot dot-y"></span>
            <span className="dot dot-g"></span>
          </div>
          <div className="terminal-window-title">research_core@workspace_main: ~</div>
        </div>

        {/* Dynamic Inner Body Scroll Ref Tracker */}
        <div ref={terminalBodyRef} className="terminal-body">
          {history.map((line, idx) => (
            <div key={idx} className={`terminal-row row-${line.type}`}>
              {line.text}
            </div>
          ))}
          
          <div className="terminal-input-row">
            <span className="terminal-prompt">pranjal@research-core:~$</span>
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={executeCommand}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiments;