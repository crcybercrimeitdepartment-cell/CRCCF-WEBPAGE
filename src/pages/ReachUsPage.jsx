import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaXTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube,
  FaGlobe,
  FaTelegram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa6';
import { 
  User,
  Mail,
  Edit3,
  MessageSquare,
  MapPin,
  Star,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Users,
  UserPlus,
  PlusCircle
} from 'lucide-react';

export default function ReachUsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isIconsVisible, setIsIconsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };



  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      label: 'Facebook', 
      handle: 'Crcyber-Crime', 
      link: 'https://www.facebook.com/crcybercrimeofficialpage', 
      color: '#1877F2',
      gradient: 'linear-gradient(45deg, #1877F2, #3b5998)'
    },
    { 
      icon: <FaXTwitter />, 
      label: 'Twitter', 
      handle: '@crcybercrime', 
      link: 'https://x.com/', 
      color: '#000000',
      gradient: 'linear-gradient(45deg, #000000, #333333)'
    },
    { 
      icon: <FaLinkedinIn />, 
      label: 'LinkedIn', 
      handle: 'cr-cyber-crime', 
      link: 'https://www.linkedin.com/company/cr-cyber-crime/posts/?feedView=all', 
      color: '#0A66C2',
      gradient: 'linear-gradient(45deg, #0A66C2, #0077B5)'
    },
    { 
      icon: <FaInstagram />, 
      label: 'Instagram', 
      handle: '@crcybercrime', 
      link: 'https://www.instagram.com/crcybercrime/', 
      color: '#E4405F',
      gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
    },
    { 
      icon: <FaYoutube />, 
      label: 'YouTube', 
      handle: 'CRCCF Official', 
      link: 'https://youtube.com/@crcybercrimeofficialchannel?si=n96o6iVeJTas66Z6', 
      color: '#FF0000',
      gradient: 'linear-gradient(45deg, #FF0000, #CC0000)'
    },
    { 
      icon: <FaGlobe />, 
      label: 'Website', 
      handle: 'crcybercrime.org', 
      link: 'https://crcybercrime.org/', 
      color: '#2563EB',
      gradient: 'linear-gradient(45deg, #2563EB, #3B82F6)'
    },
    { 
      icon: <FaTelegram />, 
      label: 'Telegram', 
      handle: 'crccf_updates', 
      link: 'https://t.me/crcybercrimeofficialchannel', 
      color: '#26A5E4',
      gradient: 'linear-gradient(45deg, #26A5E4, #229ED9)'
    },
    { 
      icon: <FaWhatsapp />, 
      label: 'WhatsApp', 
      handle: '+91 97779 99529', 
      link: 'https://api.whatsapp.com/send/?phone=919777999529&text&type=phone_number&app_absent=0', 
      color: '#25D366',
      gradient: 'linear-gradient(45deg, #25D366, #128C7E)'
    },
    { 
      icon: <FaWhatsapp />, 
      label: 'WhatsApp Channel', 
      handle: 'CRCCF Channel', 
      link: 'https://whatsapp.com/channel/0029VbCU1Uv0VycPVnYj2r3T', 
      color: '#25D366',
      gradient: 'linear-gradient(45deg, #25D366, #128C7E)'
    },
    { 
      icon: <FaPhone />, 
      label: 'Phone', 
      handle: '+91 97779 99529', 
      link: 'tel:+919777999529', 
      color: '#3B82F6',
      gradient: 'linear-gradient(45deg, #3B82F6, #1D4ED8)'
    },
    { 
      icon: <FaEnvelope />, 
      label: 'Email', 
      handle: 'hr@crcybercrime.org', 
      link: 'mailto:hr@crcybercrime.org', 
      color: '#EA4335',
      gradient: 'linear-gradient(45deg, #EA4335, #C5221F)'
    }
  ];



  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Inter',sans-serif] relative overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dlhmkbijh/image/upload/f_auto,q_auto//contact_lbu4o9_mfhdel.jpg')] bg-cover bg-center brightness-[0.6] z-[1]"></div>
        <div className="relative z-[2] max-w-[800px] px-[20px] text-[#ffffff]">
          <motion.h1 
            className="text-[clamp(36px,5vw,64px)] font-[800] mb-[16px] tracking-[-0.02em]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Reach <span className="text-[#3B82F6] bg-[linear-gradient(to_right,#60A5FA,#93C5FD)] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Us</span>
          </motion.h1>
          <motion.p 
            className="text-[clamp(14px,1.8vw,18px)] leading-[1.6] text-[rgba(255,255,255,0.9)] max-w-[600px] mx-auto [&_b]:text-[#60A5FA] [&_b]:font-[700]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're here to help. Reach out to <b>CRCCF</b> on any of our official platforms 
            to stay informed, <b>get support</b>, or join our global mission.
          </motion.p>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto py-[60px] px-[24px] relative z-[10]">
        
        {/* Follow Us Section - ENHANCED SOCIAL TREE */}
        <section className="mb-[80px] pb-[40px]">
          <motion.div 
            className="bg-white rounded-[40px] p-[60px_40px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] max-[640px]:p-[40px_15px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-[30px] relative z-[10]">
              <h3 className="text-[32px] font-[800] text-[#0F172A] mb-[12px] m-0">Connect With <span className="text-[#2563EB]">Our Community</span></h3>
              <p className="text-[#64748B] text-[16px] m-0">Stay updated with our latest news and initiatives across all official platforms.</p>
            </div>

            {/* Tree/Orbital Container */}
            <div className="relative w-full max-w-[900px] mx-auto min-h-[650px] flex items-center justify-center max-[1024px]:min-h-[550px] max-[768px]:h-[500px] max-[768px]:min-h-0">
              
              {/* MOBILE ORBITAL HUB (Center Trigger) */}
              <div className="hidden max-[768px]:flex absolute inset-0 items-center justify-center z-[20] pointer-events-none">
                <motion.div 
                  className={`
                    w-[120px] h-[120px] bg-white rounded-full border-[2.5px] border-dashed 
                    flex flex-col items-center justify-center text-center shadow-[0_15px_35px_rgba(37,99,235,0.12)]
                    cursor-pointer transition-all duration-500 z-[30] pointer-events-auto
                    ${isIconsVisible ? 'border-[#10B981] shadow-[0_10px_30px_rgba(16,185,129,0.2)]' : 'border-[#3B82F6]'}
                  `}
                  onClick={() => setIsIconsVisible(!isIconsVisible)}
                  animate={{ scale: isIconsVisible ? 1.05 : [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className={`text-[13px] font-[900] leading-[1.1] uppercase tracking-[-0.01em] transition-colors duration-300 ${isIconsVisible ? 'text-[#10B981]' : 'text-[#1E293B]'}`}>
                    {isIconsVisible ? 'Tapped to\nConnect' : 'Tap to\nConnect'}
                  </span>
                  <span className="text-[9px] font-[700] text-[#64748B] uppercase tracking-[0.15em] mt-[6px]">Collection</span>
                </motion.div>
              </div>

              {/* SVG Trunk - Desktop Only */}
              <div className="absolute inset-0 z-[0] pointer-events-none max-[768px]:hidden">
                <svg width="100%" height="100%" viewBox="0 0 900 650" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="trunkGradient" x1="450" y1="650" x2="450" y2="500" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                  </defs>

                  <motion.path 
                    d="M450 650 V500" 
                    stroke="url(#trunkGradient)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  
                  <g filter="url(#glow)">
                    {[
                      "M450 500 C450 400 450 250 450 120",   // 0
                      "M450 500 C450 350 280 300 220 180",   // 1
                      "M450 500 C450 350 620 300 680 180",   // 2
                      "M450 500 C400 450 150 450 120 350",   // 3
                      "M450 500 C500 450 750 450 780 350",   // 4
                      "M450 500 C450 450 350 400 320 320",   // 5
                      "M450 500 C450 450 550 400 580 320",   // 6
                      "M450 500 C400 500 250 550 200 480",   // 7
                      "M450 500 C500 500 650 550 700 480",   // 8
                      "M450 500 C450 480 400 480 450 400",   // 9
                      "M450 500 C450 400 450 300 450 200",   // 10
                    ].map((d, i) => (
                      <motion.path
                        key={i}
                        d={d}
                        stroke={socialLinks[i].color}
                        strokeWidth="2"
                        strokeDasharray={0}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        animate={{ 
                          opacity: [0.3, 0.7, 0.3],
                          strokeWidth: [2, 3.5, 2]
                        }}
                        transition={{ 
                          pathLength: { duration: 1.5, delay: 0.5 + (i * 0.1) },
                          opacity: { duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
                          strokeWidth: { duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                    ))}
                  </g>
                </svg>
              </div>

              {/* SOCIAL NODES - Unified Desktop & Mobile Orbital Logic */}
              {socialLinks.map((s, i) => {
                const total = socialLinks.length;
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                
                // Desktop fixed positions
                const desktopPos = [
                  { top: '5%', left: '50%' },   { top: '15%', left: '25%' },  { top: '15%', left: '75%' },
                  { top: '40%', left: '13%' },  { top: '40%', left: '87%' },  { top: '35%', left: '35%' },
                  { top: '35%', left: '65%' },  { top: '60%', left: '22%' },  { top: '60%', left: '78%' },
                  { top: '50%', left: '50%' },  { top: '25%', left: '50%' },
                ];

                const isMobile = windowWidth <= 768;
                const radius = windowWidth < 480 ? 115 : 135;
                
                // Calculate orbital coordinates
                const orbitX = Math.cos(angle) * radius;
                const orbitY = Math.sin(angle) * radius;

                return (
                  <motion.div 
                    key={i} 
                    className="absolute transition-all duration-[0.3s] text-[17px] rounded-[10px] group/social z-[10]"
                    style={{ 
                      '--brand-color': s.color, 
                      '--brand-gradient': s.gradient,
                      top: isMobile ? '50%' : desktopPos[i].top,
                      left: isMobile ? '50%' : desktopPos[i].left,
                    }}
                    initial={isMobile ? { x: '-50%', y: '-50%', opacity: 0, scale: 0 } : { x: '-50%', y: '-50%', opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: (!isMobile || isIconsVisible) ? 1 : 0,
                      scale: (!isMobile || isIconsVisible) ? 1 : 0,
                      x: isMobile 
                        ? `calc(-50% + ${isIconsVisible ? orbitX : 0}px)` 
                        : '-50%',
                      y: isMobile 
                        ? `calc(-50% + ${isIconsVisible ? orbitY : 0}px)` 
                        : '-50%',
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ 
                      delay: isIconsVisible ? (i * 0.05) : 0, 
                      duration: 0.6, 
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}

                  >
                    <div className="relative block">
                      <a className="relative block no-underline group" href={s.link} target="_blank" rel="noopener noreferrer">


                        <div className="social-layer w-[56px] h-[56px] transition-all duration-300 relative max-[640px]:w-[48px] max-[640px]:h-[48px]">
                          <span className="absolute inset-0 border border-solid rounded-[18px] opacity-20 transition-all duration-300 group-hover:rotate-12" style={{ borderColor: s.color }}></span>
                          <span className="absolute inset-0 border border-solid rounded-[18px] opacity-40 transition-all duration-300 group-hover:-rotate-12 group-hover:translate-x-1" style={{ borderColor: s.color }}></span>
                          <span 
                            className="absolute inset-0 text-[24px] flex items-center justify-center rounded-[18px] text-white max-[640px]:text-[20px] transition-all duration-300 shadow-lg"
                            style={{ background: s.gradient || s.color }}
                          >
                            {s.icon}
                          </span>
                        </div>
                        

                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Reviews & Testimonials Section */}
        <section className="mb-[80px]">
          <motion.div 
            className="flex items-center gap-[24px] mb-[48px] cursor-default group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[28px] font-[800] text-[#0F172A] whitespace-nowrap transition-all duration-[0.4s] relative group-hover:text-[#2563EB] group-hover:translate-x-[5px]">Our <span className="text-[#2563EB]">Reviews</span></h3>
            <div className="h-[2px] flex-1 bg-[linear-gradient(to_right,#E2E8F0,transparent)] relative overflow-hidden transition-all duration-[0.5s] group-hover:flex-[1.2] after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-[linear-gradient(to_right,transparent,#2563EB,transparent)] group-hover:after:left-[100%] group-hover:after:transition-[left] group-hover:after:duration-[0.8s]"></div>
          </motion.div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[24px]">
            {[
              { title: "Google Reviews", icon: <Star size={24} />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", link: "/coming-soon" },
              { title: "Student Reviews", icon: <GraduationCap size={24} />, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", link: "/coming-soon" },
              { title: "Client Reviews", icon: <Briefcase size={24} />, color: "#10B981", bg: "rgba(16,185,129,0.1)", link: "/coming-soon" },
              { title: "Victim Testimonials", icon: <ShieldCheck size={24} />, color: "#EF4444", bg: "rgba(239,68,68,0.1)", link: "/coming-soon" },
              { title: "Employee Reviews", icon: <Users size={24} />, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", link: "/coming-soon" },
              { title: "Candidate Reviews", icon: <UserPlus size={24} />, color: "#06B6D4", bg: "rgba(6,182,212,0.1)", link: "/coming-soon" },
              { title: "Add Review", icon: <PlusCircle size={24} />, color: "#EC4899", bg: "rgba(236,72,153,0.1)", link: "/coming-soon" }
            ].map((review, i) => (
              <motion.a
                key={i}
                href={review.link}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(review.link);
                }}
                className="group relative bg-white rounded-[20px] p-[24px] flex flex-col items-center justify-center text-center gap-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-solid border-[#F1F5F9] transition-all duration-[0.3s] hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:translate-y-[-5px] no-underline overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div 
                  className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center transition-all duration-[0.4s] group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: review.bg, color: review.color }}
                >
                  {review.icon}
                </div>
                <h4 className="text-[17px] font-[700] text-[#0F172A] m-0 transition-colors duration-300 group-hover:text-[#2563EB] relative z-10">{review.title}</h4>
                <div className="absolute bottom-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: review.color }}></div>
              </motion.a>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-[60px] mb-[80px] justify-items-center lg:gap-[80px]">
          {/* Left Column: Form */}
          <motion.div 
            className="bg-white rounded-[32px] p-[48px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-solid border-[#F1F5F9] max-w-[750px] w-full max-[640px]:p-[32px_20px] max-[640px]:rounded-[24px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-[36px] max-[640px]:mb-[28px]">
              <h2 className="text-[22px] font-[700] text-[#0F172A] m-0 max-[640px]:text-[18px]">Say Hello, On Our <span className="text-[#2563EB]">Support!</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] max-[640px]:gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <div className="relative flex items-center">
                  <input id="name" value={formData.name} onChange={handleChange}
                    className={`w-full bg-[#F8FAFC] border border-solid text-[#0F172A] text-[14px] outline-none transition-all duration-[0.3s] rounded-[100px] p-[18px_60px_18px_24px] max-[640px]:p-[14px_50px_14px_20px] max-[640px]:text-[13px] ${errors.name ? "border-[#EF4444]" : "border-[#E2E8F0] hover:border-[#3B82F6] focus:border-[#3B82F6]"}`}
                    placeholder="Full Name"
                    aria-label="Full Name"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  <div className="absolute right-[8px] top-[50%] translate-y-[-50%] w-[38px] h-[38px] rounded-[50%] flex items-center justify-center transition-all duration-[0.3s] z-[5] text-[#10B981] border border-solid border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] max-[640px]:w-[32px] max-[640px]:h-[32px] max-[640px]:right-[6px]"><User size={18} /></div>
                </div>
                {errors.name && <p className="text-[#EF4444] text-[12px] mt-[5px] pl-[20px]">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-[4px]">
                <div className="relative flex items-center">
                  <input id="email" value={formData.email} onChange={handleChange}
                    className={`w-full bg-[#F8FAFC] border border-solid text-[#0F172A] text-[14px] outline-none transition-all duration-[0.3s] rounded-[100px] p-[18px_60px_18px_24px] max-[640px]:p-[14px_50px_14px_20px] max-[640px]:text-[13px] ${errors.email ? "border-[#EF4444]" : "border-[#E2E8F0] hover:border-[#3B82F6] focus:border-[#3B82F6]"}`}
                    placeholder="Email Address"
                    aria-label="Email Address"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  <div className="absolute right-[8px] top-[50%] translate-y-[-50%] w-[38px] h-[38px] rounded-[50%] flex items-center justify-center transition-all duration-[0.3s] z-[5] text-[#F59E0B] border border-solid border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.05)] max-[640px]:w-[32px] max-[640px]:h-[32px] max-[640px]:right-[6px]"><Mail size={18} /></div>
                </div>
                {errors.email && <p className="text-[#EF4444] text-[12px] mt-[5px] pl-[20px]">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-[4px]">
                <div className="relative flex items-center">
                  <input id="subject" value={formData.subject} onChange={handleChange}
                    className={`w-full bg-[#F8FAFC] border border-solid text-[#0F172A] text-[14px] outline-none transition-all duration-[0.3s] rounded-[100px] p-[18px_60px_18px_24px] max-[640px]:p-[14px_50px_14px_20px] max-[640px]:text-[13px] ${errors.subject ? "border-[#EF4444]" : "border-[#E2E8F0] hover:border-[#3B82F6] focus:border-[#3B82F6]"}`}
                    placeholder="Subject"
                    aria-label="Subject"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                  />
                  <div className="absolute right-[8px] top-[50%] translate-y-[-50%] w-[38px] h-[38px] rounded-[50%] flex items-center justify-center transition-all duration-[0.3s] z-[5] text-[#3B82F6] border border-solid border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.05)] max-[640px]:w-[32px] max-[640px]:h-[32px] max-[640px]:right-[6px]"><Edit3 size={18} /></div>
                </div>
                {errors.subject && <p className="text-[#EF4444] text-[12px] mt-[5px] pl-[20px]">{errors.subject}</p>}
              </div>

              <div className="flex flex-col gap-[4px]">
                <div className="relative flex items-center">
                  <textarea id="message" value={formData.message} onChange={handleChange}
                    className={`w-full bg-[#F8FAFC] border border-solid text-[#0F172A] text-[14px] outline-none transition-all duration-[0.3s] rounded-[24px] p-[22px_60px_22px_24px] min-h-[160px] resize-none max-[640px]:p-[18px_50px_18px_20px] max-[640px]:min-h-[120px] max-[640px]:text-[13px] ${errors.message ? "border-[#EF4444]" : "border-[#E2E8F0] hover:border-[#3B82F6] focus:border-[#3B82F6]"}`}
                    placeholder="Message"
                    aria-label="Message"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  <div className="absolute right-[8px] top-[24px] w-[38px] h-[38px] rounded-[50%] flex items-center justify-center transition-all duration-[0.3s] z-[5] text-[#EF4444] border border-solid border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.05)] max-[640px]:w-[32px] max-[640px]:h-[32px] max-[640px]:right-[6px]"><MessageSquare size={18} /></div>
                </div>
                {errors.message && <p className="text-[#EF4444] text-[12px] mt-[5px] pl-[20px]">{errors.message}</p>}
              </div>

              <button type="submit" className="bg-[#2563EB] text-[#ffffff] border-none p-[20px] font-[700] text-[16px] rounded-[100px] cursor-pointer w-full mt-[12px] shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] transition-all duration-[0.3s] hover:bg-[#1D4ED8] hover:translate-y-[-2px] hover:shadow-[0_15px_25px_-5px_rgba(37,99,235,0.4)] max-[640px]:p-[16px] max-[640px]:text-[14px]">Send Your Message Now</button>
            </form>
          </motion.div>

        </div>

        {/* Office Branches Section */}
        {/* Map Section */}
        <section className="mt-[80px]">
          <motion.div 
            className="bg-white rounded-[40px] p-[30px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-[24px] mb-[32px]">
              <h3 className="text-[24px] font-[800] text-[#0F172A] m-0 whitespace-nowrap">Locate Our <span className="text-[#2563EB]">Headquarters</span></h3>
              <div className="h-[2px] flex-1 bg-[linear-gradient(to_right,#E2E8F0,transparent)]"></div>
            </div>
            <div className="rounded-[24px] overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.8202669580455!2d85.80516117523825!3d20.349042381135575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1908e025984c55%3A0xee1fcd1f11e55141!2sDLF%20Cyber%20City!5e0!3m2!1sen!2sin!4v1777900280403!5m2!1sen!2sin" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="CRCCF Headquarters Location"
              ></iframe>
            </div>
          </motion.div>
        </section>


      </main>
    </div>
  );
}

