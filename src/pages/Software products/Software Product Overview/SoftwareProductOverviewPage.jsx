import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SOFTWARE_PRODUCT_OVERVIEW_SPREADS } from './SoftwareProductOverviewPageData';

// Custom Gold Corner SVG to match the antique book look
const GoldCorner = ({ position = 'top-left' }) => {
  const getRotationClass = () => {
    switch (position) {
      case 'top-right': return 'top-2 right-2 rotate-90';
      case 'bottom-right': return 'bottom-2 right-2 rotate-180';
      case 'bottom-left': return 'bottom-2 left-2 -rotate-90';
      case 'top-left':
      default: return 'top-2 left-2';
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 z-30 pointer-events-none transition-transform duration-300 ${getRotationClass()}`}
    >
      <defs>
        <linearGradient id="gold-grad-spo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <filter id="gold-glow-spo" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <path
        d="M 0 0 L 90 0 C 95 0 95 5 95 10 L 80 15 C 75 16 70 12 65 12 L 20 20 L 20 65 C 20 70 16 75 15 80 L 10 95 C 5 95 0 95 0 90 Z"
        fill="url(#gold-grad-spo)"
        stroke="#78350F"
        strokeWidth="1.5"
        filter="url(#gold-glow-spo)"
      />
      <path
        d="M 6 6 L 75 6 C 70 10 65 10 60 10 L 14 14 L 14 60 C 10 65 10 70 6 75 Z"
        stroke="#FEF08A"
        strokeWidth="1"
        opacity="0.85"
      />
      <circle cx="10" cy="10" r="3.5" fill="#5F370E" stroke="#FEF08A" strokeWidth="0.5" />
    </svg>
  );
};

export default function SoftwareProductOverviewPage({ onBack }) {
  const title = "Software Product Overview";
  const subtitle = "Comprehensive Ecosystem Architecture & Specialized Solutions — CR Cyber Crime Foundation";
  const spreads = SOFTWARE_PRODUCT_OVERVIEW_SPREADS;

  useGSAP(() => {
    gsap.fromTo('.reader-header-gsap',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true, clearProps: 'transform' }
    );

    gsap.fromTo('.book-3d-frame',
      { opacity: 0, y: 35, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', force3D: true, clearProps: 'transform' }
    );

    gsap.fromTo('.reader-footer-gsap',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, delay: 0.15, ease: 'power2.out', force3D: true, clearProps: 'transform' }
    );
  }, []);

  const [pageIndex, setPageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [renderIndex, setRenderIndex] = useState(0);
  const [activeMobilePage, setActiveMobilePage] = useState('left');
  const [mobileTransition, setMobileTransition] = useState('idle');
  const [flipState, setFlipState] = useState('idle');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 530);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!window.history.state?.softwareOverviewReaderOpen) {
      window.history.pushState({ softwareOverviewReaderOpen: true }, '');
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (!state || !state.softwareOverviewReaderOpen) {
        if (onBack) onBack();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBack]);

  const handleNextPage = () => {
    let nextActivePage = activeMobilePage;
    let nextPageIndex = pageIndex;

    if (isMobile) {
      if (activeMobilePage === 'left') {
        nextActivePage = 'right';
      } else {
        if (pageIndex < spreads.length - 1) {
          nextPageIndex = pageIndex + 1;
          nextActivePage = 'left';
        } else {
          return;
        }
      }
    } else {
      if (pageIndex < spreads.length - 1) {
        nextPageIndex = pageIndex + 1;
      } else {
        return;
      }
    }

    if (isMobile) {
      if (flipState !== 'idle') return;
      setFlipState('animating');
      setMobileTransition('slide-out-left');

      setTimeout(() => {
        setActiveMobilePage(nextActivePage);
        setPageIndex(nextPageIndex);
        setRenderIndex(nextPageIndex);
        setMobileTransition('idle');
        setFlipState('idle');
      }, 350);
    } else {
      if (flipState !== 'idle') return;
      setFlipState('next');
      setTimeout(() => {
        setIsAnimated(true);
      }, 25);
      setTimeout(() => {
        setPageIndex(nextPageIndex);
        setRenderIndex(nextPageIndex);
        setFlipState('idle');
        setIsAnimated(false);
      }, 800);
    }
  };

  const handlePrevPage = () => {
    let prevActivePage = activeMobilePage;
    let prevPageIndex = pageIndex;

    if (isMobile) {
      if (activeMobilePage === 'right') {
        prevActivePage = 'left';
      } else {
        if (pageIndex > 0) {
          prevPageIndex = pageIndex - 1;
          prevActivePage = 'right';
        } else {
          return;
        }
      }
    } else {
      if (pageIndex > 0) {
        prevPageIndex = pageIndex - 1;
      } else {
        return;
      }
    }

    if (isMobile) {
      if (flipState !== 'idle') return;
      setFlipState('animating');
      setMobileTransition('slide-in-left');
      setActiveMobilePage(prevActivePage);
      setPageIndex(prevPageIndex);
      setRenderIndex(prevPageIndex);

      setTimeout(() => {
        setMobileTransition('idle');
      }, 50);
      setTimeout(() => {
        setFlipState('idle');
      }, 400);
    } else {
      if (flipState !== 'idle') return;
      setFlipState('prev');
      setTimeout(() => {
        setIsAnimated(true);
      }, 25);
      setTimeout(() => {
        setPageIndex(prevPageIndex);
        setRenderIndex(prevPageIndex);
        setFlipState('idle');
        setIsAnimated(false);
      }, 800);
    }
  };

  const handleCloseReader = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const getPageStyle = (side) => {
    if (!isMobile) return {};
    const isActive = activeMobilePage === side;
    const baseStyle = {
      position: isMobile ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: isActive ? 30 : 20,
    };

    if (isActive) {
      if (mobileTransition === 'slide-out-left') {
        return {
          ...baseStyle,
          transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease-out',
          transform: 'translateX(-100%) rotate(-4deg)',
          opacity: 0,
        };
      }
      if (mobileTransition === 'slide-out-right') {
        return {
          ...baseStyle,
          transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease-out',
          transform: 'translateX(100%) rotate(4deg)',
          opacity: 0,
        };
      }
      if (mobileTransition === 'slide-in-left') {
        return {
          ...baseStyle,
          transition: 'none',
          transform: 'translateX(-100%) rotate(-4deg)',
          opacity: 1,
        };
      }
      return {
        ...baseStyle,
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease-out',
        transform: 'translateX(0) rotate(0deg)',
        opacity: 1,
      };
    }

    return {
      ...baseStyle,
      opacity: flipState === 'animating' ? 1 : 0,
      pointerEvents: 'none',
      transform: 'translateX(0) rotate(0deg)',
    };
  };

  const renderPageContent = (pageDataContent, side, pageNumStr) => {
    if (!pageDataContent) return null;
    const sidePaddingClass = side === 'left'
      ? "pl-6 pr-4 sm:pl-8 sm:pr-6 md:pl-10 md:pr-8 lg:pl-11 lg:pr-9"
      : "pr-6 pl-4 sm:pr-8 sm:pl-6 md:pr-10 md:pl-8 lg:pr-11 lg:pr-9";

    // Clear, comfortable text sizing & spacing logic
    let titleSizeClass = "text-[11.5px] sm:text-[12.5px] md:text-[13.5px] lg:text-[14.5px]";
    let textSizeClass = "text-[10px] sm:text-[11px] md:text-[12px] lg:text-[12.5px]";
    let spaceYClass = "space-y-3 sm:space-y-4";
    let paragraphMbClass = "mb-1.5 sm:mb-2";
    let leadingClass = "leading-relaxed";

    return (
      <div className={`w-full h-full pt-3.5 pb-3 sm:pt-4.5 sm:pb-4 ${sidePaddingClass} flex flex-col justify-between select-none backface-hidden absolute inset-0 bg-transparent`}>
        {side === 'left' ? (
          <div className="absolute top-0 bottom-0 left-0 w-2.5 pointer-events-none z-20 border-r border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(90deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />
        ) : (
          <div className="absolute top-0 bottom-0 right-0 w-2.5 pointer-events-none z-20 border-l border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(90deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none z-20 border-t border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(180deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />

        <div className="flex-1 flex flex-col min-h-0 justify-start pr-0.5 select-text overflow-hidden">
          <div className="shrink-0 mb-1.5">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-[18px] font-black text-[#5c2800] tracking-tight font-serif mb-0.5 uppercase leading-tight">
              {pageDataContent.title}
            </h3>
            <h4 className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-black uppercase text-[#8a5a36] tracking-wider font-sans mb-1">
              {pageDataContent.subtitle}
            </h4>

            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#8a5a36] flex-1" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#8a5a36] bg-[#dbcaa4]" />
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#8a5a36] flex-1" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start overflow-y-auto pr-1 select-text scrollbar-hide">
            {pageDataContent.sections ? (
              <div className={spaceYClass}>
                {pageDataContent.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="text-justify">
                    <h5 className={`${titleSizeClass} font-black text-[#6a3412] uppercase font-sans tracking-wide mb-1 leading-snug`}>
                      {sec.title}
                    </h5>
                    {sec.paragraphs.map((p, pIdx) => {
                      const isFirstParagraphOfWholePage = secIdx === 0 && pIdx === 0;
                      if (isFirstParagraphOfWholePage && side === 'left' && pageIndex === 0) {
                        return (
                          <p key={pIdx} className={`text-slate-800 ${textSizeClass} ${leadingClass} ${paragraphMbClass}`}>
                            <span className="float-left text-3xl sm:text-4xl md:text-5xl font-black mr-2.5 mt-0.5 text-[#991b1b] font-serif leading-[0.8]">
                              {p[0]}
                            </span>
                            {p.slice(1)}
                          </p>
                        );
                      }
                      return (
                        <p key={pIdx} className={`text-slate-800 ${textSizeClass} ${leadingClass} ${paragraphMbClass} whitespace-pre-line`}>
                          {p}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-700 text-xs sm:text-sm font-sans whitespace-pre-line leading-relaxed">
                {pageDataContent.content}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-between pt-1 mt-1 border-t border-[#8a5a36]/25 text-[9.5px] sm:text-[10.5px] text-[#8a5a36] font-mono">
          <span>{side === 'left' ? 'CR CYBER CRIME FOUNDATION' : 'SOFTWARE PRODUCT OVERVIEW'}</span>
          <span>{pageNumStr}</span>
        </div>
      </div>
    );
  };

  const getBackgroundCard = (side) => {
    if (!spreads || spreads.length === 0) return null;
    const currentSpread = spreads[pageIndex] || spreads[0];
    if (flipState === 'next') {
      const nextSpread = spreads[renderIndex + 1] || spreads[renderIndex] || currentSpread;
      const rIndexSpread = spreads[renderIndex] || currentSpread;
      return side === 'left' ? rIndexSpread?.leftPage : nextSpread?.rightPage;
    }
    if (flipState === 'prev') {
      const prevSpread = spreads[renderIndex - 1] || spreads[renderIndex] || currentSpread;
      const rIndexSpread = spreads[renderIndex] || currentSpread;
      return side === 'left' ? prevSpread?.leftPage : rIndexSpread?.rightPage;
    }
    return side === 'left' ? currentSpread?.leftPage : currentSpread?.rightPage;
  };

  const getPageNumStr = (idx, side) => {
    const pageNum = (idx * 2) + (side === 'left' ? 1 : 2);
    return pageNum < 10 ? `Page 0${pageNum}` : `Page ${pageNum}`;
  };

  return (
    <div className="book-reader-container min-h-screen w-full bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex flex-col justify-between py-6 px-4 md:px-8 font-sans relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.04),transparent)] pointer-events-none" />

      <header className="reader-header-gsap relative z-20 max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-4 mb-4 pb-4 border-b border-slate-200">
        <div className="text-center flex flex-col gap-1">
          <h2 className="text-slate-800 font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-wider whitespace-nowrap uppercase font-serif leading-tight">
            {title}
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium font-sans">
            {subtitle}
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-4 relative z-10 w-full max-w-6xl mx-auto">
        <div className="book-3d-frame relative w-full max-w-[1140px] mx-auto rounded-[28px] p-2 md:p-4 bg-gradient-to-r from-[#2c1c14] via-[#422c20] to-[#2c1c14] border-[6px] border-[#1f130e] shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]">
          <GoldCorner position="top-left" />
          <GoldCorner position="top-right" />
          <GoldCorner position="bottom-left" />
          <GoldCorner position="bottom-right" />

          <div
            className={`relative z-10 w-full ${isMobile ? 'overflow-visible' : 'overflow-hidden'} bg-gradient-to-r from-[#e7dac1] via-[#eedbb3] to-[#e7dac1] rounded-[18px] grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} shadow-[inset_0_0_30px_rgba(95,55,14,0.15)] min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px]`}
            style={{ perspective: '1500px' }}
          >
            {!isMobile && (
              <>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-6 bg-gradient-to-r from-black/40 via-[#4e3629]/90 to-black/40 z-20 shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/50 z-30 pointer-events-none" />
              </>
            )}

            <div
              className={`relative bg-gradient-to-r from-[#dbcaa4] via-[#f7ebd0] to-[#fcfaf4] ${isMobile ? 'border-b rounded-[18px]' : 'border-r border-[#caa17d]/40 rounded-l-[18px] rounded-r-none'} flex flex-col min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px]`}
              style={isMobile ? getPageStyle('left') : {}}
            >
              {renderPageContent(
                getBackgroundCard('left'),
                'left',
                getPageNumStr(flipState === 'next' ? renderIndex : flipState === 'prev' ? renderIndex - 1 : pageIndex, 'left')
              )}
            </div>

            <div
              className={`relative bg-gradient-to-r from-[#fcfaf4] via-[#f7ebd0] to-[#dbcaa4] ${isMobile ? 'rounded-[18px]' : 'rounded-r-[18px] rounded-l-none'} flex flex-col min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px]`}
              style={isMobile ? getPageStyle('right') : {}}
            >
              {renderPageContent(
                getBackgroundCard('right'),
                'right',
                getPageNumStr(flipState === 'next' ? renderIndex + 1 : flipState === 'prev' ? renderIndex : pageIndex, 'right')
              )}
            </div>

            {flipState === 'next' && (
              <div
                className="absolute top-0 bottom-0 left-1/2 w-1/2 z-30 overflow-visible"
                style={{
                  transformOrigin: 'left center',
                  transform: isAnimated ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#fcfaf4] via-[#f7ebd0] to-[#dbcaa4] rounded-r-[18px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {renderPageContent(spreads[renderIndex]?.rightPage, 'right', getPageNumStr(renderIndex, 'right'))}
                </div>
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#dbcaa4] via-[#f7ebd0] to-[#fcfaf4] rounded-l-[18px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {renderPageContent(spreads[renderIndex + 1]?.leftPage || spreads[renderIndex]?.leftPage, 'left', getPageNumStr(renderIndex + 1, 'left'))}
                </div>
              </div>
            )}

            {flipState === 'prev' && (
              <div
                className="absolute top-0 bottom-0 left-0 w-1/2 z-30 overflow-visible"
                style={{
                  transformOrigin: 'right center',
                  transform: isAnimated ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#dbcaa4] via-[#f7ebd0] to-[#fcfaf4] rounded-l-[18px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {renderPageContent(spreads[renderIndex]?.leftPage, 'left', getPageNumStr(renderIndex, 'left'))}
                </div>
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#fcfaf4] via-[#f7ebd0] to-[#dbcaa4] rounded-r-[18px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(-180deg)'
                  }}
                >
                  {renderPageContent(spreads[renderIndex - 1]?.rightPage || spreads[renderIndex]?.rightPage, 'right', getPageNumStr(renderIndex - 1, 'right'))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="reader-footer-gsap relative z-20 max-w-6xl w-full mx-auto flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[#caa17d]/30">
        <button
          onClick={handlePrevPage}
          disabled={(isMobile ? (pageIndex === 0 && activeMobilePage === 'left') : pageIndex === 0) || flipState !== 'idle'}
          className={`group px-5 py-2.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(138,90,54,0.1)] max-w-[30%] sm:max-w-[45%] truncate ${(isMobile ? (pageIndex === 0 && activeMobilePage === 'left') : pageIndex === 0)
            ? 'opacity-40 cursor-not-allowed border-[#caa17d]/50 text-[#8a5a36] bg-transparent shadow-none'
            : 'bg-gradient-to-r from-[#fcfaf4] to-[#f7ebd0] text-[#5c2800] border-[#caa17d] hover:border-[#8a5a36] hover:shadow-[0_4px_12px_rgba(138,90,54,0.2)]'
            }`}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
          <span className="truncate hidden sm:inline">Previous Page</span>
          <span className="truncate sm:hidden">Prev</span>
        </button>

        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#8a5a36] font-semibold">
          <span>Spread {pageIndex + 1} of {spreads.length}</span>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={flipState !== 'idle'}
              className="relative flex items-center justify-between w-[220px] md:w-[280px] bg-gradient-to-r from-[#fcfaf4] to-[#f7ebd0] border-2 border-[#caa17d] text-[#5c2800] rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-[#8a5a36] transition-all font-sans text-[11px] font-bold shadow-[0_2px_8px_rgba(138,90,54,0.15)] disabled:opacity-50"
            >
              <span className="truncate pr-4">
                Pages {(pageIndex * 2) + 1}-{(pageIndex * 2) + 2} • {spreads[pageIndex]?.leftPage?.title || 'Section'}
              </span>
              <svg className={`w-3.5 h-3.5 text-[#8a5a36] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] bg-gradient-to-b from-[#fcfaf4] to-[#f7ebd0] border-2 border-[#caa17d] rounded-xl shadow-[0_10px_40px_rgba(92,40,0,0.25)] z-50 overflow-hidden flex flex-col max-h-[350px]">
                  <div className="px-3 py-2.5 border-b border-[#caa17d]/40 bg-[#dbcaa4]/40 font-serif text-[10px] font-black uppercase text-[#8a5a36] tracking-wider text-center">
                    Navigate to Section
                  </div>
                  <div className="overflow-y-auto py-1">
                    {spreads.map((spread, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (idx !== pageIndex && flipState === 'idle') {
                            setPageIndex(idx);
                            setRenderIndex(idx);
                            if (isMobile) setActiveMobilePage('left');
                          }
                        }}
                        className={`w-full text-left px-4 py-3 text-[11px] font-sans transition-colors flex items-center gap-2 ${idx === pageIndex ? 'bg-[#caa17d]/25 text-[#5c2800] font-black' : 'text-[#6a3412] hover:bg-[#caa17d]/15 hover:text-[#5c2800] font-medium'}`}
                      >
                        <span className="font-black text-[#8a5a36] min-w-[55px]">Pg {(idx * 2) + 1}-{(idx * 2) + 2}</span>
                        <span className="truncate flex-1">{spread.leftPage?.title || 'Section'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Jump Dropdown */}
        <div className="flex sm:hidden items-center justify-center absolute left-1/2 -translate-x-1/2 w-[45%] z-30">
          <div className="relative w-full">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={flipState !== 'idle'}
              className="relative flex items-center justify-between w-full bg-gradient-to-r from-[#fcfaf4] to-[#f7ebd0] border-2 border-[#caa17d] text-[#5c2800] text-[10px] font-bold rounded-lg px-2 py-2 outline-none cursor-pointer shadow-[0_2px_8px_rgba(138,90,54,0.15)] disabled:opacity-50"
            >
              <span className="truncate pr-2">
                Pg {(pageIndex * 2) + 1}-{(pageIndex * 2) + 2} • {spreads[pageIndex]?.leftPage?.title || 'Section'}
              </span>
              <svg className={`w-3 h-3 text-[#8a5a36] transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[240px] bg-gradient-to-b from-[#fcfaf4] to-[#f7ebd0] border-2 border-[#caa17d] rounded-xl shadow-[0_10px_30px_rgba(92,40,0,0.3)] z-50 overflow-hidden flex flex-col max-h-[280px]">
                  <div className="px-2 py-2 border-b border-[#caa17d]/40 bg-[#dbcaa4]/40 font-serif text-[9px] font-black uppercase text-[#8a5a36] tracking-wider text-center">
                    Navigate to Section
                  </div>
                  <div className="overflow-y-auto py-1">
                    {spreads.map((spread, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (idx !== pageIndex && flipState === 'idle') {
                            setPageIndex(idx);
                            setRenderIndex(idx);
                            if (isMobile) setActiveMobilePage('left');
                          }
                        }}
                        className={`w-full text-left px-3 py-2.5 text-[10px] font-sans transition-colors flex items-center gap-1.5 ${idx === pageIndex ? 'bg-[#caa17d]/25 text-[#5c2800] font-black' : 'text-[#6a3412] hover:bg-[#caa17d]/15 hover:text-[#5c2800] font-medium'}`}
                      >
                        <span className="font-black text-[#8a5a36] min-w-[45px]">Pg {(idx * 2) + 1}-{(idx * 2) + 2}</span>
                        <span className="truncate flex-1">{spread.leftPage?.title || 'Section'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleNextPage}
          disabled={(isMobile ? (pageIndex === spreads.length - 1 && activeMobilePage === 'right') : pageIndex === spreads.length - 1) || flipState !== 'idle'}
          className={`group px-5 py-2.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(138,90,54,0.1)] max-w-[30%] sm:max-w-[45%] truncate ${(isMobile ? (pageIndex === spreads.length - 1 && activeMobilePage === 'right') : pageIndex === spreads.length - 1)
            ? 'opacity-40 cursor-not-allowed border-[#caa17d]/50 text-[#8a5a36] bg-transparent shadow-none'
            : 'bg-gradient-to-r from-[#fcfaf4] to-[#f7ebd0] text-[#5c2800] border-[#caa17d] hover:border-[#8a5a36] hover:shadow-[0_4px_12px_rgba(138,90,54,0.2)]'
            }`}
        >
          <span className="truncate hidden sm:inline">Next Page</span>
          <span className="truncate sm:hidden">Next</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </button>
      </footer>
    </div>
  );
}
