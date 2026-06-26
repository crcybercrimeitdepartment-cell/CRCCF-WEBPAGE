export const heroData = {
    title: "Mentorship Programs",
    subtitle: "Get personalized guidance, industry-aligned roadmap curriculam, and accelerate your career growth with top-tier practitioners.",
    searchPlaceholder: "Search programs by name, skills (e.g. React, SQL, GDPR)..."
};

export const sectionsData = {
    housingBrand: "Mentorship Programs",
    emptyState: {
        title: "No Programs Found",
        description: "We couldn't find any mentorship programs matching your filters or search keywords. Try adjusting your query.",
        resetBtn: "Reset Filters"
    },
    programDetail: {
        title: "Coming Soon",
        description: "This program page is under development. Stay tuned!"
    },
    success: {
        title: "Application Received!",
        descriptionPart1: "Congratulations ",
        descriptionPart2: ", your request for the ",
        descriptionPart3: " has been securely logged. We have dispatched an email confirmation to ",
        descriptionPart4: ". An onboarding advisor will review your goals and reach out to organize your introductory call.",
        btnText: "Return to Dashboard"
    }
};

export const constants = {
    CARDS_PER_PAGE: 12
};

const iconConfig = {
  'cyber-career':             { icon: 'ShieldCheck',      color: '#6366f1', bg: '#eef2ff',   border: 'rgba(99,102,241,0.18)' },
  'ethical-hacking':          { icon: 'Terminal',         color: '#10b981', bg: '#ecfdf5',   border: 'rgba(16,185,129,0.18)' },
  'penetration-testing':      { icon: 'Crosshair',        color: '#ef4444', bg: '#fef2f2',   border: 'rgba(239,68,68,0.18)' },
  'soc-analyst':              { icon: 'Monitor',          color: '#3b82f6', bg: '#eff6ff',   border: 'rgba(59,130,246,0.18)' },
  'network-security':         { icon: 'Wifi',             color: '#f97316', bg: '#fff7ed',   border: 'rgba(249,115,22,0.18)' },
  'cloud-security':           { icon: 'Cloud',            color: '#0ea5e9', bg: '#f0f9ff',   border: 'rgba(14,165,233,0.18)' },
  'threat-intelligence':      { icon: 'Eye',              color: '#8b5cf6', bg: '#f5f3ff',   border: 'rgba(139,92,246,0.18)' },
  'cyber-forensics':          { icon: 'ScanLine',         color: '#0891b2', bg: '#ecfeff',   border: 'rgba(8,145,178,0.18)' },
  'cyber-crime-investigation':{ icon: 'Fingerprint',      color: '#d946ef', bg: '#fdf4ff',   border: 'rgba(217,70,239,0.18)' },
  'cyber-law':                { icon: 'Gavel',            color: '#7c3aed', bg: '#f5f3ff',   border: 'rgba(124,58,237,0.18)' },
  'data-analytics':           { icon: 'BarChart3',        color: '#2563eb', bg: '#eff6ff',   border: 'rgba(37,99,235,0.18)' },
  'data-science':             { icon: 'Database',         color: '#7c3aed', bg: '#f5f3ff',   border: 'rgba(124,58,237,0.18)' },
  'artificial-intelligence':  { icon: 'Cpu',              color: '#ec4899', bg: '#fdf2f8',   border: 'rgba(236,72,153,0.18)' },
  'machine-learning':         { icon: 'Binary',           color: '#0d9488', bg: '#f0fdfa',   border: 'rgba(13,148,136,0.18)' },
  'generative-ai':            { icon: 'Sparkles',         color: '#f59e0b', bg: '#fffbeb',   border: 'rgba(245,158,11,0.18)' },
  'prompt-engineering':       { icon: 'MessageSquareCode',color: '#6366f1', bg: '#eef2ff',   border: 'rgba(99,102,241,0.18)' },
  'business-analytics':       { icon: 'LineChart',        color: '#059669', bg: '#ecfdf5',   border: 'rgba(5,150,105,0.18)' },
  'deep-learning':            { icon: 'Layers',           color: '#dc2626', bg: '#fef2f2',   border: 'rgba(220,38,38,0.18)' },
  'software-dev':             { icon: 'Code2',            color: '#3b82f6', bg: '#eff6ff',   border: 'rgba(59,130,246,0.18)' },
  'fullstack-dev':            { icon: 'Blocks',           color: '#8b5cf6', bg: '#f5f3ff',   border: 'rgba(139,92,246,0.18)' },
  'web-dev':                  { icon: 'AppWindow',        color: '#06b6d4', bg: '#ecfeff',   border: 'rgba(6,182,212,0.18)' },
  'mobile-app-dev':           { icon: 'Smartphone',       color: '#10b981', bg: '#ecfdf5',   border: 'rgba(16,185,129,0.18)' },
  'ios-dev':                  { icon: 'Layout',           color: '#6366f1', bg: '#eef2ff',   border: 'rgba(99,102,241,0.18)' },
  'devops':                   { icon: 'InfinityIcon',     color: '#f97316', bg: '#fff7ed',   border: 'rgba(249,115,22,0.18)' },
  'software-testing':         { icon: 'CheckSquare',      color: '#16a34a', bg: '#f0fdf4',   border: 'rgba(22,163,74,0.18)' },
  'database-administration':  { icon: 'Server',           color: '#0891b2', bg: '#ecfeff',   border: 'rgba(8,145,178,0.18)' },
  'blockchain-development':   { icon: 'Link',             color: '#d946ef', bg: '#fdf4ff',   border: 'rgba(217,70,239,0.18)' },
  'uiux-design':              { icon: 'Palette',          color: '#ec4899', bg: '#fdf2f8',   border: 'rgba(236,72,153,0.18)' },
  'graphic-design':           { icon: 'Image',            color: '#f59e0b', bg: '#fffbeb',   border: 'rgba(245,158,11,0.18)' },
  'product-design':           { icon: 'Box',              color: '#8b5cf6', bg: '#f5f3ff',   border: 'rgba(139,92,246,0.18)' },
  'content-writing':          { icon: 'Pen',              color: '#0d9488', bg: '#f0fdfa',   border: 'rgba(13,148,136,0.18)' },
  'digital-marketing':        { icon: 'Megaphone',        color: '#ef4444', bg: '#fef2f2',   border: 'rgba(239,68,68,0.18)' },
  'seo-mentorship':           { icon: 'Search',           color: '#2563eb', bg: '#eff6ff',   border: 'rgba(37,99,235,0.18)' },
  'social-media-marketing':   { icon: 'Share2',           color: '#ec4899', bg: '#fdf2f8',   border: 'rgba(236,72,153,0.18)' },
  'product-management':       { icon: 'ClipboardList',    color: '#7c3aed', bg: '#f5f3ff',   border: 'rgba(124,58,237,0.18)' },
  'business-development':     { icon: 'Handshake',        color: '#0d9488', bg: '#f0fdfa',   border: 'rgba(13,148,136,0.18)' },
  'entrepreneurship':         { icon: 'Rocket',           color: '#f97316', bg: '#fff7ed',   border: 'rgba(249,115,22,0.18)' },
  'startup-growth':           { icon: 'TrendingUp',       color: '#10b981', bg: '#ecfdf5',   border: 'rgba(16,185,129,0.18)' },
  'brand-management':         { icon: 'Award',            color: '#eab308', bg: '#fefce8',   border: 'rgba(234,179,8,0.18)' },
  'finance-accounting':       { icon: 'Calculator',       color: '#059669', bg: '#ecfdf5',   border: 'rgba(5,150,105,0.18)' },
  'financial-analysis':       { icon: 'PieChart',         color: '#2563eb', bg: '#eff6ff',   border: 'rgba(37,99,235,0.18)' },
  'chartered-accountancy':    { icon: 'Landmark',         color: '#7c3aed', bg: '#f5f3ff',   border: 'rgba(124,58,237,0.18)' },
  'human-resources':          { icon: 'UserCheck',        color: '#0ea5e9', bg: '#f0f9ff',   border: 'rgba(14,165,233,0.18)' },
  'journalism-media':         { icon: 'Newspaper',        color: '#dc2626', bg: '#fef2f2',   border: 'rgba(220,38,38,0.18)' },
  'professional-communication':{ icon: 'Mic',             color: '#6366f1', bg: '#eef2ff',   border: 'rgba(99,102,241,0.18)' },
  'legal-research':           { icon: 'ScrollText',       color: '#0891b2', bg: '#ecfeff',   border: 'rgba(8,145,178,0.18)' },
  'corporate-law':            { icon: 'Scale',            color: '#7c3aed', bg: '#f5f3ff',   border: 'rgba(124,58,237,0.18)' },
  'criminal-law':             { icon: 'Gavel',            color: '#dc2626', bg: '#fef2f2',   border: 'rgba(220,38,38,0.18)' }
};

export const mentorshipProgramsData = [
  // --- Cybersecurity & Law (10) ---
  {
    id: "cyber-career",
    title: "Cybersecurity Career Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Launch your career in cybersecurity. Learn foundation concepts, security frameworks, and career pathways under industry veterans.",
    skills: ["Security+ Prep", "Threat Landscape", "Risk Assessment"]
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Learn to think like a hacker. Understand footprinting, scanning, system hacking, and web app vulnerabilities safely.",
    skills: ["Kali Linux", "Nmap", "Metasploit"]
  },
  {
    id: "penetration-testing",
    title: "Penetration Testing Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Deep dive into network and system penetration testing. Conduct red team exercises and craft professional grade test reports.",
    skills: ["Red Teaming", "Active Directory Hacking", "Exploit Dev"]
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Become a Security Operations Center analyst. Master SIEM tools, event triage, incident response, and log analysis.",
    skills: ["SIEM (Splunk)", "Wireshark", "Incident Triage"]
  },
  {
    id: "network-security",
    title: "Network Security Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Protect enterprise network infrastructures. Configure firewalls, IDS/IPS, secure VPNs, and segment networks.",
    skills: ["Firewalls", "VPNs", "IDS/IPS configuration"]
  },
  {
    id: "cloud-security",
    title: "Cloud Security Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Secure AWS, Azure, and GCP workloads. Master IAM policies, container security, secrets management, and compliance.",
    skills: ["AWS/Azure IAM", "Kubernetes Security", "DevSecOps"]
  },
  {
    id: "threat-intelligence",
    title: "Threat Intelligence Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Collect, analyze, and apply cyber threat intelligence. Master MITRE ATT&CK, threat modeling, and IOC identification.",
    skills: ["MITRE ATT&CK", "Threat Modeling", "IOC Analysis"]
  },
  {
    id: "cyber-forensics",
    title: "Cyber Forensics Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Learn digital forensics. Analyze disk images, memory dumps, registry files, and follow strict chain of custody.",
    skills: ["Autopsy", "FTK Imager", "Memory Forensics"]
  },
  {
    id: "cyber-crime-investigation",
    title: "Cyber Crime Investigation Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Investigate online crimes, fraud, and cyber threats. Understand OSINT, email tracking, and cryptocurrency forensics.",
    skills: ["OSINT", "Email Tracing", "Crypto Forensics"]
  },
  {
    id: "cyber-law",
    title: "Cyber Law Mentorship Program",
    category: "Cybersecurity & Law",
    description: "Understand legal issues in tech: GDPR, CCPA, IT Acts, intellectual property, and compliance frameworks.",
    skills: ["GDPR/CCPA Compliance", "IT Act Frameworks", "IP Law in Tech"]
  },

  // --- Data Science & AI (8) ---
  {
    id: "data-analytics",
    title: "Data Analytics Mentorship Program",
    category: "Data Science & AI",
    description: "Learn to clean, analyze, and visualize data. Master Excel, SQL, Tableau/PowerBI, and basic python statistics.",
    skills: ["SQL", "Tableau/Power BI", "Python (Pandas)"]
  },
  {
    id: "data-science",
    title: "Data Science Mentorship Program",
    category: "Data Science & AI",
    description: "Build predictive models. Learn statistical analysis, machine learning algorithms, and Python libraries.",
    skills: ["Scikit-Learn", "Feature Engineering", "Data Modeling"]
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence (AI) Mentorship Program",
    category: "Data Science & AI",
    description: "Explore artificial intelligence agents, search algorithms, expert systems, neural networks, and computer vision.",
    skills: ["TensorFlow", "Computer Vision", "AI Agent Design"]
  },
  {
    id: "machine-learning",
    title: "Machine Learning Mentorship Program",
    category: "Data Science & AI",
    description: "Learn foundational algorithms: Decision Trees, SVMs, Ensemble Methods, and ML lifecycle management.",
    skills: ["ML Lifecycle", "XGBoost", "Hyperparameter Tuning"]
  },
  {
    id: "generative-ai",
    title: "Generative AI Mentorship Program",
    category: "Data Science & AI",
    description: "Master Large Language Models (LLMs), RAG systems, vector databases, LangChain, and agents.",
    skills: ["LangChain", "Vector DBs (Pinecone)", "LlamaIndex"]
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Mentorship Program",
    category: "Data Science & AI",
    description: "Get maximum performance from LLMs. Master Few-Shot, CoT, ReAct prompting techniques, and prompt testing.",
    skills: ["Few-Shot Prompting", "Chain-of-Thought", "Prompt Auditing"]
  },
  {
    id: "business-analytics",
    title: "Business Analytics Mentorship Program",
    category: "Data Science & AI",
    description: "Bridge business strategy and data science. Learn predictive forecasting, operations analytics, and reporting.",
    skills: ["Predictive Analytics", "Tableau", "Operations Analysis"]
  },
  {
    id: "deep-learning",
    title: "Deep Learning Mentorship Program",
    category: "Data Science & AI",
    description: "Build state-of-the-art Deep Neural Networks. Master PyTorch, CNNs, RNNs, and Transformers.",
    skills: ["PyTorch", "Transformers", "Model Optimization"]
  },

  // --- Software Development (9) ---
  {
    id: "software-dev",
    title: "Software Development Mentorship Program",
    category: "Software Development",
    description: "Learn Software Engineering fundamentals: Git, OOPs, clean code principles, data structures, and algorithms.",
    skills: ["Git & GitHub", "Object-Oriented Programming", "Algorithms"]
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Development Mentorship Program",
    category: "Software Development",
    description: "Master both frontend and backend. Build scalable applications with React, Node.js, Express, and databases.",
    skills: ["React & Node.js", "REST APIs", "SQL & NoSQL"]
  },
  {
    id: "web-dev",
    title: "Web Development Mentorship Program",
    category: "Software Development",
    description: "Learn the core trio: HTML5, CSS3, and modern JavaScript. Create responsive, beautiful layouts from scratch.",
    skills: ["HTML5 & CSS3", "Modern JavaScript", "Responsive Web Design"]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile App Development Mentorship Program",
    category: "Software Development",
    description: "Build cross-platform mobile apps for Android and iOS using React Native or Flutter. Master native bridges.",
    skills: ["React Native / Flutter", "Mobile UX", "App Store Deploy"]
  },
  {
    id: "ios-dev",
    title: "iOS Development Mentorship Program",
    category: "Software Development",
    description: "Build native iOS apps using Swift and SwiftUI. Master Apple guidelines, design patterns, and CoreData.",
    skills: ["Swift & SwiftUI", "Apple HIG", "CoreData / SwiftData"]
  },
  {
    id: "devops",
    title: "DevOps Mentorship Program",
    category: "Software Development",
    description: "Automate build and deployment pipelines. Master Docker, Kubernetes, CI/CD with GitHub Actions, and Terraform.",
    skills: ["Docker & Kubernetes", "GitHub Actions CI/CD", "Terraform (IaC)"]
  },
  {
    id: "software-testing",
    title: "Software Testing & QA Mentorship Program",
    category: "Software Development",
    description: "Learn manual testing, writing test cases, and test automation. Master Selenium, Jest, and Cypress.",
    skills: ["Cypress / Selenium", "Test Planning & Strategy", "API Testing"]
  },
  {
    id: "database-administration",
    title: "Database Administration (DBA) Mentorship Program",
    category: "Software Development",
    description: "Manage and optimize database systems. Master indexing, replication, backups, and query tuning in PostgreSQL & MySQL.",
    skills: ["PostgreSQL", "Query Optimization", "Backup & Recovery"]
  },
  {
    id: "blockchain-development",
    title: "Blockchain Development Mentorship Program",
    category: "Software Development",
    description: "Build decentralized applications. Learn Ethereum, smart contracts, Solidity, Web3.js, and consensus mechanisms.",
    skills: ["Solidity & Ethereum", "Web3.js / Ethers.js", "Smart Contract Audits"]
  },

  // --- Design & Creative (4) ---
  {
    id: "uiux-design",
    title: "UI/UX Design Mentorship Program",
    category: "Design & Creative",
    description: "Master user research, wireframing, high-fidelity UI design, and prototyping using Figma.",
    skills: ["Figma", "User Research", "Interactive Prototyping"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design Mentorship Program",
    category: "Design & Creative",
    description: "Learn color theory, typography, and visual branding. Master Adobe Photoshop, Illustrator, and InDesign.",
    skills: ["Photoshop & Illustrator", "Visual Branding", "Typography"]
  },
  {
    id: "product-design",
    title: "Product Design Mentorship Program",
    category: "Design & Creative",
    description: "Design end-to-end digital products. Build user flow diagrams, mockups, design systems, and validation tests.",
    skills: ["Design Systems", "User Testing", "Product Strategy"]
  },
  {
    id: "content-writing",
    title: "Content Writing Mentorship Program",
    category: "Design & Creative",
    description: "Master copywriting, SEO blogging, technical writing, and content marketing strategy.",
    skills: ["SEO Writing", "Copywriting", "Content Strategy"]
  },

  // --- Business & Management (8) ---
  {
    id: "digital-marketing",
    title: "Digital Marketing Mentorship Program",
    category: "Business & Management",
    description: "Master advertising across search, social media, and email campaigns. Understand budget optimization.",
    skills: ["Google Ads", "Paid Search / Paid Social", "Marketing Metrics"]
  },
  {
    id: "seo-mentorship",
    title: "SEO Mentorship Program",
    category: "Business & Management",
    description: "Optimize websites to rank #1. Master technical SEO, on-page optimization, link building, and Google Analytics.",
    skills: ["Technical SEO", "Link Building", "Google Analytics 4"]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing Mentorship Program",
    category: "Business & Management",
    description: "Build viral presence. Learn content calendar creation, video strategy (Reels/TikTok), and community management.",
    skills: ["Content Creation", "Video Marketing", "Community Building"]
  },
  {
    id: "product-management",
    title: "Product Management Mentorship Program",
    category: "Business & Management",
    description: "Own the product roadmap. Learn backlog grooming, user story writing, agile processes, and stakeholders management.",
    skills: ["Agile/Scrum", "PRD Writing", "Product Roadmap"]
  },
  {
    id: "business-development",
    title: "Business Development Mentorship Program",
    category: "Business & Management",
    description: "Master B2B sales pipelines, outbound prospecting, negotiating deals, and strategic partnerships.",
    skills: ["Cold Outreach", "B2B Sales Pipe", "Negotiation Strategy"]
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Mentorship Program",
    category: "Business & Management",
    description: "Learn to build a business. From market validation and incorporation to business modeling and operations.",
    skills: ["Lean Startup Canvas", "Product-Market Fit", "Operations"]
  },
  {
    id: "startup-growth",
    title: "Startup Growth Mentorship Program",
    category: "Business & Management",
    description: "Accelerate startup scaling. Learn viral loops, referral loops, unit economics, and venture fundraising models.",
    skills: ["Growth Hacking", "Unit Economics", "Fundraising pitch"]
  },
  {
    id: "brand-management",
    title: "Brand Management Mentorship Program",
    category: "Business & Management",
    description: "Define corporate brand guidelines, positioning vectors, messaging frameworks, and sentiment analysis.",
    skills: ["Brand Positioning", "Sentiment Tracking", "PR Management"]
  },

  // --- Finance & HR (4) ---
  {
    id: "finance-accounting",
    title: "Finance & Accounting Mentorship Program",
    category: "Finance & HR",
    description: "Understand financial sheets. Learn double-entry bookkeeping, corporate journals, ledger management, and taxation.",
    skills: ["Bookkeeping", "Corporate Taxation", "QuickBooks / Tally"]
  },
  {
    id: "financial-analysis",
    title: "Financial Analysis Mentorship Program",
    category: "Finance & HR",
    description: "Model business valuations. Master DCF modeling, ratios analysis, forecasting, and investment thesis compilation.",
    skills: ["Valuation (DCF)", "Financial Modeling", "Ratios Analysis"]
  },
  {
    id: "chartered-accountancy",
    title: "Chartered Accountancy Mentorship Program",
    category: "Finance & HR",
    description: "Crack the CA exams. Targeted exam mentoring, mock evaluation, taxation laws, and audit case simulations.",
    skills: ["Auditing Standards", "Corporate Law Prep", "Tax Audits"]
  },
  {
    id: "human-resources",
    title: "Human Resources Mentorship Program",
    category: "Finance & HR",
    description: "Become a modern HR. Learn recruitment strategies, onboarding pipelines, performance reviews, and labor relations.",
    skills: ["ATS Management", "Employee Relations", "Compensation Plans"]
  },

  // --- Law & Media (5) ---
  {
    id: "journalism-media",
    title: "Journalism & Media Mentorship Program",
    category: "Law & Media",
    description: "Learn broadcast journalism, copy editing, news reporting, mobile filmmaking, and digital publishing ethics.",
    skills: ["News Reporting", "Broadcast Copywriting", "Ethics in Media"]
  },
  {
    id: "professional-communication",
    title: "Professional Communication Mentorship",
    category: "Law & Media",
    description: "Master executive presentations, corporate emailing, conflict resolution, active listening, and public speaking.",
    skills: ["Public Speaking", "Executive Presence", "Conflict Resolution"]
  },
  {
    id: "legal-research",
    title: "Legal Research Mentorship Program",
    category: "Law & Media",
    description: "Conduct professional legal citations. Search databases (Westlaw/LexisNexis), compile briefs, and draft arguments.",
    skills: ["LexisNexis / Westlaw", "Bluebook Citation", "Legal Drafting"]
  },
  {
    id: "corporate-law",
    title: "Corporate Law Mentorship Program",
    category: "Law & Media",
    description: "Understand mergers & acquisitions, shareholder agreements, corporate restructuring, and compliance.",
    skills: ["M&A Due Diligence", "Shareholder Contracts", "IPOs & SEC Rules"]
  },
  {
    id: "criminal-law",
    title: "Criminal Law Mentorship Program",
    category: "Law & Media",
    description: "Analyze criminal defense procedures, trial strategy, evidence rules, witness examinations, and appellate filings.",
    skills: ["Trial Strategy", "Rules of Evidence", "Appellate Drafting"]
  }
];

export const contentData = {
    iconConfig
};
