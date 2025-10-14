/**
 * ACHIEVEMENT SYSTEM
 * Manages achievements, badges, and unlockables
 */

class AchievementSystem {
    constructor() {
        this.achievements = this.defineAchievements();
        this.unlockedAchievements = [];
        this.loadUnlocked();
    }

    /**
     * Define all achievements
     */
    defineAchievements() {
        return {
            // 🏅 MASTERY ACHIEVEMENTS
            'BEGINNER_MASTER': {
                id: 'BEGINNER_MASTER',
                name: 'Beginner Master',
                description: 'Complete all beginner level games',
                icon: '🟢',
                category: 'mastery',
                points: 500,
                condition: (stats) => stats.gamesCompleted.filter(id => id >= 1 && id <= 5).length === 5
            },
            'INTERMEDIATE_MASTER': {
                id: 'INTERMEDIATE_MASTER',
                name: 'Intermediate Master',
                description: 'Complete all intermediate level games',
                icon: '🟡',
                category: 'mastery',
                points: 750,
                condition: (stats) => stats.gamesCompleted.filter(id => id >= 6 && id <= 11).length === 6
            },
            'ADVANCED_MASTER': {
                id: 'ADVANCED_MASTER',
                name: 'Advanced Master',
                description: 'Complete all advanced level games',
                icon: '🟠',
                category: 'mastery',
                points: 1000,
                condition: (stats) => stats.gamesCompleted.filter(id => id >= 12 && id <= 17).length === 6
            },
            'EXPERT_MASTER': {
                id: 'EXPERT_MASTER',
                name: 'Expert Master',
                description: 'Complete all expert level games',
                icon: '🔴',
                category: 'mastery',
                points: 1500,
                condition: (stats) => stats.gamesCompleted.filter(id => id >= 18 && id <= 23).length === 6
            },
            'ULTIMATE_MASTER': {
                id: 'ULTIMATE_MASTER',
                name: 'Ultimate Master',
                description: 'Complete ALL 25 games!',
                icon: '👑',
                category: 'mastery',
                points: 5000,
                condition: (stats) => stats.gamesCompleted.length === 25
            },

            // 🔥 STREAK ACHIEVEMENTS
            'STREAK_5': {
                id: 'STREAK_5',
                name: 'Hot Streak',
                description: 'Win 5 games in a row',
                icon: '🔥',
                category: 'streak',
                points: 200,
                condition: (stats) => stats.statistics.currentStreak >= 5
            },
            'STREAK_10': {
                id: 'STREAK_10',
                name: 'On Fire!',
                description: 'Win 10 games in a row',
                icon: '🔥🔥',
                category: 'streak',
                points: 500,
                condition: (stats) => stats.statistics.currentStreak >= 10
            },
            'STREAK_20': {
                id: 'STREAK_20',
                name: 'Unstoppable!',
                description: 'Win 20 games in a row',
                icon: '🔥🔥🔥',
                category: 'streak',
                points: 1000,
                condition: (stats) => stats.statistics.currentStreak >= 20
            },

            // ⏱️ SPEED ACHIEVEMENTS
            'SPEED_DEMON': {
                id: 'SPEED_DEMON',
                name: 'Speed Demon',
                description: 'Complete any game in under 5 minutes',
                icon: '⚡',
                category: 'speed',
                points: 300,
                condition: null // Checked in game completion
            },
            'FLASH_MASTER': {
                id: 'FLASH_MASTER',
                name: 'Flash Master',
                description: 'Complete Flash Cards in under 3 minutes',
                icon: '⚡⚡',
                category: 'speed',
                points: 400,
                condition: null
            },

            // 🎯 PERFECT ACHIEVEMENTS
            'PERFECT_GAME': {
                id: 'PERFECT_GAME',
                name: 'Perfect!',
                description: 'Complete a game with 100% accuracy',
                icon: '💯',
                category: 'perfect',
                points: 500,
                condition: null
            },
            'PERFECTIONIST': {
                id: 'PERFECTIONIST',
                name: 'Perfectionist',
                description: 'Get 100% accuracy in 5 different games',
                icon: '💎',
                category: 'perfect',
                points: 1500,
                condition: null
            },

            // 📊 SCORE ACHIEVEMENTS
            'SCORE_1K': {
                id: 'SCORE_1K',
                name: 'Scorer',
                description: 'Reach 1,000 total score',
                icon: '🎯',
                category: 'score',
                points: 100,
                condition: (stats) => stats.totalScore >= 1000
            },
            'SCORE_10K': {
                id: 'SCORE_10K',
                name: 'High Scorer',
                description: 'Reach 10,000 total score',
                icon: '🎯🎯',
                category: 'score',
                points: 500,
                condition: (stats) => stats.totalScore >= 10000
            },
            'SCORE_50K': {
                id: 'SCORE_50K',
                name: 'Score Master',
                description: 'Reach 50,000 total score',
                icon: '🎯🎯🎯',
                category: 'score',
                points: 2000,
                condition: (stats) => stats.totalScore >= 50000
            },

            // 🌟 STAR ACHIEVEMENTS
            'STAR_COLLECTOR': {
                id: 'STAR_COLLECTOR',
                name: 'Star Collector',
                description: 'Earn 3 stars in any 10 games',
                icon: '⭐',
                category: 'stars',
                points: 800,
                condition: (stats) => {
                    const threeStarGames = Object.values(stats.gameStars || {}).filter(s => s === 3);
                    return threeStarGames.length >= 10;
                }
            },

            // 📚 KNOWLEDGE ACHIEVEMENTS
            'COMPONENT_EXPERT': {
                id: 'COMPONENT_EXPERT',
                name: 'Component Expert',
                description: 'Identify 100 components correctly',
                icon: '📦',
                category: 'knowledge',
                points: 300,
                condition: null
            },
            'CALCULATION_PRO': {
                id: 'CALCULATION_PRO',
                name: 'Calculation Pro',
                description: 'Solve 50 circuit calculations correctly',
                icon: '🧮',
                category: 'knowledge',
                points: 400,
                condition: null
            },
            'CIRCUIT_DESIGNER': {
                id: 'CIRCUIT_DESIGNER',
                name: 'Circuit Designer',
                description: 'Successfully design 20 circuits',
                icon: '🔧',
                category: 'knowledge',
                points: 600,
                condition: null
            },

            // 🎓 LEVEL ACHIEVEMENTS
            'LEVEL_5': {
                id: 'LEVEL_5',
                name: 'Apprentice',
                description: 'Reach player level 5',
                icon: '🎓',
                category: 'level',
                points: 250,
                condition: (stats) => stats.playerLevel >= 5
            },
            'LEVEL_10': {
                id: 'LEVEL_10',
                name: 'Technician',
                description: 'Reach player level 10',
                icon: '🎓🎓',
                category: 'level',
                points: 500,
                condition: (stats) => stats.playerLevel >= 10
            },
            'LEVEL_20': {
                id: 'LEVEL_20',
                name: 'Engineer',
                description: 'Reach player level 20',
                icon: '🎓🎓🎓',
                category: 'level',
                points: 1000,
                condition: (stats) => stats.playerLevel >= 20
            },

            // 🏆 SPECIAL ACHIEVEMENTS
            'FIRST_WIN': {
                id: 'FIRST_WIN',
                name: 'First Victory',
                description: 'Win your first game',
                icon: '🏆',
                category: 'special',
                points: 50,
                condition: (stats) => stats.gamesCompleted.length >= 1
            },
            'DEDICATED': {
                id: 'DEDICATED',
                name: 'Dedicated Student',
                description: 'Play for 10 hours total',
                icon: '⏰',
                category: 'special',
                points: 500,
                condition: (stats) => stats.statistics.totalPlayTime >= 36000
            },
            'COMEBACK_KID': {
                id: 'COMEBACK_KID',
                name: 'Comeback Kid',
                description: 'Win after losing 3 lives',
                icon: '💪',
                category: 'special',
                points: 400,
                condition: null
            },
            'NIGHT_OWL': {
                id: 'NIGHT_OWL',
                name: 'Night Owl',
                description: 'Play between midnight and 6 AM',
                icon: '🦉',
                category: 'special',
                points: 100,
                condition: null
            },
            'EARLY_BIRD': {
                id: 'EARLY_BIRD',
                name: 'Early Bird',
                description: 'Play before 7 AM',
                icon: '🐦',
                category: 'special',
                points: 100,
                condition: null
            },

            // 🎮 GAME-SPECIFIC ACHIEVEMENTS
            'FLASH_CARD_GENIUS': {
                id: 'FLASH_CARD_GENIUS',
                name: 'Flash Card Genius',
                description: 'Know all components in Flash Cards',
                icon: '📇',
                category: 'game-specific',
                points: 200,
                condition: null
            },
            'COLOR_CODE_CHAMPION': {
                id: 'COLOR_CODE_CHAMPION',
                name: 'Color Code Champion',
                description: 'Perfect score in Color Code Master',
                icon: '🎨',
                category: 'game-specific',
                points: 300,
                condition: null
            },
            'CIRCUIT_WIZARD': {
                id: 'CIRCUIT_WIZARD',
                name: 'Circuit Wizard',
                description: 'Build 10 perfect circuits in Circuit Builder Pro',
                icon: '🧙',
                category: 'game-specific',
                points: 500,
                condition: null
            },
            'OSCILLOSCOPE_NINJA': {
                id: 'OSCILLOSCOPE_NINJA',
                name: 'Oscilloscope Ninja',
                description: 'Master all oscilloscope measurements',
                icon: '📊',
                category: 'game-specific',
                points: 600,
                condition: null
            },

            // 🎉 HIDDEN ACHIEVEMENTS
            'EASTER_EGG': {
                id: 'EASTER_EGG',
                name: '???',
                description: 'Find the hidden easter egg',
                icon: '🥚',
                category: 'hidden',
                points: 1000,
                hidden: true,
                condition: null
            },
            'KONAMI_CODE': {
                id: 'KONAMI_CODE',
                name: 'Old School Gamer',
                description: 'Enter the secret code',
                icon: '🎮',
                category: 'hidden',
                points: 500,
                hidden: true,
                condition: null
            }
        };
    }

    /**
     * Load unlocked achievements from storage
     */
    loadUnlocked() {
        try {
            const saved = localStorage.getItem('mekatronika_achievements');
            if (saved) {
                this.unlockedAchievements = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading achievements:', error);
        }
    }

    /**
     * Save unlocked achievements
     */
    saveUnlocked() {
        try {
            localStorage.setItem('mekatronika_achievements', 
                JSON.stringify(this.unlockedAchievements));
        } catch (error) {
            console.error('Error saving achievements:', error);
        }
    }

    /**
     * Check achievements based on game stats
     */
    checkAchievements(gameData) {
        if (!window.gameEngine || !window.gameEngine.progressTracker) return;
        
        const stats = window.gameEngine.progressTracker.data;
        
        for (const [id, achievement] of Object.entries(this.achievements)) {
            // Skip if already unlocked
            if (this.isUnlocked(id)) continue;
            
            // Check condition
            if (achievement.condition && achievement.condition(stats)) {
                this.unlock(id);
            }
        }

        // Special time-based checks
        this.checkTimeBasedAchievements();
    }

    /**
     * Check time-based achievements
     */
    checkTimeBasedAchievements() {
        const hour = new Date().getHours();
        
        // Night Owl (00:00 - 06:00)
        if (hour >= 0 && hour < 6 && !this.isUnlocked('NIGHT_OWL')) {
            this.unlock('NIGHT_OWL');
        }
        
        // Early Bird (before 7 AM)
        if (hour < 7 && !this.isUnlocked('EARLY_BIRD')) {
            this.unlock('EARLY_BIRD');
        }
    }

    /**
     * Unlock achievement
     */
    unlock(achievementId) {
        if (this.isUnlocked(achievementId)) return;
        
        const achievement = this.achievements[achievementId];
        if (!achievement) {
            console.warn('Achievement not found:', achievementId);
            return;
        }

        // Add to unlocked list
        this.unlockedAchievements.push({
            id: achievementId,
            unlockedAt: new Date().toISOString()
        });

        this.saveUnlocked();

        // Show achievement popup
        this.showAchievementPopup(achievement);

        // Add points to total score
        if (window.gameEngine) {
            window.gameEngine.addScore(achievement.points);
        }

        console.log(`🏆 Achievement Unlocked: ${achievement.name}`);
    }

    /**
     * Check if achievement is unlocked
     */
    isUnlocked(achievementId) {
        return this.unlockedAchievements.some(a => a.id === achievementId);
    }

    /**
     * Show achievement popup
     */
    showAchievementPopup(achievement) {
        const popup = document.getElementById('achievement-popup');
        if (!popup) return;

        const title = popup.querySelector('.achievement-title');
        const description = popup.querySelector('.achievement-description');
        const icon = popup.querySelector('.achievement-icon');

        icon.textContent = achievement.icon;
        title.textContent = achievement.name;
        description.innerHTML = `
            ${achievement.description}
            <div class="achievement-points">+${achievement.points} points</div>
        `;

        // Show popup
        popup.classList.remove('hidden');
        popup.classList.add('show');

        // Play sound
        if (window.gameEngine) {
            window.gameEngine.audioManager.play('achievement');
        }

        // Hide after 4 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 300);
        }, 4000);
    }

    /**
     * Get all achievements with unlock status
     */
    getAllAchievements() {
        const result = [];
        
        for (const [id, achievement] of Object.entries(this.achievements)) {
            // Skip hidden achievements if not unlocked
            if (achievement.hidden && !this.isUnlocked(id)) continue;
            
            const unlockData = this.unlockedAchievements.find(a => a.id === id);
            
            result.push({
                ...achievement,
                unlocked: !!unlockData,
                unlockedAt: unlockData ? unlockData.unlockedAt : null
            });
        }
        
        return result;
    }

    /**
     * Get achievements by category
     */
    getByCategory(category) {
        return this.getAllAchievements().filter(a => a.category === category);
    }

    /**
     * Get unlock percentage
     */
    getUnlockPercentage() {
        const total = Object.keys(this.achievements).filter(id => 
            !this.achievements[id].hidden
        ).length;
        const unlocked = this.unlockedAchievements.length;
        return ((unlocked / total) * 100).toFixed(1);
    }

    /**
     * Get total achievement points
     */
    getTotalPoints() {
        return this.unlockedAchievements.reduce((total, unlock) => {
            const achievement = this.achievements[unlock.id];
            return total + (achievement ? achievement.points : 0);
        }, 0);
    }

    /**
     * Reset all achievements (for testing)
     */
    reset() {
        if (confirm('Reset all achievements?')) {
            this.unlockedAchievements = [];
            this.saveUnlocked();
            console.log('🔄 Achievements reset');
        }
    }
}

// Make it globally accessible
window.AchievementSystem = AchievementSystem;
