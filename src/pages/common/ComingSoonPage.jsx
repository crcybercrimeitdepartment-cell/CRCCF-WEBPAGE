import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import SEO from '../../components/common/SEO';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Coming Soon" description="This section is currently under maintenance and will be available soon with updated content." />
      <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Coming Soon Card */}
          <div className="bg-white rounded-2xl sm:rounded-[24px] shadow-sm sm:shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-16 md:p-24 text-center border border-slate-100">
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-8">
              Coming Soon
            </h1>
            
            <div className="inline-block bg-[#EFF6FF] text-[#2563EB] px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base shadow-sm border border-[#BFDBFE] mb-8">
              We are working on something exciting!
            </div>
            
            <p className="text-[#64748B] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              This section is currently under maintenance and will be available soon with updated content.
              <br /><br />
              Thank you for visiting our website. We appreciate your patience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
