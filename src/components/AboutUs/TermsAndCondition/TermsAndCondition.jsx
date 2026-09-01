import { useState } from 'react'
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  Building,
  Presentation,
  Wrench,
  Award,
  Calendar,
  Heart,
  UserPlus,
  Atom,
  Shield,
  Laptop,
  Building2,
  Tv,
  Globe,
  UploadCloud,
  FileSignature,
  CreditCard,
  Handshake,
  Scale,
  Settings,
  Eye,
  Play,
  Layout,
  Activity,
  Compass,
  Code,
  Database,
  Sparkles,
  Cpu,
  Mail
} from 'lucide-react'

const termsItems = [
  {
    id: 'course-admission',
    label: 'Course Admission Terms',
    description: 'Rules for enrollment, eligibility, and course participation.',
    icon: GraduationCap,
    accent: '#1E3A8A'
  },
  {
    id: 'internship-admission',
    label: 'Internship Admission Policy',
    description: 'Selection process and code of conduct for interns.',
    icon: Briefcase,
    accent: '#0F766E'
  },
  {
    id: 'recruitment',
    label: 'Recruitment & Hiring Terms',
    description: 'Guidelines for job applicants and background verification.',
    icon: UserCheck,
    accent: '#1D4ED8'
  },
  {
    id: 'office-visit',
    label: 'Office Visit & Campus Rules',
    description: 'Security and conduct protocols for physical office visits.',
    icon: Building,
    accent: '#0284C7'
  },
  {
    id: 'training-program',
    label: 'Training Program Terms',
    description: 'Terms for participating in cyber security training modules.',
    icon: Presentation,
    accent: '#6366F1'
  },
  {
    id: 'workshop-participation',
    label: 'Workshop Participation Terms',
    description: 'Conditions for attending hands-on technical workshops.',
    icon: Wrench,
    accent: '#B45309'
  },
  {
    id: 'certification',
    label: 'Certification & Credentials',
    description: 'Rules for examination, certificate validity, and verification.',
    icon: Award,
    accent: '#D97706'
  },
  {
    id: 'event-participation',
    label: 'Event & Conference Policy',
    description: 'Terms for attending, sponsoring, or speaking at events.',
    icon: Calendar,
    accent: '#4F46E5'
  },
  {
    id: 'volunteer-registration',
    label: 'Volunteer Registration Terms',
    description: 'Code of conduct and duties for registered community volunteers.',
    icon: Heart,
    accent: '#E11D48'
  },
  {
    id: 'membership',
    label: 'Membership Terms & Conditions',
    description: 'Member rights, responsibilities, and code of ethics.',
    icon: UserPlus,
    accent: '#2563EB'
  },
  {
    id: 'research-program',
    label: 'Research Program Policy',
    description: 'Guidelines for research collaborations and threat intelligence.',
    icon: Atom,
    accent: '#7C3AED'
  },
  {
    id: 'cybersecurity-awareness',
    label: 'Cybersecurity Awareness Terms',
    description: 'Terms for accessing and sharing public awareness materials.',
    icon: Shield,
    accent: '#059669'
  },
  {
    id: 'online-course',
    label: 'Online Course Access Terms',
    description: 'Portal usage, video streaming, and digital learning asset rules.',
    icon: Laptop,
    accent: '#0284C7'
  },
  {
    id: 'offline-course',
    label: 'Offline Course Classroom Rules',
    description: 'Classroom discipline, lab equipment handling, and safety.',
    icon: Building2,
    accent: '#0891B2'
  },
  {
    id: 'seminar-conference',
    label: 'Seminar & Conference Policy',
    description: 'Registration, badge usage, and session behavior standards.',
    icon: Tv,
    accent: '#9333EA'
  },
  {
    id: 'official-communication',
    label: 'Official Communication Policy',
    description: 'Authorized email communications, official notices, and media.',
    icon: Mail,
    accent: '#DB2777'
  },
  {
    id: 'website-usage',
    label: 'Website Usage Policy',
    description: 'Acceptable use guidelines and security rules for digital portals.',
    icon: Globe,
    accent: '#EA580C'
  },
  {
    id: 'content-submission',
    label: 'Content Submission Terms',
    description: 'Copyright grants and rights when submitting articles or reports.',
    icon: UploadCloud,
    accent: '#16A34A'
  },
  {
    id: 'certificate-issuance',
    label: 'Certificate Verification Policy',
    description: 'Official procedure for issuing, validating, and revoking certificates.',
    icon: FileSignature,
    accent: '#4F46E5'
  },
  {
    id: 'payment-refund',
    label: 'Payment & Refund Policy',
    description: 'Fee payment processing, invoice generation, and refund criteria.',
    icon: CreditCard,
    accent: '#DC2626'
  },
  {
    id: 'partner-collaboration',
    label: 'Partner Collaboration Terms',
    description: 'Framework governing institutional partnerships and MOUs.',
    icon: Handshake,
    accent: '#0F766E'
  },
  {
    id: 'general-terms',
    label: 'General Terms & Conditions',
    description: 'Overall legal disclaimers, liability limits, and jurisdiction.',
    icon: Scale,
    accent: '#334155'
  },
  {
    id: 'demo-01',
    label: 'System Configuration Terms',
    description: 'Technical settings and system specifications.',
    icon: Settings,
    accent: '#475569'
  },
  {
    id: 'demo-02',
    label: 'Data Visibility & Privacy',
    description: 'Public data disclosure and privacy monitoring.',
    icon: Eye,
    accent: '#0891B2'
  },
  {
    id: 'demo-03',
    label: 'Media Playback Guidelines',
    description: 'Streaming rights and media content policies.',
    icon: Play,
    accent: '#2563EB'
  },
  {
    id: 'demo-04',
    label: 'Dashboard & Interface Terms',
    description: 'UI customization and layout preferences.',
    icon: Layout,
    accent: '#6366F1'
  },
  {
    id: 'demo-05',
    label: 'Activity Monitoring Policy',
    description: 'System activity logging and compliance audits.',
    icon: Activity,
    accent: '#16A34A'
  },
  {
    id: 'demo-06',
    label: 'Navigation & Access Rights',
    description: 'Role-based access boundaries and permissions.',
    icon: Compass,
    accent: '#D97706'
  },
  {
    id: 'demo-07',
    label: 'API & Code Usage Policy',
    description: 'Developer portal terms and API rate limits.',
    icon: Code,
    accent: '#0F766E'
  },
  {
    id: 'demo-08',
    label: 'Database & Storage Policy',
    description: 'Data persistence and storage security.',
    icon: Database,
    accent: '#1E3A8A'
  },
  {
    id: 'demo-09',
    label: 'AI & Smart Features Terms',
    description: 'Automated intelligence tools and usage policies.',
    icon: Sparkles,
    accent: '#7C3AED'
  },
  {
    id: 'demo-10',
    label: 'Hardware & Processing Policy',
    description: 'Resource consumption and processing limits.',
    icon: Cpu,
    accent: '#DC2626'
  }
]

const TermsAndCondition = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null)

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">Click any button to explore</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {termsItems.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredCardId === item.id

          return (
            <button
              key={item.id}
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

export default TermsAndCondition
