const fs = require('fs');

const files = [
  'src/pages/SkillDevelopment/CorporateTrainingPage.jsx',
  'src/pages/SkillDevelopment/HackathonPage.jsx',
  'src/pages/SkillDevelopment/MentorshipProgramsPage.jsx',
  'src/pages/SkillDevelopment/ResearchPage.jsx',
  'src/pages/SkillDevelopment/Workshop/WorkshopPage.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the incorrectly placed declarations
  content = content.replace(/[ \t]*const navigate = useNavigate\(\);\r?\n[ \t]*const location = useLocation\(\);\r?\n[ \t]*const pageKey = location\.key;\r?\n/g, '');
  
  // Insert them back just before the first `const [` inside the component
  // which will usually be useState for search, category, or currentPage
  content = content.replace(/(const \[searchQuery|const \[activeCategory|const \[currentPage)/, 'const navigate = useNavigate();\n    const location = useLocation();\n    const pageKey = location.key;\n    $1');
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
}
