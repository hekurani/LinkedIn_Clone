import React from "react";
import { applyToJob } from "../../../utilities/jobs/getAllJobs";

const JobDescription = ({ selectedJob }) => {
  return (
    <div className="main bg-white  max-h-screen overflow-y-auto">
      <div className="header m-5 h-[100px]">
        <div className="tittle flex">
          <p className="text-2xl font-semibold">{selectedJob?.role}</p>
        </div>

        <div className="flex">
          <p className="companyName">{selectedJob?.company?.name} </p>
          <span>&nbsp;</span>
          <p className="location">{selectedJob?.location?.city}</p>
          <span>&nbsp;</span>
          <p>3 weeks ago</p>
          <span>&nbsp;</span>
          <p>{selectedJob?.applicants} applicants</p>
        </div>
        <button
          style={{ backgroundColor: "#0a66c2" }}
          className="w-20 h-10 font-semibold text-white rounded-full mt-3"
          onClick={() => applyToJob(selectedJob?.id)}
        >
          Apply
        </button>
        <div className="jobDescription mt-5">
          <p className="text-lg font-semibold">About the job</p>
          {/* in future job?.description */}
          {selectedJob?.description}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
