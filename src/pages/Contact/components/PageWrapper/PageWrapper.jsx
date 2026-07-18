import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FloatingBackground from "../FloatingBackground/FloatingBackground";
import { pageWrapperData } from "./PageWrapperData";

// ✨ ADDED: iconCount right here
const PageWrapper = ({ children, bgIcons, transparentBg, iconCount, noPaddingMobile }) => (
  <div className={`min-h-screen bg-[#F8FAFC] ${noPaddingMobile ? 'p-2 sm:p-10 lg:p-16' : 'p-6 sm:p-10 lg:p-16'} relative overflow-hidden`}>
    {/* ✨ ADDED: Passing the count down to the background */}
    <FloatingBackground icons={bgIcons} count={iconCount} />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Back button removed per request */}

      <div
        className={
          transparentBg
            ? "py-2"
            : "bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100"
        }
      >
        {children}
      </div>
    </div>
  </div>
);

export default PageWrapper;
