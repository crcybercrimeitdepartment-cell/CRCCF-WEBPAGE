import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Award } from 'lucide-react';

import { certificates } from './CertificatePageData.js';

const Watermark = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {[...Array(16)].map((_, i) => (
      <ellipse
        key={i}
        cx="50"
        cy="50"
        rx="45"
        ry="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        transform={`rotate(${i * 11.25} 50 50)`}
      />
    ))}
  </svg>
);

const CornerFan = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M0,0 L100,0 A100,100 0 0,0 0,100 Z" fill="#cbd9c8" />
    <path d="M0,0 L100,0 A100,100 0 0,0 0,100 Z" fill="none" stroke="#4d6952" strokeWidth="4" />
    {[...Array(7)].map((_, i) => {
      const angle = (i + 1) * 11.25;
      const rad = (angle * Math.PI) / 180;
      const x = 100 * Math.cos(rad);
      const y = 100 * Math.sin(rad);
      return (
        <line
          key={i}
          x1="0"
          y1="0"
          x2={x}
          y2={y}
          stroke="#4d6952"
          strokeWidth="2"
        />
      );
    })}
    <path d="M0,25 A25,25 0 0,0 25,0" fill="none" stroke="#4d6952" strokeWidth="3" />
    <path d="M0,45 A45,45 0 0,0 45,0" fill="none" stroke="#4d6952" strokeWidth="1" />
  </svg>
);

function CertificateCard({ name, icon: Icon, description, issuer, date, index }) {
  const navigate = useNavigate();
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div 
      onClick={() => navigate(`/recruitment/certificate-verification/${slug}`)}
      className="group relative w-full h-full min-h-[220px] bg-[#4d6952] p-[6px] rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fade-up cursor-pointer"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent z-40 pointer-events-none transform skew-x-12"></div>

      {/* Texture overlay for outer border (subtle) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
      
      {/* Light Green Inner Border Wrapper */}
      <div className="relative w-full h-full bg-[#cbd9c8] p-[8px] rounded-sm flex flex-col transition-colors duration-300 group-hover:bg-[#d5e0d3]">
        
        {/* The Paper Wrapper */}
        <div className="relative w-full h-full bg-[#f4f5f0] rounded-[2px] flex flex-col overflow-hidden transition-all duration-300 group-hover:bg-white">
          
          {/* Thin inner border */}
          <div className="absolute inset-[3px] border-[1px] border-[#4d6952]/30 pointer-events-none z-20 transition-colors duration-300 group-hover:border-[#4d6952]/50"></div>

          {/* SVG Corners */}
          <CornerFan className="absolute top-0 left-0 w-9 h-9 z-10 transition-transform duration-500 group-hover:scale-110" />
          <CornerFan className="absolute top-0 right-0 w-9 h-9 scale-x-[-1] z-10 transition-transform duration-500 group-hover:-scale-x-110 group-hover:scale-y-110" />
          <CornerFan className="absolute bottom-0 left-0 w-9 h-9 scale-y-[-1] z-10 transition-transform duration-500 group-hover:scale-x-110 group-hover:-scale-y-110" />
          <CornerFan className="absolute bottom-0 right-0 w-9 h-9 scale-x-[-1] scale-y-[-1] z-10 transition-transform duration-500 group-hover:-scale-x-110 group-hover:-scale-y-110" />

          {/* Watermark */}
          <Watermark className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 text-[#4d6952] opacity-[0.06] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-[0.09]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-6 py-4">
            
            {/* Centered Course Info & Description */}
            <div className="text-center flex flex-col items-center justify-center flex-grow relative">
              
              {/* Top Icon */}
              <div className="mb-2.5 flex justify-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                <Icon strokeWidth={1.5} className="w-9 h-9 text-[#3a5340] drop-shadow-sm transition-colors duration-300 group-hover:text-[#2c3f30]" />
              </div>

              <div className="flex flex-col items-center justify-center w-full">
                <h3 className="text-[17px] md:text-[19px] font-bold text-[#3a5340] leading-tight font-serif tracking-wide mb-1.5 transition-colors duration-300 group-hover:text-[#2c3f30] px-1">
                  {name}
                </h3>
                
                <div className="w-10 h-[2px] bg-[#3a5340]/30 mb-2 rounded-full transition-colors duration-300 group-hover:bg-[#3a5340]/60"></div>
                
                <p className="text-[10px] md:text-[10.5px] text-[#4b5563]/90 italic font-sans leading-snug px-1 text-center transition-colors duration-300 group-hover:text-[#4b5563]">
                  {description}
                </p>
              </div>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
}

const GuillocheBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none animate-[spin_180s_linear_infinite]" viewBox="0 0 1000 1000">
    <g fill="none" stroke="#4d6952" strokeWidth="0.5">
      {[...Array(90)].map((_, i) => (
        <path 
          key={i}
          d="M 500,500 m -350,0 a 350,350 0 1,0 700,0 a 350,350 0 1,0 -700,0"
          transform={`rotate(${i * 4} 500 500) translate(80, 0)`}
        />
      ))}
    </g>
  </svg>
);

const OrnateFramePattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="art-design" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="60" height="60" fill="none" />
        {/* Center Star */}
        <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="#d4af37" opacity="0.2"/>
        {/* Interlocking Rings */}
        <circle cx="0" cy="0" r="22" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4"/>
        <circle cx="60" cy="0" r="22" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4"/>
        <circle cx="0" cy="60" r="22" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4"/>
        <circle cx="60" cy="60" r="22" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4"/>
        {/* Inner solid ring */}
        <circle cx="30" cy="30" r="14" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="30" cy="30" r="10" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.8"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#art-design)" />
  </svg>
);

const GoldSeal = () => (
  <div className="flex flex-col items-center z-50 -mt-16 mb-20">
    <div className="relative flex justify-center items-center">
      {/* Ribbon tails */}
      <div className="absolute top-[65%] flex gap-4 -z-10">
        <div className="w-8 h-20 bg-gradient-to-b from-[#c0392b] to-[#7f261d] shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
        <div className="w-8 h-20 bg-gradient-to-b from-[#c0392b] to-[#7f261d] shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
      </div>
      
      {/* Gold Medal */}
      <div className="w-28 h-28 bg-gradient-to-br from-[#fff6cc] via-[#d4af37] to-[#8a6b1c] rounded-full flex items-center justify-center shadow-xl border-[3px] border-[#fff1ba]">
        <div className="w-24 h-24 rounded-full border border-[#b5952f] border-dashed flex items-center justify-center bg-gradient-to-br from-[#d4af37] to-[#aa8c2c] shadow-inner">
          <Award className="w-12 h-12 text-[#fff1ba] drop-shadow-sm" />
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const setCurrentPage = (updater) => {
    const newPage = typeof updater === 'function' ? updater(currentPage) : updater;
    setSearchParams({ page: newPage }, { replace: true });
  };
  const itemsPerPage = 8;
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  
  // Get current certificates
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = certificates.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-12 lg:p-20 flex justify-center items-center font-sans overflow-x-hidden">
      
      {/* Ornate Art Design Frame */}
      <div className="relative w-full max-w-[1500px] p-[24px] md:p-[32px] lg:p-[48px] bg-[#1a241b] shadow-[0_40px_80px_-10px_rgba(0,0,0,1),inset_0_4px_20px_rgba(0,0,0,0.8)] rounded-md border-t-[3px] border-[#3a5340] border-b-[4px] border-[#0a120c] overflow-hidden">
        
        {/* All-over Geometric Art Pattern */}
        <OrnateFramePattern />
        
        {/* Delicate inner frame lines */}
        <div className="absolute inset-[10px] border-[1px] border-[#d4af37]/20 rounded-sm pointer-events-none z-10"></div>
        <div className="absolute inset-[16px] border-[2px] border-dashed border-[#d4af37]/30 rounded-sm pointer-events-none z-10 shadow-[0_0_10px_rgba(212,175,55,0.1)]"></div>

        {/* Inner Frame Trim (Gold/Brass Bevel) */}
        <div className="relative w-full h-full p-[6px] md:p-[10px] bg-gradient-to-br from-[#d4af37] via-[#fff1ba] to-[#8a6b1c] shadow-[0_0_30px_rgba(0,0,0,0.9)] rounded-sm z-20">
          
          {/* Outer Big Certificate Container (The Paper) */}
          <div className="relative bg-[#fbfcf9] w-full h-full shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden">
            
            {/* Massive Animated Spirograph Background */}
        <GuillocheBackground />

        {/* Simple, Elegant Outer Border */}
        <div className="absolute inset-[10px] md:inset-[20px] border-[6px] md:border-[10px] border-double border-[#4d6952]/70 rounded-md pointer-events-none z-10"></div>
        <div className="absolute inset-[20px] md:inset-[36px] border-[1px] border-[#4d6952]/30 rounded-sm pointer-events-none z-10"></div>
        
        {/* Glossy sheen animation over the borders */}
        <div className="absolute inset-0 -translate-x-[200%] animate-[shimmer_8s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-40 pointer-events-none transform skew-x-12 opacity-50"></div>
        
        {/* Simple Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 md:w-28 md:h-28 bg-[#4d6952]/5 rounded-br-full border-b-[4px] border-r-[4px] md:border-b-[6px] md:border-r-[6px] border-double border-[#4d6952]/30 pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-16 h-16 md:w-28 md:h-28 bg-[#4d6952]/5 rounded-bl-full border-b-[4px] border-l-[4px] md:border-b-[6px] md:border-l-[6px] border-double border-[#4d6952]/30 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-28 md:h-28 bg-[#4d6952]/5 rounded-tr-full border-t-[4px] border-r-[4px] md:border-t-[6px] md:border-r-[6px] border-double border-[#4d6952]/30 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 md:w-28 md:h-28 bg-[#4d6952]/5 rounded-tl-full border-t-[4px] border-l-[4px] md:border-t-[6px] md:border-l-[6px] border-double border-[#4d6952]/30 pointer-events-none z-0"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full flex flex-col items-center mt-6">
          
          {/* Top Gold Seal Ribbon (Now inside content flow) */}
          <GoldSeal />

          {/* Header */}
          <div className="text-center mb-10 md:mb-14 relative px-2 sm:px-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[68px] text-[#2c3f30] mb-4 md:mb-6 font-bold tracking-wider md:tracking-widest uppercase drop-shadow-sm leading-tight">
              Certificate Verification
            </h1>
            
            {/* Ornate Divider */}
            <div className="flex items-center justify-center gap-2 md:gap-6 mb-6 md:mb-8">
              <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-[#3a5340] to-[#3a5340]"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 border-[2px] border-[#3a5340]/80"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-[#3a5340]/60 mx-0.5 md:mx-1"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 border-[2px] border-[#3a5340]/80"></div>
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent via-[#3a5340] to-[#3a5340]"></div>
            </div>

            <p className="text-[#3a5340] text-[14px] md:text-[18px] max-w-3xl mx-auto font-serif italic tracking-wide leading-relaxed">
              "Verify the authenticity and details of the issued certificates below. 
              Each credential represents a verified achievement and technical milestone."
            </p>
          </div>

          {/* Grid of Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 xl:gap-6 w-full px-2 md:px-4 pb-4 min-h-[460px]">
            {currentCertificates.map((cert, index) => (
              <CertificateCard key={cert.id} index={index} {...cert} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 mb-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-[#4d6952] text-[#fbfcf9] rounded-[4px] font-serif font-bold tracking-wide hover:bg-[#3a5340] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 min-w-[120px]"
            >
              Previous
            </button>
            <div className="text-[#2c3f30] font-serif font-bold text-[17px] min-w-[100px] text-center">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 bg-[#4d6952] text-[#fbfcf9] rounded-[4px] font-serif font-bold tracking-wide hover:bg-[#3a5340] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 min-w-[120px]"
            >
              Next
            </button>
          </div>

        </div>
      </div>
      </div>
      </div>

    </div>
  );
}


