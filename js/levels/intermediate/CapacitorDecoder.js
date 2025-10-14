/**
 * Game 9: Capacitor Decoder ⚡
 * Skill: Decoding Capacitor Markings
 */

class CapacitorDecoder {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.level = 1;
        this.streak = 0;
        
        this.capacitors = [
            // 3-digit code system
            { marking: '104', value: 100, unit: 'nF', voltage: '50V', type: 'Ceramic' },
            { marking: '103', value: 10, unit: 'nF', voltage: '50V', type: 'Ceramic' },
            { marking: '105', value: 1, unit: 'μF', voltage: '50V', type: 'Ceramic' },
            { marking: '224', value: 220, unit: 'nF', voltage: '50V', type: 'Ceramic' },
            { marking: '473', value: 47, unit: 'nF', voltage: '50V', type: 'Ceramic' },
            
            // Direct marking
            { marking: '10μF', value: 10, unit: 'μF', voltage: '25V', type: 'Electrolytic', polarity: true },
            { marking: '100μF', value: 100, unit: 'μF', voltage: '16V', type: 'Electrolytic', polarity: true },
            { marking: '47μF', value: 47, unit: 'μF', voltage: '35V', type: 'Electrolytic', polarity: true },
            { marking: '220μF', value: 220, unit: 'μF', voltage: '25V', type: 'Electrolytic', polarity: true },
            
            // pF marking
            { marking: '100', value: 100, unit: 'pF', voltage: '50V', type: 'Ceramic' },
            { marking: '220', value: 220, unit: 'pF', voltage: '50V', type: 'Ceramic' }
        ];
    }

    init() {
        this.setupUI();
        this.nextQuestion();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="capacitor-decoder-game">
                <div class="game-header">
                    <div class="game-info">
                        <h3>⚡ Capacitor Decoder</h3>
                        <p>Decode capacitor markings</p>
                    </div>
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="cap-score">${this.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Level</span>
                            <span class="stat-value" id="cap-level">${this.level}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Streak</span>
                            <span class="stat-value" id="cap-streak">🔥 ${this.streak}</span>
                        </div>
                    </div>
                </div>

                <div class="capacitor-display">
                    <div class="cap-visual" id="cap-visual">
                        <!-- SVG will be inserted here -->
                    </div>
                    <div class="cap-marking" id="cap-marking">104</div>
                    <div class="cap-type" id="cap-type">Ceramic Capacitor</div>
                </div>

                <div class="decode-section">
                    <h4>What is the value?</h4>
                    <div class="input-group">
                        <input type="number" id="value-input" placeholder="Value" class="decode-input">
                        <select id="unit-select" class="decode-select">
                            <option value="pF">pF (picoFarad)</option>
                            <option value="nF">nF (nanoFarad)</option>
                            <option value="μF">μF (microFarad)</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label>Voltage Rating:</label>
                        <input type="text" id="voltage-input" placeholder="e.g., 50V" class="decode-input">
                    </div>

                    <button class="btn btn-primary btn-large" onclick="game.checkAnswer()">
                        ✓ Submit Answer
                    </button>
                </div>

                <div class="help-section">
                    <button class="btn btn-secondary" onclick="game.showHint()">
                        💡 Hint
                    </button>
                    <button class="btn btn-info" onclick="game.showGuide()">
                        📖 Guide
                    </button>
                </div>
            </div>
        `;
        this.addStyles();
    }

    nextQuestion() {
        this.currentCap = this.capacitors[Math.floor(Math.random() * this.capacitors.length)];
        
        // Update display
        document.getElementById('cap-marking').textContent = this.currentCap.marking;
        document.getElementById('cap-type').textContent = this.currentCap.type + ' Capacitor';
        
        // Draw capacitor
        this.drawCapacitor();
        
        // Clear inputs
        document.getElementById('value-input').value = '';
        document.getElementById('voltage-input').value = '';
        document.getElementById('unit-select').value = 'nF';
    }

    drawCapacitor() {
        const visual = document.getElementById('cap-visual');
        const cap = this.currentCap;
        
        if (cap.type === 'Electrolytic') {
            visual.innerHTML = `
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#C0C0C0;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#808080;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    
                    <!-- Electrolytic body -->
                    <rect x="70" y="40" width="60" height="100" fill="url(#metalGrad)" 
                          stroke="#333" stroke-width="2" rx="5"/>
                    
                    <!-- Polarity stripe -->
                    <rect x="65" y="40" width="8" height="100" fill="#333"/>
                    
                    <!-- Minus signs -->
                    <line x1="67" y1="60" x2="71" y2="60" stroke="white" stroke-width="2"/>
                    <line x1="67" y1="80" x2="71" y2="80" stroke="white" stroke-width="2"/>
                    <line x1="67" y1="100" x2="71" y2="100" stroke="white" stroke-width="2"/>
                    <line x1="67" y1="120" x2="71" y2="120" stroke="white" stroke-width="2"/>
                    
                    <!-- Plus sign on top -->
                    <text x="100" y="30" font-size="20" fill="#e74c3c" text-anchor="middle" font-weight="bold">+</text>
                    
                    <!-- Leads -->
                    <line x1="85" y1="140" x2="85" y2="170" stroke="#888" stroke-width="3"/>
                    <line x1="115" y1="140" x2="115" y2="170" stroke="#888" stroke-width="3"/>
                    
                    <!-- Lead labels -->
                    <text x="85" y="185" font-size="12" fill="#e74c3c" text-anchor="middle">+</text>
                    <text x="115" y="185" font-size="12" fill="#333" text-anchor="middle">-</text>
                </svg>
            `;
        } else {
            visual.innerHTML = `
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#FFE4B5;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    
                    <!-- Ceramic disc -->
                    <ellipse cx="100" cy="90" rx="50" ry="15" fill="url(#ceramicGrad)" 
                             stroke="#8B4513" stroke-width="2"/>
                    
                    <!-- Top view -->
                    <ellipse cx="100" cy="80" rx="50" ry="15" fill="#FFE4B5" 
                             stroke="#8B4513" stroke-width="2"/>
                    
                    <!-- Leads -->
                    <line x1="70" y1="80" x2="70" y2="130" stroke="#888" stroke-width="3"/>
                    <line x1="130" y1="80" x2="130" y2="130" stroke="#888" stroke-width="3"/>
                    
                    <!-- Bend -->
                    <path d="M 70 130 Q 70 145 55 150" fill="none" stroke="#888" stroke-width="3"/>
                    <path d="M 130 130 Q 130 145 145 150" fill="none" stroke="#888" stroke-width="3"/>
                    
                    <line x1="55" y1="150" x2="55" y2="170" stroke="#888" stroke-width="3"/>
                    <line x1="145" y1="150" x2="145" y2="170" stroke="#888" stroke-width="3"/>
                </svg>
            `;
        }
    }

    checkAnswer() {
        const valueInput = parseFloat(document.getElementById('value-input').value);
        const unitInput = document.getElementById('unit-select').value;
        const voltageInput = document.getElementById('voltage-input').value.trim();
        
        const correct = this.currentCap;
        let isCorrect = true;
        let feedback = '';
        
        // Check value and unit
        if (valueInput !== correct.value || unitInput !== correct.unit) {
            isCorrect = false;
            feedback += `Value should be ${correct.value} ${correct.unit}\n`;
        }
        
        // Check voltage (optional but bonus)
        if (voltageInput.toUpperCase() !== correct.voltage.toUpperCase()) {
            feedback += `Voltage rating is ${correct.voltage}\n`;
        }
        
        if (isCorrect) {
            this.streak++;
            const points = 100 + (this.streak * 10);
            this.score += points;
            this.showFeedback(`✓ Correct! +${points} points\nStreak: ${this.streak}`, 'success');
            
            if (this.score >= this.level * 500) {
                this.level++;
                this.showFeedback(`🎉 Level Up! Now Level ${this.level}`, 'success', 2000);
            }
            
            setTimeout(() => this.nextQuestion(), 1500);
        } else {
            this.streak = 0;
            this.score = Math.max(0, this.score - 25);
            this.showFeedback(`✗ Wrong!\n${feedback}`, 'error', 2500);
        }
        
        this.updateUI();
    }

    showHint() {
        const cap = this.currentCap;
        const marking = cap.marking;
        
        let hint = '';
        
        if (marking.length === 3 && !marking.includes('μF')) {
            // 3-digit code
            const digits = marking.substring(0, 2);
            const multiplier = marking.substring(2, 3);
            hint = `Hint: ${marking} means ${digits} × 10^${multiplier} pF\n`;
            hint += `First two digits: ${digits}\n`;
            hint += `Third digit is multiplier (number of zeros)\n`;
            hint += `Result in pF, then convert to nF or μF`;
        } else {
            hint = `This is direct marking: ${marking}`;
        }
        
        alert(hint);
    }

    showGuide() {
        const guide = `
📚 CAPACITOR MARKING GUIDE

1. THREE-DIGIT CODE (Ceramic):
   - First 2 digits = value
   - Third digit = multiplier (10^n)
   - Unit is pF (picoFarad)
   
   Examples:
   • 104 = 10 × 10^4 = 100,000 pF = 100 nF = 0.1 μF
   • 103 = 10 × 10^3 = 10,000 pF = 10 nF
   • 224 = 22 × 10^4 = 220,000 pF = 220 nF

2. DIRECT MARKING (Electrolytic):
   - Value written directly: "10μF", "100μF"
   - Voltage rating: "16V", "25V", "50V"
   - Polarity matters! (+ and - markings)

3. CONVERSION:
   • 1 μF = 1,000 nF = 1,000,000 pF
   • 1 nF = 1,000 pF
   
4. POLARITY (Electrolytic):
   - Black stripe = negative lead
   - Shorter lead = negative
   - Must connect correctly!
        `;
        
        alert(guide);
    }

    updateUI() {
        document.getElementById('cap-score').textContent = this.score;
        document.getElementById('cap-level').textContent = this.level;
        document.getElementById('cap-streak').textContent = `🔥 ${this.streak}`;
    }

    showFeedback(message, type = 'info', duration = 1500) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-popup ${type}`;
        feedback.textContent = message;
        feedback.style.whiteSpace = 'pre-line';
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.classList.add('show'), 10);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, duration);
    }

    addStyles() {
        if (document.getElementById('capacitor-decoder-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'capacitor-decoder-styles';
        styles.textContent = `
            .capacitor-decoder-game {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }

            .capacitor-display {
                background: white;
                padding: 30px;
                border-radius: 16px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                margin: 20px 0;
                text-align: center;
            }

            .cap-visual {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
            }

            .cap-marking {
                font-size: 3rem;
                font-weight: bold;
                color: #2c3e50;
                font-family: 'Courier New', monospace;
                margin: 20px 0;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 3px solid #667eea;
            }

            .cap-type {
                font-size: 1.2rem;
                color: #7f8c8d;
                font-weight: 500;
            }

            .decode-section {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px;
                border-radius: 16px;
                color: white;
                margin: 20px 0;
            }

            .decode-section h4 {
                font-size: 1.5rem;
                margin-bottom: 20px;
                text-align: center;
            }

            .input-group {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                align-items: center;
            }

            .input-group label {
                font-weight: bold;
                min-width: 120px;
            }

            .decode-input {
                flex: 1;
                padding: 15px;
                font-size: 1.2rem;
                border: none;
                border-radius: 8px;
                font-weight: bold;
            }

            .decode-select {
                flex: 1;
                padding: 15px;
                font-size: 1.1rem;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                background: white;
            }

            .btn-large {
                width: 100%;
                padding: 15px;
                font-size: 1.3rem;
                margin-top: 10px;
            }

            .help-section {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }

            @media (max-width: 768px) {
                .input-group {
                    flex-direction: column;
                }
                
                .input-group label {
                    min-width: 100%;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

if (typeof window !== 'undefined') {
    window.CapacitorDecoder = CapacitorDecoder;
}
