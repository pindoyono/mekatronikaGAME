/**
 * ERROR LOGGER & DEBUG SYSTEM
 * Comprehensive error tracking and debugging
 */

(function() {
    'use strict';
    
    class ErrorLogger {
        constructor() {
            this.errors = [];
            this.warnings = [];
            this.logs = [];
            this.maxLogs = 100;
            
            this.init();
        }

    /**
     * Initialize error logging
     */
    init() {
        console.log('🔍 Error Logger initialized');
        
        // Capture all console errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'Runtime Error',
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Capture unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Override console methods to capture logs
        // DISABLED: Causing conflicts with other scripts
        // this.overrideConsole();
    }

    /**
     * Override console methods
     */
    overrideConsole() {
        const _originalLog = console.log;
        const _originalWarn = console.warn;
        const _originalError = console.error;

        console.log = (...args) => {
            this.log('LOG', args);
            _originalLog.apply(console, args);
        };

        console.warn = (...args) => {
            this.log('WARN', args);
            _originalWarn.apply(console, args);
        };

        console.error = (...args) => {
            this.log('ERROR', args);
            _originalError.apply(console, args);
        };
    }

    /**
     * Log message
     */
    log(level, args) {
        const entry = {
            level: level,
            message: args.map(arg => this.stringify(arg)).join(' '),
            timestamp: new Date().toISOString()
        };

        this.logs.push(entry);
        
        if (level === 'WARN') {
            this.warnings.push(entry);
        } else if (level === 'ERROR') {
            this.errors.push(entry);
        }

        // Keep only last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
    }

    /**
     * Log error
     */
    logError(error) {
        this.errors.push(error);
        
        // Display in console with styling
        console.error('%c🔴 ERROR CAUGHT:', 'color: red; font-weight: bold; font-size: 14px');
        console.error('Type:', error.type);
        console.error('Message:', error.message);
        if (error.source) console.error('Source:', error.source + ':' + error.line + ':' + error.column);
        if (error.stack) console.error('Stack:', error.stack);
        console.error('---');

        // Show error notification to user
        this.showErrorNotification(error);
    }

    /**
     * Show error notification
     */
    showErrorNotification(error) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="error-notification-content">
                <div class="error-icon">❌</div>
                <div class="error-details">
                    <strong>${error.type}</strong>
                    <p>${error.message}</p>
                    <small>Check console (F12) for details</small>
                </div>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    /**
     * Stringify any value
     */
    stringify(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'string') return value;
        if (typeof value === 'number' || typeof value === 'boolean') return String(value);
        
        try {
            return JSON.stringify(value, null, 2);
        } catch (e) {
            return String(value);
        }
    }

    /**
     * Get all errors
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Get all warnings
     */
    getWarnings() {
        return this.warnings;
    }

    /**
     * Get all logs
     */
    getLogs() {
        return this.logs;
    }

    /**
     * Export debug report
     */
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            errors: this.errors,
            warnings: this.warnings,
            logs: this.logs,
            gameState: window.gameEngine ? {
                currentGame: window.gameEngine.currentGame?.constructor.name,
                gameState: window.gameEngine.gameState,
                score: window.gameEngine.score,
                lives: window.gameEngine.lives
            } : null,
            localStorage: this.getLocalStorageData()
        };

        console.log('%c📊 DEBUG REPORT:', 'color: blue; font-weight: bold; font-size: 16px');
        console.log(report);
        
        return report;
    }

    /**
     * Get localStorage data
     */
    getLocalStorageData() {
        const data = {};
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('mekatronika_')) {
                    data[key] = localStorage.getItem(key);
                }
            }
        } catch (e) {
            data.error = 'Cannot access localStorage';
        }
        return data;
    }

    /**
     * Clear all logs
     */
    clear() {
        this.errors = [];
        this.warnings = [];
        this.logs = [];
        console.clear();
        console.log('🧹 Logs cleared');
    }

    /**
     * Print debug summary
     */
    printSummary() {
        console.log('%c📊 DEBUG SUMMARY', 'color: blue; font-weight: bold; font-size: 18px');
        console.log('─'.repeat(50));
        console.log('Total Logs:', this.logs.length);
        console.log('Errors:', this.errors.length);
        console.log('Warnings:', this.warnings.length);
        console.log('─'.repeat(50));
        
        if (this.errors.length > 0) {
            console.log('%c🔴 ERRORS:', 'color: red; font-weight: bold');
            this.errors.forEach((error, i) => {
                console.log(`${i + 1}.`, error.message);
            });
        }
        
        if (this.warnings.length > 0) {
            console.log('%c⚠️ WARNINGS:', 'color: orange; font-weight: bold');
            this.warnings.forEach((warning, i) => {
                console.log(`${i + 1}.`, warning.message);
            });
        }
        
        console.log('─'.repeat(50));
    }
    }

    // Create global instance
    const errorLogger = new ErrorLogger();

    // Add global helper functions
    window.debugGame = () => errorLogger.exportReport();
    window.clearDebug = () => errorLogger.clear();
    window.showDebug = () => errorLogger.printSummary();

    // Log when scripts are loaded
    console.log('✅ ErrorLogger loaded');

})(); // End of IIFE