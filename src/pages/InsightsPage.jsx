import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ArrowLeft, MousePointer2, Play, Pause, ChevronLeft, Home, ShieldCheck, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { 
  latestNews, 
  videos, 
  infographicsData, 
  shapes, 
  paperPieces, 
  insights 
} from './InsightsPageData.js';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Gradient Card */}
      <section className="relative mt-6 p-6 md:p-10 rounded-[40px] bg-gradient-to-r from-[#00b4ff] to-[#7b61ff] overflow-hidden flex flex-col items-center min-h-[300px] md:min-h-[400px]">
        

        
        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center flex-grow text-center max-w-4xl mx-auto mt-12 md:mt-0">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/20"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-sm"
          >
             Insights & Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base lg:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
           Latest Cybersecurity Trends, Research, Awareness & Expert Guidance to keep you protected in the digital age. 
          </motion.p>
        </div>
      </section>

    </div>
  );
}


const newsItems = [
  {
    title: 'New Cyber Fraud Techniques Target Remote Workers',
    date: '09 May, 2024',
    rating: '3.5',
    description: 'Security researchers have identified a sophisticated new phishing campaign specifically targeting remote employees using fake IT support portals and VPN credential harvesting techniques.'
  },
  {
    title: 'Government Launches New Cybersecurity Initiatives for SMEs',
    date: '27 Jun, 2024',
    rating: '3.0',
    description: 'In a bid to strengthen national digital infrastructure, the government has announced a $50M grant program to help small and medium enterprises upgrade their cybersecurity defenses and conduct regular audits.'
  },
  {
    title: 'Major Data Breach Exposes Millions of User Records',
    date: '11 Jul, 2024',
    rating: '4.4',
    description: 'A misconfigured cloud database has resulted in the exposure of over 10 million user records, including email addresses, encrypted passwords, and partial payment information.'
  },
  {
    title: 'New Cyber Regulations Enforced for Financial Sector',
    date: '15 Aug, 2024',
    rating: '4.0',
    description: 'The central bank has rolled out stringent new cybersecurity mandates for all financial institutions, requiring mandatory bi-annual penetration testing and strict 24-hour incident reporting.'
  },
  {
    title: 'Technology Security Updates: Critical Patch for Major OS',
    date: '02 Sep, 2024',
    rating: '4.9',
    description: 'A zero-day vulnerability affecting millions of desktop operating systems has been patched. Users are urged to install the latest security update immediately to prevent remote code execution attacks.'
  }
];

function LatestNews() {
  // Set default hovered index to 0
  const [hoveredIndex, setHoveredIndex] = useState(0);

  // Auto-advance the active card every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHoveredIndex((prev) => (prev + 1) % newsItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 lg:py-8 w-full mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        
        {/* Header & Sticky Description Column */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 pr-4 md:pr-8">
            
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live Updates
            </div>

            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">News</span>
            </h2>
            
            <p className="text-slate-600 text-base mb-6 leading-relaxed">
              Stay updated with real-time alerts, breach reports, and global regulatory updates in the cyber landscape. 
            </p>



            {/* Interactive Area Divider */}
            <div className="hidden lg:block mt-12 pt-8 border-t border-slate-200/60 relative">
              <div className="absolute -top-3 left-0 bg-[#f8fafc] px-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                Interactive Detail View
              </div>
              
              <div className="relative min-h-[220px] mt-4">
                
                {/* Default Empty State */}
                <div 
                  className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 ${hoveredIndex !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
                >
                  <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <MousePointer2 className="w-5 h-5 text-blue-500 animate-bounce" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Hover over any news article on the right to read its detailed summary here.
                  </p>
                </div>

                {/* Hovered Premium Description Card */}
                <div 
                  className={`absolute inset-0 transition-all duration-500 ${hoveredIndex !== null ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
                >
                  {hoveredIndex !== null && (
                    <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden flex flex-col">
                      
                      {/* Decorative Background Glow */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex-grow">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-4">
                          <Shield className="w-4 h-4" />
                          {newsItems[hoveredIndex].source}
                        </div>
                        
                        <h4 className="font-bold text-white text-xl mb-4 leading-snug">
                          {newsItems[hoveredIndex].title}
                        </h4>
                        
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                          {newsItems[hoveredIndex].description}
                        </p>
                      </div>
                      
                      <div className="relative z-10 mt-6 pt-6 border-t border-slate-700/50 flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Clock className="w-4 h-4" />
                        Published on {newsItems[hoveredIndex].date}
                      </div>
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Wavy Timeline News List */}
        <div className="relative lg:w-2/3 flex flex-col gap-6 py-4">
          
          {/* Faint connecting S-curve background */}
          <svg className="hidden lg:block absolute top-12 bottom-12 left-12 w-12 pointer-events-none" viewBox="0 0 48 100" preserveAspectRatio="none">
            <path d="M 48 0 
                     C 24 0, 24 25, 0 25 
                     C 24 25, 24 50, 48 50 
                     C 24 50, 24 75, 0 75 
                     C 24 75, 24 100, 48 100" 
                  stroke="#cbd5e1" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>

          {newsItems.map((news, idx) => {
            const isEven = idx % 2 === 0;
            const isActive = hoveredIndex === idx;

            return (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative z-10 w-full lg:w-[95%] p-4 rounded-sm border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-5 cursor-pointer
                  ${isEven ? 'lg:ml-20' : 'lg:ml-12'}
                  ${isActive ? 'bg-white border-slate-400 shadow-md scale-[1.02]' : 'bg-[#f3f4f6] border-slate-300'}
                `}
              >
                <img 
                  src={`https://i.pravatar.cc/150?u=${idx + 20}`} 
                  alt="avatar" 
                  className={`rounded-full object-cover transition-all duration-300 shrink-0
                    ${isActive ? 'w-12 h-12 border-[2px] border-white shadow-sm' : 'w-10 h-10 border-[2px] border-transparent grayscale-[30%] opacity-90'}
                  `} 
                />
                
                <div className="flex-grow">
                  <h3 className={`transition-colors duration-300 leading-tight mb-1
                    ${isActive ? 'text-slate-900 font-bold text-base' : 'text-blue-600 font-medium text-sm'}`}
                  >
                    {news.title}
                  </h3>
                  
                  {/* Inline description for mobile since hover view is hidden */}
                  <p className="block lg:hidden text-slate-500 text-xs mb-2 line-clamp-2">
                    {news.description}
                  </p>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Star Icon */}
                    <svg className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    
                    <span className={`font-bold ${isActive ? 'text-slate-800' : 'text-slate-500'} text-sm`}>
                      {news.rating}
                    </span>
                    
                    <span className="text-slate-400 text-xs ml-1">
                      on {news.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


function VideoInsights() {
  const [activeIndex, setActiveIndex] = useState(2);

  // Auto-rotate the videos every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (offset) => {
    switch (offset) {
      case 0: // Center
        return `
          w-[260px] sm:w-[280px] md:w-[400px] lg:w-[500px]
          h-[260px] sm:h-[280px] md:h-[360px] lg:h-[420px]
          left-1/2 -translate-x-1/2
          z-50 opacity-100 shadow-2xl
        `;
      case 1: // Right 1
        return `
          w-[30px] sm:w-[40px] md:w-[60px] lg:w-[80px]
          h-[210px] sm:h-[230px] md:h-[300px] lg:h-[360px]
          left-[calc(50%+140px)] sm:left-[calc(50%+168px)] md:left-[calc(50%+242px)] lg:left-[calc(50%+306px)]
          -translate-x-1/2
          z-40 opacity-100 shadow-xl
        `;
      case 2: // Right 2
        return `
          w-[20px] sm:w-[30px] md:w-[40px] lg:w-[60px]
          h-[170px] sm:h-[190px] md:h-[250px] lg:h-[300px]
          left-[calc(50%+160px)] sm:left-[calc(50%+211px)] md:left-[calc(50%+304px)] lg:left-[calc(50%+392px)]
          -translate-x-1/2
          z-30 opacity-0 sm:opacity-100 shadow-lg
        `;
      case 3: // Left 2
        return `
          w-[20px] sm:w-[30px] md:w-[40px] lg:w-[60px]
          h-[170px] sm:h-[190px] md:h-[250px] lg:h-[300px]
          left-[calc(50%-160px)] sm:left-[calc(50%-211px)] md:left-[calc(50%-304px)] lg:left-[calc(50%-392px)]
          -translate-x-1/2
          z-30 opacity-0 sm:opacity-100 shadow-lg
        `;
      case 4: // Left 1
        return `
          w-[30px] sm:w-[40px] md:w-[60px] lg:w-[80px]
          h-[210px] sm:h-[230px] md:h-[300px] lg:h-[360px]
          left-[calc(50%-140px)] sm:left-[calc(50%-168px)] md:left-[calc(50%-242px)] lg:left-[calc(50%-306px)]
          -translate-x-1/2
          z-40 opacity-100 shadow-xl
        `;
      default:
        return 'w-0 h-0 opacity-0';
    }
  };

  return (
    <section className="py-6 lg:py-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center tracking-tight">
          Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Video Insights</span>
        </h2>
        
        {/* Flat Accordion Infinite Loop Container */}
        <div className="relative w-full h-[280px] md:h-[360px] lg:h-[420px]">
          {videos.map((vid, idx) => {
            const offset = (idx - activeIndex + 5) % 5;
            const isActive = offset === 0;

            return (
              <div 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 rounded-sm cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.35,1)] flex-shrink-0 group ${getCardStyle(offset)}`}
              >
                {/* Background Image */}
                <img 
                  src={vid.img} 
                  alt={vid.title} 
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
                />
                
                {/* Dark Overlay for inactive cards */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-[0.65] group-hover:opacity-40'}`}></div>

                {/* Gradient for active card text readability */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none"></div>
                )}

                {/* Inactive Text (Vertical) */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.2em] whitespace-nowrap -rotate-90 origin-center transition-all duration-700 opacity-90 drop-shadow-md">
                      {vid.name}
                    </span>
                  </div>
                )}

                {/* Active Content */}
                <div className={`absolute inset-0 transition-opacity duration-700 delay-150 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all cursor-pointer pointer-events-auto group/play">
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-slate-900 translate-x-1 group-hover/play:text-blue-600 transition-colors" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 pr-4">
                    <p className="text-blue-300 text-xs md:text-sm lg:text-base uppercase tracking-widest font-bold drop-shadow-md mb-2">
                      {vid.role}
                    </p>
                    <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl uppercase tracking-wider leading-snug drop-shadow-lg">
                      {vid.title}
                    </h3>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


const Cloud = ({ cx, cy, scale, opacity }) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale})`} fill="white" opacity={opacity}>
    <circle cx="0" cy="0" r="30" />
    <circle cx="30" cy="-20" r="40" />
    <circle cx="70" cy="-10" r="35" />
    <circle cx="100" cy="10" r="25" />
    <circle cx="50" cy="15" r="25" />
    <rect x="-10" y="-5" width="120" height="30" rx="15" />
  </g>
);

function DonutSegment({ startAngle, endAngle, innerRadius, outerRadius, gap, color, isHovered, onMouseEnter, onMouseLeave }) {
  const pointerDepth = 35;
  const pointerWidthAngle = 3;

  const start = (startAngle + gap) * Math.PI / 180;
  const end = (endAngle - gap) * Math.PI / 180;
  const mid = (startAngle + endAngle) / 2 * Math.PI / 180;
  
  const pStart = mid + (pointerWidthAngle * Math.PI / 180);
  const pEnd = mid - (pointerWidthAngle * Math.PI / 180);

  const getCoords = (angle, radius) => ({
    x: 500 + Math.cos(angle) * radius,
    y: 500 - Math.sin(angle) * radius
  });

  const p1 = getCoords(start, outerRadius);
  const p2 = getCoords(end, outerRadius);
  const p3 = getCoords(end, innerRadius);
  const p4 = getCoords(pStart, innerRadius);
  const p5 = getCoords(mid, innerRadius - pointerDepth);
  const p6 = getCoords(pEnd, innerRadius);
  const p7 = getCoords(start, innerRadius);

  const pathData = `
    M ${p1.x} ${p1.y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerRadius} ${innerRadius} 0 0 1 ${p4.x} ${p4.y}
    L ${p5.x} ${p5.y}
    L ${p6.x} ${p6.y}
    A ${innerRadius} ${innerRadius} 0 0 1 ${p7.x} ${p7.y}
    Z
  `;

  return (
    <path 
      d={pathData} 
      fill={color} 
      className={`transition-all cursor-pointer duration-300 ${isHovered ? 'opacity-100 drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]' : 'opacity-[0.85]'}`} 
      style={{
        transformOrigin: '500px 500px',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

function Infographics() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-6 lg:py-10 w-full mx-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Interactive Infographic Container (Left Side) */}
        <div className="relative w-full lg:w-1/2 aspect-square max-w-[600px] shrink-0 mt-12 lg:mt-20">
          
          {/* Vector Graphic */}
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full">
            {/* Background Clouds */}
            <Cloud cx={150} cy={150} scale={1.8} opacity={0.7} />
            <Cloud cx={750} cy={120} scale={1.5} opacity={0.9} />
            <Cloud cx={100} cy={550} scale={1.2} opacity={0.5} />
            <Cloud cx={800} cy={450} scale={1.4} opacity={0.6} />
            <Cloud cx={850} cy={750} scale={1.7} opacity={0.8} />
            
            {/* Base cloud under the rocket */}
            <Cloud cx={350} cy={750} scale={3} opacity={1} />

            {/* Wedges */}
            {infographicsData.map((info) => (
              <DonutSegment 
                key={info.id}
                startAngle={info.start} 
                endAngle={info.end} 
                innerRadius={230} 
                outerRadius={450} 
                gap={1.5} 
                color={info.color}
                isHovered={hoveredId === info.id}
                onMouseEnter={() => setHoveredId(info.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            ))}

            {/* Center Lightbulb Rocket */}
            <g transform="translate(0, 30)">
              {/* Flames */}
              <polygon points="460,600 480,720 500,660 520,720 540,600 500,620" fill="#ef4444" />
              <polygon points="475,600 490,680 500,640 510,680 525,600 500,610" fill="#facc15" />
              
              {/* Glass Bulb Base */}
              <path d="M 425,470 Q 460,520 460,560 L 540,560 Q 540,520 575,470 Z" fill="#fbbf24" />
              
              {/* Glass Bulb Top */}
              <circle cx="500" cy="400" r="95" fill="#fbbf24" />
              
              {/* Bulb Screw Base */}
              <rect x="450" y="560" width="100" height="40" rx="6" fill="#3f3f46" />
              <line x1="450" y1="572" x2="550" y2="572" stroke="#27272a" strokeWidth="4" />
              <line x1="450" y1="585" x2="550" y2="585" stroke="#27272a" strokeWidth="4" />

              {/* Filament */}
              <path d="M 475,560 L 485,470 Q 500,450 515,470 L 525,560" stroke="#3f3f46" strokeWidth="6" fill="none" strokeLinecap="round" />
              <circle cx="485" cy="470" r="5" fill="#3f3f46" />
              <circle cx="515" cy="470" r="5" fill="#3f3f46" />
              
              {/* Glass Reflection Highlight */}
              <path d="M 440,360 A 60 60 0 0 1 480,330" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5" />
            </g>
          </svg>

          {/* HTML Text Overlays */}
          {infographicsData.map((info) => {
            const r_text = 340; 
            const midAngle = (info.start + info.end) / 2 * Math.PI / 180;
            
            const x = 50 + (Math.cos(midAngle) * r_text / 1000) * 100;
            const y = 50 - (Math.sin(midAngle) * r_text / 1000) * 100;
            const isHovered = hoveredId === info.id;

            return (
              <div 
                key={info.id} 
                className={`absolute flex flex-col items-center justify-center text-center text-white p-2 pointer-events-none drop-shadow-md transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%)`,
                  width: '24%',
                }}
              >
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black mb-0.5 md:mb-1 leading-none">{info.id}</span>
                <span className="text-[8px] sm:text-[9px] md:text-[11px] lg:text-sm font-bold border-b-2 border-white/40 pb-0.5 md:pb-1 mb-0.5 md:mb-2 tracking-widest uppercase">{info.title}</span>
                <span className="text-[7px] md:text-[9px] lg:text-[11px] leading-tight font-medium opacity-95 hidden sm:block px-2">{info.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Text Content (Right Side) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Visual <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Infographics</span>
          </h2>
          <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
            Explore our interactive roadmap highlighting the core pillars of a modern cybersecurity framework.
          </p>
          
          {/* Legend / List */}
          <ul className="space-y-4 max-w-xl">
            {infographicsData.map((info) => {
              const isHovered = hoveredId === info.id;
              return (
                <li 
                  key={info.id} 
                  onMouseEnter={() => setHoveredId(info.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ '--hover-color': info.color, '--hover-color-light': info.color + '40' }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-500 cursor-pointer relative overflow-hidden border border-transparent
                    ${isHovered ? 'bg-white translate-x-3 shadow-[0_15px_35px_var(--hover-color-light)]' : 'bg-transparent'}
                  `}
                >
                  {/* Background faint tint on hover */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-[0.05]' : 'opacity-0'}`} style={{ backgroundColor: info.color }}></div>

                  <div 
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0 shadow-sm transition-all duration-500 
                      ${isHovered ? 'scale-110 rotate-12 shadow-[0_0_20px_var(--hover-color)]' : 'scale-100 rotate-0'}`} 
                    style={{ backgroundColor: info.color }}
                  >
                    {info.id}
                  </div>
                  
                  <div className="relative z-10">
                    <h4 
                      className={`font-extrabold text-base uppercase mb-0.5 transition-all duration-500 
                        ${isHovered ? 'tracking-[0.15em] [text-shadow:0_0_12px_var(--hover-color-light)]' : 'tracking-wider'}`} 
                      style={{ color: info.color }}
                    >
                      {info.title}
                    </h4>
                    <p className={`text-xs md:text-sm font-medium transition-colors duration-500 ${isHovered ? 'text-slate-800' : 'text-slate-500'}`}>
                      {info.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}


function TrendingTopics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-6 lg:py-10 w-full overflow-hidden">
      
      {/* Injecting Hand-Drawn Google Fonts securely within the component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@700&display=swap');
        .font-marker { font-family: 'Kalam', cursive; }
        .font-hand { font-family: 'Caveat', cursive; }
        
        @media (max-width: 767px) {
          .piece-container {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            --md-translate-x: 0%;
            --md-translate-y: 0%;
            margin: 0.5rem;
          }
        }
        @media (min-width: 768px) {
          .piece-container {
            position: absolute !important;
            left: var(--piece-left) !important;
            top: var(--piece-top) !important;
            --md-translate-x: -50%;
            --md-translate-y: -50%;
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Trending Topics
        </h2>
      </div>

      {/* Scattered Torn Paper Collage Container */}
      <div className="relative w-full h-auto min-h-[300px] md:h-[500px] lg:h-[600px] max-w-[1200px] mx-auto flex flex-wrap justify-center items-center md:block py-10 md:py-0 overflow-hidden md:overflow-visible">
        {paperPieces.map((piece, index) => (
          <div 
            key={piece.id}
            className="piece-container whitespace-nowrap group"
            style={{ 
              '--piece-left': piece.left,
              '--piece-top': piece.top,
              transform: isVisible 
                ? `translate(var(--md-translate-x), var(--md-translate-y)) rotate(${piece.rot}) scale(${piece.scale})` 
                : `translate(var(--md-translate-x), 150px) rotate(${parseFloat(piece.rot) * 2}deg) scale(0.3)`,
              opacity: isVisible ? 1 : 0,
              zIndex: piece.z,
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              transitionDelay: `${index * 120}ms`
            }}
          >
            <div 
              className="transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              style={{ filter: 'drop-shadow(6px 10px 12px rgba(0,0,0,0.18))' }}
            >
              <div
                className="px-6 py-4 md:px-8 md:py-5 flex items-center justify-center"
                style={{
                  backgroundColor: piece.bg,
                  backgroundImage: piece.grid ? 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)' : 'none',
                  backgroundSize: piece.grid ? '15px 15px' : 'auto',
                  clipPath: shapes[piece.shape],
                  minWidth: '180px'
                }}
              >
                <span 
                  className={`${piece.font} font-bold tracking-wide`}
                  style={{ color: piece.color, fontSize: '1.8rem', lineHeight: 1.1 }}
                >
                  {piece.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


const cardStyles = [
  {
    bg: 'bg-[#faead6]',
    labelColor: 'text-[#f1b38f]',
    gradientStart: '#f7cfb8',
    gradientEnd: '#eaa178',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="150" cy="80" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M100 40 L120 40 L120 100 A 50 50 0 1 1 80 100 L80 40 Z" fill="url(#gradPeach)" />
        <defs>
          <linearGradient id="gradPeach" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#e6e0ef]',
    labelColor: 'text-[#a795cc]',
    gradientStart: '#d1c4e9',
    gradientEnd: '#a390ce',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="120" cy="100" r="80" fill="#ffffff" opacity="0.4" />
        <path d="M160 20 A 90 90 0 0 0 160 200 Z" fill="url(#gradPurple)" />
        <defs>
          <linearGradient id="gradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#e0efdd]',
    labelColor: 'text-[#7bbf7d]',
    gradientStart: '#a2d9a5',
    gradientEnd: '#75c279',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="160" cy="90" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M 100 20
                 Q 125 50 140 75 L 120 75
                 Q 150 100 160 125 L 135 125
                 Q 160 150 180 175
                 L 110 175 L 110 195 L 90 195 L 90 175 L 20 175
                 Q 40 150 65 125 L 40 125
                 Q 50 100 80 75 L 60 75
                 Q 75 50 100 20 Z" fill="url(#gradMint)" />
        <defs>
          <linearGradient id="gradMint" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#fce4f4]',
    labelColor: 'text-[#df8be1]',
    gradientStart: '#f3b5e4',
    gradientEnd: '#d988db',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="160" cy="100" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M120 20 Q 130 110 200 160 Q 120 140 40 160 Q 110 110 120 20 Z" fill="url(#gradPink)" />
        <defs>
          <linearGradient id="gradPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#e0f4f9]',
    labelColor: 'text-[#60b9d6]',
    gradientStart: '#8fd6e8',
    gradientEnd: '#54badb',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="120" cy="80" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M 160 30 L 220 100 L 160 170 L 100 100 Z" fill="url(#gradBlue)" />
        <defs>
          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#fdf4db]',
    labelColor: 'text-[#d6a54a]',
    gradientStart: '#f2d184',
    gradientEnd: '#d6a54a',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="160" cy="110" r="70" fill="#ffffff" opacity="0.4" />
        <rect x="110" y="100" width="80" height="60" rx="10" fill="url(#gradYellow)" />
        <path d="M 130 100 V 70 A 20 20 0 0 1 170 70 V 100" fill="none" stroke="url(#gradYellow)" strokeWidth="16" />
        <defs>
          <linearGradient id="gradYellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#e0f4ee]',
    labelColor: 'text-[#5ea896]',
    gradientStart: '#89cabc',
    gradientEnd: '#5ea896',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="140" cy="90" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M 150 30 L 200 50 L 200 110 Q 200 160 150 190 Q 100 160 100 110 L 100 50 Z" fill="url(#gradTeal)" />
        <defs>
          <linearGradient id="gradTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    bg: 'bg-[#fde0e0]',
    labelColor: 'text-[#d67b7b]',
    gradientStart: '#f2a2a2',
    gradientEnd: '#d67b7b',
    Svg: ({ gradientStart, gradientEnd, className }) => (
      <svg className={`absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform transition-all duration-700 ease-out ${className}`} viewBox="0 0 200 200">
        <circle cx="150" cy="110" r="70" fill="#ffffff" opacity="0.4" />
        <path d="M 80 110 Q 150 40 220 110 Q 150 180 80 110 Z" fill="url(#gradCoral)" />
        <circle cx="150" cy="110" r="25" fill="#ffffff" opacity="0.5" />
        <defs>
          <linearGradient id="gradCoral" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart}/>
            <stop offset="100%" stopColor={gradientEnd}/>
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

function FeaturedInsights() {
  const [page, setPage] = useState(0);
  
  const totalPages = Math.ceil(insights.length / 4);
  const visibleInsights = insights.slice(page * 4, (page + 1) * 4);

  return (
    <section className="py-4 lg:py-8 w-full mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-2 h-6 md:h-8 bg-primary-blue rounded-full"></span>
            Featured Insights
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full backdrop-blur-md border shadow-sm transition-all duration-300 
                ${page === 0 
                  ? 'bg-white/30 border-slate-200/50 text-slate-400 opacity-50 cursor-not-allowed' 
                  : 'bg-white/60 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white/80 hover:scale-105 hover:shadow-md cursor-pointer'
                }`}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button 
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full backdrop-blur-md border shadow-sm transition-all duration-300 
                ${page === totalPages - 1 
                  ? 'bg-white/30 border-slate-200/50 text-slate-400 opacity-50 cursor-not-allowed' 
                  : 'bg-white/60 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white/80 hover:scale-105 hover:shadow-md cursor-pointer'
                }`}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleInsights.map((insight, idx) => {
            const style = cardStyles[idx % 8];
            return (
              <div key={idx} className={`group relative rounded-3xl p-6 md:p-8 overflow-hidden h-[280px] md:h-[300px] flex flex-col ${style.bg} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-transparent hover:border-white/40`}>
                
                {/* Abstract Background Shapes */}
                <style.Svg 
                  gradientStart={style.gradientStart} 
                  gradientEnd={style.gradientEnd} 
                  className="translate-x-4 translate-y-4 group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-3"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`bg-white uppercase tracking-wider text-xs font-bold px-4 py-2 rounded-lg w-max mb-6 shadow-sm ${style.labelColor} transform transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    {insight.category}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 max-w-[80%] transition-colors duration-300">
                    {insight.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs md:text-sm max-w-[70%] leading-relaxed">
                    {insight.description}
                  </p>
                  
                  <div className="mt-auto">
                    <a href="#" className="inline-flex items-center text-sm font-semibold text-slate-900 transition-opacity">
                      <span className="border-b border-slate-900 pb-0.5 mr-1 group-hover:text-slate-600 group-hover:border-slate-600 transition-colors duration-300">Learn more</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 group-hover:text-slate-600 transition-all duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


const Envelope = () => (
  <svg className="relative z-10 w-32 h-32 md:w-40 md:h-40 overflow-visible" viewBox="0 0 200 200" style={{ animation: 'envelope-float 4s ease-in-out infinite' }}>
    {/* The dark inside of the envelope (visible in the top triangles left/right of the paper) */}
    <polygon points="20,80 180,80 100,140" fill="#0c397d" />
    
    {/* Letter (White Paper) */}
    <g style={{ animation: 'letter-slide 4s ease-in-out infinite' }}>
      <rect x="45" y="30" width="110" height="110" fill="#f0f0f0" />
      
      {/* Lines on the paper */}
      <line x1="60" y1="50" x2="140" y2="50" stroke="#ffffff" strokeWidth="6" strokeLinecap="square" style={{ animation: 'line-grow 3s ease-in-out infinite', transformOrigin: '60px 50px' }} />
      <line x1="60" y1="70" x2="140" y2="70" stroke="#ffffff" strokeWidth="6" strokeLinecap="square" style={{ animation: 'line-grow 3s ease-in-out infinite 0.2s', transformOrigin: '60px 70px' }} />
      <line x1="60" y1="90" x2="140" y2="90" stroke="#ffffff" strokeWidth="6" strokeLinecap="square" style={{ animation: 'line-grow 3s ease-in-out infinite 0.4s', transformOrigin: '60px 90px' }} />
      <line x1="60" y1="110" x2="110" y2="110" stroke="#ffffff" strokeWidth="6" strokeLinecap="square" style={{ animation: 'line-grow 3s ease-in-out infinite 0.6s', transformOrigin: '60px 110px' }} />
    </g>

    {/* Left Flap */}
    <polygon points="20,80 100,150 20,180" fill="#ffffff" />
    
    {/* Right Flap */}
    <polygon points="180,80 100,150 180,180" fill="#f7f7f7" />
    
    {/* Bottom Flap */}
    <polygon points="20,180 100,110 180,180" fill="#ebebeb" />
  </svg>
);

const Decorations = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 300 400" preserveAspectRatio="none">
    {/* Top Right Zigzag */}
    <g style={{ animation: 'shape-float 5s ease-in-out infinite', transformOrigin: '240px 90px' }}>
      <path d="M 180 80 L 210 100 L 240 80 L 270 100 L 300 80" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="miter" strokeLinecap="square" />
    </g>
    
    {/* Bottom Left Zigzag */}
    <g style={{ animation: 'shape-float 6s ease-in-out infinite reverse', transformOrigin: '60px 330px' }}>
      <path d="M 0 320 L 30 340 L 60 320 L 90 340 L 120 320" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="miter" strokeLinecap="square" />
    </g>
    
    {/* Circles */}
    <circle cx="80" cy="110" r="5" fill="#ffffff" style={{ animation: 'particle-pulse 3s ease-in-out infinite 0.5s', transformOrigin: '80px 110px' }} />
    <circle cx="180" cy="280" r="4" fill="#ffffff" style={{ animation: 'particle-pulse 4s ease-in-out infinite 1s', transformOrigin: '180px 280px' }} />
    <circle cx="50" cy="260" r="6" fill="#0b2c63" style={{ animation: 'particle-pulse 3.5s ease-in-out infinite 1.5s', transformOrigin: '50px 260px' }} />
    <circle cx="250" cy="160" r="4" fill="#0b2c63" style={{ animation: 'particle-pulse 4.5s ease-in-out infinite 0.2s', transformOrigin: '250px 160px' }} />
    
    {/* Triangles */}
    <polygon points="60,60 72,80 48,80" fill="#0b2c63" style={{ animation: 'shape-rotate 7s linear infinite', transformOrigin: '60px 73px' }} />
    <polygon points="120,340 132,360 108,360" fill="#0b2c63" style={{ animation: 'shape-rotate 8s linear infinite reverse', transformOrigin: '120px 353px' }} />
    <polygon points="260,300 272,320 248,320" fill="#0b2c63" style={{ animation: 'shape-rotate 6s linear infinite', transformOrigin: '260px 313px' }} />
  </svg>
);

function Newsletter() {
  return (
    <section className="w-full py-6 lg:py-10 flex items-center justify-center">
      <style>{`
        @keyframes envelope-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes letter-slide {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes line-grow {
          0%, 100% { transform: scaleX(0.85); opacity: 0.6; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes shape-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes shape-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes particle-pulse {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.5; }
          50% { transform: scale(1.5) translateY(-8px); opacity: 1; }
        }
      `}</style>
      <div className="w-[90%] max-w-[850px] mx-auto flex flex-col md:flex-row rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
        
        {/* Left Column (Blue) */}
        <div className="w-full md:w-[35%] bg-[#1753a6] relative flex items-center justify-center py-12 md:py-0 min-h-[250px] sm:min-h-[300px] md:min-h-[340px] overflow-hidden">
          <Decorations />
          <Envelope />
        </div>

        {/* Right Column (Light Grey) */}
        <div className="w-full md:w-[65%] bg-[#f0f0f0] flex flex-col items-center justify-center p-6 sm:p-10 md:p-14 text-center">
          
          <h2 className="text-[#b5b5b5] font-black text-3xl lg:text-4xl tracking-widest mb-4" style={{ fontFamily: 'Impact, "Arial Narrow Bold", sans-serif', transform: 'scaleY(1.15)' }}>
            SUBSCRIBE
          </h2>
          
          <p className="text-[#a8a8a8] text-sm lg:text-base leading-relaxed mb-10 max-w-[95%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing<br className="hidden lg:block"/>
            elit, sed do eiusmod tempor incididunt ut labore et<br className="hidden lg:block"/>
            dolore magna aliqua
          </p>

          <form className="w-full max-w-[400px] flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email address" 
              className="w-full bg-white px-4 py-4 text-sm text-center text-slate-600 outline-none mb-6 shadow-sm placeholder:text-[#c4c4c4] placeholder:font-medium font-medium border border-transparent focus:border-slate-300 transition-colors"
              required
            />
            <button type="submit" className="bg-[#1753a6] text-white px-12 py-3 lg:py-4 text-sm lg:text-base font-bold tracking-widest shadow-md hover:bg-[#114085] transition-colors hover:scale-105 active:scale-95 duration-300">
              SEND
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}




export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <HeroSection />
      <FeaturedInsights />
      <LatestNews />
      <VideoInsights />
      <Infographics />
      <TrendingTopics />
      <Newsletter />
    </div>
  );
}
