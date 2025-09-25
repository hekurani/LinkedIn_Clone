import { useEffect, useState } from "react";
import defaultCompany from "../../assets/myriad.png";
import HeaderComponent from "../../Components/HeaderComponent";
import getApplications from "../../utilities/applications/getApplicationsJobseeker";

const JobseekerApplications = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const applications = await getApplications();
      setApplications(applications?.jobapplications);
    };
    fetchData();
  }, []);

  return (
    <div className=" bg-[#f4f2ee]">
      <HeaderComponent />
      <div className="h-[90vh] my-5 rounded-md mx-auto flex justify-center">
        <div>
          <p className="text-3xl text-left font-500">Job Applications</p>

          <div className="overflow-y-auto h-[calc(100vh-225px)] mt-5 pb-5">
            {applications?.map((application) => (
              <div
                key={application.id}
                className="w-[899px] rounded-md border border-gray-300 p-5 mt-3 bg-white mr-3"
              >
                <div className="flex">
                  <img
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultCompany;
                    }}
                    src={
                      application?.jobPost?.company?.logo
                        ? application?.jobPost?.company?.logo
                        : defaultCompany
                    }
                    alt=""
                    className="w-14 h-14 m-2 rounded-md"
                  />
                  <div className="mt-2">
                    <p className="text-[#0a66c2] font-bold">
                      {application.jobPost.role}
                    </p>
                    <p className="font-bold">
                      {application.jobPost.company.name}
                    </p>
                  </div>

                  <div className="rounded-full ml-auto mt-2 border border-solid border-gray-300 pt-1  h-8  w-24 text-center">
                    <p>{application.jobPost.workPlace}</p>
                    <p>{application.jobPost.type}</p>
                  </div>
                  <div className="mt-2 ml-auto my-auto">
                    <p>
                      {new Date(application.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerApplications;
