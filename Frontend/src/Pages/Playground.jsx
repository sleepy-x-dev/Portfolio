import React, { useState, useMemo } from 'react';
import './Playground.css';

const Playground = () => {
  const [inputText, setInputText] = useState('VARANASI');
  const [distortionLevel, setDistortionLevel] = useState(0.2);
  const [activeLayerInfo, setActiveLayerInfo] = useState('Hover over nodes to inspect structural telemetry.');

  const processNeuralPipeline = (text) => {
    const cleanText = text.toUpperCase().replace(/[^A-Z0-9\s]/g, '').substring(0, 8);
    return cleanText.split('').map((char, index) => {
      const asciiVal = char.charCodeAt(0);
      const binary = asciiVal.toString(2).padStart(8, '0');
      
      const mockEmbedding = [
        (asciiVal / 100).toFixed(2), 
        ((122 - asciiVal) / 100).toFixed(2), 
        ((asciiVal * 3) % 10 / 10).toFixed(2)
      ];

      return {
        char,
        id: `t_${index}`,
        binaryArray: binary.split('').map(Number),
        embedding: mockEmbedding
      };
    });
  };

  const currentPipeline = useMemo(() => processNeuralPipeline(inputText), [inputText]);

  // STRETCHED GEOMETRY ENGINE: Stretched coordinate framework for massive readability
  const canvasWidth = 1000; 
  const canvasHeight = 900; // Increased to 900px for maximum vertical breathing room
  const paddingY = 90;

  const networkLayout = useMemo(() => {
    if (currentPipeline.length === 0) return { lines: [], nodes: [] };

    const cols = { token: 100, embedding: 320, hidden: 600, binary: 880 };
    const spacingYTokens = (canvasHeight - paddingY * 2) / currentPipeline.length;
    const totalBits = currentPipeline.length * 8;
    
    // LOOSENED BINARY Y-SPACING: Opened from /4 down to /1.15 to break up clusters
    const spacingYBinary = (canvasHeight - paddingY * 2) / (totalBits / 1.15);

    let nodes = [];
    let lines = [];

    currentPipeline.forEach((token, tIdx) => {
      // 1. Scaled Token Nodes
      const tX = cols.token;
      const tY = paddingY + tIdx * spacingYTokens + (spacingYTokens / 2);
      nodes.push({ id: token.id, type: 'token', x: tX, y: tY, val: token.char, info: `Token [${token.char}] // ASCII: ${token.char.charCodeAt(0)}` });

      // 2. Scaled Embedding Nodes
      const eX = cols.embedding;
      const eY = tY; 
      nodes.push({ id: `e_${tIdx}`, type: 'embedding', x: eX, y: eY, val: `E_VEC_${tIdx}`, info: `Embedding Weights: [${token.embedding.join(', ')}]` });

      lines.push({ id: `l_t_e_${tIdx}`, x1: tX, y1: tY, x2: eX, y2: eY, active: true, type: 'token-to-vector' });

      // 3. Spaced Hidden Clusters & Terminal Nodes
      token.binaryArray.forEach((bit, bIdx) => {
        const globalBitIdx = tIdx * 8 + bIdx;
        
        const bX = cols.binary;
        const bYBase = paddingY + globalBitIdx * spacingYBinary + ((canvasHeight - (totalBits * spacingYBinary)) / 2);
        
        const distortionOffset = (bYBase - canvasHeight / 2) * distortionLevel * 0.45;
        const bY = bYBase - distortionOffset;

        const hX = cols.hidden;
        const hY = paddingY + (globalBitIdx * ((canvasHeight - paddingY * 2) / totalBits)) + (spacingYBinary / 2);

        nodes.push({ id: `b_${tIdx}_${bIdx}`, type: 'binary', x: bX, y: bY, val: bit, active: bit === 1, info: `Output Bit // Index: ${globalBitIdx} // Activation Signal: ${bit}` });

        lines.push({
          id: `l_e_h_${tIdx}_${bIdx}`,
          x1: eX, y1: eY,
          x2: hX, y2: hY,
          active: bit === 1,
          type: 'vector-to-hidden'
        });

        lines.push({
          id: `l_h_b_${tIdx}_${bIdx}`,
          x1: hX, y1: hY,
          x2: bX, y2: bY,
          active: bit === 1,
          type: 'hidden-to-binary'
        });
      });
    });

    return { nodes, lines };
  }, [currentPipeline, distortionLevel]);

  return (
    <section className="playground-section">
      <div className="playground-header">
        <div className="sandbox-tag monospace">
          <span className="live-dot"></span>
          <span>SYS_SANDBOX // MASSIVE_DIAGRAM_CORE</span>
        </div>
        <h2>The Playground</h2>
        <p className="sandbox-sub">
          A real-time structural compiler tracking raw character inputs as they convert into multidimensional tensor weights, 
          stream across standard neural hidden layers, and project into absolute binary bit strings.
        </p>
      </div>

      <div className="playground-vertical-stack">
        
        {/* MODULE 01: Top Dashboard Configuration Console */}
        <div className="matrix-module control-dashboard">
          <div className="module-label">[ MODULE_01 // PARAM_REGISTERS ]</div>
          
          <div className="dashboard-grid">
            <div className="input-group">
              <label className="input-title monospace" htmlFor="pg_text_in">RAW_INPUT_STREAM</label>
              <input 
                id="pg_text_in"
                type="text" 
                value={inputText}
                maxLength="8"
                onChange={(e) => setInputText(e.target.value.toUpperCase())}
                placeholder="VARANASI"
                className="text-stream-input monospace"
              />
            </div>

            <div className="input-group">
              <div className="slider-meta">
                <label className="input-title monospace" htmlFor="pg_dist_in">DIMENSIONAL_DISTORTION</label>
                <span className="slider-value monospace">{(distortionLevel * 100).toFixed(0)}%</span>
              </div>
              <input 
                id="pg_dist_in"
                type="range" min="0" max="1" step="0.05"
                value={distortionLevel} 
                onChange={(e) => setDistortionLevel(parseFloat(e.target.value))}
                className="matrix-range"
              />
            </div>

            <div className="inspection-panel monospace">
              <div className="inspect-header">// LIVE_TELEMETRY_LOG</div>
              <div className="inspect-body">{activeLayerInfo}</div>
            </div>
          </div>
        </div>

        {/* MODULE 02: Massive Full-Width High-Visibility Neural Pipeline Canvas */}
        <div className="matrix-module visualization-canvas">
          <div className="monitor-top-bar">
            <div className="module-label">[ MODULE_02 // TRANSFORM_PIPELINE_MONITOR ]</div>
            <div className="viz-status monospace">MATRIX_LIVE // ONLINE</div>
          </div>

          <div className="svg-wrapper">
            <svg 
              width="100%" height="100%" 
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} 
              preserveAspectRatio="xMidYMid meet"
              className="network-viz"
            >
              {/* Scale-Adjusted Axis Titles */}
              <g className="svg-axis-labels monospace">
                <text x="100" y="35" textAnchor="middle">[INPUT_TOKEN]</text>
                <text x="320" y="35" textAnchor="middle">[EMBEDDING_VECTOR]</text>
                <text x="600" y="35" textAnchor="middle">[HIDDEN_COMPRESSION_LAYERS]</text>
                <text x="880" y="35" textAnchor="middle">[BINARY_PROJECTION_OUT]</text>
              </g>

              {/* Render Connection Signal Pathways */}
              {networkLayout.lines.map((line) => (
                <line
                  key={line.id}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  className={`matrix-link line-${line.type} ${line.active ? 'link-active' : 'link-inactive'}`}
                />
              ))}

              {/* Render Component Nodes with Amplified Dimensions */}
              {networkLayout.nodes.map((node) => (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  className={`matrix-node node-${node.type} ${node.active ? 'node-on' : ''}`}
                  onMouseEnter={() => setActiveLayerInfo(node.info)}
                  onMouseLeave={() => setActiveLayerInfo('Hover over nodes to inspect structural telemetry.')}
                >
                  {node.type === 'token' && (
                    <>
                      <circle r="19" className="node-base token-base" />
                      <text className="node-text monospace" y="5.5">{node.val}</text>
                    </>
                  )}
                  {node.type === 'embedding' && (
                    <>
                      <rect x="-38" y="-14" width="76" height="28" rx="5" className="node-base vector-base" />
                      <text className="node-text monospace" y="4.5" style={{ fontSize: '10px', letterSpacing: '0.03em' }}>{node.val}</text>
                    </>
                  )}
                  {node.type === 'binary' && (
                    <>
                      <circle r="10" className={`node-base binary-base ${node.active ? 'bit-one' : 'bit-zero'}`} />
                      <text className="node-text monospace" y="4" style={{ fontSize: '10px' }}>{node.val}</text>
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Playground;