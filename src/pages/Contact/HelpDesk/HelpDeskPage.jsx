import Cloudinary from '../../../constants/Cloudinary';
import React, { useState, useEffect } from 'react';
import { allCards } from './HelpDeskPageData';

export default function HelpDeskPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animType, setAnimType] = useState('stick'); // 'peel' or 'stick'

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setAnimType('');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page) => {
    if (isAnimating || page === currentPage) return;
    setIsAnimating(true);
    setAnimType('peel');
    
    setTimeout(() => {
      setCurrentPage(page);
      setAnimType('stick');
      
      setTimeout(() => {
        setIsAnimating(false);
        setAnimType('');
      }, 1800);
    }, 1800);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden bg-gradient-to-br from-[#f4f2ff] via-[#ebf0fe] to-[#f4efff] font-sans selection:bg-purple-200">
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-dash { animation: dash 2s linear infinite; }

        /* Nest Hub specific fixes */
        @media (min-width: 1024px) and (max-width: 1024px) and (max-height: 600px) {
          .device-text-block {
            top: 18% !important;
            left: 5% !important;
            width: 40vw !important;
            align-items: flex-start !important;
          }
          .device-title {
            font-size: 2.8rem !important;
            text-align: left !important;
          }
          .device-subtitle {
            font-size: 0.9rem !important;
            text-align: left !important;
            margin-top: 0.5rem !important;
          }
          .device-small-hp {
            align-items: flex-start !important;
          }
          .device-globe {
            width: 200px !important;
            height: 200px !important;
            top: 10% !important;
            right: 2% !important;
          }
          .device-headphones {
            width: 5rem !important;
            height: 5rem !important;
            bottom: 15% !important;
            left: 2% !important;
          }
          .device-247 {
            top: 55% !important;
            left: 5% !important;
            width: 5rem !important;
            height: 5rem !important;
          }
          .device-247 span {
            font-size: 1.2rem !important;
          }
          .device-phone-circle {
            top: 2% !important;
            left: 2% !important;
            width: 4rem !important;
            height: 4rem !important;
          }
        }

        /* iPad Pro specific fixes */
        @media (min-width: 1024px) and (max-width: 1024px) and (min-height: 1300px) {
          .device-text-block {
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 10% !important;
            width: 90vw !important;
          }
          .device-title {
            font-size: 4rem !important;
            text-align: center !important;
          }
          .device-subtitle {
            text-align: center !important;
            font-size: 1.5rem !important;
          }
          .device-laptop {
            width: 75% !important;
            height: 28% !important;
            padding-bottom: 2% !important;
          }
          .device-girl-desktop {
            display: none !important;
          }
          .device-girl-pad {
            display: block !important;
          }
          .device-247 {
            top: 25% !important;
            left: 8% !important;
          }
          .device-headphones {
            bottom: 35% !important;
            left: 5% !important;
          }
          .device-globe {
            top: 25% !important;
            right: -5% !important;
            opacity: 0.5 !important;
          }
        }
      `}</style>

      {/* Decorative Background Gradients & Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-white/70 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[#e0dfff]/80 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[20%] w-[40vw] h-[40vw] bg-[#eef1ff]/80 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Grid Dots (Top Left & Mid Right) */}
      <div className="absolute top-[8%] left-[5%] grid grid-cols-4 gap-2 opacity-[0.15] pointer-events-none">
         {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#543ce6] rounded-full"></div>)}
      </div>
      <div className="absolute top-[30%] right-[3%] grid grid-cols-4 gap-2 opacity-[0.15] pointer-events-none">
         {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-[#543ce6] rounded-full"></div>)}
      </div>

      {/* Faded 24/7 Circle */}
      <div className="absolute top-[40%] left-[5%] max-md:top-[35%] max-md:left-[2%] max-md:w-24 max-md:h-24 w-32 h-32 rounded-full border-2 border-dashed border-[#543ce6]/20 flex items-center justify-center opacity-30 pointer-events-none animate-[spin_60s_linear_infinite] device-247">
         <span className="text-[#543ce6] font-black text-3xl max-md:text-xl animate-[spin_60s_linear_infinite_reverse]">24/7</span>
      </div>

      {/* Exact Image Globe (Right side, Small) */}
      <div className="absolute top-[22%] right-[5%] w-[380px] h-[380px] max-md:top-auto max-md:bottom-[-10%] max-md:right-1/2 max-md:translate-x-1/2 max-md:w-[150vw] max-md:h-[150vw] max-md:opacity-40 flex items-center justify-center opacity-[0.85] pointer-events-none z-10 animate-float-slow device-globe">
         
         {/* The Globe Container */}
         <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Background Dotted Sphere */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-[radial-gradient(#c7d2fe_2px,transparent_2px)] bg-[size:9px_9px] opacity-50 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)] pointer-events-none animate-[spin_120s_linear_infinite]"></div>
            
            {/* Soft inner glow */}
            <div className="absolute w-[85%] h-[85%] rounded-full shadow-[inset_0_0_60px_rgba(255,255,255,0.6)] pointer-events-none"></div>

            {/* SVG Overlay for Orbits and Nodes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
               {/* Network Lines */}
               <path d="M 20 80 Q 60 50, 100 100 T 170 60" stroke="white" strokeWidth="0.5" fill="none" opacity="0.7" strokeDasharray="2 3" className="animate-dash" />
               <path d="M 65 30 Q 80 60, 100 100 T 85 180" stroke="white" strokeWidth="0.5" fill="none" opacity="0.7" strokeDasharray="2 3" className="animate-dash" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
               <path d="M 20 80 Q 50 150, 150 160" stroke="white" strokeWidth="0.5" fill="none" opacity="0.7" strokeDasharray="2 3" className="animate-dash" style={{ animationDuration: '4s' }} />
               <path d="M 65 30 Q 150 20, 170 60" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" strokeDasharray="2 3" className="animate-dash" style={{ animationDirection: 'reverse', animationDuration: '2.5s' }} />
               
               {/* Outer ring */}
               <circle cx="100" cy="100" r="85" stroke="white" strokeWidth="0.5" strokeDasharray="1 5" fill="none" opacity="0.3" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: 'center' }} />

               {/* Glowing Intersections / Nodes */}
               <circle cx="20" cy="80" r="1.5" fill="white" filter="drop-shadow(0 0 3px white)" className="animate-pulse" />
               <circle cx="170" cy="60" r="1.5" fill="white" filter="drop-shadow(0 0 3px white)" className="animate-pulse" style={{ animationDelay: '200ms' }} />
               <circle cx="85" cy="180" r="1.5" fill="white" filter="drop-shadow(0 0 3px white)" className="animate-pulse" style={{ animationDelay: '500ms' }} />
               <circle cx="150" cy="160" r="1.5" fill="white" filter="drop-shadow(0 0 3px white)" className="animate-pulse" style={{ animationDelay: '100ms' }} />
               <circle cx="65" cy="30" r="1.5" fill="white" filter="drop-shadow(0 0 3px white)" className="animate-pulse" style={{ animationDelay: '300ms' }} />
               
               <circle cx="110" cy="80" r="1" fill="white" filter="drop-shadow(0 0 2px white)" opacity="0.8" className="animate-pulse" style={{ animationDelay: '700ms' }} />
               <circle cx="90" cy="130" r="1" fill="white" filter="drop-shadow(0 0 2px white)" opacity="0.8" className="animate-pulse" style={{ animationDelay: '400ms' }} />
            </svg>

            {/* Central Phone Icon Circle */}
            <div className="absolute z-10 w-24 h-24 max-md:w-16 max-md:h-16 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-full border-[2px] border-white/90 shadow-[0_15px_30px_rgba(139,92,246,0.2),inset_0_2px_5px_rgba(255,255,255,0.6)] flex items-center justify-center animate-float-medium">
               <svg className="w-11 h-11 max-md:w-7 max-md:h-7 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] animate-[pulse_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
               </svg>
            </div>

         </div>
      </div>

      {/* Left Text Block */}
      <div className="absolute left-[8%] top-[15%] w-[45vw] max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[2%] max-md:w-[90vw] max-md:items-center md:max-lg:left-1/2 md:max-lg:-translate-x-1/2 md:max-lg:top-[10%] md:max-lg:w-[90vw] md:max-lg:items-center flex flex-col items-start z-30 device-text-block">
        <div className="flex flex-col items-start max-md:items-center md:max-lg:items-center mb-3 max-md:mb-1 animate-float-fast device-small-hp">
          {/* Miniature 3D Headphone Icon */}
          <div className="relative w-16 h-16 max-md:w-10 max-md:h-10 md:max-lg:w-14 md:max-lg:h-14 mb-2 max-md:mb-1">
             <svg className="w-full h-full drop-shadow-[0_8px_8px_rgba(67,56,202,0.4)]" viewBox="0 0 100 100" fill="none">
                <defs>
                   <linearGradient id="small-hp" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#312e81" />
                   </linearGradient>
                   <linearGradient id="small-gloss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                   </linearGradient>
                </defs>
                {/* Headband */}
                <path d="M 25 50 C 25 15, 75 15, 75 50" stroke="url(#small-hp)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 25 50 C 25 15, 75 15, 75 50" stroke="url(#small-gloss)" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
                {/* Ear Cups */}
                <rect x="15" y="45" width="20" height="35" rx="8" fill="url(#small-hp)" />
                <rect x="65" y="45" width="20" height="35" rx="8" fill="url(#small-hp)" />
                {/* Gloss on Cups */}
                <rect x="17" y="47" width="8" height="31" rx="4" fill="url(#small-gloss)" opacity="0.8" />
                <rect x="67" y="47" width="8" height="31" rx="4" fill="url(#small-gloss)" opacity="0.8" />
                {/* Mic Boom */}
                <path d="M 75 70 Q 85 90, 55 95" stroke="url(#small-hp)" strokeWidth="4" strokeLinecap="round" />
                {/* Mic Tip */}
                <circle cx="55" cy="95" r="5" fill="#312e81" />
                <circle cx="53" cy="93" r="1.5" fill="white" opacity="0.7" />
             </svg>
          </div>
          <span className="text-[#4338ca] font-black text-[13px] max-md:text-[10px] tracking-[0.2em] uppercase drop-shadow-sm md:max-lg:text-[11px]">Help Desk</span>
        </div>
        <h1 className="text-[#0f172a] font-extrabold text-[4.5rem] leading-[1.05] tracking-tight text-left max-md:text-center max-md:text-[2.6rem] max-md:leading-tight md:max-lg:text-center md:max-lg:text-[3.2rem] device-title">We Are Here<br/>to <span className="text-[#5b21b6]">Help You</span></h1>
        <p className="text-[#475569] font-medium text-[1.25rem] mt-6 leading-relaxed text-left max-md:text-center max-md:text-[0.9rem] max-md:mt-2 max-md:leading-snug md:max-lg:text-center md:max-lg:text-[1rem] md:max-lg:mt-4 device-subtitle">Find the right support instantly.<br/>Choose a helpline to connect.</p>
        
        {/* Underline decorative */}
        <div className="flex items-center mt-6 space-x-2 opacity-80 max-md:mt-3 md:max-lg:mt-4">
           <div className="w-14 h-2 max-md:h-1.5 bg-[#5b21b6] rounded-full"></div>
           <div className="w-2 h-2 max-md:h-1.5 max-md:w-1.5 bg-[#5b21b6] rounded-full"></div>
        </div>
      </div>

      {/* 3D Floating Elements */}
      
      {/* 1. Purple Shield (Top Right Center) */}
      <div className="absolute top-[15%] right-[28%] w-24 h-24 max-md:top-[12%] max-md:right-[15%] max-md:w-16 max-md:h-16 md:max-lg:top-[35%] md:max-lg:right-[10%] md:max-lg:w-20 md:max-lg:h-20 bg-gradient-to-br from-[#c4b5fd] to-[#8b5cf6] rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(139,92,246,0.5),inset_0_4px_10px_rgba(255,255,255,0.7),inset_0_-4px_10px_rgba(0,0,0,0.1)] animate-float-medium transform rotate-12 pointer-events-none z-10">
         <div className="w-14 h-14 max-md:w-10 max-md:h-10 md:max-lg:w-12 md:max-lg:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-inner drop-shadow-md">
            <svg className="w-8 h-8 max-md:w-5 max-md:h-5 md:max-lg:w-6 md:max-lg:h-6 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"></path></svg>
         </div>
      </div>

      {/* 2. Paper Airplane & Dotted Path Group (Top Right Corner) */}
      <div className="absolute top-[8%] right-[10%] w-[300px] h-[150px] max-md:top-[5%] max-md:-right-[5%] max-md:scale-75 md:max-lg:top-[5%] md:max-lg:-right-[10%] md:max-lg:scale-75 animate-float-slow pointer-events-none z-10 flex items-center justify-end">
         
         {/* Airplane Wavy Dotted Path (Connects to tail) */}
         <svg className="absolute right-[85px] top-[60px] w-48 h-24 opacity-40 z-0 overflow-visible" viewBox="0 0 200 100" fill="none">
            {/* Wavy path design that dips and curves up to meet the airplane tail */}
            <path d="M-20,120 C 40,10 100,150 150,70 S 180,30 200,20" stroke="#6d28d9" strokeWidth="2.5" strokeDasharray="6 6" className="animate-dash" />
         </svg>

         {/* Paper Airplane Icon */}
         <div className="relative w-28 h-28 z-10">
            <svg className="w-full h-full drop-shadow-[0_15px_15px_rgba(139,92,246,0.3)] transform -rotate-[15deg]" fill="currentColor" viewBox="0 0 24 24">
               {/* Exact solid paper airplane shape */}
               <path d="M3,20 L22,12 L3,4 L3,10 L16,12 L3,14 L3,20 Z" fill="url(#plane-grad)"/>
               <defs>
                  <linearGradient id="plane-grad" x1="0" y1="0" x2="1" y2="1">
                     <stop offset="0%" stopColor="#a78bfa" />
                     <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
               </defs>
            </svg>
         </div>
      </div>

      {/* 3. Chat Bubble (Right Center) */}
      <div className="absolute top-[35%] right-[32%] w-20 h-16 max-md:top-[28%] max-md:right-[15%] max-md:w-16 max-md:h-12 md:max-lg:top-[55%] md:max-lg:right-[15%] md:max-lg:w-16 md:max-lg:h-12 bg-gradient-to-br from-white to-[#f8fafc] rounded-[1.25rem] rounded-bl-none shadow-[0_15px_30px_-5px_rgba(139,92,246,0.2),inset_0_2px_5px_rgba(255,255,255,1)] flex items-center justify-center animate-float-fast transform -rotate-6 pointer-events-none z-10">
         <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-[#a78bfa] rounded-full"></div>
            <div className="w-2 h-2 bg-[#a78bfa] rounded-full"></div>
            <div className="w-2 h-2 bg-[#a78bfa] rounded-full"></div>
         </div>
      </div>

      {/* 4. Large 3D Headphones (Bottom Left) */}
      <div className="absolute bottom-[20%] left-[8%] w-40 h-40 max-md:top-[45%] max-md:bottom-auto max-md:-left-[5%] max-md:w-20 max-md:h-20 max-md:opacity-60 md:max-lg:bottom-[45%] md:max-lg:left-[5%] md:max-lg:w-28 md:max-lg:h-28 md:max-lg:opacity-70 animate-float-slow pointer-events-none z-20 transform -rotate-[15deg] device-headphones">
         <svg className="w-full h-full drop-shadow-[0_20px_20px_rgba(139,92,246,0.4)]" viewBox="0 0 100 100" fill="none">
            <defs>
               <linearGradient id="hp-main" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d8b4fe" />
                  <stop offset="50%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#581c87" />
               </linearGradient>
               <linearGradient id="hp-cushion" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#cbd5e1" />
               </linearGradient>
               <linearGradient id="hp-gloss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
               </linearGradient>
               <filter id="inner-glow">
                 <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.5"/>
               </filter>
            </defs>

            {/* Back Headband */}
            <path d="M 25 45 C 25 5, 75 5, 75 45" stroke="url(#hp-main)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 25 45 C 25 5, 75 5, 75 45" stroke="url(#hp-gloss)" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
            
            {/* Ear Cushions */}
            <rect x="30" y="42" width="10" height="30" rx="5" fill="url(#hp-cushion)" />
            <rect x="60" y="42" width="10" height="30" rx="5" fill="url(#hp-cushion)" />

            {/* Outer Ear Cups */}
            <rect x="15" y="38" width="18" height="38" rx="9" fill="url(#hp-main)" />
            <rect x="67" y="38" width="18" height="38" rx="9" fill="url(#hp-main)" />
            
            {/* Outer Ear Cups Gloss Highlights */}
            <rect x="17" y="40" width="8" height="34" rx="4" fill="url(#hp-gloss)" opacity="0.8" />
            <rect x="69" y="40" width="8" height="34" rx="4" fill="url(#hp-gloss)" opacity="0.8" />

            {/* Mic Boom */}
            <path d="M 75 65 Q 85 85, 55 90" stroke="url(#hp-main)" strokeWidth="4" strokeLinecap="round" />
            
            {/* Mic Tip */}
            <circle cx="55" cy="90" r="5" fill="#581c87" />
            <circle cx="53" cy="88" r="1.5" fill="white" opacity="0.6" />
         </svg>
      </div>

      {/* 5. Phone Circle (Top Left) */}
      <div className="absolute top-[8%] left-[25%] w-28 h-28 max-md:hidden md:max-lg:top-[25%] md:max-lg:left-[5%] md:max-lg:w-20 md:max-lg:h-20 bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] rounded-full shadow-[0_25px_50px_-12px_rgba(109,40,217,0.5),inset_0_4px_12px_rgba(255,255,255,0.5),inset_0_-4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center animate-float-medium transform rotate-6 pointer-events-none z-20 device-phone-circle">
         <svg className="w-12 h-12 md:max-lg:w-8 md:max-lg:h-8 text-white transform -rotate-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>
      </div>
      
      {/* Small floating telephone near shoulder */}
      <div className="absolute top-[45%] right-[40%] w-10 h-10 max-md:top-[40%] max-md:right-[15%] max-md:w-14 max-md:h-14 md:max-lg:top-[30%] md:max-lg:right-[30%] bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] rounded-full shadow-lg flex items-center justify-center animate-float-slow transform -rotate-12 pointer-events-none z-20 opacity-80">
         <svg className="w-5 h-5 max-md:w-7 max-md:h-7 text-[#8b5cf6]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>
      </div>

      {/* Main Container - Anchored to the very bottom */}
      <div className="relative z-40 flex flex-col items-center justify-end w-full h-full pb-0">
        
        {/* Wrapper to match image aspect ratio for precise absolute positioning */}
        <div className="relative h-[90vh] inline-flex justify-center items-end">
          
          {/* Desktop Image */}
          <img 
            src={Cloudinary.girl} 
            alt="Character Illustration Desktop" 
            className="relative z-20 object-contain object-bottom w-auto h-[90vh] max-w-[100vw] drop-shadow-[0_-15px_40px_rgba(0,0,0,0.1)] block align-bottom pointer-events-none hidden lg:block device-girl-desktop"
          loading="lazy" decoding="async" />
          {/* Pad Image */}
          <img 
            src={Cloudinary.girl3} 
            alt="Character Illustration Pad" 
            className="relative z-20 object-contain object-bottom w-auto h-[90vh] max-w-[100vw] drop-shadow-[0_-15px_40px_rgba(0,0,0,0.1)] align-bottom pointer-events-none hidden md:max-lg:block device-girl-pad"
          loading="lazy" decoding="async" />
          {/* Mobile Image */}
          <img 
            src={Cloudinary.girl2} 
            alt="Character Illustration Mobile" 
            className="relative z-20 object-contain object-bottom w-auto h-[90vh] max-w-[100vw] drop-shadow-[0_-15px_40px_rgba(0,0,0,0.1)] align-bottom pointer-events-none max-md:block hidden"
          loading="lazy" decoding="async" />

          {/* EXACT MATCH CSS LAPTOP OVERLAY */}
          <div 
             className="absolute z-30 flex flex-col items-center justify-end pb-[2%] lg:bottom-0 lg:w-[45%] lg:h-[46%] md:max-lg:bottom-0 md:max-lg:w-[85%] md:max-lg:h-[32%] md:max-lg:pb-[2%] max-md:bottom-0 max-md:w-[96%] max-md:h-[38%] max-md:pb-[4%] device-laptop"
          >
             {/* Laptop Lid (Silver Back) */}
             <div 
                className="relative w-full h-[90%] bg-gradient-to-br from-[#f2f4f7] via-[#dadde1] to-[#a3a6ab] shadow-[inset_0_2px_4px_rgba(255,255,255,1),_0_25px_50px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center overflow-hidden rounded-t-[1.5rem] border-[1.5px] border-white/80"
             >
                {/* Central White Logo (Now behind the UI) */}
                <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#ffffff] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(255,255,255,1)] opacity-30"></div>
                
                {/* Dashboard UI projected on the laptop lid */}
                <div className="relative z-10 w-full h-full flex flex-col p-1.5 bg-white/20 backdrop-blur-md max-md:p-1 max-md:pb-1">
                   
                   {/* Header */}
                   <div className="w-full text-center mb-1 max-md:mb-0.5">
                      <h3 className="text-gray-900 font-extrabold text-[13px] max-md:text-[11px] tracking-tight drop-shadow-sm">Dashboard</h3>
                   </div>

                   {/* Cards Grid (3 on top, 2 on bottom + Next Button) */}
                   <style>{`
                     @keyframes peelOff {
                       0% { transform: translateY(0) rotate(0) scale(1); opacity: 1; filter: drop-shadow(0 0 0 transparent); }
                       30% { transform: translateY(-5px) rotate(-2deg) scale(1.05); opacity: 1; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2)); }
                       100% { transform: translateY(-100px) rotate(-15deg) scale(0.8); opacity: 0; filter: drop-shadow(0 15px 15px rgba(0,0,0,0.1)); }
                     }
                     @keyframes stickOn {
                       0% { transform: translateY(-100px) rotate(15deg) scale(1.2); opacity: 0; filter: drop-shadow(0 15px 15px rgba(0,0,0,0.2)); }
                       70% { transform: translateY(2px) rotate(-1deg) scale(0.98); opacity: 1; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2)); }
                       100% { transform: translateY(0) rotate(0) scale(1); opacity: 1; filter: drop-shadow(0 0 0 transparent); }
                     }
                     .animate-peel { animation: peelOff 0.6s cubic-bezier(0.5, 0, 0.2, 1) both; }
                     .animate-stick { animation: stickOn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
                   `}</style>
                   <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full flex-1 min-h-0 pb-0.5">
                      
                      {/* Render 5 Sticky Notes */}
                      {allCards.slice((currentPage - 1) * 5, currentPage * 5).map((note, index) => (
                        <div 
                          key={note.id} 
                          className={`relative rounded-[1px] p-1 max-md:p-[2px] flex flex-col items-center shadow-[1px_3px_5px_rgba(0,0,0,0.2)] border-t border-l border-white/30 hover:-translate-y-[2px] hover:shadow-[3px_6px_10px_rgba(0,0,0,0.3)] hover:rotate-1 transition-all duration-300 cursor-pointer group ${note.bg} ${animType === 'peel' ? 'animate-peel' : animType === 'stick' ? 'animate-stick' : ''}`}
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                           
                           {/* Realistic Cellotape (Top Left) */}
                           <div className="absolute -top-[5px] -left-[6px] w-[30px] h-[10px] max-md:w-[20px] max-md:h-[6px] max-md:-top-[3px] max-md:-left-[4px] bg-[#93e4c1]/60 -rotate-45 shadow-[0_2px_4px_rgba(0,0,0,0.15)] backdrop-blur-[2px] z-20 mix-blend-multiply border-l border-r border-white/60 rounded-[1px] overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                           </div>
                           {/* Realistic Cellotape (Bottom Right) */}
                           <div className="absolute -bottom-[5px] -right-[6px] w-[30px] h-[10px] max-md:w-[20px] max-md:h-[6px] max-md:-bottom-[3px] max-md:-right-[4px] bg-[#93e4c1]/60 -rotate-45 shadow-[0_2px_4px_rgba(0,0,0,0.15)] backdrop-blur-[2px] z-20 mix-blend-multiply border-l border-r border-white/60 rounded-[1px] overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                           </div>
                           
                           {/* Paper Pattern (Lines) */}
                           <div className="absolute inset-0 pointer-events-none flex flex-col justify-evenly px-1 z-0 overflow-hidden">
                              {note.lines === 'grid' && (
                                <>
                                  <div className="w-full h-px bg-white/40"></div>
                                  <div className="w-full h-px bg-white/40"></div>
                                  <div className="absolute left-[15%] top-0 bottom-0 w-px bg-white/40"></div>
                                </>
                              )}
                              {note.lines === 'ruled' && (
                                <>
                                  <div className="w-full h-px bg-black/10 mt-1"></div>
                                  <div className="w-full h-px bg-black/10"></div>
                                  <div className="w-full h-px bg-black/10"></div>
                                  <div className="absolute left-[15%] top-0 bottom-0 w-px bg-red-500/30"></div>
                                </>
                              )}
                              {(note.lines === 'bulleted' || note.lines === 'dashed') && (
                                <>
                                  <div className={`w-full h-px mt-1 ${note.lines === 'dashed' ? 'border-b border-dashed border-black/20' : 'bg-black/10'}`}></div>
                                  <div className={`w-full h-px ${note.lines === 'dashed' ? 'border-b border-dashed border-black/20' : 'bg-black/10'}`}></div>
                                  <div className={`w-full h-px ${note.lines === 'dashed' ? 'border-b border-dashed border-black/20' : 'bg-black/10'}`}></div>
                                  {/* Bullets */}
                                  <div className="absolute left-[8%] top-[25%] w-[3px] h-[3px] bg-black/40 rounded-full"></div>
                                  <div className="absolute left-[8%] top-[50%] w-[3px] h-[3px] bg-black/40 rounded-full"></div>
                                  <div className="absolute left-[8%] top-[75%] w-[3px] h-[3px] bg-black/40 rounded-full"></div>
                                </>
                              )}
                           </div>
                           
                           {/* Content inside Sticky Note */}
                           <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-[2px] max-md:py-[1px]">
                              {/* Small Text Title */}
                              <h4 className="text-gray-900 font-black text-[7.5px] max-md:text-[5.5px] max-md:leading-tight tracking-wide mt-0.5 uppercase text-center w-[90%] pb-[1px] border-b border-black/20 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">{note.title}</h4>
                              
                              {/* Mini Icon */}
                              <div className="w-5 h-5 max-md:w-3.5 max-md:h-3.5 bg-black/10 rounded-full flex items-center justify-center mt-0.5 mb-[1px] max-md:mt-[1px] max-md:mb-[1px] group-hover:bg-black/15 transition-colors shadow-inner">
                                 <note.Icon className="w-3 h-3 max-md:w-[8px] max-md:h-[8px] text-gray-900 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                              </div>
                              
                              {/* Description Text */}
                              <p className="text-gray-900 text-[6.5px] max-md:text-[4.5px] max-md:leading-[1.1] text-center leading-[1.1] mb-0 font-bold px-[2px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] whitespace-pre-line flex-1 flex items-center justify-center">{note.desc}</p>
                              
                              {/* Footer Pill */}
                              <div className="w-[90%] max-md:w-full mt-auto border border-black/20 rounded-full py-[1px] max-md:py-[0.5px] flex items-center justify-center bg-white/40 shadow-sm group-hover:bg-white/60 transition-colors backdrop-blur-[1px]">
                                 <span className="text-gray-900 font-black text-[7px] max-md:text-[5px] drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">📞 {note.phone}</span>
                              </div>
                           </div>
                        </div>
                      ))}

                      {/* Next/Prev Button Sticky Note */}
                      <div 
                        onClick={() => handlePageChange(currentPage === 1 ? 2 : 1)}
                        className={`relative rounded-[1px] p-1 max-md:p-[2px] flex flex-col items-center justify-center shadow-[1px_3px_5px_rgba(0,0,0,0.2)] border border-white/50 bg-[#f8f9fa] hover:-translate-y-[2px] hover:shadow-[3px_6px_10px_rgba(0,0,0,0.3)] hover:-rotate-1 transition-all duration-300 cursor-pointer group ${animType === 'peel' ? 'animate-peel' : animType === 'stick' ? 'animate-stick' : ''}`}
                        style={{ animationDelay: `1000ms` }}
                      >
                         {/* Realistic Cellotape */}
                         <div className="absolute -top-[5px] -right-[6px] w-[30px] h-[10px] max-md:w-[20px] max-md:h-[6px] max-md:-top-[3px] max-md:-right-[4px] bg-[#93e4c1]/60 rotate-45 shadow-[0_2px_4px_rgba(0,0,0,0.15)] backdrop-blur-[2px] z-20 mix-blend-multiply border-l border-r border-white/60 rounded-[1px] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                         </div>
                         
                         <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="w-6 h-6 max-md:w-4 max-md:h-4 bg-black/5 rounded-full flex items-center justify-center mb-[2px] max-md:mb-[2px] group-hover:bg-black/10 transition-colors shadow-inner">
                               {currentPage === 1 ? (
                                  <svg className="w-3 h-3 max-md:w-[10px] max-md:h-[10px] text-black/70 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                               ) : (
                                  <svg className="w-3 h-3 max-md:w-[10px] max-md:h-[10px] text-black/70 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                               )}
                            </div>
                            <span className="text-black/70 font-extrabold text-[7px] max-md:text-[5.5px] uppercase tracking-wide text-center">{currentPage === 1 ? 'Next Page' : 'Prev Page'}</span>
                         </div>
                      </div>
                   </div>
                </div>
                
                {/* Left side highlight to enhance fake 3D */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-white/80 z-20"></div>
             </div>
             
             {/* Laptop Base & Hinge */}
             <div className="w-[102%] flex flex-col items-center relative z-40 -mt-[1px]">
                 
                 

                 {/* Dark Hinge Line */}
                 <div className="w-[85%] h-2.5 bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-b-sm border-x border-[#000] z-20 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"></div>
                 
                 {/* Silver Base Front Lip */}
                 <div className="w-full h-3.5 bg-gradient-to-b from-[#c0c3c8] to-[#8a8d93] rounded-bl-md rounded-br-sm shadow-2xl z-10 -mt-[1px] border-t border-[#ffffff] flex justify-center relative">
                    {/* Bevel highlight */}
                    <div className="absolute top-[1px] w-[95%] h-[1px] bg-white/80"></div>
                 </div>
             </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}

