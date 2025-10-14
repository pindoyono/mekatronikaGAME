/**
 * Special Games (24-25)
 * Quiz Master & Final Challenge
 */

// ==================== GAME 24: QUIZ MASTER ====================
class QuizMaster {
    constructor() {
        this.score = 0;
        this.currentQuestion = 0;
        this.totalQuestions = 20;
        this.correctAnswers = 0;
        
        this.questions = [
            // Beginner Questions
            { q: 'What does LED stand for?', options: ['Light Emitting Diode', 'Low Energy Device', 'Linear Electronic Device', 'Light Energy Detector'], correct: 0, difficulty: 'Beginner' },
            { q: 'What is the unit of resistance?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], correct: 2, difficulty: 'Beginner' },
            { q: 'What does a capacitor store?', options: ['Current', 'Voltage', 'Charge', 'Power'], correct: 2, difficulty: 'Beginner' },
            { q: 'What color is the ground wire?', options: ['Red', 'Black', 'Green', 'Blue'], correct: 2, difficulty: 'Beginner' },
            { q: 'What does DC stand for?', options: ['Direct Current', 'Digital Circuit', 'Double Capacitor', 'Diode Current'], correct: 0, difficulty: 'Beginner' },
            
            // Intermediate Questions
            { q: 'First band YELLOW, second RED, third BROWN on resistor = ?', options: ['420Ω', '4.2kΩ', '42kΩ', '420kΩ'], correct: 0, difficulty: 'Intermediate' },
            { q: 'What is the typical forward voltage of a red LED?', options: ['1.2V', '1.8V', '2.0V', '3.3V'], correct: 1, difficulty: 'Intermediate' },
            { q: 'SMD code 103 on a resistor means?', options: ['103Ω', '1kΩ', '10kΩ', '100kΩ'], correct: 2, difficulty: 'Intermediate' },
            { q: 'What does NPN stand for in transistors?', options: ['Negative-Positive-Negative', 'New Power Node', 'No Power Needed', 'Negative Pole Neutral'], correct: 0, difficulty: 'Intermediate' },
            { q: 'Capacitor code 104 equals?', options: ['10pF', '100pF', '10nF', '100nF'], correct: 3, difficulty: 'Intermediate' },
            
            // Advanced Questions
            { q: 'What is Ohm\'s Law?', options: ['V=IR', 'P=IV', 'Q=CV', 'F=ma'], correct: 0, difficulty: 'Advanced' },
            { q: 'In a voltage divider, Vout = ?', options: ['Vin × R1/R2', 'Vin × R2/(R1+R2)', 'Vin × (R1+R2)', 'Vin / R1'], correct: 1, difficulty: 'Advanced' },
            { q: 'What is the purpose of a pull-up resistor?', options: ['Increase current', 'Set default HIGH', 'Reduce voltage', 'Filter noise'], correct: 1, difficulty: 'Advanced' },
            { q: 'Time constant τ of RC circuit = ?', options: ['R×C', 'R/C', 'C/R', 'R+C'], correct: 0, difficulty: 'Advanced' },
            { q: 'What does PWM stand for?', options: ['Power With Motor', 'Pulse Width Modulation', 'Positive Wire Mount', 'Parallel Wire Mode'], correct: 1, difficulty: 'Advanced' },
            
            // Expert Questions
            { q: 'Arduino analogRead() returns value in range?', options: ['0-255', '0-1023', '0-5V', '0-100'], correct: 1, difficulty: 'Expert' },
            { q: 'What is the function of a decoupling capacitor?', options: ['Store energy', 'Filter noise', 'Increase voltage', 'Block DC'], correct: 1, difficulty: 'Expert' },
            { q: 'Standard PCB copper thickness is?', options: ['0.5oz', '1oz', '2oz', '3oz'], correct: 1, difficulty: 'Expert' },
            { q: 'What is the Nyquist sampling theorem?', options: ['Sample at 2× frequency', 'Sample at frequency', 'Sample at 0.5× frequency', 'Sample continuously'], correct: 0, difficulty: 'Expert' },
            { q: 'In I2C communication, how many wires are needed?', options: ['1', '2', '3', '4'], correct: 1, difficulty: 'Expert' }
        ];
        
        this.shuffleQuestions();
    }
    
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    
    init() {
        console.log('Quiz Master initialized');
        const gameArea = document.getElementById('game-area');
        
        gameArea.innerHTML = `
            <div class="quiz-master-container">
                <div class="game-header">
                    <h2>🎓 Electronics Quiz Master</h2>
                    <div class="quiz-stats">
                        <div class="stat">
                            <span class="stat-label">Question</span>
                            <span class="stat-value" id="quiz-progress">1/${this.totalQuestions}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Correct</span>
                            <span class="stat-value" id="quiz-correct">0</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="quiz-score">0</span>
                        </div>
                    </div>
                </div>
                
                <div class="quiz-content">
                    <div class="difficulty-badge" id="difficulty-badge"></div>
                    <div class="question-display">
                        <h3 id="question-text"></h3>
                    </div>
                    
                    <div class="options-container" id="options-container"></div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>
                
                <div class="feedback" id="feedback"></div>
            </div>
            
            <style>
                .quiz-master-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    padding: 25px;
                    border-radius: 15px;
                    color: white;
                    text-align: center;
                    margin-bottom: 30px;
                    box-shadow: 0 5px 25px rgba(245, 87, 108, 0.3);
                }
                
                .quiz-stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 15px;
                }
                
                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
                
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-top: 5px;
                }
                
                .quiz-content {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                
                .difficulty-badge {
                    display: inline-block;
                    padding: 8px 20px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                
                .difficulty-badge.Beginner {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    color: #155724;
                }
                
                .difficulty-badge.Intermediate {
                    background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
                    color: #856404;
                }
                
                .difficulty-badge.Advanced {
                    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
                    color: white;
                }
                
                .difficulty-badge.Expert {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                    color: #721c24;
                }
                
                .question-display {
                    margin: 25px 0;
                }
                
                .question-display h3 {
                    color: #2c3e50;
                    font-size: 1.3rem;
                    line-height: 1.6;
                }
                
                .options-container {
                    display: grid;
                    gap: 15px;
                    margin-top: 30px;
                }
                
                .option-btn {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border: 3px solid transparent;
                    padding: 20px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: left;
                    font-size: 1.05rem;
                    font-weight: 500;
                }
                
                .option-btn:hover {
                    transform: translateX(10px);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    border-color: #667eea;
                }
                
                .option-btn.correct {
                    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                    border-color: #28a745;
                    animation: correctPulse 0.5s ease;
                }
                
                .option-btn.wrong {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                    border-color: #dc3545;
                    animation: shake 0.5s ease;
                }
                
                @keyframes correctPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                
                .progress-bar {
                    height: 10px;
                    background: #e0e0e0;
                    border-radius: 10px;
                    overflow: hidden;
                    margin-bottom: 20px;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                    transition: width 0.5s ease;
                }
                
                .feedback {
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 1.1rem;
                    display: none;
                }
                
                .feedback.show {
                    display: block;
                    animation: slideUp 0.3s ease;
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        this.loadQuestion();
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        
        document.getElementById('quiz-progress').textContent = `${this.currentQuestion + 1}/${this.totalQuestions}`;
        document.getElementById('difficulty-badge').textContent = question.difficulty;
        document.getElementById('difficulty-badge').className = `difficulty-badge ${question.difficulty}`;
        document.getElementById('question-text').textContent = question.q;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.checkAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
        
        // Update progress bar
        const progress = ((this.currentQuestion) / this.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        
        document.getElementById('feedback').classList.remove('show');
    }
    
    checkAnswer(selected, button) {
        const question = this.questions[this.currentQuestion];
        const correct = selected === question.correct;
        
        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        if (correct) {
            button.classList.add('correct');
            this.correctAnswers++;
            const points = question.difficulty === 'Expert' ? 100 : 
                          question.difficulty === 'Advanced' ? 75 : 
                          question.difficulty === 'Intermediate' ? 50 : 25;
            this.score += points;
            
            this.showFeedback(`✅ Correct! +${points} points`, 'success');
        } else {
            button.classList.add('wrong');
            // Show correct answer
            document.querySelectorAll('.option-btn')[question.correct].classList.add('correct');
            this.showFeedback(`❌ Wrong! Correct answer: ${question.options[question.correct]}`, 'error');
        }
        
        document.getElementById('quiz-correct').textContent = this.correctAnswers;
        document.getElementById('quiz-score').textContent = this.score;
        
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion >= this.totalQuestions) {
                this.endGame();
            } else {
                this.loadQuestion();
            }
        }, 2500);
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback show ${type}`;
        feedback.style.background = type === 'success' ? 
            'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' : 
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
        feedback.style.color = type === 'success' ? '#155724' : '#721c24';
    }
    
    endGame() {
        const gameArea = document.getElementById('game-area');
        const percentage = (this.correctAnswers / this.totalQuestions) * 100;
        
        let grade, message;
        if (percentage >= 90) {
            grade = 'Master of Electronics! 🏆';
            message = 'Outstanding performance!';
        } else if (percentage >= 75) {
            grade = 'Expert Level! ⭐⭐⭐';
            message = 'Excellent knowledge!';
        } else if (percentage >= 60) {
            grade = 'Advanced Level! ⭐⭐';
            message = 'Great job!';
        } else if (percentage >= 40) {
            grade = 'Intermediate Level! ⭐';
            message = 'Good effort!';
        } else {
            grade = 'Beginner Level 📚';
            message = 'Keep learning!';
        }
        
        gameArea.innerHTML = `
            <div class="game-over">
                <h2>🎓 Quiz Complete!</h2>
                <div class="final-score">
                    <div class="score-big">${this.score}</div>
                    <div class="score-label">Total Score</div>
                </div>
                <div class="game-stats">
                    <div class="stat">
                        <span class="stat-label">Correct Answers:</span>
                        <span class="stat-value">${this.correctAnswers}/${this.totalQuestions}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Accuracy:</span>
                        <span class="stat-value">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Grade:</span>
                        <span class="stat-value">${grade}</span>
                    </div>
                </div>
                <p style="font-size: 1.2rem; margin: 20px 0;">${message}</p>
                <button onclick="location.reload()" class="play-again-btn">
                    🔄 Try Again
                </button>
                <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                    🏠 Back to Menu
                </button>
            </div>
        `;
    }
    
    cleanup() {
        console.log('Quiz Master cleaned up');
    }
}

// ==================== GAME 25: FINAL CHALLENGE ====================
class FinalChallenge {
    constructor() {
        this.score = 0;
        this.currentChallenge = 0;
        this.timeLeft = 600; // 10 minutes
        this.timer = null;
        
        this.challenges = [
            {
                title: 'Component Recognition',
                description: 'Identify 5 components quickly',
                type: 'recognition',
                points: 100
            },
            {
                title: 'Color Code Master',
                description: 'Decode resistor color codes',
                type: 'colorcode',
                points: 150
            },
            {
                title: 'Circuit Analysis',
                description: 'Calculate circuit parameters',
                type: 'calculation',
                points: 200
            },
            {
                title: 'Troubleshooting',
                description: 'Find the circuit fault',
                type: 'troubleshoot',
                points: 250
            },
            {
                title: 'Arduino Programming',
                description: 'Complete the code',
                type: 'programming',
                points: 300
            }
        ];
    }
    
    init() {
        console.log('Final Challenge initialized');
        const gameArea = document.getElementById('game-area');
        
        gameArea.innerHTML = `
            <div class="final-challenge-container">
                <div class="game-header">
                    <h2>🏆 FINAL CHALLENGE</h2>
                    <h3>Ultimate Electronics Test</h3>
                    <div class="challenge-stats">
                        <div class="stat">Challenge: ${this.currentChallenge + 1}/5</div>
                        <div class="stat">Score: <span id="final-score">0</span></div>
                        <div class="stat">Time: <span id="final-timer">10:00</span></div>
                    </div>
                </div>
                
                <div class="challenge-intro">
                    <h3>🎯 Welcome to the Final Challenge!</h3>
                    <p>This is the ultimate test of your electronics knowledge.</p>
                    <p>You will face 5 different challenges covering all aspects of electronics:</p>
                    <ul>
                        <li>⚡ Component Recognition</li>
                        <li>🎨 Color Code Mastery</li>
                        <li>📐 Circuit Analysis</li>
                        <li>🔧 Troubleshooting</li>
                        <li>🤖 Arduino Programming</li>
                    </ul>
                    <p><strong>You have 10 minutes to complete all challenges!</strong></p>
                    <button onclick="window.currentGame.startChallenge()" class="start-btn">
                        🚀 Start Challenge
                    </button>
                </div>
                
                <div class="challenge-content" id="challenge-content" style="display: none;"></div>
            </div>
            
            <style>
                .final-challenge-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .game-header {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    padding: 30px;
                    border-radius: 15px;
                    color: white;
                    text-align: center;
                    margin-bottom: 30px;
                    box-shadow: 0 10px 40px rgba(245, 87, 108, 0.4);
                    animation: glow 2s ease-in-out infinite;
                }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 10px 40px rgba(245, 87, 108, 0.4); }
                    50% { box-shadow: 0 10px 60px rgba(245, 87, 108, 0.6); }
                }
                
                .game-header h2 {
                    font-size: 2.5rem;
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                
                .challenge-stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 20px;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                
                .challenge-intro {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    text-align: center;
                }
                
                .challenge-intro h3 {
                    color: #2c3e50;
                    font-size: 1.8rem;
                    margin-bottom: 20px;
                }
                
                .challenge-intro p {
                    font-size: 1.1rem;
                    color: #555;
                    margin: 15px 0;
                }
                
                .challenge-intro ul {
                    text-align: left;
                    max-width: 400px;
                    margin: 25px auto;
                    font-size: 1.1rem;
                }
                
                .challenge-intro li {
                    margin: 10px 0;
                    color: #2c3e50;
                }
                
                .start-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px 50px;
                    border: none;
                    border-radius: 15px;
                    font-size: 1.3rem;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 30px;
                    transition: all 0.3s;
                    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
                }
                
                .start-btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
                }
                
                .challenge-content {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
            </style>
        `;
    }
    
    startChallenge() {
        document.querySelector('.challenge-intro').style.display = 'none';
        document.getElementById('challenge-content').style.display = 'block';
        
        this.startTimer();
        this.loadChallenge();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('final-timer').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    loadChallenge() {
        const challenge = this.challenges[this.currentChallenge];
        const content = document.getElementById('challenge-content');
        
        content.innerHTML = `
            <h3>Challenge ${this.currentChallenge + 1}: ${challenge.title}</h3>
            <p>${challenge.description}</p>
            <p><strong>Potential Points: ${challenge.points}</strong></p>
            <button onclick="window.currentGame.completeChallenge()" class="complete-btn">
                ✓ Complete Challenge (+${challenge.points} points)
            </button>
        `;
    }
    
    completeChallenge() {
        const challenge = this.challenges[this.currentChallenge];
        this.score += challenge.points;
        document.getElementById('final-score').textContent = this.score;
        
        this.currentChallenge++;
        if (this.currentChallenge >= this.challenges.length) {
            this.endGame();
        } else {
            this.loadChallenge();
        }
    }
    
    endGame() {
        clearInterval(this.timer);
        
        const gameArea = document.getElementById('game-area');
        const maxScore = this.challenges.reduce((sum, c) => sum + c.points, 0);
        const percentage = (this.score / maxScore) * 100;
        
        let title, message;
        if (percentage >= 90) {
            title = '🏆 LEGENDARY MASTER! 🏆';
            message = 'You have conquered all challenges! You are a true Electronics Master!';
        } else if (percentage >= 75) {
            title = '⭐ EXPERT CHAMPION! ⭐';
            message = 'Incredible performance! You have mastered electronics!';
        } else if (percentage >= 60) {
            title = '🎯 ADVANCED ACHIEVER! 🎯';
            message = 'Great work! You have strong electronics knowledge!';
        } else {
            title = '📚 DETERMINED LEARNER! 📚';
            message = 'Good effort! Keep practicing to improve!';
        }
        
        gameArea.innerHTML = `
            <div class="game-over" style="text-align: center;">
                <h1 style="font-size: 2.5rem; color: #f5576c; margin-bottom: 20px;">${title}</h1>
                <div class="final-score">
                    <div class="score-big" style="font-size: 4rem; color: #667eea;">${this.score}</div>
                    <div class="score-label">Total Score (Max: ${maxScore})</div>
                </div>
                <div class="game-stats" style="margin: 30px 0;">
                    <div class="stat">
                        <span class="stat-label">Completion:</span>
                        <span class="stat-value">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Challenges Completed:</span>
                        <span class="stat-value">${this.currentChallenge}/${this.challenges.length}</span>
                    </div>
                </div>
                <p style="font-size: 1.3rem; margin: 30px 0; color: #2c3e50;">${message}</p>
                <div style="margin-top: 40px;">
                    <button onclick="location.reload()" class="play-again-btn">
                        🔄 Try Again
                    </button>
                    <button onclick="window.currentGame.cleanup(); window.initApp();" class="menu-btn">
                        🏠 Back to Menu
                    </button>
                </div>
            </div>
        `;
    }
    
    cleanup() {
        if (this.timer) clearInterval(this.timer);
        console.log('Final Challenge cleaned up');
    }
}

// Register special games
window.QuizMaster = QuizMaster;
window.FinalChallenge = FinalChallenge;
