import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FiFastForward,
  FiUser, FiCalendar, FiPhone, FiMail, FiHome, FiHash,
  FiFolder, FiTag, FiFileText, FiTarget,
  FiAward, FiBook, FiMapPin, FiKey, FiMessageCircle,
  FiEdit3, FiBarChart2, FiList, FiClipboard, FiBriefcase,
  FiLayers, FiBookOpen, FiPercent, FiFlag, FiChevronLeft, FiChevronRight, FiChevronDown, FiCheckCircle
} from 'react-icons/fi';
import {
  MdSchool, MdFamilyRestroom, MdOutlineDateRange,
  MdOutlineAccountBalance
} from 'react-icons/md';
import { FaWhatsapp, FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';
import { BsGenderAmbiguous, BsBuilding, BsPersonBadge } from 'react-icons/bs';
import { HiOutlineIdentification, HiOutlineAcademicCap } from 'react-icons/hi';

const initialFormData = {
  studentName: '',
  fatherName: '',
  dateOfBirth: '',
  gender: '',
  mobileNumber: '',
  whatsappNumber: '',
  emailId: '',
  presentAddress: '',
  permanentAddress: '',
  aadhaarNumber: '',
  qualificationName: 'Diploma',
  yearOfPassing: '',
  nameOfBoard: '',
  typeOfBoard: '',
  studentRollNumber: '',
  studentEnrollmentNumber: '',
  certificateSerialNumber: '',
  certificateRegistrationNumber: '',
  dateOfIssue: '',
  totalMarksObtained: '',
  maximumMarks: '',
  percentageGradeDivision: '',
  subjectsStudied: '',
  schoolName: '',
  schoolType: '',
  schoolAddress: '',
  schoolCodeBoardCode: '',
  mediumOfInstruction: '',
  residingYearFrom: '',
  residingYearTo: '',
  schoolContactNumber: '',
  principalHeadmasterName: '',
};

const inputClasses = "w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm placeholder-gray-400 text-gray-700";
const labelClasses = "block text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 ml-1";
const sectionClasses = "bg-white/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-orange-100";
const sectionTitleClasses = "text-lg sm:text-xl font-bold text-orange-900 mb-6 flex items-center gap-3 border-b border-orange-200 pb-4";

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, required, icon: Icon, error }) => (
  <div>
    <label htmlFor={id} className={labelClasses}>
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <div className="relative">
      <input
        id={id} type={type} value={value} onChange={onChange} required={required}
        placeholder={placeholder || `Enter ${label}`}
        className={`${inputClasses} ${error ? 'border-orange-400 ring-2 ring-orange-100' : ''} ${Icon ? 'pl-11' : ''}`}
      />
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />}
    </div>
    {error && <p className="text-orange-500 text-xs mt-1 flex items-center gap-1 font-semibold">⚠ {error}</p>}
  </div>
);

const TextAreaField = ({ label, id, value, onChange, placeholder, required, icon: Icon, error }) => (
  <div>
    <label htmlFor={id} className={labelClasses}>
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <div className="relative">
      <textarea
        id={id} value={value} onChange={onChange} required={required} rows={3}
        placeholder={placeholder || `Enter ${label}`}
        className={`${inputClasses} resize-none ${error ? 'border-orange-400 ring-2 ring-orange-100' : ''} ${Icon ? 'pl-11 pt-4' : ''}`}
      />
      {Icon && <Icon className="absolute left-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />}
    </div>
    {error && <p className="text-orange-500 text-xs mt-1 flex items-center gap-1 font-semibold">⚠ {error}</p>}
  </div>
);

const SelectField = ({ label, id, value, onChange, options = [], required, icon: Icon, error }) => {
  const [isOpen, ReactSetIsOpen] = React.useState(false);
  return (
    <div>
      <label className={labelClasses}>
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={onChange} required={required} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" tabIndex={-1}>
          <option value="">-- Select --</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <div
          onClick={() => ReactSetIsOpen(!isOpen)}
          className={`w-full bg-white border ${isOpen ? 'border-orange-500 ring-4 ring-orange-50' : 'border-orange-200'} rounded-xl px-4 py-3 text-base sm:text-sm transition-all shadow-sm flex justify-between items-center cursor-pointer hover:border-orange-300 ${error ? 'border-orange-400 ring-2 ring-orange-100' : ''} ${Icon ? 'pl-11' : ''}`}
        >
          {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />}
          <span className={value ? 'text-gray-700 font-medium' : 'text-gray-400'}>
            {value ? options.find(o => o.value === value)?.label : '-- Select --'}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FiChevronDown className={`w-4 h-4 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => ReactSetIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 w-full mt-2 bg-white border border-orange-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.2)] overflow-hidden origin-top"
              >
                <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        onChange({ target: { id, value: option.value } });
                        ReactSetIsOpen(false);
                      }}
                      className={`px-4 py-3 sm:py-2.5 text-base sm:text-sm cursor-pointer transition-colors flex items-center justify-between ${value === option.value ? 'bg-orange-50 text-orange-700 font-bold' : 'text-gray-700 hover:bg-orange-50/50'}`}
                    >
                      {option.label}
                      {value === option.value && <FiCheckCircle className="w-4 h-4 text-orange-500" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-orange-500 text-xs mt-1 flex items-center gap-1 font-semibold">⚠ {error}</p>}
    </div>
  );
};

const STEPS = [
  { label: 'Personal Details',    Icon: FiUser },
  { label: 'Certificate Details', Icon: FiFileText },
  { label: 'Academic Details',    Icon: FiBarChart2 },
  { label: 'Institute Details',   Icon: MdSchool },
];

export default function DiplomaCertificateForm({ onBack }) {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    if (onBack) onBack();
    else navigate('/recruitment/online-application-portal');
  };
  const [step, setStep]               = useState(0);
  const [formData, setFormData]       = useState(initialFormData);
  const [errors, setErrors]           = useState({});
  const [sameAddress, setSameAddress] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [isPreview, setIsPreview]     = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => ({
    value: String(currentYear - i), label: String(currentYear - i),
  }));

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(p => ({ ...p, [id]: value }));
    if (errors[id]) setErrors(p => ({ ...p, [id]: '' }));
  };

  const handleSameAddress = (e) => {
    setSameAddress(e.target.checked);
    setFormData(p => ({ ...p, permanentAddress: e.target.checked ? p.presentAddress : '' }));
  };

  const validateStep = () => {
    const e = {};
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const nameRegex = /^[a-zA-Z\s.'-]{2,60}$/;
    const mobileRegex = /^[1-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 0) {
      if (!formData.studentName.trim()) e.studentName = 'Student name is required.';
      else if (!nameRegex.test(formData.studentName.trim())) e.studentName = 'Only letters, spaces, dots and hyphens allowed (min 2 chars).';

      if (!formData.fatherName.trim()) e.fatherName = "Father's name is required.";
      else if (!nameRegex.test(formData.fatherName.trim())) e.fatherName = 'Only letters, spaces, dots and hyphens allowed.';

      if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required.';
      else {
        const dob = new Date(formData.dateOfBirth);
        const age = (today - dob) / (365.25 * 24 * 3600 * 1000);
        if (dob >= today) e.dateOfBirth = 'Date of birth cannot be today or in the future.';
        else if (age < 15) e.dateOfBirth = 'Age must be at least 15 years.';
        else if (age > 40) e.dateOfBirth = 'Age seems too high (max 40 years for Diploma student).';
      }

      if (!formData.gender) e.gender = 'Please select a gender.';

      if (!formData.mobileNumber.trim()) e.mobileNumber = 'Mobile number is required.';
      else if (!mobileRegex.test(formData.mobileNumber.trim())) e.mobileNumber = 'Enter a valid 10-digit mobile number.';

      if (formData.whatsappNumber.trim() && !mobileRegex.test(formData.whatsappNumber.trim()))
        e.whatsappNumber = 'Enter a valid 10-digit WhatsApp number.';

      if (formData.emailId.trim() && !emailRegex.test(formData.emailId.trim()))
        e.emailId = 'Enter a valid email address.';

      if (!formData.presentAddress.trim()) e.presentAddress = 'Present address is required.';
      else if (formData.presentAddress.trim().length < 10) e.presentAddress = 'Please enter a complete address (min 10 characters).';

      const permAddr = sameAddress ? formData.presentAddress : formData.permanentAddress;
      if (!permAddr.trim()) e.permanentAddress = 'Permanent address is required.';
      else if (permAddr.trim().length < 10) e.permanentAddress = 'Please enter a complete address (min 10 characters).';

      if (!formData.aadhaarNumber.trim()) e.aadhaarNumber = 'Aadhaar number is required.';
      else if (!/^\d{12}$/.test(formData.aadhaarNumber.trim())) e.aadhaarNumber = 'Aadhaar must be exactly 12 digits.';
    }

    if (step === 1) {
      if (!formData.qualificationName.trim()) e.qualificationName = 'Qualification name is required.';
      if (!formData.yearOfPassing) e.yearOfPassing = 'Please select the year of passing.';
      if (!formData.nameOfBoard.trim()) e.nameOfBoard = 'Board / Council name is required.';
      else if (formData.nameOfBoard.trim().length < 2) e.nameOfBoard = 'Enter a valid board name.';
      if (!formData.typeOfBoard) e.typeOfBoard = 'Please select the type of board.';
      if (!formData.studentRollNumber.trim()) e.studentRollNumber = 'Roll number is required.';
      else if (!/^[a-zA-Z0-9/-]{2,30}$/.test(formData.studentRollNumber.trim())) e.studentRollNumber = 'Roll number must be 2–30 alphanumeric characters.';
      if (formData.dateOfIssue) {
        const doi = new Date(formData.dateOfIssue);
        if (doi > today) e.dateOfIssue = 'Date of issue cannot be in the future.';
      }
    }

    if (step === 2) {
      if (!formData.totalMarksObtained) e.totalMarksObtained = 'Total marks obtained is required.';
      else if (isNaN(formData.totalMarksObtained) || Number(formData.totalMarksObtained) <= 0) e.totalMarksObtained = 'Total marks must be a positive number.';
      if (!formData.maximumMarks) e.maximumMarks = 'Maximum marks is required.';
      else if (isNaN(formData.maximumMarks) || Number(formData.maximumMarks) <= 0) e.maximumMarks = 'Maximum marks must be a positive number.';
      else if (formData.totalMarksObtained && Number(formData.totalMarksObtained) > Number(formData.maximumMarks))
        e.totalMarksObtained = 'Total marks cannot exceed maximum marks.';
    }

    if (step === 3) {
      if (!formData.schoolName.trim()) e.schoolName = 'Institute name is required.';
      else if (formData.schoolName.trim().length < 3) e.schoolName = 'Enter a valid institute name (min 3 characters).';
      if (!formData.schoolType) e.schoolType = 'Please select the institute type.';
      if (formData.schoolContactNumber.trim() && !/^\d{10}$/.test(formData.schoolContactNumber.trim()))
        e.schoolContactNumber = 'Enter a valid 10-digit contact number.';
      if (formData.residingYearFrom && formData.residingYearTo && Number(formData.residingYearFrom) > Number(formData.residingYearTo))
        e.residingYearFrom = '"From" year cannot be after "To" year.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };
  const handleBack = () => {
    setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };
  const handleReset = () => {
    setFormData(initialFormData); setErrors({}); setSameAddress(false);
    setStep(0); setSubmitted(false);
  };

  
  if (isPreview) {
    return (
      <div className="min-h-screen bg-[#fff7ed] relative overflow-hidden font-sans pb-20 pt-28 sm:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-bold mb-3 border border-orange-200">
                <FiFileText className="w-4 h-4" />
                Application Preview
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Review Your Application Details
              </h1>
              <p className="text-gray-500 text-sm mt-1 max-w-xl mx-auto">
                Verify your entered details before submitting. Click "Back to Edit" to return to the steps or "Submit Application" to complete.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 mb-8 space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-orange-800 mb-3 pb-2 border-b border-slate-200">
                  1. Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Student Name:</span> <span className="font-semibold text-gray-800">{formData.studentName || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Father's Name:</span> <span className="font-semibold text-gray-800">{formData.fatherName || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Date of Birth:</span> <span className="font-semibold text-gray-800">{formData.dateOfBirth || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Gender:</span> <span className="font-semibold text-gray-800">{formData.gender || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Mobile Number:</span> <span className="font-semibold text-gray-800">{formData.mobileNumber || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Email:</span> <span className="font-semibold text-gray-800">{formData.emailId || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Aadhaar Number:</span> <span className="font-semibold text-gray-800">{formData.aadhaarNumber || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Present Address:</span> <span className="font-semibold text-gray-800">{formData.presentAddress || 'Not specified'}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-orange-800 mb-3 pb-2 border-b border-slate-200">
                  2. Institution & Academic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Course Name:</span> <span className="font-semibold text-gray-800">{formData.courseName || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">College / School Name:</span> <span className="font-semibold text-gray-800">{formData.collegeName || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">University / Board:</span> <span className="font-semibold text-gray-800">{formData.affiliatedUniversity || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Admission / Pass Year:</span> <span className="font-semibold text-gray-800">{formData.admissionYear || formData.completionYear || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Roll / Reg Number:</span> <span className="font-semibold text-gray-800">{formData.rollNumber || formData.enrollmentNumber || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Marks Obtained:</span> <span className="font-semibold text-gray-800">{formData.totalMarksObtained ? (formData.totalMarksObtained + ' / ' + formData.maximumMarks) : 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Result Status:</span> <span className="font-semibold text-gray-800">{formData.resultStatus || 'Not specified'}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-orange-800 mb-3 pb-2 border-b border-slate-200">
                  3. Certificate Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Certificate Number:</span> <span className="font-semibold text-gray-800">{formData.degreeCertificateNumber || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Issue Date:</span> <span className="font-semibold text-gray-800">{formData.degreeCertificateIssueDate || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">Head of Institution:</span> <span className="font-semibold text-gray-800">{formData.headOfInstitution || 'Not specified'}</span></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={() => { setSubmitted(true); setIsPreview(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-300/50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiCheckCircle className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-orange-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-orange-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="w-10 h-10 text-orange-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-500 mb-8">Your Diploma Certificate Application has been successfully submitted.</p>
          <div className="w-full h-1 bg-orange-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-orange-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button onClick={handleReset} className="text-orange-600 font-bold hover:underline">Submit Another Application</button>
            <button onClick={handleBackNavigation} className="text-gray-500 hover:text-gray-800 font-medium text-sm">Back to Portal</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7ed] relative overflow-hidden font-sans pb-20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/50 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/50 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col items-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-300/50 text-white shrink-0">
              <HiOutlineAcademicCap className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
              Diploma Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Application Form</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl text-base sm:text-lg mx-auto">
            Please fill out all the required details carefully to request your Diploma academic certificate.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex justify-end max-w-3xl mx-auto mb-3 px-2">
          <button
            type="button"
            onClick={() => { setIsPreview(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-orange-300 bg-orange-50/90 text-orange-900 hover:bg-orange-100 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <FiFastForward className="w-3.5 h-3.5 text-orange-600" />
            <span>Skip to Preview</span>
          </button>
        </div>
<div className="mb-12 max-w-3xl mx-auto px-4 sm:px-0">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-orange-100 -z-10 rounded-full"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            ></div>

            {STEPS.map((stepData, index) => {
              const StepIcon = stepData.Icon;
              const isActive = index <= step;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${isActive ? 'bg-orange-600 border-orange-100 text-white shadow-lg shadow-orange-300' : 'bg-white border-orange-100 text-orange-300'}`}>
                    <StepIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${isActive ? 'text-orange-800' : 'text-orange-400'} hidden sm:block`}>{stepData.label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4 sm:hidden">
            <span className="text-sm font-bold text-orange-800 uppercase tracking-wider">{STEPS[step].label}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            {step === 0 && (
              <motion.div key="step0" variants={stepVariants} initial="hidden" animate="visible" className={sectionClasses}>
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><FiUser className="w-5 h-5" /></div>
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div><InputField label="Student Name" id="studentName" value={formData.studentName} onChange={handleChange} required icon={FiEdit3} error={errors.studentName} /></div>
                  <div><InputField label="Father's Name" id="fatherName" value={formData.fatherName} onChange={handleChange} required icon={MdFamilyRestroom} error={errors.fatherName} /></div>
                  <div><InputField label="Date of Birth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required icon={FiCalendar} error={errors.dateOfBirth} /></div>
                  <div>
                    <SelectField label="Gender" id="gender" value={formData.gender} onChange={handleChange} required icon={BsGenderAmbiguous} error={errors.gender}
                      options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
                  </div>
                  <div><InputField label="Mobile Number" id="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit number" required icon={FiPhone} error={errors.mobileNumber} /></div>
                  <div><InputField label="WhatsApp Number" id="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleChange} placeholder="10-digit number" icon={FaWhatsapp} error={errors.whatsappNumber} /></div>
                  <div><InputField label="Email ID" id="emailId" type="email" value={formData.emailId} onChange={handleChange} placeholder="example@email.com" icon={FiMail} error={errors.emailId} /></div>
                  <div><InputField label="Aadhaar Number" id="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="12-digit number" required icon={HiOutlineIdentification} error={errors.aadhaarNumber} /></div>

                  <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div><TextAreaField label="Present Address" id="presentAddress" value={formData.presentAddress} onChange={handleChange} required icon={FiHome} error={errors.presentAddress} /></div>
                    <div>
                      <TextAreaField label="Permanent Address" id="permanentAddress" value={sameAddress ? formData.presentAddress : formData.permanentAddress} onChange={handleChange} required icon={FiMapPin} error={errors.permanentAddress} />
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] sm:text-xs font-bold text-orange-700 hover:text-orange-800 transition-colors uppercase tracking-wider mt-2">
                        <input type="checkbox" checked={sameAddress} onChange={handleSameAddress} className="w-4 h-4 text-orange-600 rounded border-orange-300 focus:ring-orange-500 cursor-pointer accent-orange-600" />
                        Same as Present Address
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" className={sectionClasses}>
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><FiFileText className="w-5 h-5" /></div>
                  Certificate Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div><InputField label="Qualification Name" id="qualificationName" value={formData.qualificationName} onChange={handleChange} required icon={FiAward} error={errors.qualificationName} /></div>
                  <div><SelectField label="Year of Passing (Diploma)" id="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required icon={MdOutlineDateRange} options={years} error={errors.yearOfPassing} /></div>
                  <div><InputField label="Name of the Board / Council" id="nameOfBoard" value={formData.nameOfBoard} onChange={handleChange} placeholder="e.g. State Board of Technical Education" required icon={FiBriefcase} error={errors.nameOfBoard} /></div>
                  <div>
                    <SelectField label="Type of Board" id="typeOfBoard" value={formData.typeOfBoard} onChange={handleChange} required icon={FiList} error={errors.typeOfBoard}
                      options={[{ value: 'state', label: 'State' }, { value: 'cbse', label: 'CBSE' }, { value: 'aicte', label: 'AICTE' }, { value: 'others', label: 'Others' }]} />
                  </div>
                  <div><InputField label="Student Roll Number" id="studentRollNumber" value={formData.studentRollNumber} onChange={handleChange} required icon={FiHash} error={errors.studentRollNumber} /></div>
                  <div><InputField label="Enrollment Number" id="studentEnrollmentNumber" value={formData.studentEnrollmentNumber} onChange={handleChange} placeholder="If applicable" icon={FiFolder} /></div>
                  <div><InputField label="Certificate Serial Number" id="certificateSerialNumber" value={formData.certificateSerialNumber} onChange={handleChange} icon={FiTag} /></div>
                  <div><InputField label="Certificate Registration Number" id="certificateRegistrationNumber" value={formData.certificateRegistrationNumber} onChange={handleChange} icon={FiClipboard} /></div>
                  <div><InputField label="Date of Issue" id="dateOfIssue" type="date" value={formData.dateOfIssue} onChange={handleChange} icon={FiCalendar} error={errors.dateOfIssue} /></div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" className={sectionClasses}>
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><FiBarChart2 className="w-5 h-5" /></div>
                  Academic Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div><InputField label="Total Marks Obtained" id="totalMarksObtained" type="number" value={formData.totalMarksObtained} onChange={handleChange} required icon={FiCheckCircle} error={errors.totalMarksObtained} /></div>
                  <div><InputField label="Maximum Marks" id="maximumMarks" type="number" value={formData.maximumMarks} onChange={handleChange} required icon={FiTarget} error={errors.maximumMarks} /></div>
                  <div><InputField label="Percentage / Grade / Division" id="percentageGradeDivision" value={formData.percentageGradeDivision} onChange={handleChange} placeholder="e.g. 90% / A+" icon={FiAward} /></div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <TextAreaField label="Subjects / Trade Studied (Main)" id="subjectsStudied" value={formData.subjectsStudied} onChange={handleChange} placeholder="e.g. Civil Engineering, Mathematics, Physics" icon={FiBook} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" className={sectionClasses}>
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><MdSchool className="w-5 h-5" /></div>
                  Institute Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div className="sm:col-span-2 lg:col-span-3"><InputField label="Institute / Polytechnic Name" id="schoolName" value={formData.schoolName} onChange={handleChange} required icon={MdSchool} error={errors.schoolName} /></div>
                  <div>
                    <SelectField label="Institute Type" id="schoolType" value={formData.schoolType} onChange={handleChange} required icon={BsBuilding} error={errors.schoolType}
                      options={[{ value: 'government', label: 'Government' }, { value: 'private', label: 'Private' }, { value: 'aided', label: 'Aided' }, { value: 'others', label: 'Others' }]} />
                  </div>
                  <div><InputField label="Institute Code / Board Code" id="schoolCodeBoardCode" value={formData.schoolCodeBoardCode} onChange={handleChange} icon={FiKey} /></div>
                  <div>
                    <SelectField label="Medium of Instruction" id="mediumOfInstruction" value={formData.mediumOfInstruction} onChange={handleChange} icon={FiMessageCircle}
                      options={[{ value: 'english', label: 'English' }, { value: 'hindi', label: 'Hindi' }, { value: 'odia', label: 'Odia' }, { value: 'others', label: 'Others' }]} />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3"><TextAreaField label="Institute Address" id="schoolAddress" value={formData.schoolAddress} onChange={handleChange} icon={FiMapPin} /></div>
                  <div><InputField label="Institute Contact Number" id="schoolContactNumber" type="tel" value={formData.schoolContactNumber} onChange={handleChange} icon={FiPhone} error={errors.schoolContactNumber} /></div>
                  <div>
                    <SelectField label="Residing Year From" id="residingYearFrom" value={formData.residingYearFrom} onChange={handleChange} options={years} error={errors.residingYearFrom} />
                  </div>
                  <div>
                    <SelectField label="Residing Year To" id="residingYearTo" value={formData.residingYearTo} onChange={handleChange} options={years} />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3"><InputField label="Principal / Head's Name" id="principalHeadmasterName" value={formData.principalHeadmasterName} onChange={handleChange} icon={FaChalkboardTeacher} /></div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 bg-white/60 p-4 sm:p-6 rounded-2xl border border-orange-100 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={step === 0 ? handleBackNavigation : handleBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-colors focus:ring-4 flex items-center justify-center gap-2 text-orange-700 bg-white border-2 border-orange-200 hover:bg-orange-50 focus:ring-orange-100"
            >
              <FiChevronLeft className="w-5 h-5" />
              {step === 0 ? 'Cancel' : 'Previous'}
            </button>

            {/* bottomSkipButtonMarker */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            
            <button
              type="button"
              onClick={() => { setIsPreview(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold transition-all border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FiFastForward className="w-4 h-4 text-slate-500" />
              Skip to Preview
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-300/50 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-orange-200 flex items-center justify-center gap-2"
              >
                Next Step
                <FiChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-300/50 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-orange-200 flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="w-5 h-5" />
                Submit Application
              </button>
            )}
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
