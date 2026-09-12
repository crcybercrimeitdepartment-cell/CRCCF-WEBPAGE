import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function GeneralInquiryInformationRequestFormPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-100">
        <Link
          to="/recruitment/online-application-portal"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Application Portal
        </Link>
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <FileText className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#1e3a8a] mb-2">
          General Inquiry / Information Request Form
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Official CRCCF Online Application Portal
        </p>
        <div className="p-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-100/80 rounded-xl text-center text-sm text-slate-700 font-medium leading-relaxed">
          Application submission and verification pipeline for this form is being initialized.
        </div>
      </div>
    </div>
  );
}
