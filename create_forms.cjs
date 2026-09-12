const fs = require('fs');
const path = require('path');

const originalNames = [
  "10th Certificate Application Form",
  "12th Certificate Application Form",
  "ITI Certificate Application Form",
  "Diploma Certificate Application Form",
  "Degree Certificate Application Form",
  "Master Degree Certificate Application Form",
  "Seminar Registration Form",
  "Webinar Registration Form",
  "Workshop Registration Form",
  "Institutional Training Request Form",
  "Cyber Awareness Program Request Form",
  "Collaboration Application Form",
  "Partnership Application Form",
  "Researcher Application Form",
  "Freelance / Consultant Application Form",
  "Volunteer Application Form",
  "Job Application Form",
  "Event Participation Application Form",
  "Duplicate ID Card Application Form",
  "Duplicate Certificate Application Form",
  "Software Product Purchase Request Form",
  "Software Product Demo Request Form",
  "Technical Support Request Form",
  "Membership Application Form",
  "Membership Renewal Application Form",
  "Feedback & Suggestion Form",
  "Grievance Submission Form",
  "Complaint Submission Form",
  "Sponsorship Application Form",
  "General Inquiry / Information Request Form"
];

const fileNames = [
  "10thCertificateApplicationFormPage.jsx",
  "12thCertificateApplicationFormPage.jsx",
  "ITICertificateApplicationFormPage.jsx",
  "DiplomaCertificateApplicationFormPage.jsx",
  "DegreeCertificateApplicationFormPage.jsx",
  "MasterDegreeCertificateApplicationFormPage.jsx",
  "SeminarRegistrationFormPage.jsx",
  "WebinarRegistrationFormPage.jsx",
  "WorkshopRegistrationFormPage.jsx",
  "InstitutionalTrainingRequestFormPage.jsx",
  "CyberAwarenessProgramRequestFormPage.jsx",
  "CollaborationApplicationFormPage.jsx",
  "PartnershipApplicationFormPage.jsx",
  "ResearcherApplicationFormPage.jsx",
  "FreelanceConsultantApplicationFormPage.jsx",
  "VolunteerApplicationFormPage.jsx",
  "JobApplicationFormPage.jsx",
  "EventParticipationApplicationFormPage.jsx",
  "DuplicateIDCardApplicationFormPage.jsx",
  "DuplicateCertificateApplicationFormPage.jsx",
  "SoftwareProductPurchaseRequestFormPage.jsx",
  "SoftwareProductDemoRequestFormPage.jsx",
  "TechnicalSupportRequestFormPage.jsx",
  "MembershipApplicationFormPage.jsx",
  "MembershipRenewalApplicationFormPage.jsx",
  "FeedbackAndSuggestionFormPage.jsx",
  "GrievanceSubmissionFormPage.jsx",
  "ComplaintSubmissionFormPage.jsx",
  "SponsorshipApplicationFormPage.jsx",
  "GeneralInquiryInformationRequestFormPage.jsx"
];

const basePath = path.join(__dirname, 'src', 'pages', 'recruitment', 'Online Application Portal');

originalNames.forEach((name, index) => {
  // Replace invalid folder characters with a space or dash
  const folderName = name.replace(/[\/\\]/g, '-');
  const dirPath = path.join(basePath, folderName);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const fileName = fileNames[index];
  const filePath = path.join(dirPath, fileName);
  const componentName = fileName.replace('.jsx', '').replace(/[^a-zA-Z0-9_]/g, ''); // Ensure valid component name
  
  // React component names shouldn't start with numbers.
  let validComponentName = componentName;
  if (/^[0-9]/.test(validComponentName)) {
    validComponentName = 'Form' + validComponentName;
  }
  
  const content = `import React from 'react';

export default function ${validComponentName}() {
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">${name}</h1>
        <p className="text-center text-gray-600">Form details coming soon.</p>
      </div>
    </div>
  );
}
`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('Successfully created ' + originalNames.length + ' folders and files.');
