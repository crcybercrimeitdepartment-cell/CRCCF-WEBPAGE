import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  internshipData,
  iconConfig,
  heroData,
  pagesData,
  labels,
  imageConfig
} from "../../data/skillDevelopment/InternshipPageData";

// ─── Pagination ───
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-row justify-between items-center bg-white border border-slate-100/80 rounded-full py-1.5 px-1.5 sm:px-4 mt-10 shadow-sm animate-fade-in z-10">
      <button
        className="flex items-center gap-1 bg-slate-100/50 border border-slate-100/80 text-slate-600 px-2 sm:px-5 py-1 sm:py-2 rounded-full cursor-pointer font-body text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed justify-center shrink-0"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="flex flex-row gap-0.5 sm:gap-3 justify-center shrink min-w-0">
        {pagesData.map((page) => {
          const isActive = currentPage === page.number;
          return (
            <button
              key={page.number}
              className={`flex flex-col items-center justify-center bg-transparent border py-0.5 px-1.5 sm:px-4 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 shrink-0 ${isActive
                  ? 'bg-blue-100/70 border-blue-500/30 shadow-[0_2px_6px_rgba(37,99,235,0.06)]'
                  : 'border-transparent text-slate-500 hover:bg-slate-100/50 hover:border-slate-100/30'
                }`}
              onClick={() => onPageChange(page.number)}
            >
              <span className={`font-heading font-extrabold text-xs sm:text-base leading-none transition-colors duration-300 ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                {page.number}
              </span>
              <span className={`text-[6px] sm:text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 leading-none mt-px ${isActive ? 'text-blue-700' : 'text-slate-400'}`}>
                <span className="hidden min-[420px]:inline">{page.label}</span>
                <span className="min-[420px]:hidden">{page.label.split(' ')[0]}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        className="flex items-center gap-1 bg-slate-100/50 border border-slate-100/80 text-slate-600 px-2 sm:px-5 py-1 sm:py-2 rounded-full cursor-pointer font-body text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed justify-center shrink-0"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── Internship Card ───
function InternshipCard({ internship }) {
  const { id, title } = internship;
  const navigate = useNavigate();
  const config = iconConfig[id];

  return (
    <div
      className="group relative w-full whiteboard-card flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 cursor-pointer text-slate-800 animate-fade-in hover:border-blue-200/50"
      onClick={() => navigate(`/internship/${id}`)}
    >
      <div className="w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl neumorphic-icon-container p-2 sm:p-2.5 transition-transform duration-500 group-hover:scale-105 select-none">
        <div
          className="w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 drop-shadow-xs"
          style={{ color: config?.color || '#3b82f6' }}
        >
          {config ? config.icon(config.color) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-center min-w-0 pr-1 select-none">
        <h3
          className="text-[13px] sm:text-[14px] font-bold text-slate-800 leading-snug font-heading tracking-tight capitalize group-hover:text-blue-600 transition-colors duration-200"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-blue-500 flex items-center gap-0.5 transition-transform duration-300 group-hover:translate-x-0.5">
            {labels.knowMoreBtn}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Internship List ───
function InternshipList({ category }) {
  const filtered = internshipData.filter((item) => item.category === category);
  return filtered.map((internship) => (
    <InternshipCard key={internship.id} internship={internship} />
  ));
}

// ─── Search Results ───
function SearchResults({ searchQuery }) {
  const query = searchQuery.toLowerCase();
  const results = internshipData.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  });

  if (results.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
        <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          <path strokeLinecap="round" d="M8 11h6" />
        </svg>
        <p className="text-sm font-semibold">{labels.noInternshipsFound}</p>
        <p className="text-xs mt-1">{labels.tryDifferentSearch}</p>
      </div>
    );
  }

  return results.map((internship) => (
    <InternshipCard key={internship.id} internship={internship} />
  ));
}

// ─── Dashboard Page ───
export function InternshipDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col min-h-screen bg-corporate-radial">
      <header className="text-center mb-10 relative">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
          {heroData.titleStart}
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            {heroData.titleHighlight}
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {heroData.subtitle}
        </p>
      </header>

      <div className="max-w-xl w-full mx-auto mb-8 relative z-20">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={heroData.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full bg-white border border-slate-100/80 text-sm text-slate-900 placeholder:text-slate-400 font-body focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500 transition-all duration-300 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100/60 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <section className="mb-16 flex-grow z-10 px-1 sm:px-4">
        <div className="relative whiteboard-frame overflow-visible">
          <div className="absolute top-[-14px] left-[-14px] w-[24px] h-[24px] bg-[#1e293b] border border-slate-700 rounded-tl-[24px] rounded-br-[3px] z-30 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 border border-slate-500 shadow-inner" />
          </div>
          <div className="absolute top-[-14px] right-[-14px] w-[24px] h-[24px] bg-[#1e293b] border border-slate-700 rounded-tr-[24px] rounded-bl-[3px] z-30 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 border border-slate-500 shadow-inner" />
          </div>
          <div className="absolute bottom-[-14px] left-[-14px] w-[24px] h-[24px] bg-[#1e293b] border border-slate-700 rounded-bl-[24px] rounded-tr-[3px] z-30 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 border border-slate-500 shadow-inner" />
          </div>
          <div className="absolute bottom-[-14px] right-[-14px] w-[24px] h-[24px] bg-[#1e293b] border border-slate-700 rounded-br-[24px] rounded-tl-[3px] z-30 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 border border-slate-500 shadow-inner" />
          </div>

          <div className="whiteboard-surface p-6 sm:p-10 md:p-12 relative overflow-hidden min-h-[400px] rounded-[16px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 pointer-events-none z-10" />
            <div className="absolute inset-0 border border-slate-400/35 rounded-[16px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {searchQuery ? (
                <SearchResults searchQuery={searchQuery} />
              ) : (
                <>
                  {currentPage === 1 && <InternshipList category="cyber" />}
                  {currentPage === 2 && <InternshipList category="software" />}
                  {currentPage === 3 && <InternshipList category="other" />}
                  {currentPage === 4 && <InternshipList category="law" />}
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-[-13px] left-[12%] right-[12%] h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-md shadow-[0_6px_12px_rgba(15,23,42,0.15)] border-t border-slate-400 flex items-end justify-between px-6 sm:px-12 pb-[2.5px] z-30 select-none pointer-events-none">
            <div className="absolute left-1 top-0 w-2.5 h-3.5 bg-slate-500 rounded-b-sm border-r border-slate-600" />
            <div className="absolute right-1 top-0 w-2.5 h-3.5 bg-slate-500 rounded-b-sm border-l border-slate-600" />

            <div 
              className="pointer-events-auto cursor-pointer group relative mb-0.5 ml-2 sm:ml-4 animate-drop-from-header transition-all duration-300 hover:-translate-y-2.5 hover:scale-105 active:translate-y-0 active:scale-95" 
              style={{ animationDelay: '500ms' }}
              title="Whiteboard Eraser"
            >
              <div className="w-18 sm:w-22 h-6.5 sm:h-7.5 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-t-[7px] border-t border-x border-blue-400 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.45),0_4px_8px_rgba(15,23,42,0.15)] relative flex items-center justify-center px-1.5 sm:px-2">
                <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-[4px] h-3.5 bg-slate-900/10 rounded-r-full" />
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[4px] h-3.5 bg-slate-900/10 rounded-l-full" />
                <div className="w-full h-4.5 sm:h-5 bg-gradient-to-b from-blue-600 to-blue-700 border border-blue-500/40 rounded-[4px] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.18)] flex flex-col justify-center items-center select-none px-1">
                  <div className="text-[5.5px] sm:text-[6.5px] text-white font-black tracking-[0.08em] leading-none font-sans drop-shadow-sm">
                    {labels.whiteboardEraser}
                  </div>
                  <div className="text-[3px] sm:text-[3.5px] text-blue-200 font-bold tracking-widest leading-none mt-0.5 font-sans">
                    {labels.eraserDesc}
                  </div>
                </div>
              </div>
              <div className="w-18 sm:w-22 h-2.5 bg-slate-700 rounded-b-[7px] border-t border-slate-900 shadow-[0_3px_6px_rgba(15,23,42,0.25)] flex flex-col justify-between overflow-hidden">
                <div className="h-0.5 bg-slate-600 w-full" />
                <div className="h-0.5 bg-slate-800 w-full" />
              </div>
            </div>

            <div className="flex gap-4 items-end pb-0.5 pr-2">
              <div 
                className="pointer-events-auto cursor-pointer group relative flex items-center animate-drop-from-header transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[1deg] active:translate-y-0 rotate-[1.5deg] transform origin-bottom-left" 
                style={{ animationDelay: '150ms' }}
                title="Red Marker"
              >
                <div className="w-1.5 h-2.5 bg-red-600 rounded-l border-y border-l border-red-700 z-10 -mr-[1px]" />
                <div className="w-14 sm:w-16 h-3 sm:h-3.5 bg-gradient-to-b from-slate-100 via-white to-slate-200 border-y border-slate-300 flex items-center justify-center relative select-none">
                  <div className="flex flex-col items-center justify-center scale-[0.7] sm:scale-[0.8] origin-center">
                    <div className="text-[4px] text-red-600 font-extrabold tracking-wider leading-none">{labels.whiteboardLabel}</div>
                    <div className="text-[3.5px] text-red-700 font-bold leading-none mt-0.5">{labels.markerHindi}</div>
                  </div>
                </div>
                <div className="w-5 sm:w-6 h-3.5 sm:h-4 bg-gradient-to-b from-red-500 to-red-700 border border-red-800 rounded-r shadow-sm relative -ml-[1px] flex items-center justify-end z-20">
                  <div className="w-3.5 h-[1.5px] bg-red-700 rounded-sm absolute left-0.5 top-0.5 shadow-inner" />
                  <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1.5 h-2.5 bg-red-900 rounded-r-full shadow-inner z-10" />
                </div>
              </div>

              <div 
                className="pointer-events-auto cursor-pointer group relative flex items-center animate-drop-from-header transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg] active:translate-y-0 rotate-[-2.5deg] transform origin-bottom-right" 
                style={{ animationDelay: '850ms' }}
                title="Blue Marker"
              >
                <div className="w-1.5 h-2.5 bg-blue-600 rounded-l border-y border-l border-blue-700 z-10 -mr-[1px]" />
                <div className="w-14 sm:w-16 h-3 sm:h-3.5 bg-gradient-to-b from-slate-100 via-white to-slate-200 border-y border-slate-300 flex items-center justify-center relative select-none">
                  <div className="flex flex-col items-center justify-center scale-[0.7] sm:scale-[0.8] origin-center">
                    <div className="text-[4px] text-blue-600 font-extrabold tracking-wider leading-none">{labels.whiteboardLabel}</div>
                    <div className="text-[3.5px] text-blue-700 font-bold leading-none mt-0.5">{labels.markerHindi}</div>
                  </div>
                </div>
                <div className="w-5 sm:w-6 h-3.5 sm:h-4 bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-800 rounded-r shadow-sm relative -ml-[1px] flex items-center justify-end z-20">
                  <div className="w-3.5 h-[1.5px] bg-blue-700 rounded-sm absolute left-0.5 top-0.5 shadow-inner" />
                  <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1.5 h-2.5 bg-blue-900 rounded-r-full shadow-inner z-10" />
                </div>
              </div>

              <div 
                className="pointer-events-auto cursor-pointer group relative flex items-center animate-drop-from-header transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] active:translate-y-0 rotate-[0.5deg]" 
                style={{ animationDelay: '1200ms' }}
                title="Black Marker"
              >
                <div className="w-1.5 h-2.5 bg-slate-900 rounded-l border-y border-l border-slate-950 z-10 -mr-[1px]" />
                <div className="w-15 sm:w-17 h-3 sm:h-3.5 bg-gradient-to-b from-slate-100 via-white to-slate-200 border-y border-slate-300 flex items-center justify-center relative select-none">
                  <div className="flex flex-col items-center justify-center scale-[0.7] sm:scale-[0.8] origin-center">
                    <div className="text-[4px] text-slate-800 font-extrabold tracking-wider leading-none">{labels.whiteboardLabel}</div>
                    <div className="text-[3.5px] text-slate-950 font-bold leading-none mt-0.5">{labels.markerHindi}</div>
                  </div>
                </div>
                <div className="w-5.5 sm:w-6.5 h-3.5 sm:h-4 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-950 rounded-r shadow-sm relative -ml-[1px] flex items-center justify-end z-20">
                  <div className="w-3.5 h-[1.5px] bg-slate-700 rounded-sm absolute left-0.5 top-0.5 shadow-inner" />
                  <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1.5 h-2.5 bg-slate-950 rounded-r-full shadow-inner z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={4}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

// ─── Detail Page ───
export function InternshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = internshipData.find(item => item.id === id);

  if (!internship) {
    return (
      <div className="min-h-screen bg-corporate-radial flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">{labels.notFoundTitle}</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-xl text-white font-semibold text-sm cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgb(0, 107, 179) 0%, rgb(0, 80, 150) 100%)' }}
          >
            {labels.goBackBtn}
          </button>
        </div>
      </div>
    );
  }

  const { title, duration, stipend, skills, description, type, category } = internship;

  const bgImage = category === 'software'
    ? imageConfig.softwareBg
    : category === 'other'
    ? imageConfig.managementBg
    : category === 'law'
    ? imageConfig.lawBg
    : imageConfig.webdevBg;

  return (
    <div className="min-h-screen text-slate-100 bg-cover bg-center bg-fixed relative flex flex-col items-center justify-center px-4 py-8" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('${bgImage}')`,
    }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center justify-center">


        <div className="scale-110 mt-2.5 max-sm:scale-[0.65] max-sm:-mt-20">
          <div className="rounded-[20px] shadow-[inset_0_0_0_2px_#475569,inset_0_0_45px_rgba(6,182,212,0.15),inset_0_0_0_10px_#000] h-[420px] w-[680px] mx-auto px-3 pt-3 pb-7 relative flex items-center justify-center bg-[linear-gradient(135deg,#0b0f19_0%,#111827_50%,#1e293b_100%)] [transform-style:preserve-3d] [transform-origin:50%_100%] animate-[laptopOpen_1.5s_ease-out_forwards] before:content-[''] before:absolute before:w-[680px] before:h-[14px] before:bg-[linear-gradient(#979899,transparent)] before:top-[-3px] before:[transform:rotateX(90deg)] before:rounded-[5px] after:content-[''] after:absolute after:bg-[linear-gradient(to_bottom,#272727,#0d0d0d)] after:rounded-b-[20px] after:bottom-[2px] after:h-[28px] after:left-[2px] after:w-[676px]">
            <div className="absolute w-[120px] h-[14px] bg-black top-3 left-1/2 -translate-x-1/2 rounded-b-[6px]" />

            <div className="!text-white [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-center py-5 px-10 z-[1] overflow-hidden">
              <h1 className="text-[28px] font-extrabold mb-1.5 tracking-[-0.5px] bg-[linear-gradient(135deg,#ffffff_40%,#a5f3fc_100%)] bg-clip-text text-transparent !text-transparent [text-shadow:0_2px_12px_rgba(165,243,252,0.15)] leading-[1.25]">{title}</h1>
              <div className="w-[50px] h-[3px] bg-[linear-gradient(90deg,#22d3ee,#818cf8)] mt-3 mb-4 mx-auto rounded-full shadow-[0_0_10px_rgba(34,211,238,0.4)]" />
              <p className="text-[13px] leading-[1.6] mb-[18px] !text-white opacity-95">{description}</p>

              <div className="flex justify-center gap-4 mb-[22px] max-sm:gap-2 max-sm:flex-wrap">
                <span className="inline-flex items-center bg-[rgba(30,41,59,0.45)] border border-[rgba(255,255,255,0.12)] py-2 px-[18px] rounded-full backdrop-blur-[8px] text-[12.5px] font-semibold !text-slate-200 transition-all duration-300 hover:bg-[rgba(30,41,59,0.7)] hover:border-[rgba(6,182,212,0.4)] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.12)]">
                  <svg className="w-4 h-4 inline mr-1.5 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="align-middle">{duration}</span>
                </span>
                <span className="inline-flex items-center bg-[rgba(30,41,59,0.45)] border border-[rgba(255,255,255,0.12)] py-2 px-[18px] rounded-full backdrop-blur-[8px] text-[12.5px] font-semibold !text-slate-200 transition-all duration-300 hover:bg-[rgba(30,41,59,0.7)] hover:border-[rgba(6,182,212,0.4)] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.12)]">
                  <svg className="w-4 h-4 inline mr-1.5 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span className="align-middle">{stipend}</span>
                </span>
                <span className="inline-flex items-center bg-[rgba(30,41,59,0.45)] border border-[rgba(255,255,255,0.12)] py-2 px-[18px] rounded-full backdrop-blur-[8px] text-[12.5px] font-semibold !text-slate-200 transition-all duration-300 hover:bg-[rgba(30,41,59,0.7)] hover:border-[rgba(6,182,212,0.4)] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.12)]">
                  <svg className="w-4 h-4 inline mr-1.5 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="align-middle">{type}</span>
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {skills.map((skill, index) => (
                  <span key={index} className="text-[11px] font-medium bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] py-1.5 px-3.5 rounded-full !text-cyan-400 transition-all duration-300 [text-shadow:0_0_8px_rgba(6,182,212,0.25)] hover:bg-[rgba(6,182,212,0.16)] hover:border-[rgba(6,182,212,0.45)] hover:scale-105 hover:shadow-[0_2px_10px_rgba(6,182,212,0.08)]">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[radial-gradient(circle_at_center,#e2e3e4_85%,#a9abac_100%)] border-solid border-[#a0a3a7] rounded-b-[12px] border-[1px_2px_0_2px] shadow-[inset_0_-2px_8px_0_#6c7074] h-7 -mt-2.5 relative w-[800px] z-[9] after:content-[''] after:absolute after:bg-[#e2e3e4] after:rounded-b-[10px] after:shadow-[inset_0_0_4px_2px_#babdbf] after:h-3 after:left-1/2 after:-ml-[70px] after:top-0 after:w-[140px] before:content-[''] before:absolute before:bg-transparent before:rounded-b-[3px] before:bottom-[-2px] before:shadow-[-350px_0_#272727,330px_0_#272727] before:h-0.5 before:left-1/2 before:-ml-2.5 before:w-10" />
        </div>
      </div>
    </div>
  );
}

export default function InternshipPage() {
  return (
    <>
      <style>{`
  /* Theme Design Colors */
  :root {
    --color-blue-600: #2563EB;
    --color-blue-700: #1D4ED8;
    --color-navy-dark: #0F2B5B;
    --color-blue-500: #3B82F6;
    --color-blue-100: #DBEAFE;
    --color-slate-900: #0F172A;
    --color-slate-600: #475569;
    --color-slate-500: #64748B;
    --color-slate-400: #94A3B8;
    --color-slate-50: #F8FAFC;
    --color-white: #FFFFFF;
    --color-slate-100: #F1F5F9;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-fade-in:nth-child(1) { animation-delay: 0ms; }
  .animate-fade-in:nth-child(2) { animation-delay: 50ms; }
  .animate-fade-in:nth-child(3) { animation-delay: 100ms; }
  .animate-fade-in:nth-child(4) { animation-delay: 150ms; }
  .animate-fade-in:nth-child(5) { animation-delay: 200ms; }
  .animate-fade-in:nth-child(6) { animation-delay: 250ms; }
  .animate-fade-in:nth-child(7) { animation-delay: 300ms; }
  .animate-fade-in:nth-child(8) { animation-delay: 350ms; }
  .animate-fade-in:nth-child(9) { animation-delay: 400ms; }
  .animate-fade-in:nth-child(10) { animation-delay: 450ms; }
  .animate-fade-in:nth-child(11) { animation-delay: 500ms; }
  .animate-fade-in:nth-child(12) { animation-delay: 550ms; }

  .bg-corporate-radial {
    background-image:
      radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 40%);
  }

  .whiteboard-surface {
    background-color: #f1f5f9;
    background-image:
      radial-gradient(circle at 50% 30%, #f8fafc 20%, #e2e8f0 100%),
      linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
    background-size: 100% 100%, 24px 24px, 24px 24px;
    position: relative;
    box-shadow:
      inset 0 4px 12px rgba(15, 23, 42, 0.07),
      inset 0 -4px 12px rgba(15, 23, 42, 0.02);
  }

  .whiteboard-frame {
    border: 14px solid;
    border-color: #f8fafc #94a3b8 #475569 #cbd5e1;
    border-radius: 28px;
    background-color: #cbd5e1;
    box-shadow:
      0 30px 60px -15px rgba(15, 23, 42, 0.3),
      0 15px 30px -10px rgba(15, 23, 42, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.12),
      inset 0 2px 4px rgba(255, 255, 255, 0.85),
      inset 0 -2px 4px rgba(15, 23, 42, 0.25);
  }

  .whiteboard-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid rgba(226, 232, 240, 0.7);
    box-shadow:
      0 8px 20px -8px rgba(15, 23, 42, 0.08),
      0 3px 8px -4px rgba(15, 23, 42, 0.04),
      0 0 15px -3px rgba(37, 99, 235, 0.1),
      0 0 30px -5px rgba(59, 130, 246, 0.06),
      inset 0 2px 4px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px rgba(15, 23, 42, 0.03);
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .whiteboard-card:hover {
    transform: translateY(-4px) scale(1.015);
    border-color: rgba(59, 130, 246, 0.25);
    box-shadow:
      0 18px 30px -10px rgba(15, 23, 42, 0.12),
      0 8px 12px -6px rgba(15, 23, 42, 0.08),
      0 0 20px -2px rgba(37, 99, 235, 0.18),
      0 0 40px -4px rgba(59, 130, 246, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.95),
      inset 0 -4px 8px rgba(15, 23, 42, 0.015);
  }
  .whiteboard-card:active {
    transform: translateY(-1px) scale(0.99);
    box-shadow:
      0 4px 8px -2px rgba(15, 23, 42, 0.08),
      0 0 12px -2px rgba(37, 99, 235, 0.12),
      inset 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .neumorphic-icon-container {
    background: #f8fafc;
    box-shadow:
      inset 2px 2px 5px rgba(15, 23, 42, 0.06),
      inset -3px -3px 7px rgba(255, 255, 255, 0.8),
      2px 4px 10px rgba(15, 23, 42, 0.03);
    border: 1px solid rgba(226, 232, 240, 0.5);
  }

  @keyframes dropFromHeader {
    0% { opacity: 0; transform: translateY(-950px); }
    60% { opacity: 1; transform: translateY(15px); }
    80% { transform: translateY(-7px); }
    92% { transform: translateY(3px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-drop-from-header {
    animation: dropFromHeader 3.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  
  .bg-blue-600 { background-color: var(--color-blue-600); }
  .text-blue-600 { color: var(--color-blue-600); }
  .bg-blue-700 { background-color: var(--color-blue-700); }
  .text-blue-700 { color: var(--color-blue-700); }
  .bg-blue-100 { background-color: var(--color-blue-100); }
  .text-slate-900 { color: var(--color-slate-900); }
  .text-slate-600 { color: var(--color-slate-600); }
  .text-slate-500 { color: var(--color-slate-500); }
  .text-slate-400 { color: var(--color-slate-400); }
  .bg-slate-50 { background-color: var(--color-slate-50); }
  .bg-white { background-color: var(--color-white); }
  .bg-slate-100 { background-color: var(--color-slate-100); }
  
  .border-slate-100 { border-color: var(--color-slate-100); }
  .border-blue-500 { border-color: var(--color-blue-500); }
  .border-transparent { border-color: transparent; }
`}</style>
      <InternshipDashboard />
    </>
  );
}
