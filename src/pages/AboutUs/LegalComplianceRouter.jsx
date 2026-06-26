import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const LegalCompliance                       = lazy(() => import('./LegalCompliance'))
const OurLegalIdentity                      = lazy(() => import('./about/legalCompliance/OurLegalIdentity'))
const OurLegalEntity                        = lazy(() => import('./about/legalCompliance/OurLegalEntity'))
const LegalAuthorizationsCyberLicenses      = lazy(() => import('./about/legalCompliance/LegalAuthorizationsCyberLicenses'))
const LegalRightOperationalLimits           = lazy(() => import('./about/legalCompliance/LegalRightOperationalLimits'))
const CRCCFLegalRights                      = lazy(() => import('./about/legalCompliance/CRCCFLegalRights'))
const LegalEthicalCompliance                = lazy(() => import('./about/legalCompliance/LegalEthicalCompliance'))
const CyberCrimeInvestigationApproval       = lazy(() => import('./about/legalCompliance/CyberCrimeInvestigationApproval'))
const OurCyberInvestigationCapacity         = lazy(() => import('./about/legalCompliance/OurCyberInvestigationCapacity'))
const DigitalInvestigationInfrastructure    = lazy(() => import('./about/legalCompliance/DigitalInvestigationInfrastructure'))
const OurRoleInCybercrimeInvestigation      = lazy(() => import('./about/legalCompliance/OurRoleInCybercrimeInvestigation'))
const InvestigationScopeSocialResponsibility= lazy(() => import('./about/legalCompliance/InvestigationScopeSocialResponsibility'))
const CyberInvestigationComplianceFramework = lazy(() => import('./about/legalCompliance/CyberInvestigationComplianceFramework'))
const InvestigationEthicsLegalStandards     = lazy(() => import('./about/legalCompliance/InvestigationEthicsLegalStandards'))
const CyberSecurityInvestigationProtocols   = lazy(() => import('./about/legalCompliance/CyberSecurityInvestigationProtocols'))
const DigitalSecurityCertification          = lazy(() => import('./about/legalCompliance/DigitalSecurityCertification'))
const OperationalResourcesTeam              = lazy(() => import('./about/legalCompliance/OperationalResourcesTeam'))
const CybercrimeResponseCapabilities        = lazy(() => import('./about/legalCompliance/CybercrimeResponseCapabilities'))
const TeamToolTechCapacity                  = lazy(() => import('./about/legalCompliance/TeamToolTechCapacity'))
const ComplianceWithIndianCyberLaws         = lazy(() => import('./about/legalCompliance/ComplianceWithIndianCyberLaws'))
const CyberLawComplianceStandards           = lazy(() => import('./about/legalCompliance/CyberLawComplianceStandards'))
const ComplianceWithCybercrimeRegulation    = lazy(() => import('./about/legalCompliance/ComplianceWithCybercrimeRegulation'))
const CybercrimeComplianceFramework         = lazy(() => import('./about/legalCompliance/CybercrimeComplianceFramework'))
const ResourceAndReport                     = lazy(() => import('./about/legalCompliance/ResourceAndReport'))
const RecognizedPowerAndResponsibility      = lazy(() => import('./about/legalCompliance/RecognizedPowerAndResponsibility'))

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[200px] w-full">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

const LegalComplianceRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<LegalCompliance />} />
        <Route path="our-legal-identity" element={<OurLegalIdentity />} />
        <Route path="our-legal-entity" element={<OurLegalEntity />} />
        <Route path="legal-authorizations-cyber-licenses" element={<LegalAuthorizationsCyberLicenses />} />
        <Route path="legal-right-operational-limits" element={<LegalRightOperationalLimits />} />
        <Route path="crccf-legal-rights" element={<CRCCFLegalRights />} />
        <Route path="legal-ethical-compliance" element={<LegalEthicalCompliance />} />
        <Route path="cyber-crime-investigation-approval" element={<CyberCrimeInvestigationApproval />} />
        <Route path="our-cyber-investigation-capacity" element={<OurCyberInvestigationCapacity />} />
        <Route path="digital-investigation-infrastructure" element={<DigitalInvestigationInfrastructure />} />
        <Route path="our-role-in-cybercrime-investigation" element={<OurRoleInCybercrimeInvestigation />} />
        <Route path="investigation-scope-social-responsibility" element={<InvestigationScopeSocialResponsibility />} />
        <Route path="cyber-investigation-compliance-framework" element={<CyberInvestigationComplianceFramework />} />
        <Route path="investigation-ethics-legal-standards" element={<InvestigationEthicsLegalStandards />} />
        <Route path="cyber-security-investigation-protocols" element={<CyberSecurityInvestigationProtocols />} />
        <Route path="digital-security-certification" element={<DigitalSecurityCertification />} />
        <Route path="operational-resources-team" element={<OperationalResourcesTeam />} />
        <Route path="cybercrime-response-capabilities" element={<CybercrimeResponseCapabilities />} />
        <Route path="team-tool-tech-capacity" element={<TeamToolTechCapacity />} />
        <Route path="compliance-with-indian-cyber-laws" element={<ComplianceWithIndianCyberLaws />} />
        <Route path="cyber-law-compliance-standards" element={<CyberLawComplianceStandards />} />
        <Route path="compliance-with-cybercrime-regulation" element={<ComplianceWithCybercrimeRegulation />} />
        <Route path="cybercrime-compliance-framework" element={<CybercrimeComplianceFramework />} />
        <Route path="resource-and-report" element={<ResourceAndReport />} />
        <Route path="recognized-power-and-responsibility" element={<RecognizedPowerAndResponsibility />} />
      </Routes>
    </Suspense>
  )
}

export default LegalComplianceRouter
