import CompanyMarquee from "../../../components/Service/common/CompanyMarquee";
import BackButton from "../../../components/Service/common/BackButton";

const SoftwareITPageLayout = ({ title, description }) => {

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-3xl shadow-xl mb-8 py-8 px-6 text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="text-blue-100 text-lg mt-2">
            CR Cyber Crime Foundation Software & IT Services
          </p>
        </div>

        <div className="mb-6">
          <CompanyMarquee direction="right" />
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">{title}</h2>

          <p className="text-[#475569] text-base sm:text-lg leading-8">
            {description}
          </p>
        </div>

        <div className="mt-6">
          <CompanyMarquee direction="left" />
        </div>
      </div>
    </div>
  );
};

export default SoftwareITPageLayout;
