/**
 * Game 3: Symbol Memory 🧠
 * Skill: Symbol Recognition & Memory
 * Concept: Match component photos with their schematic symbols
 */

class SymbolMemory {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.level = 1;
        this.score = 0;
        this.moves = 0;
        this.matchesFound = 0;
        this.totalPairs = 8;
        this.flippedCards = [];
        this.locked = false;
        this.combo = 0;
        this.cards = [];
        
        // Component pairs (photo name : symbol description)
        this.componentPairs = [
            { name: 'Resistor', color: '#8B4513', symbol: 'zigzag' },
            { name: 'Capacitor', color: '#FFD700', symbol: 'plates' },
            { name: 'LED', color: '#FF4444', symbol: 'diode-arrow' },
            { name: 'Transistor', color: '#333333', symbol: 'npn' },
            { name: 'Diode', color: '#666666', symbol: 'diode' },
            { name: 'Inductor', color: '#CD7F32', symbol: 'coil' },
            { name: 'IC', color: '#2C3E50', symbol: 'chip' },
            { name: 'Battery', color: '#27AE60', symbol: 'cell' },
            { name: 'Switch', color: '#95A5A6', symbol: 'break' },
            { name: 'Relay', color: '#3498DB', symbol: 'relay-coil' },
            { name: 'Crystal', color: '#9B59B6', symbol: 'xtal' },
            { name: 'Potentiometer', color: '#E67E22', symbol: 'variable' }
        ];
    }

    init() {
        console.log('Symbol Memory Game initialized');
        this.setupUI();
        this.startGame();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="symbol-memory-game">
                <div class="game-header">
                    <div class="game-info">
                        <h3>🧠 Symbol Memory</h3>
                        <p class="level-info">Level ${this.level} - ${this.totalPairs} Pairs</p>
                    </div>
                    <div class="game-stats">
                        <div class="stat-item">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="score">${this.score}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Moves</span>
                            <span class="stat-value" id="moves">${this.moves}</span>
                        </div>
                        <div class="stat-item combo-indicator" id="combo-indicator">
                            <span class="stat-label">Combo</span>
                            <span class="stat-value" id="combo">🔥 ${this.combo}</span>
                        </div>
                    </div>
                </div>

                <div class="progress-section">
                    <div class="matches-counter">
                        Matches: <span id="matches">${this.matchesFound}</span> / <span id="total-pairs">${this.totalPairs}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress" style="width: 0%"></div>
                    </div>
                </div>

                <div class="memory-grid" id="memory-grid">
                    <!-- Cards will be generated here -->
                </div>

                <div class="game-controls">
                    <button class="btn btn-secondary" onclick="game.resetGame()">
                        🔄 Reset
                    </button>
                    <button class="btn btn-primary" onclick="game.nextLevel()">
                        ⏭️ Next Level
                    </button>
                </div>
            </div>
        `;

        this.addStyles();
    }

    startGame() {
        this.moves = 0;
        this.matchesFound = 0;
        this.combo = 0;
        this.flippedCards = [];
        this.locked = false;
        
        // Select random pairs based on level
        const selectedPairs = this.selectRandomPairs(this.totalPairs);
        this.createCards(selectedPairs);
        this.renderCards();
        this.updateUI();
    }

    selectRandomPairs(count) {
        const shuffled = [...this.componentPairs].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    createCards(pairs) {
        this.cards = [];
        
        pairs.forEach((pair, index) => {
            // Photo card
            this.cards.push({
                id: `photo-${index}`,
                pairId: index,
                type: 'photo',
                component: pair,
                flipped: false,
                matched: false
            });
            
            // Symbol card
            this.cards.push({
                id: `symbol-${index}`,
                pairId: index,
                type: 'symbol',
                component: pair,
                flipped: false,
                matched: false
            });
        });
        
        // Shuffle cards
        this.cards = this.shuffleArray(this.cards);
    }

    renderCards() {
        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';
        grid.className = `memory-grid pairs-${this.totalPairs}`;
        
        this.cards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index);
            grid.appendChild(cardElement);
        });
    }

    createCardElement(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card';
        cardDiv.dataset.id = card.id;
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        // Front (hidden)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = card.type === 'photo' 
            ? this.createPhotoCard(card.component)
            : this.createSymbolCard(card.component);
        
        // Back
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = `
            <div class="card-back-content">
                <div class="card-pattern">?</div>
            </div>
        `;
        
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        cardDiv.appendChild(cardInner);
        
        cardDiv.onclick = () => this.flipCard(card, cardDiv);
        
        return cardDiv;
    }

    createPhotoCard(component) {
        return `
            <div class="photo-card">
                <div class="card-label">PHOTO</div>
                ${this.createComponentSVG(component, 'photo')}
                <div class="component-name">${component.name}</div>
            </div>
        `;
    }

    createSymbolCard(component) {
        return `
            <div class="symbol-card">
                <div class="card-label">SYMBOL</div>
                ${this.createComponentSVG(component, 'symbol')}
                <div class="component-name">${component.name}</div>
            </div>
        `;
    }

    createComponentSVG(component, type) {
        const size = type === 'photo' ? 80 : 80;
        
        if (type === 'photo') {
            // Realistic component representation
            return `<svg width="${size}" height="${size}" viewBox="0 0 100 100">
                <g transform="translate(50,50)">
                    ${this.getPhotoSVG(component)}
                </g>
            </svg>`;
        } else {
            // Schematic symbol
            return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" class="symbol-svg">
                <g transform="translate(50,50)">
                    ${this.getSymbolSVG(component)}
                </g>
            </svg>`;
        }
    }

    getPhotoSVG(component) {
        const color = component.color;
        
        switch(component.name) {
            case 'Resistor':
                return `
                    <rect x="-30" y="-8" width="60" height="16" fill="${color}" stroke="#000" stroke-width="1" rx="2"/>
                    <rect x="-35" y="-3" width="5" height="6" fill="#888"/>
                    <rect x="30" y="-3" width="5" height="6" fill="#888"/>
                    <rect x="-22" y="-8" width="6" height="16" fill="#8B4513"/>
                    <rect x="-10" y="-8" width="6" height="16" fill="#FF0000"/>
                    <rect x="2" y="-8" width="6" height="16" fill="#FFD700"/>
                    <rect x="14" y="-8" width="6" height="16" fill="#C0C0C0"/>
                `;
                
            case 'Capacitor':
                return `
                    <rect x="-15" y="-20" width="8" height="40" fill="${color}" stroke="#000" stroke-width="1"/>
                    <rect x="7" y="-20" width="8" height="40" fill="${color}" stroke="#000" stroke-width="1"/>
                    <line x1="-15" y1="0" x2="-25" y2="0" stroke="#888" stroke-width="2"/>
                    <line x1="15" y1="0" x2="25" y2="0" stroke="#888" stroke-width="2"/>
                    <text x="-5" y="-25" font-size="12" fill="#FF0000">+</text>
                `;
                
            case 'LED':
                return `
                    <circle cx="0" cy="0" r="15" fill="${color}" opacity="0.7" stroke="#000" stroke-width="1"/>
                    <line x1="0" y1="-25" x2="0" y2="-15" stroke="#666" stroke-width="2"/>
                    <line x1="0" y1="15" x2="0" y2="25" stroke="#666" stroke-width="2"/>
                    <polygon points="-5,-5 5,-5 0,5" fill="#FFD700" opacity="0.8"/>
                `;
                
            case 'Transistor':
                return `
                    <circle cx="0" cy="0" r="18" fill="${color}" stroke="#000" stroke-width="2"/>
                    <line x1="0" y1="-25" x2="0" y2="-18" stroke="#888" stroke-width="2"/>
                    <line x1="0" y1="18" x2="0" y2="25" stroke="#888" stroke-width="2"/>
                    <line x1="-25" y1="0" x2="-18" y2="0" stroke="#888" stroke-width="2"/>
                    <text x="-3" y="5" font-size="10" fill="#fff">T</text>
                `;
                
            default:
                return `<circle cx="0" cy="0" r="15" fill="${color}" stroke="#000" stroke-width="2"/>`;
        }
    }

    getSymbolSVG(component) {
        const color = component.color;
        
        switch(component.symbol) {
            case 'zigzag':
                return `
                    <line x1="-30" y1="0" x2="-20" y2="0" stroke="${color}" stroke-width="2"/>
                    <polyline points="-20,0 -15,-8 -10,8 -5,-8 0,8 5,-8 10,8 15,-8 20,0" 
                              fill="none" stroke="${color}" stroke-width="2"/>
                    <line x1="20" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                `;
                
            case 'plates':
                return `
                    <line x1="-30" y1="0" x2="-8" y2="0" stroke="${color}" stroke-width="2"/>
                    <line x1="-8" y1="-15" x2="-8" y2="15" stroke="${color}" stroke-width="3"/>
                    <line x1="8" y1="-15" x2="8" y2="15" stroke="${color}" stroke-width="3"/>
                    <line x1="8" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                `;
                
            case 'diode-arrow':
                return `
                    <line x1="-30" y1="0" x2="-10" y2="0" stroke="${color}" stroke-width="2"/>
                    <polygon points="-10,-10 -10,10 10,0" fill="${color}" stroke="${color}"/>
                    <line x1="10" y1="-10" x2="10" y2="10" stroke="${color}" stroke-width="2"/>
                    <line x1="10" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                    <polygon points="5,-12 10,-18 15,-12" fill="#FFD700"/>
                    <polygon points="15,-12 20,-18 25,-12" fill="#FFD700"/>
                `;
                
            case 'npn':
                return `
                    <circle cx="0" cy="0" r="18" fill="none" stroke="${color}" stroke-width="2"/>
                    <line x1="0" y1="-25" x2="0" y2="-12" stroke="${color}" stroke-width="2"/>
                    <line x1="0" y1="12" x2="0" y2="25" stroke="${color}" stroke-width="2"/>
                    <line x1="-25" y1="0" x2="-8" y2="0" stroke="${color}" stroke-width="2"/>
                    <line x1="-8" y1="-12" x2="-8" y2="12" stroke="${color}" stroke-width="3"/>
                    <line x1="-8" y1="-6" x2="0" y2="-12" stroke="${color}" stroke-width="2"/>
                    <line x1="-8" y1="6" x2="0" y2="12" stroke="${color}" stroke-width="2"/>
                    <polygon points="0,12 -3,8 3,8" fill="${color}"/>
                `;
                
            case 'diode':
                return `
                    <line x1="-30" y1="0" x2="-10" y2="0" stroke="${color}" stroke-width="2"/>
                    <polygon points="-10,-10 -10,10 10,0" fill="none" stroke="${color}" stroke-width="2"/>
                    <line x1="10" y1="-10" x2="10" y2="10" stroke="${color}" stroke-width="2"/>
                    <line x1="10" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                `;
                
            case 'coil':
                return `
                    <line x1="-30" y1="0" x2="-20" y2="0" stroke="${color}" stroke-width="2"/>
                    <path d="M -20 0 Q -15 -10 -10 0 Q -5 -10 0 0 Q 5 -10 10 0 Q 15 -10 20 0" 
                          fill="none" stroke="${color}" stroke-width="2"/>
                    <line x1="20" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                `;
                
            case 'chip':
                return `
                    <rect x="-15" y="-20" width="30" height="40" fill="none" stroke="${color}" stroke-width="2"/>
                    <circle cx="-8" cy="-12" r="2" fill="${color}"/>
                    ${[-15,-5,5,15].map(y => `<line x1="-20" y1="${y}" x2="-15" y2="${y}" stroke="${color}" stroke-width="2"/>`).join('')}
                    ${[-15,-5,5,15].map(y => `<line x1="15" y1="${y}" x2="20" y2="${y}" stroke="${color}" stroke-width="2"/>`).join('')}
                `;
                
            case 'cell':
                return `
                    <line x1="-30" y1="0" x2="-8" y2="0" stroke="${color}" stroke-width="2"/>
                    <line x1="-8" y1="-15" x2="-8" y2="15" stroke="${color}" stroke-width="4"/>
                    <line x1="8" y1="-8" x2="8" y2="8" stroke="${color}" stroke-width="4"/>
                    <line x1="8" y1="0" x2="30" y2="0" stroke="${color}" stroke-width="2"/>
                `;
                
            default:
                return `<circle cx="0" cy="0" r="15" fill="none" stroke="${color}" stroke-width="2"/>`;
        }
    }

    flipCard(card, element) {
        if (this.locked) return;
        if (card.matched) return;
        if (card.flipped) return;
        if (this.flippedCards.length >= 2) return;
        
        // Flip the card
        card.flipped = true;
        element.classList.add('flipped');
        this.flippedCards.push({ card, element });
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.checkMatch();
        }
        
        this.updateUI();
    }

    checkMatch() {
        this.locked = true;
        const [first, second] = this.flippedCards;
        
        if (first.card.pairId === second.card.pairId) {
            // Match!
            setTimeout(() => {
                this.handleMatch(first, second);
            }, 600);
        } else {
            // No match
            setTimeout(() => {
                this.handleMismatch(first, second);
            }, 1000);
        }
    }

    handleMatch(first, second) {
        first.card.matched = true;
        second.card.matched = true;
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        
        this.matchesFound++;
        this.combo++;
        
        // Calculate score with combo
        let points = 100;
        if (this.combo >= 2) points += 50;
        if (this.combo >= 3) points += 100;
        if (this.combo >= 4) points += 200;
        
        this.score += points;
        
        this.showFeedback(`✓ Match! +${points} points`, 'success');
        
        // Update combo indicator
        if (this.combo >= 2) {
            document.getElementById('combo-indicator').classList.add('active');
        }
        
        this.flippedCards = [];
        this.locked = false;
        
        // Check if game complete
        if (this.matchesFound === this.totalPairs) {
            setTimeout(() => this.levelComplete(), 1000);
        }
        
        this.updateUI();
    }

    handleMismatch(first, second) {
        first.card.flipped = false;
        second.card.flipped = false;
        first.element.classList.remove('flipped');
        second.element.classList.remove('flipped');
        
        this.combo = 0;
        document.getElementById('combo-indicator').classList.remove('active');
        
        this.flippedCards = [];
        this.locked = false;
        
        this.updateUI();
    }

    levelComplete() {
        // Calculate bonus
        const moveBonus = Math.max(0, (this.totalPairs * 3 - this.moves) * 10);
        this.score += moveBonus;
        
        this.showFeedback(
            `🎉 Level Complete!\n${moveBonus > 0 ? `+${moveBonus} move bonus\n` : ''}Total: ${this.score}`,
            'success',
            3000
        );
        
        setTimeout(() => {
            if (this.level < 3) {
                this.level++;
                this.totalPairs = this.level === 2 ? 12 : 16;
                this.startGame();
                this.updateUI();
            } else {
                this.gameComplete();
            }
        }, 3000);
    }

    gameComplete() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="game-complete-screen">
                <h2>🏆 Congratulations!</h2>
                <p class="complete-message">You've mastered all symbol memory levels!</p>
                <div class="final-stats">
                    <p>Final Score: <strong>${this.score}</strong></p>
                    <p>Total Moves: <strong>${this.moves}</strong></p>
                    <p>Efficiency: <strong>${Math.round((this.matchesFound * 2 / this.moves) * 100)}%</strong></p>
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

    resetGame() {
        if (confirm('Reset current game? Progress will be lost.')) {
            this.score = 0;
            this.startGame();
        }
    }

    nextLevel() {
        if (this.matchesFound < this.totalPairs) {
            alert('Complete current level first!');
            return;
        }
        
        if (this.level < 3) {
            this.level++;
            this.totalPairs = this.level === 2 ? 12 : 16;
            this.startGame();
        } else {
            this.gameComplete();
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('combo').textContent = `🔥 ${this.combo}`;
        document.getElementById('matches').textContent = this.matchesFound;
        document.getElementById('total-pairs').textContent = this.totalPairs;
        
        const progress = (this.matchesFound / this.totalPairs) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        
        document.querySelector('.level-info').textContent = `Level ${this.level} - ${this.totalPairs} Pairs`;
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

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    addStyles() {
        if (document.getElementById('symbol-memory-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'symbol-memory-styles';
        styles.textContent = `
            .symbol-memory-game {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .progress-section {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
            }

            .matches-counter {
                font-size: 1.3rem;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .combo-indicator {
                transition: all 0.3s ease;
            }

            .combo-indicator.active {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                transform: scale(1.1);
                animation: comboP pulse 1s infinite;
            }

            @keyframes comboPulse {
                0%, 100% { transform: scale(1.1); }
                50% { transform: scale(1.2); }
            }

            .memory-grid {
                display: grid;
                gap: 15px;
                padding: 20px;
                justify-content: center;
            }

            .memory-grid.pairs-8 {
                grid-template-columns: repeat(4, 140px);
            }

            .memory-grid.pairs-12 {
                grid-template-columns: repeat(6, 120px);
            }

            .memory-grid.pairs-16 {
                grid-template-columns: repeat(8, 110px);
            }

            .memory-card {
                width: 100%;
                aspect-ratio: 3/4;
                perspective: 1000px;
                cursor: pointer;
            }

            .card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                transition: transform 0.6s;
                transform-style: preserve-3d;
            }

            .memory-card.flipped .card-inner {
                transform: rotateY(180deg);
            }

            .card-front, .card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }

            .card-back {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .card-back-content {
                text-align: center;
                color: white;
            }

            .card-pattern {
                font-size: 3rem;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .card-front {
                background: white;
                transform: rotateY(180deg);
            }

            .photo-card, .symbol-card {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }

            .card-label {
                font-size: 0.7rem;
                font-weight: bold;
                color: #888;
                margin-bottom: 5px;
                text-transform: uppercase;
            }

            .component-name {
                font-size: 0.8rem;
                font-weight: bold;
                margin-top: 5px;
                color: #333;
            }

            .memory-card.matched {
                pointer-events: none;
            }

            .memory-card.matched .card-inner {
                animation: matchFound 0.6s ease;
            }

            @keyframes matchFound {
                0% { transform: rotateY(180deg) scale(1); }
                50% { transform: rotateY(180deg) scale(1.1); box-shadow: 0 0 20px rgba(46, 204, 113, 0.8); }
                100% { transform: rotateY(180deg) scale(1); opacity: 0.7; }
            }

            .symbol-svg {
                filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3));
            }

            .game-complete-screen {
                text-align: center;
                padding: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 20px;
                margin: 50px auto;
                max-width: 600px;
            }

            .game-complete-screen h2 {
                font-size: 2.5rem;
                margin-bottom: 20px;
            }

            .complete-message {
                font-size: 1.3rem;
                margin-bottom: 30px;
            }

            .final-stats {
                background: rgba(255,255,255,0.2);
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
            }

            .final-stats p {
                font-size: 1.2rem;
                margin: 10px 0;
            }

            .final-stats strong {
                color: #FFD700;
                font-size: 1.4rem;
            }

            @media (max-width: 768px) {
                .memory-grid.pairs-8 {
                    grid-template-columns: repeat(4, 80px);
                }
                .memory-grid.pairs-12 {
                    grid-template-columns: repeat(4, 80px);
                }
                .memory-grid.pairs-16 {
                    grid-template-columns: repeat(4, 80px);
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
    window.SymbolMemory = SymbolMemory;
}
