const fs = require('fs');

const cssPath = 'd:\\CRCCF projects\\CR Cyber Crime Foundation\\pages\\pages\\Skill\\New folder\\mentorship-portal\\mentorship-portal\\src\\index.css';
let css = '';
try {
  css = fs.readFileSync(cssPath, 'utf8');
} catch (e) {
  console.log("Could not find index.css, trying App.css");
  try {
     css = fs.readFileSync('d:\\CRCCF projects\\CR Cyber Crime Foundation\\pages\\pages\\Skill\\New folder\\mentorship-portal\\mentorship-portal\\src\\App.css', 'utf8');
  } catch(e2) {
     console.error("Could not read CSS");
     process.exit(1);
  }
}

// Remove tailwind import
css = css.replace(/@import\s+"tailwindcss";/g, '/* tailwindcss */');
css = css.replace(/@tailwind\s+base;/g, '/* tailwind */');
css = css.replace(/@tailwind\s+components;/g, '/* tailwind */');
css = css.replace(/@tailwind\s+utilities;/g, '/* tailwind */');

// Replace :root with & so it applies to the wrapper
css = css.replace(/:root/g, '&');
// Replace body with & as well (since the wrapper acts as the body)
css = css.replace(/^body\s*{/gm, '& {');
css = css.replace(/body\s*{/g, '& {'); // catch other body instances
// Remove global * selector resets if any, or let them be scoped by the wrapper
css = css.replace(/\*\s*{/g, '* {');

// Wrap everything in .mentorship-programs-page-wrapper
const scopedCss = `
.mentorship-programs-page-wrapper {
  ${css}
}
`;

fs.writeFileSync('src/new-pages/MentorshipProgramsPage.css', scopedCss);
console.log('Created scoped MentorshipProgramsPage.css');
