import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { eventGalleryData } from '../data/gallery/eventGalleryData'
import ImaxCamera from './gallery/ImaxCamera'

/* ─── Marquee text ─────────────────────────────────────────── */
const NOTICE =
  'Welcome to CR Cyber Crime Foundation — a leading IT, software, and cybersecurity organization in India. With 24/7 dedication, CRCCF delivers innovative software products, scalable web and mobile applications, and end-to-end IT solutions.       '
const TRACK = (NOTICE + NOTICE).repeat(2)



/* ─── SVG Analog Clock ──────────────────────────────────────── */
function AnalogClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const s = now.getSeconds()
  const m = now.getMinutes()
  const h = now.getHours() % 12

  const sDeg = s * 6
  const mDeg = m * 6 + s * 0.1
  const hDeg = h * 30 + m * 0.5

  const hand = (deg, len) => ({
    x2: 30 + len * Math.sin((deg * Math.PI) / 180),
    y2: 30 - len * Math.cos((deg * Math.PI) / 180),
  })

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })

  return (
    <div className="clock-body flex items-center gap-[9px] px-[12px] whitespace-nowrap">
      {/* SVG CLOCK FACE - Hidden on mobile */}
      <svg
        viewBox="0 0 60 60"
        width="36"
        height="36"
        className="clock-svg drop-shadow-[0_0_6px_rgba(26,86,219,.40)] transition-[filter] duration-[300ms] group-hover:drop-shadow-[0_0_10px_rgba(26,86,219,.70)] max-[600px]:hidden"
      >
        {/* Outer ring */}
        <circle cx="30" cy="30" r="29" fill="#0a1628" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
        {/* Inner glow */}
        <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(26,86,219,.18)" strokeWidth="1" />
        {/* Hour tick marks */}
        {[...Array(12)].map((_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180
          const big = i % 3 === 0
          const r1 = big ? 22 : 24, r2 = 27
          return (
            <line key={i}
              x1={30 + r1 * Math.cos(a)} y1={30 + r1 * Math.sin(a)}
              x2={30 + r2 * Math.cos(a)} y2={30 + r2 * Math.sin(a)}
              stroke={big ? 'rgba(255,255,255,.80)' : 'rgba(255,255,255,.35)'}
              strokeWidth={big ? 1.6 : 0.9}
            />
          )
        })}
        {/* Hour hand */}
        <line x1="30" y1="30" {...hand(hDeg, 14)}
          stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="30" y1="30" {...hand(mDeg, 19)}
          stroke="rgba(255,255,255,.90)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Second hand */}
        <line x1="30" y1="30" {...hand(sDeg, 22)}
          stroke="#EF4444" strokeWidth="1.1" strokeLinecap="round" />
        {/* Centre dot */}
        <circle cx="30" cy="30" r="2.2" fill="#1A56DB" />
        <circle cx="30" cy="30" r="1" fill="#fff" />
      </svg>

      {/* DIGITAL DATE + TIME - Now visible on mobile, replacing the SVG */}
      <div className="clock-info flex flex-col gap-[1px]">
        <span className="clock-time text-[12px] font-[700] text-[#fff] tracking-[.04em] leading-[1] max-[600px]:text-[13px]">{timeStr}</span>
        <span className="clock-date text-[10px] text-[rgba(255,255,255,.48)] font-[500] tracking-[.03em] leading-[1] max-[600px]:text-[9px]">{dateStr}</span>
      </div>
    </div>
  )
}

/* ─── Gallery Popup ─────────────────────────────────────────── */
function GalleryPopup({ navigate }) {
  const collectionsRow1 = [
    'Event Gallery', 'Employees', 'Annual Celebrations', 'Workplace', 'Seminars & Workshops',
    'Cyber Awareness', 'Student Activities', 'Media & Press', 'Team Moments', 'Product Launches'
  ];
  
  const collectionsRow2 = [
    'Awards', 'Office Culture', 'Success Stories', 'Work Highlights', 'Achievement',
    'Journey', 'Course Gallery', 'Student Gallery', 'Internship', 'Project Gallery'
  ];

  return (
    <motion.div
      className="gallery-popup absolute top-[calc(100%+6px)] right-0 w-[330px] overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-[#ffffff] shadow-[0_24px_60px_rgba(0,0,0,.15)] z-[9999] max-[480px]:w-[280px] max-[480px]:right-[-10px] group transition-all duration-300"
      onClick={() => navigate('/gallery-collections')}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ cursor: 'pointer' }}
    >
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes slide-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 25s linear infinite;
        }
        .animate-slide-right {
          animation: slide-right 25s linear infinite;
        }
      `}</style>

      <div className="gallery-popup-head flex items-center justify-between px-[18px] pt-[16px] pb-[12px] text-[13px] font-[700]">
        <div className="flex items-center gap-[6px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] font-[800]">Official Gallery</span>
        </div>
      </div>
      
      <div className="px-[16px] pb-[16px] overflow-hidden">
        {/* IMAX Camera Scaled Container */}
        <div className="relative w-full h-[170px] rounded-[12px] overflow-hidden bg-[#1f2022] mb-4 flex justify-center items-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <div style={{ transform: 'scale(0.28)', transformOrigin: 'center' }} className="pointer-events-none">
            <ImaxCamera galleryData={[]} />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10 pointer-events-none">
            <span className="flex items-center gap-[6px] text-[10px] font-[700] text-white bg-white/10 backdrop-blur-md border border-white/20 px-[10px] py-[4px] rounded-full shadow-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              View Collections
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] px-[2px] mb-[12px]">
          <h4 className="text-[15px] font-[800] text-[#0F172A] leading-[1.3]">
            Explore Moments & Memories
          </h4>
          <p className="text-[12px] text-[#64748B] font-[500] leading-snug line-clamp-2 pr-2">
            Dive into our organized collections featuring events, team achievements, awareness programs, and celebrations.
          </p>
        </div>

        {/* 20 Collections Marquee */}
        <div className="relative w-full overflow-hidden mb-[16px] pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex w-max animate-slide-left gap-[6px] mb-[6px]">
            {[...collectionsRow1, ...collectionsRow1].map((c, i) => (
              <span key={i} className="text-[10px] font-[600] text-[#475569] bg-[#F1F5F9] border border-[#E2E8F0] px-[8px] py-[3px] rounded-full whitespace-nowrap shadow-sm">
                {c}
              </span>
            ))}
          </div>
          <div className="flex w-max animate-slide-right gap-[6px]">
            {[...collectionsRow2, ...collectionsRow2].map((c, i) => (
              <span key={i} className="text-[10px] font-[600] text-[#475569] bg-[#F1F5F9] border border-[#E2E8F0] px-[8px] py-[3px] rounded-full whitespace-nowrap shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/gallery-collections');
          }}
          className="w-full flex items-center justify-center gap-[8px] p-[12px] text-[13px] font-[700] text-white bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] rounded-[10px] shadow-[0_4px_14px_rgba(26,86,219,0.3)] transition-all duration-[200ms] group-hover:shadow-[0_6px_20px_rgba(26,86,219,0.4)] group-hover:translate-y-[-2px]"
          style={{ border: 'none', cursor: 'pointer' }}
        >
          Open Main Gallery
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Reach Us Popup ─────────────────────────────────────────── */
function ReachUsPopup({ navigate }) {
  const socialIcons = [
    { name: 'Facebook', color: '#1877F2', link: 'https://www.facebook.com/crcybercrimeofficialpage' },
    { name: 'LinkedIn', color: '#0A66C2', link: 'https://www.linkedin.com/company/cr-cyber-crime/posts/?feedView=all' },
    { name: 'Instagram', color: '#E4405F', link: 'https://www.instagram.com/crcybercrime/' },
    { name: 'YouTube', color: '#FF0000', link: 'https://youtube.com/@crcybercrimeofficialchannel?si=n96o6iVeJTas66Z6' },
    { name: 'X', color: '#000000', link: 'https://x.com/crcybercrime' }
  ];

  return (
    <motion.div
      className="gallery-popup absolute top-[calc(100%+6px)] right-0 w-[340px] overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#fff] shadow-[0_20px_60px_rgba(0,0,0,.22)] z-[9999] max-[480px]:w-[280px] max-[480px]:right-[-10px]"
      onClick={() => navigate('/reachus')}
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      style={{ width: '300px', right: 0, cursor: 'pointer' }}
    >
      <div className="gallery-popup-head flex items-center justify-between px-[16px] pt-[12px] pb-[10px] border-b border-[#F3F4F6] text-[13px] font-[700] text-[#111827]">
        <span> Reach Our Support</span>
      </div>
      
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Quick Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'linear-gradient(135deg, #1A56DB, #1044B8)', padding: '14px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 16px rgba(26,86,219,0.15)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span style={{ fontWeight: 600 }}>+91 97779 99529</span>
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span style={{ fontWeight: 600 }}>hr@crcybercrime.org</span>
           </div>
        </div>

        {/* Branches Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { city: 'New York', phone: '+1 (555) 123-4567' },
            { city: 'London', phone: '+44 20 7123 4567' },
            { city: 'Singapore', phone: '+65 6789 0123' }
          ].map((branch, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', fontSize: '10.5px', background: '#F8FAFC', padding: '10px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
              <strong style={{color: '#0F172A', fontSize: '11.5px'}}>{branch.city}</strong>
              <span style={{color: '#2563EB', marginTop: '3px', fontWeight: 600}}>{branch.phone}</span>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div style={{ padding: '4px 0' }}>
           <p style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Community</p>
           <div style={{ display: 'flex', gap: '12px' }}>
             {socialIcons.map((s, i) => (
               <a key={i} href={s.link} target="_blank" rel="noreferrer" 
                 onClick={(e) => e.stopPropagation()}
                 style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
               >
                 {s.name === 'Facebook' && <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>}
                 {s.name === 'LinkedIn' && <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.131c0-7.88-8.922-7.593-11.02-3.711v-2.158z"/></svg>}
                 {s.name === 'Instagram' && <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058-1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.42.065-2.391.301-3.238 1.295-.847.994-1.083 1.965-1.148 3.385-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.065 1.42.301 2.391 1.295 3.238.994.847 1.965 1.083 3.385 1.148 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.42-.065 2.391-.301 3.238-1.295.847-.994 1.083-1.965 1.148-3.385.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.065-1.42-.301-2.391-1.295-3.238-.994-.847-1.965-1.083-3.385-1.148-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>}
                 {s.name === 'YouTube' && <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                 {s.name === 'X' && <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.176 5.397-6.176zM17.082 19.77h1.833L7.084 4.126H5.117L17.082 19.77z"/></svg>}
               </a>
             ))}
           </div>
        </div>

        <button 
          onClick={() => navigate('/reachus')} 
          style={{ width: '100%', background: '#00D1C1', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '2px', boxShadow: '0 6px 20px rgba(0,209,193,0.25)', transition: 'all 0.2s' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Drop Your Message
        </button>
      </div>
      <button
        onClick={() => navigate('/reachus')}
        className="gallery-popup-cta w-full flex items-center justify-center p-[10px] text-[12.5px] font-[700] text-[#1A56DB] no-underline transition-[background] duration-[150ms] tracking-[.03em] hover:bg-[#EFF6FF]"
        style={{width: '100%', background: 'none', border: 'none', borderTop: '1px solid #F1F5F9', cursor: 'pointer'}}
      >
        Connect With Official Channels →
      </button>
    </motion.div>
  )
}

/* ─── TOP BAR ───────────────────────────────────────────────── */
export default function TopBar() {
  /* Clock: visible on load → hides after 2 s → shows on hover */
  const [clockAutoVisible, setClockAutoVisible] = useState(true)
  const [clockHovered, setClockHovered] = useState(false)
  const [galleryDisabled, setGalleryDisabled] = useState(false);
  const [reachDisabled, setReachDisabled] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [reachHovered, setReachHovered] = useState(false);
  
  /* Welcome label: visible for 2s on mobile then hides */
  const [welcomeVisible, setWelcomeVisible] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()
  const cooldownTimers = useRef({})
  
  useEffect(() => {
    const t = setTimeout(() => setClockAutoVisible(false), 2000)
    
    // Welcome text timeout for mobile only
    let wT;
    if (window.innerWidth <= 768) {
      wT = setTimeout(() => setWelcomeVisible(false), 2000)
    }
    
    return () => {
      clearTimeout(t)
      if (wT) clearTimeout(wT)
    }
  }, [])

  useEffect(() => {
    const timers = cooldownTimers.current

    return () => {
      Object.values(timers).forEach(clearTimeout)
    }
  }, [])

  const clockVisible = clockAutoVisible || clockHovered

  const startPreviewCooldown = (preview) => {
    const config = {
      gallery: {
        setHovered: setGalleryHovered,
        setDisabled: setGalleryDisabled,
      },
      reach: {
        setHovered: setReachHovered,
        setDisabled: setReachDisabled,
      },
    }[preview]

    if (!config) return

    clearTimeout(cooldownTimers.current[preview])
    config.setHovered(false)
    config.setDisabled(true)
    cooldownTimers.current[preview] = setTimeout(() => {
      config.setDisabled(false)
      delete cooldownTimers.current[preview]
    }, 3000)
  }

  const navigateWithPreviewCooldown = (path, options) => {
    if (path.startsWith('/gallery')) {
      startPreviewCooldown('gallery')
    }

    if (path === '/reachus') {
      startPreviewCooldown('reach')
    }

    navigate(path, options)
  }

  useEffect(() => {
    if (location.pathname.startsWith('/gallery')) {
      startPreviewCooldown('gallery')
    }

    if (location.pathname === '/reachus') {
      startPreviewCooldown('reach')
    }
  }, [location.pathname])

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.tb-gallery-zone') && !e.target.closest('.tb-reach-zone')) {
        setGalleryHovered(false)
        setReachHovered(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleGalleryClick = () => {
    if (window.innerWidth <= 1024) {
      if (!galleryHovered) {
        setGalleryHovered(true)
        setReachHovered(false)
      } else {
        startPreviewCooldown('gallery')
        navigate('/gallery-collections');
      }
    } else {
      startPreviewCooldown('gallery')
      navigate('/gallery-collections');
    }
  }

  const handleReachClick = () => {
    if (window.innerWidth <= 1024) {
      if (!reachHovered) {
        setReachHovered(true)
        setGalleryHovered(false)
      } else {
        startPreviewCooldown('reach')
        navigate('/reachus');
      }
    } else {
      startPreviewCooldown('reach')
      navigate('/reachus');
    }
  }

  return (
    <div className="topbar relative z-[200] bg-[#0C1A3A] flex items-center h-[42px] border-b border-[rgba(255,255,255,.07)]">
      {/* ── LEFT: FIXED WELCOME LABEL ── */}
      <AnimatePresence>
        {welcomeVisible && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="tb-welcome flex shrink-0 items-center gap-[7px] px-[16px] whitespace-nowrap select-none text-[12.5px] font-[700] text-[rgba(255,255,255,.90)] tracking-[.04em] uppercase max-[700px]:px-[8px] max-[700px]:text-[10px] max-[480px]:px-[6px] max-[480px]:text-[9px] max-[480px]:gap-[4px]"
          >
            <motion.span
              className="tb-welcome-dot w-[7px] h-[7px] rounded-[50%] bg-[#22C55E] shadow-[0_0_0_0_rgba(34,197,94,.55)] max-[480px]:w-[5px] max-[480px]:h-[5px]"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(34,197,94,.55)',
                  '0 0 0 6px rgba(34,197,94,0.00)',
                  '0 0 0 0 rgba(34,197,94,0.00)',
                ],
              }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
            Welcome To CRCCF
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {welcomeVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, width: 0 }}
            className="tb-welcome-sep w-[1px] h-[22px] bg-[rgba(255,255,255,.12)] shrink-0" 
          />
        )}
      </AnimatePresence>

      {/* ── SCROLLING ANNOUNCEMENT ── */}
      <div className="tb-marquee flex-1 min-w-0" style={{ overflow: 'hidden' }}>
        <motion.div
          className="tb-track inline-block whitespace-nowrap text-[12.5px] text-[rgba(255,255,255,.78)] font-[400] pl-[24px] tracking-[.01em] max-[700px]:text-[11px] max-[700px]:pl-[12px] max-[480px]:text-[10px] max-[480px]:pl-[8px]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        >
          {TRACK}
        </motion.div>
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="tb-right flex shrink-0 items-center gap-0 pl-0 pr-0 border-l border-[rgba(255,255,255,.07)]">

        {/* CLOCK */}
        <div
          className="tb-clock-zone group flex items-center h-[42px] cursor-pointer relative"
          onMouseEnter={() => setClockHovered(true)}
          onMouseLeave={() => setClockHovered(false)}
        >
          <AnimatePresence mode="wait">
            {clockVisible ? (
              /* EXPANDED CLOCK */
              <motion.div
                key="clock-full"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden', display: 'flex' }}
              >
                <AnalogClock />
              </motion.div>
            ) : (
              /* COLLAPSED — just a small clock icon */
              <motion.button
                key="clock-icon"
                className="tb-icon-btn w-[36px] h-[42px] bg-transparent border-none cursor-pointer text-[rgba(255,255,255,.60)] flex items-center justify-center transition-all duration-[.18s] hover:text-[#fff] hover:bg-[rgba(255,255,255,.07)] max-[700px]:w-[30px] max-[480px]:w-[26px]"
                title="Date & Time (hover to expand)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* mini clock SVG icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="tb-sep w-[1px] h-[22px] bg-[rgba(255,255,255,.10)] mx-[2px]" />

        {/* GALLERY ICON */}
        <div
          className="tb-gallery-zone relative flex items-center h-full"
          onMouseEnter={() => window.innerWidth > 1024 && !galleryDisabled && setGalleryHovered(true)}
          onMouseLeave={() => window.innerWidth > 1024 && !galleryDisabled && setGalleryHovered(false)}
          style={{ position: 'relative' }}
        >
          {/* Bridge element to prevent hover loss */}
          {galleryHovered && (
            <div 
              style={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '10px', zIndex: 1 }} 
            />
          )}
          <button
            className="tb-icon-btn tb-gallery-btn w-[40px] h-[42px] bg-transparent border-none cursor-pointer text-[rgba(255,255,255,.60)] flex items-center justify-center transition-all duration-[.18s] hover:text-[#fff] hover:bg-[rgba(255,255,255,.07)] max-[700px]:w-[30px] max-[480px]:w-[26px]"
            title="Gallery"
            onClick={handleGalleryClick}
          >
            {/* gallery / image icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>

          <AnimatePresence>
            {galleryHovered && <GalleryPopup navigate={navigateWithPreviewCooldown} />}
          </AnimatePresence>
        </div>

        <div className="tb-sep w-[1px] h-[22px] bg-[rgba(255,255,255,.10)] mx-[2px]" />

        {/* REACH US */}
        <div 
          className="tb-reach-zone relative flex items-center h-full" 
          onMouseEnter={() => window.innerWidth > 1024 && !reachDisabled && setReachHovered(true)} 
          onMouseLeave={() => window.innerWidth > 1024 && !reachDisabled && setReachHovered(false)}
          style={{ position: 'relative' }}
        >
          {/* Bridge element to prevent hover loss */}
          {reachHovered && (
            <div 
              style={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '10px', zIndex: 1 }} 
            />
          )}
          <button
            className="tb-reach-btn inline-flex items-center gap-[6px] bg-[#1A56DB] text-[#fff] text-[12px] font-[700] px-[16px] py-[7px] mx-[10px] rounded-[5px] border-none cursor-pointer no-underline whitespace-nowrap tracking-[.02em] transition-[background,transform] duration-[.18s] hover:bg-[#1044B8] hover:translate-y-[-1px] max-[700px]:px-[10px] max-[700px]:py-[5px] max-[700px]:mx-[6px] max-[700px]:text-[11px] max-[480px]:mx-[4px] max-[480px]:px-[8px] max-[480px]:py-[5px] max-[480px]:text-[10px]"
            onClick={handleReachClick}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="max-[480px]:w-[11px] max-[480px]:h-[11px]"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Reach Us
          </button>

          <AnimatePresence>
            {reachHovered && <ReachUsPopup navigate={navigateWithPreviewCooldown} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
