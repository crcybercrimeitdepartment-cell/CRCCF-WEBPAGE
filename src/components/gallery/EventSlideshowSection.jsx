import { useState, useEffect, useCallback, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ImageIcon } from 'lucide-react';

export default function EventSlideshowSection({ event }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);
  const setRef = useRef(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  const images = event.photos;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
    setIsPlaying(false); // Pause auto-play when user manually selects
  };

  // Auto Slideshow Loop
  useEffect(() => {
    let interval;
    if (isPlaying && !isHovered) {
      interval = setInterval(goToNext, 4000); // 4 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only navigate if this section is being hovered to prevent all slideshows from reacting at once
      if (!isHovered) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, goToNext]);

  // Initialize scroll position for Marquee
  useEffect(() => {
    const container = scrollContainerRef.current;
    const setElement = setRef.current;
    if (!container || !setElement) return;

    // Start at the 2nd set (index 1) so we can scroll left immediately
    container.scrollLeft = setElement.offsetWidth;
  }, [images.length]);

  // Auto-scroll loop for Marquee
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    let lastTimestamp;

    const scrollStep = (timestamp) => {
      if (!isMarqueeHovered) {
        if (lastTimestamp) {
          const delta = timestamp - lastTimestamp;
          container.scrollLeft += delta * 0.05; // Controls marquee speed
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = null;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMarqueeHovered]);

  // Infinite manual scrolling logic
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const setElement = setRef.current;
    if (!container || !setElement) return;

    const setWidth = setElement.offsetWidth;
    
    if (container.scrollLeft >= setWidth * 2) {
      container.scrollLeft -= setWidth;
    } else if (container.scrollLeft <= setWidth * 0.5) {
      container.scrollLeft += setWidth;
    }
  };

  return (
    <motion.section 
      id={event.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[1200px] mx-auto mb-24 md:mb-32 px-4 scroll-mt-24"
    >
      {/* 1. Header Area */}
      <div className="mb-5 md:mb-8 border-l-4 border-blue-600 pl-4 md:pl-6 py-1 md:py-2">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-sm font-bold tracking-wide">
            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] md:text-sm font-semibold tracking-wide uppercase">
            {event.category}
          </span>
          <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] md:text-sm font-semibold tracking-wide">
            <ImageIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {images.length} Photos
          </span>
        </div>
        <h2 className="text-xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          {event.title}
        </h2>
      </div>

      {/* 2. Embedded Slideshow */}
      <div 
        className="relative w-full min-h-[250px] aspect-video md:aspect-[21/9] rounded-[24px] overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.1)] bg-slate-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].caption}
            className="absolute inset-0 w-full h-full object-cover select-none"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000 || offset.x < -100) goToNext();
              else if (swipe > 10000 || offset.x > 100) goToPrev();
            }}
          />
        </AnimatePresence>

        {/* Hover Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={goToPrev}
            className="pointer-events-auto bg-black/40 hover:bg-black/70 text-white backdrop-blur-md p-3 md:p-4 rounded-full transition-all transform hover:-translate-x-1"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="pointer-events-auto bg-black/40 hover:bg-black/70 text-white backdrop-blur-md p-3 md:p-4 rounded-full transition-all transform hover:translate-x-1"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 3. Photo Caption */}
      <div className="mt-6 mb-6">
        <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-1">
          Photo #{String(currentIndex + 1).padStart(2, '0')}
        </p>
        <motion.h3 
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-extrabold text-[#0F172A]"
        >
          {images[currentIndex].caption}
        </motion.h3>
      </div>

      {/* 4. Caption Marquee */}
      <div 
        className="relative bg-slate-50 border-y border-slate-200 py-2.5 md:py-4 mb-4 md:mb-6 group/marquee"
        onMouseEnter={() => setIsMarqueeHovered(true)}
        onMouseLeave={() => setIsMarqueeHovered(false)}
      >
        {/* Gradient Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        
        <div 
          className="overflow-x-auto touch-pan-x w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex w-max">
            {[0, 1, 2, 3].map((setIndex) => (
              <div 
                key={setIndex} 
                className="flex gap-6 pr-6" 
                ref={setIndex === 0 ? setRef : null}
              >
                {images.map((img, idx) => {
                  const isMarqueeActive = idx === currentIndex;
                  return (
                    <button
                      key={`${setIndex}-${img.id}-${idx}`}
                      onClick={() => goToSlide(idx)}
                      className={`flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                        isMarqueeActive 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`font-mono text-[10px] md:text-sm font-bold ${isMarqueeActive ? 'text-blue-200' : 'text-slate-400'}`}>
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-semibold text-xs md:text-base">{img.caption}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Photo Details / Event Description */}
      <div className="px-2">
        <p className="text-slate-600 text-lg leading-relaxed font-medium">
          {event.description}
        </p>
      </div>

    </motion.section>
  );
}
