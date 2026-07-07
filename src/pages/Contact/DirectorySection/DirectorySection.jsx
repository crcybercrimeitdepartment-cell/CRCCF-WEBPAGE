import Cloudinary from '../../../constants/Cloudinary';
import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, X, Megaphone, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import Announcements from "../sections/Announcements/Announcements";
import { createPortal } from "react-dom";
import { directorySectionData } from "./DirectorySectionData";
const stickyNoteBg = Cloudinary.downloadRemovebgPreview;


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
      const nextWord = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 0);
      return () => clearTimeout(nextWord);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const searchPrompts = useMemo(
    () => directorySectionData.getSearchPrompts(title),
    [title],
  );

  const typewriterPlaceholder = useTypewriter(searchPrompts);

  const filteredData = data.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (item.name || "").toLowerCase().includes(q) ||
      String(item.empId || "").toLowerCase().includes(q) ||
      (item.department || "").toLowerCase().includes(q) ||
      (item.position || "").toLowerCase().includes(q);
    return matchesSearch;
  });

  useEffect(() => {
    if (selectedPerson) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
      <div className="relative z-20 pt-2 pb-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
          <div className="flex flex-col gap-3 flex-1 w-full lg:mr-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                {React.createElement(Icon, { size: 24 })}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1120] tracking-tight">
                {title.toLowerCase().includes("employee") ? (
                  <>
                    {directorySectionData.texts.employeeTitlePrefix}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                      {directorySectionData.texts.employeeTitleHighlight}
                    </span>
                  </>
                ) : (
                  <>
                    {title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                      {directorySectionData.texts.defaultTitleHighlight}
                    </span>
                  </>
                )}
              </h2>
            </div>

            {title.toLowerCase().includes("employee") && (
              <div
                className={`pl-1 sm:pl-[52px] mt-2 pr-2 sm:pr-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${showBanner ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
              >
                <div className="relative p-5 sm:p-6 rounded-2xl shadow-sm border border-indigo-100/60 overflow-hidden group transition-all duration-500 hover:shadow-md cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-white transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-indigo-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <p className="text-[14px] sm:text-[15px] text-slate-700 font-medium leading-relaxed transition-colors duration-500 group-hover:text-indigo-950">
                      {directorySectionData.texts.employeeDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto pt-1">
            <div className="relative w-full lg:w-[260px] group">
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300" size={18} />
                <input
                  type="text"
                  placeholder={isFocused || searchQuery ? "" : typewriterPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 text-textHeading text-sm rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors" title="Clear search">
                    <X size={14} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>

            {title.toLowerCase().includes("employee") && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => setIsAnnouncementOpen(true)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all shadow-sm relative shrink-0 group hover:-translate-y-0.5" title="Announcements">
                  <Megaphone size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                </button>
                <Link to="/ex-employees" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all shadow-sm relative shrink-0 group hover:-translate-y-0.5 block" title="View Ex-Employees">
                  <UserX size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✨ STICKY NOTE DIRECTORY GRID ✨ */}
      {filteredData.length === 0 ? (
        <div className="text-center py-16 text-textSec font-medium bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-3">
          <Search size={40} className="text-slate-300" />
          <p>{directorySectionData.texts.noRecordsFoundPrefix} "{searchQuery}"</p>
        </div>
      ) : (
        <div className="relative w-full rounded-2xl overflow-hidden">
          {/* ── Subtle Background Effects (Radial Light & Grain) ── */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.5)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none z-0"></div>
          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-multiply pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          ></div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 py-10 px-4 sm:px-2">
            {filteredData.map((item, index) => {
              const rotations = ["-rotate-2", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"];
              const rotationClass = rotations[(index * 7) % rotations.length];

              return (
                <div
                  key={item.empId || item.sl || index}
                  onClick={() => setSelectedPerson(item)}
                  style={{
                    animationFillMode: "both",
                    animationDelay: `${index * 70}ms`,
                    containerType: "inline-size",
                  }}
                  className={`relative w-full aspect-[4/5] cursor-pointer group will-change-transform animate-[fadeInUp_0.5s_ease-out] ${rotationClass} hover:rotate-0 hover:scale-[1.04] hover:-translate-y-2 transition-all duration-300 ease-out`}
                >
                  <img
                    src={stickyNoteBg}
                    alt="Sticky Note Background"
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none z-0 mix-blend-darken scale-[1.20]
                      drop-shadow-[0_4px_10px_rgba(0,0,0,0.06)]
                      group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]
                      group-hover:brightness-[1.02]
                      transition-all duration-300 ease-out"
                  />

                  {/*
                    LAYER 2 — Content Container.
                    Key principle: justify-center on the outer column so the
                    entire content group (photo + text) sits centered within
                    the safe-padded paper area. No flex-1, no justify-between.
                    Everything clusters naturally — zero dead space.
                  */}
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                      /* Shifted safe zones to account for paperclip (top) and folded corner (bottom) */
                      paddingTop: "22%",
                      paddingBottom: "18%",
                      paddingLeft: "12%",
                      paddingRight: "12%",
                      gap: "2%",
                    }}
                  >
                    {/* ── Polaroid Photo ── */}
                    <div
                      className="flex-shrink-0 bg-white self-center"
                      style={{
                        width: "42%",
                        padding: "4px",
                        paddingBottom: "8px",
                        boxShadow: "0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -1px rgba(0,0,0,0.04)",
                        borderRadius: "4px",
                        transform: "translateY(18px)"
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full object-cover object-top filter contrast-[1.02] rounded-[2px]"
                        style={{ aspectRatio: "1 / 1", display: "block" }}
                      />
                    </div>

                    {/* ── Unified Text Block ── */}
                    <div
                      className="flex flex-col items-center w-full shrink-0 text-center"
                      style={{ gap: "2px" }}
                    >
                      <h3
                        className="font-bold text-slate-800 leading-tight w-full truncate tracking-tight px-1"
                        style={{ fontSize: "clamp(11px, 6cqi, 16px)" }}
                      >
                        {item.name}
                      </h3>

                      <p
                        className="text-blue-600 font-semibold tracking-wide w-full truncate px-1"
                        style={{ fontSize: "clamp(9px, 4.5cqi, 12px)" }}
                      >
                        {item.position}
                      </p>

                      <div className="w-3/4 border-t border-slate-200/80 my-[2px]" />

                      <span
                        className="text-slate-500 font-medium tracking-wider whitespace-nowrap"
                        style={{ fontSize: "clamp(8px, 4cqi, 10px)" }}
                      >
                        {directorySectionData.texts.idPrefix}{item.empId}
                      </span>

                      <span
                        className="text-slate-800 font-bold group-hover:text-blue-600 transition-colors duration-300 flex items-center"
                        style={{ fontSize: "clamp(9px, 5cqi, 12px)", gap: "2px", marginTop: "1px" }}
                      >
                        {directorySectionData.texts.viewProfile}{" "}
                        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isAnnouncementOpen &&
        createPortal(
          <Announcements
            onClose={() => setIsAnnouncementOpen(false)}
            title={directorySectionData.announcement.title}
            subtitle={directorySectionData.announcement.subtitle}
            marqueeText={directorySectionData.announcement.marqueeText}
            adminImages={[]}
          />,
          document.body,
        )}
    </section>
  );
};

// ==========================================
// PROFILE DETAIL COMPONENT
// ==========================================
const ProfileDetail = ({ person, onBack, title }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = directorySectionData.profileTabs;

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
          {title} {directorySectionData.texts.profileTitleSuffix}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-md border-4 border-slate-50 relative">
            <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1.5">{person.name}</h2>
            <p className="text-sm sm:text-base text-primary font-bold uppercase tracking-widest">{person.position}</p>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-slate-100 scrollbar-hide mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${activeTab === tab
                  ? "bg-primary text-white border-primary"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 animate-[fadeIn_0.3s_ease-out] min-h-[260px]" key={activeTab}>
            {activeTab === directorySectionData.profileTabs[0] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BentoBlock label={directorySectionData.profileLabels.idNumber} value={person.empId} />
                <BentoBlock label={directorySectionData.profileLabels.joinDate} value={person.joinDate} />
                <BentoBlock label={directorySectionData.profileLabels.gender} value={person.gender} />
                <BentoBlock label={directorySectionData.profileLabels.qualification} value={person.qualification} />
              </div>
            )}
            {activeTab === directorySectionData.profileTabs[1] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BentoBlock label={directorySectionData.profileLabels.department} value={person.department} />
                <BentoBlock label={directorySectionData.profileLabels.jobProfile} value={person.jobProfile} />
                <BentoBlock label={directorySectionData.profileLabels.experience} value={person.experience} />
                <BentoBlock label={directorySectionData.profileLabels.ctc} value={person.ctc} />
                <BentoBlock label={directorySectionData.profileLabels.skills} value={person.skills} className="sm:col-span-2" />
              </div>
            )}
            {activeTab === directorySectionData.profileTabs[2] && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BentoBlock label={directorySectionData.profileLabels.phone} value={person.phone} />
                  <BentoBlock label={directorySectionData.profileLabels.email} value={person.email} />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a href={person.linkedin} target="_blank" rel="noreferrer" className="flex-1 bg-[#0A66C2] text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-[#004182] transition-all shadow-md hover:-translate-y-1">
                    {directorySectionData.profileLinks.linkedinText}
                  </a>
                  <a href={`mailto:${person.email}`} className="flex-1 bg-slate-800 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-slate-900 transition-all shadow-md hover:-translate-y-1">
                    {directorySectionData.profileLinks.messageText}
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

const BentoBlock = ({ label, value, className = "" }) => (
  <div className={`bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-center min-w-0 ${className}`}>
    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm sm:text-base font-bold text-slate-800 truncate" title={value}>{value || directorySectionData.profileLinks.notAvailable}</span>
  </div>
);

export default DirectorySection;