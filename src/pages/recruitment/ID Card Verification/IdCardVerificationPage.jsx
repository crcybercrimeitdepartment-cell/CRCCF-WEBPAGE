import React from 'react';

// Embedded CSS for the custom swing animation so this file is 100% self-contained
const styles = `
  @keyframes swing {
    0% { rotate: 0deg; }
    25% { rotate: 5deg; }
    75% { rotate: -5deg; }
    100% { rotate: 0deg; }
  }
  .swing-on-hover {
    transition: rotate 0.3s ease-in-out;
  }
  .group:hover .swing-on-hover {
    animation: swing 1.5s ease-in-out infinite;
  }
`;

const titles = [
  "Employee ID Card", "Officer ID Card", "Executive ID Card", "Management ID Card", "Director ID Card",
  "Contract Employee ID Card", "Part-Time Employee ID Card", "Project Employee ID Card", "Probationary Employee ID Card",
  "Temporary Staff ID Card", "Consultant ID Card", "Technical Expert ID Card", "Advisory Board ID Card",
  "Governing Body ID Card", "Authorized Representative ID Card", "Partner ID Card", "Member ID Card", "Life Member ID Card",
  "Associate Member ID Card", "Honorary Member ID Card", "Alumni ID Card", "Intern ID Card", "Student ID Card",
  "Trainee ID Card", "Researcher ID Card", "Research Associate ID Card", "Trainer ID Card", "Faculty ID Card",
  "Fellow ID Card", "Mentor ID Card", "Volunteer ID Card", "Field Officer ID Card", "Project Associate ID Card",
  "Event Staff ID Card", "Campus Ambassador ID Card", "Community Representative ID Card", "Vendor ID Card",
  "Media & Press ID Card", "Visitor ID Card", "Guest ID Card"
];

const colors = ['#092133', '#f39c12', '#2b7a8c', '#e74c3c', '#8e44ad', '#27ae60', '#c0392b', '#2980b9', '#d35400', '#16a085'];
const rotations = ['rotate-3', '-rotate-2', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1'];
const clipRotations = ['rotate-[15deg]', '-rotate-[15deg]', 'rotate-[10deg]', '-rotate-[10deg]', 'rotate-[5deg]', '-rotate-[5deg]'];
const clipLefts = ['left-[55%]', 'left-[45%]', 'left-[50%]', 'left-[60%]', 'left-[40%]'];

const cardsData = titles.map((title, index) => {
  return {
    id: (index + 1).toString().padStart(2, '0'),
    title: title,
    color: colors[index % colors.length],
    rotation: rotations[index % rotations.length],
    clipRotate: clipRotations[index % clipRotations.length],
    clipLeft: clipLefts[index % clipLefts.length]
  };
});

export default function IdCardVerificationPage() {
  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-[#f4f4f4] py-8 sm:py-12 md:py-20 px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16 mt-4 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0C1A3A] tracking-tight mb-3 sm:mb-4 font-serif">
            ID Card Verification
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto px-4">
            Verify the authenticity of official ID cards issued by CR Cyber Crime Foundation. Select the respective category below to proceed with the verification process.
          </p>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8 justify-items-center">
          {cardsData.map((card, index) => (
            <div 
              key={card.id} 
              className="relative group w-[280px] h-[360px] bg-white rounded-3xl flex flex-col items-center pt-[140px] px-8 shadow-[-20px_20px_40px_rgba(0,0,0,0.1)] mt-8"
            >
              
              {/* Expanding Background Fill on Hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-none">
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-[80]"
                  style={{ backgroundColor: card.color }}
                ></div>
              </div>

              {/* Sticky Note Stack (Swings on card hover) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[110px] z-20 swing-on-hover origin-top">
                
                {/* Background White Paper (creates the stack effect) */}
                <div 
                  className="absolute inset-0 bg-white rounded-sm shadow-[2px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ 
                    transform: card.rotation.startsWith('-') ? 'rotate(3deg)' : 'rotate(-3deg)' 
                  }}
                ></div>

                {/* Foreground Colored Paper */}
                <div 
                  className={`absolute inset-0 rounded-sm flex items-center justify-center ${card.rotation} shadow-[1px_2px_4px_rgba(0,0,0,0.1)]`} 
                  style={{ backgroundColor: card.color }}
                >
                  <span className="text-white text-[48px] font-semibold tracking-tight">
                    {card.id}
                  </span>
                </div>

                {/* Paperclip */}
                <div 
                  className={`absolute -top-7 ${card.clipLeft} ${card.clipRotate} text-[#6c757d] z-10`}
                  style={{ filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.25))' }}
                >
                  <svg width="34" height="52" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 19 26 V 8 A 5.5 5.5 0 0 0 8 8 V 36 A 3.5 3.5 0 0 0 15 36 V 12 A 1.5 1.5 0 0 0 12 12 V 28" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h2 
                className="text-[12px] font-bold tracking-[0.05em] mt-2 uppercase relative z-10 transition-colors duration-1000 group-hover:!text-white text-center leading-snug" 
                style={{ color: card.color }}
              >
                {card.title}
              </h2>
              <p className="text-[10px] text-gray-400 text-center mt-3 leading-[1.6] relative z-10 transition-colors duration-1000 group-hover:text-gray-200">
                <span className="font-bold text-gray-700 transition-colors duration-1000 group-hover:text-white">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
              </p>

              {/* Bottom Pill */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-[8px] rounded-full z-10 transition-transform duration-1000 group-hover:scale-125" 
                style={{ backgroundColor: card.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// MOUNTING LOGIC (Optional)
// If you want to use this single file as your main entry point (main.jsx), 
// you can uncomment the lines below to have it render directly into the DOM!
// ============================================================================
/*
import { createRoot } from 'react-dom/client';
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(<IdCardGallery />);
  }
}
*/
