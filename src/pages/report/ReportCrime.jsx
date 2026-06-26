import { useNavigate } from "react-router-dom";
import { reportCards } from "../../data/report/reportCards";
import ReportCard from "../../components/ReportCard";
import PoliceCarAnimation from "../../components/PoliceCarAnimation";

const toReportCardId = (title) =>
  `report-crime-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function ReportCrime() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative">

      <main className="relative w-full">
        {/* 🔷 HERO */}
        <section id="report-crime-hero" className="relative text-white py-14 px-6 overflow-hidden bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 bg-[url('/images/cyber.jpg')] bg-right bg-no-repeat bg-cover opacity-25" />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#2563EB]/90 to-transparent" />

          {/* CONTENT */}
          <div className="relative max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Report Cyber Crime</h1>

            <p className="mt-3 text-[#DBEAFE] max-w-md">
              Report cyber incidents securely and access awareness resources.
            </p>

            <button id="report-crime-report-now" className="mt-5 px-5 py-2 bg-white text-[#2563EB] rounded-lg font-medium hover:bg-[#DBEAFE] transition">
              Report Now
            </button>
          </div>
        </section>

        {/* 🔷 TOP ANIMATION */}
        <div className="mt-6">
          <PoliceCarAnimation direction="right" />
        </div>

        {/* 🔷 MAIN AREA */}
        <div id="report-crime-sections" className="flex justify-center mt-10 relative">
          {/* 🔥 CARD PANEL */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-7xl w-full z-10">
            {/* TITLE */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#0F172A]"></h2>
              <p className="text-sm text-[#64748B]">
                Click any section to explore
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {reportCards.map((card, index) => (
                <ReportCard
                  key={index}
                  id={toReportCardId(card.title)}
                  title={card.title}
                  Icon={card.icon}
                  onClick={() => navigate(card.path)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🔷 BOTTOM ANIMATION */}
        <div className="mt-10 mb-10">
          <PoliceCarAnimation direction="left" />
        </div>
      </main>
    </div>
  );
}
