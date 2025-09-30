import { useEffect, useState } from "react";
import defaultUser from "../../assets/default.png";
import getApplicationsCompany from "../../utilities/applications/getAplicationsCompany";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const applications = await getApplicationsCompany();
      setApplications(applications?.jobapplications);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto p-5 max-w-[888px] border border-solid border-[#d3d3d3] rounded-[7px] bg-white mt-5 w-[667px]">
      {/* Header */}
      <div className="header flex items-center mb-3">
        <p className="font-bold text-lg">Job Applications</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#d3d3d3] mb-4" />

      {/* Applications list */}
      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
        {applications?.map((application) => (
          <div
            key={application.id}
            className="flex items-center rounded-md border border-gray-300 p-4 bg-white"
          >
            {/* Profile Image */}
            <img
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultUser;
              }}
              src={
                application?.applicant?.imageProfile
                  ? application?.applicant?.imageProfile
                  : defaultUser
              }
              alt=""
              className="w-14 h-14 rounded-md mr-4"
            />

            {/* Applicant + Job Info */}
            <div className="flex-1">
              <p className="text-[#0a66c2] font-bold">
                {application.applicant.name} {application.applicant.lastname}
              </p>
              <p className="font-bold whitespace-nowrap">
                {application.jobPost.role}
              </p>
            </div>

            {/* Job Type */}
            <div className="text-sm border border-solid border-gray-300 bg-[#0a66c2] text-white rounded-full px-3 py-1 text-center mr-16">
              Send Message
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500">
              {new Date(application.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default JobApplications;
