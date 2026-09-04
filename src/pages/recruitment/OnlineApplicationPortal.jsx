import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, GraduationCap, Heart, User, Users, Mic, Presentation, FileSearch, Handshake,
  Landmark, Settings, Building2, Globe, Shield, BookOpen, ClipboardList, FileCheck, FileText,
  Newspaper, Code, Bug, UserPlus, MessageSquare, AlertTriangle, HelpCircle, ShoppingBag,
  DollarSign, Key, ChevronLeft, ChevronRight, Check
} from 'lucide-react';

const allFormNames = [
  "Job Application Form",
  "Internship Application Form",
  "Volunteer Application Form",
  "Freelance / Consultant Application Form",
  "Campus Ambassador Application Form",
  "Speaker / Subject Matter Expert Application Form",
  "Trainer Application Form",
  "Researcher Application Form",
  "Partnership Application Form",
  "Collaboration Application Form",
  "Institutional Collaboration Application Form",
  "Research & Project Collaboration Application Form",
  "Technology Partnership Application Form",
  "Corporate Partnership Application Form",
  "NGO Partnership Application Form",
  "Academic Institution Partnership Application Form",
  "Cyber Awareness Program Request Form",
  "Institutional Training Request Form",
  "Training Program Application Form",
  "Workshop Registration Form",
  "Seminar Registration Form",
  "Webinar Registration Form",
  "Conference Registration Form",
  "Event Participation Application Form",
  "Duplicate ID Card Application Form",
  "Duplicate Certificate Application Form",
  "Certificate Verification Request Form",
  "Document Correction / Update Application Form",
  "Employee Personal Data & Document Update (KYC) Form",
  "Student Personal Data & Document Update (KYC) Form",
  "Member Personal Data & Document Update (KYC) Form",
  "ID Card Correction / Update Application Form",
  "Certificate Correction / Update Application Form",
  "Content & Intellectual Property Usage Authorization Form",
  "Media Coverage Request Form",
  "Content Submission Form",
  "Guest Article Submission Form",
  "Research Paper Submission Form",
  "Publication Permission Request Form",
  "Media & Press Accreditation Application Form",
  "Software Product Purchase Request Form",
  "Software Product Demo Request Form",
  "Software Product Trial Request Form",
  "Technical Support Request Form",
  "Software Bug Report Form",
  "Feature Request Form",
  "Software Integration Request Form",
  "Membership Application Form",
  "Membership Renewal Application Form",
  "Membership Upgrade / Category Change Request Form",
  "Member Profile Update Request Form",
  "Feedback & Suggestion Form",
  "Grievance Submission Form",
  "Complaint Submission Form",
  "Whistleblower Report Submission Form",
  "General Inquiry / Information Request Form",
  "Vendor / Service Provider Registration Form",
  "Sponsorship Application Form",
  "Sponsorship Request Form",
  "Official Permission / Authorization Request Form"
];

const getIconAndColor = (name, index) => {
  const n = name.toLowerCase();
  let icon = ClipboardList;
  if (n.includes('job') || n.includes('freelance')) icon = Briefcase;
  else if (n.includes('internship') || n.includes('academic') || n.includes('student')) icon = GraduationCap;
  else if (n.includes('volunteer') || n.includes('ngo')) icon = Heart;
  else if (n.includes('ambassador') || n.includes('member') || n.includes('employee')) icon = Users;
  else if (n.includes('speaker')) icon = Mic;
  else if (n.includes('trainer') || n.includes('seminar') || n.includes('workshop')) icon = Presentation;
  else if (n.includes('research')) icon = FileSearch;
  else if (n.includes('partner') || n.includes('collab')) icon = Handshake;
  else if (n.includes('institution') || n.includes('corporate')) icon = Landmark;
  else if (n.includes('cyber')) icon = Shield;
  else if (n.includes('training')) icon = BookOpen;
  else if (n.includes('webinar') || n.includes('demo') || n.includes('event') || n.includes('conference')) icon = Presentation;
  else if (n.includes('certificate') || n.includes('id card')) icon = FileCheck;
  else if (n.includes('correction') || n.includes('update')) icon = FileText;
  else if (n.includes('media') || n.includes('content') || n.includes('article') || n.includes('publication')) icon = Newspaper;
  else if (n.includes('software') || n.includes('technical') || n.includes('integration') || n.includes('feature')) icon = Code;
  else if (n.includes('bug')) icon = Bug;
  else if (n.includes('feedback') || n.includes('grievance') || n.includes('complaint')) icon = MessageSquare;
  else if (n.includes('whistleblower')) icon = AlertTriangle;
  else if (n.includes('inquiry')) icon = HelpCircle;
  else if (n.includes('vendor')) icon = ShoppingBag;
  else if (n.includes('sponsorship')) icon = DollarSign;
  else if (n.includes('permission') || n.includes('authorization')) icon = Key;

  const colorPalette = [
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-purple-100 text-purple-700",
    "bg-rose-100 text-rose-700",
    "bg-violet-100 text-violet-700",
    "bg-teal-100 text-teal-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700"
  ];

  return { icon, color: colorPalette[index % colorPalette.length] };
};

const forms = allFormNames.map((name, index) => {
  const { icon, color } = getIconAndColor(name, index);
  return { id: index, name, icon, color };
});

const variants = {
  enter: (direction) => {
    if (direction === 0) {
      return { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, zIndex: 10 };
    }
    return {
      x: direction > 0 ? 0 : -300,
      y: direction > 0 ? 0 : 150,
      rotate: direction > 0 ? 0 : -20,
      opacity: direction > 0 ? 0 : 0,
      scale: direction > 0 ? 0.95 : 1,
      zIndex: direction > 0 ? 0 : 10,
    };
  },
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
    zIndex: 5,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 0,
    y: direction > 0 ? 150 : 0,
    rotate: direction > 0 ? -20 : 0,
    opacity: 0,
    scale: direction > 0 ? 1 : 0.95,
    zIndex: direction > 0 ? 10 : 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30,
      mass: 0.8
    }
  })
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

function ApplicationPortal() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(forms.length / itemsPerPage);
  const currentForms = forms.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setDirection(newDirection);
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 sm:pt-32 pb-6 sm:pb-12 px-2 sm:px-4 font-sans relative overflow-hidden">

      {/* Background Soft Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none" />

      {/* Clipboard Container with Drop Animation */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="relative w-full max-w-[750px] flex flex-col items-center"
      >

        {/* --- Metal Clip Assembly (Realistic SVG) --- */}
        <div className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 z-30 w-[80%] sm:w-[70%] max-w-[320px] flex justify-center pointer-events-none">
          <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-2xl" style={{ filter: 'drop-shadow(0px 15px 15px rgba(0,0,0,0.5))' }}>
            <defs>
              <linearGradient id="silver-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="20%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="80%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              <linearGradient id="dark-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="10%" stopColor="#1e293b" />
                <stop offset="40%" stopColor="#0f172a" />
                <stop offset="75%" stopColor="#020617" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="clamp-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="15%" stopColor="#cbd5e1" />
                <stop offset="40%" stopColor="#64748b" />
                <stop offset="55%" stopColor="#0f172a" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            {/* Side Hinges */}
            <rect x="155" y="48" width="90" height="18" rx="4" fill="url(#dark-metal)" />
            <rect x="148" y="45" width="10" height="24" rx="3" fill="url(#silver-rim)" />
            <rect x="242" y="45" width="10" height="24" rx="3" fill="url(#silver-rim)" />
            <rect x="148" y="45" width="10" height="24" rx="3" fill="transparent" stroke="#000" strokeWidth="0.5" opacity="0.5" />
            <rect x="242" y="45" width="10" height="24" rx="3" fill="transparent" stroke="#000" strokeWidth="0.5" opacity="0.5" />

            {/* Silver Base (Rim) */}
            <path d="
              M 30, 170
              C 20,170 20,150 30,150
              L 50, 150
              C 100,150 155,100 155,50
              A 45,45 0 1,1 245,50
              C 245,100 300,150 350,150
              L 370, 150
              C 380,150 380,170 370,170
              Z
              M 200, 32
              A 18,18 0 1,0 200,68
              A 18,18 0 1,0 200,32
              Z" fill="url(#silver-rim)" fillRule="evenodd" stroke="#64748b" strokeWidth="1" />

            {/* Dark Metal Body */}
            <path d="
              M 55, 148
              C 100,148 165,100 165,50
              A 35,35 0 1,1 235,50
              C 235,100 300,148 345,148
              Z
              M 200, 24
              A 26,26 0 1,0 200,76
              A 26,26 0 1,0 200,24
              Z" fill="url(#dark-metal)" fillRule="evenodd" />

            {/* Clamp Bar */}
            <rect x="10" y="144" width="380" height="28" rx="10" fill="url(#clamp-bar)" stroke="#1e293b" strokeWidth="1" />

            {/* Clamp Bar Highlights */}
            <rect x="15" y="146" width="370" height="3" rx="1.5" fill="#ffffff" opacity="0.9" />
            <rect x="15" y="168" width="370" height="1.5" rx="0.75" fill="#ffffff" opacity="0.5" />
          </svg>
        </div>

        {/* --- The Board (Masonite texture) --- */}
        <div className="w-full h-full min-h-[800px] sm:min-h-[600px] bg-[#cca685] rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] p-3 sm:p-6 md:p-8 pt-16 sm:pt-12 pb-6 relative flex flex-col">
          {/* subtle noise/texture overlay */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none rounded-3xl overflow-hidden" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none rounded-3xl" />

          {/* --- The White Paper Container --- */}
          <div className="flex-1 w-full grid relative z-10 rounded-sm">
            <AnimatePresence custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ gridArea: '1 / 1' }}
                className="w-full min-h-full bg-[#fdfdfd] shadow-[0_2px_15px_rgba(0,0,0,0.08)] p-4 pt-28 sm:px-10 sm:pt-32 sm:pb-8 flex flex-col origin-bottom-left rounded-sm"
              >
                {/* Slanted text top right (Doodle) */}
                <div style={{ fontFamily: '"Segoe Print", "Comic Sans MS", cursive' }} className="absolute top-10 right-2 sm:top-8 sm:right-8 transform rotate-[-12deg] text-[#2b4c96] text-xs sm:text-xl font-bold leading-tight text-left opacity-90 tracking-wide z-20">
                  <div className="ml-3 sm:ml-6">Your</div>
                  <div className="ml-1 sm:ml-2">Request</div>
                  <div>Our Support</div>
                  <svg viewBox="0 0 120 15" className="w-[105%] h-[8px] sm:h-[12px] text-[#2b4c96] mt-1 sm:mt-1.5 opacity-80" preserveAspectRatio="none">
                    <path d="M 2 12 Q 60 2 118 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Header Section */}
                <div className="text-center mb-6 relative z-10">
                  <h1 className="text-xl sm:text-3xl font-bold text-[#1e3a8a] mb-2 px-2">
                    Application & <span className="text-blue-600">Request Forms</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 px-2 max-w-lg mx-auto leading-relaxed">
                    Select the forms you want to apply or make a request
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px bg-gray-300 w-16" />
                    <ClipboardList className="w-5 h-5 text-gray-400" />
                    <div className="h-px bg-gray-300 w-16" />
                  </div>
                </div>

                {/* List Grid with Staggered Children */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-6 flex-1 content-start"
                >
                  {currentForms.map((form) => {
                    const bgColorClass = form.color.split(' ')[0];
                    const textColorClass = form.color.split(' ')[1];

                    return (
                      <motion.label
                        variants={itemVariants}
                        key={form.id}
                        className={`group flex items-center justify-between p-2 pl-3 pr-4 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${bgColorClass} hover:opacity-95 min-h-[52px] py-2.5`}
                      >
                        <div className="flex items-center gap-3.5 flex-1 overflow-hidden">
                          {/* Icon inside a soft translucent circle with bold outline */}
                          <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-white/60 shadow-[0_2px_4px_rgba(0,0,0,0.05)] ${textColorClass}`}>
                            <form.icon className="w-5 h-5" strokeWidth={2.5} />
                          </div>
                          <span className="text-[13px] font-bold text-slate-800 leading-snug pr-2">
                            {form.name}
                          </span>
                        </div>
                        <div className="relative shrink-0 flex items-center justify-center ml-2 w-5 h-5">
                          {/* Invisible native checkbox to handle state/clicks */}
                          <input type="checkbox" className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />

                          {/* Custom Box Background & Border */}
                          <div className="absolute inset-0 w-full h-full rounded border-2 border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-blue-400 transition-colors duration-200 pointer-events-none" />

                          {/* Custom Tick Icon */}
                          <Check
                            className="absolute inset-0 m-auto w-3.5 h-3.5 text-blue-500 opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-100 peer-checked:!text-white peer-checked:!opacity-100 peer-checked:!scale-100 transition-all duration-200 pointer-events-none z-10"
                            strokeWidth={4}
                          />
                        </div>
                      </motion.label>
                    )
                  })}
                </motion.div>

                {/* Pagination Controls */}
                <div className="mt-auto pt-4 flex items-center justify-between w-full border-t border-gray-200 relative">
                  <button
                    onClick={() => paginate(-1)}
                    disabled={page === 0}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${page === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {/* Bottom Slanted Text (Doodle) */}
                  <div style={{ fontFamily: '"Segoe Print", "Comic Sans MS", cursive' }} className="absolute left-1/2 -translate-x-1/2 transform rotate-[-3deg] text-[#2b4c96] text-base font-bold tracking-wide text-center opacity-90 hidden sm:block w-[240px]">
                    Build Connect Grow Together
                  </div>

                  <button
                    onClick={() => paginate(1)}
                    disabled={page === totalPages - 1}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${page === totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ApplicationPortal;
