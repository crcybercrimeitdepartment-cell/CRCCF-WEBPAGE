import { useParams } from "react-router-dom";
import DirectorySection from "./DirectorySection";
import PageWrapper from "../../components/ContactUs/PageWrapper";
import * as contactData from "../../data/contactUs/contactData";
import { 
  BadgeCent, 
  Users, 
  BookOpen, 
  Mic, 
  Scale, 
  Gavel, 
  UserCheck, 
  UserPlus 
} from "lucide-react";

const iconMap = {
  officer: { icon: BadgeCent, title: "Officer", data: contactData.officers },
  employee: { icon: Users, title: "Employee", data: contactData.employees },
  teacher: { icon: BookOpen, title: "Teacher", data: contactData.teachers },
  reporter: { icon: Mic, title: "Reporter", data: contactData.reporters },
  advocate: { icon: Scale, title: "Advocate", data: contactData.advocates },
  "legal-advisor": { icon: Gavel, title: "Legal Advisor", data: contactData.legalAdvisors },
  "board-of-director": { icon: UserCheck, title: "Board of Director", data: contactData.directors },
  "board-of-member": { icon: UserPlus, title: "Board of Member", data: contactData.members },
};

const DirectoryWrapper = () => {
  const { type } = useParams();
  const config = iconMap[type];

  if (!config) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800">Section Coming Soon</h2>
          <p className="text-gray-500 mt-2">We are still setting up the {type} directory.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 bg-gray-50">
        <PageWrapper bgIcons={[config.icon]} transparentBg={true}>
          <DirectorySection 
            title={config.title} 
            Icon={config.icon} 
            data={config.data || []} 
          />
        </PageWrapper>
      </main>
    </div>
  );
};

export default DirectoryWrapper;
