import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent";
import JobBar from "./components/JobBar";
import JobDescription from "./components/JobDescription";
import JobListing from "./components/JobListing";

const Job = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [newApply, setNewApply] = useState(false);
  return (
    <div style={{ backgroundColor: "#f4f2ee" }} className="h-full">
      <HeaderComponent />
      <JobBar />
      <div className="grid gap-0 grid-cols-2">
        <JobListing
          setSelectedJob={setSelectedJob}
          newApply={newApply}
          setNewApply={setNewApply}
        />
        <JobDescription selectedJob={selectedJob} setNewApply={setNewApply} />
      </div>
    </div>
  );
};

export default Job;
