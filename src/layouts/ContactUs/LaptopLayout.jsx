import { useState, useRef, useEffect } from "react";
// Outlet tells React Router exactly where to render the nested pages
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/ContactUs/Sidebar";
import FloatingBackground from "../../components/ContactUs/FloatingBackground";

// Importing all the icons needed for the categories
import {
  Headset,
  Share2,
  MapPin,
  BadgeCent,
  Users,
  BookOpen,
  Mic,
  Scale,
  Gavel,
  UserCheck,
  UserPlus,
  Star,
  MessageSquare,
  Bot,
} from "lucide-react";

// The master list of all sections in the dashboard.
const categories = [
  {
    id: "help-desk",
    title: "Help Desk",
    icon: Headset,
    subtitle: "Resolve support tickets",
  },
  {
    id: "follow-apps",
    title: "Follow Apps",
    icon: Share2,
    subtitle: "Manage social connections",
    href: "/reachus",
  },
  {
    id: "branch-details",
    title: "Branch Details",
    icon: MapPin,
    subtitle: "View office locations",
  },
  {
    id: "officer",
    title: "Officer",
    icon: BadgeCent,
    subtitle: "Manage administrative staff",
  },
  {
    id: "employee",
    title: "Employee",
    icon: Users,
    subtitle: "View staff directory",
  },
  {
    id: "teacher",
    title: "Teacher",
    icon: BookOpen,
    subtitle: "Access faculty records",
  },
  {
    id: "reporter",
    title: "Reporter",
    icon: Mic,
    subtitle: "Manage press contacts",
  },
  {
    id: "advocate",
    title: "Advocate",
    icon: Scale,
    subtitle: "View legal team",
  },
  {
    id: "legal-advisor",
    title: "Legal Advisor",
    icon: Gavel,
    subtitle: "Consult legal experts",
  },
  {
    id: "board-of-director",
    title: "Board of Director",
    icon: UserCheck,
    subtitle: "View board members",
  },
  {
    id: "board-of-member",
    title: "Board of Member",
    icon: UserPlus,
    subtitle: "Manage committee members",
  },
  {
    id: "ai-chat",
    title: "AI Chat",
    icon: Bot,
    subtitle: "Interact with AI assistant",
  },
  {
    id: "review",
    title: "Review",
    icon: Star,
    subtitle: "Manage system reviews",
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: MessageSquare,
    subtitle: "View user feedback",
  },
];

const LaptopLayout = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setHoveredCardId(null);
  }, [location.pathname]);

  // --- SYNCHRONIZED SCROLLING LOGIC ---
  const sidebarScrollRef = useRef(null);
  const mainScrollRef = useRef(null);
  const isScrolling = useRef(null);

  const handleSidebarScroll = () => {
    if (isScrolling.current === "main") return;
    isScrolling.current = "sidebar";

    const sidebar = sidebarScrollRef.current;
    const main = mainScrollRef.current;

    if (sidebar && main && main.scrollHeight > main.clientHeight) {
      const percentage =
        sidebar.scrollTop / (sidebar.scrollHeight - sidebar.clientHeight);
      main.scrollTop = percentage * (main.scrollHeight - main.clientHeight);
    }

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      isScrolling.current = null;
    }, 50);
  };

  const handleMainScroll = () => {
    if (isScrolling.current === "sidebar") return;
    isScrolling.current = "main";

    const sidebar = sidebarScrollRef.current;
    const main = mainScrollRef.current;

    if (sidebar && main && sidebar.scrollHeight > sidebar.clientHeight) {
      const percentage =
        main.scrollTop / (main.scrollHeight - main.clientHeight);
      sidebar.scrollTop =
        percentage * (sidebar.scrollHeight - sidebar.clientHeight);
    }

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      isScrolling.current = null;
    }, 50);
  };

  return (
    // ✨ RESTORED: Outer padding (lg:p-12) to nicely frame the laptop on the screen
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-12 relative bg-[#F8FAFC] overflow-hidden">
      <FloatingBackground />

      {/* --- DEVICE MOCKUP CONTAINER --- */}
      {/* ✨ RESTORED: max-w-[1200px] for the perfect, realistic laptop proportions! */}
      <div className="relative w-full max-w-[1200px] z-10">
        {/* DEVICE BEZEL (Black border) */}
        <div className="relative bg-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-md:p-[14px] max-md:rounded-[2.5rem] md:pt-5 md:px-5 md:pb-10 md:rounded-b-xl md:rounded-t-[2rem]">
          {/* HARDWARE BUTTONS (Mobile Only) */}
          <div className="md:hidden absolute top-20 -left-[3px] w-[3px] h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-l-md border-l border-gray-500"></div>
          <div className="md:hidden absolute top-32 -left-[3px] w-[3px] h-12 bg-gradient-to-b from-gray-600 to-gray-800 rounded-l-md border-l border-gray-500"></div>
          <div className="md:hidden absolute top-48 -left-[3px] w-[3px] h-12 bg-gradient-to-b from-gray-600 to-gray-800 rounded-l-md border-l border-gray-500"></div>
          <div className="md:hidden absolute top-36 -right-[3px] w-[3px] h-16 bg-gradient-to-b from-gray-600 to-gray-800 rounded-r-md border-r border-gray-500"></div>

          {/* The Laptop Webcam dot (Desktop Only) */}
          <div className="hidden md:block absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-800 rounded-full"></div>

          {/* INNER SCREEN */}
          <div className="bg-bgMain w-full overflow-hidden flex flex-col md:flex-row relative bg-white shadow-inner max-md:h-[82vh] max-md:rounded-[1.8rem] md:h-[75vh] md:rounded-md">
            {/* IPHONE NOTCH & CAMERA (Mobile Only) */}
            <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[26px] bg-[#121212] rounded-b-[1.2rem] z-[60] flex items-center justify-center gap-3">
              <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-[#080814] border border-gray-800 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 right-0.5 w-[2px] h-[2px] bg-blue-400 rounded-full blur-[0.5px]"></div>
              </div>
            </div>

            {/* 📱 MOBILE HEADER */}
            <div className="md:hidden bg-navBg text-white px-5 pt-8 pb-4 shrink-0 shadow-md z-20 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold tracking-wider">ContactHub</h1>
                <p className="text-[10px] text-lightBlue mt-0.5 opacity-80 uppercase tracking-widest">
                  Smart Dashboard
                </p>
              </div>
            </div>

            {/* 💻 DESKTOP SIDEBAR */}
            <div className="hidden md:block h-full z-10 relative">
              <Sidebar
                categories={categories}
                hoveredCardId={hoveredCardId}
                sidebarRef={sidebarScrollRef}
                onScroll={handleSidebarScroll}
              />
            </div>

            {/* 📄 MAIN CONTENT AREA */}
            <div
              ref={mainScrollRef}
              onScroll={handleMainScroll}
              className="flex-1 h-full overflow-y-auto custom-scrollbar relative bg-[#F1F5F9]"
            >
              {/* ✨ RESTORED: Inner padding to lg:p-10 so the content has beautiful breathing room */}
              <main className="p-4 sm:p-6 md:p-8 lg:p-10 max-md:pb-20">
                <Outlet context={{ categories, setHoveredCardId }} />
              </main>
            </div>

            {/* 📱 MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
            <div className="md:hidden absolute bottom-0 left-0 w-full h-12 bg-slate-200/85 backdrop-blur-xl flex justify-around items-center text-slate-500 z-[60] border-t border-slate-300 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
              <button className="p-2 hover:text-slate-800 hover:bg-slate-300/50 rounded-full transition-all active:scale-95">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="7" y1="5" x2="7" y2="19"></line>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="17" y1="5" x2="17" y2="19"></line>
                </svg>
              </button>

              <button className="p-2 hover:text-slate-800 hover:bg-slate-300/50 rounded-full transition-all active:scale-95">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  rx="5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                </svg>
              </button>

              <button className="p-2 hover:text-slate-800 hover:bg-slate-300/50 rounded-full transition-all active:scale-95">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- PREMIUM MACBOOK-STYLE LAPTOP BASE (Hidden on Mobile) --- */}
        <div className="hidden md:flex flex-col relative w-[108%] -left-[4%] z-10">
          <div className="relative bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#94a3b8] h-5 sm:h-7 md:h-9 rounded-b-2xl sm:rounded-b-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] flex justify-center border-t border-white/60">
            <div className="w-24 sm:w-32 md:w-40 h-2 sm:h-3 bg-gradient-to-b from-[#cbd5e1] to-[#94a3b8] rounded-b-xl shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)] border-b border-white/20"></div>
            <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 left-[5%] w-[90%] h-8 bg-black/30 blur-2xl rounded-full -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default LaptopLayout;
