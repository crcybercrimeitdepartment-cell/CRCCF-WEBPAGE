import { useNavigate } from "react-router-dom";
import {
  Laptop,
  Megaphone,
  HandHeart,
  FileText,
  Shield,
  Search,
  Scale,
  GraduationCap,
  BriefcaseBusiness,
  Handshake,
  Eye,
  Gavel,
  Cpu,
} from "lucide-react";


const ServicesKeyboard = () => {
  const navigate = useNavigate();

  const serviceItems = [
    {
      id: "software-it",
      label: "Software and IT Services",
      path: "/services/software-it",
      icon: Laptop,
    },
    {
      id: "digital-marketing",
      label: "Digital Marketing Services",
      path: "/services/digital-marketing",
      icon: Megaphone,
    },
    {
      id: "victim-support",
      label: "Victim Support Services",
      path: "/services/victim-support",
      icon: HandHeart,
    },
    {
      id: "legal-doc-support",
      label: "Legal Information and Documentation Support",
      path: "/services/legal-docs",
      icon: FileText,
    },
    {
      id: "cyber-security",
      label: "Cyber Security Services",
      path: "/services/cyber-security",
      icon: Shield,
    },
    {
      id: "cyber-investigation",
      label: "Cyber Investigation Services",
      path: "/services/cyber-investigation",
      icon: Search,
    },
    {
      id: "legal-services",
      label: "Legal Services",
      path: "/services/legal-services",
      icon: Scale,
    },
    {
      id: "education-services",
      label: "Education Services",
      path: "/services/education",
      icon: GraduationCap,
    },
    {
      id: "training-internship",
      label: "Training and Internship Services",
      path: "/services/training-internship",
      icon: Handshake,
    },
    {
      id: "placement-services",
      label: "Placement Services",
      path: "/services/placement",
      icon: BriefcaseBusiness,
    },
    {
      id: "cyber-awareness",
      label: "Cyber Awareness Services",
      path: "/services/cyber-awareness",
      icon: Eye,
    },
    {
      id: "legal-support",
      label: "Legal Support",
      path: "/services/legal-support",
      icon: Gavel,
    },
    {
      id: "innovation-technology",
      label: "Innovation & Technology",
      path: "/services/innovation-technology",
      icon: Cpu,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0C1A3A]">Our Professional Services</h2>
        <p className="text-gray-500 mt-1">Explore our comprehensive range of cyber security and IT solutions</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {serviceItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#1A56DB] touch-manipulation min-h-[140px] flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

              <Icon className="w-7 h-7 mb-3 text-[#1A56DB] group-hover:text-[#1e429f] transition-colors" />

              <span className="text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-[#0C1A3A] transition-colors line-clamp-3">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesKeyboard;
