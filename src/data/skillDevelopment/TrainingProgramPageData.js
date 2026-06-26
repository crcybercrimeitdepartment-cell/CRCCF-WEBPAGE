import { 
  FaShieldAlt, FaCode, FaChartBar, FaBrain, FaRobot, FaGlobe, FaMobileAlt, 
  FaApple, FaInfinity, FaBug, FaDatabase, FaCubes, FaPencilRuler, FaPalette,
  FaFileAlt, FaBullhorn, FaChartLine, FaBriefcase, FaBoxOpen, FaCalculator,
  FaUsers, FaNewspaper, FaRegFileAlt, FaUserSecret, FaSearch, FaNetworkWired,
  FaCloud, FaAmbulance, FaBiohazard, FaUnlockAlt, FaUserShield, FaSearchLocation,
  FaGavel, FaBalanceScale, FaBalanceScaleRight, FaPassport, FaHandsHelping,
  FaCrosshairs, FaSearchDollar, FaExclamationTriangle, FaHeadSideVirus, FaLaptopMedical
} from 'react-icons/fa';
import { SiApple } from 'react-icons/si';

export const heroData = {};
export const sectionsData = [];
export const cardsData = [];
export const timelineData = [];
export const faqData = [];
export const statsData = [];
export const testimonialsData = [];
export const countersData = [];
export const iconConfig = {};
export const imageConfig = {};

// Define the colors based on the image rows/categories
// Cyan: #00ffff, Blue: #0070ff, Green: #39ff14, Purple: #b026ff, Orange: #ff7300, Red: #ff0000, Pink: #ff00ff, Yellow: #fff200
export const trainingProgramData = [
  { id: 1, name: "Cybersecurity", icon: FaShieldAlt, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 2, name: "Software Development", icon: FaCode, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 3, name: "Data Analytics", icon: FaChartBar, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 4, name: "Data Science", icon: FaBrain, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 5, name: "Artificial Intelligence & Machine Learning", icon: FaRobot, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 6, name: "Web Development", icon: FaGlobe, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 7, name: "Mobile App Development", icon: FaMobileAlt, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 8, name: "iOS Development", icon: SiApple, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 9, name: "DevOps Engineering", icon: FaInfinity, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 10, name: "Software Testing & QA", icon: FaBug, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 11, name: "Database Administration (DBA)", icon: FaDatabase, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 12, name: "Blockchain Development", icon: FaCubes, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 13, name: "UI/UX Design", icon: FaPencilRuler, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" },
  { id: 14, name: "Graphic Design", icon: FaPalette, color: "text-[var(--color-crccf-neon-yellow)] border-[var(--color-crccf-neon-yellow)]" },
  { id: 15, name: "Content Writing", icon: FaFileAlt, color: "text-[var(--color-crccf-neon-purple)] border-[var(--color-crccf-neon-purple)]" },
  { id: 16, name: "Digital Marketing", icon: FaBullhorn, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" },
  { id: 17, name: "Marketing Management", icon: FaChartLine, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" },
  { id: 18, name: "Business Development", icon: FaBriefcase, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 19, name: "Product Management", icon: FaBoxOpen, color: "text-[var(--color-crccf-neon-purple)] border-[var(--color-crccf-neon-purple)]" },
  { id: 20, name: "Finance & Accounting", icon: FaCalculator, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 21, name: "Human Resources (HR)", icon: FaUsers, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 22, name: "Journalism & Media", icon: FaNewspaper, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 23, name: "Chartered Accountancy (CA)", icon: FaRegFileAlt, color: "text-[var(--color-crccf-neon-purple)] border-[var(--color-crccf-neon-purple)]" },
  { id: 24, name: "Ethical Hacking", icon: FaUserSecret, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 25, name: "Penetration Testing", icon: FaCrosshairs, color: "text-[var(--color-crccf-neon-red)] border-[var(--color-crccf-neon-red)]" },
  { id: 26, name: "SOC Analyst", icon: FaSearch, color: "text-[var(--color-crccf-neon-purple)] border-[var(--color-crccf-neon-purple)]" },
  { id: 27, name: "Network Security", icon: FaNetworkWired, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 28, name: "Cloud Security", icon: FaCloud, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 29, name: "Incident Response", icon: FaAmbulance, color: "text-[var(--color-crccf-neon-red)] border-[var(--color-crccf-neon-red)]" },
  { id: 30, name: "Threat Intelligence", icon: FaBiohazard, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 31, name: "Application Security (AppSec)", icon: FaUnlockAlt, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 32, name: "Malware Analysis", icon: FaBug, color: "text-[var(--color-crccf-neon-red)] border-[var(--color-crccf-neon-red)]" },
  { id: 33, name: "OSINT (Open Source Intelligence)", icon: FaSearchLocation, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 34, name: "Reverse Engineering", icon: FaCode, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" },
  { id: 35, name: "Cyber Forensics", icon: FaSearchDollar, color: "text-[var(--color-crccf-neon-purple)] border-[var(--color-crccf-neon-purple)]" },
  { id: 36, name: "Cyber Crime Investigation", icon: FaUserShield, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" },
  { id: 37, name: "Cybercrime Case Study", icon: FaRegFileAlt, color: "text-[var(--color-crccf-neon-red)] border-[var(--color-crccf-neon-red)]" },
  { id: 38, name: "Cyber Intelligence", icon: FaBrain, color: "text-[var(--color-crccf-neon-green)] border-[var(--color-crccf-neon-green)]" },
  { id: 39, name: "Digital Evidence Analysis", icon: FaLaptopMedical, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 40, name: "Cyber Risk Assessment", icon: FaExclamationTriangle, color: "text-[var(--color-crccf-neon-yellow)] border-[var(--color-crccf-neon-yellow)]" },
  { id: 41, name: "Cyber Psychology", icon: FaHeadSideVirus, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 42, name: "Cyber Law", icon: FaGavel, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 43, name: "Legal Research", icon: FaSearch, color: "text-[var(--color-crccf-neon-cyan)] border-[var(--color-crccf-neon-cyan)]" },
  { id: 44, name: "Corporate Law", icon: FaBriefcase, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 45, name: "Criminal Law", icon: FaBalanceScale, color: "text-[var(--color-crccf-neon-blue)] border-[var(--color-crccf-neon-blue)]" },
  { id: 46, name: "Digital Rights", icon: FaBalanceScaleRight, color: "text-[var(--color-crccf-neon-orange)] border-[var(--color-crccf-neon-orange)]" },
  { id: 47, name: "Legal Consulting", icon: FaHandsHelping, color: "text-[var(--color-crccf-neon-red)] border-[var(--color-crccf-neon-red)]" },
  { id: 48, name: "Cyber Threat Hunting", icon: FaCrosshairs, color: "text-[var(--color-crccf-neon-pink)] border-[var(--color-crccf-neon-pink)]" }
];

export const constants = {
  kbLayout: [
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PrintScreen', 'Pause'],
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight']
  ],
  weatherTemp: "34°C",
  weatherCondition: "Partly sunny",
  scrollAmount: 150
};

export const labels = {
  systemVersion: "CRCCF SYSTEM v2.0",
  mainTitle: "TRAINING PROGRAMS",
  searchPlaceholder: "SEARCH...",
  start: "Start",
  searchTaskbar: "Search...",
  language: "ENG",
  languageSub: "IN",
  battery: "100%",
  logo: "CRCCF"
};
