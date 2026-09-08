import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Calendar, Phone, Mail, MapPin, 
    Briefcase, Hash, CheckCircle, 
    ArrowLeft, Search, ShieldAlert,
    Building, Award, CreditCard, Clock, Star
} from 'lucide-react';
import { memberDetails } from './memberData';

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
            <p className="text-[15px] text-slate-800 font-semibold">{value}</p>
        </div>
    </div>
);

export default function MembershipVerificationPage({ onBack, themeColor = '#10b981' }) {
    const [isVerified, setIsVerified] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [idInput, setIdInput] = useState('');
    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');
        
        if (emailInput.trim().toLowerCase() === 'subrajit@example.com' && idInput.trim() === '009') {
            setIsVerified(true);
        } else {
            setError('Invalid Email or Member ID. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="max-w-4xl w-full mx-auto mb-8 relative z-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1A3A] tracking-tight">Membership Verification</h1>
                {!isVerified && <p className="text-slate-500 text-sm font-medium mt-1">Enter member details to verify</p>}
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
                                    <Search size={28} strokeWidth={2} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Lookup Member</h2>
                                <p className="text-sm text-slate-500 mt-2">Enter the registered email and member ID to retrieve the membership details.</p>
                            </div>
                            
                            <form onSubmit={handleVerify} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="email" 
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            onFocus={() => setFocusedInput('email')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={ focusedInput === 'email' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                                            placeholder="e.g. subrajit@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Member ID</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Hash size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={idInput}
                                            onChange={(e) => setIdInput(e.target.value)}
                                            onFocus={() => setFocusedInput('id')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={ focusedInput === 'id' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                                            placeholder="e.g. 009"
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
                                    Verify Member <ArrowLeft className="ml-2 rotate-180" size={18} />
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
                                <img src={memberDetails.photo} alt={memberDetails.memberName} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm ring-2 ring-white" style={{ borderColor: themeColor }} />
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-2">
                                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{memberDetails.memberName}</h2>
                                        <span 
                                            className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm"
                                            style={{ backgroundColor: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}
                                        >
                                            <CheckCircle size={14} className="mr-1.5" />
                                            {memberDetails.memberStatus}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-bold text-sm sm:text-base flex items-center">
                                        <Award size={18} className="mr-2" style={{ color: themeColor }} />
                                        {memberDetails.position} • {memberDetails.typeOfMember}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setIsVerified(false); setEmailInput(''); setIdInput(''); }}
                                className="px-6 py-3 font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border"
                                style={{ backgroundColor: `${themeColor}10`, color: themeColor, borderColor: `${themeColor}20` }}
                            >
                                Verify Another
                            </button>
                        </div>

                        {/* Details Body */}
                        <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/30 relative z-10">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-extrabold uppercase tracking-widest flex items-center" style={{ color: themeColor }}>
                                    <User size={18} className="mr-2.5" /> Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField icon={Hash} label="Sl No" value={memberDetails.slNo} themeColor={themeColor} />
                                    <InfoField icon={User} label="Father's Name" value={memberDetails.fatherName} themeColor={themeColor} />
                                    <InfoField icon={Calendar} label="Date of Birth" value={memberDetails.dob} themeColor={themeColor} />
                                    <InfoField icon={User} label="Gender" value={memberDetails.gender} themeColor={themeColor} />
                                    <InfoField icon={Phone} label="Mobile Number" value={memberDetails.mobileNumber} themeColor={themeColor} />
                                    <InfoField icon={Mail} label="Email ID" value={memberDetails.mailId} themeColor={themeColor} />
                                </div>
                                <InfoField icon={MapPin} label="Address" value={memberDetails.address} themeColor={themeColor} />
                            </div>

                            {/* Membership Details */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-extrabold uppercase tracking-widest flex items-center" style={{ color: themeColor }}>
                                    <CreditCard size={18} className="mr-2.5" /> Membership Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField icon={CreditCard} label="Member ID" value={memberDetails.memberId} themeColor={themeColor} />
                                    <InfoField icon={Star} label="Category" value={memberDetails.memberCategory} themeColor={themeColor} />
                                    <InfoField icon={Briefcase} label="Position" value={memberDetails.position} themeColor={themeColor} />
                                    <InfoField icon={Building} label="Department" value={memberDetails.department} themeColor={themeColor} />
                                    <InfoField icon={MapPin} label="Work Location" value={memberDetails.workLocation} themeColor={themeColor} />
                                    <InfoField icon={Award} label="Member Type" value={memberDetails.typeOfMember} themeColor={themeColor} />
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    <InfoField icon={Clock} label="Validity" value={memberDetails.membershipValidity} themeColor={themeColor} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
