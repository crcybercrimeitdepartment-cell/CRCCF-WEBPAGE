import { useState } from "react";
// ✨ FIXED: Added 'Filter' back to the imports here!
import { Users, Mail, ArrowLeft, Search, Filter } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { employees } from "../../data/contactUs/employeesData";

const EmployeeSection = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const positions = ["All", ...new Set(employees.map((emp) => emp.position))];

  const filteredEmployees = employees.filter((emp) => {
    const matchesPosition =
      selectedPosition === "All" || emp.position === selectedPosition;
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  // ==========================================
  // VIEW 2: DETAILED EMPLOYEE PROFILE
  // ==========================================
  if (selectedEmployee) {
    return (
      <section className="scroll-mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 animate-[fadeIn_0.3s_ease-out] h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={() => setSelectedEmployee(null)}
            className="p-2 bg-slate-50 rounded-lg shadow-sm text-slate-500 hover:text-primary hover:bg-slate-100 transition-all border border-slate-200 hover:-translate-x-1"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-textHeading">
            Employee Profile
          </h2>
        </div>

        <div className="bg-bgCard p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              <img
                src={selectedEmployee.image}
                alt={selectedEmployee.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <DetailRow label="Sl Number" value={selectedEmployee.sl} />
                <DetailRow label="Employee ID" value={selectedEmployee.empId} />
                <DetailRow label="Name" value={selectedEmployee.name} />
                <DetailRow
                  label="Join Date"
                  value={selectedEmployee.joinDate}
                />
                <DetailRow label="Gender" value={selectedEmployee.gender} />
                <DetailRow
                  label="Experience"
                  value={selectedEmployee.experience}
                />
                <DetailRow label="Position" value={selectedEmployee.position} />
                <DetailRow
                  label="Department"
                  value={selectedEmployee.department}
                />
                <DetailRow
                  label="Job Profile"
                  value={selectedEmployee.jobProfile}
                  className="sm:col-span-2"
                />
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 justify-center lg:justify-start">
                <a
                  href={selectedEmployee.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#004182] hover:-translate-y-1 transition-all shadow-sm"
                >
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a
                  href={`mailto:${selectedEmployee.email}`}
                  className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-900 hover:-translate-y-1 transition-all shadow-sm"
                >
                  <Mail size={18} /> Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // VIEW 1: INTERACTIVE GRID DIRECTORY
  // ==========================================
  return (
    <section id="employee" className="scroll-mt-8 relative">
      {/* Sticky Header with Frosted Glass */}
      <div className="sticky top-0 z-20 bg-[#F8FAFC]/80 backdrop-blur-md pt-2 pb-6 mb-6 border-b border-slate-200/60">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
              <Users size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-textHeading">
              Employee Directory
            </h2>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-textHeading text-sm rounded-xl focus:ring-2 focus:ring-primary/50 outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Scrollable Quick-Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter size={16} className="text-slate-400 mr-1 shrink-0" />
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border ${
                selectedPosition === pos
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DISPLAY */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-16 text-textSec font-medium bg-white rounded-2xl border border-slate-100 shadow-sm">
          No employees found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((emp, index) => (
            <div
              key={emp.sl}
              onClick={() => setSelectedEmployee(emp)}
              style={{
                animationFillMode: "both",
                animationDelay: `${index * 60}ms`,
              }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group animate-[fadeInUp_0.5s_ease-out]"
            >
              {/* Image Container */}
              <div className="h-56 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 flex flex-col flex-1 relative bg-white">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {emp.name}
                </h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mt-1 mb-3">
                  {emp.position}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {emp.description ||
                    `Handles responsibilities and operations related to ${emp.department} and ${emp.jobProfile}.`}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    PIN: {emp.empId}
                  </span>
                  <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                    View{" "}
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const DetailRow = ({ label, value, className = "" }) => (
  <div
    className={`flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-50 pb-2 ${className}`}
  >
    <span className="text-textSec font-semibold mb-1 sm:mb-0">{label}:</span>
    <span className="text-textHeading font-bold text-left sm:text-right">
      {value}
    </span>
  </div>
);

export default EmployeeSection;
