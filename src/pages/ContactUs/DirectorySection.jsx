import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, X, Megaphone, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import Announcements from "../../sections/ContactUs/Announcements";
import { createPortal } from "react-dom";

// ✨ 1. Import the images you want to pass to the Announcement here!
// import anotherImage from "../assets/contact_image/anotherImage.png";

// Custom hook for the Typewriter Effect
const useTypewriter = (words) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[index] || words[0];

    if (subIndex === currentWord.length + 1 && !isDeleting) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  const currentText = words[index] || "";
  return `${currentText.substring(0, subIndex)}${blink ? "|" : " "}`;
};

const DirectorySection = ({ title, Icon, data = [] }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Trigger banner animation shortly after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const searchPrompts = useMemo(
    () => [
      `Search ${title} name...`,
      "Try searching 'EMP-1042'...",
      "Search by Department...",
      "Try searching 'Developer'...",
    ],
    [title],
  );

  const typewriterPlaceholder = useTypewriter(searchPrompts);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Conditional Scroll Lock
  useEffect(() => {
    if (selectedPerson) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.innerWidth >= 1024) {
        document.body.style.overflow = "auto";
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPerson]);

  if (selectedPerson) {
    return (
      <ProfileDetail
        person={selectedPerson}
        onBack={() => setSelectedPerson(null)}
        title={title}
      />
    );
  }

  return (
    <section id={title.toLowerCase()} className="scroll-mt-8 relative">
      <div className="sticky top-0 z-20 bg-[#F8FAFC]/80 backdrop-blur-md pt-2 pb-6 mb-6 border-b border-slate-200/60">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
          {/* === LEFT SIDE: TITLE & PREMIUM BANNER === */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                <Icon size={24} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {title.toLowerCase().includes("employee")
                  ? "Employee & Team Profiles"
                  : `${title} Directory`}
              </h2>
            </div>

            {title.toLowerCase().includes("employee") && (
              <div
                className={`pl-1 sm:pl-[52px] mt-2 pr-2 sm:pr-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${
                  showBanner
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <div className="relative p-5 sm:p-6 rounded-2xl shadow-sm border border-indigo-100/60 overflow-hidden group transition-all duration-500 hover:shadow-md cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-white transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-indigo-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10 flex flex-col gap-2.5">
                    <p className="text-[14px] sm:text-[15px] text-slate-700 font-medium leading-relaxed transition-colors duration-500 group-hover:text-indigo-950">
                      View detailed information about our employees, including
                      their name, department, employee ID, and roles. This
                      directory helps in easily identifying team members and
                      understanding the organizational structure.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === RIGHT SIDE: SEARCH & BUTTONS === */}
          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto pt-1">
            <div className="relative w-full lg:w-[260px] group">
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex items-center">
                <Search
                  className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={
                    isFocused || searchQuery ? "" : typewriterPlaceholder
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 text-textHeading text-sm rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                    title="Clear search"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>

            {title.toLowerCase().includes("employee") && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsAnnouncementOpen(true)}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all shadow-sm relative shrink-0 group hover:-translate-y-0.5"
                  title="Announcements"
                >
                  <Megaphone
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                </button>

                <Link
                  to="/ex-employees"
                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all shadow-sm relative shrink-0 group hover:-translate-y-0.5 block"
                  title="View Ex-Employees"
                >
                  <UserX
                    size={20}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-16 text-textSec font-medium bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-3">
          <Search size={40} className="text-slate-300" />
          <p>No records found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item, index) => (
            <div
              key={item.sl}
              onClick={() => setSelectedPerson(item)}
              style={{
                animationFillMode: "both",
                animationDelay: `${index * 50}ms`,
              }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group animate-[fadeInUp_0.4s_ease-out]"
            >
              <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                <img loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 flex flex-col flex-1 relative bg-white">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mt-1 mb-4 line-clamp-1">
                  {item.position}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    ID: {item.empId}
                  </span>
                  <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                    View <span className="hidden sm:inline">Profile</span>{" "}
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* THE UPDATED ANNOUNCEMENT COMPONENT CALL */}
      {isAnnouncementOpen &&
        createPortal(
          <Announcements
            onClose={() => setIsAnnouncementOpen(false)}
            title="Add Your Title Here"
            subtitle="Add Your Subtitle Here"
            marqueeText="🌟 OUTSTANDING PERFORMANCE 🌟 OUTSTANDING PERFORMANCE"
            adminImages={[]} // Passed as an array
          />,
          document.body,
        )}
    </section>
  );
};

// ==========================================
// TABBED UI PROFILE COMPONENT (WITH NEW FIELDS)
// ==========================================
const ProfileDetail = ({ person, onBack, title }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Professional Info", "Contact Details"];

  return (
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="p-2 bg-slate-50 rounded-lg shadow-sm text-slate-500 hover:text-primary hover:bg-slate-100 transition-all border border-slate-200 hover:-translate-x-1"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-textHeading">
          {title} Profile
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Profile Image */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-md border-4 border-slate-50 relative">
            <img loading="lazy" decoding="async"
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Details & Tabs */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1.5">
              {person.name}
            </h2>
            <p className="text-sm sm:text-base text-primary font-bold uppercase tracking-widest">
              {person.position}
            </p>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-slate-100 scrollbar-hide mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${
                  activeTab === tab
                    ? "bg-primary text-white border-primary"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div
            className="flex-1 animate-[fadeIn_0.3s_ease-out] min-h-[260px]"
            key={activeTab}
          >
            {activeTab === "Overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BentoBlock label="ID Number" value={person.empId} />
                <BentoBlock label="Join Date" value={person.joinDate} />
                <BentoBlock label="Gender" value={person.gender} />
                {/* ✨ NEW FIELD */}
                <BentoBlock label="Qualification" value={person.qualification} />
              </div>
            )}

            {activeTab === "Professional Info" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BentoBlock label="Department" value={person.department} />
                <BentoBlock label="Job Profile" value={person.jobProfile} />
                <BentoBlock label="Experience" value={person.experience} />
                {/* ✨ NEW FIELD */}
                <BentoBlock label="Current CTC" value={person.ctc} />
                {/* ✨ NEW FIELD (Spans full width for longer text) */}
                <BentoBlock 
                  label="Core Skills" 
                  value={person.skills} 
                  className="sm:col-span-2" 
                />
              </div>
            )}

            {activeTab === "Contact Details" && (
              <div className="flex flex-col gap-6">
                {/* ✨ NEW FIELD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BentoBlock label="Phone Number" value={person.phone} />
                  <BentoBlock label="Email Address" value={person.email} />
                </div>
                
                {/* Existing Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#0A66C2] text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-[#004182] transition-all shadow-md hover:-translate-y-1"
                  >
                    LinkedIn Profile
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="flex-1 bg-slate-800 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-slate-900 transition-all shadow-md hover:-translate-y-1"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HELPER COMPONENT ---
const BentoBlock = ({ label, value, className = "" }) => (
  <div
    // ✨ FIX: Added 'min-w-0' here so the box respects the grid boundaries
    className={`bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-center min-w-0 ${className}`}
  >
    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
      {label}
    </span>
    {/* ✨ FIX: Added 'truncate' to add "..." to long text, and 'title' for hover */}
    <span 
      className="text-sm sm:text-base font-bold text-slate-800 truncate"
      title={value} // This makes the full text pop up when they hover!
    >
      {value || "N/A"}
    </span>
  </div>
);

export default DirectorySection;
