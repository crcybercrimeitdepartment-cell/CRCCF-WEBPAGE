import { playPageTurnSound } from "../../utils/pageTurnSound";

﻿// src/pages/AboutUs/Instruction.jsx
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldAlert, BookOpen, Fingerprint, Lock, ShieldCheck, HelpCircle } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Import data
import { instructionData } from '../../data/aboutUs/instructionData';

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
  orange50: "#FFF7ED",
  orange100: "#FFEDD5",
  orange500: "#F97316",
  orange600: "#EA580C",
  orange900: "#7C2D12",
  amber50: "#FFFBEB",
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
  red600: "#DC2626",
};

/* -------------------------- HERO: SVG Overlays -------------------------- */
const InstructionHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="insGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color.slate700} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="insGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.orange600} />
          <stop offset="100%" stopColor={color.amber500} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#insGrid)" />

      <g transform="translate(150, 150)">
        <motion.path
          d="M0 -80 L 80 60 L -80 60 Z"
          fill="url(#insGrad)"
          opacity="0.9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.text
          x="0" y="30"
          textAnchor="middle"
          fill={color.white}
          fontSize="48"
          fontWeight="900"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 30 }}
          transition={{ delay: 0.5 }}
        >
          !
        </motion.text>
      </g>
    </g>
  );
};

const VideoHeroInstruction = ({ src = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Instruction Hero";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-label={title} className="w-full h-auto">
        <rect width="100%" height="100%" fill={color.slate900} rx="20" />
        <InstructionHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <mask id="insHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <InstructionHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color.slate900} rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#insHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      </foreignObject>
      <InstructionHeroOverlay />
    </svg>
  );
};

/* -------------------------- SVG Components Mapper -------------------------- */
const getSvgComponent = (item) => {
  const text = (item.heading + " " + item.content).toLowerCase();
  if (text.includes("identity") || text.includes("verification") || text.includes("id")) return Fingerprint;
  if (text.includes("payment") || text.includes("fraud") || text.includes("transaction")) return ShieldAlert;
  if (text.includes("policy") || text.includes("protocol") || text.includes("manual")) return BookOpen;
  if (text.includes("security") || text.includes("access") || text.includes("lock")) return Lock;
  if (text.includes("justice") || text.includes("legal") || text.includes("rights")) return ShieldCheck;
  return HelpCircle;
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
          const PageIcon = getSvgComponent(page);

          return (
            <div
              key={pageIdx}
              style={{ zIndex: 100 - pageIdx }}
              className={`
                absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col w-full h-full justify-start pl-6 sm:pl-8 md:pl-10 lg:pl-14 rounded-[24px] transition-all duration-[1s] 
                ease-[cubic-bezier(0.645,0.045,0.355,1)]
                [transform-origin:left_center] [backface-visibility:hidden]
                will-change-transform will-change-opacity
                ${pageIdx % 2 === 0 ? 'bg-[#FFFBF9]' : 'bg-[#FFFEFB]'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-50">
                  <PageIcon className="w-7 h-7 text-orange-600" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-orange-600">
                    {page.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">Guideline {pageIdx + 1} of {allPages.length}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-[16px] text-slate-600 leading-relaxed font-medium italic whitespace-pre-line">{page.content}</p>
                {page.tagline && (
                   <div className="mt-6 p-4 rounded-xl bg-orange-50/50 border border-orange-100 italic text-[14px] text-orange-700 font-bold">
                     <span className="mr-2 not-italic">️ Note:</span> {page.tagline}
                   </div>
                )}
              </div>

              <div className="pt-8 mt-auto border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {pageIdx > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-orange-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    {pageIdx < allPages.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx + 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-orange-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    )}
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.4)]" />
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
            background: `linear-gradient(135deg, #ffffff, #FFF7ED)`,
            borderLeft: `8px solid #EA580C`
          }}
          onClick={handleOpen}
        >
          <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] flex items-center justify-center mb-4 sm:mb-6 lg:mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src="https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png" alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain filter drop-shadow-sm" />
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          
          <h3 className="text-slate-900 leading-[1.1] mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl lg:text-[32px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Protocol Chronicles
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Official Instructions & Safety Directives</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-orange-600">
            <span>Read the Protocols</span>
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
            <span className="flex-shrink-0 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full bg-orange-600 text-white text-[9px] sm:text-[11px] font-black tabular-nums shadow-lg shadow-orange-200">
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
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Main Page ------------------------------ */
export default function Instruction() {
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
            <div className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6">
              OFFICIAL GUIDELINES
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Safety Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Strict Protocol</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Knowledge is your best defense. Explore our 37 official instructions regarding identity safety, payment fraud prevention, and operational protocols.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-orange-100 via-white to-amber-100 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-gray-200 bg-white p-5 shadow-2xl overflow-hidden">
              <VideoHeroInstruction src="https://cdn.coverr.co/videos/coverr-typing-code-on-a-computer-3776/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Protocol <span className="text-orange-600">Chronicles</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip the cover to read the 37 essential safety instructions for all digital citizens.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={instructionData} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}