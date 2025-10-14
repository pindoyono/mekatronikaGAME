/**
 * AUDIO MANAGER
 * Manages all game sounds and music
 */

class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.muted = false;
        
        this.init();
    }

    /**
     * Initialize audio system
     */
    init() {
        // Define sound effects (can be replaced with actual audio files)
        this.soundDefinitions = {
            // UI Sounds
            'click': { freq: 800, duration: 0.1, type: 'sine' },
            'hover': { freq: 600, duration: 0.05, type: 'sine' },
            
            // Game Sounds
            'correct': { freq: 1200, duration: 0.2, type: 'sine' },
            'wrong': { freq: 200, duration: 0.3, type: 'sawtooth' },
            'cardFlip': { freq: 400, duration: 0.1, type: 'triangle' },
            'achievement': { freq: [800, 1000, 1200], duration: 0.5, type: 'sine' },
            
            // State Sounds
            'gameStart': { freq: [400, 600, 800], duration: 0.3, type: 'sine' },
            'gameOver': { freq: [600, 400, 200], duration: 0.5, type: 'sawtooth' },
            'victory': { freq: [800, 1000, 1200, 1500], duration: 0.6, type: 'sine' },
            'levelUp': { freq: [600, 800, 1000, 1200], duration: 0.7, type: 'sine' },
            
            // Action Sounds
            'loseLife': { freq: 300, duration: 0.2, type: 'sawtooth' },
            'gainLife': { freq: 1000, duration: 0.2, type: 'sine' },
            'scoreUp': { freq: 900, duration: 0.15, type: 'triangle' },
            'pause': { freq: 500, duration: 0.1, type: 'square' },
            
            // Component Sounds (thematic)
            'resistor': { freq: 440, duration: 0.1, type: 'square' },
            'capacitor': { freq: 660, duration: 0.15, type: 'triangle' },
            'led': { freq: 880, duration: 0.12, type: 'sine' },
            'transistor': { freq: 550, duration: 0.14, type: 'sawtooth' }
        };
        
        console.log('🔊 Audio Manager initialized');
    }

    /**
     * Play sound effect
     */
    play(soundName, options = {}) {
        if (this.muted) return;
        
        const soundDef = this.soundDefinitions[soundName];
        if (!soundDef) {
            console.warn('Sound not found:', soundName);
            return;
        }

        try {
            // Create audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // If frequency is array, play sequence
            if (Array.isArray(soundDef.freq)) {
                this.playSequence(audioContext, soundDef, options);
            } else {
                this.playTone(audioContext, soundDef, options);
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    /**
     * Play single tone
     */
    playTone(audioContext, soundDef, options = {}) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = soundDef.type || 'sine';
        oscillator.frequency.value = soundDef.freq;
        
        const volume = (options.volume || this.sfxVolume) * 0.3;
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + soundDef.duration
        );
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + soundDef.duration);
    }

    /**
     * Play sequence of tones
     */
    playSequence(audioContext, soundDef, options = {}) {
        const { freq, duration, type } = soundDef;
        const toneDuration = duration / freq.length;
        
        freq.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = type || 'sine';
            oscillator.frequency.value = frequency;
            
            const startTime = audioContext.currentTime + (index * toneDuration);
            const volume = (options.volume || this.sfxVolume) * 0.2;
            
            gainNode.gain.setValueAtTime(volume, startTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                startTime + toneDuration
            );
            
            oscillator.start(startTime);
            oscillator.stop(startTime + toneDuration);
        });
    }

    /**
     * Play background music (placeholder)
     */
    playMusic(trackName) {
        // In production, load actual audio file
        console.log('🎵 Playing music:', trackName);
        
        // Example with HTML5 audio element
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.volume = this.musicVolume;
            bgMusic.play().catch(e => console.log('Music autoplay blocked:', e));
        }
    }

    /**
     * Stop music
     */
    stopMusic() {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }

    /**
     * Set music volume
     */
    setMusicVolume(volume) {
        this.musicVolume = volume / 100;
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.volume = this.musicVolume;
        }
        localStorage.setItem('musicVolume', this.musicVolume);
    }

    /**
     * Set SFX volume
     */
    setSFXVolume(volume) {
        this.sfxVolume = volume / 100;
        localStorage.setItem('sfxVolume', this.sfxVolume);
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('audioMuted', this.muted);
        return this.muted;
    }

    /**
     * Load saved preferences
     */
    loadPreferences() {
        const savedMusicVol = localStorage.getItem('musicVolume');
        const savedSFXVol = localStorage.getItem('sfxVolume');
        const savedMuted = localStorage.getItem('audioMuted');
        
        if (savedMusicVol) this.musicVolume = parseFloat(savedMusicVol);
        if (savedSFXVol) this.sfxVolume = parseFloat(savedSFXVol);
        if (savedMuted) this.muted = savedMuted === 'true';
    }

    /**
     * Play random positive sound
     */
    playPositive() {
        const sounds = ['correct', 'scoreUp', 'victory'];
        const random = sounds[Math.floor(Math.random() * sounds.length)];
        this.play(random);
    }

    /**
     * Play random negative sound
     */
    playNegative() {
        const sounds = ['wrong', 'loseLife'];
        const random = sounds[Math.floor(Math.random() * sounds.length)];
        this.play(random);
    }
}

// Make it globally accessible
window.AudioManager = AudioManager;
