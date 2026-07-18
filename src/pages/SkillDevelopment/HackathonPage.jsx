import { useState, useMemo, useRef, useCallback, useEffect, createElement } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Shield, Bug, Crosshair, Network, Cloud, Radio, Eye, FileSearch,
    Search, Gavel, Skull, Target, Brain, Cpu, Zap, Sparkles,
    BarChart3, LineChart, Activity, Atom, Code, Layers, Globe,
    Smartphone, Apple, GitBranch, Link, Database, Server, Plug,
    Palette, PenTool, Brush, Lightbulb, Megaphone, Rocket, FileText,
    Award, Briefcase, Clipboard, Handshake, DollarSign, Scale,
    FileSignature, ShieldCheck, Building2, Leaf, CircuitBoard, ArrowRight,
    Compass, MessageSquare, Users, TrendingUp,
    ChevronLeft, ChevronRight, ArrowLeft,
    Clock, BookOpen, CheckCircle, User, Mail
} from 'lucide-react';
import {
    heroData,
    hackathonData,
    labels,
    constants,
    contentData
} from '../../data/skillDevelopment/HackathonPageData';
import ComingSoonPage from '../common/ComingSoonPage';

const { iconConfig } = contentData;

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}



const LucideIcons = {
    Shield, Bug, Crosshair, Network, Cloud, Radio, Eye, FileSearch,
    Search, Gavel, Skull, Target, Brain, Cpu, Zap, Sparkles,
    BarChart3, LineChart, Activity, Atom, Code, Layers, Globe,
    Smartphone, Apple, GitBranch, Link, Database, Server, Plug,
    Palette, PenTool, Brush, Lightbulb, Megaphone, Rocket, FileText,
    Award, Briefcase, Clipboard, Handshake, DollarSign, Scale,
    FileSignature, ShieldCheck, Building2, Leaf, CircuitBoard, ArrowRight,
    Compass, MessageSquare, Users, TrendingUp,
    ChevronLeft, ChevronRight, ArrowLeft,
    Clock, BookOpen, CheckCircle, User, Mail
};

function getProgramIconInfo(program) {
    const mapped = iconConfig[program.id];
    if (mapped) return LucideIcons[mapped.icon];
    return Target;
}

function Card({ program, index = 0, onLearnMore }) {
    const iconRef = getProgramIconInfo(program);
    const mapped = iconConfig[program.id];
    const iconColor = mapped ? mapped.color : '#6366f1';
    const bgColor = iconColor + '12';
    const borderColor = iconColor + '25';

    return (
        <motion.div 
            className="new-program-card" 
            layout 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: index * 0.08 } }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            whileHover={{ y: -8, transition: { duration: 0.2, delay: 0 } }} 
            onClick={() => onLearnMore(program)}
        >
            <div className="new-program-icon-wrapper" style={{ color: iconColor, backgroundColor: bgColor, border: `1px solid ${borderColor}` }}>
                {createElement(iconRef, { size: 24, strokeWidth: 2.2 })}
            </div>
            <div className="new-program-details">
                <h4 className="new-program-title">{program.title}</h4>
                <span className="new-program-know-more" style={{ color: iconColor }}>
                    {labels.knowMore} <ArrowRight size={14} className="know-more-arrow" />
                </span>
            </div>
        </motion.div>
    );
}




function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    return (
        <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-[#eff6ff] border border-[#bfdbfe] text-[#3b82f6] p-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3b82f6] hover:text-white hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Previous Page">
                <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
                {pageNumbers.map((num) => (
                    <button key={num} onClick={() => onPageChange(num)} className={`min-w-[40px] h-10 rounded-xl font-['Inter',sans-serif] text-sm font-bold cursor-pointer flex items-center justify-center transition-all duration-200 border ${currentPage === num ? 'bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] border-transparent text-white shadow-[0_4px_10px_rgba(59,130,246,0.35)]' : 'bg-[#eff6ff] border-[#bfdbfe] text-[#3b82f6] hover:border-[#3b82f6] hover:bg-[#dbeafe]'}`}>
                        {num}
                    </button>
                ))}
            </div>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-[#eff6ff] border border-[#bfdbfe] text-[#3b82f6] p-2.5 rounded-xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#3b82f6] hover:text-white hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Next Page">
                <ChevronRight size={18} />
            </button>
        </div>
    );
}



function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const pageKey = location.key;
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(() => {
    const saved = sessionStorage.getItem(`pageState_${pageKey}`);
    return saved ? parseInt(saved, 10) : 1;
  });
  useEffect(() => {
    sessionStorage.setItem(`pageState_${pageKey}`, currentPage);
  }, [currentPage, pageKey]);
    const mousepadRef = useRef(null);
    const mouseRef = useRef(null);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);
    const CARDS_PER_PAGE = constants.CARDS_PER_PAGE;

    const filteredPrograms = useMemo(() => {
        if (!searchQuery.trim()) return hackathonData;
        const q = searchQuery.toLowerCase();
        return hackathonData.filter((program) =>
            program.title.toLowerCase().includes(q) || program.description.toLowerCase().includes(q) || program.skills.some(skill => skill.toLowerCase().includes(q))
        );
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredPrograms.length / CARDS_PER_PAGE);
    const displayedPrograms = useMemo(() => {
        const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
        return filteredPrograms.slice(startIdx, startIdx + CARDS_PER_PAGE);
    }, [filteredPrograms, currentPage, CARDS_PER_PAGE]);

    const handleExploreProgram = useCallback((program) => {
        const isMobile = window.innerWidth <= 1100;
        setTimeout(() => { navigate(`program/${program.id}`); }, isMobile ? 600 : 0);
    }, [navigate]);

    useEffect(() => {
        const container = mousepadRef.current;
        const mouse = mouseRef.current;
        if (!container || !mouse) return;
        const rect = container.getBoundingClientRect();
        const startX = Math.max(0, rect.width / 2 - 27);
        const startY = Math.max(0, rect.height / 2 - 39);
        currentPos.current = { x: startX, y: startY };
        targetPos.current = { x: startX, y: startY };
        mouse.style.left = `${startX}px`;
        mouse.style.top = `${startY}px`;
        mouse.style.opacity = '0';

        const onMove = (e) => { const r = container.getBoundingClientRect(); targetPos.current = { x: e.clientX - r.left - 27, y: e.clientY - r.top - 39 }; };
        const onEnter = () => { mouse.style.opacity = '1'; };
        const onLeave = () => { mouse.style.opacity = '0'; };
        const onScroll = () => {
            if (window.innerWidth <= 1100) {
                mouse.style.opacity = '1';
                const r = container.getBoundingClientRect();
                const scrollProgress = -r.top / (r.height - window.innerHeight);
                const clampedY = Math.max(0, Math.min(1, scrollProgress));
                targetPos.current.y = clampedY * (r.height - 90);
                targetPos.current.x = startX;
            }
        };
        const animate = () => {
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.45;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.45;
            mouse.style.left = `${currentPos.current.x}px`;
            mouse.style.top = `${currentPos.current.y}px`;
            rafId.current = requestAnimationFrame(animate);
        };
        const onMouseDown = (e) => {
            if (e.button === 0) { const btn = document.getElementById('mouse-left-btn'); if (btn) btn.classList.add('pressed'); }
            if (e.button === 2) { e.preventDefault(); const btn = document.getElementById('mouse-right-btn'); if (btn) btn.classList.add('pressed'); }
        };
        const onMouseUp = (e) => {
            if (e.button === 0) { const btn = document.getElementById('mouse-left-btn'); if (btn) btn.classList.remove('pressed'); }
            if (e.button === 2) { const btn = document.getElementById('mouse-right-btn'); if (btn) btn.classList.remove('pressed'); }
        };
        const onContextMenu = (e) => e.preventDefault();

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);
        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('contextmenu', onContextMenu);
        window.addEventListener('scroll', onScroll, { passive: true });
        rafId.current = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mouseleave', onLeave);
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('contextmenu', onContextMenu);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId.current);
        };
    }, [displayedPrograms]);

    return (
        <main className="main-content">
            <header className="hero-banner">
                <h1>{heroData.title}</h1>
                <p className="hero-subtitle">{heroData.subtitle}</p>
                <div className="search-container">
                    <div className="search-bar-wrapper">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder={heroData.searchPlaceholder} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} aria-label="Search programs" />
                        {searchQuery && (<button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} className="clear-search-btn" aria-label="Clear search">Clear</button>)}
                    </div>
                </div>
            </header>
            <section className="catalog-section">
                {displayedPrograms.length > 0 ? (
                    <>
                        <div className="mousepad-container" ref={mousepadRef}>
                            <div className="mousepad-accent-tl"><div className="accent-dots"><span className="accent-dot"></span><span className="accent-dot"></span><span className="accent-dot"></span></div></div>
                            <div className="mousepad-accent-br"></div>
                            <div className="mousepad-circuits-tr">
                                <svg className="circuit-svg" viewBox="0 0 150 100">
                                    <path d="M 120,20 L 50,20 L 30,40" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                                    <circle cx="30" cy="40" r="3" fill="rgba(99, 102, 241, 0.6)" />
                                    <path d="M 140,50 L 90,50 L 70,70 L 40,70" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                                    <circle cx="40" cy="70" r="3" fill="rgba(99, 102, 241, 0.6)" />
                                </svg>
                                <div className="dot-grid">{Array.from({ length: 15 }).map((_, i) => (<span key={i} className="dot-node"></span>))}</div>
                            </div>
                            <div className="mousepad-circuits-bl">
                                <svg className="circuit-svg" viewBox="0 0 150 120">
                                    <path d="M 20,100 L 80,100 L 100,80" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                                    <circle cx="100" cy="80" r="3" fill="rgba(99, 102, 241, 0.6)" />
                                    <path d="M 10,70 L 50,70 L 70,50 L 110,50" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                                    <circle cx="110" cy="50" r="3" fill="rgba(99, 102, 241, 0.6)" />
                                </svg>
                                <div className="dot-grid">{Array.from({ length: 15 }).map((_, i) => (<span key={i} className="dot-node"></span>))}</div>
                            </div>
                            <div className="mousepad-3d-mouse" ref={mouseRef}>
                                <div className="mouse-body">
                                    <div className="mouse-buttons">
                                        <div className="mouse-btn-left" id="mouse-left-btn"></div>
                                        <div className="mouse-btn-right" id="mouse-right-btn"></div>
                                    </div>
                                    <div className="mouse-wheel-line"></div>
                                    <div className="mouse-wheel"></div>
                                </div>
                            </div>
                            <div className="mousepad-grid-wrapper">
                                <div className="cards-grid" key={currentPage + '-' + searchQuery}>
                                    {displayedPrograms.map((program, index) => (<Card key={program.id} program={program} index={index} onLearnMore={handleExploreProgram} />))}
                                </div>
                            </div>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page); }} />
                    </>
                ) : (
                    <div className="empty-state">
                        <h3>{labels.noProgramsFound}</h3>
                        <p>{labels.noProgramsSub}</p>
                        <button className="reset-filters-btn" onClick={() => setSearchQuery('')}>{labels.clearSearch}</button>
                    </div>
                )}
            </section>
        </main>
    );
}

function ProgramDetail() {
    return <ComingSoonPage />;
}

const styles = `
/* ==========================================
   CSS VARIABLES & THEME SYSTEM
   Custom properties for light/dark themes.
   ========================================== */
.hackathon-app-container {
  /* Light Theme Variables */
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --border-hover: #cbd5e1;
  --text-main: #475569;
  --text-heading: #0f172a;
  --text-muted: #94a3b8;
  --text-secondary: #64748b;

  --accent-color: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-blue: #3b82f6;
  --accent-badge: #dbeafe;
  --accent-glow: rgba(37, 99, 235, 0.12);
  --accent-gradient: linear-gradient(90deg, #2563eb, #1d4ed8);
  --navbar-bg: #0f2b5b;

  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --card-hover-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.12), 0 10px 10px -5px rgba(37, 99, 235, 0.04);
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(226, 232, 240, 0.8);
  --glass-blur: blur(12px);

  --font-heading: 'Outfit', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.hackathon-app-container.dark-theme {
  /* Dark Theme Overrides aligned with blue/slate palette */
  --bg-primary: #080c16;
  --bg-secondary: #0e1325;
  --bg-tertiary: #161c33;
  --border-color: #1e2544;
  --border-hover: #2d3663;
  --text-main: #94a3b8;
  --text-heading: #f8fafc;
  --text-muted: #64748b;
  --text-secondary: #94a3b8;

  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --accent-blue: #3b82f6;
  --accent-badge: #1e2544;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --accent-gradient: linear-gradient(90deg, #3b82f6, #2563eb);
  --navbar-bg: #0b1329;

  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --card-hover-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.18), 0 10px 10px -5px rgba(59, 130, 246, 0.06);
  --glass-bg: rgba(14, 19, 37, 0.8);
  --glass-border: rgba(30, 37, 68, 0.8);
  --glass-blur: blur(16px);
}

:where(.hackathon-app-container) *, :where(.hackathon-app-container) *::before, :where(.hackathon-app-container) *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hackathon-app-container {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-main);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

:where(.hackathon-app-container) h1,
:where(.hackathon-app-container) h2,
:where(.hackathon-app-container) h3,
:where(.hackathon-app-container) h4 {
  font-family: var(--font-heading);
  color: var(--text-heading);
  font-weight: 700;
  line-height: 1.25;
}

:where(.hackathon-app-container) a {
  color: inherit;
  text-decoration: none;
}

/* Page Layout Container */
.hackathon-app-container {
  display: flex;
  flex-direction: column;
}

/* Page scroll down animation */
@keyframes pageScrollDown {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content {
  flex-grow: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 60px 24px;
  animation: pageScrollDown 0.5s ease-out;
}

/* Navbar Component */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--glass-bg);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  color: var(--accent-color);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--text-heading);
  line-height: 1;
}

.brand-sub {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-color);
  font-weight: 600;
  margin-top: 2px;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.theme-toggle {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: scale(1.05);
}

.theme-icon {
  transition: transform 0.5s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
}

.sun {
  color: #fbbf24;
}

.moon {
  color: #6366f1;
}

/* Hero Banner */
.hero-banner {
  padding: 50px 24px 30px 24px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  background-color: var(--accent-glow);
  color: var(--accent-color);
  border: 1px solid var(--border-color);
  padding: 6px 16px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.hero-banner h1 {
  font-size: 56px;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 16px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 680px;
  margin-bottom: 36px;
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

/* Search Bar Styling */
.search-container {
  width: 100%;
  max-width: 650px;
  margin-bottom: 10px;
}

.search-bar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 20px;
  color: var(--text-muted);
}

.search-bar-wrapper input {
  width: 100%;
  padding: 12px 80px 12px 54px;
  font-family: var(--font-body);
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: #0f172a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-bar-wrapper input::placeholder {
  color: #94a3b8;
}

.search-bar-wrapper input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px var(--accent-glow), 0 8px 30px rgba(0, 0, 0, 0.05);
}

.clear-search-btn {
  position: absolute;
  right: 18px;
  background-color: var(--bg-tertiary);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-search-btn:hover {
  background-color: var(--border-color);
  color: var(--text-heading);
}

/* Quick Metrics Row */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 10px;
}

.metric-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
}

.metric-icon {
  color: var(--accent-color);
  width: 28px;
  height: 28px;
}

.metric-icon.star {
  color: #fbbf24;
}

.metric-icon.success {
  color: #10b981;
}

.metric-details h4 {
  font-size: 22px;
  font-weight: 800;
}

.metric-details p {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Catalog Filter Section */
.catalog-section {
  border-top: none;
  padding-top: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-header {
  margin-bottom: 28px;
  text-align: left;
}

.section-header h2 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 6px;
}

.section-header p {
  color: var(--text-muted);
}

/* CategoryHeader Pills Scroll Container */
.category-header {
  position: relative;
  margin-bottom: 40px;
  overflow: hidden;
  padding-bottom: 8px;
}

.category-scroll-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 4px 4px 8px 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-hover) transparent;
}

.category-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.category-scroll-container::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 9999px;
}

.category-scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--border-hover);
}

.category-tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px 18px;
  border-radius: 9999px;
  white-space: nowrap;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-tab-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.category-tab-btn.active {
  background: var(--accent-gradient);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(124, 58, 237, 0.2);
}

.tab-icon {
  flex-shrink: 0;
  opacity: 0.8;
}

.tab-name {
  line-height: 1;
}

.tab-count-badge {
  font-size: 11px;
  background-color: var(--bg-tertiary);
  color: var(--text-main);
  padding: 2px 6px;
  border-radius: 9999px;
  font-weight: 700;
}

.category-tab-btn.active .tab-count-badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* Cards Grid Layout */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  justify-items: center;
  cursor: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="%232563eb" stroke="white" stroke-width="1.5" /></svg>') 6 6, auto;
}

.custom-cursor {
  display: none !important;
}

.new-program-card {
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s;
}

.new-program-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-hover-shadow);
  border-color: var(--border-hover);
}

/* Cards visible with screen */
.screen-surface .cards-grid>* {
  opacity: 1;
}

/* ========== PULL-DOWN PROJECTOR SCREEN ========== */

/* Screen unroll - slow rolling from top */
@keyframes screenUnroll {
  0% {
    max-height: 0;
    opacity: 0;
    transform: perspective(800px) rotateX(-5deg);
    transform-origin: top center;
  }

  5% {
    opacity: 1;
  }

  20% {
    transform: perspective(800px) rotateX(-3deg);
  }

  50% {
    transform: perspective(800px) rotateX(-1deg);
  }

  100% {
    max-height: 2000px;
    opacity: 1;
    transform: perspective(800px) rotateX(0deg);
    transform-origin: top center;
  }
}

@keyframes bottomBarDrop {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  60% {
    opacity: 0.5;
    transform: translateY(-5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.projector-screen-wrapper {
  max-width: 1160px;
  margin: 10px auto 50px auto;
  position: relative;
  perspective: 1500px;
  transform-style: preserve-3d;
}

/* Metal housing / casing at top */
.screen-housing {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 38px;
  position: relative;
  z-index: 10;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.15);
}

.housing-cap {
  width: 16px;
  height: 38px;
  background: linear-gradient(180deg, #d8d8d8 0%, #b8b8b8 40%, #909090 100%);
  border: 1px solid #888;
  border-top: 1px solid #ffffff;
}

.housing-cap-left {
  border-radius: 8px 0 0 8px;
  border-right: none;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.2);
}

.housing-cap-right {
  border-radius: 0 8px 8px 0;
  border-left: none;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}

.housing-body {
  flex: 1;
  height: 38px;
  background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 20%, #cdcdcd 75%, #a0a0a0 100%);
  border-top: 1px solid #ffffff;
  border-bottom: 2px solid #777777;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}

.housing-body::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
}

.housing-brand {
  font-family: var(--font-heading);
  font-size: 11.5px;
  font-weight: 800;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Pull-down tab (Hangs below the bottom bar) */
.screen-pull-tab {
  display: flex;
  justify-content: center;
  height: 14px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.pull-tab-handle {
  width: 36px;
  height: 15px;
  background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
  border-radius: 0 0 6px 6px;
  border: 1px solid #64748b;
  border-top: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.pull-tab-handle:hover {
  transform: scaleY(1.1);
}

.pull-tab-handle::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 3px;
  background: #475569;
  border-radius: 1.5px;
}

/* White projector screen surface - Styled with 3D shadow and realistic black frames */
.screen-surface {
  background: #e8edf5;
  border: 12px solid #111111;
  border-top: 4px solid #111111;
  border-bottom: 2px solid #111111;
  position: relative;
  overflow: hidden;
  box-shadow:
    inset 0 0 20px rgba(0, 0, 0, 0.35),
    0 15px 35px rgba(0, 0, 0, 0.35),
    0 5px 15px rgba(0, 0, 0, 0.2);
  animation: screenUnroll 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  transform: rotateX(1.5deg);
  transform-origin: top center;
}

/* Subtle fabric texture on screen */
.screen-surface::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.003) 2px,
      rgba(0, 0, 0, 0.003) 4px);
  pointer-events: none;
  z-index: 2;
}

/* Light reflection on screen surface */
.screen-surface::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.35) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 80%);
  pointer-events: none;
  z-index: 4;
  mix-blend-mode: screen;
}

.screen-surface-inner {
  position: relative;
  z-index: 3;
  padding: 24px 28px 28px 28px;
}

/* Bottom weight bar */
.screen-bottom-bar {
  height: 12px;
  background: linear-gradient(180deg, #eeeeee 0%, #cccccc 30%, #a0a0a0 70%, #777777 100%);
  border: 1px solid #777777;
  border-top: 1px solid #fbfbfb;
  border-radius: 0 0 5px 5px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  position: relative;
  animation: bottomBarDrop 1s ease 5.5s forwards;
  opacity: 0;
}

.screen-bottom-bar::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
}

/* Wall shadow behind screen */
.projector-screen-wrapper::after {
  content: '';
  position: absolute;
  top: 40px;
  left: 2%;
  right: 2%;
  bottom: 20px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.06) 0%, transparent 70%);
  z-index: -1;
}

/* ===== DARK THEME PROJECTOR SCREEN ===== */
.dark-theme .housing-cap {
  background: linear-gradient(180deg, #444 0%, #333 40%, #252525 100%);
  border-color: #222;
}

.dark-theme .housing-cap-left {
  box-shadow: -3px 2px 6px rgba(0, 0, 0, 0.3);
}

.dark-theme .housing-cap-right {
  box-shadow: 3px 2px 6px rgba(0, 0, 0, 0.3);
}

.dark-theme .housing-body {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 20%, #1e1e1e 80%, #151515 100%);
  border-top-color: #444;
  border-bottom-color: #111;
}

.dark-theme .housing-body::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.dark-theme .housing-brand {
  color: #888;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
}

.dark-theme .pull-tab-handle {
  background: linear-gradient(180deg, #333 0%, #222 100%);
  border-color: #1a1a1a;
}

.dark-theme .pull-tab-handle::after {
  background: #555;
}

.dark-theme .screen-surface {
  background: #e8edf5;
  border-color: #0b0c0f;
}

.dark-theme .screen-surface::before {
  background: repeating-linear-gradient(0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.005) 2px,
      rgba(255, 255, 255, 0.005) 4px);
}

.dark-theme .screen-surface::after {
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.25) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 80%);
}

.dark-theme .screen-bottom-bar {
  background: linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 40%, #151515 100%);
  border-color: #111;
}

.dark-theme .screen-bottom-bar::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.dark-theme .projector-screen-wrapper::after {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
}

/* Mentorship Card Styling */
.mentorship-card {
  position: relative;
  background: linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%);
  border: 2px solid rgba(59, 130, 246, 0.35);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow:
    0 0 10px rgba(59, 130, 246, 0.3),
    0 0 20px rgba(59, 130, 246, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.04);
  z-index: 1;
  transition: all 0.3s ease;
}

.mentorship-card:hover {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow:
    0 0 15px rgba(59, 130, 246, 0.5),
    0 0 30px rgba(59, 130, 246, 0.3),
    0 0 50px rgba(59, 130, 246, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.06);
}

.dark-theme .screen-surface .mentorship-card {
  background: linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%);
  border: 2px solid rgba(59, 130, 246, 0.4);
  box-shadow:
    0 0 12px rgba(59, 130, 246, 0.35),
    0 0 24px rgba(59, 130, 246, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

.dark-theme .screen-surface .mentorship-card:hover {
  border-color: rgba(59, 130, 246, 0.65);
  box-shadow:
    0 0 18px rgba(59, 130, 246, 0.55),
    0 0 35px rgba(59, 130, 246, 0.3),
    0 0 55px rgba(59, 130, 246, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.06);
}

.dark-theme .screen-surface .card-title {
  color: #0f172a;
}

.dark-theme .screen-surface .mentorship-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow:
    0 0 14px rgba(59, 130, 246, 0.4),
    0 0 28px rgba(59, 130, 246, 0.25),
    0 0 45px rgba(59, 130, 246, 0.12),
    0 8px 20px rgba(0, 0, 0, 0.05);
}

.card-glass-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mentorship-card:hover .card-glass-glow {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.category-badge {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
}

.level-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.35;
  color: #0f172a;
}

.dark-theme .screen-body .card-title {
  color: #f1f5f9;
}

.card-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 20px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.card-skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  background-color: var(--bg-tertiary);
  color: var(--text-main);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.tag-zap-icon {
  color: var(--accent-color);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
}

.meta-icon {
  color: var(--text-muted);
}

.meta-icon.star {
  color: #fbbf24;
}

.learn-more-btn {
  background-color: var(--accent-color);
  border: 1px solid transparent;
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  width: 100%;
}

.learn-more-btn:hover {
  background-color: var(--accent-hover);
  border-color: transparent;
  color: #ffffff;
}

.btn-arrow {
  transition: transform 0.2s;
}

.learn-more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* Pagination Row Styling */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.pagination-arrow-btn {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #3b82f6;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pagination-arrow-btn:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  transform: translateY(-1px);
}

.pagination-arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 8px;
}

.pagination-num-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: #3b82f6;
  min-width: 40px;
  height: 40px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pagination-num-btn:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.pagination-num-btn.active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.35);
}

/* Empty State / Not Found State */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  background-color: var(--bg-secondary);
  border: 1px dashed var(--border-color);
  border-radius: 20px;
  max-width: 500px;
  margin: 40px auto;
}

.empty-state h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: 24px;
}

.reset-filters-btn {
  background: var(--accent-gradient);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.reset-filters-btn:hover {
  opacity: 0.9;
}

/* Program Detailed Modal & Application Form */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-content {
  position: relative;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 28px;
  width: 100%;
  max-width: 950px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  scrollbar-width: thin;
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background-color: var(--border-color);
  color: var(--text-heading);
  transform: rotate(90deg);
}

.modal-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 550px;
}

/* Modal Left Column (Details) */
.modal-details-col {
  padding: 40px;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}

.modal-category {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 8px;
}

.modal-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
}

.modal-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.modal-badges .badge {
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--bg-tertiary);
  color: var(--text-main);
}

.modal-badges .badge.level {
  background-color: var(--accent-glow);
  color: var(--accent-color);
}

.badge-icon {
  opacity: 0.8;
}

.modal-section {
  margin-bottom: 28px;
}

.modal-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sec-icon {
  color: var(--accent-color);
}

/* Timeline Layout for Curriculum */
.curriculum-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-left: 20px;
}

.curriculum-timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 5px;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
}

.timeline-marker {
  position: absolute;
  left: -27px;
  top: 2px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-content p {
  font-size: 14px;
  color: var(--text-main);
  font-weight: 500;
}

/* Skills Chip List */
.modal-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-skill-chip {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-heading);
}

/* Modal Right Column (Form) */
.modal-form-col {
  padding: 40px;
  background-color: var(--bg-tertiary);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.enrollment-form h3 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
}

.form-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text-heading);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
}

.input-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-heading);
  transition: all 0.2s;
}

.input-wrapper input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.input-wrapper input.error,
.form-group textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.form-group textarea {
  width: 100%;
  padding: 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-heading);
  resize: vertical;
  transition: all 0.2s;
}

.error-text {
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  display: block;
  margin-top: 4px;
}

.submit-application-btn {
  background: var(--accent-gradient);
  border: none;
  color: #ffffff;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
  transition: opacity 0.2s;
}

.submit-application-btn:hover {
  opacity: 0.95;
}

/* Success Feedback Panel */
.success-state {
  text-align: center;
  padding: 20px;
}

.success-icon {
  color: #10b981;
  margin-bottom: 20px;
}

.success-state h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text-heading);
}

.success-state p {
  font-size: 14px;
  color: var(--text-main);
  margin-bottom: 24px;
  line-height: 1.6;
}

.success-close-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 10px 28px;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-heading);
  transition: all 0.2s;
}

.success-close-btn:hover {
  background-color: var(--bg-primary);
  border-color: var(--border-hover);
}

/* Footer Component */
.footer {
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  padding: 60px 24px 30px 24px;
  margin-top: 80px;
}

.footer-top {
  max-width: 1400px;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.footer-brand {
  max-width: 400px;
}

.footer-brand h3 {
  font-size: 20px;
  font-weight: 850;
  margin-bottom: 12px;
}

.footer-brand p {
  color: var(--text-muted);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.link-group h4 {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  color: var(--accent-color);
}

.link-group ul {
  list-style: none;
}

.link-group ul li {
  margin-bottom: 8px;
}

.link-group ul li a {
  font-size: 14px;
  color: var(--text-main);
  transition: color 0.2s;
}

.link-group ul li a:hover {
  color: var(--accent-color);
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-links a {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.social-links a:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: #ffffff;
  transform: translateY(-2px);
}

.crafted {
  display: flex;
  align-items: center;
  gap: 4px;
}

.heart-icon {
  color: #ef4444;
}

/* Responsiveness adjustments */
@media (max-width: 1024px) {
  .hero-banner h1 {
    font-size: 42px;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-layout {
    grid-template-columns: 1fr;
  }

  .modal-details-col {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding-top: 48px;
    padding-bottom: 0px;
  }

  .hero-subtitle {
    margin-bottom: 16px;
  }

  .search-container {
    margin-bottom: 0px;
  }

  .hero-banner h1 {
    font-size: 32px;
  }

  .metrics-grid {
    gap: 12px;
  }

  .metric-card {
    padding: 12px;
  }

  .metric-details h4 {
    font-size: 18px;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-top {
    flex-direction: column;
    gap: 32px;
  }

  .footer-links {
    flex-wrap: wrap;
    gap: 40px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    border-radius: 16px;
  }

  .modal-details-col,
  .modal-form-col {
    padding: 20px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .projector-screen-wrapper {
    margin-left: -4px;
    margin-right: -4px;
  }

  .housing-cap {
    width: 10px;
    height: 28px;
  }

  .housing-body {
    height: 28px;
  }

  .housing-brand {
    font-size: 9px;
    letter-spacing: 1.5px;
  }

  .screen-surface {
    border-left-width: 3px;
    border-right-width: 3px;
  }

  .screen-surface-inner {
    padding: 14px 12px 18px 12px;
  }
}

@media (max-width: 768px) {
  .screen-surface-inner {
    padding: 18px 16px 22px 16px;
  }
}

/* ==========================================
   3D THEATER ROOM LAYOUT & DESIGN SYSTEM
   ========================================== */

/* Main Room Container */
.theater-room-container {
  width: 100%;
  padding: 20px 10px;
  background-color: #0b090c;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theater-room {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 800px;
  background: radial-gradient(circle at center, #1b1622 0%, #0d0a10 70%, #060507 100%);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #231d2b;
}

/* 1. Ceiling with Cove Lighting & Projector */
.theater-ceiling {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(180deg, #110e14 0%, #16121b 100%);
  z-index: 25;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.cove-lighting {
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 6px;
  background: linear-gradient(90deg, transparent, #eab308 15%, #fef08a 50%, #eab308 85%, transparent);
  filter: blur(4px);
  box-shadow: 0 15px 35px rgba(234, 179, 8, 0.45);
  opacity: 0.85;
}

/* Projector Assembly */
.projector-assembly {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projector-mount {
  width: 14px;
  height: 14px;
  background: linear-gradient(90deg, #1f1a24, #100d14);
  border-radius: 2px;
}

.projector-body {
  width: 80px;
  height: 30px;
  background: linear-gradient(180deg, #383042 0%, #1e1925 100%);
  border-radius: 6px;
  border: 1px solid #4a3f57;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2px;
}

/* Cooling vents on projector */
.projector-body::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 8px;
  width: 16px;
  height: 6px;
  background: repeating-linear-gradient(90deg, #100d14, #100d14 2px, transparent 2px, transparent 4px);
}

.projector-lens {
  width: 24px;
  height: 24px;
  background: radial-gradient(circle at center, #ffffff 10%, #4a7a9b 30%, #1d4ed8 70%, #000000 100%);
  border-radius: 50%;
  border: 2px solid #5b4d6a;
  box-shadow:
    0 0 12px rgba(96, 165, 250, 0.8),
    0 0 24px rgba(96, 165, 250, 0.5);
  position: relative;
  animation: lens-glow 4s infinite alternate;
}

@keyframes lens-glow {
  0% {
    transform: scale(0.96);
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  }

  100% {
    transform: scale(1.04);
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.9);
  }
}

/* Volumetric Projector Beam */
.projector-beam {
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  height: 480px;
  clip-path: polygon(49% 0, 51% 0, 100% 100%, 0 100%);
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(56, 189, 248, 0.15) 15%,
      rgba(37, 99, 235, 0.04) 55%,
      transparent 100%);
  filter: blur(10px);
  pointer-events: none;
  z-index: 22;
  mix-blend-mode: screen;
  transition: opacity 0.5s ease;
}

/* 2. Screen Wall Behind Projector Screen */
.theater-screen-wall {
  flex-grow: 1;
  width: 100%;
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* Screen Spotlight backdrops */
.screen-wall-glow {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 400px;
  background: radial-gradient(ellipse at center, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

/* The actual hanging screen */
.theater-screen-frame {
  width: 88%;
  max-width: 1020px;
  background: #000000;
  border-radius: 4px;
  padding: 12px;
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.6),
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 15;
}

.theater-screen-canvas {
  width: 100%;
  min-height: 440px;
  background: #f8fafc;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

/* Subtle fabric texture on canvas */
.theater-screen-canvas::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.005) 2px, rgba(0, 0, 0, 0.005) 4px),
    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.005) 2px, rgba(0, 0, 0, 0.005) 4px);
  pointer-events: none;
  z-index: 2;
}

/* Light beam projection overlay directly on canvas */
.theater-screen-canvas::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 100%;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.15) 0%, rgba(96, 165, 250, 0.04) 40%, transparent 80%);
  pointer-events: none;
  z-index: 3;
}

/* Screen Canvas Contents Inner */
.theater-screen-content {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  min-height: 440px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
}

/* 3. Room Floor & Furniture */
.theater-floor {
  width: 100%;
  height: 180px;
  background: linear-gradient(180deg, #150f19 0%, #09060b 100%);
  position: relative;
  z-index: 24;
  display: flex;
  justify-content: center;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5);
}

/* Floor perspective wood planks */
.theater-floor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(90deg, rgba(0, 0, 0, 0.45) 1px, transparent 1px),
    linear-gradient(0deg, rgba(0, 0, 0, 0.25) 1px, transparent 1px);
  background-size: 80px 100%, 100% 20px;
  transform: perspective(200px) rotateX(75deg);
  transform-origin: top center;
  opacity: 0.7;
}

/* Table */
.coffee-table {
  position: absolute;
  bottom: 30px;
  width: 320px;
  height: 70px;
  background: radial-gradient(ellipse at center, #292130 0%, #110d15 100%);
  border: 2px solid #3d3147;
  border-radius: 50%;
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.85),
    0 2px 4px rgba(255, 255, 255, 0.05) inset;
  z-index: 30;
}

.coffee-table-shadow {
  position: absolute;
  bottom: 10px;
  width: 300px;
  height: 35px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  filter: blur(8px);
  z-index: 25;
}

/* Couches in Foreground Corners */
.sofa-left {
  position: absolute;
  bottom: -30px;
  left: -40px;
  width: 250px;
  height: 170px;
  background: linear-gradient(135deg, #1c1524 0%, #0d0a11 100%);
  border-radius: 60px 90px 20px 20px;
  box-shadow:
    20px 15px 35px rgba(0, 0, 0, 0.9),
    inset -2px 5px 8px rgba(255, 255, 255, 0.03);
  z-index: 35;
  transform: rotate(6deg);
}

.sofa-right {
  position: absolute;
  bottom: -30px;
  right: -40px;
  width: 250px;
  height: 170px;
  background: linear-gradient(-135deg, #1c1524 0%, #0d0a11 100%);
  border-radius: 90px 60px 20px 20px;
  box-shadow:
    -20px 15px 35px rgba(0, 0, 0, 0.9),
    inset 2px 5px 8px rgba(255, 255, 255, 0.03);
  z-index: 35;
  transform: rotate(-6deg);
}

/* Corner Plant styling */
.room-plant {
  position: absolute;
  bottom: 95px;
  left: 20px;
  width: 80px;
  height: 200px;
  z-index: 23;
  pointer-events: none;
}

.plant-pot {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 38px;
  height: 45px;
  background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%);
  border-radius: 4px 4px 10px 10px;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.7),
    0 2px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #9ca3af;
}

/* Right wall speaker */
.speaker-console {
  position: absolute;
  bottom: 110px;
  right: 20px;
  width: 45px;
  height: 100px;
  background: linear-gradient(180deg, #1e1925 0%, #0d0a10 100%);
  border-radius: 4px;
  border: 1px solid #2d2638;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.85);
  z-index: 23;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  pointer-events: none;
}

.speaker-driver {
  width: 28px;
  height: 28px;
  background: radial-gradient(circle at center, #0f0a15 40%, #292133 70%, #150f1c 100%);
  border-radius: 50%;
  border: 1px solid #382f45;
}

.speaker-driver-small {
  width: 16px;
  height: 16px;
  background: radial-gradient(circle at center, #0f0a15 40%, #292133 70%, #150f1c 100%);
  border-radius: 50%;
  border: 1px solid #382f45;
}

/* ==========================================
   INTERACTIVE SCREEN DASHBOARD SYSTEM
   ========================================== */

/* Main 12 Card Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
}

.dashboard-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  cursor: pointer;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #f1f5f9;
  text-decoration: none;
  user-select: none;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  border-color: transparent;
}

.card-num-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
}

.card-num-lbl {
  font-size: 8px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.card-num-val {
  font-size: 26px;
  font-weight: 900;
  margin-top: 1px;
}

.card-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  transition: transform 0.3s ease;
}

.dashboard-card:hover .card-icon-container {
  transform: scale(1.18);
}

.card-label-val {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  letter-spacing: -0.2px;
}

/* Card Themes Color Palettes */
/* Theme 01: Home (Blue) */
.card-theme-01 .card-num-val {
  color: #2563eb;
}

.card-theme-01 .card-icon-container {
  color: #3b82f6;
}

.card-theme-01:hover {
  box-shadow: 0 16px 24px rgba(37, 99, 235, 0.14);
  background-color: #f8faff;
}

/* Theme 02: Analytics (Green) */
.card-theme-02 .card-num-val {
  color: #16a34a;
}

.card-theme-02 .card-icon-container {
  color: #22c55e;
}

.card-theme-02:hover {
  box-shadow: 0 16px 24px rgba(22, 163, 74, 0.14);
  background-color: #f0fdf4;
}

/* Theme 03: Users (Purple) */
.card-theme-03 .card-num-val {
  color: #7c3aed;
}

.card-theme-03 .card-icon-container {
  color: #a855f7;
}

.card-theme-03:hover {
  box-shadow: 0 16px 24px rgba(124, 58, 237, 0.14);
  background-color: #fbfbfe;
}

/* Theme 04: Products (Orange) */
.card-theme-04 .card-num-val {
  color: #ea580c;
}

.card-theme-04 .card-icon-container {
  color: #f97316;
}

.card-theme-04:hover {
  box-shadow: 0 16px 24px rgba(234, 88, 12, 0.14);
  background-color: #fffaf5;
}

/* Theme 05: Messages (Teal) */
.card-theme-05 .card-num-val {
  color: #0d9488;
}

.card-theme-05 .card-icon-container {
  color: #14b8a6;
}

.card-theme-05:hover {
  box-shadow: 0 16px 24px rgba(13, 148, 136, 0.14);
  background-color: #f5fdfb;
}

/* Theme 06: Files (Yellow/Gold) */
.card-theme-06 .card-num-val {
  color: #ca8a04;
}

.card-theme-06 .card-icon-container {
  color: #eab308;
}

.card-theme-06:hover {
  box-shadow: 0 16px 24px rgba(202, 138, 4, 0.14);
  background-color: #fefdf0;
}

/* Theme 07: Calendar (Red/Crimson) */
.card-theme-07 .card-num-val {
  color: #dc2626;
}

.card-theme-07 .card-icon-container {
  color: #ef4444;
}

.card-theme-07:hover {
  box-shadow: 0 16px 24px rgba(220, 38, 38, 0.14);
  background-color: #fffcfc;
}

/* Theme 08: Settings (Slate/Steel) */
.card-theme-08 .card-num-val {
  color: #475569;
}

.card-theme-08 .card-icon-container {
  color: #64748b;
}

.card-theme-08:hover {
  box-shadow: 0 16px 24px rgba(71, 85, 105, 0.14);
  background-color: #f8fafc;
}

/* Theme 09: Reports (Pink) */
.card-theme-09 .card-num-val {
  color: #db2777;
}

.card-theme-09 .card-icon-container {
  color: #ec4899;
}

.card-theme-09:hover {
  box-shadow: 0 16px 24px rgba(219, 39, 119, 0.14);
  background-color: #fffbfd;
}

/* Theme 10: Notifications (Sky Blue) */
.card-theme-10 .card-num-val {
  color: #0284c7;
}

.card-theme-10 .card-icon-container {
  color: #38bdf8;
}

.card-theme-10:hover {
  box-shadow: 0 16px 24px rgba(2, 132, 199, 0.14);
  background-color: #f0f9ff;
}

/* Theme 11: Security (Emerald) */
.card-theme-11 .card-num-val {
  color: #059669;
}

.card-theme-11 .card-icon-container {
  color: #10b981;
}

.card-theme-11:hover {
  box-shadow: 0 16px 24px rgba(5, 150, 105, 0.14);
  background-color: #ecfdf5;
}

/* Theme 12: Help (Indigo) */
.card-theme-12 .card-num-val {
  color: #4f46e5;
}

.card-theme-12 .card-icon-container {
  color: #6366f1;
}

.card-theme-12:hover {
  box-shadow: 0 16px 24px rgba(79, 70, 229, 0.14);
  background-color: #fbfbfe;
}


/* ==========================================
   SUB-SCREEN PRESENTATION COMPONENT STYLES
   ========================================== */

/* Sub-screen Core Header */
.screen-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #e2e8f0;
  padding-bottom: 12px;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.screen-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.screen-header-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.screen-header-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
}

.back-to-dashboard-btn {
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.back-to-dashboard-btn:hover {
  background-color: #e2e8f0;
  color: #0f172a;
}

/* 1. Welcoming Screen (Home sub-screen) */
.home-screen-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  padding: 20px;
  color: #334155;
}

.welcome-logo {
  color: #2563eb;
  margin-bottom: 14px;
}

.home-screen-content h3 {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.home-screen-content p {
  font-size: 14px;
  color: #64748b;
  max-width: 500px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.welcome-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 560px;
}

.welcome-stat-item {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
}

.welcome-stat-item h4 {
  font-size: 20px;
  font-weight: 800;
  color: #2563eb;
}

.welcome-stat-item p {
  font-size: 11px;
  color: #64748b;
  margin: 2px 0 0 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 2. Analytics Sub-screen */
.analytics-dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  overflow-y: auto;
}

.analytics-metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.analytics-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.analytics-icon-box {
  width: 36px;
  height: 36px;
  background-color: rgba(34, 197, 94, 0.12);
  color: #16a34a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analytics-icon-box.blue {
  background-color: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.analytics-icon-box.purple {
  background-color: rgba(168, 85, 247, 0.12);
  color: #7c3aed;
}

.analytics-info h5 {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
}

.analytics-info p {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 1px 0 0 0;
}

.analytics-graphs-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
}

.analytics-graph-container {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
}

.graph-title {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bar-chart-visual {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 120px;
  padding-top: 10px;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.bar-fill {
  width: 20px;
  background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 4px;
}

.bar-fill::after {
  content: attr(data-value);
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 700;
  color: #0f172a;
}

.bar-label {
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
}

.donut-chart-visual {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.donut-legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}

.donut-color-dot {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #334155;
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.donut-value {
  font-weight: 700;
  color: #0f172a;
}

/* 3. Mentors List Screen */
.mentors-screen {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  overflow: hidden;
}

.mentors-search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.mentors-search-box input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 13px;
  font-family: var(--font-body);
}

.mentors-search-box input:focus {
  outline: none;
  border-color: #7c3aed;
}

.mentors-search-box .search-icon {
  position: absolute;
  left: 12px;
  color: #94a3b8;
}

.mentors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow-y: auto;
  padding-bottom: 10px;
  flex-grow: 1;
}

.mentor-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mentor-avatar-box {
  width: 44px;
  height: 44px;
  background-color: #eef2ff;
  color: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid #c7d2fe;
  margin-bottom: 8px;
}

.mentor-name {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.mentor-role {
  font-size: 11px;
  color: #64748b;
  margin: 1px 0 6px 0;
}

.mentor-badge-pill {
  font-size: 9px;
  background-color: #eef2ff;
  color: #4f46e5;
  padding: 2px 6px;
  border-radius: 9999px;
  font-weight: 700;
}

/* 4. Chat/Messages Sub-screen */
.chat-screen-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  height: calc(100% - 48px);
}

.chat-messages-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-bubble {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.4;
}

.chat-bubble.mentor {
  align-self: flex-start;
  background-color: #f1f5f9;
  color: #334155;
  border-bottom-left-radius: 2px;
}

.chat-bubble.me {
  align-self: flex-end;
  background-color: #0d9488;
  color: #ffffff;
  border-bottom-right-radius: 2px;
}

.chat-input-bar {
  display: flex;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.chat-input-bar input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 13px;
  font-family: var(--font-body);
}

.chat-input-bar input:focus {
  outline: none;
  border-color: #0d9488;
}

.chat-send-btn {
  background-color: #0d9488;
  border: none;
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-send-btn:hover {
  background-color: #0f766e;
}

/* 5. Files / Downloads Sub-screen */
.files-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  transition: background-color 0.2s;
}

.file-item:hover {
  background-color: #f1f5f9;
}

.file-info-col {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon-box {
  color: #ca8a04;
}

.file-title-txt {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.file-size-txt {
  font-size: 11px;
  color: #64748b;
  margin: 2px 0 0 0;
}

.file-download-btn {
  background: none;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.file-download-btn:hover {
  border-color: #ca8a04;
  color: #ca8a04;
  background-color: #fefce8;
}

/* 6. Calendar Sub-screen */
.calendar-screen {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  overflow: hidden;
}

.calendar-grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
}

.day-header {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.calendar-grid-cells {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  flex-grow: 1;
  overflow-y: auto;
}

.calendar-cell {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  min-height: 48px;
  padding: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cell-num {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
}

.calendar-event-dot {
  font-size: 8px;
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

/* 7. Settings Sub-screen */
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  overflow-y: auto;
}

.settings-card-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
}

.settings-section-lbl {
  font-size: 12px;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.settings-option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.settings-option-row:last-child {
  border-bottom: none;
}

.settings-lbl-col h5 {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.settings-lbl-col p {
  font-size: 11px;
  color: #64748b;
  margin: 1px 0 0 0;
}

.slider-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slider-input-wrapper input[type="range"] {
  width: 100px;
  cursor: pointer;
}

.slider-val-tag {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  width: 28px;
  text-align: right;
}

/* 8. Help Sub-screen */
.help-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  overflow-y: auto;
}

.faq-card-item {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
}

.faq-card-item h5 {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.faq-card-item p {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ==========================================
   DARK THEME OVERRIDES FOR 3D THEATER ROOM
   ========================================== */
.dark-theme .theater-room {
  background: radial-gradient(circle at center, #130f18 0%, #08060a 75%, #030204 100%);
  border-color: #17121c;
}

.dark-theme .theater-ceiling {
  background: linear-gradient(180deg, #09070a 0%, #0d0a0f 100%);
}

.dark-theme .theater-floor {
  background: linear-gradient(180deg, #0d0910 0%, #040305 100%);
}

.dark-theme .theater-floor::before {
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
}

.dark-theme .coffee-table {
  background: radial-gradient(ellipse at center, #1b1620 0%, #0a080c 100%);
  border-color: #261f2d;
}

.dark-theme .sofa-left {
  background: linear-gradient(135deg, #120e17 0%, #050406 100%);
}

.dark-theme .sofa-right {
  background: linear-gradient(-135deg, #120e17 0%, #050406 100%);
}

.dark-theme .plant-pot {
  background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
  border-color: #4b5563;
}


/* ==========================================
   RESPONSIVENESS & ADAPTIVE SCALING
   ========================================== */

/* Flat fallbacks for medium viewports (tablets) */
@media (max-width: 1024px) {
  .theater-room {
    height: auto;
    min-height: auto;
    aspect-ratio: auto;
  }

  .projector-beam {
    display: none;
  }

  .theater-ceiling {
    position: relative;
    height: 40px;
  }

  .projector-assembly {
    top: 5px;
  }

  .theater-screen-wall {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .theater-screen-frame {
    width: 95%;
  }

  .theater-floor {
    display: none;
  }

  .sofa-left,
  .sofa-right,
  .coffee-table,
  .coffee-table-shadow,
  .room-plant,
  .speaker-console {
    display: none;
  }

  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Fallbacks for mobile screens */
@media (max-width: 640px) {
  .theater-room-container {
    padding: 0;
    background: none;
  }

  .theater-room {
    border-radius: 0;
    border: none;
    box-shadow: none;
    background: none;
  }

  .theater-ceiling {
    display: none;
  }

  .theater-screen-wall {
    padding: 0;
  }

  .theater-screen-frame {
    width: 100%;
    border-radius: 0;
    padding: 4px;
    box-shadow: none;
    background: none;
  }

  .theater-screen-canvas {
    min-height: auto;
    background: none;
    box-shadow: none;
  }

  .theater-screen-canvas::before,
  .theater-screen-canvas::after {
    display: none;
  }

  .theater-screen-content {
    padding: 10px;
  }

  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .dashboard-card {
    padding: 10px;
    border-radius: 12px;
  }

  .card-num-val {
    font-size: 20px;
  }

  .card-label-val {
    font-size: 11px;
  }

  .analytics-metrics-row {
    grid-template-columns: 1fr;
  }

  .analytics-graphs-row {
    grid-template-columns: 1fr;
  }

  .mentors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ==========================================
   NEW HORIZONTAL PROGRAM CARDS STYLES
   ========================================== */

.hackathon-app-container .new-program-card {
  display: flex;
  align-items: center;
  padding: 14px 14px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  cursor: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="%232563eb" stroke="white" stroke-width="1.5" /></svg>') 6 6, auto;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.hackathon-app-container .new-program-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
  border-color: rgba(79, 70, 229, 0.3);
}

.hackathon-app-container .new-program-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.03),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
}

.hackathon-app-container .new-program-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
  margin-left: 14px;
  text-align: left;
  flex-grow: 1;
  height: 100%;
}

.hackathon-app-container .new-program-title {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.3;
  margin: 0;
}

.hackathon-app-container .new-program-know-more {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  transition: color 0.2s;
}

.know-more-arrow {
  transition: transform 0.2s ease;
}

.new-program-card:hover .know-more-arrow {
  transform: translateX(3px);
}

/* Program Icon Colors & Background Tints */
.program-icon-security {
  color: #4f46e5;
  background-color: #f5f3ff;
  border: 1px solid rgba(79, 70, 229, 0.15);
}

.program-icon-forensics {
  color: #0284c7;
  background-color: #f0f9ff;
  border: 1px solid rgba(2, 132, 199, 0.15);
}

.program-icon-hacking {
  color: #16a34a;
  background-color: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.program-icon-pentest {
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.program-icon-soc {
  color: #3b82f6;
  background-color: #eff6ff;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.program-icon-network {
  color: #ea580c;
  background-color: #fff7ed;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

.program-icon-cloud {
  color: #0d9488;
  background-color: #f0fdfa;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.program-icon-incident {
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.program-icon-threat {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-appsec {
  color: #059669;
  background-color: #ecfdf5;
  border: 1px solid rgba(5, 150, 105, 0.15);
}

.program-icon-malware {
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.program-icon-osint {
  color: #0891b2;
  background-color: #ecfeff;
  border: 1px solid rgba(8, 145, 178, 0.15);
}

.program-icon-data {
  color: #2563eb;
  background-color: #f0f4ff;
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.program-icon-software {
  color: #3b82f6;
  background-color: #eff6ff;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.program-icon-design {
  color: #db2777;
  background-color: #fdf2f8;
  border: 1px solid rgba(219, 39, 119, 0.15);
}

.program-icon-business {
  color: #ea580c;
  background-color: #fff7ed;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

.program-icon-finance {
  color: #059669;
  background-color: #ecfdf5;
  border: 1px solid rgba(5, 150, 105, 0.15);
}

.program-icon-law {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-media {
  color: #ca8a04;
  background-color: #fefce8;
  border: 1px solid rgba(202, 138, 4, 0.15);
}

.program-icon-default {
  color: #4b5563;
  background-color: #f3f4f6;
  border: 1px solid rgba(75, 85, 99, 0.15);
}

/* Corporate Training Icon Colors */
.program-icon-leadership {
  color: #d97706;
  background-color: #fffbeb;
  border: 1px solid rgba(217, 119, 6, 0.15);
}

.program-icon-strategic {
  color: #4f46e5;
  background-color: #f5f3ff;
  border: 1px solid rgba(79, 70, 229, 0.15);
}

.program-icon-project {
  color: #2563eb;
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.program-icon-change {
  color: #ea580c;
  background-color: #fff7ed;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

.program-icon-decision {
  color: #ca8a04;
  background-color: #fefce8;
  border: 1px solid rgba(202, 138, 4, 0.15);
}

.program-icon-communication {
  color: #0284c7;
  background-color: #f0f9ff;
  border: 1px solid rgba(2, 132, 199, 0.15);
}

.program-icon-ethics {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-team {
  color: #16a34a;
  background-color: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.program-icon-conflict {
  color: #0d9488;
  background-color: #f0fdfa;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.program-icon-negotiation {
  color: #0891b2;
  background-color: #ecfeff;
  border: 1px solid rgba(8, 145, 178, 0.15);
}

.program-icon-critical {
  color: #e11d48;
  background-color: #fff1f2;
  border: 1px solid rgba(225, 29, 72, 0.15);
}

.program-icon-problem {
  color: #d97706;
  background-color: #fffbeb;
  border: 1px solid rgba(217, 119, 6, 0.15);
}

.program-icon-time {
  color: #64748b;
  background-color: #f8fafc;
  border: 1px solid rgba(100, 116, 139, 0.15);
}

.program-icon-stress {
  color: #db2777;
  background-color: #fdf2f8;
  border: 1px solid rgba(219, 39, 119, 0.15);
}

.program-icon-emotional {
  color: #e11d48;
  background-color: #fff1f2;
  border: 1px solid rgba(225, 29, 72, 0.15);
}

.program-icon-hr {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-talent {
  color: #d97706;
  background-color: #fffbeb;
  border: 1px solid rgba(217, 119, 6, 0.15);
}

.program-icon-engagement {
  color: #059669;
  background-color: #ecfdf5;
  border: 1px solid rgba(5, 150, 105, 0.15);
}

.program-icon-performance {
  color: #2563eb;
  background-color: #eff6ff;
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.program-icon-product {
  color: #ea580c;
  background-color: #fff7ed;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

.program-icon-sales {
  color: #16a34a;
  background-color: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.program-icon-crm {
  color: #0d9488;
  background-color: #f0fdfa;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.program-icon-entrepreneurship {
  color: #d97706;
  background-color: #fffbeb;
  border: 1px solid rgba(217, 119, 6, 0.15);
}

.program-icon-digital-marketing {
  color: #db2777;
  background-color: #fdf2f8;
  border: 1px solid rgba(219, 39, 119, 0.15);
}

.program-icon-brand {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-content {
  color: #ca8a04;
  background-color: #fefce8;
  border: 1px solid rgba(202, 138, 4, 0.15);
}

.program-icon-risk {
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.program-icon-analytics {
  color: #3b82f6;
  background-color: #eff6ff;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.program-icon-ai {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-genai {
  color: #4f46e5;
  background-color: #f5f3ff;
  border: 1px solid rgba(79, 70, 229, 0.15);
}

.program-icon-devops {
  color: #ea580c;
  background-color: #fff7ed;
  border: 1px solid rgba(234, 88, 12, 0.15);
}

.program-icon-qa {
  color: #16a34a;
  background-color: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.program-icon-infosec {
  color: #0284c7;
  background-color: #f0f9ff;
  border: 1px solid rgba(2, 132, 199, 0.15);
}

.program-icon-privacy {
  color: #7c3aed;
  background-color: #f5f3ff;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.program-icon-marketing {
  color: #db2777;
  background-color: #fdf2f8;
  border: 1px solid rgba(219, 39, 119, 0.15);
}

.program-icon-technology {
  color: #3b82f6;
  background-color: #eff6ff;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.program-icon-city {
  color: #0ea5e9;
  background-color: #f0f9ff;
  border: 1px solid rgba(14, 165, 233, 0.15);
}

.program-icon-sustainable {
  color: #16a34a;
  background-color: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

/* ==========================================
   3D PROJECTOR DASHBOARD STYLES
   ========================================== */

.projector-dashboard-container {
  max-width: 1280px;
  width: 100%;
  margin: 30px auto 50px auto;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 24px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.04);
  position: relative;
}

/* Projector Chassis Front Panel */
.projector-chassis {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  /* Horizontal gradient to achieve 3D rounded vertical edges */
  background: linear-gradient(90deg,
      #cbd5e1 0%,
      #e2e8f0 3%,
      #f8fafc 10%,
      #f8fafc 90%,
      #e2e8f0 97%,
      #cbd5e1 100%);
  border: 1px solid #cbd5e1;
  border-radius: 40px 40px 30px 30px;
  padding: 65px 40px 50px 40px;
  /* Top padding accommodates the absolute top lid */
  position: relative;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  z-index: 2;
  overflow: hidden;
  /* Clips top lid and bottom base perfectly on the curved sides */
}

/* 3D Curved Top Lid */
.projector-chassis::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 38px;
  background: linear-gradient(180deg,
      #ffffff 0%,
      #f1f5f9 40%,
      #e2e8f0 100%);
  border-bottom: 2px solid #cbd5e1;
  box-shadow:
    inset 0 6px 8px rgba(255, 255, 255, 0.95),
    0 3px 6px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

/* Bottom base (dark band running along bottom front) */
.projector-chassis::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 26px;
  background: linear-gradient(180deg, #2a2e37 0%, #15171e 100%);
  border-top: 2.5px solid #3d4351;
  z-index: 3;
}

/* Feet */
.projector-feet {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: -10px auto 0 auto;
  padding: 0 50px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.projector-foot {
  width: 45px;
  height: 16px;
  background: linear-gradient(180deg, #181c24 0%, #08090c 100%);
  border-radius: 0 0 10px 10px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Shadow underneath */
.projector-shadow {
  height: 30px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 70%);
  width: 95%;
  margin: -8px auto 0 auto;
  filter: blur(5px);
  position: relative;
  z-index: 0;
}

/* Columns */
.projector-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 5;
}

/* Lens Assembly */
.projector-center-lens {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0;
  z-index: 10;
}

/* Lens outer bezel */
.lens-outer-ring {
  width: 330px;
  height: 330px;
  background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 45%, #94a3b8 55%, #f8fafc 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.3),
    inset 0 3px 6px rgba(255, 255, 255, 0.9),
    inset 0 -3px 6px rgba(0, 0, 0, 0.15);
  border: 2.5px solid #d1d5db;
  position: relative;
}

/* Middle ring */
.lens-middle-ring {
  width: 290px;
  height: 290px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.8);
}

/* Silver focus ring */
.lens-inner-ring {
  width: 266px;
  height: 266px;
  background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 50%, #475569 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  border: 1px solid #94a3b8;
}

/* Glass element */
.lens-glass {
  width: 246px;
  height: 246px;
  border-radius: 50%;
  background: radial-gradient(circle at 45% 45%,
      #2563eb 0%,
      #1d1b4b 30%,
      #0f051a 65%,
      #000000 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.9);
}

/* Concentric aperture lines */
.lens-aperture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 0 0 10px rgba(255, 255, 255, 0.02),
    inset 0 0 0 24px rgba(255, 255, 255, 0.02),
    inset 0 0 0 45px rgba(59, 130, 246, 0.05);
  pointer-events: none;
}

/* Light source bulb inside lens */
.lens-bulb {
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: radial-gradient(circle, #7dd3fc 0%, #2563eb 40%, #1e1b4b 75%, transparent 100%);
  filter: blur(2px);
  box-shadow:
    0 0 30px rgba(56, 189, 248, 0.7),
    0 0 60px rgba(37, 99, 235, 0.4);
  pointer-events: none;
}

/* Violet light flare on top left */
.lens-reflection-violet {
  position: absolute;
  top: 12%;
  left: 12%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.5) 0%, rgba(219, 39, 119, 0.3) 50%, transparent 80%);
  filter: blur(3px);
  pointer-events: none;
  mix-blend-mode: screen;
}

/* Cyan light flare on bottom right */
.lens-reflection-cyan {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 80%);
  filter: blur(3px);
  pointer-events: none;
  mix-blend-mode: screen;
}

/* High contrast reflections */
.lens-hotspot-1 {
  position: absolute;
  top: 24%;
  left: 24%;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%);
  filter: blur(0.5px);
  pointer-events: none;
}

.lens-hotspot-2 {
  position: absolute;
  bottom: 28%;
  right: 28%;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
  filter: blur(0.5px);
  pointer-events: none;
}

/* Micro concentric rings (lens coating reflections) */
.lens-concentric-1 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.06);
  pointer-events: none;
}

.lens-concentric-2 {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1.5px solid rgba(59, 130, 246, 0.15);
  pointer-events: none;
}

/* Dial/knob at the bottom center of the lens */
.lens-focus-knob {
  width: 70px;
  height: 20px;
  background: linear-gradient(90deg, #1b1d24 0%, #474f62 25%, #1b1d24 50%, #474f62 75%, #1b1d24 100%);
  border: 1.5px solid #0c0d12;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow:
    0 6px 10px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ew-resize;
  z-index: 15;
}

.lens-focus-knob::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(90deg,
      transparent,
      transparent 4px,
      #0c0d12 4px,
      #0c0d12 6px);
  opacity: 0.9;
}

/* 3D Dashboard Cards */
.projector-card {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  border-top: 1.5px solid #ffffff;
  border-bottom: 2.5px solid #b2bbc7;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 50px;
  height: auto;
  box-sizing: border-box;
  width: 100%;
}

.projector-card:hover {
  transform: translateY(-1px);
  background: linear-gradient(180deg, #ffffff 0%, #eceef2 100%);
  border-color: #94a3b8;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

/* Icon Section on Projector Card */
.projector-card-icon-area {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 10px;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.25),
    0 2px 4px rgba(0, 0, 0, 0.04);
}

.projector-card:hover .projector-card-icon-area {
  transform: scale(1.12) rotate(4deg);
  box-shadow: 0 4px 12px var(--hover-glow, rgba(59, 130, 246, 0.28));
}

.projector-card-icon {
  width: 18px;
  height: 18px;
  color: inherit;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.projector-card:hover .projector-card-icon {
  filter: brightness(1.15) saturate(1.2);
}

/* Vertical Divider in Card */
.projector-card-divider {
  width: 1px;
  height: 26px;
  background-color: #cbd5e1;
  margin: 0 14px;
  flex-shrink: 0;
}

/* Card Content / Text */
.projector-card-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: left;
  overflow: hidden;
}

.projector-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.25;
  white-space: normal;
  word-break: break-word;
  text-shadow: 0 0.5px 0 rgba(255, 255, 255, 0.8);
}

.projector-card-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.projector-card-know-more {
  font-size: 11px;
  font-weight: 700;
  color: #3b82f6;
  /* Consistent corporate blue */
  white-space: nowrap;
  opacity: 0.85;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.2px;
}

.projector-card:hover .projector-card-know-more {
  color: #2563eb;
  /* Active blue color on hover */
  opacity: 1;
  transform: translateX(3px);
  text-shadow: 0 0 6px rgba(59, 130, 246, 0.25);
}

/* Placeholder card slots */
.projector-card-placeholder {
  height: 50px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

/* Responsive adjustments for 3D Projector */
@media (max-width: 1100px) {
  .projector-chassis {
    padding: 30px 24px;
    gap: 20px;
  }

  .lens-outer-ring {
    width: 250px;
    height: 250px;
  }

  .lens-middle-ring {
    width: 210px;
    height: 210px;
  }

  .lens-inner-ring {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 900px) {
  .projector-chassis {
    grid-template-columns: 1fr;
    border-radius: 24px;
    padding: 55px 24px 24px 24px;
    gap: 24px;
  }

  .projector-column-left {
    grid-row: 1;
  }

  .projector-center-lens {
    grid-row: 2;
    margin: 15px auto;
  }

  .projector-column-right {
    grid-row: 3;
  }

  .projector-chassis::after {
    display: none;
  }

  .projector-feet {
    display: none;
  }
}

@media (max-width: 768px) {
  .projector-dashboard-container {
    padding: 12px;
    margin: 5px auto 30px auto;
    border-radius: 16px;
  }

  .projector-chassis {
    padding: 50px 12px 20px 12px;
    gap: 16px;
    border-radius: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.25);
  }

  /* Scale lens down for tablet / mobile view */
  .lens-outer-ring {
    width: 200px;
    height: 200px;
  }

  .lens-middle-ring {
    width: 176px;
    height: 176px;
  }

  .lens-inner-ring {
    width: 160px;
    height: 160px;
  }

  .lens-glass {
    width: 148px;
    height: 148px;
  }

  .lens-bulb {
    width: 45px;
    height: 45px;
  }

  .lens-reflection-violet {
    width: 75px;
    height: 75px;
  }

  .lens-reflection-cyan {
    width: 85px;
    height: 85px;
  }

  .lens-concentric-1 {
    width: 120px;
    height: 120px;
  }

  .lens-concentric-2 {
    width: 90px;
    height: 90px;
  }

  .lens-focus-knob {
    width: 50px;
    height: 14px;
    bottom: -10px;
  }
}

@media (max-width: 480px) {
  .projector-card {
    padding: 6px 10px;
  }

  .projector-card-icon-area {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .projector-card-icon {
    width: 16px;
    height: 16px;
  }

  .projector-card-divider {
    margin: 0 10px;
  }

  .projector-card-title {
    font-size: 12.5px;
  }

  .projector-card-know-more {
    font-size: 10px;
    margin-left: 6px;
  }

  /* Scale lens down further for small mobile viewports */
  .lens-outer-ring {
    width: 170px;
    height: 170px;
  }

  .lens-middle-ring {
    width: 148px;
    height: 148px;
  }

  .lens-inner-ring {
    width: 134px;
    height: 134px;
  }

  .lens-glass {
    width: 124px;
    height: 124px;
  }

  .lens-bulb {
    width: 35px;
    height: 35px;
  }

  .lens-reflection-violet {
    width: 60px;
    height: 60px;
  }

  .lens-reflection-cyan {
    width: 70px;
    height: 70px;
  }

  .lens-concentric-1 {
    width: 95px;
    height: 95px;
  }

  .lens-concentric-2 {
    width: 70px;
    height: 70px;
  }

  .lens-focus-knob {
    width: 40px;
    height: 12px;
    bottom: -8px;
  }
}

/* ==========================================
   3D MOUSEPAD CONTAINER SYSTEM
   ========================================== */
.hackathon-app-container .mousepad-container {
  max-width: 1350px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 10;
  min-height: 500px;
  display: flex;
  align-items: center;
  cursor: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="%232563eb" stroke="white" stroke-width="1.5" /></svg>') 6 6, auto;
}

.dark-theme .mousepad-container {
  background: #1e293b;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Corner Accent top-left */
.hackathon-app-container .mousepad-accent-tl {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  z-index: 1;
}

.dark-theme .mousepad-accent-tl {
  background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
}

.mousepad-accent-tl .accent-dots {
  position: absolute;
  top: 60px;
  left: 60px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: rotate(-45deg);
}

.mousepad-accent-tl .accent-dot {
  width: 6px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Corner Accent bottom-right */
.hackathon-app-container .mousepad-accent-br {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 250px;
  height: 250px;
  background: linear-gradient(-45deg, #6366f1 0%, #4338ca 100%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  z-index: 1;
}

.dark-theme .mousepad-accent-br {
  background: linear-gradient(-45deg, #4f46e5 0%, #312e81 100%);
}

/* Dot grid & circuits top-right */
.mousepad-circuits-tr {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 320px;
  height: 150px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  pointer-events: none;
  z-index: 2;
}

.mousepad-circuits-tr .dot-grid {
  display: grid;
  grid-template-columns: repeat(4, 6px);
  grid-template-rows: repeat(5, 6px);
  gap: 8px;
  margin-top: 15px;
  margin-right: 25px;
}

.dot-node {
  width: 6px;
  height: 6px;
  background-color: rgba(129, 140, 248, 0.35);
  border-radius: 50%;
}

.dark-theme .dot-node {
  background-color: rgba(79, 70, 229, 0.45);
}

/* Dot grid & circuits bottom-left */
.mousepad-circuits-bl {
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 320px;
  height: 150px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  pointer-events: none;
  z-index: 2;
}

.mousepad-circuits-bl .dot-grid {
  display: grid;
  grid-template-columns: repeat(4, 6px);
  grid-template-rows: repeat(5, 6px);
  gap: 8px;
  margin-bottom: 25px;
  margin-left: 25px;
}

.circuit-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* The 3D Computer Mouse */
.mousepad-3d-mouse {
  position: absolute;
  width: 50px;
  height: 78px;
  z-index: 999;
  pointer-events: none;
  top: 0;
  left: 0;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.mouse-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #475569 0%, #334155 40%, #1e293b 100%);
  border-radius: 24px;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
  border: 2px solid #64748b;
  position: relative;
}

.dark-theme .mouse-body {
  background: linear-gradient(180deg, #475569 0%, #334155 50%, #1e293b 100%);
  border-color: #64748b;
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.55),
    0 2px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.mouse-buttons {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 48%;
  display: flex;
  border-radius: 22px 22px 0 0;
  overflow: hidden;
}

.mouse-btn-left,
.mouse-btn-right {
  flex: 1;
  background: linear-gradient(180deg, rgba(71, 85, 105, 0.8), rgba(51, 65, 85, 0.6));
  border: none;
  transition: all 0.08s ease;
  position: relative;
}

.mouse-btn-left {
  border-right: 1px solid rgba(100, 116, 139, 0.4);
  border-radius: 20px 0 0 0;
}

.mouse-btn-right {
  border-left: 1px solid rgba(100, 116, 139, 0.4);
  border-radius: 0 20px 0 0;
}

.mouse-btn-left.pressed {
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.8));
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
  transform: scaleY(0.97);
  transform-origin: top;
}

.mouse-btn-right.pressed {
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.8));
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
  transform: scaleY(0.97);
  transform-origin: top;
}

.mouse-wheel-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 32px;
  background-color: rgba(148, 163, 184, 0.5);
  border-radius: 1px;
}

.dark-theme .mouse-wheel-line {
  background-color: rgba(148, 163, 184, 0.4);
}

.mouse-wheel {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 14px;
  background: linear-gradient(180deg, #94a3b8, #64748b);
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
}

.dark-theme .mouse-wheel {
  background: linear-gradient(180deg, #cbd5e1, #94a3b8);
}

.hackathon-app-container .mousepad-grid-wrapper {
  position: relative;
  z-index: 5;
  padding: 60px 40px;
  margin: 0; /* Overrides leaking global margin */
  cursor: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="%232563eb" stroke="white" stroke-width="1.5" /></svg>') 6 6, auto;
}

.hackathon-app-container .mousepad-grid-wrapper .cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 0px;
  justify-items: center;
  align-items: stretch;
}

@media (max-width: 1100px) {
  .hackathon-app-container .mousepad-grid-wrapper {
    padding: 50px 40px;
  }
  .hackathon-app-container .mousepad-grid-wrapper .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hackathon-app-container .mousepad-grid-wrapper {
    padding: 40px 24px;
  }
  .hackathon-app-container .mousepad-grid-wrapper .cards-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .hackathon-app-container .mousepad-container {
    border-radius: 24px;
  }

  .hackathon-app-container .mousepad-accent-tl,
  .hackathon-app-container .mousepad-accent-br {
    width: 120px;
    height: 120px;
  }

  .hackathon-app-container .mousepad-accent-tl .accent-dots {
    top: 25px;
    left: 25px;
    gap: 6px;
  }
  
  .hackathon-app-container .mousepad-3d-mouse {
    display: none !important;
  }
}

`;

export default function HackathonPage() {
    const [darkMode] = useState(false);
    return (
            <Routes>
                <Route path="/" element={
                    <>
                        <style dangerouslySetInnerHTML={{ __html: styles }} />
                        <div className={`hackathon-app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
                            <ScrollToTop />
                            <Homepage />
                        </div>
                    </>
                } />
                <Route path="program/:id" element={<ProgramDetail />} />
            </Routes>
    );
}
