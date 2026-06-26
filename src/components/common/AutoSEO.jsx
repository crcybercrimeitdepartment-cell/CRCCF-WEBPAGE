import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';

const seoData = {
  "/": { title: "Home", desc: "CR Cyber Crime Foundation provides cyber security, cyber awareness, cyber investigation, digital safety services, training, consultancy, and digital empowerment." },
  "/gallery-collections": { title: "Gallery Collections", desc: "View our gallery collections of events, workshops, and cyber awareness programs conducted by CR Cyber Crime Foundation." },
  "/gallery": { title: "Gallery", desc: "Explore our gallery featuring photos from various cyber security awareness campaigns and training programs." },
  "/reachus": { title: "Reach Us", desc: "Contact CR Cyber Crime Foundation for cyber security consultancy, training, and cyber crime investigation services." },
  "/insights": { title: "Insights", desc: "Read our latest insights, articles, and research on cyber security, digital safety, and cyber crime prevention." },
  "/software-products": { title: "Software Products", desc: "Explore our advanced software products and IT solutions designed for robust cyber security and digital infrastructure." },
  "/report-crime": { title: "Report Cyber Crime", desc: "Report cyber crime incidents securely. Get assistance with FIR filing, digital evidence collection, and legal support." },
  "/skill-development": { title: "Skill Development", desc: "Enhance your cyber security skills with our training programs, internships, courses, and workshops." },
  "/skill-development/internships": { title: "Internship Programs", desc: "Join our cyber security internship programs to gain hands-on experience in digital investigation and IT security." },
  "/skill-development/placement": { title: "Talent Placement Program", desc: "Our talent placement program connects trained cyber security professionals with top industry organizations." },
  "/skill-development/career": { title: "Career Guidance", desc: "Get expert career guidance in cyber security, ethical hacking, and IT development." },
  "/skill-development/awareness": { title: "Awareness Programs", desc: "Participate in our cyber awareness programs to learn how to stay safe in the digital world." },
  "/resources/course-materials": { title: "Course Materials", desc: "Access comprehensive course materials for our cyber security and IT training programs." },
  "/resources/practical-training": { title: "Practical Training", desc: "Engage in hands-on practical training to build real-world cyber security skills." },
  "/resources/mentorship-evaluation": { title: "Mentorship Evaluation", desc: "Evaluate and track your progress in our cyber security mentorship programs." },
  "/resources/learning-environment": { title: "Learning Environment", desc: "Discover our state-of-the-art learning environment designed for optimal cyber security education." },
  "/contact": { title: "Contact Us", desc: "Get in touch with CR Cyber Crime Foundation for any inquiries, support, or services." },
  "/contact/help-desk": { title: "Help Desk", desc: "Access our help desk for support related to cyber security incidents and services." },
  "/contact/follow-apps": { title: "Follow Apps", desc: "Connect with us on various platforms and applications for the latest updates." },
  "/follow-apps": { title: "Follow Apps", desc: "Stay connected with CRCCF across different social media and application platforms." },
  "/contact/branch-details": { title: "Branch Details", desc: "Find information about CR Cyber Crime Foundation branches and locations." },
  "/contact/officer": { title: "Officers Directory", desc: "Directory of officers at CR Cyber Crime Foundation." },
  "/contact/employee": { title: "Employees Directory", desc: "Directory of employees and staff at CR Cyber Crime Foundation." },
  "/contact/teacher": { title: "Teachers Directory", desc: "Directory of educators and trainers at CRCCF." },
  "/contact/reporter": { title: "Reporters Directory", desc: "Directory of reporters associated with CRCCF." },
  "/contact/advocate": { title: "Advocates Directory", desc: "Directory of legal advocates working with CRCCF." },
  "/contact/legal-advisor": { title: "Legal Advisors Directory", desc: "Directory of legal advisors providing support at CRCCF." },
  "/contact/board-of-director": { title: "Board of Directors", desc: "Information about the Board of Directors at CR Cyber Crime Foundation." },
  "/contact/board-of-member": { title: "Board Members", desc: "Information about the Board Members of CRCCF." },
  "/contact/ai-chat": { title: "AI Chat Support", desc: "Use our AI chat support for quick answers and assistance." },
  "/contact/review": { title: "Reviews", desc: "Read reviews and feedback from our clients and trainees." },
  "/contact/feedback": { title: "Feedback", desc: "Provide your valuable feedback to help us improve our services and programs." },
  "/contact/announcements": { title: "Announcements", desc: "Stay updated with the latest announcements and news from CRCCF." },
  "/about": { title: "About Us", desc: "Learn about CR Cyber Crime Foundation, our mission, vision, and core activities in cyber security." },
  "/about/identity": { title: "Our Identity", desc: "Understand the core identity and values of CR Cyber Crime Foundation." },
  "/about/introduction": { title: "Introduction", desc: "An introduction to the initiatives and goals of CR Cyber Crime Foundation." },
  "/about/what-we-do": { title: "What We Do", desc: "Discover our core work domains including cyber security, digital investigation, and IT development." },
  "/about/mission-vision": { title: "Mission & Vision", desc: "Our mission to protect digital infrastructure and our vision for a secure cyber space." },
  "/about/activity": { title: "Our Activities", desc: "Explore the various activities and programs conducted by CRCCF." },
  "/about/purpose": { title: "Our Purpose", desc: "Learn about the fundamental purpose driving CR Cyber Crime Foundation." },
  "/about/objective": { title: "Our Objectives", desc: "Discover the key objectives and goals we aim to achieve in the cyber security landscape." },
  "/about/achievement": { title: "Our Achievements", desc: "Review the milestones and achievements of CR Cyber Crime Foundation." },
  "/about/privacy-policy": { title: "Privacy Policy", desc: "Read our privacy policy detailing how we protect your data and digital information." },
  "/about/data-protection": { title: "Data Protection", desc: "Our commitment and policies regarding data protection and information security." },
  "/about/terms-conditions": { title: "Terms & Conditions", desc: "Review the terms and conditions for using CRCCF services and platforms." },
  "/about/rules-regulation": { title: "Rules & Regulations", desc: "Understand the rules and regulations governing our programs and services." },
  "/about/instruction": { title: "Instructions", desc: "Important instructions and guidelines for users and participants." },
  "/about/legal-disclaimer": { title: "Legal Disclaimer", desc: "Read the legal disclaimer regarding the use of our website and services." },
  "/about/copyright": { title: "Copyright & Registration", desc: "Information about copyright, intellectual property, and registration details of CRCCF." },
  "/about/partnership": { title: "Partnerships & Collaborations", desc: "Explore opportunities for partnerships and collaborations with CR Cyber Crime Foundation." },
  "/about/history": { title: "Our History", desc: "Learn about the history and evolution of CR Cyber Crime Foundation." },
  "/careers": { title: "Careers", desc: "Explore career opportunities and job vacancies at CR Cyber Crime Foundation." },
  "/recruitment": { title: "Recruitment Portal", desc: "Access our recruitment portal for job applications and career opportunities." },
  "/recruitment/job-vacancy": { title: "Job Vacancies", desc: "View current job vacancies and openings at CRCCF." },
  "/recruitment/job-vacancy-details": { title: "Job Vacancy Details", desc: "Detailed information about specific job vacancies at CRCCF." },
  "/recruitment/post-vacancy-members-only": { title: "Post Vacancy (Members Only)", desc: "Exclusive portal for members to post job vacancies." },
  "/recruitment/online-application-portal": { title: "Online Application Portal", desc: "Submit your job applications online through our dedicated portal." },
  "/recruitment/advertisements": { title: "Recruitment Advertisements", desc: "View our latest recruitment advertisements and notices." },
  "/recruitment/press-release-notices": { title: "Press Releases & Notices", desc: "Read official press releases and notices related to recruitment." },
  "/recruitment/application-status": { title: "Application Status", desc: "Check the status of your submitted job applications." },
  "/recruitment/submit-resume": { title: "Submit Resume", desc: "Submit your resume for future career opportunities with CRCCF." },
  "/recruitment/certificate-verification": { title: "Certificate Verification", desc: "Verify the authenticity of certificates issued by CR Cyber Crime Foundation." },
  "/recruitment/rules-policies": { title: "Recruitment Rules & Policies", desc: "Read the comprehensive rules and policies governing our recruitment process." },
  "/recruitment/rules-policies/employment-overview": { title: "Employment Overview", desc: "Overview of employment practices and opportunities at CRCCF." },
  "/recruitment/rules-policies/career-development-progress": { title: "Career Development", desc: "Information on career development and progression within CRCCF." },
  "/recruitment/rules-policies/employee-growth-future-opportunity": { title: "Employee Growth", desc: "Learn about employee growth and future opportunities at our organization." },
  "/recruitment/rules-policies/employment-eligibility-criteria": { title: "Eligibility Criteria", desc: "Review the employment eligibility criteria for joining CRCCF." },
  "/recruitment/rules-policies/recruitment-selection-process": { title: "Selection Process", desc: "Understand our recruitment and selection process." },
  "/recruitment/rules-policies/recruitment-instructions": { title: "Recruitment Instructions", desc: "Important instructions for candidates applying for positions." },
  "/recruitment/rules-policies/recruitment-guidelines": { title: "Recruitment Guidelines", desc: "General guidelines and procedures for the recruitment process." },
  "/recruitment/rules-policies/recruitment-calendar": { title: "Recruitment Calendar", desc: "View the calendar for upcoming recruitment drives and events." },
  "/recruitment/rules-policies/code-of-conduct-professional-ethics": { title: "Code of Conduct", desc: "Read our code of conduct and professional ethics for employees." },
  "/recruitment/rules-policies/training-orientation-skill-development": { title: "Training & Orientation", desc: "Details about employee training, orientation, and skill development." },
  "/recruitment/rules-policies/performance-review-evaluation-system": { title: "Performance Review", desc: "Information on our performance review and evaluation system." },
  "/recruitment/rules-policies/employee-rights-responsibilities": { title: "Employee Rights", desc: "Understand the rights and responsibilities of employees at CRCCF." },
  "/recruitment/rules-policies/volunteer-internship-policy": { title: "Volunteer & Internship Policy", desc: "Read our policies regarding volunteer work and internships." },
  "/recruitment/rules-policies/employee-recognition-awards": { title: "Recognition & Awards", desc: "Learn about our employee recognition programs and awards." }
};

function formatTitle(str) {
  const parts = str.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || 'Home';
  return last.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function AutoSEO() {
  const location = useLocation();
  const [meta, setMeta] = useState({ title: 'CRCCF', desc: 'CR Cyber Crime Foundation' });

  useEffect(() => {
    // Exact match
    if (seoData[location.pathname]) {
      setMeta(seoData[location.pathname]);
      return;
    }

    // Try to match partial (like /services/software-it)
    const basePaths = Object.keys(seoData).filter(p => location.pathname.startsWith(p) && p !== '/');
    if (basePaths.length > 0) {
      // Find the longest matching base path
      const longest = basePaths.reduce((a, b) => a.length > b.length ? a : b);
      // For dynamic routes not exactly matched, generate a title
      setMeta({
        title: formatTitle(location.pathname),
        desc: seoData[longest].desc
      });
      return;
    }

    // Fallback
    setMeta({
      title: formatTitle(location.pathname),
      desc: "CR Cyber Crime Foundation provides cyber security, cyber awareness, cyber investigation, digital safety services, training, consultancy, and digital empowerment."
    });
  }, [location.pathname]);

  return <SEO title={meta.title} description={meta.desc} url={`https://crccf.org${location.pathname}`} />;
}
