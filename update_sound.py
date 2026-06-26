import os
import re

base_dir = r"d:\CRCCF projects\CR Cyber Crime Foundation\demo\NewHomepage\src"
utils_dir = os.path.join(base_dir, "utils")

def get_relative_import(filepath):
    rel_path = os.path.relpath(utils_dir, os.path.dirname(filepath))
    rel_path = rel_path.replace("\\", "/")
    if not rel_path.startswith("."):
        rel_path = "./" + rel_path
    return f'import {{ playPageTurnSound }} from "{rel_path}/pageTurnSound";\n'

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content

    # Add import if not present
    if "playPageTurnSound" not in content:
        import_stmt = get_relative_import(filepath)
        # find last import
        import_idx = content.rfind("import ")
        if import_idx != -1:
            end_of_line = content.find("\n", import_idx)
            content = content[:end_of_line+1] + import_stmt + content[end_of_line+1:]
        else:
            content = import_stmt + content

    # 1. InsightBook & InsightCard (About Us)
    if "setActivePageIndex" in content or "setIsOpen" in content:
        # Next / Back buttons in InsightCard/InsightBook
        content = re.sub(
            r'(onClick=\{\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*)(setActivePageIndex)',
            r'\1playPageTurnSound(); \2',
            content
        )
        # handleOpen
        content = re.sub(
            r'(const handleOpen\s*=\s*\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*)(setIsOpen)',
            r'\1playPageTurnSound(); \2',
            content
        )
        # Scrubber onChange
        content = re.sub(
            r'(onChange=\{\(e\)\s*=>\s*\{\s*)(setActivePageIndex)',
            r'\1playPageTurnSound(); \2',
            content
        )

    # 2. CyberAwareness.jsx specific
    if "CyberAwareness.jsx" in filepath:
        # onNext / onBack
        content = re.sub(
            r'(onNext=\{\(\)\s*=>\s*\{\s*)(setActivePageIndex)',
            r'\1playPageTurnSound(); \2',
            content
        )
        content = re.sub(
            r'(onBack=\{\(\)\s*=>\s*\{\s*)(setActivePageIndex)',
            r'\1playPageTurnSound(); \2',
            content
        )
        # handleOpen (one-liner)
        content = re.sub(
            r'(const handleOpen\s*=\s*\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*)(setIsOpen)',
            r'\1playPageTurnSound(); \2',
            content
        )
        # Scrubber onChange
        content = re.sub(
            r'(onChange=\{\(e\)\s*=>\s*\{\s*)(setActivePageIndex)',
            r'\1playPageTurnSound(); \2',
            content
        )

    # 3. Insights.jsx specific
    if "Insights.jsx" in filepath:
        content = re.sub(
            r'(handleReadMore\s*=\s*\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*)(setIsFlipped)',
            r'\1playPageTurnSound(); \2',
            content
        )
        content = re.sub(
            r'(handleGoBack\s*=\s*\(e\)\s*=>\s*\{\s*e\.stopPropagation\(\);\s*)(setIsFlipped)',
            r'\1playPageTurnSound(); \2',
            content
        )
        content = re.sub(
            r'(if\s*\(window\.innerWidth\s*<=\s*1024\)\s*\{\s*e\.stopPropagation\(\);\s*)(setIsOpen)',
            r'\1playPageTurnSound(); \2',
            content
        )

    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

updated_files = 0
for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".jsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                text = f.read()
            if "InsightBook" in text or "InsightCard" in text or "CyberBook" in text:
                if process_file(path):
                    updated_files += 1

print(f"Updated {updated_files} files.")
