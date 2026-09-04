import Cloudinary from '../../../../constants/Cloudinary';
import ComingSoonPage from '../../../common/ComingSoonPage';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
const heroImg = Cloudinary.heroimg;
const heroBg = Cloudinary.jobVacancyBg;
import { portalConfig, jobListings, filterOptions } from '../../../../data/recruitment/JobVacancyPageData';
import { hrAdminData } from './job details/HRAdminData';
import { hrExecutiveData } from './job details/HRExecutiveData';
import { hrAssistantManagerData } from './job details/HRAssistantManagerData';


// --- FloatingDots.jsx ---



function FloatingDots() {
  // Generate random dots
  const dots = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2px to 6px
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 8 + 8, // 8s to 16s
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-indigo-400"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            opacity: dot.opacity,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

// --- FloatingCards.jsx ---



const FloatingIcons = {
  Status: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Companies: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Applications: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Category: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Positions: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const FloatingCard = ({ title, value, icon, delay, duration, positionClasses, hideOnMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, translateY: [0, -6, 0] }}
      transition={{
        opacity: { duration: 1, delay },
        translateY: { duration, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className={`absolute z-20 bg-white/90 backdrop-blur-md border border-white/60 shadow-lg rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3 hover:-translate-y-1 hover:shadow-xl transition-all cursor-default scale-[0.75] sm:scale-100 origin-center ${hideOnMobile ? 'hidden sm:flex' : 'flex'} ${positionClasses}`}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 shrink-0">
        <div className="scale-75 sm:scale-100">{icon}</div>
      </div>
      <div>
        <div className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="text-xs sm:text-base font-bold text-slate-800 leading-tight mt-0.5">{value}</div>
      </div>
    </motion.div>
  );
};

function FloatingCards({ department = "Security", vacancies = "3", status = "Active", level = "Senior", employmentType = "Full-time", workMode = "Hybrid" }) {
  // Format data
  const formattedStatus = status.split('/')[0].trim();
  const formattedVacancies = vacancies.split(' ')[0].trim();
  const formattedWorkMode = workMode.split('(')[0].trim();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        <FloatingCard
          title="Position Level"
          value={level}
          icon={FloatingIcons.Success}
          delay={0.2}
          duration={9}
          positionClasses="top-[5%] sm:top-[10%] -left-[10%] sm:-left-[5%]"
        />
        <FloatingCard
          title="Employment"
          value={employmentType}
          icon={FloatingIcons.Applications}
          delay={0.4}
          duration={11}
          positionClasses="top-[40%] sm:top-[40%] -left-[15%] sm:-left-[15%]"
          hideOnMobile={true}
        />
        <FloatingCard
          title="Open Positions"
          value={formattedVacancies}
          icon={FloatingIcons.Positions}
          delay={0.6}
          duration={10}
          positionClasses="bottom-[20%] sm:bottom-[15%] -left-[5%] sm:-left-[5%]"
        />
        <FloatingCard
          title="Hiring Status"
          value={formattedStatus}
          icon={FloatingIcons.Status}
          delay={0.3}
          duration={12}
          positionClasses="top-[0%] sm:top-[5%] -right-[10%] sm:-right-[5%]"
        />
        <FloatingCard
          title="Work Mode"
          value={formattedWorkMode}
          icon={FloatingIcons.Companies}
          delay={0.5}
          duration={13}
          positionClasses="top-[45%] sm:top-[50%] -right-[15%] sm:-right-[12%]"
          hideOnMobile={true}
        />
        <FloatingCard
          title="Department"
          value={department}
          icon={FloatingIcons.Category}
          delay={0.7}
          duration={14}
          positionClasses="bottom-[15%] sm:bottom-[10%] -right-[5%] sm:-right-[5%]"
        />
      </div>
    </div>
  );
}

// --- HeroBackground.jsx ---



function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/50"></div>
      
      {/* Subtle Orbit Lines */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full border-[1px] border-indigo-100/40"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border-[1px] border-slate-200/40"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[1000px] h-[1000px] rounded-full border-[1px] border-indigo-50/60"></div>

      {/* Floating Dots & Particles */}
      <FloatingDots />
      
      {/* Light Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
  );
}

// --- HeroIllustration.jsx ---





function HeroIllustration({ department, vacancies, status, level, employmentType, workMode }) {
  return (
    <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[650px] xl:max-w-[750px] mx-auto lg:mr-0 aspect-[4/3] lg:aspect-square flex justify-center items-center">
      {/* The main static 3D illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full h-full relative z-10"
      >
        <img loading="lazy" decoding="async" 
          src={heroImg}
          alt="3D Hero Illustration" 
          className="w-full h-full object-contain -translate-x-4 lg:-translate-x-10"
        />
      </motion.div>

      {/* Floating Cards Layers */}
      <FloatingCards 
        department={department}
        vacancies={vacancies}
        status={status}
        level={level}
        employmentType={employmentType}
        workMode={workMode}
      />
    </div>
  );
}

// --- HeroSection.jsx ---





function HeroSection({
  jobTitle = "Senior Cybersecurity Analyst",
  jobCode = "SEC-2026-004",
  department = "Security Operations",
  positionLevel = "Senior Level",
  numberOfVacancies = "3 Positions",
  applicationStatus = "Active / Accepting Applications",
  employmentType = "Full-time",
  workMode = "Hybrid"
}) {
  const handleScrollToApply = () => {
    const element = document.getElementById('apply-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden py-16 md:py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-center rounded-3xl border border-neutral-200 shadow-xl mb-10 select-none min-h-[580px] md:min-h-[640px]">
      
      {/* Background with subtle orbit lines and floating dots */}
      <HeroBackground />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* Left Content Column (52%) */}
        <div className="w-full lg:w-[52%] space-y-7 text-left relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-2 items-center"
          >
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full">
              {department}
            </span>
            <span className="px-3 py-1 text-xs font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full">
              {jobCode}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            {jobTitle}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-600 font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span>{positionLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>{numberOfVacancies}</span>
            </div>
            {applicationStatus && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                <span className="text-teal-600">{applicationStatus}</span>
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="text-[17px] text-slate-600 leading-relaxed max-w-xl"
          >
            Join our mission to secure digital horizons, combat cyber crime, and build robust safety networks. Apply today to lead our operational defense team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="pt-5 flex flex-wrap gap-5 items-center"
          >
            <button
              onClick={handleScrollToApply}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Apply Now
            </button>
            <div className="text-[13px] text-slate-500 font-medium max-w-[200px] leading-tight">
              Applications close on June 30, 2026. Secure your interview round.
            </div>
          </motion.div>
        </div>

        {/* Right Hero Illustration Column (48%) */}
        <div className="w-full lg:w-[48%] relative flex justify-center lg:justify-end items-center z-10 lg:pl-8">
          <HeroIllustration 
            department={department}
            vacancies={numberOfVacancies}
            status={applicationStatus}
            level={positionLevel}
            employmentType={employmentType}
            workMode={workMode}
          />
        </div>
        
      </div>

      {/* Animated Scroll Indicator (Laptop/Desktop View) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-slate-400 z-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scroll for more info</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

    </div>
  );
}

// --- PageAmbientBackground.jsx ---



const JobIcons = [
  // Briefcase
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  // Document / Resume
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  // Search
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  // Badge
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
  // Calendar
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  // Building
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  // User Profile
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  // Mail
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  // Laptop
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  // Shield
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  // Checklist
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
  // Status Indicator
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
];

function PageAmbientBackground() {
  const elements = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    icon: JobIcons[i % JobIcons.length],
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 95}%`,
    duration: 18 + Math.random() * 12,
    delay: Math.random() * 8,
    opacity: 0.03 + Math.random() * 0.05,
    size: 20 + Math.random() * 16,
  }));

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: `p-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.02 + Math.random() * 0.04,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Job-related floating icons */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-slate-800 flex items-center justify-center will-change-transform"
          style={{ top: el.top, left: el.left, width: el.size, height: el.size, opacity: el.opacity }}
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
            {el.icon}
          </svg>
        </motion.div>
      ))}

      {/* Tiny particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-slate-400 rounded-full will-change-transform"
          style={{
            top: p.top, left: p.left,
            width: '3px', height: '3px',
            opacity: p.opacity
          }}
          animate={{
            y: [-15, 15, -15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// --- JobVacancyPage.jsx ---







// Stacked Section Component with Scrubbed Scroll Experience
const StackedSection = ({ title, children, index }) => {
  const containerRef = useRef(null);

  // Entry phase: from when the section's top is at 85% of viewport to 45%
  const { scrollYProgress: entryProgressRaw } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 45%"]
  });

  // Exit phase: from when the section's bottom is at 85% of viewport to 45%
  const { scrollYProgress: exitProgressRaw } = useScroll({
    target: containerRef,
    offset: ["end 85%", "end 45%"]
  });

  // Apply smooth spring physics as requested
  const springConfig = { stiffness: 80, damping: 20, restDelta: 0.001 };
  const smoothEntry = useSpring(entryProgressRaw, springConfig);
  const smoothExit = useSpring(exitProgressRaw, springConfig);

  // Interpolate values based on combined entry and exit progress
  const opacity = useTransform(() => {
    const e = smoothEntry.get();
    const x = smoothExit.get();
    return Math.min(Math.max(e - x, 0), 1);
  });

  const scale = useTransform(() => {
    const e = smoothEntry.get();
    const x = smoothExit.get();
    return 1 + (0.06 * (1 - e)) - (0.04 * x);
  });

  const y = useTransform(() => {
    const e = smoothEntry.get();
    const x = smoothExit.get();
    return 80 * (1 - e) - 20 * x;
  });

  return (
    <div ref={containerRef} className="w-full relative will-change-transform" style={{ position: 'relative' }}>
      <motion.div
        className="sticky top-10 w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16 will-change-transform"
        style={{ opacity, scale, y, zIndex: index }}
      >
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-5 mb-8 tracking-tight flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
            {title}
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reading effect for paragraphs
const FadeText = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

// Reusable InfoCard Component
const InfoCard = ({ label, value, icon }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50/50 border border-neutral-100 hover:bg-neutral-50 transition-all duration-200">
      {icon && <div className="text-indigo-600 shrink-0 mt-0.5">{icon}</div>}
      <div className="space-y-1.5">
        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="block text-[15px] font-semibold text-slate-800">{value}</span>
      </div>
    </div>
  );
};

// Reusable List Component
const List = ({ items, type = 'bullet' }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-neutral-600 text-sm">
          {type === 'check' ? (
            <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-2"></span>
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

// Reusable SVG Icons for standard fields
const Icons = {
  JobCode: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Department: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Level: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Vacancies: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Status: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  EmploymentType: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  WorkMode: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Location: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Duration: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Date: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Contact: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
};

function JobVacancyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || 'CRCCF-HR-EXEC-2026-001';
  const data = jobId === 'CRCCF-HR-EXEC-2026-002' ? hrAdminData : 
               jobId === 'CRCCF-HR-ASSTMGR-2026-003' ? hrAssistantManagerData : hrExecutiveData;

const [viewMode,setViewMode]=useState("list");
  const [expandedNotice, setExpandedNotice] = useState({
    equalOpportunity: false,
    disclaimer: false,
    additionalInfo: false,
  });

  const toggleNotice = (key) => {
    setExpandedNotice(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-neutral-500 font-medium">Loading Job Details...</p>
        </div>
      </div>
    );
  }

  const {
    positionInformation = {},
    jobOverview = {},
    jobProfile = {},
    jobDescription = {},
    keyResponsibilities = {},
    eligibilityCriteria = {},
    skillsAndCompetencies = {},
    workEnvironment = {},
    compensationAndBenefits = {},
    whyJoinUs = {},
    trainingAndProbation = {},
    recruitmentProcess = {},
    importantDates = {},
    requiredDocuments = {},
    applicationInformation = {},
    contactInformation = {},
    importantNotices = {}
  } = data;

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800 selection:bg-blue-100 relative">
      <PageAmbientBackground />



      {/* Premium Interactive Hero Section */}
      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-8 mb-12 relative z-10">
        <HeroSection
          jobTitle={positionInformation.jobTitle}
          jobCode={positionInformation.jobCode}
          department={positionInformation.department}
          positionLevel={positionInformation.positionLevel}
          numberOfVacancies={positionInformation.numberOfVacancies}
          applicationStatus={positionInformation.applicationStatus}
          employmentType={jobOverview.employmentType}
          workMode={jobOverview.workMode}
        />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 lg:px-8 space-y-16 relative z-10 pb-32">

        {/* 1. Position Information */}
        <StackedSection title="1. Position Information" index={1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard label="Job Title" value={positionInformation.jobTitle} icon={Icons.EmploymentType} />
            <InfoCard label="Job Code" value={positionInformation.jobCode} icon={Icons.JobCode} />
            <InfoCard label="Department" value={positionInformation.department} icon={Icons.Department} />
            <InfoCard label="Position Level" value={positionInformation.positionLevel} icon={Icons.Level} />
            <InfoCard label="Number of Vacancies" value={positionInformation.numberOfVacancies} icon={Icons.Vacancies} />
            <InfoCard label="Application Status" value={positionInformation.applicationStatus} icon={Icons.Status} />
          </div>
        </StackedSection>

        {/* 2. Job Overview */}
        <StackedSection title="2. Job Overview" index={2}>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard label="Employment Type" value={jobOverview.employmentType} icon={Icons.EmploymentType} />
            <InfoCard label="Work Mode" value={jobOverview.workMode} icon={Icons.WorkMode} />
            <InfoCard label="Job Location" value={jobOverview.jobLocation} icon={Icons.Location} />
            <InfoCard label="Contract Duration" value={jobOverview.contractDuration} icon={Icons.Duration} />
          </div>
        </StackedSection>

        {/* 3. Job Profile */}
        <StackedSection title="3. Job Profile" index={3}>
          <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
            <FadeText>
              <p className="text-[15px] font-medium text-slate-700 leading-relaxed italic">
                "{jobProfile.shortOverviewOfThePosition}"
              </p>
            </FadeText>
          </div>
        </StackedSection>

        {/* 4. Job Description */}
        <StackedSection title="4. Job Description" index={4}>
          <FadeText>
            <p className="text-[15px] text-slate-600 leading-relaxed whitespace-pre-line">
              {jobDescription.detailedDescriptionOfTheRole}
            </p>
          </FadeText>
        </StackedSection>

        {/* 5. Key Responsibilities */}
        <StackedSection title="5. Key Responsibilities" index={5}>
          <FadeText>
            <List items={keyResponsibilities.responsibilitiesAndDuties} type="check" />
          </FadeText>
        </StackedSection>

        {/* 6. Eligibility Criteria */}
        <StackedSection title="6. Eligibility Criteria" index={6}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard label="Educational Qualification" value={eligibilityCriteria.educationalQualification} />
            <InfoCard label="Required Experience" value={eligibilityCriteria.requiredExperience} />
            <InfoCard label="Age Limit" value={eligibilityCriteria.ageLimit} />
            <InfoCard label="Language Requirements" value={eligibilityCriteria.languageRequirements} />
          </div>
        </StackedSection>

        {/* 7. Skills & Competencies */}
        <StackedSection title="7. Skills & Competencies" index={7}>
          <FadeText>
            <div className="space-y-6">
              {skillsAndCompetencies.technicalSkills && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Technical Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {skillsAndCompetencies.technicalSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-[13px] font-semibold text-blue-700 bg-blue-50 rounded-xl">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {skillsAndCompetencies.computerProficiency && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Computer Proficiency</span>
                  <div className="flex flex-wrap gap-2">
                    {skillsAndCompetencies.computerProficiency.map((comp, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-[13px] font-semibold text-emerald-700 bg-emerald-50 rounded-xl">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skillsAndCompetencies.softSkills && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Soft Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {skillsAndCompetencies.softSkills.map((soft, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-[13px] font-semibold text-slate-600 bg-slate-100 rounded-xl">
                        {soft}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skillsAndCompetencies.additionalRequirements && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Additional Requirements</span>
                  <List items={skillsAndCompetencies.additionalRequirements} />
                </div>
              )}
            </div>
          </FadeText>
        </StackedSection>

        {/* 8. Work Environment */}
        <StackedSection title="8. Work Environment" index={8}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoCard label="Shift Type" value={workEnvironment.shiftType} />
            <InfoCard label="Working Days" value={workEnvironment.workingDays} />
            <InfoCard label="Working Hours" value={workEnvironment.workingHoursShiftTiming} />
            <InfoCard label="Weekly Off" value={workEnvironment.weeklyOff} />
          </div>
        </StackedSection>

        {/* 9. Compensation & Benefits */}
        <StackedSection title="9. Compensation & Benefits" index={9}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 space-y-1">
              <span className="block text-[11px] font-semibold text-blue-500 uppercase tracking-wider">Annual CTC</span>
              <span className="block text-xl font-bold text-blue-900">{compensationAndBenefits.annualCtcSalaryPackage}</span>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 space-y-1">
              <span className="block text-[11px] font-semibold text-emerald-500 uppercase tracking-wider">Monthly Salary</span>
              <span className="block text-xl font-bold text-emerald-900">{compensationAndBenefits.monthlySalary}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4">
            <InfoCard label="PF Eligibility" value={compensationAndBenefits.pfEligibility} />
            <InfoCard label="ESI Eligibility" value={compensationAndBenefits.esiEligibility} />
          </div>
          {compensationAndBenefits.otherBenefits && (
            <FadeText>
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Other Benefits</span>
                <List items={compensationAndBenefits.otherBenefits} type="check" />
              </div>
            </FadeText>
          )}
        </StackedSection>

        {/* 10. Why Join Us? */}
        <StackedSection title="10. Why Join Us?" index={10}>
          <FadeText>
            <List items={whyJoinUs.allFields} type="check" />
          </FadeText>
        </StackedSection>

        {/* 11. Training & Probation */}
        <StackedSection title="11. Training & Probation" index={11}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard label="Training Period" value={trainingAndProbation.trainingPeriod} icon={Icons.Duration} />
            <InfoCard label="Probation Period" value={trainingAndProbation.probationPeriod} icon={Icons.Duration} />
            <InfoCard label="Internship Duration" value={trainingAndProbation.internshipDuration} icon={Icons.Duration} />
            <InfoCard label="Internship Stipend" value={trainingAndProbation.internshipStipend} icon={Icons.Status} />
          </div>
        </StackedSection>

        {/* 12. Recruitment Process */}
        <StackedSection title="12. Recruitment Process" index={12}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard label="Assessment" value={recruitmentProcess.assessmentTestRequirement} />
              <InfoCard label="Interview Rounds" value={recruitmentProcess.numberOfInterviewRounds} />
              <InfoCard label="Interview Mode" value={recruitmentProcess.interviewMode} />
            </div>
            <FadeText>
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Selection Process Flow</span>
                <p className="text-[15px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {recruitmentProcess.selectionProcess}
                </p>
              </div>
            </FadeText>
          </div>
        </StackedSection>

        {/* 13. Important Dates */}
        <StackedSection title="13. Important Dates" index={13}>
          <FadeText>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-[13px]">S</div>
                  <div className="w-0.5 h-full bg-slate-100"></div>
                </div>
                <div className="pb-4">
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Application Start Date</span>
                  <span className="text-[15px] font-bold text-slate-800">{importantDates.applicationStartDate}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-semibold text-[13px]">C</div>
                  <div className="w-0.5 h-full bg-slate-100"></div>
                </div>
                <div className="pb-4">
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Application Closing Date</span>
                  <span className="text-[15px] font-bold text-rose-600">{importantDates.applicationClosingDate}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-semibold text-[13px]">J</div>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Expected Joining Date</span>
                  <span className="text-[15px] font-bold text-slate-800">{importantDates.expectedJoiningDate}</span>
                </div>
              </div>
            </div>
          </FadeText>
        </StackedSection>

        {/* 14. Required Documents */}
        <StackedSection title="14. Required Documents" index={14}>
          <FadeText>
            <List items={requiredDocuments.requiredDocumentsList} type="check" />
          </FadeText>
        </StackedSection>

        {/* 15. Application Information */}
        <div id="apply-section">
          <StackedSection title="15. Application Information" index={15}>
            <div className="space-y-4">
              <InfoCard label="Application Fee" value={applicationInformation.applicationFee} icon={Icons.Status} />
              <InfoCard label="Submission Mode" value={applicationInformation.applicationSubmissionMode} icon={Icons.WorkMode} />
              <InfoCard label="Application Deadline" value={applicationInformation.applicationDeadline} icon={Icons.Duration} />
            </div>
          </StackedSection>
        </div>

        {/* 16. Contact Information */}
        <StackedSection title="16. Contact Information" index={16}>
          <FadeText>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    {Icons.Contact}
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Contact Department</span>
                    <span className="text-[15px] font-bold text-slate-800">{contactInformation.contactPersonDepartment}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200 space-y-2 text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center justify-between">
                    <span>Email:</span>
                    <a href={`mailto:${contactInformation.contactEmail}`} className="font-bold text-blue-600 hover:underline">
                      {contactInformation.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone:</span>
                    <span className="font-bold text-slate-800">{contactInformation.contactPhoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeText>
        </StackedSection>

        {/* 17. Important Notices */}
        <StackedSection title="17. Important Notices" index={17}>
          <FadeText>
            <div className="space-y-2">
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleNotice('equalOpportunity')}
                  className="w-full px-5 py-4 text-left flex items-center justify-between bg-transparent border-none outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[14px] font-bold text-slate-800">Equal Opportunity Statement</span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedNotice.equalOpportunity ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedNotice.equalOpportunity && (
                  <div className="px-5 pb-5 pt-1 text-[13px] text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed font-medium">
                    {importantNotices.equalOpportunityStatement}
                  </div>
                )}
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleNotice('disclaimer')}
                  className="w-full px-5 py-4 text-left flex items-center justify-between bg-transparent border-none outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[14px] font-bold text-slate-800">Recruitment Disclaimer</span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedNotice.disclaimer ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedNotice.disclaimer && (
                  <div className="px-5 pb-5 pt-1 text-[13px] text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed font-medium">
                    {importantNotices.recruitmentDisclaimer}
                  </div>
                )}
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleNotice('additionalInfo')}
                  className="w-full px-5 py-4 text-left flex items-center justify-between bg-transparent border-none outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[14px] font-bold text-slate-800">Special Instructions</span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedNotice.additionalInfo ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedNotice.additionalInfo && (
                  <div className="px-5 pb-5 pt-1 text-[13px] text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed font-medium">
                    {importantNotices.additionalInformationSpecialInstructions}
                  </div>
                )}
              </div>
            </div>
      </FadeText>
        </StackedSection>

        {/* Final Call to Action */}
        <div className="pt-10 pb-8 hidden lg:flex flex-col items-center justify-center text-center space-y-5 border-t border-slate-100 mt-10">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Ready to secure the future?</h3>
          <p className="text-slate-500 max-w-md">Take the next step in your career and join our defense operations team today.</p>
          <button className="px-12 py-4 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all text-lg flex items-center gap-3">
            Apply Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Sticky Apply Button for Mobile screens */}
        <div className="sticky bottom-4 left-0 right-0 lg:hidden px-4 py-3 bg-white/85 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400">Position Status</span>
            <span className="text-xs font-bold text-emerald-600">{positionInformation.applicationStatus}</span>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow active:scale-95 transition-all">
            Apply Now
          </button>
        </div>

      </div>
    </div>
  );
}


export default JobVacancyPage;
