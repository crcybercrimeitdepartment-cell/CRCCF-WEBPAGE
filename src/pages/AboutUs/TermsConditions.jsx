import TermsAndCondition from '../../components/AboutUs/TermsAndCondition/TermsAndCondition'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const TermsConditions = () => {
  return (
    <div className="w-full overflow-x-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">
        <PageHeader
          title="Terms & Conditions"
          description="Explore the terms, responsibilities, platform use rules, and important conditions related to CR Cyber Crime Foundation."
        />

        <CompanyMarquee direction="right" />
        <div className="py-2">
          <TermsAndCondition />
        </div>
        <CompanyMarquee direction="left" />
      </div>
    </div>
  )
}

export default TermsConditions
