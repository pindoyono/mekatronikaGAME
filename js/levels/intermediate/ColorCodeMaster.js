/**
 * LEVEL 2 - GAME 6: COLOR CODE MASTER
 * Kuasai pembacaan kode warna resistor dengan berbagai mode
 */

class ColorCodeMaster {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameId = 6;
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        this.mode = 'reading'; // 'reading' or 'building'
        this.timeLimit = 30; // seconds per question
        this.timeLeft = this.timeLimit;
        this.questionTimer = null;
        this.streak = 0;
        this.maxStreak = 0;
        
        // Color code mapping
        this.colorCodes = {
            'black': { value: 0, multiplier: 1, tolerance: null, color: '#000000' },
            'brown': { value: 1, multiplier: 10, tolerance: 1, color: '#8B4513' },
            'red': { value: 2, multiplier: 100, tolerance: 2, color: '#FF0000' },
            'orange': { value: 3, multiplier: 1000, tolerance: null, color: '#FFA500' },
            'yellow': { value: 4, multiplier: 10000, tolerance: null, color: '#FFFF00' },
            'green': { value: 5, multiplier: 100000, tolerance: 0.5, color: '#00FF00' },
            'blue': { value: 6, multiplier: 1000000, tolerance: 0.25, color: '#0000FF' },
            'violet': { value: 7, multiplier: 10000000, tolerance: 0.1, color: '#8B00FF' },
            'grey': { value: 8, multiplier: null, tolerance: 0.05, color: '#808080' },
            'white': { value: 9, multiplier: null, tolerance: null, color: '#FFFFFF' },
            'gold': { value: null, multiplier: 0.1, tolerance: 5, color: '#FFD700' },
            'silver': { value: null, multiplier: 0.01, tolerance: 10, color: '#C0C0C0' }
        };
        
        this.questions = [];
    }

    /**
     * Start the game
     */
    start() {
        console.log('🎨 Starting Color Code Master Game');
        this.generateQuestions();
        this.setupUI();
        this.showModeSelection();
    }

    /**
     * Setup game UI
     */
    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="colorcode-game">
                <!-- Mode Selection Screen -->
                <div id="mode-selection" class="mode-selection">
                    <h2>Pilih Mode Permainan</h2>
                    <div class="mode-cards">
                        <div class="mode-card" onclick="colorCodeMaster.selectMode('reading')">
                            <div class="mode-icon">📖</div>
                            <h3>Mode Reading</h3>
                            <p>Baca kode warna dan tentukan nilainya</p>
                            <span class="difficulty">⭐ Easy</span>
                        </div>
                        <div class="mode-card" onclick="colorCodeMaster.selectMode('building')">
                            <div class="mode-icon">🔧</div>
                            <h3>Mode Building</h3>
                            <p>Susun warna untuk mendapatkan nilai tertentu</p>
                            <span class="difficulty">⭐⭐ Medium</span>
                        </div>
                        <div class="mode-card" onclick="colorCodeMaster.selectMode('challenge')">
                            <div class="mode-icon">⚡</div>
                            <h3>Mode Challenge</h3>
                            <p>Random reading & building dengan timer</p>
                            <span class="difficulty">⭐⭐⭐ Hard</span>
                        </div>
                    </div>
                </div>

                <!-- Game Screen -->
                <div id="game-area" class="game-area hidden">
                    <div class="game-header">
                        <div class="question-counter">
                            Question <span id="current-q">1</span> / <span id="total-q">10</span>
                        </div>
                        <div class="timer" id="question-timer">
                            ⏱️ <span id="time-left">30</span>s
                        </div>
                        <div class="streak-counter">
                            🔥 Streak: <span id="streak">0</span>
                        </div>
                    </div>

                    <!-- Reading Mode -->
                    <div id="reading-mode" class="mode-content">
                        <h3>Berapa nilai resistor ini?</h3>
                        <div class="resistor-display" id="resistor-display">
                            <div class="resistor-body">
                                <div class="resistor-lead left"></div>
                                <div class="resistor-bands">
                                    <div class="band band-1" id="band-1"></div>
                                    <div class="band band-2" id="band-2"></div>
                                    <div class="band band-3" id="band-3"></div>
                                    <div class="band band-4" id="band-4"></div>
                                </div>
                                <div class="resistor-lead right"></div>
                            </div>
                        </div>
                        
                        <div class="answer-input">
                            <input type="number" id="value-input" placeholder="Masukkan nilai (Ohm)">
                            <select id="unit-select">
                                <option value="1">Ω</option>
                                <option value="1000">kΩ</option>
                                <option value="1000000">MΩ</option>
                            </select>
                        </div>

                        <div class="tolerance-input">
                            <label>Toleransi:</label>
                            <select id="tolerance-select">
                                <option value="">Pilih toleransi</option>
                                <option value="0.05">0.05%</option>
                                <option value="0.1">0.1%</option>
                                <option value="0.25">0.25%</option>
                                <option value="0.5">0.5%</option>
                                <option value="1">1%</option>
                                <option value="2">2%</option>
                                <option value="5">5%</option>
                                <option value="10">10%</option>
                            </select>
                        </div>
                    </div>

                    <!-- Building Mode -->
                    <div id="building-mode" class="mode-content hidden">
                        <h3>Buat resistor dengan nilai: <span id="target-value"></span></h3>
                        <div class="resistor-builder">
                            <div class="resistor-preview">
                                <div class="resistor-body">
                                    <div class="resistor-lead left"></div>
                                    <div class="resistor-bands">
                                        <div class="band builder-band-1" id="builder-band-1"></div>
                                        <div class="band builder-band-2" id="builder-band-2"></div>
                                        <div class="band builder-band-3" id="builder-band-3"></div>
                                        <div class="band builder-band-4" id="builder-band-4"></div>
                                    </div>
                                    <div class="resistor-lead right"></div>
                                </div>
                            </div>

                            <div class="color-palette">
                                <h4>Pilih Warna:</h4>
                                <div class="palette-grid" id="color-palette"></div>
                            </div>

                            <div class="band-selector">
                                <button class="band-btn" onclick="colorCodeMaster.selectBand(1)">Band 1</button>
                                <button class="band-btn" onclick="colorCodeMaster.selectBand(2)">Band 2</button>
                                <button class="band-btn" onclick="colorCodeMaster.selectBand(3)">Band 3</button>
                                <button class="band-btn" onclick="colorCodeMaster.selectBand(4)">Band 4</button>
                            </div>
                        </div>
                    </div>

                    <button class="submit-btn" onclick="colorCodeMaster.submitAnswer()">
                        ✅ Submit Jawaban
                    </button>

                    <!-- Color Reference Card -->
                    <div class="reference-card collapsible">
                        <div class="reference-header" onclick="colorCodeMaster.toggleReference()">
                            📊 Referensi Kode Warna <span id="toggle-icon">▼</span>
                        </div>
                        <div class="reference-content" id="reference-content">
                            <table class="color-table">
                                <thead>
                                    <tr>
                                        <th>Warna</th>
                                        <th>Digit</th>
                                        <th>Multiplier</th>
                                        <th>Toleransi</th>
                                    </tr>
                                </thead>
                                <tbody id="color-reference-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Result Screen -->
                <div id="question-result" class="question-result hidden">
                    <div class="result-icon" id="result-icon"></div>
                    <h3 id="result-message"></h3>
                    <div class="result-details" id="result-details"></div>
                    <button class="continue-btn" onclick="colorCodeMaster.nextQuestion()">
                        Lanjut ➡️
                    </button>
                </div>
            </div>
        `;

        this.populateColorReference();
    }

    /**
     * Populate color reference table
     */
    populateColorReference() {
        const tbody = document.getElementById('color-reference-table');
        let html = '';
        
        for (const [name, data] of Object.entries(this.colorCodes)) {
            html += `
                <tr>
                    <td>
                        <div class="color-sample" style="background-color: ${data.color}"></div>
                        ${name.charAt(0).toUpperCase() + name.slice(1)}
                    </td>
                    <td>${data.value !== null ? data.value : '-'}</td>
                    <td>${data.multiplier !== null ? this.formatMultiplier(data.multiplier) : '-'}</td>
                    <td>${data.tolerance !== null ? data.tolerance + '%' : '-'}</td>
                </tr>
            `;
        }
        
        tbody.innerHTML = html;
    }

    /**
     * Format multiplier for display
     */
    formatMultiplier(mult) {
        if (mult >= 1000000) return `${mult / 1000000}M`;
        if (mult >= 1000) return `${mult / 1000}k`;
        if (mult < 1) return `×${mult}`;
        return `×${mult}`;
    }

    /**
     * Show mode selection
     */
    showModeSelection() {
        document.getElementById('mode-selection').classList.remove('hidden');
        document.getElementById('game-area').classList.add('hidden');
    }

    /**
     * Select game mode
     */
    selectMode(mode) {
        this.mode = mode;
        document.getElementById('mode-selection').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.streak = 0;
        
        this.startQuestion();
    }

    /**
     * Generate questions
     */
    generateQuestions() {
        this.questions = [];
        
        for (let i = 0; i < this.totalQuestions; i++) {
            const question = this.generateRandomResistor();
            this.questions.push(question);
        }
    }

    /**
     * Generate random resistor
     */
    generateRandomResistor() {
        const validDigitColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
        const validMultiplierColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gold', 'silver'];
        const validToleranceColors = ['brown', 'red', 'green', 'blue', 'violet', 'grey', 'gold', 'silver'];
        
        const band1 = validDigitColors[Math.floor(Math.random() * validDigitColors.length)];
        const band2 = validDigitColors[Math.floor(Math.random() * validDigitColors.length)];
        const band3 = validMultiplierColors[Math.floor(Math.random() * validMultiplierColors.length)];
        const band4 = validToleranceColors[Math.floor(Math.random() * validToleranceColors.length)];
        
        const digit1 = this.colorCodes[band1].value;
        const digit2 = this.colorCodes[band2].value;
        const multiplier = this.colorCodes[band3].multiplier;
        const tolerance = this.colorCodes[band4].tolerance;
        
        const value = (digit1 * 10 + digit2) * multiplier;
        
        return {
            bands: [band1, band2, band3, band4],
            value: value,
            tolerance: tolerance
        };
    }

    /**
     * Start question
     */
    startQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update UI
        document.getElementById('current-q').textContent = this.currentQuestion + 1;
        document.getElementById('total-q').textContent = this.totalQuestions;
        
        // Show appropriate mode
        if (this.mode === 'reading' || this.mode === 'challenge') {
            this.showReadingMode(question);
        } else {
            this.showBuildingMode(question);
        }
        
        // Start timer
        this.startQuestionTimer();
        
        // Hide result
        document.getElementById('question-result').classList.add('hidden');
    }

    /**
     * Show reading mode
     */
    showReadingMode(question) {
        document.getElementById('reading-mode').classList.remove('hidden');
        document.getElementById('building-mode').classList.add('hidden');
        
        // Display resistor
        question.bands.forEach((color, index) => {
            const band = document.getElementById(`band-${index + 1}`);
            band.style.backgroundColor = this.colorCodes[color].color;
        });
        
        // Clear inputs
        document.getElementById('value-input').value = '';
        document.getElementById('tolerance-select').value = '';
    }

    /**
     * Show building mode
     */
    showBuildingMode(question) {
        document.getElementById('reading-mode').classList.add('hidden');
        document.getElementById('building-mode').classList.remove('hidden');
        
        // Show target value
        document.getElementById('target-value').textContent = 
            this.formatResistorValue(question.value) + ' ±' + question.tolerance + '%';
        
        // Create color palette
        this.createColorPalette();
        
        // Reset builder bands
        for (let i = 1; i <= 4; i++) {
            const band = document.getElementById(`builder-band-${i}`);
            band.style.backgroundColor = '#e0e0e0';
            band.dataset.color = '';
        }
        
        this.selectedBand = 1;
    }

    /**
     * Create color palette
     */
    createColorPalette() {
        const palette = document.getElementById('color-palette');
        let html = '';
        
        for (const [name, data] of Object.entries(this.colorCodes)) {
            html += `
                <div class="color-chip" 
                     style="background-color: ${data.color}"
                     onclick="colorCodeMaster.selectColor('${name}')"
                     title="${name}">
                </div>
            `;
        }
        
        palette.innerHTML = html;
    }

    /**
     * Select band for building
     */
    selectBand(bandNumber) {
        this.selectedBand = bandNumber;
        
        // Highlight selected band button
        document.querySelectorAll('.band-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    /**
     * Select color for building
     */
    selectColor(colorName) {
        if (!this.selectedBand) return;
        
        const band = document.getElementById(`builder-band-${this.selectedBand}`);
        band.style.backgroundColor = this.colorCodes[colorName].color;
        band.dataset.color = colorName;
        
        // Auto advance to next band
        if (this.selectedBand < 4) {
            this.selectBand(this.selectedBand + 1);
        }
    }

    /**
     * Submit answer
     */
    submitAnswer() {
        const question = this.questions[this.currentQuestion];
        let isCorrect = false;
        let userAnswer = {};
        
        if (this.mode === 'reading' || this.mode === 'challenge') {
            const valueInput = parseFloat(document.getElementById('value-input').value);
            const unit = parseFloat(document.getElementById('unit-select').value);
            const tolerance = parseFloat(document.getElementById('tolerance-select').value);
            
            const userValue = valueInput * unit;
            userAnswer = { value: userValue, tolerance: tolerance };
            
            isCorrect = (Math.abs(userValue - question.value) < 0.01) && 
                       (tolerance === question.tolerance);
        } else {
            // Building mode
            const bands = [];
            for (let i = 1; i <= 4; i++) {
                const band = document.getElementById(`builder-band-${i}`);
                bands.push(band.dataset.color);
            }
            
            userAnswer = { bands: bands };
            isCorrect = JSON.stringify(bands) === JSON.stringify(question.bands);
        }
        
        this.stopQuestionTimer();
        this.showResult(isCorrect, question, userAnswer);
    }

    /**
     * Show result
     */
    showResult(isCorrect, question, userAnswer) {
        const resultDiv = document.getElementById('question-result');
        const icon = document.getElementById('result-icon');
        const message = document.getElementById('result-message');
        const details = document.getElementById('result-details');
        
        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            
            const points = 100 + (this.streak * 10);
            this.gameEngine.addScore(points);
            
            icon.textContent = '✅';
            message.textContent = 'Benar!';
            message.className = 'correct';
            details.innerHTML = `
                <p>Nilai: ${this.formatResistorValue(question.value)}</p>
                <p>Toleransi: ±${question.tolerance}%</p>
                <p class="bonus">+${points} poin (Streak bonus: ${this.streak})</p>
            `;
            
            this.gameEngine.audioManager.play('correct');
        } else {
            this.streak = 0;
            this.gameEngine.loseLife();
            
            icon.textContent = '❌';
            message.textContent = 'Salah!';
            message.className = 'incorrect';
            details.innerHTML = `
                <p>Jawaban yang benar:</p>
                <p>Nilai: ${this.formatResistorValue(question.value)}</p>
                <p>Toleransi: ±${question.tolerance}%</p>
                <p>Bands: ${question.bands.join(', ')}</p>
            `;
            
            this.gameEngine.audioManager.play('wrong');
        }
        
        resultDiv.classList.remove('hidden');
    }

    /**
     * Next question
     */
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.totalQuestions) {
            this.finishGame();
        } else {
            this.startQuestion();
        }
    }

    /**
     * Format resistor value
     */
    formatResistorValue(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + ' MΩ';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + ' kΩ';
        } else {
            return value.toFixed(1) + ' Ω';
        }
    }

    /**
     * Start question timer
     */
    startQuestionTimer() {
        this.timeLeft = this.timeLimit;
        document.getElementById('time-left').textContent = this.timeLeft;
        
        this.questionTimer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('time-left').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.stopQuestionTimer();
                this.submitAnswer(); // Auto submit when time's up
            }
        }, 1000);
    }

    /**
     * Stop question timer
     */
    stopQuestionTimer() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }
    }

    /**
     * Toggle reference card
     */
    toggleReference() {
        const content = document.getElementById('reference-content');
        const icon = document.getElementById('toggle-icon');
        
        content.classList.toggle('hidden');
        icon.textContent = content.classList.contains('hidden') ? '▼' : '▲';
    }

    /**
     * Finish game
     */
    finishGame() {
        const percentage = (this.correctAnswers / this.totalQuestions) * 100;
        
        this.gameEngine.gameOver({
            success: percentage >= 60,
            message: `Kamu berhasil menjawab ${this.correctAnswers} dari ${this.totalQuestions} soal!`,
            stats: {
                correct: this.correctAnswers,
                total: this.totalQuestions,
                percentage: percentage.toFixed(1),
                maxStreak: this.maxStreak
            }
        });
    }

    pause() {
        this.stopQuestionTimer();
    }

    resume() {
        if (this.timeLeft > 0) {
            this.startQuestionTimer();
        }
    }

    stop() {
        this.stopQuestionTimer();
    }
}

// Export to window
window.ColorCodeMaster = ColorCodeMaster;
