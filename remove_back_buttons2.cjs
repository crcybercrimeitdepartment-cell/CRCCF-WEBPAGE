const fs = require('fs');
const path = require('path');

const replaceInFile = (file, regex, replacement = '') => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const newContent = content.replace(regex, replacement);
        if(content !== newContent) {
            fs.writeFileSync(file, newContent);
            console.log(`Updated ${file}`);
        }
    }
};

// ResearchPage.jsx
replaceInFile('src/pages/SkillDevelopment/ResearchPage.jsx', /<button[^>]*onClick=\{\(\) => navigate\('\/'\)\}[^>]*>Back to Home<\/button>/g);
replaceInFile('src/pages/SkillDevelopment/ResearchPage.jsx', /<div[^>]*>\s*<button onClick=\{\(\) => navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>\s*<\/div>/);

// HackathonPage.jsx
replaceInFile('src/pages/SkillDevelopment/HackathonPage.jsx', /<button[^>]*onClick=\{\(\) => navigate\('\/'\)\}[^>]*>Back to Home<\/button>/g);
replaceInFile('src/pages/SkillDevelopment/HackathonPage.jsx', /<div className="mt-\[30px\]">\s*<button onClick=\{\(\) => navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>\s*<\/div>/g);

// CoursePage.jsx
replaceInFile('src/pages/SkillDevelopment/CoursePage.jsx', /<button[^>]*onClick=\{\(\) => navigate\('\/'\)\}[^>]*>\s*Back to Home\s*<\/button>/g);
replaceInFile('src/pages/SkillDevelopment/CoursePage.jsx', /<div className="mt-2 mb-1">\s*<button[^>]*onClick=\{\(\) => navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>\s*<\/div>/g);

// MentorshipProgramsPage.jsx
replaceInFile('src/pages/SkillDevelopment/MentorshipProgramsPage.jsx', /<button[^>]*onClick=\{\(\) => navigate\('\/'\)\}[^>]*>\s*Back to Home\s*<\/button>/g);
replaceInFile('src/pages/SkillDevelopment/MentorshipProgramsPage.jsx', /<button onClick=\{\(\) => navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>/g);

// CorporateTrainingPage.jsx
replaceInFile('src/pages/SkillDevelopment/CorporateTrainingPage.jsx', /<button[^>]*onClick=\{\(\) => navigate\(-1\)\}[^>]*>.*?<\/button>/g);

// Resources Pages
const resourcesDir = 'src/pages/Resources';
if (fs.existsSync(resourcesDir)) {
    fs.readdirSync(resourcesDir).forEach(file => {
        if (file.endsWith('.jsx')) {
            replaceInFile(path.join(resourcesDir, file), /<button[^>]*onClick=\{\(\) => navigate\(-1\)\}[^>]*>[\s\S]*?<\/button>/g);
        }
    });
}

console.log('Cleanup complete');
