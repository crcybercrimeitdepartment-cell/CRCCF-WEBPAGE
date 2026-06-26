import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Calendar, Users, PartyPopper, Briefcase, 
  Presentation, ShieldCheck, GraduationCap, Mic, 
  Smile, Map, HeartHandshake, BookOpen, Star, 
  Coffee, Sparkles, ArrowRight,
  Camera, Image as ImageIcon, Film, Sparkles as SparklesIcon, 
  Focus, Layers, LayoutGrid, Palette, Pin, Wand2, Square, 
  Circle, Layout, FolderArchive, Aperture
} from 'lucide-react';

const categories = [
  { title: 'Events Gallery', icon: Calendar, color: 'from-blue-400 to-indigo-500', count: 56 },
  { title: 'Employees Gallery', icon: Users, color: 'from-green-400 to-emerald-600', count: 18 },
  { title: 'Annual Celebrations Gallery', icon: PartyPopper, color: 'from-pink-400 to-rose-500', count: 12 },
  { title: 'Workplace Gallery', icon: Briefcase, color: 'from-slate-400 to-slate-600', count: 32 },
  { title: 'Seminars & Workshops Gallery', icon: Presentation, color: 'from-purple-400 to-fuchsia-500', count: 45 },
  { title: 'Cyber Awareness Gallery', icon: ShieldCheck, color: 'from-cyan-400 to-blue-600', count: 67 },
  { title: 'Student Activities Gallery', icon: GraduationCap, color: 'from-teal-400 to-emerald-500', count: 29 },
  { title: 'Media & Press Gallery', icon: Mic, color: 'from-red-400 to-rose-600', count: 41 },
  { title: 'Team Moments Gallery', icon: Smile, color: 'from-amber-400 to-orange-500', count: 38 },
  { title: 'Product Launches Gallery', icon: Sparkles, color: 'from-blue-400 to-cyan-500', count: 14 },
  { title: 'Awards & Recognition Gallery', icon: Star, color: 'from-yellow-300 to-yellow-500', count: 19 },
  { title: 'Office Culture Gallery', icon: Coffee, color: 'from-orange-400 to-red-500', count: 27 },
  { title: 'Success Stories Gallery', icon: Trophy, color: 'from-emerald-400 to-teal-500', count: 21 },
  { title: 'Work Highlights Gallery', icon: HeartHandshake, color: 'from-rose-400 to-pink-600', count: 33 },
  { title: 'Achievement Gallery', icon: Trophy, color: 'from-yellow-400 to-orange-500', count: 24 },
  { title: 'Journey Gallery', icon: Map, color: 'from-indigo-400 to-violet-600', count: 15 },
  { title: 'Course Gallery', icon: BookOpen, color: 'from-blue-500 to-cyan-400', count: 42 },
  { title: 'Student Gallery', icon: Users, color: 'from-green-500 to-teal-400', count: 85 },
  { title: 'Internship Gallery', icon: Briefcase, color: 'from-purple-500 to-pink-400', count: 34 },
  { title: 'Project Gallery', icon: FolderArchive, color: 'from-orange-500 to-amber-400', count: 56 }
];

const floatingIcons = [
  { Icon: Camera, top: '12%', left: '8%', size: 64, anim: 'float', delay: '0s', opacity: 0.08, parallax: 1.5 },
  { Icon: ImageIcon, top: '25%', left: '85%', size: 80, anim: 'float-reverse', delay: '2s', opacity: 0.06, parallax: -1 },
  { Icon: Film, top: '65%', left: '10%', size: 70, anim: 'drift', delay: '1s', opacity: 0.07, parallax: 1.2 },
  { Icon: SparklesIcon, top: '8%', left: '45%', size: 40, anim: 'float', delay: '3s', opacity: 0.1, parallax: 0.8 },
  { Icon: Focus, top: '75%', left: '85%', size: 90, anim: 'float-reverse', delay: '0.5s', opacity: 0.05, parallax: -1.5 },
  { Icon: Layers, top: '45%', left: '4%', size: 50, anim: 'drift', delay: '4s', opacity: 0.08, parallax: 1.1 },
  { Icon: LayoutGrid, top: '55%', left: '88%', size: 60, anim: 'float', delay: '1.5s', opacity: 0.06, parallax: -0.9 },
  { Icon: Palette, top: '88%', left: '25%', size: 65, anim: 'float-reverse', delay: '2.5s', opacity: 0.07, parallax: 1.3 },
  { Icon: Pin, top: '32%', left: '78%', size: 45, anim: 'drift', delay: '3.5s', opacity: 0.09, parallax: -1.2 },
  { Icon: Wand2, top: '70%', left: '45%', size: 55, anim: 'float', delay: '5s', opacity: 0.08, parallax: 0.7 },
  { Icon: Square, top: '18%', left: '60%', size: 65, anim: 'float-reverse', delay: '1.2s', opacity: 0.05, parallax: -0.8 },
  { Icon: Circle, top: '48%', left: '50%', size: 140, anim: 'drift', delay: '0s', opacity: 0.03, blur: true, parallax: 0.5 },
  { Icon: Layout, top: '92%', left: '65%', size: 75, anim: 'float', delay: '4.5s', opacity: 0.06, parallax: -1.4 },
  { Icon: FolderArchive, top: '28%', left: '22%', size: 52, anim: 'drift', delay: '2.2s', opacity: 0.07, parallax: 1.2 },
  { Icon: Aperture, top: '5%', left: '82%', size: 68, anim: 'float-reverse', delay: '3.8s', opacity: 0.08, parallax: -1.1 },
  { Icon: Circle, top: '80%', left: '15%', size: 120, anim: 'float', delay: '1s', opacity: 0.03, blur: true, parallax: 0.6 }
];

import { eventGalleryData } from '../data/gallery/eventGalleryData';

const getCategoryImage = (title) => {
  const t = title.toLowerCase();
  
  // Dynamic mapping based on available eventGalleryData
  if (t.includes('award') || t.includes('achievement')) {
    return eventGalleryData.find(e => e.title.includes('Awards'))?.photos?.[0]?.url;
  }
  if (t.includes('event') || t.includes('press') || t.includes('media')) {
    return eventGalleryData.find(e => e.title.includes('Summit'))?.photos?.[0]?.url;
  }
  if (t.includes('cyber') || t.includes('awareness')) {
    return eventGalleryData.find(e => e.title.includes('Awareness'))?.photos?.[0]?.url;
  }
  if (t.includes('workshop') || t.includes('training') || t.includes('student') || t.includes('internship') || t.includes('course') || t.includes('project')) {
    return eventGalleryData.find(e => e.title.includes('Internship'))?.photos?.[0]?.url;
  }
  if (t.includes('celebration') || t.includes('moments') || t.includes('culture') || t.includes('workplace') || t.includes('employee')) {
    return eventGalleryData.find(e => e.title.includes('Awards'))?.photos?.[2]?.url; // Using a different photo for variety
  }

  return null;
};

const CategoryCard = ({ category, index, onClick }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const imageUrl = getCategoryImage(category.title);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onClick(category.title)}
      className="group relative bg-white rounded-[20px] overflow-hidden transition-all duration-500 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-violet-600/20 active:-translate-y-1 active:scale-[0.98] cursor-pointer"
    >
      {/* Shine */}
      <div className="absolute inset-0 card-shine opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 pointer-events-none" />

      {/* Glow */}
      <div className="absolute -inset-[10px] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.3)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      {/* Content */}
      <div className="p-5 h-full flex flex-col gap-3 relative z-10">
        
        {/* Dynamic Image Area */}
        <div className="w-full h-[120px] rounded-xl transition-all duration-500 relative overflow-hidden flex items-center justify-center group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] bg-slate-100">
          {imageUrl ? (
            <>
              {/* Skeleton Shimmer */}
              {!imgLoaded && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              )}
              {/* Image */}
              <img 
                src={imageUrl} 
                alt={category.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Optional color overlay matching original design */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-overlay opacity-40`} />
              
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* "View Gallery" Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white/90 text-slate-800 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-wide">
                  View Gallery
                </span>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className={`absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-gradient-to-br ${category.color} opacity-90`}>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
              <Camera className="w-8 h-8 mb-2 text-white/70 relative z-10" strokeWidth={1.5} />
              <span className="text-[9px] text-white/90 font-bold uppercase tracking-widest relative z-10">Images coming soon</span>
            </div>
          )}
        </div>

        {/* Text & Footer container */}
        <div className="flex flex-col gap-1 mt-2 flex-grow">
          <h3 className="text-slate-800 text-[1.1em] m-0 font-bold transition-all duration-300 group-hover:text-violet-600 group-hover:translate-x-[2px]">
            {category.title}
          </h3>
          <p className="text-slate-800 text-[0.75em] m-0 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[2px]">
            {category.count} items
          </p>

          <div className="flex justify-between items-center mt-auto pt-3">
            <span className="text-slate-800 font-bold text-[1em] transition-all duration-300 group-hover:text-violet-600 group-hover:translate-x-[2px]">
              Explore
            </span>
            <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-white transition-all duration-300 scale-90 group-hover:scale-100 group-hover:shadow-[0_0_0_4px_rgba(124,58,237,0.2)]">
              <ArrowRight className="w-3.5 h-3.5 card-icon" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function GalleryLandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    // Disable parallax on smaller screens for performance
    if (window.innerWidth < 768) return;
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = (title) => {
    navigate('/gallery', { state: { category: title } });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] w-full pt-32 pb-24 px-4 relative">
      <style>{`
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-icon {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(0); }
        }
        @keyframes slide-in-right {
          0% { transform: translateX(200%); }
          100% { transform: translateX(0); }
        }
        .split-text-container {
          display: flex;
          overflow: hidden;
        }
        .text-part {
          display: inline-block;
          position: relative;
          animation-duration: 1.5s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }
        .text-part.left {
          transform: translateX(-200%);
          animation-name: slide-in-left;
        }
        .text-part.right {
          transform: translateX(200%);
          animation-name: slide-in-right;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(20px) rotate(3deg); }
        }
        .card-shine {
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%);
          background-size: 200% 100%;
        }
        .group:hover .card-shine {
          animation: shine 3s infinite;
        }
        .group:hover .card-icon {
          animation: pulse-icon 1.5s infinite;
        }
      `}</style>

      {/* Floating Gallery-Themed Symbols */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const Icon = item.Icon;
          // Hide every other icon on mobile for performance optimization
          const visibilityClass = i % 2 !== 0 ? 'hidden md:block' : 'block';
          
          return (
              <div 
                key={i}
                className={`absolute transition-transform duration-700 ease-out ${visibilityClass}`}
                style={{
                  top: item.top,
                  left: item.left,
                  transform: `translate(calc(var(--mouse-x, 0px) * ${item.parallax}), calc(var(--mouse-y, 0px) * ${item.parallax}))`
                }}
              >
                <div 
                  className={`text-slate-600 ${item.blur ? 'blur-xl' : 'blur-[1px]'}`}
                  style={{
                    opacity: item.opacity,
                    animation: `${item.anim} 15s ease-in-out infinite`,
                    animationDelay: item.delay,
                  }}
                >
                <Icon size={item.size} strokeWidth={1} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center w-full">
          {/* Split Text Heading */}
          <div className="flex justify-center mb-2 w-full">
            <h1 className="split-text-container flex justify-center gap-[0.3em] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-part left text-[#0F172A]">
                Gallery
              </span>
              <span className="text-part right text-blue-600">
                Collections
              </span>
            </h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto"
          >
            Explore moments, achievements, celebrations and memories through our organized galleries.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.title} 
              category={category} 
              index={index} 
              onClick={handleCardClick} 
            />
          ))}
        </div>

      </div>
    </div>
  );
}
