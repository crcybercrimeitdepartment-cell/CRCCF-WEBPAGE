import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const ServiceComingSoon = ({ title }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        
        

        <PageHeader 
          title={title}
          description="We are currently gathering the latest information and resources for this service."
        />

        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-8 sm:p-12 md:p-16 text-center max-w-3xl mx-auto border border-[#DBEAFE] mt-8">
          <div className="inline-block bg-[#EFF6FF] text-[#1A56DB] px-6 py-3 rounded-full font-semibold text-lg sm:text-xl shadow-sm border border-[#BFDBFE]">
            Data Coming Soon
          </div>
          
          <p className="mt-8 text-[#64748B] text-base sm:text-lg">
            Please check back later for updates!
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default ServiceComingSoon
