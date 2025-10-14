/**
 * PROGRESS TRACKER
 * Tracks player progress, scores, and statistics
 */

class ProgressTracker {
    constructor() {
        this.storageKey = 'mekatronika_progress';
        this.data = this.getDefaultData();
    }

    /**
     * Get default progress data structure
     */
    getDefaultData() {
        return {
            playerName: 'Player 1',
            playerLevel: 1,
            totalScore: 0,
            totalXP: 0,
            gamesCompleted: [],
            gameScores: {}, // gameId: bestScore
            gameStars: {}, // gameId: stars (1-3)
            gameTimes: {}, // gameId: bestTime
            achievements: [],
            skillPoints: {
                identification: 0,
                calculation: 0,
                design: 0,
                troubleshooting: 0,
                practical: 0
            },
            statistics: {
                totalPlayTime: 0,
                gamesPlayed: 0,
                totalCorrectAnswers: 0,
                totalWrongAnswers: 0,
                longestStreak: 0,
                currentStreak: 0
            },
            lastPlayed: null,
            createdAt: new Date().toISOString()
        };
    }

    /**
     * Load progress from localStorage
     */
    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.data = { ...this.getDefaultData(), ...JSON.parse(saved) };
                console.log('📊 Progress loaded:', this.data);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    /**
     * Save progress to localStorage
     */
    save() {
        try {
            this.data.lastPlayed = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            console.log('💾 Progress saved');
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    /**
     * Save game result
     */
    saveGameResult(result) {
        const { gameId, score, time, success } = result;

        // Update game completion
        if (success && !this.data.gamesCompleted.includes(gameId)) {
            this.data.gamesCompleted.push(gameId);
        }

        // Update best score
        if (!this.data.gameScores[gameId] || score > this.data.gameScores[gameId]) {
            this.data.gameScores[gameId] = score;
        }

        // Update best time (lower is better)
        if (!this.data.gameTimes[gameId] || time < this.data.gameTimes[gameId]) {
            this.data.gameTimes[gameId] = time;
        }

        // Calculate stars
        const stars = this.calculateStars(score);
        if (!this.data.gameStars[gameId] || stars > this.data.gameStars[gameId]) {
            this.data.gameStars[gameId] = stars;
        }

        // Update total score and XP
        this.data.totalScore += score;
        this.data.totalXP += this.calculateXP(score, stars);

        // Update statistics
        this.data.statistics.gamesPlayed++;
        if (success) {
            this.data.statistics.currentStreak++;
            this.data.statistics.longestStreak = Math.max(
                this.data.statistics.longestStreak,
                this.data.statistics.currentStreak
            );
        } else {
            this.data.statistics.currentStreak = 0;
        }

        // Update skill points
        this.updateSkillPoints(gameId, score);

        // Check for level up
        this.checkLevelUp();

        this.save();
    }

    /**
     * Calculate stars based on score
     */
    calculateStars(score) {
        if (score >= 1000) return 3;
        if (score >= 500) return 2;
        if (score >= 100) return 1;
        return 0;
    }

    /**
     * Calculate XP from score
     */
    calculateXP(score, stars) {
        return Math.floor(score * (1 + stars * 0.5));
    }

    /**
     * Update skill points based on game
     */
    updateSkillPoints(gameId, score) {
        const skillMapping = {
            // Beginner (1-5): Identification
            1: 'identification', 2: 'identification', 3: 'identification',
            4: 'identification', 5: 'identification',
            
            // Intermediate (6-11): Calculation
            6: 'calculation', 7: 'calculation', 8: 'calculation',
            9: 'calculation', 10: 'calculation', 11: 'calculation',
            
            // Advanced (12-17): Design & Practical
            12: 'design', 13: 'practical', 14: 'troubleshooting',
            15: 'design', 16: 'design', 17: 'design',
            
            // Expert (18-23): Advanced skills
            18: 'design', 19: 'design', 20: 'practical',
            21: 'design', 22: 'design', 23: 'design',
            
            // Special (24-25): All skills
            24: 'identification', 25: 'identification'
        };

        const skill = skillMapping[gameId];
        if (skill) {
            const points = Math.floor(score / 10);
            this.data.skillPoints[skill] += points;
        }
    }

    /**
     * Check and handle level up
     */
    checkLevelUp() {
        const xpForNextLevel = this.data.playerLevel * 1000;
        
        if (this.data.totalXP >= xpForNextLevel) {
            this.data.playerLevel++;
            console.log(`🎉 Level Up! Now level ${this.data.playerLevel}`);
            
            // Trigger level up event
            if (window.gameEngine) {
                window.gameEngine.achievementSystem.unlock('LEVEL_UP_' + this.data.playerLevel);
            }
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            totalScore: this.data.totalScore,
            gamesCompleted: this.data.gamesCompleted.length,
            achievementsEarned: this.data.achievements.length,
            playerLevel: this.data.playerLevel,
            totalXP: this.data.totalXP,
            accuracy: this.getAccuracy(),
            totalPlayTime: this.formatPlayTime(),
            longestStreak: this.data.statistics.longestStreak,
            skillPoints: this.data.skillPoints
        };
    }

    /**
     * Get accuracy percentage
     */
    getAccuracy() {
        const total = this.data.statistics.totalCorrectAnswers + 
                     this.data.statistics.totalWrongAnswers;
        if (total === 0) return 0;
        return ((this.data.statistics.totalCorrectAnswers / total) * 100).toFixed(1);
    }

    /**
     * Format play time
     */
    formatPlayTime() {
        const minutes = Math.floor(this.data.statistics.totalPlayTime / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}h ${minutes % 60}m`;
    }

    /**
     * Get game progress for specific game
     */
    getGameProgress(gameId) {
        return {
            completed: this.data.gamesCompleted.includes(gameId),
            bestScore: this.data.gameScores[gameId] || 0,
            bestTime: this.data.gameTimes[gameId] || 0,
            stars: this.data.gameStars[gameId] || 0
        };
    }

    /**
     * Get level progress percentage
     */
    getLevelProgress() {
        const currentLevelXP = (this.data.playerLevel - 1) * 1000;
        const nextLevelXP = this.data.playerLevel * 1000;
        const progressXP = this.data.totalXP - currentLevelXP;
        const requiredXP = nextLevelXP - currentLevelXP;
        
        return {
            current: this.data.totalXP,
            required: nextLevelXP,
            percentage: (progressXP / requiredXP) * 100
        };
    }

    /**
     * Add play time
     */
    addPlayTime(seconds) {
        this.data.statistics.totalPlayTime += seconds;
        this.save();
    }

    /**
     * Record answer
     */
    recordAnswer(correct) {
        if (correct) {
            this.data.statistics.totalCorrectAnswers++;
        } else {
            this.data.statistics.totalWrongAnswers++;
        }
        this.save();
    }

    /**
     * Reset all progress
     */
    reset() {
        if (confirm('Yakin ingin reset semua progress? Ini tidak bisa dibatalkan!')) {
            this.data = this.getDefaultData();
            this.save();
            console.log('🔄 Progress reset');
            location.reload();
        }
    }

    /**
     * Export progress as JSON
     */
    export() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `mekatronika_progress_${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log('📥 Progress exported');
    }

    /**
     * Import progress from JSON
     */
    import(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.data = { ...this.getDefaultData(), ...imported };
                this.save();
                console.log('📤 Progress imported');
                location.reload();
            } catch (error) {
                console.error('Error importing progress:', error);
                alert('File tidak valid!');
            }
        };
        reader.readAsText(file);
    }
}

// Make it globally accessible
window.ProgressTracker = ProgressTracker;
