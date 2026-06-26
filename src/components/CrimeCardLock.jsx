import React from "react";

export default function CrimeCardLock({ isUnlocking, className = "" }) {
  return (
    <div
      className={`
        relative w-14 h-14 flex items-center justify-center
        rounded-[14px]
        bg-white/80 backdrop-blur-md
        border border-white/60
        shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]
        transition-all duration-500 ease-out
        ${isUnlocking ? "scale-105 shadow-[0_8px_16px_-6px_rgba(37,99,235,0.2)] border-blue-100" : "group-hover:scale-105 group-hover:shadow-[0_8px_16px_-6px_rgba(37,99,235,0.2)] group-hover:border-blue-100"}
        ${className}
      `}
    >
      <div className="relative w-[32px] h-[40px]">
        {/* Shackle */}
        <div
          className={`
            absolute left-[8px] top-[4px] w-[16px] h-[24px]
            border-[2.5px] border-[#94A3B8] rounded-t-full border-b-0
            origin-[1.25px_20px]
            transition-all duration-500 ease-out
            ${isUnlocking
              ? "-translate-y-[4px] rotate-[-35deg] border-[#60A5FA]"
              : "group-hover:-translate-y-[4px] group-hover:rotate-[-35deg] group-hover:border-[#60A5FA]"
            }
          `}
        />

        {/* Lock Body */}
        <div
          className={`
            absolute left-[4px] bottom-[2px] z-10 w-[24px] h-[18px] 
            bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9]
            border border-[#CBD5E1]
            shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]
            rounded-[5px]
            flex items-center justify-center
            transition-all duration-500 ease-out
            ${isUnlocking ? "border-[#93C5FD]" : "group-hover:border-[#93C5FD]"}
          `}
        >
          {/* Keyhole */}
          <div className="flex flex-col items-center justify-center opacity-80">
            <div
              className={`w-[4.5px] h-[4.5px] rounded-full transition-colors duration-500 ${
                isUnlocking ? "bg-[#3B82F6]" : "bg-[#64748B] group-hover:bg-[#3B82F6]"
              }`}
            />
            <div
              className={`w-[2px] h-[5px] -mt-[1px] rounded-b-[1px] transition-colors duration-500 ${
                isUnlocking ? "bg-[#3B82F6]" : "bg-[#64748B] group-hover:bg-[#3B82F6]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
