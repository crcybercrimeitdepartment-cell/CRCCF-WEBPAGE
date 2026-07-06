import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

// Icon imports from Lucide React
import {
    GraduationCap, Sun, Moon, Heart, ChevronLeft, ChevronRight, ArrowLeft, Clock,
    Search, BookOpen
} from 'lucide-react';

import { 
    mentorshipPrograms, programThemeMap, CATEGORIES, constants, labels, 
    emptyStateData, programDetailNotFoundData, programDetailComingSoonData, 
    heroData, footerData 
} from '../../data/skillDevelopment/CorporateTrainingPageData';
import ComingSoonPage from '../common/ComingSoonPage';

// ==========================================================================
// SCROLL TO TOP UTILITY
// ==========================================================================
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}



// ==========================================================================
// CATEGORY HEADER COMPONENT
// ==========================================================================
function CategoryHeader({ activeCategory, setActiveCategory, counts }) {
    return (
        <div className="category-header">
            <div className="category-scroll-container">
                {CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const count = counts[cat.id] || 0;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`category-tab-btn${isActive ? ' active' : ''}`}
                        >
                            <IconComponent size={16} className="tab-icon" />
                            <span className="tab-name">{cat.name}</span>
                            <span className="tab-count-badge">{count}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================================================
// PAGINATION COMPONENT
// ==========================================================================
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-arrow-btn"
                aria-label="Previous Page"
            >
                <ChevronLeft size={18} />
            </button>

            <div className="pagination-numbers">
                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`pagination-num-btn${currentPage === num ? ' active' : ''}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-arrow-btn"
                aria-label="Next Page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}



// ==========================================================================
// PROJECTOR CARD COMPONENT
// ==========================================================================
function ProjectorCard({ program, onClick }) {
    const theme = programThemeMap[program.id] || { icon: BookOpen, color: "#3b82f6" };
    const IconComponent = theme.icon;

    return (
        <div
            className="projector-card"
            onClick={onClick}
            style={{
                borderLeft: `4px solid ${theme.color}`,
                "--hover-glow": `${theme.color}35`
            }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${program.title}`}
        >
            <div
                className="projector-card-icon-area"
                style={{
                    color: theme.color,
                    backgroundColor: `${theme.color}18`,
                    border: `1.5px solid ${theme.color}33`
                }}
            >
                <IconComponent className="projector-card-icon" size={18} />
            </div>
            <div className="projector-card-divider"></div>
            <div className="projector-card-content">
                <h4 className="projector-card-title">{program.title}</h4>
            </div>
            <div className="projector-card-action">
                <span className="projector-card-know-more">
                    {labels.knowMore}
                </span>
            </div>
        </div>
    );
}

// ==========================================================================
// HOMEPAGE VIEW
// ==========================================================================
function Homepage({ darkMode, setDarkMode }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const CARDS_PER_PAGE = constants.CARDS_PER_PAGE;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    const filteredPrograms = useMemo(() => {
        return mentorshipPrograms.filter((program) => {
            const matchesCategory = activeCategory === 'All' || program.category === activeCategory;
            const matchesSearch =
                program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (program.description && program.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (program.skills && program.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const totalPages = Math.ceil(filteredPrograms.length / CARDS_PER_PAGE);
    const displayedPrograms = useMemo(() => {
        const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
        return filteredPrograms.slice(startIdx, startIdx + CARDS_PER_PAGE);
    }, [filteredPrograms, currentPage]);

    const leftColumnPrograms = useMemo(() => {
        return displayedPrograms.slice(0, 6);
    }, [displayedPrograms]);

    const rightColumnPrograms = useMemo(() => {
        return displayedPrograms.slice(6, 12);
    }, [displayedPrograms]);

    const handleExploreProgram = (program) => {
        navigate(`program/${program.id}`);
    };

    const counts = useMemo(() => {
        const c = { 'All': mentorshipPrograms.length };
        CATEGORIES.forEach(cat => {
            if(cat.id !== 'All') {
                c[cat.id] = mentorshipPrograms.filter(p => p.category === cat.id).length;
            }
        });
        return c;
    }, []);

    return (
        <>
            <main className="main-content" key={currentPage}>
                {/* HERO BANNER SECTION */}
                <header className="hero-banner">
                    <h1>{heroData.title}</h1>
                    <p className="hero-subtitle">
                        {heroData.subtitle}
                    </p>

                    <div className="search-container">
                        <div className="search-bar-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder={heroData.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search programs"
                            />
                            {searchQuery && (
                                <button
                                    className="clear-search-btn"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                >
                                    {labels.clear}
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* PROGRAM CATALOG SECTION */}
                <section className="catalog-section">
                    {displayedPrograms.length > 0 ? (
                        <>
                            <div className="projector-dashboard-container">
                                <div className="projector-chassis">
                                    <div className="projector-column projector-column-left">
                                        {leftColumnPrograms.map((program) => (
                                            <ProjectorCard
                                                key={program.id}
                                                program={program}
                                                onClick={() => handleExploreProgram(program)}
                                            />
                                        ))}
                                        {Array.from({ length: Math.max(0, 6 - leftColumnPrograms.length) }).map((_, idx) => (
                                            <div key={`left-placeholder-${idx}`} className="projector-card-placeholder" />
                                        ))}
                                    </div>

                                    <div className="projector-center-lens">
                                        <div className="lens-outer-ring">
                                            <div className="lens-middle-ring">
                                                <div className="lens-inner-ring">
                                                    <div className="lens-glass">
                                                        <div className="lens-aperture"></div>
                                                        <div className="lens-bulb"></div>
                                                        <div className="lens-reflection-violet"></div>
                                                        <div className="lens-reflection-cyan"></div>
                                                        <div className="lens-hotspot-1"></div>
                                                        <div className="lens-hotspot-2"></div>
                                                        <div className="lens-concentric-1"></div>
                                                        <div className="lens-concentric-2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lens-focus-knob"></div>
                                        </div>
                                    </div>

                                    <div className="projector-column projector-column-right">
                                        {rightColumnPrograms.map((program) => (
                                            <ProjectorCard
                                                key={program.id}
                                                program={program}
                                                onClick={() => handleExploreProgram(program)}
                                            />
                                        ))}
                                        {Array.from({ length: Math.max(0, 6 - rightColumnPrograms.length) }).map((_, idx) => (
                                            <div key={`right-placeholder-${idx}`} className="projector-card-placeholder" />
                                        ))}
                                    </div>
                                </div>

                                <div className="projector-feet">
                                    <div className="projector-foot"></div>
                                    <div className="projector-foot"></div>
                                </div>

                                <div className="projector-shadow"></div>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        </>
                    ) : (
                        <div className="empty-state">
                            <h3>{emptyStateData.title}</h3>
                            <p>{emptyStateData.description}</p>
                            <button
                                className="reset-filters-btn"
                                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                            >
                                {emptyStateData.resetBtn}
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

// ==========================================================================
// PROGRAM DETAIL VIEW
// ==========================================================================
function ProgramDetail({ darkMode, setDarkMode }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const program = useMemo(() => mentorshipPrograms.find(p => p.id === id), [id]);

    if (!program) {
        return (
            <>
                <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-heading)', marginBottom: '16px' }}>{programDetailNotFoundData.title}</h2>
                    <p style={{ color: 'var(--text-main)', marginBottom: '24px' }}>{programDetailNotFoundData.description}</p>
                    
                </main>
            </>
        );
    }

    return <ComingSoonPage />;
}

// ==========================================================================
// CENTRAL ROUTING CONFIGURATION
// ==========================================================================
export default function CorporateTrainingPage() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
                            <Homepage darkMode={darkMode} setDarkMode={setDarkMode} />
                        </div>
                    }
                />
                <Route
                    path="program/:id"
                    element={
                        <ProgramDetail darkMode={darkMode} setDarkMode={setDarkMode} />
                    }
                />
            </Routes>
        </>
    );
}
