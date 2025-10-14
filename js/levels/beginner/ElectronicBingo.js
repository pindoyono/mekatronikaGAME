/**
 * Game 5: Electronic Bingo 🎯
 * Quick Recognition Game
 */

class ElectronicBingo {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.score = 0;
        this.gridSize = 5;
        this.grid = [];
        this.calledComponents = [];
        this.marked = [];
        
        this.components = [
            'Resistor', 'Capacitor', 'LED', 'Transistor', 'Diode',
            'Inductor', 'IC', 'Battery', 'Switch', 'Relay',
            'Crystal', 'Potentiometer', 'Transformer', 'Connector', 'Fuse',
            'Zener', 'Op-Amp', 'Photodiode', 'Thermistor', 'Varistor',
            'SCR', 'Triac', 'Optocoupler', 'Motor', 'Speaker'
        ];
    }

    start() {
        console.log('🎯 Starting Electronic Bingo Game');
        this.setupUI();
        this.generateGrid();
        this.startCalling();
    }

    init() {
        this.start();
    }

    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="bingo-game">
                <h2>🎯 Electronic Bingo</h2>
                <div class="bingo-info">
                    <div>Score: <span id="bingo-score">${this.score}</span></div>
                    <div>Called: <span id="called-count">0</span></div>
                </div>
                <div class="current-call" id="current-call">
                    Waiting to start...
                </div>
                <div class="bingo-grid" id="bingo-grid"></div>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="game.checkBingo()">
                        Check BINGO!
                    </button>
                    <button class="btn btn-secondary" onclick="game.newGame()">
                        New Game
                    </button>
                </div>
            </div>
        `;
        this.addStyles();
    }

    generateGrid() {
        const selected = this.shuffleArray([...this.components]).slice(0, 25);
        this.grid = [];
        for (let i = 0; i < 5; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 5; j++) {
                this.grid[i][j] = {
                    component: selected[i * 5 + j],
                    marked: i === 2 && j === 2 // Free space in center
                };
            }
        }
        this.renderGrid();
    }

    renderGrid() {
        const gridEl = document.getElementById('bingo-grid');
        gridEl.innerHTML = this.grid.map((row, i) => 
            row.map((cell, j) => `
                <div class="bingo-cell ${cell.marked ? 'marked' : ''}" 
                     onclick="game.markCell(${i}, ${j})">
                    ${i === 2 && j === 2 ? '★ FREE' : cell.component}
                </div>
            `).join('')
        ).join('');
    }

    startCalling() {
        const available = this.components.filter(c => !this.calledComponents.includes(c));
        if (available.length === 0) return;
        
        setTimeout(() => {
            const called = available[Math.floor(Math.random() * available.length)];
            this.calledComponents.push(called);
            document.getElementById('current-call').textContent = `🔊 ${called}`;
            document.getElementById('called-count').textContent = this.calledComponents.length;
            this.startCalling();
        }, 3000);
    }

    markCell(row, col) {
        const cell = this.grid[row][col];
        if (this.calledComponents.includes(cell.component) && !cell.marked) {
            cell.marked = true;
            this.score += 10;
            document.getElementById('bingo-score').textContent = this.score;
            this.renderGrid();
        }
    }

    checkBingo() {
        // Check rows, columns, diagonals
        let bingo = false;
        
        // Rows
        for (let i = 0; i < 5; i++) {
            if (this.grid[i].every(cell => cell.marked)) bingo = true;
        }
        
        // Columns
        for (let j = 0; j < 5; j++) {
            if (this.grid.every(row => row[j].marked)) bingo = true;
        }
        
        // Diagonals
        if (this.grid.every((row, i) => row[i].marked)) bingo = true;
        if (this.grid.every((row, i) => row[4-i].marked)) bingo = true;
        
        if (bingo) {
            alert('🎉 BINGO! You Win!\nScore: ' + (this.score + 500));
            this.score += 500;
        } else {
            alert('Not yet! Keep marking...');
        }
    }

    newGame() {
        this.score = 0;
        this.calledComponents = [];
        this.generateGrid();
        this.startCalling();
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
        if (document.getElementById('bingo-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'bingo-styles';
        styles.textContent = `
            .bingo-game {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            .bingo-info {
                display: flex;
                justify-content: space-around;
                margin: 20px 0;
                font-size: 1.2rem;
                font-weight: bold;
            }
            .current-call {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 12px;
                font-size: 1.8rem;
                font-weight: bold;
                margin: 20px 0;
                min-height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .bingo-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 10px;
                margin: 20px 0;
            }
            .bingo-cell {
                aspect-ratio: 1;
                background: white;
                border: 2px solid #667eea;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }
            .bingo-cell:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .bingo-cell.marked {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: white;
                border-color: #27ae60;
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

if (typeof window !== 'undefined') {
    window.ElectronicBingo = ElectronicBingo;
}
