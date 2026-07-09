const fs = require('fs');
const path = require('path');

function fix(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            fix(p);
        } else if (p.endsWith('.jsx')) {
            let c = fs.readFileSync(p, 'utf8');
            let changed = false;
            
            if (c.includes('useScroll')) {
                if (c.includes('ref={heroRef}')) {
                    // Find <div ... ref={heroRef} ...>
                    c = c.replace(/<div([^>]*)ref=\{heroRef\}([^>]*)>/g, (m, p1, p2) => {
                        if (!m.includes('style=')) {
                            changed = true;
                            return `<div${p1}ref={heroRef}${p2} style={{ position: 'relative' }}>`;
                        } else if (!m.includes('position:')) {
                            // style exists but no position. Let's just blindly add relative if it's safe.
                            // To be safe, skip if style exists. We'll manually check.
                        }
                        return m;
                    });
                }
                
                if (c.includes('ref={containerRef}')) {
                    c = c.replace(/<div([^>]*)ref=\{containerRef\}([^>]*)>/g, (m, p1, p2) => {
                        if (!m.includes('style=')) {
                            changed = true;
                            return `<div${p1}ref={containerRef}${p2} style={{ position: 'relative' }}>`;
                        }
                        return m;
                    });
                }
                
                if (changed) {
                    fs.writeFileSync(p, c);
                    console.log('Fixed ' + p);
                }
            }
        }
    });
}
fix('src');
