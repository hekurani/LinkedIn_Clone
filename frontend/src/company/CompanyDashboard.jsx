import React, { useState } from "react";

import JobApplications from "./components/JobApplications";
import JobPosts from "./components/JobPosts";
import LeftCompanyMenu from "./components/LeftCompanyMenu";

const CompanyDashboard = ({}) => {
  return (
    <div className="flex items-start bg-[#f4f2ee] justify-start h-screen">
      {/* <LeftCompanyMenu /> */}
      <JobApplications />
      <JobPosts />
    </div>
  );
};

export default CompanyDashboard;
