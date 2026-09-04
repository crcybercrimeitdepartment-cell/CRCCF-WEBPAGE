// jobPortalData.js — Job Portal Listing Data
export const portalConfig = {
  pageTitle: "Job Vacancy Portal",
  pageSubtitle: "Explore career opportunities at CR Cyber Crime Foundation. Join us in building a safer digital India.",
};

export const jobListings = [
  {
    id: "CRCCF-HR-EXEC-2026-001",
    jobTitle: "HR Executive",
    jobCode: "CRCCF-HR-EXEC-2026-001",
    department: "HR Department",
    positionLevel: "Entry Level",
    status: "OPEN",
    shortDescription: "Support end-to-end recruitment activities, candidate screening, interview coordination, and day-to-day HR operations.",
    location: "Multiple Locations",
    openPositions: 30,
    applicationLastDate: "September 30, 2026",
    employmentType: "Permanent",
    workMode: "Hybrid",
    expectedJoining: "October 01, 2026",
    experience: "0–1 Year",
    salary: "₹2.4L – ₹3.6L / annum",
    tags: ["HR", "Recruitment", "Onboarding"],
  },
  {
    id: "CRCCF-HR-EXEC-2026-002",
    jobTitle: "HR Admin",
    jobCode: "CRCCF-HR-EXEC-2026-002",
    department: "HR Department",
    positionLevel: "Entry Level",
    status: "OPEN",
    shortDescription: "Support HR and administrative operations including employee records, office administration, and internal coordination.",
    location: "Multiple Locations",
    openPositions: 30,
    applicationLastDate: "September 30, 2026",
    employmentType: "Permanent",
    workMode: "Hybrid",
    expectedJoining: "October 01, 2026",
    experience: "0–1 Year",
    salary: "₹2.4L – ₹3.6L / annum",
    tags: ["HR Admin", "Documentation", "Administration"],
  },
  {
    id: "CRCCF-HR-ASSTMGR-2026-003",
    jobTitle: "HR Assistant Manager",
    jobCode: "CRCCF-HR-ASSTMGR-2026-003",
    department: "HR Department",
    positionLevel: "Mid-Level",
    status: "OPEN",
    shortDescription: "Support and coordinate the organisation's HR operations while assisting in team supervision, recruitment oversight, and employee management.",
    location: "Multiple Locations",
    openPositions: 15,
    applicationLastDate: "September 30, 2026",
    employmentType: "Permanent",
    workMode: "Hybrid",
    expectedJoining: "October 01, 2026",
    experience: "2–4 Years",
    salary: "₹3.0L – ₹4.2L / annum",
    tags: ["HR Assistant Manager", "HR Operations", "Recruitment"],
  },
];

export const filterOptions = {
  departments: ["All", "Security Operations", "Intelligence & Investigations", "Human Resources", "Legal & Compliance", "Public Relations", "Training & Education"],
  locations: ["All", "New Delhi, India", "Mumbai, India", "Bengaluru, India", "Remote", "Pan India (Travel Required)"],
  experience: ["All", "Entry Level", "Mid Level", "Senior Level"],
  employmentTypes: ["All", "Full-time", "Part-time", "Contract", "Internship"],
  statuses: ["All", "OPEN", "CLOSING SOON", "UPCOMING"],
  sortOptions: ["Latest", "Closing Soon", "Newest", "A–Z"],
};


// jobVacancyData.js
export const jobVacancyData = {
  // 1. Position Information
  positionInformation: {
    jobTitle: "Senior Cybersecurity Analyst",
    jobCode: "SEC-2026-004",
    department: "Security Operations",
    positionLevel: "Senior Level",
    numberOfVacancies: "3 Positions",
    applicationStatus: "Active / Accepting Applications"
  },

  // 2. Job Overview
  jobOverview: {
    employmentType: "Full-time",
    workMode: "Hybrid (3 days office, 2 days remote)",
    jobLocation: "New Delhi, India",
    contractDuration: "Permanent / Indefinite"
  },

  // 3. Job Profile
  jobProfile: {
    shortOverviewOfThePosition: "We are seeking a highly skilled Senior Cybersecurity Analyst to monitor, assess, and defend our digital infrastructure against emerging threats, orchestrate incident response, and lead security awareness initiatives across the foundation."
  },

  // 4. Job Description
  jobDescription: {
    detailedDescriptionOfTheRole: "As a Senior Cybersecurity Analyst, you will be part of the Cyber Crime Foundation's core defense team. Your role involves proactive threat hunting, implementing advanced defense systems, and managing cyber crime forensics. You will collaborate with regulatory bodies and law enforcement to analyze cyber incident patterns. The ideal candidate has deep expertise in network security, threat intelligence, and digital forensics."
  },

  // 5. Key Responsibilities
  keyResponsibilities: {
    responsibilitiesAndDuties: [
      "Monitor network traffic and security alerts for potential security incidents.",
      "Conduct digital forensics and incident response operations.",
      "Implement and maintain advanced intrusion detection and prevention systems.",
      "Collaborate with threat intelligence groups to proactively block threats.",
      "Document incidents, prepare reports, and provide technical guidance to junior analysts."
    ]
  },

  // 6. Eligibility Criteria
  eligibilityCriteria: {
    educationalQualification: "Bachelor's or Master's degree in Computer Science, Cybersecurity, Information Technology, or a related field.",
    requiredExperience: "5+ years of experience in security operations, threat hunting, or cybersecurity analytics.",
    ageLimit: "25 - 45 years",
    languageRequirements: "Fluent in written and spoken English. Proficiency in regional languages is an asset."
  },

  // 7. Skills & Competencies
  skillsAndCompetencies: {
    technicalSkills: [
      "Intrusion Detection",
      "SIEM (Splunk, ELK)",
      "Penetration Testing",
      "Incident Response",
      "Network Forensics"
    ],
    computerProficiency: [
      "Linux Administration",
      "Python/Bash Scripting",
      "Cloud Security (AWS/Azure)",
      "Wireshark",
      "Metasploit"
    ],
    softSkills: [
      "Critical Thinking",
      "Crisis Management",
      "Collaborative Communication",
      "Analytical Mindset",
      "Detail Oriented"
    ],
    additionalRequirements: [
      "Industry certifications (CISSP, CEH, or GIAC) are highly preferred.",
      "Valid government ID clearance."
    ]
  },

  // 8. Work Environment
  workEnvironment: {
    shiftType: "Rotational / Flexible Shift",
    workingDays: "Monday to Friday (5 Days a week)",
    workingHoursShiftTiming: "09:00 AM - 06:00 PM IST (including 1 hr break)",
    weeklyOff: "Saturday and Sunday"
  },

  // 9. Compensation & Benefits
  compensationAndBenefits: {
    annualCtcSalaryPackage: "₹12,00,000 - ₹18,00,000 per annum",
    monthlySalary: "₹1,00,000 - ₹1,50,000 (Subject to tax deductions)",
    pfEligibility: "Yes (Under Employee Provident Fund Organisation)",
    esiEligibility: "Yes (As per statutory norms)",
    otherBenefits: [
      "Comprehensive health insurance for self and family",
      "Professional certification allowance",
      "Annual performance-based bonuses",
      "Paid parental leave"
    ]
  },

  // 10. Why Join Us?
  whyJoinUs: {
    allFields: [
      "Work at the forefront of cyber crime defense and digital safety.",
      "Collaborative and research-oriented work environment.",
      "Opportunities to work with international security experts and law enforcement.",
      "Continuous learning and professional certification sponsorship."
    ]
  },

  // 11. Training & Probation
  trainingAndProbation: {
    trainingPeriod: "4 Weeks of specialized cybersecurity onboarding training.",
    probationPeriod: "6 months probation period with progress evaluation.",
    internshipDuration: "Not Applicable",
    internshipStipend: "Not Applicable"
  },

  // 12. Recruitment Process
  recruitmentProcess: {
    assessmentTestRequirement: "Technical Hackathon & Cybersecurity Quiz (Online)",
    numberOfInterviewRounds: "3 rounds: Technical screening, Case study review, and HR discussion.",
    interviewMode: "Virtual (Video interviews on Microsoft Teams)",
    selectionProcess: "Shortlisted candidates will take an online assessment, followed by technical and cultural fit interviews, leading to the final offer letter issuance."
  },

  // 13. Important Dates
  importantDates: {
    applicationStartDate: "June 01, 2026",
    applicationClosingDate: "June 30, 2026",
    expectedJoiningDate: "August 01, 2026"
  },

  // 14. Required Documents
  requiredDocuments: {
    requiredDocumentsList: [
      "Updated Resume/CV",
      "Educational Certificates (10th, 12th, Graduation/Post-Graduation)",
      "Experience Letters / Relieving Certificates from previous employers",
      "Last 3 months' salary slips and bank statement",
      "Government Issued ID Proof (Aadhaar, Passport, PAN, etc.)"
    ]
  },

  // 15. Application Information
  applicationInformation: {
    applicationFee: "Free (No application fee required)",
    applicationSubmissionMode: "Online via the CRCCF Recruitment Portal",
    applicationDeadline: "June 30, 2026, by 11:59 PM IST"
  },

  // 16. Contact Information
  contactInformation: {
    contactPersonDepartment: "Human Resources (Recruitment Division)",
    contactEmail: "careers@crccf.org",
    contactPhoneNumber: "+91 11 4567 8901"
  },

  // 17. Important Notices
  importantNotices: {
    equalOpportunityStatement: "CR Cyber Crime Foundation is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.",
    recruitmentDisclaimer: "CRCCF does not charge candidates any fees at any stage of the recruitment process. Please beware of fraudulent job offers claiming to represent the foundation.",
    additionalInformationSpecialInstructions: "Candidates are requested to provide accurate information. Discrepancies discovered during background verification will lead to immediate disqualification."
  }
};
