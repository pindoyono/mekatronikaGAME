/**
 * PLACEHOLDER GAMES - Template untuk games yang belum fully implemented
 * Ini berfungsi sebagai placeholder yang bisa di-klik dan memberikan preview
 */

// Base class untuk placeholder games
class PlaceholderGame {
    constructor(gameEngine, gameInfo) {
        this.gameEngine = gameEngine;
        this.gameInfo = gameInfo;
    }

    init() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="placeholder-screen">
                <div class="placeholder-icon">${this.gameInfo.icon}</div>
                <h2>${this.gameInfo.title}</h2>
                <p class="game-description">${this.gameInfo.description}</p>
                
                <div class="game-details">
                    <div class="detail-item">
                        <strong>Difficulty:</strong> ${this.gameInfo.difficulty}
                    </div>
                    <div class="detail-item">
                        <strong>Skill:</strong> ${this.gameInfo.skill}
                    </div>
                    <div class="detail-item">
                        <strong>Duration:</strong> ${this.gameInfo.duration}
                    </div>
                </div>

                <div class="coming-soon-badge">
                    🚧 Coming Soon
                </div>

                <div class="placeholder-preview">
                    <h3>What to Expect:</h3>
                    <ul class="feature-list">
                        ${this.getPreviewFeatures().map(feature => `
                            <li>✨ ${feature}</li>
                        `).join('')}
                    </ul>
                </div>

                <button class="btn btn-primary" onclick="window.gameEngine.showMainMenu()">
                    🏠 Back to Menu
                </button>
            </div>
        `;
        
        this.addStyles();
    }

    getPreviewFeatures() {
        const features = {
            'CapacitorDecoder': [
                'Learn to decode capacitor markings',
                'Practice with ceramic, electrolytic, and SMD capacitors',
                'Convert between pF, nF, and μF',
                'Identify voltage ratings'
            ],
            'DiodeDetective': [
                'Identify anode and cathode',
                'Recognize different diode types',
                'Learn forward/reverse bias',
                'Test diodes with multimeter simulation'
            ],
            'SMDChallenge': [
                'Work with surface mount components',
                'Read SMD marking codes',
                'Identify tiny components',
                'Learn 0603, 0805, 1206 packages'
            ],
            'CircuitBuilder': [
                'Build circuits from schematics',
                'Drag and drop components',
                'Wire connections properly',
                'Test your circuit'
            ],
            'SchematicReader': [
                'Read and interpret schematics',
                'Identify circuit blocks',
                'Trace signal flow',
                'Understanding circuit function'
            ],
            'BreadboardMaster': [
                'Master breadboard layout',
                'Proper component placement',
                'Wire management',
                'Debugging connections'
            ],
            'Troubleshooter': [
                'Find circuit faults',
                'Use testing strategies',
                'Identify bad components',
                'Fix broken circuits'
            ],
            'VoltageDivider': [
                'Calculate voltage dividers',
                'Choose resistor values',
                'Practical applications',
                'Loading effects'
            ],
            'LEDCalculator': [
                'Design LED circuits',
                'Calculate current-limiting resistors',
                'Series and parallel configurations',
                'Power dissipation'
            ],
            'ArduinoProject': [
                'Build Arduino-based projects',
                'Upload and test code',
                'Sensor integration',
                'Actuator control'
            ],
            'SensorIntegration': [
                'Work with various sensors',
                'Temperature, light, motion',
                'Data acquisition',
                'Signal conditioning'
            ],
            'MotorControl': [
                'Control DC and servo motors',
                'H-bridge circuits',
                'PWM speed control',
                'Direction control'
            ],
            'PowerSupplyDesign': [
                'Design power supplies',
                'Rectification and filtering',
                'Voltage regulation',
                'Load calculations'
            ],
            'PCBLayout': [
                'Learn PCB design basics',
                'Component placement',
                'Trace routing',
                'Design rules'
            ],
            'SignalAnalysis': [
                'Analyze electronic signals',
                'Oscilloscope usage',
                'Frequency analysis',
                'Signal characteristics'
            ],
            'QuizMaster': [
                'Comprehensive electronics quiz',
                'Multiple choice questions',
                'All topics covered',
                'Timed challenges'
            ],
            'FinalChallenge': [
                'Ultimate electronics test',
                'Combine all skills',
                'Complex scenarios',
                'Master certification'
            ]
        };

        return features[this.gameInfo.className] || [
            'Interactive learning experience',
            'Progressive difficulty',
            'Real-world applications',
            'Hands-on practice'
        ];
    }

    addStyles() {
        if (document.getElementById('placeholder-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'placeholder-styles';
        styles.textContent = `
            .placeholder-screen {
                max-width: 800px;
                margin: 50px auto;
                padding: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                color: white;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }

            .placeholder-icon {
                font-size: 5rem;
                margin-bottom: 20px;
                animation: bounce 2s infinite;
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }

            .placeholder-screen h2 {
                font-size: 2.5rem;
                margin-bottom: 20px;
            }

            .game-description {
                font-size: 1.3rem;
                margin-bottom: 30px;
                opacity: 0.9;
            }

            .game-details {
                background: rgba(255,255,255,0.2);
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }

            .detail-item {
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 8px;
            }

            .coming-soon-badge {
                background: linear-gradient(135deg, #f39c12, #e67e22);
                padding: 15px 30px;
                border-radius: 50px;
                font-size: 1.3rem;
                font-weight: bold;
                display: inline-block;
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }

            .placeholder-preview {
                background: rgba(255,255,255,0.15);
                padding: 25px;
                border-radius: 12px;
                margin: 30px 0;
                text-align: left;
            }

            .placeholder-preview h3 {
                text-align: center;
                margin-bottom: 20px;
                font-size: 1.5rem;
            }

            .feature-list {
                list-style: none;
                padding: 0;
            }

            .feature-list li {
                padding: 10px;
                margin: 8px 0;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                font-size: 1.1rem;
            }

            @media (max-width: 768px) {
                .placeholder-screen {
                    margin: 20px;
                    padding: 20px;
                }
                .placeholder-icon {
                    font-size: 3rem;
                }
                .placeholder-screen h2 {
                    font-size: 1.8rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    cleanup() {}
}

// Auto-generate placeholder classes for all unimplemented games
const placeholderGames = [
    'CapacitorDecoder', 'DiodeDetective', 'SMDChallenge',
    'CircuitBuilder', 'SchematicReader', 'BreadboardMaster',
    'Troubleshooter', 'VoltageDivider', 'LEDCalculator',
    'ArduinoProject', 'SensorIntegration', 'MotorControl',
    'PowerSupplyDesign', 'PCBLayout', 'SignalAnalysis',
    'QuizMaster', 'FinalChallenge'
];

// Register placeholder games
if (typeof window !== 'undefined') {
    placeholderGames.forEach(gameName => {
        window[gameName] = class extends PlaceholderGame {
            constructor(gameEngine) {
                const gameInfo = window.getGameById 
                    ? window.getAllGames().find(g => g.className === gameName)
                    : { 
                        title: gameName,
                        icon: '🎮',
                        description: 'This game is under development',
                        difficulty: 'TBD',
                        skill: 'Various',
                        duration: 'TBD',
                        className: gameName
                    };
                super(gameEngine, gameInfo);
            }
        };
    });
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PlaceholderGame };
}
