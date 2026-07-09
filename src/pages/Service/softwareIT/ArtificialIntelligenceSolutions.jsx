import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { AiIntellicenceSolutionsData } from "../../../data/OurServices/software_it_services/artificial_intelligence_solutions/artificialIntelligenceSolutionsData";
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
  violet50: "#f5f3ff",
  violet100: "#ede9fe",
  violet200: "#ddd6fe",
  violet300: "#c4b5fd",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
  violet700: "#6d28d9",
  violet800: "#5b21b6",
  violet900: "#4c1d95",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
  cyan400: "#22d3ee",
};

/* --------------------------- Page Data (Local) -------------------------- */
const data = {
  title: "Artificial Intelligence Solutions",
  tagline: "We provide cutting-edge AI solutions including machine learning models, natural language processing, computer vision, and intelligent automation to solve complex business challenges.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */
const AiHeroOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(650, 60) scale(1.6)">
      {/* Neural Connections Background */}
      <g opacity="0.3" stroke={color.violet300} strokeWidth="1">
        <path d="M50 50 L 100 100 L 200 50 L 250 150" fill="none" />
        <path d="M250 150 L 150 250 L 50 200 L 50 50" fill="none" />
        <circle cx="50" cy="50" r="3" fill={color.violet500} />
        <circle cx="100" cy="100" r="3" fill={color.violet500} />
        <circle cx="200" cy="50" r="3" fill={color.violet500} />
        <circle cx="250" cy="150" r="3" fill={color.violet500} />
        <circle cx="150" cy="250" r="3" fill={color.violet500} />
        <circle cx="50" cy="200" r="3" fill={color.violet500} />
      </g>

      {/* The AI Core (Brain Shape) */}
      <g transform="translate(150, 150)">
        <defs>
          <filter id="glowAi" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Brain Lobes */}
        <path 
          d="M-60 -20 C -60 -60, -20 -80, 0 -60 C 20 -80, 60 -60, 60 -20 C 70 10, 50 40, 30 50 C 10 60, -10 60, -30 50 C -50 40, -70 10, -60 -20" 
          fill={color.slate900} 
          stroke={color.cyan400} 
          strokeWidth="2"
          filter="url(#glowAi)"
        />

        {/* Synapse Firing Animation */}
        {!shouldReduce && (
          <>
            <motion.circle initial={{ cx: 0, cy: 0 }} r={4} fill={color.white} animate={{ cx: [-40, 0, 40], cy: [-20, -50, -20], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle initial={{ cx: 0, cy: 0 }} r={4} fill={color.white} animate={{ cx: [40, 0, -40], cy: [20, 50, 20], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} />
          </>
        )}
      </g>

      {/* Orbiting Data Ring */}
      <g transform="translate(150, 150)">
         <motion.ellipse 
           rx={120} ry={40} 
           fill="none" 
           stroke={color.violet500} 
           strokeWidth="1" 
           strokeDasharray="5 5"
           animate={{ rotate: 360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         />
      </g>
    </g>
  );
};

const VideoHeroAi = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF AI Solutions Hero";
  const desc = "Artificial Intelligence concepts visualization.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="aiTitle aiDesc" className="w-full h-auto block">
        <title id="aiTitle">{title}</title>
        <desc id="aiDesc">{desc}</desc>
        <defs>
           <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor={color.slate900} />
             <stop offset="100%" stopColor={color.violet900} />
           </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#aiGrad)" rx="20" />
        <AiHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="aiBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.violet900} />
        </linearGradient>
        <mask id="aiMask">
          <rect width="100%" height="100%" fill="white" />
          <AiHeroOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#aiBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#aiMask)">
        <video
          src={src}
          poster={poster || undefined}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </foreignObject>

      <AiHeroOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function ArtificialIntelligenceSolutions() {
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
            Artificial Intelligence Solutions
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-black tracking-widest mb-6">
              AI INNOVATION
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Machine Learning", "Natural Language Processing", "Computer Vision", "Automation"].map((pill) => (
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
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-violet-200 via-purple-200 to-violet-300 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroAi
                  src="https://cdn.coverr.co/videos/coverr-a-person-working-on-a-computer-with-code-on-the-screen-4171/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-violet-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium">Discover custom artificial intelligence options for every sector.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={AiIntellicenceSolutionsData} 
              bookTitle="AI Strategies"
              bookSubtitle="Our Intelligence Expertise"
              coverLabel="Read The Guide"
              pageLabel="Sector"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
