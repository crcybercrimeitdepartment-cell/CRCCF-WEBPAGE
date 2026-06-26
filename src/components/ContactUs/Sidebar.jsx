// Link is for navigating between pages.
// useLocation is a hook that tells us the current URL of the browser!
import { Link, useLocation } from "react-router-dom";

// The Sidebar component receives 4 props:
// - categories: The array of menu items (Help Desk, Follow Apps, etc.)
// - hoveredCardId: The ID of the card currently being hovered on the main dashboard
// - sidebarRef: A reference attached to the scrollable area (used for our synced scrolling)
// - onScroll: The function that triggers when this sidebar is scrolled
const Sidebar = ({ categories, hoveredCardId, sidebarRef, onScroll }) => {
  // Get the current location object so we can check the pathname (e.g., "/help-desk")
  const location = useLocation();

  return (
    // --- MAIN SIDEBAR CONTAINER ---
    // w-64: Fixed width of 16rem
    // shrink-0: Prevents the sidebar from getting squished if the screen gets small
    // z-20: Keeps it sitting securely above the background animations
    <aside className="w-64 h-full bg-navBg text-white shadow-xl flex flex-col shrink-0 relative z-20">
      {/* --- BRANDING HEADER --- */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wider">ContactHub</h1>
        <p className="text-xs text-lightBlue mt-1 opacity-80 uppercase tracking-widest">
          Smart Dashboard
        </p>
      </div>

      {/* --- SCROLLABLE NAVIGATION LIST --- */}
      {/* We attach the ref and onScroll here so scrolling this list moves the main content too */}
      {/* custom-scrollbar applies the styling from your index.css */}
      <nav
        ref={sidebarRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto px-3 py-6 custom-scrollbar"
      >
        <ul className="space-y-1">
          {/* Loop through every category in your array to generate the list items */}
          {categories.map((cat) => {
            // ✨ HIGHLIGHT LOGIC: How we know when to turn a button blue ✨

            // 1. Is the user actually on this page? (e.g., URL is "/help-desk" and button is "help-desk")
            const isActivePage = location.pathname === `/contact/${cat.id}`;

            // 2. Is the user hovering over the corresponding card on the main dashboard?
            const isHoveredCard = hoveredCardId === cat.id;

            // 3. If EITHER of those are true, we want this menu item to light up!
            const isHighlighted = isActivePage || isHoveredCard;

            return (
              <li key={cat.id}>
                <Link
                  to={cat.href || `/contact/${cat.id}`}
                  // Dynamic Tailwind Classes based on 'isHighlighted'
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-hoverBlue hover:text-white hover:translate-x-1 ${
                    isHighlighted
                      ? // IF TRUE: Turn it blue, make text white, add a cool left border accent and a shadow
                        "bg-primary text-white border-l-4 border-accent shadow-md"
                      : // IF FALSE: Keep it a muted greyish-blue color
                        "text-slate-300"
                  }`}
                >
                  {/* Render the specific icon for this category */}
                  <cat.icon
                    size={18}
                    // If highlighted, make the icon solid (100% opacity). If not, fade it slightly (80%)
                    className={isHighlighted ? "opacity-100" : "opacity-80"}
                  />
                  {/* Render the text name of the category */}
                  {cat.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
