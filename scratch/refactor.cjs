const fs = require('fs');
const path = require('path');

const root = process.cwd();
const publicDir = path.join(root, 'public');
const srcDir = path.join(root, 'src');
const pagesDir = path.join(publicDir, 'pages');

const categories = ['home', 'contact', 'legal-services', 'software-products', 'management-consulting', 'skill-development', 'cyber-awareness', 'recruitment', 'careers', 'about', 'shared'];

// Create directories
categories.forEach(cat => {
    const p = path.join(pagesDir, cat);
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
    }
});

const imageExts = new Set(['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']);

// 1. Find all image files
const allImages = [];

function findImages(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fullPath.includes('public\\pages') || fullPath.includes('public/pages')) continue;
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findImages(fullPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (imageExts.has(ext)) {
                allImages.push({
                    fullPath,
                    name: item,
                    isPublic: fullPath.startsWith(publicDir),
                    oldUrl: fullPath.startsWith(publicDir) 
                      ? fullPath.substring(publicDir.length).replace(/\\/g, '/')
                      : null,
                });
            }
        }
    }
}
findImages(publicDir);
findImages(srcDir);

// 2. Find all source files
const allSourceFiles = [];
function findSourceFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findSourceFiles(fullPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (['.js', '.jsx', '.css', '.ts', '.tsx'].includes(ext)) {
                allSourceFiles.push({
                    fullPath,
                    content: fs.readFileSync(fullPath, 'utf8')
                });
            }
        }
    }
}
findSourceFiles(srcDir);

const report = [];

allImages.forEach(img => {
    const usages = [];
    const usedInDirs = new Set();
    
    let searchStr = img.name;
    
    allSourceFiles.forEach(src => {
        if (src.content.includes(searchStr)) {
            usages.push(src);
            
            const p = src.fullPath.toLowerCase();
            if (p.includes('contact')) usedInDirs.add('contact');
            else if (p.includes('legal')) usedInDirs.add('legal-services');
            else if (p.includes('software')) usedInDirs.add('software-products');
            else if (p.includes('management')) usedInDirs.add('management-consulting');
            else if (p.includes('skilldevelopment')) usedInDirs.add('skill-development');
            else if (p.includes('cyberawareness') || p.includes('cyberawarenes')) usedInDirs.add('cyber-awareness');
            else if (p.includes('recruitment')) usedInDirs.add('recruitment');
            else if (p.includes('career')) usedInDirs.add('careers');
            else if (p.includes('about')) usedInDirs.add('about');
            else if (p.includes('home') || p.includes('app.jsx')) usedInDirs.add('home');
            else usedInDirs.add('shared');
        }
    });

    let targetFolder = 'shared';
    if (usages.length === 0) {
        targetFolder = 'unused';
    } else if (usedInDirs.size === 1) {
        targetFolder = Array.from(usedInDirs)[0];
    } else {
        targetFolder = 'shared';
    }
    
    if (img.name === 'HeroIMG.png') targetFolder = 'home';
    if (img.name === 'anotherImage.png') targetFolder = 'contact';
    if (img.name === 'law-hero-bg.jpg') targetFolder = 'legal-services';
    if (img.name === 'software-hero-bg.jpg') targetFolder = 'software-products';
    if (img.name === 'management-hero-bg.jpg') targetFolder = 'management-consulting';
    if (['awareness_hero.png', 'cyber_safety_card.png', 'fraud_card.png', 'internet_card.png', 'mobile_card.png', 'password_card.png', 'phishing_card.png'].includes(img.name)) targetFolder = 'cyber-awareness';

    if (targetFolder === 'unused') {
        fs.unlinkSync(img.fullPath);
        report.push({ img: img.name, original: img.fullPath, new: 'Deleted', updatedFiles: 0 });
    } else {
        const newRelativePath = '/pages/' + targetFolder + '/' + img.name;
        const newFullPath = path.join(pagesDir, targetFolder, img.name);
        
        if (img.fullPath !== newFullPath) {
            fs.renameSync(img.fullPath, newFullPath);
        }
        
        let filesUpdated = 0;
        
        usages.forEach(src => {
            let updatedContent = src.content;
            
            if (img.isPublic) {
                const oldUrl = img.oldUrl;
                updatedContent = updatedContent.split(oldUrl).join(newRelativePath);
                if (oldUrl !== '/' + img.name) {
                    updatedContent = updatedContent.split('/' + img.name).join(newRelativePath);
                }
            } else {
                const importRegex = new RegExp(`import\\s+(\\w+)\\s+from\\s+['"\`][^'"\`]*${img.name}['"\`]`, 'g');
                updatedContent = updatedContent.replace(importRegex, `const $1 = "${newRelativePath}";`);
                
                const requireRegex = new RegExp(`require\\(['"\`][^'"\`]*${img.name}['"\`]\\)`, 'g');
                updatedContent = updatedContent.replace(requireRegex, `"${newRelativePath}"`);
            }
            
            if (updatedContent !== src.content) {
                fs.writeFileSync(src.fullPath, updatedContent, 'utf8');
                src.content = updatedContent;
                filesUpdated++;
            }
        });
        
        report.push({ img: img.name, original: img.fullPath, new: newRelativePath, updatedFiles: filesUpdated, usages: usages.map(u => u.fullPath) });
    }
});

const scratchDir = path.join(root, 'scratch');
if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir);
fs.writeFileSync(path.join(scratchDir, 'asset-report.json'), JSON.stringify(report, null, 2));
console.log('Done!');
