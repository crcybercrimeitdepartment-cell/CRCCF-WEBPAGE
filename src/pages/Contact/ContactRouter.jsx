import React from "react";
import { Routes, Route } from "react-router-dom";
import SEO from "../../components/common/SEO";

// --- COMPONENTS & LAYOUTS ---
import PageWrapper from "./components/PageWrapper/PageWrapper";
import DirectorySection from "./DirectorySection/DirectorySection";

// --- PAGES & SECTIONS ---
import { Contact } from "./contact_hero/contact";
import HelpDeskPage from "./HelpDesk/HelpDeskPage";
import FollowApps from "./sections/FollowApps/FollowApps";
import BranchDetails from "./sections/BranchDetails/BranchDetails";
import AIChat from "./sections/AIChat/AIChat";
import Review from "./sections/Review/Review";
import Feedback from "./sections/Feedback/Feedback";
import Announcements from "./sections/Announcements/Announcements";

// --- DATA ---
import { employees } from "../../data/Contact/employeesData";
import { officers } from "../../data/Contact/officersData";
import { teachers } from "../../data/Contact/teachersData";
import { reporters } from "../../data/Contact/reportersData";
import { advocates } from "../../data/Contact/advocatesData";
import { legalAdvisors } from "../../data/Contact/legalAdvisorsData";
import { directors } from "../../data/Contact/directorsData";
import { members } from "../../data/Contact/membersData";

// --- ICONS ---
import {
  BadgeCent, Users, BookOpen, Mic, Scale, Gavel, UserCheck, UserPlus,
  Headset, LifeBuoy, MessageSquare, Ticket, User, Briefcase, FileText,
  Star, ThumbsUp, MessageCircle, Bot, Megaphone, Sparkles,
} from "lucide-react";

export default function ContactRouter() {
  return (
    <Routes>
      <Route path="/" element={<><SEO title="Contact Us" description="Get in touch with CR Cyber Crime Foundation for any inquiries, support, or services." /><Contact /></>} />

      <Route path="help-desk" element={<HelpDeskPage />} />
      <Route path="follow-apps" element={<FollowApps />} />
      <Route path="branch-details" element={<BranchDetails />} />

      {/* DIRECTORY ROUTES */}
      <Route path="officer" element={<PageWrapper bgIcons={[User, Users, Briefcase, BadgeCent]} transparentBg={true}><DirectorySection title="Officer" Icon={BadgeCent} data={officers} /></PageWrapper>} />
      <Route path="employee" element={<PageWrapper bgIcons={[User, Users, Briefcase]} transparentBg={true}><DirectorySection title="Employee" Icon={Users} data={employees} /></PageWrapper>} />
      <Route path="teacher" element={<PageWrapper bgIcons={[User, BookOpen, FileText]} transparentBg={true}><DirectorySection title="Teacher" Icon={BookOpen} data={teachers} /></PageWrapper>} />
      <Route path="reporter" element={<PageWrapper bgIcons={[Mic, User, FileText]} transparentBg={true}><DirectorySection title="Reporter" Icon={Mic} data={reporters} /></PageWrapper>} />
      <Route path="advocate" element={<PageWrapper bgIcons={[Scale, Gavel, User]} transparentBg={true}><DirectorySection title="Advocate" Icon={Scale} data={advocates} /></PageWrapper>} />
      <Route path="legal-advisor" element={<PageWrapper bgIcons={[Gavel, Scale, Briefcase]} transparentBg={true}><DirectorySection title="Legal Advisor" Icon={Gavel} data={legalAdvisors} /></PageWrapper>} />
      <Route path="board-of-director" element={<PageWrapper bgIcons={[UserCheck, Users, Briefcase]} transparentBg={true}><DirectorySection title="Board of Director" Icon={UserCheck} data={directors} /></PageWrapper>} />
      <Route path="board-of-member" element={<PageWrapper bgIcons={[UserPlus, Users, Briefcase]} transparentBg={true}><DirectorySection title="Board of Member" Icon={UserPlus} data={members} /></PageWrapper>} />

      {/* OTHER SECTIONS */}
      <Route path="ai-chat" element={<PageWrapper bgIcons={[Bot]} transparentBg={true} noPaddingMobile={true}><AIChat /></PageWrapper>} />
      <Route path="review" element={<PageWrapper bgIcons={[Star, ThumbsUp]}><Review /></PageWrapper>} />
      <Route path="feedback" element={<PageWrapper bgIcons={[MessageCircle, MessageSquare]}><Feedback /></PageWrapper>} />
      <Route path="announcements" element={<PageWrapper bgIcons={[Megaphone, Sparkles]} iconCount={10} transparentBg={true}><Announcements /></PageWrapper>} />
    </Routes>
  );
}
