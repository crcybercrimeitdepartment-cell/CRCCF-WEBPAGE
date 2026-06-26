import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  TrendingUp, GraduationCap, Target, ClipboardCheck, BarChart, 
  Rocket, Users, Globe, UserCheck, Briefcase, ShieldCheck, 
  Handshake, LifeBuoy, FileText, ArrowLeft, Download, CheckCircle2,
  Laptop, BookOpen, Lightbulb, Compass, Award, Building2
} from "lucide-react";
import { careerGuidanceData } from "../../data/skillDevelopment/CareerGuidanceData";

const iconMap = {
  TrendingUp, GraduationCap, Target, ClipboardCheck, BarChart,
  Rocket, Users, Globe, UserCheck, Briefcase, ShieldCheck,
  Handshake, LifeBuoy, FileText, Compass, Award
};

const FloatingIconsBackground = () => {
  const icons = [
    { Icon: Compass, top: '8%', left: '5%', size: 64, delay: 0 },
    { Icon: Award, top: '22%', right: '8%', size: 72, delay: 1 },
    { Icon: Lightbulb, top: '35%', left: '10%', size: 56, delay: 2 },
    { Icon: Building2, top: '48%', right: '12%', size: 80, delay: 0.5 },
    { Icon: Target, top: '65%', left: '8%', size: 60, delay: 1.5 },
    { Icon: BookOpen, top: '78%', right: '15%', size: 64, delay: 2.5 },
    { Icon: Rocket, top: '90%', left: '20%', size: 72, delay: 1.2 },
    { Icon: GraduationCap, top: '15%', right: '25%', size: 80, delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, i) => {
        const { Icon, top, left, right, size, delay } = item;
        return (
          <motion.div
            key={i}
            className="absolute text-blue-500/10"
            style={{ top, left, right }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </div>
  );
};

const CareerGuidance = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalSections = careerGuidanceData.sections.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <div className="w-full bg-white border-b border-slate-200 relative overflow-hidden">
        {/* Subtle background pattern to match the geometric aesthetic */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0zMCAwIEw2MCAxNSBMMzAgMzAgTDAgMTUgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjFmNWY5IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-60"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-4 pb-8 relative z-10">
          

          <div className="flex flex-col items-center text-center pb-16 pt-0">
            <span className="inline-block px-6 py-2 rounded-full bg-[#EFF6FF] text-[#3B82F6] text-[13px] font-black tracking-[0.15em] uppercase mb-6 shadow-sm">
              Professional Development
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black text-[#0A1128] leading-[1.1] tracking-tight mb-2">
              CAREER GUIDANCE <br />
              <span className="text-[#3B82F6]">& PLANNING</span>
            </h1>
            
            <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed mt-5 mb-12 font-medium">
              {careerGuidanceData.header.subtitle}
            </p>
            
            {/* Stats row */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 pt-10 border-t border-slate-100 min-w-[70%]">
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#3B82F6]">
                  <Users size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Mentorship</p>
                  <p className="text-[#0A1128] font-bold text-[15px]">Expert Led</p>
                </div>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-slate-200"></div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#3B82F6]">
                  <Target size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Focus</p>
                  <p className="text-[#0A1128] font-bold text-[15px]">Goal Oriented</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-slate-200"></div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#3B82F6]">
                  <Compass size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Direction</p>
                  <p className="text-[#0A1128] font-bold text-[15px]">Personalized</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Cards Section */}
      <div 
        ref={containerRef} 
        className="relative bg-slate-50"
        style={{ height: `${totalSections * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-20">
          <FloatingIconsBackground />
          <div className="relative w-full max-w-4xl px-4 md:px-8 flex items-center justify-center h-full z-10">
            
            {careerGuidanceData.sections.map((section, index) => {
              const IconComponent = iconMap[section.icon] || FileText;
              
              const step = 1 / totalSections;
              const start = Math.max(0, (index - 1) * step);     
              const focus = index * step;                        
              const exit = Math.min(1, (index + 1) * step);      
              
              const yRaw = useTransform(
                scrollYProgress,
                [start, focus, exit],
                ["120%", "0%", "-100%"]
              );
              
              const scaleRaw = useTransform(
                scrollYProgress,
                [start, focus, exit],
                [0.7, 1, 0.85]
              );
              
              const opacityRaw = useTransform(
                scrollYProgress,
                [start, focus, exit],
                [0, 1, 0]
              );

              const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };
              const y = useSpring(yRaw, springConfig);
              const scale = useSpring(scaleRaw, springConfig);
              const opacity = useSpring(opacityRaw, springConfig);

              return (
                <motion.div
                  key={section.id}
                  style={{
                    y,
                    scale,
                    opacity,
                    zIndex: totalSections - index,
                  }}
                  className="absolute w-full max-h-[85vh] bg-white rounded-[2rem] border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 overflow-y-auto origin-bottom flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <IconComponent size={240} />
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-4 md:gap-6 mb-8 shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="text-indigo-500 font-black text-2xl md:text-4xl tracking-wider opacity-80 shrink-0">
                        {section.number}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8 relative z-10 pb-4">
                    {section.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}

                    {section.highlights && section.highlights.length > 0 && (
                      <div className="pt-6 md:pt-8 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">
                          Key Highlights
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {section.highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                              <span className="text-sm md:text-[15px] font-medium text-slate-700 leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CareerGuidance;
