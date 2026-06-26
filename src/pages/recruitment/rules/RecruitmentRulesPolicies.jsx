import CompanyMarquee from '../../../components/common/CompanyMarquee'
import RecruitmentRulesKeyboard from '../../../components/recruitment/RecruitmentRulesKeyboard'


const RecruitmentRulesPolicies = () => {
  return (
    <>

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-3xl shadow-xl mb-8 py-6 px-6 text-center">
            <h1 className="text-white text-3xl sm:text-4xl font-bold">
             Recruitment Policies & Career Development Framework
            </h1>
            <p className="text-blue-100 text-lg mt-2">
              Our recruitment framework outlines clear policies, selection processes, eligibility criteria, and professional guidelines to ensure transparency and fairness. It also highlights career growth opportunities, training programs, and ethical standards that support employee development and long-term success within the organization.
            </p>
          </div>

          <div className="mb-6">
            <CompanyMarquee direction='right'/>
          </div>

          <RecruitmentRulesKeyboard />

          <div className="mt-6">
            <CompanyMarquee direction='left' />
          </div>
        </div>
      </div>

    </>
  )
}

export default RecruitmentRulesPolicies
