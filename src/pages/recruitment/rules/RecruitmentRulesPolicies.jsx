import React, { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";
import { Shield, Lock, ChevronLeft, ChevronRight, ArrowLeft, HeartHandshake, Scale, Users, Zap, BookOpen, Heart, Star, Server, Brain, Clock, FileText, Database, Search, GraduationCap, X } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { RecruitmentPoliciesData } from "./RecruitmentRulesPoliciesData";
import { useStampAnimation } from "../../../hooks/useStampAnimation";

const ICON_MAP = {


  Shield, HeartHandshake, Scale, Users, Zap,
  BookOpen, Heart, Star, Server, Brain, Clock, FileText,
  Database, Search, GraduationCap,
};

const Stamp3D = forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props} position={[0, -2000, 0]}>
      <Cylinder args={[45, 45, 8, 64]} position={[0, 4, 0]} castShadow>
        <meshStandardMaterial color="#dc2626" roughness={0.9} />
      </Cylinder>
      <Cylinder args={[40, 45, 20, 64]} position={[0, 18, 0]} castShadow>
        <meshStandardMaterial color="#1f2937" roughness={0.7} metalness={0.2} />
      </Cylinder>
      <Cylinder args={[35, 40, 10, 64]} position={[0, 33, 0]} castShadow>
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </Cylinder>
      <Cylinder args={[15, 35, 25, 32]} position={[0, 50.5, 0]} castShadow>
        <meshStandardMaterial color="#000000" roughness={0.5} />
      </Cylinder>
      <Cylinder args={[30, 15, 55, 32]} position={[0, 90.5, 0]} castShadow>
        <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.5} />
      </Cylinder>
      <Cylinder args={[32, 30, 15, 32]} position={[0, 125.5, 0]} castShadow>
        <meshStandardMaterial color="#374151" roughness={0.3} />
      </Cylinder>
    </group>
  );
});

function SealOverlay({ label, rotation }) {
  return (
    <div
      className="stamp-mark absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{
        zIndex: 10,
        '--rot': `${rotation}deg`,
        animation: 'stamp-appear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}
    >
      <div
        className="flex flex-col items-center justify-center transform relative"
        style={{
          width: '72px', height: '72px',
          border: '3px solid #ff2a2a',
          borderRadius: '50%',
          padding: '4px',
          transform: `rotate(${rotation}deg)`,
          boxShadow: '0 0 10px rgba(255, 42, 42, 0.4), inset 0 0 10px rgba(255, 42, 42, 0.2)',
          background: 'rgba(255, 42, 42, 0.05)',
          backdropFilter: 'blur(1px)',
        }}
      >
        <div className="w-full h-full border-2 border-dashed border-[#ff2a2a]/60 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
          <span
            className="font-black text-[#ff2a2a] uppercase text-center"
            style={{ fontSize: '9px', lineHeight: '1', textShadow: '0 0 8px rgba(255,42,42,0.6)', marginTop: '2px', letterSpacing: '0.05em' }}
          >
            {label}
          </span>
          <div className="w-8 border-t border-[#ff2a2a]/40 my-[3px]"></div>
          <span
            className="font-bold text-[#ff2a2a]/90 uppercase tracking-[0.1em]"
            style={{ fontSize: '4.5px' }}
          >
            GOVT. SEAL
          </span>
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        </div>
      </div>
      <style>{`
        @keyframes stamp-appear {
          0% { opacity: 0; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const VictimCard = forwardRef(function VictimCard(
  { card, isStamped, onClick, stampRotation = -5 },
  ref
) {
  const Icon = ICON_MAP[card.icon] || Shield;
  const sealLabel = card.id % 2 === 0 ? 'APPROVED' : 'VERIFIED';

  return (
    <div
      ref={ref}
      className={`victim-card relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl transition-all duration-300 ${isStamped ? ' stamped' : 'hover:bg-slate-800/50 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'}`}
      onClick={onClick}
      title={card.title}
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(51, 65, 85, 0.5)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="flex items-center justify-center rounded-lg flex-shrink-0 relative overflow-hidden"
        style={{
          width: '32px', height: '32px',
          background: `linear-gradient(135deg, ${card.color}25, ${card.color}05)`,
          border: `1px solid ${card.color}40`,
          boxShadow: `0 0 10px ${card.color}20`,
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at top left, ${card.color}, transparent)` }} />
        <Icon size={16} strokeWidth={2} style={{ color: card.color, filter: `drop-shadow(0 0 4px ${card.color}80)` }} />
      </div>

      <p
        className="text-center font-bold select-none px-1 z-10"
        style={{ fontSize: '11.5px', lineHeight: '1.25', color: '#cbd5e1', letterSpacing: '0.02em', marginTop: '3px' }}
      >
        {card.title}
      </p>

      <div
        className="absolute top-1.5 right-1.5 flex items-center justify-center rounded-md shadow-sm backdrop-blur-sm"
        style={{ width: '16px', height: '16px', background: `${card.color}15`, border: `1px solid ${card.color}30` }}
      >
        <span style={{ fontSize: '8px', color: card.color, fontWeight: 700 }}>{card.id}</span>
      </div>

      {isStamped && <SealOverlay label={sealLabel} rotation={stampRotation} />}
    </div>
  );
});

const CardGrid = forwardRef(function CardGrid(
  { stampedCards, onCardSelect, cardRefs, currentPage },
  ref
) {
  const cardsPerPage = 8;
  const startIndex = currentPage * cardsPerPage;
  const currentCards = RecruitmentPoliciesData.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div ref={ref} className="w-full h-full p-4 sm:p-5 flex flex-col justify-center">
      <div
        className="grid w-full gap-3 px-2 pb-2 flex-1"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}
      >
        {currentCards.map(card => (
          <VictimCard
            key={card.id}
            ref={el => { if (cardRefs) cardRefs.current[card.id] = el; }}
            card={card}
            isStamped={stampedCards.has(card.id)}
            stampRotation={-7 + ((card.id * 9) % 14)}
            onClick={() => onCardSelect(card)}
          />
        ))}
      </div>
    </div>
  );
});



function FloatingWatermarks() {
  const baseIcons = Object.values(ICON_MAP);
  const icons = Array.from({ length: 45 }, (_, i) => baseIcons[i % baseIcons.length]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {icons.map((Icon, i) => {
        const left = `${(i * 17) % 90 + 5}%`;
        const size = 25 + ((i * 13) % 35);
        const duration = 20 + ((i * 7) % 25);
        const delay = -((i * 11) % 35);

        return (
          <div
            key={i}
            className="absolute text-[#2563eb]"
            style={{
              left,
              top: 0,
              width: size,
              height: size,
              animation: `float-down ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              opacity: 0,
            }}
          >
            <Icon size={size} strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
}

export default function RecruitmentRulesPolicies() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLidAnimating, setIsLidAnimating] = useState(false);
  const [stampedCards, setStampedCards] = useState(new Set());
  const [isStampAnimating, setIsStampAnimating] = useState(false);
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [padScale, setPadScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const availableWidth = window.innerWidth;
      const targetWidth = 680;
      if (availableWidth < targetWidth) {
        return Math.max(0.35, availableWidth / targetWidth);
      }
    }
    return 1;
  });

  const cardsPerPage = 8;
  const totalPages = Math.ceil(RecruitmentPoliciesData.length / cardsPerPage);

  const lidRef = useRef(null);
  const inkSurfaceRef = useRef(null);
  const cardRefs = useRef({});
  const stamp3DRef = useRef(null);

  const { triggerStamp, resetStamp } = useStampAnimation();

  useEffect(() => {
    if (isOpen && !isLidAnimating) {
      resetStamp({ stamp3DRef, inkSurfaceRef });
    }
  }, [isOpen, isLidAnimating, resetStamp]);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const targetWidth = 680;
      if (availableWidth < targetWidth) {
        setPadScale(Math.max(0.35, availableWidth / targetWidth));
      } else {
        setPadScale(1);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const toggleLid = useCallback(() => {
    if (isLidAnimating || isStampAnimating) return;
    setIsLidAnimating(true);

    if (!isOpen) {
      gsap.to(".stamp-wrapper", { opacity: 1, duration: 0.5, delay: 0.5 });
      gsap.to(lidRef.current, {
        rotateX: 160,
        duration: 1.5,
        ease: "power3.inOut",
        onStart: () => setIsOpen(true),
      });
      gsap.to(".stamp-device-container", {
        y: 130,
        scale: 0.85,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => setIsLidAnimating(false),
      });
    } else {
      gsap.to(".stamp-wrapper", { opacity: 0, duration: 0.2 });
      gsap.to(lidRef.current, {
        rotateX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          setIsOpen(false);
          setIsLidAnimating(false);
        },
      });
      gsap.to(".stamp-device-container", {
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
  }, [isOpen, isLidAnimating, isStampAnimating]);

  const handlePageChange = useCallback(
    (direction) => {
      if (isLidAnimating || isStampAnimating || !isOpen) return;
      setIsLidAnimating(true);

      gsap.to(".stamp-wrapper", { opacity: 0, duration: 0.2 });

      gsap.to(lidRef.current, {
        rotateX: 0,
        duration: 0.8,
        ease: "power3.in",
      });
      gsap.to(".stamp-device-container", {
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          setIsOpen(false);

          const moveOutX = direction === "next" ? "-120vw" : "120vw";
          const moveInX = direction === "next" ? "120vw" : "-120vw";

          gsap.to(".stamp-device-container", {
            x: moveOutX,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setCurrentPage((p) =>
                direction === "next"
                  ? (p + 1) % totalPages
                  : (p - 1 + totalPages) % totalPages,
              );

              gsap.set(".stamp-device-container", { x: moveInX });

              gsap.to(".stamp-device-container", {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.1,
                onComplete: () => {
                  gsap.to(".stamp-wrapper", {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.4,
                  });
                  gsap.to(lidRef.current, {
                    rotateX: 160,
                    duration: 1.2,
                    ease: "power3.out",
                    onStart: () => setIsOpen(true),
                  });
                  gsap.to(".stamp-device-container", {
                    y: 130,
                    scale: 0.85,
                    duration: 1.2,
                    ease: "power3.out",
                    onComplete: () => setIsLidAnimating(false),
                  });
                }
              });
            }
          });
        },
      });
    },
    [isOpen, isLidAnimating, isStampAnimating, totalPages],
  );

  const handleCardSelect = useCallback(
    (card) => {
      if (isStampAnimating || isLidAnimating || !isOpen) return;
      if (stampedCards.has(card.id)) {
        showToast("Already verified! ✅");
        return;
      }

      const cardEl = cardRefs.current[card.id];
      if (!cardEl || !inkSurfaceRef.current || !stamp3DRef.current) return;

      setIsStampAnimating(true);

      triggerStamp({
        stamp3DRef,
        inkSurfaceRef,
        cardRef: { current: cardEl },
        onStamped: () => setStampedCards((prev) => new Set([...prev, card.id])),
        onComplete: () => {
          navigate(`/coming-soon`);
        },
      });
    },
    [isOpen, isLidAnimating, isStampAnimating, stampedCards, triggerStamp],
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  useEffect(() => {
    gsap.fromTo(
      ".stamp-device-container",
      { opacity: 0, y: 100, scale: 0.9, rotateX: 10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start w-full relative bg-slate-50"
      style={{
        perspective: "4000px",
      }}
    >
      <FloatingWatermarks />

      <div className="w-full flex flex-col items-center text-center z-50 px-4 py-10 sm:py-12 relative bg-slate-50 shadow-sm sm:shadow-none">
        <h1 className="text-3xl md:text-4xl font-black text-[#2563eb] tracking-tight mb-4">
          Recruitment Policies & Career Development Framework
        </h1>
        <p className="text-slate-600 max-w-3xl text-base sm:text-lg font-medium leading-relaxed">
          Discover our comprehensive guidelines designed to attract top talent and provide a clear, structured roadmap for continuous professional growth and career progression.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full pt-32 sm:pt-48 pb-20 relative z-10">
        <div
          className="scale-wrapper flex-shrink-0 transition-transform duration-300"
          style={{
            width: "650px",
            transform: `scale(${padScale})`,
            transformOrigin: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: padScale < 1 ? `-${(1 - padScale) * 150}px` : "0",
            marginBottom: padScale < 1 ? `-${(1 - padScale) * 150}px` : "0"
          }}
        >
          <div className="stamp-device-container relative w-full" style={{ marginTop: "-20px" }}>
            <div className="stamp-device stamp-scene w-full" style={{ transformStyle: "preserve-3d" }}>
              <div ref={lidRef} className="stamp-lid absolute inset-x-0 top-0 z-40" style={{ height: "100%", transformOrigin: "top center", transformStyle: "preserve-3d" }}>
                <div
                  className="stamp-panel absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    background: "#0f172a",
                    border: "12px solid #1e293b",
                    boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                    transform: "rotateX(180deg) translateZ(2px)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    opacity: isOpen || isLidAnimating ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                  }}
                >
                  <CardGrid
                    stampedCards={stampedCards}
                    onCardSelect={handleCardSelect}
                    cardRefs={cardRefs}
                    currentPage={currentPage}
                  />
                </div>
                <div
                  className="cover-surface absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden backdrop-blur-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
                    border: "1px solid rgba(100, 116, 139, 0.2)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    pointerEvents: !isOpen && !isLidAnimating ? "auto" : "none",
                  }}
                  onClick={toggleLid}
                >
                  <div className="flex flex-col items-center justify-center opacity-90 relative z-10">
                    <Users size={72} className="text-slate-400 mb-6 drop-shadow-[0_0_15px_rgba(148,163,184,0.3)]" strokeWidth={1.5} />
                    <h1 className="text-2xl font-black tracking-[0.2em] uppercase mb-2 drop-shadow-md text-center">
                      <span className="text-white">OFFICIAL</span> <span style={{ color: '#2563eb' }}>SEAL PAD</span>
                    </h1>
                    <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase mb-12 text-center px-4">
                      RECRUITMENT & HR GUIDELINES
                    </p>
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-600 bg-slate-800/80 text-slate-300 text-xs font-bold tracking-widest hover:bg-slate-700 transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                      <Lock size={14} className="text-blue-400" /> ACCESS POLICIES
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl pointer-events-none" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full flex justify-between px-16 z-30" style={{ transform: "translateY(-50%)" }}>
                <div className="hinge-part shadow-lg" style={{ width: "40px", height: "24px", borderRadius: "6px", background: "linear-gradient(to bottom, #475569, #1e293b)" }} />
                <div className="hinge-part shadow-lg" style={{ width: "40px", height: "24px", borderRadius: "6px", background: "linear-gradient(to bottom, #475569, #1e293b)" }} />
              </div>
              <div
                className="tray-base relative z-20 w-full rounded-2xl flex flex-col items-center justify-center pt-8 pb-6 px-6"
                style={{
                  background: "linear-gradient(to bottom, #1e293b, #0f172a)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_20px_40px_rgba(0,0,0,0.8)] pointer-events-none" />
                <div
                  className="ink-base w-full relative rounded-xl"
                  style={{
                    padding: "6px 24px 10px",
                    margin: "0 auto",
                    background: "#020617",
                    border: "1px solid #1e293b",
                    boxShadow: "inset 0 0 20px #000",
                  }}
                >
                  <div
                    ref={inkSurfaceRef}
                    className="ink-surface relative rounded-lg overflow-hidden"
                    style={{
                      height: "240px",
                      transformOrigin: "bottom center",
                      background: "linear-gradient(145deg, #7f1d1d, #450a0a)",
                      boxShadow: "inset 0 0 30px #000, 0 0 15px rgba(185,28,28,0.3)",
                      border: "1px solid #991b1b",
                    }}
                  >
                    <div className="ink-surface-gloss absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                    />
                  </div>
                </div>
                <div
                  className="w-full relative rounded-xl mt-7 flex items-center justify-between px-6 py-4 transition-opacity duration-500"
                  style={{
                    background: "#0c1322",
                    borderTop: "2px solid #050810",
                    borderBottom: "1px solid #233660",
                    boxShadow: "inset 0 10px 20px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.03)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                  }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePageChange('prev'); }}
                    disabled={currentPage === 0 || isStampAnimating}
                    className="flex items-center justify-center gap-2 w-32 py-3 rounded-lg cursor-pointer transition-all duration-300 bg-[#0E1628] border-t border-t-[#314E8E] border-x border-x-[#1e3465] border-b border-b-[#050810] text-[#F5F8FF] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_8px_rgba(0,0,0,0.5)] hover:bg-[#2151B1] hover:-translate-y-[2px] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_10px_15px_rgba(0,0,0,0.6),0_0_20px_rgba(77,134,242,0.4)] active:translate-y-[3px] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.8)]"
                    style={{
                      opacity: (currentPage === 0 || isStampAnimating) ? 0.3 : 1,
                      pointerEvents: (currentPage === 0 || isStampAnimating) ? 'none' : 'auto',
                    }}
                  >
                    <ChevronLeft size={18} strokeWidth={3} />
                    <span className="font-black tracking-[0.2em] text-[12px] mt-[1px]">BACK</span>
                  </button>

                  <div className="flex items-center justify-center px-4">
                    <div
                      className="px-5 py-2.5 rounded-md font-black tracking-[0.25em] text-[13px] border border-[#1e293b] shadow-inner"
                      style={{
                        background: "#080d18",
                        color: "#4D86F2",
                        textShadow: "0 0 10px rgba(77,134,242,0.5)",
                        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)"
                      }}
                    >
                      PAGE {(currentPage + 1).toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePageChange('next'); }}
                      disabled={currentPage === totalPages - 1 || isStampAnimating}
                      className="flex items-center justify-center gap-2 w-32 py-3 rounded-lg cursor-pointer transition-all duration-300 bg-[#0E1628] border-t border-t-[#314E8E] border-x border-x-[#1e3465] border-b border-b-[#050810] text-[#F5F8FF] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_8px_rgba(0,0,0,0.5)] hover:bg-[#2151B1] hover:-translate-y-[2px] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_10px_15px_rgba(0,0,0,0.6),0_0_20px_rgba(77,134,242,0.4)] active:translate-y-[3px] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.8)]"
                      style={{
                        opacity: (currentPage === totalPages - 1 || isStampAnimating) ? 0.3 : 1,
                        pointerEvents: (currentPage === totalPages - 1 || isStampAnimating) ? 'none' : 'auto',
                      }}
                    >
                      <span className="font-black tracking-[0.2em] text-[12px] mt-[1px]">NEXT</span>
                      <ChevronRight size={18} strokeWidth={3} />
                    </button>

                    <button
                      onClick={toggleLid}
                      disabled={isStampAnimating}
                      className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all duration-300 bg-[#080d18] border border-[#1e293b] text-[#AFC3F3] shadow-inner hover:bg-[#141E35] hover:text-[#F5F8FF] hover:border-[#314E8E] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-inner"
                      title="Close Device"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stamp-wrapper fixed inset-0 pointer-events-none z-[9999]" style={{ opacity: 0 }}>
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1000] }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[200, 500, 300]} intensity={1.5} castShadow />
          <Stamp3D ref={stamp3DRef} />
        </Canvas>
      </div>
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            padding: "14px 28px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(51,65,85,0.8)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 20px rgba(59,130,246,0.1)",
            fontSize: "13px",
            fontWeight: 700,
            color: "#e2e8f0",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            animation: "toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
          }}
        >
          {toast}
        </div>
      )}
      <style>{`
        @keyframes dot-bounce  { 0%,100%{transform:scaleY(1);opacity:0.6} 50%{transform:scaleY(1.7);opacity:1} }
        @keyframes toastIn     { from{opacity:0;transform:translateX(-50%) translateY(20px) scale(0.9)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
        @keyframes float-down  {
          0% { transform: translateY(-20vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.12; }
          90% { opacity: 0.12; }
          100% { transform: translateY(120vh) rotate(180deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
