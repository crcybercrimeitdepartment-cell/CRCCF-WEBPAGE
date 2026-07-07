import { useState } from "react";
import { onlineSafetyTipsData as pages } from "./Awareness&PreventionTipsPageData";

/**
 * CyberSecurityTipsPage Component
 * ---------------------------------
 * Renders the interactive skeuomorphic "Awareness & Prevention Tips" folder.
 * Features a cardboard manila cover, 3D flip opening, metal prong fastener,
 * inside contents index table, and clean sans-serif report pages.
 */
function AwarenessPreventionTipsPage() {
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
    }, 400);
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
    }, 400);
  };

  /**
   * Renders the content of a single page as a clean document report.
   */
  const renderPageContent = (index) => {
    const page = pages[index];
    if (!page) return null;
    return (
      <div className="flex flex-col h-full font-sans -webkit-font-smoothing-antialiased text-slate-800">
        {/* Page Heading */}
        <h2 className="text-[22px] max-sm:text-[18px] font-extrabold tracking-tight text-slate-900 border-b border-slate-200 pb-2.5 mb-5 font-sans">
          {page.heading}
        </h2>

        {/* Content Details */}
        <div className="text-[12.5px] max-sm:text-[11.5px] leading-relaxed text-slate-700 font-sans space-y-4 text-justify">
          {page.content ? page.content.split('\n').map((paragraph, i) => 
            paragraph.trim() ? <p key={i} className="leading-relaxed">{paragraph}</p> : null
          ) : <p className="leading-relaxed">{page.lines ? page.lines.join(" ") : ""}</p>}
          {page.tagline && (
            <p className="mt-4 italic text-[11.5px] text-slate-600 font-bold text-center">
              {page.tagline}
            </p>
          )}
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
          <div className="white-page" style={{ zIndex: 10 }}>
            {renderPageContent(currentPage)}
          </div>
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

    return (
      <div className="white-page" style={{ zIndex: 20 }}>
        {renderPageContent(currentPage)}
      </div>
    );
  };

  return (
    <div className="awareness-wrapper min-h-screen flex items-center justify-center">
    <div className="relative select-none flex flex-col items-center pt-4 pb-14 w-full max-w-full px-4" style={{ perspective: "1200px" }}>
      {/* Hero Section */}
      <div className="w-full pt-20 pb-16 px-6 flex flex-col items-center justify-center shrink-0 z-10 bg-transparent">
        <h3 className="text-[#2563EB] font-bold text-[12px] md:text-[14px] tracking-[8px] uppercase mb-4 text-center ml-[8px]">
          REPORT CRIME
        </h3>
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-black mb-6 text-[#0F172A] leading-[1.1] max-w-5xl mx-auto text-center">
          Awareness & <br className="hidden md:block" /> <span className="text-[#2563EB]">Prevention Tips</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#64748B] max-w-[850px] mx-auto leading-[1.7] font-medium text-center">
          Interactive Case File containing vital safety guidelines. Click the folder to examine the reports.
        </p>
      </div>

      {/* 3D Folder Container */}
      <div
        className={`folder-container ${isOpen ? "folder-open" : "folder-closed"}`}
        onClick={toggleFolder}
      >
        {/* ===== BACK COVER (Contains the reports & right tab) ===== */}
        <div className="folder-back-cover manila-cardboard relative">
          {/* Creases shadow and highlights */}
          <div className="spine-creases" />

          {/* Folder Tab sticking out on the right */}
          <div className="folder-tab">
            {/* White Sticker Label */}
            <div className="folder-tab-label">
              <div className="label-line line-case">REPORT FILE</div>
              <div className="label-line line-name">TIPS</div>
              <div className="label-line line-dept">AWARENESS & PREVENTION</div>
            </div>
          </div>

          {/* Acco Metal Fastener (Visual Binder) */}
          <div className="prong-fastener" />
          <div className="punch-hole-left" />
          <div className="punch-hole-right" />
          <div className="metal-prong-left" />
          <div className="metal-prong-right" />

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
        <div className="folder-front-cover manila-cardboard">
          {/* Spine crease texture lines */}
          <div className="spine-creases" />
          <div className="absolute left-[36px] top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/20 via-black/8 to-transparent z-10" />

          {/* INSIDE of the Front Cover (visible when opened, flipped at 180deg) */}
          <div className="front-cover-inside manila-cardboard flex flex-col justify-between p-8">
            <div className="absolute right-0 top-0 bottom-0 w-[15px] bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />

            {/* Blue Information stamp */}
            <div className="my-auto flex flex-col items-center justify-center gap-4">
              <div className="stamp-blue">
                INFORMATION FILE
              </div>
              <div className="stamp-black mt-2">
                CRCCF PORTAL • PUBLIC DISTRIBUTION
              </div>
            </div>

            {/* Index of contents pasted inside */}
            <div className="bg-[#faf6ee] p-5 border border-slate-400 rounded-sm shadow-sm font-courier text-slate-800 text-[10px] w-full mt-auto">
              <div className="text-center font-bold border-b-2 border-slate-800 pb-1.5 mb-2.5">
                INDEX OF CONTENTS
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="font-bold py-1.5 pr-2 w-[15%]">01.</td>
                    <td className="py-1.5 text-slate-900 font-semibold">PROTECT PERSONAL DATA</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="font-bold py-1.5 pr-2">02.</td>
                    <td className="py-1.5 text-slate-900 font-semibold">CAUTIOUS ON SOCIAL MEDIA</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="font-bold py-1.5 pr-2">03.</td>
                    <td className="py-1.5 text-slate-900 font-semibold">BEWARE OF PHISHING SCAMS</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="font-bold py-1.5 pr-2">04.</td>
                    <td className="py-1.5 text-slate-900 font-semibold">WORKPLACE CYBER ETHICS</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-1.5 pr-2">05.</td>
                    <td className="py-1.5 text-slate-900 font-semibold">SAFETY FOR WOMEN & CHILDREN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* OUTSIDE of the Front Cover (visible when closed) */}
          <div className="folder-front-cover-content flex flex-col justify-between py-12 px-8 h-full w-full relative z-10">
            {/* Top-left small category tag */}
            <div className="text-left pl-6 select-none mt-2 font-courier font-bold text-[9.5px] text-slate-800 tracking-wider">
              <span className="border border-slate-800 px-2 py-0.5 rounded-sm bg-slate-900 text-[#dfbe93]">INFO-SEC / 2026</span>
            </div>

            {/* Stamped Security Seal */}
            <div className="flex flex-col items-center justify-center my-auto">
              <svg viewBox="0 0 100 100" className="w-[125px] h-[125px] text-slate-850 stroke-slate-850 fill-none opacity-80 mix-blend-multiply mb-5 shrink-0">
                {/* Outer borders */}
                <circle cx="50" cy="50" r="48" strokeWidth="1.2" stroke="currentColor" />
                <circle cx="50" cy="50" r="44.5" strokeWidth="0.6" strokeDasharray="1.5 1.5" stroke="currentColor" />
                <circle cx="50" cy="50" r="34" strokeWidth="0.8" stroke="currentColor" />

                {/* Paths for text curving */}
                <path id="seal-text-path" d="M 12 50 A 38 38 0 1 1 88 50" fill="none" />
                <path id="seal-bottom-path" d="M 88 50 A 38 38 0 0 1 12 50" fill="none" />

                <text className="font-sans font-bold text-[5.8px] fill-slate-800 tracking-wider">
                  <textPath href="#seal-text-path" startOffset="50%" textAnchor="middle">
                    AWARENESS & PREVENTION TIPS
                  </textPath>
                </text>

                <text className="font-sans font-bold text-[6px] fill-slate-800 tracking-widest">
                  <textPath href="#seal-bottom-path" startOffset="50%" textAnchor="middle">
                    SECURE • PROTECT • PREVENT
                  </textPath>
                </text>

                {/* Inner Shield & Lock Emblem */}
                <g transform="translate(50, 50) scale(0.65)" stroke="currentColor">
                  {/* Shield outline */}
                  <path d="M -25 -25 C -5 -25 5 -28 5 -28 C 5 -28 15 -25 25 -25 C 25 -25 25 -5 25 10 C 25 28 0 38 0 38 C 0 38 -25 28 -25 10 C -25 -5 -25 -25 -25 -25 Z" strokeWidth="1.2" />

                  {/* Lock symbol inside shield */}
                  <rect x="-8" y="-4" width="16" height="13" rx="1.5" strokeWidth="1.2" />
                  <path d="M -5 -4 L -5 -9 C -5 -12 5 -12 5 -9 L 5 -4" strokeWidth="1.2" />
                  <circle cx="0" cy="2" r="1.5" fill="currentColor" />
                </g>
              </svg>

              <div className="text-center select-none font-serif px-4">
                <h2 className="text-[20px] font-black tracking-wide uppercase leading-tight font-sans text-slate-900">Awareness & Prevention</h2>
                <h2 className="text-[22px] font-black tracking-wider uppercase leading-tight font-sans text-slate-800 mt-0.5">Tips</h2>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="text-center text-[7.5px] leading-relaxed text-slate-800 font-sans max-w-[270px] select-none opacity-85 mx-auto">
              <p className="font-bold mb-0.5">This file contains crucial informational resources.</p>
              <p className="mb-2">It is designed to educate users on cybersecurity best practices, threats, and safe browsing behaviors.</p>
              <p className="italic text-[7px] mb-0.5 text-slate-700">Published and Distributed by:</p>
              <p className="font-black text-slate-900">Cyber Security Awareness Center</p>
              <p className="font-black text-slate-900">Information Security Division</p>
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
      <style>{`
/* Font Families */
.font-oswald {
  font-family: 'Oswald', sans-serif;
}

.font-lora {
  font-family: 'Lora', serif;
}

.font-special-elite {
  font-family: 'Special Elite', 'Courier New', Courier, monospace;
}

.font-courier {
  font-family: 'Courier Prime', 'Courier New', Courier, monospace;
}

/* ========== MANILA FOLDER DESIGN SYSTEM ========== */

.awareness-wrapper {
  background-color: #d5cfc0;
  background-image:
    radial-gradient(circle at 50% 50%, #e2dcd0 0%, #c4beaf 100%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  padding: 40px 0;
  overflow: hidden;
}

.awareness-wrapper .manila-cardboard {
  background-color: #d4ab73;
  background-image:
    radial-gradient(circle at 45% 45%, #dfbe93 0%, #ce9d5f 55%, #b68548 100%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.22'/%3E%3C/svg%3E");
  background-blend-mode: overlay;
}

.awareness-wrapper .spine-creases {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 22px;
  width: 14px;
  background: linear-gradient(to right,
      rgba(0, 0, 0, 0.15) 0%,
      transparent 15%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(0, 0, 0, 0.1) 35%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 55%,
      rgba(0, 0, 0, 0.15) 70%,
      transparent 85%,
      rgba(255, 255, 255, 0.1) 100%);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.awareness-wrapper .folder-container {
  position: relative;
  width: 435px;
  height: 560px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.awareness-wrapper .folder-open { transform: rotateY(0deg); }
.awareness-wrapper .folder-closed { transform: rotateY(0deg); }

.awareness-wrapper .folder-front-cover {
  position: absolute;
  inset: 0;
  width: 400px;
  border-radius: 8px 0 0 8px;
  transform-origin: left center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  transform-style: preserve-3d;
  box-shadow:
    5px 0 15px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 1px 0 0 rgba(255, 255, 255, 0.2);
}

.awareness-wrapper .folder-open .folder-front-cover {
  transform: rotateY(-180deg);
}

.awareness-wrapper .folder-front-cover-content {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.awareness-wrapper .front-cover-inside {
  position: absolute;
  inset: 0;
  border-radius: 8px 0 0 8px;
  transform: rotateY(180deg);
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.15),
    inset -1px 0 0 rgba(255, 255, 255, 0.15);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.awareness-wrapper .folder-back-cover {
  position: absolute;
  inset: 0;
  width: 435px;
  border-radius: 8px 16px 16px 8px;
  z-index: 1;
  box-shadow:
    0 30px 60px -15px rgba(0, 0, 0, 0.35),
    0 15px 30px -10px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.awareness-wrapper .folder-tab {
  position: absolute;
  top: 25px;
  left: 399px;
  width: 36px;
  height: 190px;
  background-color: #cf9f61;
  background-image:
    linear-gradient(to right, #cf9f61 0%, #bd8c4c 100%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.22'/%3E%3C/svg%3E");
  background-blend-mode: overlay;
  border-radius: 0 16px 16px 0;
  box-shadow:
    3px 2px 5px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.awareness-wrapper .folder-tab::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 16px;
  height: 20px;
  background: radial-gradient(circle at 100% 100%, transparent 16px, #bd8c4c 17px);
  pointer-events: none;
}

.awareness-wrapper .folder-tab-label {
  position: absolute;
  top: 6px;
  left: 3px;
  width: 30px;
  height: 178px;
  background-color: #fcfaf5;
  border-radius: 2px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 0 10px rgba(0, 0, 0, 0.05);
  border-left: 3.5px solid #cc2929;
}

.awareness-wrapper .label-line {
  position: absolute;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
  top: 6px;
  bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.awareness-wrapper .line-case {
  left: 4.5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 6.2px;
  color: #444;
}

.awareness-wrapper .line-name {
  left: 12.5px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 7.0px;
  color: #222;
}

.awareness-wrapper .line-dept {
  left: 20.5px;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 900;
  font-size: 5.8px;
  color: #111;
  letter-spacing: 0.01em;
}

.awareness-wrapper .stamp-red {
  color: #c92c2c;
  border: 3px double #c92c2c;
  font-family: 'Special Elite', monospace;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  transform: rotate(-16deg);
  opacity: 0.85;
  mix-blend-mode: multiply;
  box-shadow: inset 0 0 2px rgba(201, 44, 44, 0.2);
}

.awareness-wrapper .stamp-blue {
  color: #1a5fb4;
  border: 3px double #1a5fb4;
  font-family: 'Special Elite', monospace;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  transform: rotate(-12deg);
  opacity: 0.85;
  mix-blend-mode: multiply;
  box-shadow: inset 0 0 2px rgba(26, 95, 180, 0.2);
}

.awareness-wrapper .stamp-black {
  color: #262626;
  border: 1.5px solid #262625;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  opacity: 0.75;
  mix-blend-mode: multiply;
}

.awareness-wrapper .white-pages {
  position: absolute;
  top: 15px;
  left: 20px;
  right: 48px;
  bottom: 15px;
  z-index: 20;
}

.awareness-wrapper .white-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #faf8f3 60%, #f3efe5 100%);
  border-radius: 4px 8px 8px 4px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 2px 6px rgba(0, 0, 0, 0.08),
    inset 0 0 30px rgba(0, 0, 0, 0.02);
  padding: 55px 24px 24px 24px;
  overflow-y: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.awareness-wrapper .prong-fastener {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 11px;
  background: linear-gradient(to bottom, #dcdcdc 0%, #aeaeae 50%, #828282 100%);
  border-radius: 2px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  z-index: 35;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.awareness-wrapper .prong-fastener::before,
.awareness-wrapper .prong-fastener::after {
  content: '';
  width: 7px;
  height: 7px;
  background: radial-gradient(circle, #828282 0%, #3e3e3e 100%);
  border-radius: 50%;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.awareness-wrapper .punch-hole-left,
.awareness-wrapper .punch-hole-right {
  position: absolute;
  top: 14px;
  width: 11px;
  height: 11px;
  background-color: #bd915e;
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.45);
  z-index: 25;
}

.awareness-wrapper .punch-hole-left { left: calc(50% - 54px); }
.awareness-wrapper .punch-hole-right { right: calc(50% - 54px); }

.awareness-wrapper .metal-prong-left,
.awareness-wrapper .metal-prong-right {
  position: absolute;
  top: 18px;
  width: 48px;
  height: 3px;
  background: linear-gradient(to bottom, #f0d075 0%, #b8922c 100%);
  border: 0.5px solid #997920;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  z-index: 40;
}

.awareness-wrapper .metal-prong-left {
  left: calc(50% - 54px);
  border-radius: 1px 0 0 1px;
}

.awareness-wrapper .metal-prong-right {
  right: calc(50% - 54px);
  border-radius: 0 1px 1px 0;
}

.awareness-wrapper .retro-btn {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  background-color: #ce9d5f;
  color: #2b1b0a;
  border: 1px solid #a87d46;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 11px;
  letter-spacing: 0.05em;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.awareness-wrapper .retro-btn:hover:not(:disabled) {
  background-color: #dfb278;
  border-color: #9a6d36;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.awareness-wrapper .retro-btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.awareness-wrapper .retro-btn:disabled {
  background-color: #ebdcd0;
  color: #ab9e90;
  border-color: #d4c8bd;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

@keyframes pullOutRight {
  0% { transform: translateX(0) rotateZ(0); opacity: 1; }
  30% { transform: translateX(-15px) rotateZ(-1deg); opacity: 1; }
  100% { transform: translateX(60px) translateY(140px) rotateZ(-5deg); opacity: 0; }
}

@keyframes putBackRight {
  0% { transform: translateX(60px) translateY(140px) rotateZ(-5deg); opacity: 0; }
  70% { transform: translateX(-15px) rotateZ(-1deg); opacity: 1; }
  100% { transform: translateX(0) rotateZ(0); opacity: 1; }
}

@media (max-width: 480px) {
  .awareness-wrapper .folder-container {
    width: 290px;
    height: 400px;
  }
  .awareness-wrapper .folder-front-cover { width: 265px; }
  .awareness-wrapper .folder-open .folder-front-cover { transform: rotateY(-90deg); }
  .awareness-wrapper .folder-back-cover { width: 290px; }
  .awareness-wrapper .folder-tab {
    left: 264px;
    width: 26px;
    height: 140px;
    top: 15px;
    border-radius: 0 12px 12px 0;
  }
  .awareness-wrapper .folder-tab::after {
    bottom: -15px;
    width: 12px;
    height: 15px;
    background: radial-gradient(circle at 100% 100%, transparent 12px, #bd8c4c 13px);
  }
  .awareness-wrapper .folder-tab-label {
    top: 5px;
    left: 2px;
    width: 22px;
    height: 130px;
    border-left: 2.5px solid #cc2929;
  }
  .awareness-wrapper .label-line { top: 5px; bottom: 5px; }
  .awareness-wrapper .line-case { left: 3px; font-size: 4.5px; }
  .awareness-wrapper .line-name { left: 9px; font-size: 5.2px; }
  .awareness-wrapper .line-dept { left: 15px; font-size: 4.2px; }
  .awareness-wrapper .white-pages {
    top: 10px; left: 12px; right: 32px; bottom: 10px;
  }
  .awareness-wrapper .white-page { padding: 38px 12px 12px 12px; }
  .awareness-wrapper .prong-fastener {
    width: 90px; height: 8px; top: 10px; padding: 0 10px;
  }
  .awareness-wrapper .prong-fastener::before,
  .awareness-wrapper .prong-fastener::after { width: 5px; height: 5px; }
  .awareness-wrapper .punch-hole-left { left: calc(50% - 37px); top: 9px; width: 8px; height: 8px; }
  .awareness-wrapper .punch-hole-right { right: calc(50% - 37px); top: 9px; width: 8px; height: 8px; }
  .awareness-wrapper .metal-prong-left {
    left: calc(50% - 37px); top: 13px; width: 32px; height: 2px; z-index: 40;
    background: linear-gradient(to bottom, #f0d075 0%, #b8922c 100%);
    border: 0.5px solid #997920;
  }
  .awareness-wrapper .metal-prong-right {
    right: calc(50% - 37px); top: 13px; width: 32px; height: 2px; z-index: 40;
    background: linear-gradient(to bottom, #f0d075 0%, #b8922c 100%);
    border: 0.5px solid #997920;
  }
}

@media (max-width: 360px) {
  .awareness-wrapper .folder-container { width: 250px; height: 360px; }
  .awareness-wrapper .folder-front-cover { width: 228px; }
  .awareness-wrapper .folder-back-cover { width: 250px; }
  .awareness-wrapper .folder-tab { left: 227px; width: 23px; height: 120px; }
  .awareness-wrapper .folder-tab-label {
    top: 4px; left: 2px; width: 19px; height: 112px; border-left: 2px solid #cc2929;
  }
  .awareness-wrapper .label-line { top: 4px; bottom: 4px; }
  .awareness-wrapper .line-case { left: 2.5px; font-size: 3.8px; }
  .awareness-wrapper .line-name { left: 7.5px; font-size: 4.5px; }
  .awareness-wrapper .line-dept { left: 12.5px; font-size: 3.5px; }
  .awareness-wrapper .white-pages { right: 28px; }
}
      `}</style>
    </div>
    </div>
  );
}

export default AwarenessPreventionTipsPage;
