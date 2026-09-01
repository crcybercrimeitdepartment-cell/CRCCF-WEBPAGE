import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase, GraduationCap, BookOpen, Users, Eye, Search, HeartHandshake, Building, Code, Target, Compass, Library
} from 'lucide-react'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const SkillDevelopmentPage = () => {
  const navigate = useNavigate()
  const [hoveredCardId, setHoveredCardId] = useState(null)

  const menuItems = [
    { id: 'internships', label: 'Internships', path: '/skill-development/internships', icon: Briefcase, color: '#3f3d99', desc: 'Hands-on experience and professional exposure.' },
    { id: 'training', label: 'Training Programs', path: '/skill-development/training', icon: GraduationCap, color: '#1f6f88', desc: 'Comprehensive technical and practical training.' },
    { id: 'courses', label: 'Courses', path: '/skill-development/courses', icon: BookOpen, color: '#156a9a', desc: 'Specialized courses for skill enhancement.' },
    { id: 'workshops', label: 'Workshops', path: '/skill-development/workshops', icon: Users, color: '#13795b', desc: 'Interactive sessions and skill-building workshops.' },
    { id: 'awareness', label: 'Awareness Programs', path: '/skill-development/awareness', icon: Eye, color: '#6b33c7', desc: 'Campaigns to promote digital safety awareness.' },
    { id: 'research', label: 'Research Programs', path: '/skill-development/research', icon: Search, color: '#9a4f1d', desc: 'Advanced research initiatives and projects.' },
    { id: 'mentorship', label: 'Mentorship Programs', path: '/skill-development/mentorship', icon: HeartHandshake, color: '#b11d63', desc: 'Guidance and support from industry experts.' },
    { id: 'corporate', label: 'Corporate Training', path: '/skill-development/corporate', icon: Building, color: '#1e766f', desc: 'Tailored training solutions for businesses.' },
    { id: 'hackathons', label: 'Hackathons', path: '/skill-development/hackathons', icon: Code, color: '#2f56b8', desc: 'Competitive coding and innovation events.' },
    { id: 'placement', label: 'Talent Placement Program', path: '/skill-development/placement', icon: Target, color: '#1f7a45', desc: 'Connecting trained talent with top employers.' },
    { id: 'career', label: 'Career Guidance', path: '/skill-development/career', icon: Compass, color: '#b1221d', desc: 'Expert advice for professional career growth.' },
    { id: 'library', label: 'Digital Libraries', path: '/skill-development/library', icon: Library, color: '#155b87', desc: 'Access to vast digital learning resources.' }
  ]

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16 font-sans">

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
            <p className="text-[#64748B] mt-1 text-sm sm:text-base font-medium">Click any button to explore</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isHovered = hoveredCardId === item.id
              const itemAccent = item.color

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group relative flex h-[82px] sm:h-[108px] w-full items-center overflow-hidden rounded-[14px] sm:rounded-[22px] border-r border-t border-r-slate-200/40 border-t-slate-200/40 bg-white/95 px-1.5 py-1.5 sm:px-3.5 sm:py-3 text-left shadow-[0_3px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] active:scale-[0.985] touch-manipulation cursor-pointer"
                  style={{
                    borderLeftColor: itemAccent,
                    borderBottomColor: itemAccent,
                    borderTopColor: itemAccent,
                    borderLeftWidth: '3.5px',
                    borderBottomWidth: isHovered ? '0px' : '3.5px',
                    borderTopWidth: isHovered ? '3.5px' : '0px',
                    transition: 'border-width 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.3s, transform 0.3s'
                  }}
                >
                  <div
                    className="absolute left-0 top-0 z-20 flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-br-[10px] rounded-tl-[14px] sm:rounded-tl-[22px] sm:rounded-br-[18px] text-white shadow-xs"
                    style={{ backgroundColor: itemAccent }}
                  >
                    <span className="text-[8px] font-black tracking-wider sm:text-[11px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="absolute right-1.5 top-1.5 opacity-[0.15] pointer-events-none z-0">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <pattern id={`dot-grid-${item.id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="0.75" fill={itemAccent} />
                      </pattern>
                      <rect width="14" height="14" fill={`url(#dot-grid-${item.id})`} />
                    </svg>
                  </div>

                  <div className="relative z-10 flex w-full items-center gap-1.5 pl-1 pt-1 sm:gap-3 sm:pl-2.5 sm:pt-1">
                    <div
                      className="relative z-10 flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-slate-100 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        boxShadow: `0 4px 12px -2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(255,255,255,0.9), 0 0 0 1px ${itemAccent}15`
                      }}
                    >
                      <div
                        className="absolute inset-0.5 rounded-full pointer-events-none"
                        style={{ backgroundColor: `${itemAccent}05` }}
                      />
                      <Icon
                        className="relative z-10 h-3.5 w-3.5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: itemAccent }}
                      />
                    </div>

                    <div className="min-w-0 flex-1 pr-0.5">
                      <span
                        className="block text-[9px] font-extrabold leading-[1.15] tracking-tight transition-colors duration-300 sm:text-[12.5px] line-clamp-2"
                        style={{ color: isHovered ? itemAccent : '#0f172a' }}
                      >
                        {item.label}
                      </span>
                      <span className="block text-[7px] font-normal leading-tight text-slate-400 line-clamp-1 truncate sm:text-[9.5px]">
                        {item.desc}
                      </span>
                      <span
                        className="mt-0.5 flex w-fit items-center gap-0.5 text-[7.5px] font-extrabold transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[9.5px]"
                        style={{ color: itemAccent }}
                      >
                        View More <span className="text-[8px] sm:text-[10px]">→</span>
                      </span>
                    </div>
                  </div>
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
