import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/AboutUs/common/PageHeader'
import SoftwareCard from '../components/SoftwareCard'
import { softwareCards } from '../data/software/softwareCards'

const CARDS_PER_PAGE = 12

const toSoftwareCardId = (title) =>
  `software-product-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const SoftwareComingSoon = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const gridRef = useRef(null)

  const pageParam = parseInt(searchParams.get('page'), 10)
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

  const totalPages = Math.ceil(softwareCards.length / CARDS_PER_PAGE)
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE
  const visibleCards = softwareCards.slice(startIndex, startIndex + CARDS_PER_PAGE)

  const goToPage = (page) => {
    setSearchParams({ page }, { replace: true })
    // Scroll the grid section into view smoothly
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">

        <PageHeader 
          title="Software Products"
          description="We are currently building innovative software solutions."
        />

        {/* 🔷 MAIN AREA */}
        <div id="software-product-sections" className="flex justify-center mt-10 relative" ref={gridRef}>
          {/* 🔥 CARD PANEL */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-7xl w-full z-10">
            {/* TITLE */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#0F172A]">Explore Categories</h2>
              <p className="text-sm text-[#64748B]">
                Click any section to explore
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {visibleCards.map((card, index) => (
                <SoftwareCard
                  key={startIndex + index}
                  id={toSoftwareCardId(card.title)}
                  title={card.title}
                  onClick={() => navigate(`/software-products/${card.slug}`)}
                />
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-[#E2E8F0]">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
                    text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
                    disabled:hover:text-[#475569] disabled:hover:shadow-none"
                >
                  ← Previous
                </button>

                <span className="text-sm font-medium text-[#64748B]">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
                    text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
                    disabled:hover:text-[#475569] disabled:hover:shadow-none"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default SoftwareComingSoon

