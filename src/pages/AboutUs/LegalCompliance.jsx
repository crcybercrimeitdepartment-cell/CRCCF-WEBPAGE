import LegalComplianceKeyboard from '../../components/AboutUs/legalCompliance/LegalComplianceKeyboard'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'

const LegalCompliance = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-3xl shadow-xl mb-8 py-6 px-6 text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Legal Compliance</h1>
          <p className="text-blue-100 text-lg mt-2">
            Explore our legal compliance structure, authority, standards, and responsibilities
          </p>
        </div>

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