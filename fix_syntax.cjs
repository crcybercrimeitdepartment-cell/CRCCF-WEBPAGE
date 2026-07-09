const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Fix the malformed self-closing tags
    content = content.replace(/\/ loading="lazy" decoding="async">/g, 'loading="lazy" decoding="async" />');
    content = content.replace(/\/ loading="lazy">/g, 'loading="lazy" />');
    content = content.replace(/\/ decoding="async">/g, 'decoding="async" />');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
    }
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(processFile);
console.log('Syntax fix complete.');
