import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaAward, FaCheckCircle, FaRegSmile } from "react-icons/fa";

export default function Testimonials() {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // CRCCF Navbar Colors
  const navy = "#0A1D37";
  const cyan = "#00D2FF";

  const allTestimonials = [
  {
    id: 0,
    name: "Rohit Kumar",
    date: "12 Oct, 2023",
    text: "The hands-on training and real-world cyber investigation exposure helped me build strong practical skills.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: "5.0",
  },
  {
    id: 1,
    name: "Ananya Das",
    date: "05 Nov, 2023",
    text: "CRCCF's secure development approach helped me understand how to build scalable and secure applications.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: "4.8",
  },
  {
    id: 2,
    name: "Siddharth Mishra",
    date: "28 Jan, 2024",
    text: "Working on real cybercrime case studies gave me deep insights into digital forensics and investigation techniques.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: "5.0",
  },
  {
    id: 3,
    name: "Priya Sharma",
    date: "14 Feb, 2024",
    text: "Shifted my perspective on network vulnerabilities. The mentorship is top-notch and highly professional.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: "4.5",
  },
  {
    id: 4,
    name: "Amit Patel",
    date: "03 Mar, 2024",
    text: "Highest recommendation. A truly great team with incredible real-world knowledge.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: "5.0",
  },

  // Average Reviews
  {
    id: 5,
    name: "Neha Verma",
    date: "18 Apr, 2024",
    text: "The sessions were informative, but I expected more practical assignments during the training.",
    category: "average",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: "3.2",
  },
  {
    id: 6,
    name: "Rahul Singh",
    date: "09 May, 2024",
    text: "Good learning environment, though some modules felt a little rushed for beginners.",
    category: "average",
    avatar: "https://i.pravatar.cc/150?img=22",
    rating: "3.5",
  },
  {
    id: 7,
    name: "Sneha Iyer",
    date: "27 Jun, 2024",
    text: "The content was useful overall, but I think more live projects could improve the experience.",
    category: "average",
    avatar: "https://i.pravatar.cc/150?img=24",
    rating: "3.0",
  },

  // More Good Reviews
  {
    id: 8,
    name: "Karan Mehta",
    date: "11 Jul, 2024",
    text: "Great mentors and well-structured modules that helped me improve my cybersecurity knowledge.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: "4.4",
  },
  {
    id: 9,
    name: "Pooja Nair",
    date: "21 Jul, 2024",
    text: "The guidance from industry professionals made the learning experience very engaging and practical.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=16",
    rating: "4.6",
  },

  // More Excellent Reviews
  {
    id: 10,
    name: "Arjun Reddy",
    date: "02 Aug, 2024",
    text: "Exceptional training quality with real-world exposure that boosted my confidence significantly.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=17",
    rating: "5.0",
  },
  {
    id: 11,
    name: "Meera Joshi",
    date: "18 Aug, 2024",
    text: "One of the best cybersecurity learning experiences I’ve had. Highly recommended for students.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: "4.9",
  },
  {
    id: 12,
    name: "Vikram Rao",
    date: "07 Sep, 2024",
    text: "The practical labs and expert mentorship gave me industry-level exposure and confidence.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=19",
    rating: "5.0",
  },
    {
    id: 13,
    name: "Aditya Sen",
    date: "15 Sep, 2024",
    text: "The training sessions were interactive and helped me understand ethical hacking concepts clearly.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: "4.3",
  },
  {
    id: 14,
    name: "Riya Kapoor",
    date: "28 Sep, 2024",
    text: "Excellent mentorship and practical exposure. I gained confidence in handling cybersecurity tools.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=26",
    rating: "5.0",
  },
  {
    id: 15,
    name: "Manish Yadav",
    date: "10 Oct, 2024",
    text: "The concepts were explained well, though I felt some advanced topics needed more time.",
    category: "average",
    avatar: "https://i.pravatar.cc/150?img=27",
    rating: "3.4",
  },
  {
    id: 16,
    name: "Simran Kaur",
    date: "24 Oct, 2024",
    text: "Very supportive faculty and amazing real-world case study discussions throughout the program.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=28",
    rating: "4.9",
  },
  {
    id: 17,
    name: "Nikhil Jain",
    date: "06 Nov, 2024",
    text: "The learning material was detailed and easy to understand even for beginners in cybersecurity.",
    category: "good",
    avatar: "https://i.pravatar.cc/150?img=29",
    rating: "4.5",
  },
  {
    id: 18,
    name: "Ayesha Khan",
    date: "19 Nov, 2024",
    text: "I loved the hands-on projects and the exposure to real investigation scenarios.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=30",
    rating: "5.0",
  },
  {
    id: 19,
    name: "Deepak Sahoo",
    date: "02 Dec, 2024",
    text: "The program was decent overall, but adding more practice sessions would make it even better.",
    category: "average",
    avatar: "https://i.pravatar.cc/150?img=31",
    rating: "3.1",
  },
  {
    id: 20,
    name: "Kritika Malhotra",
    date: "16 Dec, 2024",
    text: "One of the most professional and skill-oriented cybersecurity programs I have attended.",
    category: "excellent",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: "4.8",
  },

  ];

  const filteredItems = useMemo(() => {
    const items =
      filter === "all"
        ? allTestimonials
        : allTestimonials.filter((t) => t.category === filter);
    setActiveIndex(0);
    return items;
  }, [filter]);

  const total = filteredItems.length;

  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, total]);
  // ==========================================
  // PERFECT ALIGNMENT ENGINE
  // ==========================================
  const getAvatarLayout = (offset) => {
    if (offset === 0) return { y: 0, x: 0, scale: 1.1, opacity: 1, zIndex: 30 }; // Center Active
    if (offset === -1)
      return { y: -90, x: 35, scale: 0.85, opacity: 1, zIndex: 20 }; // Top Visible
    if (offset === 1)
      return { y: 90, x: 35, scale: 0.85, opacity: 1, zIndex: 20 }; // Bottom Visible
    if (offset < -1)
      return { y: -150, x: 60, scale: 0.5, opacity: 0, zIndex: 10 }; // Hidden Top
    if (offset > 1)
      return { y: 150, x: 60, scale: 0.5, opacity: 0, zIndex: 10 }; // Hidden Bottom
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden min-h-[850px] flex flex-col justify-center">
      {/* ================= NAVY HALF-CIRCLE BACKGROUND ================= */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[35%] h-[90%] rounded-r-[250px] pointer-events-none hidden md:block"
        style={{ backgroundColor: navy }}
      />

      <div className="max-w-[1100px] mx-auto w-full px-4 md:px-8 relative z-10">
        {/* ================= FILTER BAR (Centered at Top) ================= */}
        <div className="flex flex-col items-center mb-10">
          {/* 1. ADDED TOP HEADING HERE */}
          <p className="section-tag">Community Feedback</p>
          <h2 className="section-title">
            Testi<span className="section-title-accent">monials</span>
          </h2>

          <div className="flex bg-white p-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex-wrap justify-center gap-1">
            {[
              { id: "all", label: "All Reviews", icon: null },
              {
                id: "excellent",
                label: "Excellent",
                icon: <FaAward className="text-yellow-500" />,
              },
              {
                id: "good",
                label: "Good",
                icon: <FaCheckCircle className="text-blue-500" />,
              },
              {
                id: "average",
                label: "Average",
                icon: <FaRegSmile className="text-slate-400" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  filter === tab.id
                    ? `bg-[${navy}] text-white shadow-md`
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
                style={{
                  backgroundColor: filter === tab.id ? navy : undefined,
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= FLOATING WHITE CARD ================= */}
        <div
          className="bg-white rounded-xl shadow-[0_20px_60px_rgba(10,29,55,0.08)] flex flex-col md:flex-row items-center p-6 md:p-14 min-h-[450px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ================= LEFT SIDE: HEADER & ARC ================= */}
          <div className="w-full md:w-[45%] min-h-[400px] relative flex flex-col justify-center py-6">
            {/* 2. FIXED DIVISION: Made absolute so it doesn't push the avatars down */}
            <div className="absolute top-0 left-4 md:left-8 z-20">
              <div
                className="w-8 h-[3px] mb-2"
                style={{ backgroundColor: cyan }}
              />
              <h2 className="text-xl font-bold text-slate-800">
                Customer Reviews
              </h2>
            </div>

            <div className="relative w-full flex items-center pl-4 md:pl-12 mt-8">
              {/* The perfectly aligned static SVG curve */}
              <svg
                className="absolute left-[30px] md:left-[60px] top-1/2 -translate-y-1/2 mt-[-24px] w-[100px] h-[200px] pointer-events-none opacity-20"
                viewBox="0 0 100 200"
              >
                {/* M = Start, Q = Control Point, End. This perfectly traces the coordinates set in getAvatarLayout */}
                <path
                  d="M 35 10 Q -15 100 35 190"
                  fill="none"
                  stroke={navy}
                  strokeWidth="1.5"
                />
              </svg>

              {/* The Avatars */}
              <div className="relative w-full">
                {filteredItems.map((item, index) => {
                  let offset = (index - activeIndex) % total;
                  if (offset > Math.floor(total / 2)) offset -= total;
                  if (offset < -Math.floor(total / 2)) offset += total;

                  const layout = getAvatarLayout(offset);
                  const isActive = offset === 0;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      animate={layout}
                      style={{ position: "absolute", marginTop: "-24px" }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                      }}
                      className={`outline-none flex items-center gap-4 ${Math.abs(offset) <= 1 ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      {/* Avatar Bubble */}
                      <div
                        className={`relative w-12 h-12 rounded-full p-[2px] transition-all duration-500 shrink-0 ${
                          isActive
                            ? `bg-white shadow-lg border border-slate-100 z-20`
                            : "bg-transparent grayscale-[60%] opacity-80 hover:grayscale-0 z-10"
                        }`}
                      >
                        <img
                          src={item.avatar}
                          className="w-full h-full rounded-full object-cover"
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          width="48"
                          height="48"
                        />
                      </div>

                      {/* Text Label attached to ALL visible avatars */}
                      <div className="text-left whitespace-nowrap cursor-pointer group">
                        <h4
                          className={`transition-colors duration-300 ${isActive ? "text-slate-900 font-bold text-[13px]" : "text-slate-500 font-semibold text-xs group-hover:text-slate-700"}`}
                        >
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-semibold">
                          <FaStar
                            className={
                              isActive ? `text-[${cyan}]` : "text-slate-400"
                            }
                            style={{ color: isActive ? cyan : undefined }}
                          />
                          <span
                            className={
                              isActive ? "text-slate-700" : "text-slate-400"
                            }
                          >
                            {item.rating}
                          </span>
                          <span className="font-normal text-slate-400">
                            on {item.date}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: SERIF QUOTE TEXT ================= */}
          <div className="w-full md:w-[55%] relative md:pl-10 mt-12 md:mt-0 flex items-center">
            <div className="relative pl-6 md:pl-10">
              {/* Massive Offset Serif Quote Mark */}
              <span className="absolute left-0 -top-6 text-6xl md:text-7xl font-serif font-black text-slate-800 leading-none">
                “
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${filter}-${activeIndex}`}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[15px] md:text-[17px] font-serif italic text-slate-700 leading-relaxed font-medium">
                    {filteredItems[activeIndex]?.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}