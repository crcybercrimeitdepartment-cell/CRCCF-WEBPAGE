import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { mobileAppDevelopmentData } from "../../../data/OurServices/software_it_services/mobile_application_development/mobileAppDevelopmentData";
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
  rose50: "#fff1f2",
  rose100: "#ffe4e6",
  rose200: "#fecdd3",
  rose300: "#fda4af",
  rose400: "#fb7185",
  rose500: "#f43f5e",
  rose600: "#e11d48",
  rose700: "#be123c",
  rose800: "#9f1239",
  rose900: "#881337",
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
  title: "Mobile App Development",
  tagline: "High-performance iOS and Android applications that bring your ideas to life.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */
const MobileAppHeroOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(680, 100) scale(1.6)">
      <defs>
        <filter id="svgShadowMobile" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
          <feOffset dx="0" dy="8"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* --- Phone 1 (iOS style) --- */}
      <motion.g 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        filter="url(#svgShadowMobile)"
      >
        <rect x="40" y="20" width="100" height="170" rx="15" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />
        <rect x="50" y="30" width="80" height="10" rx="5" fill="#e5e7eb" /> 
        <circle cx="90" cy="70" r="15" fill="#fda4af" /> {/* Soft Rose */}
        <rect x="60" y="95" width="60" height="6" rx="3" fill="#fecdd3" />
        <rect x="60" y="110" width="40" height="6" rx="3" fill="#e5e7eb" />
        <rect x="60" y="130" width="60" height="10" rx="5" fill="#fda4af" />
        <rect x="60" y="150" width="60" height="10" rx="5" fill="#e5e7eb" />
      </motion.g>

      {/* --- Phone 2 (Android style) --- */}
      <motion.g 
        initial={{ x: 20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        filter="url(#svgShadowMobile)"
      >
        <rect x="160" y="10" width="100" height="170" rx="15" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />
        <circle cx="210" cy="22" r="3" fill="#d1d5db" /> 
        
        {/* Screen content: VIDEO feed (Rose themed) */}
        <rect x="170" y="40" width="80" height="50" rx="5" fill="#e11d48" /> {/* Rose-600 */}
        <path d="M 200 55 L 215 65 L 200 75 z" fill="white" /> 
        <rect x="170" y="100" width="80" height="6" rx="3" fill="#fecdd3" />
        <rect x="170" y="115" width="50" height="6" rx="3" fill="#e5e7eb" />
        <rect x="170" y="135" width="80" height="30" rx="5" fill="#e5e7eb" />
      </motion.g>
      
      {/* --- Floating Icons --- */}
      {!shouldReduce && (
        <>
          <motion.g
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -10, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <path d="M 145 60 L 160 70 L 145 80 z" fill="#e11d48" opacity="0.8" />
          </motion.g>

          <motion.g
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <path d="M 140 120 l 5 5 l -5 5" stroke="#e11d48" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 160 120 l -5 5 l 5 5" stroke="#e11d48" strokeWidth="2" fill="none" opacity="0.8" />
          </motion.g>
        </>
      )}
    </g>
  );
};

const VideoHeroMobileApp = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Mobile App Hero";
  const desc = "Smartphones showing modern apps in action.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="maTitle maDesc" className="w-full h-auto">
        <title id="maTitle">{title}</title>
        <desc id="maDesc">{desc}</desc>
        <defs>
          <linearGradient id="maGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.slate900} />
            <stop offset="100%" stopColor={color.rose900} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#maGrad)" rx="20" />
        <MobileAppHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="maBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.rose900} />
        </linearGradient>
        <mask id="maMask">
          <rect width="100%" height="100%" fill="white" />
          <MobileAppHeroOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#maBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#maMask)">
        <video
          src={src}
          poster={poster || undefined}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          crossOrigin="anonymous"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </foreignObject>

      <MobileAppHeroOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function MobileApplicationDevelopment() {
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
          <Link to="/" className="hover:text-rose-600 transition-colors font-medium">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-rose-600 transition-colors font-medium">
            Services
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services/software-it" className="hover:text-rose-600 transition-colors font-medium">
            Software & IT Solutions
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold" aria-current="page">
            Mobile App Development
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-black tracking-widest mb-6">
              MOBILE SOLUTIONS
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["iOS Applications", "Android Applications", "Cross-Platform"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroMobileApp
                  src="https://cdn.coverr.co/videos/coverr-swiping-on-a-phone-screen-4171/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-rose-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium">Discover custom mobile app development options for every sector.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={mobileAppDevelopmentData} 
              bookTitle="Mobile App Strategies"
              bookSubtitle="Our App Development Expertise"
              coverLabel="Read The Guide"
              pageLabel="Sector"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
