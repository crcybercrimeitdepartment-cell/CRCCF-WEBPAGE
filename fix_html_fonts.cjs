const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const combinedFonts = 'https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@100..900&family=Outfit:wght@100..900&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;700&family=VT323&display=swap';

// Find the section with fonts and replace it
html = html.replace(/<link rel="preload" as="style" href="https:\/\/fonts\.googleapis\.com.*?<\/noscript>/s, 
`<link rel="preload" as="style" href="${combinedFonts}" />
    <link rel="stylesheet" href="${combinedFonts}" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="${combinedFonts}" />
    </noscript>`);

fs.writeFileSync('index.html', html);
console.log("Updated index.html fonts");
