import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, Info, Wrench, Target, Activity, Lightbulb,
  Flag, Trophy, Scale, Shield, Database, FileText,
  BookOpen, GraduationCap, AlertTriangle, Copyright,
  Handshake, History as HistoryIcon, HelpCircle, Image
} from 'lucide-react'

const VirtualKeyboard = () => {
  const navigate = useNavigate()
  const [hoveredCardId, setHoveredCardId] = useState(null)
  // about us keyboard  
  const menuItems = [
    { id: 'data', label: 'Meaning Behind Our Name', description: 'Learn the origin, inspiration, and significance of the name CR Cyber Crime Foundation.', path: '/about/data-protection', icon: HelpCircle, accent: '#37348B' },
    { id: 'gallery', label: 'Our Gallery', description: 'Explore visual highlights from our awareness programs, events, workshops, and outreach.', path: '/gallery-collections', icon: Image, accent: '#1F6B86' },
    { id: 'identity', label: 'Identity', description: 'See our official identity, values, representation, and public organizational profile.', path: '/about/identity', icon: User, accent: '#0E6799' },
    { id: 'introduction', label: 'Introduction', description: 'A quick overview of CR Cyber Crime Foundation, our journey, and our purpose.', path: '/about/introduction', icon: Info, accent: '#0D6B55' },
    { id: 'what-we-do', label: 'What We Do', description: 'Understand our initiatives, cyber awareness efforts, and support activities.', path: '/about/what-we-do', icon: Wrench, accent: '#6430C3' },
    { id: 'mission-vision', label: 'Mission & Vision', description: 'Read our mission, long-term vision, and commitment to digital safety.', path: '/about/mission-vision', icon: Target, accent: '#8B4513' },
    { id: 'activity', label: 'Activity', description: 'Browse updates on seminars, campaigns, workshops, and key organizational activities.', path: '/about/activity', icon: Activity, accent: '#B11F5E' },
    { id: 'purpose', label: 'Purpose', description: 'Know the core purpose behind our formation and the communities we aim to serve.', path: '/about/purpose', icon: Lightbulb, accent: '#156F68' },
    { id: 'objective', label: 'Objective', description: 'Review our short-term and long-term objectives, goals, and focus areas.', path: '/about/objective', icon: Flag, accent: '#274AB5' },
    { id: 'achievement', label: 'Achievement', description: 'See our milestones, recognitions, accomplishments, and impact stories.', path: '/about/achievement', icon: Trophy, accent: '#1F7A3F' },
    { id: 'legal', label: 'Legal & Compliance', description: 'Access legal status, compliance records, and other official foundation details.', path: '/about/legal-compliance', icon: Scale, accent: '#B11C1C' },
    { id: 'privacy', label: 'Privacy Policy', description: 'Understand how we collect, use, manage, and protect user information.', path: '/about/privacy-policy', icon: Shield, accent: '#14567D' },
    { id: 'terms', label: 'Terms & Condition', description: 'Read the terms, conditions, and responsibilities related to using this platform.', path: '/about/terms-conditions', icon: FileText, accent: '#1D4ED8' },
    { id: 'instruction', label: 'Instruction', description: 'Follow important usage instructions, guidance, and process notes for visitors.', path: '/about/instruction', icon: GraduationCap, accent: '#7C3AED' },
    { id: 'disclaimer', label: 'Legal Disclaimer', description: 'View important disclaimers related to information, liability, and public usage.', path: '/about/legal-disclaimer', icon: AlertTriangle, accent: '#DC2626' },
    { id: 'copyright', label: 'Copyright', description: 'Check copyright ownership, permissions, and content usage limitations.', path: '/about/copyright', icon: Copyright, accent: '#2563EB' },
    { id: 'partnership', label: 'Partnership', description: 'Explore our collaboration model, alliances, and institutional partnerships.', path: '/about/partnership', icon: Handshake, accent: '#0F766E' },
    { id: 'history', label: 'History', description: 'Trace the history, evolution, and major stages of the organization.', path: '/about/history', icon: HistoryIcon, accent: '#0284C7' }
  ]

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">Click any button to explore</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredCardId === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group relative flex h-[82px] sm:h-[108px] w-full items-center overflow-hidden rounded-[14px] sm:rounded-[22px] border-r border-t border-r-slate-200/40 border-t-slate-200/40 bg-white/95 px-1.5 py-1.5 sm:px-3.5 sm:py-3 text-left shadow-[0_3px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] active:scale-[0.985] touch-manipulation cursor-pointer"
              style={{
                borderLeftColor: item.accent,
                borderBottomColor: item.accent,
                borderTopColor: item.accent,
                borderLeftWidth: '3.5px',
                borderBottomWidth: isHovered ? '0px' : '3.5px',
                borderTopWidth: isHovered ? '3.5px' : '0px',
                transition: 'border-width 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.3s, transform 0.3s'
              }}
            >
              <div
                className="absolute left-0 top-0 z-20 flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-br-[10px] rounded-tl-[14px] sm:rounded-tl-[22px] sm:rounded-br-[18px] text-white shadow-xs"
                style={{ backgroundColor: item.accent }}
              >
                <span className="text-[8px] font-black tracking-wider sm:text-[11px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute right-1.5 top-1.5 opacity-[0.15] pointer-events-none z-0">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <pattern id={`dot-grid-${item.id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.75" fill={item.accent} />
                  </pattern>
                  <rect width="14" height="14" fill={`url(#dot-grid-${item.id})`} />
                </svg>
              </div>

              <div className="relative z-10 flex w-full items-center gap-1.5 pl-1 pt-1 sm:gap-3 sm:pl-2.5 sm:pt-1">
                <div
                  className="relative z-10 flex h-7 w-7 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-slate-100 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: `0 4px 12px -2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(255,255,255,0.9), 0 0 0 1px ${item.accent}15`
                  }}
                >
                  <div
                    className="absolute inset-0.5 rounded-full pointer-events-none"
                    style={{ backgroundColor: `${item.accent}05` }}
                  />
                  <Icon
                    className="relative z-10 h-3.5 w-3.5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: item.accent }}
                  />
                </div>

                <div className="min-w-0 flex-1 pr-0.5">
                  <span
                    className="block text-[9px] font-extrabold leading-[1.15] tracking-tight transition-colors duration-300 sm:text-[12.5px] line-clamp-2"
                    style={{ color: isHovered ? item.accent : '#0f172a' }}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[7px] font-normal leading-tight text-slate-400 line-clamp-1 truncate sm:text-[9.5px]">
                    {item.description}
                  </span>
                  <span
                    className="mt-0.5 flex w-fit items-center gap-0.5 text-[7.5px] font-extrabold transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[9.5px]"
                    style={{ color: item.accent }}
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
  )
}

export default VirtualKeyboard
