import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaShieldAlt,
  FaSearch,
  FaCode,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";
import SectionHeading from "./common/SectionHeading";

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // New state to handle hover pause

  const items = [
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity Awareness",
      subtitle: "Building digital safety knowledge",
      desc: "We provide comprehensive training and education to build robust digital security knowledge across all levels, ensuring your teams are prepared for modern threats.",
      gradient: "from-blue-500 to-cyan-400",
      bgGlow: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: <FaSearch />,
      title: "Digital Investigation",
      subtitle: "Supporting forensic analysis",
      desc: "Our expert support for digital forensics and cybercrime investigation methodologies helps trace, analyze, and secure critical digital evidence.",
      gradient: "from-indigo-500 to-purple-500",
      bgGlow: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
    {
      icon: <FaCode />,
      title: "IT Development",
      subtitle: "Creating innovative solutions",
      desc: "We build custom software solutions and develop modern IT infrastructures designed to scale and solve complex contemporary business challenges.",
      gradient: "from-emerald-500 to-teal-400",
      bgGlow: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      icon: <FaUserGraduate />,
      title: "Professional Training",
      subtitle: "Empowering with skills",
      desc: "Industry-oriented programs designed to build real-world skills, practical exposure, and professional competence for the next generation of tech leaders.",
      gradient: "from-orange-500 to-rose-400",
      bgGlow: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); // Section is "opened" when 30% visible

  // Auto-play logic starts 3 seconds after section is visible
  useEffect(() => {
    if (isPaused || !isInView) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [items.length, isPaused, isInView, activeIndex]); // Added activeIndex to reset timer on manual click

  return (
    <section 
      ref={sectionRef}
      className="section-padding min-h-screen   md: md: flex items-center bg-[#F8FAFC] font-sans relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10 w-full">
        {/* HEADER */}
        <SectionHeading 
          subtitle="What We Do" 
          title="Our Core Work Domains" 
          highlightWord="Domains" 
          description="We provide specialized cybersecurity services, comprehensive training programs, and customized software solutions." 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center">
          {/* LEFT CARDS / MOBILE ACCORDION */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-4 w-full">
            {items.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <div key={i} className="flex flex-col w-full">
                  <button
                    onMouseEnter={() => {
                      setActiveIndex(i);
                      setIsPaused(true);
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => setActiveIndex(i)}
                    className={`group relative w-full text-left flex items-center p-3 lg:p-4 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white border-transparent shadow-lg scale-[1.02]"
                        : "bg-slate-50/50 border-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBorder"
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient} rounded-l-xl`}
                      />
                    )}

                    <div
                      className={`mr-4 text-lg lg:text-xl p-2.5 rounded-lg transition-all ${isActive ? `${item.textColor} ${item.bgGlow} scale-110` : "text-slate-400 bg-slate-100"}`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h4
                        className={`font-bold text-sm lg:text-base ${isActive ? "text-slate-900" : "text-slate-600"}`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] lg:text-xs text-slate-400">{item.subtitle}</p>
                    </div>
                  </button>

                  {/* MOBILE EXPANDABLE CONTENT */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="bg-white border border-slate-100 shadow-md rounded-2xl p-5 mt-3 mb-2 ml-2 mr-2">
                          <div
                            className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center text-2xl text-white bg-gradient-to-br ${item.gradient}`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            {item.desc}
                          </p>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT DISPLAY (DESKTOP ONLY) */}
          <div
            className="hidden lg:block lg:col-span-7 h-[420px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-10 overflow-hidden flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center text-3xl text-white bg-gradient-to-br ${items[activeIndex].gradient}`}
                  >
                    {items[activeIndex].icon}
                  </div>

                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">
                    {items[activeIndex].title}
                  </h3>
                  <p className="text-base text-slate-500 leading-relaxed mb-8">
                    {items[activeIndex].desc}
                  </p>


                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
