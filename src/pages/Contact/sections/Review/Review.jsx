import React, { useState } from "react";
// ✨ Added UploadCloud, Image, and X icons for the beautiful image upload UI
import {
  Star,
  Send,
  ChevronLeft,
  UploadCloud,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { reviewData } from "./ReviewData";

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
    // ✨ NEW: Product and Service Name states added
    productName: "",
    serviceName: "",
    image: null, // ✨ NEW: Image state added
  });

  // ✨ UPDATED: Ratings State (Removed Speed, added Product and Service)
  const [ratings, setRatings] = useState({
    overall: 0,
    support: 0,
    product: 0,
    service: 0,
  });

  const [sameAsMobile, setSameAsMobile] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
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
    console.log("Review Submitted:", { formData, ratings });
    alert(reviewData.footer.successMessage);
    // API call goes here
  };

  return (
    <div className="max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out] p-4">
      {/* Page Header */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          {reviewData.header.titlePrefix} <span className="text-primary">{reviewData.header.titleHighlight}</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          {reviewData.header.subtitle}
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 sm:p-10 md:p-12 mb-10">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* ==========================================
              SECTION 1: Personal Identity
              ========================================== */}
          <section>
            <SectionHeader number="1" title={reviewData.sections.identity.title} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label={reviewData.sections.identity.fields.fullName}
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <InputBlock
                label={reviewData.sections.identity.fields.fatherName}
                name="fatherName"
                required
                value={formData.fatherName}
                onChange={handleChange}
              />
              <InputBlock
                label={reviewData.sections.identity.fields.dob}
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
              />

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                  {reviewData.sections.identity.fields.gender} <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    {reviewData.sections.identity.fields.genderOptions.default}
                  </option>
                  <option value="Male">{reviewData.sections.identity.fields.genderOptions.male}</option>
                  <option value="Female">{reviewData.sections.identity.fields.genderOptions.female}</option>
                  <option value="Other">{reviewData.sections.identity.fields.genderOptions.other}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <InputBlock
                  label={reviewData.sections.identity.fields.occupation}
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
            <SectionHeader number="2" title={reviewData.sections.contact.title} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label={reviewData.sections.contact.fields.mobile}
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
              />

              <div className="flex flex-col relative">
                <div className="flex justify-between items-end mb-2 ml-1">
                  <label className="text-sm font-semibold text-slate-600">
                    {reviewData.sections.contact.fields.whatsapp} <span className="text-red-500">*</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={handleCheckboxChange}
                      className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    {reviewData.sections.contact.fields.sameAsMobile}
                  </label>
                </div>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  readOnly={sameAsMobile}
                  className={`w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                    sameAsMobile
                      ? "bg-slate-100"
                      : "bg-slate-50/50 hover:bg-slate-50"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <InputBlock
                  label={reviewData.sections.contact.fields.email}
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
              SECTION 3: Experience & Rating
              ========================================== */}
          <section>
            <SectionHeader number="3" title={reviewData.sections.rating.title} />

            {/* ✨ PERFECTLY ALIGNED GRID: Inputs on left, Stars on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              {/* Row 1: Overall & Support */}
              <RatingBlock
                title={reviewData.sections.rating.ratings.overall}
                required
                rating={ratings.overall}
                onRating={(val) => setRatings({ ...ratings, overall: val })}
              />
              <RatingBlock
                title={reviewData.sections.rating.ratings.support}
                rating={ratings.support}
                onRating={(val) => setRatings({ ...ratings, support: val })}
              />

              {/* Row 2: Product Name & Rating */}
              <InputBlock
                label={reviewData.sections.rating.ratings.productInput}
                name="productName"
                placeholder={reviewData.sections.rating.ratings.productPlaceholder}
                value={formData.productName}
                onChange={handleChange}
              />
              <RatingBlock
                title={reviewData.sections.rating.ratings.productTitle}
                rating={ratings.product}
                onRating={(val) => setRatings({ ...ratings, product: val })}
              />

              {/* Row 3: Service Name & Rating */}
              <InputBlock
                label={reviewData.sections.rating.ratings.serviceInput}
                name="serviceName"
                placeholder={reviewData.sections.rating.ratings.servicePlaceholder}
                value={formData.serviceName}
                onChange={handleChange}
              />
              <RatingBlock
                title={reviewData.sections.rating.ratings.serviceTitle}
                rating={ratings.service}
                onRating={(val) => setRatings({ ...ratings, service: val })}
              />
            </div>

            {/* ✨ NEW: Beautiful Image Upload Zone */}
            <div className="flex flex-col mb-8">
              <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                {reviewData.sections.rating.image.label}
              </label>
              <div className="relative w-full">
                {!formData.image ? (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-all group">
                    <UploadCloud
                      className="text-slate-400 mb-3 group-hover:text-primary transition-colors"
                      size={32}
                    />
                    <span className="text-sm font-bold text-slate-600">
                      {reviewData.sections.rating.image.instructions}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 font-medium">
                      {reviewData.sections.rating.image.formatInfo}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between w-full p-4 border border-slate-200 bg-slate-50 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200 text-primary rounded-xl flex items-center justify-center shadow-sm">
                        <ImageIcon size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[200px] sm:max-w-xs">
                          {formData.image.name}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 mt-0.5">
                          {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: null }))
                      }
                      className="p-2.5 text-slate-400 bg-white border border-slate-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                      title={reviewData.sections.rating.image.removeTitle}
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Written Review */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
                {reviewData.sections.rating.writtenReview.label} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                placeholder={reviewData.sections.rating.writtenReview.placeholder}
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
            <p className="text-sm font-medium text-slate-400 italic text-center md:text-left">
              {reviewData.footer.disclaimer}
            </p>
            <button
              type="submit"
              className="w-full md:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95"
            >
              {reviewData.footer.submitText} <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Back Button */}
      <div className="flex justify-center pb-12">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:text-primary hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <ChevronLeft size={18} /> {reviewData.navigation.backText}
        </button>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm border border-primary/20 shadow-sm">
      {number}
    </div>
    <h2 className="text-2xl font-extrabold text-slate-800">{title}</h2>
  </div>
);

// ✨ ADDED 'placeholder' prop here to support the new inputs!
const InputBlock = ({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col justify-center">
    <label className="text-sm font-semibold text-slate-600 mb-2 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
    />
  </div>
);

// ✨ MODIFIED: Added a wrapper height so the stars align perfectly horizontally with the inputs next to them!
const RatingBlock = ({ title, required, rating, onRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col justify-center">
      <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2 items-center h-[52px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRating(star)}
          >
            <Star
              size={30}
              className={`transition-all duration-200 ${
                star <= (hover || rating)
                  ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                  : "text-slate-200 hover:text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Review;
