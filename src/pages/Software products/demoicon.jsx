import React, { useState } from 'react';
import { FaCube, FaArrowsRotate } from 'react-icons/fa6';

const icons = [
  { id: 1, name: 'demo 1', Icon: FaCube, color: '#0ea5e9', animClass: 'anim-spin-slow' },
  { id: 2, name: 'demo 2', Icon: FaCube, color: '#f59e0b', animClass: 'anim-nod' },
  { id: 3, name: 'demo 3', Icon: FaCube, color: '#8b5cf6', animClass: 'anim-robot' },
  { id: 4, name: 'demo 4', Icon: FaCube, color: '#737373', animClass: 'anim-shake' },
  { id: 5, name: 'demo 5', Icon: FaCube, color: '#ef4444', animClass: 'anim-drive-fast' },
  { id: 6, name: 'demo 6', Icon: FaCube, color: '#ec4899', animClass: 'anim-give' },
  { id: 7, name: 'demo 7', Icon: FaCube, color: '#10b981', animClass: 'anim-scan' },
  { id: 8, name: 'demo 8', Icon: FaCube, color: '#f97316', animClass: 'anim-read' },
  { id: 9, name: 'demo 9', Icon: FaCube, color: '#14b8a6', animClass: 'anim-slide-up' },
  { id: 10, name: 'demo 10', Icon: FaCube, color: '#eab308', animClass: 'anim-drive' },
  { id: 11, name: 'demo 11', Icon: FaCube, color: '#f43f5e', animClass: 'anim-snip' },
  { id: 12, name: 'demo 12', Icon: FaCube, color: '#06b6d4', animClass: 'anim-ring' },
  { id: 13, name: 'demo 13', Icon: FaCube, color: '#a855f7', animClass: 'anim-chug' },
  { id: 14, name: 'demo 14', Icon: FaCube, color: '#3b82f6', animClass: 'anim-type' },
  { id: 15, name: 'demo 15', Icon: FaCube, color: '#6366f1', animClass: 'anim-expand' },
  { id: 16, name: 'demo 16', Icon: FaCube, color: '#d946ef', animClass: 'anim-weigh' },
  { id: 17, name: 'demo 17', Icon: FaCube, color: '#64748b', animClass: 'anim-write' },
  { id: 18, name: 'demo 18', Icon: FaCube, color: '#dc2626', animClass: 'anim-stamp' },
  { id: 19, name: 'demo 19', Icon: FaCube, color: '#22c55e', animClass: 'anim-defend' },
  { id: 20, name: 'demo 20', Icon: FaCube, color: '#84cc16', animClass: 'anim-pulse-scale' },
];

export default function DemoIcon() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* --- Page Load Animation --- */
        @keyframes zoom-in-forward { 0% { opacity: 0; transform: scale(0) translateZ(-500px); } 50% { opacity: 1; transform: scale(1.05) translateZ(0); } 100% { opacity: 1; transform: scale(1) translateZ(0); } }
        .animate-zoom-in { opacity: 0; animation: zoom-in-forward 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Icon Hover Animations */
        @keyframes anim-pulse-scale { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .anim-pulse-scale { animation: anim-pulse-scale 1.5s infinite ease-in-out; }

        @keyframes anim-nod { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(15deg); } 75% { transform: rotate(-10deg); } }
        .anim-nod { animation: anim-nod 1.5s infinite ease-in-out; }

        @keyframes anim-robot { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .anim-robot { animation: anim-robot 0.4s infinite steps(3, end); }

        @keyframes anim-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .anim-shake { animation: anim-shake 0.4s infinite linear; }

        @keyframes anim-drive-fast { 0% { transform: translateX(-12px) skewX(-10deg); opacity: 0; } 20% { transform: translateX(-6px) skewX(-10deg); opacity: 1; } 80% { transform: translateX(6px) skewX(-10deg); opacity: 1; } 100% { transform: translateX(12px) skewX(-10deg); opacity: 0; } }
        .anim-drive-fast { animation: anim-drive-fast 0.6s infinite linear; }

        @keyframes anim-give { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-5px) scale(1.1); } }
        .anim-give { animation: anim-give 1.5s infinite ease-in-out; }

        @keyframes anim-scan { 0%, 100% { transform: translateY(-4px); opacity: 1; } 50% { transform: translateY(4px); opacity: 0.5; } }
        .anim-scan { animation: anim-scan 1s infinite ease-in-out; }

        @keyframes anim-read { 0%, 100% { transform: rotateY(0deg); } 50% { transform: rotateY(30deg); } }
        .anim-read { animation: anim-read 1.5s infinite ease-in-out; }

        @keyframes anim-slide-up { 0% { transform: translateY(8px); opacity: 0; } 20% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(-4px); opacity: 1; } 100% { transform: translateY(-12px); opacity: 0; } }
        .anim-slide-up { animation: anim-slide-up 1.5s infinite ease-out; }

        @keyframes anim-drive { 0% { transform: translateX(-10px); opacity: 0; } 20% { transform: translateX(-5px); opacity: 1; } 80% { transform: translateX(5px); opacity: 1; } 100% { transform: translateX(10px); opacity: 0; } }
        .anim-drive { animation: anim-drive 1.2s infinite linear; }

        @keyframes anim-snip { 0%, 100% { transform: rotate(0deg) scale(1, 1); } 25% { transform: rotate(-10deg) scale(1.1, 0.7); } 50% { transform: rotate(0deg) scale(1, 1); } 75% { transform: rotate(-10deg) scale(1.1, 0.7); } }
        .anim-snip { animation: anim-snip 0.6s infinite ease-in-out; }

        @keyframes anim-ring { 0%, 100% { transform: rotate(0deg); } 10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); } 20%, 40%, 60%, 80% { transform: rotate(10deg); } }
        .anim-ring { animation: anim-ring 1s infinite ease-in-out; }

        @keyframes anim-chug { 0% { transform: scale(0.5) translateY(4px); opacity: 0; } 20% { transform: scale(0.7) translateY(-2px); opacity: 1; } 40% { transform: scale(0.9) translateY(2px); opacity: 1; } 60% { transform: scale(1.1) translateY(-2px); opacity: 1; } 80% { transform: scale(1.3) translateY(2px); opacity: 1; } 100% { transform: scale(1.5) translateY(-2px); opacity: 0; } }
        .anim-chug { animation: anim-chug 1.2s infinite linear; }

        @keyframes anim-type { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        .anim-type { animation: anim-type 0.3s infinite ease-in-out; }

        @keyframes anim-expand { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .anim-expand { animation: anim-expand 1.5s infinite ease-in-out; }

        @keyframes anim-weigh { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
        .anim-weigh { animation: anim-weigh 2s infinite ease-in-out; }

        @keyframes anim-write { 0%, 100% { transform: translateX(0) translateY(0); } 25% { transform: translateX(4px) translateY(2px); } 50% { transform: translateX(-2px) translateY(-2px); } 75% { transform: translateX(6px) translateY(4px); } }
        .anim-write { animation: anim-write 0.8s infinite linear; }

        @keyframes anim-stamp { 0% { transform: scale(1.5); opacity: 0; } 30% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .anim-stamp { animation: anim-stamp 1s infinite ease-in; }

        @keyframes anim-spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .anim-spin-slow { animation: anim-spin-slow 2s infinite linear; }

        @keyframes anim-defend { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px) scale(1.1); } 75% { transform: translateX(4px) scale(1.1); } }
        .anim-defend { animation: anim-defend 0.5s infinite ease-in-out; }
      `}</style>

      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-start sm:justify-center p-4 pt-24 sm:p-8 sm:pt-28 relative z-0">
        {/* 3. Tech-Style Dot Pattern */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>

        {/* 2. Ambient Glowing Mesh Orbs */}
        <div className="absolute top-[-15%] left-[-5%] w-[80vw] lg:w-[50vw] h-[80vw] lg:h-[50vw] rounded-full bg-indigo-400/20 blur-[100px] lg:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[80vw] lg:w-[50vw] h-[80vw] lg:h-[50vw] rounded-full bg-rose-400/20 blur-[100px] lg:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-[20%] right-[20%] w-[50vw] lg:w-[30vw] h-[50vw] lg:h-[30vw] rounded-full bg-teal-400/10 blur-[80px] lg:blur-[100px] -z-10 pointer-events-none"></div>

        <main className="w-full max-w-6xl mx-auto flex items-center justify-center min-h-full py-12 lg:py-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-6 lg:gap-8 justify-items-center w-full z-10">
            {icons.map(({ id, name, Icon, color, animClass }, i) => (
              <div
                key={id}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="animate-zoom-in group flex flex-col items-center justify-start cursor-pointer transition-all duration-300 w-32"
                style={{
                  animationDelay: `${i * 0.08}s`
                }}
              >
                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center w-20 h-20 mb-3 rounded-[20px] transition-colors duration-300`}
                  style={{
                    backgroundColor: hoveredId === id ? `${color}15` : 'transparent',
                  }}
                >
                  <div className={hoveredId === id ? animClass : ''}>
                    <Icon
                      size={46}
                      color={color}
                      style={{
                        transition: 'filter 0.3s ease',
                        filter: hoveredId === id ? `drop-shadow(0 8px 12px ${color}88)` : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Icon Label */}
                <p
                  className={`text-center text-xs font-bold leading-tight transition-all duration-300 px-1 ${hoveredId === id ? 'scale-105' : ''}`}
                  style={{ color: hoveredId === id ? color : '#475569' }}
                >
                  {name}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}


