import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    FileText, Award, Mail, AlertCircle, Calendar, FileSignature,
    IdCard, Ticket, Users, Briefcase, History,
    GraduationCap, BookOpen, UserCheck, School, CreditCard,
    HeartHandshake, Handshake, ShieldCheck, Fingerprint, QrCode,
    AtSign, Smartphone, Hash, Globe, Code, CheckSquare,
    Package, Book, ClipboardList, BadgeCheck, FileSearch, Building
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import StudentVerificationPage from './Student Verification/StudentVerificationPage';
import EmployeeVerificationPage from './Employee Verification/EmployeeVerificationPage';
import VisitorAppointmentPage from './Visitor Appointment Verification/VisitorAppointmentPage';
import GatePassVerificationPage from './Gate Pass Verification/GatePassVerificationPage';
import LicenseVerificationPage from './License Verification/LicenseVerificationPage';
import AgreementVerificationPage from './Agreement Verification/AgreementVerificationPage';
import WebDomainVerificationPage from './Web Domain Verification/WebDomainVerificationPage';
import MembershipVerificationPage from './Membership Verification/MembershipVerificationPage';
import MobileNumberVerificationPage from './Mobile Number Verification/MobileNumberVerificationPage';
import EmailAddressVerificationPage from './Email Address Verification/EmailAddressVerificationPage';

// Newly Generated Modules
import DocumentVerificationPage from './Document Verification/DocumentVerificationPage';
import CertificateVerificationPage from './Certificate Verification/CertificateVerificationPage';
import LetterVerificationPage from './Letter Verification/LetterVerificationPage';
import NoticeVerificationPage from './Notice Verification/NoticeVerificationPage';
import InvitationVerificationPage from './Invitation Verification/InvitationVerificationPage';
import VolunteerVerificationPage from './Volunteer Verification/VolunteerVerificationPage';
import PartnershipVerificationPage from './Partnership Verification/PartnershipVerificationPage';
import AuthorizationVerificationPage from './Authorization Verification/AuthorizationVerificationPage';
import DigitalSignatureVerificationPage from './Digital Signature Verification/DigitalSignatureVerificationPage';
import SocialMediaVerificationPage from './Social Media Verification/SocialMediaVerificationPage';
import SoftwareProductVerificationPage from './Software Product Verification/SoftwareProductVerificationPage';
import MaterialVerificationPage from './Material Verification/MaterialVerificationPage';
import BookVerificationPage from './Book Verification/BookVerificationPage';
import ReportVerificationPage from './Report Verification/ReportVerificationPage';
import IDCardVerificationPage from './ID Card Verification/IDCardVerificationPage';
import OrganizationVerificationPage from './Organization Verification/OrganizationVerificationPage';

const StepCard = ({ icon: Icon, title, desc, color, delay, onClick, inputs }) => {
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
            onClick={onClick}
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

                        {/* Render Input Fields Badges */}
                        {inputs && inputs.length > 0 && (
                            <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 relative z-10" style={{ transform: 'translateZ(0)' }}>
                                {inputs.map((input, idx) => (
                                    <span 
                                        key={idx}
                                        className="text-[8px] sm:text-[10px] font-bold px-2 py-1 rounded-[6px] text-center shadow-sm"
                                        style={{ backgroundColor: `${color}10`, color: color, border: `1px solid ${color}25` }}
                                    >
                                        {input}
                                    </span>
                                ))}
                            </div>
                        )}
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
    { title: 'Student Verification', icon: School, desc: 'Verify enrollment and academic standing.', inputs: ['Enter Name', 'Student ID', 'Email Address'] },
    { title: 'Employee Verification', icon: UserCheck, desc: 'Conduct background checks on employees.', inputs: ['Enter Name', 'Employee ID'] },
    { title: 'Visitor Appointment Verification', icon: Users, desc: 'Confirm scheduled visits and appointments.', inputs: ['Enter Visitor Name', 'Visitor Appointment Registration Number'] },
    { title: 'Gate Pass Verification', icon: Ticket, desc: 'Validate entry passes and facility permits.', inputs: ['Enter Name', 'Gate Pass Registration Number'] },
    { title: 'License Verification', icon: BadgeCheck, desc: 'Verify driving and professional licenses.', inputs: ['License Holder Name', 'License Registration Number'] },
    { title: 'Organization Verification', icon: Building, desc: 'Authenticate registered organizations and business entities.', inputs: ['Organization Name', 'Organization Registration Number'] },
    { title: 'Agreement Verification', icon: FileSignature, desc: 'Validate contracts and business agreements.', inputs: ['Enter Name', 'Agreement Registration Number'] },
    { title: 'Web Domain Verification', icon: Globe, desc: 'Check ownership and legitimacy of web domains.', inputs: ['Enter Domain Name'] },
    { title: 'Membership Verification', icon: CreditCard, desc: 'Validate professional or club memberships.', inputs: ['Enter Name', 'Member ID / Membership Number'] },
    { title: 'Notice Verification', icon: AlertCircle, desc: 'Check the validity of public and private notices.', inputs: ['Enter Name', 'Notice Registration Number'] },
    { title: 'Invitation Verification', icon: Calendar, desc: 'Verify event and official invitations.', inputs: ['Enter Name', 'Invitation Registration Number'] },
    { title: 'Certificate Verification', icon: Award, desc: 'Validate professional achievement certificates.', inputs: ['Enter Name', 'Certificate Registration ID'] },
    { title: 'ID Card Verification', icon: IdCard, desc: 'Verify official identification cards.', inputs: ['Enter Name', 'ID Card Number'] },
    { title: 'Authorization Verification', icon: ShieldCheck, desc: 'Validate letters of authorization.', inputs: ['Enter Name', 'Authorization Registration Number'] },
    { title: 'Digital Signature Verification', icon: Fingerprint, desc: 'Verify cryptographic signatures and e-signs.', inputs: ['Enter Name', 'Digital Signature ID'] },
    { title: 'Email Address Verification', icon: AtSign, desc: 'Validate corporate and personal email identities.', inputs: ['Enter Email ID'] },
    { title: 'Mobile Number Verification', icon: Smartphone, desc: 'Verify ownership and active status of contact numbers.', inputs: ['Enter Mobile Number'] },
    { title: 'Social Media Verification', icon: Hash, desc: 'Authenticate official social media channels.', inputs: ['Enter Social Media URL'] },
    { title: 'Software Product Verification', icon: Code, desc: 'Verify software licenses and product keys.', inputs: ['Enter Software Product Name', 'Product Registration / ID Number'] },
    { title: 'Material Verification', icon: Package, desc: 'Verify origin and authenticity of materials.', inputs: ['Enter Material Name', 'Material Registration Number'] },
    { title: 'Book Verification', icon: Book, desc: 'Authenticate publications and ISBN records.', inputs: ['Enter Book Name / Title', 'ISBN Number'] },
    { title: 'Report Verification', icon: ClipboardList, desc: 'Validate medical, technical, or financial reports.', inputs: ['Enter Report Name / Title', 'Report Registration Number'] },
    { title: 'Letter Verification', icon: Mail, desc: 'Authenticate official correspondence.', inputs: ['Enter Name', 'Letter Registration Number'] },
    { title: 'Volunteer Verification', icon: HeartHandshake, desc: 'Verify volunteer hours and records.', inputs: ['Enter Name', 'Volunteer ID'] }
];

export default function DocumentVerificationDepartment() {
    const [searchParams, setSearchParams] = useSearchParams();
    const serviceParam = searchParams.get('service');

    const matchedServiceIndex = serviceParam ? verificationServices.findIndex(s => s.title === serviceParam) : -1;
    const activeService = serviceParam ? {
        title: serviceParam,
        color: matchedServiceIndex !== -1 ? themeColors[matchedServiceIndex % themeColors.length] : '#0f4cd9'
    } : null;

    const handleBack = () => setSearchParams({});

    // Existing 10 Modules
    if (activeService?.title === 'Student Verification') {
        return <StudentVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Employee Verification') {
        return <EmployeeVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Visitor Appointment Verification') {
        return <VisitorAppointmentPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Gate Pass Verification') {
        return <GatePassVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'License Verification') {
        return <LicenseVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Agreement Verification') {
        return <AgreementVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Web Domain Verification') {
        return <WebDomainVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Membership Verification') {
        return <MembershipVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Mobile Number Verification') {
        return <MobileNumberVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Email Address Verification') {
        return <EmailAddressVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }

    // Newly Added 14 Modules
    if (activeService?.title === 'Document Verification') {
        return <DocumentVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Certificate Verification') {
        return <CertificateVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Letter Verification') {
        return <LetterVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Notice Verification') {
        return <NoticeVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Invitation Verification') {
        return <InvitationVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Volunteer Verification') {
        return <VolunteerVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Partnership Verification') {
        return <PartnershipVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Authorization Verification') {
        return <AuthorizationVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Digital Signature Verification') {
        return <DigitalSignatureVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Social Media Verification') {
        return <SocialMediaVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Software Product Verification') {
        return <SoftwareProductVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Material Verification') {
        return <MaterialVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Book Verification') {
        return <BookVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Report Verification') {
        return <ReportVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'ID Card Verification') {
        return <IDCardVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }
    if (activeService?.title === 'Organization Verification') {
        return <OrganizationVerificationPage onBack={handleBack} themeColor={activeService?.color} />;
    }

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
                            onClick={() => setSearchParams({ service: service.title })}
                        />
                    );
                })}
            </div>
        </div>
    );
}
