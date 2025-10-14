/**
 * Game 4: Sorting Game 📦
 * Skill: Component Classification
 * Concept: Drag & drop components into correct categories
 */

class SortingGame {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.level = 1;
        this.mistakes = 0;
        this.maxMistakes = 3;
        this.speed = 1;
        this.componentQueue = [];
        this.currentComponent = null;
        this.isPlaying = false;
        
        this.categories = [
            { id: 'passive', name: 'Passive', color: '#3498db', icon: '⚡' },
            { id: 'active', name: 'Active', color: '#e74c3c', icon: '🔌' },
            { id: 'semiconductor', name: 'Semiconductor', color: '#f39c12', icon: '💎' },
            { id: 'electromech', name: 'Electromechanical', color: '#9b59b6', icon: '⚙️' }
        ];
        
        this.components = [
            { name: 'Resistor', category: 'passive', color: '#8B4513' },
            { name: 'Capacitor', category: 'passive', color: '#FFD700' },
            { name: 'Inductor', category: 'passive', color: '#CD7F32' },
            { name: 'Transistor', category: 'active', color: '#333' },
            { name: 'Op-Amp', category: 'active', color: '#2C3E50' },
            { name: 'IC', category: 'active', color: '#34495E' },
            { name: 'LED', category: 'semiconductor', color: '#FF4444' },
            { name: 'Diode', category: 'semiconductor', color: '#666' },
            { name: 'Zener', category: 'semiconductor', color: '#777' },
            { name: 'Relay', category: 'electromech', color: '#3498DB' },
            { name: 'Switch', category: 'electromech', color: '#95A5A6' },
            { name: 'Connector', category: 'electromech', color: '#7F8C8D' }
        ];
    }

    init() {
        console.log('Sorting Game initialized');
        this.setupUI();
        this.startGame();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="sorting-game">
                <div class="game-header">
                    <div class="game-info">
                        <h3>📦 Component Sorting</h3>
                        <p>Drag components to the correct category</p>
                    </div>
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="score">${this.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Level</span>
                            <span class="stat-value" id="level">${this.level}</span>
                        </div>
                        <div class="stat-item mistakes">
                            <span class="stat-label">Lives</span>
                            <span class="stat-value" id="lives">${'❤️'.repeat(this.maxMistakes - this.mistakes)}</span>
                        </div>
                    </div>
                </div>

                <div class="conveyor-belt">
                    <div class="belt-line"></div>
                    <div class="component-on-belt" id="current-component">
                        <div class="component-placeholder">
                            Click START to begin
                        </div>
                    </div>
                </div>

                <div class="sorting-bins" id="sorting-bins">
                    ${this.categories.map(cat => `
                        <div class="sort-bin" data-category="${cat.id}" 
                             ondragover="event.preventDefault()" 
                             ondrop="game.handleDrop(event, '${cat.id}')">
                            <div class="bin-icon">${cat.icon}</div>
                            <div class="bin-name">${cat.name}</div>
                            <div class="bin-counter" id="count-${cat.id}">0</div>
                        </div>
                    `).join('')}
                </div>

                <div class="game-controls">
                    <button class="btn btn-primary" id="start-btn" onclick="game.toggleGame()">
                        ▶️ START
                    </button>
                    <button class="btn btn-secondary" onclick="game.showGuide()">
                        📖 Guide
                    </button>
                </div>
            </div>
        `;

        this.addStyles();
    }

    startGame() {
        this.componentQueue = this.generateQueue(20);
        this.mistakes = 0;
        this.nextComponent();
    }

    generateQueue(count) {
        const queue = [];
        for (let i = 0; i < count; i++) {
            const comp = this.components[Math.floor(Math.random() * this.components.length)];
            queue.push({ ...comp, id: `comp-${i}` });
        }
        return queue;
    }

    nextComponent() {
        if (this.componentQueue.length === 0) {
            this.levelComplete();
            return;
        }
        
        this.currentComponent = this.componentQueue.shift();
        this.displayComponent(this.currentComponent);
    }

    displayComponent(component) {
        const container = document.getElementById('current-component');
        container.innerHTML = `
            <div class="component-draggable" draggable="true" 
                 ondragstart="game.handleDragStart(event)"
                 onclick="game.handleQuickSort('${component.category}')">
                <svg width="80" height="80" viewBox="0 0 100 100">
                    <g transform="translate(50,50)">
                        ${this.getComponentSVG(component)}
                    </g>
                </svg>
                <div class="component-label">${component.name}</div>
                <div class="drag-hint">Drag or Click</div>
            </div>
        `;
        
        container.classList.add('slide-in');
        setTimeout(() => container.classList.remove('slide-in'), 500);
    }

    getComponentSVG(component) {
        const color = component.color;
        switch(component.name) {
            case 'Resistor':
                return `<rect x="-25" y="-6" width="50" height="12" fill="${color}" rx="2"/>
                        <rect x="-18" y="-6" width="4" height="12" fill="#8B4513"/>
                        <rect x="-10" y="-6" width="4" height="12" fill="#FF0000"/>`;
            case 'Capacitor':
                return `<rect x="-10" y="-15" width="5" height="30" fill="${color}"/>
                        <rect x="5" y="-15" width="5" height="30" fill="${color}"/>`;
            case 'LED':
                return `<circle cx="0" cy="0" r="12" fill="${color}" opacity="0.7"/>
                        <polygon points="0,-5 5,0 0,5 -5,0" fill="#FFD700"/>`;
            case 'Transistor':
                return `<circle cx="0" cy="0" r="15" fill="none" stroke="${color}" stroke-width="2"/>
                        <line x1="-8" y1="-8" x2="-8" y2="8" stroke="${color}" stroke-width="2"/>`;
            case 'Diode':
                return `<polygon points="-8,-10 -8,10 8,0" fill="none" stroke="${color}" stroke-width="2"/>
                        <line x1="8" y1="-10" x2="8" y2="10" stroke="${color}" stroke-width="2"/>`;
            case 'IC':
                return `<rect x="-12" y="-15" width="24" height="30" fill="${color}" rx="2"/>
                        <circle cx="-6" cy="-9" r="1.5" fill="#666"/>
                        ${[-9,-3,3,9].map(x => `<rect x="${x}" y="-18" width="2" height="3" fill="#888"/>`).join('')}`;
            default:
                return `<circle cx="0" cy="0" r="12" fill="${color}"/>`;
        }
    }

    handleDragStart(event) {
        event.dataTransfer.setData('component', JSON.stringify(this.currentComponent));
    }

    handleDrop(event, category) {
        event.preventDefault();
        const data = event.dataTransfer.getData('component');
        if (data) {
            const component = JSON.parse(data);
            this.checkSort(component, category);
        }
    }

    handleQuickSort(category) {
        if (!this.isPlaying) return;
        this.checkSort(this.currentComponent, category);
    }

    checkSort(component, category) {
        const bin = document.querySelector(`[data-category="${category}"]`);
        
        if (component.category === category) {
            // Correct!
            bin.classList.add('correct-drop');
            setTimeout(() => bin.classList.remove('correct-drop'), 500);
            
            this.score += Math.floor(100 * this.speed);
            const counter = document.getElementById(`count-${category}`);
            counter.textContent = parseInt(counter.textContent) + 1;
            
            this.showFeedback('✓ Correct!', 'success');
            
            // Speed up gradually
            if (this.score % 500 === 0) {
                this.speed += 0.1;
            }
            
            this.nextComponent();
        } else {
            // Wrong!
            bin.classList.add('wrong-drop');
            setTimeout(() => bin.classList.remove('wrong-drop'), 500);
            
            this.mistakes++;
            this.score = Math.max(0, this.score - 50);
            
            const correctCat = this.categories.find(c => c.id === component.category);
            this.showFeedback(`✗ Wrong! ${component.name} is ${correctCat.name}`, 'error');
            
            if (this.mistakes >= this.maxMistakes) {
                this.gameOver();
            }
        }
        
        this.updateUI();
    }

    toggleGame() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('start-btn');
        
        if (this.isPlaying) {
            btn.textContent = '⏸️ PAUSE';
            btn.classList.add('pause');
        } else {
            btn.textContent = '▶️ START';
            btn.classList.remove('pause');
        }
    }

    levelComplete() {
        this.level++;
        const bonus = 500;
        this.score += bonus;
        
        this.showFeedback(`🎉 Level ${this.level - 1} Complete!\n+${bonus} bonus`, 'success', 2000);
        
        setTimeout(() => {
            this.mistakes = Math.max(0, this.mistakes - 1);
            this.startGame();
            this.updateUI();
        }, 2000);
    }

    gameOver() {
        this.isPlaying = false;
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

    showGuide() {
        alert(`Component Categories:
        
Passive: Resistor, Capacitor, Inductor
Active: Transistor, Op-Amp, IC
Semiconductor: LED, Diode, Zener
Electromechanical: Relay, Switch, Connector

Drag components to the correct bin or click directly on the bin!`);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = '❤️'.repeat(Math.max(0, this.maxMistakes - this.mistakes));
    }

    showFeedback(message, type = 'info', duration = 1000) {
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
        if (document.getElementById('sorting-game-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'sorting-game-styles';
        styles.textContent = `
            .sorting-game {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .conveyor-belt {
                background: linear-gradient(180deg, #34495e 0%, #2c3e50 100%);
                height: 200px;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                margin: 20px 0;
                box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
            }

            .belt-line {
                position: absolute;
                top: 50%;
                width: 100%;
                height: 4px;
                background: repeating-linear-gradient(
                    90deg,
                    #FFD700 0px,
                    #FFD700 20px,
                    transparent 20px,
                    transparent 40px
                );
                animation: beltMove 2s linear infinite;
            }

            @keyframes beltMove {
                0% { transform: translateX(0); }
                100% { transform: translateX(-40px); }
            }

            .component-on-belt {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .component-draggable {
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                cursor: grab;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }

            .component-draggable:hover {
                transform: scale(1.05);
            }

            .component-draggable:active {
                cursor: grabbing;
            }

            .component-label {
                font-weight: bold;
                margin-top: 10px;
                color: #2c3e50;
            }

            .drag-hint {
                font-size: 0.8rem;
                color: #95a5a6;
                margin-top: 5px;
            }

            .slide-in {
                animation: slideIn 0.5s ease;
            }

            @keyframes slideIn {
                from {
                    transform: translate(-150%, -50%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, -50%);
                    opacity: 1;
                }
            }

            .sorting-bins {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin: 30px 0;
            }

            .sort-bin {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px 20px;
                border-radius: 16px;
                text-align: center;
                color: white;
                min-height: 180px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                transition: all 0.3s ease;
                cursor: pointer;
                border: 3px dashed transparent;
            }

            .sort-bin:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                border-color: rgba(255,255,255,0.5);
            }

            .sort-bin.correct-drop {
                animation: correctBounce 0.5s ease;
                border-color: #2ecc71;
            }

            .sort-bin.wrong-drop {
                animation: wrongShake 0.5s ease;
                border-color: #e74c3c;
            }

            @keyframes correctBounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); background: linear-gradient(135deg, #2ecc71, #27ae60); }
            }

            @keyframes wrongShake {
                0%, 100% { transform: translateX(0); }
                25%, 75% { transform: translateX(-10px); background: linear-gradient(135deg, #e74c3c, #c0392b); }
                50% { transform: translateX(10px); }
            }

            .bin-icon {
                font-size: 3rem;
                margin-bottom: 10px;
            }

            .bin-name {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .bin-counter {
                background: rgba(255,255,255,0.3);
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 1.1rem;
                margin-top: 10px;
            }

            .component-placeholder {
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 12px;
                color: white;
                font-size: 1.2rem;
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

            @media (max-width: 768px) {
                .sorting-bins {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {
        // Cleanup if needed
    }
}

// Register game
if (typeof window !== 'undefined') {
    window.SortingGame = SortingGame;
}
