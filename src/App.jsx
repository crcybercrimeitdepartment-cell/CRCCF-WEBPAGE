import { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LazySection from './components/common/LazySection'

// --- ALWAYS EAGER (layouts, scroll util, above-the-fold home components) ---
import RouteMetadata from './components/common/RouteMetadata'
import ScrollToTop from './components/ScrollToTop'
import EventBanner from './components/EventBanner'
import Hero from './components/Hero'
import RootLayout from './layouts/RootLayout'
import AboutLayout from './layouts/AboutLayout'

// --- SHARED DATA (tiny, needed at route registration) ---
import { reportCards } from './data/report/reportCards'
import { softwareCards } from './data/software/softwareCards'

// Removed unused icons
// ─── LAZY: Homepage sections (below the fold) ────────────────────────────────
const WhoWeAre           = lazy(() => import('./components/WhoWeAre'))
const Introduction       = lazy(() => import('./components/Introduction'))
const WhatWeDo           = lazy(() => import('./components/WhatWeDo'))
const TechnologyStack    = lazy(() => import('./components/TechnologyStack'))
const ProjectsPortfolio  = lazy(() => import('./components/ProjectsPortfolio'))
const InternshipPrograms = lazy(() => import('./components/InternshipPrograms'))
const StatsBar           = lazy(() => import('./components/StatsBar'))
const Testimonials       = lazy(() => import('./components/Testimonials'))
const CareerOpportunities= lazy(() => import('./components/CareerOpportunities'))
const WhyChooseUs        = lazy(() => import('./components/WhyChooseUs'))
const Activities         = lazy(() => import('./components/Activities'))

// ─── LAZY: Gallery ───────────────────────────────────────────────────────────
const GalleryPage        = lazy(() => import('./pages/GalleryPage'))
const GalleryLandingPage = lazy(() => import('./pages/GalleryLandingPage'))
const CategoryPage       = lazy(() => import('./pages/CategoryPage'))

// ─── LAZY: General Pages ─────────────────────────────────────────────────────
const BuildingAnimationPage = lazy(() => import('./pages/BuildingAnimation/BuildingAnimationPage.jsx'))
const ReachUsPage        = lazy(() => import('./pages/ReachUsPage'))
const InsightsPage       = lazy(() => import('./pages/InsightsPage'))
const ServiceRouter      = lazy(() => import('./pages/Service/ServiceRouter'))
const SoftwareComingSoon = lazy(() => import('./pages/SoftwareComingSoon'))
const SoftwareProductDetailComingSoon = lazy(() => import('./pages/SoftwareProductDetailComingSoon'))
const ComingSoonPage     = lazy(() => import('./pages/common/ComingSoonPage'))

// ─── LAZY: Software Products ──────────────────────────────────────────────────
const DemoIconPage = lazy(() => import('./pages/Software products/demoicon'))
const DevelopedSoftwareProductsPage = lazy(() => import('./pages/Software products/Developed Software Products/DevelopedSoftwareProductsPage'))
const ProductsUnderDevelopmentPage = lazy(() => import('./pages/Software products/Products Under Development/ProductsUnderDevelopmentPage'))
const UpcomingSoftwareInnovationsPage = lazy(() => import('./pages/Software products/Upcoming Software Innovations/UpcomingSoftwareInnovationsPage'))
const CyberSecuritySoftwareSolutionsPage = lazy(() => import('./pages/Software products/Cyber Security Software Solutions/CyberSecuritySoftwareSolutionsPage'))
const AIAutomationProductsPage = lazy(() => import('./pages/Software products/AI & Automation Products/AIAutomationProductsPage'))
const MobileApplicationProductsPage = lazy(() => import('./pages/Software products/Mobile Application Products/MobileApplicationProductsPage'))
const WebBasedDigitalPlatformsPage = lazy(() => import('./pages/Software products/Web-Based Digital Platforms/WebBasedDigitalPlatformsPage'))
const EnterpriseSoftwareSolutionsPage = lazy(() => import('./pages/Software products/Enterprise Software Solutions/EnterpriseSoftwareSolutionsPage'))
const EducationalTechnologyProductsPage = lazy(() => import('./pages/Software products/Educational Technology Products/EducationalTechnologyProductsPage'))
const DataAnalyticsAndReportingToolsPage = lazy(() => import('./pages/Software products/Data Analytics & Reporting Tools/DataAnalyticsAndReportingToolsPage'))
const CloudBasedSoftwareSolutionsPage = lazy(() => import('./pages/Software products/Cloud-Based Software Solutions/CloudBasedSoftwareSolutionsPage'))
const ResearchAndDevelopmentProductsPage = lazy(() => import('./pages/Software products/Research & Development Products/ResearchAndDevelopmentProductsPage'))
const CyberCrimeInvestigationSoftwarePage = lazy(() => import('./pages/Software products/Cyber Crime Investigation Software/CyberCrimeInvestigationSoftwarePage'))
const CyberSecuritySoftwarePage = lazy(() => import('./pages/Software products/Cyber Security Software/CyberSecuritySoftwarePage'))
const CyberCrimeAwarenessSoftwarePage = lazy(() => import('./pages/Software products/Cyber Crime Awareness Software/CyberCrimeAwarenessSoftwarePage'))
const CyberCrimeVictimSupportSoftwarePage = lazy(() => import('./pages/Software products/Cyber Crime Victim Support Software/CyberCrimeVictimSupportSoftwarePage'))
const CaseTrackingSoftwarePage = lazy(() => import('./pages/Software products/Case Tracking Software/CaseTrackingSoftwarePage'))
const CyberIntelligenceSoftwarePage = lazy(() => import('./pages/Software products/Cyber Intelligence Software/CyberIntelligenceSoftwarePage'))
const DigitalForensicSupportToolsPage = lazy(() => import('./pages/Software products/Digital Forensic Support Tools/DigitalForensicSupportToolsPage'))
const TrainingAndInternshipManagementSoftwarePage = lazy(() => import('./pages/Software products/Training & Internship Management Software/TrainingAndInternshipManagementSoftwarePage'))
const UserSupportAndHelpdeskSoftwarePage = lazy(() => import('./pages/Software products/User Support & Helpdesk Software/UserSupportAndHelpdeskSoftwarePage'))
const HRRecruitmentManagementSoftwarePage = lazy(() => import('./pages/Software products/HR & Recruitment Management Software/HRRecruitmentManagementSoftwarePage'))
const PoliceInvestigationToolsAndSoftwarePage = lazy(() => import('./pages/Software products/Police Investigation Tools and Software/PoliceInvestigationToolsAndSoftwarePage'))
const SoftwareProductOverviewPage = lazy(() => import('./pages/Software products/Software Product Overview/SoftwareProductOverviewPage'))

// ─── LAZY: Contact Hub ───────────────────────────────────────────────────────
const ContactRouter      = lazy(() => import('./pages/Contact/ContactRouter'))

// ─── LAZY: About Us ──────────────────────────────────────────────────────────
const AboutPage                = lazy(() => import('./pages/AboutUs/AboutPage'))
const OurIdentity              = lazy(() => import('./pages/AboutUs/OurIdentity'))
const IntroductionOfCRCCF      = lazy(() => import('./pages/AboutUs/IntroductionOfCRCCF'))
const WhatWeDoAbout            = lazy(() => import('./pages/AboutUs/WhatWeDo'))
const MissionVision            = lazy(() => import('./pages/AboutUs/MissionVision'))
const OurActivity              = lazy(() => import('./pages/AboutUs/OurActivity'))
const Purpose                  = lazy(() => import('./pages/AboutUs/Purpose'))
const Objective                = lazy(() => import('./pages/AboutUs/Objective'))
const Achievement              = lazy(() => import('./pages/AboutUs/Achievement'))
const LegalComplianceRouter    = lazy(() => import('./pages/AboutUs/LegalComplianceRouter'))
const PrivacyPolicy            = lazy(() => import('./pages/AboutUs/PrivacyPolicy'))
const MeaningBehindOurNamePage = lazy(() => import('./pages/AboutUs/MeaningBehindOurNamePage'))
const TermsConditions          = lazy(() => import('./pages/AboutUs/TermsConditions'))
const RulesRegulation          = lazy(() => import('./pages/AboutUs/RulesRegulation'))
const Instruction              = lazy(() => import('./pages/AboutUs/Instruction'))
const LegalDisclaimer          = lazy(() => import('./pages/AboutUs/LegalDisclaimer'))
const CopyrightRegistration    = lazy(() => import('./pages/AboutUs/CopyrightRegistration'))
const PartnershipCollaboration = lazy(() => import('./pages/AboutUs/PartnershipCollaboration'))
const History                  = lazy(() => import('./pages/AboutUs/History'))

// ─── LAZY: Report ────────────────────────────────────────────────────────────
const ReportCrimePage    = lazy(() => import('./pages/report/ReportCrimePage'))
const ReportComingSoon   = lazy(() => import('./pages/report/ReportComingSoon'))
const RightsOfCybercrimeVictimsEmpoweringYouwithCRCCFPage = lazy(() => import("./pages/report/VictimRightsAndSupport/RightsOfCybercrimeVictimsEmpoweringYouwithCRCCFPage"))
const VictimAssistanceAndProtectionPage = lazy(() => import("./pages/report/VictimRightsAndSupport/VictimAssistanceAndProtectionPage"))
const CybercrimeVictimRightsAndReliefPage = lazy(() => import("./pages/report/VictimRightsAndSupport/CybercrimeVictimRightsAndReliefPage"))
const DigitalCrimeVictimHelpDeskPage = lazy(() => import("./pages/report/VictimRightsAndSupport/DigitalCrimeVictimHelpDeskPage"))
const SupportServicesforVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/SupportServicesforVictimsPage"))
const HelpAndJusticeforVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/HelpAndJusticeforVictimsPage"))
const EmpoweringCybercrimeVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/EmpoweringCybercrimeVictimsPage"))
const DigitalVictimSupportAndProtectionPage = lazy(() => import("./pages/report/VictimRightsAndSupport/DigitalVictimSupportAndProtectionPage"))
const VictimProtectionAndLegalAidPage = lazy(() => import("./pages/report/VictimRightsAndSupport/VictimProtectionAndLegalAidPage"))
const OnlineHarassmentHelpAndRightsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/OnlineHarassmentHelpAndRightsPage"))
const CyberJusticeforVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/CyberJusticeforVictimsPage"))
const CybercrimeVictimAdvocacyPage = lazy(() => import("./pages/report/VictimRightsAndSupport/CybercrimeVictimAdvocacyPage"))
const OnlineSafetyAndVictimHelpPage = lazy(() => import("./pages/report/VictimRightsAndSupport/OnlineSafetyAndVictimHelpPage"))
const JusticeAndHealingforVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/JusticeAndHealingforVictimsPage"))
const RestoringDignitytoCyberVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/RestoringDignitytoCyberVictimsPage"))
const DigitalJusticeSupportServicesPage = lazy(() => import("./pages/report/VictimRightsAndSupport/DigitalJusticeSupportServicesPage"))
const VictimOutreachAndLegalSupportPage = lazy(() => import("./pages/report/VictimRightsAndSupport/VictimOutreachAndLegalSupportPage"))
const PsychologicalCounsellingforCyberVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/PsychologicalCounsellingforCyberVictimsPage"))
const VictimHelplineAndChatSupportPage = lazy(() => import("./pages/report/VictimRightsAndSupport/VictimHelplineAndChatSupportPage"))
const WomenAndChildCyberSafetySupportPage = lazy(() => import("./pages/report/VictimRightsAndSupport/WomenAndChildCyberSafetySupportPage"))
const LegalGuidanceforDigitalCrimeVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/LegalGuidanceforDigitalCrimeVictimsPage"))
const DataPrivacyAndProtectionSupportPage = lazy(() => import("./pages/report/VictimRightsAndSupport/DataPrivacyAndProtectionSupportPage"))
const SocialMediaMisuseVictimAidPage = lazy(() => import("./pages/report/VictimRightsAndSupport/SocialMediaMisuseVictimAidPage"))
const PhishingAndOnlineScamVictimSupportPage = lazy(() => import("./pages/report/VictimRightsAndSupport/PhishingAndOnlineScamVictimSupportPage"))
const CyberExtortionAndBlackmailResponseTeamPage = lazy(() => import("./pages/report/VictimRightsAndSupport/CyberExtortionAndBlackmailResponseTeamPage"))
const DigitalForensicsAssistanceforVictimsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/DigitalForensicsAssistanceforVictimsPage"))
const EducationalResourcesforVictimRightsPage = lazy(() => import("./pages/report/VictimRightsAndSupport/EducationalResourcesforVictimRightsPage"))
const CyberVictimReliefEmergencyResponsePage = lazy(() => import("./pages/report/VictimRightsAndSupport/CyberVictimReliefEmergencyResponsePage"))
const ReportACyberCrimeVictimRightandSupportPage = lazy(() => import('./pages/report/ReportACyberCrimeVictimRightandSupportPage'))
const CyberSecurityTipsPage = lazy(() => import('./pages/report/CyberSecurityTipsPage'))
const AwarenessAndPreventionTipsPage = lazy(() => import('./pages/report/Awareness&PreventionTipsPage'))
const CyberSafetyAndSupportForGirlsAndWomenPage = lazy(() => import('./pages/report/CyberSafetyAndSupportForGirlsAndWomenPage.jsx'))
const LegalGuidanceAndAwarenessPage = lazy(() => import('./pages/report/LegalGuidance&AwarenessPage'))
const CyberLawsAndRightsPage = lazy(() => import('./pages/report/CyberLawsAndRightsPage'))
// ─── LAZY: Skill Development ─────────────────────────────────────────────────
const SkillDevelopmentPage   = lazy(() => import('./pages/SkillDevelopment/SkillDevelopmentPage'))
const SkillDevelopmentDetail = lazy(() => import('./pages/SkillDevelopment/SkillDevelopmentDetail'))
const TalentPlacementProgram = lazy(() => import('./pages/SkillDevelopment/TalentPlacementProgram'))
const CareerGuidance         = lazy(() => import('./pages/SkillDevelopment/CareerGuidance'))
const AwarenessProgram       = lazy(() => import('./pages/SkillDevelopment/AwarenessProgram'))
const ResearchPage           = lazy(() => import('./pages/SkillDevelopment/ResearchPage'))
const CorporateTrainingPage  = lazy(() => import('./pages/SkillDevelopment/CorporateTrainingPage'))
const HackathonPage          = lazy(() => import('./pages/SkillDevelopment/HackathonPage'))
const TrainingProgramPage    = lazy(() => import('./pages/SkillDevelopment/TrainingProgramPage'))
const InternshipPage         = lazy(() => import('./pages/SkillDevelopment/InternshipPage'))
const InternshipDetailPage   = lazy(() => import('./pages/SkillDevelopment/InternshipPage').then(m => ({ default: m.InternshipDetailPage })))
const CoursePage             = lazy(() => import('./pages/SkillDevelopment/CoursePage'))
const MentorshipProgramsPage = lazy(() => import('./pages/SkillDevelopment/MentorshipProgramsPage'))
const WorkshopPage           = lazy(() => import('./pages/SkillDevelopment/Workshop/WorkshopPage'))
// ─── LAZY: Resources ─────────────────────────────────────────────────────────
const CourseMaterials        = lazy(() => import('./pages/Resources/CourseMaterials'))
const PracticalTraining      = lazy(() => import('./pages/Resources/PracticalTraining'))
const MentorshipEvaluation   = lazy(() => import('./pages/Resources/MentorshipEvaluation'))
const LearningEnvironment    = lazy(() => import('./pages/Resources/LearningEnvironment'))

// ─── LAZY: Recruitment ───────────────────────────────────────────────────────
const RecruitmentPortal         = lazy(() => import('./pages/recruitment/RecruitmentPortal'))
const CurrentVacancyPage        = lazy(() => import('./pages/recruitment/Current Vacancy/CurrentVacancyPage'))
const JobVacancyNewPage         = lazy(() => import('./pages/recruitment/Current Vacancy/Job Vacancy/JobVacancyPage'))
const PostVacancyPage           = lazy(() => import('./pages/recruitment/Current Vacancy/Post Vacancy/PostVacancyPage'))
const InternshipVacancyPage     = lazy(() => import('./pages/recruitment/Current Vacancy/Internship Vacancy/InternshipVacancyPage'))
const VacancyCard1Page          = lazy(() => import('./pages/recruitment/Current Vacancy/Vacancy Card 1/VacancyCard1Page'))
const VacancyCard2Page          = lazy(() => import('./pages/recruitment/Current Vacancy/Vacancy Card 2/VacancyCard2Page'))
const VacancyCard3Page          = lazy(() => import('./pages/recruitment/Current Vacancy/Vacancy Card 3/VacancyCard3Page'))
const VacancyCard4Page          = lazy(() => import('./pages/recruitment/Current Vacancy/Vacancy Card 4/VacancyCard4Page'))
const VacancyCard5Page          = lazy(() => import('./pages/recruitment/Current Vacancy/Vacancy Card 5/VacancyCard5Page'))
const JobVacancy                = lazy(() => import('./pages/recruitment/JobVacancy'))
const JobVacancyPage            = lazy(() => import('./pages/recruitment/Current Vacancy/Job Vacancy/JobDetailPage'))
const CandidateMasterProfileFormPage = lazy(() => import('./pages/recruitment/Current Vacancy/Job Vacancy/New Registration Form/CandidateMasterProfileFormPage'))
const DocumentVerificationDepartment = lazy(() => import('./pages/recruitment/Document Verification/DocumentVerificationDepartment'))
const OnlineApplicationPortal   = lazy(() => import('./pages/recruitment/Online Application Portal/OnlineApplicationPortal'))
// ─── LAZY: Online Application Portal Forms ────────────────────────────────────
const Form10thCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/10th Certificate Application Form/10thCertificateApplicationFormPage'))
const Form12thCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/12th Certificate Application Form/12thCertificateApplicationFormPage'))
const ITICertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/ITI Certificate Application Form/ITICertificateApplicationFormPage'))
const DiplomaCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Diploma Certificate Application Form/DiplomaCertificateApplicationFormPage'))
const DegreeCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Degree Certificate Application Form/DegreeCertificateApplicationFormPage'))
const MasterDegreeCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Master Degree Certificate Application Form/MasterDegreeCertificateApplicationFormPage'))
const SeminarRegistrationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Seminar Registration Form/SeminarRegistrationFormPage'))
const WebinarRegistrationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Webinar Registration Form/WebinarRegistrationFormPage'))
const WorkshopRegistrationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Workshop Registration Form/WorkshopRegistrationFormPage'))
const InstitutionalTrainingRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Institutional Training Request Form/InstitutionalTrainingRequestFormPage'))
const CyberAwarenessProgramRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Cyber Awareness Program Request Form/CyberAwarenessProgramRequestFormPage'))
const CollaborationApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Collaboration Application Form/CollaborationApplicationFormPage'))
const PartnershipApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Partnership Application Form/PartnershipApplicationFormPage'))
const ResearcherApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Researcher Application Form/ResearcherApplicationFormPage'))
const FreelanceConsultantApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Freelance - Consultant Application Form/FreelanceConsultantApplicationFormPage'))
const VolunteerApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Volunteer Application Form/VolunteerApplicationFormPage'))
const JobApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Job Application Form/JobApplicationFormPage'))
const EventParticipationApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Event Participation Application Form/EventParticipationApplicationFormPage'))
const DuplicateIDCardApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Duplicate ID Card Application Form/DuplicateIDCardApplicationFormPage'))
const DuplicateCertificateApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Duplicate Certificate Application Form/DuplicateCertificateApplicationFormPage'))
const SoftwareProductPurchaseRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Software Product Purchase Request Form/SoftwareProductPurchaseRequestFormPage'))
const SoftwareProductDemoRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Software Product Demo Request Form/SoftwareProductDemoRequestFormPage'))
const TechnicalSupportRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Technical Support Request Form/TechnicalSupportRequestFormPage'))
const MembershipApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Membership Application Form/MembershipApplicationFormPage'))
const MembershipRenewalApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Membership Renewal Application Form/MembershipRenewalApplicationFormPage'))
const FeedbackAndSuggestionFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Feedback & Suggestion Form/FeedbackAndSuggestionFormPage'))
const GrievanceSubmissionFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Grievance Submission Form/GrievanceSubmissionFormPage'))
const ComplaintSubmissionFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Complaint Submission Form/ComplaintSubmissionFormPage'))
const SponsorshipApplicationFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/Sponsorship Application Form/SponsorshipApplicationFormPage'))
const GeneralInquiryInformationRequestFormPage = lazy(() => import('./pages/recruitment/Online Application Portal/General Inquiry - Information Request Form/GeneralInquiryInformationRequestFormPage'))
const RecruitmentAdvertisements = lazy(() => import('./pages/recruitment/RecruitmentAdvertisements'))
const PressReleaseNotices       = lazy(() => import('./pages/recruitment/PressReleaseNotices'))
const ApplicationStatus         = lazy(() => import('./pages/recruitment/ApplicationStatus'))
const SubmitResume              = lazy(() => import('./pages/recruitment/SubmitResume'))
const CertificateVerification   = lazy(() => import('./pages/recruitment/CertificateVerification'))
const CertificateComingSoon     = lazy(() => import('./pages/recruitment/CertificateComingSoon'))
const IdCardVerificationPage     = lazy(() => import('./pages/recruitment/ID Card Verification/IdCardVerificationPage'))

// ─── LAZY: Recruitment Rules & Policies ──────────────────────────────────────
const RecruitmentRulesPolicies             = lazy(() => import('./pages/recruitment/rules/RecruitmentRulesPolicies'))

// ─── Shared Loading Fallback ─────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[200px] w-full">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

function HomePageContent() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <EventBanner />
      <main>
        {/* Hero is above-the-fold — always eager */}
        <Hero />

        {/* Immediately below fold — load slightly early */}
        <LazySection rootMargin="300px">
          <Suspense fallback={<PageLoader />}>
            <WhoWeAre />
            <Introduction />
            <WhatWeDo />
          </Suspense>
        </LazySection>

        {/* Mid-page sections */}
        <LazySection rootMargin="200px">
          <Suspense fallback={<PageLoader />}>
            <Activities />
            <TechnologyStack />
            <ProjectsPortfolio />
          </Suspense>
        </LazySection>

        {/* Lower sections — defer more aggressively */}
        <LazySection rootMargin="150px">
          <Suspense fallback={<PageLoader />}>
            <InternshipPrograms />
            <WhyChooseUs />
            <CareerOpportunities />
            <StatsBar />
            <Testimonials />
          </Suspense>
        </LazySection>
      </main>

      <AnimatePresence>
        {showTop && (
          <motion.button
            aria-label="Scroll to top"
            className="fixed bottom-[28px] right-[28px] z-[500] w-[44px] h-[44px] bg-[#1A56DB] text-[#fff] border-none rounded-[50%] flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(26,86,219,0.40)]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: .5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: .95 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <RouteMetadata />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AnimationWrapper />} />
          <Route element={<RootLayout />}>
            <Route path="/homepage" element={<HomePageContent />} />
            <Route path="/gallery-collections" element={<GalleryLandingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/category/:id" element={<CategoryPage />} />
            <Route path="/reachus" element={<ReachUsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/software-products" element={<SoftwareComingSoon />} />
            <Route path="/services/*" element={<ServiceRouter />} />
            <Route path="/report-crime" element={<ReportCrimePage />} />
            <Route path="/report-crime/victim-rights-support" element={<ReportACyberCrimeVictimRightandSupportPage />} />
<Route path="/report-crime/victim-rights-support/right-of-cybercrime-victims" element={<RightsOfCybercrimeVictimsEmpoweringYouwithCRCCFPage />} />
<Route path="/report-crime/victim-rights-support/victim-assistance-protection" element={<VictimAssistanceAndProtectionPage />} />
<Route path="/report-crime/victim-rights-support/cybercrime-victim-rights-relief" element={<CybercrimeVictimRightsAndReliefPage />} />
<Route path="/report-crime/victim-rights-support/digital-crime-victim-help-desk" element={<DigitalCrimeVictimHelpDeskPage />} />
<Route path="/report-crime/victim-rights-support/support-services-for-victims" element={<SupportServicesforVictimsPage />} />
<Route path="/report-crime/victim-rights-support/help-justice-for-victims" element={<HelpAndJusticeforVictimsPage />} />
<Route path="/report-crime/victim-rights-support/empowering-cybercrime-victims" element={<EmpoweringCybercrimeVictimsPage />} />
<Route path="/report-crime/victim-rights-support/digital-victim-support-protection" element={<DigitalVictimSupportAndProtectionPage />} />
<Route path="/report-crime/victim-rights-support/victim-protection-legal-aid" element={<VictimProtectionAndLegalAidPage />} />
<Route path="/report-crime/victim-rights-support/online-harassment-help-rights" element={<OnlineHarassmentHelpAndRightsPage />} />
<Route path="/report-crime/victim-rights-support/cyber-justice-for-victims" element={<CyberJusticeforVictimsPage />} />
<Route path="/report-crime/victim-rights-support/cybercrime-victim-advocacy" element={<CybercrimeVictimAdvocacyPage />} />
<Route path="/report-crime/victim-rights-support/online-safety-victim-help" element={<OnlineSafetyAndVictimHelpPage />} />
<Route path="/report-crime/victim-rights-support/justice-healing-for-victims" element={<JusticeAndHealingforVictimsPage />} />
<Route path="/report-crime/victim-rights-support/restoring-dignity-to-cyber-victims" element={<RestoringDignitytoCyberVictimsPage />} />
<Route path="/report-crime/victim-rights-support/digital-justice-support-services" element={<DigitalJusticeSupportServicesPage />} />
<Route path="/report-crime/victim-rights-support/victim-outreach-legal-support" element={<VictimOutreachAndLegalSupportPage />} />
<Route path="/report-crime/victim-rights-support/psychological-counselling-for-cyber-victims" element={<PsychologicalCounsellingforCyberVictimsPage />} />
<Route path="/report-crime/victim-rights-support/victim-helpline-chat-support" element={<VictimHelplineAndChatSupportPage />} />
<Route path="/report-crime/victim-rights-support/women-child-cyber-safety-support" element={<WomenAndChildCyberSafetySupportPage />} />
<Route path="/report-crime/victim-rights-support/legal-guidance-for-digital-crime-victims" element={<LegalGuidanceforDigitalCrimeVictimsPage />} />
<Route path="/report-crime/victim-rights-support/data-privacy-protection-support" element={<DataPrivacyAndProtectionSupportPage />} />
<Route path="/report-crime/victim-rights-support/social-media-misuse-victim-aid" element={<SocialMediaMisuseVictimAidPage />} />
<Route path="/report-crime/victim-rights-support/phishing-online-scam-victim-support" element={<PhishingAndOnlineScamVictimSupportPage />} />
<Route path="/report-crime/victim-rights-support/cyber-extortion-blackmail-response-team" element={<CyberExtortionAndBlackmailResponseTeamPage />} />
<Route path="/report-crime/victim-rights-support/digital-forensics-assistance-for-victims" element={<DigitalForensicsAssistanceforVictimsPage />} />
<Route path="/report-crime/victim-rights-support/educational-resources-for-victim-rights" element={<EducationalResourcesforVictimRightsPage />} />
<Route path="/report-crime/victim-rights-support/cyber-victim-relief-emergency-response" element={<CyberVictimReliefEmergencyResponsePage />} />

            <Route path="/report-crime/cyber-security-tips" element={<CyberSecurityTipsPage />} />
            <Route path="/report-crime/awareness-prevention-tips" element={<AwarenessAndPreventionTipsPage />} />
            <Route path="/report-crime/cyber-safety-women" element={<CyberSafetyAndSupportForGirlsAndWomenPage />} />
            <Route path="/report-crime/legal-guidance-awareness" element={<LegalGuidanceAndAwarenessPage />} />
            <Route path="/report-crime/cyber-laws-and-rights" element={<CyberLawsAndRightsPage />} />

            {/* Dynamic report coming soon pages */}
            {reportCards.map((card) => (
              <Route
                key={card.path}
                path={card.path}
                element={<ReportComingSoon title={card.title} />}
              />
            ))}

            {/* Software Product Pages */}
            <Route path="/software-products/developed-software-products" element={<DevelopedSoftwareProductsPage />} />
            <Route path="/software-products/products-under-development" element={<DemoIconPage />} />
            <Route path="/software-products/upcoming-software-innovations" element={<DemoIconPage />} />
            <Route path="/software-products/cyber-security-software-solutions" element={<CyberSecuritySoftwareSolutionsPage />} />
            <Route path="/software-products/ai-automation-products" element={<DemoIconPage />} />
            <Route path="/software-products/mobile-application-products" element={<DemoIconPage />} />
            <Route path="/software-products/web-based-digital-platforms" element={<DemoIconPage />} />
            <Route path="/software-products/enterprise-software-solutions" element={<EnterpriseSoftwareSolutionsPage />} />
            <Route path="/software-products/educational-technology-products" element={<DemoIconPage />} />
            <Route path="/software-products/data-analytics-reporting-tools" element={<DemoIconPage />} />
            <Route path="/software-products/cloud-based-software-solutions" element={<CloudBasedSoftwareSolutionsPage />} />
            <Route path="/software-products/research-development-products" element={<DemoIconPage />} />
            <Route path="/software-products/cyber-crime-investigation-software" element={<CyberCrimeInvestigationSoftwarePage />} />
            <Route path="/software-products/cyber-security-software" element={<CyberSecuritySoftwarePage />} />
            <Route path="/software-products/cyber-crime-awareness-software" element={<CyberCrimeAwarenessSoftwarePage />} />
            <Route path="/software-products/cyber-crime-victim-support-software" element={<CyberCrimeVictimSupportSoftwarePage />} />
            <Route path="/software-products/case-tracking-software" element={<CaseTrackingSoftwarePage />} />
            <Route path="/software-products/cyber-intelligence-software" element={<CyberIntelligenceSoftwarePage />} />
            <Route path="/software-products/digital-forensic-support-tools" element={<DemoIconPage />} />
            <Route path="/software-products/training-internship-management-software" element={<DemoIconPage />} />
            <Route path="/software-products/user-support-helpdesk-software" element={<DemoIconPage />} />
            <Route path="/software-products/hr-recruitment-management-software" element={<DemoIconPage />} />
            <Route path="/software-products/report-generation-software" element={<DemoIconPage />} />
            <Route path="/software-products/software-product-overview" element={<SoftwareProductOverviewPage />} />

            {/* Skill Development */}
            <Route path="/skill-development" element={<SkillDevelopmentPage />} />
            <Route path="/skill-development/internships" element={<InternshipPage />} />
            <Route path="/skill-development/courses/*" element={<CoursePage />} />
            <Route path="/internship/:id" element={<InternshipDetailPage />} />
            <Route path="/skill-development/placement" element={<TalentPlacementProgram />} />
            <Route path="/skill-development/career" element={<CareerGuidance />} />
            <Route path="/skill-development/awareness" element={<AwarenessProgram />} />
            <Route path="/skill-development/mentorship/*" element={<MentorshipProgramsPage />} />
            <Route path="/skill-development/research/*" element={<ResearchPage />} />
            <Route path="/skill-development/corporate/*" element={<CorporateTrainingPage />} />
            <Route path="/skill-development/hackathons/*" element={<HackathonPage />} />
            <Route path="/skill-development/workshops/*" element={<WorkshopPage darkMode={false} setDarkMode={() => {}} />} />
            <Route path="/skill-development/training/*" element={<TrainingProgramPage />} />
            <Route path="/skill-development/:slug" element={<SkillDevelopmentDetail />} />

            {/* Resources */}
            <Route path="/resources/course-materials" element={<CourseMaterials />} />
            <Route path="/resources/practical-training" element={<PracticalTraining />} />
            <Route path="/resources/mentorship-evaluation" element={<MentorshipEvaluation />} />
            <Route path="/resources/learning-environment" element={<LearningEnvironment />} />

            {/* Contact Hub */}
            <Route path="/contact/*" element={<ContactRouter />} />

            {/* About Section */}
            <Route path="/about" element={<AboutLayout />}>
              <Route index element={<AboutPage />} />
              <Route path="identity" element={<OurIdentity />} />
              <Route path="introduction" element={<IntroductionOfCRCCF />} />
              <Route path="what-we-do" element={<WhatWeDoAbout />} />
              <Route path="mission-vision" element={<MissionVision />} />
              <Route path="activity" element={<OurActivity />} />
              <Route path="purpose" element={<Purpose />} />
              <Route path="objective" element={<Objective />} />
              <Route path="achievement" element={<Achievement />} />
              <Route path="legal-compliance/*" element={<LegalComplianceRouter />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="data-protection" element={<MeaningBehindOurNamePage />} />
              <Route path="terms-conditions" element={<TermsConditions />} />
              <Route path="rules-regulation" element={<RulesRegulation />} />
              <Route path="instruction" element={<Instruction />} />
              <Route path="legal-disclaimer" element={<LegalDisclaimer />} />
              <Route path="copyright" element={<CopyrightRegistration />} />
              <Route path="partnership" element={<PartnershipCollaboration />} />
              <Route path="history" element={<History />} />
            </Route>

            {/* Recruitment / Careers */}
            <Route path="/careers" element={<RecruitmentPortal />} />
            <Route path="/recruitment" element={<RecruitmentPortal />} />
            <Route path="/recruitment/job-vacancy" element={<JobVacancy />} />
            <Route path="/recruitment/job-vacancy-details" element={<JobVacancyPage />} />
            <Route path="/recruitment/current-vacancy" element={<CurrentVacancyPage />} />
            <Route path="/recruitment/current-vacancy/job-vacancy" element={<JobVacancyNewPage />} />
            <Route path="/recruitment/current-vacancy/job-vacancy/new-registration" element={<CandidateMasterProfileFormPage />} />
            <Route path="/recruitment/job-vacancy/new-registration" element={<CandidateMasterProfileFormPage />} />
            <Route path="/recruitment/current-vacancy/post-vacancy" element={<PostVacancyPage />} />
            <Route path="/recruitment/current-vacancy/internship-vacancy" element={<InternshipVacancyPage />} />
            <Route path="/recruitment/current-vacancy/vacancy-card-1" element={<VacancyCard1Page />} />
            <Route path="/recruitment/current-vacancy/vacancy-card-2" element={<VacancyCard2Page />} />
            <Route path="/recruitment/current-vacancy/vacancy-card-3" element={<VacancyCard3Page />} />
            <Route path="/recruitment/current-vacancy/vacancy-card-4" element={<VacancyCard4Page />} />
            <Route path="/recruitment/current-vacancy/vacancy-card-5" element={<VacancyCard5Page />} />
            <Route path="/recruitment/document-verification-department" element={<DocumentVerificationDepartment />} />
                        <Route path="/recruitment/online-application-portal" element={<OnlineApplicationPortal />} />
            {/* Online Application Portal Forms */}
            <Route path="/recruitment/online-application-portal/10th-certificate-application-form" element={<Form10thCertificateApplicationFormPage />} />
            <Route path="/recruitment/10th-certificate-application-form" element={<Form10thCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/10thCertificateApplicationFormPage" element={<Form10thCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/12th-certificate-application-form" element={<Form12thCertificateApplicationFormPage />} />
            <Route path="/recruitment/12th-certificate-application-form" element={<Form12thCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/12thCertificateApplicationFormPage" element={<Form12thCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/iti-certificate-application-form" element={<ITICertificateApplicationFormPage />} />
            <Route path="/recruitment/iti-certificate-application-form" element={<ITICertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/ITICertificateApplicationFormPage" element={<ITICertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/diploma-certificate-application-form" element={<DiplomaCertificateApplicationFormPage />} />
            <Route path="/recruitment/diploma-certificate-application-form" element={<DiplomaCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/DiplomaCertificateApplicationFormPage" element={<DiplomaCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/degree-certificate-application-form" element={<DegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/degree-certificate-application-form" element={<DegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/DegreeCertificateApplicationFormPage" element={<DegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/master-degree-certificate-application-form" element={<MasterDegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/master-degree-certificate-application-form" element={<MasterDegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/MasterDegreeCertificateApplicationFormPage" element={<MasterDegreeCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/seminar-registration-form" element={<SeminarRegistrationFormPage />} />
            <Route path="/recruitment/seminar-registration-form" element={<SeminarRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/SeminarRegistrationFormPage" element={<SeminarRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/webinar-registration-form" element={<WebinarRegistrationFormPage />} />
            <Route path="/recruitment/webinar-registration-form" element={<WebinarRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/WebinarRegistrationFormPage" element={<WebinarRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/workshop-registration-form" element={<WorkshopRegistrationFormPage />} />
            <Route path="/recruitment/workshop-registration-form" element={<WorkshopRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/WorkshopRegistrationFormPage" element={<WorkshopRegistrationFormPage />} />
            <Route path="/recruitment/online-application-portal/institutional-training-request-form" element={<InstitutionalTrainingRequestFormPage />} />
            <Route path="/recruitment/institutional-training-request-form" element={<InstitutionalTrainingRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/InstitutionalTrainingRequestFormPage" element={<InstitutionalTrainingRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/cyber-awareness-program-request-form" element={<CyberAwarenessProgramRequestFormPage />} />
            <Route path="/recruitment/cyber-awareness-program-request-form" element={<CyberAwarenessProgramRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/CyberAwarenessProgramRequestFormPage" element={<CyberAwarenessProgramRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/collaboration-application-form" element={<CollaborationApplicationFormPage />} />
            <Route path="/recruitment/collaboration-application-form" element={<CollaborationApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/CollaborationApplicationFormPage" element={<CollaborationApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/partnership-application-form" element={<PartnershipApplicationFormPage />} />
            <Route path="/recruitment/partnership-application-form" element={<PartnershipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/PartnershipApplicationFormPage" element={<PartnershipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/researcher-application-form" element={<ResearcherApplicationFormPage />} />
            <Route path="/recruitment/researcher-application-form" element={<ResearcherApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/ResearcherApplicationFormPage" element={<ResearcherApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/freelance-consultant-application-form" element={<FreelanceConsultantApplicationFormPage />} />
            <Route path="/recruitment/freelance-consultant-application-form" element={<FreelanceConsultantApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/FreelanceConsultantApplicationFormPage" element={<FreelanceConsultantApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/volunteer-application-form" element={<VolunteerApplicationFormPage />} />
            <Route path="/recruitment/volunteer-application-form" element={<VolunteerApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/VolunteerApplicationFormPage" element={<VolunteerApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/job-application-form" element={<JobApplicationFormPage />} />
            <Route path="/recruitment/job-application-form" element={<JobApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/JobApplicationFormPage" element={<JobApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/event-participation-application-form" element={<EventParticipationApplicationFormPage />} />
            <Route path="/recruitment/event-participation-application-form" element={<EventParticipationApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/EventParticipationApplicationFormPage" element={<EventParticipationApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/duplicate-id-card-application-form" element={<DuplicateIDCardApplicationFormPage />} />
            <Route path="/recruitment/duplicate-id-card-application-form" element={<DuplicateIDCardApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/DuplicateIDCardApplicationFormPage" element={<DuplicateIDCardApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/duplicate-certificate-application-form" element={<DuplicateCertificateApplicationFormPage />} />
            <Route path="/recruitment/duplicate-certificate-application-form" element={<DuplicateCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/DuplicateCertificateApplicationFormPage" element={<DuplicateCertificateApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/software-product-purchase-request-form" element={<SoftwareProductPurchaseRequestFormPage />} />
            <Route path="/recruitment/software-product-purchase-request-form" element={<SoftwareProductPurchaseRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/SoftwareProductPurchaseRequestFormPage" element={<SoftwareProductPurchaseRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/software-product-demo-request-form" element={<SoftwareProductDemoRequestFormPage />} />
            <Route path="/recruitment/software-product-demo-request-form" element={<SoftwareProductDemoRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/SoftwareProductDemoRequestFormPage" element={<SoftwareProductDemoRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/technical-support-request-form" element={<TechnicalSupportRequestFormPage />} />
            <Route path="/recruitment/technical-support-request-form" element={<TechnicalSupportRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/TechnicalSupportRequestFormPage" element={<TechnicalSupportRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/membership-application-form" element={<MembershipApplicationFormPage />} />
            <Route path="/recruitment/membership-application-form" element={<MembershipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/MembershipApplicationFormPage" element={<MembershipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/membership-renewal-application-form" element={<MembershipRenewalApplicationFormPage />} />
            <Route path="/recruitment/membership-renewal-application-form" element={<MembershipRenewalApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/MembershipRenewalApplicationFormPage" element={<MembershipRenewalApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/feedback-suggestion-form" element={<FeedbackAndSuggestionFormPage />} />
            <Route path="/recruitment/feedback-suggestion-form" element={<FeedbackAndSuggestionFormPage />} />
            <Route path="/recruitment/online-application-portal/FeedbackAndSuggestionFormPage" element={<FeedbackAndSuggestionFormPage />} />
            <Route path="/recruitment/online-application-portal/grievance-submission-form" element={<GrievanceSubmissionFormPage />} />
            <Route path="/recruitment/grievance-submission-form" element={<GrievanceSubmissionFormPage />} />
            <Route path="/recruitment/online-application-portal/GrievanceSubmissionFormPage" element={<GrievanceSubmissionFormPage />} />
            <Route path="/recruitment/online-application-portal/complaint-submission-form" element={<ComplaintSubmissionFormPage />} />
            <Route path="/recruitment/complaint-submission-form" element={<ComplaintSubmissionFormPage />} />
            <Route path="/recruitment/online-application-portal/ComplaintSubmissionFormPage" element={<ComplaintSubmissionFormPage />} />
            <Route path="/recruitment/online-application-portal/sponsorship-application-form" element={<SponsorshipApplicationFormPage />} />
            <Route path="/recruitment/sponsorship-application-form" element={<SponsorshipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/SponsorshipApplicationFormPage" element={<SponsorshipApplicationFormPage />} />
            <Route path="/recruitment/online-application-portal/general-inquiry-information-request-form" element={<GeneralInquiryInformationRequestFormPage />} />
            <Route path="/recruitment/general-inquiry-information-request-form" element={<GeneralInquiryInformationRequestFormPage />} />
            <Route path="/recruitment/online-application-portal/GeneralInquiryInformationRequestFormPage" element={<GeneralInquiryInformationRequestFormPage />} />
            <Route path="/recruitment/advertisements" element={<RecruitmentAdvertisements />} />
            <Route path="/recruitment/press-release-notices" element={<PressReleaseNotices />} />
            <Route path="/recruitment/application-status" element={<ApplicationStatus />} />
            <Route path="/recruitment/submit-resume" element={<SubmitResume />} />
            <Route path="/recruitment/certificate-verification" element={<CertificateVerification />} />
            <Route path="/recruitment/certificate-verification/:slug" element={<CertificateComingSoon />} />
            <Route path="/recruitment/id-card-verification" element={<IdCardVerificationPage />} />

            <Route path="/recruitment/rules-policies" element={<RecruitmentRulesPolicies />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="*" element={<Navigate to="/coming-soon" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

function AnimationWrapper() {
  const hasPlayed = sessionStorage.getItem("animationPlayed") === "true";
  if (hasPlayed) {
    return <Navigate to="/homepage" replace />;
  }
  return <BuildingAnimationPage />;
}

export default function App() {
  return <AppRoutes />;
}
