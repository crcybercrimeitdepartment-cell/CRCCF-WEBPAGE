const fs = require('fs');

const files = [
  'src/pages/SkillDevelopment/CorporateTrainingPage.jsx',
  'src/pages/SkillDevelopment/CoursePage.jsx',
  'src/pages/SkillDevelopment/HackathonPage.jsx',
  'src/pages/SkillDevelopment/MentorshipProgramsPage.jsx',
  'src/pages/SkillDevelopment/ResearchPage.jsx',
  'src/pages/SkillDevelopment/Workshop/WorkshopPage.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('useLocation')) {
    content = content.replace(/import \{([^}]+)\} from ['"]react-router-dom['"];/, (m, p1) => `import {${p1}, useLocation} from 'react-router-dom';`);
  }
  if (!content.includes('const location = useLocation();')) {
    content = content.replace(/const navigate = useNavigate\(\);/, 'const navigate = useNavigate();\n    const location = useLocation();\n    const pageKey = location.key;');
  }
  content = content.replace(/sessionStorage\.getItem\(['"]pageState_[a-zA-Z]+['"]\)/g, 'sessionStorage.getItem(`pageState_${pageKey}`)');
  content = content.replace(/sessionStorage\.setItem\(['"]pageState_[a-zA-Z]+['"],\s*currentPage\)/g, 'sessionStorage.setItem(`pageState_${pageKey}`, currentPage)');
  content = content.replace(/\}, \[currentPage\]\);/g, '}, [currentPage, pageKey]);');
  
  fs.writeFileSync(file, content);
  console.log('Patched ' + file);
}
