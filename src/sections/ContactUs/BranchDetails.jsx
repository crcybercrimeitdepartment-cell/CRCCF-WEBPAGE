import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  X,
  MapPin,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

// --- CUSTOM TYPEWRITER HOOK ---
const useTypewriter = (words) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const currentWord = words[index] || words[0];

    if (subIndex === currentWord.length + 1 && !isDeleting) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (isDeleting ? -1 : 1)),
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  const currentText = words[index] || "";
  return `${currentText.substring(0, subIndex)}${blink ? "|" : " "}`;
};

// --- MOCK DATA FOR 10+ BRANCHES ---
const branchesData = [
  {
    id: 1,
    name: "CR Cyber Crime Foundation",
    city: "Bhubaneswar",
    state: "Odisha",
    branchId: "BR-9042",
    serialNo: "SN-2026-8BX",
    primaryContact: "Sarah Jenkins",
    role: "Branch Manager",
    phone: "+91 9777999529",
    email: "hr@crcybercrime.org",
    address:
      "Office No. 433, DLF Cyber City, Near Infocity, Chandaka Industrial Estate, Patia, Bhubaneswar - 751024, Odisha, India.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Northern Command Hub",
    city: "New Delhi",
    state: "Delhi",
    branchId: "BR-1024",
    serialNo: "SN-2026-1ND",
    primaryContact: "Amit Patel",
    role: "Regional Director",
    phone: "+91 9888123456",
    email: "delhi@crcybercrime.org",
    address: "Level 4, Cyber Park, Connaught Place, New Delhi - 110001, India.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Western Tech Division",
    city: "Mumbai",
    state: "Maharashtra",
    branchId: "BR-3055",
    serialNo: "SN-2026-3MH",
    primaryContact: "Priya Sharma",
    role: "Operations Head",
    phone: "+91 9999888777",
    email: "mumbai@crcybercrime.org",
    address:
      "Tower B, Bandra Kurla Complex (BKC), Mumbai - 400051, Maharashtra, India.",
    image:
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Southern Data Center",
    city: "Bengaluru",
    state: "Karnataka",
    branchId: "BR-4011",
    serialNo: "SN-2026-4KA",
    primaryContact: "Rahul Verma",
    role: "Tech Lead",
    phone: "+91 9777111222",
    email: "blr@crcybercrime.org",
    address: "Tech Park, Electronic City, Bengaluru - 560100.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Eastern Outpost",
    city: "Kolkata",
    state: "West Bengal",
    branchId: "BR-5099",
    serialNo: "SN-2026-5WB",
    primaryContact: "Anita Das",
    role: "Manager",
    phone: "+91 9666555444",
    email: "kol@crcybercrime.org",
    address: "Salt Lake Sector V, Kolkata - 700091.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    name: "Central Intelligence",
    city: "Hyderabad",
    state: "Telangana",
    branchId: "BR-6088",
    serialNo: "SN-2026-6TG",
    primaryContact: "Vikram Reddy",
    role: "Director",
    phone: "+91 9555444333",
    email: "hyd@crcybercrime.org",
    address: "HITEC City, Hyderabad - 500081.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    name: "Coastal Division",
    city: "Chennai",
    state: "Tamil Nadu",
    branchId: "BR-7077",
    serialNo: "SN-2026-7TN",
    primaryContact: "Karthik Iyer",
    role: "Supervisor",
    phone: "+91 9444333222",
    email: "chn@crcybercrime.org",
    address: "OMR IT Expressway, Chennai - 600119.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    name: "Deccan Operations",
    city: "Pune",
    state: "Maharashtra",
    branchId: "BR-8066",
    serialNo: "SN-2026-8MH",
    primaryContact: "Neha Singh",
    role: "Branch Manager",
    phone: "+91 9333222111",
    email: "pune@crcybercrime.org",
    address: "Magarpatta City, Pune - 411013.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
  },
];

const BranchDetails = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchPrompts = useMemo(
    () => [
      "Search Branch name...",
      "Try searching 'Mumbai'...",
      "Search by Branch ID...",
    ],
    [],
  );

  const typewriterPlaceholder = useTypewriter(searchPrompts);

  const filteredData = branchesData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branchId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    if (selectedBranch) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedBranch]);

  if (selectedBranch) {
    return (
      <BranchProfileDetail
        branch={selectedBranch}
        onBack={() => setSelectedBranch(null)}
      />
    );
  }

  return (
    <section
      id="branch-details"
      className="w-full max-w-[1600px] mx-auto relative animate-[fadeIn_0.3s_ease-out]"
    >
      {/* ✨ REMOVED "Back to Dashboard" button here entirely.
        It will now rely on your global app layout's back button.
      */}

      {/* COMPLETELY TRANSPARENT HEADER - No white background! */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 w-full pt-4">
        {/* Left Side: Title & Description */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Building2 size={32} className="text-slate-400" strokeWidth={1.5} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Branch Directory
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed pl-1 sm:pl-[46px]">
            View detailed information about our company locations, including
            branch addresses, management contacts, and facility IDs. This
            directory helps in easily identifying team members and understanding
            the organizational structure.
          </p>
        </div>

        {/* Right Side: Search Bar ONLY (Icons removed) */}
        <div className="w-full lg:w-auto shrink-0 flex items-center">
          <div className="relative group w-full lg:w-72 xl:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder={
                isFocused || searchQuery ? "" : typewriterPlaceholder
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-4 w-full">
          <Search size={48} className="text-slate-300" />
          <p className="text-slate-500 text-lg">
            No branches found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full pb-10">
          {filteredData.map((branch, index) => (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              style={{
                animationFillMode: "both",
                animationDelay: `${index * 40}ms`,
              }}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group animate-[fadeInUp_0.4s_ease-out]"
            >
              <div className="h-56 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={branch.image}
                  alt={branch.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 relative bg-white">
                <h3
                  className="text-[17px] font-bold text-slate-800 line-clamp-1 mb-1"
                  title={branch.name}
                >
                  {branch.name}
                </h3>

                <p
                  className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-5 line-clamp-1"
                  title={`${branch.city}, ${branch.state}`}
                >
                  {branch.city}, {branch.state}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto gap-2">
                  <span className="text-[12.5px] font-medium text-slate-500 whitespace-nowrap">
                    ID: {branch.branchId}
                  </span>

                  <span className="text-[13px] font-bold text-indigo-700 flex items-center gap-1 group-hover:text-indigo-900 transition-colors whitespace-nowrap">
                    View Profile{" "}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
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

// ==========================================
// FULL WIDTH DETAIL COMPONENT
// ==========================================
const BranchProfileDetail = ({ branch, onBack }) => {
  return (
    <section className="bg-white p-6 md:p-8 lg:p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 animate-[fadeIn_0.3s_ease-out] w-full max-w-[1600px] mx-auto">
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
        <button
          onClick={onBack}
          className="p-2.5 bg-slate-50 rounded-xl shadow-sm text-slate-500 hover:text-primary hover:bg-slate-100 transition-all border border-slate-200 hover:-translate-x-1"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Branch Profile
        </h2>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-md border-[6px] border-slate-50">
            <img
              src={branch.image}
              alt={branch.city}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full xl:w-2/3 flex flex-col">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
              {branch.name}
            </h2>
            <p className="text-sm sm:text-base text-indigo-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-3">
              <MapPin size={18} /> {branch.city}, {branch.state}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 flex-1">
            <BentoBlock label="Branch ID" value={branch.branchId} />
            <BentoBlock label="Serial Number" value={branch.serialNo} />
            <BentoBlock label="Primary Contact" value={branch.primaryContact} />
            <BentoBlock label="Phone Number" value={branch.phone} />
            <BentoBlock
              label="Full Address"
              value={branch.address}
              className="sm:col-span-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href={`mailto:${branch.email}`}
              className="flex-1 bg-slate-800 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-slate-900 transition-all shadow-md hover:-translate-y-1 text-[15px]"
            >
              <Mail size={20} /> Email Branch
            </a>
            <a
              href={`tel:${branch.phone}`}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-bold hover:bg-indigo-700 transition-all shadow-md hover:-translate-y-1 text-[15px]"
            >
              <Phone size={20} /> Call Branch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoBlock = ({ label, value, className = "" }) => (
  <div
    className={`bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-center min-w-0 ${className}`}
  >
    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
      {label}
    </span>
    <span
      className="text-[15px] font-bold text-slate-800 truncate"
      title={value}
    >
      {value || "N/A"}
    </span>
  </div>
);

export default BranchDetails;
