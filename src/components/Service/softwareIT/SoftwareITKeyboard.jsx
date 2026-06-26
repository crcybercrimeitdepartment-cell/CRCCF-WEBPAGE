import { useNavigate } from "react-router-dom";
import { Info, Wrench, Globe, Smartphone, MonitorCog, Bot, Headset, HandHelping } from "lucide-react";

const SoftwareITKeyboard = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Software Services Introduction",
      path: "/services/software-it/software-services-introduction",
      icon: Info,
    },
    {
      label: "AMC Services",
      path: "/services/software-it/amc-services",
      icon: Wrench,
    },
    {
      label: "End to End Web Development",
      path: "/services/software-it/end-to-end-web-development",
      icon: Globe,
    },
    {
      label: "Mobile Application Development",
      path: "/services/software-it/mobile-application-development",
      icon: Smartphone,
    },
    {
      label: "Desktop & Laptop Software Solutions",
      path: "/services/software-it/desktop-laptop-software-solutions",
      icon: MonitorCog,
    },
    {
      label: "Artificial Intelligence Solutions",
      path: "/services/software-it/artificial-intelligence-solutions",
      icon: Bot,
    },
    {
      label: "IT Support",
      path: "/services/software-it/it-support",
      icon: Headset,
    },
    {
      label: "Technical Assistance",
      path: "/services/software-it/technical-assistance",
      icon: HandHelping,
    },
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE] hover:border-[#2563EB] min-h-[130px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <Icon className="w-7 h-7 mx-auto mb-2 text-[#2563EB] group-hover:text-[#1D4ED8]" />

              <span className="text-sm font-medium text-[#475569] group-hover:text-[#0F172A] line-clamp-3">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SoftwareITKeyboard;

