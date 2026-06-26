import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../components/AboutUs/common/PageHeader'
import SoftwareCard from '../components/SoftwareCard'
import { softwareCards } from '../data/software/softwareCards'

const toSoftwareCardId = (title) =>
  `software-product-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const SoftwareComingSoon = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">
        

        <PageHeader 
          title="Software Products"
          description="We are currently building innovative software solutions."
        />

        {/* 🔷 MAIN AREA */}
        <div id="software-product-sections" className="flex justify-center mt-10 relative">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {softwareCards.map((card, index) => (
                <SoftwareCard
                  key={index}
                  id={toSoftwareCardId(card.title)}
                  title={card.title}
                  onClick={() => navigate(`/software-products/${card.slug}`)}
                />
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SoftwareComingSoon
