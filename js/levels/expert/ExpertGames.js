/**
 * Expert Level Games (18-23)
 * Advanced electronics and microcontroller projects
 */

// ==================== GAME 18: ARDUINO PROJECT ====================
class ArduinoProject {
    constructor() {
        this.score = 0;
        this.currentProject = 0;
        this.totalProjects = 5;
        
        this.projects = [
            {
                name: 'Blinking LED',
                difficulty: 'Easy',
                description: 'Make an LED blink using digitalWrite',
                code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
                question: 'What does delay(1000) do?',
                options: ['Wait 1 second', 'Wait 1 millisecond', 'Turn off LED', 'Reset Arduino'],
                correct: 0
            },
            {
                name: 'Push Button Input',
                difficulty: 'Easy',
                description: 'Read a button state',
                code: `void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(2);
  digitalWrite(13, buttonState);
}`,
                question: 'What happens when button is pressed?',
                options: ['LED turns ON', 'LED turns OFF', 'Arduino resets', 'Nothing'],
                correct: 0
            },
            {
                name: 'Analog Reading',
                difficulty: 'Medium',
                description: 'Read analog sensor value',
                code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  delay(100);
}`,
                question: 'What is the range of analogRead()?',
                options: ['0-1023', '0-255', '0-100', '0-5'],
                correct: 0
            },
            {
                name: 'PWM Control',
                difficulty: 'Medium',
                description: 'Control LED brightness with PWM',
                code: `void loop() {
  for(int i=0; i<=255; i++) {
    analogWrite(9, i);
    delay(10);
  }
}`,
                question: 'What does analogWrite() do?',
                options: ['Sets PWM duty cycle', 'Reads analog value', 'Writes to serial', 'Sets pin mode'],
                correct: 0
            },
            {
                name: 'Serial Communication',
                difficulty: 'Hard',
                description: 'Send and receive data via serial',
                code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0) {
    char data = Serial.read();
    Serial.print("Received: ");
    Serial.println(data);
  }
}`,
                question: 'What does Serial.available() return?',
                options: ['Number of bytes available', 'True/False', 'Last byte received', 'Baud rate'],
                correct: 0
            }
        ];
    }
    
    start() {
        console.log('🤖 Starting Arduino Project Challenge');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        
        gameArea.innerHTML = `
            <div class="arduino-project-container">
                <div class="game-header">
                    <h2>🤖 Arduino Project Challenge</h2>
                    <div class="stats">
                        <span>Project: ${this.currentProject + 1}/${this.totalProjects}</span>
                        <span>Score: <span id="arduino-score">${this.score}</span></span>
                    </div>
                </div>
                
                <div class="project-content">
                    <div class="project-info">
                        <h3 id="project-name"></h3>
                        <p id="project-desc"></p>
                        <div class="difficulty-badge" id="project-difficulty"></div>
                    </div>
                    
                    <div class="code-editor">
                        <h4>📝 Arduino Code:</h4>
                        <pre><code id="arduino-code"></code></pre>
                    </div>
                    
                    <div class="question-section">
                        <h4 id="question-text"></h4>
                        <div class="options-grid" id="options-grid"></div>
                    </div>
                </div>
                
                <div class="feedback" id="feedback"></div>
            </div>
            
            <style>
                .arduino-project-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    background: linear-gradient(135deg, #00979d 0%, #00c6cf 100%);
                    padding: 25px;
                    border-radius: 15px;
                    color: white;
                    text-align: center;
                    margin-bottom: 25px;
                }
                
                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 10px;
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                
                .project-content {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                
                .project-info {
                    margin-bottom: 25px;
                }
                
                .difficulty-badge {
                    display: inline-block;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-top: 10px;
                }
                
                .code-editor {
                    background: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 25px;
                }
                
                .code-editor h4 {
                    color: white;
                    margin-bottom: 15px;
                }
                
                .code-editor pre {
                    margin: 0;
                    overflow-x: auto;
                }
                
                .code-editor code {
                    color: #d4d4d4;
                    font-family: 'Courier New', monospace;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }
                
                .question-section h4 {
                    color: #2c3e50;
                    margin-bottom: 15px;
                }
                
                .options-grid {
                    display: grid;
                    gap: 12px;
                }
                
                .option-btn {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border: 2px solid transparent;
                    padding: 15px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 1rem;
                    text-align: left;
                }
                
                .option-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    border-color: #00979d;
                }
                
                .option-btn.correct {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    border-color: #28a745;
                }
                
                .option-btn.wrong {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                    border-color: #dc3545;
                }
            </style>
        `;
        
        this.loadProject();
    }
    
    loadProject() {
        const project = this.projects[this.currentProject];
        
        document.getElementById('project-name').textContent = project.name;
        document.getElementById('project-desc').textContent = project.description;
        document.getElementById('project-difficulty').textContent = project.difficulty;
        document.getElementById('arduino-code').textContent = project.code;
        document.getElementById('question-text').textContent = project.question;
        
        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';
        
        project.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.checkAnswer(index, btn));
            optionsGrid.appendChild(btn);
        });
    }
    
    checkAnswer(selected, button) {
        const project = this.projects[this.currentProject];
        const correct = selected === project.correct;
        
        document.querySelectorAll('.option-btn').forEach(btn => btn.style.pointerEvents = 'none');
        
        if (correct) {
            button.classList.add('correct');
            this.score += 200;
            document.getElementById('arduino-score').textContent = this.score;
        } else {
            button.classList.add('wrong');
            document.querySelectorAll('.option-btn')[project.correct].classList.add('correct');
        }
        
        setTimeout(() => {
            this.currentProject++;
            if (this.currentProject >= this.totalProjects) {
                this.endGame();
            } else {
                this.loadProject();
            }
        }, 2000);
    }
    
    endGame() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-over">
                <h2>🤖 Arduino Projects Complete!</h2>
                <div class="final-score">
                    <div class="score-big">${this.score}</div>
                    <div class="score-label">Total Score</div>
                </div>
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
        `;
    }
    
    cleanup() {
        console.log('Arduino Project cleaned up');
    }
}

// ==================== GAME 19: SENSOR INTEGRATION ====================
class SensorIntegration {
    constructor() {
        this.score = 0;
        this.currentSensor = 0;
        this.sensors = [
            { name: 'Temperature (LM35)', pin: 'A0', type: 'Analog', range: '0-100°C' },
            { name: 'Ultrasonic (HC-SR04)', pin: 'D2,D3', type: 'Digital', range: '2-400cm' },
            { name: 'PIR Motion', pin: 'D4', type: 'Digital', range: 'Motion Detect' },
            { name: 'Light (LDR)', pin: 'A1', type: 'Analog', range: '0-1023' },
            { name: 'Gas (MQ-2)', pin: 'A2', type: 'Analog', range: 'Gas Detection' }
        ];
    }
    
    start() {
        console.log('📡 Starting Sensor Integration Challenge');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="sensor-integration-container">
                <div class="game-header">
                    <h2>📡 Sensor Integration Challenge</h2>
                    <p>Learn to work with different sensors</p>
                </div>
                
                <div class="sensor-list">
                    ${this.sensors.map((sensor, i) => `
                        <div class="sensor-card" onclick="window.currentGame.selectSensor(${i})">
                            <h3>${sensor.name}</h3>
                            <p>Pin: ${sensor.pin}</p>
                            <p>Type: ${sensor.type}</p>
                            <p>Range: ${sensor.range}</p>
                        </div>
                    `).join('')}
                </div>
                
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
            
            <style>
                .sensor-integration-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .sensor-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                
                .sensor-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 25px;
                    border-radius: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                
                .sensor-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }
                
                .sensor-card h3 {
                    margin-bottom: 15px;
                }
                
                .sensor-card p {
                    margin: 8px 0;
                    opacity: 0.9;
                }
            </style>
        `;
    }
    
    selectSensor(index) {
        this.score += 50;
        alert(`Selected: ${this.sensors[index].name}\n+50 points!`);
    }
    
    cleanup() {
        console.log('Sensor Integration cleaned up');
    }
}

// ==================== GAME 20: MOTOR CONTROL ====================
class MotorControl {
    constructor() {
        this.score = 0;
        this.motorSpeed = 128;
    }
    
    start() {
        console.log('Starting MotorControl');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="motor-control-container">
                <div class="game-header">
                    <h2>⚙️ Motor Control Challenge</h2>
                    <p>Control DC motors and servos</p>
                </div>
                
                <div class="motor-controls">
                    <h3>DC Motor Speed Control</h3>
                    <input type="range" id="speed-slider" min="0" max="255" value="128" 
                           oninput="window.currentGame.updateSpeed(this.value)">
                    <p>Speed: <span id="speed-value">128</span> / 255</p>
                    
                    <div class="motor-visual" id="motor-visual">
                        <div class="motor-rotor"></div>
                    </div>
                    
                    <div class="motor-buttons">
                        <button onclick="window.currentGame.setDirection('forward')">⬆️ Forward</button>
                        <button onclick="window.currentGame.setDirection('stop')">⏹️ Stop</button>
                        <button onclick="window.currentGame.setDirection('backward')">⬇️ Backward</button>
                    </div>
                </div>
                
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
            
            <style>
                .motor-control-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                }
                
                .motor-controls {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin: 30px 0;
                }
                
                #speed-slider {
                    width: 100%;
                    height: 10px;
                    margin: 20px 0;
                }
                
                .motor-visual {
                    width: 150px;
                    height: 150px;
                    margin: 30px auto;
                    background: #e0e0e0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                .motor-rotor {
                    width: 80%;
                    height: 20px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 10px;
                    animation: rotate 2s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .motor-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 25px;
                }
                
                .motor-buttons button {
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .motor-buttons button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }
            </style>
        `;
    }
    
    updateSpeed(value) {
        this.motorSpeed = value;
        document.getElementById('speed-value').textContent = value;
        document.querySelector('.motor-rotor').style.animationDuration = (3 - value/128) + 's';
    }
    
    setDirection(dir) {
        this.score += 20;
        alert(`Motor direction: ${dir}\n+20 points!`);
    }
    
    cleanup() {
        console.log('Motor Control cleaned up');
    }
}

// ==================== GAME 21: POWER SUPPLY DESIGN ====================
class PowerSupplyDesign {
    constructor() {
        this.score = 0;
    }
    
    start() {
        console.log('Starting PowerSupplyDesign');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="power-supply-container">
                <div class="game-header">
                    <h2>🔋 Power Supply Design</h2>
                    <p>Calculate and design power supply circuits</p>
                </div>
                
                <div class="calculator-section">
                    <h3>Voltage Regulator Calculator</h3>
                    <div class="input-group">
                        <label>Input Voltage (V):</label>
                        <input type="number" id="vin" value="12" min="1" max="50">
                    </div>
                    <div class="input-group">
                        <label>Output Voltage (V):</label>
                        <input type="number" id="vout" value="5" min="1" max="48">
                    </div>
                    <div class="input-group">
                        <label>Load Current (mA):</label>
                        <input type="number" id="current" value="500" min="1" max="3000">
                    </div>
                    <button onclick="window.currentGame.calculate()" class="calc-btn">
                        Calculate Power Dissipation
                    </button>
                    <div id="result" class="result-box"></div>
                </div>
                
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
            
            <style>
                .power-supply-container {
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .calculator-section {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin: 30px 0;
                }
                
                .input-group {
                    margin: 20px 0;
                }
                
                .input-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #2c3e50;
                }
                
                .input-group input {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                
                .calc-btn {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 20px;
                }
                
                .calc-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }
                
                .result-box {
                    margin-top: 25px;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    display: none;
                }
                
                .result-box.show {
                    display: block;
                }
            </style>
        `;
    }
    
    calculate() {
        const vin = parseFloat(document.getElementById('vin').value);
        const vout = parseFloat(document.getElementById('vout').value);
        const current = parseFloat(document.getElementById('current').value) / 1000; // Convert to A
        
        const vdrop = vin - vout;
        const power = vdrop * current;
        
        const result = document.getElementById('result');
        result.className = 'result-box show';
        result.innerHTML = `
            <h4>Results:</h4>
            <p><strong>Voltage Drop:</strong> ${vdrop.toFixed(2)} V</p>
            <p><strong>Power Dissipation:</strong> ${power.toFixed(2)} W</p>
            <p><strong>Efficiency:</strong> ${((vout/vin)*100).toFixed(1)}%</p>
            ${power > 1 ? '<p style="color: red;">⚠️ Heat sink required!</p>' : ''}
        `;
        
        this.score += 100;
    }
    
    cleanup() {
        console.log('Power Supply Design cleaned up');
    }
}

// ==================== GAME 22: PCB LAYOUT ====================
class PCBLayout {
    constructor() {
        this.score = 0;
    }
    
    start() {
        console.log('Starting PCBLayout');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="pcb-layout-container">
                <div class="game-header">
                    <h2>🎨 PCB Layout Basics</h2>
                    <p>Learn PCB design principles</p>
                </div>
                
                <div class="pcb-content">
                    <h3>PCB Design Guidelines</h3>
                    
                    <div class="guideline-card">
                        <h4>✓ Track Width</h4>
                        <p>Use appropriate trace width for current carrying capacity</p>
                        <p><strong>Rule:</strong> 10 mil per Ampere for 1oz copper</p>
                    </div>
                    
                    <div class="guideline-card">
                        <h4>✓ Component Placement</h4>
                        <p>Place components logically following signal flow</p>
                        <p><strong>Tip:</strong> Group related components together</p>
                    </div>
                    
                    <div class="guideline-card">
                        <h4>✓ Ground Plane</h4>
                        <p>Use ground plane for better EMI performance</p>
                        <p><strong>Tip:</strong> Keep ground continuous</p>
                    </div>
                    
                    <div class="guideline-card">
                        <h4>✓ Via Placement</h4>
                        <p>Use vias to connect different layers</p>
                        <p><strong>Rule:</strong> Minimize vias in high-speed signals</p>
                    </div>
                    
                    <div class="pcb-visual">
                        <svg width="100%" height="300" viewBox="0 0 400 300">
                            <rect width="400" height="300" fill="#2d5016"/>
                            <circle cx="50" cy="50" r="15" fill="#c8a866"/>
                            <circle cx="150" cy="50" r="15" fill="#c8a866"/>
                            <circle cx="250" cy="50" r="15" fill="#c8a866"/>
                            <line x1="50" y1="50" x2="150" y2="50" stroke="#c8a866" stroke-width="8"/>
                            <line x1="150" y1="50" x2="250" y2="50" stroke="#c8a866" stroke-width="8"/>
                            <rect x="100" y="150" width="60" height="40" fill="#1a1a1a" stroke="#c8a866" stroke-width="2"/>
                            <text x="200" y="280" fill="white" font-size="14">Sample PCB Layout</text>
                        </svg>
                    </div>
                </div>
                
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
            
            <style>
                .pcb-layout-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .pcb-content {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin: 30px 0;
                }
                
                .guideline-card {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 15px 0;
                    border-left: 5px solid #667eea;
                }
                
                .guideline-card h4 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                
                .pcb-visual {
                    margin-top: 30px;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
            </style>
        `;
    }
    
    cleanup() {
        console.log('PCB Layout cleaned up');
    }
}

// ==================== GAME 23: SIGNAL ANALYSIS ====================
class SignalAnalysis {
    constructor() {
        this.score = 0;
    }
    
    start() {
        console.log('Starting SignalAnalysis');
        this.init();
    }
    
    init() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="signal-analysis-container">
                <div class="game-header">
                    <h2>📊 Signal Analysis</h2>
                    <p>Analyze electronic signals and waveforms</p>
                </div>
                
                <div class="signal-content">
                    <h3>Waveform Analysis</h3>
                    
                    <div class="waveform-display">
                        <canvas id="waveform-canvas" width="600" height="200"></canvas>
                    </div>
                    
                    <div class="controls">
                        <button onclick="window.currentGame.showWaveform('sine')">Sine Wave</button>
                        <button onclick="window.currentGame.showWaveform('square')">Square Wave</button>
                        <button onclick="window.currentGame.showWaveform('triangle')">Triangle Wave</button>
                        <button onclick="window.currentGame.showWaveform('sawtooth')">Sawtooth</button>
                    </div>
                    
                    <div class="signal-info" id="signal-info"></div>
                </div>
                
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
            
            <style>
                .signal-analysis-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .signal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin: 30px 0;
                }
                
                .waveform-display {
                    background: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    display: flex;
                    justify-content: center;
                }
                
                #waveform-canvas {
                    background: #000;
                    border-radius: 5px;
                }
                
                .controls {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin: 25px 0;
                }
                
                .controls button {
                    padding: 12px 25px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                }
                
                .signal-info {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                }
            </style>
        `;
        
        this.canvas = document.getElementById('waveform-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.showWaveform('sine');
    }
    
    showWaveform(type) {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
            let y;
            const angle = (x / width) * Math.PI * 4;
            
            switch(type) {
                case 'sine':
                    y = height/2 + Math.sin(angle) * (height/3);
                    break;
                case 'square':
                    y = Math.sin(angle) > 0 ? height/4 : 3*height/4;
                    break;
                case 'triangle':
                    y = height/2 + (height/3) * (2/Math.PI) * Math.asin(Math.sin(angle));
                    break;
                case 'sawtooth':
                    y = height/2 + (height/3) * (2 * (angle % (2*Math.PI)) / (2*Math.PI) - 1);
                    break;
            }
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        document.getElementById('signal-info').innerHTML = `
            <h4>${type.toUpperCase()} Wave</h4>
            <p><strong>Frequency:</strong> 2 Hz (simulated)</p>
            <p><strong>Amplitude:</strong> 1 V (simulated)</p>
            <p><strong>Use Case:</strong> ${this.getUseCase(type)}</p>
        `;
        
        this.score += 50;
    }
    
    getUseCase(type) {
        const cases = {
            sine: 'AC power, audio signals, RF communication',
            square: 'Digital logic, clock signals, PWM',
            triangle: 'Function generators, audio synthesis',
            sawtooth: 'Oscilloscope timebase, music synthesis'
        };
        return cases[type] || 'Various applications';
    }
    
    cleanup() {
        console.log('Signal Analysis cleaned up');
    }
}

// Register all expert games
window.ArduinoProject = ArduinoProject;
window.SensorIntegration = SensorIntegration;
window.MotorControl = MotorControl;
window.PowerSupplyDesign = PowerSupplyDesign;
window.PCBLayout = PCBLayout;
window.SignalAnalysis = SignalAnalysis;
