import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FastForward, ChevronLeft, Save, User, BookOpen, FileCheck, Phone, 
  Calendar, Hash, Mail, GraduationCap, CheckCircle2, ChevronRight, ChevronDown
} from 'lucide-react';

const CustomSelect = ({ options, placeholder, required = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative">
      <select 
        required={required} 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)} 
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        tabIndex={-1}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border ${isOpen ? 'border-pink-500 ring-4 ring-pink-50' : 'border-pink-200'} rounded-xl px-4 py-3 text-base sm:text-sm transition-all shadow-sm flex justify-between items-center cursor-pointer hover:border-pink-300`}
      >
        <span className={selected ? 'text-gray-700 font-medium' : 'text-gray-400'}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-pink-500' : 'text-gray-400'}`} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 w-full mt-2 bg-white border border-pink-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] overflow-hidden origin-top"
            >
              <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSelected(option.value);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-3 sm:py-2.5 text-base sm:text-sm cursor-pointer transition-colors flex items-center justify-between ${selected === option.value ? 'bg-pink-50 text-pink-700 font-bold' : 'text-gray-700 hover:bg-pink-50/50'}`}
                  >
                    {option.label}
                    {selected === option.value && <CheckCircle2 className="w-4 h-4 text-pink-500" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

function TwelfthCertificateForm({ onBack }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);

  const steps = [
    { title: 'Personal Details', icon: User },
    { title: 'Academic Details', icon: BookOpen },
    { title: 'Certificate Details', icon: FileCheck }
  ];

  // Options for all dropdowns
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];

  const streamOptions = [
    { value: "Science", label: "Science" },
    { value: "Commerce", label: "Commerce" },
    { value: "Arts", label: "Arts" },
    { value: "Vocational", label: "Vocational" }
  ];

  const mediumOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Odia", label: "Odia" },
    { value: "Others", label: "Others" }
  ];

  const schoolTypeOptions = [
    { value: "Government", label: "Government" },
    { value: "Private", label: "Private" },
    { value: "Aided", label: "Aided" },
    { value: "Others", label: "Others" }
  ];

  const boardTypeOptions = [
    { value: "State", label: "State Board" },
    { value: "CBSE", label: "CBSE" },
    { value: "ICSE", label: "ICSE" },
    { value: "CHSE", label: "CHSE" },
    { value: "Others", label: "Others" }
  ];

  const examTypeOptions = [
    { value: "Annual", label: "Annual / Regular" },
    { value: "Supplementary", label: "Supplementary / Compartmental" }
  ];

  const certTypeOptions = [
    { value: "Original", label: "Original" },
    { value: "Provisional", label: "Provisional" },
    { value: "Duplicate", label: "Duplicate" }
  ];

  const modeOptions = [
    { value: "Regular", label: "Regular" },
    { value: "Distance", label: "Distance / Correspondence" },
    { value: "Private", label: "Private" }
  ];

  // --- Validation Handlers ---
  const allowOnlyAlphabets = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s.-]/g, '');
  };

  const allowOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const allowAlphanumeric = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
  };

  const allowSubjects = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s,-]/g, '');
  };

  const allowPercentage = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9.%\s+]/g, '');
  };

  const allowYearRange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9\s-]/g, '');
  };
  
  const allowCertNumber = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9/-]/g, '');
  };

  const handleMobileChange = (e) => {
    allowOnlyNumbers(e);
    const val = e.target.value;
    setMobileNumber(val);
    if (isSameAsMobile) {
      setWhatsappNumber(val);
    }
  };

  const handleWhatsappChange = (e) => {
    allowOnlyNumbers(e);
    setWhatsappNumber(e.target.value);
    if (isSameAsMobile) {
      setIsSameAsMobile(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsSameAsMobile(checked);
    if (checked) {
      setWhatsappNumber(mobileNumber);
    } else {
      setWhatsappNumber('');
    }
  };

  const validateCurrentStep = () => {
    const currentSection = document.getElementById(`step-section-${currentStep}`);
    if (currentSection) {
      const inputs = currentSection.querySelectorAll('input, select, textarea');
      let isValid = true;
      for (let input of inputs) {
        if (!input.checkValidity()) {
          input.reportValidity();
          isValid = false;
          break; // Stop at first invalid input to show tooltip
        }
      }
      return isValid;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      if (validateCurrentStep()) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onBack();
        }, 3000);
      }
    }
  };

  const inputClasses = "w-full bg-white border border-pink-200 rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all shadow-sm placeholder-gray-400 text-gray-700";
  const labelClasses = "block text-xs font-bold text-pink-800 uppercase tracking-wider mb-2 ml-1";
  const sectionClasses = "bg-white/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-pink-100";
  const sectionTitleClasses = "text-lg sm:text-xl font-bold text-pink-900 mb-6 flex items-center gap-3 border-b border-pink-200 pb-4";

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  
  if (isPreview) {
    return (
      <div className="min-h-screen bg-[#fff0f5] relative overflow-hidden font-sans pb-20 pt-28 sm:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold mb-3 border border-pink-200">
                <FileCheck className="w-4 h-4" />
                Application Preview
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Review Your 12th Application Details
              </h1>
              <p className="text-gray-500 text-sm mt-1 max-w-xl mx-auto">
                Verify your entered details before submitting. Click "Back to Edit" to return to the steps or "Submit Application" to complete.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 mb-8 space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-pink-800 mb-3 pb-2 border-b border-slate-200">
                  1. Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Mobile Number:</span> <span className="font-semibold text-gray-800">{mobileNumber || 'Not specified'}</span></div>
                  <div><span className="text-gray-500">WhatsApp Number:</span> <span className="font-semibold text-gray-800">{whatsappNumber || 'Not specified'}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-pink-800 mb-3 pb-2 border-b border-slate-200">
                  2. Status & Details
                </h3>
                <div className="text-sm text-gray-600">
                  12th Standard Certificate Application ready for submission.
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
                onClick={() => { setIsSubmitted(true); setIsPreview(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 shadow-lg shadow-pink-300/50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-pink-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-pink-100">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-pink-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-500 mb-8">Your 12th Certificate Application has been successfully submitted for processing.</p>
          <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-pink-500"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff0f5] relative overflow-hidden font-sans pb-20">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/50 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20 relative z-10">
        
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg shadow-pink-300/50 text-white shrink-0">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
              12th Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Application Form</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl text-base sm:text-lg mx-auto">
            Please fill out all the required details carefully to request your 12th standard academic certificate.
          </p>
        </motion.div>

        <div className="flex justify-end max-w-3xl mx-auto mb-3 px-2">
          <button
            type="button"
            onClick={() => { setIsPreview(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-300 bg-pink-50/90 text-pink-900 hover:bg-pink-100 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5 text-pink-600" />
            <span>Skip to Preview</span>
          </button>
        </div>
{/* Stepper UI */}
        <div className="mb-12 max-w-3xl mx-auto px-4 sm:px-0">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-pink-100 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-pink-400 to-pink-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStep;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${isActive ? 'bg-pink-600 border-pink-100 text-white shadow-lg shadow-pink-300' : 'bg-white border-pink-100 text-pink-300'}`}>
                    <StepIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${isActive ? 'text-pink-800' : 'text-pink-400'} hidden sm:block`}>{step.title}</span>
                </div>
              )
            })}
          </div>
          {/* Mobile step title */}
          <div className="text-center mt-4 sm:hidden">
             <span className="text-sm font-bold text-pink-800 uppercase tracking-wider">{steps[currentStep].title}</span>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          
          <div className="relative">
            {/* Step 1: Personal Details */}
            <div id="step-section-0" className={currentStep === 0 ? "block" : "hidden"}>
              <motion.div 
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate={currentStep === 0 ? "visible" : "hidden"}
                className={sectionClasses}
              >
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><User className="w-5 h-5" /></div>
                  Personal Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div>
                    <label className={labelClasses}>Student Name</label>
                    <input type="text" required placeholder="Enter full name" onInput={allowOnlyAlphabets} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Father Name</label>
                    <input type="text" required placeholder="Enter father's name" onInput={allowOnlyAlphabets} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Date of Birth</label>
                    <div className="relative">
                      <input type="date" required className={`${inputClasses} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`} />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Gender</label>
                    <CustomSelect options={genderOptions} placeholder="Select Gender" />
                  </div>
                  <div>
                    <label className={labelClasses}>Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">+91</span>
                      <input 
                        type="tel" 
                        inputMode="numeric" 
                        required 
                        placeholder="0000000000" 
                        maxLength={10} 
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        className={`${inputClasses} pl-12`} 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={`${labelClasses} !mb-0`}>WhatsApp Number</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] sm:text-[11px] font-bold text-pink-600 hover:text-pink-800 transition-colors uppercase tracking-wider mb-0">
                        <input 
                          type="checkbox" 
                          checked={isSameAsMobile}
                          onChange={handleCheckboxChange}
                          className="w-3.5 h-3.5 text-pink-600 rounded border-pink-300 focus:ring-pink-500 cursor-pointer accent-pink-600"
                        />
                        Same as mobile
                      </label>
                    </div>
                    <input 
                      type="tel" 
                      inputMode="numeric" 
                      placeholder="0000000000" 
                      maxLength={10} 
                      value={whatsappNumber}
                      onChange={handleWhatsappChange}
                      className={`${inputClasses} ${isSameAsMobile ? 'bg-pink-50 text-pink-800 font-medium border-pink-300' : ''}`} 
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email ID</label>
                    <div className="relative">
                      <input type="email" required placeholder="example@email.com" className={`${inputClasses} pl-11`} />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Aadhaar Number</label>
                    <div className="relative">
                      <input type="text" inputMode="numeric" required placeholder="000000000000" maxLength={12} onInput={allowOnlyNumbers} className={`${inputClasses} pl-11`} />
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className={labelClasses}>Present Address</label>
                      <textarea required rows="3" placeholder="Enter current address" className={`${inputClasses} resize-none`}></textarea>
                    </div>
                    <div>
                      <label className={labelClasses}>Permanent Address</label>
                      <textarea required rows="3" placeholder="Enter permanent address" className={`${inputClasses} resize-none`}></textarea>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Step 2: Academic Details */}
            <div id="step-section-1" className={currentStep === 1 ? "block" : "hidden"}>
              <motion.div 
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate={currentStep === 1 ? "visible" : "hidden"}
                className={sectionClasses}
              >
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><BookOpen className="w-5 h-5" /></div>
                  Academic Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div>
                    <label className={labelClasses}>Qualification Name</label>
                    <input type="text" defaultValue="12th Standard" readOnly className={`${inputClasses} bg-gray-50 text-gray-500 font-medium cursor-not-allowed`} />
                  </div>
                  <div>
                    <label className={labelClasses}>Stream</label>
                    <CustomSelect options={streamOptions} placeholder="Select Stream" />
                  </div>
                  <div>
                    <label className={labelClasses}>Medium of Instruction</label>
                    <CustomSelect options={mediumOptions} placeholder="Select Medium" />
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-3">
                    <div className="bg-pink-50/50 rounded-xl p-4 sm:p-5 border border-pink-100 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className={labelClasses}>School / College Name</label>
                        <input type="text" required placeholder="Full name of institution" className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>School / College Type</label>
                        <CustomSelect options={schoolTypeOptions} placeholder="Select Type" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClasses}>School / College Address</label>
                        <input type="text" required placeholder="Complete address of the institution" className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>School / College Code</label>
                        <input type="text" placeholder="If available" onInput={allowAlphanumeric} className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>College Contact Number</label>
                        <div className="relative">
                          <input type="tel" inputMode="numeric" placeholder="If known" maxLength={15} onInput={allowOnlyNumbers} className={`${inputClasses} pl-11`} />
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Name of the Board</label>
                    <input type="text" required placeholder="e.g. CBSE, CHSE" onInput={allowOnlyAlphabets} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Type of Board</label>
                    <CustomSelect options={boardTypeOptions} placeholder="Select Board Type" />
                  </div>
                  <div>
                    <label className={labelClasses}>Year of Passing</label>
                    <input type="text" inputMode="numeric" required placeholder="YYYY" maxLength={4} onInput={allowOnlyNumbers} className={inputClasses} />
                  </div>
                  
                  <div>
                    <label className={labelClasses}>Examination Year</label>
                    <input type="text" inputMode="numeric" required placeholder="YYYY" maxLength={4} onInput={allowOnlyNumbers} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Examination Type</label>
                    <CustomSelect options={examTypeOptions} placeholder="Select Exam Type" />
                  </div>
                  <div>
                    <label className={labelClasses}>Roll Number</label>
                    <input type="text" required placeholder="Board Roll Number" onInput={allowAlphanumeric} className={inputClasses} />
                  </div>

                  <div>
                    <label className={labelClasses}>Enrollment Number</label>
                    <input type="text" placeholder="If applicable" onInput={allowAlphanumeric} className={inputClasses} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClasses}>Subjects Studied (Main & Optional)</label>
                    <input type="text" required placeholder="e.g. Physics, Chemistry, Math, English" onInput={allowSubjects} className={inputClasses} />
                  </div>

                  <div>
                    <label className={labelClasses}>Total Marks Obtained</label>
                    <input type="text" inputMode="numeric" required placeholder="0" maxLength={4} onInput={allowOnlyNumbers} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Maximum Marks</label>
                    <input type="text" inputMode="numeric" required placeholder="0" maxLength={4} onInput={allowOnlyNumbers} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Percentage / Grade / Division</label>
                    <input type="text" required placeholder="e.g. 85% or Grade A" maxLength={10} onInput={allowPercentage} className={inputClasses} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Step 3: Certificate Details */}
            <div id="step-section-2" className={currentStep === 2 ? "block" : "hidden"}>
              <motion.div 
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate={currentStep === 2 ? "visible" : "hidden"}
                className={sectionClasses}
              >
                <h2 className={sectionTitleClasses}>
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><FileCheck className="w-5 h-5" /></div>
                  Certificate Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div>
                    <label className={labelClasses}>Certificate Serial Number</label>
                    <input type="text" required placeholder="Enter serial number" onInput={allowCertNumber} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Certificate Registration No.</label>
                    <input type="text" required placeholder="Enter registration number" onInput={allowCertNumber} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Certificate Type</label>
                    <CustomSelect options={certTypeOptions} placeholder="Select Type" />
                  </div>
                  <div>
                    <label className={labelClasses}>Date of Issue</label>
                    <div className="relative">
                      <input type="date" required className={`${inputClasses} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`} />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Residing Year During Course</label>
                    <input type="text" required placeholder="e.g. 2021 - 2023" maxLength={11} onInput={allowYearRange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Mode of Study</label>
                    <CustomSelect options={modeOptions} placeholder="Select Mode" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className={labelClasses}>Principal / Headmaster’s Name</label>
                    <input type="text" required placeholder="Name of the head of institution" onInput={allowOnlyAlphabets} className={inputClasses} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 bg-white/60 p-4 sm:p-6 rounded-2xl border border-pink-100 shadow-sm backdrop-blur-md">
            <button 
              type="button"
              onClick={currentStep === 0 ? handleBackNavigation : handlePrev}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-pink-700 bg-white border-2 border-pink-200 hover:bg-pink-50 transition-colors focus:ring-4 focus:ring-pink-100 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </button>

            {/* bottomSkip12thMarker */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            
            <button
              type="button"
              onClick={() => { setIsPreview(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold transition-all border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FastForward className="w-4 h-4 text-slate-500" />
              Skip to Preview
            </button>
            {currentStep < steps.length - 1 ? (
              <button 
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 shadow-lg shadow-pink-300/50 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-pink-200 flex items-center justify-center gap-2"
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 shadow-lg shadow-pink-300/50 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-pink-200 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
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

export default TwelfthCertificateForm;
