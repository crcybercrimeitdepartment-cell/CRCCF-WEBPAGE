import os
import re

base_dir = r"d:\CRCCF projects\CR Cyber Crime Foundation\demo\NewHomepage\src"

for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".jsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "playPageTurnSound" in content:
                # Find the import line
                import_match = re.search(r'import \{ playPageTurnSound \} from "[^"]+";\n?', content)
                if import_match:
                    import_str = import_match.group(0)
                    # Remove it from wherever it is
                    content = content.replace(import_str, "")
                    # Add it to the very beginning of the file
                    content = import_str + "\n" + content
                    
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(content)
                else:
                    print(f"Could not find exact import string in {path}")
