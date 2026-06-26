import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Wrench, Globe, Smartphone, MonitorCog,
  Bot, Headset, HandHelping, Code2
} from "lucide-react";

// Precision Gear Component matching the new grid reference
const GridGear = ({
  radius = 115,
  teeth = 20,
  currentRotation = 0,
  direction = 1,
  number = "01",
  children,
  className = "",
  teethColor = "#FFFFFF",
  strokeColor = "#E2E8F0",
  glowColor = "rgba(37, 99, 235, 0.15)"
}) => {
  const outerRadius = radius;
  const innerRadius = radius * 0.88;
  const hubRadius = radius * 0.8;

  const points = [];
  const toothWidth = 0.35;

  for (let i = 0; i < teeth; i++) {
    const angle = (i * 360) / teeth;
    const a1 = angle - (360 / teeth) * toothWidth;
    const a2 = angle + (360 / teeth) * toothWidth;
    const a3 = angle + 180 / teeth - (360 / teeth) * toothWidth;
    const a4 = angle + 180 / teeth + (360 / teeth) * toothWidth;

    points.push(`${outerRadius * Math.cos((a1 * Math.PI) / 180)},${outerRadius * Math.sin((a1 * Math.PI) / 180)}`);
    points.push(`${outerRadius * Math.cos((a2 * Math.PI) / 180)},${outerRadius * Math.sin((a2 * Math.PI) / 180)}`);
    points.push(`${innerRadius * Math.cos((a3 * Math.PI) / 180)},${innerRadius * Math.sin((a3 * Math.PI) / 180)}`);
    points.push(`${innerRadius * Math.cos((a4 * Math.PI) / 180)},${innerRadius * Math.sin((a4 * Math.PI) / 180)}`);
  }
  const pathData = `M ${points.join(" L ")} Z`;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: radius * 2.2, height: radius * 2.2 }}>
      {/* Dynamic Rotation Layer */}
      <motion.svg
        width={radius * 2.4}
        height={radius * 2.4}
        viewBox={`-${radius * 1.2} -${radius * 1.2} ${radius * 2.4} ${radius * 2.4}`}
        className="absolute inset-0 overflow-visible"
        animate={{ rotate: currentRotation * direction }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      >
        <path
          d={pathData}
          fill={teethColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          className="drop-shadow-lg"
        />
        <circle cx="0" cy="0" r={hubRadius} fill="white" stroke={strokeColor} strokeWidth="1" />
        {/* Inner Hub Shadow Ring */}
        <circle cx="0" cy="0" r={hubRadius - 4} fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="4" />
      </motion.svg>

      {/* Static Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 pl-10 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

// Horizontal Connector Component
const Connector = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-0.5 ${className}`}>
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
    <div className="w-8 h-[2px] bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200" />
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
  </div>
);

const GearSystem = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      setRotation(prev => prev + 0.45);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const services = [
    { id: '01', title: "Software Services Introduction", desc: "Innovative software solutions tailored to your business needs.", icon: Code2, path: "/services/software-it/software-services-introduction" },
    { id: '02', title: "AMC Services", desc: "Reliable maintenance and support to keep your systems running smoothly.", icon: Wrench, path: "/services/software-it/amc-services" },
    { id: '03', title: "End To End Web Development", desc: "Complete web development solutions from concept to deployment.", icon: Globe, path: "/services/software-it/end-to-end-web-development" },
    { id: '04', title: "Mobile Application Development", desc: "Powerful and user-friendly mobile apps for Android & iOS.", icon: Smartphone, path: "/services/software-it/mobile-application-development" },
    { id: '05', title: "Desktop & Laptop Software Solutions", desc: "Custom desktop and laptop software to improve productivity.", icon: MonitorCog, path: "/services/software-it/desktop-laptop-software-solutions" },
    { id: '06', title: "Artificial Intelligence Solutions", desc: "AI-powered solutions to automate processes and drive growth.", icon: Bot, path: "/services/software-it/artificial-intelligence-solutions" },
    { id: '07', title: "IT Support", desc: "24/7 IT support to ensure your business stays operational.", icon: Headset, path: "/services/software-it/it-support" },
    { id: '08', title: "Technical Assistance", desc: "Expert help for all your technical issues and challenges.", icon: HandHelping, path: "/services/software-it/technical-assistance" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden py-20 flex items-center justify-center">

      {/* CYBER BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M25 0 L50 14.4 L50 43.4 L25 57.8 L0 43.4 L0 14.4 Z" fill="none" stroke="#2563EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
          {/* Tech circuit lines */}
          <path d="M 0 500 L 1000 500 M 500 0 L 500 1000" stroke="#2563EB" strokeWidth="1" strokeDasharray="10 20" />
          <circle cx="500" cy="500" r="400" fill="none" stroke="#2563EB" strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* MECHANICAL GRID ASSEMBLY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* DESKTOP 2x4 GRID */}
        <div className="hidden lg:grid grid-cols-4 gap-y-24 gap-x-12 items-center">
          {services.map((item, index) => {
            const Icon = item.icon;
            const row = Math.floor(index / 4);
            const col = index % 4;
            // Alternating rotation for a meshed feel
            const direction = (row + col) % 2 === 0 ? 1 : -1;

            return (
              <div key={item.id} className="relative flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                  <GridGear
                    number={item.id}
                    currentRotation={rotation * 1.5}
                    direction={direction}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <Icon className="w-12 h-12 text-blue-600 mb-3" />
                      <h3 className="text-[#0F172A] font-black text-[11px] leading-tight uppercase mb-2 px-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-[9px] leading-snug max-w-[140px] font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </GridGear>
                </motion.div>

                {/* Horizontal Connector (between columns) */}
                {col < 3 && (
                  <Connector className="absolute -right-12 z-0" />
                )}

                {/* Vertical Connector (Optional for more complex mesh) */}
                {row === 0 && (
                  <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 flex flex-col items-center gap-0.5 opacity-20">
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    <div className="w-[1px] h-10 bg-blue-300" />
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* TABLET / MOBILE (Stacked) */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-12">
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center"
                onClick={() => navigate(item.path)}
              >
                <GridGear number={item.id} currentRotation={rotation * 2} direction={i % 2 === 0 ? 1 : -1}>
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <Icon className="w-10 h-10 text-blue-600 mb-2" />
                    <h3 className="text-[#0F172A] font-black text-[10px] leading-tight uppercase mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-[8px] leading-tight max-w-[120px]">{item.desc}</p>
                  </div>
                </GridGear>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default GearSystem;
