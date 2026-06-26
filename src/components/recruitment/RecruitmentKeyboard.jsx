import { useNavigate } from 'react-router-dom'
import {
  Briefcase,
  FileText,
  Users,
  ClipboardList,
  Megaphone,
  Newspaper,
  SearchCheck,
  Upload,
  BadgeCheck,
  IdCard
} from 'lucide-react'

const RecruitmentKeyboard = () => {
  const navigate = useNavigate()

  const items = [
    { label: 'Job Vacancy', path: '/recruitment/job-vacancy', icon: Briefcase },
    { label: 'Recruitment Rules/Policies', path: '/recruitment/rules-policies', icon: FileText },
    { label: 'Post Vacancy - Members Only', path: '/recruitment/post-vacancy-members-only', icon: Users },
    { label: 'Online Application Portal', path: '/recruitment/online-application-portal', icon: ClipboardList },
    { label: 'Recruitment Advertisements', path: '/recruitment/advertisements', icon: Megaphone },
    { label: 'Press Release and Notices', path: '/recruitment/press-release-notices', icon: Newspaper },
    { label: 'Check Application Status', path: '/recruitment/application-status', icon: SearchCheck },
    { label: 'Submit Resume', path: '/recruitment/submit-resume', icon: Upload },
    { label: 'Certificate Verification', path: '/recruitment/certificate-verification', icon: BadgeCheck },
    { label: 'ID Card Verification', path: '/recruitment/id-card-verification', icon: IdCard },
  ]

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">   </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3">
        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE] hover:border-[#2563EB] min-h-[120px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <Icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-[#2563EB]" />

              <span className="text-xs sm:text-sm font-medium text-[#475569] group-hover:text-[#0F172A] line-clamp-3">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RecruitmentKeyboard
