import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";


const cyberNetwork =
  "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471811/cyber-network_jmukxj_qu3pn5.png";

const holographicPadlock =
  "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471811/holographic-padlock_lypzmc_fzczvm.png";

const serverRoom =
  "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471808/server-room_nmgcaj_fnyphh.png";

const legalScale =
  "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471810/legal-scale_bqsmvs_xlb0ah.png";

const aiBrain =
  "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471788/ai-brain_dv8lbu_dkxycg.png";


const slides = [
  {
    image: cyberNetwork, 
    badge: "DIGITAL SECURITY",
    title: "Protecting India’s Digital Infrastructure",
    desc: "CR Cyber Crime Foundation safeguards government bodies, enterprises, and citizens through advanced cybersecurity operations, threat intelligence, and continuous monitoring.",
  },
  {
    image: holographicPadlock, 
    badge: "CYBER FORENSICS",
    title: "Cyber Crime Investigation & Forensics",
    desc: "We investigate financial fraud, identity theft, online scams, and data breaches using court-admissible digital forensic methodologies.",
  },
  {
    image: serverRoom, 
    badge: "IT SOLUTIONS",
    title: "Secure IT & Software Solutions",
    desc: "We design and develop secure enterprise software, cloud infrastructure, and IT systems with compliance, scalability, and security at the core.",
  },
  {
    image: aiBrain, 
    badge: "ARTIFICIAL INTELLIGENCE",
    title: "AI-Driven Threat Intelligence",
    desc: "Our AI-powered systems detect anomalies, predict cyber threats, and help organizations respond proactively before damage occurs.",
  },
  {
    image: legalScale, 
    badge: "LEGAL SUPPORT",
    title: "Legal & Victim Support Services",
    desc: "We assist cyber crime victims with FIR filing, legal documentation, court procedures, and digital identity recovery.",
  },
];

const SLIDE_DURATION = 4000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-play timer
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#020617]">
      
      {/* 🔥 PERFECTLY SYNCED BACKGROUND IMAGES */}
      {/* All images are rendered at once. We just change opacity for a flawless crossfade. */}
      <div className="absolute inset-0 z-0 bg-[#020617]">
        {slides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide.image}
            alt={slide.badge}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'}
            fetchpriority={i === 0 ? 'high' : 'auto'}
            initial={false}
            animate={{
              opacity: index === i ? 0.35 : 0,
              scale: index === i ? 1 : 1.05,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        ))}
      </div>

      {/* 🔥 DARK GRADIENT OVERLAY (For readability) */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />

      {/* 🔥 FLOATING GLOW ORBS (Kept for depth) */}
      <motion.div 
        className="absolute z-2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" 
        animate={{ x: [0, 200, 0], y: [0, 100, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
        style={{ top: "10%", left: "10%" }} 
      />
      <motion.div 
        className="absolute z-2 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" 
        animate={{ x: [0, -150, 0], y: [0, 120, 0] }} 
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }} 
        style={{ bottom: "10%", right: "10%" }} 
      />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 w-full">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }} // Text syncs perfectly with image fade
              className="max-w-3xl text-center mx-auto"
            >
              
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 border border-white/20 text-sm text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {slides[index].badge}
              </div>

              {/* TITLE */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {slides[index].title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">
                  {slides[index].title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              {/* DESC */}
              <p className="text-gray-200 mb-10 text-base md:text-lg leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {slides[index].desc}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/services')}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-300 text-white cursor-pointer"
                >
                  Explore Services
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Contact Services
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
          
        </div>
      </div>

      {/* 🔥 PROGRESS PAGINATION */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
        <div className="flex gap-3 px-6 py-3 rounded-2xl bg-[#020617]/50 backdrop-blur-md border border-white/10">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className="relative w-12 h-1.5 bg-gray-700/50 rounded-full overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {i === index && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                />
              )}
              {i < index && <div className="absolute top-0 left-0 h-full w-full bg-blue-500/50" />}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}