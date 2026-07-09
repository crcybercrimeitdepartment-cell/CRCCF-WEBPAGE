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
            
            // Replace width={0} with initial={{ width: 0 }} for motion.rect that animate width
            if (c.includes('<motion.rect') && c.includes('width={0}')) {
                c = c.replace(/<motion\.rect([^>]+)width=\{0\}([^>]*)animate=\{\{\s*width:/g, (m, p1, p2) => {
                    changed = true;
                    return `<motion.rect${p1}initial={{ width: 0 }}${p2}animate={{ width:`;
                });
                
                // For cases where animate comes BEFORE width={0}
                c = c.replace(/<motion\.rect([^>]*)animate=\{\{\s*width:([^>]+)width=\{0\}/g, (m, p1, p2) => {
                    changed = true;
                    return `<motion.rect${p1}animate={{ width:${p2}initial={{ width: 0 }}`;
                });
            }

            // Let's also handle height={0} just in case
            if (c.includes('<motion.rect') && c.includes('height={0}')) {
                c = c.replace(/<motion\.rect([^>]+)height=\{0\}([^>]*)animate=\{\{\s*height:/g, (m, p1, p2) => {
                    changed = true;
                    return `<motion.rect${p1}initial={{ height: 0 }}${p2}animate={{ height:`;
                });
            }
            
            if (changed) {
                fs.writeFileSync(p, c);
                console.log('Fixed ' + p);
            }
        }
    });
}
fix('src/pages/Service/softwareIT');
