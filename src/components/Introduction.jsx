import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, BookOpen, Laptop, Target, Rocket, Zap } from 'lucide-react'

export default function Introduction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isAutoHovering, setIsAutoHovering] = useState(false)
  const [tappedCards, setTappedCards] = useState([])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsAutoHovering(true)
        setTimeout(() => setIsAutoHovering(false), 1200)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const handleCardTap = (e, id) => {
    e.stopPropagation()
    setTappedCards(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <section id="introduction" className="relative bg-[#F9FAFB] font-[inherit]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes open {
          0% { transform: perspective(1900px) rotateX(-88.5deg); }
          100% { transform: perspective(1000px) rotateX(0deg); }
        }
      `}} />

      {/* ── TOP BLUE SECTION ── */}
      <div className="relative bg-[linear-gradient(135deg,#1A365D_0%,#2563EB_100%)] py-[clamp(48px,8vw,80px)] px-0 text-[#fff] overflow-hidden max-[900px]:pb-[60px] max-[600px]:pb-[40px]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[40px_40px] bg-center pointer-events-none z-[1]"></div>
        <div className="container-custom relative z-[2]">
          <div className="flex items-center gap-[60px] max-[900px]:flex-col max-[900px]:gap-[32px] max-[600px]:gap-[24px]">
            {/* Left Content */}
            <motion.div
              className="flex-[1.1] max-[900px]:text-center max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.12)] py-[6px] px-[14px] rounded-[999px] text-[13px] font-[600] mb-[24px] backdrop-blur-[4px] border border-solid border-[rgba(255,255,255,0.08)] max-[600px]:text-[12px] max-[600px]:py-[5px] max-[600px]:px-[12px]">
                <Target size={14} style={{ color: '#F59E0B' }} /> Introduction
              </div>
              <h2 className="text-[clamp(26px,4vw,48px)] font-[800] leading-[1.2] mb-[20px] tracking-[-0.01em]">
                Building a <span className="text-[#93C5FD]">Safer Digital</span><br />Future
              </h2>
              <p className="text-[clamp(13.5px,1.8vw,16px)] leading-[1.75] text-[rgba(255,255,255,0.85)] mb-[28px] max-w-[95%] max-[900px]:max-w-[100%]">
                CR Cyber Crime Foundation (Cyber Revolution) is a forward-looking non-profit initiative committed to addressing the challenges of the digital era  through awareness ️, innovation , and technology ️. With a strong foundation in cybersecurity , research , and IT development , we aim to create a platform that empowers individuals and organizations to navigate the digital world safely and efficiently.
              </p>
              <div className="flex flex-wrap gap-[12px] max-[900px]:justify-center">
                <span className="inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.15)] py-[8px] px-[16px] rounded-[8px] text-[13.5px] font-[600] transition-[background,transform] duration-[0.3s,0.2s] cursor-default hover:bg-[rgba(255,255,255,0.25)] hover:translate-y-[-2px] max-[600px]:py-[6px] max-[600px]:px-[12px] max-[600px]:text-[12.5px]"><Shield size={14} color="#F59E0B" /> Cybersecurity</span>
                <span className="inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.15)] py-[8px] px-[16px] rounded-[8px] text-[13.5px] font-[600] transition-[background,transform] duration-[0.3s,0.2s] cursor-default hover:bg-[rgba(255,255,255,0.25)] hover:translate-y-[-2px] max-[600px]:py-[6px] max-[600px]:px-[12px] max-[600px]:text-[12.5px]"><BookOpen size={14} color="#10B981" /> Research</span>
                <span className="inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.15)] py-[8px] px-[16px] rounded-[8px] text-[13.5px] font-[600] transition-[background,transform] duration-[0.3s,0.2s] cursor-default hover:bg-[rgba(255,255,255,0.25)] hover:translate-y-[-2px] max-[600px]:py-[6px] max-[600px]:px-[12px] max-[600px]:text-[12.5px]"><Laptop size={14} color="#3B82F6" /> IT Development</span>
              </div>
            </motion.div>

            <motion.div
              className="flex-[0.9] relative flex justify-center items-center max-[600px]:mt-[-20px] max-[600px]:mb-[-40px] max-[600px]:min-h-[220px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="scale-[0.7] flex flex-col items-center max-[900px]:scale-[0.5] max-[600px]:scale-[0.4] max-[450px]:scale-[0.32] origin-center">
                <div className="rounded-[20px] shadow-[inset_0_0_0_2px_#c8cacb,inset_0_0_0_10px_#000] h-[318px] w-[518px] mx-auto py-[9px] px-[9px] pb-[23px] relative flex items-center justify-center bg-[linear-gradient(15deg,#3f51b1_0%,#5a55ae_13%,#7b5fac_25%,#8f6aae_38%,#a86aa4_50%,#cc6b8e_62%,#f18271_75%,#f3a469_87%,#f7c978_100%)] [transform-style:preserve-3d] [transform:perspective(1900px)_rotateX(-88.5deg)] [transform-origin:50%_100%] animate-[open_4s_infinite_alternate] before:content-[''] before:w-[518px] before:h-[12px] before:absolute before:bg-[linear-gradient(#979899,transparent)] before:top-[-3px] before:[transform:rotateX(90deg)] before:rounded-[5px_5px] after:bg-[linear-gradient(to_bottom,#272727,#0d0d0d)] after:rounded-[0_0_20px_20px] after:bottom-[2px] after:content-[''] after:h-[24px] after:left-[2px] after:absolute after:w-[514px]">
                  <div className="w-[100px] h-[12px] absolute bg-[#000] top-[10px] left-[50%] [transform:translate(-50%,-0%)] rounded-[0_0_6px_6px]"></div>
                  <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png" alt="CRCCF Logo" className="max-w-[55%] max-h-[55%] object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] select-none pointer-events-none" />
                </div>
                <div className="bg-[radial-gradient(circle_at_center,#e2e3e4_85%,#a9abac_100%)] border border-solid border-[#a0a3a7] rounded-[2px_2px_12px_12px] border-b-0 border-r-[2px] border-l-[2px] shadow-[inset_0_-2px_8px_0_#6c7074] h-[24px] mt-[-10px] relative w-[620px] z-[9] after:bg-[#e2e3e4] after:rounded-[0_0_10px_10px] after:shadow-[inset_0_0_4px_2px_#babdbf] after:content-[''] after:h-[10px] after:left-[50%] after:ml-[-60px] after:absolute after:top-0 after:w-[120px] before:bg-transparent before:rounded-[0_0_3px_3px] before:bottom-[-2px] before:shadow-[-270px_0_#272727,250px_0_#272727] before:content-[''] before:h-[2px] before:left-[50%] before:ml-[-10px] before:absolute before:w-[40px]"></div>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.4),transparent_70%)] blur-[40px] z-[-1] opacity-[0.6]"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM WHITE SECTION ── */}
      <div className="relative pb-[clamp(24px,5vw,40px)] bg-[#F9FAFB]">
        <div className="container-custom">
          <div className="grid grid-cols-[repeat(2,1fr)] gap-[clamp(20px,4vw,50px)] mt-[clamp(24px,4vw,40px)] relative z-[10] max-[900px]:grid-cols-[1fr] max-[900px]:mt-[32px] max-[900px]:gap-[20px]" ref={ref}>
            {/* Card 1: About the Organization */}
            <motion.div
              className={`group relative bg-[#fff] rounded-[16px] p-[clamp(24px,4vw,40px)] min-h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-solid border-[rgba(226,232,240,0.8)] flex flex-col justify-center overflow-hidden cursor-pointer transition-[transform,box-shadow,border-color] duration-[0.3s,0.3s,0.5s] hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:border-[#2563EB] max-[600px]:p-[clamp(20px,5vw,28px)_clamp(16px,4vw,24px)] max-[600px]:min-h-[150px] ${isAutoHovering || tappedCards.includes('about') ? 'translate-y-[-6px] shadow-[0_20px_60px_rgba(37,99,235,0.25)] border-[#2563EB]' : ''} before:absolute before:content-[''] before:w-[20%] before:h-[20%] before:bg-[linear-gradient(135deg,#1A365D_0%,#2563EB_100%)] before:transition-all before:duration-[0.5s] before:ease-[ease] before:z-[0] before:top-0 before:right-0 before:rounded-[0_16px_0_100%] hover:before:w-full hover:before:h-full hover:before:rounded-[16px] ${isAutoHovering || tappedCards.includes('about') ? 'before:w-full before:h-full before:rounded-[16px]' : ''} after:absolute after:content-[''] after:w-[20%] after:h-[20%] after:bg-[linear-gradient(135deg,#1A365D_0%,#2563EB_100%)] after:transition-all after:duration-[0.5s] after:ease-[ease] after:z-[0] after:bottom-0 after:left-0 after:rounded-[0_100%_0_16px] hover:after:w-full hover:after:h-full hover:after:rounded-[16px] ${isAutoHovering || tappedCards.includes('about') ? 'after:w-full after:h-full after:rounded-[16px]' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={(e) => handleCardTap(e, 'about')}
            >
              <div className={`relative z-[1] w-[52px] h-[52px] bg-[#EFF6FF] text-[#3B82F6] rounded-[14px] flex items-center justify-center mb-[18px] transition-[background,color] duration-[0.4s] ease-[ease] group-hover:bg-[rgba(255,255,255,0.18)] group-hover:text-[#fff] ${isAutoHovering || tappedCards.includes('about') ? 'bg-[rgba(255,255,255,0.18)] text-[#fff]' : ''}`}><Shield size={24} /></div>
              <h3 className={`relative z-[1] order-[-1] text-[clamp(17px,2.2vw,22px)] font-[800] text-[#0F172A] mb-0 transition-[color,margin-bottom] duration-[0.4s,0.3s] ease-[ease] group-hover:text-[#fff] group-hover:mb-[18px] max-[600px]:text-[clamp(15px,4.5vw,18px)] ${isAutoHovering || tappedCards.includes('about') ? 'text-[#fff] mb-[18px]' : ''}`}>About the Organization</h3>
              <p className={`relative z-[1] text-[15px] text-[rgba(255,255,255,0.88)] leading-[1.7] opacity-0 max-h-0 mb-0 overflow-hidden transition-[opacity,max-height,margin-bottom] duration-[0.35s,0.4s,0.35s] ease-[ease] group-hover:opacity-100 group-hover:max-h-[200px] group-hover:mb-[24px] group-hover:delay-[0.55s] ${isAutoHovering || tappedCards.includes('about') ? 'opacity-100 max-h-[200px] mb-[24px] delay-[0.55s]' : ''}`}>CR Cyber Crime Foundation (Cyber Revolution) is a non-profit organization dedicated to advancing cybercrime awareness ️, supporting digital investigations , and transforming how individuals and organizations engage with the digital world .</p>
              <div className={`relative z-[1] flex flex-wrap gap-[10px] opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height] duration-[0.35s,0.35s] ease-[ease] group-hover:opacity-100 group-hover:max-h-[120px] group-hover:delay-[0.65s] ${isAutoHovering || tappedCards.includes('about') ? 'opacity-100 max-h-[120px] delay-[0.65s]' : ''}`}>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Non-Profit</span>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Investigations</span>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Innovation</span>
              </div>
            </motion.div>

            {/* Card 2: Purpose */}
            <motion.div
              className={`group relative bg-[#fff] rounded-[16px] p-[clamp(24px,4vw,40px)] min-h-[180px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-solid border-[rgba(226,232,240,0.8)] flex flex-col justify-center overflow-hidden cursor-pointer transition-[transform,box-shadow,border-color] duration-[0.3s,0.3s,0.5s] hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:border-[#2563EB] max-[600px]:p-[clamp(20px,5vw,28px)_clamp(16px,4vw,24px)] max-[600px]:min-h-[150px] ${isAutoHovering || tappedCards.includes('purpose') ? 'translate-y-[-6px] shadow-[0_20px_60px_rgba(37,99,235,0.25)] border-[#2563EB]' : ''} before:absolute before:content-[''] before:w-[20%] before:h-[20%] before:bg-[linear-gradient(135deg,#1A365D_0%,#2563EB_100%)] before:transition-all before:duration-[0.5s] before:ease-[ease] before:z-[0] before:top-0 before:right-0 before:rounded-[0_16px_0_100%] hover:before:w-full hover:before:h-full hover:before:rounded-[16px] ${isAutoHovering || tappedCards.includes('purpose') ? 'before:w-full before:h-full before:rounded-[16px]' : ''} after:absolute after:content-[''] after:w-[20%] after:h-[20%] after:bg-[linear-gradient(135deg,#1A365D_0%,#2563EB_100%)] after:transition-all after:duration-[0.5s] after:ease-[ease] after:z-[0] after:bottom-0 after:left-0 after:rounded-[0_100%_0_16px] hover:after:w-full hover:after:h-full hover:after:rounded-[16px] ${isAutoHovering || tappedCards.includes('purpose') ? 'after:w-full after:h-full after:rounded-[16px]' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={(e) => handleCardTap(e, 'purpose')}
            >
              <div className={`relative z-[1] w-[52px] h-[52px] bg-[#EFF6FF] text-[#3B82F6] rounded-[14px] flex items-center justify-center mb-[18px] transition-[background,color] duration-[0.4s] ease-[ease] group-hover:bg-[rgba(255,255,255,0.18)] group-hover:text-[#fff] ${isAutoHovering || tappedCards.includes('purpose') ? 'bg-[rgba(255,255,255,0.18)] text-[#fff]' : ''}`}><Target size={24} /></div>
              <h3 className={`relative z-[1] order-[-1] text-[clamp(17px,2.2vw,22px)] font-[800] text-[#0F172A] mb-0 transition-[color,margin-bottom] duration-[0.4s,0.3s] ease-[ease] group-hover:text-[#fff] group-hover:mb-[18px] max-[600px]:text-[clamp(15px,4.5vw,18px)] ${isAutoHovering || tappedCards.includes('purpose') ? 'text-[#fff] mb-[18px]' : ''}`}>Purpose</h3>
              <p className={`relative z-[1] text-[15px] text-[rgba(255,255,255,0.88)] leading-[1.7] opacity-0 max-h-0 mb-0 overflow-hidden transition-[opacity,max-height,margin-bottom] duration-[0.35s,0.4s,0.35s] ease-[ease] group-hover:opacity-100 group-hover:max-h-[200px] group-hover:mb-[24px] group-hover:delay-[0.55s] ${isAutoHovering || tappedCards.includes('purpose') ? 'opacity-100 max-h-[200px] mb-[24px] delay-[0.55s]' : ''}`}>Our purpose is to strengthen digital safety  and awareness ️ by bridging the gap between knowledge  and real-world cyber challenges ️. We strive to educate , guide , and support individuals and organizations in understanding and combating cyber threats while promoting responsible digital practices .</p>
              <div className={`relative z-[1] flex flex-wrap gap-[10px] opacity-0 max-h-0 overflow-hidden transition-[opacity,max-height] duration-[0.35s,0.35s] ease-[ease] group-hover:opacity-100 group-hover:max-h-[120px] group-hover:delay-[0.65s] ${isAutoHovering || tappedCards.includes('purpose') ? 'opacity-100 max-h-[120px] delay-[0.65s]' : ''}`}>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Digital Safety</span>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Awareness</span>
                <span className="bg-[rgba(255,255,255,0.18)] text-[#fff] py-[6px] px-[14px] rounded-[999px] text-[12.5px] font-[600] flex items-center gap-[6px]">Education</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


