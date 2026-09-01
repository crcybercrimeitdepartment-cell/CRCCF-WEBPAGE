import { useState } from "react";
import CrimeCardLock from "./CrimeCardLock";

// Helper to assign a consistent color to each card based on its title length/chars
const getConsistentColor = (title) => {
  const colors = [
    '#3f3d99', '#1f6f88', '#156a9a', '#13795b',
    '#6b33c7', '#9a4f1d', '#b11d63', '#1e766f',
    '#2f56b8', '#1f7a45', '#b1221d', '#155b87'
  ];
  let sum = 0;
  for (let i = 0; i < title.length; i++) {
    sum += title.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

export default function SoftwareCard({ id, title, onClick, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const itemAccent = getConsistentColor(title);
  
  // Use index + 1 if available, otherwise just use id or a fallback
  const displayNum = String(index + 1).padStart(2, '0');

  const handleClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isUnlocking) return;

    setIsUnlocking(true);

    setTimeout(() => {
      onClick();
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
    <button
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`Software Product: ${title}`}
      className="group relative flex h-[82px] sm:h-[108px] w-full items-center overflow-hidden rounded-[14px] sm:rounded-[22px] border-r border-t border-r-slate-200/40 border-t-slate-200/40 bg-white/95 px-1.5 py-1.5 sm:px-3.5 sm:py-3 text-left shadow-[0_3px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] active:scale-[0.985] touch-manipulation cursor-pointer"
      style={{
        borderLeftColor: itemAccent,
        borderBottomColor: itemAccent,
        borderTopColor: itemAccent,
        borderLeftWidth: '3.5px',
        borderBottomWidth: isHovered ? '0px' : '3.5px',
        borderTopWidth: isHovered ? '3.5px' : '0px',
        transition: 'border-width 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.3s, transform 0.3s'
      }}
    >
      <div
        className="absolute left-0 top-0 z-20 flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-br-[10px] rounded-tl-[14px] sm:rounded-tl-[22px] sm:rounded-br-[18px] text-white shadow-xs"
        style={{ backgroundColor: itemAccent }}
      >
        <span className="text-[8px] font-black tracking-wider sm:text-[11px]">
          {displayNum}
        </span>
      </div>
      
      <div className="absolute right-1.5 top-1.5 opacity-[0.15] pointer-events-none z-0">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
          <pattern id={`dot-grid-${id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill={itemAccent} />
          </pattern>
          <rect width="14" height="14" fill={`url(#dot-grid-${id})`} />
        </svg>
      </div>

      <div className="relative z-10 flex w-full items-center gap-1.5 pl-1 pt-1 sm:gap-3 sm:pl-2.5 sm:pt-1">
        <div
          className="relative z-10 flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-slate-100 transition-all duration-300 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: `0 4px 12px -2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(255,255,255,0.9), 0 0 0 1px ${itemAccent}15`
          }}
        >
          <div
            className="absolute inset-0.5 rounded-full pointer-events-none"
            style={{ backgroundColor: `${itemAccent}05` }}
          />
          {/* Using CrimeCardLock instead of standard Lucide Icon */}
          <div className="relative z-10 h-3.5 w-3.5 sm:h-6 sm:w-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <CrimeCardLock isUnlocking={isUnlocking} />
          </div>
        </div>

        <div className="min-w-0 flex-1 pr-0.5">
          <span
            className="block text-[9px] font-extrabold leading-[1.15] tracking-tight transition-colors duration-300 sm:text-[12.5px] line-clamp-2"
            style={{ color: isHovered ? itemAccent : '#0f172a' }}
          >
            {title}
          </span>
          <span className="block text-[7px] font-normal leading-tight text-slate-400 line-clamp-1 truncate sm:text-[9.5px]">
            Explore software product details.
          </span>
          <span
            className="mt-0.5 flex w-fit items-center gap-0.5 text-[7.5px] font-extrabold transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[9.5px]"
            style={{ color: itemAccent }}
          >
            Unlock <span className="text-[8px] sm:text-[10px]">→</span>
          </span>
        </div>
      </div>
    </button>
  );
}
