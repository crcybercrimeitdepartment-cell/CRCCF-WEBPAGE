import { 
  Shield, 
  Search, 
  Code, 
  GraduationCap, 
  BookOpen, 
  Target, 
  Rocket, 
  Zap, 
  Monitor, 
  Globe, 
  Lock, 
  Cpu,
  BarChart,
  Users,
  Award,
  Clock,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Laptop,
  Megaphone,
  HandHeart,
  Scale,
  Handshake,
  BriefcaseBusiness,
  History,
  FileCheck,
  UserCheck,
  Calendar,
  Heart,
  Trophy,
  Activity,
  Lightbulb,
  Newspaper,
  Terminal,
  Database,
  Server,
  Cloud,
  FileSearch,
  CheckCircle,
  AlertCircle,
  Quote,
  TrendingUp,
  Brain,
  ShieldAlert,
  Smartphone,
  Eye,
  Settings,
  MessageSquare,
  Star,
  Layers,
  SearchCode,
  Layout,
  MousePointer2,
  PieChart,
  Globe2,
  HardDrive,
  Infinity as InfinityIcon,
  Fingerprint,
  FileLock,
  Network,
  Wrench,
  Info,
  Flag,
  AlertTriangle,
  Copyright,
  Sprout,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  ShieldCheck,
  BarChart3,
  FlaskConical,
  Palette,
  Presentation,
  Mic,
  Gavel,
  UserPlus,
  Video,
  Send,
  Edit3,
  ClipboardList,
  HelpCircle,
  FileSpreadsheet,
  LifeBuoy,
  Book
} from 'lucide-react';

const reportCrimeSearchData = [
  {
    title: "Report Cyber Crime",
    description: "Report cyber incidents securely and access awareness resources through the CRCCF cyber crime reporting page.",
    category: "Report Crime",
    link: "/report-crime#report-crime-hero",
    tags: ["report crime", "cyber crime", "incident", "complaint", "secure report", "online fraud", "victim help"],
    iconName: "ShieldAlert"
  },
  {
    title: "Report Now",
    description: "Quick action button to begin reporting a cyber crime incident.",
    category: "Report Crime",
    link: "/report-crime#report-crime-report-now",
    tags: ["report now", "submit complaint", "file report", "cyber complaint", "help"],
    iconName: "AlertTriangle"
  },
  {
    title: "Report Crime Sections",
    description: "Explore all report crime cards, safety resources, legal guidance, status checks, and awareness sections.",
    category: "Report Crime",
    link: "/report-crime#report-crime-sections",
    tags: ["sections", "cards", "explore", "report portal", "cyber safety", "support"],
    iconName: "Layout"
  },
  {
    title: "CR Cyber Crime Foundation Report Resources",
    description: "Official CR Cyber Crime Foundation ticker and report crime resource area.",
    category: "Report Crime",
    link: "/report-crime#report-crime-foundation-ticker",
    tags: ["crccf", "cr cyber crime foundation", "official", "resources", "foundation"],
    iconName: "Shield"
  },
  {
    title: "Report Cyber Crime Card",
    description: "Open the cyber crime report card for filing complaints related to fraud, harassment, threats, hacking, or online abuse.",
    category: "Report Crime",
    link: "/report-crime#report-crime-report-cyber-crime",
    tags: ["report cyber crime", "file complaint", "fraud", "hacking", "abuse", "threat", "incident"],
    iconName: "ShieldAlert"
  },
  {
    title: "Check Complaint Status",
    description: "Find the complaint status card for tracking a submitted cyber crime report or case update.",
    category: "Report Crime",
    link: "/report-crime#report-crime-check-complaint-status",
    tags: ["complaint status", "status", "track complaint", "case update", "application status"],
    iconName: "Search"
  },
  {
    title: "Cyber Security Tips",
    description: "Search practical security tips for passwords, online safety, phishing prevention, and digital protection.",
    category: "Report Crime",
    link: "/report-crime#report-crime-cyber-security-tips",
    tags: ["cyber security tips", "security", "phishing", "password", "safe browsing", "protection"],
    iconName: "Lightbulb"
  },
  {
    title: "Cyber Safety for Women",
    description: "Access women-focused cyber safety guidance covering online harassment, privacy, stalking, and emergency support.",
    category: "Report Crime",
    link: "/report-crime#report-crime-cyber-safety-for-women",
    tags: ["women safety", "cyber safety", "harassment", "privacy", "stalking", "support"],
    iconName: "Users"
  },
  {
    title: "Victim Rights & Support",
    description: "Learn about victim rights, emotional support, legal assistance, and help available after cyber crime incidents.",
    category: "Report Crime",
    link: "/report-crime#report-crime-victim-rights-and-support",
    tags: ["victim rights", "victim support", "legal help", "assistance", "counseling"],
    iconName: "HandHeart"
  },
  {
    title: "Report Crime Introduction",
    description: "Introductory information explaining the cyber crime reporting portal and available support resources.",
    category: "Report Crime",
    link: "/report-crime#report-crime-introduction",
    tags: ["introduction", "overview", "report portal", "cyber crime help", "resources"],
    iconName: "Info"
  },
  {
    title: "Report Crime Instructions",
    description: "Instructions for safely preparing, documenting, and submitting cyber crime complaints.",
    category: "Report Crime",
    link: "/report-crime#report-crime-instructions",
    tags: ["instructions", "steps", "documentation", "evidence", "submit complaint"],
    iconName: "BookOpen"
  },
  {
    title: "Report Crime Guidelines",
    description: "Guidelines for responsible reporting, evidence handling, privacy, and complaint submission.",
    category: "Report Crime",
    link: "/report-crime#report-crime-guidelines",
    tags: ["guidelines", "evidence", "privacy", "responsible reporting", "complaint"],
    iconName: "ClipboardList"
  },
  {
    title: "Report Crime Rules & Regulations",
    description: "Rules and regulations related to cyber crime reporting, legal standards, and responsible platform use.",
    category: "Report Crime",
    link: "/report-crime#report-crime-rules-and-regulations",
    tags: ["rules", "regulations", "legal standards", "cyber law", "compliance"],
    iconName: "Scale"
  },
  {
    title: "Legal Guidance for Cyber Crime",
    description: "Legal guidance for victims needing help with cyber law, complaint drafting, notices, and official processes.",
    category: "Report Crime",
    link: "/report-crime#report-crime-legal-guidance",
    tags: ["legal guidance", "cyber law", "advocate", "legal support", "complaint drafting"],
    iconName: "Gavel"
  },
  {
    title: "Report Crime Declarations",
    description: "Declarations and confirmations related to truthful reporting, consent, and submitted cyber complaint details.",
    category: "Report Crime",
    link: "/report-crime#report-crime-declarations",
    tags: ["declarations", "confirmation", "truthful report", "consent", "verification"],
    iconName: "FileCheck"
  },
  {
    title: "How to Report Cyber Crime",
    description: "Step-by-step help for reporting cyber crime, preserving evidence, and contacting the right support channels.",
    category: "Report Crime",
    link: "/report-crime#report-crime-how-to-report",
    tags: ["how to report", "steps", "evidence", "support channels", "complaint process"],
    iconName: "HelpCircle"
  },
  {
    title: "Case Reporting",
    description: "Case reporting section for cyber incidents requiring details, evidence, timeline, and victim information.",
    category: "Report Crime",
    link: "/report-crime#report-crime-case-reporting",
    tags: ["case reporting", "case report", "incident details", "timeline", "evidence"],
    iconName: "AlertTriangle"
  },
  {
    title: "Awareness & Prevention",
    description: "Awareness and prevention content for avoiding cyber fraud, scams, phishing, identity theft, and online abuse.",
    category: "Report Crime",
    link: "/report-crime#report-crime-awareness-and-prevention",
    tags: ["awareness", "prevention", "fraud prevention", "scams", "phishing", "identity theft"],
    iconName: "Eye"
  },
  {
    title: "Types of Cyber Crimes",
    description: "Browse common types of cyber crimes including phishing, UPI fraud, identity theft, hacking, and cyber bullying.",
    category: "Report Crime",
    link: "/report-crime#report-crime-types-of-cyber-crimes",
    tags: ["types", "cyber crimes", "phishing", "upi fraud", "identity theft", "hacking", "cyber bullying"],
    iconName: "FileText"
  },
  {
    title: "Cyber Laws & Rights",
    description: "Cyber laws and rights section covering legal protections, victim rights, IT Act awareness, and reporting duties.",
    category: "Report Crime",
    link: "/report-crime#report-crime-cyber-laws-and-rights",
    tags: ["cyber laws", "rights", "it act", "legal protection", "victim rights"],
    iconName: "Book"
  },
  {
    title: "Cyber Crime Success Stories",
    description: "Success stories and positive outcomes from cyber crime reporting, investigation, support, and prevention.",
    category: "Report Crime",
    link: "/report-crime#report-crime-success-stories",
    tags: ["success stories", "case success", "investigation", "recovery", "support"],
    iconName: "Trophy"
  },
  {
    title: "Cyber Crime Case Study",
    description: "Case study resources for understanding real cyber crime scenarios, lessons, investigation methods, and prevention.",
    category: "Report Crime",
    link: "/report-crime#report-crime-case-study",
    tags: ["case study", "scenario", "analysis", "investigation", "lessons", "prevention"],
    iconName: "FileSpreadsheet"
  },
  {
    title: "Cyber Security Prevention",
    description: "Cyber security prevention card covering proactive protection, safe habits, risk reduction, and threat avoidance.",
    category: "Report Crime",
    link: "/report-crime#report-crime-cyber-security-prevention",
    tags: ["cyber security prevention", "prevention", "risk reduction", "threat avoidance", "safe habits"],
    iconName: "ShieldCheck"
  },
  {
    title: "Cyber Crime Safety Tips",
    description: "Safety tips for staying protected from cyber crime, suspicious links, financial fraud, social engineering, and scams.",
    category: "Report Crime",
    link: "/report-crime#report-crime-cyber-crime-safety-tips",
    tags: ["cyber crime safety tips", "safety tips", "suspicious links", "financial fraud", "social engineering", "scams"],
    iconName: "LifeBuoy"
  }
];

export const searchableData = [
  // --- HERO SLIDES (Slogans & Themes) ---
  {
    title: "Protecting India’s Digital Infrastructure",
    description: "Safeguarding government bodies, enterprises, and citizens.",
    category: "Security",
    link: "/#",
    tags: ["security", "india", "infrastructure", "protection"],
    iconName: "Shield"
  },
  {
    title: "Cyber Crime Investigation & Forensics",
    description: "Investigating fraud, identity theft, and data breaches.",
    category: "Investigation",
    link: "/#",
    tags: ["forensics", "investigation", "crime", "fraud"],
    iconName: "Search"
  },
  {
    title: "Secure IT & Software Solutions",
    description: "Designing scalable enterprise software with security at core.",
    category: "Technology",
    link: "/#",
    tags: ["it", "software", "solutions", "enterprise"],
    iconName: "Code"
  },
  {
    title: "AI-Driven Threat Intelligence",
    description: "Detecting anomalies and predicting cyber threats using AI.",
    category: "AI",
    link: "/#",
    tags: ["ai", "threats", "intelligence", "predictive"],
    iconName: "Brain"
  },
  {
    title: "Legal & Victim Support Services",
    description: "Assisting victims with FIR filing and legal documentation.",
    category: "Legal",
    link: "/#",
    tags: ["legal", "victim", "support", "fir"],
    iconName: "Scale"
  },

  // --- WHO WE ARE (Cards) ---
  {
    title: "About the Organization",
    description: "Non-profit committed to cybercrime awareness and investigation.",
    category: "Who We Are",
    link: "/#about",
    tags: ["organization", "foundation", "crccf", "cyber revolution"],
    iconName: "History"
  },
  {
    title: "Who We Serve",
    description: "Empowering students, public, organizations, and victims.",
    category: "Who We Are",
    link: "/#about",
    tags: ["serve", "students", "public", "organizations", "victims"],
    iconName: "Users"
  },
  {
    title: "Our Core Focus",
    description: "Awareness, Advanced IT, and Professional Training.",
    category: "Who We Are",
    link: "/#about",
    tags: ["focus", "awareness", "it", "training", "internship"],
    iconName: "Target"
  },
  {
    title: "Our Vision",
    description: "Building a secure, innovative, and future-ready digital ecosystem.",
    category: "Who We Are",
    link: "/#about",
    tags: ["vision", "future", "ecosystem", "innovation", "digital"],
    iconName: "Lightbulb"
  },

  // --- ABOUT SECTION SUB-PAGES ---
  {
    title: "Our Identity",
    description: "Who we are and what we stand for as a cybercrime foundation.",
    category: "About",
    link: "/about/identity",
    tags: ["identity", "brand", "who we are", "values", "integrity"],
    iconName: "UserCheck"
  },
  {
    title: "Our Introduction",
    description: "Welcome to our world and our team of passionate professionals.",
    category: "About",
    link: "/about/introduction",
    tags: ["welcome", "intro", "introduction", "team", "passion"],
    iconName: "Info"
  },
  {
    title: "About What We Do",
    description: "Our services, expertise, and comprehensive digital solutions.",
    category: "About",
    link: "/about/what-we-do",
    tags: ["services", "expertise", "work", "solutions"],
    iconName: "Wrench"
  },
  {
    title: "Mission & Vision",
    description: "Our guiding principles and long-term vision for a safer digital world.",
    category: "About",
    link: "/about/mission-vision",
    tags: ["mission", "vision", "goals", "principles", "roadmap"],
    iconName: "Target"
  },
  {
    title: "Our Activity",
    description: "What keeps us busy: research, development, and community outreach.",
    category: "About",
    link: "/about/activity",
    tags: ["activity", "research", "outreach", "busy", "events"],
    iconName: "Activity"
  },
  {
    title: "Our Purpose",
    description: "Why we exist: bridging the gap between technology and human needs.",
    category: "About",
    link: "/about/purpose",
    tags: ["purpose", "why", "exist", "bridge", "gap"],
    iconName: "Lightbulb"
  },
  {
    title: "Our Objective",
    description: "Our goals for sustainable growth and high quality standards.",
    category: "About",
    link: "/about/objective",
    tags: ["objective", "goals", "standards", "growth"],
    iconName: "Flag"
  },
  {
    title: "Our Achievement",
    description: "Milestones: 500+ projects, 100+ clients, and industry awards.",
    category: "About",
    link: "/about/achievement",
    tags: ["achievement", "success", "milestones", "awards", "stats"],
    iconName: "Trophy"
  },
  {
    title: "Legal & Compliance",
    description: "Our legal framework and adherence to ethical business practices.",
    category: "About",
    link: "/about/legal-compliance",
    tags: ["legal", "compliance", "laws", "framework", "ethics"],
    iconName: "Scale"
  },
  {
    title: "Privacy Policy",
    description: "How we protect and manage your personal data and privacy.",
    category: "About",
    link: "/about/privacy-policy",
    tags: ["privacy", "data", "policy", "security", "gdpr"],
    iconName: "Shield"
  },
  {
    title: "Data Protection",
    description: "Security measures to ensure your data remains secure and confidential.",
    category: "About",
    link: "/about/data-protection",
    tags: ["data", "protection", "security", "encryption", "confidential"],
    iconName: "Database"
  },
  {
    title: "Terms & Condition",
    description: "Terms of service governing our relationship with our users.",
    category: "About",
    link: "/about/terms-conditions",
    tags: ["terms", "conditions", "agreement", "service"],
    iconName: "FileText"
  },
  {
    title: "Rules & Regulation",
    description: "Internal rules maintaining discipline and ethical standards.",
    category: "About",
    link: "/about/rules-regulation",
    tags: ["rules", "regulation", "standards", "discipline"],
    iconName: "BookOpen"
  },
  {
    title: "Instruction",
    description: "Guidelines and protocols for using our services safely.",
    category: "About",
    link: "/about/instruction",
    tags: ["instruction", "guidelines", "how to", "protocols"],
    iconName: "GraduationCap"
  },
  {
    title: "Legal Disclaimer",
    description: "Important notice about the completeness and accuracy of information.",
    category: "About",
    link: "/about/legal-disclaimer",
    tags: ["disclaimer", "legal", "notice", "warning"],
    iconName: "AlertTriangle"
  },
  {
    title: "Copyright Registration",
    description: "Intellectual property protection for all our content and designs.",
    category: "About",
    link: "/about/copyright",
    tags: ["copyright", "ip", "intellectual property", "protected"],
    iconName: "Copyright"
  },
  {
    title: "Partnership & Collaboration",
    description: "Strategic partnerships to create innovative solutions and mutual growth.",
    category: "About",
    link: "/about/partnership",
    tags: ["partnership", "collaboration", "join", "partner"],
    iconName: "Handshake"
  },
  {
    title: "Our History",
    description: "Our journey from a small team in 2015 to a global family.",
    category: "About",
    link: "/about/history",
    tags: ["history", "journey", "timeline", "evolution"],
    iconName: "History"
  },

  // --- SERVICE PAGE SPECIFIC CONTENT ---
  {
    title: "Cyber Security & Software Solutions",
    description: "Combining cyber security services and software solutions for modern digital challenges.",
    category: "Services",
    link: "/services",
    tags: ["solutions", "challenges", "future-ready", "secure"],
    iconName: "Monitor"
  },
  {
    title: "Expert Investigation",
    description: "Deep-dive analysis and forensic support for cyber crime incidents.",
    category: "Services",
    link: "/services",
    tags: ["investigation", "forensics", "incidents", "analysis"],
    iconName: "Search"
  },
  {
    title: "Secure Development",
    description: "Building robust software solutions with security-first architecture.",
    category: "Services",
    link: "/services",
    tags: ["development", "architecture", "robust", "secure"],
    iconName: "Code"
  },
  {
    title: "Proactive Defense",
    description: "Continuous monitoring and threat intelligence to prevent attacks.",
    category: "Services",
    link: "/services",
    tags: ["defense", "monitoring", "threats", "prevention"],
    iconName: "Shield"
  },
  {
    title: "Software & IT Services",
    description: "Custom software development and scalable IT infrastructure.",
    category: "Services",
    link: "/services/software-it",
    tags: ["software", "it", "development", "coding", "web"],
    iconName: "Laptop"
  },
  {
    title: "Digital Marketing",
    description: "Results-driven marketing, SEO, and brand growth strategies.",
    category: "Services",
    link: "/services/digital-marketing",
    tags: ["marketing", "seo", "branding", "growth"],
    iconName: "Megaphone"
  },
  {
    title: "Victim Support Services",
    description: "Dedicated assistance and counseling for cybercrime victims.",
    category: "Services",
    link: "/services/victim-support",
    tags: ["victim", "help", "support", "counseling", "fraud"],
    iconName: "HandHeart"
  },
  {
    title: "Cyber Investigation",
    description: "Professional digital forensics and cybercrime investigation.",
    category: "Services",
    link: "/services/cyber-investigation",
    tags: ["investigation", "forensics", "evidence", "tracing"],
    iconName: "Search"
  },
  {
    title: "Placement Services",
    description: "Career guidance and placement support for our trained professionals.",
    category: "Services",
    link: "/services/placement",
    tags: ["placement", "jobs", "hiring", "career"],
    iconName: "BriefcaseBusiness"
  },
  {
    title: "Education Services",
    description: "Academic programs and awareness sessions on cybersecurity.",
    category: "Services",
    link: "/services/education",
    tags: ["education", "academic", "learning", "awareness"],
    iconName: "GraduationCap"
  },
  {
    title: "Training & Internship",
    description: "Industry-oriented training and real-world internship programs.",
    category: "Services",
    link: "/services/training-internship",
    tags: ["training", "internship", "skills", "practical"],
    iconName: "Handshake"
  },

  // --- CONTACT US DIRECTORIES ---
  {
    title: "Officer Directory",
    description: "Search and view profiles of CRCCF security and compliance officers.",
    category: "Contact",
    link: "/contact/officer",
    tags: ["officer", "security", "compliance", "staff"],
    iconName: "BadgeCheck"
  },
  {
    title: "Employee Directory",
    description: "Connect with our engineering, development, and support staff.",
    category: "Contact",
    link: "/contact/employee",
    tags: ["employee", "staff", "team", "engineering"],
    iconName: "Users"
  },
  {
    title: "Teacher Directory",
    description: "Academic staff and educators specializing in cybersecurity.",
    category: "Contact",
    link: "/contact/teacher",
    tags: ["teacher", "educator", "academic", "faculty"],
    iconName: "BookOpen"
  },
  {
    title: "Reporter Directory",
    description: "Media professionals and official CRCCF reporters.",
    category: "Contact",
    link: "/contact/reporter",
    tags: ["reporter", "media", "press", "journalist"],
    iconName: "Mic"
  },
  {
    title: "Advocate Directory",
    description: "Legal advocates providing support for cybercrime victims.",
    category: "Contact",
    link: "/contact/advocate",
    tags: ["advocate", "legal", "victim", "support"],
    iconName: "Scale"
  },
  {
    title: "Legal Advisor Directory",
    description: "Consult with our expert legal advisors on cyber law.",
    category: "Contact",
    link: "/contact/legal-advisor",
    tags: ["legal", "advisor", "consultant", "law"],
    iconName: "Gavel"
  },
  {
    title: "Board of Directors",
    description: "Profiles of the executive leadership team at CRCCF.",
    category: "Contact",
    link: "/contact/board-of-director",
    tags: ["director", "leadership", "board", "executive"],
    iconName: "UserCheck"
  },
  {
    title: "Board of Members",
    description: "Our diverse board members contributing to CRCCF's mission.",
    category: "Contact",
    link: "/contact/board-of-member",
    tags: ["member", "board", "foundation"],
    iconName: "UserPlus"
  },

  // --- SPECIFIC CONTACT PROFILES ---
  {
    title: "Michael Chen (OFF-2045)",
    description: "Chief Security Officer - Security & Compliance",
    category: "Contact",
    link: "/contact/officer",
    tags: ["michael chen", "cso", "security", "officer"],
    iconName: "UserCheck"
  },
  {
    title: "Sarah Williams (OFF-2046)",
    description: "Compliance Officer - Legal Department",
    category: "Contact",
    link: "/contact/officer",
    tags: ["sarah williams", "compliance", "legal", "officer"],
    iconName: "UserCheck"
  },
  {
    title: "John Doe (EMP-1042)",
    description: "Senior Developer - Engineering Team",
    category: "Contact",
    link: "/contact/employee",
    tags: ["john doe", "developer", "engineer", "staff"],
    iconName: "Users"
  },
  // --- REACH US & SOCIALS ---
  {
    title: "Twitter Official",
    description: "Follow @crcybercrime on X for real-time cyber alerts and updates.",
    category: "Social",
    link: "https://x.com/",
    tags: ["twitter", "x", "alerts", "updates"],
    iconName: "Globe2"
  },
  {
    title: "YouTube Official",
    description: "Watch our educational webinars and cyber awareness videos.",
    category: "Social",
    link: "https://youtube.com/@crcybercrimeofficialchannel?si=n96o6iVeJTas66Z6",
    tags: ["youtube", "videos", "webinars", "education"],
    iconName: "Video"
  },
  {
    title: "Telegram Updates",
    description: "Join our official Telegram channel for instant notifications.",
    category: "Social",
    link: "https://t.me/crcybercrimeofficialchannel",
    tags: ["telegram", "updates", "notifications", "chat"],
    iconName: "Send"
  },
  {
    title: "Official Website",
    description: "Visit our main web portal for comprehensive resources.",
    category: "Social",
    link: "https://crcybercrime.com/",
    tags: ["website", "portal", "resources", "main"],
    iconName: "Globe"
  },
  {
    title: "Facebook Official",
    description: "Follow us on Facebook for latest updates and news.",
    category: "Social",
    link: "https://www.facebook.com/crcybercrimeofficialpage",
    tags: ["facebook", "social", "media", "updates"],
    iconName: "Globe2"
  },
  {
    title: "LinkedIn Official",
    description: "Connect with us on LinkedIn for professional insights.",
    category: "Social",
    link: "https://www.linkedin.com/company/cr-cyber-crime/",
    tags: ["linkedin", "professional", "social", "business"],
    iconName: "Globe2"
  },
  {
    title: "Instagram Official",
    description: "Follow our journey and activities on Instagram.",
    category: "Social",
    link: "https://www.instagram.com/crcybercrime/",
    tags: ["instagram", "social", "photos", "updates"],
    iconName: "Globe2"
  },
  {
    title: "WhatsApp Support",
    description: "Direct chat support via our official WhatsApp channel.",
    category: "Social",
    link: "https://api.whatsapp.com/send/?phone=919777999529",
    tags: ["whatsapp", "chat", "support", "instant"],
    iconName: "Smartphone"
  },
  {
    title: "Support Email",
    description: "Send your queries to hr@crcybercrime.org for official support.",
    category: "Reach Us",
    link: "mailto:hr@crcybercrime.org",
    tags: ["email", "hr", "support", "query"],
    iconName: "Mail"
  },
  {
    title: "New York Office",
    description: "123 Cyber Avenue, Tech District NY 10001, United States",
    category: "Reach Us",
    link: "/reachus#branches",
    tags: ["new york", "usa", "office", "branch"],
    iconName: "MapPin"
  },
  {
    title: "London Office",
    description: "45 Security Square, Canary Wharf E14 5AB, United Kingdom",
    category: "Reach Us",
    link: "/reachus#branches",
    tags: ["london", "uk", "office", "branch"],
    iconName: "MapPin"
  },
  {
    title: "Singapore Office",
    description: "88 Innovation Drive, Marina Bay 018956, Singapore",
    category: "Reach Us",
    link: "/reachus#branches",
    tags: ["singapore", "asia", "office", "branch"],
    iconName: "MapPin"
  },
  {
    title: "Contact Form",
    description: "Send us a direct message for support, partnerships, or queries.",
    category: "Reach Us",
    link: "/reachus#form",
    tags: ["form", "message", "contact", "support"],
    iconName: "Edit3"
  },

  // --- PROJECTS & PORTFOLIO ---
  {
    title: "Project Statistics",
    description: "Overview of 70+ total projects, including ongoing and completed initiatives.",
    category: "Portfolio",
    link: "/#projects-portfolio",
    tags: ["stats", "projects", "portfolio", "impact"],
    iconName: "BarChart"
  },
  {
    title: "Our Approach",
    description: "Innovative, secure, and technology-driven project methodology.",
    category: "Portfolio",
    link: "/#projects-portfolio",
    tags: ["approach", "strategy", "innovation"],
    iconName: "Rocket"
  },
  {
    title: "Project Scope",
    description: "National-level initiatives and international collaborations.",
    category: "Portfolio",
    link: "/#projects-portfolio",
    tags: ["scope", "global", "india", "collaboration"],
    iconName: "Globe2"
  },

  {
    title: "Career Development & Progress",
    description: "Our framework for continuous professional growth and advancement.",
    category: "Careers",
    link: "/recruitment/rules-policies/career-development-progress",
    tags: ["growth", "career", "development", "progress"],
    iconName: "TrendingUp"
  },
  {
    title: "Employee Growth & Future Opportunity",
    description: "Exploring future prospects and growth trajectories within CRCCF.",
    category: "Careers",
    link: "/recruitment/rules-policies/employee-growth-future-opportunity",
    tags: ["future", "opportunity", "growth", "prospects"],
    iconName: "Sprout"
  },
  {
    title: "Recruitment Policy & Employment Overview",
    description: "General overview of our employment standards and hiring framework.",
    category: "Careers",
    link: "/recruitment/rules-policies/employment-overview",
    tags: ["policy", "overview", "employment", "standards"],
    iconName: "FileText"
  },
  {
    title: "Recruitment Instructions",
    description: "Step-by-step instructions for applicants during the hiring process.",
    category: "Careers",
    link: "/recruitment/rules-policies/recruitment-instructions",
    tags: ["instructions", "applicants", "hiring", "steps"],
    iconName: "ClipboardList"
  },
  {
    title: "Recruitment Guidelines",
    description: "Official guidelines for maintaining fairness and transparency in recruitment.",
    category: "Careers",
    link: "/recruitment/rules-policies/recruitment-guidelines",
    tags: ["guidelines", "fairness", "transparency", "hiring"],
    iconName: "BookOpenCheck"
  },
  {
    title: "Training & Skill Development",
    description: "Orientation and skill development programs for new and existing staff.",
    category: "Careers",
    link: "/recruitment/rules-policies/training-orientation-skill-development",
    tags: ["training", "orientation", "skills", "development"],
    iconName: "GraduationCap"
  },
  {
    title: "Performance Review & Evaluation",
    description: "Our systematic approach to evaluating employee performance and rewards.",
    category: "Careers",
    link: "/recruitment/rules-policies/performance-review-evaluation-system",
    tags: ["performance", "review", "evaluation", "feedback"],
    iconName: "BarChart3"
  },
  {
    title: "Employee Rights & Responsibilities",
    description: "Understanding your rights and duties as a member of the CRCCF team.",
    category: "Careers",
    link: "/recruitment/rules-policies/employee-rights-responsibilities",
    tags: ["rights", "responsibilities", "duties", "conduct"],
    iconName: "Users"
  },
  {
    title: "Volunteer & Internship Policy",
    description: "Framework and guidelines for our volunteer and internship programs.",
    category: "Careers",
    link: "/recruitment/rules-policies/volunteer-internship-policy",
    tags: ["volunteer", "internship", "policy", "students"],
    iconName: "Handshake"
  },

  // --- GALLERY CATEGORIES ---
  {
    title: "Student Gallery",
    description: "Photos and highlights of our successful students.",
    category: "Gallery",
    link: "/gallery/category/0",
    tags: ["students", "photos", "gallery", "highlights"],
    iconName: "GraduationCap"
  },
  {
    title: "Media & Press",
    description: "News coverage and official press moments.",
    category: "Gallery",
    link: "/gallery/category/1",
    tags: ["media", "press", "news", "coverage"],
    iconName: "Newspaper"
  },
  {
    title: "Events Gallery",
    description: "Visual logs of our national and international events.",
    category: "Gallery",
    link: "/gallery/category/2",
    tags: ["events", "videos", "highlights", "logs"],
    iconName: "Video"
  },
  {
    title: "Team Moments",
    description: "Behind-the-scenes and collaborative moments of the CRCCF team.",
    category: "Gallery",
    link: "/gallery/category/3",
    tags: ["team", "moments", "internal", "staff"],
    iconName: "Users"
  },
  {
    title: "Certificates & Awards",
    description: "Our official recognitions and industry awards gallery.",
    category: "Gallery",
    link: "/gallery/category/4",
    tags: ["certificates", "awards", "recognition", "medals"],
    iconName: "Award"
  },
  {
    title: "Client Work Showcase",
    description: "Visual case studies of our digital solutions and client projects.",
    category: "Gallery",
    link: "/gallery/category/5",
    tags: ["client", "work", "showcase", "projects"],
    iconName: "Monitor"
  },
  {
    title: "Training Gallery",
    description: "Capturing our hands-on training and skill development workshops.",
    category: "Gallery",
    link: "/gallery/category/6",
    tags: ["training", "workshops", "learning", "photos"],
    iconName: "BookOpen"
  },
  {
    title: "Cyber Campaigns",
    description: "Visual records of our nationwide cyber awareness campaigns.",
    category: "Gallery",
    link: "/gallery/category/7",
    tags: ["campaigns", "awareness", "outreach", "nationwide"],
    iconName: "ShieldCheck"
  },
  {
    title: "Product Launches",
    description: "Celebrating our innovative software and product releases.",
    category: "Gallery",
    link: "/gallery/category/8",
    tags: ["products", "launches", "releases", "innovation"],
    iconName: "Bell"
  },
  {
    title: "Investigation Logs",
    description: "Visual records of our digital forensics and investigation work.",
    category: "Gallery",
    link: "/gallery/category/9",
    tags: ["investigation", "forensics", "logs", "work"],
    iconName: "Search"
  },
  {
    title: "R&D Innovations",
    description: "Highlights from our research and development laboratory.",
    category: "Gallery",
    link: "/gallery/category/10",
    tags: ["research", "development", "innovation", "lab"],
    iconName: "FlaskConical"
  },
  {
    title: "Internship Highlights",
    description: "Moments from our various internship programs and student work.",
    category: "Gallery",
    link: "/gallery/category/11",
    tags: ["internship", "highlights", "students", "learning"],
    iconName: "Briefcase"
  },
  {
    title: "UI/UX Design Gallery",
    description: "Showcasing our premium interface designs and user experiences.",
    category: "Gallery",
    link: "/gallery/category/12",
    tags: ["ui", "ux", "design", "creative", "prototypes"],
    iconName: "Palette"
  },
  {
    title: "Seminars & Webinars",
    description: "Visual records of our educational seminars and online webinars.",
    category: "Gallery",
    link: "/gallery/category/13",
    tags: ["seminars", "webinars", "online", "education"],
    iconName: "Presentation"
  },
  {
    title: "Course Gallery",
    description: "Highlights from our professional cybersecurity courses.",
    category: "Gallery",
    link: "/gallery/category/14",
    tags: ["course", "learning", "cybersecurity", "education"],
    iconName: "Presentation"
  },

  // --- INSIGHTS & ARTICLES ---
  {
    title: "UPI Fraud Protection",
    description: "Stay safe from digital payment scams in India.",
    category: "Insight",
    link: "/#insights",
    tags: ["upi", "fraud", "protection", "india", "scam"],
    iconName: "ShieldAlert"
  },
  {
    title: "Business Cybersecurity Practices",
    description: "Top 10 practices every business should follow.",
    category: "Insight",
    link: "/#insights",
    tags: ["business", "practices", "security", "expert"],
    iconName: "CheckCircle"
  },
  {
    title: "IT Act 2000 — Digital Rights",
    description: "Understand how to use the law to protect yourself.",
    category: "Insight",
    link: "/#insights",
    tags: ["legal", "law", "it act", "rights"],
    iconName: "Scale"
  },

  // --- CORE DOMAINS (What We Do) ---
  {
    title: "Cybersecurity Awareness",
    description: "Building digital safety knowledge across all levels.",
    category: "Domain",
    link: "/#whatwedo",
    tags: ["awareness", "safety", "training"],
    iconName: "Shield"
  },
  {
    title: "Digital Investigation",
    description: "Supporting forensic analysis and cybercrime methodologies.",
    category: "Domain",
    link: "/#whatwedo",
    tags: ["investigation", "forensics", "digital"],
    iconName: "Search"
  },
  {
    title: "IT Development",
    description: "Creating innovative software and modern infrastructure.",
    category: "Domain",
    link: "/#whatwedo",
    tags: ["it", "development", "infrastructure", "dev"],
    iconName: "Code"
  },
  {
    title: "Professional Training",
    description: "Empowering next-gen tech leaders with industry skills.",
    category: "Domain",
    link: "/#whatwedo",
    tags: ["training", "professional", "skills", "leadership"],
    iconName: "GraduationCap"
  },

  // --- TECHNOLOGY STACK (Common Tools) ---
  {
    title: "React",
    description: "Frontend library for building dynamic user interfaces.",
    category: "Technology",
    link: "/#techstack",
    tags: ["frontend", "web", "ui", "library", "react"],
    iconName: "Cpu"
  },
  {
    title: "Node.js",
    description: "JavaScript runtime for building scalable backend services.",
    category: "Technology",
    link: "/#techstack",
    tags: ["backend", "server", "js", "node"],
    iconName: "Server"
  },
  {
    title: "Python",
    description: "Powerful language for AI, Data Science, and Security.",
    category: "Technology",
    link: "/#techstack",
    tags: ["ai", "data", "scripting", "language", "python"],
    iconName: "Terminal"
  },
  {
    title: "Docker & Kubernetes",
    description: "Containerization and orchestration for modern DevOps.",
    category: "Technology",
    link: "/#techstack",
    tags: ["devops", "cloud", "containers", "docker", "k8s"],
    iconName: "Infinity"
  },
  {
    title: "MongoDB & SQL",
    description: "Database systems for secure and scalable data storage.",
    category: "Technology",
    link: "/#techstack",
    tags: ["database", "storage", "sql", "nosql", "data"],
    iconName: "Database"
  },
  {
    title: "Next.js",
    description: "React framework for production-grade web applications.",
    category: "Technology",
    link: "/#techstack",
    tags: ["framework", "ssr", "web", "next"],
    iconName: "Zap"
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for modern web design.",
    category: "Technology",
    link: "/#techstack",
    tags: ["styling", "css", "ui", "design"],
    iconName: "Layers"
  },
  {
    title: "Figma",
    description: "Collaborative design tool for UI/UX prototyping.",
    category: "Technology",
    link: "/#techstack",
    tags: ["design", "prototype", "ui", "ux", "figma"],
    iconName: "Layout"
  },
  {
    title: "AI frameworks (TensorFlow, PyTorch)",
    description: "Leading frameworks for deep learning and AI research.",
    category: "Technology",
    link: "/#techstack",
    tags: ["ai", "ml", "learning", "deep", "framework", "tensorflow", "pytorch"],
    iconName: "Brain"
  },

  // --- CORE PAGES ---
  {
    title: "Home",
    description: "Welcome to CR Cyber Crime Foundation official website.",
    category: "Page",
    link: "/",
    tags: ["main", "landing", "index", "home"],
    iconName: "Globe"
  },
  {
    title: "About Us",
    description: "Learn more about our mission, vision, and identity.",
    category: "Page",
    link: "/about",
    tags: ["mission", "vision", "who we are", "ngo"],
    iconName: "Users"
  },
  {
    title: "Gallery",
    description: "View photos and videos of our latest activities.",
    category: "Page",
    link: "/gallery",
    tags: ["photos", "videos", "media", "events"],
    iconName: "Monitor"
  },
  {
    title: "Careers",
    description: "Join our team and help build a safer digital world.",
    category: "Page",
    link: "/careers",
    tags: ["jobs", "career", "hiring", "opportunities"],
    iconName: "BriefcaseBusiness"
  },

  // --- RECRUITMENT & CAREERS ---
  {
    title: "Job Vacancy",
    description: "View current openings and job opportunities at CRCCF.",
    category: "Careers",
    link: "/recruitment/job-vacancy",
    tags: ["vacancy", "openings", "hiring", "jobs"],
    iconName: "SearchCode"
  },
  {
    title: "Online Application Portal",
    description: "Apply for jobs and internships through our digital portal.",
    category: "Careers",
    link: "/recruitment/online-application-portal",
    tags: ["apply", "portal", "application", "form"],
    iconName: "MousePointer2"
  },
  {
    title: "Check Application Status",
    description: "Track the status of your submitted job applications.",
    category: "Careers",
    link: "/recruitment/application-status",
    tags: ["status", "track", "check", "application"],
    iconName: "Clock"
  },
  {
    title: "Submit Resume",
    description: "Upload your CV to our talent database for future opportunities.",
    category: "Careers",
    link: "/recruitment/submit-resume",
    tags: ["cv", "resume", "upload", "talent"],
    iconName: "FileCheck"
  },
  {
    title: "Recruitment Rules & Policies",
    description: "Comprehensive guide to our employment standards and hiring ethics.",
    category: "Careers",
    link: "/recruitment/rules-policies",
    tags: ["rules", "policies", "standards", "ethics"],
    iconName: "BookOpen"
  },
  {
    title: "Employment Eligibility",
    description: "Criteria and requirements for joining the CRCCF team.",
    category: "Careers",
    link: "/recruitment/rules-policies/employment-eligibility-criteria",
    tags: ["eligibility", "criteria", "requirements", "qualification"],
    iconName: "UserCheck"
  },
  {
    title: "Selection Process",
    description: "Learn how we evaluate and select candidates for our roles.",
    category: "Careers",
    link: "/recruitment/rules-policies/recruitment-selection-process",
    tags: ["selection", "interview", "test", "evaluation"],
    iconName: "FileSearch"
  },
  {
    title: "Recruitment Calendar",
    description: "Important dates and timelines for upcoming hiring cycles.",
    category: "Careers",
    link: "/recruitment/rules-policies/recruitment-calendar",
    tags: ["calendar", "dates", "schedule", "timelines"],
    iconName: "Calendar"
  },
  {
    title: "Code of Conduct",
    description: "Professional ethics and behavioral standards for our employees.",
    category: "Careers",
    link: "/recruitment/rules-policies/code-of-conduct-professional-ethics",
    tags: ["ethics", "conduct", "behavior", "professionalism"],
    iconName: "Shield"
  },
  {
    title: "Employee Recognition",
    description: "Our system for celebrating and rewarding outstanding performance.",
    category: "Careers",
    link: "/recruitment/rules-policies/employee-recognition-awards",
    tags: ["awards", "recognition", "rewards", "performance"],
    iconName: "Trophy"
  },

  // --- REPORT CRIME PAGE ---
  ...reportCrimeSearchData,

  // --- WHY CHOOSE US (Features) ---
  {
    title: "Industry-Focused Cybersecurity",
    description: "Combining deep cybersecurity knowledge with real-world application.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["cybersecurity", "industry", "focused", "solutions"],
    iconName: "Shield"
  },
  {
    title: "Practical Learning",
    description: "Hands-on experience through live projects and case studies.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["learning", "practical", "hands-on", "projects"],
    iconName: "Laptop"
  },
  {
    title: "Research-Driven Approach",
    description: "Staying updated with evolving cyber trends through continuous research.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["research", "approach", "trends", "analysis"],
    iconName: "Brain"
  },
  {
    title: "Expert Mentorship",
    description: "Continuous support and industry insights from experienced mentors.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["mentorship", "expert", "support", "guidance"],
    iconName: "Users"
  },
  {
    title: "Multi-Domain Expertise",
    description: "Unified platform for security, investigation, development, and marketing.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["expertise", "domains", "unified", "platform"],
    iconName: "Globe2"
  },
  {
    title: "Focus on Security & Ethics",
    description: "Solutions built on ethical practices and strict security protocols.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["ethics", "security", "responsible", "protocols"],
    iconName: "Lock"
  },
  {
    title: "Career-Oriented Programs",
    description: "Bridging the gap between academic knowledge and industry demands.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["career", "programs", "academic", "industry"],
    iconName: "Rocket"
  },
  {
    title: "Proven Project Experience",
    description: "Reliable and massive scalability across national and international projects.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["proven", "experience", "reliability", "scale"],
    iconName: "TrendingUp"
  },
  {
    title: "Supportive Environment",
    description: "Collaborative ecosystem for continuous interaction and peer mentorship.",
    category: "Features",
    link: "/#whychooseus",
    tags: ["supportive", "environment", "collaboration", "peer"],
    iconName: "HandHeart"
  },
  {
    title: "Cyber Security Internship",
    description: "Practical exposure and training in cybersecurity.",
    category: "Program",
    link: "/#internship",
    tags: ["internship", "students", "security"],
    iconName: "GraduationCap"
  },
  {
    title: "Software Development Intern",
    description: "Build real-world apps and learn software engineering.",
    category: "Program",
    link: "/#internship",
    tags: ["coding", "dev", "internship", "it"],
    iconName: "Code"
  },
  {
    title: "Digital Marketing Intern",
    description: "Learn SEO, branding, and modern marketing strategies.",
    category: "Program",
    link: "/#internship",
    tags: ["marketing", "seo", "branding", "intern"],
    iconName: "TrendingUp"
  },

  // --- STATS & IMPACT ---
  {
    title: "Cyber Defenses",
    description: "Protecting systems with 500+ security protocols.",
    category: "Stat",
    link: "/#stats",
    tags: ["stats", "security", "numbers"],
    iconName: "ShieldAlert"
  },
  {
    title: "SaaS Products",
    description: "120+ software products delivered globally.",
    category: "Stat",
    link: "/#stats",
    tags: ["software", "products", "saas"],
    iconName: "Zap"
  },
  {
    title: "Secure Transactions",
    description: "Managing 25M+ secure digital transactions.",
    category: "Stat",
    link: "/#stats",
    tags: ["money", "finance", "security", "transactions"],
    iconName: "CheckCircle"
  }
];

export const iconMap = {
  Shield, 
  Search, 
  Code, 
  GraduationCap, 
  BookOpen, 
  Target, 
  Rocket, 
  Zap, 
  Monitor, 
  Globe, 
  Lock, 
  Cpu,
  BarChart,
  Users,
  Award,
  Clock,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Laptop,
  Megaphone,
  HandHeart,
  Scale,
  Handshake,
  BriefcaseBusiness,
  History,
  FileCheck,
  UserCheck,
  Calendar,
  Heart,
  Trophy,
  Activity,
  Lightbulb,
  Newspaper,
  Terminal,
  Database,
  Server,
  Cloud,
  FileSearch,
  CheckCircle,
  AlertCircle,
  Quote,
  TrendingUp,
  Brain,
  ShieldAlert,
  Smartphone,
  Eye,
  Settings,
  MessageSquare,
  Star,
  Layers,
  SearchCode,
  Layout,
  MousePointer2,
  PieChart,
  Globe2,
  HardDrive,
  Infinity: InfinityIcon,
  Fingerprint,
  FileLock,
  Network,
  Wrench,
  Info,
  Flag,
  AlertTriangle,
  Copyright,
  Sprout,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  ShieldCheck,
  BarChart3,
  FlaskConical,
  Palette,
  Presentation,
  Mic,
  Gavel,
  UserPlus,
  Video,
  Send,
  Edit3,
  ClipboardList,
  HelpCircle,
  FileSpreadsheet,
  LifeBuoy,
  Book
};
