// Template for any page (e.g., OurIntroduction.jsx)
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { contentData } from '../../data/aboutUs/contentData'

const History = () => {
  const navigate = useNavigate()
  const data = contentData.history // e.g., contentData.introduction

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 w-full">
      

      <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] p-4 sm:p-6 md:p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-3 sm:mb-4 flex-shrink-0">
            <span className="text-3xl sm:text-4xl md:text-5xl">{data.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-white/90 text-sm sm:text-base">{data.description}</p>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <div className="prose max-w-none">
            <p className="text-[#475569] leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line">
              {data.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History