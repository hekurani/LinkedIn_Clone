import React from "react";

const JobDescription = () => {
  return (
    <div className="main bg-white  max-h-screen overflow-y-auto">
      <div className="header m-5 h-[100px]">
        <div className="tittle flex">
          <p className="text-2xl font-semibold">Java Software Engineer</p>
        </div>

        <div className="flex">
          <p className="companyName">Celonis </p>
          <span>&nbsp;</span>
          <p className="location"> Pristina, Kosovo</p>
          <span>&nbsp;</span>
          <p>3 weeks ago</p>
          <span>&nbsp;</span>
          <p>57 applicants</p>
        </div>
        <button
          style={{ backgroundColor: "#0a66c2" }}
          className="w-20 h-10 font-semibold text-white rounded-full mt-3"
        >
          Apply
        </button>
        <div className="jobDescription mt-5">
          <p className="text-lg font-semibold">About the job</p>
          {/* in future job?.description */}
          We are looking for a Software Quality Assurance Engineer to join our
          team in Prishtina. Quipu is the dedicated IT company of the ProCredit
          group and provides comprehensive end-to-end solutions for all
          ProCredit institutions, as well as for other banks and financial
          institutions This includes everything from electronic payment services
          to software systems, hybrid cloud hosting, and a host of other
          operations. A 100% subsidiary of ProCredit Holding, Quipu was
          established in March 2004 and is headquartered in Frankfurt am Main,
          Germany. Quipu plays a central role within the ProCredit group,
          providing a comprehensive range of support services that enable the
          banks to become competitive and efficient. General description of the
          position As a Software Quality Assurance Engineer at Quipu, you will
          play a critical role in ensuring the delivery of high-quality software
          products to our banks and customers. Working closely with cross
          functional teams, your responsibilities will include applying both
          manual and automated testing methodologies throughout the development
          life cycle, reporting and tracking software defects, and contributing
          to the overall improvements of our software quality. The successful
          candidate will also be adapt to communication, paying attention to
          details, collaborating effectively within Agile activities. What your
          key responsibilities will be: Develop detailed, comprehensive, and
          well-structured test plans and test cases. Report and manage bugs
          through their lifecycle, regressing and verifying defects, and provide
          valuable metrics. Regress and verify defects as needed, record test
          results, and provide metrics. Create and execute tests for our web and
          mobile banking applications both manually and automatically using
          different automation tools. Contribute to CI/CD integration, ensuring
          seamless testing processes within the development pipeline. Perform
          manual and automated testing of APIs and backend services for system
          reliability. Write and execute SQL queries for database testing to
          validate data integrity. Utilize GitHub for version control,
          collaboration, and streamlined project management of automation
          testing projects. Actively participate in sprint planning and agile
          processes to support a dynamic development environment. Skills and
          experience we expect from you: 3+ years proven work experience in
          Quality Assurance in a fast-paced environment. Bachelor's degree in
          Computer Science, Software Engineering, Electrical and Electronic
          Engineering, or an equivalent field. Proficient in modern programming
          languages such as C#, JavaScript, TypeScript, etc. Strong experience
          in manual and automation testing with free source automation tools
          such as Selenium, Playwrite, or any similar tool. Experience in Mobile
          Apps manual and automation testing using Appium or any similar tool.
          Expertise in APIs testing tools like Postman and SoapUI. Proficiency
          in SQL and database testing. Knowledge of Git and CI/CD tool Azure
          DevOps. Experience in ticket and bug tracking systems such as JIRA and
          Azure DevOps. Ability to understand and create test plans from
          business requirements or verbal communications.
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
