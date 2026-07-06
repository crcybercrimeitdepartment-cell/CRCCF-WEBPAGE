import { motion } from "framer-motion";
import {
  FaChartLine,
  FaUserGraduate,
  FaBrain,
  FaCode,
  FaBullhorn,
} from "react-icons/fa";
import SectionHeading from "./common/SectionHeading";

export default function Activities() {
  const items = [
    {
      icon: <FaChartLine />,
      title: "Cyber Awareness Campaigns",
      desc: "CRCCF conducts impactful cyber awareness campaigns to educate communities about online safety, cyber threats, digital fraud prevention, responsible internet usage, cyber hygiene, and secure digital practices for a safer future.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Training And Workshops",
      desc: "CRCCF organizes practical training and workshops to empower learners with industry-focused skills, hands-on knowledge, professional guidance, technology exposure, teamwork, confidence, career-ready learning for future growth, digital success and innovation.",
    },
    {
      icon: <FaBrain />,
      title: "Research Initiatives",
      desc: "CRCCF leads meaningful research initiatives to explore cyber trends, digital risks, security challenges, innovation, technology solutions, awareness strategies, data-driven insights, and practical knowledge for safer digital ecosystems and future-ready communities.",
    },
    {
      icon: <FaCode />,
      title: "Technology-Driven Projects",
      desc: "CRCCF develops technology-driven projects to build innovative digital solutions, cyber tools, AI systems, software applications, security platforms, research-based products, and practical technologies that support safer, smarter, future-ready digital transformation growth.",
    },
  ];

  return (
    <section className="section-padding lg: lg: bg-white font-sans overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* --- HEADER --- */}
        <SectionHeading 
          subtitle="Our Programs" 
          title="Our Activities" 
          highlightWord="Activities" 
          description="Our Ongoing Initiatives — Promoting digital safety, innovation, and knowledge-sharing across communities" 
        />

        {/* --- GRID CARDS WITH AUTOMATIC ATTENTION ANIMATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-14">
          {items.map((item, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative group pt-8" // pt-8 creates space for the overlapping icon
              >
                {/* 1. The Colorful Backdrop 
                    Includes an automatic double-pulse animation on mount to show interactivity */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.04, 1, 1.02, 1] }}
                  transition={{
                    duration: 2.2,
                    delay: 0.5 + i * 0.15, // Staggers the automatic glow
                    ease: "easeInOut",
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="absolute inset-0 top-11 bottom-[-1.5rem] bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-cyan-400 rounded-[1.5rem] z-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.4)]"
                ></motion.div>

                {/* 2. The Foreground Glass Card */}
                <div className="relative z-10 w-full h-full bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[1.5rem] px-7 pb-8 pt-10 transition-all duration-500 shadow-sm group-hover:bg-white group-hover:-translate-y-2 group-hover:border-white flex flex-col">
                  
                  {/* 3. Pixel-Perfect Overlapping Icon 
                      Includes an automatic double-bounce animation on mount */}
                  <motion.div
                    initial={{ y: 0 }}
                    whileInView={{ y: [0, -12, 0, -8, 0] }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + i * 0.15, // Syncs with the backdrop glow
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="absolute -top-8 left-7 w-16 h-16 shrink-0 bg-white border-[5px] border-[#F8FAFC] rounded-2xl flex items-center justify-center shadow-md text-[#3B82F6] text-2xl z-30 transition-transform duration-500 group-hover:scale-110 group-hover:border-blue-50 group-hover:text-[#2563EB]"
                  >
                    <div className="absolute inset-0 rounded-xl bg-blue-400/10 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 ease-out"></div>
                    {item.icon}
                  </motion.div>

                  {/* Card Content */}
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 mt-2 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <div className="h-[3px] w-12 bg-blue-100 mb-5 rounded-full transition-all duration-500 group-hover:w-full group-hover:bg-[#3B82F6]"></div>

                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
