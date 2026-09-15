import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComingSoonPage from '../../common/ComingSoonPage';

const EmployeeIDCardPage = lazy(() => import('./Employee ID Card/EmployeeIDCardPage'));
const OfficerIDCardPage = lazy(() => import('./Officer ID Card/OfficerIDCardPage'));
const ExecutiveIDCardPage = lazy(() => import('./Executive ID Card/ExecutiveIDCardPage'));
const ManagementIDCardPage = lazy(() => import('./Management ID Card/ManagementIDCardPage'));
const DirectorIDCardPage = lazy(() => import('./Director ID Card/DirectorIDCardPage'));
const ContractEmployeeIDCardPage = lazy(() => import('./Contract Employee ID Card/ContractEmployeeIDCardPage'));
const PartTimeEmployeeIDCardPage = lazy(() => import('./Part-Time Employee ID Card/PartTimeEmployeeIDCardPage'));
const ProjectEmployeeIDCardPage = lazy(() => import('./Project Employee ID Card/ProjectEmployeeIDCardPage'));
const ProbationaryEmployeeIDCardPage = lazy(() => import('./Probationary Employee ID Card/ProbationaryEmployeeIDCardPage'));
const TemporaryStaffIDCardPage = lazy(() => import('./Temporary Staff ID Card/TemporaryStaffIDCardPage'));
const ConsultantIDCardPage = lazy(() => import('./Consultant ID Card/ConsultantIDCardPage'));
const TechnicalExpertIDCardPage = lazy(() => import('./Technical Expert ID Card/TechnicalExpertIDCardPage'));
const AdvisoryBoardIDCardPage = lazy(() => import('./Advisory Board ID Card/AdvisoryBoardIDCardPage'));
const GoverningBodyIDCardPage = lazy(() => import('./Governing Body ID Card/GoverningBodyIDCardPage'));
const AuthorizedRepresentativeIDCardPage = lazy(() => import('./Authorized Representative ID Card/AuthorizedRepresentativeIDCardPage'));
const PartnerIDCardPage = lazy(() => import('./Partner ID Card/PartnerIDCardPage'));
const MemberIDCardPage = lazy(() => import('./Member ID Card/MemberIDCardPage'));
const LifeMemberIDCardPage = lazy(() => import('./Life Member ID Card/LifeMemberIDCardPage'));
const AssociateMemberIDCardPage = lazy(() => import('./Associate Member ID Card/AssociateMemberIDCardPage'));
const HonoraryMemberIDCardPage = lazy(() => import('./Honorary Member ID Card/HonoraryMemberIDCardPage'));
const AlumniIDCardPage = lazy(() => import('./Alumni ID Card/AlumniIDCardPage'));
const InternIDCardPage = lazy(() => import('./Intern ID Card/InternIDCardPage'));
const StudentIDCardPage = lazy(() => import('./Student ID Card/StudentIDCardPage'));
const TraineeIDCardPage = lazy(() => import('./Trainee ID Card/TraineeIDCardPage'));
const ResearcherIDCardPage = lazy(() => import('./Researcher ID Card/ResearcherIDCardPage'));
const ResearchAssociateIDCardPage = lazy(() => import('./Research Associate ID Card/ResearchAssociateIDCardPage'));
const TrainerIDCardPage = lazy(() => import('./Trainer ID Card/TrainerIDCardPage'));
const FacultyIDCardPage = lazy(() => import('./Faculty ID Card/FacultyIDCardPage'));
const FellowIDCardPage = lazy(() => import('./Fellow ID Card/FellowIDCardPage'));
const MentorIDCardPage = lazy(() => import('./Mentor ID Card/MentorIDCardPage'));
const VolunteerIDCardPage = lazy(() => import('./Volunteer ID Card/VolunteerIDCardPage'));
const FieldOfficerIDCardPage = lazy(() => import('./Field Officer ID Card/FieldOfficerIDCardPage'));
const ProjectAssociateIDCardPage = lazy(() => import('./Project Associate ID Card/ProjectAssociateIDCardPage'));
const EventStaffIDCardPage = lazy(() => import('./Event Staff ID Card/EventStaffIDCardPage'));
const CampusAmbassadorIDCardPage = lazy(() => import('./Campus Ambassador ID Card/CampusAmbassadorIDCardPage'));
const CommunityRepresentativeIDCardPage = lazy(() => import('./Community Representative ID Card/CommunityRepresentativeIDCardPage'));
const VendorIDCardPage = lazy(() => import('./Vendor ID Card/VendorIDCardPage'));
const MediaAndPressIDCardPage = lazy(() => import('./Media & Press ID Card/MediaAndPressIDCardPage'));
const VisitorIDCardPage = lazy(() => import('./Visitor ID Card/VisitorIDCardPage'));
const GuestIDCardPage = lazy(() => import('./Guest ID Card/GuestIDCardPage'));

const idCardMap = {
  'employee-id-card': EmployeeIDCardPage,
  'officer-id-card': OfficerIDCardPage,
  'executive-id-card': ExecutiveIDCardPage,
  'management-id-card': ManagementIDCardPage,
  'director-id-card': DirectorIDCardPage,
  'contract-employee-id-card': ContractEmployeeIDCardPage,
  'parttime-employee-id-card': PartTimeEmployeeIDCardPage,
  'part-time-employee-id-card': PartTimeEmployeeIDCardPage,
  'project-employee-id-card': ProjectEmployeeIDCardPage,
  'probationary-employee-id-card': ProbationaryEmployeeIDCardPage,
  'temporary-staff-id-card': TemporaryStaffIDCardPage,
  'consultant-id-card': ConsultantIDCardPage,
  'technical-expert-id-card': TechnicalExpertIDCardPage,
  'advisory-board-id-card': AdvisoryBoardIDCardPage,
  'governing-body-id-card': GoverningBodyIDCardPage,
  'authorized-representative-id-card': AuthorizedRepresentativeIDCardPage,
  'partner-id-card': PartnerIDCardPage,
  'member-id-card': MemberIDCardPage,
  'life-member-id-card': LifeMemberIDCardPage,
  'associate-member-id-card': AssociateMemberIDCardPage,
  'honorary-member-id-card': HonoraryMemberIDCardPage,
  'alumni-id-card': AlumniIDCardPage,
  'intern-id-card': InternIDCardPage,
  'student-id-card': StudentIDCardPage,
  'trainee-id-card': TraineeIDCardPage,
  'researcher-id-card': ResearcherIDCardPage,
  'research-associate-id-card': ResearchAssociateIDCardPage,
  'trainer-id-card': TrainerIDCardPage,
  'faculty-id-card': FacultyIDCardPage,
  'fellow-id-card': FellowIDCardPage,
  'mentor-id-card': MentorIDCardPage,
  'volunteer-id-card': VolunteerIDCardPage,
  'field-officer-id-card': FieldOfficerIDCardPage,
  'project-associate-id-card': ProjectAssociateIDCardPage,
  'event-staff-id-card': EventStaffIDCardPage,
  'campus-ambassador-id-card': CampusAmbassadorIDCardPage,
  'community-representative-id-card': CommunityRepresentativeIDCardPage,
  'vendor-id-card': VendorIDCardPage,
  'media-and-press-id-card': MediaAndPressIDCardPage,
  'media-&-press-id-card': MediaAndPressIDCardPage,
  'visitor-id-card': VisitorIDCardPage,
  'guest-id-card': GuestIDCardPage,
};

export default function IdCardSlugDispatcher() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const normalizedSlug = (slug || '').toLowerCase();

  const MatchedComponent = idCardMap[normalizedSlug];

  if (!MatchedComponent) {
    return <ComingSoonPage />;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092133]"></div>
      </div>
    }>
      <MatchedComponent onBack={() => navigate('/recruitment/id-card-verification')} />
    </Suspense>
  );
}
