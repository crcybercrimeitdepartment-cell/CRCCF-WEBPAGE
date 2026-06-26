import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { endToEndWebDevelopmentData } from "../../../data/OurServices/software_it_services/end_to_end_web_development/endToEndWebDevelopmentData";
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
  violet50: "#F5F3FF",
  violet100: "#EDE9FE",
  violet300: "#C4B5FD",
  violet500: "#8B5CF6",
  violet600: "#7C3AED",
  violet700: "#6D28D9",
  indigo50: "#EEF2FF",
  indigo100: "#E0E7FF",
  indigo300: "#A5B4FC",
  indigo400: "#818CF8",
  indigo600: "#4F46E5",
  indigo900: "#312E81",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
};

/* --------------------------- Page Data (Local) -------------------------- */
const data = {
  title: "End-to-End Web Development",
  tagline: "We engineer bespoke web solutions that drive growth. Crafting digital futures with code.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */

const WebDevHeroOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(620, 30) scale(1.3)">
      <defs>
        <filter id="svgShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="10" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="codeWindowClip"><rect x="10" y="40" width="120" height="150" rx="6" /></clipPath>
        <clipPath id="browserWindowClip"><rect x="140" y="20" width="170" height="130" rx="6" /></clipPath>
      </defs>

      {/* Window 1: Code Editor */}
      <motion.g initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <rect x="10" y="40" width="120" height="150" rx="6" fill="#1e293b" filter="url(#svgShadow)" />
        <rect x="10" y="40" width="120" height="20" rx="6" fill="#334155" />
        <rect x="10" y="55" width="120" height="5" fill="#334155" />
        <circle cx="20" cy="50" r="3" fill="#ef4444" /><circle cx="28" cy="50" r="3" fill="#f59e0b" /><circle cx="36" cy="50" r="3" fill="#22c55e" />
        <g clipPath="url(#codeWindowClip)">
          {!shouldReduce && (
            <>
              <motion.rect x="20" y="70" width="0" height="4" rx="2" fill="#c084fc" animate={{ width: 40 }} transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="65" y="70" width="0" height="4" rx="2" fill="#94a3b8" animate={{ width: 30 }} transition={{ duration: 0.5, delay: 0.7, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="30" y="80" width="0" height="4" rx="2" fill="#60a5fa" animate={{ width: 25 }} transition={{ duration: 0.5, delay: 1.0, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="60" y="80" width="0" height="4" rx="2" fill="#e2e8f0" animate={{ width: 40 }} transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="30" y="90" width="0" height="4" rx="2" fill="#fbbf24" animate={{ width: 60 }} transition={{ duration: 0.6, delay: 1.5, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="30" y="105" width="0" height="4" rx="2" fill="#34d399" animate={{ width: 35 }} transition={{ duration: 0.5, delay: 1.8, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="20" y="120" width="2" height="10" fill="#ffffff" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            </>
          )}
        </g>
      </motion.g>

      {/* Window 2: Browser */}
      <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <rect x="140" y="20" width="170" height="130" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" filter="url(#svgShadow)" />
        <rect x="140" y="20" width="170" height="20" rx="6" fill="#f1f5f9" />
        <rect x="140" y="35" width="170" height="5" fill="#f1f5f9" />
        <circle cx="150" cy="30" r="3" fill="#cbd5e1" />
        <rect x="160" y="26" width="100" height="8" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <g clipPath="url(#browserWindowClip)">
          {!shouldReduce && (
            <>
              <motion.rect x="140" y="40" width="170" height="15" fill="#f8fafc" borderBottom="1px solid #e2e8f0" initial={{ y: -20 }} animate={{ y: 40 }} transition={{ delay: 2.0, duration: 0.5, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="150" y="65" width="150" height="40" rx="4" fill="#ede9fe" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5, duration: 0.5, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="160" y="75" width="0" height="4" rx="2" fill="#7c3aed" animate={{ width: 80 }} transition={{ delay: 2.8, duration: 0.5, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="150" y="115" width="45" height="25" rx="3" fill="#f1f5f9" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.2, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="202" y="115" width="45" height="25" rx="3" fill="#f1f5f9" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.3, repeat: Infinity, repeatDelay: 5 }} />
              <motion.rect x="254" y="115" width="45" height="25" rx="3" fill="#f1f5f9" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.4, repeat: Infinity, repeatDelay: 5 }} />
            </>
          )}
        </g>
        {!shouldReduce && (
          <>
            <motion.path d="M 0 0 L 0 11 L 3 8 L 6 14 L 8 13 L 5 7 L 9 7 Z" fill="#0f172a" stroke="white" strokeWidth="1" initial={{ x: 80, y: 120, opacity: 0 }} animate={{ x: [80, 290, 290], y: [120, 48, 48], opacity: [1, 1, 0] }} transition={{ duration: 3, times: [0, 0.8, 1], delay: 2.5, repeat: Infinity, repeatDelay: 5 }} />
            <motion.circle cx="290" cy="48" r="5" stroke="#7c3aed" strokeWidth="2" fill="none" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ delay: 3.3, duration: 0.6, repeat: Infinity, repeatDelay: 7.7 }} />
          </>
        )}
      </motion.g>
    </g>
  );
};

const VideoHeroWebDev = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Web Development Hero";
  const desc = "Coding interfaces and browsers rendering modern sites.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="wdTitle wdDesc" className="w-full h-auto">
        <title id="wdTitle">{title}</title>
        <desc id="wdDesc">{desc}</desc>
        <defs>
          <linearGradient id="wdGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.slate900} />
            <stop offset="100%" stopColor={color.indigo900} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#wdGrad)" rx="20" />
        <WebDevHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="wdBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.indigo900} />
        </linearGradient>
        <mask id="wdMask">
          <rect width="100%" height="100%" fill="white" />
          <WebDevHeroOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#wdBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#wdMask)">
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

      <WebDevHeroOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function EndToEndWebDevelopment() {
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
          <Link to="/" className="hover:text-violet-600 transition-colors font-medium">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-violet-600 transition-colors font-medium">
            Services
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services/software-it" className="hover:text-violet-600 transition-colors font-medium">
            Software & IT Solutions
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold" aria-current="page">
            End-to-End Web Development
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
        >
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-black tracking-widest mb-6">
              WEB SOLUTIONS
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Custom Architecture", "Responsive Design", "Modern Tech Stack"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-violet-200 via-indigo-200 to-purple-200 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroWebDev
                  src="https://cdn.coverr.co/videos/coverr-typing-on-a-computer-keyboard-5115/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-violet-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium">Discover tailored web development options for every sector.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={endToEndWebDevelopmentData} 
              bookTitle="Web Dev Chronicles"
              bookSubtitle="Our End-to-End Expertise"
              coverLabel="Read The Guide"
              pageLabel="Sector"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
