import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Laptop,
  Megaphone,
  HeartHandshake,
  FileText,
  ShieldCheck,
  Search,
  Scale,
  GraduationCap,
  Handshake,
  Briefcase,
  Eye,
  Gavel
} from 'lucide-react';

const OUR_SERVICES_DATA = [
  {
    id: 'software-it-services',
    num: '01',
    name: 'Software and IT Services',
    path: '/services/software-it',
    description: 'Custom software development, web solutions, and enterprise IT infrastructure support.',
    color: '#3f3d99',
    icon: Laptop
  },
  {
    id: 'digital-marketing-services',
    num: '02',
    name: 'Digital Marketing Services',
    path: '/services/digital-marketing',
    description: 'Comprehensive SEO, brand marketing, social media campaigns, and growth strategies.',
    color: '#1f6f88',
    icon: Megaphone
  },
  {
    id: 'victim-support-services',
    num: '03',
    name: 'Victim Support Services',
    path: '/services/victim-support',
    description: 'Dedicated legal, emotional, and technical assistance for cybercrime victims.',
    color: '#156a9a',
    icon: HeartHandshake
  },
  {
    id: 'legal-information-documentation',
    num: '04',
    name: 'Legal Information and Documentation Support',
    path: '/services/legal-docs',
    description: 'Expert legal drafting, cyber law documentation, and compliance framework support.',
    color: '#13795b',
    icon: FileText
  },
  {
    id: 'cyber-security-services',
    num: '05',
    name: 'Cyber Security Services',
    path: '/services/cyber-security',
    description: 'Advanced threat protection, vulnerability assessment, firewalling, and network defense.',
    color: '#6b33c7',
    icon: ShieldCheck
  },
  {
    id: 'cyber-investigation-services',
    num: '06',
    name: 'Cyber Investigation Services',
    path: '/services/cyber-investigation',
    description: 'Digital forensics, evidence tracking, incident response, and cyber crime investigation.',
    color: '#9a4f1d',
    icon: Search
  },
  {
    id: 'legal-services',
    num: '07',
    name: 'Legal Services',
    path: '/services/legal-services',
    description: 'Professional legal counseling, court representation, and statutory cyber compliance.',
    color: '#b11d63',
    icon: Scale
  },
  {
    id: 'education-services',
    num: '08',
    name: 'Education Services',
    path: '/services/education',
    description: 'Cyber safety education, academic security courses, and institutional awareness programs.',
    color: '#1e766f',
    icon: GraduationCap
  },
  {
    id: 'training-internship-services',
    num: '09',
    name: 'Training and Internship Services',
    path: '/services/training-internship',
    description: 'Professional cyber security training, skill development, and hands-on internship modules.',
    color: '#2f56b8',
    icon: Handshake
  },
  {
    id: 'placement-services',
    num: '10',
    name: 'Placement Services',
    path: '/services/placement',
    description: 'Career guidance, job placements, and industry talent recruitment in cybersecurity.',
    color: '#1f7a45',
    icon: Briefcase
  },
  {
    id: 'cyber-awareness-services',
    num: '11',
    name: 'Cyber Awareness Services',
    path: '/services/cyber-awareness',
    description: 'Public cyber fraud awareness campaigns, safety workshops, and prevention guidelines.',
    color: '#b1221d',
    icon: Eye
  },
  {
    id: 'legal-support',
    num: '12',
    name: 'Legal Support',
    path: '/services/legal-support',
    description: 'Litigation assistance, court documentation support, and 24/7 legal helpline for cyber incidents.',
    color: '#155b87',
    icon: Gavel
  }
];

const ServicesKeyboard = () => {
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState(null);

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 font-sans">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0C1A3A] tracking-tight mb-2 font-serif">
          Our Professional Services
        </h2>
        <p className="text-[#64748B] mt-1 text-sm sm:text-base font-medium max-w-2xl mx-auto">
          Explore our comprehensive range of cyber security and IT solutions
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
        {OUR_SERVICES_DATA.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredCardId === item.id;
          const itemAccent = item.color;

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
                  {item.num}
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
                    {item.name}
                  </span>
                  <span className="block text-[7px] font-normal leading-tight text-slate-400 line-clamp-1 truncate sm:text-[9.5px]">
                    {item.description}
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
          );
        })}
      </div>
    </div>
  );
};

export default ServicesKeyboard;
