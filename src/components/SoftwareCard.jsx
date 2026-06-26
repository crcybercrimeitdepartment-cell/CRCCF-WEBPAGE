import { useState } from "react";
import { motion } from "framer-motion";
import CrimeCardLock from "./CrimeCardLock";

export default function SoftwareCard({ id, title, onClick }) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isUnlocking) return;

    setIsUnlocking(true);

    // Wait for the unlock animation to finish before navigating
    setTimeout(() => {
      onClick();
      // Optional: reset state in case user navigates back to this page via browser back button
      setTimeout(() => setIsUnlocking(false), 200);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <motion.div
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Software Product: ${title}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className="
      relative cursor-pointer 
      bg-[#F1F5F9] 
      rounded-xl 
      p-5
      
      flex flex-col items-center justify-center text-center
      
      border border-[#E2E8F0]
      shadow-sm
      
      overflow-hidden
      group
      "
    >
      {/* 🔥 GLOW BACKGROUND */}
      <div
        className="
        absolute inset-0 opacity-0 group-hover:opacity-100 
        transition duration-300
        bg-gradient-to-br from-[#DBEAFE]/70 via-transparent to-[#3B82F6]/20
      "
      />

      {/* 🔥 INNER LIGHT BORDER EFFECT */}
      <div
        className="
        absolute inset-0 rounded-xl 
        border border-transparent 
        group-hover:border-[#2563EB]/30
        transition duration-300
      "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 🔷 ICON AREA (REPLACED WITH LOCK) */}
        <CrimeCardLock isUnlocking={isUnlocking} />

        {/* 🔷 TITLE */}
        <h3
          className="
          mt-3 text-sm font-semibold text-[#0F172A] 
          leading-tight
          group-hover:text-[#2563EB] 
          transition
        "
        >
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
