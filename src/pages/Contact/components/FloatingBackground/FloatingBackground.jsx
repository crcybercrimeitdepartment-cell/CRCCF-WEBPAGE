import React, { useMemo } from "react";

const FloatingBackground = React.memo(
  ({ count = 5 }) => {
    // We cap the count to 6 because rendering too many massive blurred divs affects performance
    const orbCount = Math.min(count, 6);

    const orbs = useMemo(() => {
      // Generate large, soft glowing orbs for a premium mesh-gradient aesthetic
      return Array.from({ length: orbCount }).map((_, i) => {
        // Very soft, premium blue, cyan, and violet tones
        const colors = [
          "bg-blue-500",
          "bg-cyan-400",
          "bg-indigo-500",
          "bg-sky-400",
          "bg-violet-400"
        ];
        const color = colors[i % colors.length];
        
        return {
          id: i,
          color,
          // Large random size between 40vw and 60vw so they cover a lot of background area
          size: `${40 + Math.random() * 20}vw`,
          // Spread them across the screen horizontally and vertically
          left: `${(i * 20) - 10}vw`,
          top: `${(Math.random() * 60) - 10}vh`,
          animationDuration: `${25 + Math.random() * 15}s`,
          animationDelay: `-${Math.random() * 20}s`,
        };
      });
    }, [orbCount]);

    return (
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0 bg-[#F8FAFC]">
        
        {/* ── Abstract Glowing Orbs ── */}
        {orbs.map((orb) => (
          <div
            key={orb.id}
            // The huge blur and low opacity creates the premium mesh gradient effect
            className={`absolute rounded-full opacity-[0.12] blur-[80px] sm:blur-[120px] mix-blend-multiply ${orb.color}`}
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.left,
              top: orb.top,
              animation: `floatAmbient ${orb.animationDuration} ease-in-out infinite alternate`,
              animationDelay: orb.animationDelay,
            }}
          />
        ))}
        
        {/* ── Premium Subtle Grid Overlay ── */}
        {/* This adds texture over the gradient orbs, a very modern SaaS aesthetic */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        
        {/* ── Vignette / Soft Inner Shadow ── */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,255,255,0.7)] z-0" />
      </div>
    );
  }
);

export default FloatingBackground;
