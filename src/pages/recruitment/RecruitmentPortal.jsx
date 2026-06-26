import CompanyMarquee from '../../components/common/CompanyMarquee'
import RecruitmentKeyboard from '../../components/recruitment/RecruitmentKeyboard'
import PageHeader from '../../components/AboutUs/common/PageHeader'
import { Briefcase } from 'lucide-react'

const RecruitmentPortal = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-100 px-4 pt-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Careers at CR Cyber Crime Foundation" 
            description="Join our mission to build a safer and more aware digital society. Explore job opportunities, internships, and apply easily to be part of a purpose-driven team in cyber awareness and digital safety."
            Icon={Briefcase}
          />
          <div className="mb-6">
            <CompanyMarquee direction="right" />   {/* Top Marquee - moves left to right */}
          </div>

          <RecruitmentKeyboard />

          <div className="mt-6">
            <CompanyMarquee direction="left" />   {/* Bottom Marquee - moves right to left */}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecruitmentPortal
