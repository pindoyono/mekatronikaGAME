/**
 * GAME ENGINE - Core game management system
 * Handles game lifecycle, state management, and coordination
 */

class GameEngine {
    constructor() {
        this.currentGame = null;
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.timeElapsed = 0;
        this.timer = null;
        
        this.progressTracker = new ProgressTracker();
        this.achievementSystem = new AchievementSystem();
        this.audioManager = new AudioManager();
    }

    /**
     * Initialize the game engine
     */
    init() {
        console.log('🎮 Game Engine Initialized');
        this.loadProgress();
        this.setupEventListeners();
        this.hideLoadingScreen();
    }

    /**
     * Load all games data
     */
    loadGamesData() {
        return {
            beginner: [
                {
                    id: 1,
                    name: 'Flash Cards',
                    description: 'Pelajari komponen elektronika dengan flash cards interaktif',
                    icon: '📇',
                    difficulty: 'easy',
                    estimatedTime: '10 min',
                    skills: ['Pengenalan', 'Memorisasi'],
                    className: 'FlashCards'
                },
                {
                    id: 2,
                    name: 'Find Component',
                    description: 'Cari dan identifikasi komponen yang tepat dari gambar',
                    icon: '🔍',
                    difficulty: 'easy',
                    estimatedTime: '15 min',
                    skills: ['Identifikasi', 'Visual Recognition'],
                    className: 'FindComponent'
                },
                {
                    id: 3,
                    name: 'Symbol Memory',
                    description: 'Game memory mencocokkan komponen dengan simbolnya',
                    icon: '🧠',
                    difficulty: 'easy',
                    estimatedTime: '12 min',
                    skills: ['Hafalan Simbol', 'Memory'],
                    className: 'SymbolMemory'
                },
                {
                    id: 4,
                    name: 'Sorting Game',
                    description: 'Kelompokkan komponen berdasarkan kategorinya',
                    icon: '📦',
                    difficulty: 'easy',
                    estimatedTime: '10 min',
                    skills: ['Klasifikasi', 'Kategorisasi'],
                    className: 'SortingGame'
                },
                {
                    id: 5,
                    name: 'Electronic Bingo',
                    description: 'Bingo dengan komponen elektronika!',
                    icon: '🎯',
                    difficulty: 'easy',
                    estimatedTime: '20 min',
                    skills: ['Pengenalan Visual', 'Quick Recognition'],
                    className: 'ElectronicBingo'
                }
            ],
            intermediate: [
                {
                    id: 6,
                    name: 'Color Code Master',
                    description: 'Kuasai pembacaan kode warna resistor',
                    icon: '🎨',
                    difficulty: 'medium',
                    estimatedTime: '20 min',
                    skills: ['Reading Values', 'Color Coding'],
                    className: 'ColorCodeMaster'
                },
                {
                    id: 7,
                    name: 'Component Tester',
                    description: 'Test komponen dengan multimeter virtual',
                    icon: '🔬',
                    difficulty: 'medium',
                    estimatedTime: '25 min',
                    skills: ['Testing', 'Measurement'],
                    className: 'ComponentTester'
                },
                {
                    id: 8,
                    name: 'Pin Identifier',
                    description: 'Identifikasi pinout IC dan komponen',
                    icon: '📍',
                    difficulty: 'medium',
                    estimatedTime: '15 min',
                    skills: ['Pinout', 'IC Knowledge'],
                    className: 'PinIdentifier'
                },
                {
                    id: 9,
                    name: 'Capacitor Decoder',
                    description: 'Decode nilai kapasitor dari kode marking',
                    icon: '⚡',
                    difficulty: 'medium',
                    estimatedTime: '18 min',
                    skills: ['Decoding', 'Value Reading'],
                    className: 'CapacitorDecoder'
                },
                {
                    id: 10,
                    name: 'Diode Detective',
                    description: 'Tentukan polaritas dan jenis diode',
                    icon: '🔦',
                    difficulty: 'medium',
                    estimatedTime: '15 min',
                    skills: ['Polarity', 'Component Type'],
                    className: 'DiodeDetective'
                },
                {
                    id: 11,
                    name: 'Value Calculator',
                    description: 'Hitung nilai komponen dalam rangkaian',
                    icon: '🧮',
                    difficulty: 'medium',
                    estimatedTime: '22 min',
                    skills: ['Calculation', 'Ohm\'s Law'],
                    className: 'ValueCalculator'
                }
            ],
            advanced: [
                {
                    id: 12,
                    name: 'Circuit Builder Pro',
                    description: 'Bangun rangkaian elektronika kompleks',
                    icon: '🔧',
                    difficulty: 'hard',
                    estimatedTime: '30 min',
                    skills: ['Circuit Design', 'Schematic Reading'],
                    className: 'CircuitBuilderPro'
                },
                {
                    id: 13,
                    name: 'Breadboard Wiring',
                    description: 'Rakit rangkaian di breadboard virtual',
                    icon: '🎛️',
                    difficulty: 'hard',
                    estimatedTime: '25 min',
                    skills: ['Practical Build', 'Wiring'],
                    className: 'BreadboardWiring'
                },
                {
                    id: 14,
                    name: 'Troubleshoot Circuit',
                    description: 'Temukan dan perbaiki kesalahan rangkaian',
                    icon: '🔍',
                    difficulty: 'hard',
                    estimatedTime: '30 min',
                    skills: ['Debugging', 'Problem Solving'],
                    className: 'TroubleshootCircuit'
                },
                {
                    id: 15,
                    name: 'Power Supply Designer',
                    description: 'Rancang power supply yang tepat',
                    icon: '⚙️',
                    difficulty: 'hard',
                    estimatedTime: '35 min',
                    skills: ['System Design', 'Power Electronics'],
                    className: 'PowerSupplyDesigner'
                },
                {
                    id: 16,
                    name: 'Signal Flow Adventure',
                    description: 'Ikuti aliran sinyal dalam rangkaian',
                    icon: '〰️',
                    difficulty: 'hard',
                    estimatedTime: '28 min',
                    skills: ['Signal Analysis', 'Flow Tracking'],
                    className: 'SignalFlowAdventure'
                },
                {
                    id: 17,
                    name: 'IC Function Master',
                    description: 'Pahami fungsi berbagai IC populer',
                    icon: '💾',
                    difficulty: 'hard',
                    estimatedTime: '30 min',
                    skills: ['IC Application', 'Function Understanding'],
                    className: 'ICFunctionMaster'
                }
            ],
            expert: [
                {
                    id: 18,
                    name: 'Circuit Design Challenge',
                    description: 'Tantangan merancang rangkaian kompleks',
                    icon: '🏗️',
                    difficulty: 'expert',
                    estimatedTime: '45 min',
                    skills: ['Problem Solving', 'Advanced Design'],
                    className: 'CircuitDesignChallenge'
                },
                {
                    id: 19,
                    name: 'PCB Layout Puzzle',
                    description: 'Selesaikan puzzle layout PCB',
                    icon: '🧩',
                    difficulty: 'expert',
                    estimatedTime: '40 min',
                    skills: ['Layout Design', 'PCB Knowledge'],
                    className: 'PCBLayoutPuzzle'
                },
                {
                    id: 20,
                    name: 'Oscilloscope Master',
                    description: 'Analisis waveform dengan oscilloscope',
                    icon: '📊',
                    difficulty: 'expert',
                    estimatedTime: '35 min',
                    skills: ['Waveform Analysis', 'Measurement'],
                    className: 'OscilloscopeMaster'
                },
                {
                    id: 21,
                    name: 'Sensor Integration',
                    description: 'Integrasikan sensor dalam sistem',
                    icon: '📡',
                    difficulty: 'expert',
                    estimatedTime: '40 min',
                    skills: ['System Integration', 'Sensor Tech'],
                    className: 'SensorIntegration'
                },
                {
                    id: 22,
                    name: 'Motor Control Designer',
                    description: 'Rancang sistem kontrol motor',
                    icon: '🎚️',
                    difficulty: 'expert',
                    estimatedTime: '45 min',
                    skills: ['Control Circuit', 'Motor Driver'],
                    className: 'MotorControlDesigner'
                },
                {
                    id: 23,
                    name: 'Filter Design Workshop',
                    description: 'Workshop merancang filter analog',
                    icon: '🎛️',
                    difficulty: 'expert',
                    estimatedTime: '50 min',
                    skills: ['Advanced Design', 'Filter Theory'],
                    className: 'FilterDesignWorkshop'
                }
            ],
            special: [
                {
                    id: 24,
                    name: 'Electronics Lab Story',
                    description: 'Mode story: Petualangan di lab elektronika',
                    icon: '📖',
                    difficulty: 'all',
                    estimatedTime: '120+ min',
                    skills: ['Comprehensive', 'All Skills'],
                    className: 'ElectronicsLabStory'
                },
                {
                    id: 25,
                    name: 'Component Battle Arena',
                    description: 'Mode multiplayer: Kompetisi pengetahuan elektronika',
                    icon: '⚔️',
                    difficulty: 'all',
                    estimatedTime: '30 min',
                    skills: ['Competitive Learn', 'Speed & Accuracy'],
                    className: 'ComponentBattleArena'
                }
            ]
        };
    }

    /**
     * Start a specific game
     */
    startGame(gameId) {
        const gamesData = this.loadGamesData();
        let gameData = null;
        
        // Find game in all categories
        for (const category in gamesData) {
            gameData = gamesData[category].find(g => g.id === gameId);
            if (gameData) break;
        }
        
        if (!gameData) {
            console.error('Game not found:', gameId);
            return;
        }

        console.log(`🎮 Starting game: ${gameData.name}`);
        
        // Initialize game instance
        try {
            const GameClass = window[gameData.className];
            if (!GameClass) {
                console.error(`Game class not found: ${gameData.className}`);
                return;
            }
            
            this.currentGame = new GameClass(this);
            this.gameState = 'playing';
            this.resetGameStats();
            
            // Show game screen
            this.showScreen('game-screen');
            document.getElementById('current-game-title').textContent = gameData.name;
            
            // Start the game
            this.currentGame.start();
            this.startTimer();
            
            // Play game start sound
            this.audioManager.play('gameStart');
            
        } catch (error) {
            console.error('Error starting game:', error);
        }
    }

    /**
     * Pause current game
     */
    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.stopTimer();
            if (this.currentGame && this.currentGame.pause) {
                this.currentGame.pause();
            }
            this.showPauseMenu();
            this.audioManager.play('pause');
        }
    }

    /**
     * Resume current game
     */
    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.startTimer();
            if (this.currentGame && this.currentGame.resume) {
                this.currentGame.resume();
            }
            this.hidePauseMenu();
        }
    }

    /**
     * Quit current game
     */
    quitGame() {
        if (confirm('Yakin ingin keluar? Progress tidak akan tersimpan.')) {
            this.stopGame();
            this.showScreen('main-menu');
        }
    }

    /**
     * Stop current game
     */
    stopGame() {
        if (this.currentGame) {
            if (this.currentGame.stop) {
                this.currentGame.stop();
            }
            this.currentGame = null;
        }
        this.gameState = 'menu';
        this.stopTimer();
    }

    /**
     * Game over handler
     */
    gameOver(result) {
        this.gameState = 'gameOver';
        this.stopTimer();
        
        const finalScore = this.score;
        const timeTaken = this.timeElapsed;
        
        // Save progress
        this.progressTracker.saveGameResult({
            gameId: this.currentGame.gameId,
            score: finalScore,
            time: timeTaken,
            success: result.success
        });
        
        // Check achievements
        this.achievementSystem.checkAchievements({
            score: finalScore,
            time: timeTaken,
            gameId: this.currentGame.gameId
        });
        
        // Show result screen
        this.showGameResult(result);
        
        // Play sound
        this.audioManager.play(result.success ? 'victory' : 'gameOver');
    }

    /**
     * Add score
     */
    addScore(points) {
        this.score += points;
        document.getElementById('current-score').textContent = this.score;
        
        // Visual feedback
        this.showScorePopup(points);
    }

    /**
     * Lose life
     */
    loseLife() {
        this.lives--;
        this.updateLivesDisplay();
        
        if (this.lives <= 0) {
            this.gameOver({ success: false, reason: 'No lives left' });
        } else {
            this.audioManager.play('loseLife');
        }
    }

    /**
     * Reset game stats
     */
    resetGameStats() {
        this.score = 0;
        this.lives = 3;
        this.timeElapsed = 0;
        
        document.getElementById('current-score').textContent = '0';
        document.getElementById('game-timer').textContent = '00:00';
        this.updateLivesDisplay();
    }

    /**
     * Update lives display
     */
    updateLivesDisplay() {
        const heartsHTML = '❤️'.repeat(this.lives) + '🖤'.repeat(3 - this.lives);
        document.getElementById('player-lives').innerHTML = heartsHTML;
    }

    /**
     * Start game timer
     */
    startTimer() {
        this.timer = setInterval(() => {
            this.timeElapsed++;
            this.updateTimerDisplay();
        }, 1000);
    }

    /**
     * Stop game timer
     */
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    /**
     * Update timer display
     */
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('game-timer').textContent = timeString;
    }

    /**
     * Show screen
     */
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.gameState === 'playing') {
                    this.pauseGame();
                } else if (this.gameState === 'paused') {
                    this.resumeGame();
                }
            }
        });
    }

    /**
     * Load saved progress
     */
    loadProgress() {
        this.progressTracker.load();
        this.updateMainMenuStats();
    }

    /**
     * Update main menu stats
     */
    updateMainMenuStats() {
        const stats = this.progressTracker.getStats();
        
        document.getElementById('total-score').textContent = stats.totalScore || 0;
        document.getElementById('games-completed').textContent = 
            `${stats.gamesCompleted || 0}/25`;
        document.getElementById('achievements-earned').textContent = 
            stats.achievementsEarned || 0;
        document.getElementById('player-level').textContent = 
            `Level ${stats.playerLevel || 1}`;
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 300); // Changed from 1500 to 300ms for faster loading
    }

    /**
     * Show score popup animation
     */
    showScorePopup(points) {
        const popup = document.createElement('div');
        popup.className = 'score-popup';
        popup.textContent = `+${points}`;
        popup.style.left = '50%';
        popup.style.top = '30%';
        document.body.appendChild(popup);
        
        setTimeout(() => popup.remove(), 1000);
    }

    /**
     * Show pause menu
     */
    showPauseMenu() {
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <h2>⏸️ PAUSE</h2>
            <div class="pause-menu">
                <button class="menu-btn primary" onclick="gameEngine.resumeGame()">
                    ▶️ Lanjutkan
                </button>
                <button class="menu-btn" onclick="gameEngine.restartGame()">
                    🔄 Mulai Ulang
                </button>
                <button class="menu-btn" onclick="gameEngine.quitGame()">
                    🚪 Keluar ke Menu
                </button>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    /**
     * Hide pause menu
     */
    hidePauseMenu() {
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    /**
     * Show game result
     */
    showGameResult(result) {
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        
        const stars = this.calculateStars(result);
        const starsHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
        
        body.innerHTML = `
            <div class="result-screen ${result.success ? 'victory' : 'defeat'}">
                <h2>${result.success ? '🎉 VICTORY!' : '😔 GAME OVER'}</h2>
                <div class="stars">${starsHTML}</div>
                <div class="result-stats">
                    <div class="stat">
                        <span class="label">Score:</span>
                        <span class="value">${this.score}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Time:</span>
                        <span class="value">${this.formatTime(this.timeElapsed)}</span>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="menu-btn primary" onclick="gameEngine.restartGame()">
                        🔄 Main Lagi
                    </button>
                    <button class="menu-btn" onclick="gameEngine.nextGame()">
                        ➡️ Game Selanjutnya
                    </button>
                    <button class="menu-btn" onclick="gameEngine.backToMenu()">
                        🏠 Kembali ke Menu
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    /**
     * Calculate stars based on performance
     */
    calculateStars(result) {
        if (!result.success) return 0;
        
        let stars = 1;
        if (this.score > 500) stars = 2;
        if (this.score > 1000) stars = 3;
        
        return stars;
    }

    /**
     * Format time
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Restart current game
     */
    restartGame() {
        const currentGameId = this.currentGame.gameId;
        this.stopGame();
        this.startGame(currentGameId);
        this.hidePauseMenu();
    }

    /**
     * Go to next game
     */
    nextGame() {
        const currentId = this.currentGame.gameId;
        const nextId = currentId < 25 ? currentId + 1 : 1;
        this.stopGame();
        this.startGame(nextId);
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    /**
     * Back to main menu
     */
    backToMenu() {
        this.stopGame();
        this.showScreen('main-menu');
        document.getElementById('modal-overlay').classList.add('hidden');
        this.updateMainMenuStats();
    }
}

// Global instance
const gameEngine = new GameEngine();
