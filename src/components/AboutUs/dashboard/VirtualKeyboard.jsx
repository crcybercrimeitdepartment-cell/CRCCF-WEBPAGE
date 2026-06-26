import { useNavigate } from 'react-router-dom'
import {
  User, Info, Wrench, Target, Activity, Lightbulb,
  Flag, Trophy, Scale, Shield, Database, FileText,
  BookOpen, GraduationCap, AlertTriangle, Copyright,
  Handshake, History as HistoryIcon
} from 'lucide-react'

const VirtualKeyboard = () => {
  const navigate = useNavigate()
// about us keyboard  
  const menuItems = [
    { id: 'identity', label: ' Identity', path: '/about/identity', icon: User, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'introduction', label: ' Introduction', path: '/about/introduction', icon: Info, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'what-we-do', label: 'What We Do', path: '/about/what-we-do', icon: Wrench, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'mission-vision', label: 'Mission & Vision', path: '/about/mission-vision', icon: Target, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'activity', label: ' Activity', path: '/about/activity', icon: Activity, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'purpose', label: 'Purpose', path: '/about/purpose', icon: Lightbulb, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'objective', label: 'Objective', path: '/about/objective', icon: Flag, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'achievement', label: 'Achievement', path: '/about/achievement', icon: Trophy, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'legal', label: 'Legal & Compliance', path: '/about/legal-compliance', icon: Scale, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'privacy', label: 'Privacy Policy', path: '/about/privacy-policy', icon: Shield, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'data', label: 'Data Protection', path: '/about/data-protection', icon: Database, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'terms', label: 'Terms & Condition', path: '/about/terms-conditions', icon: FileText, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'rules', label: 'Rules & Regulation', path: '/about/rules-regulation', icon: BookOpen, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'instruction', label: 'Instruction', path: '/about/instruction', icon: GraduationCap, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'disclaimer', label: 'Legal Disclaimer', path: '/about/legal-disclaimer', icon: AlertTriangle, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'copyright', label: 'Copyright', path: '/about/copyright', icon: Copyright, color: 'from-[#1D4ED8] to-[#2563EB]' },
    { id: 'partnership', label: 'Partnership', path: '/about/partnership', icon: Handshake, color: 'from-[#3B82F6] to-[#2563EB]' },
    { id: 'history', label: 'History', path: '/about/history', icon: HistoryIcon, color: 'from-[#3B82F6] to-[#2563EB]' }
  ]

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
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
  )
}

export default VirtualKeyboard