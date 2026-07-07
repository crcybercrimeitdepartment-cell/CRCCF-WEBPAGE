import Cloudinary from '../constants/Cloudinary';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const careerData = [
  {
    title: "Professional Growth & Skill Development",
    content: "At CRCCF, gain practical exposure through structured learning, real-world assignments, and guided experiences designed to strengthen technical, communication, and problem-solving abilities. Develop industry-relevant skills that create long-term professional value and support continuous career growth.",
    image: Cloudinary.careerGrowthHigvff
  },
  {
    title: "Experience, Recognition & Achievement",
    content: "Become a part of CRCCF initiatives, collaborate with passionate teams, and showcase your potential through meaningful contributions. Earn recognition, certificates, and growth opportunities that strengthen your professional profile and build lasting credibility.",
    image: Cloudinary.careerAchievementX9ja77
  },
  {
    title: "Career Exposure & Future Pathways",
    content: "Build your professional journey with CRCCF through mentorship, networking, and growth-oriented opportunities. Gain confidence, develop practical experience, and prepare yourself for future career advancement and leadership opportunities.",
    image: Cloudinary.careerPathwaysD6ii9b
  },
  {
    title: "Practical Learning & Real Experience",
    content: "At CRCCF, transform knowledge into practical experience through guided activities, collaborative environments, and exposure to meaningful work. Strengthen your capabilities while building confidence for future professional success.",
    image: Cloudinary.careerPracticalWpcklw
  },
  {
    title: "Networking & Professional Exposure",
    content: "Expand your horizons with CRCCF by engaging with professionals, mentors, and growth-focused communities. Build valuable connections, gain new perspectives, and unlock opportunities that support long-term career development.",
    image: Cloudinary.careerNetworkingCpgsta
  },
  {
    title: "Leadership & Career Development",
    content: "Develop leadership qualities, enhance decision-making abilities, and gain experience through impactful participation at CRCCF. Take meaningful steps toward becoming a confident and future-ready professional.",
    image: Cloudinary.careerLeadershipIrlypr
  }
];

export default function CareerOpportunities() {
  const [activeCards, setActiveCards] = useState([]);

  const toggleCard = (index) => {
    setActiveCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-tag">Join Our Team</p>
          <h2 className="section-title">
            Career <span className="section-title-accent">Opportunities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore opportunities to learn, contribute, and grow professionally through structured programs and practical experiences.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
          {careerData.map((card, index) => {
            const isActive = activeCards.includes(index);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true, amount: 0.2 }}
                onViewportEnter={() => {
                  setTimeout(() => {
                    setActiveCards(prev => prev.includes(index) ? prev : [...prev, index]);
                    setTimeout(() => {
                      setActiveCards(prev => prev.filter(i => i !== index));
                    }, 1500); // 1.5 second duration makes it more visible before reverting
                  }, 600 + index * 150);
                }}
                onClick={() => toggleCard(index)}
                className="group relative w-full h-[210px] sm:h-[240px] md:h-[400px] transition-all duration-500 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden flex flex-col justify-center items-center bg-white"
              >
                
                {/* Background Image */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 z-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                  style={{ backgroundImage: `url(${card.image})` }}
                ></div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-colors duration-500 z-0 ${isActive ? 'bg-gradient-to-br from-[#1E3A8A]/90 to-[#2563EB]/90' : 'bg-gradient-to-br from-white/90 to-blue-50/90 group-hover:from-[#1E3A8A]/90 group-hover:to-[#2563EB]/90'}`}></div>

                {/* First Content - visible initially, shrinks on hover/active */}
                <div className={`absolute inset-0 w-full flex justify-center items-center transition-all duration-500 px-4 md:px-8 text-center rounded-[1.5rem] z-10 ${isActive ? 'h-0 opacity-0' : 'h-full opacity-100 group-hover:h-0 group-hover:opacity-0'}`}>
                  <h3 className={`font-black transition-all duration-500 ${isActive ? 'text-[0px]' : 'text-[13px] sm:text-base md:text-2xl text-slate-800 group-hover:text-[0px]'}`}>
                    {card.title}
                  </h3>
                </div>

                {/* Second Content - hidden initially, expands & spins in on hover/active */}
                <div className={`absolute inset-0 w-full flex flex-col justify-center items-center transition-all duration-500 px-4 md:px-8 text-center rounded-[1.5rem] z-20 ${isActive ? 'h-full opacity-100 rotate-0 scale-100' : 'h-0 opacity-0 rotate-90 -scale-100 group-hover:h-full group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100'}`}>
                  <div className={`transition-all duration-500 text-white flex flex-col items-center justify-center h-full w-full ${isActive ? 'text-base' : 'text-[0px] group-hover:text-base'}`}>
                    <h3 className={`font-bold mb-2 md:mb-4 leading-tight ${isActive ? 'text-xs md:text-xl' : 'text-[0px] group-hover:text-xs md:group-hover:text-xl'}`}>
                      {card.title}
                    </h3>
                    <p className={`font-medium leading-[1.2] md:leading-relaxed text-blue-50 ${isActive ? 'text-[9px] sm:text-[10px] md:text-sm' : 'text-[0px] group-hover:text-[9px] sm:group-hover:text-[10px] md:group-hover:text-sm'}`}>
                      {card.content}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
