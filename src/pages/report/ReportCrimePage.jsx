import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems, useInjectStyles } from "./ReportCrimePageData";
import {
  FaInfoCircle,
  FaLaptopCode,
  FaFileAlt,
  FaSearch,
  FaShieldAlt,
  FaLock,
  FaBullhorn,
  FaBalanceScale,
  FaGavel,
  FaFemale,
  FaHandHoldingHeart,
  FaHeadset,
  FaFolderOpen,
  FaTrophy,
  FaUserSecret,
  FaGlobe,
  FaQuestionCircle
} from "react-icons/fa";

/* ========== HELPER FUNCTIONS ========== */

const getMenuIcon = (iconName) => {
  switch (iconName) {
    case "info": return <FaInfoCircle />;
    case "guide": return <FaLaptopCode />;
    case "register": return <FaFileAlt />;
    case "track": return <FaSearch />;
    case "types": return <FaShieldAlt />;
    case "tips": return <FaLock />;
    case "prevent": return <FaBullhorn />;
    case "legal": return <FaBalanceScale />;
    case "laws": return <FaGavel />;
    case "women": return <FaFemale />;
    case "victim": return <FaHandHoldingHeart />;
    case "support": return <FaHeadset />;
    case "security": return <FaShieldAlt />;
    case "status": return <FaFolderOpen />;
    case "success": return <FaTrophy />;
    case "investigation": return <FaUserSecret />;
    case "threat": return <FaGlobe />;
    case "faq": return <FaQuestionCircle />;
    default: return <FaInfoCircle />;
  }
};

const getColorClass = (color) => {
  switch (color) {
    case "cyan": return "glow-cyan";
    case "green": return "glow-green";
    case "yellow": return "glow-yellow";
    case "orange": return "glow-orange";
    case "purple": return "glow-purple";
    case "red": return "glow-red";
    default: return "glow-cyan";
  }
};

/* ========== MAIN COMPONENT ========== */

export default function ReportCrimePage() {
  useInjectStyles();
  const [selected, setSelected] = useState(null);
  const [doorsOpen, setDoorsOpen] = useState(true);
  const [isManual, setIsManual] = useState(false);
  const [carsState, setCarsState] = useState({
    sedan: false,
    bronco: false,
    rover: false
  });
  const [carSpeeds, setCarSpeeds] = useState({
    sedan: 6.5,
    bronco: 6.5,
    rover: 6.5
  });

  const getTimePhase = () => {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? "day" : "night";
  };

  const [timePhase, setTimePhase] = useState(getTimePhase());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePhase(getTimePhase());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isManual) return;
    let closeTimeout;
    const interval = setInterval(() => {
      setDoorsOpen(true);
      closeTimeout = setTimeout(() => {
        setDoorsOpen(false);
      }, 3000);
    }, 10000);
    const initialCloseTimeout = setTimeout(() => {
      setDoorsOpen(false);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialCloseTimeout);
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [isManual]);

  useEffect(() => {
    let nextCarTimeout;
    const scheduleNextCar = () => {
      const randomDelay = Math.floor(Math.random() * 5000) + 3000;
      nextCarTimeout = setTimeout(() => {
        setCarsState(prev => {
          const available = [];
          if (!prev.sedan) available.push('sedan');
          if (!prev.bronco) available.push('bronco');
          if (!prev.rover) available.push('rover');
          if (available.length === 0) return prev;
          const chosen = available[Math.floor(Math.random() * available.length)];
          const randomSpeed = (Math.random() * 4.5) + 4.5;
          setCarSpeeds(prevSpeeds => ({ ...prevSpeeds, [chosen]: randomSpeed }));
          return { ...prev, [chosen]: true };
        });
        scheduleNextCar();
      }, randomDelay);
    };
    scheduleNextCar();
    setCarsState(prev => ({ ...prev, sedan: true }));
    return () => { clearTimeout(nextCarTimeout); };
  }, []);

  useEffect(() => {
    if (carsState.sedan) {
      const timer = setTimeout(() => {
        setCarsState(prev => ({ ...prev, sedan: false }));
      }, carSpeeds.sedan * 1000);
      return () => clearTimeout(timer);
    }
  }, [carsState.sedan, carSpeeds.sedan]);

  useEffect(() => {
    if (carsState.bronco) {
      const timer = setTimeout(() => {
        setCarsState(prev => ({ ...prev, bronco: false }));
      }, carSpeeds.bronco * 1000);
      return () => clearTimeout(timer);
    }
  }, [carsState.bronco, carSpeeds.bronco]);

  useEffect(() => {
    if (carsState.rover) {
      const timer = setTimeout(() => {
        setCarsState(prev => ({ ...prev, rover: false }));
      }, carSpeeds.rover * 1000);
      return () => clearTimeout(timer);
    }
  }, [carsState.rover, carSpeeds.rover]);

  const leftItems = menuItems.slice(0, 9);
  const rightItems = menuItems.slice(9, 18);

  const navigate = useNavigate();

  const handleCardClick = (item) => {
    // Active routes mapped by card ID. 
    // To re-enable a page, add its ID and route here.
    const activeRoutes = {
      6: '/report-crime/cyber-security-tips',
      7: '/report-crime/awareness-prevention-tips',
      8: '/report-crime/legal-guidance-awareness',
      9: '/report-crime/cyber-laws-and-rights',
      10: '/report-crime/cyber-safety-women',
      11: '/report-crime/victim-rights-support'
    };

    if (activeRoutes[item.id]) {
      navigate(activeRoutes[item.id]);
    } else {
      navigate('/coming-soon');
    }
    
    setSelected(item);
  };



  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between items-center w-full">
      <div className={`cyber-police-station-app ${timePhase}`}>
        {/* Sky / Background Clouds */}
        <div className="sky-background">
          <div className="clouds">
            <div className="cloud cloud-1">
              <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="50" rx="60" ry="25" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="110" cy="40" rx="50" ry="30" fill="rgba(255,255,255,0.95)" />
                <ellipse cx="50" cy="45" rx="40" ry="20" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="140" cy="50" rx="45" ry="22" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="90" cy="35" rx="35" ry="20" fill="rgba(255,255,255,0.95)" />
              </svg>
            </div>
            <div className="cloud cloud-2">
              <svg viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="45" rx="50" ry="20" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="95" cy="35" rx="45" ry="25" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="130" cy="45" rx="40" ry="18" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="75" cy="30" rx="30" ry="18" fill="rgba(255,255,255,0.95)" />
              </svg>
            </div>
            <div className="cloud cloud-3">
              <svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="38" rx="40" ry="18" fill="rgba(255,255,255,0.8)" />
                <ellipse cx="85" cy="30" rx="38" ry="22" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="115" cy="38" rx="35" ry="16" fill="rgba(255,255,255,0.8)" />
              </svg>
            </div>
            <div className="cloud cloud-4">
              <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="50" rx="55" ry="22" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="105" cy="38" rx="48" ry="28" fill="rgba(255,255,255,0.9)" />
                <ellipse cx="140" cy="48" rx="42" ry="20" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="85" cy="32" rx="32" ry="18" fill="rgba(255,255,255,0.95)" />
              </svg>
            </div>
          </div>
          <div className="stars">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Building Wrapper */}
        <div className="building-scene">
          {/* LEFT WING */}
          <div className="building-wing left-wing">
            <div className="wing-wall-texture"></div>
            <div className="wing-led-trim"></div>
            <div className="cards-stack">
              {leftItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`side-card ${getColorClass(item.color)} ${selected?.id === item.id ? "active" : ""}`}
                >
                  <span className="card-icon">{getMenuIcon(item.icon)}</span>
                  <span className="card-title font-sans antialiased">{item.title}</span>
                  <span className="card-arrow">&rsaquo;</span>
                </button>
              ))}
            </div>
          </div>

          {/* CENTER MAIN BUILDING */}
          <div className="building-center">
            {/* ROOF SECTION */}
            <div className="roof-section">
              <div className="roof-top-ledge">
                <div className="gold-led-strip"></div>
              </div>
              <div className="roof-center-pediment">
                <div className="badge-shield-container">
                  <div className="shield-badge-glowing">
                    <div className="shield-inner">
                      <div className="shield-text-top">CYBER CRIME</div>
                      <div className="shield-crest">
                        <svg viewBox="0 0 100 100" className="shield-svg">
                          <path d="M50,12 L82,25 L82,58 C82,76 50,91 50,91 C50,91 18,76 18,58 L18,25 Z" fill="none" stroke="#4a8ab5" strokeWidth="4" />
                          <path d="M28,52 L50,30 L72,52 L50,74 Z" fill="none" stroke="#e6f2ff" strokeWidth="2" />
                          <circle cx="50" cy="52" r="9" fill="#00d4ff" className="shield-star" />
                          <path d="M42,52 L58,52 M50,44 L50,60" stroke="#060c14" strokeWidth="2.5" />
                          <path d="M22,35 C30,35 40,42 46,48 M78,35 C70,35 60,42 54,48" stroke="#ffd700" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                      <div className="shield-text-bottom">POLICE</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="roof-bottom-ledge">
                <div className="gold-led-strip"></div>
              </div>
            </div>

            {/* MAIN SIGN BOARD */}
            <div className="station-marquee">
              <h1 className="main-title">CYBER CRIME</h1>
              <h2 className="sub-title">POLICE STATION</h2>
              <div className="marquee-tagline">SERVE &bull; PROTECT &bull; SECURE</div>
            </div>

            {/* SECOND FLOOR / BALCONY */}
            <div className="second-floor-section">
              <div className="wall-columns">
                <div className="column column-left">
                  <div className="column-cap"></div>
                  <div className="column-lantern">
                    <div className="lantern-bracket-top"></div>
                    <div className="lantern-cap"></div>
                    <div className="lantern-glass-body">
                      <div className="lantern-bulb-glow"></div>
                    </div>
                    <div className="lantern-base-cap"></div>
                    <div className="lantern-light-beam"></div>
                  </div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-center-left">
                  <div className="column-cap"></div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-center-right">
                  <div className="column-cap"></div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-right">
                  <div className="column-cap"></div>
                  <div className="column-lantern">
                    <div className="lantern-bracket-top"></div>
                    <div className="lantern-cap"></div>
                    <div className="lantern-glass-body">
                      <div className="lantern-bulb-glow"></div>
                    </div>
                    <div className="lantern-base-cap"></div>
                    <div className="lantern-light-beam"></div>
                  </div>
                  <div className="column-base"></div>
                </div>
              </div>
              <div className="floor-window window-left-2f">
                <div className="window-frame">
                  <div className="window-grid">
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                  </div>
                </div>
                <div className="window-glow"></div>
              </div>
              <div className="floor-window window-right-2f">
                <div className="window-frame">
                  <div className="window-grid">
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                    <div className="window-pane"></div>
                  </div>
                </div>
                <div className="window-glow"></div>
              </div>
              <div className="balcony-glass-doors">
                <div className="glass-door-pane">
                  <div className="window-pane-inner"></div>
                </div>
                <div className="glass-door-pane">
                  <div className="window-pane-inner"></div>
                </div>
              </div>
              <div className="balcony-platform"></div>
              <div className="balcony-railing">
                <div className="railing-bar horizontal-top"></div>
                <div className="railing-verticals">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <div key={i} className="railing-vertical-bar"></div>
                  ))}
                </div>
                <div className="railing-bar horizontal-bottom"></div>
              </div>
              <div className="balcony-corner-plant plant-left">&#127793;</div>
              <div className="balcony-corner-plant plant-right">&#127793;</div>
            </div>

            {/* FIRST FLOOR / ENTRANCE */}
            <div className="first-floor-section">
              <div className="wall-columns">
                <div className="column column-left">
                  <div className="column-cap"></div>
                  <div className="column-lantern">
                    <div className="lantern-bracket-top"></div>
                    <div className="lantern-cap"></div>
                    <div className="lantern-glass-body">
                      <div className="lantern-bulb-glow"></div>
                    </div>
                    <div className="lantern-base-cap"></div>
                    <div className="lantern-light-beam"></div>
                  </div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-center-left">
                  <div className="column-cap"></div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-center-right">
                  <div className="column-cap"></div>
                  <div className="column-base"></div>
                </div>
                <div className="column column-right">
                  <div className="column-cap"></div>
                  <div className="column-lantern">
                    <div className="lantern-bracket-top"></div>
                    <div className="lantern-cap"></div>
                    <div className="lantern-glass-body">
                      <div className="lantern-bulb-glow"></div>
                    </div>
                    <div className="lantern-base-cap"></div>
                    <div className="lantern-light-beam"></div>
                  </div>
                  <div className="column-base"></div>
                </div>
              </div>
              <div className="portico-ceiling">
                <div className="ceiling-spotlight spotlight-1"></div>
                <div className="ceiling-spotlight spotlight-2"></div>
                <div className="ceiling-spotlight spotlight-3"></div>
                <div className="ceiling-spotlight spotlight-4"></div>
              </div>
              <div className="entrance-side-window window-left-1f">
                <div className="window-inset-panel">
                  <div className="window-cross-frame">
                    <div className="window-cross-vertical"></div>
                    <div className="window-cross-horizontal"></div>
                  </div>
                  <div className="window-glow-interior"></div>
                </div>
              </div>
              <div className="entrance-side-window window-right-1f">
                <div className="window-inset-panel">
                  <div className="window-cross-frame">
                    <div className="window-cross-vertical"></div>
                    <div className="window-cross-horizontal"></div>
                  </div>
                  <div className="window-glow-interior"></div>
                </div>
              </div>
              <div className="potted-plant plant-left">
                <div className="palm-leaves-svg">
                  <svg viewBox="0 0 100 100" className="palm-leaves-svg-elem">
                    <path d="M50,90 Q40,50 15,35" fill="none" stroke="#1b4d3e" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q30,60 10,50" fill="none" stroke="#2c5e43" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q50,40 50,15" fill="none" stroke="#3d6f4c" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q45,45 35,25" fill="none" stroke="#4e8055" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q55,45 65,25" fill="none" stroke="#4e8055" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q60,50 85,35" fill="none" stroke="#1b4d3e" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q70,60 90,50" fill="none" stroke="#2c5e43" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ceramic-white-pot"></div>
              </div>
              <div className="potted-plant plant-right">
                <div className="palm-leaves-svg">
                  <svg viewBox="0 0 100 100" className="palm-leaves-svg-elem">
                    <path d="M50,90 Q40,50 15,35" fill="none" stroke="#1b4d3e" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q30,60 10,50" fill="none" stroke="#2c5e43" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q50,40 50,15" fill="none" stroke="#3d6f4c" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q45,45 35,25" fill="none" stroke="#4e8055" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q55,45 65,25" fill="none" stroke="#4e8055" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50,90 Q60,50 85,35" fill="none" stroke="#1b4d3e" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M50,90 Q70,60 90,50" fill="none" stroke="#2c5e43" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ceramic-white-pot"></div>
              </div>
              <div className="entrance-marquee-sign">
                <div className="marquee-side-text text-left">
                  <span className="gold-word">DIGITAL</span>
                  <span className="gold-word">INDIA</span>
                </div>
                <div className="marquee-center-emblem">
                  <svg viewBox="0 0 100 100" className="marquee-crest-svg">
                    <path d="M50,10 L80,22 L80,55 C80,72 50,87 50,87 C50,87 20,72 20,55 L20,22 Z" fill="none" stroke="#ffd700" strokeWidth="3.5" />
                    <path d="M28,48 L50,26 L72,48 L50,70 Z" fill="none" stroke="#ffd700" strokeWidth="1.5" />
                    <circle cx="50" cy="48" r="7" fill="none" stroke="#ffd700" strokeWidth="2" />
                    <path d="M50,41 L50,55 M43,48 L57,48" stroke="#ffd700" strokeWidth="2.5" />
                    <path d="M25,32 C33,32 42,38 47,44 M75,32 C67,32 58,38 53,44" stroke="#ffd700" strokeWidth="1.8" fill="none" />
                  </svg>
                </div>
                <div className="marquee-side-text text-right">
                  <span className="gold-word">SAFE</span>
                  <span className="gold-word">INDIA</span>
                </div>
              </div>

              {/* Entrance Door */}
              <div
                className="entrance-door-container"
                onClick={() => {
                  const nextState = !doorsOpen;
                  setDoorsOpen(nextState);
                  setIsManual(nextState);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="interior-wall">
                  <div className="wall-text">CRIME REPORT</div>
                  <div className="police-lady-container">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="police-lady-svg">
                      <circle cx="50" cy="30" r="16" fill="#18181b" />
                      <circle cx="34" cy="46" r="4.5" fill="#ffdbac" />
                      <circle cx="66" cy="46" r="4.5" fill="#ffdbac" />
                      <path d="M 36,32 C 36,54 40,64 50,64 C 60,64 64,54 64,32 Z" fill="#ffdbac" />
                      <path d="M 34,40 C 35,32 45,30 50,34 C 55,30 65,32 66,40 C 64,36 58,35 50,38 C 42,35 36,36 34,40 Z" fill="#18181b" />
                      <path d="M 40,38 Q 44,36 47,39" stroke="#18181b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path d="M 60,38 Q 56,36 53,39" stroke="#18181b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <circle cx="43" cy="42" r="3" fill="#18181b" />
                      <circle cx="42" cy="41" r="0.8" fill="#fff" />
                      <circle cx="57" cy="42" r="3" fill="#18181b" />
                      <circle cx="56" cy="41" r="0.8" fill="#fff" />
                      <circle cx="39" cy="48" r="3.5" fill="#fda4af" opacity="0.6" />
                      <circle cx="61" cy="48" r="3.5" fill="#fda4af" opacity="0.6" />
                      <path d="M 50,44 Q 48,47 50,48" stroke="#e8a382" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M 45,51 Q 50,56 55,51" stroke="#e11d48" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                      <rect x="46" y="60" width="8" height="12" fill="#e8b79a" />
                      <path d="M 46,60 L 54,60 L 54,68 L 46,68 Z" fill="#e8a382" opacity="0.3" />
                      <path d="M 24,100 L 24,85 C 24,72 32,68 44,66 L 56,66 C 68,68 76,72 76,85 L 76,100 Z" fill="#c8b18a" />
                      <path d="M 44,66 L 50,76 L 38,72 Z" fill="#bfa780" />
                      <path d="M 56,66 L 50,76 L 62,72 Z" fill="#bfa780" />
                      <path d="M 49,74 L 51,74 L 52,90 L 50,94 L 48,90 Z" fill="#3e230d" />
                      <path d="M 25,72 L 38,68 L 36,66 L 24,69 Z" fill="#8e734c" />
                      <circle cx="31" cy="69" r="1.5" fill="#ffd700" />
                      <path d="M 75,72 L 62,68 L 64,66 L 76,69 Z" fill="#8e734c" />
                      <circle cx="69" cy="69" r="1.5" fill="#ffd700" />
                      <path d="M 34,75 L 40,75 L 41,80 C 41,83 37,86 37,86 C 37,86 33,83 33,80 Z" fill="#ffd700" />
                      <path d="M 37,77 L 38,79 L 40,79 L 38.5,80 L 39,82 L 37,81 L 35,82 L 35.5,80 L 34,79 L 36,79 Z" fill="#b29600" />
                      <ellipse cx="50" cy="24" rx="20" ry="11" fill="#c8b18a" />
                      <path d="M 28,27 C 28,22 72,22 72,27 C 72,30 28,30 28,27 Z" fill="#4a2c11" />
                      <path d="M 27,27 Q 50,35 73,27 Q 66,38 34,38 Z" fill="#020617" />
                      <path d="M 32,32 Q 50,36 68,32" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
                      <path d="M 47,21 L 53,21 L 54,25 C 54,27 50,29 50,29 C 50,29 46,27 46,25 Z" fill="#ffd700" />
                      <path d="M 28,27 Q 50,30 72,27" stroke="#ffd700" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="reception-desk">
                    <div className="reception-top"></div>
                    <div className="reception-front">
                      <div className="reception-panel"></div>
                      <div className="reception-panel"></div>
                      <div className="reception-panel"></div>
                    </div>
                  </div>
                  <div className="complaining-girl-left">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="girl-svg">
                      <line x1="25" y1="75" x2="25" y2="100" stroke="#2d180d" strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="45" y1="75" x2="45" y2="100" stroke="#2d180d" strokeWidth="3" strokeLinecap="round" />
                      <rect x="20" y="70" width="28" height="5" fill="#3a2312" rx="1.5" stroke="#22140a" strokeWidth="0.5" />
                      <path d="M 40,74 Q 56,74 56,84 L 56,100" stroke="#f472b6" strokeWidth="7" fill="none" strokeLinecap="round" />
                      <path d="M 27,72 C 27,54 36,49 46,49 C 56,49 61,56 60,72 Z" fill="#f472b6" />
                      <path d="M 42,54 Q 52,54 54,58" stroke="#f472b6" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M 44,58 Q 62,58 64,54" stroke="#ffe2cc" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <polygon points="62,54 74,52 76,56 64,58" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                      <line x1="22" y1="70" x2="22" y2="42" stroke="#2d180d" strokeWidth="4.5" strokeLinecap="round" />
                      <rect x="17" y="42" width="10" height="15" fill="#3a2312" rx="2" stroke="#22140a" strokeWidth="1" />
                      <rect x="42" y="41" width="8" height="11" fill="#ffe2cc" />
                      <circle cx="46" cy="31" r="11" fill="#ffe2cc" />
                      <path d="M 54,31 L 58,34 L 54,36 L 54,40 L 51,41 Z" fill="#ffe2cc" />
                      <circle cx="35" cy="31" r="6" fill="#1f1610" />
                      <circle cx="36.5" cy="31" r="2.2" fill="#ffd700" />
                      <path d="M 35,31 C 29,35 24,47 26,62 C 28,57 32,45 35,38 Z" fill="#1f1610" />
                      <path d="M 35,44 C 34,28 35,18 50,18 C 58,18 58,26 57,32 C 57,36 52,36 48,36 C 44,36 43,44 35,44 Z" fill="#1f1610" />
                      <circle cx="51" cy="34" r="2" fill="#fda4af" opacity="0.6" />
                      <circle cx="43" cy="37" r="1" fill="#ffd700" />
                    </svg>
                  </div>
                  <div className="complaining-girl-right">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="girl-svg">
                      <line x1="75" y1="75" x2="75" y2="100" stroke="#2d180d" strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="55" y1="75" x2="55" y2="100" stroke="#2d180d" strokeWidth="3" strokeLinecap="round" />
                      <rect x="52" y="70" width="28" height="5" fill="#3a2312" rx="1.5" stroke="#22140a" strokeWidth="0.5" />
                      <path d="M 60,74 Q 44,74 44,84 L 44,100" stroke="#2dd4bf" strokeWidth="7" fill="none" strokeLinecap="round" />
                      <path d="M 73,72 C 73,54 64,49 54,49 C 44,49 39,56 40,72 Z" fill="#2dd4bf" />
                      <path d="M 58,54 Q 48,54 46,58" stroke="#2dd4bf" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M 56,58 Q 38,58 36,54" stroke="#ffe2cc" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <polygon points="38,54 26,52 24,56 36,58" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
                      <line x1="78" y1="70" x2="78" y2="42" stroke="#2d180d" strokeWidth="4.5" strokeLinecap="round" />
                      <rect x="73" y="42" width="10" height="15" fill="#3a2312" rx="2" stroke="#22140a" strokeWidth="1" />
                      <rect x="50" y="41" width="8" height="11" fill="#ffe2cc" />
                      <circle cx="54" cy="31" r="11" fill="#ffe2cc" />
                      <path d="M 46,31 L 42,34 L 46,36 L 46,40 L 49,41 Z" fill="#ffe2cc" />
                      <path d="M 65,48 C 66,28 65,18 50,18 C 42,18 42,26 43,32 C 43,46 48,48 52,48 C 56,48 57,48 65,48 Z" fill="#111827" />
                      <path d="M 55,21 C 47,21 43,26 43,32 C 45,30 49,28 55,28 Z" fill="#111827" />
                      <circle cx="49" cy="34" r="2" fill="#fda4af" opacity="0.6" />
                      <circle cx="57" cy="37" r="1" fill="#ffd700" />
                    </svg>
                  </div>
                  <div className="standing-constable-right">
                    <svg viewBox="20 0 60 100" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" className="constable-svg">
                      <ellipse cx="50" cy="8" rx="15" ry="8" fill="#c8b18a" />
                      <path d="M 33,10 C 33,6 67,6 67,10 C 67,13 33,13 33,10 Z" fill="#4a2c11" />
                      <path d="M 32,10 Q 50,17 68,10 Q 62,19 38,19 Z" fill="#020617" />
                      <path d="M 47,5 L 53,5 L 54,8 C 54,10 50,12 50,12 C 50,12 46,10 46,8 Z" fill="#ffd700" />
                      <path d="M 33,10 Q 50,13 67,10" stroke="#ffd700" strokeWidth="1.2" fill="none" />
                      <circle cx="34" cy="22" r="5" fill="#18181b" />
                      <circle cx="35" cy="28" r="3.5" fill="#ffdbac" />
                      <circle cx="65" cy="28" r="3.5" fill="#ffdbac" />
                      <circle cx="34.5" cy="29" r="1" fill="#ffd700" />
                      <circle cx="65.5" cy="29" r="1" fill="#ffd700" />
                      <path d="M 38,15 C 38,33 42,40 50,40 C 58,40 62,33 62,15 Z" fill="#ffdbac" />
                      <path d="M 36,21 C 37,15 44,13 50,17 C 56,13 63,15 64,21 C 62,18 57,17 50,20 C 43,17 38,18 36,21 Z" fill="#18181b" />
                      <path d="M 41,21 Q 44,19 47,22" stroke="#18181b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M 59,21 Q 56,19 53,22" stroke="#18181b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <circle cx="44" cy="25" r="2.2" fill="#18181b" />
                      <circle cx="43.2" cy="24.3" r="0.7" fill="#fff" />
                      <circle cx="56" cy="25" r="2.2" fill="#18181b" />
                      <circle cx="55.2" cy="24.3" r="0.7" fill="#fff" />
                      <circle cx="40" cy="30" r="2.5" fill="#fda4af" opacity="0.6" />
                      <circle cx="60" cy="30" r="2.5" fill="#fda4af" opacity="0.6" />
                      <path d="M 46,33 Q 50,37 54,33" stroke="#e11d48" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                      <rect x="47" y="37" width="6" height="9" fill="#ffdbac" />
                      <path d="M 40,65 L 40,52 C 40,43 43,40 47,39 L 53,39 C 57,40 60,43 60,52 L 60,65 Z" fill="#c8b18a" />
                      <path d="M 45,40 L 50,47 L 41,44 Z" fill="#bfa780" />
                      <path d="M 55,40 L 50,47 L 59,44 Z" fill="#bfa780" />
                      <path d="M 49,45 L 51,45 L 52,56 L 50,59 L 48,56 Z" fill="#3e230d" />
                      <path d="M 40,46 L 44,43 L 43,41 L 40,43 Z" fill="#8e734c" />
                      <circle cx="42" cy="43" r="1" fill="#ffd700" />
                      <path d="M 60,46 L 56,43 L 57,41 L 60,43 Z" fill="#8e734c" />
                      <circle cx="58" cy="43" r="1" fill="#ffd700" />
                      <path d="M 40,50 L 43,50 L 44,54 C 44,56 41.5,57 41.5,57 C 41.5,57 39,56 39,54 Z" fill="#ffd700" />
                      <rect x="56" y="50" width="5" height="2" fill="#1e293b" rx="0.3" />
                      <path d="M 40,52 L 37,59 L 41,64 L 44,64 L 44,57 Z" fill="#c8b18a" />
                      <rect x="33" y="57" width="11" height="8" fill="#334155" rx="1" transform="rotate(-5 33 57)" />
                      <rect x="34" y="58" width="9" height="6" fill="#00d4ff" opacity="0.85" transform="rotate(-5 33 57)" />
                      <circle cx="33" cy="63" r="2.2" fill="#ffdbac" />
                      <path d="M 60,52 L 63,59 L 59,64 L 56,64 L 56,57 Z" fill="#c8b18a" />
                      <rect x="61" y="55" width="4" height="7" fill="#1e293b" rx="0.5" />
                      <line x1="63" y1="55" x2="63" y2="51" stroke="#1e293b" strokeWidth="0.8" />
                      <circle cx="62" cy="63" r="2.2" fill="#ffdbac" />
                      <rect x="39" y="62" width="22" height="4" fill="#3e230d" rx="1" />
                      <rect x="48" y="61" width="4" height="7" fill="#ffd700" rx="0.5" />
                      <path d="M 40,67 L 48,67 L 48,88 L 40,88 Z" fill="#8e734c" />
                      <path d="M 52,67 L 60,67 L 60,88 L 52,88 Z" fill="#8e734c" />
                      <path d="M 48,67 L 52,67 L 52,73 L 48,73 Z" fill="#7a6340" />
                      <rect x="40" y="88" width="9" height="9" fill="#7a6340" rx="1" />
                      <rect x="51" y="88" width="9" height="9" fill="#7a6340" rx="1" />
                      <rect x="39" y="97" width="11" height="3" fill="#0f172a" rx="1.5" />
                      <rect x="50" y="97" width="11" height="3" fill="#0f172a" rx="1.5" />
                    </svg>
                  </div>
                </div>
                <div className={`double-doors ${doorsOpen ? "open" : ""}`}>
                  <div className="door door-left">
                    <div className="door-glass-grid">
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                    </div>
                    <div className="door-bottom-wood-panel"></div>
                    <div className="door-handle handle-left"></div>
                  </div>
                  <div className="door door-right">
                    <div className="door-glass-grid">
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                      <div className="grid-pane"></div>
                    </div>
                    <div className="door-bottom-wood-panel"></div>
                    <div className="door-handle handle-right"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN ENTRANCE STEPS */}
            <div className="steps-container">
              <div className="step-tread step-1"></div>
              <div className="step-tread step-2"></div>
              <div className="step-tread step-3"></div>
              <div className="step-tread step-4"></div>
              <div className="steps-landing-walkway"></div>
            </div>
          </div>

          {/* RIGHT WING */}
          <div className="building-wing right-wing">
            <div className="wing-wall-texture"></div>
            <div className="wing-led-trim"></div>
            <div className="cards-stack">
              {rightItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`side-card ${getColorClass(item.color)} ${selected?.id === item.id ? "active" : ""}`}
                >
                  <span className="card-icon">{getMenuIcon(item.icon)}</span>
                  <span className="card-title font-sans antialiased">{item.title}</span>
                  <span className="card-arrow">&rsaquo;</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GROUND / PAVEMENT SECTION */}
        <div className="pavement-section">
          {/* Indian Flag - Left */}
          <div className="india-flag-left">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
              <circle cx="10" cy="3" r="4" fill="#D4AF37" />
              <circle cx="10" cy="3" r="2" fill="#F0D060" />
              <rect x="8" y="7" width="4" height="138" fill="#8B7355" rx="1" />
              <rect x="8.5" y="7" width="1.5" height="138" fill="#a08060" rx="0.5" />
              <rect x="4" y="140" width="12" height="4" fill="#6B5B3E" rx="1" />
              <g className="flag-wave">
                <rect x="12" y="12" width="80" height="18" fill="#FF9933" rx="1" />
                <rect x="12" y="30" width="80" height="18" fill="#FFFFFF" rx="1" />
                <rect x="12" y="48" width="80" height="18" fill="#138808" rx="1" />
                <circle cx="52" cy="39" r="7" fill="none" stroke="#000080" strokeWidth="1.2" />
                <circle cx="52" cy="39" r="1.5" fill="#000080" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line key={i}
                      x1={52 + 1.5 * Math.cos(rad)} y1={39 + 1.5 * Math.sin(rad)}
                      x2={52 + 7 * Math.cos(rad)} y2={39 + 7 * Math.sin(rad)}
                      stroke="#000080" strokeWidth="0.5"
                    />
                  );
                })}
              </g>
            </svg>
          </div>
          {/* Indian Flag - Right */}
          <div className="india-flag-right">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
              <circle cx="10" cy="3" r="4" fill="#D4AF37" />
              <circle cx="10" cy="3" r="2" fill="#F0D060" />
              <rect x="8" y="7" width="4" height="138" fill="#8B7355" rx="1" />
              <rect x="8.5" y="7" width="1.5" height="138" fill="#a08060" rx="0.5" />
              <rect x="4" y="140" width="12" height="4" fill="#6B5B3E" rx="1" />
              <g className="flag-wave">
                <rect x="12" y="12" width="80" height="18" fill="#FF9933" rx="1" />
                <rect x="12" y="30" width="80" height="18" fill="#FFFFFF" rx="1" />
                <rect x="12" y="48" width="80" height="18" fill="#138808" rx="1" />
                <circle cx="52" cy="39" r="7" fill="none" stroke="#000080" strokeWidth="1.2" />
                <circle cx="52" cy="39" r="1.5" fill="#000080" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line key={i}
                      x1={52 + 1.5 * Math.cos(rad)} y1={39 + 1.5 * Math.sin(rad)}
                      x2={52 + 7 * Math.cos(rad)} y2={39 + 7 * Math.sin(rad)}
                      stroke="#000080" strokeWidth="0.5"
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="connecting-road desktop-road">
            <svg viewBox="0 0 940 100" preserveAspectRatio="none" className="road-svg">
              <polygon points="300,0 640,0 940,100 0,100" fill="#181b20" />
              <line x1="300" y1="0" x2="0" y2="100" stroke="#333" strokeWidth="4" />
              <line x1="640" y1="0" x2="940" y2="100" stroke="#333" strokeWidth="4" />
            </svg>
          </div>
          <div className="connecting-road mobile-road">
            <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="road-svg">
              <polygon points="80,0 420,0 500,100 0,100" fill="#181b20" />
              <line x1="80" y1="0" x2="0" y2="100" stroke="#333" strokeWidth="4" />
              <line x1="420" y1="0" x2="500" y2="100" stroke="#333" strokeWidth="4" />
            </svg>
          </div>
          <div className="horizontal-road">
            <div className="road-center-line"></div>
          </div>
          <div className="ground-shrubbery shrub-left">
            <div className="bush bush-1"></div>
            <div className="bush bush-2"></div>
            <div className="bush bush-3"></div>
            <div className="spotlight-beam"></div>
          </div>
          <div className="ground-shrubbery shrub-right">
            <div className="bush bush-1"></div>
            <div className="bush bush-2"></div>
            <div className="bush bush-3"></div>
            <div className="spotlight-beam"></div>
          </div>

          {/* Police Sedan */}
          <div className={`police-car-container ${carsState.sedan ? "driving" : ""}`} style={carsState.sedan ? { animationDuration: `${carSpeeds.sedan}s` } : {}}>
            <svg viewBox="0 0 360 155" className="police-car-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="window-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#475569" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="body-black-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="40%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="sedan-headlight-beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="180" cy="144" rx="155" ry="6" fill="rgba(0,0,0,0.4)" />
              <path d="M20,118 L64,118 A28,28 0 0,1 120,118 L238,118 A28,28 0 0,1 294,118 L330,118 C342,118 348,114 348,102 L344,88 C340,84 330,83 318,83 L258,76 L215,46 L120,46 L55,88 L20,90 Z" fill="url(#body-black-gradient)" stroke="#0f172a" strokeWidth="1" />
              <path d="M125,112 L233,112 L234,76 L125,76 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="179" y1="76" x2="179" y2="112" stroke="#1e293b" strokeWidth="0.8" />
              <text className="police-car-text" x="179" y="100" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2" style={{ transformOrigin: "179px 100px", transformBox: "view-box", transform: "scaleX(-1)" }}>POLICE</text>
              <path d="M123,76 C126,62 135,50 147,50 L177,50 L177,76 Z" fill="url(#window-gradient)" />
              <path d="M181,76 L181,50 L220,50 C234,50 242,62 248,76 Z" fill="url(#window-gradient)" />
              <rect x="177" y="48" width="4" height="29" fill="#020617" />
              <path d="M116,76 C121,60 130,48 147,48" fill="none" stroke="#020617" strokeWidth="2.5" />
              <path d="M220,48 C236,48 245,60 252,76" fill="none" stroke="#020617" strokeWidth="2.5" />
              <ellipse cx="176" cy="41" rx="14" ry="8" fill="#ef4444" className="siren-glow-red" style={{ transformOrigin: "176px 41px", transformBox: "view-box" }} pointerEvents="none" />
              <ellipse cx="184" cy="41" rx="14" ry="8" fill="#3b82f6" className="siren-glow-blue" style={{ transformOrigin: "184px 41px", transformBox: "view-box" }} pointerEvents="none" />
              <rect x="172" y="43" width="16" height="4" fill="#0f172a" rx="1" />
              <path d="M174,43 C174,38 180,38 180,43 Z" fill="#ef4444" className="siren-red-strobe" />
              <path d="M180,43 C180,38 186,38 186,43 Z" fill="#3b82f6" className="siren-blue-strobe" />
              <circle cx="177" cy="41" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="183" cy="41" r="1.5" fill="#ffffff" opacity="0.9" />
              <path d="M330,85 L346,87 L343,92 L328,90 Z" fill="#ffffff" opacity="0.95" />
              <path d="M330,85 L346,87 L343,92 L328,90 Z" fill="none" stroke="#60a5fa" strokeWidth="0.8" />
              <polygon points="344,86 344,92 480,120 480,60" fill="url(#sedan-headlight-beam)" pointerEvents="none" opacity="0.8" />
              <path d="M18,91 L34,92 L32,96 L18,95 Z" fill="#ef4444" />
              <path d="M18,91 L34,92 L32,96 L18,95 Z" fill="none" stroke="#dc2626" strokeWidth="0.5" />
              <path d="M244,72 L234,70 L233,74 L242,75 Z" fill="#0f172a" />
              <path d="M60,118 A32,32 0 0,1 124,118" fill="none" stroke="#1e293b" strokeWidth="1.5" />
              <path d="M234,118 A32,32 0 0,1 298,118" fill="none" stroke="#1e293b" strokeWidth="1.5" />
              <g className="wheel-front" style={{ transformOrigin: "266px 120px", transformBox: "view-box", animation: carsState.sedan ? `spinContinuous ${carSpeeds.sedan * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="266" cy="120" r="23" fill="#141416" />
                <circle cx="266" cy="120" r="18" fill="#2d2f34" />
                <circle cx="266" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="266" cy="120" r="13" fill="#0f172a" />
                <circle cx="266" cy="120" r="4.5" fill="#cbd5e1" />
                <circle cx="266" cy="120" r="2" fill="#475569" />
                <line x1="266" y1="120" x2="266" y2="134" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="266" y1="120" x2="279.3" y2="124.3" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="266" y1="120" x2="252.7" y2="124.3" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="266" y1="120" x2="257.8" y2="108.7" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="266" y1="120" x2="274.2" y2="108.7" stroke="#cbd5e1" strokeWidth="2" />
              </g>
              <g className="wheel-rear" style={{ transformOrigin: "92px 120px", transformBox: "view-box", animation: carsState.sedan ? `spinContinuous ${carSpeeds.sedan * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="92" cy="120" r="23" fill="#141416" />
                <circle cx="92" cy="120" r="18" fill="#2d2f34" />
                <circle cx="92" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="92" cy="120" r="13" fill="#0f172a" />
                <circle cx="92" cy="120" r="4.5" fill="#cbd5e1" />
                <circle cx="92" cy="120" r="2" fill="#475569" />
                <line x1="92" y1="120" x2="92" y2="134" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="92" y1="120" x2="105.3" y2="124.3" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="92" y1="120" x2="78.7" y2="124.3" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="92" y1="120" x2="83.8" y2="108.7" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="92" y1="120" x2="100.2" y2="108.7" stroke="#cbd5e1" strokeWidth="2" />
              </g>
              <rect x="206" y="80" width="8" height="2" fill="#0f172a" rx="0.5" />
              <rect x="146" y="80" width="8" height="2" fill="#0f172a" rx="0.5" />
            </svg>
          </div>

          {/* Police Bronco SUV */}
          <div className={`police-car-container police-suv-container ${carsState.bronco ? "driving" : ""}`} style={carsState.bronco ? { animationDuration: `${carSpeeds.bronco}s` } : {}}>
            <svg viewBox="0 0 360 155" className="police-car-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="suv-window-blue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="suv-body-white" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="suv-headlight-beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="180" cy="144" rx="155" ry="6" fill="rgba(0,0,0,0.4)" />
              <rect x="10" y="60" width="14" height="42" rx="3" fill="#1c1917" />
              <rect x="12" y="64" width="10" height="34" rx="2" fill="#292524" />
              <line x1="10" y1="70" x2="24" y2="70" stroke="#1c1917" strokeWidth="1.5" />
              <line x1="10" y1="80" x2="24" y2="80" stroke="#1c1917" strokeWidth="1.5" />
              <line x1="10" y1="90" x2="24" y2="90" stroke="#1c1917" strokeWidth="1.5" />
              <path d="M22,118 L64,118 A28,28 0 0,1 120,118 L238,118 A28,28 0 0,1 294,118 L334,118 C338,118 340,115 340,108 L340,84 L260,84 L212,52 L112,52 C108,52 104,56 102,60 L22,70 Z" fill="url(#suv-body-white)" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="22" y1="70" x2="340" y2="84" stroke="#4b5563" strokeWidth="1.5" />
              <path d="M112,52 L212,52 L206,47 L114,47 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
              <path d="M130,114 L218,114 L218,80 L130,80 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="174" y1="80" x2="174" y2="114" stroke="#94a3b8" strokeWidth="0.5" />
              <path d="M171,83 L177,83 L179,87 C179,92 174,95 174,95 C174,95 169,92 169,87 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
              <polygon points="174,85 175,87 177,87 175,89 176,91 174,90 172,91 173,89 171,87 173,87" fill="#ffffff" />
              <text className="police-car-text" x="174" y="107" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8" style={{ transformOrigin: "174px 107px", transformBox: "view-box", transform: "scaleX(-1)" }}>POLICE</text>
              <path d="M132,77 L132,54 L210,54 L210,77 Z" fill="url(#suv-window-blue)" />
              <path d="M214,77 L214,54 L250,54 C256,54 260,62 264,77 Z" fill="url(#suv-window-blue)" />
              <rect x="210" y="54" width="4" height="23" fill="#0f172a" />
              <path d="M110,52 C110,52 110,77 110,77 L126,77 L126,52 Z" fill="#ffffff" />
              <ellipse cx="186" cy="41" rx="22" ry="12" fill="#ef4444" className="siren-glow-red" style={{ transformOrigin: "186px 41px", transformBox: "view-box" }} pointerEvents="none" />
              <rect x="180" y="43" width="12" height="4" fill="#0f172a" rx="0.5" />
              <path d="M182,43 C182,39 190,39 190,43 Z" fill="#ef4444" className="siren-red-strobe" />
              <circle cx="186" cy="41" r="2" fill="#ffffff" opacity="0.9" />
              <rect x="333" y="88" width="7" height="10" fill="#ffffff" rx="1" stroke="#94a3b8" strokeWidth="0.5" />
              <rect x="333" y="100" width="7" height="4" fill="#fbbf24" rx="0.5" />
              <polygon points="340,88 340,104 480,130 480,70" fill="url(#suv-headlight-beam)" pointerEvents="none" opacity="0.8" />
              <rect x="22" y="80" width="4" height="12" fill="#ef4444" rx="0.5" />
              <rect x="343" y="74" width="5" height="44" fill="#1f2937" rx="1" />
              <rect x="334" y="84" width="10" height="3" fill="#1f2937" />
              <rect x="334" y="106" width="10" height="3" fill="#1f2937" />
              <path d="M60,118 A32,32 0 0,1 124,118" fill="none" stroke="#374151" strokeWidth="3.5" />
              <path d="M234,118 A32,32 0 0,1 298,118" fill="none" stroke="#374151" strokeWidth="3.5" />
              <path d="M258,70 L249,68 L248,72 L256,73 Z" fill="#1f2937" />
              <g className="wheel-front" style={{ transformOrigin: "266px 120px", transformBox: "view-box", animation: carsState.bronco ? `spinContinuous ${carSpeeds.bronco * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="266" cy="120" r="24" fill="#1c1917" />
                <circle cx="266" cy="120" r="25.5" fill="none" stroke="#292524" strokeWidth="3" strokeDasharray="3 3" />
                <circle cx="266" cy="120" r="19" fill="#2d2f34" />
                <circle cx="266" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="266" cy="120" r="12" fill="#0f172a" />
                <circle cx="266" cy="120" r="4" fill="#cbd5e1" />
                <line x1="266" y1="105" x2="266" y2="135" stroke="#cbd5e1" strokeWidth="1.8" />
                <line x1="251" y1="120" x2="281" y2="120" stroke="#cbd5e1" strokeWidth="1.8" />
                <line x1="255.4" y1="109.4" x2="276.6" y2="130.6" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="276.6" y1="109.4" x2="255.4" y2="130.6" stroke="#cbd5e1" strokeWidth="1.5" />
              </g>
              <g className="wheel-rear" style={{ transformOrigin: "92px 120px", transformBox: "view-box", animation: carsState.bronco ? `spinContinuous ${carSpeeds.bronco * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="92" cy="120" r="24" fill="#1c1917" />
                <circle cx="92" cy="120" r="25.5" fill="none" stroke="#292524" strokeWidth="3" strokeDasharray="3 3" />
                <circle cx="92" cy="120" r="19" fill="#2d2f34" />
                <circle cx="92" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="92" cy="120" r="12" fill="#0f172a" />
                <circle cx="92" cy="120" r="4" fill="#cbd5e1" />
                <line x1="92" y1="105" x2="92" y2="135" stroke="#cbd5e1" strokeWidth="1.8" />
                <line x1="77" y1="120" x2="107" y2="120" stroke="#cbd5e1" strokeWidth="1.8" />
                <line x1="81.4" y1="109.4" x2="102.6" y2="130.6" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="102.6" y1="109.4" x2="81.4" y2="130.6" stroke="#cbd5e1" strokeWidth="1.5" />
              </g>
              <rect x="220" y="80" width="8" height="2" fill="#0f172a" rx="0.5" />
              <rect x="160" y="80" width="8" height="2" fill="#0f172a" rx="0.5" />
            </svg>
          </div>

          {/* Police Rover */}
          <div className={`police-car-container police-rover-container ${carsState.rover ? "driving" : ""}`} style={carsState.rover ? { animationDuration: `${carSpeeds.rover}s` } : {}}>
            <svg viewBox="0 0 360 155" className="police-car-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="rover-window-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="rover-body-white" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="rover-headlight-beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="180" cy="144" rx="155" ry="6" fill="rgba(0,0,0,0.4)" />
              <path d="M20,116 L64,116 A28,28 0 0,1 120,116 L238,116 A28,28 0 0,1 294,116 L336,116 C344,116 348,112 348,102 L344,84 C342,80 332,79 320,79 L255,75 L220,50 L115,50 C110,50 106,53 102,60 L20,70 Z" fill="url(#rover-body-white)" stroke="#cbd5e1" strokeWidth="1.2" />
              <path d="M64,116 L120,116 L238,116 L294,116 L336,116 L342,108 L340,112 L294,112 L238,112 L120,112 L64,112 Z" fill="#1e293b" />
              <rect x="120" y="112" width="118" height="4" fill="#0f172a" />
              <path d="M60,116 A29,29 0 0,1 122,116" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <path d="M234,116 A29,29 0 0,1 298,116" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <rect x="246" y="86" width="6" height="12" fill="#1e293b" rx="0.5" />
              <line x1="248" y1="88" x2="248" y2="96" stroke="#ffffff" strokeWidth="0.5" />
              <text className="police-car-text" x="179" y="100" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5" style={{ transformOrigin: "179px 100px", transformBox: "view-box", transform: "scaleX(-1)" }}>POLICE</text>
              <path d="M220,52 L254,52 L266,75 L220,75 Z" fill="url(#rover-window-gradient)" />
              <path d="M174,75 L174,52 L216,52 L216,75 Z" fill="url(#rover-window-gradient)" />
              <path d="M124,75 L124,52 L170,52 L170,75 Z" fill="url(#rover-window-gradient)" />
              <rect x="170" y="52" width="4" height="23" fill="#0f172a" />
              <rect x="216" y="52" width="4" height="23" fill="#0f172a" />
              <path d="M120,52 L124,52 L124,75 L120,75 Z" fill="#0f172a" />
              <path d="M254,52 L258,52 L262,75 L258,75 Z" fill="#0f172a" />
              <ellipse cx="176" cy="43" rx="14" ry="8" fill="#ef4444" className="siren-glow-red" style={{ transformOrigin: "176px 43px", transformBox: "view-box" }} pointerEvents="none" />
              <ellipse cx="184" cy="43" rx="14" ry="8" fill="#3b82f6" className="siren-glow-blue" style={{ transformOrigin: "184px 43px", transformBox: "view-box" }} pointerEvents="none" />
              <rect x="172" y="45" width="16" height="4" fill="#0f172a" rx="1" />
              <path d="M174,45 C174,41 180,41 180,45 Z" fill="#ef4444" className="siren-red-strobe" />
              <path d="M180,45 C180,41 186,41 186,45 Z" fill="#3b82f6" className="siren-blue-strobe" />
              <circle cx="177" cy="43" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="183" cy="43" r="1.5" fill="#ffffff" opacity="0.9" />
              <path d="M334,84 L347,85 L344,91 L331,89 Z" fill="#ffffff" opacity="0.95" />
              <path d="M334,84 L347,85 L344,91 L331,89 Z" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              <polygon points="346,84 346,91 480,120 480,60" fill="url(#rover-headlight-beam)" pointerEvents="none" opacity="0.8" />
              <path d="M18,87 L34,89 L32,94 L18,92 Z" fill="#ef4444" />
              <path d="M246,72 L237,70 L236,73 L244,74 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
              <g className="wheel-front" style={{ transformOrigin: "266px 120px", transformBox: "view-box", animation: carsState.rover ? `spinContinuous ${carSpeeds.rover * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="266" cy="120" r="23" fill="#141416" />
                <circle cx="266" cy="120" r="18" fill="#2d2f34" />
                <circle cx="266" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="266" cy="120" r="12" fill="#0f172a" />
                <circle cx="266" cy="120" r="4.5" fill="#cbd5e1" />
                <line x1="266" y1="105" x2="266" y2="135" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="251" y1="120" x2="281" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="255.4" y1="109.4" x2="276.6" y2="130.6" stroke="#cbd5e1" strokeWidth="1.2" />
                <line x1="276.6" y1="109.4" x2="255.4" y2="130.6" stroke="#cbd5e1" strokeWidth="1.2" />
              </g>
              <g className="wheel-rear" style={{ transformOrigin: "92px 120px", transformBox: "view-box", animation: carsState.rover ? `spinContinuous ${carSpeeds.rover * 0.1}s linear infinite` : "none", willChange: "transform" }}>
                <circle cx="92" cy="120" r="23" fill="#141416" />
                <circle cx="92" cy="120" r="18" fill="#2d2f34" />
                <circle cx="92" cy="120" r="15" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                <circle cx="92" cy="120" r="12" fill="#0f172a" />
                <circle cx="92" cy="120" r="4.5" fill="#cbd5e1" />
                <line x1="92" y1="105" x2="92" y2="135" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="77" y1="120" x2="107" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="81.4" y1="109.4" x2="102.6" y2="130.6" stroke="#cbd5e1" strokeWidth="1.2" />
                <line x1="102.6" y1="109.4" x2="81.4" y2="130.6" stroke="#cbd5e1" strokeWidth="1.2" />
              </g>
              <rect x="210" y="80" width="8" height="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" rx="0.5" />
              <rect x="150" y="80" width="8" height="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* MOBILE WING */}
        <div className="building-wing mobile-wing">
          <div className="wing-wall-texture"></div>
          <div className="wing-led-trim"></div>
          <div className="cards-stack">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`side-card ${getColorClass(item.color)} ${selected?.id === item.id ? "active" : ""}`}
              >
                <span className="card-icon">{getMenuIcon(item.icon)}</span>
                <span className="card-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
