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

    /**
     * Download error log as file
     */
    downloadErrorLog() {
        const report = this.exportReport();
        const filename = `mekatronika-error-log-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`📥 Error log downloaded: ${filename}`);
        return filename;
    }

    /**
     * Save errors to localStorage
     */
    saveToLocalStorage() {
        try {
            const data = {
                errors: this.errors,
                warnings: this.warnings,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('mekatronika_error_log', JSON.stringify(data));
            console.log('💾 Errors saved to localStorage');
        } catch (e) {
            console.error('Failed to save errors:', e);
        }
    }

    /**
     * Load errors from localStorage
     */
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('mekatronika_error_log');
            if (saved) {
                const data = JSON.parse(saved);
                this.errors = data.errors || [];
                this.warnings = data.warnings || [];
                console.log(`📂 Loaded ${this.errors.length} errors from localStorage`);
            }
        } catch (e) {
            console.error('Failed to load errors:', e);
        }
    }

    /**
     * Show error viewer modal
     */
    showErrorViewer() {
        const modal = document.getElementById('modal-overlay') || this.createModal();
        const body = document.getElementById('modal-body');
        
        if (!body) return;

        const stats = {
            total: this.errors.length,
            runtime: this.errors.filter(e => e.type === 'Runtime Error').length,
            promise: this.errors.filter(e => e.type === 'Unhandled Promise Rejection').length
        };

        body.innerHTML = `
            <div class="error-viewer-container">
                <h2 style="text-align: center; color: #e74c3c;">🚨 Error Log Viewer</h2>
                
                <div class="error-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #e74c3c; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${stats.total}</div>
                        <div>Total Errors</div>
                    </div>
                    <div style="background: #f39c12; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${stats.runtime}</div>
                        <div>Runtime Errors</div>
                    </div>
                    <div style="background: #9b59b6; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${stats.promise}</div>
                        <div>Promise Rejections</div>
                    </div>
                </div>

                <div style="margin: 20px 0; display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="errorLogger.downloadErrorLog()">📥 Download Log</button>
                    <button class="btn btn-secondary" onclick="errorLogger.clear(); errorLogger.showErrorViewer()">🗑️ Clear All</button>
                    <button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').style.display='none'">✖️ Close</button>
                </div>

                <div class="error-list" style="max-height: 400px; overflow-y: auto;">
                    <h3>Error Details (Latest ${Math.min(20, this.errors.length)})</h3>
                    ${this.errors.slice(-20).reverse().map((error, i) => `
                        <div style="background: #fff; border-left: 4px solid #e74c3c; padding: 15px; margin-bottom: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong style="color: #e74c3c;">${error.type}</strong>
                                <small style="color: #666;">${new Date(error.timestamp).toLocaleString()}</small>
                            </div>
                            <div style="font-family: monospace; color: #c0392b; margin-bottom: 10px;">${this.escapeHtml(error.message)}</div>
                            ${error.source ? `<div style="font-size: 0.85rem; color: #7f8c8d;">📍 ${error.source}:${error.line}:${error.column}</div>` : ''}
                            ${error.stack ? `<details style="margin-top: 10px;"><summary style="cursor: pointer; color: #3498db;">Stack Trace</summary><pre style="background: #2c3e50; color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto; font-size: 0.85rem; margin-top: 10px;">${this.escapeHtml(error.stack)}</pre></details>` : ''}
                        </div>
                    `).join('')}
                    ${this.errors.length === 0 ? '<p style="text-align: center; color: #27ae60; font-size: 1.2rem; padding: 40px;">✅ No errors logged yet!</p>' : ''}
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    /**
     * Create modal if doesn't exist
     */
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'modal-overlay';
        modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; align-items: center; justify-content: center; padding: 20px;';
        
        const content = document.createElement('div');
        content.style.cssText = 'background: #f8f9fa; border-radius: 15px; padding: 30px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto;';
        content.id = 'modal-body';
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        return modal;
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }
    }

    // Create global instance
    const errorLogger = new ErrorLogger();

    // Make it globally accessible
    window.errorLogger = errorLogger;

    // Add global helper functions
    window.debugGame = () => errorLogger.exportReport();
    window.clearDebug = () => errorLogger.clear();
    window.showDebug = () => errorLogger.printSummary();
    window.showErrors = () => errorLogger.showErrorViewer();
    window.downloadErrors = () => errorLogger.downloadErrorLog();

    // Add keyboard shortcut: Ctrl+Shift+E to open error viewer
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            errorLogger.showErrorViewer();
        }
    });

    // Auto-save errors every 30 seconds
    setInterval(() => {
        if (errorLogger.errors.length > 0) {
            errorLogger.saveToLocalStorage();
        }
    }, 30000);

    // Load previous errors on startup
    errorLogger.loadFromLocalStorage();

    // Log when scripts are loaded
    console.log('✅ ErrorLogger loaded');
    console.log('📋 Commands available:');
    console.log('  - showErrors() : Open error viewer');
    console.log('  - downloadErrors() : Download error log');
    console.log('  - clearDebug() : Clear all logs');
    console.log('  - showDebug() : Show debug summary');
    console.log('  - Ctrl+Shift+E : Keyboard shortcut for error viewer');

})(); // End of IIFE