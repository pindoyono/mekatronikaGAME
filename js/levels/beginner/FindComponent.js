/**
 * Game 2: Find Component 🔍
 * Skill: Visual Identification
 * Concept: Find specific components in a cluttered workspace
 */

class FindComponent {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.level = 1;
        this.score = 0;
        this.targetComponent = null;
        this.targetCount = 0;
        this.foundCount = 0;
        this.components = [];
        this.timeLimit = 60;
        this.timeRemaining = this.timeLimit;
        this.timer = null;
        this.hints = 3;
        this.difficulty = 'easy';
        
        // Component library for the game
        this.componentLibrary = [
            { name: 'Resistor', color: '#8B4513', shape: 'rect', width: 40, height: 15 },
            { name: 'Capacitor', color: '#FFD700', shape: 'caps', width: 30, height: 35 },
            { name: 'LED', color: '#FF4444', shape: 'led', width: 25, height: 30 },
            { name: 'Transistor', color: '#333333', shape: 'transistor', width: 30, height: 35 },
            { name: 'Diode', color: '#666666', shape: 'diode', width: 35, height: 15 },
            { name: 'IC', color: '#2C3E50', shape: 'ic', width: 40, height: 50 },
            { name: 'Inductor', color: '#CD7F32', shape: 'inductor', width: 35, height: 25 },
            { name: 'Switch', color: '#95A5A6', shape: 'switch', width: 30, height: 20 },
            { name: 'Battery', color: '#27AE60', shape: 'battery', width: 25, height: 40 },
            { name: 'Relay', color: '#3498DB', shape: 'relay', width: 35, height: 40 }
        ];
    }

    start() {
        console.log('🔍 Starting Find Component Game');
        this.setupUI();
        this.startLevel();
    }

    init() {
        console.log('Find Component Game initialized');
        this.start();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="find-component-game">
                <div class="game-header">
                    <div class="game-info">
                        <h3>🔍 Find Component</h3>
                        <p class="level-info">Level ${this.level} - ${this.difficulty.toUpperCase()}</p>
                    </div>
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="score">${this.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Time</span>
                            <span class="stat-value" id="timer">${this.timeRemaining}s</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Hints</span>
                            <span class="stat-value" id="hints">💡 ${this.hints}</span>
                        </div>
                    </div>
                </div>

                <div class="objective-panel">
                    <div class="objective-text" id="objective">
                        Find <span class="target-count">${this.targetCount}</span> 
                        <span class="target-name">${this.targetComponent?.name || '...'}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress" style="width: 0%"></div>
                    </div>
                    <div class="found-counter">
                        Found: <span id="found">${this.foundCount}</span> / <span id="target">${this.targetCount}</span>
                    </div>
                </div>

                <div class="workspace" id="workspace">
                    <!-- Components will be generated here -->
                </div>

                <div class="game-controls">
                    <button class="btn btn-secondary" onclick="game.useHint()">
                        💡 Use Hint (${this.hints})
                    </button>
                    <button class="btn btn-primary" onclick="game.skipLevel()">
                        ⏭️ Skip Level
                    </button>
                </div>
            </div>
        `;

        this.addStyles();
    }

    startLevel() {
        // Clear previous timer
        if (this.timer) clearInterval(this.timer);
        
        // Set difficulty parameters
        const params = this.getDifficultyParams();
        this.targetComponent = this.componentLibrary[Math.floor(Math.random() * this.componentLibrary.length)];
        this.targetCount = params.targetCount;
        this.foundCount = 0;
        this.timeRemaining = params.time;
        
        // Generate components
        this.generateComponents(params.totalComponents);
        
        // Update UI
        this.updateUI();
        
        // Start timer
        this.startTimer();
    }

    getDifficultyParams() {
        const difficulties = {
            easy: { targetCount: 3, totalComponents: 20, time: 60 },
            medium: { targetCount: 5, totalComponents: 35, time: 45 },
            hard: { targetCount: 7, totalComponents: 50, time: 30 }
        };
        return difficulties[this.difficulty];
    }

    generateComponents(total) {
        this.components = [];
        const workspace = document.getElementById('workspace');
        workspace.innerHTML = '';
        
        // Add target components
        for (let i = 0; i < this.targetCount; i++) {
            this.components.push({
                ...this.targetComponent,
                isTarget: true,
                found: false,
                id: `comp-${i}`
            });
        }
        
        // Add random components
        const remaining = total - this.targetCount;
        for (let i = 0; i < remaining; i++) {
            let randomComp = this.componentLibrary[Math.floor(Math.random() * this.componentLibrary.length)];
            // Avoid duplicating target component too much
            while (randomComp.name === this.targetComponent.name && Math.random() > 0.3) {
                randomComp = this.componentLibrary[Math.floor(Math.random() * this.componentLibrary.length)];
            }
            this.components.push({
                ...randomComp,
                isTarget: false,
                found: false,
                id: `comp-${this.targetCount + i}`
            });
        }
        
        // Shuffle components
        this.components = this.shuffleArray(this.components);
        
        // Render components
        this.components.forEach((comp, index) => {
            const compElement = this.createComponentElement(comp, index);
            workspace.appendChild(compElement);
        });
    }

    createComponentElement(comp, index) {
        const div = document.createElement('div');
        div.className = 'component-item';
        div.id = comp.id;
        div.style.left = `${Math.random() * 85}%`;
        div.style.top = `${Math.random() * 85}%`;
        
        // Create SVG based on shape
        const svg = this.createComponentSVG(comp);
        div.innerHTML = svg;
        
        div.onclick = () => this.handleComponentClick(comp, div);
        
        return div;
    }

    createComponentSVG(comp) {
        const { shape, color, width, height } = comp;
        
        switch(shape) {
            case 'rect':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect width="${width}" height="${height}" fill="${color}" stroke="#000" stroke-width="1" rx="2"/>
                    <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" stroke="#000" stroke-width="1"/>
                </svg>`;
                
            case 'caps':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect x="2" y="5" width="10" height="25" fill="${color}" stroke="#000" stroke-width="1"/>
                    <rect x="18" y="5" width="10" height="25" fill="${color}" stroke="#000" stroke-width="1"/>
                    <line x1="12" y1="17" x2="18" y2="17" stroke="#000" stroke-width="2"/>
                </svg>`;
                
            case 'led':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <circle cx="12" cy="15" r="10" fill="${color}" opacity="0.7" stroke="#000" stroke-width="1"/>
                    <line x1="12" y1="0" x2="12" y2="5" stroke="#666" stroke-width="2"/>
                    <line x1="12" y1="25" x2="12" y2="30" stroke="#666" stroke-width="2"/>
                </svg>`;
                
            case 'transistor':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <circle cx="15" cy="17" r="12" fill="none" stroke="${color}" stroke-width="2"/>
                    <line x1="15" y1="5" x2="15" y2="12" stroke="${color}" stroke-width="2"/>
                    <line x1="15" y1="22" x2="15" y2="30" stroke="${color}" stroke-width="2"/>
                    <line x1="8" y1="17" x2="15" y2="17" stroke="${color}" stroke-width="2"/>
                </svg>`;
                
            case 'diode':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <polygon points="10,7 10,8 25,7.5" fill="${color}" stroke="#000" stroke-width="1"/>
                    <rect x="25" y="2" width="2" height="11" fill="${color}"/>
                </svg>`;
                
            case 'ic':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect x="5" y="5" width="30" height="40" fill="${color}" stroke="#000" stroke-width="1" rx="2"/>
                    <circle cx="10" cy="10" r="2" fill="#666"/>
                    ${[0,1,2,3].map(i => `<rect x="2" y="${12 + i*8}" width="4" height="2" fill="#888"/>`).join('')}
                    ${[0,1,2,3].map(i => `<rect x="34" y="${12 + i*8}" width="4" height="2" fill="#888"/>`).join('')}
                </svg>`;
                
            case 'inductor':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <path d="M 5 12 Q 10 5 15 12 Q 20 5 25 12 Q 30 5 35 12" 
                          fill="none" stroke="${color}" stroke-width="2"/>
                </svg>`;
                
            case 'switch':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <line x1="5" y1="10" x2="10" y2="10" stroke="${color}" stroke-width="2"/>
                    <line x1="20" y1="10" x2="25" y2="10" stroke="${color}" stroke-width="2"/>
                    <line x1="10" y1="10" x2="18" y2="5" stroke="${color}" stroke-width="2"/>
                    <circle cx="10" cy="10" r="2" fill="${color}"/>
                    <circle cx="20" cy="10" r="2" fill="${color}"/>
                </svg>`;
                
            case 'battery':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect x="8" y="5" width="10" height="15" fill="${color}" stroke="#000" stroke-width="1"/>
                    <rect x="10" y="20" width="6" height="15" fill="${color}" stroke="#000" stroke-width="1"/>
                    <text x="13" y="15" font-size="8" fill="#fff" text-anchor="middle">+</text>
                </svg>`;
                
            case 'relay':
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect x="5" y="5" width="25" height="30" fill="${color}" opacity="0.3" stroke="#000" stroke-width="1"/>
                    <rect x="10" y="15" width="15" height="10" fill="${color}" stroke="#000" stroke-width="1"/>
                    ${[0,1,2,3].map(i => `<line x1="${8 + i*6}" y1="35" x2="${8 + i*6}" y2="40" stroke="#666" stroke-width="1"/>`).join('')}
                </svg>`;
                
            default:
                return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <rect width="${width}" height="${height}" fill="${color}" stroke="#000" stroke-width="1"/>
                </svg>`;
        }
    }

    handleComponentClick(comp, element) {
        if (comp.found) return;
        
        if (comp.isTarget) {
            // Correct!
            comp.found = true;
            this.foundCount++;
            element.classList.add('found-correct');
            this.score += 100;
            this.showFeedback('✓ Correct!', 'success');
            
            // Check if level complete
            if (this.foundCount === this.targetCount) {
                setTimeout(() => this.levelComplete(), 500);
            }
        } else {
            // Wrong!
            element.classList.add('found-wrong');
            this.score = Math.max(0, this.score - 25);
            this.showFeedback('✗ Wrong component!', 'error');
            setTimeout(() => element.classList.remove('found-wrong'), 800);
        }
        
        this.updateUI();
    }

    useHint() {
        if (this.hints <= 0) {
            this.showFeedback('No hints left!', 'error');
            return;
        }
        
        this.hints--;
        
        // Find an unfound target component
        const unfoundTarget = this.components.find(c => c.isTarget && !c.found);
        if (unfoundTarget) {
            const element = document.getElementById(unfoundTarget.id);
            element.classList.add('hint-highlight');
            setTimeout(() => element.classList.remove('hint-highlight'), 2000);
        }
        
        this.updateUI();
    }

    skipLevel() {
        if (confirm('Skip this level? You will lose 50 points.')) {
            this.score = Math.max(0, this.score - 50);
            this.nextLevel();
        }
    }

    levelComplete() {
        clearInterval(this.timer);
        
        // Time bonus
        const timeBonus = this.timeRemaining * 5;
        this.score += timeBonus;
        
        this.showFeedback(
            `🎉 Level Complete!\n+${timeBonus} time bonus\nTotal Score: ${this.score}`,
            'success',
            3000
        );
        
        setTimeout(() => this.nextLevel(), 3000);
    }

    nextLevel() {
        this.level++;
        
        // Increase difficulty every 3 levels
        if (this.level % 3 === 0) {
            if (this.difficulty === 'easy') this.difficulty = 'medium';
            else if (this.difficulty === 'medium') this.difficulty = 'hard';
        }
        
        // Reset hints every 2 levels
        if (this.level % 2 === 0) {
            this.hints = Math.min(this.hints + 1, 3);
        }
        
        this.startLevel();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            document.getElementById('timer').textContent = `${this.timeRemaining}s`;
            
            // Time warning
            if (this.timeRemaining === 10) {
                document.getElementById('timer').style.color = '#e74c3c';
            }
            
            if (this.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    timeUp() {
        clearInterval(this.timer);
        this.showFeedback('⏰ Time\'s up!', 'error', 2000);
        setTimeout(() => this.gameOver(), 2000);
    }

    gameOver() {
        clearInterval(this.timer);
        
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="game-over-screen">
                <h2>🎮 Game Over!</h2>
                <div class="final-stats">
                    <p>Final Score: <strong>${this.score}</strong></p>
                    <p>Levels Completed: <strong>${this.level - 1}</strong></p>
                </div>
                <button class="btn btn-primary" onclick="location.reload()">
                    🔄 Play Again
                </button>
                <button class="btn btn-secondary" onclick="window.gameEngine.showMainMenu()">
                    🏠 Main Menu
                </button>
            </div>
        `;
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('hints').textContent = `💡 ${this.hints}`;
        document.getElementById('found').textContent = this.foundCount;
        document.getElementById('target').textContent = this.targetCount;
        
        const progress = (this.foundCount / this.targetCount) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        
        // Update objective text
        document.querySelector('.target-count').textContent = this.targetCount;
        document.querySelector('.target-name').textContent = this.targetComponent?.name || '...';
        document.querySelector('.level-info').textContent = `Level ${this.level} - ${this.difficulty.toUpperCase()}`;
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

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    addStyles() {
        if (document.getElementById('find-component-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'find-component-styles';
        styles.textContent = `
            .find-component-game {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .objective-panel {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
            }

            .objective-text {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 15px;
            }

            .target-count, .target-name {
                color: #FFD700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .progress-bar {
                background: rgba(255,255,255,0.3);
                height: 20px;
                border-radius: 10px;
                overflow: hidden;
                margin: 15px 0;
            }

            .progress-fill {
                background: linear-gradient(90deg, #FFD700, #FFA500);
                height: 100%;
                transition: width 0.3s ease;
            }

            .found-counter {
                font-size: 1.2rem;
                font-weight: bold;
            }

            .workspace {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border: 3px solid #667eea;
                border-radius: 12px;
                min-height: 500px;
                position: relative;
                padding: 20px;
                margin: 20px 0;
            }

            .component-item {
                position: absolute;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 10px;
                border-radius: 8px;
            }

            .component-item:hover {
                transform: scale(1.2);
                z-index: 10;
                background: rgba(255,255,255,0.5);
            }

            .component-item.found-correct {
                animation: correctPulse 0.5s ease;
                pointer-events: none;
                opacity: 0.3;
            }

            .component-item.found-wrong {
                animation: wrongShake 0.5s ease;
            }

            .component-item.hint-highlight {
                animation: hintPulse 2s ease;
                border: 3px solid #FFD700;
                box-shadow: 0 0 20px #FFD700;
            }

            @keyframes correctPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); background: rgba(46, 204, 113, 0.5); }
            }

            @keyframes wrongShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); background: rgba(231, 76, 60, 0.5); }
                75% { transform: translateX(10px); background: rgba(231, 76, 60, 0.5); }
            }

            @keyframes hintPulse {
                0%, 100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0); }
                50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
            }

            .game-controls {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }

            .game-over-screen {
                text-align: center;
                padding: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 20px;
                margin: 50px auto;
                max-width: 500px;
            }

            .game-over-screen h2 {
                font-size: 2.5rem;
                margin-bottom: 30px;
            }

            .final-stats {
                background: rgba(255,255,255,0.2);
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
            }

            .final-stats p {
                font-size: 1.3rem;
                margin: 10px 0;
            }

            .final-stats strong {
                color: #FFD700;
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {
        if (this.timer) clearInterval(this.timer);
    }
}

// Register game
if (typeof window !== 'undefined') {
    window.FindComponent = FindComponent;
}
