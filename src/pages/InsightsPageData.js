export const latestNews = [
  {
    id: 1,
    date: 'February 21, 2024',
    category: 'Security Awareness',
    title: 'How to Train Your Employees to Spot Advanced Phishing Campaigns',
    desc: 'Phishing attacks are becoming more sophisticated, leveraging AI to craft highly convincing emails. In this guide, we break down the key indicators of modern phishing attempts and outline a comprehensive training strategy to turn your workforce into a strong first line of defense.',
    readTime: '5 min read'
  },
  {
    id: 2,
    date: 'March 10, 2024',
    category: 'Threat Intelligence',
    title: 'The Rise of Ransomware-as-a-Service (RaaS) in 2024',
    desc: 'Ransomware is no longer just for elite hackers. The RaaS model has lowered the barrier to entry, allowing amateur cybercriminals to deploy devastating attacks. Learn how these syndicates operate and the critical security controls needed to protect your infrastructure.',
    readTime: '7 min read'
  },
  {
    id: 3,
    date: 'April 05, 2024',
    category: 'Zero Trust',
    title: 'Implementing Zero Trust Architecture: A Practical Roadmap',
    desc: 'Moving away from traditional perimeter-based security is essential for modern businesses. This article explores the core principles of Zero Trust—never trust, always verify—and provides a step-by-step roadmap for migrating your legacy systems to a Zero Trust model.',
    readTime: '10 min read'
  },
  {
    id: 4,
    date: 'May 12, 2024',
    category: 'Cloud Security',
    title: 'Securing Multi-Cloud Environments Against Misconfigurations',
    desc: 'As organizations adopt multi-cloud strategies, the risk of misconfigurations resulting in data breaches skyrockets. We analyze recent high-profile cloud leaks and share automated auditing techniques to ensure your AWS, Azure, and GCP environments remain secure.',
    readTime: '6 min read'
  }
];

export const videos = [
  {
    id: 1,
    name: 'PHISHING',
    title: 'ADVANCED PHISHING TACTICS',
    role: 'TUTORIAL',
    img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'
  },
  {
    id: 2,
    name: 'WARFARE',
    title: 'CYBER WARFARE IN 2024',
    role: 'DOCUMENTARY',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
  },
  {
    id: 3,
    name: 'ZERO TRUST',
    title: 'IMPLEMENTING ZERO TRUST',
    role: 'WEBINAR',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80'
  },
  {
    id: 4,
    name: 'CODING',
    title: 'SECURE CODING PRACTICES',
    role: 'COURSE',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  },
  {
    id: 5,
    name: 'MALWARE',
    title: 'MALWARE ANALYSIS',
    role: 'WORKSHOP',
    img: 'https://images.unsplash.com/photo-1614064641913-6b7140414df1?w=800&q=80'
  }
];

export const infographicsData = [
  { id: '01', title: 'AWARENESS', desc: 'Employee training and security culture.', start: 180, end: 225, color: '#48c9b0' },
  { id: '02', title: 'ANALYSIS', desc: 'Malware behavior and vulnerabilities.', start: 135, end: 180, color: '#3fa9f5' },
  { id: '03', title: 'DETECTION', desc: 'Advanced anomaly detection systems.', start: 90, end: 135, color: '#0b537e' },
  { id: '04', title: 'RESPONSE', desc: 'Incident response and threat mitigation.', start: 45, end: 90, color: '#941b38' },
  { id: '05', title: 'PREVENTION', desc: 'Proactive measures to stop attacks.', start: 0, end: 45, color: '#e84e5b' },
  { id: '06', title: 'COMPLIANCE', desc: 'Global regulatory and security audits.', start: -45, end: 0, color: '#f7941d' }
];

export const shapes = {
  1: `polygon(1% 4%, 12% 1%, 25% 5%, 38% 0%, 50% 4%, 62% 1%, 75% 6%, 88% 2%, 99% 5%, 100% 20%, 99% 40%, 100% 60%, 99% 80%, 100% 100%, 98% 96%, 85% 99%, 72% 95%, 60% 100%, 48% 96%, 35% 100%, 22% 95%, 10% 99%, 0% 96%, 1% 80%, 0% 60%, 1% 40%, 0% 20%, 1% 4%)`,
  2: `polygon(0% 0%, 100% 1%, 96% 12%, 99% 25%, 95% 38%, 100% 50%, 96% 62%, 99% 75%, 95% 88%, 100% 99%, 0% 100%, 4% 88%, 1% 75%, 5% 62%, 0% 50%, 4% 38%, 1% 25%, 5% 12%, 0% 0%)`,
  3: `polygon(2% 3%, 15% 1%, 28% 4%, 41% 0%, 55% 5%, 68% 1%, 82% 4%, 98% 2%, 97% 15%, 100% 28%, 96% 41%, 99% 55%, 96% 68%, 100% 82%, 98% 98%, 85% 96%, 72% 100%, 58% 96%, 45% 99%, 32% 95%, 18% 100%, 2% 97%, 1% 85%, 4% 72%, 0% 58%, 5% 45%, 1% 32%, 4% 18%, 2% 3%)`
};

export const paperPieces = [
  { id: 'p2', text: 'Cloud Security', top: '22%', left: '48%', z: 10, rot: '-3deg', scale: 1.1, bg: '#a69588', color: '#ffffff', font: 'font-hand', shape: 1 },
  { id: 'p3', text: 'Digital Privacy', top: '26%', left: '26%', z: 20, rot: '-8deg', scale: 1.1, bg: '#f2f2f2', color: '#222222', font: 'font-hand', shape: 1 },
  { id: 'p9', text: 'Ethical Hacking', top: '25%', left: '72%', z: 10, rot: '-2deg', scale: 1.1, bg: '#f3efe6', grid: true, color: '#222222', font: 'font-hand', shape: 1 },
  { id: 'p4', text: 'AI Security', top: '48%', left: '16%', z: 30, rot: '-10deg', scale: 1, bg: '#f4f7f0', color: '#222222', font: 'font-hand', shape: 2 },
  { id: 'p8', text: 'Phishing', top: '48%', left: '85%', z: 30, rot: '2deg', scale: 1, bg: '#cfa27c', color: '#ffffff', font: 'font-hand', shape: 2 },
  { id: 'p5', text: 'Cyber Forensics', top: '75%', left: '23%', z: 20, rot: '6deg', scale: 1.1, bg: '#b38b6d', color: '#ffffff', font: 'font-hand', shape: 3 },
  { id: 'p6', text: 'Data Protection', top: '82%', left: '50%', z: 40, rot: '-2deg', scale: 1.1, bg: '#f6f8f5', color: '#222222', font: 'font-hand', shape: 1 },
  { id: 'p7', text: 'Ransomware', top: '72%', left: '77%', z: 20, rot: '3deg', scale: 1.1, bg: '#ecdcd0', color: '#222222', font: 'font-hand', shape: 3 },
  { id: 'p1', text: 'Zero Trust', top: '50%', left: '50%', z: 50, rot: '-2deg', scale: 2.2, bg: '#dac7b3', color: '#1f1c19', font: 'font-marker', shape: 3 },
];

export const insights = [
  { id: 1, title: "Zero Trust Architecture: The New Standard", category: "Architecture", author: "Sarah Jenkins", date: "May 12, 2024" },
  { id: 2, title: "Preventing Phishing in a Remote World", category: "Awareness", author: "David Chen", date: "May 08, 2024" },
  { id: 3, title: "The Role of AI in Threat Detection", category: "AI & Machine Learning", author: "Elena Rodriguez", date: "April 28, 2024" },
  { id: 4, title: "Securing Your AWS Cloud Environment", category: "Cloud Security", author: "Michael Chang", date: "April 15, 2024" },
  { id: 5, title: "Understanding the Ransomware Kill Chain", category: "Threat Intel", author: "Robert Miles", date: "April 02, 2024" },
  { id: 6, title: "Building a Security-First Culture", category: "Leadership", author: "Sarah Jenkins", date: "March 25, 2024" },
  { id: 7, title: "Navigating Compliance: GDPR and CCPA", category: "Compliance", author: "Lisa Thompson", date: "March 10, 2024" },
  { id: 8, title: "Top 5 Vulnerabilities of 2024", category: "Vulnerability Management", author: "David Chen", date: "February 28, 2024" }
];
