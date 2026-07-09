import React, { StrictMode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPage1, getPage2 } from './contact_data.js';
import { ArrowLeft } from 'lucide-react';

export function Contact() {
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('contact-page-index');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [animating, setAnimating] = useState(false);
  const [isHandsetPickedUp, setIsHandsetPickedUp] = useState(false);

  const scrollPosRef = React.useRef(0);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('contact-scroll-pos');
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 50);
    }

    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sessionStorage.setItem('contact-scroll-pos', scrollPosRef.current.toString());
    };
  }, []);
  const [clickedText, setClickedText] = useState(null);
  const defaultText = 'HOVER BUTTON';
  const [lcdText, setLcdText] = useState(defaultText);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    if (animating) return;
    setAnimating(true);
    setLcdText(defaultText);
    setTimeout(() => {
      setPage(newPage);
      sessionStorage.setItem('contact-page-index', newPage.toString());
      setAnimating(false);
    }, 250);
  };

  const handleCardClick = (label, path) => {
    setClickedText(label);
    setIsHandsetPickedUp(true);
    setTimeout(() => {
      navigate(path);
    }, 600);
  };

  const page1 = getPage1(handlePageChange);
  const page2 = getPage2(handlePageChange);

  const currentGrid = page === 0 ? page1 : page2;

  const numCoils = 400; // High density for the long looping path

  const getPoint = (t) => {
    const startX = isHandsetPickedUp ? 30 : 60;  // Bottom of handset
    const startY = isHandsetPickedUp ? 420 : 520;
    const endX = 180;   // Bottom left of base
    const endY = 500;

    // Linear path
    const lx = startX + t * (endX - startX);
    const ly = startY + t * (endY - startY);

    // Deep hanging curve
    const sag = 200;
    const sagY = Math.sin(t * Math.PI) * sag;

    // Tangled loops (cycloid motion)
    const numLoops = 2.5;
    const loopRadius = 45;
    const loopAngle = t * Math.PI * 2 * numLoops;

    // Make loops strongest in the middle of the cord, straightening out at the ends
    const loopIntensity = Math.sin(t * Math.PI);

    const loopX = -Math.sin(loopAngle) * loopRadius * loopIntensity;
    const loopY = Math.cos(loopAngle) * loopRadius * loopIntensity;

    return {
      x: lx + loopX,
      y: ly + sagY + loopY
    };
  };

  const coils = Array.from({ length: numCoils }).map((_, i) => {
    const t = i / (numCoils - 1);
    const p1 = getPoint(t);
    const p2 = getPoint(t + 0.001);

    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

    return (
      <div
        key={i}
        className="absolute w-[6px] h-[26px] rounded-full bg-gradient-to-b from-[#1a1a1a] via-[#888] to-[#000] border-l border-r border-[#000] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          left: `${p1.x}px`,
          top: `${p1.y}px`,
          transform: `translate(-50%, -50%) rotate(${angle - 90}deg)`,
          boxShadow: '2px 3px 5px rgba(0,0,0,0.8)',
          zIndex: 10 + i,
        }}
      />
    );
  });



  // Create padded array for 3x3 mobile grid (insert null at index 7)
  const mobileGrid = [...currentGrid.slice(0, 7), null, currentGrid[7]];

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#fdfaf0] font-sans">

      {/* Global Page Header */}
      <div className="w-full pt-10 pb-2 md:pt-12 md:pb-0 flex flex-col items-center text-center px-4 shrink-0">
        <div className="relative inline-block mb-1">
          <h1 className="text-[36px] md:text-5xl font-black tracking-tight drop-shadow-sm">
            <span className="text-[#0f172a]">Contact</span>{' '}
            <span className="text-[#2563eb]">Directory</span>
          </h1>
        </div>
        <p className="text-[#64748b] font-medium max-w-xl text-[14px] md:text-base leading-relaxed mt-2 md:mt-3">
          Explore departments, achievements, and connect with advisors through our organized interactive modules.
        </p>
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full flex-1 flex flex-col relative items-center justify-center pb-48 md:pb-[240px]">

        {/* ---------------------------------------------------- */}
        {/* DESKTOP VIEW: Glossy Red Desk Phone */}
        {/* ---------------------------------------------------- */}
        <div className="hidden md:flex w-full items-center justify-center p-8 mt-4">
          {/* Outer Phone Structure (shadow and base) */}
          <div className="relative w-[650px] h-[600px] z-0">

            {/* Shadow of the whole phone */}
            <div className="absolute top-4 left-4 w-[630px] h-[570px] bg-black/60 rounded-[3rem] blur-2xl z-0"></div>

            {/* Main Phone Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff1a1a] via-[#cc0000] to-[#990000] rounded-[3rem] shadow-[inset_4px_4px_15px_rgba(255,100,100,0.8),inset_-8px_-8px_20px_rgba(100,0,0,0.9)] z-10 p-4 border-r-8 border-b-8 border-[#660000] border-t-2 border-l-2 border-[#ff6666]">

              {/* Handset cradle area (Left Side) */}
              <div className="absolute left-6 top-8 bottom-8 w-[140px] bg-gradient-to-r from-[#990000] to-[#cc0000] rounded-full shadow-[inset_15px_0_30px_rgba(0,0,0,0.6),inset_-5px_0_15px_rgba(255,100,100,0.4)] border border-[#800000]"></div>

              {/* Right Section (Keypad & Features) */}
              <div className="absolute right-6 top-6 bottom-6 left-[180px] bg-gradient-to-br from-[#e60000] to-[#b30000] rounded-[2rem] shadow-[inset_0_4px_10px_rgba(255,100,100,0.5),inset_0_-4px_15px_rgba(0,0,0,0.6),2px_2px_15px_rgba(0,0,0,0.5)] border-t border-l border-[#ff4d4d] border-b-[6px] border-r-[4px] border-[#660000] flex flex-col p-5">

                {/* Top area: Speaker and Label */}
                <div className="flex justify-between items-start mb-4 h-28">

                  {/* Speaker */}
                  <div className="w-24 h-24 rounded-full bg-[#cc0000] shadow-[inset_4px_4px_15px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,100,100,0.4)] flex items-center justify-center ml-2">
                    <div className="grid grid-cols-5 gap-1.5 p-2">
                      {Array.from({ length: 25 }).map((_, i) => {
                        const hidden = [0, 4, 20, 24].includes(i); // simple circle
                        return (
                          <div key={i} className={`w-2 h-2 rounded-full bg-[#330000] shadow-[inset_1px_1px_2px_black] ${hidden ? 'invisible' : ''}`}></div>
                        )
                      })}
                    </div>
                  </div>

                  {/* White Label Area */}
                  <div className="relative w-48 h-24 mt-1 mr-2">
                    <div className="absolute inset-0 z-0 drop-shadow-md flex flex-col">
                      <div className="flex justify-between h-4 w-full px-2">
                        <div className="w-4 h-full bg-white rounded-tl-sm"></div>
                        <div className="w-4 h-full bg-white rounded-tr-sm"></div>
                      </div>
                      <div className="flex-1 w-full bg-white"></div>
                      <div className="h-6 w-full flex justify-center gap-3">
                        <div className="w-6 h-full bg-white rounded-b-sm"></div>
                        <div className="w-6 h-full bg-white rounded-b-sm"></div>
                        <div className="w-6 h-full bg-white rounded-b-sm"></div>
                      </div>
                    </div>

                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-36 h-10 bg-[#bcc2b0] shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5)] border border-gray-400 z-10 flex items-center justify-center px-1 rounded-sm overflow-hidden">
                      <span className={`font-mono text-[14px] uppercase font-bold tracking-tight w-full text-center truncate select-none transition-colors duration-150 ${clickedText ? 'text-green-700 drop-shadow-[0_0_2px_rgba(0,200,0,0.6)]' : 'text-[#111]'
                        }`}>
                        {clickedText || lcdText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle area: Keypad */}
                <div className="flex flex-1 mt-2">
                  <div className="flex-1 bg-gradient-to-br from-[#d90000] to-[#b30000] p-4 rounded-2xl shadow-[inset_2px_2px_5px_rgba(255,100,100,0.3),inset_-4px_-4px_10px_rgba(0,0,0,0.4),0_4px_10px_rgba(0,0,0,0.5)] border-b-4 border-r-4 border-[#800000] border-t border-l border-[#ff3333]">
                    <div className={`grid grid-cols-2 gap-4 h-full transition-opacity duration-250 ease-in-out ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                      {currentGrid.map((item, index) => {
                        if (!item) {
                          return <div key={`empty-${index}`} className="opacity-0 pointer-events-none"></div>;
                        }
                        const { Icon, id, action, label } = item;
                        const isActionBtn = id === 'next' || id === 'prev';

                        return (
                          <button
                            key={id}
                            onClick={action ? action : () => handleCardClick(label, item.path)}
                            onMouseEnter={() => setLcdText(label)}
                            onMouseLeave={() => setLcdText(defaultText)}
                            className={`relative flex items-center justify-start px-4 gap-3 font-bold text-white rounded-xl transition-all border
                            ${isActionBtn
                                ? 'bg-gradient-to-b from-[#333] to-[#111] shadow-[0_6px_0_#000,0_8px_12px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.2)] border-gray-600 active:shadow-[0_0px_0_#000,0_2px_5px_rgba(0,0,0,0.6)]'
                                : 'bg-gradient-to-b from-[#ff3333] to-[#cc0000] shadow-[0_6px_0_#800000,0_8px_12px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.4)] border-[#ff6666] active:shadow-[0_0px_0_#800000,0_2px_5px_rgba(0,0,0,0.6)]'
                              }
                            active:translate-y-[6px] hover:brightness-110`}
                          >
                            <Icon size={22} className="opacity-90 drop-shadow-md shrink-0" strokeWidth={2.5} />
                            <span className="text-[12px] uppercase tracking-wide leading-tight text-left">
                              {label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Hold Label */}
                <div className="h-10 flex items-center justify-center mt-2">
                  <div className="bg-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-3 border-b-2 border-gray-300">
                    <div className="w-6 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner">
                      <div className="w-3 h-2 border-2 border-yellow-600 rounded-full border-t-0 border-l-0 opacity-50"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">HOLD</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Coiled Cord */}
            {coils}

            {/* The Handset (Resting on left) */}
            <div className={`absolute -left-4 -top-2 w-[160px] h-[570px] bg-gradient-to-r from-[#ff3333] via-[#cc0000] to-[#990000] rounded-[3rem] z-30 flex flex-col justify-end p-4 border-l-2 border-[#ff8080] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHandsetPickedUp
                ? 'translate-y-[-100px] translate-x-[-30px] rotate-[-15deg] shadow-[40px_30px_60px_rgba(0,0,0,0.4),inset_10px_0_20px_rgba(255,150,150,0.9),inset_-15px_0_25px_rgba(0,0,0,0.5)]'
                : 'translate-y-0 translate-x-0 rotate-0 shadow-[20px_10px_30px_rgba(0,0,0,0.6),inset_10px_0_20px_rgba(255,150,150,0.9),inset_-15px_0_25px_rgba(0,0,0,0.5)]'
              }`}>

              {/* Main long specular highlight on the left edge */}
              <div className="absolute left-3 top-10 bottom-12 w-6 bg-gradient-to-b from-white via-white to-transparent opacity-30 blur-[3px] rounded-full"></div>

              {/* Very bright circular glare spot at the bottom left (as seen in image) */}
              <div className="absolute bottom-12 left-8 w-8 h-8 bg-white opacity-90 blur-[2px] rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>

            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MOBILE VIEW: Retro Beige Cell Phone */}
        {/* ---------------------------------------------------- */}
        <div className="flex md:hidden w-full flex-col items-center justify-center p-2 mb-12">

          <div className={`relative z-0 w-[340px] h-[660px] scale-[0.85] sm:scale-100 origin-center mt-32 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHandsetPickedUp ? 'sm:scale-105 scale-90 translate-y-[-40px] rotate-[-2deg]' : ''
            }`}>

            {/* Realistic Antenna */}
            <div className="absolute bottom-[100%] right-[35px] flex flex-col items-center z-0">
              {/* Shadow cast behind */}
              <div className="absolute inset-0 bg-black blur-md translate-y-10 translate-x-2 opacity-40 z-[-1]"></div>

              {/* Antenna Tip */}
              <div className="w-[20px] h-[12px] bg-gradient-to-r from-[#111] via-[#555] to-[#050505] rounded-t-[10px] shadow-[inset_1px_2px_3px_rgba(255,255,255,0.4)] relative">
                <div className="absolute left-1.5 top-1 bottom-1 w-1 bg-white opacity-20 blur-[1px] rounded-full"></div>
              </div>

              {/* Antenna Main Rod */}
              <div className="w-[20px] h-[110px] bg-gradient-to-r from-[#111] via-[#444] to-[#0a0a0a] border-x border-[#000] relative overflow-hidden flex flex-col items-center">
                {/* Specular highlight */}
                <div className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[1px]"></div>
              </div>

              {/* Antenna Base / Rubber Collar */}
              <div className="w-8 h-12 bg-gradient-to-r from-[#1a1a1a] via-[#555] to-[#050505] rounded-t-sm shadow-[inset_1px_2px_3px_rgba(255,255,255,0.3),inset_-2px_0_5px_rgba(0,0,0,1)] border border-[#000] flex flex-col items-center pt-2 gap-1 relative overflow-hidden">
                {/* Highlight */}
                <div className="absolute left-2 top-0 bottom-0 w-1.5 bg-white opacity-20 blur-[1.5px]"></div>

                {/* Rubber ridges */}
                <div className="w-full h-[2px] bg-black shadow-[0_1px_1px_rgba(255,255,255,0.2)]"></div>
                <div className="w-full h-[2px] bg-black shadow-[0_1px_1px_rgba(255,255,255,0.2)]"></div>
                <div className="w-full h-[2px] bg-black shadow-[0_1px_1px_rgba(255,255,255,0.2)]"></div>

                {/* Thick bottom mount */}
                <div className="w-10 h-3 bg-gradient-to-r from-[#111] to-[#000] mt-auto shadow-[inset_0_2px_3px_rgba(255,255,255,0.2)] rounded-sm"></div>
              </div>
            </div>

            {/* Main Phone Body */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#e3e0ce] to-[#cdc9b5] rounded-[2rem] shadow-[inset_4px_4px_10px_rgba(255,255,255,0.7),inset_-6px_-6px_15px_rgba(0,0,0,0.3),15px_20px_40px_rgba(0,0,0,0.4)] border-2 border-[#b8b4a2] z-10 flex flex-col items-center px-6 py-6">

              {/* Earpiece Block */}
              <div className="w-full h-36 bg-[#e0ddce] rounded-2xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),0_5px_10px_rgba(0,0,0,0.15)] border-b-2 border-r-2 border-[#c2beab] mb-4 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#d3d0be] shadow-[inset_4px_4px_10px_rgba(0,0,0,0.4),inset_-3px_-3px_8px_rgba(255,255,255,0.7)] flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 9 }).map((_, i) => <div key={i} className="w-2 h-2 bg-[#222] rounded-full shadow-[inset_1px_1px_3px_#000,0_1px_1px_rgba(255,255,255,0.4)]"></div>)}
                  </div>
                </div>
              </div>

              {/* LCD Screen */}
              <div className="w-full h-12 bg-[#1a0f0f] rounded-lg mb-5 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.9),inset_-1px_-1px_3px_rgba(255,255,255,0.1)] border-2 border-[#222] flex items-center justify-center overflow-hidden px-3">
                <span className={`font-mono text-[14px] uppercase font-bold tracking-widest w-full text-center truncate ${clickedText ? 'text-[#33ff33] drop-shadow-[0_0_8px_rgba(51,255,51,0.9)]' : 'text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.9)]'
                  }`}>
                  {clickedText || (lcdText === defaultText ? 'READY' : lcdText)}
                </span>
              </div>

              {/* Keypad */}
              <div className="w-full flex-1 flex flex-col justify-center mb-4">
                <div className={`grid grid-cols-3 gap-x-3 gap-y-4 px-1 transition-opacity duration-250 ease-in-out ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  {mobileGrid.map((item, index) => {
                    if (!item) {
                      return <div key={`empty-${index}`} className="opacity-0 pointer-events-none w-full h-[66px]"></div>;
                    }
                    const { Icon, id, action, label } = item;
                    const isNext = id === 'next';
                    const isPrev = id === 'prev';

                    // The reference image has a red BC button. We'll use red for Next/Prev buttons.
                    const isRed = isNext || isPrev;
                    const btnClass = isRed
                      ? 'bg-gradient-to-b from-[#e63900] to-[#cc2900] text-white shadow-[0_6px_0_#991f00,0_8px_10px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] active:shadow-[0_0px_0_#991f00,0_2px_5px_rgba(0,0,0,0.4)]'
                      : 'bg-gradient-to-b from-[#e8e5d3] to-[#d4d0bb] text-[#222] shadow-[0_6px_0_#aba793,0_8px_10px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.8)] active:shadow-[0_0px_0_#aba793,0_2px_5px_rgba(0,0,0,0.3)]';

                    return (
                      <button
                        key={id}
                        onClick={action ? action : () => handleCardClick(label, item.path)}
                        onMouseEnter={() => setLcdText(label)}
                        onMouseLeave={() => setLcdText(defaultText)}
                        className={`w-full h-[68px] rounded-lg active:translate-y-[6px] flex flex-col items-center justify-center gap-1 border border-[#b8b5a3] transition-all ${btnClass}`}
                      >
                        <Icon size={18} strokeWidth={isRed ? 3 : 2} className={isRed ? 'drop-shadow-md' : 'opacity-80'} />
                        <span className="text-[9px] uppercase font-bold leading-[1.1] tracking-tighter text-center px-1">
                          {label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Panel Features */}
              <div className="w-full mt-auto mb-1 flex flex-col items-center gap-4">
                {/* Recessed Rectangle Area */}
                <div className="w-[85%] h-10 bg-[#d1cdc0] rounded-sm border border-[#beb9a6] shadow-[inset_2px_3px_5px_rgba(0,0,0,0.15),0_1px_1px_rgba(255,255,255,0.8)]"></div>

                {/* Mic slit */}
                <div className="w-10 h-1.5 bg-[#1a1a1a] shadow-[inset_1px_2px_3px_#000,0_1px_1px_rgba(255,255,255,0.5)]"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


