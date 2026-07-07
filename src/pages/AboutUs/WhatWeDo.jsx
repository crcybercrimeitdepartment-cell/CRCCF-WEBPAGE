import Cloudinary from '../../constants/Cloudinary';
import { playPageTurnSound } from "../../utils/pageTurnSound";

// src/pages/AboutUs/WhatWeDo.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Activity, Users, Globe, Lock } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

// Import data
import { whatWeDoData } from '../../data/aboutUs/whatWeDoData';

/* -------------------------------- Motion -------------------------------- */
const useAnims = () => {
  const shouldReduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduce
        ? { duration: 0 }
        : { duration: 0.25, when: "beforeChildren", staggerChildren: 0.05 },
    },
  };
  const itemUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.25 } },
  };
  return { container, itemUp };
};

/* -------------------------------- Palette -------------------------------- */
const color = {
  blue50: "#EFF6FF",
  blue100: "#DBEAFE",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  blue900: "#1E3A8A",
  cyan50: "#ECFEFF",
  cyan500: "#06B6D4",
  cyan600: "#0891B2",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
};

/* -------------------------- HERO: SVG Overlays -------------------------- */
const ActionHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="actionGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color.blue600} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="actionGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.blue600} />
          <stop offset="100%" stopColor={color.cyan500} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#actionGrid)" />

      <g transform="translate(150, 150)">
        {/* Animated Radar */}
        <circle r="80" fill="url(#actionGrad)" opacity="0.1" />
        <motion.circle
          r="80" stroke={color.blue500} strokeWidth="1" fill="none"
          animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle r="40" fill="none" stroke={color.cyan500} strokeWidth="2" />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <line x1="0" y1="0" x2="80" y2="0" stroke={color.blue600} strokeWidth="2" opacity="0.5" />
          <circle cx="80" cy="0" r="4" fill={color.blue600} />
        </motion.g>
      </g>
    </g>
  );
};

const VideoHeroAction = ({ src = "" }) => {
  const shouldReduce = useReducedMotion();

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" className="w-full h-auto">
        <rect width="100%" height="100%" fill={color.blue900} rx="20" />
        <ActionHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block">
      <defs>
        <mask id="actionHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <ActionHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color.slate900} rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#actionHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      </foreignObject>
      <ActionHeroOverlay />
    </svg>
  );
};

/* -------------------------- SVG Components Mapper -------------------------- */
const getSvgComponent = (item) => {
  const text = (item.heading + " " + item.content).toLowerCase();
  if (text.includes("victim") || text.includes("justice")) return Users;
  if (text.includes("forensic") || text.includes("investigation")) return Activity;
  if (text.includes("legal") || text.includes("law")) return ShieldCheck;
  if (text.includes("education") || text.includes("literacy")) return Globe;
  if (text.includes("corporate") || text.includes("audit")) return Lock;
  if (text.includes("innovation") || text.includes("ai")) return Zap;
  return ShieldCheck;
};

/* ------------------------------ InsightCard (Singular) ------------------------------ */
const InsightCard = ({ allPages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [previewPageIndex, setPreviewPageIndex] = useState(null);
  const [showScrubber, setShowScrubber] = useState(false);
  const scrubberTimer = useRef(null);

  // Cleanup timer on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (scrubberTimer.current) clearTimeout(scrubberTimer.current);
    };
  }, []);

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
          // Render only a small window around the active page to keep DOM lightweight
          const isVisible = Math.abs(pageIdx - activePageIndex) <= 2;
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
                ${pageIdx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 border border-blue-100">
                  <PageIcon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-slate-800">
                    {page.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-blue-400 mt-1">Operational Initiative {pageIdx + 1}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-blue-100 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{page.content}</p>
                {page.tagline && (
                   <div className="mt-6 p-4 rounded-xl bg-cyan-50 border border-cyan-100 italic text-[14px] text-cyan-800 font-bold">
                     <span className="mr-2 not-italic">⚡ Mission:</span> {page.tagline}
                   </div>
                )}
              </div>

              <div className="pt-8 mt-auto border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {pageIdx > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-blue-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    {pageIdx < allPages.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx + 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-blue-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    )}
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
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
            background: `linear-gradient(135deg, #ffffff, #EFF6FF)`,
            borderLeft: `8px solid #2563EB`
          }}
          onClick={handleOpen}
        >
          <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] flex items-center justify-center mb-4 sm:mb-6 lg:mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4 border border-blue-50">
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain" />
          </div>

          <h3 className="text-slate-900 leading-[1.1] mb-8 text-[28px] font-black tracking-tight">
            Operational <span className="text-blue-600">Blueprint</span>
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Victim Justice & Forensic Strategy</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-blue-600">
            <span>Explore Action Plan</span>
            <ArrowRight size={18} className="animate-pulse" />
          </div>
        </div>
      </motion.article>

      {/* Scrubber */}
      <div className={`transition-all duration-500 ease-out mt-4 ${isOpen || showScrubber ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-blue-100 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-700 mt-1 truncate max-w-[180px] sm:max-w-[300px]">{allPages[activePageIndex].heading}</span>
            </div>
            <span className="flex-shrink-0 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-600 text-white text-[9px] sm:text-[11px] font-black tabular-nums shadow-lg">
              {activePageIndex + 1} / {allPages.length}
            </span>
          </div>
          <div className="relative pt-2">
            {previewPageIndex !== null && (
              <motion.div
                className="absolute -top-10 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg whitespace-nowrap pointer-events-none z-20 shadow-2xl flex items-center gap-2"
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
              className="w-full h-2 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Main Page ------------------------------ */
export default function WhatWeDo() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden">
      <motion.section
        variants={container} initial="hidden" animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16"
      >
        

        <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 border border-blue-100 shadow-sm">
              ACTION & IMPACT
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Our Actions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Your Security</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              From victim support to high-tech forensics, legal guidance to corporate compliance. We provide comprehensive solutions for a safer digital world.
            </p>
          </motion.div>

          <motion.div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-cyan-50 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-slate-200 bg-white p-4 shadow-2xl overflow-hidden">
              <VideoHeroAction src="https://cdn.coverr.co/videos/coverr-network-server-room-2792/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-200">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Deployment <span className="text-blue-600">Chronicle</span></h2>
            <p className="text-slate-500 text-lg font-medium">Explore our multi-dimensional action plans across technical, legal, and social domains.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={whatWeDoData} />
          </div>
        </div>

        {/* Global Impact Shield */}
        <motion.div variants={itemUp} className="mt-16 text-center">
          <div className="bg-slate-900 rounded-[40px] p-12 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
             <Globe className="w-16 h-16 text-blue-400 mx-auto mb-8 animate-pulse" />
             <h3 className="text-2xl md:text-3xl font-black text-white mb-6">Securing the Global Frontier</h3>
             <p className="text-slate-400 text-lg mb-0 max-w-2xl mx-auto italic leading-relaxed">
               "Our mission transcends borders. We integrate localized support with global standards to build a resilient, safe, and just digital ecosystem for every citizen."
             </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}