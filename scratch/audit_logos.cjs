const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.html'];
const ignoredDirs = ['node_modules', '.git', 'dist', 'build'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

function walkSync(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        walkSync(filepath, callback);
      }
    } else if (stats.isFile()) {
      callback(filepath);
    }
  });
}

const allFiles = [];
walkSync(rootDir, (filepath) => {
  if (extensions.includes(path.extname(filepath)) && !filepath.includes('\\scratch\\')) {
    allFiles.push(filepath);
  }
});

const allLocalImages = [];
walkSync(rootDir, (filepath) => {
  if (imageExtensions.includes(path.extname(filepath).toLowerCase()) && !filepath.includes('\\scratch\\') && !filepath.includes('\\node_modules\\') && !filepath.includes('\\dist\\')) {
    allLocalImages.push(filepath);
  }
});

const logoFiles = allLocalImages.filter(f => path.basename(f).toLowerCase().includes('logo') || path.basename(f).toLowerCase().includes('favicon'));

const oldCloudinaryLogos = [];
const newCloudinaryLogos = [];
const localLogos = [];
const brokenLogos = [];
const faviconRefs = [];
const metaRefs = [];

let totalUsages = 0;

const urlRegex = /(?:import[^'"]+from\s+['"]([^'"]+(?:logo|favicon)[^'"]*)['"]|src=['"]([^'"]+(?:logo|favicon)[^'"]*)['"]|url\(['"]?([^'"()]+(?:logo|favicon)[^'"()]*)['"]?\)|href=['"]([^'"]+(?:logo|favicon)[^'"]*)['"]|image:\s*['"]([^'"]+(?:logo|favicon)[^'"]*)['"]|content=['"]([^'"]+(?:logo|favicon)[^'"]*)['"])/gi;
const genericCloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^\/]+\/(?:image|video)\/upload\/[^\s'"]+/g;

// Helper to determine usage type
function getUsageType(content, lineStr, filename) {
  if (filename.endsWith('.html') && lineStr.includes('rel="icon"')) return 'favicon';
  if (filename.endsWith('.html') && lineStr.includes('property="og:image"')) return 'meta tag';
  if (filename.toLowerCase().includes('navbar')) return 'navbar';
  if (filename.toLowerCase().includes('footer')) return 'footer';
  if (filename.toLowerCase().includes('hero')) return 'hero';
  if (filename.toLowerCase().includes('loading')) return 'loading screen';
  return 'general';
}

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    let match;
    
    // Check specific logo/favicon named files
    while ((match = urlRegex.exec(line)) !== null) {
      const src = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
      if (!src || src.startsWith('data:')) continue;

      const usage = getUsageType(content, line, file);
      const isCloudinary = src.includes('res.cloudinary.com');
      const isNewAcct = src.includes('dlhmkbijh');

      const entry = { file, line: index + 1, src, usage };

      totalUsages++;

      if (usage === 'favicon') faviconRefs.push(entry);
      if (usage === 'meta tag') metaRefs.push(entry);

      if (isCloudinary) {
        if (isNewAcct) newCloudinaryLogos.push(entry);
        else oldCloudinaryLogos.push(entry);
      } else if (src.startsWith('http')) {
        // external url but not cloudinary? just mark as local/external
        localLogos.push(entry);
      } else {
        // local file
        localLogos.push(entry);
        // check if broken
        let exists = false;
        let absPath = '';
        if (src.startsWith('/')) {
          absPath = path.join(publicDir, src);
          exists = fs.existsSync(absPath);
          if(!exists) {
            absPath = path.join(rootDir, src);
            exists = fs.existsSync(absPath);
          }
        } else {
          absPath = path.resolve(path.dirname(file), src);
          exists = fs.existsSync(absPath);
        }
        if (!exists) {
          brokenLogos.push({...entry, issue: 'File not found on disk'});
        }
      }
    }
  });
});

// also let's do a sweep for any cloudinary links that have 'logo' in the url but were missed by regex
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    let m;
    while ((m = genericCloudinaryRegex.exec(line)) !== null) {
      const url = m[0];
      if (url.toLowerCase().includes('logo') && !line.match(urlRegex)) {
         const usage = getUsageType(content, line, file);
         const entry = { file, line: index + 1, src: url, usage };
         totalUsages++;
         if (url.includes('dlhmkbijh')) newCloudinaryLogos.push(entry);
         else oldCloudinaryLogos.push(entry);
      }
    }
  });
});

const usedLocalLogoNames = localLogos.map(i => path.basename(i.src.split('?')[0]));
const unusedLogoFiles = logoFiles.filter(imgPath => !usedLocalLogoNames.includes(path.basename(imgPath)));

const duplicateMap = {};
logoFiles.forEach(imgPath => {
  const name = path.basename(imgPath);
  if (!duplicateMap[name]) duplicateMap[name] = [];
  duplicateMap[name].push(imgPath);
});
const duplicateVariants = Object.entries(duplicateMap).filter(([k,v]) => v.length > 1);

let report = "====================================================\nLOGO USAGE REPORT\n====================================================\n\n";

report += "--- NEW CLOUDINARY LOGOS ---\n";
if (newCloudinaryLogos.length === 0) report += "None found.\n";
newCloudinaryLogos.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\nUsage: ${i.usage}\n\n`);

report += "--- OLD CLOUDINARY LOGOS ---\n";
if (oldCloudinaryLogos.length === 0) report += "None found.\n";
oldCloudinaryLogos.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\nUsage: ${i.usage}\n\n`);

report += "--- LOCAL LOGOS ---\n";
if (localLogos.length === 0) report += "None found.\n";
localLogos.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\nUsage: ${i.usage}\n\n`);

report += "--- BROKEN LOGO REFERENCES ---\n";
if (brokenLogos.length === 0) report += "None found.\n";
brokenLogos.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\nIssue: ${i.issue}\n\n`);

report += "--- FAVICON REFERENCES ---\n";
if (faviconRefs.length === 0) report += "None found.\n";
faviconRefs.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\n\n`);

report += "--- META TAG REFERENCES ---\n";
if (metaRefs.length === 0) report += "None found.\n";
metaRefs.forEach(i => report += `File: ${i.file}:${i.line}\nSource: ${i.src}\n\n`);

report += "--- UNUSED LOGO FILES ---\n";
if (unusedLogoFiles.length === 0) report += "None found.\n";
unusedLogoFiles.forEach(i => report += `File: ${i}\n\n`);

report += "--- DUPLICATE LOGO VARIANTS ---\n";
if (duplicateVariants.length === 0) report += "None found.\n";
duplicateVariants.forEach(([name, paths]) => {
  report += `Variant: ${name}\nLocations:\n${paths.join('\n')}\n\n`;
});

report += "====================================================\nMIGRATION SUMMARY\n====================================================\n\n";
const migratedCount = newCloudinaryLogos.length;
const totalCount = totalUsages;
const pct = totalCount > 0 ? ((migratedCount / totalCount) * 100).toFixed(2) : 100;

report += `Total logo usages: ${totalCount}\n`;
report += `Successfully migrated: ${migratedCount}\n`;
report += `Old cloudinary references: ${oldCloudinaryLogos.length}\n`;
report += `Local references: ${localLogos.length}\n`;
report += `Broken references: ${brokenLogos.length}\n`;
report += `Migration percentage: ${pct}%\n`;

fs.writeFileSync(path.join(rootDir, 'logo_audit_report.txt'), report);
console.log("Audit complete. Report generated at logo_audit_report.txt");
