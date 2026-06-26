const fs = require('fs');
const postcss = require('postcss');
const nested = require('postcss-nested');
const filePath = 'src/new-pages/MentorshipProgramsPage.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const styleStart = content.indexOf('const styles = `') + 16;
const styleEnd = content.indexOf('`;', styleStart);

if (styleStart < 16 || styleEnd === -1) {
  console.error("Could not find style block");
  process.exit(1);
}

let css = content.substring(styleStart, styleEnd);
css = css.replace(/:root/g, '&')
         .replace(/^body\s*\{/gm, '& {')
         .replace(/body\s*\{/g, '& {')
         .replace(/^\*\s*\{/gm, '& * {');

const wrappedCss = '.mentorship-programs-page-wrapper {\n' + css + '\n}';

postcss([nested]).process(wrappedCss, { from: undefined }).then(result => {
  let newContent = content.substring(0, styleStart) + '\n' + result.css + '\n' + content.substring(styleEnd);

  const exactReturn = `return (
    <div className="app-container dark-theme">
      <StyleInjector />
      <AppRoutes />
    </div>
  );
}`;

  const wrappedReturn = `return (
    <div className="mentorship-programs-page-wrapper">
      <div className="app-container dark-theme">
        <StyleInjector />
        <AppRoutes />
      </div>
    </div>
  );
}`;

  newContent = newContent.replace(exactReturn, wrappedReturn);

  fs.writeFileSync(filePath, newContent);
  console.log('Successfully scoped MentorshipProgramsPage.jsx');
}).catch(console.error);
