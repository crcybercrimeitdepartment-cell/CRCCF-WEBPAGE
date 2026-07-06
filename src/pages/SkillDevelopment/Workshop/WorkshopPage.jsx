import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
    Search, GraduationCap, Sun, Moon, Heart,
    ShieldAlert, Shield, Network, Monitor, Bug, Atom,
    Database, Smartphone, Cpu, GitBranch, BarChart3,
    Brain, Code, Server, Info, Sparkles, MessageSquareCode,
    Palette, PenTool, Image, Megaphone, Globe, Share2,
    FileText, Briefcase, TrendingUp, Lightbulb, Gavel,
    Lock, BookOpen, Cloud, RotateCw, Boxes, Link, Radio,
    HardDrive, CheckSquare, Binary, Eye, Compass, LifeBuoy,
    Target, Scale, Building, DollarSign, Users, Video, Type, Rocket, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mentorshipPrograms } from './WorkshopPageData';
import ComingSoonPage from '../../common/ComingSoonPage';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

export default function WorkshopPage({ darkMode, setDarkMode }) {
    return (
        <Routes>
            <Route path="/" element={
                <div className={`workshop-app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
                    <ScrollToTop />
                    <WorkshopPageInner darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            } />
            <Route path="program/:id" element={
                <>
                    <ScrollToTop />
                    <DataPage darkMode={darkMode} setDarkMode={setDarkMode} />
                </>
            } />
        </Routes>
    );
}

// ==========================================
// DATA PAGE (PROGRAM DETAIL)
// ==========================================
function DataPage({ darkMode, setDarkMode }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const program = useMemo(() => {
        return mentorshipPrograms.find(p => p.id === id);
    }, [id]);

    if (!program) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-4">Program Not Found</h2>
                <p className="text-[var(--text-main)] mb-6">The program you are looking for does not exist or has been moved.</p>
                <button 
                    className="bg-[var(--accent-gradient)] border-transparent text-white py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-200"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return <ComingSoonPage />;
}

// ==========================================
// TITLE PARSING UTILITY
// ==========================================
const formatTitle = (title) => {
    let parenText = "";
    const parenMatch = title.match(/\(([^)]+)\)/);
    if (parenMatch) {
        parenText = `(${parenMatch[1]})`;
    }
    let mainName = title
        .replace(/\s*\([^)]+\)/g, "")
        .replace(/\s*(Course|Program|Workshop)\s*/gi, "")
        .trim();
    return { mainName, parenText };
};

// ==========================================
// RACK ICON MAPPING
// ==========================================
const getWorkshopIcon = (id, iconClass) => {
    switch (id) {
        case "ethical-security-workshop": return <ShieldAlert className={iconClass} />;
        case "cybersecurity-essentials-workshop": return <Shield className={iconClass} />;
        case "network-security-workshop": return <Network className={iconClass} />;
        case "soc-analyst-workshop": return <Monitor className={iconClass} />;
        case "malware-analysis-workshop": return <Bug className={iconClass} />;
        case "react-js-workshop": return <Atom className={iconClass} />;
        case "full-stack-development-workshop": return <Database className={iconClass} />;
        case "mobile-app-development-workshop": return <Smartphone className={iconClass} />;
        case "api-development-workshop": return <Cpu className={iconClass} />;
        case "git-github-workshop": return <GitBranch className={iconClass} />;
        case "data-analytics-workshop": return <BarChart3 className={iconClass} />;
        case "data-science-workshop": return <Brain className={iconClass} />;
        case "machine-learning-workshop": return <Cpu className={iconClass} />;
        case "generative-ai-workshop": return <Sparkles className={iconClass} />;
        case "prompt-engineering-workshop": return <MessageSquareCode className={iconClass} />;
        case "uiux-design-workshop": return <Palette className={iconClass} />;
        case "figma-masterclass-workshop": return <PenTool className={iconClass} />;
        case "graphic-design-workshop": return <Image className={iconClass} />;
        case "digital-marketing-workshop": return <Megaphone className={iconClass} />;
        case "seo-workshop": return <Globe className={iconClass} />;
        case "social-media-marketing-workshop": return <Share2 className={iconClass} />;
        case "content-marketing-workshop": return <FileText className={iconClass} />;
        case "product-management-workshop": return <Briefcase className={iconClass} />;
        case "business-development-workshop": return <TrendingUp className={iconClass} />;
        case "entrepreneurship-workshop": return <Lightbulb className={iconClass} />;
        case "cyber-law-workshop": return <Gavel className={iconClass} />;
        case "digital-rights-workshop": return <Lock className={iconClass} />;
        case "legal-research-workshop": return <BookOpen className={iconClass} />;
        case "cloud-computing-workshop": return <Cloud className={iconClass} />;
        case "devops-fundamentals-workshop": return <RotateCw className={iconClass} />;
        case "docker-kubernetes-workshop": return <Boxes className={iconClass} />;
        case "blockchain-development-workshop": return <Link className={iconClass} />;
        case "internet-of-things-workshop": return <Radio className={iconClass} />;
        case "database-management-workshop": return <HardDrive className={iconClass} />;
        case "software-testing-automation-workshop": return <CheckSquare className={iconClass} />;
        case "reverse-engineering-workshop": return <Binary className={iconClass} />;
        case "threat-intelligence-workshop": return <Eye className={iconClass} />;
        case "cyber-forensics-workshop": return <Search className={iconClass} />;
        case "osint-investigation-workshop": return <Compass className={iconClass} />;
        case "incident-response-workshop": return <LifeBuoy className={iconClass} />;
        case "cyber-threat-hunting-workshop": return <Target className={iconClass} />;
        case "corporate-law-workshop": return <Building className={iconClass} />;
        case "criminal-law-workshop": return <Scale className={iconClass} />;
        case "finance-accounting-workshop": return <DollarSign className={iconClass} />;
        case "human-resource-management-workshop": return <Users className={iconClass} />;
        case "journalism-media-production-workshop": return <Video className={iconClass} />;
        case "content-writing-copywriting-workshop": return <Type className={iconClass} />;
        case "startup-innovation-workshop": return <Rocket className={iconClass} />;
        default: return <Server className={iconClass} />;
    }
};

// ==========================================
// SERVER BLADE CARD COMPONENT
// ==========================================
const bladeVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: index * 0.03, duration: 0.25, ease: "easeOut" }
    }),
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.98,
        transition: { duration: 0.15, ease: "easeIn" }
    }
};

function ServerBlade({ program, relativeIndex, onLearnMore }) {
    const { mainName, parenText } = formatTitle(program.title);

    const blinkClasses = [
        "animate-[led-blink-fast_0.8s_infinite]",
        "animate-[led-blink-fast_1.2s_infinite]",
        "animate-[led-blink-fast_2s_infinite]",
        "animate-[led-blink-fast_0.5s_infinite]",
        "animate-pulse"
    ];

    return (
        <motion.div
            className="group relative bg-gradient-to-r from-[#374151] to-[#27303f] border-2 border-[#4b5563] rounded-lg py-2 px-3 h-[58px] cursor-pointer flex items-center transition-colors duration-250 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:from-[#4b5563] hover:to-[#374151] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.2)]"
            variants={bladeVariants}
            custom={relativeIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.02, translateY: -3, borderColor: "rgba(59, 130, 246, 0.8)", boxShadow: "0 0 15px rgba(59, 130, 246, 0.25)" }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
            onClick={() => onLearnMore(program)}
        >
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#3b82f6] rounded-l-md opacity-70 group-hover:bg-[#60a5fa] group-hover:shadow-[0_0_10px_#60a5fa] group-hover:opacity-100 transition-all duration-300"></div>

            {/* Screws */}
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 top-[6px] left-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 top-[6px] right-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 bottom-[6px] left-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 bottom-[6px] right-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>

            <div className="absolute left-[2px] top-[15%] bottom-[15%] w-[3px] rounded-[1px] bg-[linear-gradient(180deg,#475569_0%,#1e293b_50%,#475569_100%)] border border-[#64748b] shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

            <div className="flex items-center justify-between w-full pl-2">
                <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[rgba(59,130,246,0.1)] border-[1.5px] border-[rgba(59,130,246,0.3)] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.05)] transition-all duration-300 group-hover:bg-[rgba(59,130,246,0.2)] group-hover:border-[rgba(59,130,246,0.7)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] group-hover:scale-105">
                        {getWorkshopIcon(program.id, "text-[#3b82f6] w-4 h-4 drop-shadow-[0_0_3px_rgba(59,130,246,0.4)] transition-transform duration-300 group-hover:rotate-12")}
                    </div>
                </div>

                <div className="flex-1 px-4 flex flex-col gap-0.5 min-w-0">
                    <h3 className="font-['Outfit'] text-[0.85rem] font-bold text-[#e2e8f0] leading-tight m-0 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300 group-hover:text-white">{mainName}</h3>
                    <div className="flex items-center gap-2">
                        <span className="font-['Inter'] text-[0.6rem] font-bold uppercase text-[#3b82f6] tracking-[0.5px]">Workshop</span>
                        {parenText && <span className="font-['Inter'] text-[0.6rem] text-[#94a3b8] whitespace-nowrap overflow-hidden text-ellipsis">{parenText}</span>}
                    </div>
                </div>

                <div className="flex items-center ml-2">
                    <span className="font-['Outfit'] text-[0.65rem] font-bold text-[#3b82f6] mr-2 cursor-pointer uppercase tracking-[0.5px] opacity-75 transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap group-hover:text-[#60a5fa] group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
                        Know More &rarr;
                    </span>
                    <div className="flex flex-col gap-1 p-1 bg-[rgba(0,0,0,0.3)] rounded border border-[#1e293b]">
                        <span className={`w-1 h-1 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] ${blinkClasses[0]}`}></span>
                        <span className={`w-1 h-1 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] ${blinkClasses[1]}`}></span>
                        <span className={`w-1 h-1 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] ${blinkClasses[2]}`}></span>
                        <span className={`w-1 h-1 rounded-full bg-[#3b82f6] shadow-[0_0_6px_#3b82f6] ${blinkClasses[3]}`}></span>
                        <span className={`w-1 h-1 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] ${blinkClasses[4]}`}></span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function BlankingPlate({ relativeIndex }) {
    return (
        <div className="relative bg-[linear-gradient(90deg,#1f2937_0%,#111827_100%)] border-2 border-dashed border-[#4b5563] rounded-lg py-2 px-3 h-[58px] flex items-center shadow-none cursor-default">
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 top-[6px] left-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 top-[6px] right-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 bottom-[6px] left-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-[radial-gradient(circle_at_center,#94a3b8,#475569_80%)] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10 bottom-[6px] right-[8px] after:content-[''] after:absolute after:top-1/2 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-[#0f172a] after:-translate-y-1/2 after:rotate-45"></div>

            <div className="absolute left-[2px] top-[15%] bottom-[15%] w-[3px] rounded-[1px] bg-[linear-gradient(180deg,#475569_0%,#1e293b_50%,#475569_100%)] border border-[#64748b] shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

            <div className="flex items-center justify-between w-full pl-2">
                <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[rgba(30,41,59,0.2)] border-[1.5px] border-dashed border-[rgba(71,85,105,0.4)] flex items-center justify-center opacity-40">
                        <Server size={16} className="text-[#475569]" />
                    </div>
                </div>
                <div className="flex-1 px-4 flex items-center gap-4 min-w-0">
                    <div className="flex flex-col gap-[3px] flex-1">
                        <span className="block h-[2px] bg-[#1e293b] rounded-[1px]"></span>
                        <span className="block h-[2px] bg-[#1e293b] rounded-[1px]"></span>
                        <span className="block h-[2px] bg-[#1e293b] rounded-[1px]"></span>
                        <span className="block h-[2px] bg-[#1e293b] rounded-[1px]"></span>
                        <span className="block h-[2px] bg-[#1e293b] rounded-[1px]"></span>
                    </div>
                    <span className="font-['Courier_New',Courier,monospace] text-[0.65rem] text-[#334155] tracking-[0.5px]">SLOT EMPTY // AUX PANEL</span>
                </div>
                <div className="flex items-center ml-2">
                    <div className="flex flex-col gap-1 p-1 bg-[rgba(0,0,0,0.3)] rounded border border-[#1e293b]">
                        <span className="w-1 h-1 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WorkshopPageInner({ darkMode, setDarkMode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();
    const CARDS_PER_PAGE = 12;

    useEffect(() => { setCurrentPage(1); }, [searchQuery]);

    const filteredPrograms = useMemo(() => {
        if (!searchQuery.trim()) return mentorshipPrograms;
        const q = searchQuery.toLowerCase();
        return mentorshipPrograms.filter((program) => program.title.toLowerCase().includes(q));
    }, [searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / CARDS_PER_PAGE));

    const displayedPrograms = useMemo(() => {
        const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
        return filteredPrograms.slice(startIdx, startIdx + CARDS_PER_PAGE);
    }, [filteredPrograms, currentPage]);

    const handleExploreProgram = useCallback((program) => {
        navigate(`program/${program.id}`);
    }, [navigate]);

    const handlePageChange = useCallback((newPage) => {
        if (isTransitioning || newPage < 1 || newPage > totalPages) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setIsTransitioning(false);
            const rackElement = document.getElementById('rack-view-anchor');
            if (rackElement) rackElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }, [isTransitioning, totalPages]);

    return (
        <>
            <style>
            {`
                .workshop-scope {
                    --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                    --text-muted: #64748b;
                    --border-color: #e2e8f0;
                    --accent-color: #3b82f6;
                    --accent-glow: rgba(59, 130, 246, 0.5);
                    --bg-tertiary: #f1f5f9;
                    --bg-secondary: #f8fafc;
                    --text-heading: #0f172a;
                    --text-main: #334155;
                    --font-body: 'Inter', sans-serif;
                }
                @keyframes pageScrollDown {
                    0% { opacity: 0; transform: translateY(-40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes led-blink-fast {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.2; }
                }
            `}
            </style>
            <main className="workshop-scope flex-grow w-full max-w-[1400px] mx-auto px-6 pb-[60px] animate-[pageScrollDown_0.5s_ease-out] py-2">
                <header className="px-6 pt-3 pb-1 text-center max-w-[900px] mx-auto flex flex-col items-center">
                    <h1 className="text-[34px] font-black tracking-[-1px] mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Workshop</h1>
                    <p className="text-[14px] text-[var(--text-muted)] max-w-[680px] mb-4">
                        Develop leadership, communication, management, and workplace skills through expert-led corporate training workshops.
                    </p>
                    <div className="w-full max-w-[650px] mb-2.5">
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 text-[var(--text-muted)]" size={20} />
                            <input
                                type="text"
                                placeholder="Search workshops by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search workshops"
                                className="w-full py-3 pr-20 pl-[54px] font-[var(--font-body)] text-base bg-white border border-[var(--border-color)] rounded-2xl text-[#0f172a] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus:border-[var(--accent-color)] focus:shadow-[0_0_0_4px_var(--accent-glow),0_8px_30px_rgba(0,0,0,0.05)]"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-[18px] bg-[var(--bg-tertiary)] border-none rounded-lg py-1.5 px-3 text-xs font-semibold text-[var(--text-main)] cursor-pointer transition-all duration-200 hover:bg-[var(--border-color)] hover:text-[var(--text-heading)]" aria-label="Clear search">Clear</button>
                            )}
                        </div>
                    </div>
                </header>

                <div id="rack-view-anchor" className="h-[2px]"></div>

                <section className="flex flex-col gap-[30px]">
                    <div className="border-none pt-0 mt-0 flex flex-col gap-7">
                        <div className="">
                            <div className="bg-white border-[8px] border-[#475569] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_50px_rgba(59,130,246,0.1),inset_0_0_40px_rgba(0,0,0,0.75)] p-3 relative z-10 overflow-hidden">
                                <div className="bg-gradient-to-b from-[#334155] to-[#1e293b] border-2 border-[#475569] rounded-[10px] py-2 px-4 mb-3 flex justify-between items-center border-l-4 border-l-[#3b82f6] shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                                    <div className="flex items-center gap-2 font-['Courier_New',Courier,monospace] text-xs text-[#94a3b8] tracking-[1px]">
                                        <span className="w-2 h-2 bg-[#3b82f6] rounded-full shadow-[0_0_8px_#3b82f6] animate-[led-blink-fast_0.8s_infinite]"></span>
                                        <span>RACK_SYS_01 // SECURE_NODE</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5">
                                        <div className="font-['Outfit',sans-serif] font-extrabold text-[1.1rem] text-[#06b6d4] drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] tracking-[2px] uppercase">SYSTEM ACTIVE</div>
                                        <div className="font-['Courier_New',Courier,monospace] text-xs font-bold text-[#10b981] drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">
                                            {filteredPrograms.length} ITEMS DETECTED
                                        </div>
                                    </div>
                                    <div className="flex gap-5 font-['Courier_New',Courier,monospace] text-[0.7rem] text-[#64748b]">
                                        <div className="flex flex-col gap-0.5">
                                            <span>PWR: 98%</span>
                                            <span>TEMP: 24.1C</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 items-end">
                                            <span>FAN: ACTIVE</span>
                                            <span>NET: ONLINE</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 min-h-auto">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentPage + "_" + searchQuery}
                                            className="grid grid-cols-2 gap-y-2 gap-x-3 lg:gap-y-2.5 lg:gap-x-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {displayedPrograms.map((program, idx) => (
                                                <ServerBlade key={program.id} program={program} relativeIndex={idx} onLearnMore={handleExploreProgram} />
                                            ))}
                                            {displayedPrograms.length < CARDS_PER_PAGE &&
                                                Array.from({ length: CARDS_PER_PAGE - displayedPrograms.length }).map((_, idx) => (
                                                    <BlankingPlate key={`blank-${idx}`} relativeIndex={displayedPrograms.length + idx} />
                                                ))
                                            }
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="bg-gradient-to-b from-[#334155] to-[#1e293b] border-2 border-[#475569] rounded-[10px] py-2 px-4 flex justify-between items-center shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                                    <div className="flex items-center gap-5">
                                        <div className="flex gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]"></span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_6px_#3b82f6]"></span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] animate-pulse"></span>
                                        </div>
                                        <div className="bg-[#022c22] border-[1.5px] border-[#064e3b] rounded p-1.5 px-3.5 flex flex-col items-center text-center min-w-[140px] shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]">
                                            <span className="font-['Courier_New',Courier,monospace] text-[0.55rem] text-[#059669] tracking-[0.5px]">SLOTS PAGE</span>
                                            <span className="font-['Courier_New',Courier,monospace] text-[0.9rem] font-extrabold text-[#10b981] drop-shadow-[0_0_6px_rgba(16,185,129,0.7)] tracking-[1px]">{currentPage} OF {totalPages}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-[1.5px] border-[#334155] text-[#94a3b8] font-['Outfit',sans-serif] text-[0.75rem] font-bold tracking-[0.5px] py-2.5 px-4 rounded-md cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:not(:disabled):bg-gradient-to-b hover:not(:disabled):from-[#2563eb] hover:not(:disabled):to-[#1d4ed8] hover:not(:disabled):border-[#3b82f6] hover:not(:disabled):text-white hover:not(:disabled):shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:not(:disabled):-translate-y-px active:not(:disabled):translate-y-px disabled:opacity-25 disabled:cursor-not-allowed disabled:border-[#1e293b]"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1 || isTransitioning}
                                        >
                                            PREV ROW
                                        </button>
                                        <button
                                            className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-[1.5px] border-[#334155] text-[#94a3b8] font-['Outfit',sans-serif] text-[0.75rem] font-bold tracking-[0.5px] py-2.5 px-4 rounded-md cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:not(:disabled):bg-gradient-to-b hover:not(:disabled):from-[#2563eb] hover:not(:disabled):to-[#1d4ed8] hover:not(:disabled):border-[#3b82f6] hover:not(:disabled):text-white hover:not(:disabled):shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:not(:disabled):-translate-y-px active:not(:disabled):translate-y-px disabled:opacity-25 disabled:cursor-not-allowed disabled:border-[#1e293b]"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages || isTransitioning}
                                        >
                                            NEXT ROW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
