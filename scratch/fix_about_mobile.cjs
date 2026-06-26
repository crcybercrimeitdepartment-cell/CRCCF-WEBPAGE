const fs = require('fs');
const path = require('path');

function walk(dir, ext = '.jsx') {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results = results.concat(walk(full, ext));
    else if (full.endsWith(ext)) results.push(full);
  }
  return results;
}

const aboutDir = path.join('src', 'pages', 'AboutUs');
const files = walk(aboutDir);
let modCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // ── FIX 1: Flip-book page inner panel: `absolute inset-0 p-10 pl-14`
  // These cards are absolutely-positioned inside a bounded container.
  // On mobile the p-10 + pl-14 combo creates excessive internal spacing.
  // Replace `p-10 ... pl-14` (no responsive) with responsive variants.
  content = content.replace(
    /\babsolute inset-0 p-10 flex flex-col w-full h-full justify-start\s+pl-14/g,
    'absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col w-full h-full justify-start pl-6 sm:pl-8 md:pl-10 lg:pl-14'
  );

  // ── FIX 2: Flip-book cover padding `p-12 text-center`
  // Same issue — large padding on mobile inside absolute cover div
  content = content.replace(
    /\bflex flex-col items-center justify-center z-\[110\] p-12 text-center/g,
    'flex flex-col items-center justify-center z-[110] p-4 sm:p-6 md:p-8 lg:p-12 text-center'
  );

  // ── FIX 3: Cover logo size: `w-[100px] h-[100px]` — too large on mobile
  content = content.replace(
    /w-\[100px\] h-\[100px\] rounded-\[28px\] flex items-center justify-center mb-10/g,
    'w-14 h-14 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] flex items-center justify-center mb-4 sm:mb-6 lg:mb-10'
  );

  // ── FIX 4: Cover title `text-[32px]` too large on mobile
  content = content.replace(
    /text-slate-900 leading-\[1\.1\] mb-8 text-\[32px\] font-bold/g,
    'text-slate-900 leading-[1.1] mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl lg:text-[32px] font-bold'
  );

  // ── FIX 5: Flip-book card h-[520px] or h-[500px] — rigid on mobile
  content = content.replace(
    /h-\[520px\] w-full shadow-/g,
    'h-[360px] sm:h-[440px] md:h-[520px] w-full shadow-'
  );
  content = content.replace(
    /h-\[500px\] w-full shadow-/g,
    'h-[340px] sm:h-[420px] md:h-[500px] w-full shadow-'
  );

  // ── FIX 6: Hero section top padding in main section wrapper
  // `py-10 sm:py-16` is fine but ensure outer wrapper uses overflow-hidden
  content = content.replace(
    /className="bg-\[#FBFDFF\] min-h-screen"/g,
    'className="bg-[#FBFDFF] min-h-screen overflow-x-hidden"'
  );
  content = content.replace(
    /className="bg-\[#F9FBFF\] min-h-screen"/g,
    'className="bg-[#F9FBFF] min-h-screen overflow-x-hidden"'
  );
  content = content.replace(
    /className="bg-white min-h-screen"/g,
    'className="bg-white min-h-screen overflow-x-hidden"'
  );

  // ── FIX 7: Inner content padding `p-6 sm:p-10` in scrubber/flip
  content = content.replace(
    /bg-white\/50 backdrop-blur-sm p-6 rounded-\[24px\] border border-slate-100/g,
    'bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-[16px] sm:rounded-[24px] border border-slate-100'
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modCount++;
    console.log('Fixed:', file);
  }
});

console.log(`\nTotal files fixed: ${modCount}`);
