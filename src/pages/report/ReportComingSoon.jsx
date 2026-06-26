import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ReportComingSoon({ title }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative w-full overflow-x-hidden pt-4 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl sm:rounded-[24px] shadow-sm sm:shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-16 md:p-24 text-center border border-slate-100">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-8">
            {title}
          </h1>
          
          <div className="inline-block bg-[#EFF6FF] text-[#2563EB] px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base shadow-sm border border-[#BFDBFE] mb-8">
            Data Coming Soon
          </div>
          
          <p className="text-[#64748B] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We are currently gathering the latest information and resources for this section. Please check back later for updates!
          </p>
        </div>

      </div>
    </div>
  );
}
