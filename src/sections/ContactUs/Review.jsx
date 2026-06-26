import { useState } from "react";
// ✨ We brought back the Star icon, and removed the Upload icons!
import { Star, Send, ChevronLeft } from "lucide-react";

const Review = () => {
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

  // ✨ NEW: Rating State added back in!
  const [ratings, setRatings] = useState({
    overall: 0,
    support: 0,
    speed: 0,
  });

  const [sameAsMobile, setSameAsMobile] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✨ Now it submits the ratings instead of the file
    console.log("Review Submitted:", { formData, ratings });
    alert("Review submitted successfully!");
    // You can add your API call here
  };

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out]">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Submit a <span className="text-primary">Review</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          We'd love to hear about your experience. Your review helps us maintain
          our high standards.
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
              SECTION 3: Experience & Rating (File Upload Removed!)
              ========================================== */}
          <section>
            <SectionHeader number="3" title="Experience & Rating" />

            {/* ✨ The Star Ratings are back! */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <RatingBlock
                title="How would you rate your overall experience?"
                required
                rating={ratings.overall}
                onRating={(val) => setRatings({ ...ratings, overall: val })}
              />
              <RatingBlock
                title="Rate our Support Quality"
                rating={ratings.support}
                onRating={(val) => setRatings({ ...ratings, support: val })}
              />
              <RatingBlock
                title="Rate our Service Speed"
                rating={ratings.speed}
                onRating={(val) => setRatings({ ...ratings, speed: val })}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                Your Written Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                placeholder="Tell us what you loved or what we can improve..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              ></textarea>
            </div>
          </section>

          {/* ==========================================
              FOOTER & SUBMIT BUTTON
              ========================================== */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-400 italic">
              * Your review may be used on our public testimonials page.
            </p>
            <button
              type="submit"
              className="w-full md:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-md hover:-translate-y-1 hover:shadow-lg"
            >
              Submit Review <Send size={18} />
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

// ✨ The Interactive Star Rating component is back!
const RatingBlock = ({ title, required, rating, onRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold text-slate-700 mb-3">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRating(star)}
          >
            <Star
              size={28}
              className={`transition-colors ${
                star <= (hover || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Review;
