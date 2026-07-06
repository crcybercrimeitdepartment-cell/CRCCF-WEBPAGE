import SectionHeading from './common/SectionHeading';
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const digitalStats = [
  { val: 500, suffix: '+', label: 'Cyber Defenses', color: '#1A56DB' },
  { val: 120, suffix: '+', label: 'SaaS Products', color: '#7C3AED' },
  { val: 25, suffix: 'M+', label: 'Secure Transactions', color: '#059669' },
  { val: 99.9, suffix: '%', label: 'Uptime', color: '#D97706' },
]

const impactItems = [
  '📌People Educated on Cyber Safety',
  '📌Awareness Programs Conducted',
  '📌Community Outreach Activities',
  '📌Digital Security Initiative',
]


function Counter({ target, suffix, color, running, decimals = 0 }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!running) return
    const duration = 2000
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(parseFloat((ease * target).toFixed(decimals)))
      if (p < 1) raf.current = requestAnimationFrame(step)
      else setCount(target)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [running, target, decimals])

  return <span style={{ color }}>{count.toFixed(decimals)}{suffix}</span>
}

export default function StatsBar() {
  const [running, setRunning] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isAutoHovering, setIsAutoHovering] = useState(false)

  // Interactive Carousel States
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = () => {
    if (activeIndex >= 4) {
      setIsTransitioning(false)
      setActiveIndex(0)
      setTimeout(() => {
        setIsTransitioning(true)
        setActiveIndex(1)
      }, 30)
    } else {
      setActiveIndex((prev) => prev + 1)
      setIsTransitioning(true)
    }
  }

  const handlePrev = () => {
    if (activeIndex <= 0) {
      setIsTransitioning(false)
      setActiveIndex(4)
      setTimeout(() => {
        setIsTransitioning(true)
        setActiveIndex(3)
      }, 30)
    } else {
      setActiveIndex((prev) => prev - 1)
      setIsTransitioning(true)
    }
  }

  const handleTransitionEnd = () => {
    if (activeIndex === 4) {
      setIsTransitioning(false)
      setActiveIndex(0)
    }
  }

  // Autoplay Effect
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [isHovered, activeIndex])

  useEffect(() => {
    if (isInView) {
      setRunning(true)
      const timer = setTimeout(() => {
        setIsAutoHovering(true)
        setTimeout(() => setIsAutoHovering(false), 1200)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div ref={ref}>
      {/* DIGITAL FOOTPRINT — dark section */}
      <section
        className="section-padding relative overflow-hidden bg-[#0C1A3A] py-[clamp(40px,7vw,64px)] before:absolute before:inset-0 before:content-[''] before:pointer-events-none before:[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] before:[background-size:48px_48px]"
      >
        <div className="container-custom">

          {/* Heading */}
          <SectionHeading 
            subtitle="Digital Footprint" 
            title="Our Numbers Speak" 
            highlightWord="Speak" 
            theme="dark" 
          />

          {/* Stats grid */}
          <div className="relative z-[1] grid grid-cols-[repeat(4,1fr)] gap-[20px] max-[900px]:grid-cols-[repeat(2,1fr)] max-[900px]:gap-[12px]">
            {digitalStats.map((s, i) => (
              <motion.div
                key={s.label}
                className={`bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.10)] rounded-[14px] px-[24px] py-[32px] text-center backdrop-blur-[4px] transition-all duration-[280ms] hover:bg-[rgba(255,255,255,.08)] hover:translate-y-[-2px] ${isAutoHovering ? 'bg-[rgba(255,255,255,.08)] translate-y-[-2px]' : ''} max-[640px]:px-[12px] max-[640px]:py-[16px]`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .45, delay: i * .1 }}
              >
                <div className="font-['Outfit',sans-serif] text-[clamp(26px,3.5vw,48px)] font-[900] leading-[1] tracking-[-.02em] max-[640px]:text-[clamp(18px,5vw,24px)]">
                  <Counter target={s.val} suffix={s.suffix} color={s.color} running={running} decimals={s.val % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-[12.5px] text-[rgba(255,255,255,.50)] font-[600] uppercase tracking-[.07em] mt-[10px] max-[640px]:text-[11px] max-[640px]:mt-[8px]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* OUR IMPACT — single horizontal slideshow card */}
          <motion.div
            className="mt-[60px] text-center relative z-[1]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-[clamp(20px,3vw,28px)] font-[800] text-white mb-8">
              Our <span className="text-blue-400">Impact</span>
            </h3>

            {/* Single wide neumorphic rectangle */}
            <div className="flex justify-center">
              <div
                style={{
                  position: 'relative',
                  width: 'min(680px, 92vw)',
                  height: '90px',
                  background: 'rgb(223,225,235)',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  boxShadow:
                    'inset 0px 56px 40px #2224, inset 0px -56px 40px #fff, 1px 1px 2px #fff, -1px -1px 2px #4442',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* 5-panel strip (including clone) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '500%',
                    height: '100%',
                    transform: `translateX(-${activeIndex * 20}%)`,
                    transition: isTransitioning
                      ? 'transform 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)'
                      : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {[...impactItems, impactItems[0]].map((label, idx) => {
                    const hasPin = label.startsWith('📌');
                    const text = hasPin ? label.replace('📌', '') : label;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: '20%',
                          textAlign: 'center',
                          padding: '0 50px', // Extra padding to accommodate arrow buttons on hover
                          lineHeight: 1.35,
                        }}
                      >
                        <span className="flex items-center justify-center gap-3">
                          {hasPin && (
                            <span className="text-xl md:text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none animate-pulse">
                              📌
                            </span>
                          )}
                          <span 
                            className="text-blue-950 font-black tracking-wider uppercase text-[clamp(12px,1.8vw,16px)]"
                          >
                            {text}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrev}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-blue-900 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                  aria-label="Previous Slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNext}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-blue-900 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                  }`}
                  aria-label="Next Slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {impactItems.map((_, dotIdx) => {
                    const isActive = activeIndex % 4 === dotIdx;
                    return (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          setActiveIndex(dotIdx)
                          setIsTransitioning(true)
                        }}
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'bg-blue-900 w-3 h-1.5 rounded-full'
                            : 'bg-slate-400 w-1.5 h-1.5 rounded-full hover:bg-slate-500'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

