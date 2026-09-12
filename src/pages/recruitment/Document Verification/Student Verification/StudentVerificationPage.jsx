import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Calendar, Phone, Mail, MapPin, 
    BookOpen, Clock, Hash, CheckCircle, 
    ArrowLeft, School, GraduationCap, 
    CreditCard, LayoutDashboard, Award, Search, ShieldAlert
} from 'lucide-react';

import { studentDetails } from './studentData';
import { InfoField, PersonNameFields } from '../utils/nameHelper';

export default function StudentVerificationPage({ onBack, themeColor = '#0f4cd9' }) {
    const [isVerified, setIsVerified] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [rollInput, setRollInput] = useState('');
    const [error, setError] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');
        
        if (nameInput.trim() !== '' && rollInput.trim() !== '') {
            setIsVerified(true);
        } else {
            setError('Please enter both Student Name and Roll No.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="max-w-4xl w-full mx-auto mb-8 relative z-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C1A3A] tracking-tight">Student Verification</h1>
                {!isVerified && <p className="text-slate-500 text-sm font-medium mt-1">Enter student details to verify</p>}
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
                        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-lg border border-slate-100">
                            <div className="text-center mb-8">
                                <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner" style={{ color: themeColor, backgroundColor: `${themeColor}15` }}>
                                    <Search size={28} strokeWidth={2} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Lookup Student</h2>
                                <p className="text-sm text-slate-500 mt-2">Enter student name and roll number to retrieve the student's verification card.</p>
                            </div>
                            
                            <form onSubmit={handleVerify} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            onFocus={() => setFocusedInput('name')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={ focusedInput === 'name' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                                            placeholder="e.g. Subrajit"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Roll No</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Hash size={18} className="text-slate-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={rollInput}
                                            onChange={(e) => setRollInput(e.target.value)}
                                            onFocus={() => setFocusedInput('roll')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 font-medium"
                                            style={ focusedInput === 'roll' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
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
                                    Verify Student <ArrowLeft className="ml-2 rotate-180" size={18} />
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
                        {/* Decorative background blurs */}
                        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.08] rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: themeColor }} />
                        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.08] rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: themeColor }} />

                        {/* Details Header */}
                        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-100/80 p-8 sm:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-sm ring-2 ring-white" style={{ backgroundColor: `${themeColor}15`, borderColor: themeColor }}>
                                    <GraduationCap size={40} style={{ color: themeColor }} />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-2">
                                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{studentDetails.name}</h2>
                                        <span 
                                            className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm"
                                            style={{ backgroundColor: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}
                                        >
                                            <CheckCircle size={14} className="mr-1.5" />
                                            {studentDetails.studentStatus}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-bold text-sm sm:text-base flex items-center">
                                        <School size={18} className="mr-2" style={{ color: themeColor }} />
                                        {studentDetails.courseName}
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
                        <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/30 relative z-10">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-extrabold uppercase tracking-widest flex items-center" style={{ color: themeColor }}>
                                    <User size={18} className="mr-2.5" /> Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <PersonNameFields 
                                        icon={User} 
                                        baseLabel="Father's Name" 
                                        fullName={studentDetails.fName}
                                        firstName={studentDetails.fatherFirstName}
                                        middleName={studentDetails.fatherMiddleName}
                                        lastName={studentDetails.fatherLastName}
                                        themeColor={themeColor} 
                                    />
                                    <InfoField icon={Hash} label="Sl No" value={studentDetails.slNo} themeColor={themeColor} />
                                    <InfoField icon={Calendar} label="Date of Birth" value={studentDetails.dob} themeColor={themeColor} />
                                    <InfoField icon={User} label="Gender" value={studentDetails.gender} themeColor={themeColor} />
                                    <InfoField icon={Phone} label="Mobile Number" value={studentDetails.mobileNumber} themeColor={themeColor} />
                                    <InfoField icon={Mail} label="Email ID" value={studentDetails.mailId} themeColor={themeColor} />
                                    <InfoField icon={MapPin} label="Address" value={studentDetails.address} themeColor={themeColor} />
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-extrabold uppercase tracking-widest flex items-center" style={{ color: themeColor }}>
                                    <GraduationCap size={18} className="mr-2.5" /> Academic Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField icon={CreditCard} label="Student ID" value={studentDetails.studentId} themeColor={themeColor} />
                                    <InfoField icon={LayoutDashboard} label="ID Card No." value={studentDetails.studentIdCardNumber} themeColor={themeColor} />
                                    <InfoField icon={School} label="Course Name" value={studentDetails.courseName} themeColor={themeColor} />
                                    <InfoField icon={Clock} label="Course Duration" value={studentDetails.courseDuration} themeColor={themeColor} />
                                    <InfoField icon={BookOpen} label="Course Mode" value={studentDetails.courseMode} themeColor={themeColor} />
                                    <InfoField icon={CheckCircle} label="Course Type" value={studentDetails.courseType} themeColor={themeColor} />
                                    <InfoField icon={Calendar} label="Admission Date" value={studentDetails.admissionDate} themeColor={themeColor} />
                                    <InfoField icon={Award} label="Passing Date" value={studentDetails.passingDate} themeColor={themeColor} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
