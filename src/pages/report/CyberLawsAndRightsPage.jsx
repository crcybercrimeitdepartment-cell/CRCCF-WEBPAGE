import React, { useState, useEffect } from 'react';
import { cyberLawsAndRightsData } from './CyberLawsAndRightsPageData.js';

const inlineStyles = `
@import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap');

:root {
  --color-folder-bg: #f89cb4;
  --color-folder-shadow: #e07a93;
  --color-folder-line: #b3566c;
  --color-folder-text: #6b2e91;
  --color-string: #5d4037;
  --color-string-highlight: #8d6e63;
  --color-paper-bg: #fdf6e3;
  
  --font-vintage: 'Berkshire Swash', serif;
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Roboto', sans-serif;
}

.font-vintage { font-family: 'Berkshire Swash', serif !important; }
.font-serif { font-family: 'Playfair Display', serif !important; }
.font-sans { font-family: 'Roboto', sans-serif !important; }

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
`;


// Preload audio globally so there is zero delay when playing
const typingAudio = new Audio('/keyboard_soundeffect.mp3');
typingAudio.preload = 'auto';
typingAudio.loop = true;

// Helper component for typewriter effect
const TypewriterText = ({ children, isOpen, startDelay = 2.8, playSound = false }) => {
  let wordIndex = 0;

  const renderNode = (node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      const words = String(node).split(/(\s+)/); // keep whitespace
      return words.map((word, i) => {
        if (word.trim() === '') {
          return word;
        }
        wordIndex++;
        const delay = startDelay + wordIndex * 0.05; // 50ms per word
        return (
          <span
            key={`${wordIndex}-${i}`}
            style={{
              opacity: isOpen ? 1 : 0,
              transition: isOpen ? `opacity 0.2s ease ${delay}s` : `opacity 0s ease 2.5s`
            }}
          >
            {word}
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        ...node.props,
        children: React.Children.map(node.props.children, renderNode)
      });
    }

    return node;
  };

  const renderedContent = React.Children.map(children, renderNode);

  // Play sound effect perfectly timed with the typing animation
  useEffect(() => {
    if (isOpen && playSound) {
      typingAudio.currentTime = 0; // Reset sound to beginning

      // Start playing exactly when the first word appears
      const startTimer = setTimeout(() => {
        typingAudio.play().catch(e => console.error("Audio playback prevented:", e));
      }, startDelay * 1000);

      // Stop playing exactly when the last word appears
      const durationMs = wordIndex * 50;
      const stopTimer = setTimeout(() => {
        typingAudio.pause();
      }, (startDelay * 1000) + durationMs);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
        typingAudio.pause();
      };
    }
  }, [isOpen, startDelay, wordIndex, playSound]);

  return <>{renderedContent}</>;
};

const FolderContent = ({ isOpen, playSound = true, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = cyberLawsAndRightsData.length;

  const handleNextPage = (e) => {
    e.stopPropagation();
    setCurrentPage(p => Math.min(totalPages - 1, p + 1));
  };

  const handlePrevPage = (e) => {
    e.stopPropagation();
    setCurrentPage(p => Math.max(0, p - 1));
  };

  // Reset to first page when folder opens
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  const btnClass = "px-3 py-1.5 cursor-pointer bg-white border border-[#ccc] rounded font-serif font-bold text-[0.9rem] shadow-[0_2px_4px_rgba(0,0,0,0.1)]";

  const currentData = cyberLawsAndRightsData[currentPage];

  return (
    <div
      className={`relative w-full h-full perspective-[2000px] ${isOpen ? 'pointer-events-auto opacity-100 transition-opacity duration-0 delay-[2.8s]' : 'pointer-events-none opacity-0 transition-opacity duration-0 delay-[2.5s]'}`}
    >

      {/* PAGE (Single Page View) */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col">
        {/* Physical Paper */}
        <div className="absolute -top-5 -left-5 -right-5 -bottom-5 max-md:inset-0 p-5 max-md:p-6 bg-[#f9f6f0] flex flex-col rounded-sm shadow-[3px_3px_15px_rgba(0,0,0,0.08)] border-l border-black/5">
          {/* Content */}
          <TypewriterText isOpen={isOpen} startDelay={2.8} playSound={playSound}>
            <h1 className="text-center text-[#6b2e91] mb-[15px] max-md:mb-[20px] text-[1.6rem] max-md:text-[1.8rem] border-b-2 border-[#e07a93] pb-2.5 max-md:pb-3 mt-0 shrink-0 font-bold">
              {currentData.heading}
            </h1>

            <div className="leading-[1.6] text-[0.95rem] max-md:text-[1.1rem] flex-1 overflow-y-auto scrollbar-hide whitespace-pre-wrap text-[#4a4a4a]">
              {currentData.content}
              {currentData.tagline && (
                <div className="mt-5 max-md:mt-3 py-2.5 px-3.5 max-md:p-2 max-md:text-[0.75rem] bg-[#e07a93]/10 border-l-4 border-[#b3566c]">
                  <strong>Note:</strong> {currentData.tagline}
                </div>
              )}
            </div>
          </TypewriterText>

          {/* Pagination Controls */}
          <div className={`flex flex-col gap-2.5 mt-auto border-t border-black/10 pt-2.5 max-md:pt-4 ${isOpen ? 'opacity-100 transition-opacity duration-500 delay-[5s]' : 'opacity-0 transition-opacity duration-0'}`}>
            <div className="flex justify-between items-center">
              <button onClick={handlePrevPage} disabled={currentPage === 0} className={`${btnClass} max-md:py-2 max-md:px-4 max-md:text-[0.9rem] ${currentPage === 0 ? 'cursor-not-allowed opacity-50' : ''}`}>
                &larr; Previous
              </button>
              <span className="font-bold text-[#666] text-[0.9rem] max-md:text-[0.95rem]">Page {currentPage + 1} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className={`${btnClass} max-md:py-2 max-md:px-4 max-md:text-[0.9rem] ${currentPage === totalPages - 1 ? 'cursor-not-allowed opacity-50' : ''}`}>
                Next &rarr;
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#b3566c] text-[#fdf6e3] py-2 rounded shadow-md font-serif font-bold text-[1rem] tracking-wide hover:bg-[#914053] transition-colors"
            >
              Close Folder
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

const MobileOpenedView = ({ isOpen, onClose, playSound = false }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = cyberLawsAndRightsData.length;

  React.useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  const handleNext = () => setCurrentPage(p => Math.min(totalPages - 1, p + 1));
  const handlePrev = () => setCurrentPage(p => Math.max(0, p - 1));

  const currentData = cyberLawsAndRightsData[currentPage];

  return (
    <div className={`fixed inset-0 z-[200] bg-[#f9f6f0] md:hidden flex flex-col transition-opacity duration-[800ms] ${isOpen ? 'opacity-100 pointer-events-auto delay-[1200ms]' : 'opacity-0 pointer-events-none delay-0'}`}>

      {/* Pages Container */}
      <div className="flex-1 relative overflow-hidden perspective-[1000px] p-4 pb-4">

        <div className="bg-[#fdf6e3] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 w-full h-full flex flex-col overflow-y-auto">
          <TypewriterText isOpen={isOpen} startDelay={2.0} playSound={playSound}>
            <h1 className="text-center text-[#6b2e91] mb-5 text-[1.6rem] border-b-2 border-[#e07a93] pb-2 mt-0 font-bold leading-tight">
              {currentData.heading}
            </h1>

            <div className="text-[1.05rem] flex-1 text-[#4a4a4a] leading-[1.6] whitespace-pre-wrap">
              {currentData.content}
              {currentData.tagline && (
                <div className="mt-6 py-3 px-4 text-[0.95rem] bg-[#e07a93]/10 border-l-4 border-[#b3566c] text-[#4a4a4a] leading-[1.5]">
                  <strong>Note:</strong> {currentData.tagline}
                </div>
              )}
            </div>
          </TypewriterText>
        </div>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="p-4 bg-[#f9f6f0] shrink-0 flex flex-col gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 relative border-t border-[#e07a93]/20">
        <div className="flex justify-between items-center px-1">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 bg-white border border-[#ccc] rounded font-serif font-bold text-[0.9rem] shadow-sm transition-transform ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            &larr; Prev
          </button>
          <span className="font-bold text-[#666] text-[0.9rem]">Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 bg-white border border-[#ccc] rounded font-serif font-bold text-[0.9rem] shadow-sm transition-transform ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            Next &rarr;
          </button>
        </div>
        <button
          onClick={onClose}
          className="bg-[#e07a93] text-white px-8 py-3 rounded-full shadow-md font-bold text-[1.1rem] active:scale-95 transition-transform w-full"
        >
          Close Folder
        </button>
      </div>

    </div>
  );
};

const VintageFolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = `
    w-[92vw] max-w-[450px] aspect-[5/7] shrink-0 relative mt-[15%] md:mt-[10%] mb-24 md:mb-32
    perspective-[1500px] cursor-pointer
    transition-all duration-1000 ease-[cubic-bezier(0.645,0.045,0.355,1)]
    [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]
    group
    ${!isOpen ? `
      hover:-translate-y-[5px]
      max-md:opacity-100 max-md:pointer-events-auto max-md:transition-opacity max-md:duration-500 max-md:delay-0
    ` : `
      md:translate-x-[25%]
      hover:-translate-y-[5px] md:hover:translate-x-[25%]
      max-md:opacity-0 max-md:pointer-events-none max-md:transition-opacity max-md:duration-[800ms] max-md:delay-[1200ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const folderInsideClass = `
    absolute top-0 left-0 w-full h-full bg-[#fdf6e3]
    shadow-[inset_0_0_20px_rgba(0,0,0,0.05),_5px_5px_15px_rgba(0,0,0,0.1)]
    rounded-[2px_8px_8px_2px] p-[8%] pl-[12%] overflow-visible
    transition-all duration-1000 ease-[cubic-bezier(0.645,0.045,0.355,1)]
  `.replace(/\s+/g, ' ').trim();

  const flapOutsideClass = `
    absolute top-0 left-0 w-full h-full rounded-[2px_8px_8px_2px]
    [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
    bg-[var(--color-folder-bg)]
    bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.03)_4px,rgba(0,0,0,0.03)_8px)]
    shadow-[5px_5px_15px_rgba(0,0,0,0.2),_inset_2px_0_5px_rgba(0,0,0,0.1)]
  `.replace(/\s+/g, ' ').trim();

  const getFlapInsideClass = (transformValue = '') => `
    absolute top-0 left-0 w-full h-full rounded-[2px_8px_8px_2px]
    [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
    bg-[#c49a6c]
    bg-[url("data:image/svg+xml,%3Csvg_width='100'_height='100'_viewBox='0_0_100_100'_xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter_id='noise'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='0.8'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100'_height='100'_filter='url(%23noise)'_opacity='0.15'/%3E%3C/svg%3E")]
    shadow-[inset_0_0_30px_rgba(0,0,0,0.15)]
    ${transformValue}
  `.replace(/\s+/g, ' ').trim();

  const flapBottomClass = `
    absolute [transform-style:preserve-3d] bottom-0 left-0 w-full h-[20%] origin-bottom
    transition-all duration-1000 max-md:duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]
    ${isOpen ? `
      [transform:translateZ(-1px)_rotateX(-180deg)] pointer-events-none delay-[2s] max-md:delay-[800ms]
    ` : `
      [transform:translateZ(1px)_rotateX(0deg)] pointer-events-auto delay-0 max-md:delay-[0s]
    `}
  `.replace(/\s+/g, ' ').trim();

  const flapTopClass = `
    absolute [transform-style:preserve-3d] top-0 left-0 w-full h-[20%] origin-top
    transition-all duration-1000 max-md:duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]
    ${isOpen ? `
      [transform:translateZ(-1px)_rotateX(180deg)] pointer-events-none delay-[1.5s] max-md:delay-[600ms]
    ` : `
      [transform:translateZ(1px)_rotateX(0deg)] pointer-events-auto delay-[0.5s] max-md:delay-[200ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const flapRightClass = `
    absolute [transform-style:preserve-3d] top-0 right-0 w-1/2 h-full origin-right
    transition-all duration-1000 max-md:duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]
    ${isOpen ? `
      [transform:translateZ(-1px)_rotateY(180deg)] pointer-events-none delay-[1s] max-md:delay-[400ms]
    ` : `
      [transform:translateZ(1px)_rotateY(0deg)] pointer-events-auto delay-[1s] max-md:delay-[400ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const folderCoverClass = `
    w-full h-full absolute top-0 left-0 origin-left [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]
    transition-all duration-1000 max-md:duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]
    ${isOpen ? `
      [transform:translateZ(-1px)_rotateY(-180deg)] pointer-events-none delay-[0.5s] max-md:delay-[200ms]
    ` : `
      [transform:translateZ(1px)_rotateY(0deg)] pointer-events-auto delay-[1.5s] max-md:delay-[600ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const stringHorizontalClass = `
    absolute top-[55%] left-0 w-full h-1 origin-left pointer-events-none
    bg-[repeating-linear-gradient(45deg,var(--color-string),var(--color-string)_4px,var(--color-string-highlight)_4px,var(--color-string-highlight)_8px)]
    shadow-[0_2px_3px_rgba(0,0,0,0.4)]
    transition-[transform,opacity] ease-[cubic-bezier(0.5,0,0.2,1),ease] max-md:duration-[600ms,300ms]
    ${isOpen ? `
      [transform:translateZ(2px)_translateY(200px)_rotate(-45deg)_scaleX(1.1)] opacity-0 duration-[0.8s,0.4s] delay-[0.1s,0.3s] max-md:delay-[0s,0.1s]
    ` : `
      [transform:translateZ(2px)_translateY(0)_rotate(0)_scaleX(1)] opacity-100 duration-[0.5s,0.3s] delay-[2.5s,2.5s] max-md:delay-[800ms,800ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const stringVerticalClass = `
    absolute top-0 left-[30%] w-1 h-full origin-top pointer-events-none
    bg-[repeating-linear-gradient(45deg,var(--color-string),var(--color-string)_4px,var(--color-string-highlight)_4px,var(--color-string-highlight)_8px)]
    shadow-[2px_0_3px_rgba(0,0,0,0.4)]
    transition-[transform,opacity] ease-[cubic-bezier(0.5,0,0.2,1),ease] max-md:duration-[600ms,300ms]
    ${isOpen ? `
      [transform:translateZ(2px)_translateX(200px)_rotate(45deg)_scaleY(1.1)] opacity-0 duration-[0.8s,0.4s] delay-[0.1s,0.3s] max-md:delay-[0s,0.1s]
    ` : `
      [transform:translateZ(2px)_translateX(0)_rotate(0)_scaleY(1)] opacity-100 duration-[0.5s,0.3s] delay-[2.5s,2.5s] max-md:delay-[800ms,800ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  const stringKnotClass = `
    absolute top-[calc(55%-40px)] left-[calc(30%-40px)] w-[80px] h-[80px] pointer-events-none origin-center
    transition-[transform,opacity] ease-[cubic-bezier(0.4,0,0.2,1),ease] max-md:duration-[400ms,200ms]
    ${isOpen ? `
      [transform:translateZ(2px)_rotate(540deg)_scale(1.5)] opacity-0 duration-[0.6s,0.4s] delay-[0s,0.2s] max-md:delay-[0s,0.1s]
    ` : `
      [transform:translateZ(2px)_rotate(0deg)_scale(1)] opacity-100 duration-[0.5s,0.3s] delay-[2.5s,2.5s] max-md:delay-[800ms,800ms]
    `}
  `.replace(/\s+/g, ' ').trim();

  return (
    <>
      <MobileOpenedView isOpen={isOpen} onClose={toggleFolder} playSound={isMobile} />

      <div className={containerClass} onClick={!isOpen ? toggleFolder : undefined}>

        {/* The inner content that shows when folder opens */}
        <div className={folderInsideClass} onClick={(e) => e.stopPropagation()}>
          <FolderContent isOpen={isOpen} playSound={!isMobile} onClose={toggleFolder} />
        </div>

        {/* The bottom flap */}
        <div className={flapBottomClass}>
          <div className={flapOutsideClass}></div>
          <div className={getFlapInsideClass('[transform:rotateX(-180deg)]')}></div>
        </div>

        {/* The top flap */}
        <div className={flapTopClass}>
          <div className={flapOutsideClass}></div>
          <div className={getFlapInsideClass('[transform:rotateX(180deg)]')}></div>
        </div>

        {/* The right flap */}
        <div className={flapRightClass}>
          <div className={flapOutsideClass}>
            <div className="absolute right-0 top-0 bottom-0 w-[6%] bg-black/5 border-l border-black/10 shadow-[inset_2px_0_5px_rgba(0,0,0,0.05)]"></div>
          </div>
          <div className={getFlapInsideClass('[transform:rotateY(180deg)]')}>
            <div className="absolute left-0 top-0 bottom-0 w-[6%] bg-[#0a1432]/60 border-r-2 border-black/30"></div>
          </div>
        </div>

        {/* The cover flap (left flap) */}
        <div className={folderCoverClass}>
          {/* Outside Face */}
          <div className={flapOutsideClass}>
            <div className="absolute left-0 top-0 bottom-0 w-[6%] bg-black/5 border-r border-black/10 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.05)]"></div>
            <div className="absolute top-0 left-0 w-[90%] h-[2%] bg-black/5 border-b border-black/5"></div>

            <div className="absolute top-0 left-0 w-full h-full p-[8%] text-[#6b2e91] flex flex-col">
              {/* Top Right Info */}
              <div className="self-end mt-[10%] mr-[4%] font-sans text-[1.1rem] max-md:text-[0.8rem] font-medium leading-[1.8]">
                <div className="flex items-center gap-2 whitespace-nowrap relative">
                  <span>File No.</span>
                  <span className="tracking-[2px]">............................</span>
                  <span className="absolute left-[70px] max-md:left-[50px] bottom-0 font-vintage text-[1.6rem] max-md:text-[1.2rem] text-[#2a1635] -rotate-2">
                    74-CYB/X
                  </span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap relative">
                  <span>Date</span>
                  <span className="tracking-[2px]">................................</span>
                  <span className="absolute left-[55px] max-md:left-[40px] bottom-[2px] font-vintage text-[1.4rem] max-md:text-[1rem] text-[#2a1635] -rotate-1">
                    {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Middle Lines */}
              <div className="mt-[15%] w-[85%] mx-auto flex flex-col gap-[35px] max-md:gap-[20px]">
                <div className="w-full border-b border-black/60 h-10 max-md:h-6 flex items-end justify-center">
                  <span className="font-vintage text-[3rem] max-md:text-[2rem] text-[#2a1635] translate-y-3 opacity-90 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] pl-[30px] max-md:pl-[10px]">
                    Cyber Laws &
                  </span>
                </div>
                <div className="w-full border-b border-black/60 h-10 max-md:h-6 flex items-end justify-center">
                  <span className="font-vintage text-[3rem] max-md:text-[2rem] text-[#2a1635] translate-y-3 opacity-90 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] pl-[30px] max-md:pl-[10px]">
                    Rights
                  </span>
                </div>
                <div className="w-full border-b border-black/60 h-10 max-md:h-6 flex items-end justify-center"></div>
                <div className="w-full border-b border-black/60 h-10 max-md:h-6 flex items-end justify-center"></div>
              </div>

              {/* Bottom Elements */}
              <div className="absolute bottom-[8%] left-[8%] right-[8%] flex justify-between items-end">
                <div className="vintage-brand">
                  <div className="font-vintage text-[2.5rem] max-md:text-[1.8rem] mb-1">Vintage</div>
                  <div className="flex flex-col gap-1 w-[200px] max-md:w-[120px]">
                    <div className="h-px bg-[#6b2e91] w-full"></div>
                    <div className="h-px bg-[#6b2e91] w-[90%]"></div>
                    <div className="h-px bg-[#6b2e91] w-[80%]"></div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 max-md:w-12 max-md:h-12 rounded-full border border-[#6b2e91] flex justify-center items-center mb-1 font-vintage text-[1rem] max-md:text-[0.75rem] text-center leading-none">
                    Craft<br />Waft
                  </div>
                  <div className="font-serif text-sm max-md:text-[0.6rem] font-semibold tracking-[1px]">COVER FILE</div>
                </div>
              </div>
            </div>

            {/* Strings */}
            <div className={stringHorizontalClass}></div>
            <div className={stringVerticalClass}></div>

            {/* SVG Knot */}
            <svg className={stringKnotClass} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,40 Q30,20 20,40 T40,60 Q50,80 60,60 T40,40" fill="none" stroke="var(--color-string)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40,40 Q40,30 50,40 T60,50" fill="none" stroke="var(--color-string-highlight)" strokeWidth="3" />
              <path d="M40,60 Q20,80 30,95" fill="none" stroke="var(--color-string)" strokeWidth="4" />
              <path d="M40,60 Q45,80 50,95" fill="none" stroke="var(--color-string)" strokeWidth="4" />
            </svg>

          </div>

          {/* Inside Face (Brown) */}
          <div className={getFlapInsideClass('[transform:rotateY(180deg)]')}>
            <div className="absolute right-0 top-0 bottom-0 w-[6%] bg-[#0a1432]/60 border-l-2 border-black/30"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function CyberLawsAndRightsPage() {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-x-hidden overflow-y-auto flex flex-col font-sans">
      <style>{inlineStyles}</style>

      {/* Hero Section */}
      <div className="w-full pt-20 pb-16 px-6 flex flex-col items-center justify-center shrink-0 z-10 bg-transparent">
        <h3 className="text-[#2563EB] font-bold text-[12px] md:text-[14px] tracking-[8px] uppercase mb-4 text-center ml-[8px]">
          REPORT CRIME
        </h3>
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-black mb-6 text-[#0F172A] leading-[1.1] max-w-5xl mx-auto text-center">
          Explore Your <br className="hidden md:block" /> <span className="text-[#2563EB]">Cyber Laws & Rights</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#64748B] max-w-[850px] mx-auto leading-[1.7] font-medium text-center">
          Empower yourself with digital jurisprudence. Navigate through our comprehensive guide to understand your legal protections, online responsibilities, and fundamental rights in the cyber world.
        </p>
      </div>

      {/* Folder Container */}
      <div className="flex-1 relative w-full flex items-start justify-center">
        <VintageFolder />
      </div>

    </div>
  );
}

