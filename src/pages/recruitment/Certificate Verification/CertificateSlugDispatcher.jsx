import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComingSoonPage from '../../common/ComingSoonPage';

const InternshipCertificatePage = lazy(() => import('./Internship Certificate/InternshipCertificatePage'));
const TrainingCertificatePage = lazy(() => import('./Training Certificate/TrainingCertificatePage'));
const CourseCertificatePage = lazy(() => import('./Course Certificate/CourseCertificatePage'));
const EducationCertificatePage = lazy(() => import('./Education Certificate/EducationCertificatePage'));
const ExperienceCertificatePage = lazy(() => import('./Experience Certificate/ExperienceCertificatePage'));
const LegalEducationCertificatePage = lazy(() => import('./Legal Education Certificate/LegalEducationCertificatePage'));
const TechnicalEducationCertificatePage = lazy(() => import('./Technical Education Certificate/TechnicalEducationCertificatePage'));
const ProfessionalEducationCertificatePage = lazy(() => import('./Professional Education Certificate/ProfessionalEducationCertificatePage'));
const GeneralEducationCertificatePage = lazy(() => import('./General Education Certificate/GeneralEducationCertificatePage'));
const SeminarCertificatePage = lazy(() => import('./Seminar Certificate/SeminarCertificatePage'));
const WebinarCertificatePage = lazy(() => import('./Webinar Certificate/WebinarCertificatePage'));
const WorkshopCertificatePage = lazy(() => import('./Workshop Certificate/WorkshopCertificatePage'));
const ParticipationCertificatePage = lazy(() => import('./Participation Certificate/ParticipationCertificatePage'));
const MembershipCertificatePage = lazy(() => import('./Membership Certificate/MembershipCertificatePage'));
const AppreciationCertificatePage = lazy(() => import('./Appreciation Certificate/AppreciationCertificatePage'));
const AchievementCertificatePage = lazy(() => import('./Achievement Certificate/AchievementCertificatePage'));
const RecognitionCertificatePage = lazy(() => import('./Recognition Certificate/RecognitionCertificatePage'));
const ExcellenceAwardCertificatePage = lazy(() => import('./Excellence Award Certificate/ExcellenceAwardCertificatePage'));
const OutstandingPerformanceCertificatePage = lazy(() => import('./Outstanding Performance Certificate/OutstandingPerformanceCertificatePage'));
const BestPerformerCertificatePage = lazy(() => import('./Best Performer Certificate/BestPerformerCertificatePage'));
const EmployeeOfTheMonthCertificatePage = lazy(() => import('./Employee of the Month Certificate/EmployeeOfTheMonthCertificatePage'));
const MentorshipCertificatePage = lazy(() => import('./Mentorship Certificate/MentorshipCertificatePage'));
const ResearchContributionCertificatePage = lazy(() => import('./Research Contribution Certificate/ResearchContributionCertificatePage'));
const ProjectCompletionCertificatePage = lazy(() => import('./Project Completion Certificate/ProjectCompletionCertificatePage'));
const CyberAwarenessCertificatePage = lazy(() => import('./Cyber Awareness Certificate/CyberAwarenessCertificatePage'));
const CyberSecurityTrainingCertificatePage = lazy(() => import('./Cyber Security Training Certificate/CyberSecurityTrainingCertificatePage'));
const CyberCrimeInvestigationCertificatePage = lazy(() => import('./Cyber Crime Investigation Certificate/CyberCrimeInvestigationCertificatePage'));
const DigitalForensicsCertificatePage = lazy(() => import('./Digital Forensics Certificate/DigitalForensicsCertificatePage'));
const CyberEthicsCertificatePage = lazy(() => import('./Cyber Ethics Certificate/CyberEthicsCertificatePage'));
const AIAndCyberSecurityCertificatePage = lazy(() => import('./AI & Cyber Security Certificate/AIAndCyberSecurityCertificatePage'));
const CyberSafetyAmbassadorCertificatePage = lazy(() => import('./Cyber Safety Ambassador Certificate/CyberSafetyAmbassadorCertificatePage'));
const CyberIncidentResponseCertificatePage = lazy(() => import('./Cyber Incident Response Certificate/CyberIncidentResponseCertificatePage'));
const EthicalHackingCertificatePage = lazy(() => import('./Ethical Hacking Certificate/EthicalHackingCertificatePage'));
const CyberThreatIntelligenceCertificatePage = lazy(() => import('./Cyber Threat Intelligence Certificate/CyberThreatIntelligenceCertificatePage'));
const NetworkSecurityCertificatePage = lazy(() => import('./Network Security Certificate/NetworkSecurityCertificatePage'));
const DigitalLiteracyCertificatePage = lazy(() => import('./Digital Literacy Certificate/DigitalLiteracyCertificatePage'));
const TechnicalSkillDevelopmentCertificatePage = lazy(() => import('./Technical Skill Development Certificate/TechnicalSkillDevelopmentCertificatePage'));
const ProfessionalDevelopmentCertificatePage = lazy(() => import('./Professional Development Certificate/ProfessionalDevelopmentCertificatePage'));
const InformationSecurityCertificatePage = lazy(() => import('./Information Security Certificate/InformationSecurityCertificatePage'));
const CyberRiskManagementCertificatePage = lazy(() => import('./Cyber Risk Management Certificate/CyberRiskManagementCertificatePage'));

const certificateMap = {
  'internship-certificate': InternshipCertificatePage,
  'training-certificate': TrainingCertificatePage,
  'course-certificate': CourseCertificatePage,
  'education-certificate': EducationCertificatePage,
  'experience-certificate': ExperienceCertificatePage,
  'legal-education-certificate': LegalEducationCertificatePage,
  'technical-education-certificate': TechnicalEducationCertificatePage,
  'professional-education-certificate': ProfessionalEducationCertificatePage,
  'general-education-certificate': GeneralEducationCertificatePage,
  'seminar-certificate': SeminarCertificatePage,
  'webinar-certificate': WebinarCertificatePage,
  'workshop-certificate': WorkshopCertificatePage,
  'participation-certificate': ParticipationCertificatePage,
  'membership-certificate': MembershipCertificatePage,
  'appreciation-certificate': AppreciationCertificatePage,
  'achievement-certificate': AchievementCertificatePage,
  'recognition-certificate': RecognitionCertificatePage,
  'excellence-award-certificate': ExcellenceAwardCertificatePage,
  'outstanding-performance-certificate': OutstandingPerformanceCertificatePage,
  'best-performer-certificate': BestPerformerCertificatePage,
  'employee-of-the-month-certificate': EmployeeOfTheMonthCertificatePage,
  'mentorship-certificate': MentorshipCertificatePage,
  'research-contribution-certificate': ResearchContributionCertificatePage,
  'project-completion-certificate': ProjectCompletionCertificatePage,
  'cyber-awareness-certificate': CyberAwarenessCertificatePage,
  'cyber-security-training-certificate': CyberSecurityTrainingCertificatePage,
  'cyber-crime-investigation-certificate': CyberCrimeInvestigationCertificatePage,
  'digital-forensics-certificate': DigitalForensicsCertificatePage,
  'cyber-ethics-certificate': CyberEthicsCertificatePage,
  'ai-&-cyber-security-certificate': AIAndCyberSecurityCertificatePage,
  'ai-and-cyber-security-certificate': AIAndCyberSecurityCertificatePage,
  'ai-cyber-security-certificate': AIAndCyberSecurityCertificatePage,
  'cyber-safety-ambassador-certificate': CyberSafetyAmbassadorCertificatePage,
  'cyber-incident-response-certificate': CyberIncidentResponseCertificatePage,
  'ethical-hacking-certificate': EthicalHackingCertificatePage,
  'cyber-threat-intelligence-certificate': CyberThreatIntelligenceCertificatePage,
  'network-security-certificate': NetworkSecurityCertificatePage,
  'digital-literacy-certificate': DigitalLiteracyCertificatePage,
  'technical-skill-development-certificate': TechnicalSkillDevelopmentCertificatePage,
  'professional-development-certificate': ProfessionalDevelopmentCertificatePage,
  'information-security-certificate': InformationSecurityCertificatePage,
  'cyber-risk-management-certificate': CyberRiskManagementCertificatePage,
};

export default function CertificateSlugDispatcher() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const normalizedSlug = (slug || '').toLowerCase();

  const MatchedComponent = certificateMap[normalizedSlug];

  if (!MatchedComponent) {
    return <ComingSoonPage />;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f4cd9]"></div>
      </div>
    }>
      <MatchedComponent onBack={() => navigate('/recruitment/certificate-verification')} />
    </Suspense>
  );
}
