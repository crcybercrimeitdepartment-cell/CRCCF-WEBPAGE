import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { SKY_URL, DRESS_COLORS, TEXT_CONTENT, ROUTES } from './BuildingAnimationPageData';

let globalAudioCtx = null;

export default function BuildingAnimationPage() {
  const navigate = useNavigate();
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [hasReachedDoor, setHasReachedDoor] = useState(false);
  const [isWalkingBack, setIsWalkingBack] = useState(false);
  const [isReceptionistForward, setIsReceptionistForward] = useState(false);
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);
  const [dressColor, setDressColor] = useState(DRESS_COLORS[0]);
  const [timeTheme, setTimeTheme] = useState('day');

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 7 && hour < 16) setTimeTheme('day');
      else if (hour >= 16 && hour < 18) setTimeTheme('evening');
      else if (hour >= 18 || hour < 4) setTimeTheme('night');
      else setTimeTheme('sunrise');
    };
    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  const bellAudioRef = useRef(null);
  const doorAudioRef = useRef(null);

  useEffect(() => {
    // Preload audio files immediately on component mount
    bellAudioRef.current = new Audio('https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471857/door_bell_bls0mt.mp3');
    bellAudioRef.current.preload = 'auto';

    doorAudioRef.current = new Audio('https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471858/door_opening_sound_ct7rrb.mp3');
    doorAudioRef.current.preload = 'auto';
  }, []);

  const playDoorbellSound = () => {
    try {
      if (bellAudioRef.current) {
        bellAudioRef.current.currentTime = 0;
        bellAudioRef.current.play().catch(e => console.warn("Audio playback failed:", e));
      }
    } catch (e) {
      console.warn('Audio API not supported', e);
    }
  };

  const playDoorOpeningSound = () => {
    try {
      if (doorAudioRef.current) {
        doorAudioRef.current.currentTime = 0;
        doorAudioRef.current.play().catch(e => console.warn("Audio playback failed:", e));
      }
    } catch (e) {
      console.warn('Audio API not supported', e);
    }
  };

  const handleDoorbellClick = () => {
    // If the door is open and she is safely back inside, close the door on click.
    if (isDoorOpen && !isReceptionistForward && !isWalkingBack && !isWebsiteVisible) {
      setIsDoorOpen(false);
      return;
    }

    if (!isDoorOpen && !isWalkingBack && !isReceptionistForward && !isWebsiteVisible) {
      playDoorbellSound();
      
      // Pick a random dress color for this walk
      const randomColor = DRESS_COLORS[Math.floor(Math.random() * DRESS_COLORS.length)];
      setDressColor(randomColor);

      // Wait 1.5s for the sound to play before opening the door
      setTimeout(() => {
        playDoorOpeningSound();
        setIsDoorOpen(true);
        setIsReceptionistForward(true);
        // Wait 6.0s for the walk animation to finish
        setTimeout(() => {
          setHasReachedDoor(true);
          
          // Greet for 2.5s, then go back inside and immediately trigger the transition
          setTimeout(() => {
            setHasReachedDoor(false);
            setIsReceptionistForward(false);
            setIsWalkingBack(true);
            
            // Trigger website fly-out immediately
            setIsWebsiteVisible(true);
            
            setTimeout(() => {
              sessionStorage.setItem("animationPlayed", "true");
              navigate(ROUTES.NEXT_PAGE);
            }, 600); // Faster transition duration
            
            // Wait 6s for the walk back to finish before resetting her walking state
            setTimeout(() => {
              setIsWalkingBack(false);
            }, 6000);
          }, 2500);
          
        }, 6000);
      }, 1500);
    }
  };

  const closeWebsite = (e) => {
    e.stopPropagation();
    // Shrink website back into door
    setIsWebsiteVisible(false);
    setTimeout(() => {
       // Close glass doors after shrink animation
       setIsDoorOpen(false);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col relative overflow-hidden items-center justify-end">
      
      {/* --- DAY/NIGHT SKY SYSTEM --- */}
      {/* Day Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-200 to-blue-100 transition-opacity duration-[3000ms] ease-in-out ${timeTheme === 'day' ? 'opacity-100' : 'opacity-0'}`} />
      {/* Evening Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b from-orange-400 via-pink-400 to-amber-200 transition-opacity duration-[3000ms] ease-in-out ${timeTheme === 'evening' ? 'opacity-100' : 'opacity-0'}`} />
      {/* Night Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a0f25] to-[#020617] transition-opacity duration-[3000ms] ease-in-out ${timeTheme === 'night' ? 'opacity-100' : 'opacity-0'}`} />
      {/* Sunrise Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b from-blue-800 via-pink-300 to-orange-100 transition-opacity duration-[3000ms] ease-in-out ${timeTheme === 'sunrise' ? 'opacity-100' : 'opacity-0'}`} />

      {/* Stars (Only Night/Sunrise) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${timeTheme === 'night' ? 'opacity-100' : timeTheme === 'sunrise' ? 'opacity-40' : 'opacity-0'}`}
        style={{
          backgroundImage: 'radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 140px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 250px 130px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 300px 50px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 80px 180px, #ffffff, rgba(0,0,0,0))',
          backgroundSize: '350px 350px',
        }}
      >
        <div className="absolute inset-0 animate-pulse bg-transparent" style={{ animationDuration: '4s' }}>
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(1px 1px at 50px 100px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 200px 200px, #ffffff, rgba(0,0,0,0))', backgroundSize: '250px 250px' }} />
        </div>
      </div>

      {/* Moon (Only Night) */}
      <div className={`absolute top-12 right-12 sm:top-20 sm:right-32 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fdf8e7] shadow-[0_0_40px_rgba(253,248,231,0.6),inset_-10px_-10px_20px_rgba(0,0,0,0.1)] transition-all duration-[4000ms] ease-out ${timeTheme === 'night' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75'}`} />
      
      {/* Mobile Welcome Message (Top of Screen) */}
      <div className={`flex sm:hidden absolute top-8 left-0 w-full justify-center z-[200] transition-all duration-[1000ms] ease-out ${hasReachedDoor ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95'}`}>
          <div className="bg-white/95 backdrop-blur-sm text-blue-900 font-extrabold px-6 py-4 mx-4 rounded-xl shadow-xl border-2 border-blue-300 text-xl sm:text-2xl leading-relaxed text-center tracking-wide">
              {TEXT_CONTENT.MOBILE_WELCOME_MESSAGE}
          </div>
      </div>

      {/* FLY-OUT WEBSITE OVERLAY */}
      <div className={`fixed inset-0 z-[1000] bg-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col transform origin-[50%_85%] ${isWebsiteVisible ? 'scale-100 opacity-100 rotate-0 blur-none pointer-events-auto' : 'scale-[0.05] opacity-0 -rotate-6 blur-md pointer-events-none'}`}>
          {/* Clean Transition Screen */}
          <div className="relative flex-1 w-full bg-slate-50 flex flex-col items-center justify-center">
             <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Entering to CRCCF...</p>
             </div>
          </div>
      </div>
      
      <style>{`
        @keyframes walk-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes walk-leg-l {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-15deg); }
        }
        @keyframes walk-leg-r {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(20deg); }
        }
        @keyframes walk-arm-l {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(20deg); }
        }
        @keyframes walk-arm-r {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-walk-bob { animation: walk-bob 0.9s infinite ease-in-out; }
        .animate-walk-leg-l { animation: walk-leg-l 1.8s infinite ease-in-out; }
        .animate-walk-leg-r { animation: walk-leg-r 1.8s infinite ease-in-out; }
        .animate-walk-arm-l { animation: walk-arm-l 1.8s infinite ease-in-out; }
        .animate-walk-arm-r { animation: walk-arm-r 1.8s infinite ease-in-out; }
      `}</style>

      {/* Darkened overlay to add depth to the sky */}
      <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>

      {/* Green Grassy Lawn Ground */}
      <div className="absolute bottom-0 w-full h-[28vh] bg-gradient-to-b from-[#4ade80] to-[#15803d] z-0 overflow-hidden flex flex-col justify-end items-center border-t border-[#166534]">
        
        {/* 3D Perspective Grass (Lawn mowing stripes) */}
        <div 
          className="absolute w-[300vw] h-[100vh] bottom-[-30vh] opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #064e3b 50%, transparent 50%)`,
            backgroundSize: '160px 100px',
            transformOrigin: 'bottom center',
            transform: 'perspective(400px) rotateX(80deg) scale(2)',
          }}
        ></div>
        
        {/* Horizon fade to smooth the transition into the sky */}
        <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-blue-100/40 to-transparent z-0"></div>
        
      </div>

      {/* RESPONSIVE SCENE WRAPPER */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-end pointer-events-none transform origin-bottom transition-transform duration-[6000ms] ease-in-out ${
        isDoorOpen 
          ? 'scale-[0.80] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.25] translate-y-[4vh] sm:translate-y-[5vh] lg:translate-y-[6vh]' 
          : 'scale-[0.70] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.85] translate-y-[2vh] sm:translate-y-[3vh] lg:translate-y-0'
      }`}>

         {/* Shadow cast by the building onto the tiled ground */}
         <div className="absolute bottom-[14vh] w-[1070px] h-12 bg-black/20 blur-[15px] rounded-[100%] z-10 pointer-events-none"></div>

         {/* Building Container (Pointer events auto to allow clicks) */}
         <div className="relative w-[950px] h-[850px] flex flex-col items-center justify-end z-20 mt-12 mb-[14vh] pointer-events-auto transition-all duration-700">
        
        {/* ---------------- ROOF CANOPY (Ultra 3D Realism) ---------------- */}
        <div className="absolute bottom-full flex flex-col items-center z-30 w-full mb-[-4px]">
          {/* Large Roof Sign (CRCCF) - Highly Realistic matching reference */}
          <div className="flex flex-col items-center justify-end z-20 relative">
             {/* Small box/antenna on top of the frame */}
             <div className="w-14 h-3 border-[2px] border-slate-500 border-b-0 flex justify-between relative">
                <div className="w-0.5 h-3 bg-slate-500 absolute -top-3 left-1"></div>
                <div className="w-0.5 h-4 bg-slate-500 absolute -top-4 right-1"></div>
                <div className="w-4 h-2 bg-slate-600 absolute bottom-0 left-1/2 -translate-x-1/2"></div>
             </div>

             {/* The Text Container (Thin structural red frame) */}
             <div className="border-[3px] border-[#dc2626] px-4 flex items-center justify-center relative z-10 shadow-md">
                {/* 3D Red Letters */}
                <div className="text-[75px] font-black text-[#b91c1c] tracking-[0.1em] leading-[0.85] pt-2 pb-1" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '-2px 0 0 #450a0a, 2px 0 0 #450a0a, 0 4px 0 #7f1d1d, 0 8px 12px rgba(0,0,0,0.6)' }}>
                   CRCCF
                </div>
             </div>

             {/* Metal Supporting Legs (connecting frame to roof) */}
             <div className="w-[70%] flex justify-evenly h-5">
                <div className="w-[5px] h-full bg-gradient-to-r from-slate-400 to-slate-700 shadow-md border-l border-white/40"></div>
                <div className="w-[5px] h-full bg-gradient-to-r from-slate-400 to-slate-700 shadow-md border-l border-white/40"></div>
                <div className="w-[5px] h-full bg-gradient-to-r from-slate-400 to-slate-700 shadow-md border-l border-white/40"></div>
                <div className="w-[5px] h-full bg-gradient-to-r from-slate-400 to-slate-700 shadow-md border-l border-white/40"></div>
             </div>
          </div>

          {/* Massive 3D Beveled Roof Slab */}
          <div className="w-[1030px] flex flex-col items-center relative z-20">
             
             {/* Sunlit Top Face (creating a beveled perspective) */}
             <div className="w-[1020px] h-[3px] bg-gradient-to-b from-white to-[#e2e8f0]"></div>
             
             {/* Thick Front Edge / Fascia */}
             <div className="w-full h-7 bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#475569] shadow-[0_10px_20px_rgba(0,0,0,0.6)] relative overflow-hidden flex justify-center">
                {/* Metallic panel lines on the edge */}
                <div className="absolute inset-0 flex justify-evenly opacity-20">
                   {[...Array(20)].map((_, i) => <div key={`fascia-${i}`} className="w-px h-full bg-black"></div>)}
                </div>
                {/* Top crisp highlight */}
                <div className="absolute top-0 w-full h-[1px] bg-white"></div>
             </div>

             {/* Dark Recessed Underside (Soffit) creating huge depth */}
             <div className="w-[1000px] h-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b] shadow-[inset_0_4px_15px_rgba(0,0,0,1)] relative z-30"></div>
             
          </div>

          {/* Metallic Supporting Pillars */}
          <div className="w-[94%] h-6 flex justify-between px-4 z-10 relative">
            {/* Deep shadow cast BY the roof ONTO the building glass */}
            <div className="absolute top-full -mt-2 w-[105%] h-24 bg-gradient-to-b from-black/80 via-black/20 to-transparent blur-[10px] -z-10 -left-[2.5%] pointer-events-none"></div>

            {[...Array(14)].map((_, i) => (
              <div key={`rp-${i}`} className="w-2 h-full bg-gradient-to-r from-[#64748b] via-[#e2e8f0] to-[#334155] shadow-[3px_0_5px_rgba(0,0,0,0.9)] border-x border-[#1e293b] relative">
                 {/* Pillar shadow at top connecting to soffit */}
                 <div className="absolute top-0 w-full h-3 bg-black/70"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* ---------------- MAIN BODY ---------------- */}
        <div className="flex w-full h-full pb-40 relative">
          
          {/* Global Reflection Overlay covering the whole building (simulating one large glass plane reflection) */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-screen opacity-40">
             <div 
               className="w-[200%] h-[200%] absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4"
               style={{
                 backgroundImage: `url(${SKY_URL})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 filter: 'blur(4px) contrast(1.2)'
               }}
             ></div>
          </div>

          {/* ----- LEFT TOWER ----- */}
          <div className="w-[42%] h-full flex flex-col relative z-10 bg-[#0f172a]">
            
            {/* Top Glass Section */}
            <div className="flex-[6] w-full border-l-[4px] border-t-[4px] border-r-[2px] border-[#1e1e1e] flex flex-col relative overflow-hidden bg-gradient-to-br from-[#1e3a8a]/40 to-[#0284c7]/30">
              
              {/* Internal Floors Visible Through Glass */}
              <div className="absolute inset-0 flex flex-col justify-evenly opacity-30">
                <div className="flex sm:hidden flex-col w-full h-full justify-evenly">
                  {[...Array(36)].map((_, i) => <div key={`int-ltop-m-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10 shadow-[0_5px_15px_rgba(255,255,255,0.1)]"></div>)}
                </div>
                <div className="hidden sm:flex flex-col w-full h-full justify-evenly">
                  {[...Array(9)].map((_, i) => <div key={`int-ltop-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10 shadow-[0_5px_15px_rgba(255,255,255,0.1)]"></div>)}
                </div>
              </div>

              {/* Glass Grid / Mullions */}
              <div className="flex sm:hidden flex-col w-full flex-1 z-10 relative">
                {[...Array(36)].map((_, r) => (
                  <div key={`ltop-row-m-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                    <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div> {/* Frame highlight */}
                    {[...Array(4)].map((_, c) => (
                      <div key={`ltop-col-m-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                         <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex flex-col w-full flex-1 z-10 relative">
                {[...Array(9)].map((_, r) => (
                  <div key={`ltop-row-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                    <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div> {/* Frame highlight */}
                    {[...Array(4)].map((_, c) => (
                      <div key={`ltop-col-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                         <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* The Gap / Recessed Terrace */}
            <div className="flex-[0.5] w-full bg-[#0a0a0a] border-l-[4px] border-r-[2px] border-[#1e1e1e] flex justify-evenly items-center relative shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)] overflow-hidden">
               {/* Deep shadow */}
               <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black to-transparent opacity-80"></div>
               {/* Realistic structural pillars in the gap */}
               <div className="w-3 h-full bg-gradient-to-r from-[#b4985b] via-[#e8ce96] to-[#5c4a2a] shadow-[2px_0_5px_rgba(0,0,0,0.8)] z-10 relative"><div className="absolute top-0 w-full h-2 bg-black/50"></div></div>
               <div className="w-3 h-full bg-gradient-to-r from-[#b4985b] via-[#e8ce96] to-[#5c4a2a] shadow-[2px_0_5px_rgba(0,0,0,0.8)] z-10 relative"><div className="absolute top-0 w-full h-2 bg-black/50"></div></div>
               {/* Realistic greenery */}
               <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-[#064e3b] to-[#047857] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] z-0"></div>
            </div>

            {/* Bottom Glass Section */}
            <div className="flex-[4.5] w-full border-l-[4px] border-b-[4px] border-r-[2px] border-[#1e1e1e] flex flex-col relative overflow-hidden bg-gradient-to-tr from-[#0f172a]/80 to-[#1e3a8a]/40">
              
              {/* Internal Floors */}
              <div className="absolute inset-0 flex flex-col justify-evenly opacity-30">
                <div className="flex sm:hidden flex-col w-full h-full justify-evenly">
                  {[...Array(24)].map((_, i) => <div key={`int-lbot-m-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10"></div>)}
                </div>
                <div className="hidden sm:flex flex-col w-full h-full justify-evenly">
                  {[...Array(6)].map((_, i) => <div key={`int-lbot-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10"></div>)}
                </div>
              </div>

              {/* Glass Grid */}
              <div className="flex sm:hidden flex-col w-full flex-1 z-10 relative">
                {[...Array(24)].map((_, r) => (
                  <div key={`lbot-row-m-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                    <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div>
                    {[...Array(4)].map((_, c) => (
                      <div key={`lbot-col-m-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                         <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex flex-col w-full flex-1 z-10 relative">
                {[...Array(6)].map((_, r) => (
                  <div key={`lbot-row-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                    <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div>
                    {[...Array(4)].map((_, c) => (
                      <div key={`lbot-col-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                         <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* ----- CENTRAL SOLID CORE (Glossy Dark Glass/Stone) ----- */}
          <div className="w-[16%] h-full bg-[#0a0f18] border-y-[4px] border-x-[2px] border-[#1e293b] flex flex-col relative overflow-hidden shadow-[inset_15px_0_30px_rgba(0,0,0,0.9),inset_-15px_0_30px_rgba(0,0,0,0.9)] z-30">
            {/* Deep Glass/Stone Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e293b] opacity-90"></div>
            
            {/* Minimalist Vertical Mullions (Massive glass panels) */}
            <div className="absolute inset-0 flex justify-evenly">
              <div className="w-[2px] h-full bg-[#1e293b] shadow-[1px_0_0_rgba(255,255,255,0.1)]"></div>
              <div className="w-[2px] h-full bg-[#1e293b] shadow-[1px_0_0_rgba(255,255,255,0.1)]"></div>
            </div>

            {/* Horizontal Seams */}
            <div className="absolute inset-0 flex flex-col justify-evenly opacity-50">
               <div className="flex sm:hidden flex-col w-full h-full justify-evenly">
                 {[...Array(48)].map((_, i) => (
                   <div key={`core-glass-line-m-${i}`} className="w-full h-[1px] bg-[#334155] shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>
                 ))}
               </div>
               <div className="hidden sm:flex flex-col w-full h-full justify-evenly">
                 {[...Array(12)].map((_, i) => (
                   <div key={`core-glass-line-${i}`} className="w-full h-[1px] bg-[#334155] shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>
                 ))}
               </div>
            </div>

            {/* Sharp Environment Reflection (Key for realistic glass/stone) */}
            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-sky-300/10 to-transparent transform -skew-x-12 -translate-x-[40%] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 translate-x-[20%] pointer-events-none"></div>
          </div>

          {/* ----- RIGHT TOWER ----- */}
          <div className="w-[42%] h-full border-r-[4px] border-y-[4px] border-l-[2px] border-[#1e1e1e] flex flex-col relative overflow-hidden bg-gradient-to-bl from-[#38bdf8]/30 via-[#1e3a8a]/40 to-[#0f172a]/60 z-10">
             
             {/* Internal Floors */}
             <div className="absolute inset-0 flex flex-col justify-evenly opacity-30">
                <div className="flex sm:hidden flex-col w-full h-full justify-evenly">
                  {[...Array(64)].map((_, i) => <div key={`int-rtop-m-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10"></div>)}
                </div>
                <div className="hidden sm:flex flex-col w-full h-full justify-evenly">
                  {[...Array(16)].map((_, i) => <div key={`int-rtop-${i}`} className="w-full h-4 bg-black/50 border-t border-white/10"></div>)}
                </div>
             </div>
             
             {/* Full Height Glass Grid */}
             <div className="flex sm:hidden flex-col w-full flex-1 z-10 relative">
               {[...Array(64)].map((_, r) => (
                 <div key={`rtop-row-m-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                   <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div>
                   {[...Array(4)].map((_, c) => (
                     <div key={`rtop-col-m-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                       <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                     </div>
                   ))}
                 </div>
               ))}
             </div>
             <div className="hidden sm:flex flex-col w-full flex-1 z-10 relative">
               {[...Array(16)].map((_, r) => (
                 <div key={`rtop-row-${r}`} className="flex w-full flex-1 border-b-[2px] border-[#111]/90 relative z-10">
                   <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div>
                   {[...Array(4)].map((_, c) => (
                     <div key={`rtop-col-${c}`} className="flex-1 border-r-[2px] border-[#111]/90 relative">
                       <div className="absolute right-0 w-[1px] h-full bg-white/10"></div>
                     </div>
                   ))}
                 </div>
               ))}
             </div>
          </div>

        </div>

        {/* ---------------- GROUND FLOOR & ENTRANCE ---------------- */}
        <div className="absolute bottom-0 w-[104%] h-[160px] bg-transparent flex flex-col items-center justify-end z-40">
          
          {/* Large Floating Instruction Text */}
          <div className={`absolute bottom-24 sm:bottom-28 lg:-top-4 left-[calc(50%-181px)] transform -translate-x-1/2 w-[170px] sm:w-[200px] lg:w-48 z-[100] pointer-events-none ${isDoorOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
             <div className="animate-bounce flex flex-col items-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                 <div className="bg-black px-2 py-4 sm:px-6 sm:py-4 lg:px-3 lg:py-2 rounded-2xl lg:rounded-md border border-gray-600 shadow-[0_0_25px_rgba(0,0,0,1)] text-center text-[22px] leading-[1.1] sm:text-xl lg:text-xs font-black text-white uppercase tracking-tighter sm:tracking-widest">
                    <span>PRESS THE</span><br/>
                    <span>BELL</span><br/>
                    <span>TO OPEN</span><br/>
                    <span>DOOR</span>
                 </div>
                 <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[18px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[14px] lg:border-l-[6px] lg:border-r-[6px] lg:border-t-[8px] border-l-transparent border-r-transparent border-t-black drop-shadow-md -mt-[2px]"></div>
             </div>
          </div>

          {/* Quick Access Text (Right) */}
          <div className={`absolute bottom-24 sm:bottom-28 lg:-top-4 left-[calc(50%+181px)] transform -translate-x-1/2 w-[170px] sm:w-[200px] lg:w-48 z-[100] pointer-events-none ${isDoorOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
             <div className="animate-bounce flex flex-col items-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] delay-100">
                 <div className="bg-black px-2 py-4 sm:px-6 sm:py-4 lg:px-3 lg:py-2 rounded-2xl lg:rounded-md border border-gray-600 shadow-[0_0_25px_rgba(0,0,0,1)] text-center text-[22px] leading-[1.1] sm:text-xl lg:text-xs font-black text-white uppercase tracking-tighter sm:tracking-widest">
                    <span>PRESS THE</span><br/>
                    <span>BELL</span><br/>
                    <span>FOR DIRECT</span><br/>
                    <span>ENTRY</span>
                 </div>
                 <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[18px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[14px] lg:border-l-[6px] lg:border-r-[6px] lg:border-t-[8px] border-l-transparent border-r-transparent border-t-black drop-shadow-md -mt-[2px]"></div>
             </div>
          </div>

          {/* Ground Floor Recess / Dark Lobby */}
          <div className="w-[96%] h-full bg-[#050505] flex justify-between items-center px-10 relative border-t-[4px] border-[#1e1e1e] shadow-[inset_0_20px_30px_rgba(0,0,0,1)]">

            {/* --- REALISTIC INTERIOR LOBBY (Visible when doors open) --- */}
            <div className="absolute inset-x-0 bottom-0 h-[160px] z-0 flex flex-col items-center justify-end overflow-hidden">
               {/* Back Wall with Wood Slats */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#292524] to-[#1c1917] flex justify-center border-t-4 border-[#1e1e1e]">
                  <div className="w-full h-full flex justify-between opacity-40">
                     {[...Array(80)].map((_, i) => <div key={`slat-${i}`} className="w-2 h-full bg-[#451a03] shadow-[1px_0_3px_rgba(0,0,0,0.9)] border-l border-[#78350f]"></div>)}
                  </div>
                  
                  {/* Glowing Logo */}
                  <div className="absolute top-[30px] flex items-center justify-center">
                     <div className="text-3xl font-serif text-[#fbbf24] tracking-widest font-bold drop-shadow-[0_0_15px_rgba(251,191,36,1)]">CRCCF</div>
                  </div>

             {/* Ceiling Spotlights */}
                  <div className="absolute top-0 w-[60%] flex justify-evenly">
             <div className="w-40 h-40 bg-gradient-to-b from-white/30 to-transparent blur-2xl transform perspective-1000 rotateX-45 translate-y-[-60%]"></div>
                     <div className="w-40 h-40 bg-gradient-to-b from-white/30 to-transparent blur-2xl transform perspective-1000 rotateX-45 translate-y-[-60%]"></div>
                  </div>
                </div>
               


               {/* Reception Desk */}
               <div className="relative w-[140px] h-[55px] flex flex-col items-center justify-end z-10 mb-4 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                  {/* Desk Front (Marble-like) */}
                  <div className="w-[120px] h-[45px] bg-gradient-to-b from-[#f3f4f6] to-[#9ca3af] rounded-t-sm shadow-2xl border-t-2 border-[#fff] relative flex justify-center items-center overflow-hidden">
                     {/* Marble texture */}
                     <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 mix-blend-multiply"></div>
                     {/* Desk LED underglow */}
                     <div className="absolute -bottom-3 w-[100px] h-6 bg-blue-500/50 blur-lg"></div>
                     {/* Metallic accent line */}
                     <div className="absolute top-2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent shadow-[0_0_5px_rgba(251,191,36,0.8)]"></div>
                  </div>
                  {/* Desk Top (Rich Wood) */}
                  <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm shadow-[0_8px_15px_rgba(0,0,0,0.7)] border-t border-[#b45309]"></div>
                  

                  

               </div>

               {/* Glowing Door Interior */}
               <div className={`absolute top-0 w-full h-full bg-white transition-all duration-[2000ms] ease-in-out flex flex-col z-[10] ${isWebsiteVisible ? 'opacity-80 shadow-[0_0_100px_rgba(255,255,255,1)]' : 'opacity-0'}`}></div>

            </div>

            {/* Highly Realistic Cinematic Receptionist Walking (Curved Path) */}
            {/* Moved outside the Interior Lobby to prevent clipping and stacking context issues with glass doors */}
            <div className={`absolute left-[calc(50%-160px)] bottom-14 w-10 flex flex-col items-center pointer-events-none transition-all ${isReceptionistForward ? `duration-[6000ms] ease-in translate-x-[160px] ${hasReachedDoor ? 'z-40' : 'z-20'}` : 'duration-[6000ms] ease-out translate-x-0 z-0'}`}>
                {/* Inner div controls vertical movement and scale (moves forward fast to clear desk, then slows down) */}
                <div className={`origin-bottom transition-all flex flex-col items-center ${isReceptionistForward ? 'duration-[6000ms] ease-out scale-[0.8] translate-y-[56px] opacity-100' : 'duration-[6000ms] ease-in scale-[0.45] translate-y-0 opacity-0'}`}>
                    
                    {/* Welcome Speech Bubble — in-flow above SVG so it never escapes the container */}
                    <div className={`hidden sm:block relative self-start ml-10 mb-1 bg-white text-blue-900 text-[12px] lg:text-[10px] font-bold px-2 py-1 lg:px-3 lg:py-1.5 rounded-t-xl rounded-br-xl rounded-bl-sm shadow-xl whitespace-nowrap border-[2px] lg:border-[1.5px] border-blue-200 transition-all duration-500 origin-bottom-left z-50 ${hasReachedDoor ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-2'}`}>
                        {TEXT_CONTENT.WELCOME_MESSAGE}
                    </div>

                    <svg width="40" height="102" viewBox="0 0 40 102" xmlns="http://www.w3.org/2000/svg" className={`drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] ${(isDoorOpen || isWalkingBack) && !hasReachedDoor ? 'animate-walk-bob' : ''}`}>
                       <defs>
                          <radialGradient id="faceShade" cx="30%" cy="30%" r="70%">
                             <stop offset="0%" stopColor="#fff0e6"/>
                             <stop offset="60%" stopColor="#ffe0d2"/>
                             <stop offset="100%" stopColor="#d4a39b"/>
                          </radialGradient>
                          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                             <stop offset="0%" stopColor="#4a2a18"/>
                             <stop offset="50%" stopColor="#1f120e"/>
                             <stop offset="100%" stopColor="#0a0502"/>
                          </linearGradient>
                          <linearGradient id="legShade" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#b68279"/>
                             <stop offset="50%" stopColor="#d4a39b"/>
                             <stop offset="100%" stopColor="#8a5c54"/>
                          </linearGradient>
                          <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="white" stopOpacity="0.1"/>
                             <stop offset="30%" stopColor="white" stopOpacity="0.2"/>
                             <stop offset="70%" stopColor="black" stopOpacity="0.2"/>
                             <stop offset="100%" stopColor="black" stopOpacity="0.6"/>
                          </linearGradient>
                          <linearGradient id="armShade" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="white" stopOpacity="0.2"/>
                             <stop offset="100%" stopColor="black" stopOpacity="0.5"/>
                          </linearGradient>
                       </defs>

                       {/* Ground Shadow to anchor her to the floor */}
                       <ellipse cx="20" cy="99" rx="14" ry="2.5" fill="black" opacity="0.6" />

                       {/* Hair (Back volume) */}
                       <path d="M 15 6 C 13 -1, 27 -1, 25 6 C 27 12, 25 15, 20 15 C 15 15, 13 12, 15 6 Z" fill="url(#hairGrad)" />

                       {/* Neck */}
                       <path d="M 18.5 9 L 21.5 9 L 21.5 16 L 18.5 16 Z" fill="url(#faceShade)" />

                       {isWalkingBack ? (
                          <>
                             {/* Back of Head covered by hair */}
                             <ellipse cx="20" cy="6.5" rx="3.8" ry="4.5" fill="url(#hairGrad)" />
                             {/* Flowing hair over the neck/back */}
                             <path d="M 17.5 10 L 22.5 10 L 23 18 C 23 20, 17 20, 17 18 Z" fill="url(#hairGrad)" />
                          </>
                       ) : (
                          <>
                             {/* Face (Oval) */}
                             <ellipse cx="20" cy="6.5" rx="3.8" ry="4.5" fill="url(#faceShade)" />

                             {/* Eyebrows */}
                             <path d="M 16.5 4.5 Q 18 4 19.2 4.5" stroke="#2d1b15" strokeWidth="0.3" fill="none" />
                             <path d="M 20.8 4.5 Q 22 4 23.5 4.5" stroke="#2d1b15" strokeWidth="0.3" fill="none" />

                             {/* Eyes (Realistic Whites, Irises, Pupils, Lashes) */}
                             <path d="M 17 5.5 C 18 5, 19 5, 19 5.5 C 18 6, 17 6, 17 5.5 Z" fill="white" />
                             <circle cx="18" cy="5.4" r="0.4" fill="#0284c7" /> {/* Blue Iris */}
                             <circle cx="18" cy="5.4" r="0.2" fill="black" /> {/* Pupil */}
                             <path d="M 16.8 5.5 C 18 5, 19 5, 19.2 5.5" stroke="#1f120e" strokeWidth="0.3" fill="none" />

                             <path d="M 21 5.5 C 22 5, 23 5, 23 5.5 C 22 6, 21 6, 21 5.5 Z" fill="white" />
                             <circle cx="22" cy="5.4" r="0.4" fill="#0284c7" /> {/* Blue Iris */}
                             <circle cx="22" cy="5.4" r="0.2" fill="black" /> {/* Pupil */}
                             <path d="M 20.8 5.5 C 22 5, 23 5, 23.2 5.5" stroke="#1f120e" strokeWidth="0.3" fill="none" />

                             {/* Nose */}
                             <path d="M 20 5.5 L 20 7 L 20.5 7" stroke="#b68279" strokeWidth="0.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                             {/* Blush */}
                             <ellipse cx="17.2" cy="7.2" rx="0.9" ry="0.6" fill="#ffb6c1" opacity="0.8" />
                             <ellipse cx="22.8" cy="7.2" rx="0.9" ry="0.6" fill="#ffb6c1" opacity="0.8" />

                             {/* Lips (Fuller Smile with Gloss) */}
                             <path d="M 18.8 8.5 Q 20 9.2 21.2 8.5 Q 20 8.8 18.8 8.5 Z" fill="#e05a5f" />
                             <path d="M 19.5 8.6 L 20.5 8.6" stroke="white" strokeWidth="0.2" opacity="0.5" />

                             {/* Hair (Front Bangs / Elegant styling) */}
                             <path d="M 16.2 6.5 C 16.2 3, 20 2.5, 20 4.5 C 20 2.5, 23.8 3, 23.8 6.5 C 23.5 3.5, 21.5 3.5, 20 5 C 18.5 3.5, 16.5 3.5, 16.2 6.5 Z" fill="url(#hairGrad)" />

                             {/* White Blouse / Inner shirt */}
                             <path d="M 17 16 L 23 16 L 20 23 Z" fill="#f8fafc" />
                          </>
                       )}

                       {/* Torso / Blazer (Healthy Hourglass Curve with 3D Shading) */}
                       <g>
                          <path d="M 14 16 C 18 14.5, 22 14.5, 26 16 C 30.5 21, 31 29, 26 36 C 24.5 39, 27.5 48, 28.5 54 C 28.5 56, 11.5 56, 11.5 54 C 12.5 48, 15.5 39, 14 36 C 9 29, 9.5 21, 14 16 Z" fill={dressColor} />
                          {/* Shading overlay for Blazer */}
                          <path d="M 14 16 C 18 14.5, 22 14.5, 26 16 C 30.5 21, 31 29, 26 36 C 24.5 39, 27.5 48, 28.5 54 C 28.5 56, 11.5 56, 11.5 54 C 12.5 48, 15.5 39, 14 36 C 9 29, 9.5 21, 14 16 Z" fill="url(#bodyShade)" />
                          
                          {/* Sleek Belt to accentuate waist */}
                          <path d="M 14.5 36 Q 20 38.5 25.5 36 L 26 38.5 Q 20 41 14 38.5 Z" fill="#111827" />
                          {!isWalkingBack && (
                             <>
                                <rect x="19" y="37" width="2" height="2" rx="0.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.3" />
                                {/* Gold Company Badge on her left chest */}
                                <g transform="translate(22, 21) rotate(-5)">
                                   <rect x="0" y="0" width="3.5" height="1.4" rx="0.3" fill="#facc15" stroke="#ca8a04" strokeWidth="0.2" />
                                   <text x="1.75" y="1" fontSize="0.7" fontWeight="bold" fill="#451a03" textAnchor="middle" style={{ fontFamily: 'sans-serif' }}>CR</text>
                                </g>
                             </>
                          )}
                       </g>
                       
                       {/* Skirt (Fitted pencil skirt with 3D Shading) */}
                       <path d="M 11.5 54 C 10.5 61, 13 65, 14 71 C 16 72.5, 24 72.5, 26 71 C 27 65, 29.5 61, 28.5 54 C 20 57, 20 57, 11.5 54 Z" fill={dressColor} />
                       <path d="M 11.5 54 C 10.5 61, 13 65, 14 71 C 16 72.5, 24 72.5, 26 71 C 27 65, 29.5 61, 28.5 54 C 20 57, 20 57, 11.5 54 Z" fill="url(#bodyShade)" />

                       {/* Left Arm */}
                       <g className={(isDoorOpen || isWalkingBack) && !hasReachedDoor ? 'animate-walk-arm-l' : ''} style={{ transformOrigin: '15px 20px', transition: 'all 0.5s ease', filter: 'drop-shadow(-1px 2px 3px rgba(0,0,0,0.5))' }}>
                          <path d={hasReachedDoor ? "M 14.5 18 Q 11 26 19.5 24" : "M 14.5 18 C 11 26, 9 36, 10 46"} stroke={dressColor} strokeWidth="4.5" fill="none" strokeLinecap="round" style={{ transition: 'all 0.5s ease' }} />
                          {/* Arm Shading (overlay path) */}
                          <path d={hasReachedDoor ? "M 14.5 18 Q 11 26 19.5 24" : "M 14.5 18 C 11 26, 9 36, 10 46"} stroke="url(#armShade)" strokeWidth="4.5" fill="none" strokeLinecap="round" style={{ transition: 'all 0.5s ease' }} />
                          <ellipse cx={hasReachedDoor ? "19.5" : "10"} cy={hasReachedDoor ? "24" : "46"} rx={hasReachedDoor ? "1.5" : "1.8"} ry={hasReachedDoor ? "3" : "2.2"} fill="url(#faceShade)" style={{ transition: 'all 0.5s ease' }} transform={hasReachedDoor ? "rotate(15 19.5 24)" : "rotate(10 10 46)"} />
                       </g>
                       
                       {/* Right Arm */}
                       <g className={(isDoorOpen || isWalkingBack) && !hasReachedDoor ? 'animate-walk-arm-r' : ''} style={{ transformOrigin: '25px 20px', transition: 'all 0.5s ease', filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.5))' }}>
                          <path d={hasReachedDoor ? "M 25.5 18 Q 29 26 20.5 24" : "M 25.5 18 C 29 26, 31 36, 30 46"} stroke={dressColor} strokeWidth="4.5" fill="none" strokeLinecap="round" style={{ transition: 'all 0.5s ease' }} />
                          {/* Arm Shading */}
                          <path d={hasReachedDoor ? "M 25.5 18 Q 29 26 20.5 24" : "M 25.5 18 C 29 26, 31 36, 30 46"} stroke="url(#armShade)" strokeWidth="4.5" fill="none" strokeLinecap="round" style={{ transition: 'all 0.5s ease' }} />
                          <ellipse cx={hasReachedDoor ? "20.5" : "30"} cy={hasReachedDoor ? "24" : "46"} rx={hasReachedDoor ? "1.5" : "1.8"} ry={hasReachedDoor ? "3" : "2.2"} fill="url(#faceShade)" style={{ transition: 'all 0.5s ease' }} transform={hasReachedDoor ? "rotate(-15 20.5 24)" : "rotate(-10 30 46)"} />
                       </g>

                       {/* Left Leg (Realistic Shading) */}
                       <g className={(isDoorOpen || isWalkingBack) && !hasReachedDoor ? 'animate-walk-leg-l' : ''} style={{ transformOrigin: '17px 70px' }}>
                          <path d="M 14.5 70 C 13.5 80, 16.5 87, 15.5 95 L 18.5 95 C 19 87, 17.5 80, 17.5 70 Z" fill="url(#legShade)" />
                          {/* High Heel */}
                          <path d="M 15 94 C 18 93.5, 19.5 94, 20 95 L 19.5 99 L 18.5 99 L 18 96 L 14 96 C 14 95, 14.5 94, 15 94 Z" fill="#0f172a" />
                       </g>

                       {/* Right Leg (Realistic Shading) */}
                       <g className={(isDoorOpen || isWalkingBack) && !hasReachedDoor ? 'animate-walk-leg-r' : ''} style={{ transformOrigin: '23px 70px' }}>
                          <path d="M 22.5 70 C 21.5 80, 24.5 87, 23.5 95 L 26.5 95 C 27 87, 25.5 80, 25.5 70 Z" fill="url(#legShade)" />
                          {/* High Heel */}
                          <path d="M 23 94 C 26 93.5, 27.5 94, 28 95 L 27.5 99 L 26.5 99 L 26 96 L 22 96 C 22 95, 22.5 94, 23 94 Z" fill="#0f172a" />
                       </g>
                    </svg>
                </div>
            </div>

            {/* Intercom / Doorbell Pillar */}
            <div className="absolute bottom-0 left-[calc(50%-175px)] transform -translate-x-full w-12 h-[130px] bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[4px_0_10px_rgba(0,0,0,0.8)] border-x border-t border-[#475569] flex flex-col items-center justify-center z-20">
               
               {/* Large Invisible Clickable Overlay for Mobile */}
               <div 
                 className="absolute inset-0 -m-16 sm:-m-4 lg:m-0 z-50 cursor-pointer" 
                 onClick={handleDoorbellClick}
               ></div>

               {/* Doorbell panel */}
               <div className="w-8 h-16 bg-[#334155] rounded-sm border border-[#64748b] flex flex-col items-center py-2 shadow-inner relative z-10 pointer-events-none">
                  {/* Camera lens */}
                  <div className="w-3 h-3 bg-black rounded-full border border-gray-600 mb-2"></div>
                  <div 
                     className="w-4 h-4 bg-[#e2e8f0] rounded-full shadow-md flex items-center justify-center border border-gray-400 transition-colors"
                  >
                     <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse"></div>
                  </div>
               </div>
            </div>

            {/* Quick Access Pillar (Right Side) */}
            <div className="absolute bottom-0 left-[calc(50%+175px)] w-12 h-[130px] bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[4px_0_10px_rgba(0,0,0,0.8)] border-x border-t border-[#475569] flex flex-col items-center justify-center z-20">
               
               {/* Large Invisible Clickable Overlay for Mobile */}
               <div 
                 className="absolute inset-0 -m-16 sm:-m-4 lg:m-0 z-50 cursor-pointer" 
                 onClick={() => {
                   sessionStorage.setItem("animationPlayed", "true");
                   navigate(ROUTES.NEXT_PAGE);
                 }}
               ></div>

               {/* Doorbell panel */}
               <div className="w-8 h-16 bg-[#334155] rounded-sm border border-[#64748b] flex flex-col items-center py-2 shadow-inner relative z-10 pointer-events-none">
                  {/* Camera lens */}
                  <div className="w-3 h-3 bg-black rounded-full border border-gray-600 mb-2"></div>
                  <div 
                     className="w-4 h-4 bg-[#e2e8f0] rounded-full shadow-md flex items-center justify-center border border-gray-400 transition-colors"
                  >
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse"></div>
                  </div>
               </div>
            </div>

            {/* Clear, Highly Visible Glass Entrance Wall & Doors */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[350px] h-[130px] border-t-[2px] border-x-[2px] border-[#94a3b8] flex shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-30">
              {/* Four Glass Panels with centered double doors */}
              <div className="w-1/4 h-full border-r border-[#94a3b8]/60 relative z-20 bg-gradient-to-br from-blue-100/30 to-blue-500/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]"></div>
              <div className={`w-1/4 h-full border-r-[2px] border-[#94a3b8] relative flex items-center justify-end pr-2 z-10 transition-transform duration-[1500ms] ease-in-out bg-gradient-to-br from-blue-100/30 to-blue-500/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] ${isDoorOpen ? '-translate-x-[95%]' : 'translate-x-0'}`}>
                 {/* Metal Door Handle */}
                 <div className="w-1.5 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[1px] shadow-lg"></div>
              </div>
              <div className={`w-1/4 h-full border-r border-[#94a3b8]/60 relative flex items-center justify-start pl-2 z-10 transition-transform duration-[1500ms] ease-in-out bg-gradient-to-br from-blue-100/30 to-blue-500/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] ${isDoorOpen ? 'translate-x-[95%]' : 'translate-x-0'}`}>
                 {/* Metal Door Handle */}
                 <div className="w-1.5 h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[1px] shadow-lg"></div>
              </div>
              <div className="w-1/4 h-full relative z-20 bg-gradient-to-br from-blue-100/30 to-blue-500/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]"></div>
            </div>

            {/* Structural Golden Pillars (Responsive placement to match specific phone framing) */}
            <div className="absolute inset-y-0 left-[calc(50%-280px)] sm:left-0 w-[50px] sm:w-40 flex justify-between px-0 sm:px-6 z-20">
              <div className="w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
              <div className="w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
              <div className="hidden sm:block w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
            </div>
            <div className="absolute inset-y-0 left-[calc(50%+230px)] sm:left-auto sm:right-0 w-[50px] sm:w-40 flex justify-between px-0 sm:px-6 z-20">
              <div className="w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
              <div className="w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
              <div className="hidden sm:block w-4 h-full bg-gradient-to-r from-[#8b754b] via-[#e8ce96] to-[#5c4a2a] shadow-[4px_0_15px_rgba(0,0,0,1)] relative"><div className="absolute top-0 w-full h-3 bg-black/60"></div><div className="absolute bottom-0 w-full h-2 bg-black/40"></div></div>
            </div>
          </div>

          {/* Flat Entrance Canopy spanning the front */}
          <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-[#4a3a35] to-[#2a201d] border-t border-[#66534d] shadow-[0_15px_25px_rgba(0,0,0,0.9)] flex justify-center items-center z-50">
             {/* Canopy top highlight */}
             <div className="absolute top-0 w-full h-[1px] bg-white/20"></div>
          </div>

          {/* Realistic Stepped Base / Stairs leading to entrance */}
          <div className="absolute -bottom-6 w-[110%] flex flex-col items-center z-50">
             {/* Top Step */}
             <div className="w-[94%] h-2 bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] border-t border-white/60 shadow-sm"></div>
             {/* Middle Step */}
             <div className="w-[97%] h-2 bg-gradient-to-b from-[#d1d5db] to-[#6b7280] border-t border-white/40 shadow-sm"></div>
             {/* Bottom Step */}
             <div className="w-full h-3 bg-gradient-to-b from-[#9ca3af] to-[#4b5563] border-t border-white/30 shadow-[0_10px_20px_rgba(0,0,0,0.4)]"></div>
          </div>

          </div>

          {/* Narrow Street / Walkway leading to Entrance */}
          <div 
             className="absolute bottom-[-14vh] left-1/2 -translate-x-1/2 w-[240px] h-[14vh] z-0 flex justify-center pointer-events-none"
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
          >
             <div className="w-full h-full bg-gradient-to-b from-[#374151] to-[#111827] shadow-[inset_0_20px_30px_rgba(0,0,0,0.8)] relative">
                
                {/* Street Texture */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

                {/* Center dashed yellow line (perspective scaled) */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full flex flex-col justify-between py-2 items-center opacity-80 z-10">
                   <div className="w-[3px] h-4 bg-yellow-400 rounded-sm shadow-sm"></div>
                   <div className="w-[4px] h-6 bg-yellow-400 rounded-sm shadow-sm"></div>
                   <div className="w-[5px] h-8 bg-yellow-400 rounded-sm shadow-sm"></div>
                   <div className="w-[6px] h-12 bg-yellow-400 rounded-sm shadow-sm"></div>
                </div>

             </div>
          </div>
          
        </div>
         {/* END BUILDING CONTAINER */}
         </div>

         {/* External Plaza Garden (Left Side) with Seating Benches */}
         <div className="absolute bottom-[14vh] right-[calc(50%+475px)] w-[800px] h-[220px] flex items-end justify-start z-10 pointer-events-none mb-1 transform scale-x-[-1]">
            
            {/* Vibrant Grassy Ground (Expanded Height) */}
            <div className="absolute -bottom-8 w-[780px] h-14 bg-gradient-to-b from-[#16a34a] to-[#065f46] rounded-[50px] blur-[1px] opacity-95 shadow-[0_-3px_15px_rgba(22,163,74,0.5)] border-t-[3px] border-[#4ade80]">
               {/* Grass blades detailing */}
               <div className="absolute top-0 left-10 w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
               <div className="absolute top-0 left-[80px] w-1 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[240px] w-1 h-2.5 bg-[#86efac] rounded-t-full transform -rotate-6"></div>
               <div className="absolute top-0 left-[400px] w-1.5 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[650px] w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
            </div>

            {/* Tree 1 (Far left) */}
            <div className="absolute left-6 bottom-0 flex flex-col items-center z-10">
               <div className="relative w-36 h-36 z-20">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-4 right-2 w-20 h-14 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 2 (Mid left, taller) */}
            <div className="absolute left-[200px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-40 h-40 z-20 transform scale-x-[-1]">
                 <div className="absolute top-0 left-6 w-24 h-24 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-20 h-24 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-5 h-32 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-12 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 3 (Mid right, smaller) */}
            <div className="absolute left-[440px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-32 h-32 z-20">
                 <div className="absolute top-0 left-4 w-16 h-16 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-4 -left-1 w-14 h-14 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-3 right-1 w-14 h-16 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-20 h-12 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-3 h-20 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-8 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 4 (Far right) */}
            <div className="absolute left-[640px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-36 h-36 z-20 transform scale-x-[-1]">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Dense Shrubs (Expanded over 780px) */}
            <div className="w-[780px] h-20 relative flex items-end z-20">
               <div className="absolute left-2 bottom-0 w-24 h-14 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[40px] shadow-lg"></div>
               <div className="absolute left-[60px] bottom-0 w-20 h-12 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[30px] shadow-lg"></div>
               
               <div className="absolute left-[130px] bottom-0 w-32 h-16 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[50px] shadow-lg">
                  <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-8 left-12 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
               </div>

               <div className="absolute left-[240px] bottom-0 w-24 h-14 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[40px] shadow-lg"></div>
               
               <div className="absolute left-[300px] bottom-0 w-36 h-18 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-5 right-8 w-2 h-2 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-7 left-10 w-2.5 h-2.5 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
                  <div className="absolute top-6 left-16 w-2 h-2 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
               </div>

               <div className="absolute left-[420px] bottom-0 w-28 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[35px] shadow-lg"></div>

               <div className="absolute left-[500px] bottom-0 w-32 h-16 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[50px] shadow-lg">
                  <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
               </div>

               <div className="absolute left-[620px] bottom-0 w-24 h-12 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[30px] shadow-lg"></div>
               <div className="absolute right-0 bottom-0 w-24 h-10 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[25px] shadow-lg"></div>
            </div>

            {/* Glowing Lamps (6 Lamps) */}
            <div className="absolute inset-0 w-[780px] h-full z-20 pointer-events-none">
               <div className="absolute left-10 bottom-2 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-1 h-14 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[150px] bottom-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.9)] z-10 animate-pulse"></div>
                  <div className="w-1 h-16 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[280px] bottom-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-12 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[400px] bottom-5 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.9)] z-10 animate-pulse"></div>
                  <div className="w-1 h-18 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[560px] bottom-2 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-14 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute right-10 bottom-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-10 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 1 */}
            <div className="absolute left-[80px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 2 */}
            <div className="absolute left-[320px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 3 */}
            <div className="absolute left-[560px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

         </div>

         
         {/* External Plaza Garden (Right Side) with Seating Benches */}
         <div className="absolute bottom-[14vh] left-[calc(50%+475px)] w-[800px] h-[220px] flex items-end justify-start z-10 pointer-events-none mb-1">
            
            {/* Vibrant Grassy Ground (Expanded Height) */}
            <div className="absolute -bottom-8 w-[780px] h-14 bg-gradient-to-b from-[#16a34a] to-[#065f46] rounded-[50px] blur-[1px] opacity-95 shadow-[0_-3px_15px_rgba(22,163,74,0.5)] border-t-[3px] border-[#4ade80]">
               {/* Grass blades detailing */}
               <div className="absolute top-0 left-10 w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
               <div className="absolute top-0 left-[80px] w-1 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[240px] w-1 h-2.5 bg-[#86efac] rounded-t-full transform -rotate-6"></div>
               <div className="absolute top-0 left-[400px] w-1.5 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[650px] w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
            </div>

            {/* Tree 1 (Far left) */}
            <div className="absolute left-6 bottom-0 flex flex-col items-center z-10">
               <div className="relative w-36 h-36 z-20">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-4 right-2 w-20 h-14 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 2 (Mid left, taller) */}
            <div className="absolute left-[200px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-40 h-40 z-20 transform scale-x-[-1]">
                 <div className="absolute top-0 left-6 w-24 h-24 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-20 h-24 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-5 h-32 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-12 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 3 (Mid right, smaller) */}
            <div className="absolute left-[440px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-32 h-32 z-20">
                 <div className="absolute top-0 left-4 w-16 h-16 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-4 -left-1 w-14 h-14 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-3 right-1 w-14 h-16 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-20 h-12 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-3 h-20 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-8 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 4 (Far right) */}
            <div className="absolute left-[640px] bottom-0 flex flex-col items-center z-10">
               <div className="relative w-36 h-36 z-20 transform scale-x-[-1]">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Dense Shrubs (Expanded over 780px) */}
            <div className="w-[780px] h-20 relative flex items-end z-20">
               <div className="absolute left-2 bottom-0 w-24 h-14 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[40px] shadow-lg"></div>
               <div className="absolute left-[60px] bottom-0 w-20 h-12 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[30px] shadow-lg"></div>
               
               <div className="absolute left-[130px] bottom-0 w-32 h-16 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[50px] shadow-lg">
                  <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-8 left-12 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
               </div>

               <div className="absolute left-[240px] bottom-0 w-24 h-14 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[40px] shadow-lg"></div>
               
               <div className="absolute left-[300px] bottom-0 w-36 h-18 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-5 right-8 w-2 h-2 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-7 left-10 w-2.5 h-2.5 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
                  <div className="absolute top-6 left-16 w-2 h-2 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
               </div>

               <div className="absolute left-[420px] bottom-0 w-28 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[35px] shadow-lg"></div>

               <div className="absolute left-[500px] bottom-0 w-32 h-16 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[50px] shadow-lg">
                  <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_4px_rgba(251,113,133,0.8)]"></div>
               </div>

               <div className="absolute left-[620px] bottom-0 w-24 h-12 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[30px] shadow-lg"></div>
               <div className="absolute right-0 bottom-0 w-24 h-10 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[25px] shadow-lg"></div>
            </div>

            {/* Glowing Lamps (6 Lamps) */}
            <div className="absolute inset-0 w-[780px] h-full z-20 pointer-events-none">
               <div className="absolute left-10 bottom-2 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-1 h-14 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[150px] bottom-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.9)] z-10 animate-pulse"></div>
                  <div className="w-1 h-16 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[280px] bottom-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-12 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[400px] bottom-5 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_15px_8px_rgba(250,204,21,0.9)] z-10 animate-pulse"></div>
                  <div className="w-1 h-18 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[560px] bottom-2 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-14 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute right-10 bottom-1 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_12px_6px_rgba(250,204,21,0.8)] z-10 animate-pulse"></div>
                  <div className="w-[3px] h-10 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 1 */}
            <div className="absolute left-[80px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 2 */}
            <div className="absolute left-[320px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

            {/* Wooden Seating Bench 3 */}
            <div className="absolute left-[560px] bottom-0 w-40 h-24 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.6] origin-bottom hover:scale-[0.65] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-10 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-3">
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-4 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-20 border-t border-[#d97706] transform perspective-[300px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2 h-7 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

         </div>

         {/* Foreground Grassy Plaza Garden (Far Left, Foreground) */}
         <div className="absolute bottom-[2vh] right-[calc(50%+540px)] w-[600px] h-[180px] flex items-end justify-start z-30 pointer-events-none transform scale-x-[-1]">
            
            {/* Vibrant Grassy Ground (Expanded Height) */}
            <div className="absolute -bottom-10 w-[580px] h-16 bg-gradient-to-b from-[#16a34a] to-[#065f46] rounded-[60px] blur-[1px] opacity-95 shadow-[0_-3px_15px_rgba(22,163,74,0.5)] border-t-[3px] border-[#4ade80]">
               {/* Grass blades detailing */}
               <div className="absolute top-0 left-10 w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
               <div className="absolute top-0 left-12 w-1 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-40 w-1 h-2.5 bg-[#86efac] rounded-t-full transform -rotate-6"></div>
               <div className="absolute top-0 left-[200px] w-1.5 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[350px] w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
            </div>

            {/* Tree 1 (Foreground Left) */}
            <div className="absolute left-8 bottom-2 flex flex-col items-center z-10 transform scale-110 origin-bottom">
               <div className="relative w-40 h-40 z-20">
                 <div className="absolute top-0 left-8 w-24 h-24 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-20 h-24 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-16 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-4 right-2 w-24 h-16 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-5 h-32 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-12 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 2 (Foreground Right) */}
            <div className="absolute left-[380px] bottom-2 flex flex-col items-center z-10 transform scale-125 origin-bottom scale-x-[-1]">
               <div className="relative w-36 h-36 z-20">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Large Dense Shrubs on Grass */}
            <div className="w-[580px] h-24 relative flex items-end z-20">
               <div className="absolute left-0 bottom-2 w-32 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[100px] bottom-1 w-24 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               
               <div className="absolute left-[180px] bottom-2 w-36 h-20 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-4 left-8 w-3 h-3 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
                  <div className="absolute top-10 left-16 w-4 h-4 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
                  <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
               </div>

               <div className="absolute left-[320px] bottom-2 w-28 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[400px] bottom-1 w-32 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               <div className="absolute right-4 bottom-2 w-28 h-18 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-5 left-8 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
               </div>
            </div>

            {/* Glowing Lamps (Foreground Scale) */}
            <div className="absolute inset-0 w-[580px] h-full z-20 pointer-events-none">
               <div className="absolute left-[140px] bottom-4 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-20 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[300px] bottom-3 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-16 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[480px] bottom-5 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-4 h-4 bg-[#fef08a] rounded-full shadow-[0_0_25px_12px_rgba(250,204,21,1)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-24 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
            </div>

            {/* Wooden Seating Bench (Foreground Scale) */}
            <div className="absolute left-[200px] bottom-2 w-48 h-28 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.8] origin-bottom hover:scale-[0.85] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-12 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-4">
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-5 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.9)] z-20 border-t-2 border-[#d97706] transform perspective-[400px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

         </div>
      
         {/* Foreground Grassy Plaza Garden (Far Left, Foreground) */}
         <div className="absolute bottom-[2vh] right-[calc(50%+540px)] w-[600px] h-[180px] flex items-end justify-start z-30 pointer-events-none transform scale-x-[-1]">
            
            {/* Vibrant Grassy Ground (Expanded Height) */}
            <div className="absolute -bottom-10 w-[580px] h-16 bg-gradient-to-b from-[#16a34a] to-[#065f46] rounded-[60px] blur-[1px] opacity-95 shadow-[0_-3px_15px_rgba(22,163,74,0.5)] border-t-[3px] border-[#4ade80]">
               {/* Grass blades detailing */}
               <div className="absolute top-0 left-10 w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
               <div className="absolute top-0 left-12 w-1 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-40 w-1 h-2.5 bg-[#86efac] rounded-t-full transform -rotate-6"></div>
               <div className="absolute top-0 left-[200px] w-1.5 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[350px] w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
            </div>

            {/* Tree 1 (Foreground Left) */}
            <div className="absolute left-8 bottom-2 flex flex-col items-center z-10 transform scale-110 origin-bottom">
               <div className="relative w-40 h-40 z-20">
                 <div className="absolute top-0 left-8 w-24 h-24 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-20 h-24 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-16 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-4 right-2 w-24 h-16 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-5 h-32 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-12 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 2 (Foreground Right) */}
            <div className="absolute left-[380px] bottom-2 flex flex-col items-center z-10 transform scale-125 origin-bottom scale-x-[-1]">
               <div className="relative w-36 h-36 z-20">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Large Dense Shrubs on Grass */}
            <div className="w-[580px] h-24 relative flex items-end z-20">
               <div className="absolute left-0 bottom-2 w-32 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[100px] bottom-1 w-24 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               
               <div className="absolute left-[180px] bottom-2 w-36 h-20 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-4 left-8 w-3 h-3 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
                  <div className="absolute top-10 left-16 w-4 h-4 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
                  <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
               </div>

               <div className="absolute left-[320px] bottom-2 w-28 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[400px] bottom-1 w-32 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               <div className="absolute right-4 bottom-2 w-28 h-18 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-5 left-8 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
               </div>
            </div>

            {/* Glowing Lamps (Foreground Scale) */}
            <div className="absolute inset-0 w-[580px] h-full z-20 pointer-events-none">
               <div className="absolute left-[140px] bottom-4 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-20 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[300px] bottom-3 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-16 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[480px] bottom-5 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-4 h-4 bg-[#fef08a] rounded-full shadow-[0_0_25px_12px_rgba(250,204,21,1)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-24 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
            </div>

            {/* Wooden Seating Bench (Foreground Scale) */}
            <div className="absolute left-[200px] bottom-2 w-48 h-28 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.8] origin-bottom hover:scale-[0.85] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-12 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-4">
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-5 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.9)] z-20 border-t-2 border-[#d97706] transform perspective-[400px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>
         {/* Foreground Grassy Plaza Garden (Far Right, Foreground) */}
         <div className="absolute bottom-[2vh] left-[calc(50%+540px)] w-[600px] h-[180px] flex items-end justify-start z-30 pointer-events-none">
            
            {/* Vibrant Grassy Ground (Expanded Height) */}
            <div className="absolute -bottom-10 w-[580px] h-16 bg-gradient-to-b from-[#16a34a] to-[#065f46] rounded-[60px] blur-[1px] opacity-95 shadow-[0_-3px_15px_rgba(22,163,74,0.5)] border-t-[3px] border-[#4ade80]">
               {/* Grass blades detailing */}
               <div className="absolute top-0 left-10 w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
               <div className="absolute top-0 left-12 w-1 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-40 w-1 h-2.5 bg-[#86efac] rounded-t-full transform -rotate-6"></div>
               <div className="absolute top-0 left-[200px] w-1.5 h-3 bg-[#4ade80] rounded-t-full transform rotate-12"></div>
               <div className="absolute top-0 left-[350px] w-1 h-2 bg-[#86efac] rounded-t-full transform -rotate-12"></div>
            </div>

            {/* Tree 1 (Foreground Left) */}
            <div className="absolute left-8 bottom-2 flex flex-col items-center z-10 transform scale-110 origin-bottom">
               <div className="relative w-40 h-40 z-20">
                 <div className="absolute top-0 left-8 w-24 h-24 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-20 h-24 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-16 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-4 right-2 w-24 h-16 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-5 h-32 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-12 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Tree 2 (Foreground Right) */}
            <div className="absolute left-[380px] bottom-2 flex flex-col items-center z-10 transform scale-125 origin-bottom scale-x-[-1]">
               <div className="relative w-36 h-36 z-20">
                 <div className="absolute top-0 left-6 w-20 h-20 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute top-5 -left-1 w-16 h-16 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-full shadow-[inset_-2px_-4px_12px_rgba(0,0,0,0.4)]"></div>
                 <div className="absolute top-4 right-1 w-16 h-20 bg-gradient-to-br from-[#166534] to-[#064e3b] rounded-full shadow-[inset_-2px_-5px_15px_rgba(0,0,0,0.5)]"></div>
                 <div className="absolute bottom-2 left-2 w-24 h-14 bg-gradient-to-br from-[#15803d] to-[#14532d] rounded-full shadow-[inset_-2px_-4px_10px_rgba(0,0,0,0.5)]"></div>
               </div>
               <div className="w-4 h-24 bg-gradient-to-r from-[#451a03] to-[#271c19] -mt-10 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Large Dense Shrubs on Grass */}
            <div className="w-[580px] h-24 relative flex items-end z-20">
               <div className="absolute left-0 bottom-2 w-32 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[100px] bottom-1 w-24 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               
               <div className="absolute left-[180px] bottom-2 w-36 h-20 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-4 left-8 w-3 h-3 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
                  <div className="absolute top-10 left-16 w-4 h-4 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
                  <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-[#f43f5e] rounded-full shadow-[0_0_6px_rgba(244,63,94,0.9)]"></div>
               </div>

               <div className="absolute left-[320px] bottom-2 w-28 h-16 bg-gradient-to-t from-[#064e3b] to-[#047857] rounded-t-[50px] shadow-lg"></div>
               <div className="absolute left-[400px] bottom-1 w-32 h-14 bg-gradient-to-t from-[#022c22] to-[#065f46] rounded-t-[40px] shadow-lg"></div>
               <div className="absolute right-4 bottom-2 w-28 h-18 bg-gradient-to-t from-[#14532d] to-[#15803d] rounded-t-[60px] shadow-lg">
                  <div className="absolute top-5 left-8 w-3 h-3 bg-[#fb7185] rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
               </div>
            </div>

            {/* Glowing Lamps (Foreground Scale) */}
            <div className="absolute inset-0 w-[580px] h-full z-20 pointer-events-none">
               <div className="absolute left-[140px] bottom-4 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-20 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[300px] bottom-3 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-3.5 h-3.5 bg-[#fef08a] rounded-full shadow-[0_0_20px_10px_rgba(250,204,21,0.95)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-16 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
               <div className="absolute left-[480px] bottom-5 flex flex-col items-center transform scale-110 origin-bottom">
                  <div className="w-4 h-4 bg-[#fef08a] rounded-full shadow-[0_0_25px_12px_rgba(250,204,21,1)] z-10 animate-pulse"></div>
                  <div className="w-1.5 h-24 bg-gradient-to-r from-gray-800 to-black"></div>
               </div>
            </div>

            {/* Wooden Seating Bench (Foreground Scale) */}
            <div className="absolute left-[200px] bottom-2 w-48 h-28 flex flex-col justify-end z-40 pointer-events-auto cursor-pointer transform scale-[0.8] origin-bottom hover:scale-[0.85] transition-transform">
               {/* Bench Backrest */}
               <div className="w-full h-12 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-sm border-t-2 border-[#b45309] shadow-lg flex justify-evenly items-center px-4">
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
                  <div className="w-1.5 h-full bg-[#271c19] shadow-inner"></div>
               </div>
               {/* Bench Seat */}
               <div className="w-[106%] -ml-[3%] h-5 bg-gradient-to-b from-[#92400e] to-[#78350f] rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.9)] z-20 border-t-2 border-[#d97706] transform perspective-[400px] rotateX-[25deg]"></div>
               {/* Bench Legs */}
               <div className="flex justify-between w-[85%] mx-auto">
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
                  <div className="w-2.5 h-8 bg-gradient-to-b from-gray-600 to-black rounded-b-sm shadow-md"></div>
               </div>
            </div>

         </div>


      </div>
      
    </div>
  );
}

