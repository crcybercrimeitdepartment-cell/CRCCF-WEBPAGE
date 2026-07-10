import { playPageTurnSound } from "../../../utils/pageTurnSound";
import Cloudinary from "../../../constants/Cloudinary";

﻿import React, { useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cyberAwarenessData } from './cyberawarenessdata';

/* -------------------------------- Utils & Parsing -------------------------------- */
const convertNumberToBullet = (content) => {
  if (!content) return "";
  return content.replace(/^\d+\.\s/gm, '• ');
};

const parseCyberData = (rawData) => {
  if (!rawData) return [];
  const sections = rawData.split(/^##\s\*\*/gm);
  let allPages = [];
  
  sections.forEach((section, index) => {
    if (index === 0) return;
    
    const lines = section.trim().split('\n');
    let titleLine = lines[0].replace(/\*\*/g, '').trim();
    titleLine = titleLine.replace(/^Section\s\d+:\s*/i, '');
    titleLine = titleLine.replace(/^\d+\.\s*/, '');
    
    let content = lines.slice(1).join('\n').trim();
    content = content.replace(/\*\*Description:\*\*\s*\n?/gi, '');
    content = content.replace(/\*\*Final Note:\*\*\s*\n?/gi, '');
    content = content.replace(/\*\*Conclusion:\*\*\s*\n?/gi, '');
    
    allPages.push({ title: titleLine, content });
  });
  
  return allPages;
};

/* -------------------------------- Sub-Components -------------------------------- */
const SVG_Shield = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.5, type: "spring" }} d="M9 12l2 2 4-4" />
  </svg>
);

const SVG_Network = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.circle cx={12} cy={12} r={3} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
    <motion.circle cx={5} cy={5} r={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
    <motion.circle cx={19} cy={5} r={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
    <motion.circle cx={5} cy={19} r={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
    <motion.circle cx={19} cy={19} r={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
    <motion.path d="M6.5 6.5l4 4M17.5 6.5l-4 4M6.5 17.5l4-4M17.5 17.5l-4-4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
  </svg>
);

const SVG_Data = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.ellipse cx={12} cy={5} rx={9} ry={3} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
    <motion.path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
    <motion.path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
  </svg>
);

const SVG_Eye = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
    <motion.circle cx={12} cy={12} r={3} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
  </svg>
);

const SVG_Device = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.rect x={5} y={2} width={14} height={20} rx={2} ry={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
    <motion.line x1="12" y1="18" x2="12.01" y2="18" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
  </svg>
);

const SVG_Document = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
    <motion.polyline points="14 2 14 8 20 8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
    <motion.line x1="16" y1="13" x2="8" y2="13" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />
    <motion.line x1="16" y1="17" x2="8" y2="17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.3 }} />
    <motion.polyline points="10 9 9 9 8 9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
  </svg>
);

function BookSVG({ keyword = "", className = "" }) {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes("protect") || lowerKeyword.includes("secur") || lowerKeyword.includes("safe") || lowerKeyword.includes("scam") || lowerKeyword.includes("fraud")) return <SVG_Shield className={className} />;
  if (lowerKeyword.includes("network") || lowerKeyword.includes("internet") || lowerKeyword.includes("connection") || lowerKeyword.includes("wifi")) return <SVG_Network className={className} />;
  if (lowerKeyword.includes("data") || lowerKeyword.includes("privacy") || lowerKeyword.includes("backup") || lowerKeyword.includes("cloud") || lowerKeyword.includes("identity")) return <SVG_Data className={className} />;
  if (lowerKeyword.includes("aware") || lowerKeyword.includes("identify") || lowerKeyword.includes("monitoring") || lowerKeyword.includes("watch")) return <SVG_Eye className={className} />;
  if (lowerKeyword.includes("device") || lowerKeyword.includes("mobile") || lowerKeyword.includes("computer") || lowerKeyword.includes("laptop") || lowerKeyword.includes("app")) return <SVG_Device className={className} />;
  if (lowerKeyword.includes("document") || lowerKeyword.includes("legal") || lowerKeyword.includes("report") || lowerKeyword.includes("policy") || lowerKeyword.includes("law")) return <SVG_Document className={className} />;
  
  return <SVG_Shield className={className} />;
}

function PageContent({ content, isIntroSection = false }) {
  let displayContent = content;
  if (isIntroSection) {
    displayContent = convertNumberToBullet(displayContent);
  }

  const renderContent = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const innerText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-slate-800">{innerText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-thumb]:rounded-full pb-4 pointer-events-auto">
      <div className="text-[16px] text-slate-600 leading-[1.8] font-medium whitespace-pre-line text-justify tracking-wide">
        {renderContent(displayContent)}
      </div>
    </div>
  );
}

function BookPage({ 
  page, 
  pageIdx, 
  activePageIndex, 
  totalPages, 
  onNext, 
  onBack
}) {
  const isFlipped = activePageIndex > pageIdx;
  const displayTitle = page.title || page.pageTitle || "Page";
  const numberedTitle = `${pageIdx + 1}. ${displayTitle}`;
  
  return (
    <div
      style={{ zIndex: totalPages - pageIdx }}
      className={`
        absolute inset-0 p-10 flex flex-col w-full h-full justify-start 
        pl-14 rounded-[24px] transition-all duration-[1s] 
        ease-[cubic-bezier(0.645,0.045,0.355,1)]
        [transform-origin:left_center] [backface-visibility:hidden]
        will-change-transform will-change-opacity
        ${pageIdx % 2 === 0 ? 'bg-[#FFFDF9]' : 'bg-[#FFFEFB]'}
        ${isFlipped
          ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
          : pageIdx === activePageIndex
            ? '[transform:rotateY(0deg)_scale(1)_translateX(0px)] opacity-100'
            : '[transform:rotateY(0deg)_scale(1)_translateX(32px)] opacity-0 pointer-events-none'
        }
      `}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50 shrink-0">
          <BookSVG keyword={displayTitle} className="w-7 h-7 text-amber-600" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-amber-600">
            {numberedTitle}
          </h4>
          <span className="text-[11px] font-bold text-slate-400 mt-1">
            {pageIdx + 1} / {totalPages}
          </span>
        </div>
      </div>

      <PageContent content={page.content} isIntroSection={pageIdx < 22} />

      <div className="pt-8 mt-auto border-t border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {pageIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); onBack(); }}
                className="text-[12px] font-black text-amber-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-5">
            {pageIdx < totalPages - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="text-[12px] font-black text-amber-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
              >
                Next <ArrowRight size={16} />
              </button>
            )}
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CyberBook({ allPages, bookTitle = "Cyber Security", bookSubtitle = "Our Strategic Guide", coverLabel = "Read The Guide" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [previewPageIndex, setPreviewPageIndex] = useState(null);
  const [showScrubber, setShowScrubber] = useState(false);
  const scrubberTimer = useRef(null);

  const keepScrubberVisible = () => {
    setShowScrubber(true);
    if (scrubberTimer.current) clearTimeout(scrubberTimer.current);
    scrubberTimer.current = setTimeout(() => setShowScrubber(false), 3000);
  };

  const isDesktop = () => window.innerWidth > 1024;
  const handleOpen = (e) => { e.stopPropagation(); playPageTurnSound(); setIsOpen(prev => !prev); };
  const handleMouseEnter = () => { if (isDesktop()) setIsOpen(true); };
  const handleMouseLeave = () => { if (isDesktop() && !showScrubber) setIsOpen(false); };

  if (!allPages || allPages.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <motion.article
        className={`
          relative bg-white border border-slate-200 rounded-[24px] 
          h-[500px] w-full shadow-[0_4px_30px_rgba(0,0,0,0.06)] 
          [transform-style:preserve-3d] [perspective:2000px] 
          flex items-center justify-center transition-all duration-300 
          ${isOpen ? 'shadow-[0_30px_70px_rgba(0,0,0,0.15)]' : 'hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)]'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allPages.map((page, pageIdx) => {
          const isVisible = Math.abs(pageIdx - activePageIndex) <= 3 || pageIdx < activePageIndex;
          if (!isVisible) return null;

          return (
            <BookPage 
              key={pageIdx}
              page={page}
              pageIdx={pageIdx}
              activePageIndex={activePageIndex}
              totalPages={allPages.length}
              onNext={() => { playPageTurnSound(); setActivePageIndex(pageIdx + 1); keepScrubberVisible(); }}
              onBack={() => { playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }}
            />
          );
        })}

        <div
          className={`
            absolute inset-0 w-full h-full rounded-[24px] cursor-pointer 
            transition-all duration-[1.3s] ease-[cubic-bezier(0.645,0.045,0.355,1)] 
            [transform-origin:left_center] shadow-[6px_0_30px_rgba(0,0,0,0.12)] 
            flex flex-col items-center justify-center p-12 text-center 
            [backface-visibility:hidden] bg-white will-change-transform
            ${isOpen ? '[transform:rotateY(-145deg)_scale(0.95)_translateX(-30px)] opacity-0 pointer-events-none' : ''}
          `}
          style={{ background: `linear-gradient(135deg, #ffffff, #FFFBEB)`, borderLeft: `8px solid #D97706`, zIndex: allPages.length + 10 }}
          onClick={handleOpen}
        >
          <div className="w-[100px] h-[100px] rounded-[28px] flex items-center justify-center mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain filter drop-shadow-sm" />
          </div>
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          <h3 className="text-slate-900 leading-[1.1] mb-8 text-[32px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {bookTitle}
          </h3>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">{bookSubtitle}</p>
          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-amber-600">
            <span>{coverLabel}</span>
            <ArrowRight size={18} className="animate-pulse" />
          </div>
        </div>
      </motion.article>

      <div className={`transition-all duration-500 ease-out mt-4 ${isOpen || showScrubber ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-[24px] border border-slate-100">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-700 mt-1 truncate max-w-[180px] sm:max-w-[300px]">
                {allPages[activePageIndex]?.title || allPages[activePageIndex]?.pageTitle || "Page"}
              </span>
            </div>
            <span className="flex-shrink-0 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full bg-indigo-600 text-white text-[9px] sm:text-[11px] font-black tabular-nums shadow-lg shadow-indigo-200">
              {activePageIndex + 1} / {allPages.length}
            </span>
          </div>
          <div className="relative pt-2">
            {previewPageIndex !== null && (
              <motion.div
                className="absolute -top-10 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg whitespace-nowrap pointer-events-none z-20 shadow-2xl flex items-center gap-2"
                animate={{
                  left: `${(previewPageIndex / (allPages.length - 1)) * 100}%`,
                  x: "-50%"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              >
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">{previewPageIndex + 1}</span>
                <span>{allPages[previewPageIndex]?.title?.slice(0, 35)}{(allPages[previewPageIndex]?.title?.length > 35) ? '...' : ''}</span>
              </motion.div>
            )}
            <input
              type="range" min="0" max={allPages.length - 1} value={activePageIndex}
              onChange={(e) => { playPageTurnSound(); setActivePageIndex(parseInt(e.target.value)); keepScrubberVisible(); }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = Math.min(Math.max(x / rect.width, 0), 1);
                setPreviewPageIndex(Math.round(percent * (allPages.length - 1)));
              }}
              onMouseLeave={() => setPreviewPageIndex(null)}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}





/* -------------------------------- Main Page -------------------------------- */
const useAnims = () => {
  const shouldReduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: shouldReduce ? { duration: 0 } : { duration: 0.25, when: "beforeChildren", staggerChildren: 0.06 } },
  };
  const itemUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.28 } },
  };
  return { container, itemUp };
};

const CyberHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="cyberGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1E293B" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="cyberGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#cyberGrid)" />

      <g transform="translate(150, 150)">
        <motion.path
          d="M0 -80 L 70 0 L 0 80 L -70 0 Z"
          fill="url(#cyberGrad)"
          opacity={0.9}
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.circle
          r={25}
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.path
          d="M-10 0 H 10 M 0 -10 V 10"
          stroke="#3730A3"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </g>
    </g>
  );
};

const VideoHeroCyber = ({ src = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Cyber Security Hero";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-label={title} className="w-full h-auto">
        <rect width="100%" height="100%" fill="#0F172A" rx="20" />
        <CyberHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <mask id="cyberHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <CyberHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="#0F172A" rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#cyberHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      </foreignObject>
      <CyberHeroOverlay />
    </svg>
  );
};

export default function CyberAwareness() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Parse data directly inside the component
  const allPages = useMemo(() => parseCyberData(cyberAwarenessData), []);
  const bookInfo = useMemo(() => {
    if (!cyberAwarenessData) return { title: "Cyber Awareness Services", description: "" };
    const titleMatch = cyberAwarenessData.match(/Title:-\s*(.+)/);
    const descMatch = cyberAwarenessData.match(/Description:-\s*\n([\s\S]+?)\n\n## \*\*/);
    return {
      title: titleMatch ? titleMatch[1].trim() : "Cyber Awareness Services",
      description: descMatch ? descMatch[1].trim() : ""
    };
  }, []);

  return (
    <div className="bg-[#FBFDFF] min-h-screen">
      <motion.section id="top" variants={container} initial="hidden" animate="show" className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
        

        <div ref={heroRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24" style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              Digital Safety
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              {bookInfo.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl whitespace-pre-line">
              {bookInfo.description}
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-indigo-100 via-white to-purple-100 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-gray-200 bg-white p-5 shadow-2xl overflow-hidden">
               <VideoHeroCyber src="https://cdn.coverr.co/videos/coverr-typing-on-laptop-2720/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Cyber <span className="text-indigo-600">Awareness Services</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip the cover to explore our 122-page strategic cyber safety guide.</p>
          </div>

          <div className="py-6">
            <CyberBook allPages={allPages} bookTitle="Cyber Awareness" bookSubtitle="Our Strategic Guide" coverLabel="Read The Guide" />
          </div>
        </div>

      </motion.section>
    </div>
  );
}
