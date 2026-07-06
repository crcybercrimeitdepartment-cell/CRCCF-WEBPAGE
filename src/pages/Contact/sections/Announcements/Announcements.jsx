import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
const suraj = "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782214033/suraj-DW86i7lK_gnggjq.png";
import { announcementsData } from "./AnnouncementsData";

const Announcements = ({
  onClose,
  adminImages,
  marqueeText = announcementsData.defaults.marqueeText,
  title = announcementsData.defaults.title,
  subtitle = announcementsData.defaults.subtitle,
}) => {
  // Use admin images if provided, otherwise fallback to default 'suraj' array
  const images =
    adminImages && adminImages.length > 0 ? adminImages : [suraj, suraj, suraj];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // SCROLL LOCK
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // ✨ UPDATED: SLIDER TIMER ✨
  useEffect(() => {
    // If user is hovering (paused) OR if there is only 1 image, do NOT run the timer!
    if (isPaused || images.length <= 1) return;

    // Set interval to exactly 2 seconds (2000 milliseconds)
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, announcementsData.settings.autoSlideMs);

    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] overflow-hidden flex items-center justify-center z-[99999]">
      {/* THE CONFETTI BLAST */}
      <div className="fixed inset-0 pointer-events-none z-[100000]">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={announcementsData.settings.confettiPieces}
          gravity={announcementsData.settings.confettiGravity}
        />
      </div>

      {/* THE CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[100001] bg-white text-slate-800 w-12 h-12 rounded-full font-black text-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-gray-100 hover:scale-110 transition-all flex items-center justify-center"
      >
        ✕
      </button>

      {/* ADMIN CONTROLLED BACKGROUND TEXT */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="absolute top-[15%] whitespace-nowrap font-black uppercase animate-[scrollX_25s_linear_infinite]"
          style={{
            fontSize: "clamp(2rem, 8vw, 8rem)",
            WebkitTextStroke: "2px #2563eb",
            color: "transparent",
          }}
        >
          <span>{marqueeText}</span>
        </div>
        <div
          className="absolute bottom-[15%] whitespace-nowrap font-black uppercase animate-[scrollXReverse_25s_linear_infinite]"
          style={{
            fontSize: "clamp(2rem, 8vw, 8rem)",
            WebkitTextStroke: "2px #2563eb",
            color: "transparent",
          }}
        >
          <span>{marqueeText}</span>
        </div>
      </div>

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* PREMIUM CSS PHONE MOCKUP */}
      <div
        // ✨ FIX: Updated transform, hover:scale-110, hover:-translate-y-4, and hover:shadow-2xl for a massive zoom effect!
        className="relative z-10 group w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] aspect-[9/19] bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-[6px] sm:p-[8px] md:p-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-slate-800/50 transform transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-4 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
        // Pauses the 2-second timer if the user puts their mouse over the phone
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full bg-white rounded-[2.2rem] sm:rounded-[2.5rem] overflow-hidden shadow-inner flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/30 z-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-5 sm:h-6 md:h-7 bg-slate-900 rounded-full z-30 flex items-center justify-end px-2 sm:px-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-900/50 border border-slate-800 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]" />
          </div>

          {/* ADMIN CONTROLLED IMAGE SLIDER */}
          <div className="relative w-full h-[75%] overflow-hidden z-10 bg-slate-100">
            <div
              className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-top shrink-0"
                />
              ))}
            </div>

            {/* Only show the dots if there is more than 1 image! */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-4 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ADMIN CONTROLLED CONTENT */}
          <div className="h-[25%] bg-white flex flex-col justify-center items-center px-2 sm:px-4 relative z-20 border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
            <h2 className="font-extrabold text-slate-800 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-tight">
              {title}
            </h2>
            <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] mt-1.5">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
