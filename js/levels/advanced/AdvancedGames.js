/**
 * ADVANCED LEVEL GAMES (12-17)
 * More complex electronics concepts
 */

/**
 * Game 12: Circuit Builder ⚡
 */
class CircuitBuilder {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.currentCircuit = null;
        this.placedComponents = [];
        
        this.circuits = [
            {
                name: 'LED Circuit',
                description: 'Build a basic LED circuit with current-limiting resistor',
                components: ['Battery 9V', 'Resistor 330Ω', 'LED Red'],
                connections: [
                    { from: 'Battery +', to: 'Resistor 1' },
                    { from: 'Resistor 2', to: 'LED Anode' },
                    { from: 'LED Cathode', to: 'Battery -' }
                ]
            },
            {
                name: 'Voltage Divider',
                description: 'Create a voltage divider circuit',
                components: ['Battery 12V', 'Resistor 1kΩ', 'Resistor 1kΩ'],
                connections: [
                    { from: 'Battery +', to: 'R1-1' },
                    { from: 'R1-2', to: 'R2-1' },
                    { from: 'R2-2', to: 'Battery -' }
                ]
            }
        ];
    }

    init() {
        this.setupUI();
        this.loadCircuit();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="circuit-builder-game">
                <h2>⚡ Circuit Builder</h2>
                
                <div class="circuit-objective">
                    <h3 id="circuit-name">LED Circuit</h3>
                    <p id="circuit-desc">Build a basic LED circuit</p>
                </div>

                <div class="build-area">
                    <div class="component-palette">
                        <h4>Components:</h4>
                        <div id="components-list"></div>
                    </div>

                    <div class="workspace-canvas">
                        <svg id="circuit-canvas" width="600" height="400">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="10" 
                                        refX="5" refY="5" orient="auto">
                                    <polygon points="0,0 10,5 0,10" fill="#3498db"/>
                                </marker>
                            </defs>
                            <text x="300" y="200" text-anchor="middle" fill="#bdc3c7" font-size="20">
                                Drag components here
                            </text>
                        </svg>
                    </div>
                </div>

                <div class="circuit-controls">
                    <button class="btn btn-success" onclick="game.testCircuit()">
                        ⚡ Test Circuit
                    </button>
                    <button class="btn btn-secondary" onclick="game.clearCircuit()">
                        🗑️ Clear
                    </button>
                    <button class="btn btn-info" onclick="game.showSchematic()">
                        📐 Show Schematic
                    </button>
                </div>
            </div>
        `;
        this.addStyles();
    }

    loadCircuit() {
        this.currentCircuit = this.circuits[0];
        document.getElementById('circuit-name').textContent = this.currentCircuit.name;
        document.getElementById('circuit-desc').textContent = this.currentCircuit.description;
        
        const list = document.getElementById('components-list');
        list.innerHTML = this.currentCircuit.components.map((comp, i) => `
            <div class="component-item" draggable="true" data-component="${comp}">
                ${comp}
            </div>
        `).join('');
    }

    testCircuit() {
        if (this.placedComponents.length === this.currentCircuit.components.length) {
            alert('✓ Circuit looks good! +200 points');
            this.score += 200;
        } else {
            alert('✗ Missing components!');
        }
    }

    clearCircuit() {
        this.placedComponents = [];
        document.getElementById('circuit-canvas').innerHTML = `
            <text x="300" y="200" text-anchor="middle" fill="#bdc3c7" font-size="20">
                Drag components here
            </text>
        `;
    }

    showSchematic() {
        alert(`Schematic for ${this.currentCircuit.name}:\n\n` + 
              this.currentCircuit.connections.map(c => 
                  `${c.from} → ${c.to}`
              ).join('\n'));
    }

    addStyles() {
        if (document.getElementById('circuit-builder-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'circuit-builder-styles';
        styles.textContent = `
            .circuit-builder-game {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }
            .circuit-objective {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
            }
            .build-area {
                display: grid;
                grid-template-columns: 250px 1fr;
                gap: 20px;
                margin: 20px 0;
            }
            .component-palette {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .component-item {
                padding: 15px;
                margin: 10px 0;
                background: #ecf0f1;
                border-radius: 8px;
                cursor: move;
                transition: all 0.3s;
            }
            .component-item:hover {
                background: #3498db;
                color: white;
                transform: translateX(5px);
            }
            .workspace-canvas {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                padding: 20px;
            }
            #circuit-canvas {
                border: 2px dashed #bdc3c7;
                border-radius: 8px;
            }
            .circuit-controls {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

/**
 * Game 13: Schematic Reader 📐
 */
class SchematicReader {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        
        this.schematics = [
            {
                name: 'Simple LED Circuit',
                svg: '<svg>...</svg>',
                questions: [
                    { q: 'How many resistors?', a: '1' },
                    { q: 'What is the power source?', a: 'Battery' }
                ]
            }
        ];
    }

    init() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="schematic-reader-game">
                <h2>📐 Schematic Reader</h2>
                <div class="schematic-display">
                    <p>Analyze the circuit schematic and answer questions</p>
                </div>
                <div class="questions">
                    <h4>Questions:</h4>
                    <p>1. How many resistors are in this circuit?</p>
                    <input type="number" placeholder="Answer">
                    <button class="btn btn-primary" onclick="alert('Feature coming soon!')">
                        Submit
                    </button>
                </div>
            </div>
        `;
    }

    cleanup() {}
}

/**
 * Game 16: Voltage Divider ⚖️
 */
class VoltageDivider {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
    }

    init() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="voltage-divider-game">
                <h2>⚖️ Voltage Divider Calculator</h2>
                
                <div class="circuit-diagram">
                    <svg width="300" height="400" viewBox="0 0 300 400">
                        <!-- Voltage source -->
                        <circle cx="50" cy="350" r="30" fill="none" stroke="#2c3e50" stroke-width="2"/>
                        <text x="50" y="355" text-anchor="middle" font-size="16" font-weight="bold">Vin</text>
                        
                        <!-- R1 -->
                        <line x1="50" y1="320" x2="50" y2="280" stroke="#2c3e50" stroke-width="2"/>
                        <rect x="35" y="230" width="30" height="50" fill="#8B4513" stroke="#000"/>
                        <text x="90" y="255" font-size="14">R1</text>
                        <line x1="50" y1="230" x2="50" y2="200" stroke="#2c3e50" stroke-width="2"/>
                        
                        <!-- Output node -->
                        <circle cx="50" cy="200" r="5" fill="#e74c3c"/>
                        <line x1="50" y1="200" x2="150" y2="200" stroke="#2c3e50" stroke-width="2"/>
                        <text x="160" y="205" font-size="16" fill="#e74c3c" font-weight="bold">Vout</text>
                        
                        <!-- R2 -->
                        <rect x="35" y="150" width="30" height="50" fill="#8B4513" stroke="#000"/>
                        <text x="90" y="175" font-size="14">R2</text>
                        <line x1="50" y1="150" x2="50" y2="100" stroke="#2c3e50" stroke-width="2"/>
                        
                        <!-- Ground -->
                        <line x1="30" y1="100" x2="70" y2="100" stroke="#2c3e50" stroke-width="2"/>
                        <line x1="35" y1="95" x2="65" y2="95" stroke="#2c3e50" stroke-width="2"/>
                        <line x1="40" y1="90" x2="60" y2="90" stroke="#2c3e50" stroke-width="2"/>
                    </svg>
                </div>

                <div class="calculator-panel">
                    <h3>Calculate Output Voltage</h3>
                    <div class="input-group">
                        <label>Input Voltage (Vin):</label>
                        <input type="number" id="vin" value="12" step="0.1"> V
                    </div>
                    <div class="input-group">
                        <label>R1:</label>
                        <input type="number" id="r1" value="10" step="0.1"> kΩ
                    </div>
                    <div class="input-group">
                        <label>R2:</label>
                        <input type="number" id="r2" value="10" step="0.1"> kΩ
                    </div>
                    
                    <button class="btn btn-primary" onclick="game.calculate()">
                        🧮 Calculate
                    </button>
                    
                    <div class="result-panel" id="result" style="display:none;">
                        <h4>Result:</h4>
                        <p>Vout = <span id="vout-result">0</span> V</p>
                        <p class="formula">Formula: Vout = Vin × (R2 / (R1 + R2))</p>
                    </div>
                </div>
            </div>
        `;
        this.addStyles();
    }

    calculate() {
        const vin = parseFloat(document.getElementById('vin').value);
        const r1 = parseFloat(document.getElementById('r1').value);
        const r2 = parseFloat(document.getElementById('r2').value);
        
        const vout = vin * (r2 / (r1 + r2));
        
        document.getElementById('vout-result').textContent = vout.toFixed(2);
        document.getElementById('result').style.display = 'block';
        
        this.score += 10;
        alert(`✓ Correct!\nVout = ${vout.toFixed(2)} V\n+10 points`);
    }

    addStyles() {
        if (document.getElementById('voltage-divider-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'voltage-divider-styles';
        styles.textContent = `
            .voltage-divider-game {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            .voltage-divider-game h2 {
                text-align: center;
                color: #2c3e50;
            }
            .circuit-diagram {
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                margin: 20px 0;
                display: flex;
                justify-content: center;
            }
            .calculator-panel {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px;
                border-radius: 12px;
                color: white;
            }
            .calculator-panel h3 {
                margin-bottom: 20px;
                text-align: center;
            }
            .input-group {
                margin: 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .input-group label {
                min-width: 150px;
                font-weight: bold;
            }
            .input-group input {
                flex: 1;
                padding: 10px;
                font-size: 1.1rem;
                border: none;
                border-radius: 6px;
            }
            .result-panel {
                margin-top: 20px;
                padding: 20px;
                background: rgba(255,255,255,0.2);
                border-radius: 8px;
            }
            .result-panel h4 {
                color: #FFD700;
            }
            .result-panel p {
                font-size: 1.2rem;
                margin: 10px 0;
            }
            .formula {
                font-style: italic;
                opacity: 0.9;
                font-size: 1rem !important;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

/**
 * Game 17: LED Calculator 💡
 */
class LEDCalculator {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
    }

    init() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="led-calculator-game">
                <h2>💡 LED Calculator</h2>
                
                <div class="led-specs">
                    <h3>LED Specifications:</h3>
                    <div class="spec-grid">
                        <div class="spec-item">
                            <label>Supply Voltage:</label>
                            <input type="number" id="vsupply" value="9" step="0.1"> V
                        </div>
                        <div class="spec-item">
                            <label>LED Forward Voltage:</label>
                            <input type="number" id="vf" value="2.0" step="0.1"> V
                        </div>
                        <div class="spec-item">
                            <label>LED Current:</label>
                            <input type="number" id="iled" value="20" step="1"> mA
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="game.calculateResistor()">
                        🧮 Calculate Resistor
                    </button>
                </div>

                <div class="result-section" id="led-result" style="display:none;">
                    <h3>✓ Results:</h3>
                    <div class="result-box">
                        <p>Required Resistor: <strong id="r-value">0</strong> Ω</p>
                        <p>Power Rating: <strong id="p-value">0</strong> W</p>
                        <p>Standard Value: <strong id="std-value">0</strong> Ω</p>
                    </div>
                    
                    <div class="circuit-preview">
                        <svg width="400" height="150">
                            <line x1="50" y1="75" x2="100" y2="75" stroke="#2c3e50" stroke-width="3"/>
                            <rect x="100" y="60" width="60" height="30" fill="#8B4513" rx="5"/>
                            <text x="130" y="50" text-anchor="middle" font-size="12">R</text>
                            <line x1="160" y1="75" x2="200" y2="75" stroke="#2c3e50" stroke-width="3"/>
                            <circle cx="220" cy="75" r="20" fill="#FF4444" opacity="0.7"/>
                            <line x1="240" y1="75" x2="280" y2="75" stroke="#2c3e50" stroke-width="3"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        this.addStyles();
    }

    calculateResistor() {
        const vsupply = parseFloat(document.getElementById('vsupply').value);
        const vf = parseFloat(document.getElementById('vf').value);
        const iled = parseFloat(document.getElementById('iled').value) / 1000; // Convert to A
        
        // R = (Vsupply - Vf) / I
        const r = (vsupply - vf) / iled;
        
        // Power = I² × R
        const power = Math.pow(iled, 2) * r;
        
        // Find nearest standard value
        const standardValues = [10, 22, 47, 100, 220, 330, 470, 1000, 2200, 3300, 4700];
        const stdValue = standardValues.reduce((prev, curr) => 
            Math.abs(curr - r) < Math.abs(prev - r) ? curr : prev
        );
        
        document.getElementById('r-value').textContent = r.toFixed(0);
        document.getElementById('p-value').textContent = power.toFixed(3);
        document.getElementById('std-value').textContent = stdValue;
        document.getElementById('led-result').style.display = 'block';
        
        this.score += 20;
    }

    addStyles() {
        if (document.getElementById('led-calc-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'led-calc-styles';
        styles.textContent = `
            .led-calculator-game {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }
            .led-specs {
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                margin: 20px 0;
            }
            .spec-grid {
                display: grid;
                gap: 20px;
                margin: 20px 0;
            }
            .spec-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .spec-item label {
                min-width: 200px;
                font-weight: bold;
            }
            .spec-item input {
                flex: 1;
                padding: 12px;
                font-size: 1.1rem;
                border: 2px solid #667eea;
                border-radius: 6px;
            }
            .result-section {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                padding: 30px;
                border-radius: 12px;
                color: white;
                margin: 20px 0;
            }
            .result-box {
                background: rgba(255,255,255,0.2);
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
            }
            .result-box p {
                font-size: 1.2rem;
                margin: 10px 0;
            }
            .result-box strong {
                color: #FFD700;
                font-size: 1.4rem;
            }
            .circuit-preview {
                text-align: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

// Register games
if (typeof window !== 'undefined') {
    window.CircuitBuilder = CircuitBuilder;
    window.SchematicReader = SchematicReader;
    window.VoltageDivider = VoltageDivider;
    window.LEDCalculator = LEDCalculator;
}
