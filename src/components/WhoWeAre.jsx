import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MissionIcon = () => (
  <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
    {/* Rocket Body */}
    <path d="M20 8 C26 14, 26 24, 20 28 C14 24, 14 14, 20 8 Z" fill="#DBEAFE" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    {/* Window */}
    <circle cx="20" cy="18" r="3" fill="#F8FAFC" stroke="#111827" strokeWidth="2" />
    {/* Fins */}
    <path d="M16 24 L12 30 L16 28 Z" fill="#FCA5A5" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 24 L28 30 L24 28 Z" fill="#FCA5A5" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    {/* Flame */}
    <path d="M18 28 L20 34 L22 28 Z" fill="#FDE047" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    {/* Stars */}
    <circle cx="10" cy="12" r="1" fill="#86EFAC" />
    <circle cx="30" cy="16" r="1.5" fill="#FDE047" />
  </svg>
)

const ServeIcon = () => (
  <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
    {/* Globe */}
    <circle cx="20" cy="20" r="12" fill="#DBEAFE" stroke="#111827" strokeWidth="2" />
    <path d="M20 8 C 26 8, 26 32, 20 32" stroke="#111827" strokeWidth="2" />
    <path d="M20 8 C 14 8, 14 32, 20 32" stroke="#111827" strokeWidth="2" />
    <path d="M8 20 L 32 20" stroke="#111827" strokeWidth="2" />
    {/* Nodes (Users) */}
    <circle cx="8" cy="10" r="3" fill="#FCA5A5" stroke="#111827" strokeWidth="2" />
    <path d="M10.5 12.5 L 14 15" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="10" r="3" fill="#FDE047" stroke="#111827" strokeWidth="2" />
    <path d="M29.5 12.5 L 26 15" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="36" r="3" fill="#86EFAC" stroke="#111827" strokeWidth="2" />
    <path d="M20 33 L 20 29" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const FocusIcon = () => (
  <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
    {/* Paper/Board */}
    <rect x="6" y="6" width="28" height="28" fill="#F8FAFC" stroke="#111827" strokeWidth="2" rx="2" />
    {/* Header line */}
    <path d="M6 14 L34 14" stroke="#111827" strokeWidth="2" />
    <circle cx="10" cy="10" r="1.5" fill="#FCA5A5" />
    <circle cx="15" cy="10" r="1.5" fill="#FDE047" />
    <circle cx="20" cy="10" r="1.5" fill="#86EFAC" />
    {/* Bar chart */}
    <rect x="10" y="24" width="4" height="6" fill="#60A5FA" stroke="#111827" strokeWidth="2" />
    <rect x="18" y="18" width="4" height="12" fill="#FCA5A5" stroke="#111827" strokeWidth="2" />
    <rect x="26" y="22" width="4" height="8" fill="#FDE047" stroke="#111827" strokeWidth="2" />
    {/* Line graph crossing it */}
    <path d="M8 22 L 16 16 L 24 24 L 32 10" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="10" r="2.5" fill="#86EFAC" stroke="#111827" strokeWidth="2" />
  </svg>
)

const VisionIcon = () => (
  <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
    {/* Document */}
    <path d="M10 6 L22 6 L30 14 L30 34 C30 35 29 36 28 36 L10 36 C9 36 8 35 8 34 L8 8 C8 7 9 6 10 6 Z" fill="#F8FAFC" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    {/* Fold */}
    <path d="M22 6 L22 14 L30 14" fill="#E2E8F0" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    {/* Lines of text */}
    <path d="M12 28 L20 28" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 32 L26 32" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    {/* Lightbulb in the center */}
    <path d="M19 13 C 16 13, 14 15, 14 18 C 14 20, 16 21, 16 23 L 16 24 C 16 25, 17 26, 19 26 C 21 26, 22 25, 22 24 L 22 23 C 22 21, 24 20, 24 18 C 24 15, 22 13, 19 13 Z" fill="#FDE047" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />
    <path d="M17 24 L 21 24" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 26 L 20 26" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    {/* Glow rays */}
    <path d="M19 10 L 19 8" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 12 L 11 10" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 12 L 27 10" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const cards = [
  {
    icon: <ServeIcon />,
    color: '#3B82F6',
    title: 'Who We Serve',
    bg: 'https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403772/serve_c3m079.jpg',
    desc: (
      <>
        We serve :<br />
         Students<br />
         The Public<br />
         Organizations<br />
         Victims<br />
        by providing research-driven insights , guidance , and practical resources to combat evolving cyber threats effectively .
      </>
    ),
  },
  {
    icon: <FocusIcon />,
    color: '#1D4ED8',
    title: 'Our Core Focus',
    bg: 'https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403770/focus_z5jjcr.jpg',
    desc: (
      <>
        Our focus extends to :<br /><br />
         Cybersecurity Awareness<br />
         Advanced IT & Software Development<br />
         Industry-Oriented Training & Internship Programs
      </>
    ),
  },
  {
    icon: <MissionIcon />,
    color: '#0284C7',
    title: 'Our Mission',
    bg: 'https://res.cloudinary.com/dbwnbfdij/image/upload/v1780381961/Mission_azi7c5.png',
    desc: (
      <>
        Our mission is to lead the Cyber Revolution by integrating cybersecurity awareness , advanced technology , and research-driven solutions . We are committed to empowering the next generation with practical skills, industry knowledge, and ethical values to build a secure and future-ready digital ecosystem .
      </>
    ),
  },
  {
    icon: <VisionIcon />,
    color: '#2563EB',
    title: 'Our Vision',
    bg: 'https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403773/vision_kxgkbv.jpg',
    desc: (
      <>
        by integrating:<br /><br />
         Technology<br />
         Research<br />
         Cyber Intelligence<br /><br />
        we equip the next generation with essential skills while striving to build a secure , innovative , and future-ready digital ecosystem for all.
      </>
    ),
  },
]

export default function WhoWeAre() {
  const [flippedCards, setFlippedCards] = useState([])
  const [isAutoFlipped, setIsAutoFlipped] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAutoFlipped(true)
          setTimeout(() => setIsAutoFlipped(false), 2000)
          observer.disconnect() 
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleTap = (e, index) => {
    e.stopPropagation()
    setIsAutoFlipped(false)
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-[#F9FAFB]">
      <div className="container-custom">
        <motion.div
          className="text-center mb-[clamp(32px,7vw,52px)] flex flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .55 }}
        >
          <p className="section-tag">Who We Are</p>
          <h2 className="section-title">
            About <span className="section-title-accent">CR Cyber Crime Foundation</span>
          </h2>

          <p className="section-subtitle">
            A trusted partner in India's cybersecurity ecosystem — combining technology expertise,
            legal knowledge, and community outreach to create a safer digital India.
          </p>
        </motion.div>

        {/* ── FIXED GRID CONTAINER USING ITEMS-STRETCH ── */}
        <div className="grid grid-cols-2 items-stretch gap-[24px] max-[640px]:gap-[14px] max-[380px]:gap-[10px]">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="[perspective:1000px] w-full relative z-[1] mt-[26px] flex flex-col group cursor-pointer max-[640px]:mt-[18px] max-[380px]:mt-[16px] max-[640px]:h-[200px] max-[380px]:h-[180px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .10 }}
              onClick={(e) => handleTap(e, i)}
            >
              {/* ── FIXED WRAPPER TO FORCE FULL HEIGHT GRID ── */}
              <div 
                className={`grid h-full min-h-[300px] laptop:min-h-[340px] transition-transform duration-[0.6s] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] w-full rounded-[14px] max-[640px]:h-[200px] max-[640px]:min-h-0 max-[380px]:h-[180px] ${
                  flippedCards.includes(i) || isAutoFlipped 
                    ? '[transform:rotateY(180deg)]' 
                    : 'group-hover:[transform:rotateY(180deg)]'
                }`}
              >
                {/* ── FRONT CARD ── */}
                <div
                  className="[grid-area:1/1] bg-[rgba(255,255,255,0.72)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] border-[1px] border-solid border-[rgba(255,255,255,0.35)] rounded-[14px] px-[24px] pb-[28px] pt-[48px] [backface-visibility:hidden] box-border flex flex-col justify-center items-center text-center bg-no-repeat relative transition-all duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] group-hover:border-[rgba(26,86,219,0.20)] [transform:rotateY(0deg)] z-[2] max-[640px]:px-[12px] max-[640px]:pb-[16px] max-[640px]:pt-[34px]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)), url(${c.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute top-[-26px] left-[50%] translate-x-[-50%] bg-[#fff] rounded-[50%] p-[6px] max-[640px]:top-[-16px] max-[640px]:p-[3px]">
                    <div
                      className="w-[52px] h-[52px] rounded-[50%] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] max-[640px]:w-[32px] max-[640px]:h-[32px] [&>svg]:max-[640px]:w-[18px] [&>svg]:max-[640px]:h-[18px]"
                      style={{ background: `${c.color}14`, color: c.color }}
                    >
                      {c.icon}
                    </div>
                  </div>
                  <h3 className="text-[clamp(16px,2vw,20px)] font-[800] text-[#0F172A] mb-[12px] [text-shadow:0_1px_2px_rgba(255,255,255,0.9)] max-[640px]:text-[13px] max-[640px]:mb-[6px]">
                    {c.title}
                  </h3>
                  <div className="w-[36px] h-[3px] rounded-[2px] max-[640px]:w-[24px] max-[640px]:h-[2px]" style={{ background: c.color }} />
                </div>

                {/* ── BACK CARD (FIXES SPACING & ALIGNMENT COMPLETELY) ── */}
                <div 
                  className="[grid-area:1/1] bg-[rgba(255,255,255,0.85)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] border-[1px] border-solid border-[rgba(255,255,255,0.35)] rounded-[14px] px-[28px] py-[28px] [backface-visibility:hidden] box-border flex flex-col justify-center items-start text-left transition-all duration-300 [transform:rotateY(180deg)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] group-hover:border-[rgba(26,86,219,0.20)] max-[640px]:px-[14px] max-[640px]:py-[16px]"
                >
                  <h3 
                    className="text-[clamp(16px,2vw,20px)] font-[800] mb-[14px] max-[640px]:text-[13px] max-[640px]:mb-[8px]" 
                    style={{ color: c.color }}
                  >
                    {c.title}
                  </h3>
                  <p 
                    className="text-[clamp(12.5px,1.4vw,14.5px)] text-[#4B5563] leading-[1.65] w-full max-[640px]:text-[10.5px] max-[640px]:leading-[1.35] overflow-y-auto max-[640px]:max-h-[120px]"
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}