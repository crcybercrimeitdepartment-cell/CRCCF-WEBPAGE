import { motion } from 'framer-motion';
import { iconMap } from '../../data/global/searchData';
import { Search } from 'lucide-react';

export default function SearchDropdown({ results, selectedIndex, onSelect, query, onClear }) {
  const highlightMatch = (text, query, isHeading = false) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span className={isHeading ? "text-white" : ""}>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[#3B82F6] font-extrabold bg-[#3B82F6]/20 rounded-[2px]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="absolute top-full left-0 right-0 mt-3 z-[1000] overflow-hidden bg-[rgba(12,26,58,0.95)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(26,86,219,0.15)] max-h-[420px] flex flex-col"
    >
      {/* Triangle Arrow */}
      <div className="absolute top-[-6px] right-[14px] w-[12px] h-[12px] bg-[#0C1A3A] border-l border-t border-[rgba(255,255,255,0.15)] rotate-45 pointer-events-none" />

      <div className="overflow-y-auto custom-scrollbar p-2">
        {results.length > 0 ? (
          results.map((result, index) => {
            const Icon = iconMap[result.item.iconName] || Search;
            const isSelected = selectedIndex === index;

            return (
              <motion.div
                key={`${result.item.link}-${index}`}
                onClick={() => onSelect(result.item)}
                onMouseEnter={() => {/* Optional: update selectedIndex on hover */}}
                className={`
                  flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${isSelected ? 'bg-[rgba(59,130,246,0.15)] border-[rgba(59,130,246,0.3)]' : 'hover:bg-[rgba(255,255,255,0.05)] border-transparent'}
                  border
                `}
                initial={false}
                animate={{ x: isSelected ? 4 : 0 }}
              >
                <div className={`
                  shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]'}
                `}>
                  <Icon size={18} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-[14px] font-bold text-white line-clamp-2 leading-[1.2] pr-1">
                      {highlightMatch(result.item.title, query, true)}
                    </h4>
                    <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.05)]">
                      {result.item.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-[rgba(255,255,255,0.5)] line-clamp-1 leading-tight">
                    {highlightMatch(result.item.description, query)}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mb-4 border border-[rgba(255,255,255,0.1)]">
              <Search size={32} className="text-[rgba(255,255,255,0.4)]" />
            </div>
            <p className="text-[16px] font-bold text-white mb-1">No results found for "{query}"</p>
            <p className="text-[13px] text-[rgba(255,255,255,0.5)] mb-6">We couldn't find anything matching your search.</p>
            
            <div className="w-full text-left bg-[rgba(255,255,255,0.03)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] mb-4">
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-[rgba(255,255,255,0.4)] mb-3">Popular Pages</h5>
              <div className="flex flex-wrap gap-2">
                {['Report Crime', 'Internships', 'Cyber Security Tips', 'Reach Us'].map((suggest) => (
                  <button 
                    key={suggest}
                    onClick={() => onSelect({ title: suggest, link: suggest === 'Report Crime' ? '/report-crime' : suggest === 'Internships' ? '/skill-development/internships' : suggest === 'Reach Us' ? '/reachus' : '/report-crime/cyber-security-tips' })}
                    className="px-3 py-1.5 bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(59,130,246,0.2)] hover:text-blue-400 text-[12px] text-[rgba(255,255,255,0.7)] rounded-full transition-colors cursor-pointer border-none"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onClear}
              className="px-5 py-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white text-[13px] font-bold rounded-lg transition-colors cursor-pointer border border-[rgba(255,255,255,0.1)]"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="px-4 py-2 bg-[rgba(0,0,0,0.2)] border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-tighter">
          <div className="flex gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>{results.length} Results Found</span>
        </div>
      )}
    </motion.div>
  );
}
