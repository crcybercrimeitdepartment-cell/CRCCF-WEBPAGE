const fs = require('fs');
const path = require('path');

const directories = [
  'd:/Final webpage/NewHomepage/src/pages/AboutUs',
  'd:/Final webpage/NewHomepage/src/pages/Service/OurService',
  'd:/Final webpage/NewHomepage/src/components/Service'
];

const filesToProcess = [
  'MeaningBehindOurNamePage.jsx',
  'OurIdentity.jsx',
  'OurActivity.jsx',
  'Purpose.jsx',
  'CyberInvestigationServices.jsx',
  'CyberSecurityServices.jsx',
  'DigitalMarketingServices.jsx',
  'EducationServices.jsx',
  'LegalInformationDocumentationSupport.jsx',
  'LegalServices.jsx',
  'LegalSupport.jsx',
  'PlacementServices.jsx',
  'SoftwareITServices.jsx',
  'TrainingInternshipServices.jsx',
  'VictimSupportServices.jsx',
  'InsightBook.jsx'
];

const replacements = [
  // Classes
  { from: /text-rose-600/g, to: 'text-blue-600' },
  { from: /text-rose-500/g, to: 'text-blue-500' },
  { from: /bg-rose-600/g, to: 'bg-blue-600' },
  { from: /bg-rose-50/g, to: 'bg-blue-50' },
  { from: /bg-rose-100/g, to: 'bg-blue-100' },
  { from: /from-rose-600/g, to: 'from-blue-600' },
  { from: /from-rose-500/g, to: 'from-blue-500' },
  { from: /from-rose-100/g, to: 'from-blue-100' },
  { from: /accent-rose-600/g, to: 'accent-blue-600' },
  { from: /accent-rose-700/g, to: 'accent-blue-700' },
  { from: /shadow-rose-200/g, to: 'shadow-blue-200' },
  
  { from: /text-emerald-600/g, to: 'text-blue-600' },
  { from: /text-emerald-500/g, to: 'text-blue-500' },
  { from: /bg-emerald-600/g, to: 'bg-blue-600' },
  { from: /bg-emerald-50/g, to: 'bg-blue-50' },
  { from: /bg-emerald-100/g, to: 'bg-blue-100' },
  { from: /from-emerald-500/g, to: 'from-blue-600' },
  { from: /from-emerald-600/g, to: 'from-blue-600' },
  { from: /from-emerald-100/g, to: 'from-blue-100' },
  { from: /accent-emerald-600/g, to: 'accent-blue-600' },
  { from: /accent-emerald-700/g, to: 'accent-blue-700' },
  { from: /shadow-emerald-200/g, to: 'shadow-blue-200' },

  { from: /text-amber-600/g, to: 'text-blue-600' },
  { from: /text-amber-500/g, to: 'text-blue-500' },
  { from: /bg-amber-600/g, to: 'bg-blue-600' },
  { from: /bg-amber-50/g, to: 'bg-blue-50' },
  { from: /bg-amber-100/g, to: 'bg-blue-100' },
  { from: /from-amber-500/g, to: 'from-blue-600' },
  { from: /from-amber-600/g, to: 'from-blue-600' },
  { from: /from-amber-100/g, to: 'from-blue-100' },
  { from: /accent-amber-600/g, to: 'accent-blue-600' },
  { from: /accent-amber-700/g, to: 'accent-blue-700' },
  { from: /shadow-amber-200/g, to: 'shadow-blue-200' },

  { from: /to-amber-500/g, to: 'to-cyan-500' },
  { from: /to-orange-600/g, to: 'to-cyan-500' },
  { from: /to-orange-500/g, to: 'to-cyan-500' },
  { from: /to-orange-100/g, to: 'to-cyan-100' },
  { from: /to-teal-600/g, to: 'to-cyan-500' },
  
  // Hex Colors
  { from: /borderLeft: `8px solid #E11D48`/g, to: 'borderLeft: `8px solid #2563EB`' },
  { from: /borderLeft: `8px solid #10B981`/g, to: 'borderLeft: `8px solid #2563EB`' },
  { from: /borderLeft: `8px solid #D97706`/g, to: 'borderLeft: `8px solid #2563EB`' },
  
  { from: /#FFF1F2/g, to: '#EFF6FF' },
  { from: /#F0FFF9/g, to: '#EFF6FF' },
  { from: /#FFFBEB/g, to: '#EFF6FF' },
  { from: /#FFF7ED/g, to: '#EFF6FF' },
  
  { from: /#FFF9F9/g, to: '#F8FAFC' },
  { from: /#FFFBFB/g, to: '#F1F5F9' },
  { from: /#FDFDFF/g, to: '#F8FAFC' },
  { from: /#F8FAFF/g, to: '#F1F5F9' },
  { from: /#FFFDF9/g, to: '#F8FAFC' },
  { from: /#FFFEFB/g, to: '#F1F5F9' },
  
  // Also inline styles gradients and colors
  { from: /stopColor={color\.rose600}/g, to: 'stopColor={color.blue600}' },
  { from: /stopColor={color\.amber500}/g, to: 'stopColor={color.cyan500}' },
  { from: /stopColor={color\.emerald500}/g, to: 'stopColor={color.blue600}' },
  { from: /stopColor={color\.blue600}/g, to: 'stopColor={color.cyan500}' }, // If activity had emerald to blue
  { from: /stopColor={color\.orange500}/g, to: 'stopColor={color.cyan500}' },
  { from: /stroke={color\.amber600}/g, to: 'stroke={color.blue600}' },
];

function processDir(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (filesToProcess.includes(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      replacements.forEach(rep => {
        content = content.replace(rep.from, rep.to);
      });
      
      // Specifically for OurActivity: it had stopColor={color.blue600}, wait we replaced it with cyan500 above just in case.
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Processed', file);
    }
  });
}

directories.forEach(processDir);
