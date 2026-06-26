import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Rocket, Globe, Trophy } from 'lucide-react'

const statsData = [
  { val: 70, suffix: '+', label: 'Total Projects', color: '#1A56DB' },
  { val: 4,  suffix: '+', label: 'Ongoing Projects', color: '#059669' },
  { val: 27, suffix: '+', label: 'Completed This Year', color: '#7C3AED' },
  { val: 39, suffix: '+', label: 'Pending Projects', color: '#D97706' },
]

function Counter({ target, suffix, color, running }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!running) return
    const duration = 2000
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) raf.current = requestAnimationFrame(step)
      else setCount(target)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [running, target])

  return <span style={{ color }}>{count}{suffix}</span>
}

export default function ProjectsPortfolio() {
  const [running, setRunning] = useState(false)
  const ref = useRef(null)
  const portInView = useInView(ref, { once: true, amount: 0.3 })
  const [isAutoHovering, setIsAutoHovering] = useState(false)
  const [tappedIds, setTappedIds] = useState([])
  const [tappedLowerIds, setTappedLowerIds] = useState([])

  useEffect(() => {
    if (portInView) {
      const timer = setTimeout(() => {
        setIsAutoHovering(true)
        setTimeout(() => setIsAutoHovering(false), 1200)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [portInView])

  useEffect(() => {
    const handleOutside = () => {
      setTappedIds([])
      setTappedLowerIds([])
    }
    window.addEventListener('click', handleOutside)
    return () => window.removeEventListener('click', handleOutside)
  }, [])

  const handleTap = (e, id) => {
    e.stopPropagation()
    setTappedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleLowerTap = (e, id) => {
    e.stopPropagation()
    setTappedLowerIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRunning(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects-portfolio" className="py-[clamp(48px,8vw,80px)] bg-[#F8FAFC] relative overflow-hidden max-[900px]:p-[60px_20px] max-[600px]:p-[50px_15px]" ref={ref}>
      <div className="container-custom">
        {/* Header & Overview Section */}
        <motion.div 
          className="text-center mb-[clamp(40px,8vw,64px)] flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag flex items-center gap-[6px]">
            <Briefcase size={14} /> Projects & Portfolio
          </div>

          <h2 className="section-title">
            Our Projects{" "}
            <span className="section-title-accent">
             &amp; Portfolio
            </span>
          </h2>
          
          <p className="section-subtitle !max-w-4xl">
            At CR Cyber Crime Foundation (Cyber Revolution), we actively engage in the development of innovative, impactful, and technology-driven projects across multiple domains. Our projects reflect our commitment to cybersecurity, digital transformation, and advanced IT solutions.
            We have successfully undertaken projects at national, government, and international levels, showcasing our capability to deliver reliable and scalable solutions. All projects are original products developed by CRCCF, highlighting our focus on innovation, research, and real-world problem-solving.
          </p>
        </motion.div>


        {/* Project Statistics (Impact Section Style) */}
        <div className="mb-[60px]">
          <motion.div
            className="text-center mb-[30px]"
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:.5 }}
          >
          <h2 className="section-title">
            Project{" "}
            <span className="section-title-accent">
             Statistics
            </span>
          </h2>

          </motion.div>

          <div className="grid grid-cols-[repeat(4,1fr)] gap-[20px] max-[1024px]:grid-cols-[repeat(2,1fr)] max-[900px]:grid-cols-[repeat(2,1fr)] max-[600px]:grid-cols-[repeat(2,1fr)] max-[600px]:gap-[12px]">
            {statsData.map((s, i) => (
              <motion.div
                key={s.label}
                className={`bg-[#fff] border border-solid border-[#E5E7EB] rounded-[16px] py-[32px] px-[24px] text-center transition-all duration-[0.28s] shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] hover:border-[#CBD5E1] ${isAutoHovering || tappedIds.includes(s.label) ? 'shadow-[0_8px_20px_rgba(0,0,0,0.04)] translate-y-[-4px] border-[#CBD5E1]' : ''} max-[600px]:py-[24px] max-[600px]:px-[16px] cursor-pointer`}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:.45, delay: i*.1 }}
                onClick={(e) => handleTap(e, s.label)}
              >
                <div className="font-[inherit] text-[clamp(28px,4.5vw,48px)] font-[900] leading-[1] tracking-[-0.02em] max-[600px]:text-[clamp(24px,6vw,36px)]">
                  <Counter target={s.val} suffix={s.suffix} color={s.color} running={running} />
                </div>
                <div className="text-[13px] text-[#64748B] font-[600] uppercase tracking-[0.06em] mt-[12px] max-[600px]:text-[11px] max-[600px]:mt-[8px]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto mb-20 mt-12">
          {[
            {
              title: "Our Approach",
              icon: Rocket,
              description: "• CRCCF-driven innovation planning\n• Professional outcomes for communities, businesses, institutions, startups, and modern industry needs\n• AI-powered technology solutions\n• Secure, scalable project execution\n• Real-world problem-solving approach\n• Research-based development\n• Future-ready digital growth"
            },
            {
              title: "Our Commitment",
              icon: Trophy,
              description: "• CRCCF commits to ethical innovation\n• Secure, scalable project delivery\n• Quality-focused technology solutions\n• Reliable support for communities, businesses, institutions, startups, and future-ready growth with professional impact, trust, success\n• AI-driven digital excellence"
            },
            {
              title: "Project Scope",
              icon: Globe,
              description: "• CRCCF defines clear project scope through AI-enabled planning\n• Future-ready solutions for communities, businesses, institutions, digital growth, long-term innovation success\n• Secure development areas\n• Measurable outcomes\n• Practical deliverables\n• Scalable execution"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ 
                hidden: { opacity: 0, y: 40 }, 
                rest: { opacity: 1, y: 0, scale: 1 },
                active: { opacity: 1, y: 0, scale: 1.02 }
              }}
              whileHover="active"
              animate={tappedLowerIds.includes(item.title) ? "active" : "rest"}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative flex flex-col items-center justify-start text-center cursor-default group min-h-[380px] md:min-h-[420px] pt-8 px-8 pb-16 md:pb-8 rounded-3xl transition-all ${tappedLowerIds.includes(item.title) ? 'bg-white shadow-[0_20px_50px_rgba(37,99,235,0.1)] border-blue-100/50' : 'bg-blue-50/40'} hover:bg-white hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] border border-blue-100/50`}
              onClick={(e) => handleLowerTap(e, item.title)}
            >
              {/* The semi-circle arc (Animated on Hover) */}
              <svg className="absolute left-1/2 top-[48px] opacity-0 group-hover:opacity-60 text-[#1A56DB] transition-opacity duration-500" width="180" height="340" viewBox="0 0 180 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 2 2 A 166 166 0 0 1 2 334"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  variants={{
                    rest: { pathLength: 0 },
                    active: { pathLength: 1 }
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>

              {/* Top Icon Circle (Always Visible) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  rest: { opacity: 1, y: 0 },
                  active: { opacity: 1, y: -10 }
                }}
                className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-blue-50"
              >
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-blue-50/50 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]">
                  <item.icon className="size-8 text-[#1A56DB]" />
                </div>
              </motion.div>

              {/* Center Pill (Moves Up on Hover) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  rest: { opacity: 1, y: 40 },
                  active: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="relative z-20 mt-6 flex h-11 items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-slate-100"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="pr-3 text-sm font-bold text-slate-800">{item.title}</span>
              </motion.div>

              {/* Text Area & Bottom Circle (Reveals on Hover) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, height: 0, marginTop: 0 },
                  rest: { opacity: 0, height: 0, marginTop: 0 },
                  active: { opacity: 1, height: "auto", marginTop: 12 }
                }}
                className="overflow-hidden flex flex-col items-center"
              >
                <div className="relative z-10 w-full max-w-[260px] flex flex-col justify-start">
                  {item.description.split('\n').map((line, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1 group/line">
                      <span className="w-1 h-1 rounded-full bg-[#1A56DB]/40 mt-1.5 shrink-0 group-hover/line:bg-[#1A56DB] transition-colors" />
                      <p className="text-[12px] lg:text-[10.5px] xl:text-[11px] leading-[1.4] text-slate-500 text-left m-0 group-hover:text-slate-700 transition-colors">
                        {line.replace('• ', '').replace('- ', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Circle — anchored relative to the container but hidden if overlapping content on mobile */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[362px] max-[600px]:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow-inner">
                  <div className="h-5 w-5 rounded-full bg-white shadow-sm border border-slate-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
