const fs = require('fs');
const path = require('path');

const jsxFile = 'src/pages/SkillDevelopment/CoursePage.jsx';
const cssFile = 'src/pages/SkillDevelopment/CoursePage.css';

if(!fs.existsSync(cssFile) || !fs.existsSync(jsxFile)) {
    console.error('Files not found!');
    process.exit(1);
}

const cssContent = fs.readFileSync(cssFile, 'utf8');
let jsxContent = fs.readFileSync(jsxFile, 'utf8');

// Remove the import
jsxContent = jsxContent.replace(/import\s+['"].\/CoursePage\.css['"];?\n?/, '');

// Find the end of imports (last import statement)
const lastImportMatch = [...jsxContent.matchAll(/^import.*$/gm)].pop();
let insertPos = 0;
if (lastImportMatch) {
    insertPos = lastImportMatch.index + lastImportMatch[0].length;
}

// Prepare styles block
const stylesBlock = `

// ==========================================
// 0. INJECTED STYLES
// ==========================================
const styles = \`
${cssContent.replace(/`/g, '\\`')}
\`;

// ==========================================
// STYLE INJECTOR COMPONENT
// ==========================================
const StyleInjector = () => (
  <style dangerouslySetInnerHTML={{ __html: styles }} />
);
`;

jsxContent = jsxContent.substring(0, insertPos) + '\n' + stylesBlock + '\n' + jsxContent.substring(insertPos);

// Inject <StyleInjector /> inside the main component return
const mainCompRegex = /(return\s*\(\s*<div\s+className=["']course-page-wrapper["'][^>]*>)/;
if (mainCompRegex.test(jsxContent)) {
    jsxContent = jsxContent.replace(mainCompRegex, '$1\n      <StyleInjector />');
} else {
    // If not found, inject it right after the first wrapper inside AppRoutes or default export
    const fallbackRegex = /(return\s*\(\s*<div[^>]*>)/;
    jsxContent = jsxContent.replace(fallbackRegex, '$1\n      <StyleInjector />');
}

fs.writeFileSync(jsxFile, jsxContent);
fs.unlinkSync(cssFile);
console.log('Successfully injected CoursePage.css into CoursePage.jsx and deleted CoursePage.css');
