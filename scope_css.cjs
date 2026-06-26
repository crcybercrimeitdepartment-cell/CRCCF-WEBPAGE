const fs = require('fs');

const cssPath = 'd:\\CRCCF projects\\CR Cyber Crime Foundation\\pages\\pages\\Skill\\New folder\\Course\\Course\\src\\index.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Remove tailwind import
css = css.replace(/@import\s+"tailwindcss";/, '/* tailwindcss */');

// Replace :root with & so it applies to the wrapper
css = css.replace(/:root/g, '&');
// Replace body with & as well (since the wrapper acts as the body)
css = css.replace(/^body\s*{/gm, '& {');
css = css.replace(/body\s*{/g, '& {'); // catch other body instances
// Remove global * selector resets if any, or let them be scoped by the wrapper
css = css.replace(/\*\s*{/g, '* {');

// Wrap everything in .course-page-wrapper
const scopedCss = `
.course-page-wrapper {
  ${css}
}
`;

fs.writeFileSync('src/new-pages/CoursePage.css', scopedCss);
console.log('Created scoped CoursePage.css');
