# 🚨 Error Logging Guide

## Overview
MekatronikaGAME memiliki sistem error logging komprehensif yang otomatis mencatat semua error yang terjadi di aplikasi.

## Features

### 1. **Automatic Error Tracking**
- ✅ Menangkap semua runtime errors
- ✅ Menangkap unhandled promise rejections
- ✅ Mencatat timestamp, source file, line number
- ✅ Menyimpan stack trace untuk debugging
- ✅ Auto-save ke localStorage setiap 30 detik

### 2. **Error Viewer UI**
Tampilan visual untuk melihat semua error yang tercatat.

**Cara Membuka:**
- **Keyboard Shortcut**: `Ctrl + Shift + E`
- **Console Command**: `showErrors()`

**Fitur Viewer:**
- 📊 Statistics: Total errors, runtime errors, promise rejections
- 📋 Error list dengan details lengkap
- 📥 Download button untuk export log
- 🗑️ Clear button untuk hapus semua log
- 📍 Location info (file:line:column)
- 📚 Collapsible stack traces

### 3. **Console Commands**

#### `showErrors()`
Membuka Error Viewer modal
```javascript
showErrors()
```

#### `downloadErrors()`
Download error log sebagai JSON file
```javascript
downloadErrors()
// Returns: mekatronika-error-log-2025-10-14T12-30-45.json
```

#### `showDebug()`
Tampilkan summary di console
```javascript
showDebug()
// Output:
// 📊 DEBUG SUMMARY
// ──────────────────────────────────────────────────
// Total Logs: 45
// Errors: 3
// Warnings: 2
// ──────────────────────────────────────────────────
```

#### `debugGame()`
Export comprehensive debug report
```javascript
const report = debugGame()
// Returns object with:
// - errors array
// - warnings array
// - logs array
// - gameState snapshot
// - localStorage data
// - userAgent, url, timestamp
```

#### `clearDebug()`
Clear semua logs
```javascript
clearDebug()
```

## Error Log Format

### JSON Structure
```json
{
  "timestamp": "2025-10-14T12:30:45.123Z",
  "userAgent": "Mozilla/5.0...",
  "url": "http://localhost:8000/",
  "errors": [
    {
      "type": "Runtime Error",
      "message": "Cannot read property 'start' of undefined",
      "source": "http://localhost:8000/js/core/GameEngine.js",
      "line": 320,
      "column": 25,
      "stack": "Error: Cannot read property...",
      "timestamp": "2025-10-14T12:30:45.123Z"
    }
  ],
  "warnings": [],
  "logs": [],
  "gameState": {
    "currentGame": "FlashCards",
    "gameState": "playing",
    "score": 150,
    "lives": 3
  },
  "localStorage": {
    "mekatronika_progress": "{...}",
    "mekatronika_achievements": "{...}"
  }
}
```

## Usage Examples

### Example 1: Monitor Errors During Development
```javascript
// Open console (F12)
// Start playing games
// Press Ctrl+Shift+E to view errors anytime
// Download log when needed
downloadErrors()
```

### Example 2: Debug Specific Game Issue
```javascript
// Play the problematic game
// When error occurs, open error viewer
showErrors()
// Check error details
// Download log for bug report
downloadErrors()
```

### Example 3: Clear Old Errors
```javascript
// Clear all previous errors
clearDebug()
// Start fresh testing session
```

### Example 4: Export Debug Report
```javascript
// Get comprehensive report
const report = debugGame()
// Copy to clipboard for bug report
console.log(JSON.stringify(report, null, 2))
```

## Error Notification System

Ketika error terjadi, sistem akan:
1. ✅ Log ke console dengan formatting
2. ✅ Tampilkan notification popup (auto-hide after 10s)
3. ✅ Simpan ke memory array
4. ✅ Auto-save ke localStorage (every 30s)

### Error Notification Display
```
┌─────────────────────────────────┐
│ ❌ Runtime Error               │
│ Cannot read property 'start'    │
│ Check console (F12) for details │
│                              [×] │
└─────────────────────────────────┘
```

## LocalStorage Persistence

Errors disimpan ke localStorage dengan key: `mekatronika_error_log`

### View Saved Errors
```javascript
// In console
JSON.parse(localStorage.getItem('mekatronika_error_log'))
```

### Clear Saved Errors
```javascript
localStorage.removeItem('mekatronika_error_log')
```

## Best Practices

### For Development:
1. ✅ Keep error viewer open saat testing (`Ctrl+Shift+E`)
2. ✅ Clear logs sebelum test session baru (`clearDebug()`)
3. ✅ Download log setelah menemukan bug (`downloadErrors()`)
4. ✅ Include error log dalam bug report

### For Production:
1. ✅ Monitor error frequency via console
2. ✅ Download logs dari user yang melaporkan bug
3. ✅ Analyze error patterns via `debugGame()`
4. ✅ Use stack traces untuk locate exact issue

### For Testing:
1. ✅ Test dengan error viewer terbuka
2. ✅ Verifikasi no errors setelah fix
3. ✅ Compare before/after error counts
4. ✅ Check error categories distribution

## Troubleshooting

### Issue: Error viewer tidak muncul
**Solution:**
```javascript
// Check if ErrorLogger loaded
console.log(window.errorLogger)
// If undefined, reload page with cache clear (Ctrl+Shift+R)
```

### Issue: Errors tidak tercatat
**Solution:**
```javascript
// Check if ErrorLogger initialized
errorLogger.printSummary()
// If error, check console for loading issues
```

### Issue: Download tidak berfungsi
**Solution:**
```javascript
// Try manual export
const report = debugGame()
console.log(JSON.stringify(report, null, 2))
// Copy output manually
```

## Integration with Game Engine

ErrorLogger terintegrasi dengan GameEngine untuk capture:
- Game loading errors
- Game runtime errors  
- Asset loading failures
- Audio playback issues
- Network request failures

## Advanced Usage

### Custom Error Logging
```javascript
// Log custom error
errorLogger.logError({
  type: 'Custom Error',
  message: 'Something went wrong',
  source: 'my-script.js',
  line: 42,
  column: 10,
  stack: new Error().stack,
  timestamp: new Date().toISOString()
})
```

### Filter Errors
```javascript
// Get only runtime errors
const runtimeErrors = errorLogger.errors.filter(e => 
  e.type === 'Runtime Error'
)
```

### Export Specific Period
```javascript
// Get errors from last hour
const oneHourAgo = new Date(Date.now() - 60*60*1000)
const recentErrors = errorLogger.errors.filter(e => 
  new Date(e.timestamp) > oneHourAgo
)
```

## Keyboard Shortcuts Summary

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + E` | Open Error Viewer |
| `F12` | Open Browser Console |

## Console Commands Summary

| Command | Description |
|---------|-------------|
| `showErrors()` | Open error viewer modal |
| `downloadErrors()` | Download error log as JSON |
| `showDebug()` | Print summary in console |
| `debugGame()` | Export full debug report |
| `clearDebug()` | Clear all logs |

## Support

Untuk bantuan lebih lanjut:
1. Buka console (F12)
2. Ketik `showDebug()` untuk melihat status
3. Download error log: `downloadErrors()`
4. Share file dengan developer

---

**Version:** 1.0  
**Last Updated:** 2025-10-14  
**Author:** MekatronikaGAME Development Team
