import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { mentorshipPrograms } from '../../data/skillDevelopment/ResearchPageData';
import ComingSoonPage from '../common/ComingSoonPage';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

export default function ResearchPage({ darkMode, setDarkMode }) {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<ResearchPageInner darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="program/:id" element={<DataPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            </Routes>
        </>
    );
}

// ==========================================
// FORMAT TITLE UTILITY
// ==========================================
const formatTitle = (title) => {
    let parenText = "";
    const parenMatch = title.match(/\(([^)]+)\)/);
    if (parenMatch) {
        parenText = `(${parenMatch[1]})`;
    }
    let mainName = title
        .replace(/\s*\([^)]+\)/g, "")
        .replace(/\s*(Course|Program)\s*/gi, "")
        .trim();
    return { mainName, parenText };
};

// ==========================================
// CARD COMPONENT
// ==========================================
function Card({ program, index, onLearnMore }) {
    const { mainName, parenText } = formatTitle(program.title);
    return (
        <motion.div
            className="paper-list-item"
            layout
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.22, delay: index * 0.02 }}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onLearnMore(program)}
        >
            <span className="list-text">
                <span className="list-bullet">&#8226;</span>
                <span className="list-title">{mainName} Research Program</span>
                {parenText && <span className="list-paren"> {parenText}</span>}
            </span>
            <span className="know-more">Know More &rarr;</span>
        </motion.div>
    );
}

function DataPage({ darkMode, setDarkMode }) {
    return <ComingSoonPage />;
}

function ResearchPageInner({ darkMode, setDarkMode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState('next');
    const [transitionPrograms, setTransitionPrograms] = useState([]);
    const [transitionPage, setTransitionPage] = useState(1);
    const navigate = useNavigate();
    const CARDS_PER_PAGE = 12;

    const [isMagnifierActive, setIsMagnifierActive] = useState(false);
    const [magnifierState, setMagnifierState] = useState({ x: 0, y: 0, paperX: 0, paperY: 0, paperWidth: 0, paperHeight: 0 });
    const paperRef = useRef(null);
    const boardRef = useRef(null);
    const ZOOM_FACTOR = 1.6;
    const LENS_RADIUS = 75.5;

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentScale = useMemo(() => {
        if (windowWidth <= 576) return 0.52;
        if (windowWidth <= 768) return 0.65;
        if (windowWidth <= 992) return 0.75;
        if (windowWidth <= 1200) return 0.85;
        return 1.0;
    }, [windowWidth]);

    const relativeScale = useMemo(() => ZOOM_FACTOR / currentScale, [currentScale]);

    const handleMouseMove = useCallback((e) => {
        if (!isMagnifierActive || !paperRef.current) return;
        const board = e.currentTarget;
        const boardRect = board.getBoundingClientRect();
        const x = e.clientX - boardRect.left;
        const y = e.clientY - boardRect.top;
        const paper = paperRef.current;
        const paperRect = paper.getBoundingClientRect();
        const paperX = e.clientX - paperRect.left;
        const paperY = e.clientY - paperRect.top;
        setMagnifierState({ x, y, paperX, paperY, paperWidth: paperRect.width, paperHeight: paperRect.height });
    }, [isMagnifierActive]);

    useEffect(() => {
        const board = boardRef.current;
        if (!board) return;
        const handleTouch = (e) => {
            if (!isMagnifierActive || !paperRef.current) return;
            if (e.cancelable) e.preventDefault();
            const touch = e.touches[0];
            const boardRect = board.getBoundingClientRect();
            const clientX = touch.clientX;
            const clientY = touch.clientY;
            const x = clientX - boardRect.left;
            const y = clientY - boardRect.top;
            const paper = paperRef.current;
            const paperRect = paper.getBoundingClientRect();
            const paperX = clientX - paperRect.left;
            const paperY = clientY - paperRect.top;
            setMagnifierState({ x, y, paperX, paperY, paperWidth: paperRect.width, paperHeight: paperRect.height });
        };
        board.addEventListener('touchmove', handleTouch, { passive: false });
        board.addEventListener('touchstart', handleTouch, { passive: false });
        return () => {
            board.removeEventListener('touchmove', handleTouch);
            board.removeEventListener('touchstart', handleTouch);
        };
    }, [isMagnifierActive]);

    const handleActivateMagnifier = useCallback((e) => {
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
        if (isMagnifierActive) { setIsMagnifierActive(false); return; }
        const wrapper = e.currentTarget;
        const board = wrapper.closest('.clipboard-board');
        if (board) {
            const boardRect = board.getBoundingClientRect();
            const isTouch = e.touches && e.touches.length > 0;
            const clientX = isTouch ? e.touches[0].clientX : e.clientX;
            const clientY = isTouch ? e.touches[0].clientY : e.clientY;
            const x = clientX - boardRect.left;
            const y = clientY - boardRect.top;
            const paper = board.querySelector('.clipboard-paper');
            if (paper) {
                const paperRect = paper.getBoundingClientRect();
                setIsMagnifierActive(true);
                setMagnifierState({ x, y, paperX: clientX - paperRect.left, paperY: clientY - paperRect.top, paperWidth: paperRect.width, paperHeight: paperRect.height });
            }
        }
    }, [isMagnifierActive]);

    useEffect(() => {
        if (!isMagnifierActive) return;
        const handleGlobalClick = (e) => {
            if (e.type === 'touchstart') {
                const board = document.querySelector('.clipboard-board');
                if (board && board.contains(e.target)) return;
            }
            setIsMagnifierActive(false);
        };
        const timeout = setTimeout(() => {
            window.addEventListener('click', handleGlobalClick);
            window.addEventListener('touchstart', handleGlobalClick, { passive: true });
        }, 10);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('touchstart', handleGlobalClick);
        };
    }, [isMagnifierActive]);

    useEffect(() => {
        if (!isMagnifierActive) return;
        const handleKeyDown = (e) => { if (e.key === 'Escape') setIsMagnifierActive(false); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMagnifierActive]);

    useEffect(() => { setCurrentPage(1); }, [searchQuery]);

    const filteredPrograms = useMemo(() => {
        if (!searchQuery.trim()) return mentorshipPrograms;
        const q = searchQuery.toLowerCase();
        return mentorshipPrograms.filter((program) => program.title.toLowerCase().includes(q));
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredPrograms.length / CARDS_PER_PAGE);

    const displayedPrograms = useMemo(() => {
        const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
        return filteredPrograms.slice(startIdx, startIdx + CARDS_PER_PAGE);
    }, [filteredPrograms, currentPage]);

    const handleExploreProgram = useCallback((program) => {
        navigate(`/skill-development/${program.id}`);
    }, [navigate]);

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => { setIsTransitioning(false); setTransitionPrograms([]); }, 1800);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const handlePageChange = useCallback((newPage, direction) => {
        if (isTransitioning) return;
        setTransitionDirection(direction);
        setTransitionPrograms(displayedPrograms);
        setTransitionPage(currentPage);
        setIsTransitioning(true);
        setCurrentPage(newPage);
        window.scrollTo({ top: 380, behavior: 'smooth' });
    }, [isTransitioning, displayedPrograms, currentPage]);

    const mainSheetPrograms = useMemo(() => {
        if (isTransitioning && transitionDirection === 'prev') return transitionPrograms;
        return displayedPrograms;
    }, [isTransitioning, transitionDirection, transitionPrograms, displayedPrograms]);

    const mainSheetPage = useMemo(() => {
        if (isTransitioning && transitionDirection === 'prev') return transitionPage;
        return currentPage;
    }, [isTransitioning, transitionDirection, transitionPage, currentPage]);

    const overlaySheetPrograms = useMemo(() => {
        if (transitionDirection === 'prev') return displayedPrograms;
        return transitionPrograms;
    }, [transitionDirection, displayedPrograms, transitionPrograms]);

    const overlaySheetPage = useMemo(() => {
        if (transitionDirection === 'prev') return currentPage;
        return transitionPage;
    }, [transitionDirection, currentPage, transitionPage]);

    return (
        <>
            <main className="main-content">
                <header className="hero-banner">
                    <h1>Research</h1>
                    <p className="hero-subtitle">
                        Develop leadership, communication, management, and workplace skills through expert-led corporate training programs.
                    </p>
                    <div className="search-container">
                        <div className="search-bar-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search courses by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search programs"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="clear-search-btn" aria-label="Clear search">Clear</button>
                            )}
                        </div>
                    </div>
                </header>
                <section className="catalog-section">
                    {displayedPrograms.length > 0 ? (
                        <div className="clipboard-container">
                            {isMagnifierActive && (
                                <div className="magnifier-instruction-banner">
                                    <span>&#128269;</span> Magnifier Mode Active: Drag on clipboard to zoom.
                                    <button className="deactivate-magnifier-btn" onClick={(e) => { e.stopPropagation(); setIsMagnifierActive(false); }} onTouchStart={(e) => { e.stopPropagation(); setIsMagnifierActive(false); }}>Deactivate</button>
                                </div>
                            )}
                            <div className={`clipboard-board ${isMagnifierActive ? 'magnifier-active' : ''}`} ref={boardRef} onMouseMove={handleMouseMove}>
                                <div className="clipboard-clip-top">
                                    <div className="clip-bracket"></div>
                                    <div className="clip-clamp"></div>
                                    <div className="clip-screws fastener-left"></div>
                                    <div className="clip-screws fastener-right"></div>
                                </div>
                                <div className={`magnifying-glass-wrapper ${isTransitioning ? 'transitioning' : ''}`} onClick={handleActivateMagnifier} onTouchStart={handleActivateMagnifier} style={isMagnifierActive ? { position: 'absolute', left: `${magnifierState.x}px`, top: `${magnifierState.y}px`, right: 'auto', transform: 'none', pointerEvents: 'none', transition: 'none' } : { position: 'absolute', left: 'auto', right: 'var(--magnifier-right, 140px)', top: 'var(--magnifier-top, 40px)', transform: 'none', pointerEvents: 'auto', cursor: 'pointer' }}>
                                    <div className="magnifying-glass">
                                        <div className="glass-lens-rim">
                                            <div className="glass-lens">
                                                <div className="lens-highlight-top-left"></div>
                                                <div className="lens-reflection-soft"></div>
                                                {isMagnifierActive && (
                                                    <div className="magnified-content-rotation-adjuster">
                                                        <div className="magnified-content" style={{ position: 'absolute', width: `${magnifierState.paperWidth}px`, height: `${magnifierState.paperHeight}px`, left: `${-magnifierState.paperX * relativeScale}px`, top: `${-magnifierState.paperY * relativeScale}px`, transform: `scale(${relativeScale})`, transformOrigin: '0 0', pointerEvents: 'none', userSelect: 'none' }}>
                                                            <div className="paper-header">
                                                                <h2 className="paper-title">Research Program</h2>
                                                                <div className="paper-double-line"></div>
                                                            </div>
                                                            <div className="paper-list">
                                                                {displayedPrograms.map((program, idx) => (
                                                                    <Card key={`zoom-${program.id}`} program={program} index={idx} onLearnMore={handleExploreProgram} />
                                                                ))}
                                                            </div>
                                                            <div className="clipboard-footer">
                                                                <button className="clipboard-nav-btn prev-btn" disabled>&larr; PREV</button>
                                                                <div className="clipboard-page-indicator">Page {currentPage} of {totalPages}</div>
                                                                <button className="clipboard-nav-btn next-btn" disabled>NEXT &rarr;</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="glass-neck"><div className="glass-neck-ridges"></div></div>
                                        <div className="glass-handle"><div className="handle-shine"></div></div>
                                    </div>
                                    {!isMagnifierActive && <span className="magnifier-tooltip">Click to use Magnifier</span>}
                                </div>
                                <div className="clipboard-paper-wrapper" style={{ position: 'relative', width: '100%' }}>
                                    <div className="clipboard-paper" ref={paperRef}>
                                        <div className="paper-header">
                                            <h2 className="paper-title">Research Program</h2>
                                            <div className="paper-double-line"></div>
                                        </div>
                                        <div className="paper-list">
                                            {mainSheetPrograms.map((program, idx) => (
                                                <Card key={program.id} program={program} index={idx} onLearnMore={handleExploreProgram} />
                                            ))}
                                        </div>
                                        <div className="clipboard-footer">
                                            <button className="clipboard-nav-btn prev-btn" onClick={() => handlePageChange(currentPage - 1, 'prev')} disabled={currentPage === 1 || isTransitioning}>&larr; PREV</button>
                                            <div className="clipboard-page-indicator">Page {mainSheetPage} of {totalPages}</div>
                                            <button className="clipboard-nav-btn next-btn" onClick={() => handlePageChange(currentPage + 1, 'next')} disabled={currentPage === totalPages || isTransitioning}>NEXT &rarr;</button>
                                        </div>
                                    </div>
                                    {isTransitioning && (
                                        <div className={`clipboard-paper ${transitionDirection === 'next' ? 'page-peel-exit' : 'page-peel-enter'}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none' }}>
                                            <div className="paper-header">
                                                <h2 className="paper-title">Research Program</h2>
                                                <div className="paper-double-line"></div>
                                            </div>
                                            <div className="paper-list">
                                                {overlaySheetPrograms.map((program, idx) => (
                                                    <Card key={`overlay-${program.id}`} program={program} index={idx} onLearnMore={() => { }} />
                                                ))}
                                            </div>
                                            <div className="clipboard-footer">
                                                <button className="clipboard-nav-btn prev-btn" disabled>&larr; PREV</button>
                                                <div className="clipboard-page-indicator">Page {overlaySheetPage} of {totalPages}</div>
                                                <button className="clipboard-nav-btn next-btn" disabled>NEXT &rarr;</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <h3>No Programs Found</h3>
                            <p>We couldn't find any training programs matching your search. Try a different keyword.</p>
                            <button className="reset-filters-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
