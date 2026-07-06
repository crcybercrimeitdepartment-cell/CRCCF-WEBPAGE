import { useState } from "react";
import pages from "./CyberSecurityTipsPageData";

/**
 * Folder Component
 * -----------------
 * Interactive skeuomorphic leather folder that opens/closes with a click.
 * Contains white pages with cyber security tip content.
 * Navigation via Prev/Next buttons outside the folder.
 *
 * Features:
 *  - Front cover with gold foil text and SVG shield icon
 *  - Leather strap with 2 metal snap buttons (front + back edge)
 *  - Page turn animations (next pulls right, prev pulls back)
 *  - Responsive: desktop opens flat (180deg), mobile opens half (90deg)
 *  - backface-visibility: hidden hides cover text from behind
 */
function CyberSecurityTipsPage() {
  // Controls the folder open/close state (false = closed, true = open)
  const [isOpen, setIsOpen] = useState(false);

  // Controls the front/back strap visibility (false = strap closed, true = strap open)
  const [isStrapOpen, setIsStrapOpen] = useState(false);

  // Tracks which page is currently displayed (0-indexed)
  const [currentPage, setCurrentPage] = useState(0);

  // Animation phase: "idle" | "next-transition" | "prev-transition"
  // Prevents rapid clicks during page turn animation
  const [phase, setPhase] = useState("idle");

  /**
   * Detects if viewport width is 480px or less (mobile breakpoint).
   * Used to adjust folder rotation angle and animation timing.
   */
  const isMobile = () => window.innerWidth <= 480;

  /**
   * Toggles folder open/close.
   * - Opening: strap opens first, then cover opens after delay.
   * - Closing: cover closes first, then strap closes after delay.
   * - Prevents double-toggle during transition.
   */
  const toggleFolder = () => {
    if (isOpen !== isStrapOpen) return;

    // Mobile needs longer delays due to 90deg rotation
    const openDelay = isMobile() ? 500 : 350;
    const closeDelay = isMobile() ? 2100 : 850;

    if (!isOpen) {
      setIsStrapOpen(true);
      setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    } else {
      setIsOpen(false);
      setTimeout(() => {
        setIsStrapOpen(false);
      }, closeDelay);
    }
  };

  /**
   * Handles "Next" page navigation.
   * - Only works when idle and not on last page.
   * - Triggers pullOutRight animation on current page.
   * - After 400ms, advances to next page and resets to idle.
   */
  const handleNext = (e) => {
    e.stopPropagation();
    if (phase !== "idle" || currentPage >= pages.length - 1) return;
    setPhase("next-transition");
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setPhase("idle");
    }, 400);
  };

  /**
   * Handles "Prev" page navigation.
   * - Only works when idle and not on first page.
   * - Triggers putBackRight animation (reverse page turn).
   * - After 400ms, goes back to previous page and resets to idle.
   */
  const handlePrev = (e) => {
    e.stopPropagation();
    if (phase !== "idle" || currentPage <= 0) return;
    setPhase("prev-transition");
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setPhase("idle");
    }, 400);
  };

  /**
   * Renders the content of a single page (heading + text lines).
   * Used by renderPages() for current, next, and previous pages.
   */
  const renderPageContent = (index) => {
    const page = pages[index];
    if (!page) return null;
    return (
      <div className="flex flex-col gap-3.5 pt-2 -webkit-font-smoothing-antialiased">
        <h2 className="text-2xl font-oswald font-bold text-[#582b14] mb-3 tracking-wide">
          {page.heading}
        </h2>
        <div className="font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-sm text-[#6b5b4a] leading-[1.9] space-y-1 tracking-[0.01em]">
          {page.lines.map((line, j) => (
            <p key={j}>{line}</p>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Renders the active page with transition animation.
   * - next-transition: current page pulls out right, next page revealed underneath.
   * - prev-transition: previous page pulls back in from right (reverse animation).
   * - idle: single page displayed normally.
   */
  const renderPages = () => {
    if (phase === "next-transition") {
      return (
        <>
          {/* Underneath page (next page revealed) */}
          <div className="white-page" style={{ zIndex: 10 }}>
            {renderPageContent(currentPage + 1)}
          </div>
          {/* Top page (current page sliding out right) */}
          <div
            className="white-page"
            style={{
              zIndex: 20,
              animation: "pullOutRight 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            {renderPageContent(currentPage)}
          </div>
        </>
      );
    }

    if (phase === "prev-transition") {
      return (
        <>
          {/* Underneath page (current page stays) */}
          <div className="white-page" style={{ zIndex: 10 }}>
            {renderPageContent(currentPage)}
          </div>
          {/* Top page (previous page sliding in from right) */}
          <div
            className="white-page"
            style={{
              zIndex: 20,
              animation: "putBackRight 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            {renderPageContent(currentPage - 1)}
          </div>
        </>
      );
    }

    // Default/idle state: single page displayed
    return (
      <div className="white-page" style={{ zIndex: 20 }}>
        {renderPageContent(currentPage)}
      </div>
    );
  };

  return (
    <div className="relative select-none flex flex-col items-center cyber-security-wrapper" style={{ perspective: "1200px" }}>
      {/* Header: Project title with blue gradient */}
      <h1 className="font-oswald font-extrabold text-[48px] max-md:text-[28px] max-sm:text-[24px] tracking-[0.03em] mb-4 text-center whitespace-nowrap" style={{ background: "linear-gradient(135deg, #4a90d9 0%, #1a5fb4 50%, #003d99 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>Cyber Security Tips</h1>
      {/* Subtitle description */}
      <p className="font-lora text-[17px] max-md:text-[15px] text-gray-700 text-center mb-12 max-md:mb-26 max-w-[500px] leading-relaxed tracking-wide">Stay safe online with essential cyber security awareness. Learn how to protect yourself from phishing, malware, and online fraud.</p>

      {/* Wrapper to center the open folder (shifts right by half width on desktop) */}
      <div 
        className="flex flex-col items-center"
        style={{ 
          transform: isOpen && !isMobile() ? "translateX(215px)" : "translateX(0)",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {/* Folder container: click to open/close, applies open/closed/strap classes */}
        <div
        className={`folder-container ${isOpen ? "folder-open" : "folder-closed"} ${isStrapOpen ? "strap-open" : "strap-closed"}`}
        onClick={toggleFolder}
      >
        {/* ===== Back Cover ===== */}
        <div className="folder-back-cover relative">
          {/* Leather texture overlay for back cover */}
          <div className="absolute inset-0 leather-notebook-back rounded-[inherit] z-10" />



          {/* White pages stack inside back cover */}
          <div className="white-pages z-20">
            {/* Decorative stacked page edges (offset rectangles behind main page) */}
            {[3, 2, 1].map((offset) => (
              <div
                key={offset}
                className="absolute top-0 left-0 w-full h-full bg-white/90 rounded-[4px_8px_8px_4px]"
                style={{
                  transform: `translateX(${offset * 4}px) translateY(${offset * 3}px)`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              />
            ))}
            {/* Active page with animation */}
            {renderPages()}
          </div>
        </div>

        {/* ===== Front Cover ===== */}
        <div className="folder-front-cover leather-notebook">
          {/* Spine shadow and highlight lines */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/35 via-black/15 to-transparent z-10" />
          <div className="absolute left-[26px] top-0 bottom-0 w-[1px] bg-black/25 z-10" />

          {/* SVG stitching border on front cover */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] z-10">
            <rect x="26" y="12" width="calc(100% - 38px)" height="calc(100% - 24px)" rx="8" ry="8" fill="none" stroke="rgba(0, 0, 0, 0.42)" strokeWidth="1.2" />
            <rect x="27" y="13" width="calc(100% - 40px)" height="calc(100% - 26px)" rx="7" ry="7" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <rect x="28.5" y="14.5" width="calc(100% - 43px)" height="calc(100% - 29px)" rx="6" ry="6" fill="none" stroke="#b88e4c" strokeWidth="1.3" strokeDasharray="5 3" opacity="0.75" />
          </svg>


          {/* Front cover content: hidden via backface-visibility when folder is open */}
          {/* Inside of front cover: wallet-style card slots */}
          <div className="front-cover-inside z-1">
            <div className="wallet-slots">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="wallet-slot" />
              ))}
            </div>
          </div>

          <div className="folder-front-cover-content">
            <div className="w-full h-full flex flex-col justify-between items-center py-16 px-10 relative z-10">
              {/* Gold foil title */}
              <div className="flex flex-col items-center text-center mt-2">
                <h1 className="font-oswald font-bold text-[48px] tracking-[0.03em] leading-[1.05] gold-foil-text">Cyber Security Tips</h1>
              </div>
              {/* SVG shield icon with gold foil gradient */}
              <div className="my-auto flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-[72px] h-[72px] filter drop-shadow-[0_-1px_0px_rgba(0,0,0,0.75)] drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
                  <defs>
                    <linearGradient id="gold-foil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f7dfb3" />
                      <stop offset="40%" stopColor="#d5b06d" />
                      <stop offset="75%" stopColor="#bc9451" />
                      <stop offset="100%" stopColor="#886022" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="34" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.8" />
                  <path d="M 50 32 C 58 32 62.5 29 62.5 29 C 62.5 29 62.5 42 62.5 49 C 62.5 58 50 64.5 50 64.5 C 50 64.5 37.5 58 37.5 49 C 37.5 42 37.5 29 37.5 29 C 37.5 29 42 32 50 32 Z" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M 50 36.5 L 50 56.5" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 44.5 42.5 L 55.5 42.5" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 46.5 56.5 L 53.5 56.5" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 44.5 42.5 L 42 48.5 M 42 48.5 L 47 48.5 Z" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M 55.5 42.5 L 58 48.5 M 58 48.5 L 53 48.5 Z" fill="none" stroke="url(#gold-foil-grad)" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Gold foil taglines */}
              <div className="flex flex-col items-center text-center mb-1">
                <p className="font-lora italic text-[15px] font-normal tracking-[0.03em] gold-foil-text-tagline mb-1.5 opacity-90">We are here to help you.</p>
                <p className="font-lora italic text-[15px] font-normal tracking-[0.03em] gold-foil-text-tagline opacity-90">Report. Support. Recover.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back edge strap: acts as the main strap, sits on top of front cover when closed, swings right when open */}
        <div className="back-edge-strap">
          <div className="leather-strap rounded-l-2xl h-full flex items-center pl-[22px] gap-3 relative">
            {/* SVG stitching detail on strap */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-l-[inherit]">
              <path d="M 115 6 L 22 6 A 16 16 0 0 0 22 38 L 115 38" fill="none" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="1.2" />
              <path d="M 115 7 L 22 7 A 15 15 0 0 0 22 37 L 115 37" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
              <path d="M 115 8.5 L 22 8.5 A 13.5 13.5 0 0 0 22 35.5 L 115 35.5" fill="none" stroke="#b88e4c" strokeWidth="1.3" strokeDasharray="5 3" opacity="0.8" />
            </svg>
            {/* Metal snap button 1 */}
            <div className="metal-snap w-[24px] h-[24px] rounded-full flex items-center justify-center relative z-30">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#1e1711] opacity-75">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 5v2.5M12 16.5v2.5M5 12h2.5M16.5 12h2.5" stroke="#1e1711" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Metal snap button 2 */}
            <div className="metal-snap w-[24px] h-[24px] rounded-full flex items-center justify-center relative z-30">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#1e1711] opacity-75">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 5v2.5M12 16.5v2.5M5 12h2.5M16.5 12h2.5" stroke="#1e1711" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Navigation buttons: outside the folder, visible only when open */}
      {isOpen && (
        <div className="flex items-center justify-between w-[300px] mt-8">
          {/* Previous button: disabled (grey) on first page */}
          <button onClick={handlePrev} disabled={currentPage === 0} className={`text-[13px] font-bold px-4 py-1.5 rounded-lg transition-all shadow-lg cursor-pointer ${currentPage === 0 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#582b14] text-[#ecd3a5] hover:bg-[#6a3a1f] active:scale-95"}`}>
            {"< Prev"}
          </button>
          {/* Page counter */}
          <span className="text-[12px] text-[#582b14] font-semibold italic">{currentPage + 1} / {pages.length}</span>
          {/* Next button: disabled (grey) on last page */}
          <button onClick={handleNext} disabled={currentPage === pages.length - 1} className={`text-[13px] font-bold px-4 py-1.5 rounded-lg transition-all shadow-lg cursor-pointer ${currentPage === pages.length - 1 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#582b14] text-[#ecd3a5] hover:bg-[#6a3a1f] active:scale-95"}`}>
            {"Next >"}
          </button>
        </div>
      )}

      <style>{`
        /* Scoped CSS for Cyber Security Tips Leather Notebook */
        .cyber-security-wrapper {
          -webkit-font-smoothing: antialiased;
        }
        
        .cyber-security-wrapper .folder-container {
          position: relative;
          width: 440px;
          height: 580px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          margin: 0 auto;
        }

        .cyber-security-wrapper .folder-open { transform: rotateY(0deg); }
        .cyber-security-wrapper .folder-closed { transform: rotateY(0deg); }

        /* Back Cover */
        .cyber-security-wrapper .folder-back-cover {
          position: absolute;
          inset: 0;
          width: 440px;
          border-radius: 4px 12px 12px 4px;
          z-index: 1;
          background: #3e2723;
          box-shadow: 
            25px 25px 40px -10px rgba(0,0,0,0.4), 
            inset 0 1px 1px rgba(255,255,255,0.1);
        }

        .cyber-security-wrapper .leather-notebook-back {
          background-color: #4e342e;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
          box-shadow: inset -3px 0 10px rgba(0,0,0,0.5);
        }

        /* Front Cover */
        .cyber-security-wrapper .folder-front-cover {
          position: absolute;
          inset: 0;
          width: 440px;
          border-radius: 12px 4px 4px 12px;
          transform-origin: left center;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 50;
          transform-style: preserve-3d;
          box-shadow: 5px 0 15px rgba(0,0,0,0.3);
        }

        .cyber-security-wrapper .folder-open .folder-front-cover {
          transform: rotateY(-180deg);
        }

        .cyber-security-wrapper .leather-notebook {
          background-color: #4e342e;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.05) 5%, transparent 20%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
        }

        .cyber-security-wrapper .folder-front-cover-content {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .cyber-security-wrapper .front-cover-inside {
          position: absolute;
          inset: 0;
          border-radius: 12px 4px 4px 12px;
          transform: rotateY(180deg);
          background: #2e1d16;
          box-shadow: inset 10px 0 20px rgba(0,0,0,0.6);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 20px;
        }

        .cyber-security-wrapper .wallet-slots {
          width: 120px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cyber-security-wrapper .wallet-slot {
          height: 60px;
          background: #3e2723;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
          border-top: 1px solid rgba(0,0,0,0.8);
        }

        /* Leather Straps */
        .cyber-security-wrapper .leather-strap {
          background-color: #3e2723;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
          box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
        }


        .cyber-security-wrapper .back-edge-strap {
          position: absolute;
          right: -12px;
          top: 48%;
          transform: translateY(-50%);
          transform-origin: calc(100% - 12px) center;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 115px;
          height: 44px;
          z-index: 60;
        }

        .cyber-security-wrapper .strap-open .back-edge-strap {
          transform: translateY(-50%) rotateY(180deg);
        }

        .cyber-security-wrapper .metal-snap {
          background: linear-gradient(135deg, #d4af37 0%, #aa7c11 100%);
          box-shadow: 
            0 2px 4px rgba(0,0,0,0.4), 
            inset 0 1px 2px rgba(255,255,255,0.6), 
            inset 0 -1px 2px rgba(0,0,0,0.4);
          border: 1px solid #8c6610;
        }

        /* White Pages */
        .cyber-security-wrapper .white-pages {
          position: absolute;
          top: 15px;
          left: 45px;
          right: 15px;
          bottom: 15px;
          z-index: 20;
        }

        .cyber-security-wrapper .white-page {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ffffff 0%, #fcfbf9 60%, #f4f1ea 100%);
          border-radius: 2px 8px 8px 2px;
          box-shadow: 
            0 2px 5px rgba(0,0,0,0.15),
            inset 5px 0 15px rgba(0,0,0,0.03);
          padding: 40px 30px 30px 40px;
          overflow-y: auto;
        }

        /* Typography & Gold Foil */
        .cyber-security-wrapper .gold-foil-text {
          background: linear-gradient(135deg, #f7dfb3 0%, #d5b06d 40%, #bc9451 75%, #886022 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
        }

        .cyber-security-wrapper .gold-foil-text-tagline {
          color: #d5b06d;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        /* Page Transitions */
        @keyframes pullOutRight {
          0% { transform: translateX(0) rotateZ(0); opacity: 1; }
          30% { transform: translateX(-20px) rotateZ(-1deg); opacity: 1; }
          100% { transform: translateX(80px) translateY(160px) rotateZ(-5deg); opacity: 0; }
        }

        @keyframes putBackRight {
          0% { transform: translateX(80px) translateY(160px) rotateZ(-5deg); opacity: 0; }
          70% { transform: translateX(-20px) rotateZ(-1deg); opacity: 1; }
          100% { transform: translateX(0) rotateZ(0); opacity: 1; }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .cyber-security-wrapper .folder-container {
            width: 340px;
            height: 480px;
          }
          .cyber-security-wrapper .folder-back-cover,
          .cyber-security-wrapper .folder-front-cover {
            width: 340px;
          }
          .cyber-security-wrapper .white-page {
            padding: 30px 20px 20px 30px;
          }
        }

        @media (max-width: 480px) {
          .cyber-security-wrapper .folder-container {
            width: 290px;
            height: 400px;
          }
          .cyber-security-wrapper .folder-back-cover,
          .cyber-security-wrapper .folder-front-cover {
            width: 290px;
          }
          .cyber-security-wrapper .folder-open .folder-front-cover { 
            transform: rotateY(-90deg); 
          }
          .cyber-security-wrapper .white-pages {
            left: 25px;
            right: 10px;
            top: 10px;
            bottom: 10px;
          }
          .cyber-security-wrapper .white-page {
            padding: 20px 15px 15px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default CyberSecurityTipsPage;
