import CompanyMarquee from "../../../components/Service/common/CompanyMarquee";
import GearSystem from "../../../components/Service/softwareIT/GearSystem";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap } from "lucide-react";

const SoftwareITServices = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative pt-4">
        {/* HERO SECTION */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100"
          >
            Engineering Excellence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl sm:text-7xl font-black text-[#0F172A] tracking-tighter leading-none mb-6 uppercase loading05-container"
          >
            <div className="flex flex-wrap justify-center gap-x-4 mb-2">
              {"INNOVATIVE SOFTWARE".split(" ").map((word, wordIdx) => (
                <div key={wordIdx} className="flex whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <span 
                      key={charIdx} 
                      className="loading05-char inline-block"
                      style={{ "--delay": `${(wordIdx * 10 + charIdx) * 0.05}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-4">
              {"& IT SOLUTIONS".split(" ").map((word, wordIdx) => (
                <div key={wordIdx} className="flex whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <span 
                      key={charIdx} 
                      className="loading05-char inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                      style={{ "--delay": `${(wordIdx * 10 + charIdx + 20) * 0.05}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.h1>

          <style>{`
            .loading05-container {
              perspective: 1000px;
            }
            .loading05-char {
              transform-origin: 50% 50% -25px;
              transform-style: preserve-3d;
              animation: loading05 1.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
              animation-delay: var(--delay);
              opacity: 0;
            }
            @keyframes loading05 {
              0% {
                transform: rotateX(-360deg);
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              100% {
                transform: rotateX(0);
                opacity: 1;
              }
            }
          `}</style>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Harnessing the power of mechanical precision and digital innovation to 
            protect your enterprise and drive technological growth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { icon: Cpu, label: "Advanced Core", val: "Synched" },
              { icon: ShieldCheck, label: "Security", val: "Encrypted" },
              { icon: Zap, label: "Response", val: "0.2ms" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 border-l-2 border-blue-100 pl-4">
                <stat.icon className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-sm font-bold text-slate-900 leading-none">{stat.val}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee Section (Top) */}
        <div className="opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <CompanyMarquee direction="right" />
        </div>

        {/* The Core Gear System - The main interactive focal point */}
        <div className="my-[-40px] relative z-10">
          <GearSystem />
        </div>

        {/* Marquee Section (Bottom) */}
        <div className="opacity-40 grayscale hover:grayscale-0 transition-all duration-700 mt-[-40px]">
          <CompanyMarquee direction="left" />
        </div>

        {/* Footer Technical CTA */}
        <div className="max-w-4xl mx-auto px-6 text-center mt-12 mb-20">
           <div className="p-10 rounded-[2.5rem] bg-[#0F172A] relative overflow-hidden group shadow-2xl shadow-blue-900/10 border border-slate-800">
              {/* Decorative background for the CTA */}
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0) ',
                backgroundSize: '24px 24px'
              }} />
              
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 uppercase tracking-tighter">
                  Ready to optimize your <span className="text-blue-400">ecosystem?</span>
                </h3>
                <p className="text-slate-400 text-sm max-w-md mb-8 font-medium leading-relaxed">
                  Integrate our high-performance solutions into your workflow and witness the power of mechanical precision in digital software.
                </p>
                <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  Initialize Project
                </button>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

export default SoftwareITServices;
