import { playPageTurnSound } from "../../../utils/pageTurnSound";

﻿import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InsightBook from '../../../components/Service/InsightBook';
import { legalServicesData } from '../../../data/service/legalServicesData';

/* -------------------------------- Build Book Pages -------------------------------- */
const coverEntry = legalServicesData[0];
const sectionEntries = legalServicesData.slice(1); // entries 2–44 → 43 pages

const buildPageContent = (entry) => {
  const lines = [];
  if (entry.description) lines.push(entry.description, '');
  if (entry.topics && entry.topics.length > 0) {
    entry.topics.forEach((t) => lines.push(`• ${t}`));
    lines.push('');
  }
  if (entry.finalNote) lines.push(entry.finalNote);
  return lines.join('\n');
};

const bookPages = sectionEntries.map((entry) => ({
  heading: entry.heading,
  content: buildPageContent(entry),
  rawContent: buildPageContent(entry),
}));

const mainDescription = coverEntry ? coverEntry.finalNote : '';

/* -------------------------------- Motion -------------------------------- */
const useAnims = () => {
  const shouldReduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduce
        ? { duration: 0 }
        : { duration: 0.25, when: 'beforeChildren', staggerChildren: 0.06 },
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
  amber50: '#EFF6FF',
  amber100: '#FEF3C7',
  amber500: '#F59E0B',
  amber600: '#D97706',
  amber900: '#78350F',
  orange50: '#EFF6FF',
  orange500: '#F97316',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  white: '#FFFFFF',
  indigo500: '#6366F1',
};

const LegalHeroOverlay = () => {
  return (
    <g transform="translate(680, 50)">
      <defs>
        <pattern id="lgGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color.slate700} strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="lgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color.cyan500} />
          <stop offset="100%" stopColor={color.cyan500} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#lgGrid)" />

      <g transform="translate(150, 150)">
        <motion.path
          d="M0 -80 L 70 0 L 0 80 L -70 0 Z"
          fill="url(#lgGrad)"
          opacity="0.9"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
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

const VideoHeroLegal = ({ src = '' }) => {
  const shouldReduce = useReducedMotion();
  const title = 'CRCCF Legal Services Hero';

  if (shouldReduce || !src) {
    return (
      <svg viewBox="0 0 1000 400" role="img" aria-label={title} className="w-full h-auto">
        <rect width="100%" height="100%" fill={color.slate900} rx="20" />
        <LegalHeroOverlay />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 400" className="w-full h-auto block" role="img" aria-label={title}>
      <defs>
        <mask id="lgHeroMask">
          <rect width="100%" height="100%" fill="white" />
          <LegalHeroOverlay />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={color.slate900} rx="20" />
      <foreignObject x="0" y="0" width="1000" height="400" mask="url(#lgHeroMask)">
        <video
          src={src}
          autoPlay muted playsInline loop
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
      </foreignObject>
      <LegalHeroOverlay />
    </svg>
  );
};

export default function LegalServices() {
  const navigate = useNavigate();
  const { container, itemUp } = useAnims();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
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
              Legal Services
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Professional Legal Services
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              {coverEntry ? coverEntry.description : 'CRCCF provides a complete and professional legal services support framework to help individuals, startups, businesses, institutions, NGOs and organizations manage their legal, compliance and documentation requirements.'}
            </p>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-blue-100 via-white to-cyan-100 blur-3xl opacity-60" />
            <div className="relative rounded-[40px] border border-gray-200 bg-white p-5 shadow-2xl overflow-hidden">
              <VideoHeroLegal src="https://cdn.coverr.co/videos/coverr-writing-in-a-notebook-2513/1080p.mp4" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Legal <span className="text-blue-600">Services</span></h2>
            <p className="text-slate-500 text-lg font-medium">Flip the cover to explore our 43 strategic legal services.</p>
          </div>

          <div className="py-6">
            <InsightBook
              allPages={bookPages}
              bookTitle="Legal Services"
              bookSubtitle="43 Pillars of Legal & Compliance Support"
              coverLabel="Explore Services"
            />
          </div>
        </div>

        {/* Conclusion Section */}
        <motion.div variants={itemUp} className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Conclusion</h3>
            <p className="text-slate-600 leading-relaxed font-medium relative z-10">
              {mainDescription || 'Our comprehensive legal support framework is designed to empower businesses and individuals with the confidence to navigate complex legal, compliance, and regulatory landscapes responsibly.'}
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
