import { playPageTurnSound } from "../../../utils/pageTurnSound";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { amcServicesData } from "../../../data/OurServices/software_it_services/AMC_services/amcServicesData";
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
  emerald50: "#ECFDF5",
  emerald100: "#D1FAE5",
  emerald300: "#86EFAC",
  emerald400: "#34D399",
  emerald500: "#10B981",
  emerald700: "#047857",
  cyan200: "#A5F3FC",
  cyan400: "#22D3EE",
  indigo100: "#E0E7FF",
  indigo200: "#C7D2FE",
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
  title: "AMC Services",
  tagline:
    "Proactive monitoring, regular updates, and absolute security to keep your digital platform running perfectly all year round.",
};

/* -------------------------- HERO: Video SVG (inline) -------------------------- */
const AmcHeroOverlay = () => {
  const shouldReduce = useReducedMotion();

  return (
    <g transform="translate(680, 50)">
      {/* Central Server/System */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="100" height="120" rx="10" fill={color.slate800} stroke={color.slate600} />
        {/* Server Lights */}
        {!shouldReduce && [0, 1, 2].map((i) => (
          <g key={i} transform={`translate(10, ${20 + i * 30})`}>
            <rect x="0" y="0" width="80" height="20" rx="2" fill={color.slate900} />
            <motion.circle 
              cx={10} cy={10} r={3} fill={color.emerald400}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
            <rect x="25" y="8" width="45" height="4" rx="2" fill={color.slate700} />
          </g>
        ))}
      </g>

      {/* Monitoring Drone/Eye */}
      <motion.g 
        transform="translate(40, 40)"
        animate={shouldReduce ? {} : { y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="30" cy="30" r="25" fill={color.white} stroke={color.slate200} />
        <circle cx="30" cy="30" r="15" fill={color.indigo100} />
        <motion.circle 
          cx={30} cy={30} r={8} fill={color.indigo600}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Scanning Ray */}
        <path d="M 45 45 L 80 80" stroke={color.cyan400} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      </motion.g>

      {/* Shield (Security) */}
      <motion.g 
        transform="translate(220, 60)"
        initial={{ rotate: 0 }}
        animate={shouldReduce ? {} : { rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <path d="M20 0 L40 10 L40 25 C40 40 30 50 20 60 C10 50 0 40 0 25 L0 10 Z" fill={color.emerald100} stroke={color.emerald500} strokeWidth="2" />
        <path d="M10 25 L18 33 L30 15" stroke={color.emerald600} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Data Flow */}
      <path d="M 70 80 Q 100 120, 100 150" fill="none" stroke={color.cyan200} strokeWidth="3" opacity="0.5" />
      <path d="M 230 100 Q 200 130, 200 160" fill="none" stroke={color.indigo300} strokeWidth="3" opacity="0.5" />
    </g>
  );
};

const VideoHeroAmc = ({ src = "", poster = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF AMC Services Hero";
  const desc = "Continuous monitoring and maintenance of digital systems.";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="amcTitle amcDesc" className="w-full h-auto">
        <title id="amcTitle">{title}</title>
        <desc id="amcDesc">{desc}</desc>
        <defs>
          <linearGradient id="amcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color.slate900} />
            <stop offset="100%" stopColor={color.indigo900} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#amcGrad)" rx="20" />
        <AmcHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <linearGradient id="amcBG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.slate900} />
          <stop offset="100%" stopColor={color.indigo900} />
        </linearGradient>
        <mask id="amcMask">
          <rect width="100%" height="100%" fill="white" />
          <AmcHeroOverlay />
        </mask>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#amcBG)" rx="20" />
      
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#amcMask)">
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

      <AmcHeroOverlay />
    </svg>
  );
};

/* ---------------------------------- Page ---------------------------------- */
export default function AMCServices() {
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
            AMC Services
          </span>
        </motion.nav>

        {/* Hero */}
        <div
          ref={heroRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
         style={{ position: 'relative' }}>
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black tracking-widest mb-6">
              SYSTEM MAINTENANCE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              {data.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {data.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {["24/7 Monitoring", "Security First", "Zero Downtime"].map((pill) => (
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
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-200 via-indigo-200 to-cyan-200 blur-2xl opacity-40"
              aria-hidden="true"
            />
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-4 shadow-xl overflow-hidden">
              <div className="w-full h-auto overflow-hidden rounded-[20px]">
                <VideoHeroAmc
                  src="https://cdn.coverr.co/videos/coverr-server-room-blinking-lights-5272/1080p.mp4" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Area with Book Design */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Explore Our <span className="text-emerald-600">Services</span></h2>
            <p className="text-slate-500 font-medium">Discover how we keep your platforms robust and secure.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={amcServicesData} 
              bookTitle="AMC Chronicles"
              bookSubtitle="Our Maintenance Standards"
              coverLabel="Read The Guide"
              pageLabel="Service"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
