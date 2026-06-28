import { useNavigate } from 'react-router-dom'
import {
  Briefcase, GraduationCap, BookOpen, Users, Eye, Search, HeartHandshake, Building, Code, Target, Compass, Library
} from 'lucide-react'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const SkillDevelopmentPage = () => {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'internships', label: 'Internships', path: '/skill-development/internships', icon: Briefcase },
    { id: 'training', label: 'Training Programs', path: '/skill-development/training', icon: GraduationCap },
    { id: 'courses', label: 'Courses', path: '/skill-development/courses', icon: BookOpen },
    { id: 'workshops', label: 'Workshops', path: '/skill-development/workshops', icon: Users },
    { id: 'awareness', label: 'Awareness Programs', path: '/skill-development/awareness', icon: Eye },
    { id: 'research', label: 'Research Programs', path: '/skill-development/research', icon: Search },
    { id: 'mentorship', label: 'Mentorship Programs', path: '/skill-development/mentorship', icon: HeartHandshake },
    { id: 'corporate', label: 'Corporate Training', path: '/skill-development/corporate', icon: Building },
    { id: 'hackathons', label: 'Hackathons', path: '/skill-development/hackathons', icon: Code },
    { id: 'placement', label: 'Talent Placement Program', path: '/skill-development/placement', icon: Target },
    { id: 'career', label: 'Career Guidance', path: '/skill-development/career', icon: Compass },
    { id: 'library', label: 'Digital Libraries', path: '/skill-development/library', icon: Library }
  ]

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">

        {/* Header Section */}
        <PageHeader
          title="Skill Development"
          description="Empower your career with our specialized programs, courses, and resources designed for the modern digital landscape."
          Icon={GraduationCap}
        />

        {/* Top Marquee */}
        <div className="w-full overflow-hidden mb-6">
          <CompanyMarquee direction="right" />
        </div>

        {/* Keyboard Design Section */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            {/* <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Programs & Resources</h2> */}
            <p className="text-[#64748B] mt-1 text-sm sm:text-base">Click any button to explore</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg sm:hover:shadow-xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE] hover:border-[#2563EB] touch-manipulation"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors" />

                  <span className="text-xs sm:text-sm font-medium text-[#475569] group-hover:text-[#0F172A] transition-colors line-clamp-2">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="w-full overflow-hidden mt-2">
          <CompanyMarquee direction="left" />
        </div>
      </div>
    </div>
  )
}

export default SkillDevelopmentPage
