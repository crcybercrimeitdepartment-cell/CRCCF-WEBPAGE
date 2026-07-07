import Cloudinary from '../../constants/Cloudinary';
import { playPageTurnSound } from "../../utils/pageTurnSound";

﻿// src/pages/AboutUs/MeaningBehindOurNamePage.jsx
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Import data
import { MeaningBehindOurNamePageData } from '../../data/aboutUs/MeaningBehindOurNamePageData';

/* -------------------------------- Motion -------------------------------- */
const useAnims = () => {
  const shouldReduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduce
        ? { duration: 0 }
        : { duration: 0.25, when: "beforeChildren", staggerChildren: 0.06 },
    },
  };
  const itemUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.28 } },
  };
  return { container, itemUp };
};

/* -------------------------------- Palette -------------------------------- */
const color = {
  rose50: "#FFF1F2",
  rose100: "#FFE4E6",
  rose500: "#F43F5E",
  rose600: "#E11D48",
  rose900: "#881337",
  amber50: "#FFFBEB",
  amber400: "#FBBF24",
  amber500: "#F59E0B",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
  indigo500: "#6366F1",
};

/* -------------------------- HERO: SVG Overlays -------------------------- */
const MeaningBehindOurNameHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="idGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color.slate700} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="idGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.rose600} />
          <stop offset="100%" stopColor={color.amber500} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#idGrid)" />

      <g transform="translate(150, 150)">
        <motion.circle
          r="80"
          fill="url(#idGrad)"
          opacity="0.9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Abstract Eye shape for "Insight / Meaning" */}
        <motion.path
          d="M -55 0 C -25 -45 25 -45 55 0 C 25 45 -25 45 -55 0 Z"
          fill={color.white}
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        />
        <motion.circle
          cx="0" cy="0" r="22" 
          fill={color.slate900}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        />
        <motion.circle
          cx="5" cy="-5" r="6" 
          fill={color.white}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3 }}
        />
      </g>
    </g>
  );
};

const VideoHeroMeaningBehindOurName = ({ src = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Meaning Behind Our Name Hero";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-label={title} className="w-full h-auto">
        <rect width="100%" height="100%" fill={color.slate900} rx="20" />
        <MeaningBehindOurNameHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <mask id="idHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <MeaningBehindOurNameHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color.slate900} rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#idHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      </foreignObject>
      <MeaningBehindOurNameHeroOverlay />
    </svg>
  );
};

/* -------------------------- SVG Components Mapper -------------------------- */
const ResearchSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ShieldSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const BrainSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);
const DocumentSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const LawSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 16l3-8 3 8c0 2-3 2-6 0Z" />
    <path d="M2 16l3-8 3 8c0 2-3 2-6 0Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);
const CloudSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
const DefaultSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const getSvgComponent = (item) => {
  const text = (item.heading).toLowerCase();
  if (text.includes("research") || text.includes("review") || text.includes("reconnaissance") || text.includes("analysis")) return ResearchSVG;
  if (text.includes("response") || text.includes("rescue") || text.includes("recovery") || text.includes("risk")) return ShieldSVG;
  if (text.includes("cognition") || text.includes("reasoning") || text.includes("rationale") || text.includes("reflection") || text.includes("rationality") || text.includes("check")) return BrainSVG;
  if (text.includes("report") || text.includes("record") || text.includes("roadmap")) return DocumentSVG;
  if (text.includes("regulation") || text.includes("rights")) return LawSVG;
  if (text.includes("cloud")) return CloudSVG;
  return DefaultSVG;
};

/* ------------------------------ InsightCard (Singular) ------------------------------ */
const InsightCard = ({ allPages }) => {
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

  const handleOpen = (e) => {
    e.stopPropagation();
    playPageTurnSound(); setIsOpen(prev => !prev);
  };

  const handleMouseEnter = () => { if (isDesktop()) setIsOpen(true); };
  const handleMouseLeave = () => {
    if (isDesktop() && !showScrubber) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <motion.article
        className={`
          relative bg-white border border-slate-200 rounded-[24px] 
          h-[360px] sm:h-[440px] md:h-[520px] w-full shadow-[0_4px_30px_rgba(0,0,0,0.06)] 
          [transform-style:preserve-3d] [perspective:2000px] 
          flex items-center justify-center transition-all duration-300 
          ${isOpen ? 'shadow-[0_30px_70px_rgba(0,0,0,0.15)]' : 'hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)]'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pages Stack */}
        {allPages.map((page, pageIdx) => {
          const isVisible = Math.abs(pageIdx - activePageIndex) <= 2 || pageIdx < activePageIndex;
          if (!isVisible) return null;

          const isFlipped = activePageIndex > pageIdx;
          const PageSVG = getSvgComponent(page);

          return (
            <div
              key={pageIdx}
              style={{ zIndex: 100 - pageIdx }}
              className={`
                absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col w-full h-full justify-start pl-6 sm:pl-8 md:pl-10 lg:pl-14 rounded-[24px] transition-all duration-[1s] 
                ease-[cubic-bezier(0.645,0.045,0.355,1)]
                [transform-origin:left_center] [backface-visibility:hidden]
                will-change-transform will-change-opacity
                ${pageIdx % 2 === 0 ? 'bg-[#FFF9F9]' : 'bg-[#FFFBFB]'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-50">
                  <PageSVG className="w-7 h-7 text-rose-600" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-rose-600">
                    {page.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">Meaning Behind Our Name Profile {pageIdx + 1} of {allPages.length}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="text-[16px] text-slate-600 leading-relaxed font-medium italic">
                  {page.content.split(/\n+/).filter(p => p.trim() !== "").map((text, idx) => {
                    if (text.includes("CR CYBER CRIME FOUNDATION") && !text.startsWith("Our Purpose")) {
                      const formattedText = text.replace("FOUNDATIONNon-Profit", "FOUNDATION - Non-Profit");
                      return <p key={idx} className="mb-4 text-[17px] font-bold text-slate-800 not-italic">{formattedText}</p>;
                    }
                    const match = text.match(/^(Meaning of [A-Za-z]+|Our Purpose):(.*)/);
                    if (match) {
                      return (
                        <p key={idx} className="mb-4">
                          <strong className="text-slate-800 font-bold not-italic">{match[1]}: </strong>{match[2].trim()}
                        </p>
                      );
                    }
                    return <p key={idx} className="mb-4">{text}</p>;
                  })}
                </div>
              </div>

              <div className="pt-8 mt-auto border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {pageIdx > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-rose-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    {pageIdx < allPages.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx + 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-rose-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    )}
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* COVER */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-[24px] cursor-pointer 
            transition-all duration-[1.3s] ease-[cubic-bezier(0.645,0.045,0.355,1)] 
            [transform-origin:left_center] shadow-[6px_0_30px_rgba(0,0,0,0.12)] 
            flex flex-col items-center justify-center z-[110] p-4 sm:p-6 md:p-8 lg:p-12 text-center 
            [backface-visibility:hidden] bg-white will-change-transform
            ${isOpen ? '[transform:rotateY(-145deg)_scale(0.95)_translateX(-30px)] opacity-0 pointer-events-none' : ''}
          `}
          style={{
            background: `linear-gradient(135deg, #ffffff, #FFF1F2)`,
            borderLeft: `8px solid #E11D48`
          }}
          onClick={handleOpen}
        >
          <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] flex items-center justify-center mb-4 sm:mb-6 lg:mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain filter drop-shadow-sm" />
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          
          <h3 className="text-slate-900 leading-[1.1] mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl lg:text-[32px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Meaning Behind Our Name Chronicles
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Understanding the 24 Pillars of our Foundation</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-rose-600">
            <span>Explore our Core</span>
            <ArrowRight size={18} className="animate-pulse" />
          </div>
        </div>
      </motion.article>

      {/* Scrubber */}
      <div className={`transition-all duration-500 ease-out mt-4 ${isOpen || showScrubber ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-[16px] sm:rounded-[24px] border border-slate-100">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-700 mt-1 truncate max-w-[180px] sm:max-w-[300px]">{allPages[activePageIndex].heading}</span>
            </div>
            <span className="flex-shrink-0 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full bg-rose-600 text-white text-[9px] sm:text-[11px] font-black tabular-nums shadow-lg shadow-rose-200">
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
                <span>{allPages[previewPageIndex].heading.slice(0, 35)}{allPages[previewPageIndex].heading.length > 35 ? '...' : ''}</span>
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
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-rose-600 hover:accent-rose-700 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Main Page ------------------------------ */
export default function MeaningBehindOurNamePage() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="bg-[#FBFDFF] min-h-screen overflow-x-hidden">
      <motion.section
        variants={container} initial="hidden" animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16"
      >
        

        <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6">
              WHAT'S IN A NAME
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              The Meaning Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Our Name</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Every facet of CRCCF serves a unique purpose. Explore the 24 foundational pillars that define the core meanings, values, and vision behind our name.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-rose-100 via-white to-amber-100 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-gray-200 bg-white p-5 shadow-2xl overflow-hidden">
              <VideoHeroMeaningBehindOurName src="https://cdn.coverr.co/videos/coverr-a-compassionate-doctor-treating-a-patient-4581/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Meaning Behind Our Name <span className="text-rose-600">Chronicles</span></h2>
            <p className="text-slate-500 text-lg font-medium">Dive into 24 sections detailing the core meanings and purposes behind our name.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={MeaningBehindOurNamePageData} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
