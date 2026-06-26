import { useNavigate } from 'react-router-dom'
import {
  FileText,
  TrendingUp,
  Sprout,
  BadgeCheck,
  UserCheck,
  ClipboardList,
  BookOpenCheck,
  CalendarDays,
  ShieldCheck,
  GraduationCap,
  BarChart3,
  Users,
  Handshake,
  Award
} from 'lucide-react'

const RecruitmentRulesKeyboard = () => {
  const navigate = useNavigate()
// Define the items for the recruitment rules/policies keyboard
  const items = [
    { label: 'Recruitment Policy and Employment Overview', path: '/recruitment/rules-policies/employment-overview', icon: FileText },
    { label: 'Career Development and Progress', path: '/recruitment/rules-policies/career-development-progress', icon: TrendingUp },
    { label: 'Employee Growth and Future Opportunity', path: '/recruitment/rules-policies/employee-growth-future-opportunity', icon: Sprout },
    { label: 'CRCCF Employment Eligibility Criteria', path: '/recruitment/rules-policies/employment-eligibility-criteria', icon: BadgeCheck },
    { label: 'CRCCF Recruitment & Selection Process', path: '/recruitment/rules-policies/recruitment-selection-process', icon: UserCheck },
    { label: 'CRCCF Recruitment Instructions', path: '/recruitment/rules-policies/recruitment-instructions', icon: ClipboardList },
    { label: 'CRCCF Recruitment Guidelines', path: '/recruitment/rules-policies/recruitment-guidelines', icon: BookOpenCheck },
    { label: 'CRCCF Recruitment Calendar', path: '/recruitment/rules-policies/recruitment-calendar', icon: CalendarDays },
    { label: 'Code of Conduct & Professional Ethics', path: '/recruitment/rules-policies/code-of-conduct-professional-ethics', icon: ShieldCheck },
    { label: 'Training, Orientation & Skill Development', path: '/recruitment/rules-policies/training-orientation-skill-development', icon: GraduationCap },
    { label: 'Performance Review & Evaluation System', path: '/recruitment/rules-policies/performance-review-evaluation-system', icon: BarChart3 },
    { label: 'Employee Rights & Responsibilities', path: '/recruitment/rules-policies/employee-rights-responsibilities', icon: Users },
    { label: 'Volunteer & Internship Policy', path: '/recruitment/rules-policies/volunteer-internship-policy', icon: Handshake },
    { label: 'Employee Recognition & Awards', path: '/recruitment/rules-policies/employee-recognition-awards', icon: Award },
  ]
// Render the recruitment rules/policies keyboard with buttons for each item
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
          {/* Recruitment Rules/Policies */}
        </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">
          
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {items.map((item, index) => {
          const Icon = item.icon
// Render a button for each recruitment rule/policy item that navigates to the corresponding path when clicked
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

export default RecruitmentRulesKeyboard
