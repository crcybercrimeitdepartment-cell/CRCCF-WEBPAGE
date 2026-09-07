import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    FileText, Award, Mail, AlertCircle, Calendar, FileSignature,
    IdCard, Ticket, Users, Briefcase, History,
    GraduationCap, BookOpen, UserCheck, School, CreditCard,
    HeartHandshake, Handshake, ShieldCheck, Fingerprint, QrCode,
    AtSign, Smartphone, Hash, Globe, Code, CheckSquare,
    Package, Book, ClipboardList, BadgeCheck, FileSearch
} from 'lucide-react';

const StepCard = ({ icon: Icon, title, desc, color, delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            // 1. Falling 3D Tiles Entry Animation
            initial={{ opacity: 0, rotateX: 40, y: 60, scale: 0.9, z: -100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, z: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: delay % 0.4, type: 'spring', stiffness: 100, damping: 14 }}
            className="relative w-full max-w-[180px] sm:max-w-[300px] mx-auto group cursor-pointer"
            style={{ perspective: '1200px' }}
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative z-10 h-full transition-transform duration-200 ease-out group-hover:-translate-y-2"
            >
                {/* The 3D Block Container (Outer Rim & Shadow) */}
                <div
                    className="relative z-10 p-[0px] pb-[10px] pr-[10px] sm:pb-[16px] sm:pr-[16px] h-full rounded-tl-[24px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[24px] sm:rounded-tl-[40px] sm:rounded-tr-[56px] sm:rounded-br-[56px] sm:rounded-bl-[40px]"
                    style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f3f6 50%, #e2e8f0 100%)',
                        boxShadow: '30px 40px 60px -15px rgba(0,0,0,0.15), 10px 15px 25px -5px rgba(0,0,0,0.08)'
                    }}
                >
                    {/* 2. Mechanical Button Press: The inner white card is a motion.div that presses down on click */}
                    <motion.div
                        whileTap={{ y: 6, x: 6, scale: 0.98, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                        className="relative bg-[#ffffff] rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 pt-5 sm:pt-10 flex flex-col items-center h-full w-full overflow-hidden"
                        style={{
                            boxShadow: 'inset 4px 4px 10px rgba(255,255,255,1), inset -4px -4px 15px rgba(0,0,0,0.03)'
                        }}
                    >
                        {/* 3. Glossy Shine Sweep (CSS effect defined at bottom) */}
                        <div className="shine-sweep" />

                        {/* Right Edge Ribbon */}
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] sm:w-[28px] h-[35%] sm:h-[45%] transition-all duration-300 group-hover:scale-y-105 rounded-tl-[16px] rounded-bl-[16px] sm:rounded-tl-[32px] sm:rounded-bl-[32px]"
                            style={{
                                backgroundColor: color,
                                boxShadow: 'inset 6px 0 12px rgba(0,0,0,0.2)'
                            }}
                        />

                        {/* 4. Holographic Icon Float */}
                        <motion.div
                            className="mb-3 sm:mb-8 relative flex items-center justify-center z-10"
                            animate={{
                                y: [0, -8, 0],
                                filter: [
                                    'drop-shadow(0px 4px 4px rgba(0,0,0,0.15))',
                                    'drop-shadow(0px 12px 10px rgba(0,0,0,0.05))',
                                    'drop-shadow(0px 4px 4px rgba(0,0,0,0.15))'
                                ]
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delay % 1 }}
                        >
                            <Icon
                                className="w-9 h-9 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110"
                                strokeWidth={2}
                                style={{ color: color }}
                            />
                        </motion.div>

                        <h3
                            className="text-[12px] sm:text-[17px] leading-[1.15] sm:leading-tight font-bold sm:font-extrabold mb-1 sm:mb-3 tracking-wide text-center relative z-10 transition-transform duration-300 group-hover:scale-105 antialiased [text-wrap:balance]"
                            style={{ color: color, transform: 'translateZ(0)' }}
                        >
                            {title}
                        </h3>

                        <p className="text-[11px] sm:text-[13px] leading-[1.4] sm:leading-[1.6] text-slate-600 sm:text-slate-500 text-center font-medium relative z-10 antialiased" style={{ transform: 'translateZ(0)' }}>
                            {desc}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const themeColors = [
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#0ea5e9', // Sky
    '#ef4444', // Red
    '#14b8a6', // Teal
    '#6366f1', // Indigo
    '#f43f5e'  // Rose
];

const verificationServices = [
    { title: 'Document Verification', icon: FileSearch, desc: 'Verify authenticity of official documents and secure records.' },
    { title: 'Certificate Verification', icon: Award, desc: 'Validate educational and professional achievement certificates.' },
    { title: 'Letter Verification', icon: Mail, desc: 'Authenticate official correspondence and issued letters.' },
    { title: 'Notice Verification', icon: AlertCircle, desc: 'Check the validity of legal, public, and private notices.' },
    { title: 'Invitation Verification', icon: Calendar, desc: 'Verify event and official digital or physical invitations.' },
    { title: 'Agreement Verification', icon: FileSignature, desc: 'Validate contracts, NDAs, and business agreements.' },
    { title: 'Licence Verification', icon: BadgeCheck, desc: 'Verify driving, business, and professional licenses.' },
    { title: 'Gate Pass Verification', icon: Ticket, desc: 'Validate entry passes, facility permits, and security tags.' },
    { title: 'Visitor Appointment Verification', icon: Users, desc: 'Confirm scheduled visits, meetings, and official appointments.' },
    { title: 'Employee Verification', icon: UserCheck, desc: 'Conduct background checks on current or past employees.' },
    { title: 'Student Verification', icon: School, desc: 'Verify enrollment and academic standing of university students.' },
    { title: 'Membership Verification', icon: CreditCard, desc: 'Validate club, professional, or organizational memberships.' },
    { title: 'Volunteer Verification', icon: HeartHandshake, desc: 'Verify volunteer hours and participation records.' },
    { title: 'Partnership Verification', icon: Handshake, desc: 'Authenticate business partnerships, JVs, and MOUs.' },
    { title: 'Authorization Verification', icon: ShieldCheck, desc: 'Validate letters of authorization and power of attorney.' },
    { title: 'Digital Signature Verification', icon: Fingerprint, desc: 'Verify cryptographic signatures, e-signs, and digital stamps.' },
    { title: 'Email Address Verification', icon: AtSign, desc: 'Validate corporate and personal email server identities.' },
    { title: 'Mobile Number Verification', icon: Smartphone, desc: 'Verify ownership and active status of contact numbers.' },
    { title: 'Social Media Verification', icon: Hash, desc: 'Authenticate official social media profiles and channels.' },
    { title: 'Web Domain Verification', icon: Globe, desc: 'Check ownership, DNS, and legitimacy of web domains.' },
    { title: 'Software Product Verification', icon: Code, desc: 'Verify software licenses, product keys, and digital assets.' },
    { title: 'Material Verification', icon: Package, desc: 'Verify origin, supply chain, and authenticity of materials.' },
    { title: 'Book Verification', icon: Book, desc: 'Authenticate publications, manuscripts, and ISBN records.' },
    { title: 'Report Verification', icon: ClipboardList, desc: 'Validate audit, medical, technical, or financial reports.' }
];

export default function DocumentVerificationDepartment() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-10 md:py-20 px-2 sm:px-8 md:px-12 overflow-hidden">

            {/* CSS for Glossy Sweep Animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .shine-sweep {
                    position: absolute;
                    top: 0;
                    left: -150%;
                    width: 70%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    z-index: 20;
                    pointer-events: none;
                    transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .group:hover .shine-sweep {
                    left: 200%;
                    transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}} />

            {/* Header Section */}
            <div className="w-full max-w-[1400px] mb-12 md:mb-20 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f4cd9] mb-4 uppercase tracking-wider drop-shadow-sm">
                    DOCUMENT VERIFICATION SERVICES
                </h1>
                <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                    Comprehensive validation and authentication services for documents, identities, digital assets, and organizational records. Select a verification module below to begin.
                </p>
                <div className="w-24 h-1 bg-[#06b6d4] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 sm:gap-y-12 md:gap-y-16 lg:gap-y-24 gap-x-3 sm:gap-x-8 lg:gap-x-12 w-full max-w-[1400px] mx-auto px-1 sm:px-0">
                {verificationServices.map((service, index) => {
                    const color = themeColors[index % themeColors.length];
                    return (
                        <StepCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            desc={service.desc}
                            color={color}
                            delay={index * 0.1}
                        />
                    );
                })}
            </div>
        </div>
    );
}
