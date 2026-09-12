import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Phone, Mail, Briefcase, Hash, CheckCircle, ArrowLeft, Search, ShieldAlert, Building, FileText, AtSign, UserCheck, Globe, Calendar, Award
} from 'lucide-react';
import { socialMediaDetails } from './socialMediaData';
import { InfoField, PersonNameFields } from '../utils/nameHelper';

export default function SocialMediaVerificationPage({ onBack, themeColor = '#f43f5e' }) {
    const [isVerified, setIsVerified] = useState(false);
    const [input0, setInput0] = useState('');

    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');
        
        if (input0.trim() !== '') {
            setIsVerified(true);
        } else {
            setError('Please fill all required fields.');
        }
    };

    const handleReset = () => {
        setIsVerified(false);
        setInput0('');
        setError('');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="max-w-4xl w-full mx-auto mb-8 relative z-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1A3A] tracking-tight">Social Media Verification</h1>
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
                                    <Hash size={28} strokeWidth={2} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Lookup Profile</h2>
                                <p className="text-sm text-slate-500 mt-2">Enter profile URL or username to retrieve verification details.</p>
                            </div>
                            
                            <form onSubmit={handleVerify} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Social Media URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Globe size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={input0}
                                            onChange={(e) => setInput0(e.target.value)}
                                            onFocus={() => setFocusedInput('input0')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={focusedInput === 'input0' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {}}
                                            placeholder="e.g. https://linkedin.com/in/subrajit-cybersec"
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
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-sm ring-2 ring-white" style={{ backgroundColor: `${themeColor}15`, borderColor: themeColor }}>
                                    <AtSign size={40} style={{ color: themeColor }} />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-2">
                                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{socialMediaDetails.accountHolderName}</h2>
                                        <span 
                                            className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm"
                                            style={{ backgroundColor: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}
                                        >
                                            <CheckCircle size={14} className="mr-1.5" />
                                            {socialMediaDetails.profileStatus}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-bold text-sm sm:text-base flex items-center">
                                        <Globe size={18} className="mr-2" style={{ color: themeColor }} />
                                        {socialMediaDetails.username} • {socialMediaDetails.socialMediaPlatform}
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
                                    <FileText size={18} className="mr-2.5" /> Verified Profile Record
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <PersonNameFields 
                                        icon={User} 
                                        baseLabel="Account Holder Name" 
                                        fullName={socialMediaDetails.accountHolderName}
                                        firstName={socialMediaDetails.accountHolderFirstName}
                                        middleName={socialMediaDetails.accountHolderMiddleName}
                                        lastName={socialMediaDetails.accountHolderLastName}
                                        themeColor={themeColor} 
                                    />
                                    <InfoField icon={Hash} label="Sl No" value={socialMediaDetails.slNo} themeColor={themeColor} />
                                    <InfoField icon={AtSign} label="Username" value={socialMediaDetails.username} themeColor={themeColor} />
                                    <InfoField icon={Globe} label="Social Media Platform" value={socialMediaDetails.socialMediaPlatform} themeColor={themeColor} />
                                    <InfoField icon={Globe} label="Profile URL" value={socialMediaDetails.profileUrl} themeColor={themeColor} />
                                    <InfoField icon={Hash} label="Account ID" value={socialMediaDetails.accountId} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Account Type" value={socialMediaDetails.accountType} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Category" value={socialMediaDetails.category} themeColor={themeColor} />
                                    <InfoField icon={Building} label="Organization Name" value={socialMediaDetails.organizationName} themeColor={themeColor} />
                                    <InfoField icon={Briefcase} label="Designation" value={socialMediaDetails.designation} themeColor={themeColor} />
                                    <InfoField icon={Calendar} label="Registration Date" value={socialMediaDetails.registrationDate} themeColor={themeColor} />
                                    <InfoField icon={UserCheck} label="Followers" value={socialMediaDetails.followers} themeColor={themeColor} />
                                    <InfoField icon={UserCheck} label="Following" value={socialMediaDetails.following} themeColor={themeColor} />
                                    <InfoField icon={CheckCircle} label="Verification Method" value={socialMediaDetails.verificationMethod} themeColor={themeColor} />
                                    <InfoField icon={CheckCircle} label="Verified Badge Status" value={socialMediaDetails.verifiedBadgeStatus} themeColor={themeColor} />
                                    <InfoField icon={Mail} label="Contact Email" value={socialMediaDetails.contactEmail} themeColor={themeColor} />
                                    <InfoField icon={Phone} label="Mobile Number" value={socialMediaDetails.mobileNumber} themeColor={themeColor} />
                                    <InfoField icon={Globe} label="Website" value={socialMediaDetails.website} themeColor={themeColor} />
                                    <InfoField icon={CheckCircle} label="Profile Status" value={socialMediaDetails.profileStatus} themeColor={themeColor} />
                                    <InfoField icon={Calendar} label="Verification Date" value={socialMediaDetails.verificationDate} themeColor={themeColor} />
                                    <InfoField icon={Award} label="Verified By" value={socialMediaDetails.verifiedBy} themeColor={themeColor} />
                                    <InfoField icon={FileText} label="Remarks" value={socialMediaDetails.remarks} themeColor={themeColor} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
