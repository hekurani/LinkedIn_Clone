import { useEffect, useState } from "react";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import defaultProfile from "../../../assets/default.png";
import { getAllJobs } from "../../../utilities/jobs/getAllJobs";
import "../style/JobListing.css";

const JobListing = ({
  setSelectedJob = () => {},
  newApply = false,
  setNewApply = () => {},
}) => {
  const [allJobs, setAllJobs] = useState([]);

  const fetchAllJobs = async () => {
    const allJobs = await getAllJobs();
    setAllJobs(allJobs?.jobPosts);
    setSelectedJob(allJobs?.jobPosts[0]);
  };
  useEffect(() => {
    fetchAllJobs();
    setNewApply(false);
  }, [newApply]);

  if (!Array.isArray(allJobs) || allJobs.length === 0) {
    return (
      <div className="main ml-auto bg-white rounded-l-md">
        <div className="my-auto h-full flex flex-col gap-3 justify-center items-center">
          <BsFillClipboard2DataFill className="text-4xl mr-2" />
          <p className="text-md font-semibold">
            No jobs available at the moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main ml-auto bg-white rounded-l-md">
      <div className="headerJobListing h-20 flex justify-between items-center">
        <div className="title and count m-5">
          <p className="font-semibold">
            Top job picks for you
            <p className="text-sm font-400 mb-1">
              Based on your profile, preferences, and activity like applies,
              searches, and saves
            </p>
          </p>
        </div>
      </div>
      <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
        {allJobs.map((item, index) => (
          <div
            className="content flex"
            key={index}
            onClick={() => setSelectedJob(item)}
          >
            <div className="img">
              <img
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultProfile;
                }}
                src={item?.company?.logo ? item?.company?.logo : defaultProfile}
                alt=""
                className="w-14 h-14 m-2"
              />
            </div>
            <div className="jobTitleCompany pt-1">
              <p className="tittle text-[#0a66c2] font-bold">{item?.role}</p>
              <p>{item?.company?.name}</p>
              <p>{item?.location?.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
