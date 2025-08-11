import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent";
import JobBar from "./components/JobBar";
import JobDescription from "./components/JobDescription";
import JobHeader from "./components/JobHeader";
import JobListing from "./components/JobListing";
const Job = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <div style={{ backgroundColor: "#f4f2ee" }}>
      <HeaderComponent />
      <JobBar />
      <div className="grid gap-0 grid-cols-2">
        <JobListing setSelectedJob={setSelectedJob} />
        <JobDescription selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default Job;
