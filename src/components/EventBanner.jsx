import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, X } from 'lucide-react'

export default function EventBanner() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="p-[4px_0] relative z-[50] bg-transparent max-[640px]:p-[8px]"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden', padding: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-custom">
              <div className="flex items-center justify-between gap-[12px] p-[4px_12px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[20px] border border-solid border-[rgba(255,255,255,0.6)] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.5)] transition-all duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.8)] hover:translate-y-[-1px] max-[900px]:flex-wrap max-[640px]:flex-col max-[640px]:items-start max-[640px]:p-[12px] max-[640px]:gap-[16px]">
                {/* LEFT SECTION */}
                <div className="flex items-center gap-[10px]">
                  <button className="bg-[rgba(0,0,0,0.04)] border-none w-[20px] h-[20px] rounded-[50%] flex items-center justify-center text-[#6B7280] cursor-pointer transition-all duration-[0.2s] shrink-0 hover:bg-[rgba(0,0,0,0.1)] hover:text-[#111827] hover:scale-[1.1]" onClick={() => setIsVisible(false)} aria-label="Close event banner">
                    <X size={14} />
                  </button>
                  <div className="relative w-[26px] h-[26px] bg-[linear-gradient(135deg,#1A56DB,#3B82F6)] text-[#fff] rounded-[6px] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(26,86,219,0.3)] after:content-[''] after:absolute after:inset-0 after:rounded-[6px] after:bg-[#3B82F6] after:z-[-1] after:animate-icon-pulse">
                    <Calendar size={14} />
                  </div>
                  <div className="flex flex-row items-center gap-[6px]">
                    <span className="text-[10px] font-[800] uppercase tracking-[0.04em] text-[#1A56DB]">Upcoming Event</span>
                    <span className="inline-flex items-center gap-[3px] text-[9px] font-[700] text-[#DC2626] bg-[rgba(220,38,38,0.1)] p-[2px_5px] rounded-[4px] tracking-[0.02em]">
                      <span className="w-[4px] h-[4px] bg-[#DC2626] rounded-[50%] animate-blink" /> Limited Seats
                    </span>
                  </div>
                </div>


                {/* CENTER SECTION */}
                <div className="flex-1 flex flex-row items-center justify-center gap-[8px] max-[900px]:order-3 max-[900px]:flex-[100%] max-[900px]:pl-[32px] max-[640px]:pl-0 max-[640px]:order-2">
                  <p className="text-[13px] font-[800] text-[#111827] m-0 leading-[1]">Company Inauguration</p>
                  <span className="text-[#D1D5DB] text-[11px]">&bull;</span>
                  <div className="flex items-center gap-[4px] text-[11.5px] text-[#6B7280] font-[500] [&_svg]:text-[#9CA3AF]">
                    <MapPin size={12} />
                    <span>May 25th, 2026 &bull; Bhubaneswar, Odisha</span>
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="shrink-0 max-[640px]:order-3 max-[640px]:w-full">
                  <button className="flex items-center gap-[4px] bg-[linear-gradient(135deg,#1A56DB,#4F46E5)] text-[#fff] text-[11.5px] font-[700] p-[6px_12px] border-none rounded-[6px] cursor-pointer shadow-[0_2px_8px_rgba(26,86,219,0.3)] transition-all duration-[0.3s] ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.01em] hover:translate-y-[-1px] hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(26,86,219,0.4)] max-[640px]:w-full max-[640px]:justify-center max-[640px]:p-[10px]">
                    Reserve Your Seat <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

