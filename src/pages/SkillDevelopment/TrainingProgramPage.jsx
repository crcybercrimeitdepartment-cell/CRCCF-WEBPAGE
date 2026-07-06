import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  heroData,
  sectionsData,
  cardsData,
  timelineData,
  faqData,
  statsData,
  testimonialsData,
  trainingProgramData,
  countersData,
  iconConfig,
  imageConfig,
  labels,
  constants
} from "../../data/skillDevelopment/TrainingProgramPageData";

import { FaSearch, FaChevronUp, FaChevronDown, FaCloudSun, FaWindows, FaAngleUp, FaWifi, FaVolumeUp, FaBatteryFull, FaEdge } from 'react-icons/fa';
import { SiGooglechrome, SiWhatsapp, SiCanva } from 'react-icons/si';
import { FcFolder } from 'react-icons/fc';

// --- Keyboard Component ---
const Keyboard = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => setActiveKeys(prev => new Set(prev).add(e.code));
    const handleKeyUp = (e) => {
      setActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const getKeyClass = (code, extraClass = "") => {
    const isActive = activeKeys.has(code);
    const base = `key-3d bg-[#d3cebe] ${extraClass} transition-all duration-75`;
    return isActive 
      ? `${base} translate-y-[2px] !border-b-[2px] !border-r-[1px] !shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),0_1px_1px_rgba(0,0,0,0.9)] !bg-[#c2beae]` 
      : base;
  };

  return (
    <div className="keyboard-base w-[85%] md:w-[75%] max-w-[800px] h-[120px] md:h-[160px] bg-[#d3cebe] rounded-lg border-b-[15px] border-r-[5px] border-[#a19c8f] shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.8)] shrink-0" style={{ transform: 'perspective(800px) rotateX(25deg)' }}>
      {/* Keyboard Keys Grid wrapper */}
      <div className="w-full h-full p-2 md:p-4 flex gap-2 md:gap-4 justify-between">
         {/* Main alphanumeric block */}
         <div className="flex-1 flex flex-col justify-between h-full gap-1 md:gap-1.5">
           {/* Row 1 */}
           <div className="flex gap-1 md:gap-1.5 flex-1">
             {constants.kbLayout[0].map((code) => <div key={code} className={getKeyClass(code, "flex-1")}></div>)}
           </div>
           {/* Row 2 */}
           <div className="flex gap-1 md:gap-1.5 flex-1 pl-2">
             {constants.kbLayout[1].map((code, i) => <div key={code} className={getKeyClass(code, i === 13 ? "flex-[2]" : "flex-1")}></div>)}
           </div>
           {/* Row 3 */}
           <div className="flex gap-1 md:gap-1.5 flex-1 pl-4">
             {constants.kbLayout[2].map((code, i) => <div key={code} className={getKeyClass(code, i === 0 ? "flex-[1.5]" : i === 13 ? "flex-[1.5]" : "flex-1")}></div>)}
           </div>
           {/* Row 4 */}
           <div className="flex gap-1 md:gap-1.5 flex-1 pl-6">
             {constants.kbLayout[3].map((code, i) => <div key={code} className={getKeyClass(code, i === 0 ? "flex-[1.8]" : i === 12 ? "flex-[2.2]" : "flex-1")}></div>)}
           </div>
           {/* Row 5 */}
           <div className="flex gap-1 md:gap-1.5 flex-1 pl-2">
             {constants.kbLayout[4].map((code, i) => <div key={code} className={getKeyClass(code, i === 0 ? "flex-[2.2]" : i === 11 ? "flex-[2.8]" : "flex-1")}></div>)}
           </div>
           {/* Row 6 (Spacebar row) */}
           <div className="flex space-x-1 md:space-x-1.5 flex-1 justify-center">
             {constants.kbLayout[5].map((code) => <div key={code} className={getKeyClass(code, code === 'Space' ? "w-[40%]" : "w-[8%]")}></div>)}
           </div>
         </div>
         
         {/* Nav block */}
         <div className="hidden md:grid grid-rows-5 gap-1 md:gap-1.5 w-[15%]">
            <div className="grid grid-cols-3 gap-1 md:gap-1.5">
               {Array.from({length: 3}).map((_,i) => <div key={`n1-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-1.5">
               {Array.from({length: 6}).map((_,i) => <div key={`n2-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
            </div>
            <div className="grid grid-rows-2 grid-cols-3 gap-1 md:gap-1.5 mt-auto h-1/2">
               <div className="col-start-2 key-3d bg-[#d3cebe]"></div>
               <div className="col-span-3 grid grid-cols-3 gap-1 md:gap-1.5">
                 {Array.from({length: 3}).map((_,i) => <div key={`n3-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
               </div>
            </div>
         </div>
         
         {/* Numpad block */}
         <div className="hidden md:grid grid-rows-5 grid-cols-4 gap-1 md:gap-1.5 w-[20%]">
             {Array.from({length: 4}).map((_,i) => <div key={`num1-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
             {Array.from({length: 3}).map((_,i) => <div key={`num2-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
             <div className="key-3d row-span-2 bg-[#d3cebe]"></div>
             {Array.from({length: 3}).map((_,i) => <div key={`num3-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
             {Array.from({length: 3}).map((_,i) => <div key={`num4-${i}`} className="key-3d bg-[#d3cebe]"></div>)}
             <div className="key-3d row-span-2 bg-[#d3cebe]"></div>
             <div className="key-3d col-span-2 bg-[#d3cebe]"></div>
             <div className="key-3d bg-[#d3cebe]"></div>
         </div>
      </div>
    </div>
  );
};

// --- Mouse Component ---
const Mouse = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden sm:block w-14 md:w-20 h-20 md:h-28 bg-[#d3cebe] rounded-[2rem] rounded-t-[3rem] border-r-[6px] border-b-[10px] border-[#a19c8f] shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.9)] relative shrink-0" 
         style={{ 
           transform: `perspective(800px) rotateX(25deg) rotateZ(${-8 + mousePos.x * 10}deg) translateX(${mousePos.x * 40}px) translateY(${mousePos.y * 40}px)`,
           transition: 'transform 0.1s ease-out'
         }}>
       {/* Mouse Wire */}
       <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 h-12 bg-[#2d2d2d] opacity-60 rounded-t-full -z-10" style={{ transform: 'rotateZ(15deg)', transformOrigin: 'bottom center' }}></div>
       
       {/* Mouse buttons */}
       <div className="w-full h-[40%] flex border-b-[3px] border-[#a19c8f] opacity-90 rounded-t-[3rem] overflow-hidden">
         <div className="flex-1 border-r-[1.5px] border-[#a19c8f] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8)] cursor-pointer active:bg-[#c8c3b3]"></div>
         <div className="flex-1 border-l-[1.5px] border-[#a19c8f] shadow-[inset_0_2px_5px_rgba(255,255,255,0.8)] cursor-pointer active:bg-[#c8c3b3]"></div>
       </div>
       
       {/* Scroll wheel */}
       <div className="absolute top-[32%] left-1/2 -translate-x-1/2 w-2.5 h-6 bg-[#7a766c] rounded-full shadow-[inset_0_3px_5px_rgba(0,0,0,0.8)] border border-[#5a5750] cursor-ns-resize z-20"></div>
    </div>
  );
};

// --- ProgramCard Component ---
const ProgramCard = ({ program }) => {
  const Icon = program.icon;
  const navigate = useNavigate();
  const slug = program.name.toLowerCase().replace(/[\s/]+/g, '-');

  return (
    <div 
      onClick={() => navigate(`/skill-development/${slug}`)}
      className={`border border-transparent hover:border-gray-300 flex flex-col items-center justify-start p-2 md:p-2 rounded-xl cursor-pointer ${program.color} bg-transparent hover:bg-black/5 transition-all duration-200 group`}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-1 border-2 border-current bg-white/60 rounded-2xl shadow-sm group-hover:shadow-md group-hover:bg-white group-hover:scale-110 transition-all">
        <Icon className="text-3xl md:text-4xl drop-shadow-sm" />
      </div>
      <div className="flex flex-col items-center justify-start w-full text-center">
        <span className="text-xs md:text-sm text-gray-800 uppercase font-bold leading-tight line-clamp-2 px-1">
          {program.name}
        </span>
      </div>
    </div>
  );
};

// --- ScreenContent Component ---
const ScreenContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -constants.scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: constants.scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-row p-3 md:p-5 pb-0 min-h-0 font-['VT323']">
      
      {/* Left Side: Main Content area */}
      <div className="flex-1 flex flex-col h-full mr-2 md:mr-4 relative">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-3 pb-2 border-b border-[#2d2d2d]/30 shrink-0">
          <div className="border border-[#2d2d2d]/30 px-2 py-0.5 rounded-sm text-[#2d2d2d] text-[8px] md:text-xs font-bold tracking-widest hidden sm:block">
            {labels.systemVersion}
          </div>
          
          <h1 className="text-sm md:text-2xl lg:text-3xl font-bold tracking-[0.2em] text-[#2d2d2d] text-center drop-shadow-sm flex-1 sm:flex-none">
            {labels.mainTitle}
          </h1>
          
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-2 text-[#2d2d2d]/50 text-xs" />
              <input 
                type="text" 
                placeholder={labels.searchPlaceholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/50 border border-[#2d2d2d]/30 text-[#2d2d2d] placeholder-[#2d2d2d]/50 text-xs px-2 py-1 pl-6 rounded-sm outline-none focus:border-[#2d2d2d] focus:shadow-[0_0_10px_rgba(0,0,0,0.1)] w-28 md:w-40 font-mono tracking-widest uppercase transition-all"
              />
            </div>
            <div className="hidden lg:flex space-x-1 ml-2">
              <div className="w-3 h-2 border border-[#2d2d2d]/30 rounded-sm"></div>
              <div className="w-3 h-2 border border-[#2d2d2d]/30 rounded-sm"></div>
              <div className="w-3 h-2 border border-[#2d2d2d] rounded-sm bg-[#2d2d2d]/20"></div>
            </div>
          </div>
        </header>

        {/* Main Grid Content (Scrollable) */}
        <main 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto custom-scrollbar relative z-20 pr-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-3 lg:gap-y-4 auto-rows-max pb-8 pt-2 px-4">
            {trainingProgramData.filter(program => program.name.toLowerCase().includes(searchQuery.toLowerCase())).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </main>
      </div>

      {/* Right Side: Scrollbar Area */}
      <div className="w-8 md:w-12 flex flex-col justify-between items-center border-l border-[#2d2d2d]/20 pl-2 md:pl-4 py-2 shrink-0 select-none">
        <div onClick={scrollUp} className="text-[#2d2d2d]/50 hover:text-[#2d2d2d] cursor-pointer hover:scale-110 transition-transform active:scale-95">
          <FaChevronUp className="text-sm md:text-lg" />
        </div>
        <div className="flex-1 w-2 md:w-3 border border-[#2d2d2d]/30 rounded-full my-2 flex flex-col items-center py-1 overflow-hidden">
          <div 
            className="w-full h-1/3 bg-[#888] rounded-full transition-transform duration-75 ease-out"
            style={{ transform: `translateY(${scrollProgress * 200}%)` }}
          ></div>
        </div>
        <div onClick={scrollDown} className="text-[#2d2d2d]/50 hover:text-[#2d2d2d] cursor-pointer hover:scale-110 transition-transform active:scale-95">
          <FaChevronDown className="text-sm md:text-lg" />
        </div>
      </div>

    </div>
  );
};

// --- Taskbar Component ---
const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="h-10 shrink-0 bg-[#c0c0c0] border-t border-gray-400 flex items-center justify-between px-2 text-black font-sans text-xs relative z-50">
      
      {/* Left / Center Taskbar Items */}
      <div className="flex items-center space-x-1 h-full">
        {/* Weather */}
        <div className="hidden lg:flex items-center hover:bg-black/10 px-2 rounded-md h-8 cursor-pointer transition-colors mr-2">
          <FaCloudSun className="text-yellow-500 text-lg mr-2" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">{constants.weatherTemp}</span>
            <span className="text-[10px] text-gray-700">{constants.weatherCondition}</span>
          </div>
        </div>
        
        {/* Start Button */}
        <div className="hover:bg-black/10 p-2 rounded-md cursor-pointer transition-colors flex items-center font-bold italic text-blue-800">
          <FaWindows className="text-blue-600 text-lg mr-1" />
          {labels.start}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border-gray-400 border shadow-inner px-3 py-1.5 w-48 mx-2 transition-colors cursor-pointer">
          <FaSearch className="text-gray-500 mr-2" />
          <span className="text-gray-500 text-xs italic">{labels.searchTaskbar}</span>
        </div>

        {/* Taskbar App Icons */}
        <div className="flex space-x-1 px-2 border-l border-gray-400 pl-2 ml-1">
          <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer"><FcFolder className="text-lg" /></div>
          <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer"><FaEdge className="text-blue-600 text-lg" /></div>
          <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer"><SiWhatsapp className="text-green-600 text-lg" /></div>
          <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer"><SiGooglechrome className="text-yellow-500 text-lg" /></div>
          <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer"><SiCanva className="text-blue-500 text-lg" /></div>
        </div>
      </div>

      {/* Right System Tray */}
      <div className="flex items-center space-x-1 h-full border-l border-white pl-2 ml-2 shadow-[-1px_0_0_#888]">
        <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer hidden md:block"><FaAngleUp /></div>
        <div className="hover:bg-black/10 px-2 rounded-md cursor-pointer h-8 hidden md:flex items-center text-[10px] leading-tight text-center">{labels.language}<br/>{labels.languageSub}</div>
        <div className="hover:bg-black/10 p-1.5 rounded-md cursor-pointer flex items-center space-x-2">
          <FaWifi />
          <FaVolumeUp />
          <div className="hidden sm:flex items-center space-x-1"><FaBatteryFull className="text-green-600" /><span>{labels.battery}</span></div>
        </div>
        <div className="hover:bg-black/10 px-2 rounded-md h-8 cursor-pointer flex flex-col items-end justify-center leading-tight transition-colors">
          <span>{formatTime(time)}</span>
          <span className="text-[10px]">{formatDate(time)}</span>
        </div>
      </div>

    </div>
  );
};

// --- App Component ---
export default function TrainingProgramPage() {
  const [isScreenOn, setIsScreenOn] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#f0ede1] flex flex-col items-center justify-end font-sans overflow-hidden">
      
      {/* Background Room Lighting */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #dcd3c3 100%)' }}>
      </div>

      {/* The Physical Monitor Casing */}
      <div className="monitor-casing-3d relative w-[95%] max-w-[1200px] bg-[#d3cebe] rounded-[2rem] p-4 md:p-6 lg:p-8 pb-12 md:pb-16 shadow-[0_40px_80px_rgba(0,0,0,0.4),inset_0_5px_20px_rgba(255,255,255,0.9),inset_0_-10px_30px_rgba(0,0,0,0.1)] z-10 mx-auto mt-4 md:mt-6">
        
        {/* Embossed Logo & Power Area */}
        <div className="absolute bottom-0.5 md:bottom-1 left-8 md:left-12 text-[#8a8474] font-extrabold text-lg md:text-2xl tracking-widest uppercase shadow-embossed font-sans z-20">
          {labels.logo}
        </div>

        <div className="absolute bottom-0.5 md:bottom-1 right-8 md:right-12 flex space-x-2 md:space-x-4 items-center z-20">
          <div className="w-10 h-3 md:w-16 md:h-5 bg-[#b8b3a3] rounded-sm shadow-inset-dark"></div>
          <div 
            onClick={() => setIsScreenOn(!isScreenOn)}
            className="w-6 h-4 md:w-8 md:h-6 bg-[#b8b3a3] rounded-sm shadow-inset-dark flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${isScreenOn ? 'bg-[#39ff14] shadow-[0_0_8px_#39ff14]' : 'bg-[#555] shadow-inner'}`}></div>
          </div>
        </div>

        {/* Inner Bezel Frame */}
        <div className="monitor-bezel-3d bg-[#e6e2d3] rounded-[1.5rem] p-4 md:p-8 shadow-[inset_0_15px_30px_rgba(0,0,0,0.2),0_2px_5px_rgba(255,255,255,0.5)] relative border-b-2 border-white/50">
          
          {/* CRT Screen */}
          <div className="crt-container w-full h-[45vh] md:h-[50vh] xl:h-[55vh] rounded-2xl overflow-hidden relative border-[12px] border-[#b8b3a3] transition-colors duration-500" style={{ backgroundColor: isScreenOn ? '#f0ece1' : '#080808' }}>
            <div className={`w-full h-full flex flex-col bg-[#f0ece1] relative z-10 overflow-hidden font-sans transition-opacity duration-300 ${isScreenOn ? 'screen-flicker opacity-100' : 'opacity-0 pointer-events-none'}`}>
              
              <ScreenContent />
              <Taskbar />

            </div>
          </div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="flex flex-col items-center relative z-0 -mt-8 md:-mt-10 mb-0 md:mb-[-10px]">
        {/* The Neck */}
        <div className="w-32 md:w-48 h-10 md:h-12 bg-gradient-to-b from-[#8c887d] to-[#b8b3a3] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] border-x-[6px] border-[#7a766c]"></div>
        {/* The Base Plate */}
        <div className="w-64 md:w-96 h-6 md:h-8 bg-[#d3cebe] rounded-t-2xl shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.9)] border-t-[2px] border-[#eae6db] flex justify-center pt-1 md:pt-2 relative">
           <div className="w-4/5 h-1 md:h-2 bg-[#a19c8f]/40 rounded-full shadow-inner"></div>
           {/* Shadow under the base resting on desk */}
           <div className="absolute -bottom-2 md:-bottom-4 w-[110%] h-4 md:h-8 bg-black/50 blur-xl rounded-full -z-10"></div>
        </div>
      </div>

      {/* The Physical Desk Surface */}
      <div className="w-full h-[20vh] lg:h-[22vh] bg-[#d8cfc0] relative flex justify-center shadow-[inset_0_20px_50px_rgba(0,0,0,0.2)] border-t border-white/40" style={{
        backgroundImage: `linear-gradient(to bottom, #dcd3c3, #c8bba6), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)`
      }}>
        
        {/* Hardware Elements Container */}
        <div className="absolute bottom-2 md:bottom-6 w-[95%] max-w-[1000px] flex justify-center items-end gap-4 md:gap-8 z-10">
          
          <Keyboard />
          <Mouse />
          
        </div>

      </div>
    </div>
  );
}

