import Cloudinary from '../constants/Cloudinary';
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Bell, Search } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiInfo, 
  FiLayers, 
  FiMonitor, 
  FiBookOpen, 
  FiUsers, 
  FiPieChart, 
  FiPhone 
} from 'react-icons/fi';
// dynamic imports below
import SearchDropdown from './Search/SearchDropdown'

function MobileNavItem({ item, index, Icon, color, go, location, depth }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const active = item.href.startsWith('/#') 
    ? (location.pathname === '/' && (location.hash === item.href.replace('/', '') || (item.href === '/#home' && !location.hash)))
    : location.pathname.startsWith(item.href);

  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      go(item.href);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div 
        className={`group flex justify-between items-center py-[10px] px-3 cursor-pointer transition-all duration-300 rounded-xl hover:bg-white/15 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${active ? 'bg-white/10 text-white' : 'text-white/85'} ${depth === 0 ? 'opacity-0 animate-staggered-entry' : ''}`} 
        style={depth === 0 ? { 
          '--animation-order': index, 
          '--icon-color': color || '#fff',
          animationDelay: `calc(${index} * 0.1s + 0.3s)`
        } : { paddingLeft: `${depth * 16 + 12}px` }}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
        role="button"
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        <div className="flex items-center">
          {Icon && <Icon className="text-xl mr-4 opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_8px_var(--icon-color)]" style={{ color: 'var(--icon-color, #fff)' }} />}
          <span className={`font-medium text-base tracking-wide ${active ? 'text-cyan-400' : ''}`}>{item.label || item.text}</span>
        </div>
        {hasChildren && (
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'opacity-70'}`} 
          />
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden flex flex-col gap-1 mt-1"
          >
            {item.children.map((child, childIdx) => (
              <MobileNavItem 
                key={child.label || child.text} 
                item={child} 
                index={childIdx} 
                go={go} 
                location={location}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Software Products', href: '/software-products' },
  { label: 'Skill Development', href: '/skill-development' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDd, setOpenDd] = useState(null)
  const [mobileExp, setMobileExp] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Search Optimization Refs
  const searchTimeoutRef = useRef(null)
  const fuseInstanceRef = useRef(null)

  // Search Worker Ref
  const searchWorkerRef = useRef(null)

  // Lazy-load and precompute the search index via Web Worker only when the search is opened
  useEffect(() => {
    if (searchOpen && !searchWorkerRef.current) {
      // Initialize Web Worker
      const worker = new Worker(new URL('../workers/searchWorker.js', import.meta.url), { type: 'module' });
      searchWorkerRef.current = worker;

      worker.onmessage = (e) => {
        const { type, payload } = e.data;
        if (type === 'SEARCH_RESULTS') {
          setSearchResults(payload.results);
          setSelectedIndex(0);
        }
      };

      // Tell worker to init
      worker.postMessage({ type: 'INIT' });
    }
    
    // Cleanup worker on unmount if it exists, though typically navbar stays mounted
    return () => {
      // We don't terminate immediately to avoid re-init costs, but we could
    };
  }, [searchOpen]);

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
    setSelectedIndex(0)
  }

  useEffect(() => {
    if (!searchOpen && !notifOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        setNotifOpen(false);
      }
    };
    const onClick = (e) => {
      if (!e.target.closest('.nav-search-zone')) closeSearch();
      if (!e.target.closest('.nav-notif-zone')) setNotifOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [searchOpen, notifOpen]);
  // Close notification when search box is opened
  useEffect(() => {
    if (searchOpen && notifOpen) setNotifOpen(false);
  }, [searchOpen, notifOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);
  const go = (href) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            highlightElement(el)
          }
        }, 150)
      } else {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          highlightElement(el)
        }
      }
    } else {
      const hashIndex = href.indexOf('#')
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : ''

      navigate(href)
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            highlightElement(el)
          }
        }, 150)
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
  }

  const highlightElement = (el) => {
    el.style.transition = 'all 0.5s ease'
    el.style.boxShadow = '0 0 50px rgba(59, 130, 246, 0.5)'
    el.style.transform = 'scale(1.02)'
    el.style.zIndex = '50'
    
    setTimeout(() => {
      el.style.boxShadow = 'none'
      el.style.transform = 'scale(1)'
      el.style.zIndex = 'auto'
    }, 2000)
  }

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    // Debounce search to prevent lag
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (q.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        if (searchWorkerRef.current) {
          searchWorkerRef.current.postMessage({ type: 'SEARCH', payload: { query: q, limit: 15 } });
        }
      }, 250); // 250ms debounce
    } else {
      setSearchResults([]);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % searchResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults.length > 0) {
        handleSelect(searchResults[selectedIndex].item)
      }
    }
  }

  const handleSelect = (item) => {
    go(item.link)
    closeSearch()
  }


  const handleSearch = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleSelect(searchResults[selectedIndex].item)
    }
  }

  return (
    <>
      <header className={`sticky top-0 z-[100] bg-[#0C1A3A] transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.40)]' : ''}`}>
        <div className="container-custom flex h-[66px] items-center gap-[12px] xl:gap-[24px]">

          {/* ── LOGO ── */}
          <a className="group flex shrink-0 cursor-pointer items-center gap-[10px] no-underline" href="/#home" onClick={e => { e.preventDefault(); go('/#home') }}>
            <img src={Cloudinary.logoIile24} alt="CRCCF Logo" className="h-[46px] w-[46px] object-contain" width="46" height="46" loading="lazy" decoding="async" />
            <div className="flex flex-col">
              <span className="font-['Outfit',sans-serif] text-[17px] font-[900] text-[#fff] tracking-[-0.01em] leading-[1]">CRCCF</span>
              <span className="mt-[3px] text-[8px] font-[600] text-[rgba(255,255,255,0.40)] uppercase tracking-[0.06em]">CR CYBER CRIME FOUNDATION</span>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <nav className="flex flex-1 items-center justify-center gap-[2px] xl:gap-[4px] 2xl:gap-[6px] max-[1100px]:hidden">
            {navLinks.map(link => {
              const active = link.href.startsWith('/#') 
                ? (location.pathname === '/' && (location.hash === link.href.replace('/', '') || (link.href === '/#home' && !location.hash)))
                : location.pathname.startsWith(link.href);

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenDd(link.label)}
                  onMouseLeave={() => setOpenDd(null)}
                >
                  <a
                    className={`group relative inline-flex cursor-pointer items-center gap-[4px] p-[8px_10px] 2xl:p-[8px_14px] text-[13px] 2xl:text-[14px] font-[600] whitespace-nowrap transition-colors duration-300 no-underline ${
                      active 
                        ? 'text-cyan-400' 
                        : 'text-white hover:text-cyan-400'
                    }`}
                    href={link.href}
                    onClick={e => { e.preventDefault(); !link.children && go(link.href) }}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={13}
                        className={`transition-transform duration-200 opacity-[0.65] ${openDd === link.label ? 'rotate-180' : ''}`}
                      />
                    )}
                    <span className={`absolute left-[10px] 2xl:left-[14px] bottom-[4px] h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-transform duration-300 origin-left w-[calc(100%-20px)] 2xl:w-[calc(100%-28px)] ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </a>

                  {link.children && (
                    <div className={`absolute top-[calc(100%+6px)] left-0 z-[600] min-w-[210px] rounded-[10px] border border-[#E5E7EB] bg-[#fff] p-[5px] shadow-[0_14px_44px_rgba(0,0,0,0.18)] transition-all duration-220 cubic-bezier(0.4,0,0.2,1) ${openDd === link.label ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>
                      {link.children.map(c => {
                        const childActive = location.hash === c.href.replace('/', '');
                        return (
                          <a key={c.label} href={c.href} 
                            className={`block p-[9px_14px] text-[13.5px] rounded-[7px] font-[500] no-underline transition-all duration-150 ${
                              childActive 
                                ? 'bg-[#EFF6FF] text-[#1A56DB] font-[700]' 
                                : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#1A56DB]'
                            }`}
                            onClick={e => { e.preventDefault(); go(c.href) }}>
                            {c.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── RIGHT ── */}
          <div className="flex shrink-0 min-w-fit items-center gap-[8px] xl:gap-[14px] ml-auto">

            {/* SEARCH */}
            <div className="nav-search-zone relative flex items-center">
              <button
                className={`shrink-0 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center transition-all duration-180 hover:text-[#fff] ${searchOpen ? 'text-[#fff]' : 'text-[rgba(255,255,255,0.72)]'}`}
                onClick={() => searchOpen ? closeSearch() : setSearchOpen(true)}
                aria-label="Search"
              >
                {searchOpen ? <X size={19} /> : <Search size={19} />}
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    className="absolute top-[calc(100%+16px)] right-[-10px] w-[360px] bg-[#0C1A3A] border border-[rgba(255,255,255,0.15)] rounded-[12px] p-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(26,86,219,0.15)] z-[1000] max-[480px]:right-[-60px] max-[480px]:w-[280px] max-[600px]:w-[320px]"
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Triangle Arrow */}
                    <div className="absolute top-[-6px] right-[14px] w-[12px] h-[12px] bg-[#0C1A3A] border-l border-t border-[rgba(255,255,255,0.15)] rotate-45 max-[480px]:right-[64px]" />
                    
                    <div className="relative flex items-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden">
                      <input
                        id="global-search-input"
                        name="search"
                        autoFocus
                        className="flex-1 bg-transparent border-none outline-none text-[#fff] text-[13px] font-['Inter',sans-serif] p-[10px_12px] min-w-0 h-[38px] placeholder:text-[rgba(255,255,255,0.3)]"
                        type="search"
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        aria-label="Search"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                      <button type="submit" aria-label="Submit search" className="bg-[#1A56DB] text-white border-none p-[0_12px] h-[38px] cursor-pointer transition-colors hover:bg-[#1e40af]">
                        <Search size={16} />
                      </button>
                    </div>

                    {searchQuery.trim() && (
                      <SearchDropdown 
                        results={searchResults} 
                        selectedIndex={selectedIndex}
                        query={searchQuery}
                        onSelect={handleSelect}
                        onClear={closeSearch}
                      />
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="nav-notif-zone relative">
              <button className="relative bg-transparent border-none p-0 text-[rgba(255,255,255,0.75)] cursor-pointer flex items-center transition-all duration-180 hover:text-[#fff]"
                onClick={() => setNotifOpen(v => !v)}
                aria-label="Toggle notifications"
              >
                <Bell size={20} strokeWidth={2} />
                <span className="absolute top-[-2px] right-[-4px] w-[14px] h-[14px] bg-[#E02424] text-[#fff] text-[8px] font-[900] rounded-full flex items-center justify-center border-[1.5px] border-[#0C1A3A]">0</span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    className="absolute top-[calc(100%+12px)] right-0 w-[200px] bg-[#0C1A3A] border border-[rgba(255,255,255,0.15)] rounded-[12px] p-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-[1000]"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-[13px] text-[#fff] text-center">No new notifications</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="inline-flex shrink-0 min-w-fit items-center justify-center bg-[#E02424] text-white font-['Inter',sans-serif] text-[13px] font-[800] h-[34px] px-[16px] rounded-[6px] border-none cursor-pointer whitespace-nowrap transition-all duration-180 hover:bg-[#C01C1C] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(224,36,36,0.25)] max-[1100px]:hidden sm:flex max-[520px]:hidden"
              onClick={() => go('/report-crime')}
            >
              Report Crime
            </button>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            className="hidden bg-transparent border-none cursor-pointer text-[#fff] p-0 transition-all duration-150 hover:bg-[rgba(255,255,255,0.10)] max-[1100px]:flex"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[9000] flex justify-end">
            <motion.div
              className="absolute inset-0 bg-[rgba(0,0,0,0.50)] backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            
            <motion.div
              className="w-full max-w-[390px] h-full bg-glass-gradient backdrop-blur-xl border-l border-white/20 p-[20px] pb-[16px] flex flex-col shadow-glass overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide bg-[#0b0f1c]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              {/* Background Blobs inside drawer */}
              <div className="absolute -top-[5%] left-[25%] w-[350px] h-[350px] bg-[#00eaff59] rounded-full blur-[80px] z-0 animate-blob-float-1 pointer-events-none"></div>
              <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] bg-[#0046ff40] rounded-full blur-[100px] z-0 animate-blob-float-2 pointer-events-none"></div>
              
              {/* Header */}
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/15 opacity-0 animate-fade-up-sidebar [animation-delay:200ms] relative z-10">
                <div className="flex items-center justify-center drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] animate-logo-glow">
                  <img src={Cloudinary.logoIile24} alt="CRCCF" className="h-[46px] w-[46px] object-contain rounded-full" width="46" height="46" loading="lazy" decoding="async" />
                </div>
                <button 
                  aria-label="Close mobile menu"
                  className="bg-white/10 border border-white/15 text-white w-9 h-9 rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:bg-white/20 hover:scale-105 hover:rotate-90"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Menu List */}
              <div className="flex flex-col gap-[2px] flex-1 relative z-10">
                {navLinks.map((link, index) => {
                  const Icon = [FiHome, FiInfo, FiLayers, FiMonitor, FiBookOpen, FiUsers, FiPieChart, FiPhone][index % 8];
                  const color = ['#00eaff', '#ffd700', '#ff7eb3', '#7afcff', '#00ffcc', '#ffb347', '#b57aff', '#ff6b6b'][index % 8];
                  
                  return (
                    <MobileNavItem 
                      key={link.label} 
                      item={link} 
                      index={index} 
                      Icon={Icon} 
                      color={color} 
                      go={go} 
                      location={location}
                      depth={0}
                    />
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-4 opacity-0 animate-fade-up-sidebar [animation-delay:1000ms] relative z-10">
                <button 
                  className="w-full bg-report-gradient text-white border border-white/10 p-[12px] rounded-xl text-base font-semibold tracking-wide cursor-pointer shadow-report transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-report-hover hover:bg-report-hover active:scale-95"
                  onClick={() => go('/report-crime')}
                >
                  Report Crime
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
