const fs = require('fs');

// 1. Fix Internship import
let internFile = 'src/pages/SkillDevelopment/InternshipPage.jsx';
let internContent = fs.readFileSync(internFile, 'utf8');
internContent = internContent.replace(/from\s+['"].\/InternshipPageData(\.jsx?)?['"]/g, 'from "../../data/skillDevelopment/InternshipPageData"');
fs.writeFileSync(internFile, internContent);

// 2. Fix Course JSX syntax
let courseFile = 'src/pages/SkillDevelopment/CoursePage.jsx';
let courseContent = fs.readFileSync(courseFile, 'utf8');

// Find the misplaced styles block
const stylesStart = courseContent.indexOf('// ==========================================');
const stylesEnd = courseContent.indexOf('const StyleInjector = () => (');
const fullStylesEnd = courseContent.indexOf(');', stylesEnd) + 2;

if(stylesStart !== -1 && fullStylesEnd > stylesStart) {
    const extractedStyles = courseContent.substring(stylesStart, fullStylesEnd);
    
    // Remove it from its current position
    courseContent = courseContent.substring(0, stylesStart) + courseContent.substring(fullStylesEnd);
    
    // Find a safe place to insert it (after the last import)
    const importMatches = [...courseContent.matchAll(/from\s+['"][^'"]+['"];?/g)];
    if(importMatches.length > 0) {
        const lastMatch = importMatches[importMatches.length - 1];
        const safePos = lastMatch.index + lastMatch[0].length;
        
        courseContent = courseContent.substring(0, safePos) + '\n\n' + extractedStyles + '\n\n' + courseContent.substring(safePos);
        fs.writeFileSync(courseFile, courseContent);
        console.log('Fixed CoursePage.jsx');
    }
} else {
    console.log('Could not find injected styles in CoursePage.jsx');
}
