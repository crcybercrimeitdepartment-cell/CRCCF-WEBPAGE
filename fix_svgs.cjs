const fs = require('fs');
const path = require('path');

const dir = './src/pages/Service/softwareIT';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix width="0" for motion.rect
    content = content.replace(/<motion\.rect([^>]+)width="0"/g, '<motion.rect$1initial={{ width: 0 }}');
    
    // Fix borderBottom="1px solid #e2e8f0"
    content = content.replace(/borderBottom="1px solid #e2e8f0"/g, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
});
console.log('Fixed SVGs in softwareIT.');
