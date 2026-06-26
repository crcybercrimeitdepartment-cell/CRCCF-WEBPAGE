import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence, useMotionValue, useAnimationFrame, useTransform, wrap } from 'framer-motion'

import {
  GraduationCap,
  FileText,
  Briefcase,
  Globe,
  Clock,
  BookOpen,
  Laptop,
  BrainCircuit,
  Network,
  Target,
  Award,
  Search,
  Rocket,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const domainRows = [
  {
    direction: "left",
    items: [
      "Software Development Intern",
      "Software Designing Intern",
      "Software Testing Intern",
      "Digital Marketing Intern",
      "SEO Intern",
      "Full Stack Development",
      "UI/UX Designing Intern"
    ]
  },
  {
    direction: "right",
    items: [
      "Cyber Law Intern",
      "Cyber Psychology Intern",
      "Cyber Investigation Intern",
      "Cyber Research Intern",
      "Cyber Case Study Intern",
      "Cyber Forensic Intern",
      "Security Analyst Intern"
    ]
  }
]

const DomainMarquee = ({ items, direction }) => {
  const baseX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 4);
    }
  }, [items]);

  const speed = direction === "left" ? -1.2 : 1.2;

  useAnimationFrame((t, delta) => {
    if (isDragging || isHovered || !contentWidth) return;
    let moveBy = (speed * delta) / 30;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => {
    if (!contentWidth) return 0;
    return wrap(-contentWidth, 0, v);
  });

  return (
    <div 
      className="domain-marquee-wrapper overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex gap-[20px] whitespace-nowrap py-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={(e, info) => {
          baseX.set(baseX.get() + info.delta.x);
        }}
      >
        {[...items, ...items, ...items, ...items].map((domain, index) => (
          <div key={index} className="py-[10px] px-[24px] rounded-[50px] bg-[white] shadow-[rgba(0,0,0,0.05)_0_0_8px] tracking-[1px] uppercase text-[13px] font-[600] text-[#1E293B] border-[1px] border-solid border-[#E2E8F0] transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] select-none">
            {domain}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const learningPoints = [
  { icon: <Rocket size={18} />, text: 'Real-time project exposure' },
  { icon: <Laptop size={18} />, text: 'Industry-relevant skills and practical experience' },
  { icon: <BookOpen size={18} />, text: 'A balanced approach of theoretical and practical learning' },
  { icon: <Target size={18} />, text: 'Guidance from dedicated and experienced mentors' },
  { icon: <BrainCircuit size={18} />, text: 'Open learning environment with anytime mentor support' },
]

function ProgramStructureCard() {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.4 })
  const [activeIndex, setActiveIndex] = useState(null)
  const [loopStarted, setLoopStarted] = useState(false)
  const loopRef = useRef(null)

  // Start the looping highlight after entry animations complete
  useEffect(() => {
    if (!isInView) return
    const delay = setTimeout(() => {
      setLoopStarted(true)
      setActiveIndex(0)
    }, 1800) // wait for heading + paragraph + list to appear
    return () => clearTimeout(delay)
  }, [isInView])

  useEffect(() => {
    if (!loopStarted) return
    loopRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % learningPoints.length)
    }, 1800)
    return () => clearInterval(loopRef.current)
  }, [loopStarted])

  // Container: fade + slide up
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }

  // Heading: starts left, slides to center
  const headingVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
    }
  }

  // Paragraph fades in after heading
  const paraVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 }
    }
  }

  // List container stagger
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } }
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <motion.div
      ref={cardRef}
      className="mt-[clamp(48px,8vw,80px)] max-w-[900px] mx-auto relative overflow-hidden rounded-[24px] bg-white border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.04)] px-[clamp(24px,4vw,48px)] py-[clamp(28px,4vw,44px)]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-[24px]" />

      {/* Subtle background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Heading — slides from left to center */}
      <motion.h3
        className="text-[clamp(20px,2.8vw,26px)] font-[800] text-[#0F172A] mb-3 text-center"
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        Program Structure &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Learning</span>
      </motion.h3>

      {/* Paragraph — fades in after heading */}
      <motion.p
        className="text-[15.5px] leading-[1.75] text-[#475569] mb-6 text-center max-w-[640px] mx-auto"
        variants={paraVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        Our internship programs are designed to bridge the gap between academic knowledge and industry requirements.
      </motion.p>

      <motion.p
        className="text-[15px] font-[700] text-[#1E293B] mb-4"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.85 } } }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        Participants will gain:
      </motion.p>

      {/* Bullet Points — stagger in, then loop highlight */}
      <motion.ul
        className="list-none p-0 m-0 space-y-3"
        variants={listVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {learningPoints.map((point, i) => {
          const isActive = activeIndex === i
          return (
            <motion.li
              key={i}
              variants={listItemVariants}
              animate={isActive
                ? { scale: 1.03, y: -3, transition: { duration: 0.4, ease: 'easeOut' } }
                : { scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
              }
              whileHover={{ scale: 1.025, y: -2, transition: { duration: 0.25 } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-[14px] cursor-default transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-50 border border-blue-200 shadow-[0_4px_20px_rgba(37,99,235,0.12)]'
                  : 'bg-slate-50/60 border border-slate-100 hover:bg-blue-50/40 hover:border-blue-100'
              }`}
            >
              {/* Icon with pulse when active */}
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]'
                    : 'bg-blue-100/70 text-blue-500'
                }`}
                animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={isActive ? { duration: 0.6, repeat: Infinity, repeatDelay: 1 } : {}}
              >
                {point.icon}
              </motion.div>

              {/* Text */}
              <span className={`text-[14.5px] leading-[1.5] font-[500] transition-colors duration-300 ${
                isActive ? 'text-[#1E3A8A] font-[600]' : 'text-[#475569]'
              }`}>
                {point.text}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.span
                  className="ml-auto w-2 h-2 rounded-full bg-blue-500 shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}

export default function InternshipPrograms() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [isAutoHovering, setIsAutoHovering] = useState(false)
  const [expandedCards, setExpandedCards] = useState({ mentorship: false, certification: false })
  const [tappedBenefits, setTappedBenefits] = useState([])

  const toggleCard = (card) => {
    setExpandedCards(prev => ({ ...prev, [card]: !prev[card] }))
  }

  const handleBenefitTap = (e, id) => {
    e.stopPropagation()
    setTappedBenefits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }





  useEffect(() => {
    if (isInView) {
      const startTimer = setTimeout(() => {
        setIsAutoHovering(true)
        setTimeout(() => setIsAutoHovering(false), 1200)
      }, 300)
      return () => clearTimeout(startTimer)
    }
  }, [isInView])

  return (
    <section id="internship-programs" className="section-padding bg-[#ffffff] relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          className="text-center mb-[clamp(40px,8vw,64px)] flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag flex items-center gap-[6px]">
            <GraduationCap size={14} /> Internship Programs
          </div>

          <h2 className="section-title">
            Our <span className="section-title-accent">Internship</span> Programs
          </h2>


          <div className="bg-[linear-gradient(135deg,#F8FAFC_0%,#DBEAFE_100%)] border-[1px] border-solid border-[#DBEAFE] py-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,50px)] rounded-[20px] shadow-[0_10px_40px_rgba(37,99,235,0.05)] text-center transition-[transform,box-shadow] duration-[0.3s] ease-[ease] hover:translate-y-[-4px] hover:shadow-[0_15px_50px_rgba(37,99,235,0.1)] max-[600px]:py-[30px] max-[600px]:px-[24px]">
            <h3 className="text-[clamp(16px,2.5vw,20px)] font-[700] text-[#1E3A8A] mb-[12px]">
              <FileText size={20} className="align-middle mr-[8px] text-[#1A56DB]" /> Overview
            </h3>
            <p className="text-[16px] leading-[1.8] text-[#1E3A8A] m-0">
              At CR Cyber Crime Foundation (Cyber Revolution), we offer structured and industry-oriented internship programs designed to equip individuals with practical skills, real-time experience, and professional exposure across multiple domains.
            </p>
          </div>
        </motion.div>

        {/* Domains Section */}
        <motion.div
          className="mt-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-[40px]">
            <h3 className="text-[clamp(20px,3vw,28px)] font-[800] text-[#0F172A] mb-[10px]"><Briefcase size={24} className="align-middle mr-[8px] text-[#1A56DB]" /> Internship Domains</h3>
            <p className="text-[16px] text-[#475569]">We provide internship opportunities in the following areas:</p>
          </div>

          <div className="max-w-[1400px] mx-auto space-y-4">
            {domainRows.map((row, idx) => (
              <DomainMarquee key={idx} items={row.items} direction={row.direction} />
            ))}
          </div>
        </motion.div>

        {/* Structure Section */}
        <ProgramStructureCard />

        {/* Duration & Mode Section */}
        <motion.div
          className="mt-[40px] max-w-[900px] mx-auto my-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-[repeat(2,1fr)] gap-[20px] max-[600px]:grid-cols-1">
            <div className="bg-[#ffffff] rounded-[16px] p-[24px] flex items-center gap-[20px] border-[1px] border-solid border-[rgba(226,232,240,0.8)] shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-transform duration-[0.3s] ease-[ease] hover:translate-y-[-5px] hover:border-[#2563EB]">
              <div className="text-[32px] w-[60px] h-[60px] bg-[#EFF6FF] text-[#1A56DB] flex items-center justify-center rounded-[12px]"><Clock size={28} strokeWidth={2.5} /></div>
              <div className="flex flex-col">
                <h4 className="text-[14px] uppercase text-[#1E3A8A] mb-[4px] tracking-[1px]">Duration</h4>
                <p className="text-[18px] font-[700] text-[#1E293B] m-0">3 to 6 Months</p>
              </div>
            </div>
            <div className="bg-[#ffffff] rounded-[16px] p-[24px] flex items-center gap-[20px] border-[1px] border-solid border-[rgba(226,232,240,0.8)] shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-transform duration-[0.3s] ease-[ease] hover:translate-y-[-5px] hover:border-[#2563EB]">
              <div className="text-[32px] w-[60px] h-[60px] bg-[#EFF6FF] text-[#1A56DB] flex items-center justify-center rounded-[12px]"><Globe size={28} strokeWidth={2.5} /></div>
              <div className="flex flex-col">
                <h4 className="text-[14px] uppercase text-[#1E3A8A] mb-[4px] tracking-[1px]">Mode</h4>
                <p className="text-[18px] font-[700] text-[#1E293B] m-0">Online & Offline Classes Available</p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* What We Provide Section */}
        <motion.div
          className="mt-[60px] max-w-[1100px] mx-auto my-0 pb-[40px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-[40px]">
           <h3 className="text-4xl md:text-5xl   font-extrabold text-slate-900 mb-2">
            What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
             We Provide
            </span>
          </h3>
          </div>
          <div className="bg-[#F8FAFC] border-[1px] border-solid border-[#E2E8F0] rounded-[30px] py-[clamp(28px,5vw,50px)] px-[clamp(20px,4vw,40px)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" ref={ref}>
            <div className="grid grid-cols-[repeat(4,1fr)] gap-[30px] items-stretch max-[1024px]:grid-cols-[repeat(2,1fr)] max-[600px]:grid-cols-[repeat(2,1fr)] max-[600px]:gap-[12px]">
              {[
                { 
                  id: 'benefit1', 
                  icon: <BookOpen size={32} />, 
                  text: 'Comprehensive Course Materials',
                  desc: 'Access industry-oriented, research-driven, and professionally structured learning materials by CR Cyber Crime Foundation designed to strengthen technical knowledge, practical understanding, and real-world industry skills.'
                },
                { 
                  id: 'benefit2', 
                  icon: <Laptop size={32} />, 
                  text: 'Hands-on Training & Practical Sessions',
                  desc: 'Gain real-time practical exposure through live projects, interactive sessions, workshops, and technology-driven learning programs conducted by CR Cyber Crime Foundation to enhance technical expertise, problem-solving abilities, and industry readiness.'
                },
                { 
                  id: 'benefit3', 
                  icon: <BrainCircuit size={32} />, 
                  text: 'Continuous Evaluation & Mentorship',
                  desc: 'Receive continuous guidance, performance evaluation, and expert mentorship from CR Cyber Crime Foundation to strengthen technical skills, track progress, and support professional growth through a structured and learner-focused approach.'
                },
                { 
                  id: 'benefit4', 
                  icon: <Network size={32} />, 
                  text: 'Professional & Structured Learning Environment',
                  desc: 'Experience a professional, collaborative, and technology-driven learning ecosystem at CR Cyber Crime Foundation designed to promote discipline, innovation, continuous learning, and career-oriented skill development in a supportive environment.'
                }
              ].map((item, idx) => {
                const isExpanded = isAutoHovering || tappedBenefits.includes(item.id);
                return (
                  <div 
                    key={idx} 
                    className={`group w-full h-full bg-[#F8FAFC] text-center border-[6px] border-solid rounded-[30px] transition-all duration-500 ease-in-out flex flex-col items-center py-[24px] px-[15px] relative cursor-pointer max-[600px]:py-[16px] max-[600px]:px-[10px] max-[600px]:border-[4px] max-[600px]:rounded-[20px] ${isExpanded ? 'border-[#DBEAFE] bg-[#ffffff] shadow-[15px_15px_35px_rgba(37,99,235,0.1),-15px_-15px_35px_#ffffff]' : 'border-[#F8FAFC] shadow-[inset_4px_4px_10px_rgba(37,99,235,0.05),inset_-4px_-4px_10px_#fff] hover:border-[#DBEAFE] hover:bg-[#ffffff] hover:shadow-[15px_15px_35px_rgba(37,99,235,0.1),-15px_-15px_35px_#ffffff]'}`}
                    onClick={(e) => handleBenefitTap(e, item.id)}
                  >
                  <div className={`w-[70px] h-[70px] text-[#1A56DB] bg-[#ffffff] flex items-center justify-center rounded-[50%] shadow-[8px_8px_15px_rgba(26,86,219,0.05),-8px_-8px_15px_#ffffff] transition-all duration-500 ease-in-out z-[2] shrink-0 ${isAutoHovering || tappedBenefits.includes(item.id) ? '-translate-y-[5px] shadow-[0_10px_20px_rgba(37,99,235,0.1)]' : 'group-hover:-translate-y-[5px] group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)]'} max-[600px]:w-[50px] max-[600px]:h-[50px]`}>{item.icon}</div>
                  
                  <div className="mt-[12px] px-[8px] z-[2]">
                    <h4 className="text-[13px] font-[800] text-[#1E3A8A] m-0 leading-[1.3] uppercase tracking-tight max-[600px]:text-[11px]">{item.text}</h4>
                  </div>

                  {/* Expandable: description + CTA — max-height so content never gets clipped */}
                  <div className={`mt-[12px] overflow-hidden transition-all duration-500 ease-in-out w-full flex flex-col flex-1 items-center ${isExpanded ? 'max-h-[600px] opacity-100 translate-y-0 scale-100' : 'max-h-0 opacity-0 translate-y-[20px] scale-95 group-hover:max-h-[600px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}`}>
                    <div className="bg-[#F8FAFC] p-[12px] rounded-[18px] border border-[#DBEAFE] shadow-[inset_4px_4px_10px_rgba(0,0,0,0.02)] w-full mb-3 flex-grow">
                      <p className="text-[11.5px] font-[500] text-[#475569] m-0 leading-[1.6] max-[600px]:text-[10px]">{item.desc}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const routes = {
                          benefit1: '/resources/course-materials',
                          benefit2: '/resources/practical-training',
                          benefit3: '/resources/mentorship-evaluation',
                          benefit4: '/resources/learning-environment'
                        }
                        navigate(routes[item.id])
                      }}
                      className="flex items-center gap-2 px-4 py-2 mb-2 bg-blue-600 text-white rounded-full text-[10px] font-black shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 animate-pulse"
                    >
                      Click to know more
                      <Rocket size={13} className="animate-bounce" />
                    </button>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Support & Certification Cards */}
        <div className="mt-[60px] grid grid-cols-[repeat(2,1fr)] gap-[30px] max-[900px]:grid-cols-1 max-[900px]:max-w-[500px] max-[900px]:mx-auto max-[900px]:mt-[60px]">
          <motion.div
            className="bg-[#ffffff] rounded-[12px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-[1px] border-solid border-[#E5E7EB] flex flex-col transition-[transform,box-shadow] duration-[0.3s] ease-[ease] relative hover:translate-y-[-12px] hover:shadow-[0_30px_70px_rgba(0,102,255,0.15)] hover:border-[#3B82F6] group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-[linear-gradient(180deg,#00A3FF_0%,#0066FF_100%)] py-[40px] px-[30px] pb-[60px] text-center text-[#ffffff] relative transition-[filter] duration-[0.3s] ease-[ease] group-hover:brightness-[1.1] max-[600px]:py-[30px] max-[600px]:px-[20px] max-[600px]:pb-[50px]">
              <h4 className="text-[13px] font-[500] opacity-[0.9] mb-[8px] capitalize">Mentorship</h4>
              <h3 className="text-[20px] font-[700] m-0 tracking-[0.5px]">Training, Mentorship & Placement Support</h3>
              <div className="absolute bottom-0 left-0 w-full h-[40px] bg-[#ffffff] rounded-[100%_100%_0_0/100%_100%_0_0] translate-y-[1px]"></div>
            </div>
            <div className="w-[100px] h-[100px] bg-[#ffffff] rounded-[50%] mx-auto mt-[-50px] p-[8px] relative z-[2] shadow-[0_4px_10px_rgba(0,0,0,0.1)] max-[600px]:w-[80px] max-[600px]:h-[80px] max-[600px]:mt-[-40px]">
              <div className="w-full h-full bg-[#f8fafc] rounded-[50%] flex items-center justify-center text-[36px] border-[1px] border-solid border-[#E5E7EB] transition-all duration-[0.4s] ease-[ease] group-hover:scale-[1.1] group-hover:rotate-[5deg] group-hover:border-[#3B82F6] group-hover:text-[#3B82F6] max-[600px]:text-[28px]"><Target size={36} color="currentColor" /></div>
            </div>
            <div className="py-[24px] px-[30px] pb-[40px] text-center flex-1">
              <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">We are committed to delivering quality education through our team of experienced professionals.</p>

              <AnimatePresence>
                {expandedCards.mentorship && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">Our mentors ensure that students receive proper guidance, industry insights, and continuous support throughout the program.</p>
                    <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">We also provide the Talent Placement Program to eligible candidates <Rocket size={14} className="vertical-middle mx-[4px] inline-block text-[#1A56DB]" />, helping them transition into real-world career opportunities based on their performance, skills, and evaluation.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="flex items-center justify-center gap-[8px] mx-auto mt-[16px] bg-[rgba(37,99,235,0.05)] text-[#1A56DB] border-[1px] border-solid border-[rgba(37,99,235,0.2)] py-[8px] px-[20px] rounded-[999px] text-[14px] font-[700] cursor-pointer transition-all duration-[0.3s] ease-[ease] w-fit hover:bg-[#1A56DB] hover:text-[#ffffff] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(26,86,219,0.2)] [&_svg]:transition-transform [&_svg]:duration-[0.3s] [&_svg]:ease-[ease] hover:[&_svg]:translate-y-[2px]" onClick={() => toggleCard('mentorship')}>
                {expandedCards.mentorship ? 'Show Less' : 'Read More'}
                {expandedCards.mentorship ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#ffffff] rounded-[12px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-[1px] border-solid border-[#E5E7EB] flex flex-col transition-[transform,box-shadow] duration-[0.3s] ease-[ease] relative hover:translate-y-[-12px] hover:shadow-[0_30px_70px_rgba(0,102,255,0.15)] hover:border-[#3B82F6] group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="bg-[linear-gradient(180deg,#00A3FF_0%,#0066FF_100%)] py-[40px] px-[30px] pb-[60px] text-center text-[#ffffff] relative transition-[filter] duration-[0.3s] ease-[ease] group-hover:brightness-[1.1] max-[600px]:py-[30px] max-[600px]:px-[20px] max-[600px]:pb-[50px]">
              <h4 className="text-[13px] font-[500] opacity-[0.9] mb-[8px] capitalize">Certification</h4>
              <h3 className="text-[20px] font-[700] m-0 tracking-[0.5px]">Certification & Verification</h3>
              <div className="absolute bottom-0 left-0 w-full h-[40px] bg-[#ffffff] rounded-[100%_100%_0_0/100%_100%_0_0] translate-y-[1px]"></div>
            </div>
            <div className="w-[100px] h-[100px] bg-[#ffffff] rounded-[50%] mx-auto mt-[-50px] p-[8px] relative z-[2] shadow-[0_4px_10px_rgba(0,0,0,0.1)] max-[600px]:w-[80px] max-[600px]:h-[80px] max-[600px]:mt-[-40px]">
              <div className="w-full h-full bg-[#f8fafc] rounded-[50%] flex items-center justify-center text-[36px] border-[1px] border-solid border-[#E5E7EB] transition-all duration-[0.4s] ease-[ease] group-hover:scale-[1.1] group-hover:rotate-[5deg] group-hover:border-[#3B82F6] group-hover:text-[#3B82F6] max-[600px]:text-[28px]"><Award size={36} color="currentColor" /></div>
            </div>
            <div className="py-[24px] px-[30px] pb-[40px] text-center flex-1">
              <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">Upon successful completion of the internship program, participants will be awarded:</p>

              <AnimatePresence>
                {expandedCards.certification && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="list-none p-0 my-[16px] mx-0 inline-block text-left">
                      <li className="relative pl-[24px] mb-[8px] text-[14.5px] text-[#1F2937] font-[600] before:content-['•'] before:absolute before:left-0 before:text-[#3B82F6] before:font-bold">Digital (Virtual) Certificate <Globe size={14} className="vertical-middle mx-[4px] inline-block text-[#1A56DB]" /></li>
                      <li className="relative pl-[24px] mb-[8px] text-[14.5px] text-[#1F2937] font-[600] before:content-['•'] before:absolute before:left-0 before:text-[#3B82F6] before:font-bold">Physical Hard Copy Certificate <FileText size={14} className="vertical-middle mx-[4px] inline-block text-[#1A56DB]" /></li>
                    </ul>
                    <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">These certifications are officially issued by CR Cyber Crime Foundation (CRCCF) and hold professional value in recognizing the candidate’s training and practical experience.</p>
                    <p className="text-[14.5px] text-[#4B5563] leading-[1.7] mb-[16px] last:mb-0">To ensure authenticity, each student’s certification details, profile, and photograph will be securely published on the official Student Verification Portal <Search size={14} className="vertical-middle mx-[4px] inline-block text-[#1A56DB]" />.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="flex items-center justify-center gap-[8px] mx-auto mt-[16px] bg-[rgba(37,99,235,0.05)] text-[#1A56DB] border-[1px] border-solid border-[rgba(37,99,235,0.2)] py-[8px] px-[20px] rounded-[999px] text-[14px] font-[700] cursor-pointer transition-all duration-[0.3s] ease-[ease] w-fit hover:bg-[#1A56DB] hover:text-[#ffffff] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(26,86,219,0.2)] [&_svg]:transition-transform [&_svg]:duration-[0.3s] [&_svg]:ease-[ease] hover:[&_svg]:translate-y-[2px]" onClick={() => toggleCard('certification')}>
                {expandedCards.certification ? 'Show Less' : 'Read More'}
                {expandedCards.certification ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

