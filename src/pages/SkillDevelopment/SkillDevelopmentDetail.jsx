import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const slugToTitle = {
  'internships': 'Internships',
  'training': 'Training Programs',
  'courses': 'Courses',
  'certifications': 'Certifications',
  'workshops': 'Workshops',
  'awareness': 'Awareness Programs',
  'live-projects': 'Live Projects',
  'research': 'Research Programs',
  'mentorship': 'Mentorship Programs',
  'corporate': 'Corporate Training',
  'hackathons': 'Hackathons',
  'placement': 'Talent Placement Program',
  'career': 'Career Guidance',
  'library': 'Digital Libraries'
}

const SkillDevelopmentDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const title = slugToTitle[slug] || 'Skill Development Program'

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        
        

        {/* Content Section */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-8 sm:p-12 md:p-16 text-center max-w-3xl mx-auto border border-[#DBEAFE]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            {title}
          </h1>
          
          <div className="inline-block bg-[#EFF6FF] text-[#1A56DB] px-6 py-3 rounded-full font-semibold text-lg sm:text-xl shadow-sm border border-[#BFDBFE]">
            Data Coming Soon
          </div>
          
          <p className="mt-8 text-[#64748B] text-base sm:text-lg">
            We are currently gathering the latest information and resources for this section. Please check back later for updates!
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default SkillDevelopmentDetail
