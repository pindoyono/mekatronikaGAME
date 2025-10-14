/**
 * Game 10: Diode Detective 🔦
 * Skill: Polarity & Diode Types
 */

class DiodeDetective {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.level = 1;
        this.correctAnswers = 0;
        
        this.diodes = [
            { 
                name: 'Standard Diode (1N4007)', 
                type: 'rectifier',
                cathode: 'Silver band',
                vf: 0.7,
                uses: ['Rectification', 'Protection', 'General purpose']
            },
            { 
                name: 'Zener Diode (1N4733)', 
                type: 'zener',
                cathode: 'Black band',
                vz: 5.1,
                uses: ['Voltage regulation', 'Reference voltage', 'Overvoltage protection']
            },
            { 
                name: 'Schottky Diode (1N5819)', 
                type: 'schottky',
                cathode: 'Gray/white band',
                vf: 0.3,
                uses: ['Fast switching', 'Low voltage drop', 'RF circuits']
            },
            { 
                name: 'LED (Light Emitting Diode)', 
                type: 'led',
                cathode: 'Shorter lead / flat side',
                vf: 2.0,
                uses: ['Indicators', 'Lighting', 'Displays']
            },
            { 
                name: 'Photodiode', 
                type: 'photo',
                cathode: 'Marked terminal',
                vf: 0.7,
                uses: ['Light sensing', 'Optocouplers', 'Solar cells']
            }
        ];
    }

    start() {
        console.log('🔦 Starting Diode Detective Game');
        this.setupUI();
        this.nextQuestion();
    }

    init() {
        this.start();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="diode-detective-game">
                <div class="game-header">
                    <div class="game-info">
                        <h3>🔦 Diode Detective</h3>
                        <p>Identify diode polarity and types</p>
                    </div>
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="diode-score">${this.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Correct</span>
                            <span class="stat-value" id="diode-correct">${this.correctAnswers}</span>
                        </div>
                    </div>
                </div>

                <div class="diode-display">
                    <h3 id="diode-name">Standard Diode</h3>
                    <div class="diode-visual" id="diode-visual">
                        <!-- SVG will be inserted here -->
                    </div>
                </div>

                <div class="questions-section">
                    <div class="question-card">
                        <h4>❓ Which side is the CATHODE?</h4>
                        <div class="options-grid">
                            <button class="option-btn" onclick="game.checkCathode('left')">
                                ← Left Side
                            </button>
                            <button class="option-btn" onclick="game.checkCathode('right')">
                                Right Side →
                            </button>
                        </div>
                    </div>

                    <div class="question-card">
                        <h4>❓ What is this diode used for?</h4>
                        <div id="uses-options" class="options-list">
                            <!-- Will be populated dynamically -->
                        </div>
                    </div>
                </div>

                <div class="info-panel" id="info-panel">
                    <h4>💡 Did you know?</h4>
                    <p id="info-text">Select your answers above</p>
                </div>

                <div class="controls">
                    <button class="btn btn-secondary" onclick="game.showHint()">
                        💡 Hint
                    </button>
                    <button class="btn btn-info" onclick="game.showGuide()">
                        📖 Diode Guide
                    </button>
                </div>
            </div>
        `;
        this.addStyles();
    }

    nextQuestion() {
        this.currentDiode = this.diodes[Math.floor(Math.random() * this.diodes.length)];
        this.cathodeAnswered = false;
        this.useAnswered = false;
        
        document.getElementById('diode-name').textContent = this.currentDiode.name;
        this.drawDiode();
        this.populateUseOptions();
        document.getElementById('info-text').textContent = 'Select your answers above';
    }

    drawDiode() {
        const visual = document.getElementById('diode-visual');
        const diode = this.currentDiode;
        
        const cathodeOnRight = Math.random() > 0.5; // Randomize orientation
        this.correctCathodeSide = cathodeOnRight ? 'right' : 'left';
        
        let svg = '';
        
        switch(diode.type) {
            case 'rectifier':
                svg = this.drawRectifierDiode(cathodeOnRight);
                break;
            case 'zener':
                svg = this.drawZenerDiode(cathodeOnRight);
                break;
            case 'schottky':
                svg = this.drawSchottkyDiode(cathodeOnRight);
                break;
            case 'led':
                svg = this.drawLED(cathodeOnRight);
                break;
            case 'photo':
                svg = this.drawPhotoDiode(cathodeOnRight);
                break;
        }
        
        visual.innerHTML = svg;
    }

    drawRectifierDiode(cathodeRight) {
        return `
            <svg width="400" height="150" viewBox="0 0 400 150">
                <!-- Body -->
                <rect x="150" y="50" width="100" height="50" fill="#333" rx="5"/>
                
                <!-- Cathode band -->
                <rect x="${cathodeRight ? '235' : '150'}" y="50" width="15" height="50" fill="#C0C0C0"/>
                
                <!-- Leads -->
                <line x1="50" y1="75" x2="150" y2="75" stroke="#888" stroke-width="4"/>
                <line x1="250" y1="75" x2="350" y2="75" stroke="#888" stroke-width="4"/>
                
                <!-- Labels -->
                <text x="${cathodeRight ? '330' : '70'}" y="130" font-size="16" fill="#e74c3c" font-weight="bold">
                    ${cathodeRight ? 'Cathode (-)' : 'Anode (+)'}
                </text>
                <text x="${cathodeRight ? '70' : '310'}" y="130" font-size="16" fill="#27ae60" font-weight="bold">
                    ${cathodeRight ? 'Anode (+)' : 'Cathode (-)'}
                </text>
            </svg>
        `;
    }

    drawZenerDiode(cathodeRight) {
        return `
            <svg width="400" height="150" viewBox="0 0 400 150">
                <rect x="150" y="50" width="100" height="50" fill="#2c3e50" rx="5"/>
                <rect x="${cathodeRight ? '235' : '150'}" y="50" width="15" height="50" fill="#000"/>
                <line x1="50" y1="75" x2="150" y2="75" stroke="#888" stroke-width="4"/>
                <line x1="250" y1="75" x2="350" y2="75" stroke="#888" stroke-width="4"/>
                
                <!-- Zener symbol hint -->
                <text x="200" y="40" font-size="14" fill="#9b59b6" text-anchor="middle">ZENER</text>
                
                <text x="${cathodeRight ? '330' : '70'}" y="130" font-size="16" fill="#e74c3c" font-weight="bold">
                    ${cathodeRight ? 'Cathode (-)' : 'Anode (+)'}
                </text>
            </svg>
        `;
    }

    drawSchottkyDiode(cathodeRight) {
        return `
            <svg width="400" height="150" viewBox="0 0 400 150">
                <rect x="150" y="50" width="100" height="50" fill="#34495e" rx="5"/>
                <rect x="${cathodeRight ? '230' : '155'}" y="50" width="20" height="50" fill="#95a5a6"/>
                <line x1="50" y1="75" x2="150" y2="75" stroke="#888" stroke-width="4"/>
                <line x1="250" y1="75" x2="350" y2="75" stroke="#888" stroke-width="4"/>
                
                <text x="200" y="40" font-size="14" fill="#3498db" text-anchor="middle">SCHOTTKY</text>
            </svg>
        `;
    }

    drawLED(cathodeRight) {
        return `
            <svg width="400" height="200" viewBox="0 0 400 200">
                <!-- LED body -->
                <circle cx="200" cy="100" r="40" fill="#FF4444" opacity="0.7" stroke="#000" stroke-width="2"/>
                
                <!-- Flat side (cathode indicator) -->
                ${cathodeRight ? 
                    '<line x1="230" y1="80" x2="230" y2="120" stroke="#000" stroke-width="3"/>' :
                    '<line x1="170" y1="80" x2="170" y2="120" stroke="#000" stroke-width="3"/>'
                }
                
                <!-- Leads -->
                <line x1="200" y1="140" x2="200" y2="170" stroke="#888" stroke-width="3"/>
                <line x1="200" y1="60" x2="200" y2="30" stroke="#888" stroke-width="3"/>
                
                <!-- Lead indicators -->
                <text x="${cathodeRight ? '200' : '200'}" y="25" font-size="14" fill="${cathodeRight ? '#27ae60' : '#e74c3c'}" 
                      text-anchor="middle" font-weight="bold">
                    ${cathodeRight ? 'Anode (+)' : 'Cathode (-)'}
                </text>
                <text x="${cathodeRight ? '200' : '200'}" y="190" font-size="14" fill="${cathodeRight ? '#e74c3c' : '#27ae60'}" 
                      text-anchor="middle" font-weight="bold">
                    ${cathodeRight ? 'Cathode (-)' : 'Anode (+)'}
                </text>
                
                <!-- Light rays -->
                <polygon points="220,90 230,80 235,90" fill="#FFD700"/>
                <polygon points="230,85 240,75 245,85" fill="#FFD700"/>
            </svg>
        `;
    }

    drawPhotoDiode(cathodeRight) {
        return `
            <svg width="400" height="150" viewBox="0 0 400 150">
                <circle cx="200" cy="75" r="35" fill="none" stroke="#333" stroke-width="3"/>
                <circle cx="200" cy="75" r="25" fill="#3498db" opacity="0.3"/>
                
                <line x1="50" y1="75" x2="165" y2="75" stroke="#888" stroke-width="4"/>
                <line x1="235" y1="75" x2="350" y2="75" stroke="#888" stroke-width="4"/>
                
                <!-- Light arrows -->
                <polygon points="180,40 185,30 190,40" fill="#FFD700"/>
                <polygon points="200,35 205,25 210,35" fill="#FFD700"/>
                <polygon points="220,40 225,30 230,40" fill="#FFD700"/>
            </svg>
        `;
    }

    populateUseOptions() {
        const container = document.getElementById('uses-options');
        const allUses = ['Rectification', 'Protection', 'Voltage regulation', 'Fast switching', 
                         'Indicators', 'Light sensing', 'RF circuits', 'Displays'];
        
        // Shuffle and take 4 options including correct ones
        const correctUses = this.currentDiode.uses;
        const wrongUses = allUses.filter(use => !correctUses.includes(use));
        const shuffledWrong = wrongUses.sort(() => Math.random() - 0.5).slice(0, 2);
        const options = [...correctUses, ...shuffledWrong].sort(() => Math.random() - 0.5);
        
        container.innerHTML = options.map(use => `
            <button class="use-option" data-use="${use}" onclick="game.checkUse('${use}')">
                ${use}
            </button>
        `).join('');
    }

    checkCathode(side) {
        if (this.cathodeAnswered) return;
        
        this.cathodeAnswered = true;
        
        if (side === this.correctCathodeSide) {
            this.score += 50;
            this.showFeedback('✓ Correct! Cathode identified!', 'success');
            document.getElementById('info-text').textContent = 
                `Good! The cathode is marked by: ${this.currentDiode.cathode}`;
        } else {
            this.score = Math.max(0, this.score - 25);
            this.showFeedback(`✗ Wrong! Cathode is on the ${this.correctCathodeSide}`, 'error');
        }
        
        this.updateUI();
        this.checkIfComplete();
    }

    checkUse(use) {
        if (this.useAnswered) return;
        
        if (this.currentDiode.uses.includes(use)) {
            this.useAnswered = true;
            this.score += 50;
            this.correctAnswers++;
            this.showFeedback(`✓ Correct! This diode is used for ${use}`, 'success');
            
            const btn = document.querySelector(`[data-use="${use}"]`);
            btn.classList.add('correct');
            btn.disabled = true;
            
            this.checkIfComplete();
        } else {
            this.score = Math.max(0, this.score - 10);
            this.showFeedback('✗ Wrong application!', 'error');
            
            const btn = document.querySelector(`[data-use="${use}"]`);
            btn.classList.add('wrong');
            setTimeout(() => btn.classList.remove('wrong'), 1000);
        }
        
        this.updateUI();
    }

    checkIfComplete() {
        if (this.cathodeAnswered && this.useAnswered) {
            setTimeout(() => {
                this.showFeedback('🎉 Complete! Next diode...', 'success');
                setTimeout(() => this.nextQuestion(), 1500);
            }, 1000);
        }
    }

    showHint() {
        const hints = {
            rectifier: 'Look for the silver/white band - that\'s the cathode!',
            zener: 'Zener diodes have a black band on the cathode side.',
            schottky: 'Schottky diodes usually have a gray or white band.',
            led: 'LEDs have a flat side on the cathode, and shorter lead is also cathode.',
            photo: 'Photodiodes detect light and work in reverse bias mode.'
        };
        
        alert(`💡 Hint:\n\n${hints[this.currentDiode.type]}`);
    }

    showGuide() {
        const guide = `
📚 DIODE IDENTIFICATION GUIDE

🔴 CATHODE IDENTIFICATION:
• Standard Diode: Silver/white band
• Zener Diode: Black band  
• LED: Flat side, shorter lead
• Always check the marking!

⚡ DIODE TYPES:

1. RECTIFIER DIODE (1N400x):
   - Converts AC to DC
   - Forward voltage ~0.7V
   - Used in power supplies

2. ZENER DIODE:
   - Voltage regulator
   - Works in reverse breakdown
   - Precise voltage reference

3. SCHOTTKY DIODE:
   - Fast switching
   - Low forward voltage ~0.3V
   - RF and digital circuits

4. LED:
   - Light emitting
   - Forward voltage 1.8-3.3V
   - Various colors

5. PHOTODIODE:
   - Light detector
   - Solar cells
   - Optical communication

💡 CURRENT FLOW:
Current flows from Anode (+) to Cathode (-)
Diode blocks reverse current!
        `;
        
        alert(guide);
    }

    updateUI() {
        document.getElementById('diode-score').textContent = this.score;
        document.getElementById('diode-correct').textContent = this.correctAnswers;
    }

    showFeedback(message, type = 'info', duration = 1500) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-popup ${type}`;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.classList.add('show'), 10);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, duration);
    }

    addStyles() {
        if (document.getElementById('diode-detective-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'diode-detective-styles';
        styles.textContent = `
            .diode-detective-game {
                padding: 20px;
                max-width: 1000px;
                margin: 0 auto;
            }

            .diode-display {
                background: white;
                padding: 30px;
                border-radius: 16px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                margin: 20px 0;
                text-align: center;
            }

            .diode-display h3 {
                color: #2c3e50;
                margin-bottom: 20px;
            }

            .diode-visual {
                display: flex;
                justify-content: center;
                margin: 20px 0;
            }

            .questions-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 20px 0;
            }

            .question-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 25px;
                border-radius: 16px;
                color: white;
            }

            .question-card h4 {
                margin-bottom: 20px;
                font-size: 1.3rem;
            }

            .options-grid {
                display: grid;
                gap: 15px;
            }

            .option-btn {
                padding: 15px;
                font-size: 1.1rem;
                font-weight: bold;
                border: none;
                border-radius: 8px;
                background: white;
                color: #667eea;
                cursor: pointer;
                transition: all 0.3s;
            }

            .option-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            }

            .options-list {
                display: grid;
                gap: 10px;
            }

            .use-option {
                padding: 12px;
                font-size: 1rem;
                border: 2px solid white;
                border-radius: 8px;
                background: rgba(255,255,255,0.1);
                color: white;
                cursor: pointer;
                transition: all 0.3s;
            }

            .use-option:hover {
                background: rgba(255,255,255,0.3);
            }

            .use-option.correct {
                background: #27ae60;
                border-color: #27ae60;
            }

            .use-option.wrong {
                background: #e74c3c;
                animation: shake 0.5s;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }

            .info-panel {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                border-left: 4px solid #3498db;
            }

            .info-panel h4 {
                color: #3498db;
                margin-bottom: 10px;
            }

            .info-panel p {
                color: #2c3e50;
                font-size: 1.1rem;
            }

            .controls {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }

            @media (max-width: 768px) {
                .questions-section {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

if (typeof window !== 'undefined') {
    window.DiodeDetective = DiodeDetective;
}
