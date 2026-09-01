import Copyright from '../../components/AboutUs/CopyRight/Copyright'
import CompanyMarquee from '../../components/AboutUs/common/CompanyMarquee'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const CopyrightRegistration = () => {
  return (
    <div className="w-full overflow-x-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-4 pb-16">
        <PageHeader
          title="Copyright & Intellectual Property"
          description="Access the official guidelines, policy declarations, content protection frameworks, and intellectual property enforcement standards of the CR Cyber Crime Foundation."
        />

        <CompanyMarquee direction="right" />
        <div className="py-2">
          <Copyright />
        </div>
        <CompanyMarquee direction="left" />
      </div>
    </div>
  )
}

export default CopyrightRegistration
