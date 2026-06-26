const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove <button onClick={() => navigate(...)}> ... <span ...>Back to ...</span> ... </button>
  // Including the { /* Back Button */ } comment if present
  content = content.replace(/(?:{\/\*\s*Back[^}]*\/\s*}\s*)?<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?<span[^>]*>\s*Back to [^<]*<\/span>[\s\S]*?<\/button>/g, '');

  // 2. Remove <button onClick={() => navigate(...)}> ... <ArrowLeft/> Back to ... </button>
  content = content.replace(/(?:{\/\*\s*Back[^}]*\/\s*}\s*)?<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?Back to [^<]*<\/button>/g, '');

  // 3. Remove <Link to="..."> ... Back to ... </Link>
  content = content.replace(/(?:{\/\*\s*Back[^}]*\/\s*}\s*)?<Link[^>]*to="[^"]*"[^>]*>[\s\S]*?Back to [^<]*<\/Link>/g, '');

  // 4. JobVacancyPortal breadcrumb back button
  // <button onClick={() => navigate('/careers')} ...> <ArrowLeft /> Back to Job Portal </button>
  content = content.replace(/(?:{\/\*\s*Back[^}]*\/\s*}\s*)?<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?Back to [^<]*<\/button>/g, '');

  // 5. Replace `pt-32` or `pt-20` with `pt-4` in the main wrappers of these files
  if (content !== original) {
      content = content.replace(/pt-32/g, 'pt-4');
      content = content.replace(/pt-20/g, 'pt-4');
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Modified:', file);
  }
});

console.log('Total files modified:', count);
