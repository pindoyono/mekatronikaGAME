/**
 * LEVEL 1 - GAME 1: FLASH CARDS
 * Pelajari komponen elektronika dengan flash cards interaktif
 */

class FlashCards {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameId = 1;
        this.currentCard = 0;
        this.correctAnswers = 0;
        this.totalCards = 0;
        this.isFlipped = false;
        
        // Component data with images and information
        this.cards = [
            {
                name: 'Resistor',
                symbol: '─█████─',
                image: 'resistor.svg',
                function: 'Menahan arus listrik',
                unit: 'Ohm (Ω)',
                category: 'Passive Component',
                applications: ['Pembatas arus', 'Pembagi tegangan', 'Pull-up/down'],
                funFact: 'Resistor paling umum digunakan dalam elektronika!'
            },
            {
                name: 'Kapasitor',
                symbol: '⊏⊐',
                image: 'capacitor.svg',
                function: 'Menyimpan energi listrik',
                unit: 'Farad (F)',
                category: 'Passive Component',
                applications: ['Filter', 'Coupling', 'Decoupling', 'Timing'],
                funFact: 'Kapasitor bisa menyimpan energi seperti baterai mini!'
            },
            {
                name: 'LED',
                symbol: '💡',
                image: 'led.svg',
                function: 'Memancarkan cahaya saat dialiri arus',
                unit: 'Candela (cd)',
                category: 'Semiconductor',
                applications: ['Indikator', 'Penerangan', 'Display'],
                funFact: 'LED 10x lebih efisien dari lampu pijar biasa!'
            },
            {
                name: 'Transistor',
                symbol: '⚡',
                image: 'transistor.svg',
                function: 'Sebagai saklar atau penguat',
                unit: 'Beta (β)',
                category: 'Active Component',
                applications: ['Switching', 'Amplification', 'Logic gates'],
                funFact: 'Transistor adalah komponen terpenting di era digital!'
            },
            {
                name: 'Diode',
                symbol: '▷|',
                image: 'diode.svg',
                function: 'Mengalirkan arus satu arah',
                unit: 'Volt (V)',
                category: 'Semiconductor',
                applications: ['Rectifier', 'Protection', 'Signal demodulation'],
                funFact: 'Diode seperti "check valve" untuk listrik!'
            },
            {
                name: 'Induktor',
                symbol: '⌇⌇⌇',
                image: 'inductor.svg',
                function: 'Menyimpan energi dalam bentuk medan magnet',
                unit: 'Henry (H)',
                category: 'Passive Component',
                applications: ['Filter', 'Transformer', 'Energy storage'],
                funFact: 'Induktor adalah kebalikan dari kapasitor!'
            },
            {
                name: 'IC (Integrated Circuit)',
                symbol: '▭',
                image: 'ic.svg',
                function: 'Kumpulan komponen dalam satu chip',
                unit: 'Various',
                category: 'Integrated',
                applications: ['Processing', 'Memory', 'Analog circuits'],
                funFact: 'Satu IC bisa berisi jutaan transistor!'
            },
            {
                name: 'Crystal Oscillator',
                symbol: '⬡',
                image: 'crystal.svg',
                function: 'Menghasilkan frekuensi yang sangat stabil',
                unit: 'Hertz (Hz)',
                category: 'Passive Component',
                applications: ['Clock generator', 'Timing', 'RF circuits'],
                funFact: 'Crystal adalah "jantung" dari jam digital!'
            },
            {
                name: 'Relay',
                symbol: '⚡🔌',
                image: 'relay.svg',
                function: 'Saklar elektromagnetik',
                unit: 'Volt/Ampere',
                category: 'Electromechanical',
                applications: ['High power switching', 'Isolation', 'Control'],
                funFact: 'Relay bisa mengontrol beban besar dengan sinyal kecil!'
            },
            {
                name: 'Potentiometer',
                symbol: '🎚️',
                image: 'pot.svg',
                function: 'Resistor variabel',
                unit: 'Ohm (Ω)',
                category: 'Passive Component',
                applications: ['Volume control', 'Dimmer', 'Sensor input'],
                funFact: 'Potentiometer ada di hampir semua remote audio!'
            }
        ];
        
        this.totalCards = this.cards.length;
    }

    /**
     * Start the game
     */
    start() {
        console.log('🎴 Starting Flash Cards Game');
        this.currentCard = 0;
        this.correctAnswers = 0;
        this.isFlipped = false;
        
        this.setupUI();
        this.showCard();
    }

    /**
     * Setup game UI
     */
    setupUI() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="flashcard-game">
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="card-progress" style="width: 0%"></div>
                    </div>
                    <span class="progress-text" id="card-counter">1 / ${this.totalCards}</span>
                </div>

                <div class="flashcard-container">
                    <div class="flashcard" id="flashcard" onclick="flashCardsGame.flipCard()">
                        <div class="flashcard-front">
                            <div class="card-symbol" id="card-symbol"></div>
                            <div class="card-name" id="card-name"></div>
                            <div class="flip-hint">👆 Klik untuk melihat detail</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="card-details" id="card-details"></div>
                        </div>
                    </div>
                </div>

                <div class="flashcard-controls">
                    <button class="control-btn" id="know-btn" onclick="flashCardsGame.markAsKnown()">
                        ✅ Saya Tahu
                    </button>
                    <button class="control-btn secondary" id="learn-btn" onclick="flashCardsGame.markToLearn()">
                        📚 Perlu Belajar
                    </button>
                </div>

                <div class="knowledge-stats">
                    <div class="stat-box">
                        <span class="stat-value" id="known-count">0</span>
                        <span class="stat-label">Sudah Tahu</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value" id="learning-count">0</span>
                        <span class="stat-label">Belajar</span>
                    </div>
                </div>

                <div class="navigation-btns">
                    <button class="nav-btn" onclick="flashCardsGame.previousCard()" id="prev-btn" disabled>
                        ⬅️ Sebelumnya
                    </button>
                    <button class="nav-btn" onclick="flashCardsGame.nextCard()" id="next-btn">
                        Selanjutnya ➡️
                    </button>
                </div>
            </div>
        `;

        // Add game-specific UI
        const gameUI = document.getElementById('game-ui');
        gameUI.innerHTML = `
            <div class="flashcard-tips">
                <h4>💡 Tips:</h4>
                <ul>
                    <li>Klik kartu untuk melihat informasi detail</li>
                    <li>Tandai komponen yang sudah kamu kuasai</li>
                    <li>Ulangi kartu yang perlu dipelajari lagi</li>
                </ul>
            </div>
        `;
    }

    /**
     * Show current card
     */
    showCard() {
        const card = this.cards[this.currentCard];
        
        // Update card front - with special handling for components
        const symbolElement = document.getElementById('card-symbol');
        
        if (card.name === 'Resistor') {
            // Create SVG resistor symbol (IEC standard)
            symbolElement.innerHTML = `
                <svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                    <!-- Line before resistor -->
                    <line x1="0" y1="40" x2="40" y2="40" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <!-- Resistor body (IEC standard - rectangle) -->
                    <rect x="40" y="20" width="120" height="40" fill="none" stroke="white" stroke-width="4" rx="4"/>
                    <!-- Color bands -->
                    <rect x="55" y="15" width="8" height="50" fill="#8B4513"/>
                    <rect x="75" y="15" width="8" height="50" fill="#FF0000"/>
                    <rect x="95" y="15" width="8" height="50" fill="#FFD700"/>
                    <rect x="135" y="15" width="8" height="50" fill="#C0C0C0"/>
                    <!-- Line after resistor -->
                    <line x1="160" y1="40" x2="200" y2="40" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Kapasitor') {
            // Create SVG capacitor symbol (two parallel lines)
            symbolElement.innerHTML = `
                <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Line before capacitor -->
                    <line x1="0" y1="50" x2="70" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <!-- Left plate -->
                    <line x1="85" y1="20" x2="85" y2="80" stroke="white" stroke-width="6" stroke-linecap="round"/>
                    <!-- Right plate -->
                    <line x1="115" y1="20" x2="115" y2="80" stroke="white" stroke-width="6" stroke-linecap="round"/>
                    <!-- Polarity indicator (curved line for electrolytic) -->
                    <path d="M 115 30 Q 125 50 115 70" fill="none" stroke="rgba(255, 255, 255, 0.5)" stroke-width="2"/>
                    <!-- Line after capacitor -->
                    <line x1="130" y1="50" x2="200" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <!-- Plus sign for polarity -->
                    <text x="135" y="35" fill="white" font-size="20" font-weight="bold">+</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'LED') {
            // Create SVG LED symbol (triangle with arrows)
            symbolElement.innerHTML = `
                <svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
                    <!-- Anode (positive) line -->
                    <line x1="10" y1="60" x2="60" y2="60" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <!-- Triangle (LED body) -->
                    <polygon points="60,30 60,90 110,60" fill="none" stroke="white" stroke-width="4" stroke-linejoin="round"/>
                    <!-- Cathode line (vertical bar) -->
                    <line x1="110" y1="30" x2="110" y2="90" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <!-- Cathode (negative) line -->
                    <line x1="110" y1="60" x2="160" y2="60" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Light rays (arrows) -->
                    <!-- Arrow 1 -->
                    <line x1="90" y1="20" x2="120" y2="5" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
                    <polygon points="120,5 115,3 118,10" fill="#FFD700"/>
                    
                    <!-- Arrow 2 -->
                    <line x1="100" y1="15" x2="135" y2="3" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
                    <polygon points="135,3 130,1 133,8" fill="#FFD700"/>
                    
                    <!-- Labels -->
                    <text x="30" y="50" fill="white" font-size="16" font-weight="bold">A</text>
                    <text x="135" y="50" fill="white" font-size="16" font-weight="bold">K</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Transistor') {
            // Create SVG Transistor symbol (NPN type)
            symbolElement.innerHTML = `
                <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                    <!-- Circle outline -->
                    <circle cx="90" cy="90" r="60" fill="none" stroke="white" stroke-width="3"/>
                    
                    <!-- Base line (B) -->
                    <line x1="10" y1="90" x2="65" y2="90" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Vertical line inside -->
                    <line x1="70" y1="60" x2="70" y2="120" stroke="white" stroke-width="5"/>
                    
                    <!-- Collector line to top (C) -->
                    <line x1="70" y1="70" x2="100" y2="40" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <line x1="100" y1="40" x2="100" y2="10" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Emitter line to bottom (E) with arrow -->
                    <line x1="70" y1="110" x2="100" y2="140" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <line x1="100" y1="140" x2="100" y2="170" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Arrow on emitter (pointing outward for NPN) -->
                    <polygon points="100,140 95,130 105,130" fill="white"/>
                    
                    <!-- Labels -->
                    <text x="105" y="15" fill="white" font-size="18" font-weight="bold">C</text>
                    <text x="5" y="95" fill="white" font-size="18" font-weight="bold">B</text>
                    <text x="105" y="175" fill="white" font-size="18" font-weight="bold">E</text>
                    
                    <!-- Type label -->
                    <text x="65" y="160" fill="rgba(255, 255, 255, 0.7)" font-size="14">NPN</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Diode') {
            // Create SVG Diode symbol (triangle with bar)
            symbolElement.innerHTML = `
                <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Anode line -->
                    <line x1="0" y1="50" x2="70" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Triangle (pointing right) -->
                    <polygon points="70,30 70,70 110,50" fill="white" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                    
                    <!-- Cathode bar (vertical line) -->
                    <line x1="110" y1="30" x2="110" y2="70" stroke="white" stroke-width="5" stroke-linecap="round"/>
                    
                    <!-- Cathode line -->
                    <line x1="110" y1="50" x2="180" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Labels -->
                    <text x="20" y="35" fill="white" font-size="16" font-weight="bold">Anode</text>
                    <text x="135" y="35" fill="white" font-size="16" font-weight="bold">Cathode</text>
                    <text x="30" y="75" fill="rgba(255, 255, 255, 0.8)" font-size="14">(+)</text>
                    <text x="150" y="75" fill="rgba(255, 255, 255, 0.8)" font-size="14">(−)</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Induktor') {
            // Create SVG Inductor symbol (coil/loops)
            symbolElement.innerHTML = `
                <svg width="220" height="100" viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Left line -->
                    <line x1="0" y1="50" x2="30" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Coil loops (5 semi-circles) -->
                    <path d="M 30 50 Q 40 20, 50 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 50 50 Q 60 20, 70 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 70 50 Q 80 20, 90 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 90 50 Q 100 20, 110 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 110 50 Q 120 20, 130 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 130 50 Q 140 20, 150 50" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Right line -->
                    <line x1="150" y1="50" x2="200" y2="50" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Label -->
                    <text x="70" y="85" fill="white" font-size="18" font-weight="bold">L</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'IC (Integrated Circuit)') {
            // Create SVG IC symbol (rectangle with pins)
            symbolElement.innerHTML = `
                <svg width="200" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
                    <!-- Main IC body (rectangle) -->
                    <rect x="50" y="30" width="100" height="100" fill="rgba(50, 50, 50, 0.9)" stroke="white" stroke-width="3" rx="5"/>
                    
                    <!-- Notch at top (indicator for pin 1) -->
                    <path d="M 90 30 Q 100 20, 110 30" fill="rgba(50, 50, 50, 0.9)" stroke="white" stroke-width="2"/>
                    
                    <!-- Left side pins (4 pins) -->
                    <line x1="30" y1="45" x2="50" y2="45" stroke="white" stroke-width="3"/>
                    <line x1="30" y1="65" x2="50" y2="65" stroke="white" stroke-width="3"/>
                    <line x1="30" y1="85" x2="50" y2="85" stroke="white" stroke-width="3"/>
                    <line x1="30" y1="105" x2="50" y2="105" stroke="white" stroke-width="3"/>
                    
                    <!-- Right side pins (4 pins) -->
                    <line x1="150" y1="45" x2="170" y2="45" stroke="white" stroke-width="3"/>
                    <line x1="150" y1="65" x2="170" y2="65" stroke="white" stroke-width="3"/>
                    <line x1="150" y1="85" x2="170" y2="85" stroke="white" stroke-width="3"/>
                    <line x1="150" y1="105" x2="170" y2="105" stroke="white" stroke-width="3"/>
                    
                    <!-- IC Label -->
                    <text x="80" y="85" fill="white" font-size="20" font-weight="bold">IC</text>
                    
                    <!-- Pin numbers -->
                    <text x="35" y="42" fill="rgba(255, 255, 255, 0.7)" font-size="10">1</text>
                    <text x="158" y="108" fill="rgba(255, 255, 255, 0.7)" font-size="10">8</text>
                    
                    <!-- Description -->
                    <text x="50" y="150" fill="rgba(255, 255, 255, 0.8)" font-size="14" font-weight="bold">Integrated Circuit</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Crystal Oscillator') {
            // Create SVG Crystal Oscillator symbol (rectangle with parallel lines)
            symbolElement.innerHTML = `
                <svg width="220" height="120" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
                    <!-- Left connection line -->
                    <line x1="20" y1="60" x2="60" y2="60" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Left plate (capacitor symbol) -->
                    <line x1="60" y1="35" x2="60" y2="85" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Crystal body (rectangle) -->
                    <rect x="80" y="40" width="60" height="40" fill="none" stroke="white" stroke-width="4" rx="3"/>
                    
                    <!-- Right plate (capacitor symbol) -->
                    <line x1="160" y1="35" x2="160" y2="85" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Right connection line -->
                    <line x1="160" y1="60" x2="200" y2="60" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    
                    <!-- Crystal marking (X inside) -->
                    <line x1="90" y1="50" x2="130" y2="70" stroke="rgba(255, 255, 255, 0.6)" stroke-width="2"/>
                    <line x1="130" y1="50" x2="90" y2="70" stroke="rgba(255, 255, 255, 0.6)" stroke-width="2"/>
                    
                    <!-- Label -->
                    <text x="85" y="110" fill="white" font-size="16" font-weight="bold">XTAL</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Relay') {
            // Create SVG Relay symbol (coil with switch)
            symbolElement.innerHTML = `
                <svg width="220" height="180" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
                    <!-- Coil (top part) -->
                    <!-- Coil terminals -->
                    <line x1="50" y1="40" x2="80" y2="40" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <line x1="140" y1="40" x2="170" y2="40" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- Coil loops -->
                    <path d="M 80 40 Q 85 20, 90 40" fill="none" stroke="white" stroke-width="3"/>
                    <path d="M 90 40 Q 95 20, 100 40" fill="none" stroke="white" stroke-width="3"/>
                    <path d="M 100 40 Q 105 20, 110 40" fill="none" stroke="white" stroke-width="3"/>
                    <path d="M 110 40 Q 115 20, 120 40" fill="none" stroke="white" stroke-width="3"/>
                    <path d="M 120 40 Q 125 20, 130 40" fill="none" stroke="white" stroke-width="3"/>
                    <path d="M 130 40 Q 135 20, 140 40" fill="none" stroke="white" stroke-width="3"/>
                    
                    <!-- Dashed line showing electromagnetic link -->
                    <line x1="110" y1="50" x2="110" y2="95" stroke="rgba(255, 255, 255, 0.5)" stroke-width="2" stroke-dasharray="5,5"/>
                    
                    <!-- Switch contacts (bottom part) -->
                    <!-- Common terminal (movable arm) -->
                    <circle cx="110" cy="100" r="4" fill="white"/>
                    <line x1="110" y1="100" x2="150" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- NO (Normally Open) contact -->
                    <circle cx="160" cy="120" r="4" fill="white"/>
                    <line x1="160" y1="120" x2="160" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- NC (Normally Closed) contact -->
                    <circle cx="60" cy="120" r="4" fill="white"/>
                    <line x1="60" y1="120" x2="60" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- Common output -->
                    <line x1="110" y1="100" x2="110" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- Labels -->
                    <text x="45" y="35" fill="white" font-size="12" font-weight="bold">A</text>
                    <text x="170" y="35" fill="white" font-size="12" font-weight="bold">B</text>
                    <text x="50" y="170" fill="rgba(255, 255, 255, 0.8)" font-size="11">NC</text>
                    <text x="105" y="170" fill="rgba(255, 255, 255, 0.8)" font-size="11">C</text>
                    <text x="155" y="170" fill="rgba(255, 255, 255, 0.8)" font-size="11">NO</text>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else if (card.name === 'Potentiometer') {
            // Create SVG Potentiometer symbol (resistor with wiper)
            symbolElement.innerHTML = `
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <!-- Resistor arc (semicircle/curve) -->
                    <path d="M 40 140 A 60 60 0 0 1 160 140" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
                    
                    <!-- Terminal 1 (left - 0kΩ) -->
                    <line x1="40" y1="140" x2="40" y2="180" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="40" cy="140" r="5" fill="white"/>
                    
                    <!-- Terminal 3 (right - max resistance) -->
                    <line x1="160" y1="140" x2="160" y2="180" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="160" cy="140" r="5" fill="white"/>
                    
                    <!-- Wiper (arrow/arm) pointing to middle position -->
                    <line x1="100" y1="80" x2="100" y2="180" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="100" cy="180" r="5" fill="white"/>
                    
                    <!-- Wiper arm to resistor -->
                    <line x1="100" y1="80" x2="100" y2="105" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="100,105 95,95 105,95" fill="#FFD700"/>
                    
                    <!-- Resistance markers on arc -->
                    <circle cx="100" cy="80" r="3" fill="rgba(255, 255, 255, 0.5)"/>
                    
                    <!-- Terminal labels -->
                    <text x="30" y="200" fill="#64B5F6" font-size="18" font-weight="bold">1</text>
                    <text x="95" y="200" fill="#FFD700" font-size="18" font-weight="bold">2</text>
                    <text x="155" y="200" fill="#64B5F6" font-size="18" font-weight="bold">3</text>
                    
                    <!-- Resistance values -->
                    <text x="15" y="125" fill="rgba(255, 255, 255, 0.7)" font-size="12">0kΩ</text>
                    <text x="85" y="55" fill="rgba(255, 215, 0, 0.9)" font-size="12">50kΩ</text>
                    <text x="145" y="125" fill="rgba(255, 255, 255, 0.7)" font-size="12">100kΩ</text>
                    
                    <!-- Rotation arrow indicator -->
                    <path d="M 120 70 A 25 25 0 0 1 130 85" fill="none" stroke="rgba(255, 215, 0, 0.6)" stroke-width="2" marker-end="url(#arrowhead)"/>
                    
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                            <polygon points="0,0 10,5 0,10" fill="rgba(255, 215, 0, 0.6)"/>
                        </marker>
                    </defs>
                </svg>
            `;
            symbolElement.style.fontSize = 'inherit';
        } else {
            symbolElement.textContent = card.symbol;
            symbolElement.style.fontSize = '';
        }
        
        document.getElementById('card-name').textContent = card.name;
        
        // Update card back
        const detailsHTML = `
            <h3>${card.name}</h3>
            <div class="detail-row">
                <strong>Fungsi:</strong> ${card.function}
            </div>
            <div class="detail-row">
                <strong>Satuan:</strong> ${card.unit}
            </div>
            <div class="detail-row">
                <strong>Kategori:</strong> ${card.category}
            </div>
            <div class="detail-row">
                <strong>Aplikasi:</strong>
                <ul>
                    ${card.applications.map(app => `<li>${app}</li>`).join('')}
                </ul>
            </div>
            <div class="fun-fact">
                <strong>💡 Fun Fact:</strong> ${card.funFact}
            </div>
        `;
        document.getElementById('card-details').innerHTML = detailsHTML;
        
        // Reset flip state
        this.isFlipped = false;
        document.getElementById('flashcard').classList.remove('flipped');
        
        // Update progress
        this.updateProgress();
        
        // Update navigation buttons
        this.updateNavButtons();
    }

    /**
     * Flip card
     */
    flipCard() {
        this.isFlipped = !this.isFlipped;
        const flashcard = document.getElementById('flashcard');
        
        if (this.isFlipped) {
            flashcard.classList.add('flipped');
            this.gameEngine.audioManager.play('cardFlip');
        } else {
            flashcard.classList.remove('flipped');
        }
    }

    /**
     * Mark as known
     */
    markAsKnown() {
        this.correctAnswers++;
        this.gameEngine.addScore(100);
        this.showFeedback('✅ Bagus! Komponen ini sudah kamu kuasai!', 'success');
        
        // Update stats
        document.getElementById('known-count').textContent = this.correctAnswers;
        
        // Move to next card
        setTimeout(() => {
            if (this.currentCard < this.totalCards - 1) {
                this.nextCard();
            } else {
                this.finishGame();
            }
        }, 1000);
    }

    /**
     * Mark to learn
     */
    markToLearn() {
        this.gameEngine.addScore(50);
        this.showFeedback('📚 Oke, kita akan review lagi nanti!', 'info');
        
        // Update stats
        const learningCount = this.currentCard + 1 - this.correctAnswers;
        document.getElementById('learning-count').textContent = learningCount;
        
        // Add to review list (for future feature)
        // this.cardsToReview.push(this.cards[this.currentCard]);
        
        // Move to next card
        setTimeout(() => {
            if (this.currentCard < this.totalCards - 1) {
                this.nextCard();
            } else {
                this.finishGame();
            }
        }, 1000);
    }

    /**
     * Next card
     */
    nextCard() {
        if (this.currentCard < this.totalCards - 1) {
            this.currentCard++;
            this.showCard();
        }
    }

    /**
     * Previous card
     */
    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.showCard();
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const progress = ((this.currentCard + 1) / this.totalCards) * 100;
        document.getElementById('card-progress').style.width = progress + '%';
        document.getElementById('card-counter').textContent = 
            `${this.currentCard + 1} / ${this.totalCards}`;
    }

    /**
     * Update navigation buttons
     */
    updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentCard === 0;
        nextBtn.disabled = this.currentCard === this.totalCards - 1;
    }

    /**
     * Show feedback message
     */
    showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-popup ${type}`;
        feedback.textContent = message;
        document.getElementById('game-container').appendChild(feedback);
        
        // Add fade-out class before removing
        setTimeout(() => {
            feedback.classList.add('fade-out');
        }, 1700);
        
        setTimeout(() => feedback.remove(), 2000);
    }

    /**
     * Finish game
     */
    finishGame() {
        const percentage = (this.correctAnswers / this.totalCards) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = '🎉 Perfect! Kamu menguasai semua komponen!';
        } else if (percentage >= 70) {
            message = '👍 Bagus! Kamu sudah menguasai sebagian besar komponen!';
        } else if (percentage >= 50) {
            message = '📚 Cukup baik! Masih ada yang perlu dipelajari lagi.';
        } else {
            message = '💪 Jangan menyerah! Ayo review lagi!';
        }
        
        this.gameEngine.gameOver({
            success: percentage >= 50,
            message: message,
            stats: {
                known: this.correctAnswers,
                total: this.totalCards,
                percentage: percentage.toFixed(1)
            }
        });
    }

    /**
     * Pause game
     */
    pause() {
        // Pause any animations or timers
    }

    /**
     * Resume game
     */
    resume() {
        // Resume animations or timers
    }

    /**
     * Stop game
     */
    stop() {
        // Clean up
    }
}

// Make it globally accessible
window.FlashCards = FlashCards;

// Create global instance reference
let flashCardsGame = null;

// Override the start method to create instance
const originalStart = FlashCards.prototype.start;
FlashCards.prototype.start = function() {
    flashCardsGame = this;
    originalStart.call(this);
};
