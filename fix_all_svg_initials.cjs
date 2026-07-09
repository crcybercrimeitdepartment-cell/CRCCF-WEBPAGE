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
            
            if (c.includes('<motion.rect')) {
                // If it has animate={{ width... }} but no initial={{ width... }}
                // We just do a global replace over the file.
                // Because JSX tags can span multiple lines, regex might be tricky.
                // We'll split the file by `<motion.rect` and process each chunk.
                let parts = c.split('<motion.rect');
                for (let i = 1; i < parts.length; i++) {
                    let endIdx = parts[i].indexOf('/>');
                    if (endIdx === -1) endIdx = parts[i].indexOf('>'); // Could be </motion.rect>
                    
                    if (endIdx !== -1) {
                        let tagContent = parts[i].substring(0, endIdx);
                        if (tagContent.includes('animate={{') && tagContent.includes('width:')) {
                            if (!tagContent.includes('initial={{ width:')) {
                                // Add initial={{ width: 0 }} right after `<motion.rect`
                                parts[i] = ' initial={{ width: 0 }}' + parts[i];
                                changed = true;
                            }
                        }
                    }
                }
                if (changed) {
                    c = parts.join('<motion.rect');
                }
            }
            
            // Also fix <motion.circle animate={{ r: ... }} 
            if (c.includes('<motion.circle')) {
                let parts = c.split('<motion.circle');
                for (let i = 1; i < parts.length; i++) {
                    let endIdx = parts[i].indexOf('/>');
                    if (endIdx === -1) endIdx = parts[i].indexOf('>'); 
                    
                    if (endIdx !== -1) {
                        let tagContent = parts[i].substring(0, endIdx);
                        if (tagContent.includes('animate={{') && tagContent.includes('r:')) {
                            if (!tagContent.includes('initial={{ r:')) {
                                parts[i] = ' initial={{ r: 0 }}' + parts[i];
                                changed = true;
                            }
                        }
                    }
                }
                if (changed) {
                    c = parts.join('<motion.circle');
                }
            }
            
            // Also fix <motion.path animate={{ pathLength: ... }}
            if (c.includes('<motion.path')) {
                let parts = c.split('<motion.path');
                for (let i = 1; i < parts.length; i++) {
                    let endIdx = parts[i].indexOf('/>');
                    if (endIdx === -1) endIdx = parts[i].indexOf('>'); 
                    
                    if (endIdx !== -1) {
                        let tagContent = parts[i].substring(0, endIdx);
                        if (tagContent.includes('animate={{') && tagContent.includes('pathLength:')) {
                            if (!tagContent.includes('initial={{ pathLength:')) {
                                parts[i] = ' initial={{ pathLength: 0 }}' + parts[i];
                                changed = true;
                            }
                        }
                    }
                }
                if (changed) {
                    c = parts.join('<motion.path');
                }
            }

            if (changed) {
                fs.writeFileSync(p, c);
                console.log('Fixed ' + p);
            }
        }
    });
}
fix('src');
