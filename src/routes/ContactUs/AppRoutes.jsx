import React from "react";
import { Routes, Route } from "react-router-dom";

// --- COMPONENTS & LAYOUTS ---
import LaptopLayout from "../layouts/LaptopLayout";
import PageWrapper from "../components/PageWrapper";
import DirectorySection from "../pages/DirectorySection";

// --- PAGES & SECTIONS ---
import Dashboard from "../pages/Dashboard";
import HelpDesk from "../sections/HelpDesk";
import FollowApps from "../sections/FollowApps";
import BranchDetails from "../sections/BranchDetails";
import AIChat from "../sections/AIChat";
import Review from "../sections/Review";
import Feedback from "../sections/Feedback";
import Announcements from "../sections/Announcements";


// --- DATA ---
import { employees } from "../data/employeesData";
import { officers } from "../data/officersData";
import { teachers } from "../data/teachersData";
import { reporters } from "../data/reportersData";
import { advocates } from "../data/advocatesData";
import { legalAdvisors } from "../data/legalAdvisorsData";
import { directors } from "../data/directorsData";
import { members } from "../data/membersData";


// --- ICONS ---
import {
  BadgeCent,
  Users,
  BookOpen,
  Mic,
  Scale,
  Gavel,
  UserCheck,
  UserPlus,
  Headset,
  LifeBuoy,
  MessageSquare,
  Ticket,
  MapPin,
  Building,
  Globe,
  Navigation,
  User,
  Briefcase,
  FileText,
  Star,
  ThumbsUp,
  MessageCircle,
  Bot,
  Megaphone,
  Sparkles,
  Mail,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Dashboard */}
      <Route path="/" element={<LaptopLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* Help Desk */}
      <Route
        path="/help-desk"
        element={
          <PageWrapper bgIcons={[Headset, LifeBuoy, MessageSquare, Ticket]}>
            <HelpDesk />
          </PageWrapper>
        }
      />

      {/* Follow Apps */}
      <Route
        path="/follow-apps"
        element={
          <PageWrapper bgIcons={[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, Mail]}>
            <FollowApps />
          </PageWrapper>
        }
      />

      {/* Branch Details */}
      <Route
        path="/branch-details"
        element={
          <PageWrapper bgIcons={[MapPin, Building, Globe, Navigation]}>
            <BranchDetails />
          </PageWrapper>
        }
      />

      {/* ==================== DIRECTORY ROUTES ==================== */}
      <Route
        path="/officer"
        element={
          <PageWrapper
            bgIcons={[User, Users, Briefcase, BadgeCent]}
            transparentBg={true}
          >
            <DirectorySection
              title="Officer"
              Icon={BadgeCent}
              data={officers}
            />
          </PageWrapper>
        }
      />

      <Route
        path="/employee"
        element={
          <PageWrapper bgIcons={[User, Users, Briefcase]} transparentBg={true}>
            <DirectorySection title="Employee" Icon={Users} data={employees} />
          </PageWrapper>
        }
      />

      <Route
        path="/teacher"
        element={
          <PageWrapper
            bgIcons={[User, BookOpen, FileText]}
            transparentBg={true}
          >
            <DirectorySection title="Teacher" Icon={BookOpen} data={teachers} />
          </PageWrapper>
        }
      />

      <Route
        path="/reporter"
        element={
          <PageWrapper bgIcons={[Mic, User, FileText]} transparentBg={true}>
            <DirectorySection title="Reporter" Icon={Mic} data={reporters} />
          </PageWrapper>
        }
      />

      <Route
        path="/advocate"
        element={
          <PageWrapper bgIcons={[Scale, Gavel, User]} transparentBg={true}>
            <DirectorySection title="Advocate" Icon={Scale} data={advocates} />
          </PageWrapper>
        }
      />

      <Route
        path="/legal-advisor"
        element={
          <PageWrapper bgIcons={[Gavel, Scale, Briefcase]} transparentBg={true}>
            <DirectorySection
              title="Legal Advisor"
              Icon={Gavel}
              data={legalAdvisors}
            />
          </PageWrapper>
        }
      />

      <Route
        path="/board-of-director"
        element={
          <PageWrapper
            bgIcons={[UserCheck, Users, Briefcase]}
            transparentBg={true}
          >
            <DirectorySection
              title="Board of Director"
              Icon={UserCheck}
              data={directors}
            />
          </PageWrapper>
        }
      />

      <Route
        path="/board-of-member"
        element={
          <PageWrapper
            bgIcons={[UserPlus, Users, Briefcase]}
            transparentBg={true}
          >
            <DirectorySection
              title="Board of Member"
              Icon={UserPlus}
              data={members}
            />
          </PageWrapper>
        }
      />

      {/* ==================== OTHER SECTIONS ==================== */}
      <Route
        path="/ai-chat"
        element={
          <PageWrapper bgIcons={[Bot]}>
            <AIChat />
          </PageWrapper>
        }
      />

      <Route
        path="/review"
        element={
          <PageWrapper bgIcons={[Star, ThumbsUp]}>
            <Review />
          </PageWrapper>
        }
      />

      <Route
        path="/feedback"
        element={
          <PageWrapper bgIcons={[MessageCircle, MessageSquare]}>
            <Feedback />
          </PageWrapper>
        }
      />

      <Route
        path="/announcements"
        element={
          <PageWrapper bgIcons={[Megaphone, Sparkles]} iconCount={10} transparentBg={true}>
            <Announcements />
          </PageWrapper>
        }
      />
    </Routes>

  );
};



export default AppRoutes;
