import ComingSoonPage from '../common/ComingSoonPage';

/*
=========================================
TEMPORARILY DISABLED
Reason:
This page is currently using the global
ComingSoonPage component.

Do not remove this content because it
will be re-enabled in future updates.
=========================================
*/

/*
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, UploadCloud, CheckCircle2, AlertCircle, 
  User, Users, Phone, MapPin, GraduationCap, Link as LinkIcon 
} from 'lucide-react'

const countries = [
  "India","United States","United Kingdom","Canada","Australia",
  "Germany","France","Japan","China","Brazil","South Africa",
  "Russia","Italy","Spain","Netherlands","Singapore","UAE",
  "Saudi Arabia","Nepal","Bangladesh","Sri Lanka","Other"
]

const SubmitResume = () => {

  const [formData, setFormData] = useState({
    // Full Name
    fullFirstName: '', fullMiddleName: '', fullLastName: '',
    // Father Name
    fatherFirstName: '', fatherMiddleName: '', fatherLastName: '',
    // Mother Name
    motherFirstName: '', motherMiddleName: '', motherLastName: '',
    
    dob: '', gender: '', community: '', religion: '', nationality: '', 
    education: '', mobile: '', email: '', address: '', occupation: '', 
    bloodGroup: '', whatsapp: '', instagram: '', telegram: '', cv: null
  })

  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef(null)

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Manual DOB Input
  const handleDOBChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + '-' + value.slice(2)
    }
    else if (value.length > 4) {
      value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4, 8)
    }
    setFormData({ ...formData, dob: value })
  }

  // Calendar DOB
  const handleCalendarChange = (e) => {
    const selectedDate = e.target.value
    if (!selectedDate) return
    const [year, month, day] = selectedDate.split('-')
    setFormData({ ...formData, dob: `${day}-${month}-${year}` })
  }

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateAndSetFile = (file) => {
    setFileError('')
    if (!file) return

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Invalid file format. Please upload PDF, DOC, or DOCX.')
      setFormData(prev => ({ ...prev, cv: null }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit.')
      setFormData(prev => ({ ...prev, cv: null }))
      return
    }

    setFormData(prev => ({ ...prev, cv: file }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.cv) {
      setFileError('Resume upload is required.')
      // Scroll to bottom to show error
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      return
    }

    console.log(formData)
    alert("Form Submitted Successfully ✅")

    // Reset Form
    setFormData({
      fullFirstName: '', fullMiddleName: '', fullLastName: '',
      fatherFirstName: '', fatherMiddleName: '', fatherLastName: '',
      motherFirstName: '', motherMiddleName: '', motherLastName: '',
      dob: '', gender: '', community: '', religion: '', nationality: '',
      education: '', mobile: '', email: '', address: '', occupation: '',
      bloodGroup: '', whatsapp: '', instagram: '', telegram: '', cv: null
    })
    setFileError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const inputClass = "w-full h-12 sm:h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm outline-none text-gray-700 placeholder:text-gray-400"
  const selectClass = "w-full h-12 sm:h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm outline-none text-gray-700 appearance-none"

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl">

        {/* HERO SECTION * /}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 text-center shadow-xl border border-blue-500/20"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Submit Your Resume
            </h2>

            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Join CR Cyber Crime Foundation and become a part of our mission towards cybersecurity awareness, digital safety, research, innovation, and technology-driven social impact.
            </p>
          </div>

          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>

        {/* FORM * /}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

          {/* 1. PERSONAL INFORMATION * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><User size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" name="fullFirstName" value={formData.fullFirstName} onChange={handleChange} placeholder="First Name *" required maxLength={30} className={inputClass} />
                  <input type="text" name="fullMiddleName" value={formData.fullMiddleName} onChange={handleChange} placeholder="Middle Name" maxLength={30} className={inputClass} />
                  <input type="text" name="fullLastName" value={formData.fullLastName} onChange={handleChange} placeholder="Last Name *" required maxLength={30} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Date of Birth *</label>
                  <div className="relative">
                    <input type="text" placeholder="DD-MM-YYYY" maxLength={10} value={formData.dob} onChange={handleDOBChange} required className={`${inputClass} pr-12`} />
                    <input type="date" onChange={handleCalendarChange} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 w-6 h-6 cursor-pointer z-10" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">📅</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Gender *</label>
                  <div className="relative">
                    <select name="gender" value={formData.gender} onChange={handleChange} required className={selectClass}>
                      <option value="" disabled>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Blood Group</label>
                  <div className="relative">
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={selectClass}>
                      <option value="">Select Blood Group (Optional)</option>
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Community *</label>
                  <div className="relative">
                    <select name="community" value={formData.community} onChange={handleChange} required className={selectClass}>
                      <option value="" disabled>Select Community</option>
                      <option>General</option><option>SC</option><option>ST</option>
                      <option>OBC</option><option>EWS</option><option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Religion *</label>
                  <div className="relative">
                    <select name="religion" value={formData.religion} onChange={handleChange} required className={selectClass}>
                      <option value="" disabled>Select Religion</option>
                      <option>Hinduism</option><option>Islam</option><option>Christianity</option>
                      <option>Sikhism</option><option>Buddhism</option><option>Jainism</option>
                      <option>Other</option><option>Prefer not to say</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Nationality *</label>
                  <div className="relative">
                    <select name="nationality" value={formData.nationality} onChange={handleChange} required className={selectClass}>
                      <option value="" disabled>Select Nationality</option>
                      {countries.map((country, idx) => <option key={idx}>{country}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. FAMILY INFORMATION * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Family Information</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Father's Name *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" name="fatherFirstName" value={formData.fatherFirstName} onChange={handleChange} placeholder="First Name *" required maxLength={30} className={inputClass} />
                  <input type="text" name="fatherMiddleName" value={formData.fatherMiddleName} onChange={handleChange} placeholder="Middle Name" maxLength={30} className={inputClass} />
                  <input type="text" name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} placeholder="Last Name *" required maxLength={30} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Mother's Name *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" name="motherFirstName" value={formData.motherFirstName} onChange={handleChange} placeholder="First Name *" required maxLength={30} className={inputClass} />
                  <input type="text" name="motherMiddleName" value={formData.motherMiddleName} onChange={handleChange} placeholder="Middle Name" maxLength={30} className={inputClass} />
                  <input type="text" name="motherLastName" value={formData.motherLastName} onChange={handleChange} placeholder="Last Name *" required maxLength={30} className={inputClass} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. CONTACT INFORMATION * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Phone size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Mobile Number *</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  if(val.length <= 10) setFormData({...formData, mobile: val})
                }} placeholder="10-digit number" required minLength={10} maxLength={10} pattern="[0-9]{10}" className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">WhatsApp Number</label>
                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  if(val.length <= 10) setFormData({...formData, whatsapp: val})
                }} placeholder="10-digit number (Optional)" minLength={10} maxLength={10} pattern="[0-9]{10}" className={inputClass} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Permanent Address *</label>
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your full permanent address..." required className={`${inputClass} h-auto py-3 min-h-[100px] resize-y`} />
              </div>
            </div>
          </motion.div>

          {/* 4. EDUCATION & PROFESSIONAL DETAILS * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><GraduationCap size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Education & Professional Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Highest Education *</label>
                <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech, MCA, MBA" required className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Occupation</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Student, Developer (Optional)" className={inputClass} />
              </div>
            </div>
          </motion.div>

          {/* 5. ADDITIONAL INFORMATION * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><LinkIcon size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Social Profiles (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Instagram ID</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@username" className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Telegram ID</label>
                <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@username" className={inputClass} />
              </div>
            </div>
          </motion.div>

          {/* 6. UPLOAD CV * /}
          <motion.div 
            variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FileText size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">Upload Resume *</h3>
            </div>

            <div 
              className={`relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out cursor-pointer bg-gray-50
                ${dragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-100/50'}
                ${formData.cv ? 'border-green-400 bg-green-50/30' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                name="cv" 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx"
                className="hidden" 
              />
              
              {!formData.cv ? (
                <>
                  <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-500 mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-gray-800 font-semibold text-lg mb-1">Click to upload or drag & drop</p>
                  <p className="text-gray-500 text-sm mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                  <div className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium shadow-sm pointer-events-none hover:bg-gray-50">
                    Browse Files
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-green-700 font-semibold text-lg mb-1">File Selected Successfully!</p>
                  <p className="text-gray-600 font-medium text-sm mb-4 flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <FileText size={16} className="text-blue-500"/> {formData.cv.name}
                  </p>
                  <div className="text-blue-600 hover:text-blue-700 text-sm font-medium underline underline-offset-2">
                    Replace file
                  </div>
                </>
              )}
            </div>

            {fileError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-4 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle size={16} />
                <span>{fileError}</span>
              </motion.div>
            )}
            
          </motion.div>

          {/* SUBMIT BUTTON * /}
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none sticky bottom-6 z-10"
            >
              Submit Resume
            </button>
          </motion.div>

        </form>
      </div>
    </div>
  )
}

export default SubmitResume

*/

const SubmitResume = () => {
  return <ComingSoonPage />;
};

export default SubmitResume;
