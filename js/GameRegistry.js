/**
 * GAME REGISTRY - All 25 Games Configuration
 * This file defines all games and their metadata
 */

const GAME_REGISTRY = {
    // LEVEL PEMULA (1-5)
    beginner: [
        {
            id: 1,
            title: 'Flash Cards',
            icon: '📇',
            description: 'Learn electronic components with interactive flash cards',
            difficulty: 'Beginner',
            file: 'FlashCards.js',
            className: 'FlashCards',
            skill: 'Recognition & Memorization',
            duration: '10-15 min',
            implemented: true
        },
        {
            id: 2,
            title: 'Find Component',
            icon: '🔍',
            description: 'Find specific components in a cluttered workspace',
            difficulty: 'Beginner',
            file: 'FindComponent.js',
            className: 'FindComponent',
            skill: 'Visual Identification',
            duration: '15-20 min',
            implemented: true
        },
        {
            id: 3,
            title: 'Symbol Memory',
            icon: '🧠',
            description: 'Match component photos with schematic symbols',
            difficulty: 'Beginner',
            file: 'SymbolMemory.js',
            className: 'SymbolMemory',
            skill: 'Symbol Recognition',
            duration: '12-18 min',
            implemented: true
        },
        {
            id: 4,
            title: 'Sorting Game',
            icon: '📦',
            description: 'Sort components into correct categories',
            difficulty: 'Beginner',
            file: 'SortingGame.js',
            className: 'SortingGame',
            skill: 'Classification',
            duration: '10-15 min',
            implemented: true
        },
        {
            id: 5,
            title: 'Electronic Bingo',
            icon: '🎯',
            description: 'Quick component recognition bingo game',
            difficulty: 'Beginner',
            file: 'ElectronicBingo.js',
            className: 'ElectronicBingo',
            skill: 'Quick Recognition',
            duration: '20-25 min',
            implemented: true
        }
    ],

    // LEVEL MENENGAH (6-11)
    intermediate: [
        {
            id: 6,
            title: 'Color Code Master',
            icon: '🎨',
            description: 'Master resistor color code reading and building',
            difficulty: 'Intermediate',
            file: 'ColorCodeMaster.js',
            className: 'ColorCodeMaster',
            skill: 'Resistor Color Codes',
            duration: '20-30 min',
            implemented: true
        },
        {
            id: 7,
            title: 'Component Tester',
            icon: '🔬',
            description: 'Test components with virtual multimeter',
            difficulty: 'Intermediate',
            file: 'QuickGames.js',
            className: 'ComponentTester',
            skill: 'Testing & Measurement',
            duration: '25-30 min',
            implemented: true
        },
        {
            id: 8,
            title: 'Pin Identifier',
            icon: '📍',
            description: 'Identify IC pins and their functions',
            difficulty: 'Intermediate',
            file: 'QuickGames.js',
            className: 'PinIdentifier',
            skill: 'IC Pinout Knowledge',
            duration: '15-20 min',
            implemented: true
        },
        {
            id: 9,
            title: 'Capacitor Decoder',
            icon: '⚡',
            description: 'Decode capacitor markings and values',
            difficulty: 'Intermediate',
            file: 'CapacitorDecoder.js',
            className: 'CapacitorDecoder',
            skill: 'Capacitor Markings',
            duration: '18-22 min',
            implemented: true
        },
        {
            id: 10,
            title: 'Diode Detective',
            icon: '🔦',
            description: 'Identify diode types and polarity',
            difficulty: 'Intermediate',
            file: 'DiodeDetective.js',
            className: 'DiodeDetective',
            skill: 'Diode Identification',
            duration: '15-20 min',
            implemented: true
        },
        {
            id: 11,
            title: 'SMD Challenge',
            icon: '🔬',
            description: 'Work with surface mount components',
            difficulty: 'Intermediate',
            file: 'SMDChallenge.js',
            className: 'SMDChallenge',
            skill: 'SMD Recognition',
            duration: '20-25 min',
            implemented: true
        }
    ],

    // LEVEL LANJUTAN (12-17)
    advanced: [
        {
            id: 12,
            title: 'Circuit Builder',
            icon: '⚡',
            description: 'Build basic circuits from schematic',
            difficulty: 'Advanced',
            file: 'AdvancedGames.js',
            className: 'CircuitBuilder',
            skill: 'Circuit Assembly',
            duration: '30-35 min',
            implemented: true
        },
        {
            id: 13,
            title: 'Schematic Reader',
            icon: '📐',
            description: 'Read and interpret circuit schematics',
            difficulty: 'Advanced',
            file: 'AdvancedGames.js',
            className: 'SchematicReader',
            skill: 'Schematic Reading',
            duration: '25-30 min',
            implemented: true
        },
        {
            id: 14,
            title: 'Breadboard Master',
            icon: '🎯',
            description: 'Master breadboard prototyping',
            difficulty: 'Advanced',
            file: 'BreadboardTroubleshoot.js',
            className: 'BreadboardMaster',
            skill: 'Breadboarding',
            duration: '30-40 min',
            implemented: true
        },
        {
            id: 15,
            title: 'Troubleshooter',
            icon: '🔧',
            description: 'Find and fix circuit problems',
            difficulty: 'Advanced',
            file: 'BreadboardTroubleshoot.js',
            className: 'Troubleshooter',
            skill: 'Troubleshooting',
            duration: '35-45 min',
            implemented: true
        },
        {
            id: 16,
            title: 'Voltage Divider',
            icon: '⚖️',
            description: 'Calculate voltage divider circuits',
            difficulty: 'Advanced',
            file: 'AdvancedGames.js',
            className: 'VoltageDivider',
            skill: 'Circuit Calculations',
            duration: '20-25 min',
            implemented: true
        },
        {
            id: 17,
            title: 'LED Calculator',
            icon: '💡',
            description: 'Design LED circuits with proper resistors',
            difficulty: 'Advanced',
            file: 'AdvancedGames.js',
            className: 'LEDCalculator',
            skill: 'LED Circuit Design',
            duration: '15-20 min',
            implemented: true
        }
    ],

    // LEVEL EXPERT (18-23)
    expert: [
        {
            id: 18,
            title: 'Arduino Project',
            icon: '🤖',
            description: 'Build Arduino-based projects',
            difficulty: 'Expert',
            file: 'ArduinoProject.js',
            className: 'ArduinoProject',
            skill: 'Microcontroller',
            duration: '45-60 min',
            implemented: false
        },
        {
            id: 19,
            title: 'Sensor Integration',
            icon: '📡',
            description: 'Integrate various sensors',
            difficulty: 'Expert',
            file: 'SensorIntegration.js',
            className: 'SensorIntegration',
            skill: 'Sensor Applications',
            duration: '40-50 min',
            implemented: false
        },
        {
            id: 20,
            title: 'Motor Control',
            icon: '⚙️',
            description: 'Control DC and servo motors',
            difficulty: 'Expert',
            file: 'MotorControl.js',
            className: 'MotorControl',
            skill: 'Motor Driving',
            duration: '35-45 min',
            implemented: false
        },
        {
            id: 21,
            title: 'Power Supply Design',
            icon: '🔋',
            description: 'Design power supply circuits',
            difficulty: 'Expert',
            file: 'PowerSupplyDesign.js',
            className: 'PowerSupplyDesign',
            skill: 'Power Electronics',
            duration: '40-50 min',
            implemented: false
        },
        {
            id: 22,
            title: 'PCB Layout',
            icon: '🎨',
            description: 'Learn PCB design basics',
            difficulty: 'Expert',
            file: 'PCBLayout.js',
            className: 'PCBLayout',
            skill: 'PCB Design',
            duration: '50-60 min',
            implemented: false
        },
        {
            id: 23,
            title: 'Signal Analysis',
            icon: '📊',
            description: 'Analyze electronic signals',
            difficulty: 'Expert',
            file: 'SignalAnalysis.js',
            className: 'SignalAnalysis',
            skill: 'Signal Processing',
            duration: '45-55 min',
            implemented: false
        }
    ],

    // SPECIAL GAMES (24-25)
    special: [
        {
            id: 24,
            title: 'Electronics Quiz Master',
            icon: '🎓',
            description: 'Comprehensive electronics quiz',
            difficulty: 'All Levels',
            file: 'QuizMaster.js',
            className: 'QuizMaster',
            skill: 'Comprehensive Knowledge',
            duration: '30-40 min',
            implemented: false
        },
        {
            id: 25,
            title: 'Final Challenge',
            icon: '🏆',
            description: 'Ultimate electronics challenge',
            difficulty: 'Master',
            file: 'FinalChallenge.js',
            className: 'FinalChallenge',
            skill: 'All Skills Combined',
            duration: '60+ min',
            implemented: false
        }
    ]
};

// Helper function to get all games
function getAllGames() {
    return [
        ...GAME_REGISTRY.beginner,
        ...GAME_REGISTRY.intermediate,
        ...GAME_REGISTRY.advanced,
        ...GAME_REGISTRY.expert,
        ...GAME_REGISTRY.special
    ];
}

// Helper function to get game by ID
function getGameById(id) {
    return getAllGames().find(game => game.id === id);
}

// Helper function to get games by difficulty
function getGamesByDifficulty(difficulty) {
    return getAllGames().filter(game => game.difficulty === difficulty);
}

// Helper function to get implemented games
function getImplementedGames() {
    return getAllGames().filter(game => game.implemented);
}

// Helper function to get games by category
function getGamesByCategory(category) {
    return GAME_REGISTRY[category] || [];
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.GAME_REGISTRY = GAME_REGISTRY;
    window.getAllGames = getAllGames;
    window.getGameById = getGameById;
    window.getGamesByDifficulty = getGamesByDifficulty;
    window.getImplementedGames = getImplementedGames;
    window.getGamesByCategory = getGamesByCategory;
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_REGISTRY,
        getAllGames,
        getGameById,
        getGamesByDifficulty,
        getImplementedGames,
        getGamesByCategory
    };
}
