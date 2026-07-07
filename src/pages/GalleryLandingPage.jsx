import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImaxCamera from '../components/gallery/ImaxCamera';

const galleryData = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/1/150/150', title: 'Event Gallery' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/2/150/150', title: 'Employees Gallery' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/3/150/150', title: 'Annual Celebrations Gallery' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/4/150/150', title: 'Workplace Gallery' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/5/150/150', title: 'Seminars & Workshops Gallery' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/6/150/150', title: 'Cyber Awareness Gallery' },
  { id: 7, imageUrl: 'https://picsum.photos/seed/7/150/150', title: 'Student Activities Gallery' },
  { id: 8, imageUrl: 'https://picsum.photos/seed/8/150/150', title: 'Media & Press Gallery' },
  { id: 9, imageUrl: 'https://picsum.photos/seed/9/150/150', title: 'Team Moments Gallery' },
  { id: 10, imageUrl: 'https://picsum.photos/seed/10/150/150', title: 'Product Launches Gallery' },
  { id: 11, imageUrl: 'https://picsum.photos/seed/11/150/150', title: 'Awards & Recognition Gallery' },
  { id: 12, imageUrl: 'https://picsum.photos/seed/12/150/150', title: 'Office Culture Gallery' },
  { id: 13, imageUrl: 'https://picsum.photos/seed/13/150/150', title: 'Success Stories Gallery' },
  { id: 14, imageUrl: 'https://picsum.photos/seed/14/150/150', title: 'Work Highlights Gallery' },
  { id: 15, imageUrl: 'https://picsum.photos/seed/15/150/150', title: 'Achievement Gallery' },
  { id: 16, imageUrl: 'https://picsum.photos/seed/16/150/150', title: 'Journey Gallery' },
  { id: 17, imageUrl: 'https://picsum.photos/seed/17/150/150', title: 'Course Gallery' },
  { id: 18, imageUrl: 'https://picsum.photos/seed/18/150/150', title: 'Student Gallery' },
  { id: 19, imageUrl: 'https://picsum.photos/seed/19/150/150', title: 'Internship Gallery' },
  { id: 20, imageUrl: 'https://picsum.photos/seed/20/150/150', title: 'Project Gallery' }
];

const CameraIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const ImageIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const FilmIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>;
const ApertureIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>;
const GridIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;

function FloatingIcons() {
  const icons = [
    { Icon: CameraIcon, size: 120, top: '10%', left: '5%', delay: 0, duration: 15 },
    { Icon: ImageIcon, size: 180, top: '60%', left: '8%', delay: 2, duration: 18 },
    { Icon: FilmIcon, size: 90, top: '20%', left: '85%', delay: 1, duration: 14 },
    { Icon: ApertureIcon, size: 200, top: '55%', left: '80%', delay: 3, duration: 20 },
    { Icon: GridIcon, size: 140, top: '80%', left: '35%', delay: 4, duration: 16 },
    { Icon: CameraIcon, size: 80, top: '15%', left: '45%', delay: 1.5, duration: 12 },
    { Icon: ImageIcon, size: 110, top: '85%', left: '65%', delay: 2.5, duration: 17 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((item, index) => {
        const { Icon, size, top, left, delay, duration } = item;
        return (
          <motion.div
            key={index}
            className="absolute text-slate-400 opacity-[0.06]"
            style={{ width: size, height: size, top, left }}
            animate={{
              y: [0, -40, 0, 40, 0],
              x: [0, 30, 0, -30, 0],
              rotate: [0, 15, -10, 5, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function GalleryLandingPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col items-center justify-start md:justify-center font-sans overflow-hidden pt-6 md:pt-32 pb-24 relative">
      <FloatingIcons />
      <style>{`
        .responsive-scale {
          transform-origin: top center;
          transform: scale(max(0.65, min(calc((100vw - 32px) / 960), calc((100vh - 32px) / 662), 1.5)));
          transition: transform 0.4s ease-out;
        }
      `}</style>
      
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-32 z-10 relative px-4 shrink-0 w-full">
        <h1 className="text-2xl sm:text-4xl lg:text-[5rem] font-black mb-3 sm:mb-6 tracking-tight flex flex-wrap items-center justify-center gap-x-2 sm:gap-4">
          <span className="text-[#111827]">Gallery</span>
          <div className="relative">
             <span className="text-[#1d4ed8]">Collections</span>
          </div>
        </h1>
        <p className="text-[#64748b] text-xs sm:text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed px-2">
          Explore moments, achievements, celebrations and memories through our organized galleries.
        </p>
      </div>

      <div className="camera-wrapper responsive-scale shrink-0 z-10">
        <ImaxCamera galleryData={galleryData} />
      </div>
    </div>
  );
}
