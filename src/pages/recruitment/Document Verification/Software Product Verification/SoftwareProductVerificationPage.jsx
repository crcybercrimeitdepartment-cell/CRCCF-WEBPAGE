import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Phone, Mail, Briefcase, Hash, CheckCircle, ArrowLeft, Search, ShieldAlert, Building, FileText, AtSign, UserCheck, Code
} from 'lucide-react';
import { softwareProductDetails } from './softwareProductData';

const InfoField = ({ icon: Icon, label, value, themeColor }) => (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-transparent transition-all duration-300 group">
        <div 
            className="mt-0.5 p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110" 
            style={{ color: themeColor, backgroundColor: `${themeColor}15` }}
        >
            <Icon size={18} strokeWidth={2.5} />
        </div>
        <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-[15px] text-slate-800 font-semibold break-words">{value}</p>
        </div>
    </div>
);

export default function SoftwareProductVerificationPage({ onBack, themeColor = '#3b82f6' }) {
    const [isVerified, setIsVerified] = useState(false);
    const [input0, setInput0] = useState('');
    const [input1, setInput1] = useState('');

    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');
        
        if (input0.trim() !== '' && input1.trim() !== '') {
            setIsVerified(true);
        } else {
            setError('Please fill all required fields.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="max-w-4xl w-full mx-auto mb-8 relative z-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1A3A] tracking-tight">Software Product Verification</h1>
                {!isVerified && <p className="text-slate-500 text-sm font-medium mt-1">Enter details to verify</p>}
                {isVerified && <p className="text-green-600 text-sm font-medium mt-1 flex items-center justify-center"><CheckCircle size={14} className="mr-1"/> Verification Successful</p>}
            </div>

            <AnimatePresence mode="wait">
                {!isVerified ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex items-center justify-center relative z-10 w-full"
                    >
                        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-slate-100">
                            <div className="text-center mb-8">
                                <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner" style={{ color: themeColor, backgroundColor: `${themeColor}15` }}>
                                    <Code size={28} strokeWidth={2} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Lookup Details</h2>
                                <p className="text-sm text-slate-500 mt-2">Enter the required fields to retrieve the verification details.</p>
                            </div>
                            
                            <form onSubmit={handleVerify} className="space-y-5">

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Software Product Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FileText size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={input0}
                                            onChange={(e) => setInput0(e.target.value)}
                                            onFocus={() => setFocusedInput('input0')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={focusedInput === 'input0' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {}}
                                            placeholder="e.g. Test"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Registration / ID Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FileText size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={input1}
                                            onChange={(e) => setInput1(e.target.value)}
                                            onFocus={() => setFocusedInput('input1')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={focusedInput === 'input1' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {}}
                                            placeholder="e.g. Test"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center text-rose-500 bg-rose-50 p-3 rounded-lg text-sm font-medium">
                                        <ShieldAlert size={16} className="mr-2 flex-shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <button 
                                    type="submit"
                                    className="w-full py-3.5 px-4 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center mt-6 hover:brightness-110"
                                    style={{ backgroundColor: themeColor, boxShadow: `0 10px 15px -3px ${themeColor}40` }}
                                >
                                    Verify Details <ArrowLeft className="ml-2 rotate-180" size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                        className="w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative z-10"
                    >
                        {/* Decorative background blurs inside card */}
                        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.08] rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: themeColor }} />
                        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.08] rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: themeColor }} />

                        {/* Details Header */}
                        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-100/80 p-8 sm:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                            <div className="flex items-center space-x-6">
                                <img src={softwareProductDetails.productLogoPreview} alt="Preview" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm ring-2 ring-white" style={{ borderColor: themeColor }} />
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-2">
                                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">Software Product Details</h2>
                                        <span 
                                            className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm"
                                            style={{ backgroundColor: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}
                                        >
                                            <CheckCircle size={14} className="mr-1.5" />
                                            Verified
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-bold text-sm sm:text-base flex items-center">
                                        <CheckCircle size={18} className="mr-2" style={{ color: themeColor }} />
                                        Authentic Record
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsVerified(false)}
                                className="px-6 py-3 font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border"
                                style={{ backgroundColor: `${themeColor}10`, color: themeColor, borderColor: `${themeColor}20` }}
                            >
                                Verify Another
                            </button>
                        </div>

                        {/* Details Body */}
                        <div className="p-8 sm:p-12 bg-slate-50/30 relative z-10">
                            <div className="space-y-6">
                                <h3 className="text-sm font-extrabold uppercase tracking-widest flex items-center" style={{ color: themeColor }}>
                                    <FileText size={18} className="mr-2.5" /> All Verified Fields
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <InfoField icon={FileText} label="Sl No" value={softwareProductDetails.slNo} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Software Product Name" value={softwareProductDetails.softwareProductName} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Product ID" value={softwareProductDetails.productId} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Product Type" value={softwareProductDetails.productType} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Product Category" value={softwareProductDetails.productCategory} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Version" value={softwareProductDetails.version} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Developer Name" value={softwareProductDetails.developerName} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Developer Organization" value={softwareProductDetails.developerOrganization} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Product Owner" value={softwareProductDetails.productOwner} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Software Purpose" value={softwareProductDetails.softwarePurpose} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Key Features" value={softwareProductDetails.keyFeatures} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Platform" value={softwareProductDetails.platform} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Technology" value={softwareProductDetails.technology} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="License Type" value={softwareProductDetails.licenseType} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="License Number" value={softwareProductDetails.licenseNumber} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Release Date" value={softwareProductDetails.releaseDate} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Current Version" value={softwareProductDetails.currentVersion} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Website" value={softwareProductDetails.website} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Support Email" value={softwareProductDetails.supportEmail} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Support Mobile" value={softwareProductDetails.supportMobile} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Product Status" value={softwareProductDetails.productStatus} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Verification Date" value={softwareProductDetails.verificationDate} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Verified By" value={softwareProductDetails.verifiedBy} themeColor={themeColor} />

                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
