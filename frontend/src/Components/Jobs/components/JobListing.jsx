import React, { useEffect, useState } from "react";
import "../style/JobListing.css";
import cover from "../../../assets/cover.jpg";
import getAllJobs from "../../../utilities/jobs/getAllJobs";

const JobListing = ({ setSelectedJob = () => {} }) => {
  const [allJobs, setAllJobs] = useState([]);
  const fetchAllJobs = async () => {
    const allJobs = await getAllJobs();
    setAllJobs(allJobs?.jobPosts);
    setSelectedJob(allJobs?.jobPosts[0]);
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <div className="main ml-auto bg-white">
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
          <div className="content flex" key={index} onClick={() => setSelectedJob(item)}>
            <div className="img">
              <img src={item?.company?.logo} alt="" className="w-14 h-14 m-2" />
            </div>
            <div className="jobTitleCompany">
              <p className="tittle">{item?.role}</p>
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
