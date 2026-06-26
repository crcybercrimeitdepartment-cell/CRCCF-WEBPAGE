import { playPageTurnSound } from "../utils/pageTurnSound";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, ArrowLeft, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const posts = [
  {
    cat: 'Cybersecurity',
    catColor: '#1A56DB',
    date: 'April 15, 2025',
    title: 'How to Protect Yourself from UPI Frauds in India',
    excerpt: 'With digital payments growing rapidly, UPI fraud cases have surged. Here is a comprehensive guide to staying safe while using UPI apps.',
    fullContent: '1. Never share your UPI PIN or OTP with anyone.\n2. Do not scan QR codes to receive money; scanning is only for paying.\n3. Verify the receiver\'s UPI ID and name before transferring funds.\n4. Set transaction limits on your banking application.',
    readTime: '5 min read',
  },
  {
    cat: 'Technology',
    catColor: '#7C3AED',
    date: 'April 10, 2025',
    title: 'Top 10 Cybersecurity Practices Every Business Should Follow',
    excerpt: 'Small and medium businesses are increasingly targeted by cybercriminals. Learn the essential security practices that every organisation must implement.',
    fullContent: '1. Implement Multi-Factor Authentication (MFA).\n2. Regularly backup critical data offline.\n3. Train employees to recognize phishing and social engineering.\n4. Keep software, operating systems, and firmware updated.',
    readTime: '7 min read',
  },
  {
    cat: 'Legal',
    catColor: '#DC2626',
    date: 'April 5, 2025',
    title: 'Understanding the IT Act 2000 — Your Digital Rights Explained',
    excerpt: 'The Information Technology Act provides legal remedies for cybercrime victims. Understand how to use the law to protect yourself and seek justice.',
    fullContent: 'Section 43: Penalty for damage to computer system without permission.\nSection 66: Computer related offences.\nSection 66C: Punishment for identity theft.\nSection 66D: Punishment for cheating by personation by using computer resource.',
    readTime: '6 min read',
  },
  {
    cat: 'Safety',
    catColor: '#059669',
    date: 'April 20, 2025',
    title: 'Safe Social Media Practices for Everyone',
    excerpt: 'Social media platforms are hunting grounds for cybercriminals. Learn how to secure your profiles and protect your personal information.',
    fullContent: '1. Review and strengthen your privacy settings.\n2. Do not accept friend requests from strangers.\n3. Be mindful of what personal information you share.\n4. Use strong, unique passwords for all accounts.',
    readTime: '4 min read',
  },
  {
    cat: 'Fraud',
    catColor: '#EA580C',
    date: 'April 25, 2025',
    title: 'AI Scams and Online Fraud: What You Need to Know',
    excerpt: 'Artificial Intelligence is increasingly being used to orchestrate sophisticated scams. Discover how to identify and avoid AI-driven fraud.',
    fullContent: '1. Be skeptical of unsolicited investment opportunities.\n2. Verify the identity of the person contacting you, even if they sound familiar.\n3. Do not rush into making payments or sharing financial details.\n4. Stay informed about the latest AI scam tactics.',
    readTime: '6 min read',
  },
  {
    cat: 'Awareness',
    catColor: '#0891B2',
    date: 'May 1, 2025',
    title: 'Protecting Children from Cyber Threats',
    excerpt: 'Children are vulnerable to online predators and cyberbullying. Here are essential tips for parents to keep their kids safe on the internet.',
    fullContent: '1. Maintain an open dialogue with your children about their online activities.\n2. Set clear rules and boundaries for device usage.\n3. Use parental control software to filter inappropriate content.\n4. Teach them about the dangers of sharing personal information.',
    readTime: '5 min read',
  },
]

function InsightCard({ p, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleOutside = () => {
      setIsOpen(false);
      setIsFlipped(false);
    }
    window.addEventListener('click', handleOutside)
    return () => window.removeEventListener('click', handleOutside)
  }, [])

  const handleOpen = (e) => {
    if (window.innerWidth <= 1024) {
      e.stopPropagation();
      playPageTurnSound(); setIsOpen(prev => !prev);
      if (isOpen) setIsFlipped(false); // Reset flip if closing
    }
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    playPageTurnSound(); setIsFlipped(true);
  };

  const handleGoBack = (e) => {
    e.stopPropagation();
    playPageTurnSound(); setIsFlipped(false);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setIsFlipped(false);
      setIsOpen(false);
    }
  };

  return (
    <motion.article
      className={`group relative bg-[#fff] border border-solid border-[#E5E7EB] rounded-[14px] h-[clamp(280px,28vw,340px)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] [transform-style:preserve-3d] [perspective:2000px] flex items-center justify-center text-[#111827] transition-all duration-[0.3s] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] ${isOpen ? 'shadow-[0_15px_40px_rgba(0,0,0,0.1)]' : ''} max-[560px]:h-[300px]`}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: index * .10 }}
    >
      {/* PAGE 3: Deepest Layer (Full Content) */}
      <div className={`absolute top-0 left-0 p-[24px] flex flex-col gap-[12px] w-full h-full justify-start opacity-0 transition-[opacity,transform] duration-[0.4s,0.6s] ease-[ease-in-out,cubic-bezier(0.4,0,0.2,1)] pl-[40px] bg-[#fafafa] rounded-[14px] [transform-origin:0] [backface-visibility:hidden] z-[4] group-hover:opacity-100 ${isOpen ? 'opacity-100' : ''}`}>
        <h4 className="text-[15px] font-[700] text-[#111827] pb-[8px]">Full Article</h4>
        <div className="text-[12.5px] text-[#4B5563] leading-[1.6] flex flex-col gap-[8px] flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-[4px]">
          {p.fullContent.split('\n').map((line, i) => (
            <p key={i} className="m-0">{line}</p>
          ))}
        </div>
        <div className="flex items-center justify-between pt-[10px] mt-auto">
          <button className="inline-flex items-center gap-[5px] text-[12.5px] font-[700] bg-none border-none cursor-pointer p-0 transition-[gap] duration-[0.2s] uppercase tracking-[.04em] hover:gap-[8px]" style={{ color: p.catColor }} onClick={handleGoBack}>
            <ArrowLeft size={13} /> Go Back
          </button>
        </div>
      </div>

      {/* PAGE 2: Middle Layer (Excerpt) */}
      <div className={`absolute top-0 left-0 p-[24px] flex flex-col gap-[12px] w-full h-full justify-start opacity-0 transition-[opacity,transform] duration-[0.4s,0.6s] ease-[ease-in-out,cubic-bezier(0.4,0,0.2,1)] pl-[40px] bg-[#fafafa] rounded-[14px] [transform-origin:0] [backface-visibility:hidden] z-[5] group-hover:opacity-100 ${isOpen ? 'opacity-100' : ''} ${isFlipped ? '[transform:rotateY(-85deg)] shadow-[8px_8px_18px_rgba(0,0,0,0.08)]' : ''}`}>
        <div className="flex items-center gap-[10px] flex-wrap">
          <span className="flex items-center gap-[4px] text-[12px] text-[#9CA3AF]">
            <Calendar size={12} />
            {p.date}
          </span>
        </div>

        <p className="text-[13.5px] text-[#6B7280] leading-[1.65] flex-1 m-0">{p.excerpt}</p>

        <div className="flex items-center justify-between pt-[10px] mt-auto">
          <span className="text-[12px] text-[#9CA3AF] font-[500]">{p.readTime}</span>
          <button className="inline-flex items-center gap-[5px] text-[12.5px] font-[700] bg-none border-none cursor-pointer p-0 transition-[gap] duration-[0.2s] uppercase tracking-[.04em] hover:gap-[8px]" style={{ color: p.catColor }} onClick={handleReadMore}>
            Read More <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* COVER: Top Layer */}
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-[14px] cursor-pointer transition-all duration-[1s] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:left_center] shadow-[4px_0_24px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center z-[10] p-[30px_20px] text-center [backface-visibility:hidden] bg-[#fff] group-hover:[transform:rotateY(-140deg)_scale(0.9)_translateX(-20px)] group-hover:opacity-0 group-hover:pointer-events-none group-hover:shadow-none ${isOpen || isFlipped ? '[transform:rotateY(-140deg)_scale(0.9)_translateX(-20px)] opacity-0 pointer-events-none' : ''}`}
        style={{
          background: `linear-gradient(135deg, #ffffff, ${p.catColor}08)`,
          borderLeft: `5px solid ${p.catColor}`
        }}
        onClick={handleOpen}
      >
        <div className="w-[64px] h-[64px] rounded-[18px] flex items-center justify-center mb-[24px] shadow-sm" style={{ background: `${p.catColor}15`, color: p.catColor }}>
          <Newspaper size={34} />
        </div>
        <span className="text-[11px] font-[800] px-[12px] py-[4px] rounded-[999px] uppercase tracking-[.08em] mb-[18px]" style={{ background: `${p.catColor}12`, color: p.catColor, border: `1px solid ${p.catColor}25` }}>
          {p.cat}
        </span>
        <h3 className="text-[19px] font-[800] text-[#0F172A] leading-[1.4] mb-[18px] m-0 px-2">{p.title}</h3>
        <div className="flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.1em] mt-auto" style={{ color: p.catColor }}>
          <span className="max-[1024px]:hidden">Hover to open</span>
          <span className="hidden max-[1024px]:inline">Tap to open</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  )
}

export default function Insights({ limit, hideViewAll = false }) {
  const navigate = useNavigate();
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section id="insights" className="section-padding bg-white relative">
      <div className="container-custom">
        <motion.div
          className="text-center mb-[clamp(40px,8vw,64px)] flex flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .55 }}
        >
          <p className="section-tag">Insights & Resources</p>
          <h2 className="section-title">
            Latest <span className="section-title-accent">Insights</span>
          </h2>
          <p className="section-subtitle">
            Stay informed with expert articles, cyber safety tips, and industry news from the CRCCF team.
          </p>
        </motion.div>


        <div className="grid grid-cols-[repeat(3,1fr)] gap-[22px] max-[860px]:grid-cols-[repeat(2,1fr)] max-[860px]:gap-[16px] max-[560px]:grid-cols-[1fr] max-[560px]:gap-[14px]">
          {displayedPosts.map((p, i) => (
            <InsightCard key={p.title} p={p} index={i} />
          ))}
        </div>

        {!hideViewAll && (
         <div className="flex justify-center mt-[40px]">
           <button
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg bg-transparent  hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
            onClick={() => navigate('/insights')}
            >
            View All Insights <ArrowRight size={15} />
           </button>
          </div>
        )}
      </div>
    </section>
  )
}

