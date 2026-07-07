import { useState } from "react";
import { legalGuidanceAndAwarnessData as pages } from "./LegalGuidance&AwarenessPageData";

/**
 * LegalGuidanceAndAwarenessPage Component
 * ---------------------------------------
 * Renders the interactive skeuomorphic "Legal Guidance & Awareness" folder.
 * Features a cardboard manila cover, 3D flip opening, metal prong fastener,
 * and clean sans-serif report pages detailing cyber laws and rights.
 */
function LegalGuidanceAndAwarenessPage() {
  // Controls the folder open/close state (false = closed, true = open)
  const [isOpen, setIsOpen] = useState(false);

  // Tracks which page is currently displayed (0-indexed)
  const [currentPage, setCurrentPage] = useState(0);

  // Animation phase: "idle" | "next-transition" | "prev-transition"
  const [phase, setPhase] = useState("idle");

  /**
   * Toggles folder open/close.
   */
  const toggleFolder = () => {
    if (isOpen) {
      // Reset to first page when closing (delayed so it happens behind the closing cover)
      setTimeout(() => setCurrentPage(0), 400);
    }
    setIsOpen(!isOpen);
  };

  /**
   * Handles "Next" page navigation.
   */
  const handleNext = (e) => {
    e.stopPropagation();
    if (phase !== "idle" || currentPage >= pages.length - 1) return;
    setPhase("next-transition");
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setPhase("idle");
    }, 800);
  };

  /**
   * Handles "Prev" page navigation.
   */
  const handlePrev = (e) => {
    e.stopPropagation();
    if (phase !== "idle" || currentPage <= 0) return;
    setPhase("prev-transition");
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setPhase("idle");
    }, 800);
  };

  /**
   * Renders the content of a single page as a clean document report.
   */
  const renderPageContent = (index) => {
    const page = pages[index];
    if (!page) return null;
    return (
      <div className="w-full h-full border border-[#2a2a2a]/30 p-6 max-sm:p-4 flex flex-col relative bg-transparent overflow-y-auto overflow-x-hidden">
        {/* Corner dots */}
        <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full border border-[#2a2a2a]/40"></div>
        <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full border border-[#2a2a2a]/40"></div>
        <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full border border-[#2a2a2a]/40"></div>
        <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full border border-[#2a2a2a]/40"></div>

        <div className="flex flex-col h-full font-sans text-[#2a2a2a] pt-2">
          <h2 className="text-[20px] max-sm:text-[16px] font-extrabold tracking-tight border-b border-[#2a2a2a]/30 pb-2 mb-4">
            {page.heading}
          </h2>
          <div className="text-[13px] max-sm:text-[11px] leading-relaxed font-medium space-y-4 text-justify">
            <p>{page.content}</p>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders the active page with turn animations.
   */
  const renderPages = () => {
    if (phase === "next-transition") {
      return (
        <>
          <div className="white-page" style={{ zIndex: 10 }}>
            {renderPageContent(currentPage + 1)}
          </div>
          <div
            className="white-page"
            style={{
              zIndex: 20,
              animation: "pullOutRight 0.8s cubic-bezier(0.4,0,0.2,1) forwards",
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
          <div className="white-page" style={{ zIndex: 10 }}>
            {renderPageContent(currentPage)}
          </div>
          <div
            className="white-page"
            style={{
              zIndex: 20,
              animation: "putBackRight 0.8s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            {renderPageContent(currentPage - 1)}
          </div>
        </>
      );
    }

    return (
      <div className="white-page" style={{ zIndex: 20 }}>
        {renderPageContent(currentPage)}
      </div>
    );
  };

  return (
    <div className="relative select-none flex flex-col items-center pt-4 pb-14 w-full max-w-full px-4">
      {/* Hero Section */}
      <div className="w-full pt-20 pb-16 px-6 flex flex-col items-center justify-center shrink-0 z-10 bg-transparent">
        <h3 className="text-[#2563EB] font-bold text-[12px] md:text-[14px] tracking-[8px] uppercase mb-4 text-center ml-[8px]">
          REPORT CRIME
        </h3>
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-black mb-6 text-[#0F172A] leading-[1.1] max-w-5xl mx-auto text-center">
          Legal Guidance & <br className="hidden md:block" /> <span className="text-[#2563EB]">Awareness</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#64748B] max-w-[850px] mx-auto leading-[1.7] font-medium text-center">
          Interactive Case File containing vital legal guidelines. Click the folder to examine the reports.
        </p>
      </div>

      {/* 3D Folder Container */}
      <div
        className={`folder-container ${isOpen ? "folder-open" : "folder-closed"}`}
        onClick={toggleFolder}
      >
        {/* ===== BACK COVER (Contains the reports & right tab) ===== */}
        <div className="folder-back-cover manila-cardboard relative">
          {/* Ultra-realistic 3D Spine for Back Cover */}
          <div className="absolute top-0 left-0 bottom-0 w-[45px] z-20 pointer-events-none mix-blend-multiply opacity-80">
            <div className="absolute inset-y-0 left-[32px] w-[8px] bg-gradient-to-r from-black/40 via-black/60 to-black/10 shadow-[1px_0_3px_rgba(255,255,255,0.3)]" />
            <div className="absolute inset-y-0 left-[40px] w-[15px] bg-gradient-to-r from-white/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-[32px] bg-gradient-to-r from-black/30 via-transparent to-black/10" />
          </div>

          {/* Folder Tab sticking out on the right (plain manila) */}
          <div className="folder-tab">
          </div>

          {/* Top Right Metal Corner (on back cover) */}
          <div className="absolute top-[-2px] right-[-2px] w-[50px] h-[50px] z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M0 0 H42 C46.418 0 50 3.582 50 8 V50 H36 V20 C36 14.477 31.523 10 26 10 H0 V0 Z" fill="url(#gold-corner-tr)" stroke="#8c6a23" strokeWidth="0.5" />
              <path d="M1 1 H42 C45.866 1 49 4.134 49 8 V49 H37 V20 C37 13.925 32.075 9 26 9 H1 V1 Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <circle cx="8" cy="5" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="43" cy="8" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="45" cy="43" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <defs>
                <linearGradient id="gold-corner-tr" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a88c5e" />
                  <stop offset="0.4" stopColor="#7a6237" />
                  <stop offset="0.8" stopColor="#54411f" />
                  <stop offset="1" stopColor="#3d2f16" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Right Metal Corner (on back cover) */}
          <div className="absolute bottom-[-2px] right-[-2px] w-[50px] h-[50px] z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M50 0 V42 C50 46.418 46.418 50 42 50 H0 V36 H20 C25.523 36 30 31.523 30 26 V0 H50 Z" fill="url(#gold-corner-br)" stroke="#8c6a23" strokeWidth="0.5" />
              <path d="M49 1 V42 C49 45.866 45.866 49 42 49 H1 V37 H20 C26.075 37 31 32.075 31 26 V1 H49 Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <circle cx="45" cy="8" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="43" cy="43" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="8" cy="45" r="2.2" fill="#5c4722" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <defs>
                <linearGradient id="gold-corner-br" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a88c5e" />
                  <stop offset="0.4" stopColor="#7a6237" />
                  <stop offset="0.8" stopColor="#54411f" />
                  <stop offset="1" stopColor="#3d2f16" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Brass Clipboard Clip (Replaces Acco Fastener) */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[140px] h-[30px] bg-gradient-to-b from-[#a88c5e] via-[#7a6237] to-[#453416] rounded-[2px] shadow-[0_5px_8px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)] z-30 flex justify-center items-end pb-[3px] border border-[#3d2f16]">
            <div className="w-[120px] h-[10px] bg-gradient-to-b from-[#8a7344] to-[#453416] rounded-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"></div>
          </div>

          {/* White pages stack */}
          <div className="white-pages">
            {/* Decorative stacked paper edges */}
            {[2, 1].map((offset) => (
              <div
                key={offset}
                className="absolute top-0 left-0 w-full h-full bg-white/90 rounded-[4px_8px_8px_4px]"
                style={{
                  transform: `translateX(${offset * 3}px) translateY(${offset * 2.5}px)`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              />
            ))}
            {/* Active page */}
            {renderPages()}
          </div>
        </div>

        {/* ===== FRONT COVER (Rotates open) ===== */}
        <div className="folder-front-cover">

          {/* INSIDE of the Front Cover (visible when opened, flipped at 180deg) */}
          <div
            className="front-cover-inside dark-green-folder flex flex-col p-0 overflow-hidden relative"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity 0s ${isOpen ? 'var(--swap-delay-open, 0.28s)' : 'var(--swap-delay-close, 0.28s)'}`
            }}
          >

            {/* Inside Stitched Border */}
            <div className="absolute inset-[12px] border-[1.5px] border-dashed border-[#1d261e] rounded-[1px] opacity-80 pointer-events-none z-10" />
            <div className="absolute inset-[10px] border-[1.5px] border-[#253227] rounded-[1px] opacity-50 pointer-events-none z-10" />

            <div className="absolute right-0 top-0 bottom-0 w-[30px] bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-40" />

            {/* 3D Hinge for Inside Cover */}
            <div className="absolute top-0 right-0 bottom-0 w-[45px] z-20 pointer-events-none">
              <div className="absolute inset-y-0 right-[32px] w-[8px] bg-gradient-to-l from-black/40 via-black/70 to-black/10 shadow-[-1px_0_3px_rgba(255,255,255,0.15)]" />
              <div className="absolute inset-y-0 right-[40px] w-[15px] bg-gradient-to-l from-white/10 to-transparent" />
            </div>

            {/* Inner Pocket Card (Beige Card) */}
            <div className="absolute top-[80px] left-[55px] w-[240px] h-[340px] bg-[#e6dbcb] shadow-[0_4px_8px_rgba(0,0,0,0.4)] border border-[#b8a486] p-6 flex flex-col items-center rounded-[2px] z-10">
              <h3 className="font-serif font-extrabold text-center text-[#2a2a2a] text-[16px] leading-tight mt-2 opacity-90">
                LEGAL GUIDANCE<br />& AWARENESS
              </h3>
              <svg className="w-9 h-9 text-[#2a2a2a] mt-4 mb-6 opacity-90 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L11 4H4V6H5.5L2 14C1.5 15.5 2.5 17 4 17C5.5 17 6.5 15.5 6 14L2.5 6H10.5V20H8V22H16V20H13.5V6H21.5L18 14C17.5 15.5 18.5 17 20 17C21.5 17 22.5 15.5 22 14L18.5 6H20V4H13L12 2ZM4.25 15C3.7 15 3.5 14.5 3.75 14L6 8.5L8.25 14C8.5 14.5 8.3 15 7.75 15H4.25ZM16.25 15C15.7 15 15.5 14.5 15.75 14L18 8.5L20.25 14C20.5 14.5 20.3 15 19.75 15H16.25Z" />
              </svg>
              <div className="w-full mt-6 space-y-6 font-sans text-[12px] text-[#2a2a2a] font-bold opacity-80">
                <div className="flex items-end">
                  <span className="w-[60px] tracking-wider">CASE ID :</span>
                  <span className="flex-1 border-b border-[#2a2a2a]/40 ml-2"></span>
                </div>
                <div className="flex items-end">
                  <span className="w-[60px] tracking-wider">DATE :</span>
                  <span className="flex-1 border-b border-[#2a2a2a]/40 ml-2"></span>
                </div>
                <div className="pt-6 border-b border-[#2a2a2a]/40 w-full h-[15px]"></div>
                <div className="border-b border-[#2a2a2a]/40 w-full h-[15px]"></div>
                <div className="border-b border-[#2a2a2a]/40 w-full h-[15px]"></div>
              </div>
            </div>

            {/* Slanted Pocket */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[260px] dark-green-folder border-t border-[#1e2620] shadow-[0_-4px_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ clipPath: "polygon(0 0, 100% 70%, 100% 100%, 0 100%)" }}
            >
              {/* Stitching on the slanted pocket edge */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="0" y1="0" x2="410" y2="182" stroke="#1d261e" strokeWidth="2" strokeDasharray="5 3" />
                <line x1="0" y1="2" x2="410" y2="184" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </svg>
            </div>

            {/* Brown Sticker on the pocket */}
            <div className="absolute bottom-[40px] left-[40px] w-[145px] h-[125px] bg-[#a8824f] shadow-[0_2px_5px_rgba(0,0,0,0.5)] rounded-[4px] z-30 p-4 flex flex-col items-center justify-center">
              {/* Stitched Border */}
              <div className="absolute inset-[5px] border-[0.5px] border-[#4a361c]/50 rounded-[2px] pointer-events-none"></div>

              <div className="font-sans font-bold text-[#2a2a2a] text-[10px] tracking-widest border-b-[1px] border-[#2a2a2a]/30 pb-[3px] mb-2.5 w-[80%] text-center opacity-90 z-10">
                IMPORTANT
              </div>
              <ul className="text-[10px] font-sans font-medium text-[#2a2a2a] space-y-[7px] w-full pl-3 pr-1 opacity-90 leading-tight z-10">
                <li className="flex gap-1.5"><span className="text-[8px] pt-[2px]">⚫</span> Know Your Rights</li>
                <li className="flex gap-1.5"><span className="text-[8px] pt-[2px]">⚫</span> Understand The Law</li>
                <li className="flex gap-1.5"><span className="text-[8px] pt-[2px]">⚫</span> Take Right Action</li>
                <li className="flex gap-1.5"><span className="text-[8px] pt-[2px]">⚫</span> Stay Protected</li>
              </ul>
              {/* Rivets on the border corners */}
              <div className="absolute top-[3.5px] left-[3.5px] w-[2.5px] h-[2.5px] rounded-full bg-[#2a1d0d] shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
              <div className="absolute top-[3.5px] right-[3.5px] w-[2.5px] h-[2.5px] rounded-full bg-[#2a1d0d] shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
              <div className="absolute bottom-[3.5px] left-[3.5px] w-[2.5px] h-[2.5px] rounded-full bg-[#2a1d0d] shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
              <div className="absolute bottom-[3.5px] right-[3.5px] w-[2.5px] h-[2.5px] rounded-full bg-[#2a1d0d] shadow-[0_1px_1px_rgba(255,255,255,0.3)]"></div>
            </div>
          </div>

          {/* OUTSIDE of the Front Cover (visible when closed) */}
          <div
            className="folder-front-cover-content dark-green-folder flex flex-col justify-between py-12 px-8 h-full w-full relative z-10 pointer-events-none"
            style={{
              opacity: isOpen ? 0 : 1,
              transition: `opacity 0s ${isOpen ? 'var(--swap-delay-open, 0.28s)' : 'var(--swap-delay-close, 0.28s)'}`
            }}
          >

            {/* Ultra-realistic 3D Spine Binding */}
            <div className="absolute top-0 left-0 bottom-0 w-[45px] z-20 pointer-events-none">
              {/* Edge rounding shadow */}
              <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/60 to-transparent" />
              {/* Edge highlight */}
              <div className="absolute inset-y-0 left-[1px] w-[4px] bg-gradient-to-r from-white/20 to-transparent" />

              {/* Main spine bulge */}
              <div className="absolute inset-y-0 left-[6px] w-[26px] bg-gradient-to-r from-transparent via-white/5 to-black/30" />

              {/* Deep hinge crease (The indent) */}
              <div className="absolute inset-y-0 left-[32px] w-[8px] bg-gradient-to-r from-black/50 via-black/80 to-black/20 shadow-[1px_0_4px_rgba(255,255,255,0.15)]" />

              {/* Cover bulge after hinge */}
              <div className="absolute inset-y-0 left-[40px] w-[15px] bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* Background Embossed Lines & 3D Bevel Edge */}
            <svg className="absolute inset-0 w-full h-full opacity-70 z-10 pointer-events-none">
              {/* 3D Bevel for the cut edges (creates thickness) */}
              <polyline points="320,0 410,90 410,510 390,530 0,530" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="4" strokeLinejoin="round" />
              <polyline points="0,530 0,0 320,0" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinejoin="round" />

              {/* Edge Hem / Stitching Groove */}
              <g className="opacity-90">
                <polygon points="45,6 314,6 404,96 404,504 384,524 45,524" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" transform="translate(0.5, 0.5)" strokeLinejoin="round" />
                <polygon points="45,6 314,6 404,96 404,504 384,524 45,524" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="45,6 314,6 404,96 404,504 384,524 45,524" fill="none" stroke="#1d261e" strokeWidth="1.2" strokeDasharray="4 2" strokeLinejoin="round" />
              </g>

              {/* Top Left Diagonal */}
              <line x1="45" y1="120" x2="320" y2="0" stroke="#1c241e" strokeWidth="2.5" />
              <line x1="45" y1="122" x2="320" y2="2" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              {/* Bottom Left Horizontals */}
              <line x1="45" y1="465" x2="225" y2="465" stroke="#1c241e" strokeWidth="2.5" />
              <line x1="45" y1="467" x2="225" y2="467" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="45" y1="495" x2="225" y2="495" stroke="#1c241e" strokeWidth="2.5" />
              <line x1="45" y1="497" x2="225" y2="497" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </svg>

            {/* Center Metal Label Holder */}
            <div className="absolute top-[130px] left-[70px] w-[260px] h-[130px] bg-gradient-to-br from-[#a68958] via-[#7a6135] to-[#403117] rounded-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.4)] p-[12px] flex items-center justify-center z-10 border border-[#1f1606] pointer-events-auto">
              {/* Decorative Side Knobs/Indentations */}
              <div className="absolute -left-[8px] top-1/2 -translate-y-1/2 w-[16px] h-[36px] bg-gradient-to-r from-[#a68958] to-[#7a6135] rounded-l-[18px] border border-r-0 border-[#2b200b] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] border border-[#2a1a02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="absolute -right-[8px] top-1/2 -translate-y-1/2 w-[16px] h-[36px] bg-gradient-to-l from-[#403117] to-[#7a6135] rounded-r-[18px] border border-l-0 border-[#2b200b] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] border border-[#2a1a02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)]"></div>
              </div>

              {/* Corner Rivets */}
              <div className="absolute left-[8px] top-[10px] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)] border border-[#2a1a02]"></div>
              <div className="absolute left-[8px] bottom-[10px] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)] border border-[#2a1a02]"></div>
              <div className="absolute right-[8px] top-[10px] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)] border border-[#2a1a02]"></div>
              <div className="absolute right-[8px] bottom-[10px] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#9c7e48] to-[#3a2505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.5)] border border-[#2a1a02]"></div>

              {/* Inner paper */}
              <div className="w-full h-full bg-[#cfb591] rounded-[2px] shadow-[inset_0_6px_12px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.25)] p-4 flex flex-col items-center justify-center relative overflow-hidden border border-[#2b200b]">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.15%22/%3E%3C/svg%3E')] opacity-70 mix-blend-multiply"></div>

                <h2 className="text-[#1a1c1a] font-serif font-black text-[18px] leading-[1.3] text-center tracking-wide z-10 drop-shadow-[0_0.5px_0_rgba(255,255,255,0.4)] mt-2">
                  LEGAL GUIDANCE<br />& AWARENESS
                </h2>

                {/* Divider with scales */}
                <div className="flex items-center gap-4 mt-5 w-[90%] justify-center z-10 opacity-85">
                  <div className="h-[1.5px] flex-1 bg-[#1a1c1a] shadow-[0_0.5px_0_rgba(255,255,255,0.5)]"></div>
                  <svg className="w-9 h-9 text-[#1a1c1a] fill-current drop-shadow-[0_0.5px_0_rgba(255,255,255,0.5)]" viewBox="0 0 24 24">
                    <path d="M12 2L11 4H4V6H5.5L2 14C1.5 15.5 2.5 17 4 17C5.5 17 6.5 15.5 6 14L2.5 6H10.5V20H8V22H16V20H13.5V6H21.5L18 14C17.5 15.5 18.5 17 20 17C21.5 17 22.5 15.5 22 14L18.5 6H20V4H13L12 2ZM4.25 15C3.7 15 3.5 14.5 3.75 14L6 8.5L8.25 14C8.5 14.5 8.3 15 7.75 15H4.25ZM16.25 15C15.7 15 15.5 14.5 15.75 14L18 8.5L20.25 14C20.5 14.5 20.3 15 19.75 15H16.25Z" />
                  </svg>
                  <div className="h-[1.5px] flex-1 bg-[#1a1c1a] shadow-[0_0.5px_0_rgba(255,255,255,0.5)]"></div>
                </div>
              </div>
            </div>

            {/* Bottom Right Gold Stamp */}
            <div className="absolute bottom-[40px] right-[40px] w-[110px] h-[110px] rounded-full border-[1.5px] border-[#8a7243] opacity-90 mix-blend-color-dodge flex items-center justify-center shadow-[inset_0_0_8px_rgba(138,114,67,0.4),0_0_8px_rgba(138,114,67,0.4)] z-10 pointer-events-none">
              <div className="absolute inset-[23px] rounded-full border-[1.2px] border-[#8a7243]"></div>
              <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] text-[#8a7243] fill-current drop-shadow-[0_0_2px_rgba(138,114,67,0.5)]">
                <path id="stamp-text-path-top" d="M 12 50 A 38 38 0 1 1 88 50" fill="none" />
                <path id="stamp-text-path-bottom" d="M 88 50 A 38 38 0 0 1 12 50" fill="none" />

                <text className="font-serif font-black text-[12px] tracking-[0.18em]">
                  <textPath href="#stamp-text-path-top" startOffset="50%" textAnchor="middle">KNOWLEDGE</textPath>
                </text>
                <text className="font-serif font-black text-[12.5px] tracking-[0.2em]">
                  <textPath href="#stamp-text-path-bottom" startOffset="50%" textAnchor="middle">PROTECTION</textPath>
                </text>
              </svg>
              <div className="absolute font-serif font-black text-[#8a7243] text-[13px] tracking-[0.15em] drop-shadow-[0_0_2px_rgba(138,114,67,0.5)] pt-0.5">- IS -</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {isOpen && (
        <div className="flex items-center justify-between w-[380px] max-sm:w-[290px] mt-8 max-sm:mt-14 select-none">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="retro-btn"
          >
            ◀ PREV
          </button>
          <span className="text-xs max-sm:text-[10px] text-slate-800 font-bold font-courier tracking-widest whitespace-nowrap">
            REPORT {currentPage + 1} / {pages.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className="retro-btn"
          >
            NEXT ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default LegalGuidanceAndAwarenessPage;
