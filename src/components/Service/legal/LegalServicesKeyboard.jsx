import { useNavigate } from "react-router-dom";
import {
  Building2,
  Receipt,
  FileSpreadsheet,
  CalendarCheck,
  ClipboardCheck,
  UtensilsCrossed,
  BadgeCheck,
  Globe,
  Store,
  Landmark,
  Users,
  ShieldCheck,
  PenTool,
  Database,
  HeartHandshake,
  IdCard,
  SearchCheck,
  Siren,
  Scale,
  MailWarning,
  FileSignature,
  ScrollText,
  Gavel,
  MessageCircleMore,
} from "lucide-react";

const LegalServicesKeyboard = () => {
  const navigate = useNavigate();

  const legalItems = [
    { id: "company-registration", label: "Company Registration", path: "/services/legal/company-registration", icon: Building2 },
    { id: "gst-registration-service", label: "GST Registration Service", path: "/services/legal/gst-registration-service", icon: Receipt },
    { id: "gst-return-filing-services", label: "GST Return Filing Services", path: "/services/legal/gst-return-filing-services", icon: FileSpreadsheet },
    { id: "company-annual-filing-services", label: "Company Annual Filing Services", path: "/services/legal/company-annual-filing-services", icon: CalendarCheck },
    { id: "company-audit-support-services", label: "Company Audit Support Services", path: "/services/legal/company-audit-support-services", icon: ClipboardCheck },
    { id: "fssai-registration-services", label: "FSSAI Registration Services", path: "/services/legal/fssai-registration-services", icon: UtensilsCrossed },
    { id: "msme-udyam-registration-services", label: "MSME / UDYAM Registration Services", path: "/services/legal/msme-udyam-registration-services", icon: BadgeCheck },
    { id: "iec-registration-services", label: "IEC Registration Services", path: "/services/legal/iec-registration-services", icon: Globe },
    { id: "shop-establishment-registration-services", label: "Shop & Establishment Registration Services", path: "/services/legal/shop-establishment-registration-services", icon: Store },
    { id: "professional-tax-registration-services", label: "Professional Tax (PT) Registration Services", path: "/services/legal/professional-tax-registration-services", icon: Landmark },
    { id: "pf-registration-services", label: "PF Registration Services", path: "/services/legal/pf-registration-services", icon: Users },
    { id: "esic-registration-services", label: "ESIC Registration Services", path: "/services/legal/esic-registration-services", icon: ShieldCheck },
    { id: "digital-signature-certificate", label: "Digital Signature Certificate (DSC)", path: "/services/legal/digital-signature-certificate", icon: PenTool },
    { id: "data-it-compliance-consulting-services", label: "Data & IT Compliance Consulting Services", path: "/services/legal/data-it-compliance-consulting-services", icon: Database },
    { id: "trust-registration-services", label: "Trust Registration Services", path: "/services/legal/trust-registration-services", icon: HeartHandshake },
    { id: "ngo-registration-services", label: "NGO Registration Services", path: "/services/legal/ngo-registration-services", icon: HeartHandshake },
    { id: "society-registration-services", label: "Society Registration Services", path: "/services/legal/society-registration-services", icon: Users },
    { id: "document-drafting-services", label: "Document Drafting Services", path: "/services/legal/document-drafting-services", icon: FileSignature },
    { id: "identity-document-verification-services", label: "Identity and Document Verification Services", path: "/services/legal/identity-document-verification-services", icon: IdCard },
    { id: "legal-research-compliance-check-services", label: "Legal Research & Compliance Check Services", path: "/services/legal/legal-research-compliance-check-services", icon: SearchCheck },
    { id: "cyber-crime-complaint-assistance-services", label: "Cyber Crime Complaint Assistance Services", path: "/services/legal/cyber-crime-complaint-assistance-services", icon: Siren },
    { id: "consumer-court-case-support-services", label: "Consumer Court Case Support Services", path: "/services/legal/consumer-court-case-support-services", icon: Scale },
    { id: "legal-notice-preparation-services", label: "Legal Notice Preparation Services", path: "/services/legal/legal-notice-preparation-services", icon: MailWarning },
    { id: "contract-drafting-agreement-preparation-services", label: "Contract Drafting & Agreement Preparation Services", path: "/services/legal/contract-drafting-agreement-preparation-services", icon: FileSignature },
    { id: "case-drafting-legal-documentation-services", label: "Case Drafting & Legal Documentation Services", path: "/services/legal/case-drafting-legal-documentation-services", icon: ScrollText },
    { id: "cyber-law-consultant-services", label: "Cyber Law Consultant Services", path: "/services/legal/cyber-law-consultant-services", icon: Gavel },
    { id: "legal-consultation-services", label: "Legal Consultation Services", path: "/services/legal/legal-consultation-services", icon: MessageCircleMore },
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {legalItems.map((item) => {
          const Icon = item.icon;
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
          );
        })}
      </div>
    </div>
  );
};

export default LegalServicesKeyboard;
