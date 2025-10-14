# 🔍 DEBUG GUIDE - Mekatronika Master

## Error Logging System

Kami telah mengimplementasikan sistem logging comprehensive untuk menangkap semua error dan masalah.

### Fitur Logging

1. **Global Error Catching**
   - Semua JavaScript errors ditangkap otomatis
   - Unhandled promise rejections ditangkap
   - Error notifications muncul di pojok kanan atas

2. **Console Logging**
   - Setiap fungsi mencatat saat dipanggil
   - Error ditampilkan dengan warna dan emoji
   - Stack traces tersedia untuk debugging

3. **Debug Commands**
   Buka browser console (F12) dan gunakan:
   
   ```javascript
   // Lihat debug report lengkap
   debugGame()
   
   // Lihat summary error
   showDebug()
   
   // Clear semua logs
   clearDebug()
   ```

### Cara Menggunakan

#### 1. Buka Game
```bash
# Server sudah running di port 8000
# Jika belum, jalankan:
cd /var/www/mekatronikaGAME
python3 -m http.server 8000
```

#### 2. Buka Browser Console
- Chrome/Edge: Press F12 atau Ctrl+Shift+I
- Firefox: Press F12 atau Ctrl+Shift+K
- Safari: Press Cmd+Option+I

#### 3. Load Game
- Buka http://localhost:8000
- Perhatikan console output
- Semua fungsi akan log saat dipanggil

#### 4. Test Buttons
Klik setiap tombol dan perhatikan console:
- **MULAI BERMAIN** → Harus log: `🎯 startGame() called`
- **PILIH LEVEL** → Harus log: `🎯 showLevelSelect() called`
- **PROGRESS SAYA** → Harus log: `🎯 showProgress() called`
- **ACHIEVEMENT** → Harus log: `🎯 showAchievements() called`
- **LEADERBOARD** → Harus log: `🎯 showLeaderboard() called`
- **PENGATURAN** → Harus log: `🎯 showSettings() called`

### Logging Output Examples

#### ✅ Success Output
```
🎮 Mekatronika Master - Initializing...
📍 Current URL: http://localhost:8000/
📍 Document Ready State: complete
✅ Loading progress element found
✅ GameEngine class loaded
✅ gameEngine instance found
✅ Game engine initialized
✅ Level select populated
✅ Konami code setup complete
✅ Event listeners setup complete
✅ Game Ready!
💡 Use window.debugGame() to see debug report
💡 Use window.showDebug() to see error summary
```

#### ❌ Error Output
```
❌ GameEngine class not found!
```
atau
```
❌ Error in startGame(): TypeError: Cannot read property 'loadGame' of undefined
```

### Error Notifications

Jika ada error, notifikasi merah akan muncul di pojok kanan atas dengan:
- Jenis error
- Pesan error
- Instruksi untuk cek console

### Debug Report Structure

Run `debugGame()` untuk mendapatkan:
```javascript
{
  timestamp: "2025-10-10T...",
  userAgent: "Mozilla/5.0...",
  url: "http://localhost:8000/",
  errors: [],        // Array of all errors
  warnings: [],      // Array of all warnings
  logs: [],          // Array of all console logs
  gameState: {       // Current game state
    currentGame: "FlashCards",
    gameState: "playing",
    score: 0,
    lives: 3
  },
  localStorage: {    // Saved data
    "mekatronika_progress": "...",
    "mekatronika_achievements": "..."
  }
}
```

### Common Issues & Solutions

#### Issue: Tombol tidak berfungsi
**Diagnosis:**
1. Buka console (F12)
2. Klik tombol
3. Cek apakah muncul log "🎯 functionName() called"

**Jika tidak ada log:**
- Event handler tidak terhubung
- Check onclick attribute di HTML
- Check apakah fungsi defined di global scope

**Jika ada log tapi ada error:**
- Baca error message di console
- Check stack trace untuk lokasi error
- Gunakan `debugGame()` untuk context lengkap

#### Issue: Game tidak load
**Diagnosis:**
1. Refresh page (F5)
2. Check console untuk error saat initialization
3. Pastikan semua script files loaded

**Common errors:**
- `GameEngine is not defined` → Check script load order
- `Cannot read property of undefined` → Check dependencies
- `404 Not Found` → Missing script files

#### Issue: LocalStorage error
**Solution:**
```javascript
// Clear localStorage
localStorage.clear()

// Reload page
location.reload()
```

### Best Practices

1. **Always Check Console First**
   - Error messages are your best friend
   - Read the stack trace
   - Look for the line number

2. **Use Debug Commands**
   - `debugGame()` before reporting bugs
   - `showDebug()` to see quick summary
   - Export report for analysis

3. **Test Incrementally**
   - Test one button at a time
   - Clear console between tests
   - Document what works and what doesn't

4. **Report Bugs with Context**
   - Include console output
   - Include `debugGame()` output
   - Describe steps to reproduce

### Monitoring Network Requests

In browser DevTools:
1. Go to Network tab
2. Reload page
3. Check for:
   - ❌ Red/failed requests (404, 500)
   - ⚠️ Slow requests
   - ✅ All JS files loaded successfully

### Performance Monitoring

In console:
```javascript
// Check load time
performance.timing.loadEventEnd - performance.timing.navigationStart

// Check script execution time
performance.getEntriesByType('resource')
```

### Advanced Debugging

#### Enable Verbose Logging
```javascript
// Add to console
console.log = new Proxy(console.log, {
  apply(target, thisArg, args) {
    target.apply(thisArg, ['[LOG]', new Date().toISOString(), ...args]);
  }
});
```

#### Breakpoint Debugging
1. Open DevTools → Sources tab
2. Find js/app.js
3. Click line number to set breakpoint
4. Reload page
5. Step through code execution

### Error Categories

Sistem kami menangkap:

1. **Runtime Errors**
   - TypeError, ReferenceError, etc.
   - Null/undefined access
   - Invalid operations

2. **Promise Rejections**
   - Async/await errors
   - Fetch failures
   - Resource loading failures

3. **DOM Errors**
   - Element not found
   - Invalid selectors
   - Event handler errors

4. **Game Logic Errors**
   - Invalid game states
   - Score calculation errors
   - Progress save errors

### Quick Fix Checklist

- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Clear localStorage (`localStorage.clear()`)
- [ ] Hard reload (Ctrl+Shift+R)
- [ ] Check console for errors
- [ ] Run `debugGame()` command
- [ ] Verify all script files loaded
- [ ] Check network tab for 404s
- [ ] Test in incognito/private window

### Getting Help

If you still have issues:
1. Copy full console output
2. Run `debugGame()` and copy output
3. Take screenshot of error notification
4. Document steps to reproduce
5. Share all information for debugging

---

**Remember:** Errors are normal during development! 
The logging system helps us identify and fix them quickly. 🚀
