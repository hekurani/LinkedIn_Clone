import CompanyHeader from "./components/CompanyHeader";
import JobApplications from "./components/JobApplications";
import JobPosts from "./components/JobPosts";
const CompanyDashboard = () => {
  return (
    <div className="bg-[#f4f2ee] pt-3 p-5 h-screen">
      {/* <LeftCompanyMenu /> */}
      <div>
        <CompanyHeader />
      </div>
      <div className="flex items-start justify-start">
        <JobApplications />
        <JobPosts />
      </div>
    </div>
  );
};

export default CompanyDashboard;
