import ComingSoonPage from '../common/ComingSoonPage';

/*
=========================================
TEMPORARILY DISABLED
Reason:
This page is currently using the global
ComingSoonPage component.

Do not remove this content because it
will be re-enabled in future updates.
=========================================
*/

/*
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/AboutUs/common/PageHeader'

const slugToTitle = {
  'internship': 'Internship Certificate',
  'training': 'Training Certificate',
  'course': 'Course Certificate',
  'education': 'Education Certificate',
  'cyber-awareness': 'Cyber Awareness Certificate',
  'seminar': 'Seminar Certificate',
  'webinar': 'Webinar Certificate',
  'appreciate': 'Appreciate Certificate',
}

const CertificateComingSoon = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const title = slugToTitle[slug] || 'Certificate Verification'

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        
        

        <PageHeader 
          title={title}
          description="We are currently gathering the latest information and resources for this verification module."
        />

        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-8 sm:p-12 md:p-16 text-center max-w-3xl mx-auto border border-[#DBEAFE] mt-8">
          <div className="inline-block bg-[#EFF6FF] text-[#1A56DB] px-6 py-3 rounded-full font-semibold text-lg sm:text-xl shadow-sm border border-[#BFDBFE]">
            Data Coming Soon
          </div>
          
          <p className="mt-8 text-[#64748B] text-base sm:text-lg">
            Please check back later for updates!
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default CertificateComingSoon

*/

const CertificateComingSoon = () => {
  return <ComingSoonPage />;
};

export default CertificateComingSoon;
