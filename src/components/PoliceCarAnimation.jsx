import React from 'react';

const ChaseScene = ({ direction, carInFront, delay }) => {
  const isRight = direction === "right";

  return (
    <div
      className="absolute w-[45px] h-[200px] z-20 top-1/2 -mt-[100px]"
      style={{
        animation: `${isRight ? "police-car-drive-right" : "police-car-drive-left"} 12s linear infinite`,
        animationDelay: delay,
      }}
    >
      {/* RUNNING PRISONER */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-10 h-16"
        style={{ [carInFront ? "bottom" : "top"]: 0 }}
      >
        <div className="absolute inset-x-0 bottom-0 h-6 bg-black/10 blur-md rounded-[100%] translate-y-2 scale-x-125" />
        <div className="relative w-full h-full flex flex-col items-center animate-runner-body-bounce">
          <div className="absolute top-4 w-12 flex justify-between">
            <div
              className="w-2.5 h-6 bg-[#e0ac69] rounded-full origin-top animate-runner-arm-l"
              style={{ clipPath: "ellipse(50% 50% at 50% 50%)" }}
            />
            <div
              className="w-2.5 h-6 bg-[#e0ac69] rounded-full origin-top animate-runner-arm-r"
              style={{ clipPath: "ellipse(50% 50% at 50% 50%)" }}
            />
          </div>
          <div className="absolute top-3 w-10 h-4 bg-[#333] rounded-full z-10" />
          <div className="relative w-6 h-6 bg-[#e0ac69] rounded-full z-30 shadow-sm border border-black/5 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-[#222] rounded-full" />
          </div>
          <div className="w-7 h-10 -mt-1 rounded-b-lg overflow-hidden z-20 border border-black/10 [background:repeating-linear-gradient(to_bottom,#fff_0,#fff_3px,#222_3px,#222_6px)]" />
          <div className="absolute bottom-0 w-7 flex justify-around">
            <div className="w-3 h-7 bg-slate-900 rounded-full origin-top animate-runner-leg-l" />
            <div className="w-3 h-7 bg-slate-900 rounded-full origin-top animate-runner-leg-r" />
          </div>
        </div>
      </div>

      {/* CHAIN */}
      {carInFront && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 z-10 overflow-hidden"
          style={{ top: "95px", bottom: "16px" }}
        >
          <div
            className="w-full h-full animate-rope-jitter"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #444 0, #444 4px, #888 4px, #888 8px, #444 8px)",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      {/* POLICE CAR */}
      <div
        className="absolute w-full h-[95px]"
        style={{
          filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4))",
          [carInFront ? "top" : "bottom"]: 0,
        }}
      >
        <div className="absolute inset-0 bg-black/20 blur-lg rounded-xl translate-y-[10px] scale-x-110" />
        <div className="relative w-full h-full bg-[#111] rounded-lg border border-white/5 overflow-hidden shadow-inner">
          <div className="absolute top-[15%] left-0 w-full h-[70%] bg-white" />
          <div className="absolute top-0 left-[15%] w-[70%] h-full bg-white" />
          <div className="absolute inset-[15%] bg-[#111] rounded-md overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{ animation: "siren-halo 0.4s step-end infinite" }}
            />
          </div>
          <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[80%] h-3 bg-[#0a0a0a] rounded-t-sm border-b border-white/10 z-30" />
          <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/80 rounded-full blur-[1px]" />
          <div className="absolute top-1 right-2 w-3 h-1.5 bg-white/80 rounded-full blur-[1px]" />
          <div className="absolute top-[25%] -left-2 w-2 h-3 bg-[#111] rounded-l-sm" />
          <div className="absolute top-[25%] -right-2 w-2 h-3 bg-[#111] rounded-r-sm" />
          <div className="absolute top-[22%] left-[18%] w-[64%] h-[12%] bg-[#1a1a1a] rounded-t-sm [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] border-t border-white/5" />
          <div className="absolute bottom-[22%] left-[18%] w-[64%] h-[10%] bg-[#1a1a1a] rounded-b-sm [clip-path:polygon(0_0,100%_0,90%_100%,10%_100%)] border-b border-white/5" />
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 text-[10px] font-black text-white/90 tracking-tighter z-20">
            POLICE
          </div>
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[90%] h-3 bg-[#0a0a0a] rounded-sm flex p-[1px] gap-[1px] z-40 border border-white/5">
            <div
              className="flex-1 rounded-[1px]"
              style={{ animation: "siren-red 0.4s step-end infinite" }}
            />
            <div className="w-1 bg-[#222]" />
            <div
              className="flex-1 rounded-[1px]"
              style={{ animation: "siren-blue 0.4s step-end infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PoliceCarAnimation = ({ direction = "right" }) => {
  return (
    <div className="relative w-full h-24 overflow-hidden pointer-events-none">
      <ChaseScene direction={direction} carInFront={direction === "left"} delay="0s" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes police-car-drive-right {
          0% { left: -220px; opacity: 1; transform: scale(0.7) rotate(90deg); }
          100% { left: calc(100% + 220px); opacity: 1; transform: scale(0.7) rotate(90deg); }
        }
        @keyframes police-car-drive-left {
          0% { right: -220px; opacity: 1; transform: scale(0.7) rotate(-90deg); }
          100% { right: calc(100% + 220px); opacity: 1; transform: scale(0.7) rotate(-90deg); }
        }
        @keyframes runner-body-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes runner-leg-l {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-12px) rotate(15deg); }
        }
        @keyframes runner-leg-r {
          0%, 100% { transform: translateY(-12px) rotate(15deg); }
          50% { transform: translateY(0) rotate(-5deg); }
        }
        @keyframes siren-red {
          0%, 49% { background: #400; }
          50%, 100% { background: #ff3b30; box-shadow: 0 0 20px #ff3b30; }
        }
        @keyframes siren-blue {
          0%, 49% { background: #007aff; box-shadow: 0 0 20px #007aff; }
          50%, 100% { background: #004; }
        }
        @keyframes siren-halo {
          0%, 49% { background: #007aff; box-shadow: 0 0 40px #007aff; }
          50%, 100% { background: #ff3b30; box-shadow: 0 0 40px #ff3b30; }
        }
      `,
        }}
      />
    </div>
  );
};

export default PoliceCarAnimation;

