import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/AboutUs/common/PageHeader'
import SoftwareCard from '../components/SoftwareCard'
import { softwareCards } from '../data/software/softwareCards'

const CARDS_PER_PAGE = 12

const toSoftwareCardId = (title) =>
  `software-product-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const SoftwareComingSoon = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [direction, setDirection] = useState(1)
  const gridRef = useRef(null)

  const pageParam = parseInt(searchParams.get('page'), 10)
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

  const totalPages = Math.ceil(softwareCards.length / CARDS_PER_PAGE)
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE
  const visibleCards = softwareCards.slice(startIndex, startIndex + CARDS_PER_PAGE)

  const goToPage = (page) => {
    if (page === currentPage) return
    setDirection(page > currentPage ? 1 : -1)
    setSearchParams({ page }, { replace: true })
    // Scroll the grid section into view smoothly
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const gridContainerVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 36 : -36,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.28 },
        staggerChildren: 0.025,
        delayChildren: 0.02,
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -36 : 36,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.18 },
      },
    }),
  }

  const cardVariants = {
    enter: {
      opacity: 0,
      y: 14,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 380,
        damping: 26,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.15,
      },
    },
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-16 sm:pt-16 md:pt-14 pb-16 font-sans">

        <PageHeader 
          title="Software Products"
          description="We are currently building innovative software solutions."
        />

        {/* 🔷 MAIN AREA */}
        <div id="software-product-sections" className="flex justify-center mt-10 relative" ref={gridRef}>
          {/* 🔥 CARD PANEL */}
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 max-w-7xl w-full z-10">
            {/* TITLE */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0C1A3A] tracking-tight mb-2 font-serif">Explore Categories</h2>
              <p className="text-[#64748B] mt-1 text-sm sm:text-base font-medium">
                Click any section to explore
              </p>
            </div>

            {/* GRID */}
            <div className="overflow-hidden relative min-h-[380px] sm:min-h-[420px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={gridContainerVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3"
                >
                  {visibleCards.map((card, index) => (
                    <motion.div key={startIndex + index} variants={cardVariants}>
                      <SoftwareCard
                        index={startIndex + index}
                        id={toSoftwareCardId(card.title)}
                        title={card.title}
                        icon={card.icon}
                        onClick={() => navigate(`/software-products/${card.slug}`)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-[#E2E8F0]">
                <motion.button
                  whileHover={currentPage === 1 ? {} : { scale: 1.04 }}
                  whileTap={currentPage === 1 ? {} : { scale: 0.96 }}
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
                    text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
                    disabled:hover:text-[#475569] disabled:hover:shadow-none cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Previous
                </motion.button>

                <motion.span
                  key={currentPage}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-[#64748B] tabular-nums"
                >
                  Page {currentPage} of {totalPages}
                </motion.span>

                <motion.button
                  whileHover={currentPage === totalPages ? {} : { scale: 1.04 }}
                  whileTap={currentPage === totalPages ? {} : { scale: 0.96 }}
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
                    text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
                    disabled:hover:text-[#475569] disabled:hover:shadow-none cursor-pointer disabled:cursor-not-allowed"
                >
                  Next →
                </motion.button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default SoftwareComingSoon

