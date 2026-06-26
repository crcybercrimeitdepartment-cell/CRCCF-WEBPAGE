import {
    Shield, Bug, Crosshair, Network, Cloud, Radio, Eye,
    FileSearch, Gavel, Target, Brain, Cpu, Search,
    BarChart3, LineChart, Code, Globe, Smartphone, Apple,
    GitBranch, Link, Database, Palette, PenTool, Brush,
    Megaphone, Rocket, FileText, Award, Briefcase, Clipboard,
    Handshake, DollarSign, Scale, FileSignature, ShieldCheck,
    Building2, Compass, MessageSquare, Users, TrendingUp
} from 'lucide-react';

export const mentorshipPrograms = [
    { id: "cybersecurity-course", title: "Cybersecurity Course" },
    { id: "ethical-hacking-course", title: "Ethical Hacking Course" },
    { id: "penetration-testing-course", title: "Penetration Testing Course" },
    { id: "soc-analyst-course", title: "SOC Analyst Course" },
    { id: "network-security-course", title: "Network Security Course" },
    { id: "cloud-security-course", title: "Cloud Security Course" },
    { id: "incident-response-course", title: "Incident Response Course" },
    { id: "threat-intelligence-course", title: "Threat Intelligence Course" },
    { id: "application-security-course", title: "Application Security (AppSec) Course" },
    { id: "osint-course", title: "OSINT (Open Source Intelligence) Course" },
    { id: "reverse-engineering-course", title: "Reverse Engineering Course" },
    { id: "cyber-forensics-course", title: "Cyber Forensics Course" },
    { id: "cyber-crime-investigation-course", title: "Cyber Crime Investigation Course" },
    { id: "cybercrime-case-study-course", title: "Cybercrime Case Study Course" },
    { id: "cyber-intelligence-course", title: "Cyber Intelligence Course" },
    { id: "digital-evidence-analysis-course", title: "Digital Evidence Analysis Course" },
    { id: "cyber-risk-assessment-course", title: "Cyber Risk Assessment Course" },
    { id: "cyber-psychology-course", title: "Cyber Psychology Course" },
    { id: "cyber-threat-hunting-course", title: "Cyber Threat Hunting Course" },
    { id: "software-development-course", title: "Software Development Course" },
    { id: "data-analytics-course", title: "Data Analytics Course" },
    { id: "data-science-course", title: "Data Science Course" },
    { id: "ai-machine-learning-course", title: "Artificial Intelligence & Machine Learning Course" },
    { id: "web-development-course", title: "Web Development Course" },
    { id: "mobile-app-development-course", title: "Mobile App Development Course" },
    { id: "ios-development-course", title: "iOS Development Course" },
    { id: "devops-engineering-course", title: "DevOps Engineering Course" },
    { id: "software-testing-qa-course", title: "Software Testing & QA Course" },
    { id: "database-administration-course", title: "Database Administration (DBA) Course" },
    { id: "blockchain-development-course", title: "Blockchain Development Course" },
    { id: "uiux-design-course", title: "UI/UX Design Course" },
    { id: "graphic-design-course", title: "Graphic Design Course" },
    { id: "content-writing-course", title: "Content Writing Course" },
    { id: "digital-marketing-course", title: "Digital Marketing Course" },
    { id: "marketing-management-course", title: "Marketing Management Course" },
    { id: "business-development-course", title: "Business Development Course" },
    { id: "product-management-course", title: "Product Management Course" },
    { id: "finance-accounting-course", title: "Finance & Accounting Course" },
    { id: "chartered-accountancy-course", title: "Chartered Accountancy (CA) Course" },
    { id: "cyber-law-course", title: "Cyber Law Course" },
    { id: "legal-research-course", title: "Legal Research Course" },
    { id: "corporate-law-course", title: "Corporate Law Course" },
    { id: "criminal-law-course", title: "Criminal Law Course" },
    { id: "digital-rights-course", title: "Digital Rights Course" },
    { id: "legal-consulting-course", title: "Legal Consulting Course" },
    { id: "human-resources-course", title: "Human Resources (HR) Course" },
    { id: "journalism-media-course", title: "Journalism & Media Course" }
];

export const CATEGORIES = [
    { id: 'All', name: 'All Programs', icon: Compass },
    { id: 'Leadership & Management', name: 'Leadership', icon: Award },
    { id: 'Communication & Soft Skills', name: 'Communication', icon: MessageSquare },
    { id: 'People & HR', name: 'People & HR', icon: Users },
    { id: 'Business & Sales', name: 'Business & Sales', icon: TrendingUp },
    { id: 'Marketing', name: 'Marketing', icon: Megaphone },
    { id: 'Finance & Risk', name: 'Finance & Risk', icon: DollarSign },
    { id: 'Technology & Digital', name: 'Technology', icon: Cpu },
    { id: 'Cybersecurity & Compliance', name: 'Security & Compliance', icon: Shield }
];

export const iconMap = {
    "cybersecurity-course": { icon: Shield, color: "#4f46e5" },
    "ethical-hacking-course": { icon: Bug, color: "#16a34a" },
    "penetration-testing-course": { icon: Crosshair, color: "#dc2626" },
    "soc-analyst-course": { icon: Radio, color: "#2563eb" },
    "network-security-course": { icon: Network, color: "#ea580c" },
    "cloud-security-course": { icon: Cloud, color: "#0d9488" },
    "incident-response-course": { icon: Shield, color: "#e11d48" },
    "threat-intelligence-course": { icon: Eye, color: "#7c3aed" },
    "application-security-course": { icon: ShieldCheck, color: "#0891b2" },
    "osint-course": { icon: Search, color: "#ca8a04" },
    "reverse-engineering-course": { icon: Cpu, color: "#6d28d9" },
    "cyber-forensics-course": { icon: FileSearch, color: "#0284c7" },
    "cyber-crime-investigation-course": { icon: Gavel, color: "#be185d" },
    "cybercrime-case-study-course": { icon: FileText, color: "#475569" },
    "cyber-intelligence-course": { icon: Eye, color: "#7c3aed" },
    "digital-evidence-analysis-course": { icon: FileSearch, color: "#0369a1" },
    "cyber-risk-assessment-course": { icon: Target, color: "#b45309" },
    "cyber-psychology-course": { icon: Brain, color: "#db2777" },
    "cyber-threat-hunting-course": { icon: Crosshair, color: "#059669" },
    "software-development-course": { icon: Code, color: "#6d28d9" },
    "data-analytics-course": { icon: LineChart, color: "#0369a1" },
    "data-science-course": { icon: BarChart3, color: "#0f766e" },
    "ai-machine-learning-course": { icon: Brain, color: "#6366f1" },
    "web-development-course": { icon: Globe, color: "#15803d" },
    "mobile-app-development-course": { icon: Smartphone, color: "#c2410c" },
    "ios-development-course": { icon: Apple, color: "#b91c1c" },
    "devops-engineering-course": { icon: GitBranch, color: "#475569" },
    "software-testing-qa-course": { icon: Bug, color: "#dc2626" },
    "database-administration-course": { icon: Database, color: "#10b981" },
    "blockchain-development-course": { icon: Link, color: "#0ea5e9" },
    "uiux-design-course": { icon: Palette, color: "#f43f5e" },
    "graphic-design-course": { icon: Brush, color: "#a16207" },
    "content-writing-course": { icon: PenTool, color: "#1e40af" },
    "digital-marketing-course": { icon: Megaphone, color: "#be185d" },
    "marketing-management-course": { icon: Rocket, color: "#047857" },
    "business-development-course": { icon: Handshake, color: "#854d0e" },
    "product-management-course": { icon: Clipboard, color: "#9f1239" },
    "finance-accounting-course": { icon: DollarSign, color: "#5b21b6" },
    "chartered-accountancy-course": { icon: Award, color: "#166534" },
    "cyber-law-course": { icon: Scale, color: "#115e59" },
    "legal-research-course": { icon: FileSignature, color: "#3730a3" },
    "corporate-law-course": { icon: Building2, color: "#334155" },
    "criminal-law-course": { icon: Gavel, color: "#e11d48" },
    "digital-rights-course": { icon: ShieldCheck, color: "#0e7490" },
    "legal-consulting-course": { icon: Briefcase, color: "#4c1d95" },
    "human-resources-course": { icon: Handshake, color: "#166534" },
    "journalism-media-course": { icon: FileText, color: "#b45309" }
};

export const distinctThemes = [
    { gradient: "linear-gradient(180deg, #1b2f4a 0%, #0d1726 100%)", color: "#60a5fa" },
    { gradient: "linear-gradient(180deg, #134237 0%, #09211b 100%)", color: "#34d399" },
    { gradient: "linear-gradient(180deg, #5c1122 0%, #300810 100%)", color: "#fb7185" },
    { gradient: "linear-gradient(180deg, #3d1b5c 0%, #200d30 100%)", color: "#c084fc" },
    { gradient: "linear-gradient(180deg, #2d2d30 0%, #151517 100%)", color: "#f3f4f6" },
    { gradient: "linear-gradient(180deg, #0d3e45 0%, #052125 100%)", color: "#22d3ee" },
    { gradient: "linear-gradient(180deg, #5c4213 0%, #332408 100%)", color: "#fbbf24" },
    { gradient: "linear-gradient(180deg, #4f1b4a 0%, #290d26 100%)", color: "#f472b6" },
    { gradient: "linear-gradient(180deg, #6b1d1d 0%, #3b0a0a 100%)", color: "#f87171" },
    { gradient: "linear-gradient(180deg, #384213 0%, #1f250a 100%)", color: "#a3e635" },
    { gradient: "linear-gradient(180deg, #182d5a 0%, #0b152d 100%)", color: "#93c5fd" },
    { gradient: "linear-gradient(180deg, #4b3018 0%, #291a0c 100%)", color: "#fb923c" }
];

export function getProgramIconInfo(program) {
    const mapped = iconMap[program.id];
    if (mapped) return { icon: mapped.icon, color: mapped.color };
    return { icon: Target, color: '#3b82f6' };
}

export function getBookThemeByIndex(index) {
    const safeIndex = (index !== undefined ? index : 0) % distinctThemes.length;
    return distinctThemes[safeIndex];
}

export const heroData = {
    title: "Courses",
    subtitle: "Develop leadership, communication, management, and workplace skills through expert-led corporate training programs."
};

export const sectionsData = [];
export const cardsData = [];
export const timelineData = [];
export const faqData = [];
export const statsData = [];
export const testimonialsData = [];
export const courseData = [];
export const countersData = [];
export const iconConfig = {};
export const imageConfig = {};
export const constants = {};

export const labels = {
    corporate: "Corporate",
    training: "Training",
    switchLight: "Switch to Light Mode",
    switchDark: "Switch to Dark Mode",
    footerDesc: "Empowering professionals with industry-leading training programs for skill development, leadership growth, and career advancement.",
    categories: "Categories",
    company: "Company",
    copyright: "Corporate Training. All rights reserved.",
    madeWith: "Made with",
    forLearning: "for learning",
    searchPlaceholder: "Search courses by name or category...",
    clear: "Clear",
    bookshelfSign: "COURSES",
    prev: "&lt; PREV",
    next: "NEXT &gt;",
    noPrograms: "No Programs Found",
    noProgramsDesc: "We couldn't find any training programs matching your search. Try a different keyword.",
    clearSearch: "Clear Search",
    openingDetails: "Opening Details...",
    back: "Back",
    notFound: "Program Not Found",
    notFoundDesc: "The program you are looking for does not exist or has been moved.",
    backHome: "Back to Home",
    comingSoon: "Coming Soon...",
    underDev: "This section is under development. Stay tuned!",
    applyTitle: "Apply for Training",
    applySub: "Secure your spot in the next training cohort.",
    submitApp: "Submit Application",
    appReceived: "Application Received!",
    done: "Done",
    curriculum: "Curriculum & Roadmap",
    skills: "Skills You'll Master",
};

export const footerLinks = {
    categories: [
        { name: "Leadership & Management", href: "#leadership" },
        { name: "Business & Sales", href: "#business" },
        { name: "Technology & Digital", href: "#technology" },
        { name: "Security & Compliance", href: "#cyber" }
    ],
    company: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" }
    ],
    social: [
        { name: "Github", url: "https://github.com", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com", icon: "twitter" }
    ]
};
