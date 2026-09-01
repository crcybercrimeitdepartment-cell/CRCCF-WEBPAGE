import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

const ComingSoon = ({ onBack }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f0f4fa] px-4 py-12 w-full">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
        {/* Background accent glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full mb-6 shadow-xs border border-blue-100">
          <Clock size={40} className="animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Module Coming Soon
        </h2>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
          Detailed terms and official documentation for this section are currently being updated and will be published shortly by the CR Cyber Crime Foundation legal department.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Terms &amp; Conditions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
