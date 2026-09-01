import { useState } from 'react'
import CopyrightBookReader from './CopyrightBookReader'
import {
  FileText,
  FileSignature,
  ShieldCheck,
  Shield,
  AlertTriangle,
  BookOpen,
  Copy,
  Handshake,
  FolderLock,
  Globe,
  Tv,
  Gavel,
  AlertCircle,
  Award,
  Key,
  AtSign
} from 'lucide-react'

/* ==========================================================================
   COPYRIGHT MODULES DATA (Exact 16 Cards with Lucide Icons)
   ========================================================================== */

const copyrightItems = [
  {
    id: 'copyright-legal-notice',
    label: 'Copyright Legal Notice',
    description: 'Official notice regarding ownership and legal usage of foundation assets.',
    icon: FileText,
    accent: '#1E3A8A'
  },
  {
    id: 'copyright-declaration',
    label: 'Copyright Declaration',
    description: 'Formal declaration of IP rights over software and publications.',
    icon: FileSignature,
    accent: '#0F766E'
  },
  {
    id: 'copyright-ownership-statement',
    label: 'Copyright Ownership Statement',
    description: 'Affirms sole ownership of logos, trademarks, and brand assets.',
    icon: ShieldCheck,
    accent: '#1D4ED8'
  },
  {
    id: 'copyright-protection-notice',
    label: 'Copyright Protection Notice',
    description: 'Protective rules preventing unauthorized copying and cloning.',
    icon: Shield,
    accent: '#1E3A8A'
  },
  {
    id: 'copyright-infringement-notice',
    label: 'Copyright Infringement Notice',
    description: 'Legal remedies and DMCA takedown procedures for violations.',
    icon: AlertTriangle,
    accent: '#EF4444'
  },
  {
    id: 'copyright-usage-policy',
    label: 'Copyright Usage Policy',
    description: 'Permissible fair use guidelines for educational and public awareness.',
    icon: BookOpen,
    accent: '#0284C7'
  },
  {
    id: 'copyright-reproduction-policy',
    label: 'Copyright Reproduction Policy',
    description: 'Rules governing reproduction and copying of foundation materials.',
    icon: Copy,
    accent: '#6366F1'
  },
  {
    id: 'copyright-permission-policy',
    label: 'Copyright Permission Policy',
    description: 'Procedure for requesting formal permission to reuse content.',
    icon: Handshake,
    accent: '#1E3A8A'
  },
  {
    id: 'copyright-content-protection-policy',
    label: 'Copyright Content Protection Policy',
    description: 'Security measures shielding digital assets and media files.',
    icon: FolderLock,
    accent: '#6366F1'
  },
  {
    id: 'website-copyright-policy',
    label: 'Website Copyright Policy',
    description: 'Terms protecting website design, source code, and graphics.',
    icon: Globe,
    accent: '#EA580C'
  },
  {
    id: 'digital-content-copyright-notice',
    label: 'Digital Content Copyright Notice',
    description: 'Terms covering video lectures, podcasts, and digital downloads.',
    icon: Tv,
    accent: '#10B981'
  },
  {
    id: 'copyright-enforcement-policy',
    label: 'Copyright Enforcement Policy',
    description: 'Protocols for legal enforcement, piracy audits, and compliance.',
    icon: Gavel,
    accent: '#B45309'
  },
  {
    id: 'copyright-legal-disclaimer',
    label: 'Copyright Legal Disclaimer',
    description: 'Disclaimer limiting foundation liability on third-party content.',
    icon: AlertCircle,
    accent: '#0891B2'
  },
  {
    id: 'copyright-registration-certificate',
    label: 'Copyright Registration & Certificate',
    description: 'Official registration details and statutory filing records.',
    icon: Award,
    accent: '#1E3A8A'
  },
  {
    id: 'copyright-licensing-policy',
    label: 'Copyright Licensing Policy',
    description: 'Licensing agreements for educational and research partners.',
    icon: Key,
    accent: '#4F46E5'
  },
  {
    id: 'copyright-attribution-policy',
    label: 'Copyright Attribution Policy',
    description: 'Mandatory citation standards required when quoting content.',
    icon: AtSign,
    accent: '#DB2777'
  }
]

export default function Copyright() {
  const [view, setView] = useState('portal'); // 'portal' or 'book-view'
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
    setView('book-view');
  };

  const handleBackToPortal = () => {
    setView('portal');
    setSelectedCardId(null);
  };

  if (view === 'book-view') {
    return <CopyrightBookReader cardId={selectedCardId} onBack={handleBackToPortal} />;
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">   </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base">Click any button to open book view</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {copyrightItems.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredCardId === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleCardClick(item.id)}
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
