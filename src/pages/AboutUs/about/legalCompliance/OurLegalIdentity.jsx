import { playPageTurnSound } from "../../../../utils/pageTurnSound";

﻿import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Import data
import { legalIdentityData } from '../../../../data/aboutUs/legalCompliance/LegalIdentitydata';

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

/* -------------------------- SVG Components (from original) -------------------------- */

const SharedSvgDefs = () => (
    <defs>
        <linearGradient id="metallic-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" /><stop offset="50%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
            <feMerge><feMergeNode in="offsetBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
    </defs>
);

const SVG_01_Compliance = () => (
  <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><motion.g initial="hidden" animate="visible" variants={{hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}><motion.path d="M25 10 H 75 C 85 10, 85 20, 75 20 L 25 20 C 15 20, 15 10, 25 10 Z M25 90 H 75 C 85 90, 85 80, 75 80 L 25 80 C 15 80, 15 90, 25 90 Z M 20 15 V 85" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.5 } } }} /><motion.path d="M50 20 C 50 20, 70 25, 85 20 V 55 C 85 80, 50 95, 50 95 C 50 95, 15 80, 15 55 V 20 C 30 25, 50 20, 50 20 Z" fill="url(#metallic-blue)" stroke="#1e3a8a" strokeWidth="1.5" filter="url(#drop-shadow)" variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: 'backOut' } } }} /><motion.path d="M38 58 L 48 68 L 68 45" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } }} /></motion.g></svg>
);

const SVG_02_Incorporation = () => (
  <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><motion.g initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}><motion.path d="M50 10 L 10 30 L 50 50 L 90 30 Z" fill="#60a5fa" variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} /><motion.path d="M15 32 V 88 H 85 V 32" stroke="#3b82f6" fill="#bfdbfe" strokeWidth="1.5" variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }} style={{ transformOrigin: 'top' }} />{[25, 40, 55, 70].map(x => (<motion.rect key={x} x={x} y="32" width="5" height="56" fill="#3b82f6" variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} />))}<motion.rect x="10" y="88" width="80" height="5" fill="#1e3a8a" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} style={{ transformOrigin: 'left' }} /><motion.g variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring' } } }}><rect x="60" y="55" width="35" height="18" fill="#f0f9ff" stroke="#1e3a8a" rx="2" /><text x="63" y="67" fontSize="5" fontFamily="monospace">CIN: U88...</text></motion.g></motion.g></svg>
);

const SVG_03_PublicTrust = () => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><motion.g initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.4 } } }}><motion.path d="M30,60 A20,20 0 0,1 50,40" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1 } } }} /><motion.path d="M70,60 A20,20 0 0,0 50,40" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1 } } }} /><motion.path d="M50,75 A25,25 0 0,0 25,50" fill="none" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2 } } }} /><motion.path d="M50,75 A25,25 0 0,1 75,50" fill="none" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2 } } }} /></motion.g></svg>
);

const SVG_04_EthicalGovernance = () => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><path d="M50 15 V 25 M 10 25 H 90" stroke="#4b5563" strokeWidth="2" /><motion.g animate={{ rotate: [1.5, -1.5, 1.5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '50px 25px' }}><path d="M10 25 L 15 35 L 45 35 L 40 25 Z" fill="#bfdbfe" /><path d="M15,35 A 15 15 0 0 0 45 35" fill="#60a5fa" /><path d="M60 25 L 55 35 L 85 35 L 90 25 Z" fill="#bfdbfe" /><path d="M55,35 A 15 15 0 0 1 85 35" fill="#60a5fa" /></motion.g><motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}><circle cx="50" cy="70" r="15" fill="#1e3a8a" /><path d="M45 70 l5 5 l10 -10" stroke="white" strokeWidth="3" fill="none" /></motion.g></svg>
);

const SVG_05_Collaboration = () => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs />
    {[ {cx:25,cy:25}, {cx:75,cy:25}, {cx:50,cy:50}, {cx:25,cy:75}, {cx:75,cy:75} ].map((node,i) => <motion.circle key={i} {...node} r={0} fill="url(#metallic-blue)" initial={{r:0}} animate={{r:6}} transition={{delay: i*0.2}}><animate attributeName="r" values="6;8;6" dur="3s" begin={`${i*0.4}s`} repeatCount="indefinite" /></motion.circle>)}
    {[ [0,1], [0,2], [1,2], [2,3], [2,4], [3,4] ].map(([s,e], i) => { const nodes = [{cx:25,cy:25}, {cx:75,cy:25}, {cx:50,cy:50}, {cx:25,cy:75}, {cx:75,cy:75}]; return <motion.line key={i} x1={nodes[s].cx} y1={nodes[s].cy} x2={nodes[e].cx} y2={nodes[e].cy} stroke="#60a5fa" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.1 }} /> })}
    </svg>
);

const SVG_11_RegistrationDoc = ({ title = "PAN" }) => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><motion.g initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}><motion.rect x="15" y="25" width="70" height="50" rx="4" fill="#ffffff" stroke="#9ca3af" filter="url(#drop-shadow)" variants={{ hidden: { rotateX: -90, opacity: 0 }, visible: { rotateX: 0, opacity: 1 } }} style={{ transformOrigin: 'center 75px' }} /><motion.rect x="20" y="30" width="60" height="8" fill="url(#metallic-blue)" rx="2" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} style={{ transformOrigin: 'left' }} /><motion.text x="50" y="36" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>GOVERNMENT OF INDIA</motion.text><motion.text x="25" y="55" fontSize="12" fontWeight="bold" fill="#1e3a8a" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{title}</motion.text><motion.g variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: 'spring', delay: 1 } } }}><circle cx="70" cy="60" r="10" fill="#22c55e" /><path d="M66 60 l3 3 l6 -6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" /></motion.g></motion.g></svg>
);

const SVG_22_ISO_Generic = ({ number = "9001" }) => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><g><motion.circle cx="50" cy="50" r="40" fill="#eff6ff" stroke="#9ca3af" /><motion.circle cx="50" cy="50" r="35" fill="none" stroke="url(#metallic-blue)" strokeWidth="4" initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1, rotate: -90 }} transition={{ duration: 1.5, ease: "easeInOut" }} /><text x="50" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">ISO {number}</text></g></svg>
);

const SVG_23_ISO_Security = ({ number = "27001" }) => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><g><motion.path d="M50 15 L85 35 V 65 L50 85 L15 65 V 35 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} /><motion.rect x="42" y="45" width="16" height="20" rx="3" fill="#1e3a8a" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} /><motion.path d="M50 35 A 10 10 0 0 1 60 45" stroke="#1e3a8a" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} /><text x="50" y="75" textAnchor="middle" fontSize="8" fill="#1e40af">ISO {number}</text></g></svg>
);

const SVG_35_Trademark = () => (
    <svg role="img" viewBox="0 0 100 100" className="w-full h-full"><SharedSvgDefs /><g filter="url(#drop-shadow)"><motion.circle cx="50" cy="50" r="35" fill="#fff" /><motion.circle cx="50" cy="50" r="30" stroke="url(#metallic-blue)" strokeWidth="5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} /><motion.text x="50" y="60" textAnchor="middle" fontSize="35" fontWeight="bold" fill="#1e3a8a" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>®</motion.text></g></svg>
);

const svgMap = {
    "sec1-comprehensive-legal-recognition": SVG_01_Compliance,
    "sec2-legal-incorporation-recognition": SVG_02_Incorporation,
    "sec3-public-trust": SVG_03_PublicTrust,
    "sec4-legal-commitment": SVG_04_EthicalGovernance,
    "sec5-collaboration-govt-ngos": SVG_05_Collaboration,
    "sec6-dedication-motto": () => <SVG_11_RegistrationDoc title="Motto" />,
    "sec7-objectives-moa": () => <SVG_11_RegistrationDoc title="MOA" />,
    "sec8-service-fees-policy": () => <SVG_11_RegistrationDoc title="Fees" />,
    "sec9-section8-approval": () => <SVG_11_RegistrationDoc title="Sec 8" />,
    "sec10-incorporation-certificate": () => <SVG_11_RegistrationDoc title="Reg." />,
    "sec11-pan-registration": () => <SVG_11_RegistrationDoc title="PAN" />,
    "sec12-tan-registration": () => <SVG_11_RegistrationDoc title="TAN" />,
    "sec13-udyam-registration": () => <SVG_11_RegistrationDoc title="Udyam" />,
    "sec14-epf-certificate": () => <SVG_11_RegistrationDoc title="EPF" />,
    "sec15-esi-certificate": () => <SVG_11_RegistrationDoc title="ESI" />,
    "sec16-gst-registration": () => <SVG_11_RegistrationDoc title="GST" />,
    "sec17-niti-aayog-registration": () => <SVG_11_RegistrationDoc title="Niti" />,
    "sec18-csr-registration": () => <SVG_11_RegistrationDoc title="CSR" />,
    "sec19-12a-registration": () => <SVG_11_RegistrationDoc title="12A" />,
    "sec20-80g-registration": () => <SVG_11_RegistrationDoc title="80G" />,
    "sec21-section8-reinforcement": () => <SVG_11_RegistrationDoc title="Sec 8" />,
    "sec22-iso9001": () => <SVG_22_ISO_Generic number="9001" />,
    "sec23-iso27001": () => <SVG_23_ISO_Security number="27001" />,
    "sec24-iso20000": () => <SVG_22_ISO_Generic number="20000" />,
    "sec25-iso15408": () => <SVG_23_ISO_Security number="15408" />,
    "sec26-iso27037": () => <SVG_23_ISO_Security number="27037" />,
    "sec27-iso27701": () => <SVG_23_ISO_Security number="27701" />,
    "sec28-iso27001-27701": () => <SVG_23_ISO_Security number="27k+" />,
    "sec29-iso29100": () => <SVG_22_ISO_Generic number="29100" />,
    "sec30-iso27037": () => <SVG_23_ISO_Security number="27037" />,
    "sec31-iso37001": () => <SVG_22_ISO_Generic number="37001" />,
    "sec32-iso29993": () => <SVG_22_ISO_Generic number="29993" />,
    "sec33-iso26000": () => <SVG_22_ISO_Generic number="26000" />,
    "sec34-iso31000": () => <SVG_22_ISO_Generic number="31000" />,
    "sec35-trademark-protection": SVG_35_Trademark,
    "sec36-trademark-ip-declaration": SVG_35_Trademark,
    "sec37-copyrighted-assets": () => <SVG_11_RegistrationDoc title="©" />,
    "sec38-certificate-design-protection": () => <SVG_11_RegistrationDoc title="Cert." />,
    "sec39-objectives-legal-ownership": SVG_04_EthicalGovernance,
    "sec40-website-content-rights": () => <SVG_11_RegistrationDoc title="Web" />,
    "sec41-legal-disclaimer-notice": SVG_01_Compliance,
};

/* -------------------------- InsightCard (The Book) -------------------------- */
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

  const handleMouseEnter = () => { if (isDesktop()) setIsOpen(true); };
  const handleMouseLeave = () => {
    if (isDesktop() && !showScrubber) {
      setIsOpen(false);
    }
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
          const PageSVG = svgMap[page.id] || SVG_01_Compliance;

          return (
            <div
              key={pageIdx}
              style={{ zIndex: 100 - pageIdx }}
              className={`
                absolute inset-0 p-8 flex flex-col w-full h-full justify-start 
                pl-8 sm:pl-14 rounded-[24px] transition-all duration-[1s] 
                ease-[cubic-bezier(0.645,0.045,0.355,1)]
                [transform-origin:left_center] [backface-visibility:hidden]
                will-change-transform will-change-opacity
                ${pageIdx % 2 === 0 ? 'bg-[#F9F9FF]' : 'bg-[#FBFBFF]'}
                ${isFlipped
                  ? '[transform:rotateY(-130deg)_scale(0.9)_translateX(-20px)] opacity-100 pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.1)]'
                  : pageIdx === activePageIndex
                    ? 'opacity-100 translate-x-0 rotate-y-0 scale-100'
                    : 'opacity-0 pointer-events-none translate-x-8'
                }
              `}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-blue-50 p-2">
                  <PageSVG />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.1em] leading-tight text-blue-700">
                    {page.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">Legal Identity Record {pageIdx + 1} of {allPages.length}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{page.content}</p>
              </div>

              <div className="pt-6 mt-auto border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {pageIdx > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPageTurnSound(); setActivePageIndex(pageIdx - 1); keepScrubberVisible(); }}
                        className="text-[12px] font-black text-blue-600 flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        <ArrowLeft size={16} /> Previous
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
            [backface-visibility:hidden] bg-white will-change-transform
            ${isOpen ? '[transform:rotateY(-145deg)_scale(0.95)_translateX(-30px)] opacity-0 pointer-events-none' : ''}
          `}
          style={{
            background: `linear-gradient(135deg, #ffffff, #F0F7FF)`,
            borderLeft: `8px solid #2563EB`
          }}
          onClick={handleOpen}
        >
          <div className="w-[120px] h-[120px] rounded-[32px] flex items-center justify-center mb-10 shadow-sm bg-white/60 backdrop-blur-sm p-4">
            <img src="https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png" alt="CRCCF Logo" loading="lazy" decoding="async" width="100" height="100" className="w-full h-full object-contain" />
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          
          <h3 className="text-slate-900 leading-[1.1] mb-6 text-[36px] font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            The Legal Ledger
          </h3>
          
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Statutory Compliance & Certifications</p>

          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.15em] mt-auto text-blue-600">
            <span>Open Identity Chronicles</span>
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
export default function OurLegalIdentity() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 overflow-x-hidden">
      <motion.section
        variants={container} initial="hidden" animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16"
      >
        

        <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6">
              STATUTORY EXCELLENCE
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Legal Identity</span> & Authority
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Transparency is the bedrock of our foundation. Explore our comprehensive list of statutory recognitions, certifications, and legal frameworks that empower our mission.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative flex justify-center">
             <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-indigo-100 blur-3xl opacity-60" />
             <div className="relative w-full max-w-md aspect-square bg-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center justify-center border border-slate-100">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
                    <BookOpen size={48} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Authenticated Entity</h3>
                <p className="text-slate-500 text-center font-medium">Browse through our verified legal certifications and operational mandates.</p>
             </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Legal <span className="text-blue-600">Ledger</span></h2>
            <p className="text-slate-500 text-lg font-medium">An interactive chronicle of our statutory standing and compliance milestones.</p>
          </div>

          <div className="py-6">
            <InsightCard allPages={legalIdentityData} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
