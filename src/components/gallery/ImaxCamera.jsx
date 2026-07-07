import Cloudinary from '../../constants/Cloudinary';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clickAudio = new Audio(Cloudinary.clickSound);
clickAudio.preload = 'auto';
clickAudio.volume = 0.5;

const titleColors = [
  'text-pink-300',
  'text-blue-300',
  'text-green-300',
  'text-yellow-300',
  'text-purple-300',
  'text-cyan-300',
  'text-orange-300',
  'text-teal-300',
  'text-rose-300',
  'text-fuchsia-300'
];

export function ImageCard({ id, index, imageUrl, title, onShutterPress }) {
  const cardRef = useRef(null);
  const titleColorClass = titleColors[index % titleColors.length];
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.stopPropagation();
    clickAudio.currentTime = 0;
    
    if (onShutterPress) {
      onShutterPress(true);
    }
    
    let navigated = false;
    const doNavigate = () => {
      if (!navigated) {
        navigated = true;
        navigate('/gallery', { state: { category: title } });
      }
    };
    
    setTimeout(doNavigate, 600);
    
    clickAudio.play().catch(err => {
      console.log('Audio playback prevented by browser:', err);
    });
  };
  
  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.dataset.hovered = 'true';
      cardRef.current.style.zIndex = '50';
    }
  };
  
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.dataset.hovered = 'false';
      cardRef.current.style.zIndex = '30';
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      
      setTimeout(() => {
        if (cardRef.current && cardRef.current.dataset.hovered === 'false') {
          cardRef.current.style.transition = 'none';
        }
      }, 500);
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="absolute top-0 left-0 w-[90px] h-[90px] -mt-[45px] -ml-[45px] pointer-events-auto z-30 group"
    >
      <div className="w-full h-full bg-white/5 backdrop-blur-md border border-white/20 p-[4px] shadow-lg rounded-lg transition-transform duration-300 ease-out cursor-pointer group-hover:scale-[1.3] relative">
        <img src={imageUrl} alt="Gallery item" className="w-full h-full object-cover rounded-md opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-[4px] right-[4px] bottom-[4px] left-[4px] bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-md flex items-end justify-center pb-[6px]">
          <span className={`${titleColorClass} text-[11px] font-bold tracking-wider text-center drop-shadow-md`}>{title}</span>
        </div>
      </div>
    </div>
  );
}

export function Screw({ className }) {
  return (
    <div className={`absolute w-[16px] h-[16px] rounded-full flex justify-center items-center z-20 bg-[linear-gradient(135deg,#7a7a7a,#333)] shadow-[0_2px_5px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="w-[7px] h-[7px] bg-[#111] rounded-[1px] shadow-[inset_0_1px_2px_#000]"></div>
    </div>
  );
}

export default function ImaxCamera({ galleryData = [] }) {
  const trackRef = useRef(null);
  const [isShutterPressed, setIsShutterPressed] = useState(false);

  useEffect(() => {
    if (isShutterPressed) {
      const timer = setTimeout(() => setIsShutterPressed(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isShutterPressed]);

  useEffect(() => {
    let lastTime = performance.now();
    let accumulatedTime = 0;
    let rafId;

    const getPosition = (progress) => {
      const p = progress * 2352;
      if (p < 748) return { x: p, y: 0 };
      if (p < 1176) return { x: 748, y: p - 748 };
      if (p < 1924) return { x: 748 - (p - 1176), y: 428 };
      return { x: 0, y: 428 - (p - 1924) };
    };

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (trackRef.current && galleryData.length > 0) {
        const cards = trackRef.current.children;
        let isAnyHovered = false;
        
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].dataset.hovered === 'true') {
            isAnyHovered = true;
            break;
          }
        }

        if (!isAnyHovered) {
          accumulatedTime += delta;
        }

        const progress = (accumulatedTime / 40000) % 1;
        
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          if (card.dataset.hovered === 'true') continue;
          
          const p = (progress + i / galleryData.length) % 1;
          const { x, y } = getPosition(p);
          card.style.transform = `translate(${x}px, ${y}px)`;
        }
      }
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame((time) => {
      lastTime = time;
      animate(time);
    });
    return () => cancelAnimationFrame(rafId);
  }, [galleryData.length]);

  return (
    <div className="camera relative w-[960px] h-[620px] rounded-xl bg-[radial-gradient(circle_at_center,#232426,#161718)] shadow-[0_40px_60px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.2),inset_0_2px_3px_rgba(255,255,255,0.15),inset_0_-3px_6px_rgba(0,0,0,0.8),inset_0_0_0_2px_#0a0a0a]">
      <div className="knob absolute -top-[24px] w-[36px] h-[24px] rounded-t-sm z-10 left-[90px] bg-[linear-gradient(to_right,#111_0%,#3a3a3a_30%,#444_50%,#222_80%,#0a0a0a_100%)] shadow-[0_-2px_5px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:-top-[12px] before:left-[2px] before:w-[32px] before:h-[12px] before:bg-[linear-gradient(to_right,#111_0%,#4a4a4a_40%,#111_100%)] before:rounded-t-sm"></div>
      <div className={`knob absolute w-[36px] h-[24px] rounded-t-sm z-10 right-[90px] bg-[linear-gradient(to_right,#111_0%,#3a3a3a_30%,#444_50%,#222_80%,#0a0a0a_100%)] shadow-[0_-2px_5px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:-top-[12px] before:left-[2px] before:w-[32px] before:h-[12px] before:bg-[linear-gradient(to_right,#111_0%,#4a4a4a_40%,#111_100%)] before:rounded-t-sm transition-all duration-150 ease-out cursor-pointer ${isShutterPressed ? '-top-[14px]' : '-top-[24px]'}`}></div>
      
      <div className="small-bump absolute -top-[12px] w-[20px] h-[12px] rounded-t z-10 left-[230px] bg-[linear-gradient(to_right,#0a0a0a,#2a2a2a,#0a0a0a)]"></div>
      <div className="small-bump absolute -top-[12px] w-[20px] h-[12px] rounded-t z-10 right-[230px] bg-[linear-gradient(to_right,#0a0a0a,#2a2a2a,#0a0a0a)]"></div>
      
      <div className="top-housing absolute -top-[42px] left-1/2 -translate-x-1/2 w-[280px] h-[42px] rounded-t-md flex justify-center items-center z-10 bg-[linear-gradient(to_bottom,#1d1e1f,#151617)] shadow-[inset_0_2px_3px_rgba(255,255,255,0.1),inset_0_0_0_1px_#050505]">
        <div className="logo-box w-[240px] h-[30px] bg-[#050505] rounded-sm flex justify-center items-center shadow-[inset_0_0_10px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="text-[#f8f8f8] font-black text-[22px] tracking-[4px] leading-none pb-[2px]" style={{ fontFamily: '"Arial Black", "Impact", sans-serif' }}>
            CRCCF
          </div>
        </div>
      </div>
      
      <Screw className="top-[120px] left-[10px]" />
      <Screw className="bottom-[120px] left-[10px]" />
      <Screw className="top-[120px] right-[10px]" />
      <Screw className="bottom-[120px] right-[10px]" />
      
      <div className="matte-box-hole absolute top-[36px] left-[36px] right-[36px] bottom-[36px] shadow-[0_0_0_2px_#0a0a0a,0_0_20px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(0,0,0,1)] border-solid border-t-[120px] border-t-[#141516] border-b-[120px] border-b-[#2a2b2c] border-l-[140px] border-l-[#1a1b1c] border-r-[140px] border-r-[#1a1b1c]">
        <div className="backplate relative w-full h-full bg-[#111213] shadow-[inset_0_0_50px_rgba(0,0,0,1)] flex justify-center items-center">
          
          <div className="lens-mount-sq relative w-[330px] h-[330px] bg-[#161718] rounded-md flex justify-center items-center shadow-[0_15px_30px_rgba(0,0,0,0.9),0_5px_15px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.08),inset_0_0_0_1px_#050505] shrink-0">
            
            <Screw className="top-[15px] left-[15px]" />
            <Screw className="top-[15px] right-[15px]" />
            <Screw className="bottom-[15px] left-[15px]" />
            <Screw className="bottom-[15px] right-[15px]" />
            
            <div className="lens-ring-outer w-[290px] h-[290px] shrink-0 aspect-square bg-[#080808] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#111,inset_0_10px_20px_rgba(0,0,0,1),inset_0_0_0_6px_#161616,inset_0_0_0_8px_#000]">
              <div className="lens-ring-mid w-[230px] h-[230px] shrink-0 aspect-square bg-[#111] rounded-full flex justify-center items-center shadow-[0_0_10px_#000,inset_0_0_0_5px_#181818,inset_0_0_0_9px_#0a0a0a,inset_0_0_0_14px_#121212,inset_0_0_0_18px_#000]">
                <div className="lens-ring-inner w-[170px] h-[170px] shrink-0 aspect-square bg-[#050505] rounded-full flex justify-center items-center shadow-[0_0_15px_#000,inset_0_0_0_3px_#1f1f1f,inset_0_0_0_6px_#030303,inset_0_0_20px_#000]">
                  
                  <div className="lens-glass relative w-[135px] h-[135px] shrink-0 aspect-square rounded-full bg-[#040404] overflow-hidden shadow-[inset_0_0_30px_#000,inset_0_-10px_25px_rgba(255,255,255,0.06)]">
                    
                    <div className={`absolute top-0 left-0 right-0 h-1/2 bg-[#111111]/80 backdrop-blur-sm border-b-2 border-white/10 origin-top z-40 transition-transform duration-150 ease-in-out ${isShutterPressed ? 'scale-y-100' : 'scale-y-0'}`}></div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#111111]/80 backdrop-blur-sm border-t-2 border-black/50 origin-bottom z-40 transition-transform duration-150 ease-in-out ${isShutterPressed ? 'scale-y-100' : 'scale-y-0'}`}></div>

                    <div className="absolute top-[45%] left-[45%] w-[90px] h-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen bg-[radial-gradient(circle,rgba(100,60,130,0.35)_0%,transparent_65%)]"></div>
                    <div className="absolute top-[60%] left-[60%] w-[70px] h-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen bg-[radial-gradient(circle,rgba(150,110,70,0.4)_0%,transparent_60%)]"></div>
                    <div className="absolute top-[20%] left-[25%] w-[40px] h-[18px] bg-[rgba(255,255,255,0.15)] rounded-full -rotate-[35deg] blur-[2px]"></div>
                    
                    <div className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] rounded-full border-t-[1px] border-t-[rgba(255,255,255,0.1)] border-b-[2px] border-b-[rgba(0,0,0,0.9)]"></div>
                    
                    <div className="absolute top-[53%] left-[47%] w-[16px] h-[16px] bg-[#e8a2d1] rounded-full shadow-[0_0_12px_#e8a2d1,0_0_25px_#cc66a3] blur-[1.5px] z-10"></div>
                    <div className="absolute top-[48%] left-[51%] w-[8px] h-[8px] bg-white rounded-full shadow-[0_0_6px_#fff] blur-[0.5px] z-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-[#020202] rounded-full shadow-[0_0_12px_#000]"></div>
                    
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
      
      {galleryData.length > 0 && (
        <div ref={trackRef} className="absolute top-[96px] left-[106px] w-[748px] h-[428px] pointer-events-none z-30">
          {galleryData.map((item, i) => (
            <ImageCard 
              key={`carousel-${item.id}`} 
              id={item.id} 
              index={i} 
              imageUrl={item.imageUrl} 
              title={item.title} 
              onShutterPress={setIsShutterPressed} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
