import React from "react";
import JobDescription from "./components/JobDescription";
import JobHeader from "./components/JobHeader";
import JobListing from "./components/JobListing";
import JobBar from "./components/JobBar";
const Job = () => {
  return (
    <div style={{ backgroundColor: "#f4f2ee" }}>
      <JobHeader />
      <JobBar />
      <div className="grid gap-0 grid-cols-2">
        <JobListing />
        <JobDescription />
      </div>
    </div>
  );
};

export default Job;
