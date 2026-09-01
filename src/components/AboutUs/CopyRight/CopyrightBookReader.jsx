import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { getSpreadsForModule, COPYRIGHT_MODULES_DATA } from '../../../data/aboutUs/CopyrightIntellectualPropertyPageData';

// Custom Gold Corner SVG to match the antique book look
const GoldCorner = ({ position = 'top-left' }) => {
  const getRotationClass = () => {
    switch (position) {
      case 'top-right': return 'top-0 right-0 rotate-90';
      case 'bottom-right': return 'bottom-0 right-0 rotate-180';
      case 'bottom-left': return 'bottom-0 left-0 -rotate-90';
      case 'top-left':
      default: return 'top-0 left-0';
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`absolute w-10 h-10 sm:w-14 sm:h-14 z-30 pointer-events-none transition-transform duration-300 ${getRotationClass()}`}
    >
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <filter id="gold-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <path
        d="M 0 0 L 90 0 C 95 0 95 5 95 10 L 80 15 C 75 16 70 12 65 12 L 20 20 L 20 65 C 20 70 16 75 15 80 L 10 95 C 5 95 0 95 0 90 Z"
        fill="url(#gold-grad)"
        stroke="#78350F"
        strokeWidth="1.5"
        filter="url(#gold-glow)"
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

export default function CopyrightBookReader({ cardId, onBack }) {
  const moduleData = COPYRIGHT_MODULES_DATA.find(m => m.id === cardId) || {
    name: 'Copyright Legal Notice',
    description: 'Official Intellectual Property & Compliance Notice of CR Cyber Crime Foundation'
  };

  const spreads = getSpreadsForModule(cardId);
  const title = moduleData.name;
  const subtitle = moduleData.description;

  useEffect(() => {
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
  const [renderIndex, setRenderIndex] = useState(0);
  const [activeMobilePage, setActiveMobilePage] = useState('left');
  const [mobileTransition, setMobileTransition] = useState('idle');
  const [flipState, setFlipState] = useState('idle');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setPageIndex(0);
    setRenderIndex(0);
    setActiveMobilePage('left');
    setMobileTransition('idle');
  }, [cardId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 530);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!window.history.state?.readerOpen) {
      window.history.pushState({ readerOpen: true }, '');
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (!state || !state.readerOpen) {
        onBack();
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
      setMobileTransition('slide-out');

      setTimeout(() => {
        setActiveMobilePage(nextActivePage);
        setPageIndex(nextPageIndex);
        setRenderIndex(nextPageIndex);
        setMobileTransition('idle');
        setFlipState('idle');
      }, 500);
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
      setMobileTransition('slide-in-start');
      setActiveMobilePage(prevActivePage);
      setPageIndex(prevPageIndex);
      setRenderIndex(prevPageIndex);

      setTimeout(() => {
        setMobileTransition('slide-in-active');
      }, 20);

      setTimeout(() => {
        setMobileTransition('idle');
        setFlipState('idle');
      }, 520);
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
    window.history.back();
  };

  const getPageStyle = (side) => {
    if (!isMobile) return {};
    const isActive = activeMobilePage === side;

    if (isActive) {
      if (mobileTransition === 'slide-out') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 40,
          transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.5s ease-out',
          transform: 'translateX(-105%) rotate(-4deg)',
          opacity: 0.95,
          boxShadow: '-12px 0 30px rgba(0,0,0,0.4)',
        };
      }
      if (mobileTransition === 'slide-in-start') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 40,
          transition: 'none',
          transform: 'translateX(-105%) rotate(-4deg)',
          opacity: 1,
          boxShadow: '-12px 0 30px rgba(0,0,0,0.4)',
        };
      }
      if (mobileTransition === 'slide-in-active') {
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 40,
          transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: 'translateX(0) rotate(0deg)',
          opacity: 1,
          boxShadow: '-12px 0 30px rgba(0,0,0,0.4)',
        };
      }
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 30,
        transition: 'none',
        transform: 'translateX(0) rotate(0deg)',
        opacity: 1,
        boxShadow: 'none',
      };
    }

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10,
      opacity: 1,
      pointerEvents: 'none',
      transform: 'translateX(0) rotate(0deg)',
    };
  };

  const renderPageContent = (pageDataContent, side, pageNumStr) => {
    if (!pageDataContent) return null;
    const sidePaddingClass = side === 'left'
      ? "pl-6 pr-4 sm:pl-8 sm:pr-6 md:pl-10 md:pr-8 lg:pl-11 lg:pr-9"
      : "pr-6 pl-4 sm:pr-8 sm:pl-6 md:pr-10 md:pl-8 lg:pr-11 lg:pr-9";

    const sections = pageDataContent.sections || [];
    const sectionCount = sections.length;
    const totalChars = sections.reduce(
      (acc, s) => acc + (s.paragraphs ? s.paragraphs.reduce((pAcc, p) => pAcc + p.length, 0) : 0),
      0
    );

    // Adaptive Sizing & Spacing Logic (Ensures clear, readable 10px-13px font size across all pages)
    let titleSizeClass = "text-[9.5px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px]";
    let textSizeClass = "text-[8.5px] sm:text-[9.5px] md:text-[10.5px] lg:text-[11.5px]";
    let spaceYClass = "space-y-2.5 sm:space-y-3.5";
    let paragraphMbClass = "mb-1 sm:mb-1.5";
    let leadingClass = "leading-relaxed";

    if (totalChars > 700 || sectionCount >= 5) {
      // Extremely long page fallback only
      titleSizeClass = "text-[8.5px] sm:text-[9.5px] md:text-[10.5px] lg:text-[11px]";
      textSizeClass = "text-[7.8px] sm:text-[8.8px] md:text-[9.5px] lg:text-[10px]";
      spaceYClass = "space-y-1.5 sm:space-y-2";
      paragraphMbClass = "mb-0.5 sm:mb-1";
      leadingClass = "leading-snug";
    } else if (totalChars < 300 && sectionCount <= 2) {
      titleSizeClass = "text-[10.5px] sm:text-[12px] md:text-[13px] lg:text-[14px]";
      textSizeClass = "text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[12.5px]";
      spaceYClass = "space-y-4 sm:space-y-5";
      paragraphMbClass = "mb-2 sm:mb-3";
      leadingClass = "leading-relaxed";
    }

    return (
      <div className={`w-full h-full pt-3.5 pb-3 sm:pt-4.5 sm:pb-4 ${sidePaddingClass} flex flex-col justify-between select-none backface-hidden absolute inset-0 bg-transparent`}>
        {(isMobile || side === 'left') && <GoldCorner position="top-left" />}
        {(isMobile || side === 'right') && <GoldCorner position="top-right" />}
        {(isMobile || side === 'left') && <GoldCorner position="bottom-left" />}
        {(isMobile || side === 'right') && <GoldCorner position="bottom-right" />}

        {side === 'left' ? (
          <div className="absolute top-0 bottom-0 left-0 w-2.5 pointer-events-none z-20 border-r border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(90deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />
        ) : (
          <div className="absolute top-0 bottom-0 right-0 w-2.5 pointer-events-none z-20 border-l border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(90deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none z-20 border-t border-[#caa17d]/35" style={{ background: 'repeating-linear-gradient(180deg, #caa17d 0px, #caa17d 1.5px, #fcfaf4 1.5px, #fcfaf4 3.5px)' }} />

        <div className="flex-1 flex flex-col min-h-0 justify-start select-text overflow-hidden">
          <div className="shrink-0 mb-1">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-[16px] font-black text-[#5c2800] tracking-tight font-serif mb-0.5 uppercase leading-tight">
              {pageDataContent.title}
            </h3>
            <h4 className="text-[8px] sm:text-[8.5px] md:text-[9.5px] lg:text-[10.5px] font-black uppercase text-[#8a5a36] tracking-wider font-sans mb-0.5">
              {pageDataContent.subtitle}
            </h4>

            <div className="flex items-center gap-2 mb-1">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#8a5a36] flex-1" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#8a5a36] bg-[#dbcaa4]" />
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#8a5a36] flex-1" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start overflow-y-auto pr-1 sm:pr-2 text-scroll-mobile">
            {pageDataContent.sections ? (
              <div className={spaceYClass}>
                {pageDataContent.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="text-justify">
                    <h5 className={`${titleSizeClass} font-black text-[#6a3412] uppercase font-sans tracking-wide mb-0.5 leading-tight`}>
                      {sec.title}
                    </h5>
                    {sec.paragraphs.map((p, pIdx) => {
                      const isFirstParagraphOfWholePage = secIdx === 0 && pIdx === 0;
                      if (isFirstParagraphOfWholePage && side === 'left' && pageIndex === 0) {
                        return (
                          <p key={pIdx} className={`text-slate-800 ${textSizeClass} ${leadingClass} ${paragraphMbClass}`}>
                            <span className="float-left text-3xl sm:text-4xl font-black mr-2 mt-0.5 text-[#991b1b] font-serif leading-[0.8]">
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

        <div className="shrink-0 flex items-center justify-between pt-1 mt-1 border-t border-[#8a5a36]/25 text-[8.5px] sm:text-[9.5px] text-[#8a5a36] font-mono">
          <span>{side === 'left' ? 'CR CYBER CRIME FOUNDATION' : 'OFFICIAL COPYRIGHT POLICY'}</span>
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
    <div className="book-reader-container w-full flex flex-col justify-between py-2 px-2 sm:px-4 font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="h-full w-full flex items-center justify-center overflow-hidden">
          <img src="/Image.jpeg" alt="Watermark" className="w-full h-full object-cover opacity-[0.45]" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.04),transparent)] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center py-2 relative z-10 w-full max-w-6xl mx-auto">
        <div className="book-3d-frame relative w-full max-w-[1024px] mx-auto rounded-[28px] p-2 md:p-4 bg-gradient-to-r from-[#2c1c14] via-[#422c20] to-[#2c1c14] border-[6px] border-[#1f130e] shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] overflow-hidden">
          <div
            className={`relative z-10 w-full overflow-hidden bg-gradient-to-r from-[#e7dac1] via-[#eedbb3] to-[#e7dac1] rounded-[18px] grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} shadow-[inset_0_0_30px_rgba(95,55,14,0.15)] min-h-[440px] sm:min-h-[480px] md:min-h-[550px] lg:min-h-[580px]`}
            style={{ perspective: '1500px' }}
          >
            {!isMobile && (
              <>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-6 bg-gradient-to-r from-black/40 via-[#4e3629]/90 to-black/40 z-20 shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/50 z-30 pointer-events-none" />
              </>
            )}

            <div
              className={`relative bg-gradient-to-r from-[#dbcaa4] via-[#f7ebd0] to-[#fcfaf4] ${isMobile ? 'border-b rounded-[18px]' : 'border-r border-[#caa17d]/40 rounded-l-[18px] rounded-r-none'} flex flex-col min-h-[440px] sm:min-h-[480px] md:min-h-[550px] lg:min-h-[580px]`}
              style={isMobile ? getPageStyle('left') : {}}
            >
              {renderPageContent(
                getBackgroundCard('left'),
                'left',
                getPageNumStr(flipState === 'next' ? renderIndex : flipState === 'prev' ? renderIndex - 1 : pageIndex, 'left')
              )}
            </div>

            <div
              className={`relative bg-gradient-to-r from-[#fcfaf4] via-[#f7ebd0] to-[#dbcaa4] ${isMobile ? 'rounded-[18px]' : 'rounded-r-[18px] rounded-l-none'} flex flex-col min-h-[440px] sm:min-h-[480px] md:min-h-[550px] lg:min-h-[580px]`}
              style={isMobile ? getPageStyle('right') : {}}
            >
              {renderPageContent(
                getBackgroundCard('right'),
                'right',
                getPageNumStr(flipState === 'next' ? renderIndex + 1 : flipState === 'prev' ? renderIndex : pageIndex, 'right')
              )}
            </div>

            {!isMobile && flipState === 'next' && (
              <div
                className="absolute top-0 bottom-0 right-0 w-1/2 z-30 overflow-visible"
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

            {!isMobile && flipState === 'prev' && (
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

      <footer className="reader-footer-gsap relative z-20 max-w-6xl w-full mx-auto flex items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-200">
        <button
          onClick={handlePrevPage}
          disabled={(isMobile ? (pageIndex === 0 && activeMobilePage === 'left') : pageIndex === 0) || flipState !== 'idle'}
          className={`group px-4 py-2 rounded-xl border text-slate-700 hover:text-slate-900 font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${(isMobile ? (pageIndex === 0 && activeMobilePage === 'left') : pageIndex === 0)
            ? 'opacity-40 cursor-not-allowed border-slate-200 bg-transparent'
            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
          <span className="truncate">Previous Page</span>
        </button>

        <button
          onClick={handleNextPage}
          disabled={(isMobile ? (pageIndex === spreads.length - 1 && activeMobilePage === 'right') : pageIndex === spreads.length - 1) || flipState !== 'idle'}
          className={`group px-4 py-2 rounded-xl border text-slate-700 hover:text-slate-900 font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${(isMobile ? (pageIndex === spreads.length - 1 && activeMobilePage === 'right') : pageIndex === spreads.length - 1)
            ? 'opacity-40 cursor-not-allowed border-slate-200 bg-transparent'
            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
        >
          <span className="truncate">Next Page</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </button>
      </footer>
    </div>
  );
}
