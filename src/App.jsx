import { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SEO from './components/common/SEO'
import LazySection from './components/common/LazySection'
import AutoSEO from './components/common/AutoSEO'

// --- ALWAYS EAGER (layouts, scroll util, above-the-fold home components) ---
import ScrollToTop from './components/ScrollToTop'
import EventBanner from './components/EventBanner'
import Hero from './components/Hero'
import RootLayout from './layouts/RootLayout'
import LaptopLayout from './layouts/ContactUs/LaptopLayout'
import AboutLayout from './layouts/AboutLayout'
import PageWrapper from './components/ContactUs/PageWrapper'

// --- CONTACT HUB DATA (tiny, needed at route registration) ---
import { employees } from './data/contactUs/employeesData'
import { officers } from './data/contactUs/officersData'
import { teachers } from './data/contactUs/teachersData'
import { reporters } from './data/contactUs/reportersData'
import { advocates } from './data/contactUs/advocatesData'
import { legalAdvisors } from './data/contactUs/legalAdvisorsData'
import { directors } from './data/contactUs/directorsData'
import { members } from './data/contactUs/membersData'
import { reportCards } from './data/report/reportCards'
import { softwareCards } from './data/software/softwareCards'

// --- CONTACT HUB ICONS (lucide is tree-shaken, named imports are fine) ---
import {
  BadgeCent, Users, BookOpen, Mic, Scale, Gavel, UserCheck, UserPlus,
  Headset, LifeBuoy, MessageSquare, Ticket, MapPin, Building, Globe,
  Navigation, User, Briefcase, FileText, Star, ThumbsUp, MessageCircle,
  Bot, Megaphone, Sparkles
} from "lucide-react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

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

// ─── LAZY: Contact Hub ───────────────────────────────────────────────────────
const Dashboard          = lazy(() => import('./pages/ContactUs/Dashboard'))
const DirectorySection   = lazy(() => import('./pages/ContactUs/DirectorySection'))
const HelpDesk           = lazy(() => import('./sections/ContactUs/HelpDesk'))
const BranchDetails      = lazy(() => import('./sections/ContactUs/BranchDetails'))
const AIChat             = lazy(() => import('./sections/ContactUs/AIChat'))
const Review             = lazy(() => import('./sections/ContactUs/Review'))
const Feedback           = lazy(() => import('./sections/ContactUs/Feedback'))
const Announcements      = lazy(() => import('./sections/ContactUs/Announcements'))
const FollowApps         = lazy(() => import('./sections/ContactUs/FollowApps'))

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
const DataProtection           = lazy(() => import('./pages/AboutUs/DataProtection'))
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
const JobVacancy                = lazy(() => import('./pages/recruitment/JobVacancy'))
const JobVacancyPage            = lazy(() => import('./pages/recruitment/JobVacancyPortal/JobVacancyPage').then(m => ({ default: m.JobVacancyPage })))
const PostVacancyMembersOnly    = lazy(() => import('./pages/recruitment/PostVacancyMembersOnly'))
const OnlineApplicationPortal   = lazy(() => import('./pages/recruitment/OnlineApplicationPortal'))
const RecruitmentAdvertisements = lazy(() => import('./pages/recruitment/RecruitmentAdvertisements'))
const PressReleaseNotices       = lazy(() => import('./pages/recruitment/PressReleaseNotices'))
const ApplicationStatus         = lazy(() => import('./pages/recruitment/ApplicationStatus'))
const SubmitResume              = lazy(() => import('./pages/recruitment/SubmitResume'))
const CertificateVerification   = lazy(() => import('./pages/recruitment/CertificateVerification'))
const CertificateComingSoon     = lazy(() => import('./pages/recruitment/CertificateComingSoon'))

// ─── LAZY: Recruitment Rules & Policies ──────────────────────────────────────
const RecruitmentRulesPolicies             = lazy(() => import('./pages/recruitment/rules/RecruitmentRulesPolicies'))
const RecruitmentPolicyEmploymentOverview  = lazy(() => import('./pages/recruitment/rules/RecruitmentPolicyEmploymentOverview'))
const CareerDevelopmentProgress            = lazy(() => import('./pages/recruitment/rules/CareerDevelopmentProgress'))
const EmployeeGrowthFutureOpportunity      = lazy(() => import('./pages/recruitment/rules/EmployeeGrowthFutureOpportunity'))
const EmploymentEligibilityCriteria        = lazy(() => import('./pages/recruitment/rules/EmploymentEligibilityCriteria'))
const RecruitmentSelectionProcess          = lazy(() => import('./pages/recruitment/rules/RecruitmentSelectionProcess'))
const RecruitmentInstructions              = lazy(() => import('./pages/recruitment/rules/RecruitmentInstructions'))
const RecruitmentGuidelines                = lazy(() => import('./pages/recruitment/rules/RecruitmentGuidelines'))
const RecruitmentCalendar                  = lazy(() => import('./pages/recruitment/rules/RecruitmentCalendar'))
const CodeOfConductProfessionalEthics      = lazy(() => import('./pages/recruitment/rules/CodeOfConductProfessionalEthics'))
const TrainingOrientationSkillDevelopment  = lazy(() => import('./pages/recruitment/rules/TrainingOrientationSkillDevelopment'))
const PerformanceReviewEvaluationSystem    = lazy(() => import('./pages/recruitment/rules/PerformanceReviewEvaluationSystem'))
const EmployeeRightsResponsibilities       = lazy(() => import('./pages/recruitment/rules/EmployeeRightsResponsibilities'))
const VolunteerInternshipPolicy            = lazy(() => import('./pages/recruitment/rules/VolunteerInternshipPolicy'))
const EmployeeRecognitionAwards            = lazy(() => import('./pages/recruitment/rules/EmployeeRecognitionAwards'))

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
      <AutoSEO />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AnimationWrapper />} />
          <Route element={<RootLayout />}>
            <Route path="/homepage" element={<><SEO title="Home" description="CR Cyber Crime Foundation provides cyber security, cyber awareness, cyber investigation, digital safety services, training, consultancy, and digital empowerment." /><HomePageContent /></>} />
            <Route path="/gallery-collections" element={<><SEO title="Gallery Collections" description="View our gallery collections of events, workshops, and cyber awareness programs conducted by CR Cyber Crime Foundation." /><GalleryLandingPage /></>} />
            <Route path="/gallery" element={<><SEO title="Gallery" description="Explore our gallery featuring photos from various cyber security awareness campaigns and training programs." /><GalleryPage /></>} />
            <Route path="/gallery/category/:id" element={<><SEO title="Gallery Category" description="Browse specific categories of our cyber security events and training gallery." /><CategoryPage /></>} />
            <Route path="/reachus" element={<><SEO title="Reach Us" description="Contact CR Cyber Crime Foundation for cyber security consultancy, training, and cyber crime investigation services." /><ReachUsPage /></>} />
            <Route path="/insights" element={<><SEO title="Insights" description="Read our latest insights, articles, and research on cyber security, digital safety, and cyber crime prevention." /><InsightsPage /></>} />
            <Route path="/software-products" element={<><SEO title="Software Products" description="Explore our advanced software products and IT solutions designed for robust cyber security and digital infrastructure." /><SoftwareComingSoon /></>} />
            <Route path="/services/*" element={<><SEO title="Our Services" description="Comprehensive cyber security, digital marketing, IT support, and legal services offered by CRCCF." /><ServiceRouter /></>} />
            <Route path="/report-crime" element={<><SEO title="Report Cyber Crime" description="Report cyber crime incidents securely. Get assistance with FIR filing, digital evidence collection, and legal support." /><ReportCrimePage /></>} />

            {/* Dynamic report coming soon pages */}
            {reportCards.map((card) => (
              <Route
                key={card.path}
                path={card.path}
                element={<ReportComingSoon title={card.title} />}
              />
            ))}

            {/* Dynamic software product pages */}
            {softwareCards.map((card) => (
              <Route
                key={card.slug}
                path={`/software-products/${card.slug}`}
                element={<SoftwareProductDetailComingSoon title={card.title} />}
              />
            ))}

            {/* Skill Development */}
            <Route path="/skill-development" element={<><SEO title="Skill Development" description="Enhance your cyber security skills with our training programs, internships, courses, and workshops." /><SkillDevelopmentPage /></>} />
            <Route path="/skill-development/internships" element={<><SEO title="Internship Programs" description="Join our cyber security internship programs to gain hands-on experience in digital investigation and IT security." /><InternshipPage /></>} />
            <Route path="/skill-development/courses/*" element={<><SEO title="Cyber Security Courses" description="Enroll in our specialized courses to learn ethical hacking, cyber forensics, and IT development." /><CoursePage /></>} />
            <Route path="/internship/:id" element={<><SEO title="Internship Details" description="Detailed information about our cyber security and IT internship opportunities." /><InternshipDetailPage /></>} />
            <Route path="/skill-development/placement" element={<><SEO title="Talent Placement Program" description="Our talent placement program connects trained cyber security professionals with top industry organizations." /><TalentPlacementProgram /></>} />
            <Route path="/skill-development/career" element={<><SEO title="Career Guidance" description="Get expert career guidance in cyber security, ethical hacking, and IT development." /><CareerGuidance /></>} />
            <Route path="/skill-development/awareness" element={<><SEO title="Awareness Programs" description="Participate in our cyber awareness programs to learn how to stay safe in the digital world." /><AwarenessProgram /></>} />
            <Route path="/skill-development/mentorship/*" element={<><SEO title="Mentorship Programs" description="Connect with industry experts through our cyber security mentorship programs." /><MentorshipProgramsPage /></>} />
            <Route path="/skill-development/research/*" element={<><SEO title="Research & Development" description="Explore our research and development initiatives in cyber security and digital forensics." /><ResearchPage /></>} />
            <Route path="/skill-development/corporate/*" element={<><SEO title="Corporate Training" description="Customized corporate training programs to build robust cyber security knowledge within your organization." /><CorporateTrainingPage /></>} />
            <Route path="/skill-development/hackathons/*" element={<><SEO title="Hackathons" description="Participate in CRCCF hackathons to solve real-world cyber security challenges." /><HackathonPage /></>} />
            <Route path="/skill-development/workshops/*" element={<><SEO title="Workshops" description="Join expert-led workshops on cybersecurity and IT." /><WorkshopPage darkMode={false} setDarkMode={() => {}} /></>} />
            <Route path="/skill-development/training/*" element={<><SEO title="Training Programs" description="Comprehensive training programs covering various aspects of cyber security and digital investigation." /><TrainingProgramPage /></>} />
            <Route path="/skill-development/:slug" element={<><SEO title="Skill Development Details" description="Explore specific skill development opportunities in cyber security and IT." /><SkillDevelopmentDetail /></>} />

            {/* Resources */}
            <Route path="/resources/course-materials" element={<><SEO title="Course Materials" description="Access comprehensive course materials for our cyber security and IT training programs." /><CourseMaterials /></>} />
            <Route path="/resources/practical-training" element={<><SEO title="Practical Training" description="Engage in hands-on practical training to build real-world cyber security skills." /><PracticalTraining /></>} />
            <Route path="/resources/mentorship-evaluation" element={<><SEO title="Mentorship Evaluation" description="Evaluate and track your progress in our cyber security mentorship programs." /><MentorshipEvaluation /></>} />
            <Route path="/resources/learning-environment" element={<><SEO title="Learning Environment" description="Discover our state-of-the-art learning environment designed for optimal cyber security education." /><LearningEnvironment /></>} />

            {/* Contact Hub */}
            <Route path="/contact" element={<><SEO title="Contact Us" description="Get in touch with CR Cyber Crime Foundation for any inquiries, support, or services." /><LaptopLayout /></>}>
              <Route index element={<><SEO title="Dashboard" description="CR Cyber Crime Foundation Dashboard" /><Dashboard /></>} />
            </Route>

            <Route path="/contact/help-desk" element={<PageWrapper bgIcons={[Headset, LifeBuoy, MessageSquare, Ticket]}><HelpDesk /></PageWrapper>} />
            <Route path="/contact/follow-apps" element={<PageWrapper bgIcons={[FaFacebook, FaTwitter, FaInstagram, FaLinkedin]}><FollowApps /></PageWrapper>} />
            <Route path="/follow-apps" element={<PageWrapper bgIcons={[FaFacebook, FaTwitter, FaInstagram, FaLinkedin]}><FollowApps /></PageWrapper>} />
            <Route path="/contact/branch-details" element={<PageWrapper bgIcons={[MapPin, Building, Globe, Navigation]}><BranchDetails /></PageWrapper>} />
            <Route path="/contact/officer" element={<PageWrapper bgIcons={[User, Users, Briefcase, BadgeCent]} transparentBg={true}><DirectorySection title="Officer" Icon={BadgeCent} data={officers} /></PageWrapper>} />
            <Route path="/contact/employee" element={<PageWrapper bgIcons={[User, Users, Briefcase]} transparentBg={true}><DirectorySection title="Employee" Icon={Users} data={employees} /></PageWrapper>} />
            <Route path="/contact/teacher" element={<PageWrapper bgIcons={[User, BookOpen, FileText]} transparentBg={true}><DirectorySection title="Teacher" Icon={BookOpen} data={teachers} /></PageWrapper>} />
            <Route path="/contact/reporter" element={<PageWrapper bgIcons={[Mic, User, FileText]} transparentBg={true}><DirectorySection title="Reporter" Icon={Mic} data={reporters} /></PageWrapper>} />
            <Route path="/contact/advocate" element={<PageWrapper bgIcons={[Scale, Gavel, User]} transparentBg={true}><DirectorySection title="Advocate" Icon={Scale} data={advocates} /></PageWrapper>} />
            <Route path="/contact/legal-advisor" element={<PageWrapper bgIcons={[Gavel, Scale, Briefcase]} transparentBg={true}><DirectorySection title="Legal Advisor" Icon={Gavel} data={legalAdvisors} /></PageWrapper>} />
            <Route path="/contact/board-of-director" element={<PageWrapper bgIcons={[UserCheck, Users, Briefcase]} transparentBg={true}><DirectorySection title="Board of Director" Icon={UserCheck} data={directors} /></PageWrapper>} />
            <Route path="/contact/board-of-member" element={<PageWrapper bgIcons={[UserPlus, Users, Briefcase]} transparentBg={true}><DirectorySection title="Board of Member" Icon={UserPlus} data={members} /></PageWrapper>} />
            <Route path="/contact/ai-chat" element={<PageWrapper bgIcons={[Bot]}><AIChat /></PageWrapper>} />
            <Route path="/contact/review" element={<PageWrapper bgIcons={[Star, ThumbsUp]}><Review /></PageWrapper>} />
            <Route path="/contact/feedback" element={<PageWrapper bgIcons={[MessageCircle, MessageSquare]}><Feedback /></PageWrapper>} />
            <Route path="/contact/announcements" element={<PageWrapper bgIcons={[Megaphone, Sparkles]} iconCount={10} transparentBg={true}><Announcements /></PageWrapper>} />

            {/* About Section */}
            <Route path="/about" element={<><SEO title="About Us" description="Learn about CR Cyber Crime Foundation, our mission, vision, and core activities in cyber security." /><AboutLayout /></>}>
              <Route index element={<><SEO title="Dashboard" description="CR Cyber Crime Foundation Dashboard" /><AboutPage /></>} />
              <Route path="identity" element={<><SEO title="Identity" description="CR Cyber Crime Foundation Identity page." /><OurIdentity /></>} />
              <Route path="introduction" element={<><SEO title="Introduction" description="CR Cyber Crime Foundation Introduction page." /><IntroductionOfCRCCF /></>} />
              <Route path="what-we-do" element={<><SEO title="What We Do" description="CR Cyber Crime Foundation What We Do page." /><WhatWeDoAbout /></>} />
              <Route path="mission-vision" element={<><SEO title="Mission Vision" description="CR Cyber Crime Foundation Mission Vision page." /><MissionVision /></>} />
              <Route path="activity" element={<><SEO title="Activity" description="CR Cyber Crime Foundation Activity page." /><OurActivity /></>} />
              <Route path="purpose" element={<><SEO title="Purpose" description="CR Cyber Crime Foundation Purpose page." /><Purpose /></>} />
              <Route path="objective" element={<><SEO title="Objective" description="CR Cyber Crime Foundation Objective page." /><Objective /></>} />
              <Route path="achievement" element={<><SEO title="Achievement" description="CR Cyber Crime Foundation Achievement page." /><Achievement /></>} />
              <Route path="legal-compliance/*" element={<><SEO title="*" description="CR Cyber Crime Foundation * page." /><LegalComplianceRouter /></>} />
              <Route path="privacy-policy" element={<><SEO title="Privacy Policy" description="CR Cyber Crime Foundation Privacy Policy page." /><PrivacyPolicy /></>} />
              <Route path="data-protection" element={<><SEO title="Data Protection" description="CR Cyber Crime Foundation Data Protection page." /><DataProtection /></>} />
              <Route path="terms-conditions" element={<><SEO title="Terms Conditions" description="CR Cyber Crime Foundation Terms Conditions page." /><TermsConditions /></>} />
              <Route path="rules-regulation" element={<><SEO title="Rules Regulation" description="CR Cyber Crime Foundation Rules Regulation page." /><RulesRegulation /></>} />
              <Route path="instruction" element={<><SEO title="Instruction" description="CR Cyber Crime Foundation Instruction page." /><Instruction /></>} />
              <Route path="legal-disclaimer" element={<><SEO title="Legal Disclaimer" description="CR Cyber Crime Foundation Legal Disclaimer page." /><LegalDisclaimer /></>} />
              <Route path="copyright" element={<><SEO title="Copyright" description="CR Cyber Crime Foundation Copyright page." /><CopyrightRegistration /></>} />
              <Route path="partnership" element={<><SEO title="Partnership" description="CR Cyber Crime Foundation Partnership page." /><PartnershipCollaboration /></>} />
              <Route path="history" element={<><SEO title="History" description="CR Cyber Crime Foundation History page." /><History /></>} />
            </Route>

            {/* Recruitment / Careers */}
            <Route path="/careers" element={<><SEO title="Careers" description="Explore career opportunities and job vacancies at CR Cyber Crime Foundation." /><RecruitmentPortal /></>} />
            <Route path="/recruitment" element={<><SEO title="Recruitment Portal" description="Access our recruitment portal for job applications and career opportunities." /><RecruitmentPortal /></>} />
            <Route path="/recruitment/job-vacancy" element={<><SEO title="Job Vacancies" description="View current job vacancies and openings at CRCCF." /><JobVacancy /></>} />
            <Route path="/recruitment/job-vacancy-details" element={<><SEO title="Job Vacancy Details" description="Detailed information about specific job vacancies at CRCCF." /><JobVacancyPage /></>} />
            <Route path="/recruitment/post-vacancy-members-only" element={<><SEO title="Post Vacancy (Members Only)" description="Exclusive portal for members to post job vacancies." /><PostVacancyMembersOnly /></>} />
            <Route path="/recruitment/online-application-portal" element={<><SEO title="Online Application Portal" description="Submit your job applications online through our dedicated portal." /><OnlineApplicationPortal /></>} />
            <Route path="/recruitment/advertisements" element={<><SEO title="Recruitment Advertisements" description="View our latest recruitment advertisements and notices." /><RecruitmentAdvertisements /></>} />
            <Route path="/recruitment/press-release-notices" element={<><SEO title="Press Releases & Notices" description="Read official press releases and notices related to recruitment." /><PressReleaseNotices /></>} />
            <Route path="/recruitment/application-status" element={<><SEO title="Application Status" description="Check the status of your submitted job applications." /><ApplicationStatus /></>} />
            <Route path="/recruitment/submit-resume" element={<><SEO title="Submit Resume" description="Submit your resume for future career opportunities with CRCCF." /><SubmitResume /></>} />
            <Route path="/recruitment/certificate-verification" element={<><SEO title="Certificate Verification" description="Verify the authenticity of certificates issued by CR Cyber Crime Foundation." /><CertificateVerification /></>} />
            <Route path="/recruitment/certificate-verification/:slug" element={<><SEO title="Certificate Verification Details" description="Detailed certificate verification portal." /><CertificateComingSoon /></>} />

            <Route path="/recruitment/rules-policies" element={<><SEO title="Recruitment Rules & Policies" description="Read the comprehensive rules and policies governing our recruitment process." /><RecruitmentRulesPolicies /></>} />
            <Route path="/recruitment/rules-policies/employment-overview" element={<><SEO title="Employment Overview" description="Overview of employment practices and opportunities at CRCCF." /><RecruitmentPolicyEmploymentOverview /></>} />
            <Route path="/recruitment/rules-policies/career-development-progress" element={<><SEO title="Career Development" description="Information on career development and progression within CRCCF." /><CareerDevelopmentProgress /></>} />
            <Route path="/recruitment/rules-policies/employee-growth-future-opportunity" element={<><SEO title="Employee Growth" description="Learn about employee growth and future opportunities at our organization." /><EmployeeGrowthFutureOpportunity /></>} />
            <Route path="/recruitment/rules-policies/employment-eligibility-criteria" element={<><SEO title="Eligibility Criteria" description="Review the employment eligibility criteria for joining CRCCF." /><EmploymentEligibilityCriteria /></>} />
            <Route path="/recruitment/rules-policies/recruitment-selection-process" element={<><SEO title="Selection Process" description="Understand our recruitment and selection process." /><RecruitmentSelectionProcess /></>} />
            <Route path="/recruitment/rules-policies/recruitment-instructions" element={<><SEO title="Recruitment Instructions" description="Important instructions for candidates applying for positions." /><RecruitmentInstructions /></>} />
            <Route path="/recruitment/rules-policies/recruitment-guidelines" element={<><SEO title="Recruitment Guidelines" description="General guidelines and procedures for the recruitment process." /><RecruitmentGuidelines /></>} />
            <Route path="/recruitment/rules-policies/recruitment-calendar" element={<><SEO title="Recruitment Calendar" description="View the calendar for upcoming recruitment drives and events." /><RecruitmentCalendar /></>} />
            <Route path="/recruitment/rules-policies/code-of-conduct-professional-ethics" element={<><SEO title="Code of Conduct" description="Read our code of conduct and professional ethics for employees." /><CodeOfConductProfessionalEthics /></>} />
            <Route path="/recruitment/rules-policies/training-orientation-skill-development" element={<><SEO title="Training & Orientation" description="Details about employee training, orientation, and skill development." /><TrainingOrientationSkillDevelopment /></>} />
            <Route path="/recruitment/rules-policies/performance-review-evaluation-system" element={<><SEO title="Performance Review" description="Information on our performance review and evaluation system." /><PerformanceReviewEvaluationSystem /></>} />
            <Route path="/recruitment/rules-policies/employee-rights-responsibilities" element={<><SEO title="Employee Rights" description="Understand the rights and responsibilities of employees at CRCCF." /><EmployeeRightsResponsibilities /></>} />
            <Route path="/recruitment/rules-policies/volunteer-internship-policy" element={<><SEO title="Volunteer & Internship Policy" description="Read our policies regarding volunteer work and internships." /><VolunteerInternshipPolicy /></>} />
            <Route path="/recruitment/rules-policies/employee-recognition-awards" element={<><SEO title="Recognition & Awards" description="Learn about our employee recognition programs and awards." /><EmployeeRecognitionAwards /></>} />
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
