import Cloudinary from '../../../../constants/Cloudinary';
import ComingSoonPage from '../../../common/ComingSoonPage';

/*
=========================================
TEMPORARILY DISABLED
Reason:
This page is currently using the global
ComingSoonPage component.

Do not remove this content because it
will be re-enabled in future updates.
=========================================
*/

/*
import { playPageTurnSound } from "../../../../utils/pageTurnSound";

﻿import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Import data
import { ourLegalEntityData } from '../../../../data/aboutUs/legalCompliance/OurLegalEntitydata';

/* -------------------------------- Motion -------------------------------- * /
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

/* -------------------------- SVG Components -------------------------- * /

const SVG_Corporate = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
    <path d="M35 40 H 65 M 35 50 H 65 M 35 60 H 50" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="75" cy="75" r="15" fill="#1E3A8A" />
    <path d="M70 75 L 73 78 L 80 71" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const SVG_Partnership = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="#EFF6FF" stroke="#3B82F6" strokeDasharray="4 4" />
    <g transform="translate(50, 50)">
        <path d="M-20 0 A 20 20 0 0 1 20 0" stroke="#1E3A8A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M-20 10 A 20 20 0 0 0 20 10" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" fill="none" />
    </g>
    <circle cx="50" cy="50" r="10" fill="#2563EB" />
  </svg>
);

const SVG_Framework = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 10 L 90 30 V 70 L 50 90 L 10 70 V 30 Z" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="2" />
    <path d="M50 10 V 90 M 10 30 L 90 70 M 90 30 L 10 70" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
    <circle cx="50" cy="50" r="20" fill="white" stroke="#2563EB" strokeWidth="2" />
    <path d="M45 50 L 55 50 M 50 45 V 55" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const svgMap = {
    "entity-overview": SVG_Corporate,
    "entity-collaborations": SVG_Partnership,
    "entity-framework": SVG_Framework,
};

/* -------------------------- InsightCard (The Book) -------------------------- * /
const InsightCard = ({ allPages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [previewPageIndex, setPreviewPageIndex] = useState(null);
  const [showScrubber, setShowScrubber] = useState(false);
  const scrubberTimer = useRef(null);

  const isDesktop = () => window.innerWidth > 1024;

  const handleMouseEnter = () => { if (isDesktop()) setIsOpen(true); };
  const handleMouseLeave = () => {
    if (isDesktop() && !showScrubber) {
      setIsOpen(false);
    }
  };

  const keepScrubberVisible = () => {
    setShowScrubber(true);
    if (scrubberTimer.current) clearTimeout(scrubberTimer.current);
    scrubberTimer.current = setTimeout(() => setShowScrubber(false), 3000);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    playPageTurnSound(); setIsOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <motion.article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          relative bg-white border border-slate-200 rounded-[24px] 
          h-[400px] sm:h-[500px] md:h-[550px] w-full shadow-[0_4px_30px_rgba(0,0,0,0.06)] 
          [transform-style:preserve-3d] [perspective:2000px] 
          flex items-center justify-center transition-all duration-300 
          ${isOpen ? 'shadow-[0_30px_70px_rgba(0,0,0,0.15)]' : 'hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)]'}
        `}
      >
        {/* Pages Stack * /}
        {allPages.map((page, pageIdx) => {
          const isFlipped = activePageIndex > pageIdx;
          const PageSVG = svgMap[page.id] || SVG_Corporate;

          return (
            <div
              key={pageIdx}
              style={{ zIndex: 100 - pageIdx }}
              className={`
                absolute inset-0 p-6 sm:p-10 flex flex-col w-full h-full justify-start 
                pl-8 sm:pl-14 rounded-[24px] transition-all duration-[1s] 
                ease-[cubic-bezier(0.645,0.045,0.355,1)]
                [transform-origin:left_center] [backface-visibility:hidden]
                ${pageIdx % 2 === 0 ? 'bg-[#F9F9FF]' : 'bg-[#FBFBFF]'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-blue-50 p-3">
                  <PageSVG />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-blue-700">
                    {page.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">Section {pageIdx + 1} of {allPages.length}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3">
                <p className="text-[17px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{page.content}</p>
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
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* COVER * /}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-[24px] cursor-pointer 
            transition-all duration-[1.3s] ease-[cubic-bezier(0.645,0.045,0.355,1)] 
            [transform-origin:left_center] shadow-[6px_0_30px_rgba(0,0,0,0.12)] 
            flex flex-col items-center justify-center z-[110] p-6 sm:p-12 text-center 
            [backface-visibility:hidden] bg-white 
            ${isOpen ? '[transform:rotateY(-145deg)_scale(0.95)_translateX(-30px)] opacity-0 pointer-events-none' : ''}
          `}
          style={{
            background: `linear-gradient(135deg, #ffffff, #EBF5FF)`,
            borderLeft: `8px solid #2563EB`
          }}
          onClick={handleOpen}
        >
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-[24px] sm:rounded-[30px] flex items-center justify-center mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain" />
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          
          <h3 className="text-slate-900 leading-[1.1] mb-8 text-[26px] sm:text-[34px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            The Corporate Charter
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Our Legal Entity Status & Authority</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-blue-600">
            <span>Explore Status</span>
            <ArrowRight size={18} className="animate-pulse" />
          </div>
        </div>
      </motion.article>

      {/* Scrubber * /}
      <div className={`transition-all duration-500 ease-out mt-4 ${isOpen || showScrubber ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-[16px] sm:rounded-[24px] border border-slate-100">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-700 mt-1 truncate max-w-[180px] sm:max-w-[300px]">{allPages[activePageIndex].heading}</span>
            </div>
            <span className="flex-shrink-0 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-black tabular-nums shadow-lg shadow-blue-200">
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
                <span>{allPages[previewPageIndex].heading.slice(0, 35)}{allPages[previewPageIndex].heading.length > 35 ? "..." : ""}</span>
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
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Main Page ------------------------------ * /
export default function OurLegalEntity() {
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
        

        <div ref={heroRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24" style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6">
              LEGAL STANDING
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Legal Entity</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Understand the corporate structure and legal authority that allows CRCCF to operate as a trusted partner for government and private institutions.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative flex justify-center">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-indigo-100 blur-3xl opacity-60" />
            <div className="relative w-full max-w-md aspect-square bg-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center justify-center border border-slate-100">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
                    <ShieldCheck size={48} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Verified Status</h3>
                <p className="text-slate-500 text-center font-medium">Formally recognized as a Section 8 Non-Profit organization under Indian law.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Corporate <span className="text-blue-600">Charter</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip through the pages to learn about our legal framework and partnerships.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={ourLegalEntityData} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}

*/

const useAnims = () => {
  return <ComingSoonPage />;
};

export default useAnims;
