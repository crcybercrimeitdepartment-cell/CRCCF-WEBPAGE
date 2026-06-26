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

  // 1. motion.nav wrapper with navigate('/about')
  content = content.replace(/<motion\.nav[^>]*>\s*<button[^>]*onClick={\(\)\s*=>\s*navigate\('\/about'\)}[^>]*>[\s\S]*?<\/button>\s*<\/motion\.nav>/g, '');
  
  // 2. pure button with navigate('/about')
  content = content.replace(/<button[^>]*onClick={\(\)\s*=>\s*navigate\('\/about'\)}[^>]*>[\s\S]*?<\/button>/g, '');
  
  // 3. motion.nav wrapper with navigate(-1)
  content = content.replace(/<motion\.nav[^>]*>\s*<button[^>]*onClick={\(\)\s*=>\s*navigate\(-1\)}[^>]*>[\s\S]*?<\/button>\s*<\/motion\.nav>/g, '');

  // 4. pure button with navigate(-1)
  content = content.replace(/<button[^>]*onClick={\(\)\s*=>\s*navigate\(-1\)}[^>]*>[\s\S]*?<\/button>/g, '');

  // 5. button with window.history.back()
  content = content.replace(/<button[^>]*onClick={\(\)\s*=>\s*(?:window\.)?history\.back\(\)}[^>]*>[\s\S]*?<\/button>/g, '');
  
  // 6. ContactUs PageWrapper
  content = content.replace(/<button[^>]*onClick={\(\)\s*=>\s*navigate\(-1\)}[^>]*>[\s\S]*?<\/button>/g, '');

  // 7. Special cases in InsightCard / WhatWeDo inside map loop for "Back"
  // e.g. <button onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }} ... > <ArrowLeft size={16} /> Back </button>
  // Wait, that's inside a book component! We SHOULD NOT remove book pagination buttons!
  // The user said: "Remove all remaining old/local Back buttons... Keep only the single globally declared Back button."
  // A book pagination "Back" button is NOT a navigation back button. It just turns the page of the book!
  // I should be careful not to remove book pagination buttons!
  // My regexes above are very specific to `navigate('/about')`, `navigate(-1)` and `history.back()`.
  
  // What about `import BackButton`?
  if (content.includes('<BackButton />')) {
      content = content.replace(/<BackButton \/>/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Modified:', file);
  }
});

console.log('Total files modified:', count);
