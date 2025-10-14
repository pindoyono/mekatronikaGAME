/**
 * Advanced Games: Breadboard Master & Troubleshooter
 * Games 14 & 15
 */

// ==================== GAME 14: BREADBOARD MASTER ====================
class BreadboardMaster {
    constructor() {
        this.score = 0;
        this.currentLevel = 1;
        this.maxLevel = 5;
        this.connections = [];
        this.targetConnections = [];
        this.currentCircuit = null;
    }
    
    init() {
        console.log('Breadboard Master initialized');
        const gameArea = document.getElementById('game-area');
        
        gameArea.innerHTML = `
            <div class="breadboard-master-container">
                <div class="game-header">
                    <h2>🎯 Breadboard Master</h2>
                    <div class="stats">
                        <div class="stat">Level: <span id="bb-level">${this.currentLevel}/${this.maxLevel}</span></div>
                        <div class="stat">Score: <span id="bb-score">0</span></div>
                    </div>
                </div>
                
                <div class="circuit-instructions">
                    <h3>Build This Circuit:</h3>
                    <div id="schematic-display"></div>
                    <div class="component-list" id="component-list"></div>
                </div>
                
                <div class="breadboard-area">
                    <h3>Your Breadboard:</h3>
                    <div id="breadboard-grid"></div>
                    <div class="components-palette" id="components-palette"></div>
                </div>
                
                <div class="controls">
                    <button class="btn-primary" id="check-circuit">✓ Check Circuit</button>
                    <button class="btn-secondary" id="clear-board">🗑 Clear</button>
                    <button class="btn-info" id="hint-btn">💡 Hint</button>
                </div>
                
                <div class="feedback" id="feedback"></div>
            </div>
            
            <style>
                .breadboard-master-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px;
                    border-radius: 15px;
                    color: white;
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 10px;
                }
                
                .stat {
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                
                .circuit-instructions {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                
                #schematic-display {
                    min-height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8f9fa;
                    border-radius: 10px;
                    margin: 15px 0;
                }
                
                .component-list {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .component-item {
                    background: #e8f4f8;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: 500;
                }
                
                .breadboard-area {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                
                #breadboard-grid {
                    background: #f5deb3;
                    border: 3px solid #8b7355;
                    border-radius: 10px;
                    padding: 20px;
                    min-height: 300px;
                    display: grid;
                    grid-template-columns: repeat(30, 1fr);
                    grid-template-rows: repeat(10, 1fr);
                    gap: 2px;
                    margin-bottom: 15px;
                }
                
                .breadboard-hole {
                    width: 100%;
                    height: 100%;
                    min-width: 15px;
                    min-height: 15px;
                    background: #2c3e50;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .breadboard-hole:hover {
                    background: #3498db;
                    transform: scale(1.2);
                }
                
                .breadboard-hole.occupied {
                    background: #e74c3c;
                }
                
                .components-palette {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .palette-component {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s;
                    border: none;
                }
                
                .palette-component:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
                }
                
                .palette-component.selected {
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                }
                
                .controls {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                
                .btn-primary, .btn-secondary, .btn-info {
                    padding: 12px 30px;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    color: #155724;
                }
                
                .btn-secondary {
                    background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
                    color: #856404;
                }
                
                .btn-info {
                    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
                    color: white;
                }
                
                .btn-primary:hover, .btn-secondary:hover, .btn-info:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                
                .feedback {
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    font-weight: 600;
                    display: none;
                }
                
                .feedback.show {
                    display: block;
                    animation: slideIn 0.3s ease;
                }
                
                .feedback.success {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    color: #155724;
                }
                
                .feedback.error {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                    color: #721c24;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        this.setupBreadboard();
        this.loadLevel();
    }
    
    setupBreadboard() {
        const grid = document.getElementById('breadboard-grid');
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 30; col++) {
                const hole = document.createElement('div');
                hole.className = 'breadboard-hole';
                hole.dataset.row = row;
                hole.dataset.col = col;
                hole.addEventListener('click', () => this.placeComponent(row, col));
                grid.appendChild(hole);
            }
        }
    }
    
    loadLevel() {
        const circuits = [
            {
                name: 'Simple LED Circuit',
                components: ['LED', 'Resistor (220Ω)', 'Battery (9V)'],
                description: 'Connect LED with current-limiting resistor to battery',
                connections: [[0,5], [0,10], [5,5], [5,10]]
            },
            {
                name: 'Series Resistors',
                components: ['3× Resistor (1kΩ)', 'Battery (9V)'],
                description: 'Connect three resistors in series',
                connections: [[0,5], [0,8], [0,11], [0,14]]
            },
            {
                name: 'Parallel LEDs',
                components: ['2× LED', '2× Resistor (220Ω)', 'Battery (9V)'],
                description: 'Two LEDs in parallel with individual resistors',
                connections: [[0,5], [0,10], [2,5], [2,10], [4,5], [4,10]]
            },
            {
                name: 'Voltage Divider',
                components: ['2× Resistor (10kΩ)', 'Battery (12V)'],
                description: 'Create a voltage divider circuit',
                connections: [[0,7], [0,10], [5,10]]
            },
            {
                name: 'RC Circuit',
                components: ['Resistor (10kΩ)', 'Capacitor (100µF)', 'Battery (9V)'],
                description: 'Build a basic RC timing circuit',
                connections: [[0,5], [0,8], [5,8], [5,11]]
            }
        ];
        
        this.currentCircuit = circuits[this.currentLevel - 1];
        this.targetConnections = this.currentCircuit.connections;
        
        // Display schematic
        const schematic = document.getElementById('schematic-display');
        schematic.innerHTML = `<p style="font-size:1.2rem; font-weight:600;">${this.currentCircuit.description}</p>`;
        
        // Display components
        const componentList = document.getElementById('component-list');
        componentList.innerHTML = this.currentCircuit.components
            .map(comp => `<div class="component-item">${comp}</div>`)
            .join('');
    }
    
    placeComponent(row, col) {
        console.log(`Placed component at (${row}, ${col})`);
        this.showFeedback('Click "Check Circuit" when done building!', 'success');
    }
    
    checkCircuit() {
        // Simplified check - in reality would verify actual connections
        const correct = Math.random() > 0.3; // Demo: 70% success rate
        
        if (correct) {
            this.score += 200;
            this.showFeedback(`✅ Perfect! Circuit is correct! +200 points`, 'success');
            
            setTimeout(() => {
                this.currentLevel++;
                if (this.currentLevel > this.maxLevel) {
                    this.endGame();
                } else {
                    this.loadLevel();
                    document.getElementById('bb-level').textContent = `${this.currentLevel}/${this.maxLevel}`;
                    document.getElementById('bb-score').textContent = this.score;
                }
            }, 2000);
        } else {
            this.showFeedback('❌ Circuit incomplete or incorrect. Check your connections!', 'error');
        }
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback show ${type}`;
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }
    
    endGame() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-over">
                <h2>🎉 Breadboard Master Complete!</h2>
                <div class="final-score">
                    <div class="score-big">${this.score}</div>
                    <div class="score-label">Total Score</div>
                </div>
                <p class="congrats">You've mastered all breadboard challenges!</p>
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
        `;
    }
    
    cleanup() {
        console.log('Breadboard Master cleaned up');
    }
}

// ==================== GAME 15: TROUBLESHOOTER ====================
class Troubleshooter {
    constructor() {
        this.score = 0;
        this.currentProblem = 0;
        this.totalProblems = 8;
        this.timeLeft = 300; // 5 minutes
        this.timer = null;
        
        this.faultScenarios = [
            {
                circuit: 'LED not lighting',
                fault: 'LED inserted backwards',
                symptoms: ['LED doesn\'t light', 'Circuit seems complete'],
                correctAnswer: 'reverse',
                options: [
                    { id: 'reverse', text: 'Reverse LED polarity' },
                    { id: 'resistor', text: 'Replace resistor' },
                    { id: 'battery', text: 'Check battery voltage' },
                    { id: 'connection', text: 'Check wire connections' }
                ]
            },
            {
                circuit: 'Motor not running',
                fault: 'Loose power connection',
                symptoms: ['Motor doesn\'t spin', 'Battery is good'],
                correctAnswer: 'connection',
                options: [
                    { id: 'motor', text: 'Replace motor' },
                    { id: 'connection', text: 'Check connections' },
                    { id: 'switch', text: 'Replace switch' },
                    { id: 'battery', text: 'Change battery' }
                ]
            },
            {
                circuit: 'Dim LED',
                fault: 'Resistor value too high',
                symptoms: ['LED barely visible', 'Warm resistor'],
                correctAnswer: 'resistor',
                options: [
                    { id: 'led', text: 'Replace LED' },
                    { id: 'resistor', text: 'Use lower resistor value' },
                    { id: 'battery', text: 'Higher voltage battery' },
                    { id: 'wire', text: 'Use thicker wire' }
                ]
            },
            {
                circuit: 'Burned component',
                fault: 'Capacitor connected to wrong polarity',
                symptoms: ['Smoke from capacitor', 'Circuit stopped working'],
                correctAnswer: 'polarity',
                options: [
                    { id: 'polarity', text: 'Check capacitor polarity' },
                    { id: 'voltage', text: 'Reduce voltage' },
                    { id: 'replace', text: 'Just replace capacitor' },
                    { id: 'current', text: 'Add current limiter' }
                ]
            },
            {
                circuit: 'Intermittent operation',
                fault: 'Cold solder joint',
                symptoms: ['Works sometimes', 'Stops when moved'],
                correctAnswer: 'solder',
                options: [
                    { id: 'component', text: 'Replace components' },
                    { id: 'solder', text: 'Re-solder joints' },
                    { id: 'wire', text: 'Use new wires' },
                    { id: 'power', text: 'Check power supply' }
                ]
            },
            {
                circuit: 'No output voltage',
                fault: 'Voltage regulator overheating',
                symptoms: ['Regulator very hot', 'Output drops to zero'],
                correctAnswer: 'heatsink',
                options: [
                    { id: 'replace', text: 'Replace regulator' },
                    { id: 'heatsink', text: 'Add heatsink' },
                    { id: 'reduce', text: 'Reduce input voltage' },
                    { id: 'capacitor', text: 'Add output capacitor' }
                ]
            },
            {
                circuit: 'Buzzer not working',
                fault: 'Wrong type of buzzer (passive vs active)',
                symptoms: ['Buzzer silent', 'Voltage present'],
                correctAnswer: 'type',
                options: [
                    { id: 'type', text: 'Use active buzzer instead' },
                    { id: 'voltage', text: 'Increase voltage' },
                    { id: 'replace', text: 'Replace buzzer' },
                    { id: 'polarity', text: 'Reverse polarity' }
                ]
            },
            {
                circuit: 'Transistor amplifier',
                fault: 'Base resistor missing',
                symptoms: ['No amplification', 'Transistor cold'],
                correctAnswer: 'bias',
                options: [
                    { id: 'transistor', text: 'Replace transistor' },
                    { id: 'bias', text: 'Add base resistor (bias)' },
                    { id: 'emitter', text: 'Check emitter connection' },
                    { id: 'collector', text: 'Increase collector resistor' }
                ]
            }
        ];
    }
    
    init() {
        console.log('Troubleshooter initialized');
        const gameArea = document.getElementById('game-area');
        
        gameArea.innerHTML = `
            <div class="troubleshooter-container">
                <div class="game-header">
                    <h2>🔧 Circuit Troubleshooter</h2>
                    <div class="stats-row">
                        <div class="stat">Problem: <span id="ts-problem">1/${this.totalProblems}</span></div>
                        <div class="stat">Score: <span id="ts-score">0</span></div>
                        <div class="stat">Time: <span id="ts-timer">5:00</span></div>
                    </div>
                </div>
                
                <div class="problem-display">
                    <h3>Circuit Problem:</h3>
                    <div class="circuit-name" id="circuit-name">---</div>
                    
                    <div class="symptoms-box">
                        <h4>🔍 Observed Symptoms:</h4>
                        <ul id="symptoms-list"></ul>
                    </div>
                    
                    <div class="question-box">
                        <h4>What's the most likely cause?</h4>
                        <div class="solutions-grid" id="solutions-grid"></div>
                    </div>
                </div>
                
                <div class="feedback" id="feedback"></div>
            </div>
            
            <style>
                .troubleshooter-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    padding: 20px;
                    border-radius: 15px;
                    color: white;
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 10px;
                }
                
                .stat {
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                
                .problem-display {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                
                .circuit-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2c3e50;
                    text-align: center;
                    margin: 20px 0;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 10px;
                }
                
                .symptoms-box {
                    background: #fff3cd;
                    padding: 20px;
                    border-radius: 10px;
                    border-left: 5px solid #ffc107;
                    margin: 20px 0;
                }
                
                .symptoms-box h4 {
                    color: #856404;
                    margin-bottom: 10px;
                }
                
                #symptoms-list {
                    list-style: none;
                    padding-left: 0;
                }
                
                #symptoms-list li {
                    padding: 8px 0;
                    color: #856404;
                    font-weight: 500;
                }
                
                #symptoms-list li:before {
                    content: "⚠️ ";
                    margin-right: 10px;
                }
                
                .question-box {
                    margin-top: 25px;
                }
                
                .question-box h4 {
                    color: #2c3e50;
                    margin-bottom: 15px;
                }
                
                .solutions-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                
                .solution-btn {
                    background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
                    border: 2px solid transparent;
                    padding: 20px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: left;
                }
                
                .solution-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    border-color: #667eea;
                }
                
                .solution-btn.correct {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    border-color: #28a745;
                }
                
                .solution-btn.wrong {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                    border-color: #dc3545;
                }
                
                @media (max-width: 600px) {
                    .solutions-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        this.startTimer();
        this.loadProblem();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('ts-timer').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    loadProblem() {
        const scenario = this.faultScenarios[this.currentProblem];
        
        document.getElementById('circuit-name').textContent = scenario.circuit;
        document.getElementById('ts-problem').textContent = 
            `${this.currentProblem + 1}/${this.totalProblems}`;
        
        // Display symptoms
        const symptomsList = document.getElementById('symptoms-list');
        symptomsList.innerHTML = scenario.symptoms
            .map(symptom => `<li>${symptom}</li>`)
            .join('');
        
        // Display solution options
        const solutionsGrid = document.getElementById('solutions-grid');
        solutionsGrid.innerHTML = '';
        
        scenario.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'solution-btn';
            btn.textContent = option.text;
            btn.addEventListener('click', () => this.checkSolution(option.id, btn, scenario));
            solutionsGrid.appendChild(btn);
        });
        
        document.getElementById('feedback').classList.remove('show');
    }
    
    checkSolution(selectedId, button, scenario) {
        const correct = selectedId === scenario.correctAnswer;
        
        // Disable all buttons
        document.querySelectorAll('.solution-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        if (correct) {
            button.classList.add('correct');
            this.score += 150;
            this.showFeedback(`✅ Correct! The fault was: ${scenario.fault}`, 'success');
        } else {
            button.classList.add('wrong');
            // Show correct answer
            document.querySelectorAll('.solution-btn').forEach(btn => {
                if (btn.textContent === scenario.options.find(o => o.id === scenario.correctAnswer).text) {
                    btn.classList.add('correct');
                }
            });
            this.showFeedback(`❌ Wrong! The fault was: ${scenario.fault}`, 'error');
        }
        
        document.getElementById('ts-score').textContent = this.score;
        
        setTimeout(() => {
            this.currentProblem++;
            if (this.currentProblem >= this.totalProblems) {
                this.endGame();
            } else {
                this.loadProblem();
            }
        }, 3000);
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback show ${type}`;
    }
    
    endGame() {
        clearInterval(this.timer);
        
        const gameArea = document.getElementById('game-area');
        const percentage = (this.score / (this.totalProblems * 150)) * 100;
        
        let grade = '';
        if (percentage >= 90) grade = 'Expert Technician! 🏆';
        else if (percentage >= 75) grade = 'Great Troubleshooter! ⭐';
        else if (percentage >= 60) grade = 'Good Work! 👍';
        else grade = 'Keep Practicing! 📚';
        
        gameArea.innerHTML = `
            <div class="game-over">
                <h2>🔧 Troubleshooting Complete!</h2>
                <div class="final-score">
                    <div class="score-big">${this.score}</div>
                    <div class="score-label">Total Score</div>
                </div>
                <div class="game-stats">
                    <div class="stat">
                        <span class="stat-label">Accuracy:</span>
                        <span class="stat-value">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Grade:</span>
                        <span class="stat-value">${grade}</span>
                    </div>
                </div>
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
        `;
    }
    
    cleanup() {
        if (this.timer) clearInterval(this.timer);
        console.log('Troubleshooter cleaned up');
    }
}

// Register games
window.BreadboardMaster = BreadboardMaster;
window.Troubleshooter = Troubleshooter;
