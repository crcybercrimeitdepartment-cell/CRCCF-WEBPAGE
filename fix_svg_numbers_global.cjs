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
            
            // Only target motion SVG elements
            if (c.includes('<motion.')) {
                const regex = /(<motion\.[a-z]+[^>]+)(cx|cy|x|y|r|rx|ry|width|height)="([0-9]+(\.[0-9]+)?)"/g;
                let newC = c;
                while (regex.test(newC)) {
                    newC = newC.replace(regex, '$1$2={$3}');
                }
                
                if (newC !== c) {
                    c = newC;
                    changed = true;
                }
            }
            
            if (changed) {
                fs.writeFileSync(p, c);
                console.log('Fixed numeric props in ' + p);
            }
        }
    });
}
fix('src');
