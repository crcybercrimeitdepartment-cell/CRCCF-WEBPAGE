const fs = require('fs');

// Fix MentorshipProgramsPage.jsx
let mentorJSX = fs.readFileSync('src/pages/SkillDevelopment/MentorshipProgramsPage.jsx', 'utf8');
let mentorData = fs.readFileSync('src/data/skillDevelopment/MentorshipProgramsPageData.js', 'utf8');

// Extract icon names
let mentorIcons = new Set(['GraduationCap']);
const mentorRegex = /icon:\s*'([^']+)'/g;
let match;
while ((match = mentorRegex.exec(mentorData)) !== null) {
    if (match[1] === 'InfinityIcon') {
        mentorIcons.add('Infinity'); // Lucide calls it Infinity
    } else {
        mentorIcons.add(match[1]);
    }
}
let mentorIconList = Array.from(mentorIcons).filter(i => i !== 'InfinityIcon');
let mentorImport = `import {\n  ${mentorIconList.join(',\n  ')}\n} from 'lucide-react';\n\nconst LucideIcons = { ${mentorIconList.join(', ')}, InfinityIcon: Infinity };`;

mentorJSX = mentorJSX.replace(/import \* as LucideIcons from 'lucide-react';/, mentorImport);
fs.writeFileSync('src/pages/SkillDevelopment/MentorshipProgramsPage.jsx', mentorJSX);
console.log('Fixed MentorshipProgramsPage.jsx imports');


// Fix AwarenessProgram.jsx
let awareJSX = fs.readFileSync('src/pages/SkillDevelopment/AwarenessProgram.jsx', 'utf8');
let awareData = fs.readFileSync('src/data/skillDevelopment/AwarenessPagedata.js', 'utf8');

let awareIcons = new Set(['Shield']); // default
const awareRegex = /icon:\s*'([^']+)'/g;
while ((match = awareRegex.exec(awareData)) !== null) {
    awareIcons.add(match[1]);
}
let awareIconList = Array.from(awareIcons);
let awareImport = `import {\n  ${awareIconList.join(',\n  ')}\n} from 'lucide-react';\n\nconst Icons = { ${awareIconList.join(', ')} };`;

awareJSX = awareJSX.replace(/import \* as Icons from 'lucide-react';/, awareImport);
fs.writeFileSync('src/pages/SkillDevelopment/AwarenessProgram.jsx', awareJSX);
console.log('Fixed AwarenessProgram.jsx imports');
