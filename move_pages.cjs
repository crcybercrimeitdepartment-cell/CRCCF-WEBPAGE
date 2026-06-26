const fs = require('fs');
const path = require('path');

const srcDir = 'src/new-pages';
const destDir = 'src/pages/SkillDevelopment';

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    fs.renameSync(path.join(srcDir, file), path.join(destDir, file));
});

fs.rmdirSync(srcDir);

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');
appJsx = appJsx.replace(/from '\.\/new-pages\//g, "from './pages/SkillDevelopment/");
fs.writeFileSync('src/App.jsx', appJsx);

console.log('Moved files and updated App.jsx');
