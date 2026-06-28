import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaWhatsapp,
  FaTelegramPlane,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import {
  MdLocationOn,
  MdEmail,
  MdPhone,
  MdHelpOutline,
  MdMap,
  MdRateReview,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
// Removed incorrect logo import

export default function Footer() {
  const footerRef = useRef();

  // List of icons for the background running effect
  const bgIcons = [
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaTelegramPlane,
    FaGlobe,
  ];

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && footerRef.current) {
          footerRef.current.classList.remove("opacity-0");
          footerRef.current.classList.add("animate-fadeUp");
        }
      },
      { threshold: 0.1 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white overflow-hidden bg-[#0C1A3A] opacity-0 border-t border-white/10"
    >
      {/* 🏃‍♂️ RUNNING SOCIAL MEDIA BACKGROUND (MARQUEE) */}
      <div className="absolute top-1/3 left-0 w-[200%] flex overflow-hidden pointer-events-none opacity-[0.03] z-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...bgIcons, ...bgIcons, ...bgIcons, ...bgIcons].map((Icon, i) => (
            <Icon key={i} className="text-[150px] mx-12" />
          ))}
        </div>
      </div>

      {/* 🌧️ CYBER & BINARY ICON RAIN */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-cyan-300 animate-rain-spin drop-shadow-[0_0_8px_#00ffff]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${14 + Math.random() * 14}px`,
              opacity: 0.5,
            }}
          >
            {
              ["0", "1", "🔐", "🛡️", "💻", "⚙️", "0", "1"][
                Math.floor(Math.random() * 8)
              ]
            }
          </span>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-20 pb-10 px-4 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 border-b border-white/10 pb-12">
          {/* BRANDING (Spans 3 cols) */}
          <div className="space-y-6 md:col-span-3">
            <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471833/Logo_iile24_ormcru.png" alt="CRCCF" className="w-24 drop-shadow-lg" />
            <p className="text-gray-300 text-sm leading-relaxed text-justify pr-4 lg:pr-6">
              CRCCF empowers society through AI-driven software innovation, cyber security, and awareness initiatives, building a safer, smarter, and socially responsible digital future.
            </p>
          </div>

          {/* USEFUL LINKS (Spans 3 cols) - RESTORED FULL LIST & ADDED HOVER LINE */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold border-b-2 border-cyan-400 inline-block pb-2 mb-6">
              Useful Links
            </h3>
            {/* 2-Column Grid for Links to match original layout */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              {[
                { name: "Home", path: "/#home" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Software Products", path: "/software-products" },
                { name: "Skill Development", path: "/skill-development" },
                { name: "Careers", path: "/careers" },
                { name: "Insights", path: "/insights" },
                { name: "Contact", path: "/contact" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className="group relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 w-fit pb-1"
                >
                  {item.name}
                  {/* Animated Underline */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT DETAILS (Spans 3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold border-b-2 border-cyan-400 inline-block pb-2 mb-6">
              Office Address
            </h3>
            <div className="space-y-5 text-gray-300 text-sm">
              <a
                href="https://www.google.com/maps?q=DLF+Cyber+City+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MdLocationOn className="text-cyan-400 text-xl flex-shrink-0 group-hover:scale-110 transition" />
                <span className="group-hover:text-cyan-300 transition leading-relaxed">
                  Head Office: Office No. 433, DLF Cyber City, Near Infocity,
                  Patia, Bhubaneswar – 751024.
                </span>
              </a>
              <a
                href="tel:+919777999529"
                className="flex items-center gap-3 hover:text-cyan-400 transition w-fit"
              >
                <MdPhone className="text-cyan-400 text-lg" />
                <span>+91 9777999529</span>
              </a>
              <a
                href="mailto:hr@crcybercrime.org"
                className="flex items-center gap-3 hover:text-cyan-400 transition w-fit"
              >
                <MdEmail className="text-cyan-400 text-lg" />
                <span>hr@crcybercrime.org</span>
              </a>
            </div>
          </div>

          {/* SUPPORT TEXT (Spans 3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-2 mb-6 text-red-100">
              Support
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed text-justify pr-2 lg:pr-4">
              CRCCF advances social impact through AI-powered software innovation, cyber security excellence, and awareness initiatives, creating a safer, smarter, and digitally responsible future.
            </p>
          </div>
        </div>

        {/* BOTTOM SOCIAL & COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © 2026 CR Cyber Crime Foundation. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-lg">
            {[
              {
                Icon: FaFacebookF,
                color: "hover:text-[#1877F2]",
                label: "Facebook",
                link: "https://www.facebook.com/crcybercrimeofficialpage",
              },
              {
                Icon: FaTwitter,
                color: "hover:text-[#1DA1F2]",
                label: "Twitter",
                link: "https://x.com/crcybercrime",
              },
              {
                Icon: FaLinkedinIn,
                color: "hover:text-[#0A66C2]",
                label: "LinkedIn",
                link: "https://www.linkedin.com/company/cr-cyber-crime/posts/?feedView=all",
              },
              {
                Icon: FaInstagram,
                color: "hover:text-[#E4405F]",
                label: "Instagram",
                link: "https://www.instagram.com/crcybercrime/",
              },
              {
                Icon: FaYoutube,
                color: "hover:text-[#FF0000]",
                label: "YouTube",
                link: "https://youtube.com/@crcybercrimeofficialchannel?si=n96o6iVeJTas66Z6",
              },
              {
                Icon: FaGlobe,
                color: "hover:text-[#2563EB]",
                label: "Website",
                link: "https://crcybercrime.com/",
              },
              {
                Icon: FaTelegramPlane,
                color: "hover:text-[#26A5E4]",
                label: "Telegram",
                link: "https://t.me/crcybercrimeofficialchannel",
              },
              {
                Icon: FaWhatsapp,
                color: "hover:text-[#25D366]",
                label: "WhatsApp",
                link: "https://api.whatsapp.com/send/?phone=919777999529&text&type=phone_number&app_absent=0",
              },
              {
                Icon: FaWhatsapp,
                color: "hover:text-[#25D366]",
                label: "WhatsApp Channel",
                link: "https://whatsapp.com/channel/0029VbCU1Uv0VycPVnYj2r3T",
              },
              {
                Icon: FaPhone,
                color: "hover:text-[#3B82F6]",
                label: "Phone",
                link: "tel:+919777999529",
              },
              {
                Icon: FaEnvelope,
                color: "hover:text-[#EA4335]",
                label: "Email",
                link: "mailto:hr@crcybercrime.org",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-gray-300 ${social.color} transform hover:scale-125 hover:-translate-y-1 transition-all duration-300`}
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}