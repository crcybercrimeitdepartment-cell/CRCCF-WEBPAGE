import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { desktopLaptopSoftwareSolutionsData } from "../../../data/OurServices/software_it_services/desktop_laptop_software_solutions/desktopLaptopSoftwareSolutionsData";
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
  title: "Desktop Application Development",
  tagline: "High-performance, offline-capable desktop apps for Windows, macOS, and Linux.",
};

/* -------------------------- HERO: SVG -------------------------- */
const DesktopHeroOverlay = () => {
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
        <clipPath id="desktopScreen">
          <rect x="30" y="25" width="160" height="100" rx="5" />
        </clipPath>
        <clipPath id="laptopScreen">
          <rect x="155" y="80" width="110" height="70" rx="3" />
        </clipPath>
      </defs>

      <motion.g 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <rect x="25" y="20" width="170" height="110" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" filter="url(#svgShadow)"/>
        <rect x="60" y="130" width="100" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="50" y="135" width="120" height="10" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
      </motion.g>

      <motion.g 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <rect x="150" y="75" width="120" height="80" rx="5" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" filter="url(#svgShadow)"/>
        <path d="M 140 155 L 280 155 L 290 165 L 130 165 z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
      </motion.g>

      <g clipPath="url(#desktopScreen)">
        <rect x="30" y="25" width="160" height="100" fill="#ffffff" />
        <motion.path 
          d="M 40 110 q 20 -40 40 -20 t 40 30 40 -10" 
          stroke="#4f46e5" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.rect x={45} y={70} width={15} height={40} rx={3} fill="#a5b4fc" initial={{ height: 0, y: 110 }} animate={{ height: 40, y: 70 }} transition={{ duration: 1, delay: 1 }} />
        <motion.rect x={70} y={50} width={15} height={60} rx={3} fill="#a5b4fc" initial={{ height: 0, y: 110 }} animate={{ height: 60, y: 50 }} transition={{ duration: 1, delay: 1.2 }} />
        <motion.rect x={95} y={80} width={15} height={30} rx={3} fill="#a5b4fc" initial={{ height: 0, y: 110 }} animate={{ height: 30, y: 80 }} transition={{ duration: 1, delay: 1.4 }} />
      </g>

      <g clipPath="url(#laptopScreen)">
        <rect x="155" y="80" width="110" height="70" fill="#1e293b" />
        <motion.path d="M 165 95 h 70" stroke="#60a5fa" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }} />
        <motion.path d="M 165 105 h 50" stroke="#a78bfa" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.8 }} />
      </g>
    </svg>
  );
};


/* ---------------------------------- Page ---------------------------------- */
export default function DesktopLaptopSoftwareSolutions() {
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
            Desktop & Laptop Software Solutions
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-widest mb-6">
              DESKTOP POWERHOUSE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["Windows", "macOS", "Linux", "Cross-Platform"].map((pill) => (
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
              <DesktopHeroOverlay />
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-indigo-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium">Discover custom desktop & laptop software options for every sector.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={desktopLaptopSoftwareSolutionsData} 
              bookTitle="Desktop Strategies"
              bookSubtitle="Our Desktop Development Expertise"
              coverLabel="Read The Guide"
              pageLabel="Sector"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
