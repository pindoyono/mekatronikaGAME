/**
 * MAIN APP SCRIPT
 * Initialize and coordinate all game systems
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Mekatronika Master - Initializing...');
    console.log('📍 Current URL:', window.location.href);
    console.log('📍 Document Ready State:', document.readyState);
    
    // Animate loading progress
    const loadingProgress = document.getElementById('loading-progress');
    if (loadingProgress) {
        console.log('✅ Loading progress element found');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            loadingProgress.style.width = progress + '%';
            if (progress >= 100) clearInterval(interval);
        }, 50);
    } else {
        console.warn('⚠️ Loading progress element not found');
    }
    
    // Check if GameEngine is loaded
    if (typeof GameEngine === 'undefined') {
        console.error('❌ GameEngine class not found!');
        return;
    }
    console.log('✅ GameEngine class loaded');
    
    // Check if gameEngine instance exists
    if (typeof gameEngine === 'undefined') {
        console.error('❌ gameEngine instance not found!');
        return;
    }
    console.log('✅ gameEngine instance found');
    
    // Initialize game engine
    try {
        gameEngine.init();
        console.log('✅ Game engine initialized');
    } catch (error) {
        console.error('❌ Error initializing game engine:', error);
        return;
    }
    
    // Populate level select
    try {
        populateLevelSelect();
        console.log('✅ Level select populated');
    } catch (error) {
        console.error('❌ Error populating level select:', error);
    }
    
    // Setup Konami code easter egg
    try {
        setupKonamiCode();
        console.log('✅ Konami code setup complete');
    } catch (error) {
        console.error('❌ Error setting up Konami code:', error);
    }
    
    // Setup event listeners
    try {
        setupEventListeners();
        console.log('✅ Event listeners setup complete');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
    
    console.log('✅ Game Ready!');
    console.log('💡 Use window.debugGame() to see debug report');
    console.log('💡 Use window.showDebug() to see error summary');
});

/**
 * Start game from main menu
 */
function startGame() {
    console.log('🎯 startGame() called');
    
    try {
        // Find first incomplete game
        const progress = gameEngine.progressTracker.data;
        let gameToStart = 1;
        
        for (let i = 1; i <= 25; i++) {
            if (!progress.gamesCompleted.includes(i)) {
                gameToStart = i;
                break;
            }
        }
        
        console.log('🎮 Starting game:', gameToStart);
        gameEngine.loadGame(gameToStart);
    } catch (error) {
        console.error('❌ Error in startGame():', error);
    }
}

/**
 * Show level select screen
 */
function showLevelSelect() {
    console.log('🎯 showLevelSelect() called');
    try {
        gameEngine.showScreen('level-select');
    } catch (error) {
        console.error('❌ Error in showLevelSelect():', error);
    }
}

/**
 * Show main menu
 */
function showMainMenu() {
    console.log('🎯 showMainMenu() called');
    try {
        gameEngine.showScreen('main-menu');
        gameEngine.updateMainMenuStats();
    } catch (error) {
        console.error('❌ Error in showMainMenu():', error);
    }
}

/**
 * Show progress screen
 */
function showProgress() {
    console.log('🎯 showProgress() called');
    try {
        const stats = gameEngine.progressTracker.getStats();
        const levelProgress = gameEngine.progressTracker.getLevelProgress();
    
    const modal = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="progress-screen">
            <h2>📈 Your Progress</h2>
            
            <div class="level-progress-card">
                <h3>Level ${stats.playerLevel}</h3>
                <div class="xp-bar">
                    <div class="xp-fill" style="width: ${levelProgress.percentage}%"></div>
                </div>
                <p>${levelProgress.current} / ${levelProgress.required} XP</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">${stats.totalScore.toLocaleString()}</div>
                    <div class="stat-label">Total Score</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${stats.gamesCompleted}/25</div>
                    <div class="stat-label">Games Completed</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${stats.achievementsEarned}</div>
                    <div class="stat-label">Achievements</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">${stats.accuracy}%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏱️</div>
                    <div class="stat-value">${stats.totalPlayTime}</div>
                    <div class="stat-label">Play Time</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${stats.longestStreak}</div>
                    <div class="stat-label">Best Streak</div>
                </div>
            </div>
            
            <h3>Skill Points</h3>
            <div class="skill-bars">
                ${Object.entries(stats.skillPoints).map(([skill, points]) => `
                    <div class="skill-bar">
                        <div class="skill-name">${skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                        <div class="skill-progress">
                            <div class="skill-fill" style="width: ${Math.min(points / 10, 100)}%"></div>
                        </div>
                        <div class="skill-value">${points}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="progress-actions">
                <button class="menu-btn" onclick="gameEngine.progressTracker.export()">
                    📥 Export Progress
                </button>
                <button class="menu-btn" onclick="importProgress()">
                    📤 Import Progress
                </button>
                <button class="menu-btn danger" onclick="gameEngine.progressTracker.reset()">
                    🔄 Reset Progress
                </button>
            </div>
        </div>
    `;
    
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Error in showProgress():', error);
    }
}

/**
 * Import progress from file
 */
function importProgress() {
    console.log('🎯 importProgress() called');
    try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                gameEngine.progressTracker.import(file);
            }
        };
        input.click();
    } catch (error) {
        console.error('❌ Error in importProgress():', error);
    }
}

/**
 * Show achievements screen
 */
function showAchievements() {
    console.log('🎯 showAchievements() called');
    try {
        const achievements = gameEngine.achievementSystem.getAllAchievements();
        const unlockPercentage = gameEngine.achievementSystem.getUnlockPercentage();
        const totalPoints = gameEngine.achievementSystem.getTotalPoints();
        
        // Group by category
        const categories = {};
        achievements.forEach(achievement => {
            if (!categories[achievement.category]) {
                categories[achievement.category] = [];
            }
            categories[achievement.category].push(achievement);
        });
        
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="achievements-screen">
                <h2>🏆 Achievements</h2>
                
                <div class="achievement-summary">
                    <div class="summary-stat">
                        <strong>${unlockPercentage}%</strong> Unlocked
                    </div>
                    <div class="summary-stat">
                        <strong>${totalPoints}</strong> Total Points
                    </div>
                </div>
                
                <div class="achievements-list">
                    ${Object.entries(categories).map(([category, items]) => `
                        <div class="achievement-category">
                            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            <div class="achievement-grid">
                                ${items.map(achievement => `
                                    <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                                        <div class="achievement-icon">${achievement.icon}</div>
                                        <div class="achievement-info">
                                            <div class="achievement-name">${achievement.name}</div>
                                            <div class="achievement-desc">${achievement.description}</div>
                                            <div class="achievement-points">${achievement.points} points</div>
                                            ${achievement.unlocked ? 
                                                `<div class="unlock-date">Unlocked: ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>` : 
                                                '<div class="locked-badge">🔒 Locked</div>'
                                            }
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Error in showAchievements():', error);
    }
}

/**
 * Show leaderboard
 */
function showLeaderboard() {
    console.log('🎯 showLeaderboard() called');
    try {
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="leaderboard-screen">
                <h2>👥 Leaderboard</h2>
                <p class="info-message">
                    🚧 Feature coming soon!<br>
                    Leaderboard global akan tersedia setelah implementasi backend.
                </p>
                
                <div class="local-stats">
                    <h3>Your Best Scores</h3>
                    <div class="score-list">
                        ${generateLocalLeaderboard()}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Error in showLeaderboard():', error);
    }
}

/**
 * Generate local leaderboard
 */
function generateLocalLeaderboard() {
    const scores = gameEngine.progressTracker.data.gameScores;
    const gamesData = gameEngine.loadGamesData();
    
    let html = '';
    for (const [gameId, score] of Object.entries(scores)) {
        // Find game name
        let gameName = 'Game ' + gameId;
        for (const category in gamesData) {
            const game = gamesData[category].find(g => g.id == gameId);
            if (game) {
                gameName = game.name;
                break;
            }
        }
        
        html += `
            <div class="score-item">
                <div class="score-rank">#${gameId}</div>
                <div class="score-game">${gameName}</div>
                <div class="score-value">${score}</div>
            </div>
        `;
    }
    
    return html || '<p>No scores yet. Play some games!</p>';
}

/**
 * Show settings
 */
function showSettings() {
    console.log('🎯 showSettings() called');
    try {
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="settings-screen">
                <h2>⚙️ Settings</h2>
                
                <div class="setting-group">
                    <h3>Audio</h3>
                    <div class="setting-item">
                        <label>Background Music</label>
                        <input type="range" min="0" max="100" value="50" 
                               onchange="gameEngine.audioManager.setMusicVolume(this.value)">
                    </div>
                    <div class="setting-item">
                        <label>Sound Effects</label>
                        <input type="range" min="0" max="100" value="70" 
                               onchange="gameEngine.audioManager.setSFXVolume(this.value)">
                    </div>
                </div>
                
                <div class="setting-group">
                    <h3>Display</h3>
                    <div class="setting-item">
                        <label>Dark Mode</label>
                        <input type="checkbox" onchange="toggleDarkMode(this.checked)">
                    </div>
                    <div class="setting-item">
                        <label>Animations</label>
                        <input type="checkbox" checked onchange="toggleAnimations(this.checked)">
                    </div>
                </div>
                
                <div class="setting-group">
                    <h3>Player</h3>
                    <div class="setting-item">
                        <label>Player Name</label>
                        <input type="text" value="${gameEngine.progressTracker.data.playerName}" 
                               onchange="updatePlayerName(this.value)">
                    </div>
                </div>
                
                <div class="setting-group">
                    <h3>About</h3>
                    <p><strong>Mekatronika Master</strong></p>
                    <p>Version: 1.0.0</p>
                    <p>Educational Electronics Game</p>
                    <p>© 2025 All Rights Reserved</p>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Error in showSettings():', error);
    }
}

/**
 * Close modal
 */
function closeModal() {
    console.log('🎯 closeModal() called');
    try {
        document.getElementById('modal-overlay').classList.add('hidden');
    } catch (error) {
        console.error('❌ Error in closeModal():', error);
    }
}

/**
 * Pause game
 */
function pauseGame() {
    console.log('🎯 pauseGame() called');
    try {
        gameEngine.pauseGame();
    } catch (error) {
        console.error('❌ Error in pauseGame():', error);
    }
}

/**
 * Quit game
 */
function quitGame() {
    console.log('🎯 quitGame() called');
    try {
        gameEngine.quitGame();
    } catch (error) {
        console.error('❌ Error in quitGame():', error);
    }
}

/**
 * Toggle dark mode
 */
function toggleDarkMode(enabled) {
    console.log('🎯 toggleDarkMode() called:', enabled);
    try {
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled);
    } catch (error) {
        console.error('❌ Error in toggleDarkMode():', error);
    }
}

/**
 * Toggle animations
 */
function toggleAnimations(enabled) {
    console.log('🎯 toggleAnimations() called:', enabled);
    try {
        document.body.classList.toggle('no-animations', !enabled);
        localStorage.setItem('animations', enabled);
    } catch (error) {
        console.error('❌ Error in toggleAnimations():', error);
    }
}

/**
 * Update player name
 */
function updatePlayerName(name) {
    console.log('🎯 updatePlayerName() called:', name);
    try {
        gameEngine.progressTracker.data.playerName = name;
        gameEngine.progressTracker.save();
        document.getElementById('player-name').textContent = name;
    } catch (error) {
        console.error('❌ Error in updatePlayerName():', error);
    }
}

/**
 * Populate level select with games
 */
function populateLevelSelect() {
    const gamesData = gameEngine.loadGamesData();
    const progress = gameEngine.progressTracker.data;
    
    // Populate each category
    ['beginner', 'intermediate', 'advanced', 'expert', 'special'].forEach(category => {
        const container = document.getElementById(`${category}-games`);
        if (!container) return;
        
        const games = gamesData[category] || [];
        
        container.innerHTML = games.map(game => {
            const gameProgress = gameEngine.progressTracker.getGameProgress(game.id);
            const stars = '⭐'.repeat(gameProgress.stars) + '☆'.repeat(3 - gameProgress.stars);
            const locked = game.id > 1 && !progress.gamesCompleted.includes(game.id - 1);
            
            return `
                <div class="game-card ${gameProgress.completed ? 'completed' : ''} ${locked ? 'locked' : ''}" 
                     onclick="${locked ? '' : `gameEngine.startGame(${game.id})`}">
                    <div class="game-icon">${game.icon}</div>
                    <div class="game-info">
                        <h4>${game.name}</h4>
                        <p>${game.description}</p>
                        <div class="game-meta">
                            <span class="time">⏱️ ${game.estimatedTime}</span>
                            <span class="difficulty">${getDifficultyBadge(game.difficulty)}</span>
                        </div>
                        <div class="game-skills">
                            ${game.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                        ${gameProgress.completed ? `
                            <div class="game-progress">
                                <div class="stars">${stars}</div>
                                <div class="best-score">Best: ${gameProgress.bestScore}</div>
                            </div>
                        ` : ''}
                        ${locked ? '<div class="lock-icon">🔒</div>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    });
}

/**
 * Get difficulty badge
 */
function getDifficultyBadge(difficulty) {
    const badges = {
        'easy': '⭐ Easy',
        'medium': '⭐⭐ Medium',
        'hard': '⭐⭐⭐ Hard',
        'expert': '⭐⭐⭐⭐ Expert',
        'all': '🏆 All Levels'
    };
    return badges[difficulty] || difficulty;
}

/**
 * Setup Konami Code Easter Egg
 */
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                gameEngine.achievementSystem.unlock('KONAMI_CODE');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

/**
 * Setup additional event listeners
 */
function setupEventListeners() {
    // Close modal on overlay click
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') {
            closeModal();
        }
    });
    
    // Load saved settings
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const animations = localStorage.getItem('animations') !== 'false';
    
    toggleDarkMode(darkMode);
    toggleAnimations(animations);
}

/**
 * Service Worker Registration (PWA)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('❌ Service Worker registration failed:', err));
    });
}
