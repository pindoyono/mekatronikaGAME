#!/usr/bin/env python3
"""
Script to add start() method to all game classes that only have init()
"""
import re
import os

def add_start_method(filepath, class_name, emoji="🎮"):
    """Add start() method before init() method in a class"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if start() method already exists
    if re.search(r'^\s+start\(\s*\)\s*{', content, re.MULTILINE):
        print(f"✓ {class_name} already has start() method")
        return False
    
    # Find init() method and add start() before it
    pattern = r'(\s+)(init\(\s*\)\s*{)'
    
    replacement = r'\1start() {\n\1    console.log(\'' + emoji + f' Starting {class_name} Game\');\n' + r'\1    this.init();\n\1}\n\n\1\2'
    
    new_content = re.sub(pattern, replacement, content, count=1)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ Added start() to {class_name}")
        return True
    else:
        print(f"✗ Could not find init() in {class_name}")
        return False

# Process BreadboardTroubleshoot.js - 2 classes
print("\n=== BreadboardTroubleshoot.js ===")
add_start_method('js/levels/advanced/BreadboardTroubleshoot.js', 'TroubleshootCircuit', '🔧')
add_start_method('js/levels/advanced/BreadboardTroubleshoot.js', 'PowerSupplyDesigner', '⚡')

# Process ExpertGames.js - 6 classes
print("\n=== ExpertGames.js ===")
expert_file = 'js/levels/expert/ExpertGames.js'
classes = [
    ('CircuitDesignChallenge', '🎨'),
    ('PCBLayoutPuzzle', '🔲'),
    ('OscilloscopeMaster', '📊'),
    ('SensorIntegration', '📡'),
    ('MicrocontrollerBasics', '🔌'),
    ('PrototypingChallenge', '🛠️')
]

for class_name, emoji in classes:
    add_start_method(expert_file, class_name, emoji)

# Process SpecialGames.js - 2 classes
print("\n=== SpecialGames.js ===")
add_start_method('js/levels/special/SpecialGames.js', 'QuizMaster', '🎓')
add_start_method('js/levels/special/SpecialGames.js', 'FinalChallenge', '🏆')

print("\n✅ All done!")
