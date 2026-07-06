import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  subtitle,
  title,
  highlightWord,
  highlightIndex = -1,
  centered = true,
  description,
  theme = 'light'
}) {
  const alignClass = centered ? 'text-center mx-auto' : 'text-left';
  
  // Try to find the highlight word in the title string
  let titleContent;
  if (highlightWord) {
    if (typeof title === 'string') {
      const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'));
      titleContent = parts.map((part, index) => 
        part.toLowerCase() === highlightWord.toLowerCase() ? (
          <span key={index} className="text-[#2563EB]">{part}</span>
        ) : (
          part
        )
      );
    } else {
      titleContent = title;
    }
  } else {
    titleContent = title;
  }

  return (
    <div className={`max-w-[1000px] w-full mb-[60px] md:mb-[80px] ${alignClass}`}>
      {subtitle && (
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={`font-['Poppins',sans-serif] text-[12px] md:text-[14px] font-[700] tracking-[4px] uppercase mb-[20px] ${theme === 'dark' ? 'text-blue-400' : 'text-[#2563EB]'}`}
        >
          {subtitle}
        </motion.h4>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`font-['Poppins',sans-serif] text-[36px] md:text-[52px] lg:text-[64px] font-[800] leading-[1.15] tracking-[-1.5px] mb-[24px] ${theme === 'dark' ? 'text-white' : 'text-[#0F172A]'}`}
      >
        {titleContent}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className={`font-['Poppins',sans-serif] text-[16px] max-w-[700px] mx-auto mt-[16px] leading-[1.6] ${theme === 'dark' ? 'text-slate-300' : 'text-[#64748B]'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
