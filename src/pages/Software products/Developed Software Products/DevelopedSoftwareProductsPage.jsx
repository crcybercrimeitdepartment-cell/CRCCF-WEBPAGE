import React, { useState } from 'react';
import {
  FaNetworkWired,
  FaUserTie,
  FaRobot,
  FaUserSlash,
  FaTruckMedical,
  FaHandHoldingHeart,
  FaFingerprint,
  FaBookOpen,
  FaFileInvoiceDollar,
  FaCarSide,
  FaScissors,
  FaHeadset,
  FaTrain,
  FaLaptopCode,
  FaSitemap,
  FaScaleBalanced,
  FaPenNib,
  FaFilePdf,
  FaGlobe,
  FaShieldVirus
} from 'react-icons/fa6';

const icons = [
  { id: 19, name: 'CR-OD-Nexora', Icon: FaGlobe, color: '#0ea5e9', animClass: 'anim-spin-slow' }, // Sky
  { id: 2, name: 'CRODNEXTALENT', Icon: FaUserTie, color: '#f59e0b', animClass: 'anim-nod' }, // Amber
  { id: 3, name: 'CR-OD-CareerAI', Icon: FaRobot, color: '#8b5cf6', animClass: 'anim-robot' }, // Violet
  { id: 4, name: 'CR-OD-Missing-Connect', Icon: FaUserSlash, color: '#737373', animClass: 'anim-shake' }, // Neutral Gray
  { id: 5, name: 'CR-OD-Emergency', Icon: FaTruckMedical, color: '#ef4444', animClass: 'anim-drive-fast' }, // Red
  { id: 6, name: 'CR-OD-Citizen-Help', Icon: FaHandHoldingHeart, color: '#ec4899', animClass: 'anim-give' }, // Pink
  { id: 7, name: 'CR-OD-Cyber-Verify', Icon: FaFingerprint, color: '#10b981', animClass: 'anim-scan' }, // Emerald
  { id: 8, name: 'CR-OD-Digital-Library', Icon: FaBookOpen, color: '#f97316', animClass: 'anim-read' }, // Orange
  { id: 9, name: 'CR-OD-BillDesk', Icon: FaFileInvoiceDollar, color: '#14b8a6', animClass: 'anim-slide-up' }, // Teal
  { id: 10, name: 'CR-OD-Ride', Icon: FaCarSide, color: '#eab308', animClass: 'anim-drive' }, // Yellow
  { id: 11, name: 'CR-OD-ParlourHub', Icon: FaScissors, color: '#f43f5e', animClass: 'anim-snip' }, // Rose
  { id: 12, name: 'CR-OD-IO-Assistance', Icon: FaHeadset, color: '#06b6d4', animClass: 'anim-ring' }, // Cyan
  { id: 13, name: 'RRB', Icon: FaTrain, color: '#a855f7', animClass: 'anim-chug' }, // Purple
  { id: 14, name: 'Online-Exam-Portal', Icon: FaLaptopCode, color: '#3b82f6', animClass: 'anim-type' }, // Blue
  { id: 15, name: 'CR-OD-HRMS', Icon: FaSitemap, color: '#6366f1', animClass: 'anim-expand' }, // Indigo
  { id: 16, name: 'CR-OD-Legal-Document', Icon: FaScaleBalanced, color: '#d946ef', animClass: 'anim-weigh' }, // Fuchsia
  { id: 17, name: 'CR-OD-Legal-Drafting', Icon: FaPenNib, color: '#64748b', animClass: 'anim-write' }, // Slate
  { id: 18, name: 'CR-OD-Legal-PDF', Icon: FaFilePdf, color: '#dc2626', animClass: 'anim-stamp' }, // Crimson Red
  { id: 20, name: 'CR-OD-Cyber Threat', Icon: FaShieldVirus, color: '#22c55e', animClass: 'anim-defend' }, // Green
  { id: 21, name: 'CR-OD-NEXCORE', Icon: FaNetworkWired, color: '#84cc16', animClass: 'anim-pulse-scale' }, // Lime
];

export default function IconDashboard() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* --- Premium Page Load Animation --- */
        @keyframes fade-up-spring {
          0% { opacity: 0; transform: translateY(60px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-up { 
          opacity: 0; 
          animation: fade-up-spring 0.9s cubic-bezier(0.2, 0.8, 0.1, 1.1) forwards; 
        }

        @keyframes orb-reveal {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-orb { opacity: 0; animation: orb-reveal 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes bg-grid-reveal { 0% { opacity: 0; } 100% { opacity: 0.5; } }
        .animate-grid { opacity: 0; animation: bg-grid-reveal 2s ease-in-out forwards; }

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
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] animate-grid"></div>

        {/* 2. Ambient Glowing Mesh Orbs */}
        <div className="absolute top-[-15%] left-[-5%] w-[80vw] lg:w-[50vw] h-[80vw] lg:h-[50vw] rounded-full bg-indigo-400/20 blur-[100px] lg:blur-[120px] -z-10 pointer-events-none animate-orb" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[80vw] lg:w-[50vw] h-[80vw] lg:h-[50vw] rounded-full bg-rose-400/20 blur-[100px] lg:blur-[120px] -z-10 pointer-events-none animate-orb" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute top-[20%] right-[20%] w-[50vw] lg:w-[30vw] h-[50vw] lg:h-[30vw] rounded-full bg-teal-400/10 blur-[80px] lg:blur-[100px] -z-10 pointer-events-none animate-orb" style={{ animationDelay: '0.6s' }}></div>

        <main className="w-full max-w-6xl mx-auto flex items-center justify-center my-auto pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-8 sm:gap-6 lg:gap-8 justify-items-center w-full z-10">
            {icons.map(({ id, name, Icon, color, animClass }, i) => (
              <div
                key={id}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="animate-fade-up group flex flex-col items-center justify-start cursor-pointer transition-all duration-300 w-32"
                style={{
                  animationDelay: `${i * 0.05}s`
                }}
              >
                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center w-20 h-20 mb-3 rounded-2xl transition-all duration-400 ease-out`}
                  style={{
                    background: hoveredId === id ? `linear-gradient(135deg, ${color}25 0%, ${color}05 100%)` : 'transparent',
                    boxShadow: hoveredId === id ? `0 12px 24px -6px ${color}50, inset 0 1px 3px rgba(255, 255, 255, 0.7)` : 'none',
                    backdropFilter: hoveredId === id ? 'blur(8px)' : 'none',
                    transform: hoveredId === id ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                  }}
                >
                  <div className={hoveredId === id ? animClass : 'transition-transform duration-400'}>
                    <Icon
                      size={46}
                      color={color}
                      style={{
                        transition: 'all 0.4s ease',
                        filter: hoveredId === id ? `drop-shadow(0 8px 16px ${color}90)` : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Icon Label */}
                <p
                  className={`text-center text-xs font-bold leading-tight transition-all duration-400 px-1`}
                  style={{
                    color: hoveredId === id ? color : '#475569',
                    transform: hoveredId === id ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)'
                  }}
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
