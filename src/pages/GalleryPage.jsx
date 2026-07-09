import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GalleryAnimatedBg from '../components/gallery/GalleryAnimatedBg';
import EventSlideshowSection from '../components/gallery/EventSlideshowSection';
import { eventGalleryData } from '../data/gallery/eventGalleryData';
import LazySection from '../components/common/LazySection';

export default function GalleryPage() {
  const location = useLocation();
  
  // Inject CSS for the marquee animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Handle auto-scroll from Topbar Preview
  useEffect(() => {
    if (location.state?.targetEventId) {
      const element = document.getElementById(location.state.targetEventId);
      if (element) {
        // Small delay ensures layout is ready before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full">
      {/* Background Element */}
      <GalleryAnimatedBg />

      {/* Main Content */}
      <div className="relative z-[10] w-full pt-32 pb-24">
        
        {/* Page Header (Optional, but good for context) */}
        <div className="w-full max-w-[1200px] mx-auto px-4 mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tight mb-4">
            {location.state?.category ? (
              location.state.category
            ) : (
              <>Our <span className="text-blue-600">Event Gallery</span></>
            )}
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Explore a visual timeline of our initiatives, campaigns, and key moments.
          </p>
        </div>

        {/* Render each event section independently */}
        <div className="flex flex-col gap-12">
          {eventGalleryData.map((event) => (
            <LazySection key={event.id} threshold={0.1} fallback={<div className="h-[400px] w-full animate-pulse bg-slate-200 rounded-3xl" />}>
              <EventSlideshowSection event={event} />
            </LazySection>
          ))}
        </div>

      </div>
    </div>
  );
}
