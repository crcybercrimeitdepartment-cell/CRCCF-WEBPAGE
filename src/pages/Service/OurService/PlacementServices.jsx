import { playPageTurnSound } from "../../../utils/pageTurnSound";

﻿import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import InsightBook from "../../../components/Service/InsightBook";
import { placementData } from "../../../data/service/placementData";

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

/* -------------------------- HERO: SVG Overlays -------------------------- */
const color = {
  amber50: "#EFF6FF",
  amber100: "#FEF3C7",
  amber500: "#F59E0B",
  amber600: "#D97706",
  amber900: "#78350F",
  orange50: "#EFF6FF",
  orange500: "#F97316",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
  white: "#FFFFFF",
  indigo500: "#6366F1",
};

const PlacementHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="plGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color.slate700} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="plGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.cyan500} />
          <stop offset="100%" stopColor={color.cyan500} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#plGrid)" />

      <g transform="translate(150, 150)">
        <motion.path
          d="M0 -80 L 70 0 L 0 80 L -70 0 Z"
          fill="url(#plGrad)"
          opacity="0.9"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.circle
          r="25"
          fill={color.white}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.path
          d="M-10 0 H 10 M 0 -10 V 10"
          stroke={color.blue600}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </g>
    </g>
  );
};

const VideoHeroPlacement = ({ src = "" }) => {
  const shouldReduce = useReducedMotion();
  const title = "CRCCF Placement Hero";

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-label={title} className="w-full h-auto">
        <rect width="100%" height="100%" fill={color.slate900} rx="20" />
        <PlacementHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <mask id="plHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <PlacementHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color.slate900} rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#plHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      </foreignObject>
      <PlacementHeroOverlay />
    </svg>
  );
};

export default function PlacementServices() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="bg-[#FBFDFF] min-h-screen">
      <motion.section
        variants={container} initial="hidden" animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16"
      >
        

        <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={itemUp}>
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 uppercase">
              Placement Services
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Placement Services
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              CRCCF provides Placement Services only for candidates who successfully complete our course, training or internship programs. We support eligible learners with technical and non-technical career opportunities, interview preparation, resume guidance, job readiness and possible project exposure in government, private and international work based on skills, performance and available requirements.
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-cyan-100 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-gray-200 bg-white p-5 shadow-2xl overflow-hidden">
               <VideoHeroPlacement src="https://cdn.coverr.co/videos/coverr-a-man-writing-in-his-notebook-4541/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Placement <span className="text-blue-600">Services</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip the cover to explore our 20 strategic placement pillars.</p>
          </div>

          <div className="py-6">
            <InsightBook 
              allPages={placementData} 
              bookTitle="Placement Services"
              bookSubtitle="20 Pillars of Career Support"
              coverLabel="Explore Services"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
