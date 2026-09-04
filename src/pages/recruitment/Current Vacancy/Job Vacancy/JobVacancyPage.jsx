import Cloudinary from '../../../../constants/Cloudinary';
import ComingSoonPage from '../../../common/ComingSoonPage';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
const heroImg = Cloudinary.heroimg;
const heroBg = Cloudinary.jobVacancyBg;
import { portalConfig, jobListings, filterOptions, jobVacancyData } from '../../../../data/recruitment/JobVacancyPageData';


// --- EmptyState.jsx ---



function EmptyState() {
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (email.trim()) setNotified(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center py-24 px-6 max-w-md mx-auto"
    >
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center">
          <svg className="w-14 h-14 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border-2 border-indigo-200"
        />
      </div>

      <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-3">Coming Soon</span>
      <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-3">No vacancies found</h3>
      <p className="text-[14px] text-slate-500 leading-relaxed max-w-xs mb-8">
        No positions match your current filters. New openings are posted regularly — be the first to know.
      </p>

      {!notified ? (
        <form onSubmit={handleNotify} className="w-full max-w-xs flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 text-[14px] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] rounded-xl transition-all shadow-md active:scale-95"
          >
            Notify Me
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 font-semibold text-[14px]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          You'll be notified of new openings!
        </motion.div>
      )}
    </motion.div>
  );
}

// --- FilterBar.jsx ---



const ChipSelect = ({ id, label, value, options, onChange }) => (
  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
    <label htmlFor={id} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer hover:border-indigo-300 transition-colors w-full"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

function FilterBar({ filters, options, onFilterChange, totalCount, filteredCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.department !== 'All' ||
    filters.location !== 'All' ||
    filters.experience !== 'All' ||
    filters.employmentType !== 'All' ||
    filters.status !== 'All';

  const activeCount = [
    filters.department !== 'All',
    filters.location !== 'All',
    filters.experience !== 'All',
    filters.employmentType !== 'All',
    filters.status !== 'All',
  ].filter(Boolean).length;

  const handleReset = () => {
    onFilterChange('department', 'All');
    onFilterChange('location', 'All');
    onFilterChange('experience', 'All');
    onFilterChange('employmentType', 'All');
    onFilterChange('status', 'All');
    onFilterChange('sort', 'Latest');
  };

  const filterFields = (
    <>
      <ChipSelect id="filter-dept"   label="Department"      value={filters.department}     options={options.departments}     onChange={(v) => onFilterChange('department', v)} />
      <ChipSelect id="filter-loc"    label="Location"        value={filters.location}       options={options.locations}       onChange={(v) => onFilterChange('location', v)} />
      <ChipSelect id="filter-exp"    label="Experience"      value={filters.experience}     options={options.experience}      onChange={(v) => onFilterChange('experience', v)} />
      <ChipSelect id="filter-type"   label="Employment Type" value={filters.employmentType} options={options.employmentTypes} onChange={(v) => onFilterChange('employmentType', v)} />
      <ChipSelect id="filter-status" label="Status"          value={filters.status}         options={options.statuses}        onChange={(v) => onFilterChange('status', v)} />
      <ChipSelect id="filter-sort"   label="Sort By"         value={filters.sort}           options={options.sortOptions}     onChange={(v) => onFilterChange('sort', v)} />
    </>
  );

  return (
    <div className="sticky top-0 z-30 bg-white/92 backdrop-blur-md border-b border-slate-200 shadow-sm">

      {/* ── Mobile header ── */}
      <div className="flex items-center justify-between px-4 py-2.5 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{activeCount}</span>
            )}
          </button>
          {hasActiveFilters && (
            <button onClick={handleReset} className="text-[11px] font-bold text-rose-500 hover:text-rose-700">Clear</button>
          )}
        </div>
        <span className="text-[11px] font-bold text-slate-500">{filteredCount} / {totalCount}</span>
      </div>

      {/* ── Mobile expandable panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden border-t border-slate-100"
          >
            <div className="grid grid-cols-2 gap-3 px-4 py-3">
              {filterFields}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop: single row ── */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex items-end gap-3 xl:gap-4 w-full">
          {filterFields}

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 self-end mb-0.5 shrink-0" />

        {/* Results + clear — right side */}
        <div className="flex flex-col gap-0.5 shrink-0 ml-auto">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Results</span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-700">{filteredCount} of {totalCount}</span>
            {hasActiveFilters && (
              <button onClick={handleReset} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
                Clear
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// --- JobCard.jsx ---



const statusConfig = {
  'OPEN':         { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'CLOSING SOON': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500'  },
  'UPCOMING':     { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-400'   },
  'CLOSED':       { bg: 'bg-slate-50',   text: 'text-slate-500',   border: 'border-slate-200',   dot: 'bg-slate-400'  },
};

const MetaPill = ({ icon, label }) => (
  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
    {icon}
    <span>{label}</span>
  </div>
);

const SmIcon = ({ d }) => (
  <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const locationD   = "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z";
const peopleD     = "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z";
const calD        = "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";
const briefcaseD  = "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const arrowD      = "M14 5l7 7m0 0l-7 7m7-7H3";

// ─── GRID CARD ───────────────────────────────────────────────────────────────
function GridCard({ job, onViewDetails, saved, onSave }) {
  const status = statusConfig[job.status] || statusConfig['CLOSED'];
  const isApplyDisabled = job.status === 'CLOSED' || job.status === 'UPCOMING';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -3, boxShadow: '0 10px 36px -8px rgba(99,102,241,0.13)' }}
      className="group relative bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col gap-3.5 flex-1">
        {/* TOP */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {job.department}
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
              {job.jobCode}
            </span>
          </div>
          <div className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${job.status === 'OPEN' ? 'animate-pulse' : ''}`} />
            {job.status}
          </div>
        </div>

        {/* CENTER */}
        <div className="space-y-1">
          <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
            {job.jobTitle}
          </h3>
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{job.shortDescription}</p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {job.tags?.map((t) => (
              <span key={t} className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* BOTTOM META */}
        <div className="flex flex-wrap gap-1.5">
          <MetaPill icon={<SmIcon d={locationD} />}  label={job.location} />
          <MetaPill icon={<SmIcon d={peopleD} />}    label={`${job.openPositions} open`} />
          <MetaPill icon={<SmIcon d={calD} />}       label={`Closes ${job.applicationLastDate}`} />
          <MetaPill icon={<SmIcon d={briefcaseD} />} label={job.employmentType} />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <button
            id={`view-${job.id}`}
            onClick={() => onViewDetails(job)}
            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            View Details
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={arrowD} />
            </svg>
          </button>
          <button
            id={`apply-${job.id}`}
            disabled={isApplyDisabled}
            className={`px-3 py-2 text-[12px] font-bold rounded-xl border transition-all active:scale-95 ${
              isApplyDisabled
                ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400'
            }`}
          >
            Apply
          </button>
          <button
            id={`save-${job.id}`}
            onClick={onSave}
            title={saved ? 'Saved' : 'Save'}
            className={`p-2 rounded-xl border transition-all active:scale-90 ${
              saved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-500'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── LIST CARD ────────────────────────────────────────────────────────────────
function ListCard({ job, onViewDetails, saved, onSave }) {
  const status = statusConfig[job.status] || statusConfig['CLOSED'];
  const isApplyDisabled = job.status === 'CLOSED' || job.status === 'UPCOMING';

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ x: 2, boxShadow: '0 4px 24px -6px rgba(99,102,241,0.12)' }}
      className="group bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl overflow-hidden transition-all duration-250 flex items-stretch"
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 ${job.status === 'OPEN' ? 'bg-emerald-400' : job.status === 'CLOSING SOON' ? 'bg-amber-400' : job.status === 'UPCOMING' ? 'bg-blue-400' : 'bg-slate-200'}`} />

      <div className="flex-1 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Main info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{job.department}</span>
            <span className="text-[10px] font-mono font-semibold text-slate-400">{job.jobCode}</span>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${job.status === 'OPEN' ? 'animate-pulse' : ''}`} />
              {job.status}
            </div>
          </div>
          <h3 className="text-[14px] font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">{job.jobTitle}</h3>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1"><SmIcon d={locationD} />{job.location}</span>
            <span className="flex items-center gap-1"><SmIcon d={peopleD} />{job.openPositions} open</span>
            <span className="flex items-center gap-1"><SmIcon d={calD} />Closes {job.applicationLastDate}</span>
            <span className="flex items-center gap-1"><SmIcon d={briefcaseD} />{job.employmentType}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id={`view-list-${job.id}`}
            onClick={() => onViewDetails(job)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-xl transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
          >
            View Details
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={arrowD} />
            </svg>
          </button>
          <button
            id={`apply-list-${job.id}`}
            disabled={isApplyDisabled}
            className={`px-3.5 py-2 text-[12px] font-bold rounded-xl border transition-all active:scale-95 whitespace-nowrap ${
              isApplyDisabled
                ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400'
            }`}
          >
            Apply
          </button>
          <button
            id={`save-list-${job.id}`}
            onClick={onSave}
            className={`p-2 rounded-xl border transition-all active:scale-90 ${
              saved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-500'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
function JobCard({ job, onViewDetails, viewMode = 'grid', index }) {
  const [saved, setSaved] = useState(false);

  const props = { job, onViewDetails, saved, onSave: () => setSaved((s) => !s) };

  return viewMode === 'list'
    ? <ListCard {...props} />
    : <GridCard {...props} />;
}

// --- JobList.jsx ---




function JobList({ jobs, onViewDetails, viewMode = 'grid' }) {
  if (jobs.length === 0) return <EmptyState />;

  return viewMode === 'list' ? (
    <div className="flex flex-col gap-2.5">
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} viewMode="list" onViewDetails={onViewDetails} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} viewMode="grid" onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}

// --- PortalBackground.jsx ---



// SVG icon paths — subset of PageAmbientBackground icons, at 40% intensity
const iconPaths = [
  // Briefcase
  <path key="b" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  // Resume
  <path key="r" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  // Calendar
  <path key="c" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  // Mail
  <path key="m" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  // Search
  <path key="s" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  // User
  <path key="u" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
];

// Seeded pseudo-random to avoid re-layout on re-renders
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function PortalBackground() {
  const elements = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      icon: iconPaths[i % iconPaths.length],
      top: `${seededRand(i * 3) * 92}%`,
      left: `${seededRand(i * 7) * 92}%`,
      duration: 20 + seededRand(i * 11) * 12,
      delay: seededRand(i * 13) * 8,
      opacity: 0.012 + seededRand(i * 17) * 0.02, // 40% of full background (0.03–0.08)
      size: 18 + seededRand(i * 5) * 14,
    })), []);

  const particles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: `pp-${i}`,
      top: `${seededRand(i * 19) * 100}%`,
      left: `${seededRand(i * 23) * 100}%`,
      duration: 18 + seededRand(i * 29) * 10,
      delay: seededRand(i * 31) * 6,
      opacity: 0.008 + seededRand(i * 37) * 0.016, // 40% of full
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-slate-700 flex items-center justify-center will-change-transform"
          style={{ top: el.top, left: el.left, width: el.size, height: el.size, opacity: el.opacity }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: el.duration, repeat: Infinity, ease: 'easeInOut', delay: el.delay }}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
            {el.icon}
          </svg>
        </motion.div>
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-slate-400 rounded-full will-change-transform"
          style={{ top: p.top, left: p.left, width: '2px', height: '2px', opacity: p.opacity }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

// --- PortalHero.jsx ---




function PortalHero({ pageTitle, pageSubtitle, searchQuery, onSearchChange }) {
  return (
    <div 
      className="relative w-full overflow-hidden border-b border-slate-100"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Light Overlay for readability without blur */}
      <div className="absolute inset-0 bg-white/60" />
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8 flex flex-col items-center text-center gap-1">


        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
        >
          {pageTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
          className="text-[16px] sm:text-[17px] text-slate-700 max-w-xl leading-relaxed font-medium"
        >
          {pageSubtitle}
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
          className="w-full max-w-lg mt-4"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="portal-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, department, or location…"
              className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 placeholder-slate-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all group-hover:shadow-lg"
            />
          </div>
          
        </motion.div>

      </div>
    </div>
  );
}

// --- JobPortal.jsx ---








function applyFilters(jobs, filters) {
  let result = [...jobs];

  const q = (filters.search || '').toLowerCase().trim();
  if (q) {
    result = result.filter(
      (j) =>
        j.jobTitle.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.department !== 'All')    result = result.filter((j) => j.department    === filters.department);
  if (filters.location !== 'All')      result = result.filter((j) => j.location      === filters.location);
  if (filters.experience !== 'All')    result = result.filter((j) => j.positionLevel === filters.experience);
  if (filters.employmentType !== 'All') result = result.filter((j) => j.employmentType === filters.employmentType);
  if (filters.status !== 'All')        result = result.filter((j) => j.status        === filters.status);

  switch (filters.sort) {
    case 'Closing Soon':
      result = result.sort((a, b) => new Date(a.applicationLastDate) - new Date(b.applicationLastDate));
      break;
    case 'A–Z':
      result = result.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      break;
    default:
      break;
  }
  return result;
}

// View-mode toggle button
function ViewToggle({ mode, active, onClick, title, children }) {
  return (
    <button
      onClick={() => onClick(mode)}
      title={title}
      className={`p-2 rounded-lg border transition-all ${
        active
          ? 'bg-indigo-600 border-indigo-600 text-white'
          : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
      }`}
    >
      {children}
    </button>
  );
}

function JobPortal() {
  const navigate = useNavigate();

  const [heroSearch, setHeroSearch]  = useState('');
  const [viewMode, setViewMode]      = useState('list'); // 'list' | 'grid'
  const [filters, setFilters] = useState({
    search: '',
    department: 'All',
    location: 'All',
    experience: 'All',
    employmentType: 'All',
    status: 'All',
    sort: 'Latest',
  });

  const handleHeroSearch = (val) => {
    setHeroSearch(val);
    setFilters((f) => ({ ...f, search: val }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    if (key === 'search') setHeroSearch(value);
  };

  const filteredJobs = useMemo(() => applyFilters(jobListings, filters), [filters]);

  const handleViewDetails = (job) => {
    navigate('/recruitment/job-vacancy-details', { state: { jobId: job.id } });
  };

  return (
    <div className="relative min-h-screen w-full">
      <PortalBackground />

      <div className="relative z-10">
        {/* ── SECTION 1: Small Hero ── */}
        <PortalHero
          pageTitle={portalConfig.pageTitle}
          pageSubtitle={portalConfig.pageSubtitle}
          searchQuery={heroSearch}
          onSearchChange={handleHeroSearch}
        />

        {/* ── SECTION 2: Sticky Filter Bar ── */}
        <FilterBar
          filters={filters}
          options={filterOptions}
          onFilterChange={handleFilterChange}
          totalCount={jobListings.length}
          filteredCount={filteredJobs.length}
        />

        {/* ── SECTION 3: Job Listing ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">

          {/* Section header with view toggle */}
          <div className="flex items-center justify-between mb-5">
            <div>
              {filteredJobs.length > 0 ? (
                <>
                  <h2 className="text-[19px] font-bold text-slate-900 tracking-tight">Open Positions</h2>
                  <p className="text-[12px] text-slate-400 mt-0.5 font-medium">
                    {filteredJobs.length} vacanc{filteredJobs.length === 1 ? 'y' : 'ies'} available
                  </p>
                </>
              ) : (
                <h2 className="text-[19px] font-bold text-slate-900 tracking-tight">No Results</h2>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Active badge */}
              {filteredJobs.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Accepting Applications
                </div>
              )}

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                <ViewToggle mode="grid" active={viewMode === 'grid'} onClick={setViewMode} title="Grid view">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </ViewToggle>
                <ViewToggle mode="list" active={viewMode === 'list'} onClick={setViewMode} title="List view">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </ViewToggle>
              </div>
            </div>
          </div>

          <JobList
            jobs={filteredJobs}
            onViewDetails={handleViewDetails}
            viewMode={viewMode}
          />
        </main>
      </div>
    </div>
  );
}


export default JobPortal;
