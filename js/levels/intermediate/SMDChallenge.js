/**
 * Game 11: SMD Challenge
 * Learn to identify Surface Mount Device (SMD) component codes and packages
 */

class SMDChallenge {
    constructor() {
        this.score = 0;
        this.currentQuestion = 0;
        this.totalQuestions = 10;
        this.streak = 0;
        this.maxStreak = 0;
        this.timeLeft = 180; // 3 minutes
        this.timer = null;
        this.hintsUsed = 0;
        this.maxHints = 3;
        
        // SMD component database
        this.smdComponents = {
            resistors: [
                { code: '103', value: '10kΩ', type: 'resistor', package: '0805', explanation: '10 × 10³ Ω = 10,000Ω = 10kΩ' },
                { code: '104', value: '100kΩ', type: 'resistor', package: '0603', explanation: '10 × 10⁴ Ω = 100,000Ω = 100kΩ' },
                { code: '473', value: '47kΩ', type: 'resistor', package: '0805', explanation: '47 × 10³ Ω = 47,000Ω = 47kΩ' },
                { code: '220', value: '22Ω', type: 'resistor', package: '1206', explanation: '22 × 10⁰ Ω = 22Ω' },
                { code: '101', value: '100Ω', type: 'resistor', package: '0805', explanation: '10 × 10¹ Ω = 100Ω' },
                { code: '472', value: '4.7kΩ', type: 'resistor', package: '0603', explanation: '47 × 10² Ω = 4,700Ω = 4.7kΩ' },
                { code: '102', value: '1kΩ', type: 'resistor', package: '0805', explanation: '10 × 10² Ω = 1,000Ω = 1kΩ' },
                { code: '224', value: '220kΩ', type: 'resistor', package: '0805', explanation: '22 × 10⁴ Ω = 220,000Ω = 220kΩ' },
                { code: '681', value: '680Ω', type: 'resistor', package: '1206', explanation: '68 × 10¹ Ω = 680Ω' },
                { code: '105', value: '1MΩ', type: 'resistor', package: '0805', explanation: '10 × 10⁵ Ω = 1,000,000Ω = 1MΩ' }
            ],
            capacitors: [
                { code: '104', value: '100nF', type: 'capacitor', package: '0805', explanation: '10 × 10⁴ pF = 100,000pF = 100nF' },
                { code: '105', value: '1µF', type: 'capacitor', package: '1206', explanation: '10 × 10⁵ pF = 1,000,000pF = 1µF' },
                { code: '103', value: '10nF', type: 'capacitor', package: '0603', explanation: '10 × 10³ pF = 10,000pF = 10nF' },
                { code: '223', value: '22nF', type: 'capacitor', package: '0805', explanation: '22 × 10³ pF = 22,000pF = 22nF' },
                { code: '474', value: '470nF', type: 'capacitor', package: '1206', explanation: '47 × 10⁴ pF = 470,000pF = 470nF' },
                { code: '102', value: '1nF', type: 'capacitor', package: '0603', explanation: '10 × 10² pF = 1,000pF = 1nF' },
                { code: '220', value: '22pF', type: 'capacitor', package: '0603', explanation: '22 × 10⁰ pF = 22pF' },
                { code: '101', value: '100pF', type: 'capacitor', package: '0603', explanation: '10 × 10¹ pF = 100pF' }
            ],
            packages: [
                { name: '0201', size: '0.6mm × 0.3mm', desc: 'Ultra-small, 0.25W typical' },
                { name: '0402', size: '1.0mm × 0.5mm', desc: 'Very small, 0.063W typical' },
                { name: '0603', size: '1.6mm × 0.8mm', desc: 'Small, 0.1W typical' },
                { name: '0805', size: '2.0mm × 1.25mm', desc: 'Common, 0.125W typical' },
                { name: '1206', size: '3.2mm × 1.6mm', desc: 'Larger, 0.25W typical' },
                { name: '1210', size: '3.2mm × 2.5mm', desc: 'Large, 0.5W typical' }
            ],
            transistors: [
                { code: 'J3Y', fullCode: '2N3904', type: 'NPN', package: 'SOT-23', desc: 'General purpose NPN' },
                { code: 'K1A', fullCode: '2N3906', type: 'PNP', package: 'SOT-23', desc: 'General purpose PNP' },
                { code: '1AM', fullCode: 'BC847', type: 'NPN', package: 'SOT-23', desc: 'Low voltage NPN' },
                { code: 'A2X', fullCode: 'BC857', type: 'PNP', package: 'SOT-23', desc: 'Low voltage PNP' },
                { code: 'A9', fullCode: 'MMBT3904', type: 'NPN', package: 'SOT-23', desc: 'SMD version of 2N3904' }
            ]
        };
        
        this.currentComponent = null;
        this.questionTypes = ['decode', 'package', 'type', 'compare'];
    }

    start() {
        console.log('🔬 Starting SMD Challenge Game');
        this.init();
    }

    init() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="smd-challenge-game">
                <div class="game-header">
                    <div class="header-left">
                        <h2>🔬 SMD Challenge</h2>
                        <p class="subtitle">Master Surface Mount Device codes</p>
                    </div>
                    <div class="header-right">
                        <div class="stat-badge">
                            <span class="stat-label">Question</span>
                            <span class="stat-value" id="question-counter">1/${this.totalQuestions}</span>
                        </div>
                        <div class="stat-badge">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="score">0</span>
                        </div>
                        <div class="stat-badge time">
                            <span class="stat-label">⏱️ Time</span>
                            <span class="stat-value" id="timer">3:00</span>
                        </div>
                        <div class="stat-badge">
                            <span class="stat-label">🔥 Streak</span>
                            <span class="stat-value" id="streak">0</span>
                        </div>
                    </div>
                </div>

                <div class="smd-content">
                    <div class="smd-question-area">
                        <div id="smd-component-visual"></div>
                        <div id="question-text" class="question-text"></div>
                        <div id="hint-area" class="hint-area" style="display: none;"></div>
                    </div>

                    <div id="answer-options" class="answer-options"></div>

                    <div class="action-bar">
                        <button id="hint-btn" class="btn-secondary">
                            💡 Hint (<span id="hints-left">${this.maxHints}</span>)
                        </button>
                        <button id="guide-btn" class="btn-secondary">
                            📖 SMD Guide
                        </button>
                    </div>

                    <div id="feedback" class="feedback"></div>
                </div>

                <div id="guide-modal" class="modal" style="display: none;">
                    <div class="modal-content guide-content">
                        <span class="close-modal">&times;</span>
                        <h3>📚 SMD Component Guide</h3>
                        
                        <div class="guide-section">
                            <h4>🔢 Resistor Codes (3-digit)</h4>
                            <p><strong>Format:</strong> AB C</p>
                            <ul>
                                <li>AB = First two digits</li>
                                <li>C = Number of zeros (multiplier)</li>
                                <li>Example: 473 = 47 × 10³Ω = 47kΩ</li>
                            </ul>
                        </div>

                        <div class="guide-section">
                            <h4>⚡ Capacitor Codes (3-digit)</h4>
                            <p><strong>Format:</strong> AB C (in picofarads)</p>
                            <ul>
                                <li>AB = First two digits</li>
                                <li>C = Number of zeros</li>
                                <li>Example: 104 = 10 × 10⁴pF = 100,000pF = 100nF</li>
                            </ul>
                        </div>

                        <div class="guide-section">
                            <h4>📦 Package Sizes</h4>
                            <div class="package-grid">
                                ${this.smdComponents.packages.map(pkg => `
                                    <div class="package-item">
                                        <strong>${pkg.name}</strong>
                                        <div>${pkg.size}</div>
                                        <small>${pkg.desc}</small>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="guide-section">
                            <h4>🔌 Transistor Codes</h4>
                            <p>Usually 2-3 character codes (manufacturer specific)</p>
                            <ul>
                                <li>SOT-23: Standard 3-pin package</li>
                                <li>Check datasheet for exact pinout</li>
                                <li>Common: J3Y = 2N3904 (NPN)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.startTimer();
        this.generateQuestion();
    }

    setupEventListeners() {
        const hintBtn = document.getElementById('hint-btn');
        const guideBtn = document.getElementById('guide-btn');
        const guideModal = document.getElementById('guide-modal');
        const closeModal = document.querySelector('.close-modal');

        hintBtn.addEventListener('click', () => this.showHint());
        guideBtn.addEventListener('click', () => {
            guideModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            guideModal.style.display = 'none';
        });

        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) {
                guideModal.style.display = 'none';
            }
        });
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    generateQuestion() {
        const questionType = this.questionTypes[Math.floor(Math.random() * this.questionTypes.length)];
        
        switch(questionType) {
            case 'decode':
                this.generateDecodeQuestion();
                break;
            case 'package':
                this.generatePackageQuestion();
                break;
            case 'type':
                this.generateTypeQuestion();
                break;
            case 'compare':
                this.generateCompareQuestion();
                break;
        }

        document.getElementById('question-counter').textContent = 
            `${this.currentQuestion + 1}/${this.totalQuestions}`;
    }

    generateDecodeQuestion() {
        const componentType = Math.random() > 0.5 ? 'resistors' : 'capacitors';
        const components = this.smdComponents[componentType];
        this.currentComponent = components[Math.floor(Math.random() * components.length)];
        
        const visual = document.getElementById('smd-component-visual');
        visual.innerHTML = this.createSMDVisual(this.currentComponent);

        document.getElementById('question-text').innerHTML = `
            <h3>What is the value of this ${this.currentComponent.type}?</h3>
            <p class="component-info">SMD Code: <strong>${this.currentComponent.code}</strong></p>
            <p class="component-info">Package: <strong>${this.currentComponent.package}</strong></p>
        `;

        // Generate options
        const correctAnswer = this.currentComponent.value;
        const options = this.generateOptions(correctAnswer, componentType);
        
        this.displayOptions(options, correctAnswer);
    }

    generatePackageQuestion() {
        const allComponents = [...this.smdComponents.resistors, ...this.smdComponents.capacitors];
        this.currentComponent = allComponents[Math.floor(Math.random() * allComponents.length)];
        
        document.getElementById('smd-component-visual').innerHTML = 
            this.createPackageVisual(this.currentComponent.package);

        document.getElementById('question-text').innerHTML = `
            <h3>What package size is this component?</h3>
            <p class="component-info">The component has approximate dimensions shown above</p>
        `;

        const correctAnswer = this.currentComponent.package;
        const options = ['0603', '0805', '1206', '0402'].sort(() => Math.random() - 0.5);
        
        this.displayOptions(options, correctAnswer);
    }

    generateTypeQuestion() {
        const code = ['103', '104', '473', '224'][Math.floor(Math.random() * 4)];
        
        document.getElementById('smd-component-visual').innerHTML = `
            <div class="smd-visual">
                <div class="smd-chip">
                    <div class="smd-code">${code}</div>
                </div>
            </div>
        `;

        document.getElementById('question-text').innerHTML = `
            <h3>Is code "${code}" on a resistor or capacitor?</h3>
            <p class="hint-text">Think about the typical values and context</p>
        `;

        const options = ['Both could use this code', 'Only resistor', 'Only capacitor', 'Neither - invalid code'];
        this.displayOptions(options, 'Both could use this code');
    }

    generateCompareQuestion() {
        const resistors = this.smdComponents.resistors;
        const r1 = resistors[Math.floor(Math.random() * resistors.length)];
        const r2 = resistors[Math.floor(Math.random() * resistors.length)];
        
        this.currentComponent = { r1, r2 };

        document.getElementById('smd-component-visual').innerHTML = `
            <div class="comparison-visual">
                <div class="compare-item">
                    <div class="smd-chip small">
                        <div class="smd-code">${r1.code}</div>
                    </div>
                    <div>Component A</div>
                </div>
                <div class="vs-divider">VS</div>
                <div class="compare-item">
                    <div class="smd-chip small">
                        <div class="smd-code">${r2.code}</div>
                    </div>
                    <div>Component B</div>
                </div>
            </div>
        `;

        document.getElementById('question-text').innerHTML = `
            <h3>Which component has higher resistance?</h3>
        `;

        const val1 = this.parseValue(r1.value);
        const val2 = this.parseValue(r2.value);
        
        let correctAnswer;
        if (val1 > val2) correctAnswer = 'Component A';
        else if (val2 > val1) correctAnswer = 'Component B';
        else correctAnswer = 'Both are equal';

        const options = ['Component A', 'Component B', 'Both are equal'].sort(() => Math.random() - 0.5);
        this.displayOptions(options, correctAnswer);
    }

    parseValue(valueStr) {
        const num = parseFloat(valueStr);
        if (valueStr.includes('M')) return num * 1000000;
        if (valueStr.includes('k')) return num * 1000;
        return num;
    }

    createSMDVisual(component) {
        return `
            <svg viewBox="0 0 200 120" class="smd-svg">
                <!-- PCB Background -->
                <rect x="10" y="10" width="180" height="100" fill="#2d5016" rx="5"/>
                
                <!-- Solder pads -->
                <rect x="20" y="45" width="30" height="30" fill="#c0c0c0" rx="2"/>
                <rect x="150" y="45" width="30" height="30" fill="#c0c0c0" rx="2"/>
                
                <!-- SMD Component -->
                <rect x="50" y="40" width="100" height="40" fill="#1a1a1a" rx="2" stroke="#666" stroke-width="1"/>
                
                <!-- Component code -->
                <text x="100" y="65" text-anchor="middle" fill="#fff" font-size="16" font-family="monospace">${component.code}</text>
                
                <!-- Package label -->
                <text x="100" y="115" text-anchor="middle" fill="#fff" font-size="10">${component.package}</text>
            </svg>
        `;
    }

    createPackageVisual(packageSize) {
        const dimensions = {
            '0603': { w: 40, h: 25 },
            '0805': { w: 50, h: 32 },
            '1206': { w: 70, h: 40 },
            '0402': { w: 30, h: 18 }
        };
        
        const dim = dimensions[packageSize] || dimensions['0805'];
        
        return `
            <svg viewBox="0 0 200 120" class="smd-svg">
                <rect x="10" y="10" width="180" height="100" fill="#2d5016" rx="5"/>
                
                <!-- Component with proper size -->
                <rect x="${100 - dim.w/2}" y="${60 - dim.h/2}" 
                      width="${dim.w}" height="${dim.h}" 
                      fill="#1a1a1a" rx="1" stroke="#666" stroke-width="1"/>
                
                <!-- Dimension lines -->
                <line x1="${100 - dim.w/2 - 10}" y1="60" x2="${100 + dim.w/2 + 10}" y2="60" 
                      stroke="#ffff00" stroke-width="0.5" stroke-dasharray="2,2"/>
                <text x="100" y="95" text-anchor="middle" fill="#ffff00" font-size="8">Width</text>
            </svg>
        `;
    }

    generateOptions(correctAnswer, componentType) {
        const components = this.smdComponents[componentType];
        const options = [correctAnswer];
        
        while (options.length < 4) {
            const random = components[Math.floor(Math.random() * components.length)].value;
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    }

    displayOptions(options, correctAnswer) {
        const container = document.getElementById('answer-options');
        container.innerHTML = options.map(option => `
            <button class="option-btn" data-answer="${option}">
                ${option}
            </button>
        `).join('');

        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => this.checkAnswer(btn.dataset.answer, correctAnswer));
        });
    }

    checkAnswer(selected, correct) {
        const feedback = document.getElementById('feedback');
        const buttons = document.querySelectorAll('.option-btn');
        
        buttons.forEach(btn => btn.disabled = true);

        if (selected === correct) {
            this.score += 10 + (this.streak * 2);
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            
            feedback.className = 'feedback success';
            feedback.innerHTML = `
                <div class="feedback-icon">✓</div>
                <div class="feedback-text">
                    <strong>Correct!</strong>
                    ${this.currentComponent.explanation ? `<p>${this.currentComponent.explanation}</p>` : ''}
                    <p>+${10 + ((this.streak - 1) * 2)} points</p>
                </div>
            `;

            buttons.forEach(btn => {
                if (btn.dataset.answer === correct) {
                    btn.classList.add('correct');
                }
            });
        } else {
            this.streak = 0;
            
            feedback.className = 'feedback error';
            feedback.innerHTML = `
                <div class="feedback-icon">✗</div>
                <div class="feedback-text">
                    <strong>Wrong!</strong>
                    <p>Correct answer: <strong>${correct}</strong></p>
                    ${this.currentComponent.explanation ? `<p>${this.currentComponent.explanation}</p>` : ''}
                </div>
            `;

            buttons.forEach(btn => {
                if (btn.dataset.answer === selected) {
                    btn.classList.add('wrong');
                }
                if (btn.dataset.answer === correct) {
                    btn.classList.add('correct');
                }
            });
        }

        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion >= this.totalQuestions) {
                this.endGame();
            } else {
                feedback.className = 'feedback';
                feedback.innerHTML = '';
                document.getElementById('hint-area').style.display = 'none';
                this.generateQuestion();
            }
        }, 3000);
    }

    showHint() {
        if (this.hintsUsed >= this.maxHints) {
            alert('No hints left!');
            return;
        }

        this.hintsUsed++;
        document.getElementById('hints-left').textContent = this.maxHints - this.hintsUsed;
        
        const hintArea = document.getElementById('hint-area');
        hintArea.style.display = 'block';
        
        if (this.currentComponent.explanation) {
            hintArea.innerHTML = `
                <div class="hint-content">
                    <strong>💡 Hint:</strong> ${this.currentComponent.explanation}
                </div>
            `;
        } else {
            hintArea.innerHTML = `
                <div class="hint-content">
                    <strong>💡 Hint:</strong> Check the SMD Guide for decoding rules!
                </div>
            `;
        }

        if (this.hintsUsed >= this.maxHints) {
            document.getElementById('hint-btn').disabled = true;
        }
    }

    endGame() {
        clearInterval(this.timer);
        
        const container = document.getElementById('game-container');
        const accuracy = Math.round((this.score / (this.totalQuestions * 10)) * 100);
        
        container.innerHTML = `
            <div class="game-complete">
                <h2>🎓 SMD Challenge Complete!</h2>
                
                <div class="final-stats">
                    <div class="stat-card">
                        <div class="stat-value">${this.score}</div>
                        <div class="stat-label">Final Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.maxStreak}</div>
                        <div class="stat-label">Best Streak</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.hintsUsed}/${this.maxHints}</div>
                        <div class="stat-label">Hints Used</div>
                    </div>
                </div>

                <div class="performance-message">
                    ${this.getPerformanceMessage(accuracy)}
                </div>

                <div class="action-buttons">
                    <button onclick="window.game.init()" class="btn-primary">
                        🔄 Play Again
                    </button>
                    <button onclick="window.location.href='index.html'" class="btn-secondary">
                        🏠 Back to Menu
                    </button>
                </div>
            </div>
        `;

        // Save progress
        if (window.progressTracker) {
            window.progressTracker.updateProgress(11, this.score, true);
        }
    }

    getPerformanceMessage(accuracy) {
        if (accuracy >= 90) {
            return '🏆 Outstanding! You are an SMD expert!';
        } else if (accuracy >= 75) {
            return '🌟 Excellent work! You know your SMD codes!';
        } else if (accuracy >= 60) {
            return '👍 Good job! Keep practicing SMD identification!';
        } else {
            return '📚 Keep learning! Review the SMD guide and try again!';
        }
    }

    cleanup() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}

// Register game
window.SMDChallenge = SMDChallenge;
