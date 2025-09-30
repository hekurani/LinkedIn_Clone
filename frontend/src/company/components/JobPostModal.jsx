import moment from "moment";
import { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../axios/axios.tsx";
import { useAlert } from "../../utilities/alert/AlertContext.js";
import Modal from "../../utilities/Modal/Modal";
import { getAllProfessions } from "../../utilities/profession/getAllProfesions";
import { getSkills } from "../../utilities/skills/getSkills";
import { workTypeOptions } from "../lib/helpers";

const JobPostModal = ({
  showModal = false,
  selectedJobPost = null,
  handleChange = () => {},
  handleCloseModal = () => {},
  setJobPosts = () => {},
}) => {
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  const showAlert = useAlert();

  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const res = await getSkills();
        setSkillsOptions(
          res.map((skill) => ({ value: skill.id, label: skill.name }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProfessions = async () => {
      try {
        const res = await getAllProfessions();
        setProfessionsOptions(
          res.map((profession) => ({
            value: profession.id,
            label: profession.name,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllSkills();
    fetchProfessions();
  }, []);

  const handleJobPostCreate = async () => {
    try {
      const jobPost = {
        role: selectedJobPost?.role,
        deadLine: selectedJobPost?.deadLine,
        description: selectedJobPost?.description,
        skillsId: selectedJobPost?.skillsId,
        redirectURL: selectedJobPost?.redirectURL,
        workPlace: selectedJobPost?.workPlace,
        minSalary: parseInt(selectedJobPost?.minSalary, 10),
        maxSalary: parseInt(selectedJobPost?.maxSalary, 10),
      };

      const createdJobPost = await axiosInstance.post("job-post", jobPost);
      if (createdJobPost?.status === 201)
        showAlert({ text: "Job post created!", variant: "success" });
      setJobPosts((prev) => [
        { ...jobPost, createdAt: moment().format() },
        ...prev,
      ]);

      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={showModal}
      title="Create Job Post"
      variant="dark"
      message="hello"
      onSave={handleJobPostCreate}
      onClose={handleCloseModal}
    >
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white mb-1">Role:</p>
            <Select
              className="w-full text-black rounded-md"
              options={professionsOptions}
              name="role"
              value={
                professionsOptions.find(
                  (opt) => opt.label === selectedJobPost?.role
                ) || null
              }
              onChange={(option) =>
                handleChange({
                  target: {
                    name: "role",
                    value: option ? option.label : null,
                  },
                })
              }
              placeholder="Select profession"
            />
          </div>
          <div>
            <p className="text-white mb-1">Deadline:</p>
            <input
              type="date"
              name="deadLine"
              value={selectedJobPost?.deadLine || ""}
              onChange={handleChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p className="text-white mb-1">Skills:</p>
            <Select // to change
              className="w-full text-black rounded-md"
              options={skillsOptions}
              isMulti
              name="skillsId"
              value={skillsOptions.filter((opt) =>
                (selectedJobPost?.skillsId || []).includes(opt.value)
              )}
              onChange={(selected) =>
                handleChange({
                  target: {
                    name: "skillsId",
                    value: selected ? selected.map((s) => s.value) : [],
                  },
                })
              }
              placeholder="Select skills"
            />
          </div>
          <div>
            <p className="text-white mb-1">Redirect URL:</p>
            <input
              type="text"
              name="redirectURL"
              value={selectedJobPost?.redirectURL || ""}
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
              value={selectedJobPost?.minSalary || ""}
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
              value={selectedJobPost?.maxSalary || ""}
              onChange={handleChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              placeholder="Optional"
            />
          </div>
          <div className="col-span-2">
            <p className="text-white mb-1">Description:</p>
            <textarea
              name="description"
              value={selectedJobPost?.description || ""}
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
              name="workPlace"
              value={
                workTypeOptions.find(
                  (opt) => opt.value === selectedJobPost?.workPlace
                ) || null
              }
              onChange={(option) =>
                handleChange({
                  target: {
                    name: "workPlace",
                    value: option ? option.value : null,
                  },
                })
              }
              placeholder="Select workplace type"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobPostModal;
