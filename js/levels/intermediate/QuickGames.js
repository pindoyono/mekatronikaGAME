/**
 * QUICK GAME TEMPLATES
 * Simplified versions for rapid prototyping - Can be enhanced later
 */

/**
 * Game 7: Component Tester 🔬
 */
class ComponentTester {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.currentTest = null;
        
        this.tests = [
            { component: 'Resistor', tool: 'Multimeter', mode: 'Resistance', expectedRange: [990, 1010], value: 1000 },
            { component: 'Capacitor', tool: 'Multimeter', mode: 'Capacitance', expectedRange: [95, 105], value: 100 },
            { component: 'LED', tool: 'Multimeter', mode: 'Diode Test', expectedRange: [1.8, 2.2], value: 2.0 },
            { component: 'Diode', tool: 'Multimeter', mode: 'Diode Test', expectedRange: [0.5, 0.7], value: 0.6 }
        ];
    }

    start() {
        console.log('🔬 Starting Component Tester Game');
        this.setupUI();
        this.nextTest();
    }

    init() {
        this.start();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="tester-game">
                <h2>🔬 Component Tester</h2>
                <div class="score">Score: <span id="test-score">${this.score}</span></div>
                
                <div class="test-bench">
                    <div class="component-under-test" id="component-display">
                        <h3>Component: <span id="comp-name">-</span></h3>
                        <div class="comp-visual" id="comp-visual"></div>
                    </div>
                    
                    <div class="multimeter">
                        <div class="display" id="meter-display">---</div>
                        <div class="controls">
                            <select id="mode-select" class="meter-select">
                                <option>Resistance (Ω)</option>
                                <option>Voltage (V)</option>
                                <option>Current (A)</option>
                                <option>Diode Test</option>
                                <option>Capacitance (μF)</option>
                            </select>
                            <button class="btn btn-primary" onclick="game.measure()">
                                📏 Measure
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="answer-section">
                    <input type="number" id="answer-input" placeholder="Enter reading" 
                           class="answer-input" step="0.1">
                    <button class="btn btn-success" onclick="game.submitAnswer()">
                        ✓ Submit
                    </button>
                </div>
            </div>
        `;
        this.addStyles();
    }

    nextTest() {
        this.currentTest = this.tests[Math.floor(Math.random() * this.tests.length)];
        document.getElementById('comp-name').textContent = this.currentTest.component;
        document.getElementById('mode-select').value = this.currentTest.mode;
        document.getElementById('meter-display').textContent = '---';
        document.getElementById('answer-input').value = '';
    }

    measure() {
        const mode = document.getElementById('mode-select').value;
        if (mode === this.currentTest.mode) {
            const reading = this.currentTest.value + (Math.random() - 0.5) * 0.1;
            document.getElementById('meter-display').textContent = reading.toFixed(2);
        } else {
            document.getElementById('meter-display').textContent = 'ERR';
        }
    }

    submitAnswer() {
        const answer = parseFloat(document.getElementById('answer-input').value);
        const [min, max] = this.currentTest.expectedRange;
        
        if (answer >= min && answer <= max) {
            alert('✓ Correct! +100 points');
            this.score += 100;
            document.getElementById('test-score').textContent = this.score;
            this.nextTest();
        } else {
            alert(`✗ Wrong! Expected ${min}-${max}`);
            this.score = Math.max(0, this.score - 25);
            document.getElementById('test-score').textContent = this.score;
        }
    }

    addStyles() {
        if (document.getElementById('tester-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'tester-styles';
        styles.textContent = `
            .tester-game { padding: 20px; max-width: 900px; margin: 0 auto; }
            .test-bench { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .component-under-test, .multimeter {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .multimeter .display {
                background: #1a1a1a;
                color: #0f0;
                font-family: 'Courier New', monospace;
                font-size: 2rem;
                padding: 20px;
                text-align: right;
                border-radius: 8px;
                margin-bottom: 15px;
            }
            .meter-select {
                width: 100%;
                padding: 10px;
                font-size: 1rem;
                border-radius: 6px;
                margin-bottom: 10px;
            }
            .answer-section {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin: 20px 0;
            }
            .answer-input {
                padding: 12px;
                font-size: 1.2rem;
                border: 2px solid #667eea;
                border-radius: 8px;
                width: 200px;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

/**
 * Game 8: Pin Identifier 📍
 */
class PinIdentifier {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        
        this.ics = [
            { name: '555 Timer', pins: ['GND', 'Trigger', 'Output', 'Reset', 'Control', 'Threshold', 'Discharge', 'VCC'] },
            { name: '741 Op-Amp', pins: ['Offset', 'IN-', 'IN+', 'V-', 'Offset', 'Output', 'V+', 'NC'] },
            { name: '7805 Regulator', pins: ['Input', 'GND', 'Output'] }
        ];
    }

    start() {
        console.log('📍 Starting Pin Identifier Game');
        this.setupUI();
        this.nextIC();
    }

    init() {
        this.start();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="pin-game">
                <h2>📍 Pin Identifier</h2>
                <div class="score">Score: <span id="pin-score">${this.score}</span></div>
                <div class="ic-display" id="ic-display"></div>
                <div class="question" id="question"></div>
                <div class="pin-buttons" id="pin-buttons"></div>
            </div>
        `;
        this.addStyles();
    }

    nextIC() {
        this.currentIC = this.ics[Math.floor(Math.random() * this.ics.length)];
        const randomPin = this.currentIC.pins[Math.floor(Math.random() * this.currentIC.pins.length)];
        
        document.getElementById('ic-display').innerHTML = `
            <h3>${this.currentIC.name}</h3>
            <div class="ic-pins">
                ${this.currentIC.pins.map((pin, i) => `
                    <div class="pin-dot" data-pin="${i}">
                        <span class="pin-number">${i + 1}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.getElementById('question').textContent = `Which pin is "${randomPin}"?`;
        this.correctAnswer = this.currentIC.pins.indexOf(randomPin);
        
        document.querySelectorAll('.pin-dot').forEach((dot, i) => {
            dot.onclick = () => this.checkAnswer(i);
        });
    }

    checkAnswer(pin) {
        if (pin === this.correctAnswer) {
            alert('✓ Correct! +50 points');
            this.score += 50;
            this.nextIC();
        } else {
            alert('✗ Wrong!');
            this.score = Math.max(0, this.score - 10);
        }
        document.getElementById('pin-score').textContent = this.score;
    }

    addStyles() {
        if (document.getElementById('pin-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'pin-styles';
        styles.textContent = `
            .pin-game { padding: 20px; max-width: 800px; margin: 0 auto; text-align: center; }
            .ic-display {
                background: white;
                padding: 30px;
                border-radius: 12px;
                margin: 20px 0;
            }
            .ic-pins {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 15px;
                margin-top: 20px;
            }
            .pin-dot {
                width: 50px;
                height: 50px;
                background: #333;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            .pin-dot:hover {
                background: #667eea;
                transform: scale(1.2);
            }
            .pin-number {
                color: white;
                font-weight: bold;
            }
            .question {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 20px 0;
                color: #667eea;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

// Register games
if (typeof window !== 'undefined') {
    window.ComponentTester = ComponentTester;
    window.PinIdentifier = PinIdentifier;
}
