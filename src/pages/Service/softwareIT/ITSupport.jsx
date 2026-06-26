import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { itSupportData } from "../../../data/OurServices/software_it_services/it_support/itSupportData";
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

/* -------------------------------- Palette -------------------------------- */
const color = {
  emerald50: "#ecfdf5",
  emerald100: "#d1fae5",
  emerald200: "#a7f3d0",
  emerald300: "#6ee7b7",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  emerald700: "#047857",
  emerald800: "#065f46",
  emerald900: "#064e3b",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
  cyan300: "#67e8f9",
  cyan400: "#22d3ee",
  indigo900: "#312e81"
};

/* --------------------------- Page Data (Local) -------------------------- */
const data = {
  title: "IT Support Services",
  tagline: "Comprehensive hardware, software, and network support to keep your organization running smoothly and securely without interruption.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */
const ITOpsOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(600, 60) scale(1.5)">
      {/* Background Server Racks */}
      <g opacity="0.3">
        <rect x="20" y="50" width="60" height="200" rx="5" fill={color.slate800} stroke={color.emerald500} strokeWidth="1" />
        <rect x="30" y="60" width="40" height="10" fill={color.slate700} />
        <rect x="30" y="80" width="40" height="10" fill={color.slate700} />
        <rect x="30" y="100" width="40" height="10" fill={color.slate700} />
        
        <rect x="100" y="50" width="60" height="200" rx="5" fill={color.slate800} stroke={color.emerald500} strokeWidth="1" />
        <rect x="110" y="60" width="40" height="10" fill={color.slate700} />
        <rect x="110" y="80" width="40" height="10" fill={color.slate700} />
        <rect x="110" y="100" width="40" height="10" fill={color.slate700} />
      </g>

      {/* Foreground Main Server Console */}
      <g transform="translate(40, 100)">
        <defs>
          <filter id="glowIT" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect x="0" y="0" width="100" height="120" rx="8" fill={color.slate900} stroke={color.cyan400} strokeWidth="2" filter="url(#glowIT)" />
        
        {/* Blinking Lights */}
        {!shouldReduce && (
          <>
             <motion.circle cx="20" cy="20" r="4" fill={color.emerald400} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
             <motion.circle cx="40" cy="20" r="4" fill={color.cyan400} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} />
             <motion.circle cx="60" cy="20" r="4" fill={color.emerald400} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }} />
          </>
        )}
        
        {/* Screen Activity */}
        <motion.rect 
          x="25" y="-45" width="50" height="2" fill={color.cyan400}
          animate={{ width: [0, 50] }} transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.rect 
          x="25" y="-40" width="30" height="2" fill={color.cyan400}
          animate={{ width: [0, 30] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </g>

      {/* Data Streams */}
      {!shouldReduce && (
        <g opacity="0.5">
          <motion.path 
            d="M20 250 C 20 150, 150 150, 150 50" 
            fill="none" stroke={color.cyan300} strokeWidth="2" strokeDasharray="5 5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M80 250 C 80 150, 200 150, 200 50" 
            fill="none" stroke={color.emerald300} strokeWidth="2" strokeDasharray="5 5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </g>
      )}
    </g>
  );
};

const VideoHeroITSupport = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF IT Support Hero";
  const desc = "A futuristic server room representing IT operations.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="itTitle itDesc" className="w-full h-auto">
        <title id="itTitle">{title}</title>
        <desc id="itDesc">{desc}</desc>
        <defs>
          <linearGradient id="itGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.slate900} />
            <stop offset="100%" stopColor={color.indigo900} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#itGrad)" rx="20" />
        <ITOpsOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="itBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.indigo900} />
        </linearGradient>
        <mask id="itMask">
          <rect width="100%" height="100%" fill="white" />
          <ITOpsOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#itBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#itMask)">
        <video
          src={src}
          poster={poster || undefined}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </foreignObject>

      <ITOpsOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function ITSupport() {
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
          <Link to="/" className="hover:text-emerald-600 transition-colors font-medium">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-emerald-600 transition-colors font-medium">
            Services
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services/software-it" className="hover:text-emerald-600 transition-colors font-medium">
            Software & IT Solutions
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold" aria-current="page">
            IT Support
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
        >
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black tracking-widest mb-6">
              RELIABLE INFRASTRUCTURE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Hardware", "Software", "Network Maintenance", "System Installations"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroITSupport
                  src="https://cdn.coverr.co/videos/coverr-server-room-2533/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-emerald-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium">Discover custom IT support and infrastructure options for every sector.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={itSupportData} 
              bookTitle="IT Strategies"
              bookSubtitle="Our Technical Expertise"
              coverLabel="Read The Guide"
              pageLabel="Sector"
              themeColor="emerald"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
