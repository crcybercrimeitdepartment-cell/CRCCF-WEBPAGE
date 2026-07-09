import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { technicalAssistanceData } from "../../../data/OurServices/software_it_services/technical_assistance/technicalAssistanceData";
import InsightBook from "../../../components/Service/InsightBook";

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

/* --------------------------- Page Data (Local) -------------------------- */
const data = {
  title: "Technical Assistance",
  tagline: "Expert diagnosis, repair, and support for all your digital devices and software challenges.",
};

/* -------------------------- HERO: SVG -------------------------- */
const TechAssistHeroOverlay = () => {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
      <defs>
        <filter id="svgShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
          <feOffset dx="0" dy="8"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <clipPath id="screenClip">
          <rect x="50" y="30" width="140" height="90" rx="4" />
        </clipPath>
      </defs>

      {/* Main Monitor */}
      <motion.g 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <rect x="40" y="20" width="160" height="110" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" filter="url(#svgShadow)"/>
        <rect x="95" y="130" width="50" height="15" fill="#e5e7eb" />
        <rect x="70" y="145" width="100" height="8" rx="4" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
      </motion.g>

      <g clipPath="url(#screenClip)">
        <rect x="50" y="30" width="140" height="90" fill="#1e293b" />
        
        {/* Code / Logs */}
        <motion.path 
          d="M 60 45 h 40 M 60 55 h 60 M 60 65 h 30" 
          stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path 
          d="M 60 85 h 80 M 60 95 h 50" 
          stroke="#10b981" strokeWidth="2" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
        />
        
        {/* Scanning Line */}
        <motion.rect 
          x={50} y={30} width={140} height={2} fill="#38bdf8" opacity={0.8}
          animate={{ y: [0, 90, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </g>

      {/* Floating Tools / Support Chat */}
      <motion.g 
        initial={{ y: 20, opacity: 0, scale: 0.8 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }} 
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {/* Wrench */}
        <g transform="translate(180, 110) rotate(-45)">
          <rect x="-5" y="-20" width="10" height="40" rx="3" fill="#94a3b8" filter="url(#svgShadow)"/>
          <circle cx="0" cy="-25" r="10" fill="#64748b" />
          <circle cx="0" cy="-25" r="5" fill="#f8fafc" />
          <path d="M -10 -25 L -10 -35 A 10 10 0 0 1 10 -35 L 10 -25 Z" fill="#64748b" />
        </g>
      </motion.g>

      <motion.g 
        initial={{ y: 10, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        {/* Chat Bubble */}
        <path d="M 200 40 h 50 a 10 10 0 0 1 10 10 v 30 a 10 10 0 0 1 -10 10 h -20 l -15 15 v -15 h -15 a 10 10 0 0 1 -10 -10 v -30 a 10 10 0 0 1 10 -10 z" fill="#3b82f6" filter="url(#svgShadow)"/>
        <circle cx="215" cy="65" r="3" fill="#ffffff" />
        <circle cx="225" cy="65" r="3" fill="#ffffff" />
        <circle cx="235" cy="65" r="3" fill="#ffffff" />
      </motion.g>
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function TechnicalAssistance() {
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="bg-[#FBFDFF] min-h-screen">
      <motion.section
        id="top"
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-14"
      >
        {/* Breadcrumb */}
        <motion.nav
          variants={itemUp}
          className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8"
        >
          <Link to="/" className="hover:text-indigo-600 transition-colors font-medium">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-indigo-600 transition-colors font-medium">
            Services
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services/software-it" className="hover:text-indigo-600 transition-colors font-medium">
            Software & IT Solutions
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold" aria-current="page">
            Technical Assistance
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-widest mb-6 uppercase">
              Support & Solutions
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Diagnostics", "Repair", "Network", "Configuration"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative flex justify-center items-center">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative w-full max-w-lg">
              <TechAssistHeroOverlay />
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-indigo-600">Assistance</span></h2>
            <p className="text-slate-500 font-medium">Discover tailored troubleshooting and support services.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={technicalAssistanceData} 
              bookTitle="Technical Support"
              bookSubtitle="Complete Assistance Guide"
              coverLabel="Read The Guide"
              pageLabel="Service"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
