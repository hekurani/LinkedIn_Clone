import React from "react";
import Modal from "../../utilities/Modal/Modal"
import Select from "react-select";

// Placeholder options for companies and skills
const companyOptions = [
  { value: 1, label: "Company A" },
  { value: 2, label: "Company B" },
];
const skillsOptions = [
  { value: 1, label: "JavaScript" },
  { value: 2, label: "React" },
  { value: 3, label: "Node.js" },
];
const workTypeOptions = [
  { label: "On-site", value: "On-site" },
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
];

const CreateJobPost = ({ handleChange, showModal, handleOpenModal, handleCloseModal }) => {
  // Helper for multi-select skills
  const handleSkillsChange = (selected) => {
    handleChange({
      target: {
        name: "skillsId",
        value: selected ? selected.map((s) => s.value) : [],
      },
    });
  };

  return (
    <div
      className="mx-auto p-5 max-w-[880px] border border-solid border-[#d3d3d3] rounded-[7px] bg-white mt-5 w-[550px]"
    >
      <div className="header flex items-center mb-3">
        <p className="font-bold text-lg">Job Posts</p>
        <button onClick={handleOpenModal} className="ml-auto m-1 p-1 px-3 font-bold bg-[#0a66c2] text-white rounded-full">+ Create</button>
      </div>
      <Modal isOpen={showModal?.open} title="Create Job Post" variant="dark" message="hello" onClose={handleCloseModal}>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white mb-1">Company:</p>
              <Select
                className="w-full text-black rounded-md"
                options={companyOptions}
                name="companyId"
                value={companyOptions.find(opt => opt.value === showModal?.data?.companyId) || null}
                onChange={option => handleChange({ target: { name: "companyId", value: option ? option.value : null } })}
                placeholder="Select company"
              />
            </div>
            <div>
              <p className="text-white mb-1">Role:</p>
              <input
                type="text"
                name="role"
                value={showModal?.data?.role || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Job role"
              />
            </div>
            <div>
              <p className="text-white mb-1">Deadline:</p>
              <input
                type="date"
                name="deadLine"
                value={showModal?.data?.deadLine || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p className="text-white mb-1">Skills:</p>
              <Select
                className="w-full text-black rounded-md"
                options={skillsOptions}
                isMulti
                name="skillsId"
                value={skillsOptions.filter(opt => (showModal?.data?.skillsId || []).includes(opt.value))}
                onChange={handleSkillsChange}
                placeholder="Select skills"
              />
            </div>
            <div>
              <p className="text-white mb-1">Redirect URL:</p>
              <input
                type="text"
                name="redirectURL"
                value={showModal?.data?.redirectURL || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
            <div>
              <p className="text-white mb-1">Min Salary:</p>
              <input
                type="number"
                name="minSalary"
                value={showModal?.data?.minSalary || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
            <div>
              <p className="text-white mb-1">Max Salary:</p>
              <input
                type="number"
                name="maxSalary"
                value={showModal?.data?.maxSalary || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Optional"
              />
            </div>
            <div className="col-span-2">
              <p className="text-white mb-1">Description:</p>
              <textarea
                name="description"
                value={showModal?.data?.description || ""}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Optional"
                rows={3}
              />
            </div>
            <div>
              <p className="text-white mb-1">Workplace:</p>
              <Select
                className="w-full text-black rounded-md"
                options={workTypeOptions}
                name="workplace"
                value={workTypeOptions.find(opt => opt.value === showModal?.data?.workplace) || null}
                onChange={option => handleChange({ target: { name: "workplace", value: option ? option.value : null } })}
                placeholder="Select workplace type"
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full h-px bg-[#d3d3d3] mb-4"></div>
    </div>
  );
}
export default CreateJobPost;