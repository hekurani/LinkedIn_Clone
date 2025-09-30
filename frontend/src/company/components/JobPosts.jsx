import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAllJobsCompany } from "../../utilities/jobs/getAllJobs";
import JobPostModal from "./JobPostModal";

const JobPosts = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState({});
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { jobPosts } = await getAllJobsCompany();
      setJobPosts(jobPosts);
    };
    fetchData();
  }, []);
  // we use it for create and edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJobPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto p-5 max-w-[880px] border border-solid border-[#d3d3d3] rounded-[7px] bg-white mt-5 w-[667px]">
      {/* Header */}
      <div className="header flex items-center mb-3">
        <p className="font-bold text-lg">Job Posts</p>
        <button
          onClick={() => setShowModal(true)}
          className="ml-auto m-1 p-1 px-3 font-bold bg-[#0a66c2] text-white rounded-full"
        >
          + Create
        </button>
      </div>

      {/* Modal for creating */}

      {/* Divider */}
      <div className="w-full h-px bg-[#d3d3d3] mb-4" />

      {/* Job Posts List */}
      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
        {Array.isArray(jobPosts) &&
          jobPosts.length > 0 &&
          jobPosts.map((post) => {
            console.log(post);
            //compare even seconds
            const isActive = new Date(post.deadLine) >= new Date();
            return (
              <div
                key={post.id}
                className="flex items-center rounded-md border border-gray-300 p-4 bg-white"
              >
                {/* Role + Company */}
                <div className="flex-1">
                  <p className="text-[#0a66c2] font-bold">{post.role}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Deadline: </span>{" "}
                    {moment(post.deadLine).format("MMMM D, YYYY")}
                  </p>
                </div>

                <div
                  className={`text-sm border border-solid border-gray-300 rounded-full px-3 py-1 text-center mr-12 ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p>{isActive ? "Active" : "Expired"}</p>
                </div>

                <div className="text-sm border border-solid border-gray-300 rounded-full px-3 py-1 text-center mr-12">
                  <p>{post.workPlace}</p>
                </div>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            );
          })}
      </div>
      {showModal && (
        <JobPostModal
          showModal={showModal}
          handleCloseModal={() => setShowModal(false)}
          selectedJobPost={selectedJobPost}
          handleChange={handleChange}
          setJobPosts={setJobPosts}
        />
      )}
    </div>
  );
};

export default JobPosts;
