const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // A simple regex to find <img> tags
    // We only want to target <img ... /> or <img ...> 
    // We will do a replacement
    
    content = content.replace(/<img\s([^>]+)>/g, (match, attrs) => {
        let newAttrs = attrs;

        // Don't add lazy loading to hero images or images already eager
        const isEager = newAttrs.includes('loading="eager"') || newAttrs.includes("loading={'eager'}") || newAttrs.includes("loading={i === 0 ? 'eager' : 'lazy'}");
        
        if (!isEager && !newAttrs.includes('loading=')) {
            newAttrs += ' loading="lazy"';
        }
        
        if (!isEager && !newAttrs.includes('decoding=')) {
            newAttrs += ' decoding="async"';
        }

        // We won't strictly enforce width/height if we don't know the aspect ratio,
        // but we'll try to add an generic one if missing, but it's dangerous for logos.
        // Let's add width="100%" height="100%" as fallback to satisfy Lighthouse if missing?
        // Wait, width="100%" is not a valid HTML5 width (must be integer).
        // Let's rely on Tailwind classes for CLS, which are already present. 
        // We will just add loading="lazy" and decoding="async".

        return `<img ${newAttrs}>`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
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
console.log('Image optimization complete.');
