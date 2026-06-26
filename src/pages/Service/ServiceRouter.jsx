import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const ServicesPage                        = lazy(() => import('../ServicesPage'))
const SoftwareITServices                  = lazy(() => import('./OurService/SoftwareITServices'))
const DigitalMarketingServices            = lazy(() => import('./OurService/DigitalMarketingServices'))
const VictimSupportServices               = lazy(() => import('./OurService/VictimSupportServices'))
const LegalInformationDocumentationSupport= lazy(() => import('./OurService/LegalInformationDocumentationSupport'))
const CyberSecurityServices               = lazy(() => import('./OurService/CyberSecurityServices'))
const CyberInvestigationServices          = lazy(() => import('./OurService/CyberInvestigationServices'))
const LegalServices                       = lazy(() => import('./OurService/LegalServices'))
const EducationServices                   = lazy(() => import('./OurService/EducationServices'))
const TrainingInternshipServices          = lazy(() => import('./OurService/TrainingInternshipServices'))
const PlacementServices                   = lazy(() => import('./OurService/PlacementServices'))
const ServiceComingSoon                   = lazy(() => import('./ServiceComingSoon'))
const LegalSupport                        = lazy(() => import('./OurService/LegalSupport'))
const CyberAwareness                      = lazy(() => import('./cyberAwareness/CyberAwareness'))
const SoftwareServicesIntroduction        = lazy(() => import('./softwareIT/SoftwareServicesIntroduction'))
const AMCServices                         = lazy(() => import('./softwareIT/AMCServices'))
const EndToEndWebDevelopment              = lazy(() => import('./softwareIT/EndToEndWebDevelopment'))
const MobileApplicationDevelopment        = lazy(() => import('./softwareIT/MobileApplicationDevelopment'))
const DesktopLaptopSoftwareSolutions      = lazy(() => import('./softwareIT/DesktopLaptopSoftwareSolutions'))
const ArtificialIntelligenceSolutions     = lazy(() => import('./softwareIT/ArtificialIntelligenceSolutions'))
const ITSupport                           = lazy(() => import('./softwareIT/ITSupport'))
const TechnicalAssistance                 = lazy(() => import('./softwareIT/TechnicalAssistance'))

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[200px] w-full">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

const ServiceRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<ServicesPage />} />
        <Route path="software-it" element={<SoftwareITServices />} />
        <Route path="digital-marketing" element={<DigitalMarketingServices />} />
        <Route path="victim-support" element={<VictimSupportServices />} />
        <Route path="legal-docs" element={<LegalInformationDocumentationSupport />} />
        <Route path="cyber-security" element={<CyberSecurityServices />} />
        <Route path="cyber-investigation" element={<CyberInvestigationServices />} />
        <Route path="legal-services" element={<LegalServices />} />
        <Route path="education" element={<EducationServices />} />
        <Route path="training-internship" element={<TrainingInternshipServices />} />
        <Route path="placement" element={<PlacementServices />} />

        {/* PENDING SERVICES */}
        <Route path="cyber-awareness" element={<CyberAwareness />} />
        <Route path="legal-support" element={<LegalSupport />} />
        <Route path="technical-assistance" element={<ServiceComingSoon title="Technical Assistance" />} />
        <Route path="innovation-technology" element={<ServiceComingSoon title="Innovation & Technology" />} />

        {/* SOFTWARE SERVICES */}
        <Route path="software-it/software-services-introduction" element={<SoftwareServicesIntroduction />} />
        <Route path="software-it/amc-services" element={<AMCServices />} />
        <Route path="software-it/end-to-end-web-development" element={<EndToEndWebDevelopment />} />
        <Route path="software-it/mobile-application-development" element={<MobileApplicationDevelopment />} />
        <Route path="software-it/desktop-laptop-software-solutions" element={<DesktopLaptopSoftwareSolutions />} />
        <Route path="software-it/artificial-intelligence-solutions" element={<ArtificialIntelligenceSolutions />} />
        <Route path="software-it/it-support" element={<ITSupport />} />
        <Route path="software-it/technical-assistance" element={<TechnicalAssistance />} />
      </Routes>
    </Suspense>
  )
}

export default ServiceRouter
