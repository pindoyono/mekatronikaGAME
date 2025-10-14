#!/bin/bash

echo "=========================================="
echo "🔍 CHECKING FOR COMMON ERRORS"
echo "=========================================="
echo ""

# Check for missing files
echo "📁 Checking for missing files..."
missing_files=()

if [ ! -f "css/animations.css" ]; then
    missing_files+=("css/animations.css")
fi

if [ ! -f "manifest.json" ]; then
    missing_files+=("manifest.json")
fi

if [ ! -f "sw.js" ]; then
    missing_files+=("sw.js")
fi

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "❌ Missing files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
else
    echo "✅ All required files present"
fi

echo ""
echo "🔧 Checking JavaScript syntax..."
error_count=0

for file in js/core/*.js js/levels/*/*.js js/*.js js/utils/*.js; do
    if [ -f "$file" ]; then
        if ! node --check "$file" 2>/dev/null; then
            echo "❌ Syntax error in: $file"
            ((error_count++))
        fi
    fi
done

if [ $error_count -eq 0 ]; then
    echo "✅ No syntax errors found"
else
    echo "❌ Found $error_count files with syntax errors"
fi

echo ""
echo "📋 Checking for duplicate declarations..."
echo "   Searching for 'const originalStart' duplicates..."

for file in js/levels/*/*.js; do
    if [ -f "$file" ]; then
        count=$(grep -c "const originalStart" "$file" 2>/dev/null || echo "0")
        if [ "$count" -gt 1 ]; then
            echo "❌ Duplicate 'const originalStart' in: $file ($count times)"
        fi
    fi
done

echo ""
echo "🔍 Checking for missing start() methods..."
missing_start=()

for file in js/levels/*/*.js; do
    if [ -f "$file" ]; then
        if ! grep -q "start()" "$file" 2>/dev/null; then
            missing_start+=("$file")
        fi
    fi
done

if [ ${#missing_start[@]} -gt 0 ]; then
    echo "⚠️  Files without start() method:"
    for file in "${missing_start[@]}"; do
        echo "   - $file"
    done
else
    echo "✅ All game files have start() method"
fi

echo ""
echo "=========================================="
echo "✅ CHECK COMPLETE"
echo "=========================================="
