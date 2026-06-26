import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the home page itself
  if (location.pathname === '/') {
    return null;
  }

  const handleBack = () => {
    // If the history state indicates this is the first page of the app, go home
    if (window.history.length <= 2 || location.key === "default") {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="relative md:absolute top-0 left-0 w-full z-50 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 md:pb-0 flex items-start justify-start gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:text-[#1A56DB] hover:bg-[#EFF6FF] border border-transparent hover:border-[#BFDBFE] transition-all focus:outline-none text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white/40 backdrop-blur-sm"
        aria-label="Go Back"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleHome}
        className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:text-[#1A56DB] hover:bg-[#EFF6FF] border border-transparent hover:border-[#BFDBFE] transition-all focus:outline-none text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white/40 backdrop-blur-sm"
        aria-label="Back to Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </motion.button>
      </div>
    </div>
  );
};

export default GlobalNavigation;
