import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  Building2,
  KeyRound,
  Scale,
  ShieldCheck,
  ScrollText,
  SearchCheck,
  Waypoints,
  Database,
  BriefcaseBusiness,
  Handshake,
  ClipboardCheck,
  FileCheck2,
  Shield,
  Award,
  Users,
  Siren,
  Cpu,
  Landmark,
  Gavel,
  FileSearch,
  FolderKanban,
  BookOpenCheck,
  Crown
} from 'lucide-react'

const CARDS_PER_PAGE = 12

const LegalComplianceKeyboard = () => {
  const navigate = useNavigate()
  const [hoveredCardId, setHoveredCardId] = useState(null)
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = sessionStorage.getItem('legalCompliancePage')
    return saved ? parseInt(saved, 10) : 1
  })
  const gridRef = useRef(null)

  const complianceItems = [
    { id: 'our-legal-identity', label: 'Legal Identity', description: 'Official identity and registration basis.', path: '/about/legal-compliance/our-legal-identity', icon: BadgeCheck, accent: '#37348B' },
    { id: 'our-legal-entity', label: 'Legal Entity', description: 'Our legal structure and operating form.', path: '/about/legal-compliance/our-legal-entity', icon: Building2, accent: '#1F6B86' },
    { id: 'legal-authorizations-cyber-licenses', label: 'Legal Authorizations & Cyber Licenses', description: 'Authorizations, approvals, and cyber licenses.', path: '/about/legal-compliance/legal-authorizations-cyber-licenses', icon: KeyRound, accent: '#0E6799' },
    { id: 'legal-right-operational-limits', label: 'Legal Right & Operational Limits', description: 'Rights, scope, and operational limits.', path: '/about/legal-compliance/legal-right-operational-limits', icon: Scale, accent: '#0D6B55' },
    { id: 'crccf-legal-rights', label: 'CRCCF Legal Rights', description: 'Legal rights and protections of CRCCF.', path: '/about/legal-compliance/crccf-legal-rights', icon: ScrollText, accent: '#6430C3' },
    { id: 'legal-ethical-compliance', label: 'Legal & Ethical Compliance', description: 'Legal duties and ethical standards.', path: '/about/legal-compliance/legal-ethical-compliance', icon: ShieldCheck, accent: '#8B4513' },
    { id: 'cyber-crime-investigation-approval', label: 'Cyber Crime Investigation Approval', description: 'Approvals linked to investigation support.', path: '/about/legal-compliance/cyber-crime-investigation-approval', icon: SearchCheck, accent: '#B11F5E' },
    { id: 'our-cyber-investigation-capacity', label: 'Cyber Investigation Capacity', description: 'Our investigation capability and capacity.', path: '/about/legal-compliance/our-cyber-investigation-capacity', icon: Waypoints, accent: '#156F68' },
    { id: 'digital-investigation-infrastructure', label: 'Digital Investigation Infrastructure', description: 'Tools and systems for investigations.', path: '/about/legal-compliance/digital-investigation-infrastructure', icon: Database, accent: '#274AB5' },
    { id: 'our-role-in-cybercrime-investigation', label: 'Role in Cybercrime Investigation', description: 'Our role in cybercrime support work.', path: '/about/legal-compliance/our-role-in-cybercrime-investigation', icon: BriefcaseBusiness, accent: '#1F7A3F' },
    { id: 'investigation-scope-social-responsibility', label: 'Investigation Scope & Social Responsibility', description: 'Scope of work and social responsibility.', path: '/about/legal-compliance/investigation-scope-social-responsibility', icon: Handshake, accent: '#B11C1C' },
    { id: 'cyber-investigation-compliance-framework', label: 'Cyber Investigation Compliance Framework', description: 'Framework guiding investigation compliance.', path: '/about/legal-compliance/cyber-investigation-compliance-framework', icon: ClipboardCheck, accent: '#14567D' },
    { id: 'investigation-ethics-legal-standards', label: 'Investigation Ethics & Legal Standards', description: 'Ethics and legal standards we follow.', path: '/about/legal-compliance/investigation-ethics-legal-standards', icon: FileCheck2, accent: '#1D4ED8' },
    { id: 'cyber-security-investigation-protocols', label: 'Cyber Security & Investigation Protocols', description: 'Security and investigation protocols.', path: '/about/legal-compliance/cyber-security-investigation-protocols', icon: Shield, accent: '#7C3AED' },
    { id: 'digital-security-certification', label: 'Digital Security Certification', description: 'Security certifications and validation.', path: '/about/legal-compliance/digital-security-certification', icon: Award, accent: '#DC2626' },
    { id: 'operational-resources-team', label: 'Operational Resources & Team', description: 'Team support and operational resources.', path: '/about/legal-compliance/operational-resources-team', icon: Users, accent: '#2563EB' },
    { id: 'cybercrime-response-capabilities', label: 'Cybercrime Response Capabilities', description: 'Our cybercrime response capabilities.', path: '/about/legal-compliance/cybercrime-response-capabilities', icon: Siren, accent: '#0F766E' },
    { id: 'team-tool-tech-capacity', label: 'Team, Tool & Tech Capacity', description: 'Team strength, tools, and tech capacity.', path: '/about/legal-compliance/team-tool-tech-capacity', icon: Cpu, accent: '#0284C7' },
    { id: 'compliance-with-indian-cyber-laws', label: 'Compliance with Indian Cyber Laws', description: 'Alignment with Indian cyber laws.', path: '/about/legal-compliance/compliance-with-indian-cyber-laws', icon: Landmark, accent: '#37348B' },
    { id: 'cyber-law-compliance-standards', label: 'Cyber Law Compliance Standards', description: 'Cyber law compliance standards followed.', path: '/about/legal-compliance/cyber-law-compliance-standards', icon: Gavel, accent: '#1F6B86' },
    { id: 'compliance-with-cybercrime-regulation', label: 'Compliance with Cybercrime Regulation', description: 'Practices aligned with cybercrime rules.', path: '/about/legal-compliance/compliance-with-cybercrime-regulation', icon: FileSearch, accent: '#0E6799' },
    { id: 'cybercrime-compliance-framework', label: 'Cybercrime Compliance Framework', description: 'Framework for cybercrime compliance work.', path: '/about/legal-compliance/cybercrime-compliance-framework', icon: FolderKanban, accent: '#0D6B55' },
    { id: 'resource-and-report', label: 'Resource & Report', description: 'Resources, references, and reports.', path: '/about/legal-compliance/resource-and-report', icon: BookOpenCheck, accent: '#6430C3' },
    { id: 'recognized-power-and-responsibility', label: 'Recognized Power & Responsibility', description: 'Authority limits and responsibilities.', path: '/about/legal-compliance/recognized-power-and-responsibility', icon: Crown, accent: '#8B4513' },
  ]

  const totalPages = Math.ceil(complianceItems.length / CARDS_PER_PAGE)
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE
  const visibleItems = complianceItems.slice(startIndex, startIndex + CARDS_PER_PAGE)

  const goToPage = (page) => {
    setCurrentPage(page)
    sessionStorage.setItem('legalCompliancePage', page)
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6" ref={gridRef}>
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">Click any button to explore</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {visibleItems.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredCardId === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group relative flex min-h-[100px] w-full items-stretch overflow-hidden rounded-[20px] border-r border-t border-r-slate-200/40 border-t-slate-200/40 bg-white/95 px-2.5 py-2.5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] active:scale-[0.985] touch-manipulation sm:min-h-[120px] sm:rounded-[24px] sm:px-3.5 sm:py-3.5"
              style={{
                borderLeftColor: item.accent,
                borderBottomColor: item.accent,
                borderTopColor: item.accent,
                borderLeftWidth: '4px',
                borderBottomWidth: isHovered ? '0px' : '4px',
                borderTopWidth: isHovered ? '4px' : '0px',
                transition: 'border-width 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.3s, transform 0.3s'
              }}
            >
              <div
                className="absolute left-0 top-0 z-20 flex h-8 w-8 items-center justify-center rounded-br-[18px] rounded-tl-[20px] text-white shadow-xs sm:h-9 sm:w-9 sm:rounded-tl-[24px] sm:rounded-br-[20px]"
                style={{ backgroundColor: item.accent }}
              >
                <span className="text-[10px] font-black tracking-wider sm:text-[11px]">
                  {String(startIndex + index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="absolute right-3 top-3 opacity-[0.25] pointer-events-none z-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <pattern id={`dot-grid-${item.id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.75" fill={item.accent} />
                  </pattern>
                  <rect width="20" height="20" fill={`url(#dot-grid-${item.id})`} />
                </svg>
              </div>

              <div className="relative z-10 flex w-full items-center gap-2.5 pl-2 pt-3 sm:gap-3.5 sm:pl-3 sm:pt-2">
                <div
                  className="relative z-10 flex h-11 w-11 shrink-0 self-center items-center justify-center rounded-full border border-slate-100 transition-all duration-300 group-hover:scale-105 sm:h-[66px] sm:w-[66px]"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: `0 8px 20px -4px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.9), 0 0 0 1px ${item.accent}15`
                  }}
                >
                  <div
                    className="absolute inset-1 rounded-full pointer-events-none"
                    style={{ backgroundColor: `${item.accent}05` }}
                  />
                  <Icon
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
                    style={{ color: item.accent }}
                  />
                </div>

                <div className="min-w-0 flex-1 pr-1 sm:pr-2">
                  <span
                    className="block text-[11px] font-extrabold leading-tight tracking-tight transition-colors duration-300 sm:text-[13px]"
                    style={{ color: isHovered ? item.accent : '#0f172a' }}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[8px] font-normal leading-normal text-slate-500 line-clamp-3 sm:text-[10px]">
                    {item.description}
                  </span>
                  <span
                    className="mt-1 hidden w-fit items-center gap-1 text-[9px] font-bold transition-transform duration-300 group-hover:translate-x-1 sm:inline-flex"
                    style={{ color: item.accent }}
                  >
                    View More <span className="text-[10px]">→</span>
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-[#E2E8F0]">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
              text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
              disabled:hover:text-[#475569] disabled:hover:shadow-none"
          >
            ← Previous
          </button>

          <span className="text-sm font-medium text-[#64748B]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]
              text-[#475569] hover:border-[#2563EB] hover:text-[#0F172A] hover:shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#DBEAFE]
              disabled:hover:text-[#475569] disabled:hover:shadow-none"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default LegalComplianceKeyboard
