const fs = require('fs');

function replaceImport(file, oldStr, newStr) {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(file, content);
}

replaceImport('src/pages/SkillDevelopment/CoursePage.jsx', /from\s+['"].\/CoursePageData['"]/g, 'from "../../data/skillDevelopment/CoursePageData"');
replaceImport('src/pages/SkillDevelopment/InternshipPage.jsx', /from\s+['"].\/InternshipPageData['"]/g, 'from "../../data/skillDevelopment/InternshipPageData"');
replaceImport('src/pages/SkillDevelopment/MentorshipProgramsPage.jsx', /from\s+['"].\/MentorshipProgramsPageData['"]/g, 'from "../../data/skillDevelopment/MentorshipProgramsPageData"');

console.log('Imports updated!');
