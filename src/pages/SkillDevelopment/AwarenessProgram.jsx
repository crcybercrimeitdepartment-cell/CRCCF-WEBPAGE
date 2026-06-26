import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Shield, Play, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { programsData } from '../../data/skillDevelopment/AwarenessPagedata';

const TopShelf = () => {
  return (
    <div className="absolute top-[6%] left-[2%] w-[96%] h-[3.5%] bg-[#3d2b1f] shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-20">
      <div className="w-full h-[2px] bg-white/10 absolute top-0 left-0"></div>
      <div className="absolute -top-[25px] left-[5%] w-[90%] h-[25px] bg-amber-400/30 blur-[20px]"></div>
      <div className="absolute -bottom-[25px] left-[5%] w-[90%] h-[25px] bg-amber-400/30 blur-[20px]"></div>
    </div>
  );
};

const ProgramCard = ({ program }) => {
  const IconComponent = Icons[program.icon] || Icons.Shield;

  return (
    <div 
      className="w-full h-full bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-center items-center text-center p-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white relative overflow-hidden group"
      style={{ boxShadow: `0 8px 20px -5px ${program.color}40` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
           style={{ 
             boxShadow: `inset 0 0 20px ${program.color}20`, 
             border: `1.5px solid ${program.color}` 
           }}>
      </div>

      <div className="flex-1 w-full relative z-10 flex flex-col justify-center items-center min-h-0">
        {program.image ? (
          <img loading="lazy" decoding="async" 
            src={program.image} 
            alt={program.title} 
            className="w-full h-full object-contain mix-blend-multiply"
            style={{ filter: `invert(1) hue-rotate(180deg) contrast(1.2)` }}
          />
        ) : (
          <IconComponent 
            className="w-[2.5vw] h-[2.5vw] transition-transform duration-300 group-hover:scale-110" 
            style={{ color: program.color, filter: `drop-shadow(0 4px 8px ${program.color}60)` }} 
          />
        )}
      </div>
      <div className="flex-none h-[35%] w-full flex items-start justify-center z-10 pt-2">
        <h3 className="text-[0.65vw] font-extrabold uppercase text-slate-800 leading-[1.3] px-1 tracking-wider group-hover:text-black transition-colors">
          {program.title}
        </h3>
      </div>
    </div>
  );
};

const CarouselRow = ({ title, programs }) => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft <= 2);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-none h-[35%] w-full flex flex-col mt-4 relative group">
      <h3 className="text-sm font-bold text-slate-200 mb-2 tracking-wide">{title}</h3>
      
      <button 
        onClick={scrollLeftBtn} 
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/80 text-white/50 hover:text-white backdrop-blur-sm border border-white/10 transition-all duration-300 ${isAtStart ? 'opacity-0 pointer-events-none scale-90' : 'opacity-0 group-hover:opacity-100 scale-100'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={scrollRightBtn} 
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/80 text-white/50 hover:text-white backdrop-blur-sm border border-white/10 transition-all duration-300 ${isAtEnd ? 'opacity-0 pointer-events-none scale-90' : 'opacity-0 group-hover:opacity-100 scale-100'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex-1 flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {programs.map((program) => (
          <div key={program.id} className="snap-start flex-shrink-0 w-[11vw]">
            <ProgramCard program={program} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TvScreen = () => {
  const row1 = programsData.slice(0, 12);
  const row2 = programsData.slice(12, 24);
  const row3 = programsData.slice(24, 36);
  const row4 = programsData.slice(36, 48);

  const remoteCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="64" viewBox="0 0 32 72"><rect x="4" y="2" width="24" height="68" rx="6" fill="%23111" stroke="%23555" stroke-width="1.5" /><circle cx="16" cy="12" r="3.5" fill="%23ef4444" /><circle cx="16" cy="28" r="8" fill="%23222" stroke="%23555" stroke-width="1" /><circle cx="16" cy="28" r="3" fill="%23555" /><rect x="8" y="44" width="6" height="12" rx="2" fill="%23333" /><rect x="18" y="44" width="6" height="12" rx="2" fill="%23333" /><circle cx="10" cy="62" r="1.5" fill="%23555" /><circle cx="16" cy="62" r="1.5" fill="%23555" /><circle cx="22" cy="62" r="1.5" fill="%23555" /></svg>') 14 12, auto`;

  return (
    <div 
      className="absolute inset-0 z-10 flex flex-col px-8 py-4 text-white font-sans overflow-y-auto hide-scrollbar bg-gradient-to-br from-[#0a1118] via-[#05080c] to-[#020305]" 
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: remoteCursor }}
    >
      <header className="flex-none flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-white" />
        <span className="text-xs tracking-widest font-semibold uppercase text-slate-200">Awareness Programs</span>
      </header>

      <div className="flex-none flex w-full min-h-[55%] mb-12">
        <div className="w-[60%] flex flex-col justify-center pr-4 py-4">
          <h1 className="text-[3vw] font-black leading-[1.1] mb-2 tracking-tight">
            Awareness <span className="text-[#3b82f6]">PROGRAMMES</span>
          </h1>
          <h2 className="text-[1vw] font-semibold text-slate-300 mb-2 tracking-wide">
          STAY SAFE
          STAY SECURE
          </h2>
          <p className="text-[0.9vw] text-[#3b82f6] font-medium mb-1">Learn. Understand. Protect.</p>
          <p className="text-[0.8vw] text-slate-400 max-w-[80%] mb-4 leading-relaxed">
            Stay informed about cyber threats and safeguard yourself in the digital world.
          </p>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-pink-600 hover:from-blue-600 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] text-[0.9vw]">
              <Play className="w-4 h-4 fill-current" />
              Explore Programs
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all border border-white/10 text-[0.9vw]">
              <Info className="w-4 h-4" />
              More Info
            </button>
          </div>
        </div>

        <div className="w-[45%] h-full flex items-center justify-center relative">
           <img loading="lazy" decoding="async" 
              src="/awareness_hero.png" 
              alt="Awareness Hologram" 
              className="w-full h-full object-contain -translate-y-[5%]"
              style={{ mixBlendMode: 'screen', filter: 'contrast(1.5) brightness(1.2)' }}
           />
        </div>
      </div>

      <CarouselRow title="Cyber Security Awareness" programs={row1} />
      <CarouselRow title="Technology & Development" programs={row2} />
      <CarouselRow title="Design, Business & Marketing" programs={row3} />
      <CarouselRow title="Professional & Legal Awareness" programs={row4} />

      <div className="flex-none h-8 w-full"></div>
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="absolute top-[9.5%] left-[2%] w-[12%] h-[73.5%] bg-[#3d2b1f] z-10 shadow-2xl flex flex-col">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(0,0,0,0.4)_6px,rgba(0,0,0,0.4)_10px)] opacity-60"></div>
      
      <div className="flex-1 border-b-[8px] border-[#2a1d13] relative flex items-end justify-center pb-[10%] w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md pointer-events-none"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
         <img loading="lazy" decoding="async" 
            src="/hanuman_statue.png" 
            alt="Hanuman Idol" 
            className="max-w-[85%] max-h-[90%] object-contain z-10 translate-y-[17%]" 
            style={{ 
               maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)', 
               WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)',
               mixBlendMode: 'lighten'
            }}
         />
      </div>
      <div className="flex-1 border-b-[8px] border-[#2a1d13] relative flex items-end justify-center pb-[8%] w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md pointer-events-none"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
         <img loading="lazy" decoding="async" 
            src="/bonsai_tree.png" 
            alt="Bonsai Tree in Bowl" 
            className="max-w-[85%] max-h-[90%] object-contain z-10 translate-y-[18%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)]" 
            style={{ 
               maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)', 
               WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)'
            }}
         />
      </div>
      <div className="flex-1 relative flex items-end justify-center pb-[10%]">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="absolute top-[9.5%] right-[2%] w-[12%] h-[73.5%] bg-[#3d2b1f] z-10 shadow-2xl flex flex-col">
       <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(0,0,0,0.4)_6px,rgba(0,0,0,0.4)_10px)] opacity-60"></div>
       
       <div className="flex-1 border-b-[8px] border-[#2a1d13] relative flex items-end justify-center pb-[10%] w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md pointer-events-none"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
         <img loading="lazy" decoding="async" 
            src="/lady_justice.png" 
            alt="Lady Justice Statue" 
            className="max-w-[80%] max-h-[85%] object-contain z-10 translate-y-[13%]" 
            style={{ 
               mixBlendMode: 'screen',
               filter: 'contrast(1.3) brightness(1.2)'
            }}
         />
       </div>
      <div className="flex-1 border-b-[8px] border-[#2a1d13] relative flex items-end justify-center pb-[10%]">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md pointer-events-none"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
         <div className="flex items-end justify-center z-10 w-[60%] h-[75%] pb-[2px] translate-y-[18%]">
             
             <div className="w-[22%] h-[90%] bg-gradient-to-r from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-sm shadow-[2px_0_4px_rgba(0,0,0,0.8)] border-l border-white/10 flex flex-col items-center justify-between py-[15%] z-10 overflow-hidden">
                 <div className="w-[60%] h-[1px] bg-amber-200/40"></div>
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span className="text-[5px] text-white/40 tracking-[0.3em] -rotate-90 whitespace-nowrap">DESIGN</span>
                 </div>
                 <div className="w-[60%] h-[1px] bg-amber-200/40"></div>
             </div>

             <div className="w-[24%] h-[100%] bg-gradient-to-r from-[#1a1a1a] via-[#0d0d0d] to-[#000000] rounded-sm shadow-[3px_0_5px_rgba(0,0,0,0.9)] border-l border-white/5 flex flex-col items-center justify-between py-[10%] z-20 overflow-hidden">
                 <div className="w-[40%] h-[10%] border border-amber-300/30 rounded-[1px]"></div>
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span className="text-[5px] text-amber-200/50 tracking-[0.2em] -rotate-90 whitespace-nowrap font-serif">HISTORY</span>
                 </div>
                 <div className="w-[40%] h-[1px] bg-amber-400/50"></div>
             </div>

             <div className="w-[26%] h-[95%] bg-gradient-to-r from-[#3d2b1f] via-[#2a1d13] to-[#1a110a] rounded-sm shadow-[4px_0_6px_rgba(0,0,0,0.8)] border-l border-white/10 flex flex-col items-center justify-between py-[10%] z-30 overflow-hidden">
                 <div className="w-[50%] h-[2px] bg-amber-500/60 shadow-[0_0_2px_rgba(245,158,11,0.5)]"></div>
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span className="text-[6px] text-white/60 tracking-[0.1em] -rotate-90 whitespace-nowrap font-bold">CYBER</span>
                 </div>
                 <div className="w-[50%] h-[2px] bg-amber-500/60"></div>
             </div>

             <div className="w-[20%] h-[85%] bg-gradient-to-r from-[#333] via-[#222] to-[#111] rounded-sm shadow-[5px_0_8px_rgba(0,0,0,0.9)] border-l border-white/10 flex flex-col items-center justify-between py-[15%] z-40 overflow-hidden">
                 <div className="w-[50%] h-[1px] bg-gray-400/50"></div>
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span className="text-[4px] text-gray-400/70 tracking-[0.4em] -rotate-90 whitespace-nowrap">ART</span>
                 </div>
                 <div className="w-[30%] h-[10%] rounded-[1px] bg-gray-500/30"></div>
             </div>

         </div>
      </div>
      <div className="flex-1 relative flex items-end justify-center pb-[10%] w-full">
         <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent blur-md pointer-events-none"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-amber-100 rounded-b-full shadow-[0_2px_10px_rgba(253,230,138,1)] z-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-b from-amber-400/30 via-amber-400/5 to-transparent blur-[15px] pointer-events-none z-10"></div>
         <img loading="lazy" decoding="async" 
            src="/victory_statue.png" 
            alt="Winged Victory of Samothrace" 
            className="max-w-[80%] max-h-[85%] object-contain z-10 translate-y-[8%]" 
            style={{ 
               mixBlendMode: 'screen',
               filter: 'contrast(1.2) brightness(1.1)'
            }}
         />
      </div>
    </div>
  );
};

const MediaConsole = ({ isTvOn, setIsTvOn }) => {
  return (
    <div className="absolute bottom-[8%] left-[2%] w-[96%] h-[10%] bg-[#e0dcd3] shadow-[0_30px_40px_rgba(0,0,0,0.3)] z-20 flex rounded-sm border-t border-b border-[#c8c2b7]">
       
       <div className="w-[28%] h-full flex items-center justify-end pr-[2%] border-r-[2px] border-[#c0b9ae] relative">
          <div className="w-[3px] h-[50%] bg-[#b0a99e] rounded-full shadow-inner"></div>
       </div>
       
       <div className="w-[44%] h-full bg-[#110f0e] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] relative flex items-end justify-between px-[5%] border-r-[2px] border-[#c0b9ae] pb-[2px]">
          <div className="absolute top-0 left-0 w-full h-[15px] bg-amber-400/30 blur-[10px]"></div>
          
          <div className="w-[35%] h-[35%] bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-[3px] flex items-center px-[4%] border-t border-[#333] border-b-4 border-[#020202] shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative mb-[2px] gap-3">
             <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isTvOn ? 'bg-blue-500 shadow-[0_0_8px_blue] animate-pulse' : 'bg-red-600 shadow-[0_0_4px_red]'}`}></div>
             
             <div 
                onClick={() => setIsTvOn(!isTvOn)}
                className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#111] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_2px_4px_rgba(0,0,0,0.6)] cursor-pointer hover:from-[#333] hover:to-[#1a1a1a] transition-all active:scale-95 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
             ></div>
             
             <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none rounded-t-[3px]"></div>
          </div>
          
          <div className="flex flex-col gap-[2px] justify-end items-end relative mr-[5%] mb-[2px]">
             
             <div className="w-[65px] h-[14px] bg-gradient-to-b from-[#a34444] via-[#752a2a] to-[#4a1818] rounded-[2px] shadow-[0_4px_6px_rgba(0,0,0,0.8)] border-t border-white/20 border-b border-black/50 relative z-10 translate-x-[6px] flex flex-col justify-between py-[1.5px] px-[4px] overflow-hidden">
                <div className="w-full h-[1px] bg-amber-400/60 shadow-[0_0_2px_rgba(251,191,36,0.5)]"></div>
                <div className="flex-1 flex items-center justify-center w-full">
                    <span className="text-[5px] text-white/50 tracking-[0.2em] font-bold">REACT</span>
                </div>
                <div className="w-full h-[1px] bg-amber-400/60 shadow-[0_0_2px_rgba(251,191,36,0.5)]"></div>
             </div>
             
             <div className="w-[80px] h-[18px] bg-gradient-to-b from-[#3a5475] via-[#24364f] to-[#121c2b] rounded-[2px] shadow-[0_8px_12px_rgba(0,0,0,0.9)] border-t border-white/20 border-b border-black/50 relative z-0 flex flex-col justify-between py-[2px] px-[6px] overflow-hidden">
                <div className="w-full h-[1px] bg-amber-300/50 shadow-[0_0_2px_rgba(252,211,77,0.5)]"></div>
                <div className="flex-1 flex items-center justify-center w-full">
                    <span className="text-[6px] text-amber-200/50 tracking-[0.3em] font-serif uppercase">JavaScript</span>
                </div>
                <div className="w-full h-[1px] bg-amber-300/50 shadow-[0_0_2px_rgba(252,211,77,0.5)]"></div>
             </div>

          </div>
       </div>

       <div className="w-[28%] h-full flex">
          <div className="w-[40%] h-full border-r-[2px] border-[#c0b9ae] flex items-center justify-end pr-[4%]">
          </div>
          <div className="w-[60%] h-full flex items-center justify-start pl-[5%]">
             <div className="w-[3px] h-[50%] bg-[#b0a99e] rounded-full shadow-inner"></div>
          </div>
       </div>

       <div className="absolute -bottom-[30px] left-[2%] w-[96%] h-[30px] bg-amber-400/40 blur-[20px] pointer-events-none"></div>
       <div className="absolute -top-[20px] left-[2%] w-[96%] h-[20px] bg-amber-300/30 blur-[20px] pointer-events-none"></div>
    </div>
  );
};

const Soundbar = () => {
  return (
    <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[35%] h-[2.5%] z-30 flex flex-col items-center">
       <div className="absolute -bottom-[15px] w-[95%] h-[15px] bg-black/40 blur-[8px] rounded-[100%] pointer-events-none"></div>
       <div className="w-[98%] h-[25%] bg-gradient-to-b from-[#4a4a4a] to-[#222] rounded-t-[2px] border-t border-white/10"></div>
       <div className="w-full h-[75%] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-[2px] border-t border-black flex items-center px-[3%] relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]"></div>
           <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red] z-10"></div>
       </div>
    </div>
  );
};

export default function AwarenessProgram() {
  const [isTvOn, setIsTvOn] = useState(true);

  return (
    <div className="w-screen h-screen bg-[#e8e4db] relative overflow-hidden flex items-center justify-center font-sans">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb] to-[#d6d0c4] z-0"></div>

      <div className="relative w-[96vw] h-[92vh] max-w-[1800px] mx-auto z-10">

        <TopShelf />
        <LeftPanel />
        <RightPanel />

        <div className="absolute top-[12.5%] left-[16%] w-[68%] h-[67%] bg-[#020202] rounded-sm border-[4px] border-[#0a0a0a] shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-20 flex p-[1px]">
           <div className="flex-1 bg-[#050505] rounded-[2px] relative overflow-hidden flex items-center justify-center border border-[#111]">
              
              <div className="absolute -inset-10 bg-cyan-400/10 blur-[60px] pointer-events-none"></div>

              <div className="absolute inset-0 z-0 bg-[#020202]"></div>
              
              <div className={`absolute inset-0 z-10 origin-center ${isTvOn ? 'animate-tv-on' : 'animate-tv-off pointer-events-none'}`}>
                 <TvScreen />
              </div>
              <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none -translate-y-[20%] -translate-x-[20%] -rotate-12"></div>
           </div>
        </div>

        <MediaConsole isTvOn={isTvOn} setIsTvOn={setIsTvOn} />
        <Soundbar />

        <div className="absolute bottom-[1%] left-[10%] w-[80%] h-[3%] bg-amber-400/10 blur-[10px] z-10"></div>
        
      </div>
    </div>
  );
}
