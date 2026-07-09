import Cloudinary from '../../../../constants/Cloudinary';
import { playPageTurnSound } from "../../../../utils/pageTurnSound";

﻿import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Scroll, Scale, Eye, FileCheck, Users, Landmark, Compass, ClipboardCheck } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Import data
import { cyberInvestigationComplianceFrameworkData } from '../../../../data/aboutUs/legalCompliance/cyberInvestigationComplianceFrameworkData';

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

/* -------------------------- SVG Mapping -------------------------- */
const getSvgIcon = (id) => {
    if (id.includes('trust')) return Compass;
    if (id.includes('laws')) return Landmark;
    if (id.includes('policies')) return Scroll;
    if (id.includes('collaboration')) return Users;
    if (id.includes('monitoring')) return ClipboardCheck;
    if (id.includes('risk')) return ShieldCheck;
    return FileCheck;
};

/* -------------------------- InsightCard (The Book) -------------------------- */
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
          h-[420px] sm:h-[500px] md:h-[600px] w-full shadow-[0_4px_30px_rgba(0,0,0,0.06)] 
          [transform-style:preserve-3d] [perspective:2000px] 
          flex items-center justify-center transition-all duration-300 
          ${isOpen ? 'shadow-[0_30px_70px_rgba(0,0,0,0.15)]' : 'hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)]'}
        `}
      >
        {/* Pages Stack */}
        {allPages.map((page, pageIdx) => {
          const isVisible = Math.abs(pageIdx - activePageIndex) <= 2 || pageIdx < activePageIndex;
          if (!isVisible) return null;

          const isFlipped = activePageIndex > pageIdx;
          const PageIcon = getSvgIcon(page.id);

          return (
            <div
              key={pageIdx}
              style={{ zIndex: 100 - pageIdx }}
              className={`
                absolute inset-0 p-6 sm:p-10 flex flex-col w-full h-full justify-start 
                pl-8 sm:pl-14 rounded-[24px] transition-all duration-[1s] 
                ease-[cubic-bezier(0.645,0.045,0.355,1)]
                [transform-origin:left_center] [backface-visibility:hidden]
                ${pageIdx % 2 === 0 ? 'bg-[#F9FAFF]' : 'bg-[#FDFDFF]'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-blue-50">
                  <PageIcon size={28} className="text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[13px] font-black uppercase tracking-[0.1em] leading-tight text-blue-700">
                    {page.heading.replace(/[^\w\s\u00C0-\u017F&]/gi, '').trim()}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">Framework Pillar {pageIdx + 1} of {allPages.length}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{page.content}</p>
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
            flex flex-col items-center justify-center z-[110] p-6 sm:p-12 text-center 
            [backface-visibility:hidden] bg-white 
            ${isOpen ? '[transform:rotateY(-145deg)_scale(0.95)_translateX(-30px)] opacity-0 pointer-events-none' : ''}
          `}
          style={{
            background: `linear-gradient(135deg, #ffffff, #F0F7FF)`,
            borderLeft: `8px solid #2563EB`
          }}
          onClick={handleOpen}
        >
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-[24px] sm:rounded-[30px] flex items-center justify-center mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain" />
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          
          <h3 className="text-slate-900 leading-[1.1] mb-8 text-[24px] sm:text-[32px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            The Compliance Code
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Statutory Protocols & Ethical Governance</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-blue-600">
            <span>Verify Compliance</span>
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

/* ------------------------------ Main Page ------------------------------ */
export default function CyberInvestigationComplianceFramework() {
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
              LEGAL ARCHITECTURE
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Compliance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Framework</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Upholding the highest standards of digital ethics and statutory mandates through a structured approach to cyber investigation and public safety.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative flex justify-center">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-indigo-100 blur-3xl opacity-60" />
            <div className="relative w-full max-w-md aspect-square bg-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center justify-center border border-slate-100">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
                    <ClipboardCheck size={48} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Audit & Integrity</h3>
                <p className="text-slate-500 text-center font-medium">Ensuring every digital operation is traceable, reportable, and fully compliant with Indian laws.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Compliance <span className="text-blue-600">Code</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip through the 6 pillars of our regulatory and ethical compliance ecosystem.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={cyberInvestigationComplianceFrameworkData} />
          </div>
        </div>

        {/* Framework Highlights Grid */}
        <motion.div variants={itemUp} className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
                { icon: Landmark, label: "IT Act 2000", sub: "Legal Foundation" },
                { icon: Eye, label: "Full Audit", sub: "Internal Monitoring" },
                { icon: Scale, label: "Ethical Conduct", sub: "Privacy First" },
            ].map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg sm:hover:shadow-xl hover:border-[#2563EB] cursor-pointer touch-manipulation">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-[#2563EB]">
                        <item.icon size={24} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <h4 className="relative z-10 text-slate-800 font-bold mb-1 transition-colors duration-300 group-hover:text-[#0F172A]">{item.label}</h4>
                    <p className="relative z-10 text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-[#475569]">{item.sub}</p>
                </div>
            ))}
        </motion.div>
      </motion.section>
    </div>
  );
}


