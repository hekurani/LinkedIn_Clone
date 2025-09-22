import { useState } from "react";
import myriadLogo from "../../../assets/myriad.png";
import { useAlert } from "../../../utilities/alert/AlertContext";
import Confirm from "../../../utilities/Confrm/Confirm";
import { applyToJob } from "../../../utilities/jobs/getAllJobs";

const JobDescription = ({ selectedJob, setNewApply = () => {} }) => {
  const [showConfirmApply, setShowConfirmApply] = useState(false);
  const showAlert = useAlert();

  const handleApply = async (selectedJobId) => {
    try {
      const rez = await applyToJob(selectedJobId);
      if (rez?.status === "success") {
        showAlert({ text: "Successfully applied to job", variant: "success" });
      }
      setNewApply(true);
      setShowConfirmApply(false);
    } catch (error) {
      console.error("Error applying to job:", error);
      showAlert({ text: "Error applying to job", variant: "danger" });
    }
  };

  if (!selectedJob) {
    return (
      <div className="main bg-white  max-h-screen overflow-y-auto rounded-r-md">
        <div className="my-auto h-full flex justify-center items-center">
          <p className="text-md font-semibold">
            You have to select a job in order to see job details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main bg-white  max-h-screen overflow-y-auto rounded-r-md">
      <div className="header m-5 h-[100px]">
        <div className="flex gap-3 mb-3">
          <img src={myriadLogo} alt="" width={22} height={20} />
          <p>{selectedJob?.company?.name}</p>
        </div>
        <div className="tittle flex">
          <div>
            <p className="text-2xl font-semibold">{selectedJob?.role}</p>
          </div>
        </div>

        <div className="flex">
          <p className="location">{selectedJob?.location?.city}</p>
          <span>&nbsp;</span>
          <p>3 weeks ago</p>,<p>{selectedJob?.applicants || 1} applicants</p>
        </div>
        <button
          style={{ backgroundColor: "#0a66c2" }}
          className="w-20 h-10 font-semibold text-white rounded-full mt-3"
          onClick={() => setShowConfirmApply(true)}
        >
          Apply
        </button>
        <div className="jobDescription mt-5">
          <p className="text-lg font-semibold">About the job</p>
          {/* in future job?.description */}
          {selectedJob?.description}
        </div>
      </div>
      <Confirm
        isOpen={showConfirmApply}
        onCancel={() => setShowConfirmApply(false)}
        title="Apply to job"
        message="Are you sure you want to apply to this job?"
        onSave={() => {
          setShowConfirmApply(false);
          handleApply(selectedJob?.id);
        }}
      />
    </div>
  );
};

export default JobDescription;
