import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Bell, Search } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import Fuse from 'fuse.js'
import { searchableData } from '../data/global/searchData'
import SearchDropdown from './Search/SearchDropdown'

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

  const fuse = new Fuse(searchableData, {
    keys: ['title', 'description', 'tags', 'category'],
    threshold: 0.35,
    distance: 100,
    includeMatches: true
  })

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
        window.scrollTo(0, 0)
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
    const q = e.target.value
    setSearchQuery(q)
    if (q.trim()) {
      const results = fuse.search(q)
      setSearchResults(results)
      setSelectedIndex(0)
    } else {
      setSearchResults([])
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
          <a className="group flex shrink-0 cursor-pointer items-center gap-[10px] no-underline" href="#home" onClick={e => { e.preventDefault(); go('#home') }}>
            <img src="https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png" alt="CRCCF Logo" className="h-[46px] w-[46px] object-contain" />
            <div className="flex flex-col">
              <span className="font-['Outfit',sans-serif] text-[17px] font-[900] text-[#fff] tracking-[-0.01em] leading-[1]">CRCCF</span>
              <span className="mt-[3px] text-[8px] font-[600] text-[rgba(255,255,255,0.40)] uppercase tracking-[0.06em]">CR CYBER CRIME FOUNDATION</span>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <nav className="flex flex-1 items-center gap-[2px] xl:gap-[6px] max-[1100px]:hidden">
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
                    className={`inline-flex cursor-pointer items-center gap-[4px] p-[8px_10px] xl:p-[8px_14px] text-[13px] xl:text-[14px] font-[600] rounded-[6px] whitespace-nowrap transition-all duration-170 no-underline ${
                      active 
                        ? 'text-[#fff] bg-[#1A56DB] shadow-[0_4px_12px_rgba(26,86,219,0.2)]' 
                        : 'text-[rgba(255,255,255,0.85)] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.08)]'
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
          <div className="flex shrink-0 items-center gap-[8px] xl:gap-[14px] ml-auto">

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
                        autoFocus
                        className="flex-1 bg-transparent border-none outline-none text-[#fff] text-[13px] font-['Inter',sans-serif] p-[10px_12px] min-w-0 h-[38px] placeholder:text-[rgba(255,255,255,0.3)]"
                        type="text"
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                      />
                      <button type="submit" className="bg-[#1A56DB] text-white border-none p-[0_12px] h-[38px] cursor-pointer transition-colors hover:bg-[#1e40af]">
                        <Search size={16} />
                      </button>
                    </div>

                    {searchQuery.trim() && (
                      <SearchDropdown 
                        results={searchResults} 
                        selectedIndex={selectedIndex}
                        query={searchQuery}
                        onSelect={handleSelect}
                      />
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="nav-notif-zone relative">
              <button className="relative bg-transparent border-none p-0 text-[rgba(255,255,255,0.75)] cursor-pointer flex items-center transition-all duration-180 hover:text-[#fff]"
                onClick={() => setNotifOpen(v => !v)}
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
              className="inline-flex items-center justify-center bg-[#E02424] text-white font-['Inter',sans-serif] text-[13px] font-[800] h-[34px] px-[16px] rounded-[6px] border-none cursor-pointer whitespace-nowrap transition-all duration-180 hover:bg-[#C01C1C] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(224,36,36,0.25)] max-[1100px]:hidden sm:flex max-[520px]:hidden"
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
          <>
            <motion.div
              className="fixed inset-0 bg-[rgba(0,0,0,0.50)] z-[8000] backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[min(320px,92vw)] bg-[#fff] z-[9000] flex flex-col shadow-[-16px_0_60px_rgba(0,0,0,0.22)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <div className="flex items-center justify-between p-[14px_18px] bg-[#0C1A3A] border-b border-b-[rgba(255,255,255,0.08)]">
                <img src="https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png" alt="CRCCF" className="h-[40px] w-[40px] object-contain" />
                <button className="bg-[rgba(255,255,255,0.10)] border-none text-[#fff] cursor-pointer w-[32px] h-[32px] rounded-[6px] flex items-center justify-center transition-all duration-150 hover:bg-[rgba(255,255,255,0.20)]" onClick={() => setMobileOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-[8px_12px]">
                {navLinks.map(link => {
                  const active = link.href.startsWith('/#') 
                    ? (location.pathname === '/' && (location.hash === link.href.replace('/', '') || (link.href === '/#home' && !location.hash)))
                    : location.pathname.startsWith(link.href);

                  return (
                    <div key={link.label}>
                      <div
                        className={`flex items-center justify-between p-[12px_14px] text-[14px] font-[600] cursor-pointer rounded-[8px] transition-all duration-150 ${
                          active 
                            ? 'bg-[#1A56DB] text-[#fff] shadow-[0_4px_12px_rgba(26,86,219,0.2)]' 
                            : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#1A56DB]'
                        }`}
                        onClick={() => {
                          if (link.children) setMobileExp(v => v === link.label ? null : link.label)
                          else go(link.href)
                        }}
                      >
                        {link.label}
                        {link.children && (
                          <ChevronDown size={14}
                            className={`transition-transform duration-200 opacity-[0.65] ${mobileExp === link.label ? 'rotate-180' : ''}`}
                          />
                        )}
                      </div>
                      <AnimatePresence>
                        {link.children && mobileExp === link.label && (
                          <motion.div
                            className="overflow-hidden pl-[14px]"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.children.map(c => {
                              const childActive = location.hash === c.href.replace('/', '');
                              return (
                                <div key={c.label} 
                                  className={`p-[9px_14px] text-[13.5px] cursor-pointer rounded-[7px] font-[500] transition-all duration-150 ${
                                    childActive 
                                      ? 'bg-[#EFF6FF] text-[#1A56DB] font-[700]' 
                                      : 'text-[#6B7280] hover:bg-[#EFF6FF] hover:text-[#1A56DB]'
                                  }`}
                                  onClick={() => go(c.href)}>
                                  {c.label}
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="p-[16px_18px] border-t border-t-[#F3F4F6]">
                <button
                  className="inline-flex items-center gap-[7px] bg-[#E02424] text-[#fff] font-['Inter',sans-serif] text-[13px] font-[700] p-[9px_20px] rounded-[6px] border-none cursor-pointer whitespace-nowrap transition-all duration-180 tracking-[0.02em] hover:bg-[#C01C1C] hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(224,36,36,0.35)] w-full justify-center"
                  onClick={() => go('/report-crime')}
                >
                  Report Crime
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
