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

  // 1. motion.nav wrapped back buttons (non-greedy)
  // Matching <motion.nav ...> ... Back to ... </motion.nav>
  // Also <motion.nav ...> ... Back ... </motion.nav> where Back is the only text inside a button
  content = content.replace(/<motion\.nav[^>]*>\s*<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?(?:Back to [^<]*|Back\s*)<\/button>\s*<\/motion\.nav>/g, '');

  // 2. <div className="...mb-..."> <Link ...> Back to ... </Link> </div>
  content = content.replace(/<div[^>]*className="[^"]*mb-\d+[^"]*"[^>]*>\s*<Link[^>]*to="[^"]*"[^>]*>[\s\S]*?(?:<[^>]*>)*\s*Back to [^<]*<\/Link>\s*<\/div>/g, '');

  // 3. Just <Link ...> Back to ... </Link>
  content = content.replace(/<Link[^>]*to="[^"]*"[^>]*>[\s\S]*?(?:<[^>]*>)*\s*Back to [^<]*<\/Link>/g, '');

  // 4. Just <button ...> Back to ... </button>
  content = content.replace(/<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?(?:<[^>]*>)*\s*Back to [^<]*<\/button>/g, '');

  // 5. RecruitmentPageLayout.jsx special: `<span ...> Back to Careers </span>` wrapped in <Link> or <button>
  content = content.replace(/<button[^>]*onClick={[^{}]*navigate[^{}]*}[^>]*>[\s\S]*?<span[^>]*>\s*Back to Careers\s*<\/span>[\s\S]*?<\/button>/g, '');

  // 6. Recruitment special <div onClick={() => navigate(-1)} ...> Back to Portal ... </div>
  content = content.replace(/<div[^>]*onClick={[^{}]*navigate\(-1\)[^{}]*}[^>]*>[\s\S]*?Back to [^<]*<\/div>/g, '');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Modified:', file);
  }
});

console.log('Total files modified:', count);
