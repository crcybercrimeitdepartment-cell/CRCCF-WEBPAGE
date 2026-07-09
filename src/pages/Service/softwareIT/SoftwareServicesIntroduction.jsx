import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { softwareServicesIntroductionData } from "../../../data/OurServices/software_it_services/software_services_introduction/softwareServicesIntroductionData";
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
  cyan25: "#F5FEFF",
  cyan50: "#ECFEFF",
  cyan100: "#CFFAFE",
  cyan200: "#A5F3FC",
  cyan300: "#67E8F9",
  cyan400: "#22D3EE",
  cyan500: "#06B6D4",
  cyan700: "#0E7490",
  indigo25: "#F7F8FF",
  indigo50: "#EEF2FF",
  indigo100: "#E0E7FF",
  indigo300: "#A5B4FC",
  indigo400: "#818CF8",
  indigo600: "#4F46E5",
  indigo800: "#3730A3",
  indigo900: "#312E81",
  emerald50: "#ECFDF5",
  emerald100: "#D1FAE5",
  emerald300: "#86EFAC",
  emerald400: "#34D399",
  emerald600: "#059669",
  amber50: "#FFFBEB",
  amber100: "#FEF3C7",
  amber500: "#F59E0B",
  rose50: "#FFF1F2",
  rose100: "#FFE4E6",
  rose400: "#FB7185",
  rose600: "#E11D48",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
  black: "#000000",
};

/* --------------------------- Page Data (Local) -------------------------- */
const data = {
  title: "Software Services Introduction",
  tagline:
    "Crafting digital experiences that connect people, build trust, and empower organizations.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */

const SoftwareHeroOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(680, 50)">
      {/* Code Blocks */}
      <g transform="translate(50, 50)">
        <rect x="0" y="0" width="120" height="80" rx="5" fill={color.slate800} stroke={color.slate600} />
        <rect x="10" y="10" width="100" height="60" fill={color.slate900} />
        {!shouldReduce && [1, 2, 3, 4].map((i) => (
          <motion.rect 
            key={i}
            x={15} y={15 + i * 12} initial={{ width: 0 }} height={4} rx={2} fill={i % 2 === 0 ? color.cyan400 : color.indigo400}
            animate={{ width: [0, 80, 80] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, repeatDelay: 1 }}
          />
        ))}
      </g>

      {/* Connection Lines */}
      <motion.path 
        d="M170 90 H 220 V 150 H 250" 
        fill="none" stroke={color.cyan500} strokeWidth="2" strokeDasharray="5 5"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Human/User Interface */}
      <g transform="translate(250, 120)">
        <rect x="0" y="0" width="100" height="140" rx="10" fill={color.white} stroke={color.slate200} />
        <circle cx="50" cy="40" r="20" fill={color.indigo100} />
        <path d="M30 40 Q 50 60, 70 40" stroke={color.indigo400} strokeWidth="2" fill="none" />
        <rect x="20" y="70" width="60" height="8" rx="4" fill={color.slate200} />
        <rect x="20" y="90" width="40" height="8" rx="4" fill={color.slate200} />
        <motion.circle 
          cx={80} cy={110} r={15} fill={color.emerald400} 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        />
        <path d="M75 110 L 80 115 L 85 105" stroke={color.white} strokeWidth="2" fill="none" />
      </g>

      {/* Bridge Structure */}
      <path d="M50 250 Q 150 200, 250 250" fill="none" stroke={color.indigo300} strokeWidth="4" opacity="0.3" />
      <path d="M50 260 Q 150 210, 250 260" fill="none" stroke={color.indigo300} strokeWidth="4" opacity="0.3" />
    </g>
  );
};

const VideoHeroSoftware = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Software Services Hero";
  const desc = "Digital code transforming into user-friendly interfaces.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="swTitle swDesc" className="w-full h-auto">
        <title id="swTitle">{title}</title>
        <desc id="swDesc">{desc}</desc>
        <defs>
          <linearGradient id="swGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.slate900} />
            <stop offset="100%" stopColor={color.indigo900} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#swGrad)" rx="20" />
        <SoftwareHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="swBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.indigo900} />
        </linearGradient>
        <mask id="swMask">
          <rect width="100%" height="100%" fill="white" />
          <SoftwareHeroOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#swBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#swMask)">
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

      <SoftwareHeroOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function SoftwareServicesIntroduction() {
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
            Software Services Intro
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-black tracking-widest mb-6">
              SOFTWARE INNOVATION
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Digital Excellence", "Human-Centered", "Innovation"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-cyan-300 hover:bg-cyan-50 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-200 via-indigo-200 to-emerald-200 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroSoftware
                  src="https://cdn.coverr.co/videos/coverr-connecting-digital-network-lines-5374/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-indigo-600">Principles</span></h2>
            <p className="text-slate-500 font-medium">Discover the core philosophy driving our software development process.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={softwareServicesIntroductionData} 
              bookTitle="Software Overview"
              bookSubtitle="Our Guiding Principles"
              coverLabel="Read The Overview"
              pageLabel="Principle"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
