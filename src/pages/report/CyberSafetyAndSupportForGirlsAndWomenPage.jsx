import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supportForWomenAndGirlsData } from './CyberSafetyAndSupportForGirlsAndWomenPageData.js';

const pagesData = supportForWomenAndGirlsData.map(item => ({
  heading: item.heading,
  subtitle: item.id.replace(/-/g, ' ').replace(/^sec\d+\s*/, '').replace(/\b\w/g, c => c.toUpperCase()),
  content: item.content.split('\n\n').filter(p => p.trim()),
  footer: item.tagline,
}));


/* ==================== Card.jsx ==================== */
const OldCard = ({ type = 'id', tilt = -2, pullOut = 0 }) => {
  const isId = type === 'id';
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        width: '75%',
        height: '55%',
        transform: `rotate(${tilt}deg) translateY(${pullOut}px)`,
        left: '12%',
        bottom: '5%',
      }}
    >
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          background: isId 
            ? 'linear-gradient(180deg, #faf6e8 0%, #f2ebd5 50%, #e8e0c8 100%)'
            : 'linear-gradient(180deg, #e8eef5 0%, #dce4ef 50%, #d0d8e5 100%)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.5)',
          borderRadius: '2px',
          border: '0.5px solid rgba(0,0,0,0.12)',
        }}
      >
        <div 
          className="w-full flex items-center justify-center"
          style={{
            height: '18%',
            background: isId
              ? 'linear-gradient(90deg, #8b1a1a 0%, #a52a2a 50%, #8b1a1a 100%)'
              : 'linear-gradient(90deg, #1a3a6c 0%, #2a5090 50%, #1a3a6c 100%)',
          }}
        >
          <span 
            className="font-bold tracking-[0.15em] uppercase"
            style={{
              fontSize: '5px',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Arial, sans-serif',
              textShadow: '0 1px 1px rgba(0,0,0,0.3)',
            }}
          >
            {isId ? 'GOVERNMENT OF INDIA' : 'OFFICIAL IDENTITY CARD'}
          </span>
        </div>
        <div className="flex w-full" style={{ height: '55%', padding: '4px 5px' }}>
          <div 
            className="flex-shrink-0 mr-2"
            style={{
              width: '22%',
              height: '100%',
              background: 'linear-gradient(180deg, #d5cdb5 0%, #c8c0a8 100%)',
              border: '0.5px solid rgba(0,0,0,0.2)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
            }}
          ></div>
          <div className="flex-1 flex flex-col justify-center gap-[3px]">
            <div className="h-[2px] rounded-sm" style={{ width: '75%', background: 'rgba(0,0,0,0.22)' }}></div>
            <div className="h-[2px] rounded-sm" style={{ width: '95%', background: 'rgba(0,0,0,0.16)' }}></div>
            <div className="h-[2px] rounded-sm" style={{ width: '60%', background: 'rgba(0,0,0,0.14)' }}></div>
            <div className="h-[2px] rounded-sm" style={{ width: '80%', background: 'rgba(0,0,0,0.12)' }}></div>
            {isId && (
              <div className="h-[2px] rounded-sm mt-1" style={{ width: '50%', background: 'rgba(0,0,0,0.1)' }}></div>
            )}
          </div>
        </div>
        <div 
          className="w-full flex items-center justify-center"
          style={{
            height: '27%',
            borderTop: '0.5px solid rgba(0,0,0,0.08)',
            background: isId
              ? 'linear-gradient(180deg, #f2ebd5 0%, #e8e0c8 100%)'
              : 'linear-gradient(180deg, #dce4ef 0%, #d0d8e5 100%)',
          }}
        >
          <div 
            className="tracking-[0.08em] font-bold"
            style={{
              fontSize: '5px',
              color: 'rgba(0,0,0,0.35)',
              fontFamily: "'Courier New', monospace",
            }}
          >
            {isId ? 'ID No: 2847-1963-H' : 'REF: GOV/2024/0847'}
          </div>
        </div>
        {!isId && (
          <div 
            className="absolute rounded-full"
            style={{
              bottom: '12%',
              right: '8%',
              width: '28px',
              height: '28px',
              border: '1.5px solid rgba(140,30,30,0.2)',
              opacity: 0.5,
              transform: 'rotate(-15deg)',
            }}
          >
            <div 
              className="absolute inset-[3px] rounded-full"
              style={{ border: '0.5px solid rgba(140,30,30,0.15)' }}
            ></div>
          </div>
        )}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.05) 100%)',
          }}
        ></div>
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '25%',
            left: '35%',
            width: '15px',
            height: '12px',
            background: 'radial-gradient(circle, rgba(139,119,101,0.08) 0%, transparent 70%)',
          }}
        ></div>
      </div>
    </div>
  );
};

/* ==================== Pen.jsx ==================== */
const OldPen = ({ color = 'blue', tilt = 2, visibleHeight = '65%' }) => {
  const isBlue = color === 'blue';
  return (
    <div 
      className="absolute w-[14px] pointer-events-none"
      style={{ 
        height: visibleHeight,
        transform: `rotate(${tilt}deg)`,
        top: '-40%',
        left: '50%',
        marginLeft: '-7px',
      }}
    >
      <div className="relative w-full h-[28%]">
        <div 
          className="absolute inset-0 rounded-t-full"
          style={{
            background: isBlue 
              ? 'linear-gradient(90deg, #0d2851 0%, #1a4a8a 30%, #2563b0 50%, #1a4a8a 70%, #0d2851 100%)'
              : 'linear-gradient(90deg, #8b6914 0%, #b8860b 30%, #d4a017 50%, #b8860b 70%, #8b6914 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.4)',
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-[12%]"
          style={{
            background: 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 40%, #f5f5f5 50%, #e8e8e8 60%, #c0c0c0 100%)',
            boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
          }}
        ></div>
        <div 
          className="absolute top-[15%] -right-[6px] w-[5px] h-[70%]"
          style={{
            background: 'linear-gradient(180deg, #e8e8e8 0%, #f8f8f8 20%, #d0d0d0 80%, #a8a8a8 100%)',
            borderRadius: '0 0 2px 2px',
            boxShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            border: '0.5px solid rgba(0,0,0,0.15)',
          }}
        ></div>
        <div className="absolute top-[8px] left-[3px] w-[3px] h-[40%] bg-gradient-to-b from-white/25 to-transparent rounded-full"></div>
      </div>
      <div className="relative w-full h-[72%]">
        <div 
          className="absolute inset-0 rounded-b-full"
          style={{
            background: isBlue
              ? 'linear-gradient(90deg, #e8e8f0 0%, #f5f5fa 20%, #ffffff 40%, #f0f0f5 60%, #d8d8e0 80%, #c8c8d0 100%)'
              : 'linear-gradient(90deg, #e8e0c8 0%, #f5eed8 20%, #fff8e8 40%, #f0e8d0 60%, #d8d0b8 80%, #c8c0a8 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 1px 2px 4px rgba(0,0,0,0.25)',
          }}
        ></div>
        {isBlue && (
          <div 
            className="absolute top-[15%] left-0 right-0 h-[25%]"
            style={{
              background: 'linear-gradient(90deg, #0d2851 0%, #1a4a8a 30%, #2563b0 50%, #1a4a8a 70%, #0d2851 100%)',
              opacity: 0.85,
            }}
          ></div>
        )}
        <div className="absolute top-[45%] left-[2px] right-[2px] space-y-[2px]">
          <div className="h-[0.5px] bg-black/10"></div>
          <div className="h-[0.5px] bg-black/8"></div>
          <div className="h-[0.5px] bg-black/10"></div>
          <div className="h-[0.5px] bg-black/8"></div>
          <div className="h-[0.5px] bg-black/10"></div>
        </div>
        <div className="absolute top-[5px] left-[3px] w-[2px] h-[50%] bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-b-full"
          style={{
            background: 'linear-gradient(90deg, #c0c0c0 0%, #e0e0e0 50%, #c0c0c0 100%)',
          }}
        ></div>
      </div>
    </div>
  );
};

/* ==================== MetalClip.jsx ==================== */
const MetalClip = ({ top, left, right, bottom, rotation = -15, className = "" }) => {
  return (
    <div 
      className={`absolute w-12 h-32 z-40 pointer-events-none ${className}`} 
      style={{ top, left, right, bottom, transform: `rotate(${rotation}deg)` }}
    >
      <svg viewBox="-5 -5 50 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="clip-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
          <clipPath id="paper-edge">
            <rect x="-20" y="-30" width="100" height="60" transform="rotate(15 20 20)" />
          </clipPath>
        </defs>
        <g filter="url(#clip-shadow)">
          <g>
            <path d="M 30 35 L 30 110 A 14 14 0 0 1 2 110 L 2 20 A 20 20 0 0 1 42 20 L 42 75" 
                  stroke="#3a4049" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.5, 1.5)" />
            <path d="M 30 35 L 30 110 A 14 14 0 0 1 2 110 L 2 20 A 20 20 0 0 1 42 20 L 42 75" 
                  stroke="#a1abb8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 30 35 L 30 110 A 14 14 0 0 1 2 110 L 2 20 A 20 20 0 0 1 42 20 L 42 75" 
                  stroke="#ffffff" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" transform="translate(-0.5, -0.5)" />
          </g>
          <g clipPath="url(#paper-edge)">
            <path d="M 14 85 L 14 35 A 8 8 0 0 1 30 35" 
                  stroke="#3a4049" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.5, 1.5)" />
            <path d="M 14 85 L 14 35 A 8 8 0 0 1 30 35" 
                  stroke="#a1abb8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 14 85 L 14 35 A 8 8 0 0 1 30 35" 
                  stroke="#ffffff" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" transform="translate(-0.5, -0.5)" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/* ==================== PaperPage.jsx ==================== */
const PaperPage = ({ pageData, isLeftPage, isTurningNext, isTurningPrev }) => {
  const scrollAreaRef = useRef(null);
  let animationClass = '';
  
  if (!pageData) {
    console.error("PaperPage rendered with undefined pageData!");
    return null;
  }
  if (isTurningNext) {
    animationClass = 'anim-slide-down-next';
  } else if (isTurningPrev) {
    animationClass = 'anim-slide-up-prev';
  }
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [pageData?.heading]);
  const handleWheel = (event) => {
    const area = scrollAreaRef.current;
    if (!area) return;
    area.scrollTop += event.deltaY;
    event.stopPropagation();
  };
  const handleKeyDown = (event) => {
    const area = scrollAreaRef.current;
    if (!area) return;
    const lineStep = 48;
    const pageStep = Math.max(area.clientHeight * 0.8, 120);
    let handled = true;
    switch (event.key) {
      case 'ArrowDown':
        area.scrollBy({ top: lineStep, behavior: 'smooth' });
        break;
      case 'ArrowUp':
        area.scrollBy({ top: -lineStep, behavior: 'smooth' });
        break;
      case 'PageDown':
      case ' ':
        area.scrollBy({ top: pageStep, behavior: 'smooth' });
        break;
      case 'PageUp':
        area.scrollBy({ top: -pageStep, behavior: 'smooth' });
        break;
      case 'Home':
        area.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'End':
        area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
        break;
      default:
        handled = false;
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return (
    <div
      className={`absolute inset-0 preserve-3d gpu-accelerated ${animationClass}`}
      style={{
        transformOrigin: 'left center',
        zIndex: isLeftPage ? 10 : 20,
      }}
    >
      <div
        className={`absolute inset-0 texture-paper backface-hidden flex flex-col px-6 pt-10 pb-5 rounded-sm border border-[rgba(85,65,38,0.18)]
          ${!isLeftPage ? 'shadow-[inset_10px_0_14px_rgba(53,36,18,0.08),0_0_2px_rgba(0,0,0,0.05)]' : ''}`}
      >
        <div className="mb-6">
          <h2 className="typewriter-text text-xl font-black text-[#2f241c] pb-3 mb-3 border-b-2 border-double border-[rgba(0,0,0,0.15)]" style={{ opacity: 1, lineHeight: 1.4, letterSpacing: '0.02em' }}>
            {pageData.heading}
          </h2>
          <h3 className="print-text text-sm italic text-[#5c4a3d] font-semibold" style={{ opacity: 0.9, lineHeight: 1.5, letterSpacing: '0.01em' }}>
            {pageData.subtitle}
          </h3>
        </div>
        <div
          ref={scrollAreaRef}
          className="page-text-scroll flex-grow overflow-y-auto pr-2 space-y-2 min-h-0 pointer-events-auto outline-none"
          tabIndex={0}
          role="region"
          aria-label={`${pageData.heading} content. Use mouse wheel or arrow keys to scroll.`}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onMouseEnter={(event) => event.currentTarget.focus({ preventScroll: true })}
        >
          {pageData.content.map((para, i) => (
            <p key={i} className="typewriter-text text-[13px] leading-relaxed text-justify" style={{ opacity: 1, lineHeight: 1.55 }}>
              {para}
            </p>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-[rgba(0,0,0,0.1)] text-[10px] print-text text-center shrink-0" style={{ opacity: 0.7 }}>
          {pageData.footer}
        </div>
        {(isTurningNext || isTurningPrev) && (
          <div className="absolute inset-0 bg-black animate-[shadow-next_1s_ease-in-out_forwards] pointer-events-none rounded-sm"></div>
        )}
      </div>
      <div
        className="absolute inset-0 texture-paper backface-hidden rounded-sm pointer-events-none gpu-accelerated"
        style={{ transform: 'rotateY(180deg) translate3d(0,0,0)' }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.02)] shadow-[inset_-20px_0_40px_-10px_rgba(0,0,0,0.15)]"></div>
      </div>
    </div>
  );
};


/* ==================== OpenFile.jsx ==================== */
const OpenFile = ({ pagesData, currentPage, isTurningNext, isTurningPrev }) => {
  return (
    <div className="absolute inset-0 flex preserve-3d w-full h-full">
      <div className="absolute inset-0 texture-kraft-file rounded-r-sm shadow-[inset_8px_0_25px_rgba(0,0,0,0.4)] z-0">
         <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-transparent"></div>
         <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)] pointer-events-none rounded-r-sm"></div>
      </div>
      <div className="absolute top-1 bottom-1 left-2 right-1 texture-paper rounded-sm shadow-[inset_8px_0_15px_rgba(0,0,0,0.08)] z-0 page-wrapper">
      </div>
      <div className="absolute top-1 bottom-1 left-3 right-1 z-10 overflow-hidden">
         <div className="absolute inset-0 z-10">
            {isTurningNext && currentPage + 1 < pagesData.length ? (
               <PaperPage pageData={pagesData[currentPage + 1]} isLeftPage={false} />
            ) : isTurningPrev ? (
               <PaperPage pageData={pagesData[currentPage]} isLeftPage={false} />
            ) : null}
         </div>
         <div className="absolute inset-0 z-20">
           {isTurningNext ? (
              <PaperPage key={`anim-next-${currentPage}`} pageData={pagesData[currentPage]} isLeftPage={false} isTurningNext={true} />
           ) : isTurningPrev ? (
              <PaperPage key={`anim-prev-${currentPage}`} pageData={pagesData[currentPage - 1]} isLeftPage={false} isTurningPrev={true} />
           ) : (
              <PaperPage key={`static-${currentPage}`} pageData={pagesData[currentPage]} isLeftPage={false} />
           )}
         </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.1)] to-transparent z-30 pointer-events-none"></div>
      <MetalClip
        top="-36px"
        left="4px"
        rotation={-2}
      />
      <MetalClip
        top="-37px"
        right="16px"
        rotation={3}
      />
    </div>
  );
};

/* ==================== ClosedFile.jsx ==================== */
const ClosedFile = ({ isUntying }) => {
  return (
    <div className="absolute inset-0 w-full h-full gpu-accelerated">
      <div className="absolute -top-3 left-8 right-1/3 h-6 z-30">
        <div className="w-full h-full texture-kraft-tab rounded-t-md shadow-[0_-2px_4px_rgba(0,0,0,0.2)] border-t border-l border-r border-[rgba(0,0,0,0.1)]">
          <div className="absolute inset-x-4 top-1 print-text text-[10px] text-center tracking-widest uppercase" style={{ opacity: 0.9 }}>
            FILE
          </div>
        </div>
      </div>
      <div className="absolute inset-0 texture-kraft-file rounded-sm shadow-[2px_6px_25px_rgba(0,0,0,0.45)]"></div>
      <div className="absolute top-0 bottom-0 left-10 w-[2px] bg-[rgba(0,0,0,0.15)] z-20"></div>
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-[rgba(255,255,255,0.1)] z-20"></div>
      <div className="absolute top-0 right-0 bottom-0 w-20 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[rgba(0,0,0,0.18)] via-[rgba(0,0,0,0.08)] to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[rgba(0,0,0,0.22)]"></div>
        <div className="absolute top-0 bottom-0 left-[3px] w-[1px] bg-[rgba(255,255,255,0.12)]"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[rgba(255,255,255,0.08)]"></div>
      </div>
      <div 
        className="absolute top-1/2 right-6 w-10 h-10 -translate-y-1/2 z-35"
        style={{
          transform: isUntying ? 'translate3d(8px, -50%, 0) scale(0.9)' : 'translate3d(0, -50%, 0)',
          opacity: isUntying ? 0.6 : 1,
          transition: 'all 0.5s ease',
          willChange: 'transform, opacity',
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8b7355] via-[#6b5740] to-[#4a3d2e] shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] border border-[rgba(0,0,0,0.3)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[rgba(0,0,0,0.4)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"></div>
        </div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-[3px] border-[#a08060]"
          style={{
            opacity: isUntying ? 0.2 : 0.6,
            transform: isUntying ? 'translate3d(-50%, -50%, 0) scale(1.3) rotate(45deg)' : 'translate3d(-50%, -50%, 0)',
            transition: 'all 0.5s ease',
            willChange: 'transform, opacity',
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-[2px] border-[#8b7355]"
          style={{
            opacity: isUntying ? 0.1 : 0.4,
            transform: isUntying ? 'translate3d(-50%, -50%, 0) scale(1.4) rotate(60deg)' : 'translate3d(-50%, -50%, 0)',
            transition: 'all 0.5s ease',
            willChange: 'transform, opacity',
          }}
        ></div>
        <div 
          className="absolute top-1/2 -right-6 h-[3px] bg-[#a08060] transform -rotate-[5deg] rounded-full"
          style={{
            width: isUntying ? '2px' : '32px',
            opacity: isUntying ? 0 : 0.5,
            transform: isUntying ? 'rotate(25deg) translate3d(10px, 0, 0)' : 'rotate(-5deg) translate3d(0, 0, 0)',
            transition: 'all 0.4s ease',
            willChange: 'transform, opacity, width',
          }}
        ></div>
      </div>
      <div className="absolute -top-3 left-4 right-4 h-6 z-10">
        <div className="absolute bottom-0 left-0 w-[95%] h-3 bg-[var(--paper-color)] rounded-t-sm shadow-[0_-1px_3px_rgba(0,0,0,0.12)] transform -rotate-[0.5deg]"></div>
        <div className="absolute bottom-1 left-1 w-[92%] h-3 bg-[var(--paper-dark)] rounded-t-sm shadow-[0_-1px_2px_rgba(0,0,0,0.1)] transform rotate-[0.3deg]"></div>
        <div className="absolute bottom-0.5 left-0.5 w-[93%] h-3 bg-[var(--paper-edge)] rounded-t-sm shadow-[0_-1px_2px_rgba(0,0,0,0.08)] transform -rotate-[0.2deg]"></div>
        <div className="absolute bottom-1.5 left-2 w-[90%] h-3 bg-[#e8dcc0] rounded-t-sm transform rotate-[0.1deg]"></div>
      </div>
      <div className="absolute top-8 -right-2 bottom-8 w-2 z-5">
        <div className="absolute top-0 left-0 w-[2px] h-[90%] bg-gradient-to-b from-[var(--paper-color)] via-[var(--paper-dark)] to-[var(--paper-edge)] opacity-70"></div>
        <div className="absolute top-1 left-[3px] w-[1px] h-[85%] bg-[var(--paper-color)] opacity-40"></div>
        <div className="absolute top-2 left-[5px] w-[1px] h-[80%] bg-[var(--paper-dark)] opacity-30"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[rgba(0,0,0,0.22)] to-transparent rounded-tr-sm z-15"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[rgba(0,0,0,0.2)] to-transparent rounded-br-sm z-15"></div>
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-[rgba(0,0,0,0.15)] to-transparent rounded-tl-sm z-15"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[rgba(0,0,0,0.18)] to-transparent rounded-bl-sm z-15"></div>
      <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-[rgba(0,0,0,0.07)] opacity-35 z-15"></div>
      <div className="absolute top-[70%] left-0 right-0 h-[1px] bg-[rgba(0,0,0,0.06)] opacity-30 z-15"></div>
      <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-[rgba(0,0,0,0.05)] opacity-20 z-15"></div>
      <div className="stain w-32 h-32 top-12 left-24 opacity-18 z-0"></div>
      <div className="stain w-24 h-28 bottom-20 right-24 opacity-15 rotate-45 z-0"></div>
      <div className="stain w-20 h-20 top-1/3 right-1/4 opacity-12 rotate-12 z-0"></div>
      <div className="absolute top-[35%] right-[25%] w-24 h-24 rounded-full border border-[rgba(139,119,101,0.1)] opacity-30 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,248,220,0.1)] via-transparent to-[rgba(210,180,140,0.06)] pointer-events-none z-1"></div>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[rgba(0,0,0,0.1)] via-[rgba(0,0,0,0.05)] to-[rgba(0,0,0,0.14)] opacity-45 z-15"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[rgba(0,0,0,0.12)] via-[rgba(0,0,0,0.06)] to-[rgba(0,0,0,0.16)] opacity-45 z-15"></div>
      <div className="absolute inset-0 p-6 pl-14 flex flex-col items-center justify-between pointer-events-none z-20">
        <div className="w-full flex justify-between items-start pt-1 px-1">
          <div className="flex flex-col">
            <div className="print-text text-xs tracking-widest uppercase border-b border-[var(--ink-color)] pb-1" style={{ opacity: 1 }}>
              CR Cyber Crime Foundation
            </div>
            <div className="print-text text-[8px] tracking-wider uppercase mt-1" style={{ opacity: 0.7 }}>
              Government of India
            </div>
          </div>
          <div className="w-16 h-16 border-[3px] border-[var(--stamp-ink)] rounded-full flex items-center justify-center rotate-12 mix-blend-multiply" style={{ opacity: 0.85 }}>
            <div className="text-[var(--stamp-ink)] text-center text-[10px] font-bold uppercase tracking-wider leading-tight">
              Official<br/>Confidential
            </div>
          </div>
        </div>
        <div className="text-center w-full mx-auto my-4">
          <h1 className="typewriter-text text-2xl mb-3 tracking-tight leading-tight" style={{ opacity: 1 }}>
            Support for Women & Girls
          </h1>
          <h2 className="print-text text-sm italic mb-4" style={{ opacity: 0.95 }}>
            Standing strong against the invisible digital threats.
          </h2>
          <p className="typewriter-text text-xs leading-relaxed text-justify px-4" style={{ opacity: 1 }}>
            Confidential support, legal guidance, cyber awareness, and emotional assistance for women and girls affected by cybercrime.
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 px-4 pb-4">
          <div className="flex w-full border-b border-dashed border-[rgba(0,0,0,0.3)] pb-1">
            <span className="print-text text-xs font-bold w-20" style={{ opacity: 1 }}>SUBJECT:</span>
            <span className="typewriter-text text-sm" style={{ opacity: 1 }}>Cyber Safety Awareness</span>
          </div>
          <div className="flex w-full border-b border-dashed border-[rgba(0,0,0,0.3)] pb-1">
            <span className="print-text text-xs font-bold w-20" style={{ opacity: 1 }}>FROM:</span>
            <span className="typewriter-text text-sm" style={{ opacity: 1 }}>CRCCF Support Division</span>
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex flex-1 border-b border-dashed border-[rgba(0,0,0,0.3)] pb-1">
              <span className="print-text text-[10px] font-bold w-14" style={{ opacity: 1 }}>YEAR:</span>
              <span className="typewriter-text text-sm" style={{ opacity: 1 }}>2026</span>
            </div>
            <div className="flex flex-1 border-b border-dashed border-[rgba(0,0,0,0.3)] pb-1">
              <span className="print-text text-[10px] font-bold w-16" style={{ opacity: 1 }}>FILE NO.:</span>
              <span className="typewriter-text text-sm" style={{ opacity: 1 }}>CRCCF/SAFE/01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==================== VintagePocket.jsx ==================== */
const VintagePocket = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[58%] z-20 pointer-events-none px-2 pb-2">
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 rounded-md overflow-visible"
          style={{
            background: 'linear-gradient(175deg, #3a2815 0%, #2c1e0f 20%, #352413 40%, #2a1c0e 60%, #322010 80%, #281a0c 100%)',
            boxShadow: `
              inset 0 2px 8px rgba(0,0,0,0.5),
              inset 0 -2px 6px rgba(0,0,0,0.4),
              inset 2px 0 6px rgba(0,0,0,0.3),
              inset -2px 0 6px rgba(0,0,0,0.3),
              0 3px 12px rgba(0,0,0,0.5),
              0 6px 20px rgba(0,0,0,0.3)
            `,
          }}
        >
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="6" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)" opacity="0.4"/></svg>')`,
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-b from-[rgba(255,255,255,0.12)] to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-transparent"></div>
          <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-transparent rounded-tl-md"></div>
          <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-bl from-[rgba(255,255,255,0.06)] to-transparent rounded-tr-md"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-tr from-[rgba(255,255,255,0.04)] to-transparent rounded-bl-md"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-tl from-[rgba(255,255,255,0.05)] to-transparent rounded-br-md"></div>
        </div>
        <div className="absolute top-[6px] left-[8px] right-[8px] h-0 border-t-[1.5px] border-dashed border-[rgba(160,140,100,0.35)]"></div>
        <div className="absolute top-[8px] left-[8px] right-[8px] h-0 border-t-[0.5px] border-dashed border-[rgba(255,255,255,0.06)]"></div>
        <div className="absolute top-[8px] bottom-[8px] left-[6px] w-0 border-l-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
        <div className="absolute top-[8px] bottom-[8px] left-[8px] w-0 border-l-[0.5px] border-dashed border-[rgba(255,255,255,0.05)]"></div>
        <div className="absolute top-[8px] bottom-[8px] right-[6px] w-0 border-r-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
        <div className="absolute top-[8px] bottom-[8px] right-[8px] w-0 border-r-[0.5px] border-dashed border-[rgba(255,255,255,0.05)]"></div>
        <div className="absolute bottom-[6px] left-[8px] right-[8px] h-0 border-b-[1.5px] border-dashed border-[rgba(160,140,100,0.35)]"></div>
        <div className="absolute bottom-[8px] left-[8px] right-[8px] h-0 border-b-[0.5px] border-dashed border-[rgba(255,255,255,0.06)]"></div>
        <div 
          className="absolute top-[12px] left-[10px] right-[10px] rounded-t-md overflow-hidden"
          style={{
            height: '38%',
            background: 'linear-gradient(180deg, rgba(10,6,3,0.75) 0%, rgba(18,12,6,0.55) 40%, rgba(25,18,10,0.35) 70%, rgba(30,22,12,0.2) 100%)',
            boxShadow: `
              inset 0 4px 12px rgba(0,0,0,0.7),
              inset 0 8px 20px rgba(0,0,0,0.4),
              inset 0 2px 4px rgba(0,0,0,0.5)
            `,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent"></div>
          <div className="absolute bottom-3 left-6 right-6 h-4 bg-gradient-to-t from-[rgba(255,255,255,0.04)] to-transparent rounded-full blur-[3px]"></div>
          <div className="absolute bottom-5 left-10 right-10 h-3 bg-gradient-to-t from-[rgba(255,255,255,0.03)] to-transparent rounded-full blur-[2px]"></div>
        </div>
        <div 
          className="absolute overflow-visible"
          style={{
            top: '12px',
            left: '10px',
            width: '32%',
            height: '86%',
          }}
        >
          <div 
            className="absolute inset-0 rounded-md overflow-visible"
            style={{
              background: 'linear-gradient(175deg, #352413 0%, #281a0c 50%, #302010 100%)',
              boxShadow: `
                inset 0 2px 6px rgba(0,0,0,0.5),
                inset -2px 0 4px rgba(0,0,0,0.3),
                2px 0 6px rgba(0,0,0,0.3)
              `,
            }}
          >
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="5" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)" opacity="0.3"/></svg>')`,
              }}
            ></div>
          </div>
          <div className="absolute top-[6px] left-[4px] right-[4px] h-0 border-t-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
          <div className="absolute top-[6px] bottom-[6px] right-[4px] w-0 border-r-[1.5px] border-dashed border-[rgba(160,140,100,0.28)]"></div>
          <div className="absolute bottom-[6px] left-[4px] right-[4px] h-0 border-b-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
          <div 
            className="absolute top-[10px] left-[6px] right-[6px] rounded-t-sm overflow-hidden"
            style={{
              height: '25%',
              background: 'linear-gradient(180deg, rgba(8,5,2,0.8) 0%, rgba(15,10,5,0.5) 60%, rgba(20,14,8,0.25) 100%)',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-transparent"></div>
          </div>
          <div className="absolute top-[-8%] left-[22%] w-[18px] h-[75%] pointer-events-none" style={{ transform: 'rotate(2.5deg)' }}>
            <div className="relative w-full h-[26%]">
              <div 
                className="absolute inset-0 rounded-t-full"
                style={{
                  background: 'linear-gradient(90deg, #0a1e40 0%, #153870 25%, #1e4d8c 45%, #2563a8 50%, #1e4d8c 55%, #153870 75%, #0a1e40 100%)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)',
                }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 h-[10%]" style={{ background: 'linear-gradient(90deg, #b8b8b8 0%, #e0e0e0 40%, #f0f0f0 50%, #e0e0e0 60%, #b8b8b8 100%)' }}></div>
              <div 
                className="absolute top-[12%] -right-[5px] w-[4px] h-[75%]"
                style={{
                  background: 'linear-gradient(180deg, #e0e0e0 0%, #f0f0f0 15%, #d0d0d0 85%, #a0a0a0 100%)',
                  borderRadius: '0 0 1.5px 1.5px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              <div className="absolute top-[10px] left-[2px] w-[3px] h-[35%] bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
            </div>
            <div className="relative w-full h-[74%]">
              <div 
                className="absolute inset-0 rounded-b-full"
                style={{
                  background: 'linear-gradient(90deg, #d0d0d8 0%, #e8e8f0 15%, #f8f8ff 35%, #ffffff 50%, #f0f0f8 65%, #d8d8e0 85%, #c0c0c8 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 1px 2px 5px rgba(0,0,0,0.3)',
                }}
              ></div>
              <div className="absolute top-[18%] left-0 right-0 h-[22%]" style={{ background: 'linear-gradient(90deg, #0a1e40 0%, #1e4d8c 50%, #0a1e40 100%)' }}></div>
              <div className="absolute top-[48%] left-[2px] right-[2px] space-y-[1.5px]">
                <div className="h-[0.5px] bg-black/10"></div>
                <div className="h-[0.5px] bg-black/8"></div>
                <div className="h-[0.5px] bg-black/10"></div>
                <div className="h-[0.5px] bg-black/8"></div>
              </div>
              <div className="absolute top-[4px] left-[2px] w-[2px] h-[45%] bg-gradient-to-b from-white/25 to-transparent rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-b-full" style={{ background: 'linear-gradient(90deg, #b0b0b0 0%, #d8d8d8 50%, #b0b0b0 100%)' }}></div>
            </div>
          </div>
          <div className="absolute top-[-2%] right-[18%] w-[15px] h-[68%] pointer-events-none" style={{ transform: 'rotate(-1.8deg)' }}>
            <div className="relative w-full h-[24%]">
              <div 
                className="absolute inset-0 rounded-t-full"
                style={{
                  background: 'linear-gradient(90deg, #7a5a10 0%, #a07818 25%, #b89020 45%, #c8a028 50%, #b89020 55%, #a07818 75%, #7a5a10 100%)',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)',
                }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 h-[10%]" style={{ background: 'linear-gradient(90deg, #c0a030 0%, #e0c050 50%, #c0a030 100%)' }}></div>
              <div 
                className="absolute top-[10%] -right-[4px] w-[3.5px] h-[78%]"
                style={{
                  background: 'linear-gradient(180deg, #d4a020 0%, #f0c840 15%, #c89018 85%, #a07010 100%)',
                  borderRadius: '0 0 1.5px 1.5px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              <div className="absolute top-[8px] left-[2px] w-[2px] h-[30%] bg-gradient-to-b from-white/15 to-transparent rounded-full"></div>
            </div>
            <div className="relative w-full h-[76%]">
              <div 
                className="absolute inset-0 rounded-b-full"
                style={{
                  background: 'linear-gradient(90deg, #d8d0b0 0%, #e8e0c8 15%, #f8f0d8 35%, #fff8e8 50%, #f0e8d0 65%, #d8d0b8 85%, #c8c0a0 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 1px 2px 5px rgba(0,0,0,0.25)',
                }}
              ></div>
              <div className="absolute top-[4px] left-[2px] w-[2px] h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-b-full" style={{ background: 'linear-gradient(90deg, #b89020 0%, #d4b040 50%, #b89020 100%)' }}></div>
            </div>
          </div>
        </div>
        <div 
          className="absolute overflow-visible"
          style={{
            top: '12px',
            left: '38%',
            right: '10px',
            height: '86%',
          }}
        >
          <div 
            className="absolute inset-0 rounded-md overflow-hidden"
            style={{
              background: 'linear-gradient(175deg, #382614 0%, #2c1c0e 50%, #342210 100%)',
              boxShadow: `
                inset 0 2px 6px rgba(0,0,0,0.5),
                inset 2px 0 4px rgba(0,0,0,0.3),
                -2px 0 6px rgba(0,0,0,0.3)
              `,
            }}
          >
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="5" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)" opacity="0.3"/></svg>')`,
              }}
            ></div>
          </div>
          <div className="absolute top-[6px] left-[4px] right-[4px] h-0 border-t-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
          <div className="absolute top-[6px] bottom-[6px] left-[4px] w-0 border-l-[1.5px] border-dashed border-[rgba(160,140,100,0.28)]"></div>
          <div className="absolute bottom-[6px] left-[4px] right-[4px] h-0 border-b-[1.5px] border-dashed border-[rgba(160,140,100,0.3)]"></div>
          <div 
            className="absolute top-[10px] left-[6px] right-[6px] rounded-t-sm overflow-hidden"
            style={{
              height: '30%',
              background: 'linear-gradient(180deg, rgba(8,5,2,0.75) 0%, rgba(15,10,5,0.5) 50%, rgba(20,14,8,0.25) 100%)',
              boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-transparent"></div>
          </div>
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '18%',
              left: '8%',
              right: '8%',
              height: '58%',
              transform: 'rotate(-1.5deg)',
            }}
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #faf6e8 0%, #f0e8d0 100%)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.5)',
                borderRadius: '2px',
                border: '0.5px solid rgba(0,0,0,0.12)',
              }}
            >
              <div className="w-full h-[20%] flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #7a1515 0%, #941e1e 50%, #7a1515 100%)' }}>
                <span className="font-bold tracking-[0.12em] uppercase" style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial' }}>GOVT. OF INDIA</span>
              </div>
              <div className="flex w-full h-[55%] p-[4px] gap-[5px]">
                <div className="w-[24%] h-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #d0c8a8 0%, #c0b898 100%)', border: '0.5px solid rgba(0,0,0,0.15)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></div>
                <div className="flex-1 flex flex-col justify-center gap-[2.5px]">
                  <div className="h-[2px] rounded-sm" style={{ width: '70%', background: 'rgba(0,0,0,0.2)' }}></div>
                  <div className="h-[2px] rounded-sm" style={{ width: '90%', background: 'rgba(0,0,0,0.15)' }}></div>
                  <div className="h-[2px] rounded-sm" style={{ width: '55%', background: 'rgba(0,0,0,0.12)' }}></div>
                  <div className="h-[2px] rounded-sm" style={{ width: '75%', background: 'rgba(0,0,0,0.1)' }}></div>
                </div>
              </div>
              <div className="w-full h-[25%] flex items-center justify-center" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)', background: 'linear-gradient(180deg, #f0e8d0 0%, #e8e0c0 100%)' }}>
                <span style={{ fontSize: '4.5px', color: 'rgba(0,0,0,0.3)', fontFamily: "'Courier New', monospace", letterSpacing: '0.05em' }}>2847-1963-H</span>
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.04) 100%)' }}></div>
            </div>
          </div>
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '12%',
              left: '14%',
              right: '4%',
              height: '55%',
              transform: 'rotate(2deg) translateY(-6px)',
            }}
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #e5ecf5 0%, #d8e0ed 100%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.4)',
                borderRadius: '2px',
                border: '0.5px solid rgba(0,0,0,0.1)',
              }}
            >
              <div className="w-full h-[18%] flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #1a3560 0%, #254a80 50%, #1a3560 100%)' }}>
                <span className="font-bold tracking-[0.1em] uppercase" style={{ fontSize: '4px', color: 'rgba(255,255,255,0.65)', fontFamily: 'Arial' }}>OFFICIAL IDENTITY</span>
              </div>
              <div className="flex w-full h-[52%] p-[4px] gap-[4px]">
                <div className="w-[22%] h-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #c0c8d5 0%, #b0b8c8 100%)', border: '0.5px solid rgba(0,0,0,0.12)' }}></div>
                <div className="flex-1 flex flex-col justify-center gap-[2px]">
                  <div className="h-[1.5px] rounded-sm" style={{ width: '80%', background: 'rgba(0,0,0,0.12)' }}></div>
                  <div className="h-[1.5px] rounded-sm" style={{ width: '65%', background: 'rgba(0,0,0,0.1)' }}></div>
                  <div className="h-[1.5px] rounded-sm" style={{ width: '90%', background: 'rgba(0,0,0,0.08)' }}></div>
                </div>
              </div>
              <div className="w-full h-[30%] flex items-center justify-center" style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)', background: 'linear-gradient(180deg, #d8e0ed 0%, #d0d8e5 100%)' }}>
                <span style={{ fontSize: '4px', color: 'rgba(0,0,0,0.25)', fontFamily: "'Courier New', monospace" }}>REF/2024/0847</span>
              </div>
              <div className="absolute rounded-full pointer-events-none" style={{ bottom: '15%', right: '10%', width: '22px', height: '22px', border: '1.5px solid rgba(140,30,30,0.18)', opacity: 0.5, transform: 'rotate(-12deg)' }}>
                <div className="absolute inset-[3px] rounded-full" style={{ border: '0.5px solid rgba(140,30,30,0.12)' }}></div>
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.03) 100%)' }}></div>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-6 w-8 h-3 bg-[rgba(0,0,0,0.08)] rounded-full blur-[1px] transform rotate-[8deg]"></div>
        <div className="absolute bottom-5 right-8 w-6 h-2 bg-[rgba(0,0,0,0.06)] rounded-full blur-[1px] transform -rotate-[5deg]"></div>
        <div className="absolute top-1/2 left-1/3 w-5 h-2 bg-[rgba(0,0,0,0.05)] rounded-full blur-[1px] transform rotate-[3deg]"></div>
        <div className="absolute top-[10px] left-[6px] right-[6px] h-[3px] bg-gradient-to-b from-[rgba(0,0,0,0.25)] to-transparent rounded-t-sm"></div>
        <div className="absolute top-[13px] left-[6px] right-[6px] h-[1px] bg-[rgba(255,255,255,0.06)]"></div>
      </div>
    </div>
  );
};

/* ==================== OfficeFile.jsx ==================== */
const OfficeFile = ({ pagesData, fileState, currentPage, isTurningNext, isTurningPrev, onOpen }) => {
  const isCoverOpen = fileState === 'opened';
  const isClosing = fileState === 'closing';
  const isUntying = fileState === 'untying';
  return (
    <div className="relative w-full h-full preserve-3d gpu-accelerated">
      <div className="absolute -bottom-3 left-0 right-0 h-3 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#b89858] to-[#8a7040] rounded-b-sm shadow-[0_4px_8px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute top-0 left-2 right-2 h-[1px] bg-[rgba(255,255,255,0.15)]"></div>
        <div className="absolute top-1 left-3 right-3 h-[1px] bg-[rgba(255,255,255,0.1)]"></div>
      </div>
      <div className="absolute top-0 -right-3 bottom-0 w-3 z-0">
        <div className="w-full h-full bg-gradient-to-r from-[#a88848] to-[#7a6030] rounded-r-sm shadow-[4px_0_8px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[rgba(255,255,255,0.12)]"></div>
        <div className="absolute left-1 top-3 bottom-3 w-[1px] bg-[rgba(255,255,255,0.08)]"></div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 w-3 z-0">
        <div className="w-full h-full bg-gradient-to-l from-[#9a7838] to-[#6a5028] rounded-l-sm shadow-[-4px_0_8px_rgba(0,0,0,0.3)]"></div>
        <div className="absolute right-0 top-2 bottom-2 w-[1px] bg-[rgba(255,255,255,0.1)]"></div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 z-1">
        <div className="w-full h-full bg-gradient-to-tl from-[#7a6030] to-transparent"></div>
      </div>
      <div className={`absolute inset-0 texture-kraft-file rounded-sm transition-all duration-700
          ${isCoverOpen ? 'shadow-[4px_8px_30px_rgba(0,0,0,0.5)]' : 'shadow-[2px_6px_25px_rgba(0,0,0,0.45)]'}`}
      >
        {isCoverOpen && (
          <OpenFile 
            pagesData={pagesData} 
            currentPage={currentPage}
            isTurningNext={isTurningNext}
            isTurningPrev={isTurningPrev}
          />
        )}
      </div>
      <div 
        className={`absolute inset-0 z-40 preserve-3d origin-left gpu-accelerated
          ${isCoverOpen ? 'animate-[open-cover_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards]' : ''}
          ${isClosing ? 'animate-[close-cover_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards]' : ''}
          ${fileState === 'closed' ? 'cursor-pointer' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: isUntying ? 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1)' : undefined,
          transform: isUntying ? 'rotateY(-8deg) translateZ(10px)' : undefined,
        }}
        onClick={fileState === 'closed' ? onOpen : undefined}
        title={fileState === 'closed' ? 'Click to open file' : undefined}
      >
        <div className="absolute inset-0 backface-hidden">
          <ClosedFile isUntying={isUntying} />
        </div>
        <div 
          className="absolute inset-0 backface-hidden rounded-sm overflow-hidden texture-kraft-file"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)] pointer-events-none z-0"></div>
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{ 
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)
              `
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.3)] via-transparent to-[rgba(0,0,0,0.2)] z-10 pointer-events-none"></div>
          <VintagePocket />
        </div>
      </div>
    </div>
  );
};

/* ==================== FileControls.jsx ==================== */
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FileControls = ({ fileState, onOpen, onClose, onNext, onPrev, currentPage, totalPages, isTurningNext, isTurningPrev }) => {
  const isOpen   = fileState === 'opened';
  const isActive = isOpen || fileState === 'closing';
  if (fileState === 'closed') {
    return (
      <nav className="document-navigation document-navigation-hint" aria-label="Document controls">
        <span>Tap file to open</span>
      </nav>
    );
  }
  if (!isActive) {
    return <nav className="document-navigation document-navigation-pending" aria-label="Document controls" />;
  }
  const prevDisabled = currentPage === 0;
  const nextDisabled = currentPage === totalPages - 1;
  const closeDisabled = false;

  return (
    <nav className="document-navigation" aria-label="Document controls">
      <div className="document-navigation-inner">
        <div className="document-navigation-buttons">
          <button
            className="document-nav-button document-nav-button-secondary"
            onClick={onPrev}
            disabled={prevDisabled}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft /> Prev
          </button>
          <button
            className="document-nav-button document-nav-button-close"
            onClick={onClose}
            disabled={closeDisabled}
            title="Close file"
            aria-label="Close file"
          >
            <XIcon /> Close
          </button>
          <button
            className="document-nav-button document-nav-button-primary"
            onClick={onNext}
            disabled={nextDisabled}
            title="Next page"
            aria-label="Next page"
          >
            Next <ChevronRight />
          </button>
        </div>
        <div className="document-page-counter">
          {currentPage + 1}<span> / </span>{totalPages}
        </div>
      </div>
    </nav>
  );
};

/* ==================== MobileFileView.jsx ==================== */
const MobilePageContent = ({ page, scrollRef, handleWheel, handleKeyDown, animClass }) => {
  if (!page) return null;
  const animClassName = animClass === 'none' ? '' : (animClass || 'mobile-page-anim-wrapper');
  const className = `texture-paper ${animClassName}`;
  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, padding: '48px 14px 8px 14px', display: 'flex', flexDirection: 'column', transform: 'translate3d(0,0,0)', willChange: 'transform' }}
    >
      <h2 className="mobile-page-heading">{page.heading}</h2>
      <p className="mobile-page-subtitle">{page.subtitle}</p>
      <div
        ref={scrollRef}
        className="mobile-page-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${page.heading} content. Scroll to read.`}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
      >
        {page.content.map((para, i) => (
          <p key={i} className="mobile-page-para">{para}</p>
        ))}
      </div>
      <div className="mobile-page-footer">{page.footer}</div>
    </div>
  );
};

const MobileFileView = ({ pagesData, currentPage, isTurningNext, isTurningPrev }) => {
  const scrollRef = useRef(null);
  const page = pagesData[currentPage];
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentPage]);
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
      e.stopPropagation();
    }
  };
  const handleKeyDown = (e) => {
    const area = scrollRef.current;
    if (!area) return;
    const step = 40;
    const bigStep = Math.max(area.clientHeight * 0.8, 100);
    let handled = true;
    switch (e.key) {
      case 'ArrowDown': area.scrollBy({ top: step, behavior: 'smooth' }); break;
      case 'ArrowUp': area.scrollBy({ top: -step, behavior: 'smooth' }); break;
      case 'PageDown':
      case ' ': area.scrollBy({ top: bigStep, behavior: 'smooth' }); break;
      case 'PageUp': area.scrollBy({ top: -bigStep, behavior: 'smooth' }); break;
      case 'Home': area.scrollTo({ top: 0, behavior: 'smooth' }); break;
      case 'End': area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' }); break;
      default: handled = false;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  let pageAnimClass = 'none';
  if (isTurningNext) pageAnimClass = 'mobile-anim-page-out';
  if (isTurningPrev) pageAnimClass = 'mobile-anim-page-in';
  return (
    <div className="mobile-file-stage">
      <div className="mobile-left-edge">
        <div className="mobile-left-edge-inner">
          <div className="mobile-spine-crease"></div>
          <div className="mobile-spine-highlight"></div>
          <div className="mobile-paper-stack"></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            right: '15%',
            height: '35%',
            background: 'linear-gradient(175deg, #3a2815, #2c1e0f, #281a0c)',
            borderRadius: '4px',
            opacity: 0.7,
          }}>
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '4px',
              right: '4px',
              borderTop: '1px dashed rgba(160,140,100,0.3)',
            }}></div>
          </div>
        </div>
      </div>
      <div className="mobile-active-page mobile-active-page-clip-host">
        <svg
          viewBox="0 0 28 48"
          fill="none"
          style={{
            position: 'absolute',
            top: -18,
            left: 4,
            width: 22,
            height: 48,
            zIndex: 40,
            pointerEvents: 'none',
            filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.35))',
            transform: 'rotate(-3deg)',
          }}
        >
          <path d="M 14 6 C 14 6 22 6 22 14 L 22 28 C 22 36 14 36 14 36 L 14 44 C 14 44 4 44 4 36 L 4 8 C 4 8 4 2 10 2 C 16 2 16 8 16 8 L 16 34"
                stroke="#9aa0a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 14 6 C 14 6 22 6 22 14 L 22 28 C 22 36 14 36 14 36 L 14 44 C 14 44 4 44 4 36 L 4 8 C 4 8 4 2 10 2 C 16 2 16 8 16 8 L 16 34"
                stroke="#dce0e4" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <svg
          viewBox="0 0 28 48"
          fill="none"
          style={{
            position: 'absolute',
            top: -19,
            right: 12,
            width: 22,
            height: 48,
            zIndex: 40,
            pointerEvents: 'none',
            filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.35))',
            transform: 'rotate(4deg)',
          }}
        >
          <path d="M 14 6 C 14 6 22 6 22 14 L 22 28 C 22 36 14 36 14 36 L 14 44 C 14 44 4 44 4 36 L 4 8 C 4 8 4 2 10 2 C 16 2 16 8 16 8 L 16 34"
                stroke="#9aa0a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 14 6 C 14 6 22 6 22 14 L 22 28 C 22 36 14 36 14 36 L 14 44 C 14 44 4 44 4 36 L 4 8 C 4 8 4 2 10 2 C 16 2 16 8 16 8 L 16 34"
                stroke="#dce0e4" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div className="mobile-page-paper">
          {isTurningNext && currentPage + 1 < pagesData.length && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <MobilePageContent page={pagesData[currentPage + 1]} animClass="none" />
            </div>
          )}
          {isTurningPrev && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <MobilePageContent page={pagesData[currentPage]} animClass="none" />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <MobilePageContent
              page={isTurningPrev ? pagesData[currentPage - 1] : pagesData[currentPage]}
              scrollRef={scrollRef}
              handleWheel={handleWheel}
              handleKeyDown={handleKeyDown}
              animClass={pageAnimClass}
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '14px',
          background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
          pointerEvents: 'none',
          zIndex: 20,
        }}></div>
      </div>
    </div>
  );
};

/* ==================== MobileControls.jsx ==================== */
const MobileControls = ({ fileState, onOpen, onClose, onNext, onPrev, currentPage, totalPages }) => {
  if (fileState === 'closed') {
    return (
      <div className="mobile-controls" style={{
        background: 'transparent',
        borderTop: 'none',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'Georgia', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(60,48,36,0.35)',
          fontWeight: 500,
        }}>
          Tap file to open
        </span>
      </div>
    );
  }
  if (fileState === 'untying' || fileState === 'closing') {
    return (
      <div className="mobile-controls" style={{
        background: 'transparent',
        borderTop: 'none',
        minHeight: '44px',
      }} />
    );
  }
  const prevDisabled = currentPage === 0;
  const nextDisabled = currentPage === totalPages - 1;

  const mBtnBase = {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 14px',
    borderRadius: '4px',
    border: '1px solid rgba(120,100,70,0.2)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    minWidth: '64px',
  };

  return (
    <div className="mobile-controls" style={{
      background: 'transparent',
      borderTop: 'none',
      padding: '6px 12px',
      paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '6px',
        background: 'linear-gradient(180deg, #f8f5f0 0%, #f0ebe3 100%)',
        border: '1px solid rgba(160,140,110,0.2)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        width: 'fit-content',
      }}>
        <button
          onClick={onPrev}
          disabled={prevDisabled}
          aria-label="Previous page"
          style={{
            ...mBtnBase,
            background: prevDisabled ? '#eae7e2' : 'linear-gradient(180deg, #f5f2ed 0%, #e8e3db 100%)',
            color: prevDisabled ? '#b5ad9f' : '#4a3c2e',
            opacity: prevDisabled ? 0.6 : 1,
            cursor: prevDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft /> Prev
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          padding: '5px 10px',
          borderRadius: '4px',
          background: '#f5f2ed',
          border: '1px solid rgba(160,140,110,0.12)',
          minWidth: '42px',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#3a2c1e',
          }}>
            {currentPage + 1}
          </span>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: '0.62rem',
            color: '#a09080',
          }}>/</span>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: '0.62rem',
            color: '#a09080',
          }}>
            {totalPages}
          </span>
        </div>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          aria-label="Next page"
          style={{
            ...mBtnBase,
            background: nextDisabled ? '#eae7e2' : 'linear-gradient(180deg, #f5f2ed 0%, #e8e3db 100%)',
            color: nextDisabled ? '#b5ad9f' : '#4a3c2e',
            opacity: nextDisabled ? 0.6 : 1,
            cursor: nextDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          Next <ChevronRight />
        </button>
        <div style={{
          width: '1px',
          height: '20px',
          background: 'rgba(160,140,110,0.2)',
        }} />
        <button
          onClick={onClose}
          aria-label="Close file"
          style={{
            ...mBtnBase,
            background: 'linear-gradient(180deg, #c44040 0%, #a83232 100%)',
            color: '#fff',
            borderColor: 'rgba(140,40,40,0.3)',
            boxShadow: '0 1px 3px rgba(140,40,40,0.2)',
          }}
        >
          <XIcon /> Close
        </button>
      </div>
    </div>
  );
};

/* ==================== MobileClosedFront.jsx ==================== */
const MobileClosedFront = ({ isUntying, isClosing, onOpen }) => {
  let animClass = '';
  if (isUntying) animClass = 'mobile-anim-open-cover';
  if (isClosing) animClass = 'mobile-anim-close-cover';
  return (
    <div
      className={`mobile-closed-file texture-kraft-file ${animClass}`}
      onClick={onOpen}
      style={{ transformOrigin: 'left center' }}
    >
      <div className="mobile-closed-tab texture-kraft-tab">
        <span className="mobile-closed-tab-text">FILE</span>
      </div>
      <div className="mobile-paper-peek">
        <div style={{
          left: 0, width: '95%', height: '7px',
          background: 'var(--paper-color)',
          transform: 'rotate(-0.4deg)',
          boxShadow: '0 -1px 2px rgba(0,0,0,0.1)',
        }}></div>
        <div style={{
          left: '4px', width: '91%', height: '6px',
          background: 'var(--paper-dark)',
          transform: 'rotate(0.3deg)',
        }}></div>
      </div>
      <div className="mobile-fold-flap">
        <div className="mobile-fold-line"></div>
      </div>
      <div className="mobile-button-closure"
           style={{
             opacity: isUntying ? 0.4 : 1,
             transition: 'opacity 0.4s ease',
           }}>
        <div className="mobile-button-circle"></div>
        <div className="mobile-button-string"
             style={{
               width: isUntying ? '2px' : '18px',
               opacity: isUntying ? 0 : 0.5,
               transition: 'all 0.4s ease',
             }}></div>
      </div>
      <div className="mobile-worn-tr"></div>
      <div className="mobile-worn-bl"></div>
      <div className="mobile-edge-top"></div>
      <div className="mobile-edge-bottom"></div>
      <div className="mobile-stain" style={{
        width: '60px', height: '60px', top: '18%', left: '30%',
      }}></div>
      <div className="mobile-stain" style={{
        width: '40px', height: '50px', bottom: '25%', right: '20%',
        transform: 'rotate(30deg)',
      }}></div>
      <div className="mobile-closed-content">
        <div className="mobile-closed-header">
          <div>
            <div className="mobile-closed-org">CR Cyber Crime Foundation</div>
            <div className="mobile-closed-govt">Government of India</div>
          </div>
          <div className="mobile-closed-stamp">
            <div className="mobile-closed-stamp-text">
              Official<br/>Confidential
            </div>
          </div>
        </div>
        <div className="mobile-closed-title">
          <h1>Support for Women & Girls</h1>
          <h2>Standing strong against the invisible digital threats.</h2>
          <p>
            Confidential support, legal guidance, cyber awareness, and emotional
            assistance for women and girls affected by cybercrime.
          </p>
        </div>
        <div className="mobile-closed-fields">
          <div className="mobile-closed-field">
            <span className="mobile-closed-field-label">SUBJECT:</span>
            <span className="mobile-closed-field-value">Cyber Safety Awareness</span>
          </div>
          <div className="mobile-closed-field">
            <span className="mobile-closed-field-label">FROM:</span>
            <span className="mobile-closed-field-value">CRCCF Support Division</span>
          </div>
          <div className="mobile-closed-row">
            <div className="mobile-closed-field">
              <span className="mobile-closed-field-label">YEAR:</span>
              <span className="mobile-closed-field-value">2026</span>
            </div>
            <div className="mobile-closed-field">
              <span className="mobile-closed-field-label">FILE NO.:</span>
              <span className="mobile-closed-field-value">CRCCF/SAFE/01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OfficeFile, FileControls, MobileFileView, MobileControls, MobileClosedFront };


function getIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

const Header = () => (
  <header className="cyber-safety-header w-full flex flex-col items-center text-center mb-8 px-4">
    <h1 className="text-center font-bold text-[#3a2815] mb-3 max-w-[840px] text-balance break-words" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Cyber Safety and Support for Women & Girls</h1>
    <p className="text-center text-[#6b5740] max-w-[680px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      Empowering women with knowledge, legal guidance, and a secure environment against digital threats.
    </p>
  </header>
);

export default function CyberSafetyAndSupportPage() {
  const pages = pagesData;
  const [fileState, setFileState] = useState('closed');
  const [currentPage, setCurrentPage] = useState(0);
  const [isTurningNext, setIsTurningNext] = useState(false);
  const [isTurningPrev, setIsTurningPrev] = useState(false);
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [windowSize, setWindowSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  const totalPages = pages.length;

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ w, h });
      setIsMobile(w < 768);
    };
    const mql = window.matchMedia('(max-width: 767px)');
    const handleMql = (e) => {
      setIsMobile(e.matches);
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    mql.addEventListener('change', handleMql);
    window.addEventListener('resize', check, { passive: true });
    return () => {
      mql.removeEventListener('change', handleMql);
      window.removeEventListener('resize', check);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (fileState !== 'closed') return;
    setFileState('untying');
    setTimeout(() => setFileState('opened'), 800);
  }, [fileState]);

  const handleClose = useCallback(() => {
    if (fileState !== 'opened') return;
    if (currentPage !== 0) setCurrentPage(0);
    setFileState('closing');
    setTimeout(() => setFileState('closed'), 800);
  }, [fileState, currentPage]);

  const animTimeoutRef = React.useRef(null);

  const handleNextPage = useCallback(() => {
    if (animTimeoutRef.current) return;
    if (currentPage < totalPages - 1) {
      setIsTurningPrev(false);
      setIsTurningNext(true);
      
      animTimeoutRef.current = setTimeout(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
        setIsTurningNext(false);
        animTimeoutRef.current = null;
      }, 400);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (animTimeoutRef.current) return;
    if (currentPage > 0) {
      setIsTurningNext(false);
      setIsTurningPrev(true);
      
      animTimeoutRef.current = setTimeout(() => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
        setIsTurningPrev(false);
        animTimeoutRef.current = null;
      }, 400);
    }
  }, [currentPage]);

  if (!isMobile) {
    const FILE_BASE_W = 480;
    const FILE_BASE_H = 640;
    const OPEN_SWING_W = 480;
    const MAX_VIEWER_W = FILE_BASE_W + OPEN_SWING_W;
    const reservedChromeH = 205;
    const scale = Math.max(
      Math.min((windowSize.w - 72) / MAX_VIEWER_W, (windowSize.h - reservedChromeH) / FILE_BASE_H, 0.86),
      0.58
    );

    return (
      <main className="cyber-safety-page pt-[104px] flex flex-col items-center w-full" style={{ perspective: '2500px' }}>
        <Header />

        <section className="document-viewer-section">
          <div
            className="document-viewer-container desktop-document-viewer"
            style={{
              '--viewer-width': `${MAX_VIEWER_W * scale}px`,
              '--viewer-height': `${FILE_BASE_H * scale}px`,
            }}
          >
            <div
              className="desktop-file-frame"
              style={{
                width: MAX_VIEWER_W,
                height: FILE_BASE_H,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              <div
                className="gpu-accelerated desktop-file-object"
                style={{
                  transform: `translate3d(${
                    fileState === 'opened' ? '480px' :
                    '240px'
                  }, 0, 0)`,
                  transformOrigin: 'center center',
                  width: FILE_BASE_W,
                  height: FILE_BASE_H,
                  transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                  willChange: 'transform',
                }}
              >
                <OfficeFile
                  pagesData={pages}
                  fileState={fileState}
                  currentPage={currentPage}
                  isTurningNext={isTurningNext}
                  isTurningPrev={isTurningPrev}
                  onOpen={handleOpen}
                />
              </div>
            </div>
          </div>
        </section>

        <FileControls
          fileState={fileState}
          onOpen={handleOpen}
          onClose={handleClose}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
          isTurningNext={isTurningNext}
          isTurningPrev={isTurningPrev}
        />
      </main>
    );
  }

  const isOpened = fileState === 'opened';
  const isClosing = fileState === 'closing';
  const isUntying = fileState === 'untying';
  const renderOpenFile = isUntying || isOpened || isClosing;
  const renderClosedCover = fileState === 'closed' || isUntying || isClosing;

  return (
    <main className="cyber-safety-page pt-[104px] flex flex-col items-center w-full">
      <Header />

      <section className="document-viewer-section">
        <div className="document-viewer-container mobile-document-viewer">
          <div className="mobile-document-stage">
            {renderOpenFile && (
              <MobileFileView
                pagesData={pages}
                currentPage={currentPage}
                isTurningNext={isTurningNext}
                isTurningPrev={isTurningPrev}
              />
            )}

            {renderClosedCover && (
              <div className="mobile-closed-overlay" style={{ pointerEvents: isClosing ? 'none' : 'auto' }}>
                <MobileClosedFront
                  isUntying={isUntying}
                  isClosing={isClosing}
                  onOpen={handleOpen}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <FileControls
        fileState={fileState}
        onOpen={handleOpen}
        onClose={handleClose}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        currentPage={currentPage}
        totalPages={totalPages}
        isTurningNext={isTurningNext}
        isTurningPrev={isTurningPrev}
      />
    </main>
  );
}


