const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(srcDir, 'assets');

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.html'];
const ignoredDirs = ['node_modules', '.git', 'dist', 'build'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];

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

const oldCloudinaryLinks = [];
const localImagesInUse = [];
const brokenReferences = [];
let totalScanned = 0;

const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^\/]+\/(?:image|video)\/upload\/[^\s'"]+/g;
const localImageRegex = /(?:import[^'"]+from\s+['"]([^'"]+)['"]|src=['"]([^'"]+)['"]|url\(['"]?([^'"()]+)['"]?\)|href=['"]([^'"]+)['"]|image:\s*['"]([^'"]+)['"])/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Cloudinary check
    let match;
    while ((match = cloudinaryRegex.exec(line)) !== null) {
      totalScanned++;
      const url = match[0];
      if (!url.includes('dlhmkbijh')) {
        oldCloudinaryLinks.push({ file, url, line: index + 1 });
      }
    }

    // Local image check
    while ((match = localImageRegex.exec(line)) !== null) {
      const src = match[1] || match[2] || match[3] || match[4] || match[5];
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const ext = path.extname(src.split('?')[0]).toLowerCase();
        if (imageExtensions.includes(ext) || src.includes('mp4') || src.includes('mp3')) {
           totalScanned++;
           localImagesInUse.push({ file, path: src, line: index + 1 });
           
           // Check if broken
           let exists = false;
           let absPath = '';
           if (src.startsWith('/')) {
              absPath = path.join(publicDir, src);
              exists = fs.existsSync(absPath);
              if (!exists) {
                 absPath = path.join(rootDir, src);
                 exists = fs.existsSync(absPath);
              }
           } else {
              absPath = path.resolve(path.dirname(file), src);
              exists = fs.existsSync(absPath);
           }

           if (!exists && ext !== '.mp4' && ext !== '.mp3') { // ignore video/audio for image check
              brokenReferences.push({ file, ref: src, issue: 'File not found on disk' });
           }
        }
      }
    }
  });
});

const usedLocalImageNames = localImagesInUse.map(item => path.basename(item.path.split('?')[0]));
const unusedLocalImages = allLocalImages.filter(imgPath => {
  const name = path.basename(imgPath);
  return !usedLocalImageNames.includes(name);
});

let report = "";

report += "====================================================\n";
report += "OLD CLOUDINARY LINKS FOUND\n";
report += "====================================================\n\n";
oldCloudinaryLinks.forEach(item => {
  report += `File: ${item.file}\n`;
  report += `Old URL: ${item.url}\n`;
  report += `Line Number: ${item.line}\n\n`;
});

report += "====================================================\n";
report += "LOCAL IMAGES STILL IN USE\n";
report += "====================================================\n\n";
localImagesInUse.filter(i => imageExtensions.includes(path.extname(i.path).toLowerCase())).forEach(item => {
  report += `File: ${item.file}\n`;
  report += `Local Path: ${item.path}\n`;
  report += `Line Number: ${item.line}\n\n`;
});

report += "====================================================\n";
report += "UNUSED LOCAL IMAGES\n";
report += "====================================================\n\n";
unusedLocalImages.forEach(imgPath => {
  report += `File Path: ${imgPath}\n\n`;
});

report += "====================================================\n";
report += "UNMIGRATED IMAGE REFERENCES\n";
report += "====================================================\n\n";
oldCloudinaryLinks.forEach(item => {
  report += `File: ${item.file}\n`;
  report += `Reference: ${item.url}\n`;
  report += `Suggested Action: Migrate to new Cloudinary account dlhmkbijh\n\n`;
});
localImagesInUse.filter(i => imageExtensions.includes(path.extname(i.path).toLowerCase())).forEach(item => {
  report += `File: ${item.file}\n`;
  report += `Reference: ${item.path}\n`;
  report += `Suggested Action: Upload to Cloudinary and replace reference\n\n`;
});

report += "====================================================\n";
report += "BROKEN IMAGE REFERENCES\n";
report += "====================================================\n\n";
brokenReferences.forEach(item => {
  report += `File: ${item.file}\n`;
  report += `Reference: ${item.ref}\n`;
  report += `Issue: ${item.issue}\n\n`;
});

const totalMigrated = totalScanned - oldCloudinaryLinks.length - localImagesInUse.length;
const percentage = totalScanned > 0 ? ((totalMigrated / totalScanned) * 100).toFixed(2) : 100;

report += "====================================================\n";
report += "MIGRATION SUMMARY\n";
report += "====================================================\n\n";
report += `Total image references scanned: ${totalScanned}\n`;
report += `Old cloudinary references found: ${oldCloudinaryLinks.length}\n`;
report += `Local image references remaining: ${localImagesInUse.filter(i => imageExtensions.includes(path.extname(i.path).toLowerCase())).length}\n`;
report += `Unused local images: ${unusedLocalImages.length}\n`;
report += `Broken references: ${brokenReferences.length}\n`;
report += `Migration completion percentage: ${percentage}%\n`;

fs.writeFileSync(path.join(rootDir, 'image_audit_report.txt'), report);
console.log("Audit complete. Report generated at image_audit_report.txt");
