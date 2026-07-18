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
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = sessionStorage.getItem('legalCompliancePage')
    return saved ? parseInt(saved, 10) : 1
  })
  const gridRef = useRef(null)

  const complianceItems = [
    { id: 'our-legal-identity', label: ' Legal Identity', path: '/about/legal-compliance/our-legal-identity', icon: BadgeCheck },
    { id: 'our-legal-entity', label: ' Legal Entity', path: '/about/legal-compliance/our-legal-entity', icon: Building2 },
    { id: 'legal-authorizations-cyber-licenses', label: 'Legal Authorizations & Cyber Licenses', path: '/about/legal-compliance/legal-authorizations-cyber-licenses', icon: KeyRound },
    { id: 'legal-right-operational-limits', label: 'Legal Right & Operational Limits', path: '/about/legal-compliance/legal-right-operational-limits', icon: Scale },
    { id: 'crccf-legal-rights', label: 'CRCCF Legal Rights', path: '/about/legal-compliance/crccf-legal-rights', icon: ScrollText },
    { id: 'legal-ethical-compliance', label: 'Legal & Ethical Compliance', path: '/about/legal-compliance/legal-ethical-compliance', icon: ShieldCheck },
    { id: 'cyber-crime-investigation-approval', label: 'Cyber Crime Investigation Approval', path: '/about/legal-compliance/cyber-crime-investigation-approval', icon: SearchCheck },
    { id: 'our-cyber-investigation-capacity', label: ' Cyber Investigation Capacity', path: '/about/legal-compliance/our-cyber-investigation-capacity', icon: Waypoints },
    { id: 'digital-investigation-infrastructure', label: 'Digital Investigation Infrastructure', path: '/about/legal-compliance/digital-investigation-infrastructure', icon: Database },
    { id: 'our-role-in-cybercrime-investigation', label: ' Role in Cybercrime Investigation', path: '/about/legal-compliance/our-role-in-cybercrime-investigation', icon: BriefcaseBusiness },
    { id: 'investigation-scope-social-responsibility', label: 'Investigation Scope & Social Responsibility', path: '/about/legal-compliance/investigation-scope-social-responsibility', icon: Handshake },
    { id: 'cyber-investigation-compliance-framework', label: 'Cyber Investigation Compliance Framework', path: '/about/legal-compliance/cyber-investigation-compliance-framework', icon: ClipboardCheck },
    { id: 'investigation-ethics-legal-standards', label: 'Investigation Ethics & Legal Standards', path: '/about/legal-compliance/investigation-ethics-legal-standards', icon: FileCheck2 },
    { id: 'cyber-security-investigation-protocols', label: 'Cyber Security & Investigation Protocols', path: '/about/legal-compliance/cyber-security-investigation-protocols', icon: Shield },
    { id: 'digital-security-certification', label: 'Digital Security Certification', path: '/about/legal-compliance/digital-security-certification', icon: Award },
    { id: 'operational-resources-team', label: 'Operational Resources & Team', path: '/about/legal-compliance/operational-resources-team', icon: Users },
    { id: 'cybercrime-response-capabilities', label: 'Cybercrime Response Capabilities', path: '/about/legal-compliance/cybercrime-response-capabilities', icon: Siren },
    { id: 'team-tool-tech-capacity', label: 'Team, Tool & Tech Capacity', path: '/about/legal-compliance/team-tool-tech-capacity', icon: Cpu },
    { id: 'compliance-with-indian-cyber-laws', label: 'Compliance with Indian Cyber Laws', path: '/about/legal-compliance/compliance-with-indian-cyber-laws', icon: Landmark },
    { id: 'cyber-law-compliance-standards', label: 'Cyber Law Compliance Standards', path: '/about/legal-compliance/cyber-law-compliance-standards', icon: Gavel },
    { id: 'compliance-with-cybercrime-regulation', label: 'Compliance with Cybercrime Regulation', path: '/about/legal-compliance/compliance-with-cybercrime-regulation', icon: FileSearch },
    { id: 'cybercrime-compliance-framework', label: 'Cybercrime Compliance Framework', path: '/about/legal-compliance/cybercrime-compliance-framework', icon: FolderKanban },
    { id: 'resource-and-report', label: 'Resource & Report', path: '/about/legal-compliance/resource-and-report', icon: BookOpenCheck },
    { id: 'recognized-power-and-responsibility', label: 'Recognized Power & Responsibility', path: '/about/legal-compliance/recognized-power-and-responsibility', icon: Crown },
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg sm:hover:shadow-xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE] hover:border-[#2563EB] touch-manipulation min-h-[120px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <Icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors" />

              <span className="text-xs sm:text-sm font-medium text-[#475569] group-hover:text-[#0F172A] transition-colors line-clamp-3">
                {item.label}
              </span>
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