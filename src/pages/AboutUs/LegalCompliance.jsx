import LegalComplianceKeyboard from '../../components/AboutUs/legalCompliance/LegalComplianceKeyboard'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const LegalCompliance = () => {
  return (
    <div className="w-full overflow-x-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">
        <PageHeader 
          title="Legal Compliance" 
          description="Explore our legal compliance structure, authority, standards, and responsibilities"
        />

        <CompanyMarquee direction="right"/>
          <div className="py-2">
            <LegalComplianceKeyboard />
          </div>
        <CompanyMarquee direction='left' />
      </div>
    </div>
  )
}

export default LegalCompliance