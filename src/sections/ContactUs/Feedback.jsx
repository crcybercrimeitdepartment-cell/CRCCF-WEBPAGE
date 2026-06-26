import { useState } from "react";
// ✨ Removed the Star icon since we don't need it anymore
import { UploadCloud, Send, ChevronLeft, CheckCircle2 } from "lucide-react";

const Feedback = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    occupation: "",
    mobile: "",
    whatsapp: "",
    email: "",
    message: "",
  });

  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle WhatsApp Checkbox
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsMobile(isChecked);
    if (isChecked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
    } else {
      setFormData((prev) => ({ ...prev, whatsapp: "" }));
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { formData, file: selectedFile });
    alert("Feedback submitted successfully!");
    // You can add your API call here
  };

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out]">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          We Value Your <span className="text-[#0ea5e9]">Feedback</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Help us improve our services by sharing your experience. Your insights
          drive our innovation.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-10 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* ==========================================
              SECTION 1: Personal Identity
              ========================================== */}
          <section>
            <SectionHeader number="1" title="Personal Identity" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label="Full Name"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <InputBlock
                label="Father's Name"
                name="fatherName"
                required
                value={formData.fatherName}
                onChange={handleChange}
              />
              <InputBlock
                label="Date of Birth"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
              />

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <InputBlock
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* ==========================================
              SECTION 2: Contact Information
              ========================================== */}
          <section>
            <SectionHeader number="2" title="Contact Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label="Mobile Number"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
              />

              <div className="flex flex-col relative">
                <div className="flex justify-between items-end mb-2 ml-1">
                  <label className="text-sm font-semibold text-slate-600">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={handleCheckboxChange}
                      className="rounded text-primary focus:ring-primary w-4 h-4"
                    />
                    Same as Mobile Number
                  </label>
                </div>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  readOnly={sameAsMobile}
                  className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${sameAsMobile ? "bg-slate-100" : "bg-slate-50/50 hover:bg-slate-50"}`}
                />
              </div>

              <div className="md:col-span-2">
                <InputBlock
                  label="Email ID"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* ==========================================
              SECTION 3: Message & Suggestions (Ratings Removed)
              ========================================== */}
          <section>
            <SectionHeader number="3" title="Message & Suggestions" />

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                Your Message / Suggestions{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              ></textarea>
            </div>
          </section>

          {/* ==========================================
              SECTION 4: Supporting Documents
              ========================================== */}
          <section>
            <SectionHeader number="4" title="Supporting Documents" />
            <p className="text-sm text-slate-500 font-medium mb-4 ml-1">
              Upload Documents (Optional)
            </p>

            <label
              className={`w-full border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${selectedFile ? "border-primary bg-primary/5" : "border-slate-300 hover:bg-slate-50 hover:border-primary"}`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${selectedFile ? "bg-primary/20" : "bg-slate-100 group-hover:bg-primary/10"}`}
              >
                {selectedFile ? (
                  <CheckCircle2 size={30} className="text-primary" />
                ) : (
                  <UploadCloud
                    size={30}
                    className="text-slate-400 group-hover:text-primary transition-colors"
                  />
                )}
              </div>

              {selectedFile ? (
                <>
                  <p className="text-lg font-bold text-primary mb-1 max-w-[250px] sm:max-w-xs truncate px-4">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-primary/70 font-bold">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Click
                    to change
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-700 mb-1 group-hover:text-primary transition-colors">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-400 font-medium">
                    Supported: PDF, JPEG, PNG, MP4 (Max 10MB)
                  </p>
                </>
              )}

              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf, .jpg, .jpeg, .png, .mp4"
              />
            </label>
          </section>

          {/* ==========================================
              FOOTER & SUBMIT BUTTON
              ========================================== */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-400 italic">
              * Your feedback is confidential and used solely for quality
              assurance.
            </p>
            <button
              type="submit"
              className="w-full md:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-md hover:-translate-y-1 hover:shadow-lg"
            >
              Submit Feedback <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8 pb-10">
        
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-8 h-8 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <h2 className="text-xl font-extrabold text-slate-800">{title}</h2>
  </div>
);

const InputBlock = ({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
    />
  </div>
);

export default Feedback;
